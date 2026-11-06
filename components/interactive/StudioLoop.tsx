"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

const steps = [
  {
    id: "01",
    name: "Identify",
    copy: "Find a recurring problem or commercial territory worth examining, then define who cares and why.",
    metric: "Problem clarity",
    status: "Signal mapped",
    image: "https://images.pexels.com/photos/6803532/pexels-photo-6803532.jpeg?auto=compress&cs=tinysrgb&w=2200",
    imageAlt: "Business team mapping strategy on a whiteboard in a modern office",
    accent: "#9A7546",
    soft: "rgba(154,117,70,.20)",
    panel: "rgba(112,78,42,.34)",
    panelDeep: "rgba(40,27,16,.88)",
  },
  {
    id: "02",
    name: "Design",
    copy: "Map the offer, workflow, business logic, user experience, operating requirements, and major risks.",
    metric: "System coherence",
    status: "Architecture defined",
    image: "https://images.pexels.com/photos/3912369/pexels-photo-3912369.jpeg?auto=compress&cs=tinysrgb&w=2200",
    imageAlt: "Engineers collaborating on a hands-on prototype in a workshop",
    accent: "#5F7F83",
    soft: "rgba(95,127,131,.20)",
    panel: "rgba(56,84,88,.36)",
    panelDeep: "rgba(18,33,36,.90)",
  },
  {
    id: "03",
    name: "Test",
    copy: "Challenge the assumptions with interviews, demand tests, technical benchmarks, pilot workflows, or market feedback.",
    metric: "Evidence strength",
    status: "Assumptions in review",
    image: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=2200",
    imageAlt: "Professional team reviewing survey results, charts, and validation data",
    accent: "#5A6E9A",
    soft: "rgba(90,110,154,.20)",
    panel: "rgba(53,66,103,.38)",
    panelDeep: "rgba(15,22,39,.92)",
  },
  {
    id: "04",
    name: "Build",
    copy: "Advance the venture with the operating structure, resources, partnerships, and execution priorities appropriate to the next stage.",
    metric: "Deployment readiness",
    status: "Next stage defined",
    image: "https://images.pexels.com/photos/18002972/pexels-photo-18002972.jpeg?auto=compress&cs=tinysrgb&w=2200",
    imageAlt: "Modern office tower under construction representing venture execution and progress",
    accent: "#4F6B61",
    soft: "rgba(79,107,97,.22)",
    panel: "rgba(41,67,58,.40)",
    panelDeep: "rgba(12,24,21,.92)",
  },
] as const;

type StudioVars = CSSProperties & {
  "--phase-accent": string;
  "--phase-soft": string;
  "--phase-panel": string;
  "--phase-panel-deep": string;
};

type StepVars = CSSProperties & {
  "--step-accent": string;
  "--step-soft": string;
  "--step-panel": string;
  "--step-panel-deep": string;
};

export function StudioLoop() {
  const [active, setActive] = useState(0);
  const [revealed, setRevealed] = useState(() => new Set([0]));
  const stepRefs = useRef<(HTMLElement | null)[]>([]);
  const activeStep = steps[active];

  useEffect(() => {
    const observers = stepRefs.current.map((element, index) => {
      if (!element) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          setActive(index);
          setRevealed((current) => {
            if (current.has(index)) return current;
            const next = new Set(current);
            next.add(index);
            return next;
          });
        },
        { rootMargin: "-32% 0px -48%", threshold: 0 },
      );
      observer.observe(element);
      return observer;
    });
    return () => observers.forEach((observer) => observer?.disconnect());
  }, []);

  const studioVars: StudioVars = {
    "--phase-accent": activeStep.accent,
    "--phase-soft": activeStep.soft,
    "--phase-panel": activeStep.panel,
    "--phase-panel-deep": activeStep.panelDeep,
  };

  return (
    <div className={`studio-loop studio-loop-photographic studio-phase-${active + 1}`} style={studioVars}>
      <div className="studio-visual-panel" id="studio-phase-visual" role="tabpanel" aria-live="polite">
        <div className="studio-visual-topline"><span>Studio Process / Phase {activeStep.id}</span><span>{activeStep.name}</span></div>
        <div className="studio-visual-frame">
          {steps.map((step, index) => (
            <div key={step.id} className={`studio-phase-photo ${active === index ? "is-active" : ""}`} aria-hidden={active !== index}>
              <img src={step.image} alt={active === index ? step.imageAlt : ""} loading={index === 0 ? "eager" : "lazy"} />
              <div className="studio-phase-photo-shade" />
              <div className="studio-phase-caption"><span>{step.id}</span><strong>{step.name}</strong></div>
            </div>
          ))}
        </div>
        <div className="studio-data-overlay" key={activeStep.id}>
          <div><span>Core metric</span><strong>{activeStep.metric}</strong></div>
          <div><span>Status</span><strong><i aria-hidden="true" />{activeStep.status}</strong></div>
        </div>
      </div>

      <div className="studio-steps-shell">
        <p className="studio-steps-helper">Scroll to follow the operating sequence</p>
        <div className="studio-steps" aria-label="Studio operating phases">
          {steps.map((step, index) => {
            const stepVars: StepVars = {
              "--step-accent": step.accent,
              "--step-soft": step.soft,
              "--step-panel": step.panel,
              "--step-panel-deep": step.panelDeep,
            };

            return (
              <article
                key={step.id}
                ref={(element) => { stepRefs.current[index] = element; }}
                className={`${active === index ? "is-active" : ""} ${revealed.has(index) ? "is-revealed" : ""}`}
                aria-current={active === index ? "step" : undefined}
                style={stepVars}
              >
                <span>{step.id}</span>
                <div><strong>{step.name}</strong><p>{step.copy}</p></div>
                <i className="studio-step-marker" aria-hidden="true" />
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
