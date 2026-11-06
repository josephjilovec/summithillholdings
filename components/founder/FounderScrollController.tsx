"use client";

import { useEffect } from "react";

export function FounderScrollController({ rootId }: { rootId: string }) {
  useEffect(() => {
    const root = document.getElementById(rootId);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!root || reduceMotion) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    async function initializeScrollytelling() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled || !root) return;

      gsap.registerPlugin(ScrollTrigger);

      const context = gsap.context(() => {
        const viewportDistance = (multiplier: number) => () => `+=${window.innerHeight * multiplier}`;
        const mobile = window.matchMedia("(max-width: 900px)").matches;

        const introPhase = root.querySelector<HTMLElement>("[data-founder-phase='intro']");
        const introStage = introPhase?.querySelector<HTMLElement>(".founder-story-stage");
        const introPortrait = introPhase?.querySelector<HTMLElement>(".founder-intro-portrait");
        const introReveals = introPhase?.querySelectorAll<HTMLElement>("[data-founder-intro-reveal]");

        if (introPhase && introStage && introPortrait && introReveals?.length) {
          gsap.set(introPortrait, { scale: 1.055 });
          gsap.set(introReveals, { autoAlpha: 0, y: 32 });

          gsap.timeline({
            scrollTrigger: {
              trigger: introPhase,
              start: "top top",
              end: viewportDistance(mobile ? 1.4 : 1.7),
              pin: introStage,
              pinSpacing: true,
              scrub: 0.65,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })
            .to(introPortrait, { scale: 1, duration: 1.5, ease: "none" }, 0)
            .to(introReveals, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.32, ease: "power2.out" }, 0.2)
            .to({}, { duration: 0.45 });
        }

        const modelPhase = root.querySelector<HTMLElement>("[data-founder-phase='model']");
        const modelStage = modelPhase?.querySelector<HTMLElement>(".founder-story-stage");
        const modelCards = modelPhase?.querySelectorAll<HTMLElement>("[data-founder-model-card]");

        if (modelPhase && modelStage && modelCards?.length) {
          gsap.set(modelCards, { autoAlpha: 0, y: 58, scale: 0.985 });

          const modelTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: modelPhase,
              start: "top top",
              end: viewportDistance(mobile ? 3.2 : 3.6),
              pin: modelStage,
              pinSpacing: true,
              scrub: 0.7,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          modelCards.forEach((card, index) => {
            const priorCard = index > 0 ? modelCards[index - 1] : null;
            if (priorCard) {
              modelTimeline.to(priorCard, { autoAlpha: 0, y: -38, scale: 0.965, duration: 0.26, ease: "power1.in" });
            }
            modelTimeline.to(card, { autoAlpha: 1, y: 0, scale: 1, duration: 0.58, ease: "power2.out" });
            modelTimeline.to({}, { duration: 0.35 });
          });
        }

        const lensesPhase = root.querySelector<HTMLElement>("[data-founder-phase='lenses']");
        const lensesStage = lensesPhase?.querySelector<HTMLElement>(".founder-story-stage");
        const lensCards = lensesPhase?.querySelectorAll<HTMLElement>("[data-founder-lens]");

        if (lensesPhase && lensesStage && lensCards?.length) {
          gsap.set(lensCards, { autoAlpha: 0, y: 48, scale: 0.985 });

          const lensTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: lensesPhase,
              start: "top top",
              end: viewportDistance(mobile ? 3.15 : 3.05),
              pin: lensesStage,
              pinSpacing: true,
              scrub: 0.7,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          lensCards.forEach((card, index) => {
            if (mobile && index > 0) {
              lensTimeline.to(lensCards[index - 1], { autoAlpha: 0, y: -34, scale: 0.97, duration: 0.26, ease: "power1.in" });
            }
            lensTimeline.to(card, { autoAlpha: 1, y: 0, scale: 1, duration: 0.58, ease: "power2.out" });
            lensTimeline.to({}, { duration: 0.3 });
          });
        }

        const alignmentPhase = root.querySelector<HTMLElement>("[data-founder-phase='alignment']");
        const alignmentStage = alignmentPhase?.querySelector<HTMLElement>(".founder-story-stage");
        const alignmentReveals = alignmentPhase?.querySelectorAll<HTMLElement>("[data-founder-alignment-reveal]");

        if (alignmentPhase && alignmentStage && alignmentReveals?.length) {
          gsap.set(alignmentReveals, { autoAlpha: 0, y: 42 });

          gsap.timeline({
            scrollTrigger: {
              trigger: alignmentPhase,
              start: "top top",
              end: viewportDistance(mobile ? 1.35 : 1.55),
              pin: alignmentStage,
              pinSpacing: true,
              scrub: 0.65,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })
            .to(alignmentReveals, { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.28, ease: "power2.out" })
            .to({}, { duration: 0.6 });
        }

        root.dataset.motionReady = "true";
        ScrollTrigger.refresh();
      }, root);

      cleanup = () => {
        delete root.dataset.motionReady;
        context.revert();
      };
    }

    void initializeScrollytelling();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [rootId]);

  return null;
}
