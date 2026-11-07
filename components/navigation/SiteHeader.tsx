"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./SiteChrome.module.css";

const nav = [
  ["Ventures", "/portfolio"],
  ["Studio", "/#studio"],
  ["Our approach", "/#approach"],
  ["Private Briefs", "/#investor-access"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1040px)");
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
    };
    const onPointer = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <header className={styles.header} ref={header}>
      <div className={`${styles.inner} ${styles.headerInner}`}>
        <Link href="/" className={styles.brand} aria-label="Summit Hill Holdings home" onClick={() => setOpen(false)}>
          <span className={styles.monogram} aria-hidden="true">SH</span>
          <strong className={styles.brandName}>Summit Hill Holdings</strong>
        </Link>
        <nav className={styles.desktopNav} aria-label="Primary navigation">
          {nav.map(([label, href]) => <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>{label}</Link>)}
        </nav>
        <Link className={styles.headerCta} href="/#contact">Start a conversation</Link>
        <button className={styles.menuButton} type="button" ref={toggle} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-site-navigation" onClick={() => setOpen(value => !value)}>
          <span aria-hidden="true" /><span aria-hidden="true" />
        </button>
      </div>
      <nav id="mobile-site-navigation" className={styles.mobileNav} aria-label="Mobile navigation" hidden={!open}>
        <div className={`${styles.inner} ${styles.mobileNavInner}`}>
          {nav.map(([label, href]) => <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined} onClick={() => setOpen(false)}>{label}</Link>)}
          <Link href="/#contact" onClick={() => setOpen(false)}>Start a conversation ↗</Link>
        </div>
      </nav>
    </header>
  );
}
