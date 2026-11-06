import "./venture-overlay.css";
import "./home-polish.css";
import { FounderHero } from "@/components/hero/FounderHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FeaturedProjects } from "@/components/ventures/FeaturedProjects";
import { StudioLoop } from "@/components/interactive/StudioLoop";
import { BlueprintSection } from "@/components/home/BlueprintSection";
import { ParticipationSection } from "@/components/home/ParticipationSection";
import { PrivateBriefsSection } from "@/components/home/PrivateBriefsSection";
import { HomeVentureOverlay } from "@/components/home/HomeVentureOverlay";
import { VentureUniverseTrigger } from "@/components/home/VentureUniverseTrigger";
import { ContactForm } from "@/components/shared/ContactForm";

export default function Home() {
  return (
    <>
      <FounderHero />

      <section className="section worlds-section home-anchor" id="venture-pipeline">
        <div className="worlds-header">
          <SectionHeading index="01" eyebrow="Venture Pipeline" title="Selected ventures in active development." />
          <p className="worlds-note">A focused view of projects moving through the studio. Open any project file for its current direction, operating model, and public materials.</p>
        </div>
        <FeaturedProjects />
        <VentureUniverseTrigger label="View All Ventures" className="home-view-all" />
      </section>

      <section className="section studio-section home-anchor" id="studio">
        <SectionHeading index="02" eyebrow="The Studio" title="A good idea is only the starting point.">
          <p>Each concept moves through a disciplined sequence that connects customer perspective, venture architecture, evidence, and execution.</p>
        </SectionHeading>
        <StudioLoop />
      </section>

      <BlueprintSection />
      <ParticipationSection />
      <PrivateBriefsSection />

      <section id="contact" className="section contact-section home-anchor">
        <figure className="contact-photo-strip">
          <img src="https://images.pexels.com/photos/22725910/pexels-photo-22725910.jpeg?cs=srgb&dl=pexels-anish-sharma-1231731988-22725910.jpg&fm=jpg" alt="Modern office lobby in a city business district" loading="lazy" />
          <figcaption>Studio contact / business environment</figcaption>
        </figure>
        <div className="contact-layout">
          <aside>
            <SectionHeading index="06" eyebrow="Contact" title="Interested in building, backing, or collaborating? Let’s start a focused conversation.">
              <p>Use the form to start a discussion, talk about a venture, partnership, private brief, or any other relevant opportunity.</p>
            </SectionHeading>
          </aside>
          <ContactForm />
        </div>
      </section>

      <HomeVentureOverlay />
    </>
  );
}
