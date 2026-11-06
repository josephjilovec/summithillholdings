import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Studio Model", "How Summit Hill Holdings sets portfolio direction, builds foundational architecture, aligns capital, and assembles operating leadership around selected ventures.", "/studio");

export default function StudioPage() {
  return (
    <>
      <section className="page-hero studio-page-hero">
        <div className="studio-hero-visual" aria-hidden="true">
          <Image
            src="/images/studio-architectural-monolith.webp"
            alt=""
            fill
            priority
            sizes="(max-width: 900px) 100vw, 1440px"
          />
        </div>
        <div><p className="hero-kicker">Studio operating model</p><h1>Set direction centrally.<br /><span>Scale through aligned leadership.</span></h1></div>
        <p>Summit Hill Holdings defines foundational product architecture, portfolio priorities, and capital strategy—then aligns each asset with the operators and cross-functional partners equipped to lead execution.</p>
      </section>

      <section className="section studio-operating-section">
        <SectionHeading index="01" eyebrow="Operating model" title="One strategic layer. Clear venture-level ownership." />
        <div className="studio-operating-grid">
          <article className="studio-operating-lead">
            <p>The studio is a hub for venture designs, portfolio priorities, capital allocation decisions, foundational brand and product direction, and cross-venture leverage.</p>
          </article>
          <div className="studio-operating-points">
            <article><span>01</span><h3>Architect</h3><p>Define the customer, value proposition, business model, product foundation, operating requirements, and defensible market position.</p></article>
            <article><span>02</span><h3>Allocate</h3><p>Direct leadership attention, capital priorities, shared infrastructure, and strategic resources toward the constraints that matter most.</p></article>
            <article><span>03</span><h3>Align</h3><p>Connect each venture with operating leadership, technical talent, advisers, distribution, and capital partners suited to its next stage.</p></article>
          </div>
        </div>
      </section>

      <section className="section studio-infrastructure-section">
        <SectionHeading index="02" eyebrow="Shared infrastructure" title="Build once. Apply across the portfolio." />
        <p className="studio-section-lede">The portfolio’s 26 ventures include brands, services, and concepts at different stages of development, while a shared infrastructure layer reduces repeated work and gives operators greater leverage.</p>
        <div className="studio-infrastructure-grid">
          <article><span>AI automation</span><h3>Connected workflows</h3><p>Reusable AI-assisted research, content, analysis, routing, and operational systems give venture teams a stronger starting point.</p></article>
          <article><span>Brand frameworks</span><h3>Distinct identities, shared discipline</h3><p>Each venture receives its own market language and visual world while drawing from a common standard for positioning, trust, and conversion.</p></article>
          <article><span>Operational pipelines</span><h3>Repeatable deployment</h3><p>Product planning, web delivery, documentation, measurement, partner outreach, and iteration give each operator a repeatable launch framework.</p></article>
          <article><span>Portfolio intelligence</span><h3>Learning compounds</h3><p>Commercial, technical, behavioral, and market lessons from one asset improve strategic decisions across the rest of the portfolio.</p></article>
        </div>
      </section>

      <section className="section studio-capital-section">
        <SectionHeading index="03" eyebrow="Capital & scale strategy" title="Capital and leadership follow a defined venture objective." />
        <div className="studio-capital-grid">
          <article><strong>Strategic capital</strong><p>Capital is aligned to a specific product, distribution, leadership, infrastructure, or market-entry objective within a selected company.</p></article>
          <article><strong>Operating leadership</strong><p>Experienced partners can take responsibility for day-to-day execution and turn a studio-built asset into a focused standalone operation.</p></article>
          <article><strong>Distribution partnerships</strong><p>Channel access, customer relationships, manufacturing, licensing, and institutional partnerships can accelerate market reach without rebuilding the core asset.</p></article>
        </div>
      </section>

      <section className="cta-band"><div><span>04 / Private materials</span><h2>Review the architecture behind a selected venture.</h2></div><div><p>Accredited investors, operating partners, and strategic collaborators can request a focused briefing on the asset, commercial model, priorities, and capital strategy.</p><Link className="button" href="/contact#brief">Request venture materials</Link></div></section>
    </>
  );
}
