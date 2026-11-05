import type { Metadata } from "next";
import Image from "next/image";
import CtaBand from "@/components/CtaBand";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "IWS is a full-service warehousing and Foreign Trade Zone provider serving large industrial and manufacturing clients across the Gulf Coast.",
  alternates: { canonical: "/about" },
};

const pillars = [
  {
    title: "Warehousing at scale",
    description:
      "Six facilities across Alabama, Florida, and Texas give us the space and dock capacity to handle industrial-scale freight, from bulk raw materials to oversized components.",
  },
  {
    title: "Foreign Trade Zone expertise",
    description:
      "Our FTZ-designated space helps clients reduce and defer customs duties, keeping capital and product moving through the supply chain.",
  },
  {
    title: "Integrated transportation",
    description:
      "Through a network of trusted trucking partners, we coordinate freight from port to warehouse to production line, so you have one point of contact instead of a chain of separate vendors.",
  },
  {
    title: "Built into your process",
    description:
      "We don't just store freight — we integrate into manufacturing storage and component supply processes, sequencing deliveries so production stays supplied.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-iws-border bg-iws-sand py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            as="h1"
            eyebrow="About IWS"
            title="A full-service warehousing partner for industrial supply chains"
            description="International Warehouse & Shipping (IWS) stores, manages, and moves materials for large industrial and manufacturing clients — connecting ports, warehouses, and production floors across the Gulf Coast."
          />
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div className="relative h-80 overflow-hidden rounded-2xl sm:h-[26rem]">
            <Image
              src="/images/container-dock.jpg"
              alt="Shipping container at an IWS warehouse dock door"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-iws-charcoal">
              What sets us apart
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-iws-charcoal/70">
              We work directly with ports to receive raw materials, store
              them securely, and deliver them into production through a
              trusted network of trucking partners. When production is finished, we store and
              distribute the finished goods too.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-iws-charcoal/70">
              That end-to-end capability, combined with our Foreign Trade
              Zone services, lets us plug directly into a manufacturer&apos;s
              storage or component supply process rather than operating as
              a separate link in the chain.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-iws-sand py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Why clients work with us"
            title="What we bring to the table"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-2xl border border-iws-border bg-white p-7 shadow-sm"
              >
                <h3 className="text-lg font-bold text-iws-charcoal">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-iws-charcoal/70">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Want to see how IWS fits into your supply chain?"
        description="Tell us about your facility and freight, and we'll follow up quickly."
      />
    </>
  );
}
