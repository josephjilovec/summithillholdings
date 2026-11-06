"use client";

import Link from "next/link";
import { useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import { ventures } from "@/lib/ventures";

const nodeArt: Record<string, string> = {
  "my-healthy-aura": "/constellation-art/aura-map.svg",
  "swift-deal-solutions": "/constellation-art/swift-map.svg",
  "dj-hotwax": "/constellation-art/hotwax-map.svg",
  "vanta-helix": "/constellation-art/vanta-map.svg",
  "cannacore-seeds": "/constellation-art/cannacore-map.svg",
  "snarklogic": "/constellation-art/snark-map.svg",
  "alder-and-meridian": "/constellation-art/alder-map.svg"
};

const previewArt: Record<string, string> = {
  "my-healthy-aura": "/constellation-preview/aura-preview.svg",
  "swift-deal-solutions": "/constellation-preview/swift-preview.svg",
  "dj-hotwax": "/constellation-preview/hotwax-preview.svg",
  "vanta-helix": "/constellation-preview/vanta-preview.svg",
  "cannacore-seeds": "/constellation-preview/cannacore-preview.svg",
  "snarklogic": "/constellation-preview/snark-preview.svg",
  "alder-and-meridian": "/constellation-preview/alder-preview.svg"
};

export function VentureConstellation() {
  const [activeSlug, setActiveSlug] = useState(ventures[0]?.slug ?? "");
  const activeIndex = Math.max(0, ventures.findIndex((venture) => venture.slug === activeSlug));
  const active = ventures[activeIndex] ?? ventures[0];

  if (!active) return null;

  const activateOnPointer = (event: PointerEvent<HTMLButtonElement>, slug: string) => {
    if (event.pointerType === "mouse" || event.pointerType === "pen") {
      setActiveSlug(slug);
    }
  };

  const moveSelection = (direction: -1 | 1) => {
    const nextIndex = (activeIndex + direction + ventures.length) % ventures.length;
    setActiveSlug(ventures[nextIndex].slug);
  };

  return (
    <div
      className="venture-universe-v3"
      style={{
        "--active-accent": active.accent,
        "--active-soft": active.accentSoft
      } as CSSProperties}
    >
      <section className="venture-selector-panel" aria-label="Venture selector">
        <div className="venture-selector-head">
          <div>
            <span className="venture-selector-eyebrow">Portfolio signal map</span>
            <h3>Choose a project world.</h3>
          </div>
          <div className="venture-selector-count" aria-label={`${ventures.length} projects`}>
            <strong>{String(activeIndex + 1).padStart(2, "0")}</strong>
            <span>/ {String(ventures.length).padStart(2, "0")}</span>
          </div>
        </div>

        <p className="venture-selector-intro">
          Nine projects, one operating system. Select a signal to inspect its stage, thesis, and current public state.
        </p>

        <div className="venture-node-grid" role="group" aria-label="Project worlds">
          {ventures.map((venture, index) => {
            const isActive = venture.slug === active.slug;
            return (
              <button
                key={venture.slug}
                type="button"
                className={`venture-node-card ${isActive ? "is-active" : ""}`}
                style={{
                  "--node-accent": venture.accent,
                  "--node-soft": venture.accentSoft
                } as CSSProperties}
                aria-pressed={isActive}
                aria-label={`Select ${venture.name}`}
                onClick={() => setActiveSlug(venture.slug)}
                onPointerEnter={(event) => activateOnPointer(event, venture.slug)}
                onFocus={() => setActiveSlug(venture.slug)}
              >
                <span className="venture-node-topline">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <i aria-hidden="true" />
                  <em>{venture.category}</em>
                </span>

                <span className="venture-node-body-v3">
                  <span className="venture-node-icon" aria-hidden="true">
                    <img src={nodeArt[venture.slug] ?? venture.art} alt="" />
                  </span>
                  <span className="venture-node-copy-v3">
                    <strong>{venture.name}</strong>
                    <small>{venture.stage}</small>
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="venture-selector-footer">
          <span className="venture-selector-hint">Hover, focus, or tap to inspect · swipe cards on smaller screens</span>
          <div className="venture-selector-nav" aria-label="Cycle project selection">
            <button type="button" onClick={() => moveSelection(-1)} aria-label="Previous project">←</button>
            <button type="button" onClick={() => moveSelection(1)} aria-label="Next project">→</button>
          </div>
        </div>
      </section>

      <aside className="venture-preview-card" aria-live="polite" aria-atomic="true">
        <div className="venture-preview-swap" key={active.slug}>
          <div className="venture-preview-art" aria-hidden="true">
            <img src={previewArt[active.slug] ?? active.heroArt ?? active.art} alt="" />
            <div className="venture-preview-grid" />
            <div className="venture-preview-signal">
              <span>ACTIVE SIGNAL</span>
              <i />
              <strong>{String(activeIndex + 1).padStart(2, "0")}</strong>
            </div>
          </div>

          <div className="venture-preview-content">
            <div className="venture-preview-meta">
              <span>{active.category}</span>
              <span>{active.stage}</span>
            </div>

            <h3>{active.name}</h3>
            <p>{active.summary}</p>

            <div className="venture-preview-status">
              <span><i /> Current state</span>
              <strong>{active.status}</strong>
            </div>

            <div className="venture-preview-tags" aria-label="Project themes">
              {active.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
            </div>

            <div className="venture-preview-actions">
              <Link className="button" href={`/portfolio/${active.slug}`}>Open project file</Link>
              {active.externalUrl ? (
                <a className="text-link" href={active.externalUrl} target="_blank" rel="noreferrer">
                  Visit project <span>↗</span>
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </aside>

      <style>{`
        .venture-universe-v3 {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(360px, .7fr);
          gap: 22px;
          align-items: stretch;
          min-width: 0;
        }

        .venture-selector-panel,
        .venture-preview-card {
          min-width: 0;
          border: 1px solid rgba(255,255,255,.10);
          border-radius: 28px;
          background: #090d10;
          box-shadow: 0 30px 80px rgba(0,0,0,.22);
        }

        .venture-selector-panel {
          position: relative;
          overflow: hidden;
          padding: 26px;
          background:
            radial-gradient(circle at 0% 0%, var(--active-soft), transparent 36%),
            linear-gradient(145deg, rgba(255,255,255,.035), transparent 52%),
            #090d10;
          transition: background .3s ease;
        }

        .venture-selector-panel::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: .2;
          background-image:
            linear-gradient(rgba(255,255,255,.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.055) 1px, transparent 1px);
          background-size: 44px 44px;
          mask-image: linear-gradient(to bottom right, black, transparent 72%);
        }

        .venture-selector-head,
        .venture-selector-intro,
        .venture-node-grid,
        .venture-selector-footer {
          position: relative;
          z-index: 1;
        }

        .venture-selector-head {
          display: flex;
          justify-content: space-between;
          gap: 24px;
          align-items: flex-start;
        }

        .venture-selector-eyebrow {
          display: block;
          color: var(--active-accent);
          font-size: 9px;
          font-weight: 750;
          letter-spacing: .17em;
          text-transform: uppercase;
          transition: color .2s ease;
        }

        .venture-selector-head h3 {
          margin: 8px 0 0;
          font-size: clamp(28px, 3vw, 44px);
          line-height: .98;
          letter-spacing: -.045em;
          font-weight: 600;
        }

        .venture-selector-count {
          display: flex;
          align-items: baseline;
          gap: 4px;
          color: #65727b;
          font-variant-numeric: tabular-nums;
          white-space: nowrap;
        }

        .venture-selector-count strong {
          color: #f4f7f8;
          font-size: 24px;
          letter-spacing: -.04em;
        }

        .venture-selector-count span {
          font-size: 10px;
          letter-spacing: .08em;
        }

        .venture-selector-intro {
          max-width: 620px;
          margin: 18px 0 24px;
          color: #87949d;
          font-size: 12px;
          line-height: 1.65;
        }

        .venture-node-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
        }

        .venture-node-card {
          position: relative;
          min-width: 0;
          min-height: 128px;
          padding: 13px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,.09);
          border-radius: 17px;
          background: rgba(11,16,20,.82);
          color: #edf2f4;
          text-align: left;
          cursor: pointer;
          isolation: isolate;
          transition:
            transform .18s ease,
            border-color .18s ease,
            background .18s ease,
            box-shadow .18s ease;
        }

        .venture-node-card::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          opacity: 0;
          background:
            radial-gradient(circle at 88% 10%, var(--node-soft), transparent 52%),
            linear-gradient(145deg, color-mix(in srgb, var(--node-accent) 9%, transparent), transparent 62%);
          transition: opacity .18s ease;
        }

        .venture-node-card::after {
          content: "";
          position: absolute;
          left: -1px;
          top: 18%;
          bottom: 18%;
          width: 2px;
          border-radius: 999px;
          background: var(--node-accent);
          opacity: 0;
          transform: scaleY(.45);
          transition: opacity .18s ease, transform .18s ease;
        }

        .venture-node-card:hover,
        .venture-node-card:focus-visible,
        .venture-node-card.is-active {
          transform: translateY(-2px);
          border-color: color-mix(in srgb, var(--node-accent) 58%, rgba(255,255,255,.12));
          background: rgba(13,19,24,.98);
          box-shadow: 0 16px 34px rgba(0,0,0,.24);
          outline: none;
        }

        .venture-node-card:hover::before,
        .venture-node-card:focus-visible::before,
        .venture-node-card.is-active::before,
        .venture-node-card.is-active::after {
          opacity: 1;
        }

        .venture-node-card.is-active::after {
          transform: scaleY(1);
        }

        .venture-node-topline {
          display: flex;
          align-items: center;
          gap: 7px;
          min-width: 0;
          margin-bottom: 20px;
          color: #77858e;
          font-size: 8px;
          letter-spacing: .13em;
          text-transform: uppercase;
        }

        .venture-node-topline > span {
          color: var(--node-accent);
          font-weight: 800;
        }

        .venture-node-topline i {
          width: 3px;
          height: 3px;
          flex: 0 0 auto;
          border-radius: 50%;
          background: currentColor;
        }

        .venture-node-topline em {
          min-width: 0;
          overflow: hidden;
          font-style: normal;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .venture-node-body-v3 {
          display: grid;
          grid-template-columns: 38px minmax(0, 1fr);
          gap: 10px;
          align-items: center;
        }

        .venture-node-icon {
          width: 38px;
          height: 38px;
          overflow: hidden;
          border: 1px solid color-mix(in srgb, var(--node-accent) 34%, rgba(255,255,255,.08));
          border-radius: 11px;
          background: #0d1317;
        }

        .venture-node-icon img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .venture-node-copy-v3 {
          min-width: 0;
        }

        .venture-node-copy-v3 strong,
        .venture-node-copy-v3 small {
          display: block;
          min-width: 0;
        }

        .venture-node-copy-v3 strong {
          color: #f3f6f7;
          font-size: 12px;
          line-height: 1.16;
          letter-spacing: -.02em;
        }

        .venture-node-copy-v3 small {
          margin-top: 5px;
          overflow: hidden;
          color: #78868f;
          font-size: 8px;
          letter-spacing: .05em;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .venture-selector-footer {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          align-items: center;
          margin-top: 18px;
          padding-top: 16px;
          border-top: 1px solid rgba(255,255,255,.08);
        }

        .venture-selector-hint {
          color: #6f7d86;
          font-size: 9px;
          line-height: 1.5;
          letter-spacing: .05em;
        }

        .venture-selector-nav {
          display: flex;
          gap: 7px;
          flex: 0 0 auto;
        }

        .venture-selector-nav button {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(255,255,255,.10);
          border-radius: 10px;
          background: #0c1115;
          color: #c7d0d5;
          cursor: pointer;
          transition: border-color .18s ease, color .18s ease, transform .18s ease;
        }

        .venture-selector-nav button:hover,
        .venture-selector-nav button:focus-visible {
          color: #fff;
          border-color: var(--active-accent);
          transform: translateY(-1px);
          outline: none;
        }

        .venture-preview-card {
          position: relative;
          overflow: hidden;
          background: #080c0f;
        }

        .venture-preview-card::before {
          content: "";
          position: absolute;
          inset: 0 auto 0 0;
          z-index: 3;
          width: 2px;
          background: linear-gradient(transparent, var(--active-accent) 24%, var(--active-accent) 76%, transparent);
          opacity: .8;
          pointer-events: none;
          transition: background .2s ease;
        }

        .venture-preview-swap {
          min-height: 100%;
          animation: venturePreviewIn .24s ease both;
        }

        .venture-preview-art {
          position: relative;
          min-height: 285px;
          overflow: hidden;
          border-bottom: 1px solid rgba(255,255,255,.09);
          background: #0c1115;
        }

        .venture-preview-art > img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: .94;
          transform: scale(1.015);
        }

        .venture-preview-art::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to top, rgba(8,12,15,.9), transparent 48%),
            linear-gradient(135deg, transparent 45%, var(--active-soft));
        }

        .venture-preview-grid {
          position: absolute;
          inset: 0;
          z-index: 1;
          opacity: .14;
          background-image:
            linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px);
          background-size: 38px 38px;
          mask-image: linear-gradient(to bottom, black, transparent 78%);
        }

        .venture-preview-signal {
          position: absolute;
          z-index: 2;
          left: 20px;
          right: 20px;
          bottom: 16px;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 10px;
          color: rgba(255,255,255,.72);
          font-size: 8px;
          letter-spacing: .15em;
        }

        .venture-preview-signal i {
          height: 1px;
          background: linear-gradient(90deg, var(--active-accent), rgba(255,255,255,.08));
        }

        .venture-preview-signal strong {
          color: #fff;
          font-size: 12px;
          font-variant-numeric: tabular-nums;
        }

        .venture-preview-content {
          padding: 25px;
        }

        .venture-preview-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .venture-preview-meta span,
        .venture-preview-tags span {
          border: 1px solid rgba(255,255,255,.09);
          border-radius: 999px;
          color: #9ba8b0;
          background: rgba(255,255,255,.025);
          font-size: 8px;
          letter-spacing: .09em;
          text-transform: uppercase;
        }

        .venture-preview-meta span {
          padding: 7px 9px;
        }

        .venture-preview-content h3 {
          margin: 24px 0 13px;
          max-width: 430px;
          font-size: clamp(36px, 4vw, 58px);
          line-height: .92;
          letter-spacing: -.055em;
          font-weight: 590;
        }

        .venture-preview-content > p {
          margin: 0;
          color: #94a1a9;
          font-size: 12px;
          line-height: 1.68;
        }

        .venture-preview-status {
          display: grid;
          gap: 7px;
          margin-top: 24px;
          padding: 15px 0;
          border-top: 1px solid rgba(255,255,255,.08);
          border-bottom: 1px solid rgba(255,255,255,.08);
        }

        .venture-preview-status span {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #718089;
          font-size: 8px;
          letter-spacing: .12em;
          text-transform: uppercase;
        }

        .venture-preview-status span i {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--active-accent);
          box-shadow: 0 0 12px var(--active-accent);
        }

        .venture-preview-status strong {
          color: #dce3e6;
          font-size: 12px;
          font-weight: 620;
        }

        .venture-preview-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 16px;
        }

        .venture-preview-tags span {
          padding: 6px 8px;
        }

        .venture-preview-actions {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 18px;
          margin-top: 24px;
        }

        @keyframes venturePreviewIn {
          from { opacity: .58; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1180px) {
          .venture-universe-v3 {
            grid-template-columns: minmax(0, 1fr) minmax(330px, .72fr);
          }

          .venture-selector-panel {
            padding: 22px;
          }

          .venture-node-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .venture-node-card {
            min-height: 116px;
          }
        }

        @media (max-width: 900px) {
          .venture-universe-v3 {
            grid-template-columns: 1fr;
          }

          .venture-preview-card {
            order: 2;
          }

          .venture-selector-panel {
            order: 1;
          }

          .venture-node-grid {
            display: flex;
            gap: 10px;
            margin-inline: -22px;
            padding-inline: 22px;
            overflow-x: auto;
            overscroll-behavior-inline: contain;
            scroll-snap-type: x mandatory;
            scrollbar-width: none;
          }

          .venture-node-grid::-webkit-scrollbar {
            display: none;
          }

          .venture-node-card {
            flex: 0 0 min(42vw, 270px);
            min-height: 118px;
            scroll-snap-align: start;
          }

          .venture-preview-art {
            min-height: 360px;
          }
        }

        @media (max-width: 640px) {
          .venture-selector-panel,
          .venture-preview-card {
            border-radius: 22px;
          }

          .venture-selector-panel {
            padding: 18px;
          }

          .venture-selector-head {
            gap: 14px;
          }

          .venture-selector-head h3 {
            font-size: 31px;
          }

          .venture-selector-intro {
            margin-bottom: 20px;
          }

          .venture-node-grid {
            margin-inline: -18px;
            padding-inline: 18px;
          }

          .venture-node-card {
            flex-basis: min(78vw, 286px);
            min-height: 112px;
          }

          .venture-selector-footer {
            align-items: flex-end;
          }

          .venture-selector-hint {
            max-width: 220px;
          }

          .venture-preview-art {
            min-height: 275px;
          }

          .venture-preview-content {
            padding: 21px;
          }

          .venture-preview-content h3 {
            font-size: clamp(38px, 13vw, 54px);
          }

          .venture-preview-actions {
            align-items: flex-start;
            flex-direction: column;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .venture-node-card,
          .venture-selector-nav button,
          .venture-preview-swap {
            animation: none !important;
            transition-duration: .01ms !important;
          }
        }
      `}</style>
    </div>
  );
}
