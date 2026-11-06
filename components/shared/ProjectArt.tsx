import Image from "next/image";

export function ProjectArt({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div className="project-art-frame">
      <Image src={src} alt={alt} fill priority={priority} sizes="(max-width: 800px) 100vw, 50vw" />
      <div className="art-vignette" />
    </div>
  );
}
