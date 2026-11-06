import type { PortfolioVenture } from "@/lib/ventureSchema";
import { site } from "@/lib/site";

export function ventureJsonLd(venture: PortfolioVenture) {
  const canonical = `${site.url}/portfolio/${venture.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#studio`,
        name: site.studioName,
        url: site.url,
        description: site.description
      },
      {
        "@type": "CreativeWork",
        "@id": `${canonical}#venture`,
        name: venture.name,
        description: venture.summary,
        url: canonical,
        creator: { "@id": `${site.url}/#studio` },
        publisher: { "@id": `${site.url}/#studio` },
        keywords: venture.tags.join(", "),
        about: {
          "@type": "Thing",
          name: venture.category
        },
        isPartOf: {
          "@type": "WebSite",
          name: site.studioName,
          url: site.url
        }
      }
    ]
  };
}
