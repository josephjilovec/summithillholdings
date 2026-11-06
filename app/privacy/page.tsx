import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Privacy Policy",
  "Privacy information for Summit Hill Holdings.",
  "/privacy",
);

export default function PrivacyPage() {
  return (
    <section className="page-hero compact-hero">
      <div>
        <p className="hero-kicker">Legal / Privacy</p>
        <h1>Privacy<br /><span>Policy</span></h1>
      </div>
      <div className="prose">
        <p>Summit Hill Holdings respects the privacy of visitors, collaborators, and prospective partners.</p>
        <h2>Information collected</h2>
        <p>This website may collect information you voluntarily provide, such as your name, email address, or message when you contact the studio. Technical information such as browser type, device information, and website usage data may also be collected through standard website analytics and hosting services.</p>
        <h2>How information is used</h2>
        <p>Information is used to respond to inquiries, maintain website operations, improve the experience, and communicate about relevant studio activities. Personal information is not sold or rented.</p>
        <h2>Third-party links</h2>
        <p>This website includes links to independently operated venture websites, platforms, and professional profiles. Those sites may have their own privacy practices.</p>
        <h2>Contact</h2>
        <p>Questions about privacy may be directed through the website contact page.</p>
      </div>
    </section>
  );
}
