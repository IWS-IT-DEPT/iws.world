import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LandingPageView, { type RelatedLink } from "@/components/LandingPageView";
import LocationCard from "@/components/LocationCard";
import SectionHeading from "@/components/SectionHeading";
import { locations } from "@/lib/data";
import { serviceAreas, servicePages } from "@/lib/seo-pages";
import { serviceAreaJsonLd } from "@/lib/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceAreas.map((area) => ({ area: area.slug }));
}

function getArea(slug: string) {
  return serviceAreas.find((a) => a.slug === slug);
}

export async function generateMetadata(props: PageProps<"/locations/[area]">): Promise<Metadata> {
  const area = getArea((await props.params).area);
  if (!area) return {};
  return {
    title: area.metaTitle,
    description: area.metaDescription,
    keywords: area.keywords,
    alternates: { canonical: `/locations/${area.slug}` },
    openGraph: { title: area.metaTitle, description: area.metaDescription, url: `/locations/${area.slug}` },
  };
}

export default async function ServiceAreaPage(props: PageProps<"/locations/[area]">) {
  const area = getArea((await props.params).area);
  if (!area) notFound();

  const facilities = locations.filter((l) => area.locationIds.includes(l.id));
  const related: RelatedLink[] = [
    ...serviceAreas
      .filter((a) => a.slug !== area.slug)
      .map((a) => ({ href: `/locations/${a.slug}`, label: `Warehousing in ${a.shortName}`, description: a.summary })),
    ...servicePages.map((p) => ({ href: `/services/${p.slug}`, label: p.eyebrow, description: p.metaDescription })),
  ];

  return (
    <LandingPageView
      page={area}
      breadcrumbs={[
        { name: "Home", path: "" },
        { name: "Locations", path: "/locations" },
        { name: area.shortName, path: `/locations/${area.slug}` },
      ]}
      structuredData={serviceAreaJsonLd(area)}
      related={related}
    >
      <section className="bg-iws-sand py-16 sm:py-24">
        <div className="container-page">
          <SectionHeading
            title={`Our ${area.city} ${facilities.length > 1 ? "facilities" : "facility"}`}
            description={`Visit or contact our ${area.shortName} ${facilities.length > 1 ? "locations" : "location"}.`}
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
        </div>
      </section>
    </LandingPageView>
  );
}
