import { SectionHeading } from "@/components/shared/SectionHeading";

export function ParticipationSection(){
  return <section className="section home-anchor participation-section">
    <div className="home-photo-intro">
      <SectionHeading index="04" eyebrow="Ways to participate" title="Different ventures need different kinds of participation.">
        <p>Participation can range from capital and strategic input to technical, operating, distribution, and market relationships.</p>
      </SectionHeading>
      <figure className="home-photo-panel participation-photo">
        <img src="https://images.pexels.com/photos/5531042/pexels-photo-5531042.jpeg?cs=srgb&dl=pexels-rachel-claire-5531042.jpg&fm=jpg" alt="Professionals moving through a modern business district" loading="lazy" />
        <figcaption>Business district / partner environment</figcaption>
      </figure>
    </div>
    <div className="founder-lens-grid">
      <article className="founder-lens-card"><span>01</span><h3>Angel &amp; pre-seed</h3><p>Selected venture financing around a defined next milestone.</p></article>
      <article className="founder-lens-card"><span>02</span><h3>Technical co-founders</h3><p>Technical ownership within a venture where product depth matters.</p></article>
      <article className="founder-lens-card"><span>03</span><h3>Operating partners</h3><p>Commercial, functional, or venture-level operating participation.</p></article>
      <article className="founder-lens-card"><span>04</span><h3>Pilot &amp; distribution</h3><p>Customer access, market testing, distribution, and channel relationships.</p></article>
      <article className="founder-lens-card"><span>05</span><h3>Strategic advisors</h3><p>Focused perspective from people with relevant sector or functional experience.</p></article>
    </div>
  </section>
}
