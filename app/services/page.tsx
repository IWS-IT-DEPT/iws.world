import type { Metadata } from "next";
import Image from "next/image";
import CtaBand from "@/components/CtaBand";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Warehousing, Foreign Trade Zone services, transportation, and manufacturing supply integration from IWS.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-iws-charcoal">
        <div className="absolute inset-0">
          <Image
            src="/images/crates-flatbed.jpg"
            alt="Crated freight staged on a flatbed trailer inside an IWS warehouse"
            fill
            priority
            className="object-cover opacity-30"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-iws-charcoal via-iws-charcoal/90 to-iws-charcoal/60" />
        </div>
        <div className="container-page relative py-20 sm:py-28">
          <SectionHeading
            light
            eyebrow="Our services"
            title="Everything between the port and the production line"
            description="Warehousing, Foreign Trade Zone services, transportation, and supply integration — designed to work together, not as separate vendors."
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

      <CtaBand />
    </>
  );
}
