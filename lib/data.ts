export const siteConfig = {
  name: "IWS",
  fullName: "International Warehouse & Shipping",
  tagline: "Secure and Affordable Storage Solutions",
  phone: "(251) 721-3625",
  phoneHref: "tel:+12517213625",
  salesEmail: "sales@iws.world",
  hrEmail: "hr@iws.world",
  // Must match the primary domain Vercel serves (apex 308s to www), or
  // canonical tags/sitemap point Google at a redirect.
  url: "https://www.iws.world",
  rollingGreenUrl: "https://rollinggreentransportation.com",
};

export type Location = {
  id: string;
  city: string;
  state: string;
  label: string;
  address: string;
  addressLine2: string;
  role: string;
  mapQuery: string;
};

export const locations: Location[] = [
  {
    id: "mobile-hq",
    city: "Mobile",
    state: "AL",
    label: "Corporate Headquarters",
    address: "4320 Downtowner Loop South",
    addressLine2: "Mobile, AL 36609",
    role: "Corporate office and operations headquarters.",
    mapQuery: "4320 Downtowner Loop South, Mobile, AL 36609",
  },
  {
    id: "mobile-brookley-1",
    city: "Mobile",
    state: "AL",
    label: "Brookley Warehouse 1",
    address: "1809 3rd St",
    addressLine2: "Mobile, AL",
    role: "Warehousing and Foreign Trade Zone operations at Brookley Field.",
    mapQuery: "1809 3rd St, Mobile, AL",
  },
  {
    id: "mobile-brookley-2",
    city: "Mobile",
    state: "AL",
    label: "Brookley Warehouse 2",
    address: "2203 Perimeter Rd",
    addressLine2: "Mobile, AL",
    role: "Warehousing and Foreign Trade Zone operations at Brookley Field.",
    mapQuery: "2203 Perimeter Rd, Mobile, AL",
  },
  {
    id: "mobile-conception",
    city: "Mobile",
    state: "AL",
    label: "S Conception St Warehouse",
    address: "857 S Conception St",
    addressLine2: "Mobile, AL",
    role: "Additional warehousing and distribution capacity in Mobile.",
    mapQuery: "857 S Conception St, Mobile, AL",
  },
  {
    id: "pensacola",
    city: "Pensacola",
    state: "FL",
    label: "Pensacola Warehouse",
    address: "8801 Grow Dr",
    addressLine2: "Pensacola, FL",
    role: "Warehousing and manufacturing supply integration serving the Florida Panhandle.",
    mapQuery: "8801 Grow Dr, Pensacola, FL",
  },
  {
    id: "houston",
    city: "Houston",
    state: "TX",
    label: "Houston Warehouse",
    address: "8905 Spikewood Dr",
    addressLine2: "Houston, TX",
    role: "Port-connected warehousing and logistics on the Gulf Coast.",
    mapQuery: "8905 Spikewood Dr, Houston, TX",
  },
];

export function mapHref(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export type Service = {
  id: string;
  title: string;
  summary: string;
  description: string;
};

export const services: Service[] = [
  {
    id: "warehousing",
    title: "Warehousing & Distribution",
    summary: "Secure, flexible storage for raw materials, components, and finished goods.",
    description:
      "Public and contract warehousing across three states, with the space, equipment, and dock capacity to handle industrial-scale freight — from bulk raw materials to oversized manufactured components.",
  },
  {
    id: "ftz",
    title: "Foreign Trade Zone Services",
    summary: "FTZ-designated space that reduces duty costs and speeds up your supply chain.",
    description:
      "Our Foreign Trade Zone capabilities let clients defer, reduce, or eliminate customs duties on imported materials and goods while they're stored or processed — keeping capital and product moving.",
  },
  {
    id: "port-logistics",
    title: "Port & Raw Material Logistics",
    summary: "Working directly with Gulf Coast ports to move raw materials inland.",
    description:
      "We coordinate closely with port operations to receive raw materials and bulk shipments, then store and stage them for efficient delivery into production.",
  },
  {
    id: "transportation",
    title: "Transportation & Drayage",
    summary: "In-house trucking through our sister company, plus a trusted third-party carrier network.",
    description:
      "Rolling Green Transportation, our sister trucking company, provides dedicated drayage and delivery between ports, our warehouses, and manufacturing sites. We supplement that capacity with vetted third-party carriers to keep freight moving on schedule.",
  },
  {
    id: "manufacturing-integration",
    title: "Manufacturing & Component Supply Integration",
    summary: "Built to plug directly into your production and component supply process.",
    description:
      "We integrate into manufacturing storage and component supply processes — sequencing deliveries, staging materials, and managing inventory so production lines stay supplied without interruption.",
  },
  {
    id: "finished-goods",
    title: "Finished Goods Storage & Distribution",
    summary: "Warehousing and outbound distribution for completed products.",
    description:
      "Once production is complete, we store and manage outbound distribution of finished goods, coordinating transportation to their next destination.",
  },
];

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/locations", label: "Locations" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];
