import { ventures as baseVentures } from "@/lib/ventures";
import type { Venture } from "@/lib/ventures";
import { parsePortfolioVentureList, type VentureLifecycle, type VentureTier, type BusinessStatus } from "@/lib/ventureSchema";

export type PortfolioVenture = Omit<Venture, "stage" | "category"> & {
  stage: string;
  category: Venture["category"] | "Industrial";
};

// Public portfolio links use branded summithillholdings.com subdomains when a project has no dedicated custom domain.
const brandedSubdomains: Record<string, string> = {
  "dj-hotwax": "https://djhotwax.summithillholdings.com/",
  "vanta-helix": "https://vantahelix.summithillholdings.com/",
  snarklogic: "https://snarklogic.summithillholdings.com/",
  "alder-and-meridian": "https://aldermeridian.summithillholdings.com/",
  "united-american-future": "https://unitedamericanfuture.summithillholdings.com/",
  "world-forward-foundation": "https://worldforwardfoundation.summithillholdings.com/"
};

// Stage describes operational maturity. Status remains available as internal portfolio data even when it is not surfaced in the public UI.
const rawPortfolioVentures: PortfolioVenture[] = baseVentures.map((venture) => ({ ...venture, stage: venture.stage, externalUrl: brandedSubdomains[venture.slug] ?? venture.externalUrl }));

const lifecycleBySlug: Record<string, VentureLifecycle> = {
  "givewise-insights": "TEST",
  "payer-delta": "BUILD",
  "atlas-assets": "TEST",
  "autocomp-corp": "TEST",
  "crestline-metals": "DESIGN",
  "my-healthy-aura": "TEST",
  "swift-deal-solutions": "TEST",
  "dj-hotwax": "BUILD",
  "vanta-helix": "BUILD",
  "cannacore-seeds": "BUILD",
  "snarklogic": "BUILD",
  "alder-and-meridian": "BUILD",
  "jentlemens": "BUILD",
  "advibe-central": "TEST",
  "kinetic-aromatics": "TEST",
  "ameliora": "DESIGN",
  "kinora": "BUILD",
  "united-american-future": "DESIGN",
  "toenail-fungus-survivor-foundation": "DESIGN",
  "world-forward-foundation": "DESIGN",
  "everstead-living": "DESIGN",
  "qship-supply-co": "DESIGN",
  "solvanti": "DESIGN",
  "techwater": "DESIGN",
  "motoryn": "DESIGN",
  "experience-elsewhere": "DESIGN"
};

const tierBySlug: Record<string, VentureTier> = {
  "givewise-insights": "Flagship Assets",
  "payer-delta": "Flagship Assets",
  "atlas-assets": "Flagship Assets",
  "autocomp-corp": "Flagship Assets",
  "crestline-metals": "Flagship Assets",

  "my-healthy-aura": "Active Validations",
  "swift-deal-solutions": "Active Validations",
  "dj-hotwax": "Active Validations",
  "vanta-helix": "Active Validations",
  "cannacore-seeds": "Active Validations",
  "snarklogic": "Active Validations",
  "alder-and-meridian": "Active Validations",
  "jentlemens": "Active Validations",
  "advibe-central": "Active Validations",
  "kinetic-aromatics": "Active Validations",
  "ameliora": "Active Validations",
  "kinora": "Active Validations",

  "united-american-future": "Incubation Concepts",
  "toenail-fungus-survivor-foundation": "Incubation Concepts",
  "world-forward-foundation": "Incubation Concepts",
  "everstead-living": "Incubation Concepts",
  "qship-supply-co": "Incubation Concepts",
  "solvanti": "Incubation Concepts",
  "techwater": "Incubation Concepts",
  "motoryn": "Incubation Concepts",
  "experience-elsewhere": "Incubation Concepts"
};

const businessStatusBySlug: Record<string, BusinessStatus> = {
  // Operating Business
  "dj-hotwax": "Operating Business",

  // Available Service
  "givewise-insights": "Available Service",
  "payer-delta": "Available Service",

  // Previously Operated
  "my-healthy-aura": "Previously Operated",
  "cannacore-seeds": "Previously Operated",
  "jentlemens": "Previously Operated",
  "kinetic-aromatics": "Previously Operated",

  // In Development
  "swift-deal-solutions": "In Development",
  "atlas-assets": "In Development",
  "autocomp-corp": "In Development",
  "advibe-central": "In Development",
  "ameliora": "In Development",
  "kinora": "In Development",
  "snarklogic": "In Development",

  // Concept
  "crestline-metals": "Concept",
  "vanta-helix": "Concept",
  "alder-and-meridian": "Concept",
  "united-american-future": "Concept",
  "toenail-fungus-survivor-foundation": "Concept",
  "world-forward-foundation": "Concept",
  "everstead-living": "Concept",
  "qship-supply-co": "Concept",
  "solvanti": "Concept",
  "techwater": "Concept",
  "motoryn": "Concept",
  "experience-elsewhere": "Concept"
};

