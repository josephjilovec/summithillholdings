import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { VentureProofPanel } from "@/components/interactive/VentureProofPanel";
import { PrivateBriefRequest } from "@/components/ventures/PrivateBriefRequest";
import { getVenture, ventures } from "@/lib/portfolio";
import { getVentureImage } from "@/lib/ventureImagery";
import { VentureLaunchPlan } from "@/components/ventures/VentureLaunchPlan";
import { venturePlans } from "@/lib/venturePlans";
import { pageMetadata } from "@/lib/metadata";
import { ventureJsonLd } from "@/lib/structuredData";

export function generateStaticParams() {
  return ventures.map((venture) => ({ slug: venture.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const venture = getVenture(slug);
  if (!venture) return {};
  return pageMetadata(venture.name, venture.summary, `/portfolio/${venture.slug}`);
}

export default async function VenturePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const venture = getVenture(slug);
  if (!venture) notFound();

  const ventureImage = getVentureImage(venture.slug);
  const projectImage = ventureImage?.src ?? venture.heroArt;
  const jsonLd = ventureJsonLd(venture);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <style>{`
        .project-hero-art .venture-project-photo{object-fit:cover;transform:scale(1.012)}
        .project-hero-art .venture-project-photo-tone{position:absolute;inset:0;z-index:1;pointer-events:none;background:transparent}
        .project-hero-art .project-art-caption{z-index:2}
        .project-hero-art{box-shadow:0 34px 90px rgba(0,0,0,.32),0 0 58px var(--venture-soft)}
        .business-status-pill{display:inline-flex;align-items:center;gap:7px;padding:6px 14px;border-radius:999px;font-size:13px;font-weight:700;letter-spacing:.03em;line-height:1.2}
        .status-indicator-dot{width:8px;height:8px;border-radius:50%}
        .project-summary{font-size:clamp(20px, 1.45vw, 24px) !important;line-height:1.65 !important;color:#dce6ef !important;max-width:760px !important}
        .project-file-grid p{font-size:16px !important;line-height:1.75 !important;color:#c5d2dc !important}
        .status-operating-business{background:rgba(34,197,94,.12);border:1px solid rgba(34,197,94,.38);color:#4ade80}
        .status-operating-business .status-indicator-dot{background:#22c55e;box-shadow:0 0 8px rgba(34,197,94,.7)}
        .status-available-service{background:rgba(14,165,233,.12);border:1px solid rgba(14,165,233,.38);color:#38bdf8}
        .status-available-service .status-indicator-dot{background:#0284c7;box-shadow:0 0 8px rgba(14,165,233,.7)}
        .status-in-development{background:rgba(245,158,11,.12);border:1px solid rgba(245,158,11,.38);color:#fbbf24}
        .status-in-development .status-indicator-dot{background:#f59e0b;box-shadow:0 0 8px rgba(245,158,11,.7)}
        .status-previously-operated{background:rgba(167,139,250,.12);border:1px solid rgba(167,139,250,.35);color:#c4b5fd}
        .status-previously-operated .status-indicator-dot{background:#a78bfa;box-shadow:0 0 8px rgba(167,139,250,.6)}
        .status-concept{background:rgba(148,163,184,.10);border:1px solid rgba(148,163,184,.26);color:#cbd5e1}
        .status-concept .status-indicator-dot{background:#94a3b8}
      `}</style>
      <section className="project-hero" style={{ "--venture-accent": venture.accent, "--venture-soft": venture.accentSoft } as CSSProperties}>
        <div className="project-hero-copy">
          <Link href="/portfolio" className="back-link">← Portfolio</Link>
          <div className="project-meta">
            <span>{venture.tier}</span>
            <span>{venture.lifecycle}</span>
            <span>{venture.category}</span>
            <span className={`business-status-pill status-${venture.businessStatus.toLowerCase().replace(/\s+/g, "-")}`}>
              <span className="status-indicator-dot" aria-hidden="true" />
              {venture.businessStatus}
            </span>
          </div>
          <p className="hero-kicker">{venture.eyebrow}</p>
          <h1>{venture.name}</h1>
          <p className="project-summary">{venture.summary}</p>
          <div className="hero-actions">
            {venture.externalUrl && <a className="button" href={venture.externalUrl} target="_blank" rel="noreferrer">{venture.externalLabel ?? "View website"} ↗</a>}
            <PrivateBriefRequest defaultVenture={venture.slug} label="Request executive brief" />
            <Link href="/contact" className="text-link">Discuss this project <span>↗</span></Link>
          </div>
        </div>
        <div className="project-hero-art">
          <Image className="venture-project-photo" src={projectImage} alt={ventureImage?.alt ?? `${venture.name} project visual`} fill priority sizes="(max-width: 900px) 100vw, 50vw" style={{ objectPosition: ventureImage?.position ?? "center" }} />
          <div className="venture-project-photo-tone" aria-hidden="true" />
          <div className="project-art-caption"><span>PROJECT FILE / {venture.slug.toUpperCase()}</span><span>LIFECYCLE / {venture.lifecycle}</span></div>
        </div>
      </section>

      <VentureProofPanel
        name={venture.name}
        slug={venture.slug}
        category={venture.category}
        stage={venture.lifecycle}
        currentState={venture.currentState}
        nextMilestone={venture.nextMilestone}
        opportunity={venture.opportunity}
        externalUrl={venture.externalUrl}
        externalLabel={venture.externalLabel}
        heroArt={projectImage}
        accent={venture.accent}
        accentSoft={venture.accentSoft}
      />

      <section className="section project-file-section">
        <div className="project-file-grid">
          <article><span>01 / Problem or territory</span><h2>What is being examined?</h2><p>{venture.problem}</p></article>
          <article><span>02 / Venture rationale</span><h2>What might be true?</h2><p>{venture.thesis}</p></article>
          <article><span>03 / What exists now</span><h2>What exists now?</h2><p>{venture.currentState}</p></article>
          <article><span>04 / Founder role</span><h2>How the venture is being developed.</h2><p>{venture.founderRole}</p></article>
          <article><span>05 / Next milestone</span><h2>What has to happen next?</h2><p>{venture.nextMilestone}</p></article>
          <article><span>06 / Opportunity</span><h2>Who could materially help?</h2><p>{venture.opportunity}</p></article>
        </div>
      </section>

      {venturePlans[venture.slug] && <VentureLaunchPlan plan={venturePlans[venture.slug]} accent={venture.accent} />}

      <section className="project-disclaimer" style={{ "--venture-accent": venture.accent } as CSSProperties}>
        <span>Public project information</span>
        <p>{venture.lifecycle === "BUILD" ? "This page describes a live public build or operating asset. Specific product, regulatory, market, financial, or performance claims should be evaluated on their current evidence and legal context." : "This page describes the current venture architecture and public operating direction. Future capabilities, economics, specifications, or market outcomes are not presented as independently verified achievements unless explicitly labeled as evidence."}</p>
      </section>
    </>
  );
}
