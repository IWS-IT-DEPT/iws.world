import type { Metadata } from "next";
import Image from "next/image";
import CtaBand from "@/components/CtaBand";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import StructuredData from "@/components/StructuredData";
import Link from "next/link";
import { services } from "@/lib/data";
import { serviceAreas, servicePages } from "@/lib/seo-pages";
import { servicesJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Warehousing Services | Industrial, Manufacturing & FTZ",
  description:
    "Warehousing services from International Warehouse & Shipping: industrial and manufacturing warehousing, Foreign Trade Zone storage, port logistics, and finished goods distribution in Mobile, Pensacola, and Houston.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <StructuredData data={servicesJsonLd()} />
      <section className="relative overflow-hidden bg-iws-charcoal">
        <div className="absolute inset-0">
          <Image
            src="/images/crates-flatbed.jpg"
            alt="Crated freight staged on a flatbed trailer inside an IWS warehouse"
            fill
            priority
            className="hero-settle object-cover opacity-30"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-iws-charcoal via-iws-charcoal/90 to-iws-charcoal/60" />
        </div>
        <div className="hero-rise container-page relative py-20 sm:py-28">
          <SectionHeading
            as="h1"
            light
            eyebrow="Our services"
            title="Warehousing services from the port to the production line"
            description="Industrial and manufacturing warehousing, Foreign Trade Zone services, transportation, and supply integration, designed to work together instead of as separate vendors."
          />
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-2">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} detailed />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-iws-sand py-20 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading title="Specialized warehousing" />
            <ul className="mt-8 space-y-4">
              {servicePages.map((page) => (
                <li key={page.slug}>
                  <Link
                    href={`/services/${page.slug}`}
                    className="block rounded-2xl border border-iws-border bg-white p-6 shadow-sm card-lift reveal"
                  >
                    <span className="text-lg font-bold text-iws-charcoal">{page.eyebrow}</span>
                    <span className="mt-2 block text-sm text-iws-charcoal/70">{page.metaDescription}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading title="Warehousing services by location" />
            <ul className="mt-8 space-y-4">
              {serviceAreas.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={`/locations/${area.slug}`}
                    className="block rounded-2xl border border-iws-border bg-white p-6 shadow-sm card-lift reveal"
                  >
                    <span className="text-lg font-bold text-iws-charcoal">Warehousing in {area.shortName}</span>
                    <span className="mt-2 block text-sm text-iws-charcoal/70">{area.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
