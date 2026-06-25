import { PrismaClient, type CompanyStatus, type PackageType, type PaymentStatus, type LeadStatus } from "@prisma/client";
import { serviceCatalog } from "../lib/data";

const prisma = new PrismaClient();

const portfolioImages = [
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80"
];

const companies = [
  {
    name: "Harare Neon Works",
    slug: "harare-neon-works",
    description:
      "Premium illuminated signage studio creating 3D letters, lightboxes, LED shopfronts, and polished reception signs for retail and corporate brands.",
    city: "Harare",
    address: "Samora Machel Avenue, Harare CBD",
    whatsapp: "+263772123456",
    email: "quotes@harareneon.co.zw",
    website: "https://example.com/harare-neon",
    facebookUrl: "https://facebook.com/harareneon",
    logoUrl: "",
    coverImageUrl: portfolioImages[0],
    status: "APPROVED",
    isVerified: true,
    isFeatured: true,
    packageType: "FEATURED",
    contactPerson: "Tariro Moyo",
    services: ["3d-signage", "lightboxes", "led-signs", "shopfront-signage"],
    portfolio: [portfolioImages[0], portfolioImages[2], portfolioImages[3]]
  },
  {
    name: "Bulawayo Fleet Graphics",
    slug: "bulawayo-fleet-graphics",
    description:
      "Vehicle branding and vinyl production team for delivery fleets, buses, trailers, and promotional campaign graphics across Matabeleland.",
    city: "Bulawayo",
    address: "Jason Moyo Street, Bulawayo",
    whatsapp: "+263782234567",
    email: "hello@fleetgraphics.co.zw",
    website: "https://example.com/fleet-graphics",
    facebookUrl: "https://facebook.com/fleetgraphicszw",
    logoUrl: "",
    coverImageUrl: portfolioImages[1],
    status: "APPROVED",
    isVerified: true,
    isFeatured: false,
    packageType: "VERIFIED",
    contactPerson: "Nkosana Ncube",
    services: ["vehicle-branding", "vinyl-printing", "event-branding"],
    portfolio: [portfolioImages[1], portfolioImages[4]]
  },
  {
    name: "Mutare Billboard Co.",
    slug: "mutare-billboard-co",
    description:
      "Outdoor media and large-format signage partner handling billboards, safety boards, hoardings, and directional signs for regional campaigns.",
    city: "Mutare",
    address: "Aerodrome Road, Mutare",
    whatsapp: "+263773345678",
    email: "sales@mutarebillboards.co.zw",
    website: "https://example.com/mutare-billboards",
    facebookUrl: "",
    logoUrl: "",
    coverImageUrl: portfolioImages[2],
    status: "APPROVED",
    isVerified: false,
    isFeatured: true,
    packageType: "FEATURED",
    contactPerson: "Rudo Chikwanda",
    services: ["billboards", "directional-signs", "safety-signs"],
    portfolio: [portfolioImages[2], portfolioImages[5]]
  },
  {
    name: "Gweru Print & Vinyl",
    slug: "gweru-print-vinyl",
    description:
      "Fast-turnaround print shop for pull-up banners, vinyl stickers, teardrop flags, launch branding, and retail promotional materials.",
    city: "Gweru",
    address: "Sixth Street, Gweru",
    whatsapp: "+263774456789",
    email: "studio@gweruprint.co.zw",
    website: "",
    facebookUrl: "https://facebook.com/gweruprintvinyl",
    logoUrl: "",
    coverImageUrl: portfolioImages[3],
    status: "APPROVED",
    isVerified: true,
    isFeatured: false,
    packageType: "VERIFIED",
    contactPerson: "Farai Dube",
    services: ["pull-up-banners", "teardrop-banners", "vinyl-printing", "event-branding"],
    portfolio: [portfolioImages[3], portfolioImages[4]]
  },
  {
    name: "Masvingo Lightbox Studio",
    slug: "masvingo-lightbox-studio",
    description:
      "Shopfront signage workshop focused on lightboxes, reception signs, acrylic lettering, and tidy retail installations for growing businesses.",
    city: "Masvingo",
    address: "Robert Mugabe Way, Masvingo",
    whatsapp: "+263775567890",
    email: "info@masvingolightbox.co.zw",
    website: "https://example.com/masvingo-lightbox",
    facebookUrl: "",
    logoUrl: "",
    coverImageUrl: portfolioImages[4],
    status: "APPROVED",
    isVerified: false,
    isFeatured: false,
    packageType: "FREE",
    contactPerson: "Chipo Matanga",
    services: ["lightboxes", "reception-signs", "shopfront-signage", "window-frosting"],
    portfolio: [portfolioImages[4], portfolioImages[0]]
  },
  {
    name: "Chitungwiza Signs Hub",
    slug: "chitungwiza-signs-hub",
    description:
      "Pending marketplace submission for banners, safety signs, vinyl decals, and small-business signage projects around Chitungwiza.",
    city: "Chitungwiza",
    address: "Makoni Shopping Centre, Chitungwiza",
    whatsapp: "+263776678901",
    email: "admin@signshub.co.zw",
    website: "",
    facebookUrl: "https://facebook.com/chitungwizasignshub",
    logoUrl: "",
    coverImageUrl: portfolioImages[5],
    status: "PENDING",
    isVerified: false,
    isFeatured: false,
    packageType: "FREE",
    contactPerson: "Lloyd Nyoni",
    services: ["pull-up-banners", "safety-signs", "vinyl-printing"],
    portfolio: [portfolioImages[5]]
  },
  {
    name: "Harare Acrylic & Shopfronts",
    slug: "harare-acrylic-shopfronts",
    description:
      "Fabrication team for acrylic shopfront letters, reception logos, frosting, and clean retail fascia boards for salons, pharmacies, and offices.",
    city: "Harare",
    address: "Belvedere Road, Harare",
    whatsapp: "+263777789012",
    email: "projects@acrylicshopfronts.co.zw",
    website: "https://example.com/acrylic-shopfronts",
    facebookUrl: "https://facebook.com/acrylicshopfrontszw",
    logoUrl: "",
    coverImageUrl: portfolioImages[6],
    status: "APPROVED",
    isVerified: true,
    isFeatured: false,
    packageType: "VERIFIED",
    contactPerson: "Anesu Mandizha",
    services: ["3d-signage", "shopfront-signage", "reception-signs", "window-frosting"],
    portfolio: [portfolioImages[6], portfolioImages[8]]
  },
  {
    name: "Bulawayo Safety Signs",
    slug: "bulawayo-safety-signs",
    description:
      "Compliance signage supplier producing fire, construction, hazard, factory, and directional boards for warehouses and industrial sites.",
    city: "Bulawayo",
    address: "Belmont Industrial, Bulawayo",
    whatsapp: "+263778890123",
    email: "orders@byosafetysigns.co.zw",
    website: "",
    facebookUrl: "https://facebook.com/byosafetysigns",
    logoUrl: "",
    coverImageUrl: portfolioImages[7],
    status: "APPROVED",
    isVerified: true,
    isFeatured: false,
    packageType: "VERIFIED",
    contactPerson: "Thandeka Sibanda",
    services: ["safety-signs", "directional-signs", "vinyl-printing"],
    portfolio: [portfolioImages[7], portfolioImages[10]]
  },
  {
    name: "Mutare Vinyl Lab",
    slug: "mutare-vinyl-lab",
    description:
      "Vinyl printing and decal studio handling storefront windows, promotional stickers, labels, and short-run retail graphics.",
    city: "Mutare",
    address: "Second Street, Mutare",
    whatsapp: "+263779901234",
    email: "hello@mutarevinyllab.co.zw",
    website: "https://example.com/mutare-vinyl-lab",
    facebookUrl: "",
    logoUrl: "",
    coverImageUrl: portfolioImages[8],
    status: "APPROVED",
    isVerified: false,
    isFeatured: false,
    packageType: "FREE",
    contactPerson: "Tendai Nyamukapa",
    services: ["vinyl-printing", "window-frosting", "pull-up-banners"],
    portfolio: [portfolioImages[8], portfolioImages[9]]
  },
  {
    name: "Gweru Outdoor Media",
    slug: "gweru-outdoor-media",
    description:
      "Outdoor signage contractor installing billboards, hoardings, wayfinding panels, and campaign boards along Midlands traffic corridors.",
    city: "Gweru",
    address: "Main Street, Gweru",
    whatsapp: "+263780012345",
    email: "bookings@gweruoutdoor.co.zw",
    website: "https://example.com/gweru-outdoor",
    facebookUrl: "https://facebook.com/gweruoutdoormedia",
    logoUrl: "",
    coverImageUrl: portfolioImages[9],
    status: "APPROVED",
    isVerified: true,
    isFeatured: true,
    packageType: "FEATURED",
    contactPerson: "Simbarashe Zhou",
    services: ["billboards", "directional-signs", "event-branding", "safety-signs"],
    portfolio: [portfolioImages[9], portfolioImages[11]]
  },
  {
    name: "Masvingo Events & Banners",
    slug: "masvingo-events-banners",
    description:
      "Event branding supplier for pull-up banners, teardrop flags, branded tents, expo backdrops, and quick campaign print work.",
    city: "Masvingo",
    address: "Josiah Tongogara Avenue, Masvingo",
    whatsapp: "+263781123456",
    email: "sales@masvingoevents.co.zw",
    website: "",
    facebookUrl: "https://facebook.com/masvingoeventsbanners",
    logoUrl: "",
    coverImageUrl: portfolioImages[10],
    status: "APPROVED",
    isVerified: false,
    isFeatured: false,
    packageType: "FREE",
    contactPerson: "Memory Chiwara",
    services: ["event-branding", "pull-up-banners", "teardrop-banners", "vinyl-printing"],
    portfolio: [portfolioImages[10], portfolioImages[3]]
  },
  {
    name: "Chitungwiza Acrylic Signs",
    slug: "chitungwiza-acrylic-signs",
    description:
      "Small-business signage workshop producing lightboxes, acrylic letters, banners, decals, and tidy storefront signs for local retailers.",
    city: "Chitungwiza",
    address: "Town Centre, Chitungwiza",
    whatsapp: "+263782234455",
    email: "studio@chitungwizaacrylic.co.zw",
    website: "https://example.com/chitungwiza-acrylic",
    facebookUrl: "",
    logoUrl: "",
    coverImageUrl: portfolioImages[11],
    status: "APPROVED",
    isVerified: true,
    isFeatured: false,
    packageType: "VERIFIED",
    contactPerson: "Blessing Mataruse",
    services: ["lightboxes", "3d-signage", "pull-up-banners", "shopfront-signage"],
    portfolio: [portfolioImages[11], portfolioImages[6]]
  },
  {
    name: "Harare Interior Fitout Co",
    slug: "harare-interior-fitout-co",
    description:
      "Commercial interior and office fitting team creating branded reception areas, partitions, counters, wall finishes, and customer-facing workspaces.",
    city: "Harare",
    address: "Borrowdale Road, Harare",
    whatsapp: "+263783345566",
    email: "hello@hararefitout.co.zw",
    website: "https://example.com/harare-fitout",
    facebookUrl: "https://facebook.com/hararefitout",
    logoUrl: "",
    coverImageUrl: portfolioImages[0],
    status: "APPROVED",
    isVerified: true,
    isFeatured: true,
    packageType: "FEATURED",
    contactPerson: "Tafadzwa Manyika",
    services: ["interior-deco", "office-fitting", "reception-branding", "office-partitions", "lighting-ambience"],
    portfolio: [portfolioImages[0], portfolioImages[8], portfolioImages[10]]
  },
  {
    name: "Bulawayo Shopfitters",
    slug: "bulawayo-shopfitters",
    description:
      "Retail fitting provider building shop counters, shelving, product displays, branded walls, and practical store layouts for growing retailers.",
    city: "Bulawayo",
    address: "Fife Street, Bulawayo",
    whatsapp: "+263784456677",
    email: "projects@byoshopfitters.co.zw",
    website: "https://example.com/bulawayo-shopfitters",
    facebookUrl: "",
    logoUrl: "",
    coverImageUrl: portfolioImages[1],
    status: "APPROVED",
    isVerified: true,
    isFeatured: true,
    packageType: "FEATURED",
    contactPerson: "Mandla Moyo",
    services: ["shop-fitting", "custom-counters", "shelving-installation", "retail-displays", "wall-branding"],
    portfolio: [portfolioImages[1], portfolioImages[4], portfolioImages[7]]
  },
  {
    name: "Avondale Deco & Displays",
    slug: "avondale-deco-displays",
    description:
      "Salon, boutique, and clinic interior deco studio handling wall branding, display stands, ambience lighting, and branded reception finishes.",
    city: "Harare",
    address: "King George Road, Avondale",
    whatsapp: "+263785567788",
    email: "studio@avondaledeco.co.zw",
    website: "",
    facebookUrl: "https://facebook.com/avondaledeco",
    logoUrl: "",
    coverImageUrl: portfolioImages[2],
    status: "APPROVED",
    isVerified: true,
    isFeatured: false,
    packageType: "VERIFIED",
    contactPerson: "Rumbi Soko",
    services: ["interior-deco", "wall-branding", "retail-displays", "lighting-ambience", "wallpaper-wall-finishes"],
    portfolio: [portfolioImages[2], portfolioImages[6]]
  },
  {
    name: "Mutare Office Partitions",
    slug: "mutare-office-partitions",
    description:
      "Office partition and glass division provider for reception areas, meeting rooms, workspace zoning, and tidy commercial interiors.",
    city: "Mutare",
    address: "Herbert Chitepo Street, Mutare",
    whatsapp: "+263786678899",
    email: "sales@mutarepartitions.co.zw",
    website: "https://example.com/mutare-partitions",
    facebookUrl: "",
    logoUrl: "",
    coverImageUrl: portfolioImages[3],
    status: "APPROVED",
    isVerified: true,
    isFeatured: false,
    packageType: "VERIFIED",
    contactPerson: "Blessing Nyoni",
    services: ["office-partitions", "glass-partitions", "office-fitting", "reception-branding"],
    portfolio: [portfolioImages[3], portfolioImages[9]]
  },
  {
    name: "Gweru Retail Interiors",
    slug: "gweru-retail-interiors",
    description:
      "Retail interiors and merchandising partner for displays, shelves, counters, POP fixtures, wall graphics, and shopfront improvement projects.",
    city: "Gweru",
    address: "Lobengula Avenue, Gweru",
    whatsapp: "+263787789900",
    email: "hello@gweruretailinteriors.co.zw",
    website: "",
    facebookUrl: "https://facebook.com/gweruretailinteriors",
    logoUrl: "",
    coverImageUrl: portfolioImages[4],
    status: "APPROVED",
    isVerified: false,
    isFeatured: false,
    packageType: "FREE",
    contactPerson: "Munashe Chikowore",
    services: ["retail-displays", "pop-displays", "shelving-installation", "custom-counters", "shopfront-signage"],
    portfolio: [portfolioImages[4], portfolioImages[11]]
  },
  {
    name: "Chitungwiza Wall Branding Studio",
    slug: "chitungwiza-wall-branding-studio",
    description:
      "Wall branding and interior graphics studio for salons, schools, offices, shops, churches, clinics, and launch environments.",
    city: "Chitungwiza",
    address: "Zengeza 4, Chitungwiza",
    whatsapp: "+263788890011",
    email: "design@czwallbranding.co.zw",
    website: "https://example.com/chitungwiza-wall-branding",
    facebookUrl: "https://facebook.com/czwallbranding",
    logoUrl: "",
    coverImageUrl: portfolioImages[5],
    status: "APPROVED",
    isVerified: true,
    isFeatured: false,
    packageType: "VERIFIED",
    contactPerson: "Sharon Gwaze",
    services: ["wall-branding", "vinyl-printing", "interior-deco", "wallpaper-wall-finishes", "reception-branding"],
    portfolio: [portfolioImages[5], portfolioImages[8]]
  },
  {
    name: "Masvingo Counters & Shelving",
    slug: "masvingo-counters-shelving",
    description:
      "Custom counter and shelving fabricator producing checkout counters, reception desks, product shelves, and display fittings for small businesses.",
    city: "Masvingo",
    address: "Industrial Road, Masvingo",
    whatsapp: "+263789901122",
    email: "orders@masvingocounters.co.zw",
    website: "",
    facebookUrl: "",
    logoUrl: "",
    coverImageUrl: portfolioImages[6],
    status: "APPROVED",
    isVerified: false,
    isFeatured: false,
    packageType: "FREE",
    contactPerson: "Tawanda Mupfumi",
    services: ["custom-counters", "shelving-installation", "shop-fitting", "display-stands"],
    portfolio: [portfolioImages[6], portfolioImages[10]]
  }
] as const;

