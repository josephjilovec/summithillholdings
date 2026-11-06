import Link from "next/link";
import type { Metadata } from "next";
import styles from "./survivor-foundation.module.css";

export const metadata: Metadata = {
  title: "Toenail Fungus Survivor Foundation | Support, Evidence, Next Steps",
  description:
    "A founding-stage public-interest project for people dealing with toenail fungus: practical education, survivor stories, professional pathways, and community support without shame.",
  alternates: { canonical: "/survivor-foundation" },
  openGraph: {
    title: "Toenail Fungus Survivor Foundation | Support, Evidence, Next Steps",
    description:
      "A founding-stage public-interest project for people dealing with toenail fungus: practical education, survivor stories, professional pathways, and community support without shame.",
    url: "/survivor-foundation",
  },
};

const evidence = [
  {
    label: "The problem is real",
    title: "Toenail fungus is common.",
    body: "The CDC says nail infections (onychomycosis) may affect up to 14% of the population, with toenails affected more often than fingernails.",
    source: "CDC",
    href: "https://www.cdc.gov/ringworm/signs-symptoms/index.html",
  },
  {
    label: "Getting the label right matters",
    title: "Not every abnormal nail is fungus.",
    body: "The American Academy of Dermatology notes that conditions such as nail psoriasis or nail injury can look similar, and a clinician may take a nail sample to help confirm the diagnosis.",
    source: "American Academy of Dermatology",
    href: "https://www.aad.org/public/diseases/a-z/nail-fungus-treatment",
  },
  {
    label: "Patience is part of treatment",
    title: "A clear nail can take time.",
    body: "Because nails grow slowly, visible nail improvement can lag behind the point when an infection has begun to clear. Treatment plans also vary by person and by the extent and type of infection.",
    source: "American Academy of Dermatology",
    href: "https://www.aad.org/public/diseases/a-z/nail-fungus-treatment",
  },
];

