export type VenturePlan = {
  imageDisclosure?: string;
  audiences: { title: string; description: string }[];
  offer: string;
  offerDescription: string;
  deliverables: { title: string; description: string }[];
  milestones: { title: string; description: string }[];
};

export const venturePlans: Record<string, VenturePlan> = {
  kinora: {
    audiences: [
      {title:"Early-stage founders",description:"People looking for complementary cofounders and collaborators who share their operating priorities."},
      {title:"Independent professionals",description:"People seeking purposeful professional relationships beyond traditional feeds and follower counts."},
      {title:"Community organizers",description:"Hosts who want to form smaller groups around shared interests and mutual participation."}
    ],
    offer:"The Kinora Introduction Pilot",
    offerDescription:"A proposed, consent-based pilot to test transparent recommendations and mutual introductions among a small group of participants. No production matching or verified outcomes are claimed.",
    deliverables:[
      {title:"Opt-in connection profile",description:"A user-controlled profile describing interests, skills, goals, availability, and preferred collaboration style."},
      {title:"Explainable shortlist",description:"A limited set of recommendations with plain-language reasons and visible limitations rather than invented compatibility scores."},
      {title:"Mutual introduction workflow",description:"An introduction request that proceeds only when both parties agree, with feedback, blocking, and deletion controls."}
    ],
    milestones:[
      {title:"Validate the need",description:"Interview 12 founders and independent professionals about unsuccessful introductions, trust concerns, and collaboration criteria."},
      {title:"Test a small cohort",description:"Run a manually reviewed, opt-in introduction pilot with a limited participant group before deploying automated matching."},
      {title:"Measure meaningful outcomes",description:"Track accepted introductions, useful follow-up conversations, privacy concerns, and sustained collaboration without claiming predictive accuracy prematurely."}
    ]
  },

  "everstead-living": {
    "audiences": [
      {
        "title": "Homeowners planning ahead",
        "description": "People who want to understand access and comfort before a move, renovation, or change in household needs."
      },
      {
        "title": "Families supporting a loved one",
        "description": "Adult children and caregivers who need a shared set of priorities instead of disconnected advice."
      },
      {
        "title": "Local home specialists",
        "description": "Occupational therapists, accessibility designers and home-modification contractors interested in a clearer client handoff."
      }
    ],
    "offer": "The Home Adaptation Brief",
    "offerDescription": "A proposed, focused planning engagement for one home. The purpose is to prepare better decisions before commissioning design or construction.",
    "deliverables": [
      {
        "title": "Routine & room map",
        "description": "Document entry, circulation, bathing, lighting and daily activities through a guided discussion."
      },
      {
        "title": "Prioritized action list",
        "description": "Separate everyday adjustments from projects that need assessment, design, or trade expertise."
      },
      {
        "title": "Professional handoff",
        "description": "Prepare questions, relevant room notes and a scope outline for independently engaged specialists."
      }
    ],
    "milestones": [
      {
        "title": "Listen before designing",
        "description": "Proposed first cohort: interview 10 households and 3 home-accessibility professionals to identify repeated planning problems."
      },
      {
        "title": "Test one complete handoff",
        "description": "Trial the brief with 5 volunteer households in one local service area, subject to partner availability."
      },
      {
        "title": "Measure usefulness",
        "description": "Check whether priorities are understood, a professional can act on the brief, and follow-up questions decrease. These are validation goals, not reported results."
      }
    ]
  },
  "qship-supply-co": {
    "audiences": [
      {
        "title": "Small distributors",
        "description": "Owner-led businesses reordering packaging, consumables or general operating supplies from recurring suppliers."
      },
      {
        "title": "Growing online retailers",
        "description": "Teams that need purchasing coordination for packaging and operating materials alongside their existing fulfillment tools."
      },
      {
        "title": "Lean purchasing teams",
        "description": "Operators with enough repeat buying to need a process, but no appetite for a large enterprise-system rollout."
      }
    ],
    "offer": "The Purchasing Coordination Pilot",
    "offerDescription": "A proposed pilot covering one purchasing category, an agreed supplier group and a named approver. Your business retains purchasing authority and pays suppliers directly.",
    "deliverables": [
      {
        "title": "A clean request register",
        "description": "Record specifications, quantities, target dates, approvers and the source documents behind each request."
      },
      {
        "title": "A supplier follow-up rhythm",
        "description": "Keep quote comparisons, approval decisions and delivery commitments in a shared, understandable tracker."
      },
      {
        "title": "An exception & closeout log",
        "description": "Flag unconfirmed dates, shortages and missing paperwork; confirm receipt with the designated owner."
      }
    ],
    "milestones": [
      {
        "title": "Choose a narrow category",
        "description": "Proposed discovery: interview 8 small-business operators about recurring supply purchases and approval bottlenecks."
      },
      {
        "title": "Run a bounded pilot",
        "description": "Test one category with 3 design-partner businesses for 4 weeks, with written responsibilities and direct supplier payment."
      },
      {
        "title": "Validate the operating rhythm",
        "description": "Track overdue follow-ups, missing approvals and staff effort against the pre-pilot process. No savings or delivery performance is claimed yet."
      }
    ]
  },
  "solvanti": {
    "audiences": [
      {
        "title": "Homeowners comparing options",
        "description": "People considering efficiency upgrades, solar or storage who want to make assumptions visible before committing."
      },
      {
        "title": "Households planning for outages",
        "description": "Owners who need to define essential loads and tolerable interruptions before requesting a backup-power design."
      },
      {
        "title": "Qualified energy professionals",
        "description": "Assessors and licensed contractors interested in receiving a more organized account of household goals."
      }
    ],
    "offer": "The Household Energy Brief",
    "offerDescription": "A proposed planning engagement for one owner-occupied home, using household-supplied information and a clearly documented set of questions.",
    "deliverables": [
      {
        "title": "Needs & usage summary",
        "description": "Organize billing periods, household changes and priorities. Distinguish consumption from the price paid for it."
      },
      {
        "title": "Options comparison framework",
        "description": "Compare efficiency, solar and backup pathways using visible assumptions, missing information and contractor questions."
      },
      {
        "title": "A provider-ready checklist",
        "description": "Identify the property, tariff, equipment and site information a qualified assessor or installer would need."
      }
    ],
    "milestones": [
      {
        "title": "Learn from real decisions",
        "description": "Proposed discovery: interview 10 homeowners who are comparing efficiency or backup-power options."
      },
      {
        "title": "Test the planning brief",
        "description": "Review 5 sample household briefs with qualified energy professionals in one initial service region."
      },
      {
        "title": "Check decision quality",
        "description": "Measure whether homeowners can explain trade-offs and providers receive the information they need. Savings, payback and uptime remain unverified."
      }
    ]
  },
  "techwater": {
    imageDisclosure: "The sample report is an illustrative diagram with fictional billing records. It does not represent a completed client review, a leak diagnosis or measured savings.",
    "audiences": [
      {
        "title": "Small commercial portfolios",
        "description": "Property managers overseeing a handful of offices, retail locations or mixed-use buildings with separate water records."
      },
      {
        "title": "Hands-on facilities teams",
        "description": "Operators who can gather bills and investigate flagged changes with their maintenance providers."
      },
      {
        "title": "Water-efficiency specialists",
        "description": "Professionals interested in a clearer data handoff before a site visit or equipment assessment."
      }
    ],
    "offer": "The Water Use Review",
    "offerDescription": "A proposed reporting pilot for a small set of properties with readable billing history, a designated owner and a practical way to investigate changes.",
    "deliverables": [
      {
        "title": "A consistent bill register",
        "description": "Record period dates, units, billed consumption and gaps. Keep unit conversions and source records traceable."
      },
      {
        "title": "An explained trend review",
        "description": "Compare daily average usage across periods, with notes for occupancy, seasonality and property changes."
      },
      {
        "title": "A follow-up action log",
        "description": "Separate data questions, site checks and specialist assessments. Assign the next step and record the outcome."
      }
    ],
    "milestones": [
      {
        "title": "Validate available records",
        "description": "Proposed discovery: work with 3 property operators to understand bill access, units and common data gaps."
      },
      {
        "title": "Trial a monthly review",
        "description": "Test up to 10 properties over 3 reporting cycles, with permission to use records and a named follow-up owner."
      },
      {
        "title": "Measure actionability",
        "description": "Track usable records, explained flags and completed site checks. Conservation savings and leak-detection performance are not claimed."
      }
    ]
  },
  "motoryn": {
    "audiences": [
      {
        "title": "Everyday vehicle owners",
        "description": "Drivers keeping a vehicle for the long term who want a clearer view of records, open questions and upcoming maintenance."
      },
      {
        "title": "Busy households",
        "description": "Families coordinating more than one vehicle and trying to avoid scattered receipts and last-minute decisions."
      },
      {
        "title": "Independent service shops",
        "description": "Qualified providers interested in receiving organized service history and a focused customer request."
      }
    ],
    "offer": "The Ownership Care Brief",
    "offerDescription": "A proposed manual planning service for one vehicle, based on available records, the applicable manufacturer schedule and questions to verify with a service professional.",
    "deliverables": [
      {
        "title": "An organized service timeline",
        "description": "Sort available invoices and dates. Mark missing records explicitly rather than assuming a service was completed."
      },
      {
        "title": "A maintenance discussion plan",
        "description": "List schedule-based items, known concerns and unanswered questions for a qualified technician to review."
      },
      {
        "title": "A workshop-ready handoff",
        "description": "Prepare a focused service request and comparison checklist for written estimates and completed work."
      }
    ],
    "milestones": [
      {
        "title": "Understand the ownership gap",
        "description": "Proposed discovery: interview 10 owners and 3 independent shops about records and service handoffs."
      },
      {
        "title": "Test a manual brief",
        "description": "Trial 5 vehicle briefs with owner permission and professional feedback before building booking or vehicle integrations."
      },
      {
        "title": "Check the handoff",
        "description": "Measure record completeness, clarity of the service request and owner understanding. No repair savings, reliability improvement or vetted network is claimed."
      }
    ]
  },
  "experience-elsewhere": {
    "audiences": [
      {
        "title": "Curious couples & friends",
        "description": "Independent travelers planning a roughly week-long trip who prefer a considered route to an exhaustive checklist."
      },
      {
        "title": "Time-conscious planners",
        "description": "People with plenty of inspiration but limited time to check travel times, opening patterns and practical fit."
      },
      {
        "title": "Local destination specialists",
        "description": "Guides and hospitality professionals interested in contributing grounded local knowledge to a planning pilot."
      }
    ],
    "offer": "The Elsewhere Journey Brief",
    "offerDescription": "A proposed itinerary-planning engagement for a 5–7 day trip in one destination region. Start with interests, pace, access needs and a realistic budget range.",
    "deliverables": [
      {
        "title": "A coherent route",
        "description": "Choose sensible bases, sequence travel days and leave breathing room. Flag travel times and logistics that need confirmation."
      },
      {
        "title": "A personal shortlist",
        "description": "Suggest places and activities around the traveler’s interests, with reasons for inclusion and alternatives for weather or energy."
      },
      {
        "title": "A practical booking checklist",
        "description": "Provide source links and a verification list for availability, current prices, access, cancellation terms and transport."
      }
    ],
    "milestones": [
      {
        "title": "Pick one destination niche",
        "description": "Proposed discovery: interview 10 independent travelers and identify a region where specialist knowledge can be validated."
      },
      {
        "title": "Review a few real briefs",
        "description": "Test 5 planning briefs with volunteer travelers and qualified local contributors before offering paid planning."
      },
      {
        "title": "Check practical fit",
        "description": "Review pacing, source accuracy and how much of the plan travelers find useful. No bookings, supplier inventory or traveler outcomes are claimed."
      }
    ]
  }
};