const demoLeads = [
  {
    customerName: "Nyasha Chari",
    phone: "+263771111222",
    email: "nyasha@example.com",
    city: "Harare",
    serviceNeeded: "3D Signage",
    projectDescription: "Need illuminated 3D letters for a new pharmacy storefront in Avondale.",
    budgetRange: "US$750 - US$2,500",
    timeline: "2 - 4 weeks",
    referenceImageUrl: "",
    leadSource: "request-quote-page",
    adminNotes: "Follow up with two Harare illuminated signage providers.",
    status: "NEW"
  },
  {
    customerName: "Kuda Logistics",
    phone: "+263772222333",
    email: "ops@kudalogistics.example",
    city: "Bulawayo",
    serviceNeeded: "Vehicle Branding",
    projectDescription: "Brand five delivery vans with full side graphics and contact details.",
    budgetRange: "US$2,500 - US$10,000",
    timeline: "1 - 2 months",
    referenceImageUrl: "",
    leadSource: "company-profile:bulawayo-fleet-graphics",
    adminNotes: "Customer asked for fleet-branding examples before final quote.",
    status: "CONTACTED"
  },
  {
    customerName: "Makanaka Events",
    phone: "+263773333444",
    email: "",
    city: "Gweru",
    serviceNeeded: "Event Branding",
    projectDescription: "Require pull-up banners, stage backdrop, and teardrop banners for a launch.",
    budgetRange: "US$750 - US$2,500",
    timeline: "1 - 2 weeks",
    referenceImageUrl: "",
    leadSource: "service-page:event-branding",
    adminNotes: "Route to banner and event branding companies after admin review.",
    status: "SENT_TO_COMPANIES"
  }
] as const;

