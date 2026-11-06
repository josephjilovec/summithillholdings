import type { CSSProperties } from "react";
import type { VenturePlan } from "@/lib/venturePlans";
import styles from "./VentureLaunchPlan.module.css";

export function VentureLaunchPlan({ plan, accent }: { plan: VenturePlan; accent: string }) {
  return (
    <section className={`section ${styles.plan}`} style={{ "--plan-accent": accent } as CSSProperties} aria-labelledby="launch-plan-title">
      <p className={styles.kicker}>A focused path to validation</p>
      <h2 id="launch-plan-title">The customer, the offer, the first proof.</h2>
      <p className={styles.note}>Proposed operating direction. These audiences, service scopes and milestones are plans to validate, rather than claims of available services or completed results.</p>
      <div className={styles.audiences}>
        {plan.audiences.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.description}</p></article>)}
      </div>
      <div className={styles.offer}>
        <div><p className={styles.kicker}>Proposed first offer</p><h3>{plan.offer}</h3><p>{plan.offerDescription}</p></div>
        <ul>{plan.deliverables.map((item) => <li key={item.title}><strong>{item.title}</strong><p>{item.description}</p></li>)}</ul>
      </div>
      <p className={styles.kicker}>Validation targets</p>
      <ol className={styles.milestones}>{plan.milestones.map((item) => <li key={item.title}><h3>{item.title}</h3><p>{item.description}</p></li>)}</ol>
      <p className={styles.note}>{plan.imageDisclosure ?? "The project imagery is AI-generated concept art. It does not document an operating service, inspected property, customer engagement or bookable experience."}</p>
    </section>
  );
}
