import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import LocationCard from "@/components/LocationCard";
import SectionHeading from "@/components/SectionHeading";
import StructuredData from "@/components/StructuredData";
import ServiceAreaCard from "@/components/ServiceAreaCard";
import { locations } from "@/lib/data";
import { serviceAreas } from "@/lib/seo-pages";
import { locationsJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Warehouse Locations | Mobile, Pensacola & Houston",
  description:
    "International Warehouse & Shipping warehouse and Foreign Trade Zone locations in Mobile, AL, Pensacola, FL, and Houston, TX, serving Gulf Coast ports and industrial hubs.",
  alternates: { canonical: "/locations" },
};

export default function LocationsPage() {
  return (
    <>
      <StructuredData data={locationsJsonLd()} />
      <section className="border-b border-iws-border bg-iws-sand py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            as="h1"
            eyebrow="Locations"
            title="Six facilities, three states, one connected network"
            description="Our warehouses are positioned near the ports and manufacturing hubs we serve across Alabama, Florida, and Texas."
          />
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading title="Warehouse service areas" />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {serviceAreas.map((area) => (
              <ServiceAreaCard key={area.slug} area={area} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-iws-sand py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading title="All facilities" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Not sure which facility fits your needs?"
        description="Reach out and we'll help you figure out the right location and setup for your freight."
      />
    </>
  );
}
