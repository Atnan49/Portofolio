import { useRef } from "react";
import {
  PORTFOLIO_PROFILE,
  PROFILE_META,
  STACK_CATEGORIES,
} from "../data/portfolio";
import { SplitText, gsap, useGSAP } from "../lib/gsap";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        SplitText.create(".js-about-title", {
          type: "lines",
          mask: "lines",
          linesClass: "gsap-split-line",
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.lines, {
              yPercent: 115,
              duration: 0.48,
              ease: "power4.out",
              scrollTrigger: {
                trigger: ".js-about-title",
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            });
          },
        });

        gsap.utils.toArray<HTMLElement>(".js-about-meta-row").forEach((row) => {
          gsap.from(row, {
            clipPath: "inset(0% 0% 100% 0%)",
            y: 34,
            duration: 0.46,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          });
        });

        SplitText.create(".js-about-lead", {
          type: "lines",
          mask: "lines",
          linesClass: "gsap-split-line",
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.lines, {
              yPercent: 115,
              duration: 0.52,
              stagger: 0.06,
              ease: "power4.out",
              scrollTrigger: {
                trigger: ".js-about-lead",
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            });
          },
        });

        SplitText.create(".js-about-body", {
          type: "lines",
          mask: "lines",
          linesClass: "gsap-split-line",
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.lines, {
              yPercent: 115,
              duration: 0.5,
              stagger: 0.045,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ".js-about-body",
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            });
          },
        });

        gsap.from(".js-about-rule", {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.48,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".js-about-stack-block",
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.utils.toArray<HTMLElement>(".js-about-stack-item").forEach((item) => {
          gsap.from(item, {
            clipPath: "inset(0% 0% 100% 0%)",
            y: 42,
            duration: 0.48,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="tentang"
      ref={sectionRef}
      className="overflow-x-clip border-b border-[#D4D4D4] bg-[#F7F7F5] text-[#0A0A0A] dark:border-[#262626] dark:bg-[#0A0A0A] dark:text-[#FAFAFA]"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-5 py-16 md:px-10 md:py-20 lg:grid-cols-12 lg:gap-16 lg:px-20 lg:py-24">
        <div className="flex flex-col gap-6 lg:col-span-4">
          <h2 className="js-about-title font-serif text-2xl font-bold md:text-[1.75rem]">
            Tentang
          </h2>

          <dl className="divide-y divide-[#D4D4D4] border-y border-[#D4D4D4] dark:divide-[#262626] dark:border-[#262626]">
            {PROFILE_META.map((row) => (
              <div
                key={row.label}
                className="js-about-meta-row flex items-center justify-between gap-4 py-3.5 text-sm"
              >
                <dt className="text-[#525252] dark:text-[#A3A3A3]">{row.label}</dt>
                <dd className="text-right font-semibold text-[#0A0A0A] dark:text-[#FAFAFA]">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-8">
          <p className="js-about-lead font-serif text-[1.375rem] leading-[1.45] text-[#0A0A0A] md:text-[1.75rem] dark:text-[#FAFAFA]">
            {PORTFOLIO_PROFILE.aboutLead}
          </p>

          <p className="js-about-body text-[15px] leading-[1.7] text-[#525252] md:text-base dark:text-[#A3A3A3]">
            {PORTFOLIO_PROFILE.aboutBody}
          </p>

          <div className="js-about-stack-block flex flex-col gap-6">
            <div className="js-about-rule h-px bg-[#D4D4D4] dark:bg-[#262626]" />

            <div className="grid grid-cols-1 gap-6 pt-1 sm:grid-cols-3 sm:gap-7">
              {STACK_CATEGORIES.map((group) => (
                <div
                  key={group.title}
                  className="js-about-stack-item flex flex-col gap-1.5"
                >
                  <h3 className="text-[13px] font-bold text-[#0A0A0A] dark:text-[#FAFAFA]">
                    {group.title}
                  </h3>
                  <p className="text-sm leading-[1.6] text-[#525252] dark:text-[#A3A3A3]">
                    {group.items}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
