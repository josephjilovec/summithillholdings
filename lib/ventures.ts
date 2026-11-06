export type VentureCategory = "Commerce" | "Behavioral" | "Technology" | "Creative" | "Civic";
export type VentureStage = "Concept designed" | "System build" | "Commerce build" | "Creative project" | "Active brand";

export type Venture = {
  slug: string;
  name: string;
  eyebrow: string;
  category: VentureCategory;
  stage: VentureStage;
  status: string;
  summary: string;
  problem: string;
  thesis: string;
  currentState: string;
  founderRole: string;
  nextMilestone: string;
  opportunity: string;
  externalUrl?: string;
  externalLabel?: string;
  art: string;
  heroArt: string;
  accent: string;
  accentSoft: string;
  tags: string[];
};

export const ventures: Venture[] = [
  {
    slug: "my-healthy-aura",
    name: "My Healthy Aura",
    eyebrow: "Behavioral / personal performance",
    category: "Behavioral",
    stage: "Concept designed",
    status: "Previously operated practice",
    summary:
      "A one-to-one personal performance and hypnotherapy practice previously operated by the founder, combining structured routine conditioning, guided behavior design, and individualized client sessions.",
    problem:
      "Many productivity tools organize tasks while leaving resistance, attention drift, motivation, and follow-through largely untouched.",
    thesis:
      "A guided format combining practical behavior design with individualized routines can help clients create more consistent focus and personal follow-through.",
    currentState:
      "Founder previously provided coaching and hypnotherapy under this brand with real client engagements; no longer actively practicing or accepting new clients.",
    founderRole:
      "Founder and practitioner. Service design, behavioral framing, hypnotherapy session structure, and individual client protocols.",
    nextMilestone:
      "Preserve practice methodology and case frameworks as reference models; no active client acquisition.",
    opportunity:
      "Case studies, behavioral research, and methodology insights from historical one-to-one client engagements.",
    externalUrl: "https://myhealthyaura.com/",
    externalLabel: "Visit My Healthy Aura",
    art: "/project-art/aura.svg",
    heroArt: "/project-hero/aura-hero.svg",
    accent: "#8bd5c7",
    accentSoft: "rgba(139,213,199,.14)",
    tags: ["behavioral", "performance", "hypnotherapy", "previously-operated"]
  },
  {
    slug: "swift-deal-solutions",
    name: "Swift Deal Solutions",
    eyebrow: "Private transaction venture",
    category: "Commerce",
    stage: "Concept designed",
    status: "In Development",
    summary:
      "A structured sourcing, qualification, and transaction matching venture for qualified participants in fragmented, high-value asset markets.",
    problem:
      "High-value transactions often depend on slow discovery, inconsistent screening, and informal coordination across multiple parties.",
    thesis:
      "A disciplined sourcing workflow, qualification layer, and transaction process can reduce friction for owners and serious buyers without replacing licensed specialists where required.",
    currentState:
      "Transaction sourcing workflow, qualification framework, and initial drafted intermediary and fee agreements are established in active development.",
    founderRole:
      "Venture architecture, deal sourcing workflow, qualification framework, draft intermediary agreement design, and transaction mechanics.",
    nextMilestone:
      "Execute initial sourcing scenarios under drafted intermediary agreements with qualified commercial counterparties.",
    opportunity:
      "Operating partners, market-domain advisers, and participants with qualified high-value private market transactions.",
    externalUrl: "https://swiftdealsolutions.com/",
    externalLabel: "Visit Swift Deal Solutions",
    art: "/project-art/swift.svg",
    heroArt: "/project-hero/swift-hero.svg",
    accent: "#c9a76a",
    accentSoft: "rgba(201,167,106,.15)",
    tags: ["commerce", "transactions", "sourcing", "in-development"]
  },
  {
    slug: "dj-hotwax",
    name: "DJ Hotwax",
    eyebrow: "Independent music identity",
    category: "Creative",
    stage: "Creative project",
    status: "Operating business",
    summary:
      "An independent music project and production catalog spanning jazz, hip-hop, global rhythms, electronic music, and cinematic atmosphere.",
    problem:
      "DJ Hotwax is the creative operating channel in the portfolio: a home for original music, visual worlds, commercial releases, and artist collaboration.",
    thesis:
      "Diverse genres can live under one cohesive artist identity when unified by distinct taste, atmosphere, sequencing, and sonic point of view.",
    currentState:
      "Active creative operating activity streaming via DistroKid across Spotify, Apple Music, and major digital platforms, with recurring royalties received.",
    founderRole:
      "Artist, composer, producer, sound design, visual world-building, release strategy, and creative direction.",
    nextMilestone:
      "Continue catalog expansion while selectively pursuing licensing placements, sync agreements, and production collaborations.",
    opportunity:
      "Production collaboration, sync licensing, media placements, visual scoring, and creative partnerships.",
    externalUrl: "https://djhotwax.summithillholdings.com/",
    externalLabel: "Visit DJ Hotwax",
    art: "/project-art/hotwax.svg",
    heroArt: "/project-hero/hotwax-hero.svg",
    accent: "#ff7849",
    accentSoft: "rgba(255,120,73,.15)",
    tags: ["creative", "operating", "music", "distrokid", "licensing"]
  },
  {
    slug: "vanta-helix",
    name: "Vanta Helix",
    eyebrow: "Adaptive interface concept",
    category: "Technology",
    stage: "System build",
    status: "Concept experience",
    summary:
      "A futuristic adaptive-interface concept exploring neural-interface ideas, privacy-forward computing, and ambient personalized experiences.",
    problem:
      "Wearable and ambient computing systems can collect large amounts of personal data while still offering generic feedback and interruptive interfaces.",
    thesis:
      "A future adaptive interface could become more useful by learning personal baselines, keeping sensitive processing local, and changing the environment instead of demanding more screen attention.",
    currentState:
      "The public site is a designed concept experience. Future-facing specifications and launch language are treated here as product storytelling rather than independently verified commercial performance.",
    founderRole:
      "Concept direction, product storytelling, privacy principles, interaction thesis, experience design, and launch framing.",
    nextMilestone:
      "Separate demonstrable software interaction from speculative hardware assumptions and validate one useful adaptive feedback loop.",
    opportunity:
      "Human-computer interaction, BCI, privacy, signal-processing, and product-design collaborators.",
    externalUrl: "https://vantahelix.summithillholdings.com/",
    externalLabel: "Explore Vanta Helix",
    art: "/project-art/vanta.svg",
    heroArt: "/project-hero/vanta-hero.svg",
    accent: "#a18cff",
    accentSoft: "rgba(161,140,255,.15)",
    tags: ["technology", "adaptive", "bci", "product-concept"]
  },
  {
    slug: "cannacore-seeds",
    name: "CannaCore Seeds",
    eyebrow: "Genetics brand + CannaCore Journal editorial",
    category: "Commerce",
    stage: "Active brand",
    status: "Previously operated business",
    summary:
      "A founder-founded cannabis genetics and seed brand with real operating business history, paired with CannaCore Journal, the publication covering cultivar histories and cultivation practices.",
    problem:
      "Genetics markets are crowded with inconsistent documentation, fragmented cultivar histories, and brands that often separate product discovery from useful educational context.",
    thesis:
      "A focused seed brand can become more valuable when the genetics catalog is paired with credible strain history, breeding context, and an editorial voice that treats plant culture seriously.",
    currentState:
      "Founder-owned venture where real commercial activity and transactions occurred; public brand and genetics catalog documented alongside CannaCore Journal editorial archives.",
    founderRole:
      "Founder and owner. Genetics curation, catalog direction, brand architecture, and editorial development.",
    nextMilestone:
      "Preserve catalog assets, brand archives, and genetics documentation as founder-owned IP; no active commercial transactions.",
    opportunity:
      "Genetics documentation, historical strain archives, and culture-focused editorial assets.",
    externalUrl: "https://cannacoreseeds.com/",
    externalLabel: "Visit CannaCore Seeds",
    art: "/project-art/cannacore.svg",
    heroArt: "/project-hero/cannacore-hero.svg",
    accent: "#75d58a",
    accentSoft: "rgba(117,213,138,.14)",
    tags: ["commerce", "genetics", "cannabis", "previously-operated"]
  },
  {
    slug: "snarklogic",
    name: "Snark Logic",
    eyebrow: "MediaTech / comedy R&D + enterprise communications",
    category: "Technology",
    stage: "System build",
    status: "MediaTech platform / private enterprise concept",
    summary:
      "A dual-engine comedy and communications R&D platform: a public algorithmic writers’ room for creators and a private enterprise tone-and-satire firewall for communication risk.",
    problem:
      "Digital creators need high-velocity hook, timing, and narrative iteration without flattening their voice, while enterprises need more human communication without turning wit or satire into unmanaged brand and reputation risk.",
    thesis:
      "The same structured disagreement core—behavioral, cultural, creative, and risk perspectives—can support both content R&D and corporate communication stress-testing when the two products keep separate objectives, data boundaries, and escalation thresholds.",
    currentState:
      "The public Next.js platform has been rebuilt around two product surfaces: Creator R&D and a private Enterprise Communications OS, with an interactive dual-mode workbench and explicit human review gates. Production model integrations and real customer datasets remain future validation work.",
    founderRole:
      "Company pivot, brand architecture, dual-engine product strategy, multi-agent operating model, creator workflow design, enterprise risk framing, and platform direction.",
    nextMilestone:
      "Validate the creator workflow against a real content/retention dataset and separately run one narrow private enterprise communication stress-test pilot with explicit review criteria.",
    opportunity:
      "Digital creators, meme and culture pages, content studios, entertainment brands, corporate communications teams, PR/reputation teams, and private enterprise pilot partners.",
    externalUrl: "https://snarklogic.summithillholdings.com/",
    externalLabel: "Explore Snark Logic",
    art: "/project-art/snark.svg",
    heroArt: "/project-hero/snark-hero.svg",
    accent: "#ff4f8b",
    accentSoft: "rgba(255,79,139,.14)",
    tags: ["technology", "mediatech", "comedy", "content-r&d", "enterprise-comms", "brand-defense"]
  },
  {
    slug: "alder-and-meridian",
    name: "Alder & Meridian",
    eyebrow: "Curated commerce platform",
    category: "Commerce",
    stage: "Commerce build",
    status: "E-commerce platform",
    summary:
      "A premium e-commerce concept built around a tightly curated catalog, restrained presentation, and a fulfillment architecture designed to become more rigorous before live selling is enabled.",
    problem:
      "Many online stores become cluttered marketplaces with weak curation, unclear product trust, and fulfillment logic that is bolted on after the visual brand is finished.",
    thesis:
      "A smaller, deliberately curated catalog can feel more credible when product data, checkout validation, supplier mapping, legal review, and fulfillment controls are treated as part of the product from the beginning.",
    currentState:
      "The repository documents a Next.js App Router commerce build with a typed local catalog, integer-cent prices, an ID/quantity cart, and server-side checkout validation. Live Stripe and supplier ordering are intentionally disabled pending verification and testing.",
    founderRole:
      "Brand concept, catalog direction, commerce architecture, product experience, supplier-integration planning, and launch-readiness framing.",
    nextMilestone:
      "Complete product photography and supplier verification, legal/compliance review, test-mode payments, order storage, fulfillment mapping, and a complete test order before enabling live commerce.",
    opportunity:
      "Supplier relationships, product curation, e-commerce operations, brand partnerships, and launch-readiness collaborators.",
    externalUrl: "https://aldermeridian.summithillholdings.com/",
    externalLabel: "Explore Alder & Meridian",
    art: "/project-art/alder.svg",
    heroArt: "/project-hero/alder-hero.svg",
    accent: "#74a9b8",
    accentSoft: "rgba(116,169,184,.14)",
    tags: ["commerce", "platform", "ecommerce", "curation", "operations"]
  },
  {
    slug: "jentlemens",
    name: "Jentlemens",
    eyebrow: "Menswear / wardrobe systems",
    category: "Commerce",
    stage: "Commerce build",
    status: "Previously operated business",
    summary:
      "A menswear, tailored wardrobe, and premium resale business previously operated by the founder with a physical retail storefront, customer transactions, and wardrobe systems.",
    problem:
      "Men's wardrobes often become collections of disconnected purchases with inconsistent fit, too many near-duplicate options, and little guidance on how pieces combine across work, travel, and everyday life.",
    thesis:
      "A disciplined wardrobe system can reduce choice without reducing usefulness: one recognizable house fit, a permanent tailoring palette, a small set of shirts and accessories, and footwear designed around repeatable combinations rather than endless assortment.",
    currentState:
      "Previously operated physical storefront and menswear resale operation with verified point-of-sale customer transactions; retail location no longer actively operating.",
    founderRole:
      "Founder and owner. Retail operations, Athletic Fit positioning, wardrobe-system design, inventory acquisition, merchandising, and customer styling.",
    nextMilestone:
      "Retain brand assets, trademarks, and wardrobe framework for future licensing or digital reactivation; no ongoing retail storefront.",
    opportunity:
      "Menswear brand assets, wardrobe taxonomy, and historical styling frameworks.",
    externalUrl: "https://jentlemens.summithillholdings.com/",
    externalLabel: "Explore Jentlemens",
    art: "/project-art/jentlemens.svg",
    heroArt: "/project-hero/jentlemens-hero.svg",
    accent: "#a8875a",
    accentSoft: "rgba(168,135,90,.15)",
    tags: ["commerce", "menswear", "fashion", "resale", "previously-operated"]
  },
  {
    slug: "toenail-fungus-survivor-foundation",
    name: "Toenail Fungus Survivor Foundation",
    eyebrow: "Civic / health education + survivor support",
    category: "Civic",
    stage: "Concept designed",
    status: "Founding-stage public-interest concept",
    summary:
      "A public-interest project focused on practical toenail-fungus education, lived-experience stories, professional-care pathways, and community support without shame or miracle-cure marketing.",
    problem:
      "Toenail fungus is a real and often persistent health problem, but people may also avoid discussing it because they feel embarrassed, while online information mixes useful guidance with stigma, anecdote, and unsupported claims.",
    thesis:
      "A trusted survivor-centered resource can make an awkward health problem easier to navigate by combining plain-language education, permission-based first-person stories, clinical review, and a clear boundary between information, professional care, and commerce.",
    currentState:
      "The first public website is now built as a founding-stage concept inside the Summit Hill Holdings venture ecosystem. It includes an evidence desk, survivor-story framework, future professional-directory model, and organizational-status disclosure. No clinical partners, survivor counts, certification program, or tax-deductible donation status are claimed.",
    founderRole:
      "Concept architecture, brand positioning, digital platform, community model, evidence-first content structure, partnership criteria, and operating-model design.",
    nextMilestone:
      "Form the organization appropriately, recruit the first clinical reviewers and survivor contributors with permission, build a small evidence library, and validate whether the community and education model creates measurable value before adding monetization.",
    opportunity:
      "Podiatrists, dermatologists, patient advocates, researchers, survivor contributors, digital health educators, nonprofit advisers, and mission-aligned supporters.",
    externalUrl: "https://tfsf.summithillholdings.com/",
    externalLabel: "Visit TFSF",
    art: "/project-art/tfsf.svg",
    heroArt: "/project-art/tfsf.svg",
    accent: "#2F80ED",
    accentSoft: "rgba(47,128,237,.16)",
    tags: ["civic", "health", "education", "support", "onychomycosis", "public-interest"]
  },
  {
    slug: "united-american-future",
    name: "United American Future",
    eyebrow: "Civic / American opportunity",
    category: "Civic",
    stage: "Concept designed",
    status: "Public civic initiative",
    summary:
      "A nonpartisan civic initiative focused on American opportunity, stronger communities, future generations, service, stability, and innovation.",
    problem:
      "Important community needs are often addressed through fragmented programs, short attention cycles, and institutions that struggle to communicate how local action connects to long-term national strength.",
    thesis:
      "A disciplined, nonpartisan civic organization can connect practical community work with a broader story about opportunity, service, resilience, and the country's next chapter.",
    currentState:
      "A full multi-page public website, distinct civic brand system, transparent launch-stage disclosures, and Stripe-enabled support flow are live. Formal organizational, governance, program, and legal claims remain limited to what is actually verified.",
    founderRole:
      "Mission architecture, brand direction, digital platform, program framing, fundraising infrastructure, partnership strategy, and public communication.",
    nextMilestone:
      "Formalize the operating and governance structure, then launch one narrow community initiative with defined objectives, documentation, and public reporting.",
    opportunity:
      "Community organizations, educators, service networks, veterans groups, program advisers, volunteers, and mission-aligned supporters.",
    externalUrl: "https://unitedamericanfuture.summithillholdings.com/",
    externalLabel: "Visit United American Future",
    art: "/project-art/uaf.svg",
    heroArt: "/project-hero/uaf-hero.svg",
    accent: "#e24755",
    accentSoft: "rgba(226,71,85,.15)",
    tags: ["civic", "community", "nonpartisan", "opportunity", "public-interest"]
  },
  {
    slug: "world-forward-foundation",
    name: "World Forward Foundation",
    eyebrow: "Civic / global human progress",
    category: "Civic",
    stage: "Concept designed",
    status: "Public global initiative",
    summary:
      "A global humanitarian initiative connecting practical projects, credible local partners, measurable outcomes, and durable community capacity.",
    problem:
      "Humanitarian work can become disconnected from local context, long-term capacity, transparent evidence, or the people whose lives sit behind the statistics.",
    thesis:
      "A modern global foundation can pair strong human storytelling with disciplined project design, local partnership, measurable outcomes, and transparent reporting.",
    currentState:
      "A full multi-page public website, editorial humanitarian brand system, transparency framework, and Stripe-enabled support flow are live. Programs, partnerships, governance, and organizational status are presented only at the level that can currently be supported.",
    founderRole:
      "Mission design, brand architecture, digital platform, program framework, impact-reporting model, fundraising infrastructure, and partnership development.",
    nextMilestone:
      "Establish the formal operating structure and develop one partner-led pilot with a defined need, delivery model, budget, evidence standard, and public outcome report.",
    opportunity:
      "Humanitarian partners, field organizations, researchers, technical advisers, volunteers, program designers, and mission-aligned supporters.",
    externalUrl: "https://worldforwardfoundation.summithillholdings.com/",
    externalLabel: "Visit World Forward Foundation",
    art: "/project-art/wff.svg",
    heroArt: "/project-hero/wff-hero.svg",
    accent: "#e57a45",
    accentSoft: "rgba(229,122,69,.15)",
    tags: ["civic", "global", "humanitarian", "capacity", "public-interest"]
  }
];

export function getVenture(slug: string) {
  return ventures.find((venture) => venture.slug === slug);
}

export const ventureCategories = ["All", "Technology", "Commerce", "Civic", "Behavioral", "Creative"] as const;
