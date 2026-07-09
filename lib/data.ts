export const serviceGroups = [
  "Signage",
  "Branding & Print",
  "Interior Deco",
  "Shop & Office Fitting",
  "Aluminium Works",
  "Events & Displays"
] as const;

export type ServiceGroup = (typeof serviceGroups)[number];

export const serviceCatalog = [
  {
    name: "3D Signage",
    slug: "3d-signage",
    group: "Signage",
    description: "Dimensional lettering, fabricated signs, acrylic signs, and branded facades.",
    seoDescription:
      "Find 3D signage companies in Zimbabwe for shopfront letters, acrylic signs, reception logos, and premium brand installations."
  },
  {
    name: "Lightboxes",
    slug: "lightboxes",
    group: "Signage",
    description: "Illuminated shopfront boxes, menu boards, and indoor display signage.",
    seoDescription:
      "Compare Zimbabwean lightbox specialists for illuminated shopfronts, retail menu boards, indoor displays, and night-visible brand signage."
  },
  {
    name: "Billboards",
    slug: "billboards",
    group: "Signage",
    description: "Large-format outdoor advertising, gantries, hoardings, and highway boards.",
    seoDescription:
      "Discover billboard and outdoor signage providers in Zimbabwe for roadside campaigns, construction hoardings, gantries, and large-format panels."
  },
  {
    name: "Vehicle Branding",
    slug: "vehicle-branding",
    group: "Branding & Print",
    description: "Full wraps, partial wraps, fleet decals, and branded delivery vehicles.",
    seoDescription:
      "Find vehicle branding companies in Zimbabwe for fleet wraps, delivery van graphics, partial wraps, decals, and mobile advertising."
  },
  {
    name: "Pull-up Banners",
    slug: "pull-up-banners",
    group: "Events & Displays",
    description: "Portable banners for launches, conferences, exhibitions, and retail activations.",
    seoDescription:
      "Compare suppliers for pull-up banners in Zimbabwe, including portable exhibition displays, launch banners, and retail activation stands."
  },
  {
    name: "Teardrop Banners",
    slug: "teardrop-banners",
    group: "Events & Displays",
    description: "Outdoor teardrop flags, feather banners, poles, bases, and branded event flags.",
    seoDescription:
      "Find teardrop banner and feather flag providers in Zimbabwe for outdoor promotions, events, activations, and retail forecourts."
  },
  {
    name: "Shopfront Signage",
    slug: "shopfront-signage",
    group: "Signage",
    description: "Retail storefront signs, fascia boards, window graphics, and mall signage.",
    seoDescription:
      "Find shopfront signage companies in Zimbabwe for fascia boards, storefront signs, mall signage, window graphics, and retail branding."
  },
  {
    name: "Reception Signs",
    slug: "reception-signs",
    group: "Signage",
    description: "Premium lobby signs, acrylic wall logos, plaques, and office branding.",
    seoDescription:
      "Compare reception sign makers in Zimbabwe for office wall logos, acrylic plaques, brushed metal signs, and corporate interior branding."
  },
  {
    name: "Directional Signs",
    slug: "directional-signs",
    group: "Signage",
    description: "Wayfinding systems, building directories, road-facing panels, and arrows.",
    seoDescription:
      "Find directional signage and wayfinding providers in Zimbabwe for building directories, arrows, road-facing panels, and site navigation."
  },
  {
    name: "LED Signs",
    slug: "led-signs",
    group: "Signage",
    description: "LED modules, channel letters, display boards, and illuminated brand marks.",
    seoDescription:
      "Compare LED signage companies in Zimbabwe for channel letters, illuminated logos, LED modules, and display boards."
  },
  {
    name: "Vinyl Printing",
    slug: "vinyl-printing",
    group: "Branding & Print",
    description: "Cut vinyl, printed decals, stickers, labels, and short-run promotional graphics.",
    seoDescription:
      "Find vinyl printing companies in Zimbabwe for decals, stickers, labels, cut vinyl, window graphics, and promotional prints."
  },
  {
    name: "Window Frosting",
    slug: "window-frosting",
    group: "Branding & Print",
    description: "Privacy frosting, office glass branding, etched vinyl, and decorative films.",
    seoDescription:
      "Find window frosting and glass branding providers in Zimbabwe for privacy film, etched vinyl, office partitions, and decorative window graphics."
  },
  {
    name: "Safety Signs",
    slug: "safety-signs",
    group: "Signage",
    description: "Mandatory, warning, construction, fire, and workplace compliance signage.",
    seoDescription:
      "Compare safety sign suppliers in Zimbabwe for construction sites, factories, offices, fire signage, warnings, and compliance boards."
  },
  {
    name: "Event Branding",
    slug: "event-branding",
    group: "Events & Displays",
    description: "Stage backdrops, branded tents, flags, banners, expo booths, and launch branding.",
    seoDescription:
      "Find event branding providers in Zimbabwe for stage backdrops, expo booths, branded tents, flags, banners, and launch displays."
  },
  {
    name: "Interior Deco",
    slug: "interior-deco",
    group: "Interior Deco",
    description: "Commercial interior styling, finishes, brand-led decor, and customer-facing spaces.",
    seoDescription:
      "Find interior deco providers in Zimbabwe for salons, offices, reception areas, retail spaces, brand-led finishes, and customer-facing interiors."
  },
  {
    name: "Shop Fitting",
    slug: "shop-fitting",
    group: "Shop & Office Fitting",
    description: "Retail fit-outs, counters, shelving, display zones, and shop-ready fixtures.",
    seoDescription:
      "Find shop fitting providers in Zimbabwe for retail fit-outs, counters, shelving, display zones, and branded customer spaces."
  },
  {
    name: "Office Fitting",
    slug: "office-fitting",
    group: "Shop & Office Fitting",
    description: "Office fit-outs, work areas, reception layouts, partitions, and branded office environments.",
    seoDescription:
      "Compare office fitting providers in Zimbabwe for workspaces, reception areas, partitions, branded interiors, and customer-facing offices."
  },
  {
    name: "Retail Displays",
    slug: "retail-displays",
    group: "Events & Displays",
    description: "Product displays, merchandising fixtures, promotional stands, and retail presentation zones.",
    seoDescription:
      "Find retail display providers in Zimbabwe for product displays, merchandising fixtures, promotional stands, and branded retail presentation."
  },
  {
    name: "Reception Branding",
    slug: "reception-branding",
    group: "Interior Deco",
    description: "Reception walls, lobby logos, front desk finishes, and branded welcome areas.",
    seoDescription:
      "Find reception branding providers in Zimbabwe for lobby walls, front desk branding, reception logos, and polished welcome areas."
  },
  {
    name: "Wall Branding",
    slug: "wall-branding",
    group: "Branding & Print",
    description: "Wall graphics, murals, branded feature walls, vinyl applications, and customer-facing interiors.",
    seoDescription:
      "Find wall branding providers in Zimbabwe for wall graphics, murals, branded feature walls, vinyl applications, and interior brand environments."
  },
  {
    name: "Custom Counters",
    slug: "custom-counters",
    group: "Shop & Office Fitting",
    description: "Reception counters, checkout counters, service desks, and custom commercial fittings.",
    seoDescription:
      "Find custom counter makers in Zimbabwe for reception counters, checkout counters, service desks, and commercial fittings."
  },
  {
    name: "Shelving Installation",
    slug: "shelving-installation",
    group: "Shop & Office Fitting",
    description: "Retail shelving, stock displays, wall shelves, and practical customer-facing storage.",
    seoDescription:
      "Find shelving installation providers in Zimbabwe for retail shelving, displays, wall shelves, and practical commercial storage."
  },
  {
    name: "Glass Partitions",
    slug: "glass-partitions",
    group: "Shop & Office Fitting",
    description: "Glass office partitions, privacy divisions, meeting rooms, and modern interior separation.",
    seoDescription:
      "Find glass partition providers in Zimbabwe for offices, meeting rooms, reception areas, and modern commercial interiors."
  },
  {
    name: "Office Partitions",
    slug: "office-partitions",
    group: "Shop & Office Fitting",
    description: "Office dividers, privacy partitions, workspace zoning, and functional interior layouts.",
    seoDescription:
      "Find office partition providers in Zimbabwe for workspace zoning, privacy dividers, office layouts, and commercial fit-outs."
  },
  {
    name: "Lighting & Ambience",
    slug: "lighting-ambience",
    group: "Interior Deco",
    description: "Decorative lighting, ambience planning, feature lighting, and retail mood-setting.",
    seoDescription:
      "Find lighting and ambience providers in Zimbabwe for feature lighting, commercial mood-setting, retail interiors, and branded spaces."
  },
  {
    name: "Wallpaper & Wall Finishes",
    slug: "wallpaper-wall-finishes",
    group: "Interior Deco",
    description: "Wallpaper, textured finishes, branded wall treatments, and decorative commercial surfaces.",
    seoDescription:
      "Find wallpaper and wall finish providers in Zimbabwe for commercial interiors, branded walls, textured finishes, and decorative surfaces."
  },
  {
    name: "Exhibition Stands",
    slug: "exhibition-stands",
    group: "Events & Displays",
    description: "Expo booths, modular stands, branded counters, backdrops, and exhibition environments.",
    seoDescription:
      "Find exhibition stand providers in Zimbabwe for expo booths, modular stands, branded counters, backdrops, and launch environments."
  },
  {
    name: "Display Stands",
    slug: "display-stands",
    group: "Events & Displays",
    description: "Freestanding display stands, product stands, brochure stands, and promotional fixtures.",
    seoDescription:
      "Find display stand providers in Zimbabwe for product stands, brochure stands, promotional fixtures, and branded retail displays."
  },
  {
    name: "POP Displays",
    slug: "pop-displays",
    group: "Events & Displays",
    description: "Point-of-purchase displays, campaign fixtures, product promoters, and retail activation displays.",
    seoDescription:
      "Find POP display providers in Zimbabwe for point-of-purchase displays, campaign fixtures, retail activations, and product promotions."
  },
  {
    name: "Ceiling & Lighting Features",
    slug: "ceiling-lighting-features",
    group: "Interior Deco",
    description: "Decorative ceiling features, light coves, statement lighting, and branded interior focal points.",
    seoDescription:
      "Find ceiling and lighting feature providers in Zimbabwe for decorative ceilings, light coves, statement lighting, and branded interior focal points."
  },
  {
    name: "Kitchen Fitting",
    slug: "kitchen-fitting",
    group: "Shop & Office Fitting",
    description: "Kitchen installations, cabinetry fitting, counters, finishes, and practical food-service layouts.",
    seoDescription: "Find kitchen fitting providers in Zimbabwe for commercial kitchens, cabinetry, counters, finishes, and fitted kitchen installations."
  },
  {
    name: "Custom Kitchens",
    slug: "custom-kitchens",
    group: "Shop & Office Fitting",
    description: "Custom kitchen design, manufacturing, fitting, cabinetry, storage, and worktop installations.",
    seoDescription: "Compare custom kitchen providers in Zimbabwe for cabinets, worktops, storage, fitting, and commercial or residential-style kitchen projects."
  },
  {
    name: "Kitchen Cabinets",
    slug: "kitchen-cabinets",
    group: "Shop & Office Fitting",
    description: "Kitchen cabinet manufacturing, installation, doors, drawers, shelving, and fitted storage.",
    seoDescription: "Find kitchen cabinet makers and fitters in Zimbabwe for cabinet installation, drawers, shelving, doors, and fitted storage."
  },
  {
    name: "Built-in Cupboards",
    slug: "built-in-cupboards",
    group: "Shop & Office Fitting",
    description: "Built-in cupboards, storage walls, wardrobe-style fittings, and practical interior storage.",
    seoDescription: "Find built-in cupboard providers in Zimbabwe for fitted storage, wardrobe-style units, shelving, and interior cabinetry."
  },
  {
    name: "Office Fit-outs",
    slug: "office-fit-outs",
    group: "Shop & Office Fitting",
    description: "Complete office fit-outs, reception areas, workspace planning, partitions, furniture and branded finishes.",
    seoDescription: "Compare office fit-out providers in Zimbabwe for workspaces, reception areas, partitions, furniture, and branded office interiors."
  },
  {
    name: "Drywall Partitions",
    slug: "drywall-partitions",
    group: "Shop & Office Fitting",
    description: "Drywall partitioning, room divisions, office zoning, privacy walls, and commercial interior separation.",
    seoDescription: "Find drywall partition providers in Zimbabwe for office divisions, room partitions, privacy walls, and commercial interior layouts."
  },
  {
    name: "Aluminium Partitions",
    slug: "aluminium-partitions",
    group: "Aluminium Works",
    description: "Aluminium-framed partitions, glass divisions, office separation, and shop interior partition systems.",
    seoDescription: "Find aluminium partition providers in Zimbabwe for framed glass partitions, office divisions, and shop interior separation."
  },
  {
    name: "Aluminium Works",
    slug: "aluminium-works",
    group: "Aluminium Works",
    description: "Aluminium fabrication, windows, doors, shopfronts, frames, partitions, and glass installations.",
    seoDescription: "Find aluminium works providers in Zimbabwe for windows, doors, shopfronts, frames, partitions, and glass installations."
  },
  {
    name: "Aluminium Windows",
    slug: "aluminium-windows",
    group: "Aluminium Works",
    description: "Aluminium window supply, fabrication, replacement, and installation for shops, offices, and properties.",
    seoDescription: "Compare aluminium window providers in Zimbabwe for fabrication, replacement, supply, and installation."
  },
  {
    name: "Aluminium Doors",
    slug: "aluminium-doors",
    group: "Aluminium Works",
    description: "Aluminium doors, sliding doors, entry systems, glass doors, and commercial doorway installations.",
    seoDescription: "Find aluminium door providers in Zimbabwe for sliding doors, glass doors, commercial entry systems, and installations."
  },
  {
    name: "Aluminium Shopfronts",
    slug: "aluminium-shopfronts",
    group: "Aluminium Works",
    description: "Aluminium shopfront systems, glass facades, display windows, and retail frontage installations.",
    seoDescription: "Find aluminium shopfront providers in Zimbabwe for retail facades, glass frontage, display windows, and commercial entrances."
  },
  {
    name: "Aluminium Frames",
    slug: "aluminium-frames",
    group: "Aluminium Works",
    description: "Aluminium frames for windows, doors, partitions, shopfronts, and glass installations.",
    seoDescription: "Compare aluminium frame providers in Zimbabwe for doors, windows, partitions, shopfronts, and glass installations."
  },
  {
    name: "Glass & Aluminium Installations",
    slug: "glass-aluminium-installations",
    group: "Aluminium Works",
    description: "Glass and aluminium installation teams for shopfronts, offices, partitions, doors, and windows.",
    seoDescription: "Find glass and aluminium installers in Zimbabwe for shopfronts, partitions, windows, doors, and office fit-outs."
  },
  {
    name: "Exhibition Booths",
    slug: "exhibition-booths",
    group: "Events & Displays",
    description: "Exhibition booth design, branded stands, launch spaces, expo counters, and trade show environments.",
    seoDescription: "Find exhibition booth providers in Zimbabwe for branded booths, expo counters, trade show displays, and launch environments."
  },
  {
    name: "Trade Show Displays",
    slug: "trade-show-displays",
    group: "Events & Displays",
    description: "Trade show displays, promotional counters, backdrops, modular displays, and branded expo presentation.",
    seoDescription: "Compare trade show display providers in Zimbabwe for expo booths, backdrops, counters, modular displays, and branded stands."
  },
  {
    name: "Wall Finishes",
    slug: "wall-finishes",
    group: "Interior Deco",
    description: "Decorative wall finishes, textured surfaces, branded walls, paint effects, and commercial feature walls.",
    seoDescription: "Find wall finish providers in Zimbabwe for textured walls, branded surfaces, decorative finishes, and commercial interiors."
  },
  {
    name: "Wallpaper Installation",
    slug: "wallpaper-installation",
    group: "Interior Deco",
    description: "Wallpaper supply and installation, feature walls, decorative finishes, and commercial wall treatments.",
    seoDescription: "Find wallpaper installation providers in Zimbabwe for feature walls, commercial interiors, wall treatments, and decorative finishes."
  },
  {
    name: "Reception Design",
    slug: "reception-design",
    group: "Interior Deco",
    description: "Reception design, front desk planning, welcome areas, branded walls, seating zones, and first-impression spaces.",
    seoDescription: "Compare reception design providers in Zimbabwe for welcome areas, front desks, branded walls, and commercial reception spaces."
  },
  {
    name: "Commercial Interior Styling",
    slug: "commercial-interior-styling",
    group: "Interior Deco",
    description: "Commercial styling, decor direction, customer-facing interiors, finishes, displays, lighting and brand-led spaces.",
    seoDescription: "Find commercial interior styling providers in Zimbabwe for customer-facing spaces, brand-led decor, displays, lighting, and finishes."
  },] as const satisfies ReadonlyArray<{
  name: string;
  slug: string;
  group: ServiceGroup;
  description: string;
  seoDescription: string;
}>;

export const groupedServiceCatalog = serviceGroups.map((group) => ({
  group,
  services: serviceCatalog.filter((service) => service.group === group)
}));

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
  {
    label: "Free Listing",
    value: "FREE",
    description:
      "Company profile, services, contact details, portfolio gallery, and relevant service/city visibility."
  },
  {
    label: "Verified Listing",
    value: "VERIFIED",
    description:
      "Everything in Free plus a Verified Provider badge and stronger trust positioning after admin review."
  },
  {
    label: "Featured Listing",
    value: "FEATURED",
    description:
      "Everything in Verified plus featured badge, priority placement, higher visibility, and stronger CTAs."
  }
] as const;

export const companyStatuses = ["PENDING", "APPROVED", "REJECTED", "ARCHIVED"] as const;

export const paymentStatuses = ["NOT_REQUIRED", "PENDING_PAYMENT", "PAID", "EXPIRED"] as const;

export const leadStatuses = ["NEW", "CONTACTED", "SENT_TO_COMPANIES", "CLOSED", "LOST"] as const;