async function main() {
  for (const service of serviceCatalog) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {
        name: service.name,
        description: service.description
      },
      create: {
        name: service.name,
        slug: service.slug,
        description: service.description
      }
    });
  }

  for (const [index, company] of companies.entries()) {
    const profileViewCount =
      company.status === "PENDING"
        ? 18
        : company.isFeatured
          ? 420 - index * 18
          : company.isVerified
            ? 190 - index * 7
            : 82 - index * 3;
    const whatsappClickCount =
      company.status === "PENDING"
        ? 2
        : company.isFeatured
          ? 58 - index * 3
          : company.isVerified
            ? 28 - index
            : 12 - Math.floor(index / 2);
    const paymentStatus =
      company.status === "PENDING"
        ? "PENDING_PAYMENT"
        : company.packageType === "FEATURED"
          ? "PAID"
          : company.packageType === "VERIFIED"
            ? "PENDING_PAYMENT"
            : "NOT_REQUIRED";
    const paidUntil =
      paymentStatus === "PAID"
        ? new Date("2026-12-31T00:00:00.000Z")
        : null;
    const companyData = {
      name: company.name,
      description: company.description,
      logoUrl: company.logoUrl || null,
      coverImageUrl: company.coverImageUrl,
      city: company.city,
      address: company.address,
      whatsapp: company.whatsapp,
      email: company.email,
      website: company.website || null,
      facebookUrl: company.facebookUrl || null,
      status: company.status as CompanyStatus,
      isVerified: company.isVerified,
      isFeatured: company.isFeatured,
      packageType: company.packageType as PackageType,
      contactPerson: company.contactPerson,
      paymentStatus: paymentStatus as PaymentStatus,
      paymentReference: paymentStatus === "PAID" ? `MANUAL-${index + 1001}` : null,
      paidUntil,
      adminNotes:
        company.packageType === "FEATURED"
          ? "Featured package selected. Confirm manual payment before extending placement."
          : company.status === "PENDING"
            ? "Pending review. Needs owner follow-up and portfolio check."
            : null
    };

    const savedCompany = await prisma.company.upsert({
      where: { slug: company.slug },
      update: companyData,
      create: {
        ...companyData,
        slug: company.slug,
        profileViewCount: Math.max(profileViewCount, 8),
        whatsappClickCount: Math.max(whatsappClickCount, 1)
      }
    });

    const services = await prisma.service.findMany({
      where: {
        slug: { in: [...company.services] }
      },
      select: { id: true }
    });

    await prisma.companyService.createMany({
      data: services.map((service) => ({
        companyId: savedCompany.id,
        serviceId: service.id
      })),
      skipDuplicates: true
    });

    for (const [imageIndex, imageUrl] of company.portfolio.entries()) {
      const caption = `${company.name} project ${imageIndex + 1}`;
      const existingImage = await prisma.portfolioImage.findFirst({
        where: {
          companyId: savedCompany.id,
          imageUrl
        },
        select: { id: true }
      });

      if (existingImage) {
        await prisma.portfolioImage.update({
          where: { id: existingImage.id },
          data: { caption }
        });
      } else {
        await prisma.portfolioImage.create({
          data: {
            companyId: savedCompany.id,
            imageUrl,
            caption
          }
        });
      }
    }
  }

  for (const lead of demoLeads) {
    const existingLead = await prisma.lead.findFirst({
      where: {
        phone: lead.phone,
        serviceNeeded: lead.serviceNeeded
      },
      select: { id: true }
    });
    const leadData = {
      ...lead,
      email: lead.email || null,
      referenceImageUrl: lead.referenceImageUrl || null,
      status: lead.status as LeadStatus
    };

    if (existingLead) {
      await prisma.lead.update({
        where: { id: existingLead.id },
        data: leadData
      });
    } else {
      await prisma.lead.create({
        data: leadData
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
