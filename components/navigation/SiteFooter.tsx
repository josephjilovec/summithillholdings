import Link from "next/link";
import { site } from "@/lib/site";
import styles from "./SiteChrome.module.css";

export function SiteFooter() {
  return (
    <footer id="site-footer" className={styles.footer} aria-label="Site footer">
      <div className={`${styles.inner} ${styles.footerInner}`}>
        <div className={styles.footerMain}>
          <div>
            <Link href="/" className={styles.brand} aria-label="Summit Hill Holdings home">
              <span className={styles.monogram} aria-hidden="true">
                <img src="/images/summit-hill-logo-emblem.jpg" alt="" />
              </span>
              <strong className={styles.brandName}>Summit Hill Holdings</strong>
            </Link>
            <p className={styles.description}>Venture development, portfolio strategy, and operator partnerships across commerce, civic initiatives, behavioral design, technology, and creative work.</p>
          </div>
          <div className={styles.footerContact}>
            <a className={styles.email} href={`mailto:${site.emails.contact}`}><span>{site.emails.contact}</span><span aria-hidden="true">↗</span></a>
            <p className={styles.location}>{site.location}</p>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>© {new Date().getFullYear()} Summit Hill Holdings. All rights reserved.</p>
          <nav className={styles.legalNav} aria-label="Legal">
            <Link href="/terms">Terms of Service</Link>
            <Link href="/privacy">Privacy Policy</Link>
          </nav>
        </div>
        <p className={styles.notice}>Concept stages and plans may change. No investment solicitation or financial advice.</p>
      </div>
    </footer>
  );
}
