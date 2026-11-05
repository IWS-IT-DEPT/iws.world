import { locations, services, siteConfig } from "@/lib/data";
import type { Faq, LandingPage, ServiceArea } from "@/lib/seo-pages";
import { serviceAreas } from "@/lib/seo-pages";

const areaServed = Array.from(
  new Set(locations.map((l) => `${l.city}, ${l.state}`))
);

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.fullName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo.png`,
    image: `${siteConfig.url}/images/logo.png`,
    description:
      "Full-service warehousing and Foreign Trade Zone (FTZ) provider for large industrial and manufacturing clients, with integrated transportation and facilities across Alabama, Florida, and Texas.",
    telephone: siteConfig.phoneHref.replace("tel:", ""),
    email: siteConfig.salesEmail,
    address: {
      "@type": "PostalAddress",
      streetAddress: "4320 Downtowner Loop South",
      addressLocality: "Mobile",
      addressRegion: "AL",
      postalCode: "36609",
      addressCountry: "US",
    },
    areaServed,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phoneHref.replace("tel:", ""),
        contactType: "sales",
        email: siteConfig.salesEmail,
        areaServed: "US",
        availableLanguage: "English",
      },
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phoneHref.replace("tel:", ""),
        contactType: "human resources",
        email: siteConfig.hrEmail,
        areaServed: "US",
        availableLanguage: "English",
      },
    ],
    makesOffer: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.description,
      },
    })),
  };
}

export function locationsJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": locations.map((location) => ({
      "@type": "LocalBusiness",
      "@id": `${siteConfig.url}/locations#${location.id}`,
      name: `${siteConfig.name} — ${location.label}`,
      parentOrganization: { "@id": `${siteConfig.url}/#organization` },
      description: location.role,
      telephone: siteConfig.phoneHref.replace("tel:", ""),
      url: `${siteConfig.url}/locations/${areaSlugFor(location.id)}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: location.address,
        addressLocality: location.city,
        addressRegion: location.state,
        addressCountry: "US",
      },
    })),
  };
}

function areaSlugFor(locationId: string) {
  return serviceAreas.find((a) => a.locationIds.includes(locationId))?.slug ?? "";
}

export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbJsonLd(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${siteConfig.url}${c.path}`,
    })),
  };
}

/** Warehousing service offered in one area, plus each IWS facility there. */
export function serviceAreaJsonLd(area: ServiceArea) {
  const pageUrl = `${siteConfig.url}/locations/${area.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: `Warehousing services in ${area.shortName}`,
        serviceType: "Industrial and manufacturing warehousing",
        description: area.metaDescription,
        url: pageUrl,
        provider: { "@id": `${siteConfig.url}/#organization` },
        areaServed: { "@type": "City", name: `${area.city}, ${area.stateName}` },
      },
      ...locations
        .filter((l) => area.locationIds.includes(l.id))
        .map((l) => ({
          "@type": "LocalBusiness",
          "@id": `${siteConfig.url}/locations#${l.id}`,
          name: `${siteConfig.name} — ${l.label}`,
          parentOrganization: { "@id": `${siteConfig.url}/#organization` },
          description: l.role,
          telephone: siteConfig.phoneHref.replace("tel:", ""),
          url: pageUrl,
          address: {
            "@type": "PostalAddress",
            streetAddress: l.address,
            addressLocality: l.city,
            addressRegion: l.state,
            addressCountry: "US",
          },
        })),
    ],
  };
}

export function servicePageJsonLd(page: LandingPage) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}/services/${page.slug}#service`,
    name: page.eyebrow,
    serviceType: page.eyebrow,
    description: page.metaDescription,
    url: `${siteConfig.url}/services/${page.slug}`,
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed,
  };
}

export function servicesJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": services.map((service) => ({
      "@type": "Service",
      "@id": `${siteConfig.url}/services#${service.id}`,
      serviceType: service.title,
      name: service.title,
      description: service.description,
      provider: { "@id": `${siteConfig.url}/#organization` },
      areaServed,
    })),
  };
}
