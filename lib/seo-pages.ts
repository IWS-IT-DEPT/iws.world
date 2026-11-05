// Content for the SEO landing pages: one per warehouse service area
// (/locations/[area]) and one per core service keyword (/services/[slug]).
//
// Only state facts IWS can stand behind. Place names (ports, industrial
// parks, corridors) describe the region served; they are not claims about
// specific clients or facility features.

export type Faq = { q: string; a: string };

export type ContentSection = {
  heading: string;
  body: string[];
  items?: { title: string; text: string }[];
};

export type LandingPage = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  eyebrow: string;
  h1: string;
  intro: string;
  image: { src: string; alt: string };
  sections: ContentSection[];
  faqs: Faq[];
  ctaTitle: string;
  ctaDescription: string;
};

export type ServiceArea = LandingPage & {
  city: string;
  state: string;
  stateName: string;
  /** Short name for links, e.g. "Mobile, AL" */
  shortName: string;
  /** One-line summary used on cards and in the footer */
  summary: string;
  locationIds: string[];
};

export const serviceAreas: ServiceArea[] = [
  {
    slug: "mobile-al",
    city: "Mobile",
    state: "AL",
    stateName: "Alabama",
    shortName: "Mobile, AL",
    summary:
      "Four facilities, including Foreign Trade Zone warehousing at Brookley, serving the Port of Mobile and south Alabama manufacturers.",
    locationIds: ["mobile-hq", "mobile-brookley-1", "mobile-brookley-2", "mobile-conception"],
    metaTitle: "Mobile, AL Warehousing Services | Industrial & FTZ Warehouse",
    metaDescription:
      "Industrial and manufacturing warehousing in Mobile, Alabama. Four IWS facilities, including Foreign Trade Zone space at Brookley, serving the Port of Mobile and Gulf Coast manufacturers.",
    keywords: [
      "Mobile AL warehouse",
      "warehousing services Mobile Alabama",
      "industrial warehousing Mobile AL",
      "Foreign Trade Zone warehouse Mobile",
      "Port of Mobile warehousing",
      "Brookley warehouse",
    ],
    eyebrow: "Mobile, Alabama",
    h1: "Industrial & manufacturing warehousing in Mobile, AL",
    intro:
      "Mobile is home base for International Warehouse & Shipping. Our corporate headquarters and three warehouses, two of them with Foreign Trade Zone operations at Brookley Field, give manufacturers and industrial shippers port-connected storage, FTZ services, and delivery into production across south Alabama and the Gulf Coast.",
    image: { src: "/images/warehouse-doors.jpg", alt: "IWS warehouse loading dock doors in Mobile, Alabama" },
    sections: [
      {
        heading: "Warehousing services in Mobile",
        body: [
          "IWS receives raw materials and bulk shipments from the port, stores them securely, and stages them for delivery when your production line needs them. Once production is complete, we store finished goods and manage their outbound distribution.",
        ],
        items: [
          { title: "Industrial warehousing", text: "Space and dock capacity for industrial-scale freight, from bulk raw materials to oversized manufactured components." },
          { title: "Foreign Trade Zone warehousing", text: "FTZ operations at our Brookley Warehouse 1 and Brookley Warehouse 2 let clients defer, reduce, or eliminate duties on imported goods." },
          { title: "Manufacturing supply integration", text: "We sequence deliveries and stage components so production lines stay supplied without interruption." },
          { title: "Finished goods storage & distribution", text: "Storage and outbound coordination for completed products headed to their next destination." },
        ],
      },
      {
        heading: "Serving the Port of Mobile and nearby ports",
        body: [
          "We work directly with Gulf Coast ports to receive raw materials and inbound freight, then move it into our warehouses for storage and staging.",
        ],
        items: [
          { title: "Port of Mobile", text: "Alabama's deepwater port, handling container, breakbulk, and bulk cargo. Our Mobile facilities, including Brookley on Mobile Bay, keep port freight close." },
          { title: "Port of Pensacola", text: "About an hour east along I-10, also served by our Pensacola warehouse." },
          { title: "I-10 and I-65 corridors", text: "Mobile sits where I-10 meets I-65, linking the port to markets east, west, and north." },
        ],
      },
      {
        heading: "Industrial hubs we serve around Mobile",
        body: [
          "Our Mobile warehouses support manufacturers and industrial operations throughout Mobile and Baldwin counties and along the Gulf Coast, including:",
        ],
        items: [
          { title: "Brookley Aeroplex", text: "The aerospace and industrial complex at Brookley Field, where two of our FTZ warehouses are located." },
          { title: "Theodore & south Mobile County", text: "The industrial park and waterfront corridor south of downtown Mobile." },
          { title: "North Mobile County", text: "The Saraland, Chickasaw, Axis, and Calvert industrial corridor along the Mobile River and US-43." },
          { title: "Baldwin County", text: "Growing industrial and manufacturing sites in Bay Minette, Loxley, and across the Eastern Shore." },
        ],
      },
    ],
    faqs: [
      { q: "Does IWS offer Foreign Trade Zone warehousing in Mobile, AL?", a: "Yes. Our Brookley Warehouse 1 (1809 3rd St) and Brookley Warehouse 2 (2203 Perimeter Rd) handle warehousing and Foreign Trade Zone operations at Brookley Field in Mobile." },
      { q: "Can IWS receive freight directly from the Port of Mobile?", a: "Yes. We work directly with Gulf Coast ports to receive raw materials and bulk shipments, then store and stage them in our Mobile warehouses for delivery into production." },
      { q: "What kinds of materials do you store in Mobile?", a: "Raw materials, components, and finished goods for industrial and manufacturing clients, including bulk materials and oversized manufactured components." },
      { q: "How do I get a quote for warehousing in Mobile?", a: "Call (251) 721-3625 or send us a message through our contact page with details about your freight, volumes, and timeline, and we'll follow up quickly." },
    ],
    ctaTitle: "Need warehouse space in Mobile, AL?",
    ctaDescription: "Tell us about your freight and timeline, and we'll find the right Mobile facility and setup for you.",
  },
  {
    slug: "pensacola-fl",
    city: "Pensacola",
    state: "FL",
    stateName: "Florida",
    shortName: "Pensacola, FL",
    summary:
      "Warehousing and manufacturing supply integration serving the Port of Pensacola and industrial sites across the Florida Panhandle.",
    locationIds: ["pensacola"],
    metaTitle: "Pensacola, FL Warehousing Services | Industrial Warehouse",
    metaDescription:
      "Industrial and manufacturing warehousing in Pensacola, Florida. IWS stores raw materials, components, and finished goods for manufacturers across the Florida Panhandle, with access to the Ports of Pensacola and Mobile.",
    keywords: [
      "Pensacola FL warehouse",
      "warehousing services Pensacola",
      "industrial warehousing Pensacola FL",
      "manufacturing warehousing Florida Panhandle",
      "Port of Pensacola warehousing",
    ],
    eyebrow: "Pensacola, Florida",
    h1: "Industrial & manufacturing warehousing in Pensacola, FL",
    intro:
      "Our Pensacola warehouse gives manufacturers and industrial shippers in Northwest Florida a local partner for storage, port receiving, and delivery into production, backed by the rest of the IWS network an hour west in Mobile.",
    image: { src: "/images/container-dock.jpg", alt: "Shipping container at an IWS warehouse dock door" },
    sections: [
      {
        heading: "Warehousing services in Pensacola",
        body: [
          "From our facility at 8801 Grow Dr, IWS provides warehousing and manufacturing supply integration for clients across Escambia and Santa Rosa counties and the wider Florida Panhandle.",
        ],
        items: [
          { title: "Industrial warehousing", text: "Secure storage for raw materials, components, and industrial freight, staged and ready for production." },
          { title: "Manufacturing supply integration", text: "We plug into your production and component supply process, sequencing deliveries so lines stay supplied." },
          { title: "Finished goods storage & distribution", text: "Storage and outbound coordination for completed products." },
          { title: "Foreign Trade Zone services", text: "Need FTZ benefits for imported materials? Our Foreign Trade Zone operations are based at Brookley in Mobile, about an hour away." },
        ],
      },
      {
        heading: "Ports serving Pensacola",
        body: [
          "We work directly with Gulf Coast ports to receive inbound raw materials and freight and bring them into storage.",
        ],
        items: [
          { title: "Port of Pensacola", text: "The deepwater port on Pensacola Bay, serving Northwest Florida's industrial and energy sectors." },
          { title: "Port of Mobile", text: "About an hour west along I-10, where IWS operates four facilities, including FTZ warehousing." },
          { title: "Port Panama City", text: "Further east along the Panhandle for clients with freight moving through Bay County." },
        ],
      },
      {
        heading: "Industrial hubs we serve around Pensacola",
        body: [
          "Our Pensacola warehouse supports manufacturers and industrial operations across Northwest Florida and south Alabama, including:",
        ],
        items: [
          { title: "Ellyson Industrial Park", text: "Pensacola's established industrial park north of downtown." },
          { title: "North Escambia & Cantonment", text: "The manufacturing corridor in northern Escambia County." },
          { title: "Santa Rosa County", text: "Industrial sites in Milton and the surrounding area, including the Santa Rosa Industrial Park and Whiting Aviation Park." },
          { title: "I-10 corridor", text: "Connecting Pensacola west to Mobile and east across the Florida Panhandle." },
        ],
      },
    ],
    faqs: [
      { q: "Where is the IWS Pensacola warehouse?", a: "Our Pensacola warehouse is at 8801 Grow Dr, Pensacola, FL. It provides warehousing and manufacturing supply integration for the Florida Panhandle." },
      { q: "Does IWS offer Foreign Trade Zone services in Pensacola?", a: "Our Foreign Trade Zone operations are at our Brookley facilities in Mobile, AL, about an hour west of Pensacola. Contact us to talk through whether FTZ storage makes sense for your imported materials." },
      { q: "Can you deliver materials to manufacturing sites around Pensacola?", a: "Yes. We stage materials in our warehouse and coordinate delivery into production through our network of trusted trucking partners." },
      { q: "How do I get a quote for warehousing in Pensacola?", a: "Call (251) 721-3625 or send us a message through our contact page with your freight details, and we'll follow up quickly." },
    ],
    ctaTitle: "Need warehouse space in Pensacola, FL?",
    ctaDescription: "Tell us what you're storing and where it needs to go, and we'll put together the right setup.",
  },
  {
    slug: "houston-tx",
    city: "Houston",
    state: "TX",
    stateName: "Texas",
    shortName: "Houston, TX",
    summary:
      "Port-connected warehousing and logistics serving Port Houston and industrial operations across the Houston region.",
    locationIds: ["houston"],
    metaTitle: "Houston, TX Warehousing Services | Industrial Warehouse",
    metaDescription:
      "Port-connected industrial and manufacturing warehousing in Houston, Texas. IWS stores and moves raw materials, components, and finished goods for manufacturers across the Houston region and Port Houston.",
    keywords: [
      "Houston TX warehouse",
      "warehousing services Houston",
      "industrial warehousing Houston TX",
      "manufacturing warehousing Houston",
      "Port Houston warehousing",
    ],
    eyebrow: "Houston, Texas",
    h1: "Industrial & manufacturing warehousing in Houston, TX",
    intro:
      "Our Houston warehouse brings IWS's port-connected warehousing and logistics to one of the largest industrial and port regions in the country, giving manufacturers and industrial shippers a partner for storage, port receiving, and delivery into production.",
    image: { src: "/images/crates-flatbed.jpg", alt: "Crated industrial freight staged on a flatbed trailer inside an IWS warehouse" },
    sections: [
      {
        heading: "Warehousing services in Houston",
        body: [
          "From our facility at 8905 Spikewood Dr, IWS provides port-connected warehousing and logistics for industrial and manufacturing clients across the Houston region.",
        ],
        items: [
          { title: "Industrial warehousing", text: "Space and dock capacity for industrial freight, from raw materials to oversized components." },
          { title: "Port & raw material logistics", text: "We receive inbound materials from the port and store and stage them for production." },
          { title: "Manufacturing supply integration", text: "Sequenced deliveries and staged components to keep production lines supplied." },
          { title: "Finished goods storage & distribution", text: "Storage and outbound coordination for completed products." },
        ],
      },
      {
        heading: "Ports serving Houston",
        body: [
          "We work directly with Gulf Coast ports to receive raw materials and inbound freight, then move it into storage.",
        ],
        items: [
          { title: "Port Houston", text: "One of the busiest ports in the United States, with the Barbours Cut and Bayport container terminals along the Houston Ship Channel." },
          { title: "Port Freeport", text: "Deepwater port south of Houston in Brazoria County." },
          { title: "Port of Galveston & Texas City", text: "Additional Galveston Bay ports serving the region's industrial base." },
        ],
      },
      {
        heading: "Industrial hubs we serve around Houston",
        body: [
          "Our Houston warehouse supports manufacturers and industrial operations across the Greater Houston area, including:",
        ],
        items: [
          { title: "Houston Ship Channel corridor", text: "The industrial and petrochemical corridor through Pasadena, Deer Park, La Porte, and Baytown." },
          { title: "Bayport Industrial District", text: "The industrial district next to Port Houston's Bayport terminal." },
          { title: "Northwest Houston", text: "Manufacturing and distribution along US-290, Beltway 8, and the Northwest Freeway corridor." },
          { title: "I-10 and I-45 corridors", text: "Linking Houston east to Louisiana, west to San Antonio, and north to Dallas." },
        ],
      },
    ],
    faqs: [
      { q: "Where is the IWS Houston warehouse?", a: "Our Houston warehouse is at 8905 Spikewood Dr, Houston, TX, providing port-connected warehousing and logistics for the Houston region." },
      { q: "Can IWS receive freight from Port Houston?", a: "Yes. We work directly with Gulf Coast ports to receive raw materials and inbound freight, then store and stage it in our Houston warehouse." },
      { q: "Does IWS offer Foreign Trade Zone services for Houston clients?", a: "Our Foreign Trade Zone operations are at our Brookley facilities in Mobile, AL. Contact us to discuss whether FTZ storage fits your supply chain." },
      { q: "How do I get a quote for warehousing in Houston?", a: "Call (251) 721-3625 or send us a message through our contact page with your freight details, and we'll follow up quickly." },
    ],
    ctaTitle: "Need warehouse space in Houston, TX?",
    ctaDescription: "Tell us about your freight and timeline, and we'll put together the right Houston setup.",
  },
];

