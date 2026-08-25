import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import LocationCard from "@/components/LocationCard";
import SectionHeading from "@/components/SectionHeading";
import { locations } from "@/lib/data";

export const metadata: Metadata = {
  title: "Locations",
  description:
    "IWS warehouse and Foreign Trade Zone locations in Mobile, AL, Pensacola, FL, and Houston, TX.",
};

export default function LocationsPage() {
  return (
    <>
      <section className="border-b border-iws-border bg-iws-sand py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Locations"
            title="Five facilities, three states, one connected network"
            description="Our warehouses are positioned near the ports and manufacturing hubs we serve across Alabama, Florida, and Texas."
          />
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