const payerDelta: PortfolioVenture = {
  slug: "payer-delta",
  name: "Payer Delta Arizona",
  eyebrow: "Healthcare RCM / Contingency Denial Recovery & Intelligence",
  category: "Technology",
  stage: "Denial Recovery & Revenue Integrity Service",
  status: "Available Service",
  summary:
    "An independent denial recovery service for Arizona specialty practices, with a 22% commercial recovery fee on confirmed collections and separately scoped RCM support, payer intelligence, and cash forecasting.",
  problem:
    "Arizona specialty practices and surgery centers can lack the time to investigate unworked denials, assemble supporting records, and respond before the payer's appeal deadline.",
  thesis:
    "A focused recovery service can help existing billing teams review denials, prepare ready-to-sign appeal packets after supporting-record checks, and connect follow-up with ongoing revenue integrity work.",
  currentState:
    "The Payer Delta Arizona website presents a Free Denial Snapshot, a 1-page review with a target 48-hour turnaround after accepted scope and usable inputs, commercial recovery services, and ongoing RCM, payer intelligence, and cash forecasting.",
  founderRole:
    "Service design, payer-policy research workflows, appeal-packet preparation, and revenue operations.",
  nextMilestone:
    "Introduce Free Denial Snapshots to Arizona specialty practices, establish engagement scope and data-handling requirements, and develop ongoing revenue integrity partnerships.",
  opportunity:
    "Arizona medical practices, surgery centers, and specialty billing companies seeking focused denial recovery, proactive payer intelligence, RCM support, and cash visibility.",
  externalUrl: "https://payerdelta.summithillholdings.com",
  externalLabel: "Visit Payer Delta Arizona",
  art: "/project-art/givewise.svg",
  heroArt: "/project-hero/givewise-hero.svg",
  accent: "#3fa7a3",
  accentSoft: "rgba(63,167,163,.15)",
  tags: ["healthcare", "rcm", "denial-management", "appeals", "arizona", "intelligence", "contingency"]
};

const givewiseInsights: PortfolioVenture = {
  slug: "givewise-insights",
  name: "GiveWise Insights",
  eyebrow: "AI & automation for Phoenix-area business owners",
  category: "Technology",
  stage: "AI Advice & Scoped Automation",
  status: "Available Service",
  summary:
    "Independent AI advice and scoped administrative automation for owner-run Phoenix-area businesses, starting with healthcare practices and professional services. Calls are $75 for 30 minutes or $250 for 60 minutes; builds and upkeep are separately quoted.",
  problem:
    "Business owners can see repetitive office work and too many software choices but lack time to determine which AI changes are useful, what information they require, and which decisions must stay with people.",
  thesis:
    "Begin with one owned administrative workflow. Compare the expected benefit with preparation, tool costs, review effort, and risk, then use a written scope for any build or ongoing support.",
  currentState:
    "The public offer ladder lists $75 calls, $250 working sessions, $1,500–$5,000 scoped builds, and $500–$1,500 monthly upkeep. Session length and payment are confirmed separately, and projects need a written quote. The optional $1,500 Works-With-What-You-Have AI Plan retains its distinct advisory checkout. Software and telecom cost review is secondary; no savings percentage, market-rate validation, client outcome, or HIPAA certification is claimed.",
  founderRole:
    "Lead advisor. Workflow qualification, AI project prioritization, scoped administrative automation, evaluation, human approval boundaries, and client handoff.",
  nextMilestone:
    "Validate the owner-led Phoenix-area customer focus through paid, bounded engagements, record actual delivery effort and acceptance, and establish suitable data-handling and support arrangements before expansion.",
  opportunity:
    "Owners of Phoenix-area healthcare practices and professional services firms with a recurring administrative task, a responsible process owner, and a measurable first test. Initial practice examples avoid patient information.",
  externalUrl: "https://givewiseinsights.summithillholdings.com/",
  externalLabel: "Visit GiveWise Insights",
  art: "/project-art/givewise.svg",
  heroArt: "/project-hero/givewise-hero.svg",
  accent: "#3157ff",
  accentSoft: "rgba(49,87,255,.16)",
  tags: ["technology", "ai", "consulting", "automation", "advisory"]
};

