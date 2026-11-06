import type { ReactNode } from "react";

export function SectionHeading({ index, eyebrow, title, children }: { index?: string; eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <div className="section-heading">
      <div className="section-kicker">{index && <span>{index}</span>} {eyebrow}</div>
      <h2>{title}</h2>
      {children && <div className="section-intro">{children}</div>}
    </div>
  );
}
