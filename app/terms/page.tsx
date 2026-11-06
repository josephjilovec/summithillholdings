import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Terms of Service",
  "Terms of use for Summit Hill Holdings.",
  "/terms",
);

export default function TermsPage() {
  return (
    <section className="page-hero compact-hero">
      <div>
        <p className="hero-kicker">Legal / Terms</p>
        <h1>Terms of<br /><span>Service</span></h1>
      </div>
      <div className="prose">
        <p>Welcome to Summit Hill Holdings. By accessing this website, you agree to these terms.</p>
        <h2>Website purpose</h2>
        <p>This website presents venture concepts, operating projects, research, and portfolio information for informational purposes. Portfolio materials may evolve as projects develop.</p>
        <h2>Intellectual property</h2>
        <p>Website content, branding, written materials, and original concepts belong to their respective rights holders. A portfolio listing does not itself establish a legal ownership interest, corporate relationship, or transfer of intellectual property.</p>
        <h2>No guarantees</h2>
        <p>Information on this website does not represent a guarantee of business results, investment performance, partnerships, or future outcomes.</p>
        <h2>External websites</h2>
        <p>Links to venture websites and third-party services are provided for convenience. Those websites operate independently and may have separate terms.</p>
        <h2>Contact</h2>
        <p>Questions about these terms may be submitted through the website contact page.</p>
      </div>
    </section>
  );
}
