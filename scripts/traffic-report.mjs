// Pulls GA4 + Search Console data and writes docs/traffic.md, which CLAUDE.md
// imports so every Claude session starts with current traffic context.
//
// Credentials (one of):
//   GOOGLE_SERVICE_ACCOUNT_JSON     raw service-account JSON (used in CI)
//   GOOGLE_APPLICATION_CREDENTIALS  path to the service-account JSON file (local)
//
// Run: npm run traffic

import { GoogleAuth } from "google-auth-library";
import { mkdirSync, writeFileSync } from "node:fs";

const GA4_PROPERTY_ID = process.env.GA4_PROPERTY_ID ?? "551596017";
const GSC_SITE_URL = process.env.GSC_SITE_URL ?? "sc-domain:iws.world";
const DAYS = 28;
const OUTPUT = "docs/traffic.md";

const AI_SOURCES =
  /chatgpt|openai|perplexity|claude|anthropic|gemini|bard|copilot|bing\.com\/chat|you\.com|phind|deepseek|grok|meta\.ai/i;

// ---------- auth ----------
const authOptions = {
  scopes: [
    "https://www.googleapis.com/auth/analytics.readonly",
    "https://www.googleapis.com/auth/webmasters.readonly",
  ],
};
if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
  authOptions.credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
} else if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  console.error(
    "Missing credentials: set GOOGLE_APPLICATION_CREDENTIALS (path) or GOOGLE_SERVICE_ACCOUNT_JSON (contents)."
  );
  process.exit(1);
}
const client = await new GoogleAuth(authOptions).getClient();

async function request(url, data, attempt = 1) {
  try {
    const res = await client.request({ url, method: "POST", data });
    return res.data;
  } catch (err) {
    const status = err.response?.status;
    if ((status === 429 || status >= 500) && attempt < 4) {
      await new Promise((r) => setTimeout(r, 2000 * attempt));
      return request(url, data, attempt + 1);
    }
    const msg = err.response?.data?.error?.message ?? err.message;
    throw new Error(`${url} -> ${status ?? ""} ${msg}`);
  }
}

// ---------- dates ----------
const iso = (d) => d.toISOString().slice(0, 10);
const daysAgo = (n) => {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d;
};
// GA4: last full 28 days vs the 28 before. Search Console lags ~3 days.
const ga = {
  cur: { startDate: iso(daysAgo(DAYS)), endDate: iso(daysAgo(1)) },
  prev: { startDate: iso(daysAgo(DAYS * 2)), endDate: iso(daysAgo(DAYS + 1)) },
};
const gsc = {
  cur: { startDate: iso(daysAgo(DAYS + 2)), endDate: iso(daysAgo(3)) },
  prev: { startDate: iso(daysAgo(DAYS * 2 + 2)), endDate: iso(daysAgo(DAYS + 3)) },
};

// ---------- GA4 ----------
async function gaReport({ dimensions = [], metrics, limit = 25, filter, orderBy }) {
  const data = await request(
    `https://analyticsdata.googleapis.com/v1beta/properties/${GA4_PROPERTY_ID}:runReport`,
    {
      dateRanges: [
        { ...ga.cur, name: "cur" },
        { ...ga.prev, name: "prev" },
      ],
      dimensions: dimensions.map((name) => ({ name })),
      metrics: metrics.map((name) => ({ name })),
      dimensionFilter: filter,
      orderBys: [{ metric: { metricName: orderBy ?? metrics[0] }, desc: true }],
      limit,
    }
  );
  // With two date ranges, GA appends a "dateRange" dimension to each row.
  const rows = new Map();
  for (const row of data.rows ?? []) {
    const dims = row.dimensionValues.map((d) => d.value);
    const range = dims.pop();
    const key = dims.join(" / ") || "total";
    const entry = rows.get(key) ?? { key, dims, cur: {}, prev: {} };
    metrics.forEach((m, i) => (entry[range][m] = Number(row.metricValues[i].value)));
    rows.set(key, entry);
  }
  return [...rows.values()].sort((a, b) => (b.cur[metrics[0]] ?? 0) - (a.cur[metrics[0]] ?? 0));
}

const leadEventFilter = {
  filter: {
    fieldName: "eventName",
    inListFilter: { values: ["generate_lead", "job_application"] },
  },
};

