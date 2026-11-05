import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LandingPageView, { type RelatedLink } from "@/components/LandingPageView";
import { serviceAreas, servicePages } from "@/lib/seo-pages";
import { servicePageJsonLd } from "@/lib/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map((page) => ({ slug: page.slug }));
}

function getPage(slug: string) {
  return servicePages.find((p) => p.slug === slug);
}

export async function generateMetadata(props: PageProps<"/services/[slug]">): Promise<Metadata> {
  const page = getPage((await props.params).slug);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: { canonical: `/services/${page.slug}` },
    openGraph: { title: page.metaTitle, description: page.metaDescription, url: `/services/${page.slug}` },
  };
}

export default async function ServiceLandingPage(props: PageProps<"/services/[slug]">) {
  const page = getPage((await props.params).slug);
  if (!page) notFound();

  const related: RelatedLink[] = [
    ...servicePages
      .filter((p) => p.slug !== page.slug)
      .map((p) => ({ href: `/services/${p.slug}`, label: p.eyebrow, description: p.metaDescription })),
    ...serviceAreas.map((a) => ({
      href: `/locations/${a.slug}`,
      label: `${page.eyebrow} in ${a.shortName}`,
      description: a.summary,
    })),
  ];

  return (
    <LandingPageView
      page={page}
      breadcrumbs={[
        { name: "Home", path: "" },
        { name: "Services", path: "/services" },
        { name: page.eyebrow, path: `/services/${page.slug}` },
      ]}
      structuredData={servicePageJsonLd(page)}
      related={related}
    />
  );
}
