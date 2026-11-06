import Link from "next/link";

export default function NotFound() {
  return <section className="not-found"><span>404 / Project file not found</span><h1>This route left the constellation.</h1><p>The project may have moved, changed stage, or never existed at this URL.</p><Link className="button" href="/portfolio">Return to Portfolio</Link></section>;
}
