import { useRef } from "react";
import { PORTFOLIO_PROFILE } from "../data/portfolio";
import { SplitText, gsap, useGSAP } from "../lib/gsap";
import { useAnimeTilt3D } from "../lib/useAnimeTilt3D";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stage3dRef = useRef<HTMLDivElement>(null);
  const plane3dRef = useRef<HTMLDivElement>(null);
  const backdrop3dRef = useRef<HTMLDivElement>(null);

  useAnimeTilt3D({
    stageRef: stage3dRef,
    planeRef: plane3dRef,
    backdropRef: backdrop3dRef,
    maxTilt: 5.5,
    backdropShift: 10,
  });

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        SplitText.create(".js-hero-name", {
          type: "lines, words",
          mask: "lines",
          linesClass: "gsap-split-line",
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.words, {
              yPercent: 108,
              rotation: 1.8,
              transformOrigin: "left bottom",
              duration: 0.9,
              stagger: 0.085,
              ease: "expo.out",
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
              yPercent: 105,
              duration: 0.8,
              stagger: 0.08,
              delay: 0.36,
              ease: "power3.out",
            });
          },
        });

        const openingTl = gsap.timeline();

        openingTl
          .from(
            ".js-hero-role",
            {
              clipPath: "inset(0% 100% 0% 0%)",
              x: -14,
              duration: 0.85,
              ease: "power3.out",
            },
            0.22
          )
          .from(
            ".js-hero-rule",
            {
              scaleX: 0,
              transformOrigin: "left center",
              duration: 0.72,
              ease: "expo.out",
            },
            0.3
          )
          .from(
            ".js-hero-cta > a",
            {
              y: 18,
              opacity: 0,
              duration: 0.7,
              stagger: 0.1,
              ease: "expo.out",
            },
            0.52
          )
          .from(
            ".js-hero-shutter",
            {
              clipPath: "inset(0% 0% 100% 0%)",
              duration: 1.05,
              ease: "expo.out",
            },
            0.12
          )
          .from(
            ".js-hero-portrait",
            {
              scale: 1.15,
              duration: 1.25,
              ease: "expo.out",
            },
            0.12
          )
          .from(
            ".js-hero-outline-wipe",
            {
              clipPath: "inset(0% 0% 100% 0%)",
              scale: 1.04,
              duration: 1.35,
              ease: "expo.out",
            },
            0.16
          );

        gsap.to(".js-hero-outline", {
          y: -36,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(".js-hero-copy", {
          y: -24,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(".js-hero-parallax", {
          y: 42,
          scale: 0.97,
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
      className="relative overflow-hidden border-b border-[#D4D4D4] bg-[#F7F7F5] text-[#0A0A0A] dark:border-[#262626] dark:bg-[#0A0A0A] dark:text-[#FAFAFA]"
    >
      <div
        aria-hidden="true"
        className="js-hero-outline pointer-events-none absolute top-16 -right-8 z-0 flex w-[320px] select-none items-start sm:inset-y-0 sm:top-0 sm:right-auto sm:left-[30%] sm:w-[480px] sm:items-center lg:left-[40%] lg:w-[600px]"
      >
        <div className="js-hero-outline-wipe w-full [mask-image:linear-gradient(to_bottom,black_64%,transparent_100%)]">
          <img
            src="/images/atnan-outline.webp"
            alt=""
            width={896}
            height={985}
            decoding="async"
            className="block h-auto w-full object-contain opacity-[0.13] dark:invert dark:opacity-[0.16]"
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto grid min-h-[calc(100svh-4.5rem)] max-w-[1440px] grid-cols-1 items-center gap-10 px-5 py-10 md:px-10 md:py-16 lg:grid-cols-12 lg:gap-16 lg:px-20 lg:py-20">
        <div className="js-hero-copy flex flex-col gap-6 lg:col-span-7">
          <div className="flex flex-col gap-3">
            <h1 className="js-hero-name font-serif text-[2.25rem] leading-[1.12] font-bold tracking-tight sm:text-5xl lg:text-[3.75rem]">
              {PORTFOLIO_PROFILE.fullName}
            </h1>

            <p className="js-hero-role font-serif text-xl leading-[1.3] italic text-[#525252] sm:text-2xl lg:text-[1.875rem] dark:text-[#D4D4D4]">
              {PORTFOLIO_PROFILE.role}
            </p>
          </div>

          <div
            aria-hidden="true"
            className="js-hero-rule h-px w-14 bg-[#0A0A0A] dark:bg-[#FAFAFA]"
          />

          <p className="js-hero-intro max-w-xl text-base leading-[1.7] text-[#525252] md:text-lg dark:text-[#A3A3A3]">
            {PORTFOLIO_PROFILE.heroIntro}
          </p>

          <div className="js-hero-cta flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:gap-6">
            <a
              href="#karya"
              className="inline-flex min-h-12 items-center justify-center rounded bg-[#0A0A0A] px-7 py-3 text-[15px] font-bold text-[#FAFAFA] transition-colors duration-150 hover:bg-[#262626] dark:bg-[#FAFAFA] dark:text-[#0A0A0A] dark:hover:bg-[#D4D4D4]"
            >
              Lihat Karya Pilihan
            </a>

            <a
              href="#kontak"
              className="inline-flex min-h-12 items-center justify-center rounded border border-[#737373] px-5 py-3 text-[15px] font-semibold text-[#0A0A0A] transition-colors duration-150 hover:bg-[#0A0A0A] hover:text-[#FAFAFA] sm:rounded-none sm:border-0 sm:border-b sm:border-current sm:px-1 sm:hover:bg-transparent sm:hover:text-[#525252] dark:text-[#FAFAFA] dark:hover:bg-[#FAFAFA] dark:hover:text-[#0A0A0A] sm:dark:hover:bg-transparent sm:dark:hover:text-[#D4D4D4]"
            >
              Hubungi Saya
            </a>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[440px] lg:col-span-5 lg:mx-0 lg:justify-self-end">
          <div className="js-hero-parallax w-full">
            <div ref={stage3dRef} className="w-full [perspective:1100px]">
              <div
                ref={plane3dRef}
                className="relative w-full [transform-style:preserve-3d]"
              >
                <div
                  ref={backdrop3dRef}
                  aria-hidden="true"
                  style={{ transform: "translateZ(-24px)" }}
                  className="pointer-events-none absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-[2px] border border-[#0A0A0A]/25 dark:border-[#FAFAFA]/25"
                />

                <div
                  style={{ transform: "translateZ(18px)" }}
                  className="js-hero-shutter relative overflow-hidden rounded-[2px] border border-[#D4D4D4] bg-[#141414] dark:border-[#262626]"
                >
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
        </div>
      </div>
    </section>
  );
}