// ---------- Search Console ----------
async function gscQuery(range, dimensions, rowLimit = 250) {
  const data = await request(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(GSC_SITE_URL)}/searchAnalytics/query`,
    { ...range, dimensions, rowLimit, dataState: "final" }
  );
  return data.rows ?? [];
}

// ---------- formatting ----------
const n = (v) => (v == null ? "0" : Math.round(v).toLocaleString("en-US"));
const pct = (v) => (v == null ? "-" : `${(v * 100).toFixed(0)}%`);
const delta = (cur = 0, prev = 0) => {
  if (!prev && !cur) return "-";
  if (!prev) return "new";
  const d = (cur - prev) / prev;
  return `${d >= 0 ? "+" : ""}${(d * 100).toFixed(0)}%`;
};
const table = (headers, rows) =>
  rows.length
    ? [
        `| ${headers.join(" | ")} |`,
        `| ${headers.map(() => "---").join(" | ")} |`,
        ...rows.map((r) => `| ${r.map((c) => String(c).replace(/\|/g, "\\|")).join(" | ")} |`),
      ].join("\n")
    : "_No data for this period._";

// ---------- fetch everything ----------
// Each source is fetched independently so one failing API still yields a partial report.
const warnings = [];
async function safe(label, fn, fallback) {
  try {
    return await fn();
  } catch (err) {
    console.error(`[${label}] ${err.message}`);
    warnings.push(`**${label} data unavailable:** ${err.message.split(". ")[0]}.`);
    return fallback;
  }
}

const [totals, channels, sources, landing, devices, cities, leadsBySource, leadsByPage] =
  await safe("Google Analytics", () => Promise.all([
    gaReport({ metrics: ["sessions", "totalUsers", "newUsers", "engagementRate", "screenPageViews"] }),
    gaReport({ dimensions: ["sessionDefaultChannelGroup"], metrics: ["sessions", "engagementRate"] }),
    gaReport({ dimensions: ["sessionSource", "sessionMedium"], metrics: ["sessions", "engagementRate"], limit: 200 }),
    gaReport({ dimensions: ["landingPage"], metrics: ["sessions", "engagementRate", "averageSessionDuration"], limit: 15 }),
    gaReport({ dimensions: ["deviceCategory"], metrics: ["sessions"] }),
    gaReport({ dimensions: ["city", "region"], metrics: ["sessions"], limit: 10 }),
    gaReport({ dimensions: ["eventName", "sessionSource", "sessionMedium"], metrics: ["eventCount"], filter: leadEventFilter }),
    gaReport({ dimensions: ["eventName", "landingPage"], metrics: ["eventCount"], filter: leadEventFilter }),
  ]), Array(8).fill([]));

const [qCur, qPrev, pCur, qpCur, gscTotalsCur, gscTotalsPrev] = await safe("Search Console", () => Promise.all([
  gscQuery(gsc.cur, ["query"]),
  gscQuery(gsc.prev, ["query"]),
  gscQuery(gsc.cur, ["page"], 25),
  gscQuery(gsc.cur, ["query", "page"], 500),
  gscQuery(gsc.cur, [], 1),
  gscQuery(gsc.prev, [], 1),
]), Array(6).fill([]));

// ---------- build report ----------
const t = totals[0] ?? { cur: {}, prev: {} };
const gT = gscTotalsCur[0] ?? {};
const gP = gscTotalsPrev[0] ?? {};
const prevQueries = new Map(qPrev.map((r) => [r.keys[0], r]));
// Keep the host visible: split indexing (http vs https, www vs apex) is
// itself an SEO problem worth seeing in the report.
const shortPage = (url) => url.replace(/^https:\/\//, "");
const byClicksThenImpressions = (a, b) => b.clicks - a.clicks || b.impressions - a.impressions;
qCur.sort(byClicksThenImpressions);
pCur.sort(byClicksThenImpressions);

const aiSources = sources.filter((r) => AI_SOURCES.test(r.dims[0]));
const leadsTotal = (rows, evt) =>
  rows.filter((r) => r.dims[0] === evt).reduce((s, r) => s + (r.cur.eventCount ?? 0), 0);

// Striking distance: ranking 4-20 with real impressions -> best SEO upside.
const opportunities = qpCur
  .filter((r) => r.position >= 4 && r.position <= 20 && r.impressions >= 10)
  .sort((a, b) => b.impressions - a.impressions)
  .slice(0, 15);
// High impressions, weak CTR on page 1 -> title/meta description rewrites.
const lowCtr = qCur
  .filter((r) => r.position <= 5 && r.impressions >= 20 && r.ctr < 0.03)
  .sort((a, b) => b.impressions - a.impressions)
  .slice(0, 10);

const md = `# IWS.world traffic report

_Auto-generated by \`npm run traffic\` (scripts/traffic-report.mjs) on ${iso(new Date())}. Do not edit by hand._

- **Google Analytics**: ${ga.cur.startDate} to ${ga.cur.endDate}, compared with ${ga.prev.startDate} to ${ga.prev.endDate}
- **Search Console**: ${gsc.cur.startDate} to ${gsc.cur.endDate}, compared with ${gsc.prev.startDate} to ${gsc.prev.endDate} (Google data lags about 3 days)

${warnings.map((w) => `> ⚠️ ${w}
`).join("")}
**How to use this (for Claude):** Use this report when working on content, SEO, metadata, llms.txt, or page priorities. Focus on the channels and search terms that bring real visitors and leads. Treat the "striking distance" and "low click rate" lists as the main SEO to-do list. Numbers are small, so don't read much into a single week's change.

## Summary

${table(
  ["Metric", "Last 28d", "Prior 28d", "Change"],
  [
    ["Sessions", n(t.cur.sessions), n(t.prev.sessions), delta(t.cur.sessions, t.prev.sessions)],
    ["Users", n(t.cur.totalUsers), n(t.prev.totalUsers), delta(t.cur.totalUsers, t.prev.totalUsers)],
    ["New users", n(t.cur.newUsers), n(t.prev.newUsers), delta(t.cur.newUsers, t.prev.newUsers)],
    ["Page views", n(t.cur.screenPageViews), n(t.prev.screenPageViews), delta(t.cur.screenPageViews, t.prev.screenPageViews)],
    ["Engagement rate", pct(t.cur.engagementRate), pct(t.prev.engagementRate), ""],
    ["Contact leads (generate_lead)", n(leadsTotal(leadsBySource, "generate_lead")), "", ""],
    ["Job applications", n(leadsTotal(leadsBySource, "job_application")), "", ""],
    ["Google search clicks", n(gT.clicks), n(gP.clicks), delta(gT.clicks, gP.clicks)],
    ["Google search impressions", n(gT.impressions), n(gP.impressions), delta(gT.impressions, gP.impressions)],
    ["Avg. Google position", gT.position?.toFixed(1) ?? "-", gP.position?.toFixed(1) ?? "-", ""],
  ]
)}

## Traffic by channel

${table(
  ["Channel", "Sessions", "Prior", "Change", "Engagement"],
  channels.map((r) => [r.key, n(r.cur.sessions), n(r.prev.sessions), delta(r.cur.sessions, r.prev.sessions), pct(r.cur.engagementRate)])
)}

## Top sources

${table(
  ["Source / medium", "Sessions", "Prior", "Change", "Engagement"],
  sources.slice(0, 15).map((r) => [r.key, n(r.cur.sessions), n(r.prev.sessions), delta(r.cur.sessions, r.prev.sessions), pct(r.cur.engagementRate)])
)}

## AI assistant referrals

${aiSources.length ? table(
  ["Source / medium", "Sessions", "Prior", "Change"],
  aiSources.map((r) => [r.key, n(r.cur.sessions), n(r.prev.sessions), delta(r.cur.sessions, r.prev.sessions)])
) : "_No visits from ChatGPT, Perplexity, Claude, Gemini, Copilot, etc. this period._"}

## Leads by source

${table(
  ["Event", "Source / medium", "Count", "Prior"],
  leadsBySource.map((r) => [r.dims[0], `${r.dims[1]} / ${r.dims[2]}`, n(r.cur.eventCount), n(r.prev.eventCount)])
)}

## Leads by landing page

${table(
  ["Event", "Landing page", "Count", "Prior"],
  leadsByPage.map((r) => [r.dims[0], r.dims[1], n(r.cur.eventCount), n(r.prev.eventCount)])
)}

## Landing pages

${table(
  ["Page", "Sessions", "Prior", "Change", "Engagement", "Avg. time"],
  landing.map((r) => [r.key, n(r.cur.sessions), n(r.prev.sessions), delta(r.cur.sessions, r.prev.sessions), pct(r.cur.engagementRate), `${Math.round(r.cur.averageSessionDuration ?? 0)}s`])
)}

## Devices and locations

${table(["Device", "Sessions", "Prior"], devices.map((r) => [r.key, n(r.cur.sessions), n(r.prev.sessions)]))}

${table(["City / region", "Sessions", "Prior"], cities.map((r) => [r.key, n(r.cur.sessions), n(r.prev.sessions)]))}

## Google search terms (Search Console)

${table(
  ["Query", "Clicks", "Impressions", "CTR", "Position", "Prior position"],
  qCur.slice(0, 30).map((r) => {
    const p = prevQueries.get(r.keys[0]);
    return [r.keys[0], n(r.clicks), n(r.impressions), pct(r.ctr), r.position.toFixed(1), p ? p.position.toFixed(1) : "new"];
  })
)}

## Striking-distance terms (position 4-20, at least 10 impressions)

These are the best SEO opportunities: improving the ranking page for these terms (content, headings, internal links) could move them into the top 3.

${table(
  ["Query", "Page", "Impressions", "Clicks", "Position"],
  opportunities.map((r) => [r.keys[0], shortPage(r.keys[1]), n(r.impressions), n(r.clicks), r.position.toFixed(1)])
)}

## Low click rate on page 1 (top 5, CTR under 3%)

These rank well but few people click: the page title and meta description need to be more compelling.

${table(
  ["Query", "Impressions", "CTR", "Position"],
  lowCtr.map((r) => [r.keys[0], n(r.impressions), pct(r.ctr), r.position.toFixed(1)])
)}

## Top pages in Google search

${table(
  ["Page", "Clicks", "Impressions", "CTR", "Position"],
  pCur.map((r) => [shortPage(r.keys[0]), n(r.clicks), n(r.impressions), pct(r.ctr), r.position.toFixed(1)])
)}
`;

mkdirSync("docs", { recursive: true });
writeFileSync(OUTPUT, md);
console.log(`Wrote ${OUTPUT}${warnings.length ? ` with ${warnings.length} warning(s)` : ""}`);
if (warnings.length === 2) process.exit(1);
