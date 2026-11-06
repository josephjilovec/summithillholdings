import Image from "next/image";
import Link from "next/link";
import { getVenture } from "@/lib/ventures";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Creative", "DJ Hotwax and Summit Hill Holdings creative direction, music, and visual world-building.", "/creative");

export default function CreativePage() {
  const hotwax = getVenture("dj-hotwax")!;
  return (
    <>
      <section className="creative-hero">
        <Image src={hotwax.art} alt="DJ Hotwax abstract artwork" fill priority sizes="100vw" />
        <div className="creative-hero-overlay" />
        <div className="creative-hero-copy"><p className="hero-kicker">Creative channel / DJ Hotwax</p><h1>Genre is the palette.<br /><span>Atmosphere is the signature.</span></h1><p>Jazz, hip-hop, global rhythms, electronic music, and cinematic atmosphere live here without being forced into the visual language of a software company.</p><a className="button" href="https://djhotwax.summithillholdings.com/" target="_blank" rel="noreferrer">Visit DJ Hotwax ↗</a></div>
      </section>
      <section className="section"><SectionHeading index="01" eyebrow="One name / four worlds" title="Music can move without losing identity." />
        <div className="music-world-grid"><article><span>01</span><h3>Velvet Rooms</h3><p>French jazz · Cuban nights · hot jazz</p></article><article><span>02</span><h3>Coastal Motion</h3><p>West Coast · soul · cruising music</p></article><article><span>03</span><h3>Heavy Gold</h3><p>Hip-hop · trap-soul · instrumental beats</p></article><article><span>04</span><h3>Night Current</h3><p>House · trance · electronic fusion</p></article></div>
      </section>
      <section className="section creative-note"><SectionHeading index="02" eyebrow="Why it belongs here" title="Creative work is part of the operating system." /><div className="two-column-copy"><p>Music sharpens the studio’s work in pacing, mood, identity, visual direction, and the emotional side of product experience. It is not presented as evidence for a technology venture; it is a separate practice with its own standards.</p><p>The parent brand benefits from that separation. A serious portfolio can contain both an adaptive technology concept and a late-night jazz record without pretending they solve the same problem.</p></div></section>
      <section className="cta-band"><div><span>03 / Collaborate</span><h2>Production, placements, licensing, visual work.</h2></div><div><p>For music and creative inquiries, use the dedicated project experience or route the conversation through the studio.</p><Link className="button" href="/contact">Creative inquiry</Link></div></section>
    </>
  );
}