const adVibeCentral: PortfolioVenture = {
  slug: "advibe-central",
  name: "AdVibe Central",
  eyebrow: "Advertising entertainment & creative discovery",
  category: "Creative",
  stage: "Interactive Platform",
  status: "Public",
  summary:
    "An advertising-entertainment platform built around discovering, watching, reacting to, rating, saving, sharing, and discussing standout creative work across human, AI, and hybrid production.",
  problem:
    "Most digital products treat advertising as an interruption, while creative advertising itself is scattered across feeds, award sites, agency reels, and brand channels with little shared context for discovery or discussion.",
  thesis:
    "Advertising can become destination content when the platform is designed around entertainment, creative comparison, audience reaction, and transparent distinctions between human, AI, and hybrid production rather than around forced ad exposure.",
  currentState:
    "The public platform concept is live with search and filtering, creative labels, watchlist behavior, detail views, illustrative scoring interfaces, a Creative Wall, Vibe Pulse, brand and agency pathways, and an emerging trust architecture. Demonstration metrics are not presented as verified campaign performance.",
  founderRole:
    "Platform concept, brand architecture, creative-discovery model, interaction design, product strategy, scoring-system direction, trust framework, and digital build.",
  nextMilestone:
    "Move from demonstration creative data to a controlled set of real submissions and audience interactions, then validate which discovery, rating, and discussion mechanics create repeat use.",
  opportunity:
    "Brands, agencies, filmmakers, creative technologists, advertising researchers, creators, and partners interested in the future of advertising as entertainment.",
  externalUrl: "https://advibecentral.com/",
  externalLabel: "Visit AdVibe Central",
  art: "/project-art/advibe.svg",
  heroArt: "/project-hero/advibe-hero.svg",
  accent: "#7c5cff",
  accentSoft: "rgba(124,92,255,.16)",
  tags: ["creative", "advertising", "media", "ai", "discovery"]
};

const kineticAromatics: PortfolioVenture = {
  slug: "kinetic-aromatics",
  name: "Kinetic Aromatics",
  eyebrow: "Active-lifestyle aromatic roll-ons",
  category: "Commerce",
  stage: "Previously Operated",
  status: "Previously operated brand",
  summary:
    "A gym- and active-lifestyle aromatic brand centered on compact essential-oil roll-ons previously developed by the founder as personal scent rituals for before and after training.",
  problem:
    "Gym-bag personal care often splits between fragrance, supplements, and generic wellness products, leaving little room for a compact aromatic ritual positioned specifically around active routines and personal scent.",
  thesis:
    "A focused roll-on format can occupy a distinct active-lifestyle lane when scent profiles, portability, packaging, and the before-and-after workout ritual are treated as one coherent product experience rather than as broad wellness claims.",
  currentState:
    "Physical active-lifestyle aromatic formulations, five-scent product system, and packaging prototypes were previously developed and produced; currently inactive and not in active commercial operation.",
  founderRole:
    "Founder. Brand strategy, category positioning, scent formulation direction, product packaging architecture, and commerce experience design.",
  nextMilestone:
    "Brand and formulation archive preserved as founder-owned intellectual property; no ongoing commercial production.",
  opportunity:
    "Product formulation archives, active-lifestyle brand assets, and scent-system packaging designs.",
  externalUrl: "https://kineticaromatics.summithillholdings.com/",
  externalLabel: "Visit Kinetic Aromatics",
  art: "/project-art/kinetic-botanicals.svg",
  heroArt: "/project-hero/kinetic-botanicals-hero.svg",
  accent: "#b7ef55",
  accentSoft: "rgba(183,239,85,.15)",
  tags: ["commerce", "active-lifestyle", "aromatics", "previously-operated"]
};

const atlasAssets: PortfolioVenture = {
  slug: "atlas-assets",
  name: "Atlas Assets",
  eyebrow: "Cross-border structure simulation & professional coordination",
  category: "Technology",
  stage: "Cross-Border Modeling Platform",
  status: "Public",
  summary:
    "A cross-border structure modeling concept that maps how entities, intellectual property, digital assets, tax residence, banking, custody, and jurisdiction rules interact before consequential implementation decisions are made.",
  problem:
    "Globally distributed companies and asset structures can span residence, operating entities, intellectual property, banking, custody, customers, and counterparties across multiple jurisdictions, making dependencies difficult to evaluate as one system.",
  thesis:
    "A structured simulation and professional-review workflow can make cross-border dependencies easier to inspect before formation, transfer, banking, custody, or tax decisions are handed to the qualified professionals responsible for execution.",
  currentState:
    "The public Next.js experience is deployed with jurisdiction comparison, structure modeling, control rules, and an interactive structure-review pathway. It is presented as scenario modeling and professional coordination rather than legal, tax, securities, fiduciary, banking, or regulated advice.",
  founderRole:
    "Brand architecture, cross-border systems framing, scenario-model design, jurisdiction interface, professional-review workflow, guardrail design, and digital platform development.",
  nextMilestone:
    "Test the structure-review workflow against a narrow set of realistic founder and digital-asset scenarios, then refine the handoff materials with qualified legal, tax, banking, and compliance professionals.",
  opportunity:
    "Cross-border founders, digital-asset operators, international business advisers, legal and tax professionals, banking specialists, and compliance collaborators.",
  externalUrl: "https://atlasassets.summithillholdings.com/",
  externalLabel: "Visit Atlas Assets",
  art: "/project-art/atlas-assets.svg",
  heroArt: "/project-art/atlas-assets.svg",
  accent: "#68d4ff",
  accentSoft: "rgba(104,212,255,.15)",
  tags: ["technology", "cross-border", "structures", "digital-assets", "professional-review"]
};

