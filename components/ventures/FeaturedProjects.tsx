import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ventures } from "@/lib/portfolio";
import { getVentureImage } from "@/lib/ventureImagery";
import styles from "@/app/home.module.css";

const FEATURED_COUNT = 4;

function pickFeaturedProjects() {
  const flagship = ventures.filter((venture) => venture.tier === "Flagship Assets").slice(0, 2);
  const validations = ventures.filter((venture) => venture.tier === "Active Validations").slice(0, 2);
  return [...flagship, ...validations].slice(0, Math.min(FEATURED_COUNT, ventures.length));
}

export function FeaturedProjects() {
  const featured = pickFeaturedProjects();

  return (
    <>
      <div className={styles.selectedWorldsGrid}>
        {featured.map((venture, index) => {
          const image = getVentureImage(venture.slug);
          return (
            <Link
              href={`/portfolio/${venture.slug}`}
              key={venture.slug}
              className={`${styles.selectedWorld} ${index === 0 || index === 3 ? styles.wide : ""}`}
              style={{ "--venture-accent": venture.accent, "--venture-soft": venture.accentSoft } as CSSProperties}
            >
              <div className={styles.worldImage} aria-hidden="true">
                <Image
                  src={image?.src ?? venture.heroArt ?? venture.art}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 66vw"
                  style={{ objectPosition: image?.position ?? "center" }}
                />
              </div>
              <div className={styles.worldShade} aria-hidden="true" />
              <div className={styles.worldContent}>
                <div className={styles.worldMeta}>
                  <span>{venture.category}</span>
                  <span>{venture.tier}</span>
                  <span style={{ color: "#B08D57", fontWeight: 700 }}>{venture.businessStatus}</span>
                </div>
                <div>
                  <p>{venture.eyebrow}</p>
                  <h3>{venture.name}</h3>
                  <div className={styles.worldFooter}><span>{venture.summary}</span><i>Explore project file ↗</i></div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className={styles.worldsCta}>
        <span>{ventures.length} portfolio ventures</span>
        <Link href="/portfolio" className="button">Explore the full portfolio ↗</Link>
      </div>
    </>
  );
}
