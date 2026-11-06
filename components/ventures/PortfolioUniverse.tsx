"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { CSSProperties } from "react";
import { ventures } from "@/lib/portfolio";
import { ventureSignalArt } from "@/lib/ventureVisuals";
import { getVentureImage } from "@/lib/ventureImagery";

const tierOrder = ["Flagship Assets", "Active Validations", "Incubation Concepts"] as const;

export function PortfolioUniverse() {
  const first = ventures.find((venture) => venture.tier === "Flagship Assets") ?? ventures[0];
  const [activeSlug, setActiveSlug] = useState(first?.slug ?? "");
  const active = ventures.find((venture) => venture.slug === activeSlug) ?? ventures[0];

  if (!active) return null;
  const activeImage = getVentureImage(active.slug);
  const activeIndex = Math.max(0, ventures.findIndex((venture) => venture.slug === active.slug));

  return (
    <div className="venture-universe-v3 portfolio-universe" style={{ "--active-accent": active.accent, "--active-soft": active.accentSoft } as CSSProperties}>
      <section className="venture-selector-panel" aria-label="Portfolio venture selector">
        <div className="venture-selector-head">
          <div>
            <span className="venture-selector-eyebrow">Portfolio index</span>
            <h3>Explore by maturity.</h3>
          </div>
          <div className="venture-selector-count" aria-label={`${activeIndex + 1} of ${ventures.length} ventures`}>
            <strong>{String(activeIndex + 1).padStart(2, "0")}</strong>
            <span>/ {String(ventures.length).padStart(2, "0")}</span>
          </div>
        </div>
        <p className="venture-selector-intro">The public portfolio separates institutional-facing assets from active validation work and earlier concepts. Select a project to inspect its current lifecycle and public file.</p>

        <div className="venture-tier-selector-list">
          {tierOrder.map((tier) => {
            const tierVentures = ventures.filter((venture) => venture.tier === tier);
            if (!tierVentures.length) return null;
            return (
              <section className="venture-tier-selector" key={tier} aria-labelledby={`selector-${tier.replaceAll(" ", "-")}`}>
                <div className="venture-tier-selector-heading">
                  <span>{tier}</span>
                  <small>{tierVentures.length} {tierVentures.length === 1 ? "asset" : "assets"}</small>
                </div>
                <div className="venture-node-grid">
                  {tierVentures.map((venture) => {
                    const isActive = venture.slug === active.slug;
                    return (
                      <button
                        key={venture.slug}
                        type="button"
                        className={`venture-node-card ${isActive ? "is-active" : ""}`}
                        style={{ "--node-accent": venture.accent, "--node-soft": venture.accentSoft } as CSSProperties}
                        aria-pressed={isActive}
                        onClick={() => setActiveSlug(venture.slug)}
                      >
                        <span className="venture-node-topline"><span>{venture.lifecycle}</span><em>{venture.category}</em></span>
                        <span className="venture-node-body-v3">
                          <span className="venture-node-icon" aria-hidden="true"><Image src={ventureSignalArt[venture.slug] ?? venture.art} alt="" fill sizes="48px" /></span>
                          <span className="venture-node-copy-v3"><strong>{venture.name}</strong><small>{venture.businessStatus}</small></span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      <aside className="venture-preview-card" aria-live="polite" aria-atomic="true">
        <div className="venture-preview-swap" key={active.slug}>
          <div className="venture-preview-art" aria-hidden="true">
            <Image src={activeImage?.src ?? active.heroArt ?? active.art} alt="" fill sizes="(max-width: 900px) 100vw, 36vw" style={{ objectPosition: activeImage?.position ?? "center" }} />
            <div className="venture-preview-photo-tone" />
            <div className="venture-preview-grid" />
            <div className="venture-preview-signal"><span>SELECTED VENTURE</span><i /><strong>{String(activeIndex + 1).padStart(2, "0")}</strong></div>
          </div>
          <div className="venture-preview-content">
            <div className="venture-preview-meta"><span>{active.tier}</span><span>{active.lifecycle}</span><span>{active.category}</span><span style={{ color: "#B08D57", fontWeight: 700 }}>{active.businessStatus}</span></div>
            <h3>{active.name}</h3>
            <p>{active.summary}</p>
            <div className="venture-preview-tags">{active.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div>
            <div className="venture-preview-actions">
              <Link className="button" href={`/portfolio/${active.slug}`}>Open Project File</Link>
              {active.externalUrl && <a className="button button-ghost" href={active.externalUrl} target="_blank" rel="noreferrer">Visit Site ↗</a>}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