const autoCompCorp: PortfolioVenture = {
  slug: "autocomp-corp",
  name: "AutoComp Corp",
  eyebrow: "Autonomous compliance operations & evidence systems",
  category: "Technology",
  stage: "Compliance Operations Platform",
  status: "Public",
  summary:
    "A compliance-operations software concept for continuous monitoring, evidence capture, controlled document drafting, and permissioned execution workflows with human authority preserved for consequential decisions.",
  problem:
    "Corporate compliance work is often fragmented across alerts, spreadsheets, evidence requests, policy documents, calendars, and manual follow-up, making it difficult to maintain a continuous operational picture.",
  thesis:
    "A coordinated agent system can reduce repetitive monitoring and evidence work when automation is separated from legal judgment and high-consequence actions remain permissioned to authorized professionals and company officers.",
  currentState:
    "A Next.js product system and readiness-check workflow are built around monitoring, specialized agents, evidence management, control routing, and explicit human approval boundaries. It is not presented as a substitute for legal or regulated professional judgment.",
  founderRole:
    "Product concept, compliance-operations architecture, autonomous-agent model, evidence workflow, permission system, risk framing, and digital platform development.",
  nextMilestone:
    "Validate one narrow compliance workflow end to end with realistic evidence inputs, measurable review time, explicit escalation criteria, and a qualified professional in the approval loop.",
  opportunity:
    "Compliance teams, governance and risk operators, legal-operations professionals, audit and evidence-management partners, and enterprise workflow collaborators.",
  externalUrl: "https://autocompcorp.summithillholdings.com/",
  externalLabel: "Visit AutoComp Corp",
  art: "/project-art/autocomp-corp.svg",
  heroArt: "/project-art/autocomp-corp.svg",
  accent: "#b8ff4a",
  accentSoft: "rgba(184,255,74,.14)",
  tags: ["technology", "compliance", "agents", "evidence", "governance"]
};

const crestlineMetals: PortfolioVenture = {
  slug: "crestline-metals",
  name: "Crestline Metals",
  eyebrow: "Industrial manufacturing / high-performance steel",
  category: "Industrial",
  stage: "Industrial Build Plan",
  status: "Public",
  summary:
    "A planned American industrial manufacturing company focused on high-performance steel, disciplined process control, traceability, dependable supply, demanding specifications, and long-term customer relationships.",
  problem:
    "Industrial customers with demanding steel requirements need more than nominal material specifications: they also depend on process discipline, documentation, traceability, delivery reliability, responsive technical communication, and confidence that the manufacturing system can perform consistently.",
  thesis:
    "A focused domestic steel manufacturer can create a credible premium position by treating process control, specification discipline, quality documentation, traceability, supply responsiveness, and customer communication as part of the product rather than as secondary operating details.",
  currentState:
    "The Crestline Metals public website is live with defined company, capability, market, quality, critical-response, careers, contact, and industry-intelligence positioning. Bethlehem, Pennsylvania is presented as the planned operating base. Manufacturing facilities, production capacity, certifications, customer contracts, defense qualifications, and operating output are not presented as existing achievements.",
  founderRole:
    "Company concept, brand architecture, commercial positioning, public platform, operating-system framing, venture roadmap, and coordination of the technical, industrial, partnership, and capital work required to move from a public company concept toward an operating manufacturer.",
  nextMilestone:
    "Narrow the initial product and process route, validate real buyer requirements, develop the facility, equipment, utility, logistics, permitting, quality-system, and capital plan with qualified industrial and metallurgical specialists, and establish evidence before making operating claims.",
  opportunity:
    "Steelmaking and processing operators, metallurgical and plant engineers, equipment suppliers, industrial customers, energy and logistics partners, economic-development stakeholders, quality-system specialists, and capital partners.",
  externalUrl: "https://crestlinemetals.summithillholdings.com/",
  externalLabel: "Visit Crestline Metals",
  art: "/project-art/crestline-metals.svg",
  heroArt: "/project-art/crestline-metals.svg",
  accent: "#9AA9B5",
  accentSoft: "rgba(154,169,181,.16)",
  tags: ["industrial", "steel", "manufacturing", "quality", "domestic-supply"]
};

