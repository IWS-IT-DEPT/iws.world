import Image from "next/image";
import Link from "next/link";
import ArrowIcon from "@/components/ArrowIcon";
import CtaBand from "@/components/CtaBand";
import ServiceAreaCard from "@/components/ServiceAreaCard";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import { services, siteConfig } from "@/lib/data";
import { serviceAreas, servicePages } from "@/lib/seo-pages";

const flow = [
  {
    step: "01",
    title: "Port receiving",
    description:
      "Raw materials and bulk shipments arrive from the port and are received directly into our warehouses.",
  },
  {
    step: "02",
    title: "Secure storage",
    description:
      "Materials and components are staged and stored across our Gulf Coast facilities, ready when production needs them.",
  },
  {
    step: "03",
    title: "Integrated delivery",
    description:
      "Our trusted trucking partners move freight from our warehouses to your production line on schedule.",
  },
  {
    step: "04",
    title: "Finished goods",
    description:
      "Completed products come back into our network for storage and outbound distribution to their next destination.",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-iws-charcoal">
        <div className="absolute inset-0">
          <Image
            src="/images/warehouse-doors.jpg"
            alt="IWS warehouse loading dock doors"
            fill
            priority
            className="hero-settle object-cover opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-iws-charcoal via-iws-charcoal/90 to-iws-charcoal/50" />
        </div>
        <div className="hero-rise container-page relative py-28 sm:py-36">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-iws-green">
            International Warehouse &amp; Shipping
          </p>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Industrial &amp; manufacturing warehousing services on the Gulf Coast.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            International Warehouse &amp; Shipping (IWS) stores, manages, and
            moves raw materials, components, and finished goods for industrial
            and manufacturing clients, with Foreign Trade Zone warehousing and
            facilities in Mobile, AL, Pensacola, FL, and Houston, TX.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-iws-green px-7 py-3.5 text-center text-sm font-semibold text-white shadow-sm btn-soft hover:bg-iws-green-dark"
            >
              Get a Quote
            </Link>
            <Link
              href="/services"
              className="rounded-full border border-white/30 px-7 py-3.5 text-center text-sm font-semibold text-white btn-soft hover:bg-white/10"
            >
              Explore Our Services
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="What we do"
            title="Warehousing services, FTZ, and logistics under one roof"
            description="From port to production floor to finished goods, IWS handles the storage and movement in between."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold">
            {servicePages.map((page) => (
              <Link key={page.slug} href={`/services/${page.slug}`} className="group inline-flex items-center gap-2 text-iws-blue hover:text-iws-blue-dark">
                {page.eyebrow} <ArrowIcon />
              </Link>
            ))}
            <Link href="/services" className="group inline-flex items-center gap-2 text-iws-blue hover:text-iws-blue-dark">
              All warehousing services <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-iws-sand py-20 sm:py-28">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="How we work"
              title="Built to integrate into your supply chain"
              description="We work directly with ports and manufacturing sites to keep materials moving — able to plug into any manufacturing storage or component supply process."
            />
            <ol className="mt-10 space-y-8">
              {flow.map((item) => (
                <li key={item.step} className="reveal flex gap-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-iws-green/10 text-sm font-bold text-iws-green-dark">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="font-semibold text-iws-charcoal">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-iws-charcoal/70">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative h-64 overflow-hidden rounded-2xl sm:h-80">
              <Image
                src="/images/container-dock.jpg"
                alt="Shipping container at a warehouse dock door"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 25vw, 50vw"
              />
            </div>
            <div className="relative mt-8 h-64 overflow-hidden rounded-2xl sm:h-80">
              <Image
                src="/images/crates-flatbed.jpg"
                alt="Crated freight staged on a flatbed trailer inside an IWS warehouse"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 25vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-page">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Where we are"
              title="Warehouse service areas across the Gulf Coast"
              description="Six facilities across three states, positioned near the ports and industrial hubs we serve."
            />
            <Link
              href="/locations"
              className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-iws-blue hover:text-iws-blue-dark"
            >
              View all locations <ArrowIcon />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {serviceAreas.map((area) => (
              <ServiceAreaCard key={area.slug} area={area} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-iws-charcoal py-20 sm:py-24">
        <div className="container-page text-center">
          <SectionHeading
            align="center"
            light
            eyebrow="Careers"
            title="Join a team that keeps industry moving"
            description="We're always looking for reliable, hands-on people across our warehouse and logistics operations."
          />
          <Link
            href="/careers"
            className="mt-8 inline-block rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-iws-charcoal shadow-sm btn-soft hover:bg-white/90"
          >
            View Careers at {siteConfig.name}
          </Link>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
