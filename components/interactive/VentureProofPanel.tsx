"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export type VentureProofPanelProps = {
  name: string;
  slug: string;
  category: string;
  stage: string;
  currentState: string;
  nextMilestone: string;
  opportunity: string;
  externalUrl?: string;
  externalLabel?: string;
  heroArt: string;
  accent: string;
  accentSoft: string;
};

export function VentureProofPanel({
  name,
  slug,
  category,
  stage,
  currentState,
  nextMilestone,
  opportunity,
  externalUrl,
  externalLabel,
  heroArt,
  accent,
  accentSoft,
}: VentureProofPanelProps) {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          root.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.16 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      className="venture-proof"
      style={{ "--proof-accent": accent, "--proof-soft": accentSoft } as React.CSSProperties}
      aria-labelledby={`${slug}-proof-title`}
    >
      <div className="proof-heading reveal-item">
        <p>Product proof / live system</p>
        <h2 id={`${slug}-proof-title`}>See how the venture is taking shape.</h2>
        <span>
          A visual operating snapshot built from the current project state, validation target, and public product surface.
        </span>
      </div>

      <div className="proof-grid">
        <article className="proof-browser reveal-item">
          <div className="browser-chrome">
            <div className="browser-dots"><i /><i /><i /></div>
            <span>{externalUrl ? externalUrl.replace(/^https?:\/\//, "").replace(/\/$/, "") : `${slug}.project`}</span>
            <strong>LIVE SURFACE</strong>
          </div>
          <div className="browser-stage">
            <Image src={heroArt} alt="" fill sizes="(max-width: 900px) 100vw, 62vw" />
            <div className="browser-grid" aria-hidden="true" />
            <div className="browser-scan" aria-hidden="true" />
            <div className="browser-overlay">
              <div className="surface-label"><small>{category}</small><strong>{name}</strong></div>
              <div className="surface-status"><i /><span>{stage}</span></div>
            </div>
          </div>
          <div className="browser-console">
            <div><small>Current build</small><p>{currentState}</p></div>
            <div><small>Next validation</small><p>{nextMilestone}</p></div>
          </div>
          {externalUrl && (
            <a className="proof-live-link" href={externalUrl} target="_blank" rel="noreferrer">
              <span>{externalLabel ?? "Open live project"}</span><strong>↗</strong>
            </a>
          )}
        </article>

        <aside className="proof-rail">
          <article className="proof-card reveal-item">
            <span>01 / Evidence</span>
            <strong>Built now</strong>
            <p>{currentState}</p>
          </article>
          <article className="proof-card reveal-item">
            <span>02 / Validation</span>
            <strong>Next proof point</strong>
            <p>{nextMilestone}</p>
          </article>
          <article className="proof-card reveal-item">
            <span>03 / Collaboration</span>
            <strong>Useful counterparties</strong>
            <p>{opportunity}</p>
          </article>
        </aside>
      </div>

      <style jsx>{`
        .venture-proof{max-width:1500px;margin:0 auto;padding:30px 28px 128px;opacity:.35;transform:translateY(28px);transition:opacity .8s ease,transform .8s cubic-bezier(.2,.7,.2,1)}
        .venture-proof.is-visible{opacity:1;transform:none}.proof-heading{display:grid;grid-template-columns:minmax(0,.7fr) minmax(0,1.4fr);gap:18px 48px;align-items:end;margin-bottom:38px}.proof-heading p{margin:0;color:var(--proof-accent);font-size:10px;font-weight:800;letter-spacing:.18em;text-transform:uppercase}.proof-heading h2{margin:0;font-size:clamp(38px,5vw,76px);line-height:.96;letter-spacing:-.055em;font-weight:610}.proof-heading span{grid-column:2;color:#9ca8b2;max-width:680px;font-size:15px;line-height:1.65}.proof-grid{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(300px,.45fr);gap:20px}.proof-browser{position:relative;overflow:hidden;border:1px solid rgba(255,255,255,.13);border-radius:24px;background:#090d10;box-shadow:0 30px 90px rgba(0,0,0,.25);transition:transform .35s ease,border-color .35s ease,box-shadow .35s ease}.proof-browser:hover{transform:translateY(-5px);border-color:color-mix(in srgb,var(--proof-accent) 48%,rgba(255,255,255,.13));box-shadow:0 34px 110px rgba(0,0,0,.36),0 0 54px var(--proof-soft)}.browser-chrome{height:48px;display:grid;grid-template-columns:90px 1fr auto;gap:14px;align-items:center;padding:0 17px;border-bottom:1px solid rgba(255,255,255,.09);color:#7f8b93;font-size:9px;letter-spacing:.1em;text-transform:uppercase}.browser-chrome strong{color:var(--proof-accent);font-size:8px;letter-spacing:.16em}.browser-dots{display:flex;gap:6px}.browser-dots i{width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,.22)}.browser-stage{position:relative;min-height:460px;overflow:hidden;background:#0a0e12}.browser-stage :global(img){object-fit:cover;opacity:.82;filter:saturate(.92) contrast(1.04);transform:scale(1.015);transition:transform 1.2s cubic-bezier(.2,.7,.2,1)}.proof-browser:hover .browser-stage :global(img){transform:scale(1.055)}.browser-stage:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(6,9,12,0),rgba(6,9,12,.04) 78%,rgba(6,9,12,.10) 100%)}.browser-grid{position:absolute;inset:0;z-index:2;background-image:linear-gradient(rgba(255,255,255,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.055) 1px,transparent 1px);background-size:48px 48px;opacity:.34;mask-image:linear-gradient(to bottom,transparent,black 28%,black 80%,transparent);animation:gridDrift 16s linear infinite}.browser-scan{position:absolute;z-index:3;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--proof-accent),transparent);box-shadow:0 0 22px var(--proof-accent);opacity:.32;animation:scan 6.5s ease-in-out infinite}.browser-overlay{position:absolute;z-index:4;left:26px;right:26px;bottom:24px;display:flex;justify-content:space-between;gap:20px;align-items:end}.surface-label small{display:block;color:var(--proof-accent);font-size:9px;font-weight:800;letter-spacing:.17em;text-transform:uppercase}.surface-label strong{display:block;margin-top:7px;font-size:clamp(30px,4vw,58px);line-height:.94;letter-spacing:-.05em}.surface-status{display:flex;align-items:center;gap:9px;padding:10px 12px;border:1px solid rgba(255,255,255,.13);border-radius:999px;background:rgba(7,10,12,.7);backdrop-filter:blur(14px);font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:#c6d0d6}.surface-status i{width:7px;height:7px;border-radius:50%;background:var(--proof-accent);box-shadow:0 0 18px var(--proof-accent);animation:pulse 2.2s ease-in-out infinite}.browser-console{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid rgba(255,255,255,.09)}.browser-console>div{padding:21px 22px;min-height:142px}.browser-console>div+div{border-left:1px solid rgba(255,255,255,.09)}.browser-console small,.proof-card span{display:block;color:var(--proof-accent);font-size:8px;font-weight:800;letter-spacing:.17em;text-transform:uppercase}.browser-console p{margin:9px 0 0;color:#a7b1b8;font-size:12px;line-height:1.6}.proof-live-link{display:flex;justify-content:space-between;gap:20px;align-items:center;padding:16px 22px;border-top:1px solid rgba(255,255,255,.09);background:linear-gradient(90deg,var(--proof-soft),transparent);font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;transition:background .25s ease,color .25s ease}.proof-live-link strong{color:var(--proof-accent);font-size:18px}.proof-live-link:hover{background:var(--proof-accent);color:#050708}.proof-live-link:hover strong{color:#050708}.proof-rail{display:grid;gap:20px}.proof-card{position:relative;overflow:hidden;padding:24px 22px;border:1px solid rgba(255,255,255,.11);border-radius:20px;background:linear-gradient(150deg,rgba(255,255,255,.045),transparent 65%),#0b0f12;transition:transform .3s ease,border-color .3s ease,box-shadow .3s ease}.proof-card:before{content:"";position:absolute;width:150px;height:150px;border-radius:50%;right:-75px;top:-75px;background:var(--proof-soft);filter:blur(2px);transition:transform .4s ease}.proof-card:hover{transform:translateX(-5px);border-color:color-mix(in srgb,var(--proof-accent) 42%,rgba(255,255,255,.11));box-shadow:0 20px 55px rgba(0,0,0,.24)}.proof-card:hover:before{transform:scale(1.3)}.proof-card strong{display:block;margin-top:18px;font-size:22px;letter-spacing:-.035em}.proof-card p{margin:10px 0 0;color:#96a3ac;font-size:12px;line-height:1.62}.reveal-item{transition:opacity .7s ease,transform .7s cubic-bezier(.2,.7,.2,1);transition-delay:.08s}.venture-proof:not(.is-visible) .reveal-item{opacity:0;transform:translateY(18px)}.venture-proof.is-visible .proof-card:nth-child(2){transition-delay:.18s}.venture-proof.is-visible .proof-card:nth-child(3){transition-delay:.28s}@keyframes scan{0%,100%{top:14%;opacity:.12}50%{top:82%;opacity:.42}}@keyframes gridDrift{to{background-position:48px 48px}}@keyframes pulse{0%,100%{opacity:.55;transform:scale(.85)}50%{opacity:1;transform:scale(1.15)}}@media(max-width:960px){.proof-heading{grid-template-columns:1fr}.proof-heading span{grid-column:auto}.proof-grid{grid-template-columns:1fr}.proof-rail{grid-template-columns:repeat(3,1fr)}.browser-stage{min-height:390px}}@media(max-width:720px){.venture-proof{padding:16px 18px 88px}.proof-rail{grid-template-columns:1fr}.browser-stage{min-height:330px}.browser-console{grid-template-columns:1fr}.browser-console>div+div{border-left:0;border-top:1px solid rgba(255,255,255,.09)}.browser-overlay{left:18px;right:18px;bottom:18px;align-items:flex-start;flex-direction:column}.surface-status{align-self:flex-start}.browser-chrome{grid-template-columns:62px 1fr}.browser-chrome strong{display:none}}@media(prefers-reduced-motion:reduce){.venture-proof,.reveal-item,.proof-browser,.proof-card,.browser-stage :global(img){transition:none!important;transform:none!important}.browser-grid,.browser-scan,.surface-status i{animation:none!important}}
      `}</style>
    </section>
  );
}
