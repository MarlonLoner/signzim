export const serviceCatalog = [
  {
    name: "3D Signage",
    slug: "3d-signage",
    description: "Dimensional lettering, fabricated signs, acrylic signs, and branded facades.",
    seoDescription:
      "Find 3D signage companies in Zimbabwe for shopfront letters, acrylic signs, reception logos, and premium brand installations."
  },
  {
    name: "Lightboxes",
    slug: "lightboxes",
    description: "Illuminated shopfront boxes, menu boards, and indoor display signage.",
    seoDescription:
      "Compare Zimbabwean lightbox specialists for illuminated shopfronts, retail menu boards, indoor displays, and night-visible brand signage."
  },
  {
    name: "Billboards",
    slug: "billboards",
    description: "Large-format outdoor advertising, gantries, hoardings, and highway boards.",
    seoDescription:
      "Discover billboard and outdoor signage providers in Zimbabwe for roadside campaigns, construction hoardings, gantries, and large-format panels."
  },
  {
    name: "Vehicle Branding",
    slug: "vehicle-branding",
    description: "Full wraps, partial wraps, fleet decals, and branded delivery vehicles.",
    seoDescription:
      "Find vehicle branding companies in Zimbabwe for fleet wraps, delivery van graphics, partial wraps, decals, and mobile advertising."
  },
  {
    name: "Pull-up Banners",
    slug: "pull-up-banners",
    description: "Portable banners for launches, conferences, exhibitions, and retail activations.",
    seoDescription:
      "Compare suppliers for pull-up banners in Zimbabwe, including portable exhibition displays, launch banners, and retail activation stands."
  },
  {
    name: "Teardrop Banners",
    slug: "teardrop-banners",
    description: "Outdoor teardrop flags, feather banners, poles, bases, and branded event flags.",
    seoDescription:
      "Find teardrop banner and feather flag providers in Zimbabwe for outdoor promotions, events, activations, and retail forecourts."
  },
  {
    name: "Shopfront Signage",
    slug: "shopfront-signage",
    description: "Retail storefront signs, fascia boards, window graphics, and mall signage.",
    seoDescription:
      "Find shopfront signage companies in Zimbabwe for fascia boards, storefront signs, mall signage, window graphics, and retail branding."
  },
  {
    name: "Reception Signs",
    slug: "reception-signs",
    description: "Premium lobby signs, acrylic wall logos, plaques, and office branding.",
    seoDescription:
      "Compare reception sign makers in Zimbabwe for office wall logos, acrylic plaques, brushed metal signs, and corporate interior branding."
  },
  {
    name: "Directional Signs",
    slug: "directional-signs",
    description: "Wayfinding systems, building directories, road-facing panels, and arrows.",
    seoDescription:
      "Find directional signage and wayfinding providers in Zimbabwe for building directories, arrows, road-facing panels, and site navigation."
  },
  {
    name: "LED Signs",
    slug: "led-signs",
    description: "LED modules, channel letters, display boards, and illuminated brand marks.",
    seoDescription:
      "Compare LED signage companies in Zimbabwe for channel letters, illuminated logos, LED modules, and display boards."
  },
  {
    name: "Vinyl Printing",
    slug: "vinyl-printing",
    description: "Cut vinyl, printed decals, stickers, labels, and short-run promotional graphics.",
    seoDescription:
      "Find vinyl printing companies in Zimbabwe for decals, stickers, labels, cut vinyl, window graphics, and promotional prints."
  },
  {
    name: "Window Frosting",
    slug: "window-frosting",
    description: "Privacy frosting, office glass branding, etched vinyl, and decorative films.",
    seoDescription:
      "Find window frosting and glass branding providers in Zimbabwe for privacy film, etched vinyl, office partitions, and decorative window graphics."
  },
  {
    name: "Safety Signs",
    slug: "safety-signs",
    description: "Mandatory, warning, construction, fire, and workplace compliance signage.",
    seoDescription:
      "Compare safety sign suppliers in Zimbabwe for construction sites, factories, offices, fire signage, warnings, and compliance boards."
  },
  {
    name: "Event Branding",
    slug: "event-branding",
    description: "Stage backdrops, branded tents, flags, banners, expo booths, and launch branding.",
    seoDescription:
      "Find event branding providers in Zimbabwe for stage backdrops, expo booths, branded tents, flags, banners, and launch displays."
  }
] as const;

export const cityCatalog = [
  { name: "Harare", slug: "harare" },
  { name: "Bulawayo", slug: "bulawayo" },
  { name: "Mutare", slug: "mutare" },
  { name: "Gweru", slug: "gweru" },
  { name: "Masvingo", slug: "masvingo" },
  { name: "Chitungwiza", slug: "chitungwiza" }
] as const;

export const cities = cityCatalog.map((city) => city.name);

export const budgetRanges = [
  "Under US$250",
  "US$250 - US$750",
  "US$750 - US$2,500",
  "US$2,500 - US$10,000",
  "US$10,000+"
] as const;

export const timelines = [
  "Urgent: within 7 days",
  "1 - 2 weeks",
  "2 - 4 weeks",
  "1 - 2 months",
  "Still planning"
] as const;

export const packageOptions = [
  { label: "Free Listing", value: "FREE", description: "Company profile, services, contact details, portfolio gallery, and relevant service/city visibility." },
  { label: "Verified Listing", value: "VERIFIED", description: "Everything in Free plus a Verified Provider badge and stronger trust positioning after admin review." },
  { label: "Featured Listing", value: "FEATURED", description: "Everything in Verified plus featured badge, priority placement, higher visibility, and stronger CTAs." }
] as const;

export const companyStatuses = ["PENDING", "APPROVED", "REJECTED", "ARCHIVED"] as const;

export const paymentStatuses = ["NOT_REQUIRED", "PENDING_PAYMENT", "PAID", "EXPIRED"] as const;

export const leadStatuses = ["NEW", "CONTACTED", "SENT_TO_COMPANIES", "CLOSED", "LOST"] as const;
