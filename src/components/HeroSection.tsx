import { useRef } from "react";
import { PORTFOLIO_PROFILE } from "../data/portfolio";
import { SplitText, gsap, useGSAP } from "../lib/gsap";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const createTrigger = () => ({
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom 18%",
          toggleActions: "play reverse play none",
        });

        SplitText.create(".js-hero-name", {
          type: "lines",
          mask: "lines",
          linesClass: "gsap-split-line",
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.lines, {
              yPercent: 112,
              duration: 0.56,
              stagger: 0.08,
              ease: "power4.out",
              scrollTrigger: createTrigger(),
            });
          },
        });

        SplitText.create(".js-hero-role", {
          type: "lines",
          mask: "lines",
          linesClass: "gsap-split-line",
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.lines, {
              yPercent: 115,
              duration: 0.52,
              delay: 0.08,
              ease: "power4.out",
              scrollTrigger: createTrigger(),
            });
          },
        });

        SplitText.create(".js-hero-intro", {
          type: "lines",
          mask: "lines",
          linesClass: "gsap-split-line",
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.lines, {
              yPercent: 115,
              duration: 0.52,
              stagger: 0.055,
              delay: 0.14,
              ease: "power3.out",
              scrollTrigger: createTrigger(),
            });
          },
        });

        const tl = gsap.timeline({ scrollTrigger: createTrigger() });
        tl.from(
          ".js-hero-cta > a",
          {
            clipPath: "inset(0% 100% 0% 0%)",
            x: -24,
            duration: 0.48,
            stagger: 0.08,
            ease: "power3.out",
          },
          0.18
        )
          .from(
            ".js-hero-shutter",
            {
              clipPath: "inset(100% 0% 0% 0%)",
              duration: 0.62,
              ease: "power4.out",
            },
            0.08
          )
          .from(
            ".js-hero-portrait",
            {
              scale: 1.12,
              duration: 0.72,
              ease: "power3.out",
            },
            0.08
          );

        gsap.to(".js-hero-parallax", {
          y: 36,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="overflow-x-clip border-b border-[#D4D4D4] bg-[#F7F7F5] text-[#0A0A0A] dark:border-[#262626] dark:bg-[#0A0A0A] dark:text-[#FAFAFA]"
    >
      <div className="mx-auto grid min-h-[calc(100svh-4.5rem)] max-w-[1440px] grid-cols-1 items-center gap-10 px-5 py-10 md:px-10 md:py-16 lg:grid-cols-12 lg:gap-16 lg:px-20 lg:py-20">
        <div className="flex flex-col gap-6 lg:col-span-7">
          <div className="flex flex-col gap-3">
            <h1 className="js-hero-name font-serif text-[2.25rem] leading-[1.12] font-bold tracking-tight sm:text-5xl lg:text-[3.75rem]">
              {PORTFOLIO_PROFILE.fullName}
            </h1>

            <p className="js-hero-role font-serif text-xl leading-[1.3] italic text-[#525252] sm:text-2xl lg:text-[1.875rem] dark:text-[#D4D4D4]">
              {PORTFOLIO_PROFILE.role}
            </p>
          </div>

          <p className="js-hero-intro max-w-xl text-base leading-[1.7] text-[#525252] md:text-lg dark:text-[#A3A3A3]">
            {PORTFOLIO_PROFILE.heroIntro}
          </p>

          <div className="js-hero-cta flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:gap-6">
            <a
              href="#karya"
              className="inline-flex min-h-12 items-center justify-center rounded bg-[#0A0A0A] px-7 py-3 text-[15px] font-bold text-[#FAFAFA] transition-colors duration-150 hover:bg-[#262626] active:scale-[0.98] dark:bg-[#FAFAFA] dark:text-[#0A0A0A] dark:hover:bg-[#D4D4D4]"
            >
              Lihat Karya Pilihan
            </a>

            <a
              href="#kontak"
              className="inline-flex min-h-12 items-center justify-center rounded border border-[#737373] px-5 py-3 text-[15px] font-semibold text-[#0A0A0A] transition-colors duration-150 hover:bg-[#0A0A0A] hover:text-[#FAFAFA] active:scale-[0.98] sm:rounded-none sm:border-0 sm:border-b sm:border-current sm:px-1 sm:hover:bg-transparent sm:hover:text-[#525252] dark:text-[#FAFAFA] dark:hover:bg-[#FAFAFA] dark:hover:text-[#0A0A0A] sm:dark:hover:bg-transparent sm:dark:hover:text-[#D4D4D4]"
            >
              Hubungi Saya
            </a>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[440px] lg:col-span-5 lg:mx-0 lg:justify-self-end">
          <div className="js-hero-parallax w-full">
            <div className="js-hero-shutter overflow-hidden rounded-[2px] border border-[#D4D4D4] bg-[#141414] dark:border-[#262626]">
              <img
                src={PORTFOLIO_PROFILE.portraitSrc}
                alt={PORTFOLIO_PROFILE.portraitAlt}
                width={PORTFOLIO_PROFILE.portraitWidth}
                height={PORTFOLIO_PROFILE.portraitHeight}
                fetchPriority="high"
                decoding="async"
                className="js-hero-portrait block h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
