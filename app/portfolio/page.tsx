import { VentureGrid } from "@/components/ventures/VentureGrid";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { pageMetadata } from "@/lib/metadata";
import { ventures } from "@/lib/portfolio";

export const metadata = pageMetadata(
  "Portfolio",
  "Explore the Summit Hill Holdings portfolio through Flagship Assets, Active Validations, and Incubation Concepts.",
  "/portfolio"
);

export default function VenturesPage() {
  return (
    <>
      <style>{`
        html:has(.portfolio-page-dark),
        body:has(.portfolio-page-dark),
        main:has(.portfolio-page-dark) {
          background: #07090b !important;
          color: #f4f1e9 !important;
        }

        body:has(.portfolio-page-dark) .site-header {
          background: rgba(7,9,11,.78) !important;
          border-bottom-color: rgba(255,255,255,.10) !important;
          box-shadow: none !important;
        }

        .portfolio-page-dark {
          min-height: calc(100vh - 76px);
          background:
            radial-gradient(circle at 80% -10%, rgba(85,217,255,.08), transparent 26rem),
            #07090b;
          color: #f4f1e9;
        }

        .portfolio-page-dark .page-hero,
        .portfolio-page-dark .section,
        .portfolio-page-dark .ventures-index-section {
          background: transparent !important;
          color: #f4f1e9;
        }

        .portfolio-page-dark .page-hero > p,
        .portfolio-page-dark .section-heading p,
        .portfolio-page-dark .venture-tier-heading small,
        .portfolio-page-dark .portfolio-sector-filter {
          color: #9ca8b2 !important;
        }

        .portfolio-page-dark .page-hero h1,
        .portfolio-page-dark .section-heading h2,
        .portfolio-page-dark .venture-tier-heading span,
        .portfolio-page-dark .venture-card h3,
        .portfolio-page-dark .venture-card h3 a {
          color: #f4f1e9 !important;
        }

        .portfolio-page-dark .page-hero h1 span,
        .portfolio-page-dark .section-heading .section-kicker {
          color: #B08D57 !important;
        }

        .portfolio-page-dark .portfolio-filter-stack {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 18px 24px;
          margin-bottom: 38px;
        }

        .portfolio-page-dark .filter-bar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
          margin-bottom: 0 !important;
        }

        .portfolio-page-dark .filter-bar button {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          min-height: 48px;
          padding: 12px 20px !important;
          background: rgba(255,255,255,.03) !important;
          color: #c5d0d8 !important;
          border: 1px solid rgba(255,255,255,.16) !important;
          border-radius: 999px !important;
          font-size: clamp(14px, 1.05vw, 16px) !important;
          font-weight: 600 !important;
          letter-spacing: .02em !important;
          cursor: pointer;
          transition: background .2s ease, border-color .2s ease, color .2s ease, box-shadow .2s ease;
        }

        .portfolio-page-dark .filter-bar button:hover {
          background: rgba(255,255,255,.08) !important;
          border-color: rgba(255,255,255,.32) !important;
          color: #ffffff !important;
        }

        .portfolio-page-dark .filter-bar button.active {
          background: #f4f1e9 !important;
          border-color: #f4f1e9 !important;
          color: #07090b !important;
          box-shadow: 0 4px 20px rgba(244,241,233,.18) !important;
        }

        .portfolio-page-dark .filter-bar button .filter-count {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 22px;
          padding: 2px 7px;
          border-radius: 999px;
          background: rgba(255,255,255,.14);
          color: inherit;
          font-size: 12px;
          font-weight: 700;
          line-height: 1;
        }

        .portfolio-page-dark .filter-bar button.active .filter-count {
          background: rgba(7,9,11,.16);
          color: #07090b;
        }

        .portfolio-page-dark .portfolio-sector-filter {
          display: inline-flex;
          flex-direction: column;
          gap: 6px;
          font-size: 12px !important;
          font-weight: 700 !important;
          letter-spacing: .08em !important;
          text-transform: uppercase !important;
          color: #a4b1bb !important;
        }

        .portfolio-page-dark .portfolio-sector-filter select {
          min-width: 200px;
          min-height: 48px !important;
          padding: 0 16px !important;
          border-radius: 12px !important;
          background: #0d1216 !important;
          border: 1px solid rgba(255,255,255,.20) !important;
          color: #f4f1e9 !important;
          font-size: 15px !important;
          font-weight: 600;
          cursor: pointer;
          transition: border-color .2s ease;
        }

        .portfolio-page-dark .portfolio-sector-filter select:hover,
        .portfolio-page-dark .portfolio-sector-filter select:focus {
          border-color: rgba(255,255,255,.45) !important;
          outline: none;
        }

        .portfolio-page-dark .venture-card {
          background: #090d10 !important;
          border-color: rgba(255,255,255,.12) !important;
          transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease;
        }

        .portfolio-page-dark .venture-card:hover {
          transform: translateY(-4px);
          border-color: rgba(255,255,255,.24) !important;
          box-shadow: 0 20px 50px rgba(0,0,0,.45);
        }

        .portfolio-page-dark .venture-card-copy {
          background: #090d10 !important;
          padding: 24px;
        }

        .portfolio-page-dark .card-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #8da0ad;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: .06em;
          text-transform: uppercase;
        }

        .portfolio-page-dark .card-meta .meta-tier {
          color: #B08D57;
          font-weight: 700;
        }

        .portfolio-page-dark .card-meta .meta-sep {
          opacity: .4;
        }

        .portfolio-page-dark .card-meta .meta-lifecycle {
          color: #8da0ad;
        }

        .portfolio-page-dark .card-status-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
          margin: 12px 0 14px;
        }

        .portfolio-page-dark .business-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: .03em;
          line-height: 1.2;
        }

        .portfolio-page-dark .status-indicator-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .portfolio-page-dark .status-operating-business {
          background: rgba(34,197,94,.12);
          border: 1px solid rgba(34,197,94,.38);
          color: #4ade80;
        }
        .portfolio-page-dark .status-operating-business .status-indicator-dot {
          background: #22c55e;
          box-shadow: 0 0 8px rgba(34,197,94,.7);
        }

        .portfolio-page-dark .status-available-service {
          background: rgba(14,165,233,.12);
          border: 1px solid rgba(14,165,233,.38);
          color: #38bdf8;
        }
        .portfolio-page-dark .status-available-service .status-indicator-dot {
          background: #0284c7;
          box-shadow: 0 0 8px rgba(14,165,233,.7);
        }

        .portfolio-page-dark .status-in-development {
          background: rgba(245,158,11,.12);
          border: 1px solid rgba(245,158,11,.38);
          color: #fbbf24;
        }
        .portfolio-page-dark .status-in-development .status-indicator-dot {
          background: #f59e0b;
          box-shadow: 0 0 8px rgba(245,158,11,.7);
        }

        .portfolio-page-dark .status-previously-operated {
          background: rgba(167,139,250,.12);
          border: 1px solid rgba(167,139,250,.35);
          color: #c4b5fd;
        }
        .portfolio-page-dark .status-previously-operated .status-indicator-dot {
          background: #a78bfa;
          box-shadow: 0 0 8px rgba(167,139,250,.6);
        }

        .portfolio-page-dark .status-concept {
          background: rgba(148,163,184,.10);
          border: 1px solid rgba(148,163,184,.26);
          color: #cbd5e1;
        }
        .portfolio-page-dark .status-concept .status-indicator-dot {
          background: #94a3b8;
        }

        .portfolio-page-dark .card-sector-tag {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: .06em;
          text-transform: uppercase;
          color: #8fa1af;
          padding: 4px 10px;
          background: rgba(255,255,255,.06);
          border-radius: 6px;
        }

        .portfolio-page-dark .venture-card h3 {
          margin: 8px 0 12px;
          font-size: clamp(28px, 2.2vw, 34px);
          line-height: 1.22;
          letter-spacing: -.03em;
          font-weight: 700;
        }

        .portfolio-page-dark .venture-card p {
          color: #dbe4ec !important;
          font-size: clamp(20px, 1.45vw, 23px) !important;
          line-height: 1.62 !important;
          margin-bottom: 24px;
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .portfolio-page-dark .card-links {
          display: flex;
          gap: 12px;
          margin-top: auto;
          flex-wrap: wrap;
        }

        .portfolio-page-dark .card-links .button {
          font-size: 15px !important;
          font-weight: 600 !important;
          padding: 11px 22px !important;
          min-height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
        }

        @media (max-width: 768px) {
          .portfolio-page-dark .portfolio-filter-stack {
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
          }
          .portfolio-page-dark .portfolio-sector-filter {
            width: 100%;
          }
          .portfolio-page-dark .portfolio-sector-filter select {
            width: 100%;
          }
          .portfolio-page-dark .filter-bar button {
            flex: 1 1 calc(50% - 6px);
            justify-content: center;
          }
        }
      `}</style>
      <div className="portfolio-page-dark">
        <div className="venture-tab-scale">
          <section className="page-hero compact-hero">
            <div>
              <p className="hero-kicker">Master asset directory / current portfolio</p>
              <h1>{ventures.length} studio assets.<br /><span>Organized by maturity.</span></h1>
            </div>
            <p>
              Explore the studio&apos;s complete portfolio without flattening very different stages
              of development into one list. Maturity, lifecycle, operating context, and next proof
              points are shown directly on each project file.
            </p>
          </section>

          <section className="section ventures-index-section">
            <SectionHeading
              index="01"
              eyebrow="Portfolio directory"
              title="Explore every venture by market."
            />
            <VentureGrid />
          </section>
        </div>
      </div>
    </>
  );
}
