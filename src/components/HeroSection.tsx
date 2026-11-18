import { useEffect, useRef } from "react";
import { animate, createSpring, createTimeline, stagger, svg } from "animejs";
import { PORTFOLIO_PROFILE } from "../data/portfolio";
import { SplitText, gsap, useGSAP } from "../lib/gsap";
import { useAnimeTilt3D } from "../lib/useAnimeTilt3D";

const RADIAL_TICKS = Array.from({ length: 24 }, (_, index) => {
  const angle = (index * Math.PI) / 12;
  const rInner = index % 3 === 0 ? 182 : 189;
  const rOuter = 198;
  return {
    x1: Number((220 + Math.cos(angle) * rInner).toFixed(2)),
    y1: Number((220 + Math.sin(angle) * rInner).toFixed(2)),
    x2: Number((220 + Math.cos(angle) * rOuter).toFixed(2)),
    y2: Number((220 + Math.sin(angle) * rOuter).toFixed(2)),
    major: index % 3 === 0,
  };
});

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const markSvgRef = useRef<SVGSVGElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const bookInnerRef = useRef<HTMLDivElement>(null);
  const bookCoverRef = useRef<HTMLDivElement>(null);
  const emblemRef = useRef<HTMLDivElement>(null);
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
    const bookEl = bookRef.current;
    const bookInnerEl = bookInnerRef.current;
    const bookCoverEl = bookCoverRef.current;
    const emblemEl = emblemRef.current;
    if (!svgEl || !bookEl || !bookInnerEl || !bookCoverEl || !emblemEl) return;

    const paths = svgEl.querySelectorAll(".js-mark-path");
    const drawables = paths.length > 0 ? svg.createDrawable(paths) : [];
    const orbitRing = svgEl.querySelector(".js-hero-orbit-ring");

    const tl = createTimeline();

    tl.set(bookEl, { opacity: 0, scale: 0.65, y: 26 })
      .set(bookInnerEl, { rotateX: 16, rotateY: -18 })
      .set(bookCoverEl, { rotateY: 0 })
      .set(emblemEl, { opacity: 0, scale: 0.2, y: 28 })
      // 1. Buku monokrom muncul ke ruang 3D
      .add(
        bookEl,
        {
          opacity: [0, 1],
          scale: [0.65, 1],
          y: [26, 0],
          duration: 380,
          ease: "outExpo",
        },
        0
      )
      // 2. Sampul buku terbuka lebar dalam 3D
      .add(
        bookInnerEl,
        {
          rotateX: 8,
          rotateY: 0,
          duration: 580,
          ease: "inOutExpo",
        },
        300
      )
      .add(
        bookCoverEl,
        {
          rotateY: [0, -158],
          duration: 620,
          ease: "inOutExpo",
        },
        300
      )
      // 3. Logo monogram mekar keluar dari dalam buku sambil digambar
      .add(
        emblemEl,
        {
          opacity: [0, 1],
          scale: [0.2, 1],
          y: [28, 0],
          duration: 920,
          ease: createSpring({ stiffness: 165, damping: 18 }),
        },
        620
      );

    if (drawables.length > 0) {
      tl.add(
        drawables,
        {
          draw: ["0 0", "0 1"],
          duration: 1120,
          delay: stagger(18),
          ease: "outExpo",
        },
        640
      );
    }

    // 4. Buku mengecil ke belakang logo lalu menghilang
    tl.add(
      bookEl,
      {
        scale: [1, 0.14],
        y: [0, 18],
        opacity: [1, 0],
        duration: 560,
        ease: "inExpo",
      },
      1060
    );

    const orbitAnim = orbitRing
      ? animate(orbitRing, {
          rotate: 360,
          duration: 90000,
          loop: true,
          ease: "linear",
        })
      : null;

    return () => {
      tl.revert();
      orbitAnim?.revert();
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
          y: -48,
          scale: 1.06,
          rotate: 5,
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
        className="js-hero-mark-layer pointer-events-none absolute -top-6 -right-24 z-0 flex w-[460px] select-none items-center justify-center sm:top-1/2 sm:-right-16 sm:w-[680px] sm:-translate-y-1/2 lg:left-[30%] lg:right-auto lg:w-[880px]"
      >
        <div
          ref={bookRef}
          className="js-hero-book motion-reduce:hidden pointer-events-none absolute inset-0 z-0 flex items-center justify-center [perspective:1200px]"
        >
          <div
            ref={bookInnerRef}
            className="relative h-[220px] w-[165px] -translate-x-4 sm:h-[280px] sm:w-[210px] sm:-translate-x-8 lg:h-[320px] lg:w-[240px] lg:-translate-x-16 [transform-style:preserve-3d]"
          >
            <div className="absolute inset-0 rounded-r-[4px] border-2 border-[#0A0A0A]/30 bg-[#F7F7F5]/80 p-5 shadow-[12px_18px_36px_-20px_rgba(10,10,10,0.28)] dark:border-[#FAFAFA]/30 dark:bg-[#141414]/80 dark:shadow-[12px_18px_36px_-18px_rgba(0,0,0,0.9)]">
              <div className="flex h-full flex-col justify-between border-l border-[#0A0A0A]/20 pl-3.5 dark:border-[#FAFAFA]/20">
                <div className="flex flex-col gap-2.5 pt-3">
                  <span className="h-px w-3/4 bg-[#0A0A0A]/20 dark:bg-[#FAFAFA]/20" />
                  <span className="h-px w-1/2 bg-[#0A0A0A]/15 dark:bg-[#FAFAFA]/15" />
                </div>
                <div className="flex flex-col gap-2 pb-3">
                  <span className="h-px w-5/6 bg-[#0A0A0A]/20 dark:bg-[#FAFAFA]/20" />
                  <span className="h-px w-2/3 bg-[#0A0A0A]/15 dark:bg-[#FAFAFA]/15" />
                </div>
              </div>
            </div>

            <div
              ref={bookCoverRef}
              className="js-book-cover absolute inset-0 origin-left rounded-r-[4px] border-2 border-[#0A0A0A]/35 bg-[#F7F7F5]/90 p-5 [transform-style:preserve-3d] dark:border-[#FAFAFA]/35 dark:bg-[#141414]/90"
            >
              <div className="flex h-full w-full flex-col justify-between border border-[#0A0A0A]/15 p-3 dark:border-[#FAFAFA]/15">
                <span className="h-px w-8 bg-[#0A0A0A]/30 dark:bg-[#FAFAFA]/30" />
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded border border-[#0A0A0A]/25 dark:border-[#FAFAFA]/25">
                  <span className="h-3 w-3 rotate-45 border border-[#0A0A0A]/35 dark:border-[#FAFAFA]/35" />
                </div>
                <span className="h-px w-full bg-[#0A0A0A]/20 dark:bg-[#FAFAFA]/20" />
              </div>
            </div>
          </div>
        </div>

        <div
          ref={emblemRef}
          className="js-hero-emblem relative z-10 w-full [mask-image:radial-gradient(ellipse_at_54%_50%,black_44%,transparent_86%)]"
        >
          <svg
            ref={markSvgRef}
            viewBox="0 0 440 440"
            fill="none"
            className="h-auto w-full text-[#0A0A0A] opacity-[0.16] dark:text-[#FAFAFA] dark:opacity-[0.18]"
          >
            <g
              className="js-hero-orbit-ring"
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            >
              <circle
                className="js-mark-path"
                cx="220"
                cy="220"
                r="198"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeDasharray="3 8"
              />
              {RADIAL_TICKS.map((tick, idx) => (
                <line
                  key={idx}
                  className="js-mark-path"
                  x1={tick.x1}
                  y1={tick.y1}
                  x2={tick.x2}
                  y2={tick.y2}
                  stroke="currentColor"
                  strokeWidth={tick.major ? "1.6" : "0.9"}
                />
              ))}
            </g>

            <ellipse
              className="js-mark-path"
              cx="220"
              cy="220"
              rx="192"
              ry="70"
              transform="rotate(-28 220 220)"
              stroke="currentColor"
              strokeWidth="1.15"
            />
            <ellipse
              className="js-mark-path"
              cx="220"
              cy="220"
              rx="192"
              ry="70"
              transform="rotate(28 220 220)"
              stroke="currentColor"
              strokeWidth="1.15"
            />

            <rect
              className="js-mark-path"
              x="64"
              y="64"
              width="312"
              height="312"
              rx="48"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <circle
              className="js-mark-path"
              cx="220"
              cy="220"
              r="142"
              stroke="currentColor"
              strokeWidth="1.25"
            />

            <line
              className="js-mark-path"
              x1="44"
              y1="396"
              x2="396"
              y2="44"
              stroke="currentColor"
              strokeWidth="1"
            />
            <line
              className="js-mark-path"
              x1="220"
              y1="26"
              x2="220"
              y2="78"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <line
              className="js-mark-path"
              x1="220"
              y1="362"
              x2="220"
              y2="414"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <line
              className="js-mark-path"
              x1="26"
              y1="220"
              x2="78"
              y2="220"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <line
              className="js-mark-path"
              x1="362"
              y1="220"
              x2="414"
              y2="220"
              stroke="currentColor"
              strokeWidth="1.4"
            />

            <path
              className="js-mark-path"
              d="M124 318L220 96L316 318"
              stroke="currentColor"
              strokeWidth="3.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              className="js-mark-path"
              d="M158 318L220 172L282 318"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              className="js-mark-path"
              d="M148 250H292"
              stroke="currentColor"
              strokeWidth="3.4"
              strokeLinecap="round"
            />
            <path
              className="js-mark-path"
              d="M168 236H272"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />

            <circle
              className="js-mark-path"
              cx="326"
              cy="112"
              r="14"
              stroke="currentColor"
              strokeWidth="2.4"
            />
            <circle
              className="js-mark-path"
              cx="326"
              cy="112"
              r="5"
              stroke="currentColor"
              strokeWidth="1.6"
            />
          </svg>
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
