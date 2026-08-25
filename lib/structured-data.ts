import { locations, services, siteConfig } from "@/lib/data";

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
      url: `${siteConfig.url}/locations`,
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
