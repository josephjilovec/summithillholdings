import Link from "next/link";
import { ventures } from "@/lib/portfolio";

const heroCarousel = [
  "https://images.pexels.com/photos/19999185/pexels-photo-19999185.jpeg?cs=srgb&dl=pexels-midlox-19999185.jpg&fm=jpg",
  "https://images.pexels.com/photos/5531042/pexels-photo-5531042.jpeg?cs=srgb&dl=pexels-rachel-claire-5531042.jpg&fm=jpg",
  "https://images.pexels.com/photos/31709064/pexels-photo-31709064.jpeg?cs=srgb&dl=pexels-misbaa-eri-426041722-31709064.jpg&fm=jpg",
  "https://images.pexels.com/photos/22725910/pexels-photo-22725910.jpeg?cs=srgb&dl=pexels-anish-sharma-1231731988-22725910.jpg&fm=jpg",
  "https://images.pexels.com/photos/34823908/pexels-photo-34823908.jpeg?cs=srgb&dl=pexels-ranamatloob567-34823908.jpg&fm=jpg",
];

const heroCarouselCss = `
.hero-shell-carousel{grid-template-columns:1fr!important;isolation:isolate}
.hero-shell-carousel .hero-copy{max-width:900px;padding-top:28px;position:relative;z-index:3}
.hero-shell-carousel .hero-kicker{color:#d2c6b3}
.hero-shell-carousel .hero-copy h1 span{color:#B08D57}
.hero-shell-carousel .hero-lede{max-width:690px;color:#d0d4d6;text-shadow:0 2px 20px rgba(0,0,0,.35)}
.hero-shell-carousel .hero-photo-slide{opacity:0;animation:ventureHeroCycle 40s ease-in-out infinite!important;will-change:opacity,transform}
.hero-shell-carousel .hero-photo-slide img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:saturate(.78) sepia(.06) contrast(1.08) brightness(.72)}
.hero-shell-carousel .hero-photo-slide-1{animation-delay:-2s!important}
.hero-shell-carousel .hero-photo-slide-1 img{object-position:center 48%}
.hero-shell-carousel .hero-photo-slide-2{animation-delay:6s!important}
.hero-shell-carousel .hero-photo-slide-2 img{object-position:center 42%}
.hero-shell-carousel .hero-photo-slide-3{animation-delay:14s!important}
.hero-shell-carousel .hero-photo-slide-3 img{object-position:center 45%}
.hero-shell-carousel .hero-photo-slide-4{animation-delay:22s!important}
.hero-shell-carousel .hero-photo-slide-4 img{object-position:center 48%}
.hero-shell-carousel .hero-photo-slide-5{animation-delay:30s!important}
.hero-shell-carousel .hero-photo-slide-5 img{object-position:center 50%}
.hero-shell-carousel .hero-photo-shade{background:linear-gradient(90deg,rgba(5,6,7,.84) 0%,rgba(5,6,7,.67) 32%,rgba(5,6,7,.38) 58%,rgba(5,6,7,.10) 100%),linear-gradient(0deg,rgba(5,6,7,.48),transparent 42%,rgba(5,6,7,.14))}
.hero-shell-carousel .hero-signals{max-width:760px;background:linear-gradient(90deg,rgba(7,9,11,.44),rgba(7,9,11,.08));backdrop-filter:blur(2px)}
.hero-shell-carousel .hero-signals strong{color:#f3eee6}
@keyframes ventureHeroCycle{0%{opacity:0;transform:scale(1.065)}5%{opacity:1;transform:scale(1.045)}18%{opacity:1;transform:scale(1.018)}23%,100%{opacity:0;transform:scale(1.005)}}
@media(max-width:900px){.hero-shell-carousel .hero-copy{max-width:760px}.hero-shell-carousel .hero-photo-shade{background:linear-gradient(90deg,rgba(5,6,7,.83),rgba(5,6,7,.48)),linear-gradient(0deg,rgba(5,6,7,.58),transparent 55%)}}
@media(prefers-reduced-motion:reduce){.hero-shell-carousel .hero-photo-slide{animation:none!important;transform:none!important}.hero-shell-carousel .hero-photo-slide-1{opacity:1}.hero-shell-carousel .hero-photo-slide:not(.hero-photo-slide-1){display:none}}
`;

export function FounderHero() {
  return (
    <>
      <style>{heroCarouselCss}</style>
      <section className="hero-shell hero-shell-carousel">
        <div className="hero-photo-carousel" aria-hidden="true">
          {heroCarousel.map((src, index) => (
            <div className={`hero-photo-slide hero-photo-slide-${index + 1}`} key={src}>
              <img src={src} alt="" loading={index === 0 ? "eager" : "lazy"} />
            </div>
          ))}
          <div className="hero-photo-shade" />
        </div>

        <div className="hero-copy">
          <p className="hero-kicker">Holdings / Operating Portfolio</p>
          <h1>
            Cross-Disciplinary Vision<br />
            <span>Built for Venture Deployment</span>
          </h1>
          <p className="hero-lede">
            A multi-asset studio portfolio where commercial strategy, product direction, behavioral insight, and execution come together.
          </p>
          <div className="hero-actions">
            <Link href="/portfolio" className="button">Explore the Portfolio</Link>
            <Link href="/#approach" className="text-link">How we develop ventures <span>↘</span></Link>
          </div>
          <div className="hero-signals" aria-label="Portfolio overview">
            <div><strong>{ventures.length}</strong><span>portfolio assets</span></div>
            <div><strong>100%</strong><span>decentralized ecosystem</span></div>
            <div><strong>01→04</strong><span>identify · design · test · build</span></div>
          </div>
        </div>
      </section>
    </>
  );
}
