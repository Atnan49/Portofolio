import { useEffect, useRef } from "react";
import { animate, stagger, svg } from "animejs";
import { PORTFOLIO_PROFILE } from "../data/portfolio";
import { SplitText, gsap, useGSAP } from "../lib/gsap";
import { useAnimeTilt3D } from "../lib/useAnimeTilt3D";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const markSvgRef = useRef<SVGSVGElement>(null);
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

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const svgEl = markSvgRef.current;
    if (!svgEl) return;

    const paths = svgEl.querySelectorAll(".js-mark-path");
    if (paths.length === 0) return;

    const drawAnim = animate(svg.createDrawable(paths), {
      draw: ["0 0", "0 1"],
      duration: 1300,
      delay: stagger(75, { start: 180 }),
      ease: "inOutExpo",
    });

    return () => {
      drawAnim.revert();
    };
  }, []);

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
          );

        gsap.to(".js-hero-mark-layer", {
          y: -34,
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
        className="js-hero-mark-layer pointer-events-none absolute top-14 -right-12 z-0 flex w-[280px] select-none items-center justify-center sm:inset-y-0 sm:top-0 sm:right-auto sm:left-[34%] sm:w-[440px] lg:left-[41%] lg:w-[540px]"
      >
        <svg
          ref={markSvgRef}
          viewBox="0 0 320 320"
          fill="none"
          className="h-auto w-full text-[#0A0A0A] opacity-[0.09] dark:text-[#FAFAFA] dark:opacity-[0.11]"
        >
          <rect
            className="js-mark-path"
            x="24"
            y="24"
            width="272"
            height="272"
            rx="44"
            stroke="currentColor"
            strokeWidth="1.25"
          />
          <circle
            className="js-mark-path"
            cx="160"
            cy="160"
            r="108"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
          <line
            className="js-mark-path"
            x1="54"
            y1="266"
            x2="266"
            y2="54"
            stroke="currentColor"
            strokeWidth="0.9"
          />
          <line
            className="js-mark-path"
            x1="160"
            y1="8"
            x2="160"
            y2="42"
            stroke="currentColor"
            strokeWidth="1.1"
          />
          <line
            className="js-mark-path"
            x1="160"
            y1="278"
            x2="160"
            y2="312"
            stroke="currentColor"
            strokeWidth="1.1"
          />
          <line
            className="js-mark-path"
            x1="8"
            y1="160"
            x2="42"
            y2="160"
            stroke="currentColor"
            strokeWidth="1.1"
          />
          <line
            className="js-mark-path"
            x1="278"
            y1="160"
            x2="312"
            y2="160"
            stroke="currentColor"
            strokeWidth="1.1"
          />
          <path
            className="js-mark-path"
            d="M84 240L160 66L236 240"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="js-mark-path"
            d="M112 240L160 124L208 240"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="js-mark-path"
            d="M104 186H216"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle
            className="js-mark-path"
            cx="244"
            cy="76"
            r="12"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
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
