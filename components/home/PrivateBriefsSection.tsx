import { SectionHeading } from "@/components/shared/SectionHeading";
import { PrivateBriefRequest } from "@/components/ventures/PrivateBriefRequest";

export function PrivateBriefsSection(){
  return <section id="investor-access" className="section home-anchor private-briefs-section">
    <div className="home-photo-intro home-photo-intro-reverse">
      <figure className="home-photo-panel private-briefs-photo">
        <img src="/images/private-venture-materials.webp" alt="Executive boardroom overlooking a downtown skyline" loading="lazy" />
        <figcaption>Private materials / diligence environment</figcaption>
      </figure>
      <SectionHeading index="05" eyebrow="Private venture materials" title="Go beyond the public overview.">
        <p>Selected projects have a concise public executive brief. Deeper diligence materials remain access-controlled and are shared after the studio reviews the request.</p>
      </SectionHeading>
    </div>
    <div className="contact-lanes">
      <p><strong>Executive one-pager</strong>High-level project context, thesis, current state, and next proof points.</p>
      <p><strong>Targeted routing</strong>Tell the studio whether you are an investor, technical operator, pilot/distribution partner, or strategic adviser.</p>
      <p><strong>Venture selection</strong>Choose the specific project you are evaluating so the follow-up can stay focused.</p>
      <p><strong>Private diligence</strong>Capital models, financing assumptions, valuation scenarios, and other sensitive materials are not public-facing.</p>
    </div>
    <div className="section-action"><PrivateBriefRequest /></div>
  </section>
}
