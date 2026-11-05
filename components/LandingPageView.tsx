import Image from "next/image";
import Link from "next/link";
import ArrowIcon from "@/components/ArrowIcon";
import type { ReactNode } from "react";
import CtaBand from "@/components/CtaBand";
import SectionHeading from "@/components/SectionHeading";
import StructuredData from "@/components/StructuredData";
import { siteConfig } from "@/lib/data";
import type { LandingPage } from "@/lib/seo-pages";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/structured-data";

export type RelatedLink = { href: string; label: string; description: string };

/**
 * Shared layout for SEO landing pages (service areas and service keywords).
 * `children` renders after the content sections (e.g. the facility list).
 */
export default function LandingPageView({
  page,
  breadcrumbs,
  structuredData,
  related,
  children,
}: {
  page: LandingPage;
  breadcrumbs: { name: string; path: string }[];
  structuredData: object;
  related: RelatedLink[];
  children?: ReactNode;
}) {
  return (
    <>
      <StructuredData data={structuredData} />
      <StructuredData data={faqJsonLd(page.faqs)} />
      <StructuredData data={breadcrumbJsonLd(breadcrumbs)} />

      <section className="relative overflow-hidden bg-iws-charcoal">
        <div className="absolute inset-0">
          <Image
            src={page.image.src}
            alt={page.image.alt}
            fill
            priority
            className="hero-settle object-cover opacity-30"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-iws-charcoal via-iws-charcoal/90 to-iws-charcoal/60" />
        </div>
        <div className="hero-rise container-page relative py-20 sm:py-28">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/60">
            <ol className="flex flex-wrap items-center gap-2">
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.path} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {i === breadcrumbs.length - 1 ? (
                    <span aria-current="page" className="text-white/80">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link href={crumb.path || "/"} className="hover:text-white">
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <SectionHeading as="h1" light eyebrow={page.eyebrow} title={page.h1} description={page.intro} />
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-iws-green px-7 py-3.5 text-center text-sm font-semibold text-white shadow-sm btn-soft hover:bg-iws-green-dark"
            >
              Get a Quote
            </Link>
            <a
              href={siteConfig.phoneHref}
              className="rounded-full border border-white/30 px-7 py-3.5 text-center text-sm font-semibold text-white btn-soft hover:bg-white/10"
            >
              Call {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>

      {page.sections.map((section, i) => (
        <section key={section.heading} className={`py-16 sm:py-24 ${i % 2 === 1 ? "bg-iws-sand" : ""}`}>
          <div className="container-page">
            <SectionHeading title={section.heading} />
            {section.body.map((p) => (
              <p key={p} className="mt-4 max-w-3xl text-lg leading-relaxed text-iws-charcoal/70">
                {p}
              </p>
            ))}
            {section.items && (
              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                {section.items.map((item) => (
                  <div key={item.title} className="card-lift reveal rounded-2xl border border-iws-border bg-white p-7 shadow-sm">
                    <h3 className="text-lg font-bold text-iws-charcoal">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-iws-charcoal/70">{item.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}

      {children}

      <section className="py-16 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[3fr_2fr]">
          <div>
            <SectionHeading title="Frequently asked questions" />
            <div className="mt-8 divide-y divide-iws-border rounded-2xl border border-iws-border bg-white">
              {page.faqs.map((faq) => (
                <details key={faq.q} className="faq-item group p-6">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-iws-charcoal">
                    <h3>{faq.q}</h3>
                    <span aria-hidden="true" className="text-iws-green-dark transition-transform duration-300 ease-out group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-iws-charcoal/70">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-iws-charcoal">Related</h2>
            <ul className="mt-6 space-y-4">
              {related.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group block rounded-2xl border border-iws-border bg-white p-5 shadow-sm card-lift reveal"
                  >
                    <span className="inline-flex items-center gap-2 font-semibold text-iws-blue">{link.label} <ArrowIcon /></span>
                    <span className="mt-1 block text-sm text-iws-charcoal/70">{link.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand title={page.ctaTitle} description={page.ctaDescription} />
    </>
  );
}
