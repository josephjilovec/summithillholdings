import { ContactForm } from "@/components/shared/ContactForm";
import { pageMetadata } from "@/lib/metadata";
import { inquiryBrand } from "@/lib/ventureInquiry";
import { site } from "@/lib/site";

export const metadata = pageMetadata("Contact", "Contact Summit Hill Holdings about venture leadership, capital partnerships, technical collaboration, distribution, civic initiatives, media, or creative work.", "/contact");

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ venture?: string }> }) {
  const { venture } = await searchParams;
  const brand = typeof venture === "string" ? inquiryBrand(venture) || "" : "";
  return (
    <>
      <section className="page-hero contact-hero"><div><p className="hero-kicker">Contact / opportunity routing</p><h1>Tell us what got your <span>attention!</span></h1></div><p>Operating leadership, capital partnerships, technical collaboration, distribution, civic and nonprofit relationships, media, creative work, and focused project questions can all start here.</p></section>
      <section className="section contact-section">
        <div className="contact-layout">
          <aside><span className="section-kicker">01 / Contact</span><h2>One place to start the <span>conversation.</span></h2><div className="contact-lanes"><p><strong>Operating leader</strong>Venture ownership, company-building experience, or functional leadership.</p><p><strong>Investor / capital partner</strong>Selected asset thesis, milestone, capital objective, or project brief.</p><p><strong>Technical collaborator</strong>Architecture, AI systems, BCI/HCI, product builds, and technical leadership.</p><p><strong>Distribution / domain partner</strong>Market access, customer relationships, transactions, manufacturing, licensing, or sector expertise.</p><p><strong>Civic / nonprofit</strong>Community partnerships, program ideas, research, or public-interest collaboration.</p><p><strong>Creative / media</strong>Production, placements, licensing, visual worlds, and partnerships.</p></div><div className="contact-lanes" style={{ marginTop: "20px" }}><p><strong>Email</strong><a href={`mailto:${site.emails.contact}`}>{site.emails.contact}</a></p></div><p>General business inquiries only. Please omit confidential records, patient information, and account credentials.</p></aside>
          <ContactForm initialInterest={brand} />
        </div>
      </section>
    </>
  );
}
