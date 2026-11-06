import Image from "next/image";
import Link from "next/link";
import { FounderCopy } from "./FounderCopy";
import { WorkingDisciplines } from "./WorkingDisciplines";

export function BlueprintSection() {
  return <section id="approach" className="section home-anchor">
    <div className="founder-intro-layout">
      <div className="founder-intro-portrait">
        <Image src="/images/studio-architectural-monolith.webp" alt="Architectural study for the Summit Hill Holdings portfolio" fill sizes="(max-width:900px) 100vw,42vw" />
        <div className="founder-portrait-caption"><span>Phoenix, Arizona</span><span>Summit Hill Holdings</span></div>
      </div>
      <div className="founder-intro-copy"><FounderCopy /><div className="hero-actions"><Link className="button" href="/contact">Discuss a venture</Link></div></div>
    </div>
    <WorkingDisciplines />
  </section>;
}