const ameliora: PortfolioVenture = {
  slug: "ameliora",
  name: "Amelioras",
  eyebrow: "Living conditions & shared prosperity",
  category: "Civic",
  stage: "Shared Prosperity Model",
  status: "Public venture",
  summary:
    "A for-profit living-conditions improvement platform helping people upgrade home environments, daily routines, and household friction points through accessible pathways, public balance-sheet transparency, and church and nonprofit partnerships.",
  problem:
    "Millions of people feel their living conditions are inadequate, yet standard market solutions polarize between high-cost luxury renovations and emergency crisis relief—leaving everyday friction points in sleep, acoustics, and domestic flow unaddressed.",
  thesis:
    "Practical, accessible upgrades to physical space, air, lighting, acoustics, and daily habits can meaningfully improve how people experience life. By operating as a transparent for-profit that reinvests the majority of surplus, Amelioras scales sustainably alongside community partners.",
  currentState:
    "The foundational operating platform, Living Assessment diagnostic, tiered upgrade pathways, and public balance-sheet architecture are established. Initial priorities focus on regional church benevolence partnerships and local nonprofit co-delivery pilots.",
  founderRole:
    "Venture design, business model formulation, Living Assessment diagnostic architecture, public balance sheet design, governance framework, and partnership models.",
  nextMilestone:
    "Deploy the MVP Living Assessment flow with regional church benevolence ministries and local nonprofit partners, sponsoring the first 50 household upgrade roadmaps.",
  opportunity:
    "Nonprofit leaders, church pastors and benevolence teams, municipal housing authorities, managed care organizations, and community advocates seeking measurable living-standard improvements.",
  externalUrl: "https://amelioras.summithillholdings.com/",
  externalLabel: "Visit Amelioras",
  art: "/project-art/ameliora.svg",
  heroArt: "/project-hero/ameliora-hero.svg",
  accent: "#20A39E",
  accentSoft: "rgba(32,163,158,.15)",
  tags: ["living-conditions", "shared-prosperity", "civic", "impact", "wellbeing", "transparency"]
};

// New venture-studio concepts: public design prototypes, not verified operating businesses.
const eversteadLiving: PortfolioVenture = {
  slug: "everstead-living",
  name: "Everstead Living",
  eyebrow: "Accessible homes / aging-in-place planning",
  category: "Commerce",
  stage: "Concept designed",
  status: "Public design prototype",
  summary:
    "Keep the place you love. Make everyday life work better. A thoughtful planning concept for homeowners and families considering practical, comfortable changes at home.",
  problem:
    "A difficult threshold. A bathroom that no longer fits your routine. Lighting that makes an evening walk down the hall harder than it should be. Home adaptation is often a collection of small decisions before it becomes a building project.",
  thesis:
    "Everstead Living is being designed to turn those concerns into an organized, room-by-room brief: what matters now, what can wait, and which questions need a qualified professional. The starting point is your routine, your priorities, and a home that still feels like yours.",
  currentState:
    "Explore the home one routine at a time: arrival, movement, bathing and evening light. Select rooms, see an illustrative adaptation brief, and prepare a household-planning note. The proposed service remains in development; clinical assessment, technical design and construction require appropriately qualified professionals.",
  founderRole:
    "Venture concept, accessible-living positioning, customer journey, brand and visual direction, preliminary website architecture, and early service-validation planning.",
  nextMilestone:
    "Proposed first cohort: interview 10 households and 3 home-accessibility professionals to identify repeated planning problems. Trial the brief with 5 volunteer households in one local service area, subject to partner availability. Check whether priorities are understood, a professional can act on the brief, and follow-up questions decrease. These are validation goals, not reported results.",
  opportunity:
    "Initial customers: Homeowners planning ahead. People who want to understand access and comfort before a move, renovation, or change in household needs. Potential collaborators: Occupational therapists, accessibility designers and home-modification contractors interested in a clearer client handoff.",
  externalUrl: "https://eversteadliving.summithillholdings.com",
  externalLabel: "Explore Everstead Living",
  art: "/project-hero/everstead-living.webp",
  heroArt: "/project-hero/everstead-living.webp",
  accent: "#9DB5A0",
  accentSoft: "rgba(157,181,160,.16)",
  tags: ["commerce","accessible-living","aging-in-place","home-services","design","concept"]
};

