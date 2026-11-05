import Link from "next/link";
import ArrowIcon from "@/components/ArrowIcon";
import { locations } from "@/lib/data";
import type { ServiceArea } from "@/lib/seo-pages";

export default function ServiceAreaCard({ area }: { area: ServiceArea }) {
  const facilities = locations.filter((l) => area.locationIds.includes(l.id));
  return (
    <Link
      href={`/locations/${area.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-iws-border bg-white p-7 shadow-sm card-lift reveal"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-iws-green-dark">
        {facilities.length} {facilities.length > 1 ? "facilities" : "facility"}
      </p>
      <h3 className="mt-1 text-xl font-bold text-iws-charcoal">
        Warehousing in {area.shortName}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-iws-charcoal/70">{area.summary}</p>
      <ul className="mt-4 space-y-1 text-sm text-iws-charcoal/60">
        {facilities.map((l) => (
          <li key={l.id}>
            {l.label} — {l.address}
          </li>
        ))}
      </ul>
      <span className="mt-5 flex items-center gap-2 border-t border-iws-border pt-5 text-sm font-semibold text-iws-blue group-hover:text-iws-blue-dark">
        {area.city} warehousing services <ArrowIcon />
      </span>
    </Link>
  );
}
