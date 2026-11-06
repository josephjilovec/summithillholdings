import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-identity">
          <div className="brand-mark footer-brand">
            <span className="brand-monogram">SH</span>
            <span className="brand-copy"><strong>Summit Hill Holdings</strong><small>Holdings</small></span>
          </div>
          <p className="footer-note">Venture development, portfolio strategy, and operator partnerships across commerce, civic initiatives, behavioral design, technology, and creative work.</p>
        </div>
        <div className="footer-connect">
          <span className="footer-label">Connect</span>
          <div className="footer-connect-links">
            <Link href="/contact">Contact</Link>
            <Link href={site.booking}>Discuss a venture ↗</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Summit Hill Holdings. All rights reserved.</span>
        <span className="footer-legal-links">
          <Link href="/terms">Terms of Service</Link>
          <Link href="/privacy">Privacy Policy</Link>
        </span>
        <span>Concept stages and plans may change. No investment solicitation or financial advice.</span>
      </div>
    </footer>
  );
}
