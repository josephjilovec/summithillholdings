import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import "./venture-universe-overrides.css";
import "./venture-studio-theme.css";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { SiteFooter } from "@/components/navigation/SiteFooter";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Summit Hill Holdings", template: "%s — Summit Hill Holdings" },
  description: site.description,
  applicationName: site.studioName,
  authors: [{ name: "Summit Hill Holdings", url: site.url }],
  creator: "Summit Hill Holdings",
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    url: site.url,
    title: "Summit Hill Holdings",
    description: site.description,
    siteName: site.studioName,
  },
  twitter: { card: "summary_large_image", title: "Summit Hill Holdings", description: site.description },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#studio`,
        name: site.studioName,
        url: site.url,
        description: site.description,
        location: { "@type": "Place", name: site.location }
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        name: site.studioName,
        url: site.url,
        publisher: { "@id": `${site.url}/#studio` }
      }
    ]
  };

  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
