import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, Flip, SplitText);
}

interface VerticalRiseOptions {
  trigger?: gsap.DOMTarget;
  y?: number;
  scale?: number;
  start?: string;
  durationIn?: number;
  durationOut?: number;
}

export function createVerticalRiseTrigger(
  target: gsap.DOMTarget,
  {
    trigger,
    y = 60,
    scale = 0.96,
    start = "top 72%",
    durationIn = 0.72,
    durationOut = 0.52,
  }: VerticalRiseOptions = {}
) {
  gsap.set(target, { y, scale, opacity: 0 });

  return ScrollTrigger.create({
    trigger: trigger ?? target,
    start,
    end: "max",
    onEnter: () => {
      gsap.to(target, {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: durationIn,
        ease: "power3.out",
        overwrite: "auto",
      });
    },
    onLeaveBack: () => {
      gsap.to(target, {
        y,
        scale,
        opacity: 0,
        duration: durationOut,
        ease: "power2.out",
        overwrite: "auto",
      });
    },
  });
}

export function createSplitRiseTrigger(
  target: string,
  {
    start = "top 72%",
    stagger = 0.075,
    durationIn = 0.74,
    durationOut = 0.5,
  }: {
    start?: string;
    stagger?: number;
    durationIn?: number;
    durationOut?: number;
  } = {}
) {
  let st: ScrollTrigger | null = null;

  return SplitText.create(target, {
    type: "lines",
    mask: "lines",
    linesClass: "gsap-split-line",
    autoSplit: true,
    onRevert() {
      st?.kill();
      st = null;
    },
    onSplit(self) {
      st?.kill();
      const triggerEl = self.elements[0];
      gsap.set(self.lines, { yPercent: 118 });
      st = ScrollTrigger.create({
        trigger: triggerEl,
        start,
        end: "max",
        onEnter: () => {
          gsap.to(self.lines, {
            yPercent: 0,
            duration: durationIn,
            stagger,
            ease: "power3.out",
            overwrite: true,
          });
        },
        onLeaveBack: () => {
          gsap.to(self.lines, {
            yPercent: 118,
            duration: durationOut,
            stagger: { each: Math.min(0.04, stagger), from: "end" },
            ease: "power2.out",
            overwrite: true,
          });
        },
      });
    },
  });
}

export { Flip, ScrollTrigger, SplitText, gsap, useGSAP };
