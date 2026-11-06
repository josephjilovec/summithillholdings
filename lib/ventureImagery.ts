export type VentureImage = {
  src: string;
  alt: string;
  position: string;
};

// Venture photography is intentionally separate from the accent-color system.
// The existing venture.accent and venture.accentSoft values remain the source of
// truth for hover glow, interface tinting, Project Files, and Capital Files.
export const ventureImagery: Record<string, VentureImage> = {
  kinora: {
    src: "/project-art/kinora.svg",
    alt: "Kinora concept illustration showing complementary people connected around a shared network",
    position: "center",
  },
  "everstead-living": {
    src: "/project-hero/everstead-living.webp",
    alt: "AI-generated concept of a sunlit home with clear circulation, pale oak floors and sage seating",
    position: "center",
  },
  "qship-supply-co": {
    src: "/project-hero/qship-supply-co.webp",
    alt: "AI-generated concept image of an orderly small fulfillment workspace with cartons and a pallet truck",
    position: "center",
  },
  "solvanti": {
    src: "/project-hero/solvanti.webp",
    alt: "AI-generated concept of a modest solar-equipped home in warm evening light",
    position: "center",
  },
  "techwater": {
    src: "/project-art/techwater-report.svg",
    alt: "Illustrative TechWater Water Use Review with fictional billing data",
    position: "center",
  },
  "motoryn": {
    src: "/project-hero/motoryn.webp",
    alt: "AI-generated concept of an unbranded graphite wagon in an understated independent workshop",
    position: "center",
  },
  "experience-elsewhere": {
    src: "/project-hero/experience-elsewhere.webp",
    alt: "AI-generated Mediterranean-inspired lane with warm stone walls, olive foliage and a view of the blue sea",
    position: "center",
  },
  "my-healthy-aura": {
    src: "https://images.pexels.com/photos/17640379/pexels-photo-17640379.jpeg?auto=compress&cs=tinysrgb&w=2200",
    alt: "Serene modern wellness interior with soft natural light",
    position: "center 48%",
  },
  "swift-deal-solutions": {
    src: "https://images.pexels.com/photos/10410073/pexels-photo-10410073.jpeg?auto=compress&cs=tinysrgb&w=2200",
    alt: "Modern glass towers in an urban business district",
    position: "center 50%",
  },
  "dj-hotwax": {
    src: "https://images.pexels.com/photos/5175355/pexels-photo-5175355.jpeg?auto=compress&cs=tinysrgb&w=2200",
    alt: "DJ turntables and mixer in a dark nightlife setting",
    position: "center 52%",
  },
  "vanta-helix": {
    src: "https://images.pexels.com/photos/3912482/pexels-photo-3912482.jpeg?auto=compress&cs=tinysrgb&w=2200",
    alt: "Scientist working with precision laboratory equipment",
    position: "center 42%",
  },
  "cannacore-seeds": {
    src: "https://images.pexels.com/photos/17497507/pexels-photo-17497507.jpeg?auto=compress&cs=tinysrgb&w=2200",
    alt: "Young seedling emerging from rich soil",
    position: "center 46%",
  },
  snarklogic: {
    src: "https://images.pexels.com/photos/29542363/pexels-photo-29542363.jpeg?auto=compress&cs=tinysrgb&w=2200",
    alt: "Modern digital media and editing workspace",
    position: "center 52%",
  },
  "alder-and-meridian": {
    src: "https://images.pexels.com/photos/33827309/pexels-photo-33827309.jpeg?auto=compress&cs=tinysrgb&w=2200",
    alt: "Refined modern interior with warm wood detailing",
    position: "center 50%",
  },
  jentlemens: {
    src: "https://images.pexels.com/photos/6764995/pexels-photo-6764995.jpeg?auto=compress&cs=tinysrgb&w=2200",
    alt: "Tailor and client reviewing fabric samples in an atelier",
    position: "center 48%",
  },
  "united-american-future": {
    src: "https://images.pexels.com/photos/6647015/pexels-photo-6647015.jpeg?auto=compress&cs=tinysrgb&w=2200",
    alt: "Volunteers working together on a community service effort",
    position: "center 48%",
  },
  "world-forward-foundation": {
    src: "https://images.pexels.com/photos/6994869/pexels-photo-6994869.jpeg?auto=compress&cs=tinysrgb&w=2200",
    alt: "Volunteers organizing donated supplies in a warehouse",
    position: "center 46%",
  },
  "payer-delta": {
    src: "https://images.pexels.com/photos/3184436/pexels-photo-3184436.jpeg?auto=compress&cs=tinysrgb&w=2200",
    alt: "Medical billing operations team reviewing appeal documentation for Payer Delta Arizona",
    position: "center 46%",
  },
  "givewise-insights": {
    src: "https://images.pexels.com/photos/7869102/pexels-photo-7869102.jpeg?auto=compress&cs=tinysrgb&w=2200",
    alt: "Professionals discussing strategy in a modern office",
    position: "center 45%",
  },
  "advibe-central": {
    src: "https://images.pexels.com/photos/34002297/pexels-photo-34002297.jpeg?auto=compress&cs=tinysrgb&w=2200",
    alt: "Creative video production and editing studio",
    position: "center 50%",
  },
  "kinetic-aromatics": {
    src: "https://images.pexels.com/photos/6707562/pexels-photo-6707562.jpeg?auto=compress&cs=tinysrgb&w=2200",
    alt: "Minimal essential oil bottles arranged for an aromatic ritual",
    position: "center 48%",
  },
  "atlas-assets": {
    src: "https://images.pexels.com/photos/9034729/pexels-photo-9034729.jpeg?auto=compress&cs=tinysrgb&w=2200",
    alt: "Professionals reviewing global strategy around a world map",
    position: "center 46%",
  },
  "autocomp-corp": {
    src: "https://images.pexels.com/photos/5483240/pexels-photo-5483240.jpeg?auto=compress&cs=tinysrgb&w=2200",
    alt: "Laptop in a modern office displaying a cybersecurity interface",
    position: "center 50%",
  },
  "toenail-fungus-survivor-foundation": {
    src: "/project-art/tfsf.svg",
    alt: "Abstract TFSF illustration representing survivor support and evidence-based health education",
    position: "center",
  },
  "crestline-metals": {
    src: "https://images.pexels.com/photos/7739856/pexels-photo-7739856.jpeg?auto=compress&cs=tinysrgb&w=2400",
    alt: "Heavy industrial steel manufacturing environment",
    position: "center 48%",
  },
  "ameliora": {
    src: "https://images.pexels.com/photos/33714885/pexels-photo-33714885.jpeg?auto=compress&cs=tinysrgb&w=2200",
    alt: "Diverse community members engaging in a welcoming and comfortable living space",
    position: "center 48%",
  },
};

export function getVentureImage(slug: string): VentureImage | undefined {
  return ventureImagery[slug];
}
