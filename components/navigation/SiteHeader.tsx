"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const nav = [
  ["Studio", "/#studio"],
  ["Our approach", "/#approach"],
  ["Private Briefs", "/#investor-access"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onResize = () => window.innerWidth > 880 && setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link href="/" className="brand-mark" aria-label="Summit Hill Holdings home" onClick={() => setOpen(false)}>
          <span className="brand-monogram">SH</span>
          <span className="brand-copy"><strong>Summit Hill Holdings</strong><small>Holdings</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link className="header-venture-button" href="/portfolio" onClick={() => setOpen(false)}>Ventures</Link>
          {nav.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
        </nav>
        <div className="nav-actions">
          <Link className="button button-small" href="/#contact" onClick={() => setOpen(false)}>Start a conversation</Link>
          <button className="menu-button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(value => !value)}><span/><span/></button>
        </div>
      </div>
      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <Link className="mobile-venture-button" href="/portfolio" onClick={() => setOpen(false)}>Ventures</Link>
          {nav.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
          <Link className="mobile-nav-cta" href="/#contact" onClick={() => setOpen(false)}>Start a conversation</Link>
        </nav>
      )}
    </header>
  );
}