export const servicePages: LandingPage[] = [
  {
    slug: "industrial-warehousing",
    metaTitle: "Industrial Warehousing Services | Gulf Coast",
    metaDescription:
      "Industrial warehousing for raw materials, heavy and oversized components, and bulk freight. Port-connected IWS warehouses in Mobile, AL, Pensacola, FL, and Houston, TX, with Foreign Trade Zone services.",
    keywords: [
      "industrial warehousing",
      "industrial warehouse",
      "industrial warehousing services",
      "industrial storage",
      "raw material warehousing",
      "Gulf Coast industrial warehouse",
    ],
    eyebrow: "Industrial warehousing",
    h1: "Industrial warehousing services on the Gulf Coast",
    intro:
      "International Warehouse & Shipping provides industrial warehousing for raw materials, components, and heavy freight, with six port-connected facilities in Mobile, AL, Pensacola, FL, and Houston, TX, and Foreign Trade Zone space at Brookley in Mobile.",
    image: { src: "/images/crates-flatbed.jpg", alt: "Crated industrial freight staged on a flatbed trailer inside an IWS warehouse" },
    sections: [
      {
        heading: "Built for industrial freight",
        body: [
          "Industrial warehousing is different from storing consumer goods. Loads are heavier, materials are bulkier, and timing is tied to a production schedule. IWS has the space, equipment, and dock capacity to handle industrial-scale freight, and the port relationships to receive it straight off the water.",
        ],
        items: [
          { title: "Raw materials & bulk shipments", text: "Received from Gulf Coast ports, stored securely, and staged for production." },
          { title: "Heavy & oversized components", text: "Dock capacity and equipment for large manufactured components and crated freight." },
          { title: "Public & contract warehousing", text: "Flexible public and contract warehousing arrangements across three states." },
          { title: "Foreign Trade Zone storage", text: "Defer, reduce, or eliminate customs duties on imported materials stored at our Brookley FTZ facilities." },
        ],
      },
      {
        heading: "From port to production line",
        body: [
          "We work directly with Gulf Coast ports to receive inbound materials, store them across our warehouse network, and coordinate delivery into production through a network of trusted trucking partners. When production is done, we store and distribute the finished goods too, so you have one partner for the whole flow instead of a chain of vendors.",
        ],
      },
    ],
    faqs: [
      { q: "What is industrial warehousing?", a: "Industrial warehousing is storage and handling built for raw materials, heavy components, and bulk freight used in manufacturing and industrial operations, rather than retail or consumer goods. It requires more dock capacity and equipment, and tight coordination with production schedules." },
      { q: "Where are IWS industrial warehouses located?", a: "IWS operates six facilities: four in Mobile, AL (including FTZ warehouses at Brookley), one in Pensacola, FL, and one in Houston, TX." },
      { q: "Do you offer Foreign Trade Zone industrial storage?", a: "Yes. Our Brookley Warehouse 1 and Brookley Warehouse 2 in Mobile, AL handle Foreign Trade Zone operations, which can defer, reduce, or eliminate duties on imported materials." },
      { q: "How do I get a quote for industrial warehousing?", a: "Call (251) 721-3625 or send us your freight details through our contact page, and we'll follow up quickly." },
    ],
    ctaTitle: "Looking for industrial warehouse space?",
    ctaDescription: "Tell us about your materials, volumes, and timeline, and we'll recommend the right facility and setup.",
  },
  {
    slug: "manufacturing-warehousing",
    metaTitle: "Manufacturing Warehousing & Component Supply",
    metaDescription:
      "Manufacturing warehousing that plugs into your production line: raw material and component storage, sequenced delivery, and finished goods distribution from IWS facilities in Mobile, Pensacola, and Houston.",
    keywords: [
      "manufacturing warehousing",
      "manufacturing warehouse",
      "warehousing for manufacturers",
      "component supply warehousing",
      "finished goods warehousing",
      "production supply logistics",
    ],
    eyebrow: "Manufacturing warehousing",
    h1: "Manufacturing warehousing that plugs into your production line",
    intro:
      "IWS integrates into manufacturers' storage and component supply processes, storing raw materials and components, sequencing deliveries so production lines stay supplied, and storing and distributing finished goods once they come off the line.",
    image: { src: "/images/container-dock.jpg", alt: "Shipping container at an IWS warehouse dock door" },
    sections: [
      {
        heading: "Warehousing built around your production schedule",
        body: [
          "For a manufacturer, the warehouse is part of the production process. A late or missing component can stop a line. IWS works as an extension of your operation, receiving materials from the port, holding inventory close to your plant, and delivering what production needs, when it needs it.",
        ],
        items: [
          { title: "Raw material & component storage", text: "Secure storage for inbound materials and components, staged for production." },
          { title: "Sequenced delivery", text: "Deliveries timed and sequenced to your production schedule so lines stay supplied without interruption." },
          { title: "Inventory management", text: "We manage inventory on your behalf so you can keep plant floor space for production." },
          { title: "Finished goods storage & distribution", text: "Completed products come back into our network for storage and outbound distribution." },
        ],
      },
      {
        heading: "Lower duty costs on imported components",
        body: [
          "If your production depends on imported materials or components, our Foreign Trade Zone operations at Brookley in Mobile, AL can help defer, reduce, or eliminate customs duties while goods are stored or processed, keeping capital and product moving.",
        ],
      },
    ],
    faqs: [
      { q: "What is manufacturing warehousing?", a: "Manufacturing warehousing is storage and logistics designed to support production: holding raw materials and components, delivering them to the line on schedule, and storing and distributing finished goods afterward." },
      { q: "Can IWS integrate with our existing component supply process?", a: "Yes. We're built to plug into manufacturers' storage and component supply processes, sequencing deliveries, staging materials, and managing inventory so production stays supplied." },
      { q: "Do you store finished goods as well as raw materials?", a: "Yes. Once production is complete, we store finished goods and coordinate their outbound distribution." },
      { q: "Where do you provide manufacturing warehousing?", a: "From our facilities in Mobile, AL, Pensacola, FL, and Houston, TX, serving manufacturers across the Gulf Coast." },
    ],
    ctaTitle: "Want warehousing that keeps your line running?",
    ctaDescription: "Tell us about your production process and materials, and we'll show you how IWS fits in.",
  },
];