const qshipSupplyCo: PortfolioVenture = {
  slug: "qship-supply-co",
  name: "QShip Supply Co.",
  eyebrow: "B2B logistics / procurement coordination",
  category: "Technology",
  stage: "Concept designed",
  status: "Public design prototype",
  summary:
    "A practical purchasing desk for growing businesses. Bring repeat orders, supplier follow-ups and delivery handoffs into one accountable workflow, starting with a focused manual pilot.",
  problem:
    "For a small distributor or online retailer, an ordinary reorder can involve a quote in one inbox, approval in a chat and a delivery date in somebody’s spreadsheet. The cost is often uncertainty: who owns the next action, and what is actually confirmed?",
  thesis:
    "QShip’s first proposed offer is a managed coordination workflow for recurring, non-regulated business supplies. Start with an agreed supplier list and a single purchasing process. Add software only after the workflow proves useful.",
  currentState:
    "Follow a fictional carton purchase from specification through quote comparison, client approval and a receiving discrepancy. See who owns each next action, then describe one recurring purchasing handoff. This is a proposed coordination pilot; no live orders, supplier inventory, carriage or handling of client funds is offered.",
  founderRole:
    "Business concept, initial workflow taxonomy, B2B product positioning, visual system, interface direction, and early technical architecture.",
  nextMilestone:
    "Proposed discovery: interview 8 small-business operators about recurring supply purchases and approval bottlenecks. Test one category with 3 design-partner businesses for 4 weeks, with written responsibilities and direct supplier payment. Track overdue follow-ups, missing approvals and staff effort against the pre-pilot process. No savings or delivery performance is claimed yet.",
  opportunity:
    "Initial customers: Small distributors. Owner-led businesses reordering packaging, consumables or general operating supplies from recurring suppliers. Potential collaborators: Operators with enough repeat buying to need a process, but no appetite for a large enterprise-system rollout.",
  externalUrl: "https://qshipsupplyco.summithillholdings.com",
  externalLabel: "Explore QShip Supply Co.",
  art: "/project-hero/qship-supply-co.webp",
  heroArt: "/project-hero/qship-supply-co.webp",
  accent: "#A5F5D4",
  accentSoft: "rgba(165,245,212,.15)",
  tags: ["technology","b2b","logistics","procurement","supply-chain","workflow"]
};

const solvanti: PortfolioVenture = {
  slug: "solvanti",
  name: "Solvanti",
  eyebrow: "Home energy / resilience / efficiency",
  category: "Technology",
  stage: "Concept designed",
  status: "Public design prototype",
  summary:
    "Efficiency, solar and backup power solve different problems. Solvanti is a planning concept that helps homeowners organize their needs, compare assumptions and prepare better questions for qualified providers.",
  problem:
    "Lower routine consumption. Keep a few essentials running during an outage. Prepare for an electric vehicle. These are different goals, with different costs and design questions. A product quote rarely answers all of them on its own.",
  thesis:
    "Solvanti’s proposed starting point is a human-reviewed household energy brief. It organizes bill history, priorities and property questions before a homeowner chooses equipment, financing or an installer.",
  currentState:
    "Explore daytime use, evening demand and interruption priorities, then make the assumptions in an illustrative energy example visible. Compare efficiency, solar and backup as different decisions and prepare questions for a qualified provider. The example is not equipment sizing, a system quote or verified household performance.",
  founderRole:
    "Energy-resilience venture framing, brand strategy, experience narrative, early assessment design, product direction, and partner-validation planning.",
  nextMilestone:
    "Proposed discovery: interview 10 homeowners who are comparing efficiency or backup-power options. Review 5 sample household briefs with qualified energy professionals in one initial service region. Measure whether homeowners can explain trade-offs and providers receive the information they need. Savings, payback and uptime remain unverified.",
  opportunity:
    "Initial customers: Homeowners comparing options. People considering efficiency upgrades, solar or storage who want to make assumptions visible before committing. Potential collaborators: Assessors and licensed contractors interested in receiving a more organized account of household goals.",
  externalUrl: "https://solvanti.summithillholdings.com",
  externalLabel: "Explore Solvanti",
  art: "/project-hero/solvanti.webp",
  heroArt: "/project-hero/solvanti.webp",
  accent: "#E7BD77",
  accentSoft: "rgba(231,189,119,.15)",
  tags: ["technology","energy","resilience","home-services","efficiency","concept"]
};