export default function SurvivorFoundationPage() {
  return (
    <main className={styles.site}>
      <header className={styles.nav}>
        <Link href="/" className={styles.brand} aria-label="Summit Hill Holdings home">
          <span>Summit Hill Holdings</span>
          <small>/ PUBLIC-INTEREST VENTURE</small>
        </Link>
        <nav>
          <a href="#why">Why this exists</a>
          <a href="#evidence">Evidence desk</a>
          <a href="#stories">Survivor stories</a>
          <Link href="/portfolio">Portfolio</Link>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className={styles.eyebrow}>TOENAIL FUNGUS SURVIVOR FOUNDATION</div>
          <h1>Stop hiding your feet. Start moving forward.</h1>
          <p className={styles.lead}>
            Toenail fungus can be embarrassing, persistent, and surprisingly hard to navigate. This project is being built around a simple idea: treat the person like a person, make the information easier to understand, and make the path forward feel possible.
          </p>
          <div className={styles.actions}>
            <a className={styles.primaryButton} href="#join">Join the founding list</a>
            <a className={styles.secondaryButton} href="#evidence">See the evidence</a>
          </div>
          <div className={styles.trustLine}>
            <span>NO JUDGMENT</span>
            <span>NO MIRACLE CLAIMS</span>
            <span>NO FAKE TESTIMONIALS</span>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.visualGlow} />
          <img
            src="/project-art/tfsf.svg"
            alt="Abstract TFSF illustration representing a transition from embarrassment to support"
            className={styles.heroImage}
          />
          <div className={styles.visualNote}>
            <span>FOUNDING-STAGE PROJECT</span>
            <strong>Support, science, confidence.</strong>
          </div>
        </div>
      </section>

      <section className={styles.introBand} id="why">
        <div>
          <span className={styles.kicker}>THE IDEA</span>
          <h2>Make the awkward conversation easier.</h2>
        </div>
        <p>
          The internet already has plenty of jokes, horror photos, miracle cures, and conflicting advice. TFSF is designed to occupy the space between embarrassment and useful action: plain-language education, real people who have been through it, and a clearer route to qualified professional care when it is needed.
        </p>
      </section>

      <section className={styles.journey}>
        <div className={styles.sectionHeader}>
          <span className={styles.kicker}>THE SURVIVOR JOURNEY</span>
          <h2>Four steps. No shame required.</h2>
        </div>
        <div className={styles.journeyGrid}>
          {[
            ["01", "Recognize", "Understand what may be happening without diagnosing yourself from a photo."],
            ["02", "Confirm", "Know when a clinician can help distinguish fungus from other nail problems."],
            ["03", "Treat", "Learn what professional treatment options exist and what patience may be required."],
            ["04", "Recover", "Track progress, reduce recurrence risks, and rebuild the confidence to stop hiding your feet."],
          ].map(([number, title, body]) => (
            <article key={number} className={styles.journeyCard}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.evidence} id="evidence">
        <div className={styles.sectionHeader}>
          <span className={styles.kicker}>EVIDENCE DESK</span>
          <h2>Useful facts, not internet folklore.</h2>
          <p>Clinical information is presented for education, not as a diagnosis or personal treatment plan.</p>
        </div>
        <div className={styles.evidenceGrid}>
          {evidence.map((item) => (
            <article key={item.title} className={styles.evidenceCard}>
              <span>{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <a href={item.href} target="_blank" rel="noreferrer">
                Source: {item.source} ↗
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.stories} id="stories">
        <div className={styles.storyCopy}>
          <span className={styles.kicker}>THE WALL OF VICTORY</span>
          <h2>Real people. Real journeys. Published with permission.</h2>
          <p>
            The long-term vision is a library of first-person stories from people who have dealt with nail fungus, the embarrassment around it, the care they sought, and the moment they stopped thinking about their feet every time they put on sandals.
          </p>
          <p>
            No scraped photos from forums. No invented success stories. No “before and after” theater. Every published story should belong to the person who lived it.
          </p>
        </div>
        <div className={styles.storyStack}>
          <div className={styles.storyPlaceholder}>
            <span>STORY 001</span>
            <strong>First survivor interview</strong>
            <small>Seeking an initial participant who wants to tell the whole story.</small>
          </div>
          <div className={styles.storyPlaceholder}>
            <span>STORY 002</span>
            <strong>Clinical perspective</strong>
            <small>Seeking a podiatrist or dermatologist willing to review public education.</small>
          </div>
        </div>
      </section>

      <section className={styles.proDirectory}>
        <div>
          <span className={styles.kicker}>FIND A PRO</span>
          <h2>A professional directory can come later. Trust comes first.</h2>
          <p>
            The future directory is intended to connect people with qualified podiatrists and dermatologists. It will not label a clinician “Survivor-Certified” unless an actual, documented program and participating professionals exist.
          </p>
        </div>
        <div className={styles.directoryPanel}>
          <div className={styles.searchMock}>
            <span>ZIP CODE</span>
            <strong>Coming after clinical partnerships are established</strong>
          </div>
          <div className={styles.directoryMeta}>
            <span>PARTNER CRITERIA</span>
            <span>Qualifications / licensure / transparency / patient respect</span>
          </div>
        </div>
      </section>

      <section className={styles.support} id="join">
        <div className={styles.supportPanel}>
          <span className={styles.kicker}>BUILD THE FOUNDATION</span>
          <h2>Help turn a weird problem into a better support system.</h2>
          <p>
            The project is currently in formation. The first goal is to build a credible community, clinical review network, and evidence-first resource library before adding commerce, affiliate relationships, or paid professional placement.
          </p>
          <div className={styles.supportActions}>
            <Link href="/contact" className={styles.primaryButton}>Contact the founder</Link>
            <Link href="/portfolio/toenail-fungus-survivor-foundation" className={styles.secondaryButton}>View project file</Link>
          </div>
        </div>
        <aside className={styles.legalNote}>
          <strong>Organizational status</strong>
          <p>
            This page describes a founding-stage public-interest venture concept. It does not represent that the organization has been recognized by the IRS as tax-exempt or that contributions are currently tax-deductible. That language can change only after the organization's legal and tax status is established.
          </p>
          <a href="https://www.irs.gov/charities-non-profits/charitable-organizations" target="_blank" rel="noreferrer">IRS nonprofit guidance ↗</a>
        </aside>
      </section>

      <footer className="w-full border-t border-white/10 bg-[#050607] py-12 text-[#D2C6B3]">
        <div className="max-w-5xl mx-auto px-6 flex flex-col items-center justify-center space-y-6 text-center">
          <div>
            <a
              href="/contact?venture=toenail-fungus-survivor-foundation"
              className="text-base text-[#F3EEE6] hover:text-[#B08D57] transition-colors duration-200 tracking-wide"
            >
              contact@summithillholdings.com
            </a>
          </div>
          <div className="flex items-center justify-center space-x-8 text-base font-medium">
            <a
              href="/terms"
              className="text-[#F3EEE6]/90 hover:text-[#B08D57] transition-colors duration-200 underline-offset-4 hover:underline"
            >
              Terms of Service
            </a>
            <span className="text-white/20 select-none">•</span>
            <a
              href="/privacy"
              className="text-[#F3EEE6]/90 hover:text-[#B08D57] transition-colors duration-200 underline-offset-4 hover:underline"
            >
              Privacy Policy
            </a>
          </div>
          <div className="pt-2">
            <p className="text-sm text-white/50 tracking-wider">
              © 2026 Summit Hill Holdings. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
