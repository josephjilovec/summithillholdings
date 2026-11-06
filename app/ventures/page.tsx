import { VentureGrid } from "@/components/ventures/VentureGrid";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { pageMetadata } from "@/lib/metadata";
import { ventures } from "@/lib/portfolio";

export const metadata = pageMetadata("Portfolio", "Explore the Summit Hill Holdings portfolio through Flagship Assets, Active Validations, and Incubation Concepts.", "/portfolio");

export default function VenturesPage() {
  return (
    <>
      <style>{`@media (min-width: 721px){.venture-tab-scale{zoom:1.25;width:80%;margin:0 auto}}`}</style>
      <div className="venture-tab-scale">
        <section className="page-hero compact-hero">
          <div>
            <p className="hero-kicker">Master asset directory / current portfolio</p>
            <h1>{ventures.length} studio assets.<br /><span>Organized by maturity.</span></h1>
          </div>
          <p>Explore the studio&apos;s complete portfolio without flattening very different stages of development into one list. Maturity, lifecycle, operating context, and next proof points are shown directly on each project file.</p>
        </section>
        <section className="section ventures-index-section">
          <SectionHeading index="01" eyebrow="Portfolio directory" title="Explore every venture by market." />
          <VentureGrid />
        </section>
      </div>
    </>
  );
}