const techwater: PortfolioVenture = {
  slug: "techwater",
  name: "TechWater",
  eyebrow: "Bill-based water reporting",
  category: "Technology",
  stage: "Concept designed",
  status: "Public design prototype",
  summary:
    "Start with the data you already have. TechWater is a reporting concept for property teams that want to understand billed water use, investigate changes and prioritize practical follow-up.",
  problem:
    "A longer billing period, a new tenant, landscape irrigation or a faulty fixture can all change a property’s water use. Looking at the bill total alone makes it difficult to know what deserves attention.",
  thesis:
    "TechWater’s first proposed product is a monthly review built from client-supplied bills or meter exports. It would normalize records by billing duration, document context and flag questions for the property team. Connected sensors can wait until the reporting workflow earns its place.",
  currentState:
    "Trace an illustrative Water Use Review from bill records to daily-normalized consumption, property-context questions and an owned follow-up. Compare totals with daily use and prepare a record-readiness note. All sample records are fictional. Pilot availability and service delivery remain in development; no leak diagnosis or measured savings is claimed.",
  founderRole:
    "Water-technology market exploration, analytics concept, brand positioning, visual language, dashboard experience design, and early product research.",
  nextMilestone:
    "Proposed discovery: work with 3 property operators to understand bill access, units and common data gaps. Test up to 10 properties over 3 reporting cycles, with permission to use records and a named follow-up owner. Track usable records, explained flags and completed site checks. Conservation savings and leak-detection performance are not claimed.",
  opportunity:
    "Initial customers: Small commercial portfolios. Property managers overseeing a handful of offices, retail locations or mixed-use buildings with separate water records. Potential collaborators: Professionals interested in a clearer data handoff before a site visit or equipment assessment.",
  externalUrl: "https://techwater.summithillholdings.com",
  externalLabel: "Explore TechWater",
  art: "/project-art/techwater-report.svg",
  heroArt: "/project-art/techwater-report.svg",
  accent: "#28B8C0",
  accentSoft: "rgba(40,184,192,.15)",
  tags: ["technology","water","conservation","analytics","facilities","climate"]
};

const motoryn: PortfolioVenture = {
  slug: "motoryn",
  name: "Motoryn",
  eyebrow: "Automotive ownership / service coordination",
  category: "Commerce",
  stage: "Concept designed",
  status: "Public design prototype",
  summary:
    "A clearer record. A practical service plan. Motoryn is an ownership-planning concept for drivers who want to organize maintenance, ask informed questions and coordinate care with independent professionals.",
  problem:
    "A receipt in a drawer. A reminder you dismissed. A recommended service without enough context to compare it. Vehicle care becomes easier to manage when records and next steps live in one understandable place.",
  thesis:
    "Motoryn’s proposed first offer is a maintenance organization brief for a household vehicle. It brings owner-supplied records and manufacturer guidance together, while leaving inspection, diagnosis and repair decisions with qualified technicians.",
  currentState:
    "Explore a fictional ownership timeline that separates documented work, owner recollection and unknown service history. See a workshop handoff and prepare questions from the gaps in your own record. The planning concept does not provide inspections, diagnoses, repair bookings or a vetted service network.",
  founderRole:
    "Automotive venture thesis, brand identity, visual art direction, ownership journey design, service-marketplace concept, and early partner strategy.",
  nextMilestone:
    "Proposed discovery: interview 10 owners and 3 independent shops about records and service handoffs. Trial 5 vehicle briefs with owner permission and professional feedback before building booking or vehicle integrations. Measure record completeness, clarity of the service request and owner understanding. No repair savings, reliability improvement or vetted network is claimed.",
  opportunity:
    "Initial customers: Everyday vehicle owners. Drivers keeping a vehicle for the long term who want a clearer view of records, open questions and upcoming maintenance. Potential collaborators: Qualified providers interested in receiving organized service history and a focused customer request.",
  externalUrl: "https://motoryn.summithillholdings.com",
  externalLabel: "Explore Motoryn",
  art: "/project-hero/motoryn.webp",
  heroArt: "/project-hero/motoryn.webp",
  accent: "#D7FA5C",
  accentSoft: "rgba(215,250,92,.14)",
  tags: ["commerce","automotive","vehicle-care","service-marketplace","maintenance","concept"]
};

const experienceElsewhere: PortfolioVenture = {
  slug: "experience-elsewhere",
  name: "Experience Elsewhere (EE)",
  eyebrow: "Curated travel / immersive experiences",
  category: "Commerce",
  stage: "Concept designed",
  status: "Public design prototype",
  summary:
    "Stay a little longer. Choose a little better. Experience Elsewhere is a travel-planning concept for people who want a personal, practical journey with room to discover what was never on the list.",
  problem:
    "A hundred saved places do not make a journey. The distance between them, the time on your feet and the moments you actually enjoy matter just as much. Planning should bring those pieces together without filling every hour.",
  thesis:
    "Experience Elsewhere’s proposed first offer is a human-reviewed planning brief for a short, independent trip in one region. It pairs a clear route and realistic pacing with direct booking links that travelers verify and purchase themselves.",
  currentState:
    "Explore an editorial coastal journey and adjust a fictional six-day, two-base pacing study. Choose your rhythm and interests to prepare a first planning note. The photographs are imagined concept scenes, and the sample is not a bookable itinerary. Pilot scope remains in development; travelers verify current details and book directly.",
  founderRole:
    "Travel venture concept, experience curation thesis, editorial positioning, brand and visual storytelling, initial trip-planning journey, and partner-research direction.",
  nextMilestone:
    "Proposed discovery: interview 10 independent travelers and identify a region where specialist knowledge can be validated. Test 5 planning briefs with volunteer travelers and qualified local contributors before offering paid planning. Review pacing, source accuracy and how much of the plan travelers find useful. No bookings, supplier inventory or traveler outcomes are claimed.",
  opportunity:
    "Initial customers: Curious couples & friends. Independent travelers planning a roughly week-long trip who prefer a considered route to an exhaustive checklist. Potential collaborators: Guides and hospitality professionals interested in contributing grounded local knowledge to a planning pilot.",
  externalUrl: "https://experienceelsewhere.summithillholdings.com",
  externalLabel: "Explore Experience Elsewhere",
  art: "/project-hero/experience-elsewhere.webp",
  heroArt: "/project-hero/experience-elsewhere.webp",
  accent: "#DDA879",
  accentSoft: "rgba(221,168,121,.16)",
  tags: ["commerce","travel","hospitality","experiences","editorial","curation"]
};

const kinora: PortfolioVenture = {
  slug: "kinora",
  name: "Kinora",
  eyebrow: "AI-assisted human connection / relationship intelligence",
  category: "Technology",
  stage: "System build",
  status: "Public concept website",
  summary:
    "A privacy-first connection platform exploring how people can discover complementary collaborators, meaningful friendships, and intentional communities through explainable, opt-in matching.",
  problem:
    "Professional and social networks optimize discovery and attention, but people still struggle to find collaborators whose skills complement their own or communities where they genuinely belong.",
  thesis:
    "Consent-based profiles combining self-described interests, strengths, goals, values, and working preferences could help people discover more relevant connections, while transparent recommendations and mutual introductions preserve individual agency.",
  currentState:
    "A responsive Next.js public website and interactive concept demo have been committed to GitHub and deployed by the founder. Demo matches are fictional and browser-local; production accounts, real matchmaking, messaging, and user data infrastructure are not yet implemented or validated.",
  founderRole:
    "Venture concept, human-connection thesis, product positioning, privacy principles, matching-system direction, brand selection, experience design, and early platform development.",
  nextMilestone:
    "Interview founders and independent professionals, test whether explainable recommendations improve mutually accepted introductions, and prototype opt-in profiles, consent controls, and a narrowly scoped matching pilot.",
  opportunity:
    "Potential collaborators in matchmaking systems, human-computer interaction, privacy engineering, community design, organizational psychology, and startup team formation; initial design partners and pilot participants.",
  externalUrl: "https://kinora.summithillholdings.com/",
  externalLabel: "Explore Kinora",
  art: "/project-art/kinora.svg",
  heroArt: "/project-art/kinora.svg",
  accent: "#D99177",
  accentSoft: "rgba(217,145,119,.17)",
  tags: ["technology", "ai", "matching", "community", "founder-teams", "privacy"]
};

export const ventures = parsePortfolioVentureList(
  [...rawPortfolioVentures, payerDelta, givewiseInsights, adVibeCentral, kineticAromatics, atlasAssets, autoCompCorp, crestlineMetals, ameliora, eversteadLiving, qshipSupplyCo, solvanti, techwater, motoryn, experienceElsewhere, kinora].map((venture) => {
    const lifecycle = lifecycleBySlug[venture.slug] ?? "IDENTIFY";
    return {
      ...venture,
      tier: tierBySlug[venture.slug] ?? "Incubation Concepts",
      businessStatus: businessStatusBySlug[venture.slug] ?? "Concept",
      lifecycle,
      stage: lifecycle
    };
  })
);

export const ventureTiers = ["All Assets", "Flagship Assets", "Active Validations", "Incubation Concepts"] as const;
export const ventureCategories = ["All", "Technology", "Commerce", "Industrial", "Behavioral", "Creative", "Civic"] as const;

export function getVenture(slug: string) {
  return ventures.find((venture) => venture.slug === slug);
}
