import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createTimeline, cubicBezier, animate, stagger, svg } from "animejs";
import { PORTFOLIO_PROFILE } from "../data/portfolio";
import { gsap, ScrollTrigger, useGSAP } from "../lib/gsap";
import { useAnimeTilt3D } from "../lib/useAnimeTilt3D";
import { HeroThreeStage, type HeroStageStatus } from "./HeroThreeStage";

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
  const deskLineRef = useRef<HTMLDivElement>(null);
  const emblemRef = useRef<HTMLDivElement>(null);
  const copyCardRef = useRef<HTMLDivElement>(null);
  const portraitCardRef = useRef<HTMLDivElement>(null);
  const stage3dRef = useRef<HTMLDivElement>(null);
  const plane3dRef = useRef<HTMLDivElement>(null);
  const backdrop3dRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const scrollHintBtnRef = useRef<HTMLButtonElement>(null);
  const heroScrollRef = useRef(0);
  const [stageStatus, setStageStatus] = useState<HeroStageStatus>("loading");
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (stageStatus !== "loading" || reducedMotion) return;
    const timer = window.setTimeout(() => setStageStatus("fallback"), 2800);
    return () => window.clearTimeout(timer);
  }, [stageStatus, reducedMotion]);

  useAnimeTilt3D({
    stageRef: stage3dRef,
    planeRef: plane3dRef,
    backdropRef: backdrop3dRef,
    maxTilt: 5.5,
    backdropShift: 10,
  });

  useLayoutEffect(() => {
    if (typeof window === "undefined" || reducedMotion) return;

    const deskLineEl = deskLineRef.current;
    const scrollHintBtnEl = scrollHintBtnRef.current;
    if (!deskLineEl) return;

    if (stageStatus === "loading") {
      deskLineEl.style.opacity = "0";
      if (scrollHintBtnEl) scrollHintBtnEl.style.opacity = "0";
      return;
    }

    const easeSoft = cubicBezier(0.16, 1, 0.3, 1);
    const tl = createTimeline();

    tl.set(deskLineEl, { scaleX: 0, opacity: 0.72 })
      .add(
        deskLineEl,
        {
          scaleX: [0, 1],
          duration: 720,
          ease: easeSoft,
        },
        0
      )
      .add(
        deskLineEl,
        {
          scaleX: [1, 0.2],
          opacity: [0.72, 0],
          duration: 540,
          ease: cubicBezier(0.55, 0, 0.9, 0.6),
        },
        1720
      );

    if (scrollHintBtnEl) {
      tl.set(scrollHintBtnEl, { opacity: 0, y: 10 }).add(
        scrollHintBtnEl,
        {
          opacity: [0, 0.8],
          y: [10, 0],
          duration: 620,
          ease: easeSoft,
        },
        2350
      );
    }

    return () => {
      tl.revert();
    };
  }, [reducedMotion, stageStatus]);

  // Fallback CSS book + SVG monogram choreography only if WebGL or GLB loading fails
  useEffect(() => {
    if (stageStatus !== "fallback" || reducedMotion) return;
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
    tl.set(bookEl, { opacity: 0, scale: 0.72, y: -36 })
      .set(bookInnerEl, { rotateX: 14, rotateY: -16 })
      .set(bookCoverEl, { rotateY: 0 })
      .set(emblemEl, { opacity: 0, scale: 0.14, y: 24 })
      .add(
        bookEl,
        { opacity: [0, 1], scale: [0.68, 1], y: [-52, 0], duration: 680, ease: "outExpo" },
        0
      )
      .add(
        bookInnerEl,
        { rotateX: [10, 42], rotateY: [-20, 0], duration: 720, ease: "inOutQuad" },
        280
      )
      .add(bookCoverEl, { rotateY: [0, -158], duration: 920, ease: "inOutCubic" }, 780)
      .add(
        emblemEl,
        { opacity: [0, 1], scale: [0.14, 1], y: [28, 0], duration: 1250, ease: "outExpo" },
        1380
      )
      .add(
        bookEl,
        { scale: [1, 0.12], y: [0, 22], opacity: [1, 0], duration: 820, ease: "inOutCubic" },
        2450
      );

    if (drawables.length > 0) {
      tl.add(
        drawables,
        { draw: ["0 0", "0 1"], duration: 1450, delay: stagger(28), ease: "outExpo" },
        1420
      );
    }

    const orbitAnim = orbitRing
      ? animate(orbitRing, { rotate: 360, duration: 90000, loop: true, ease: "linear" })
      : null;

    return () => {
      tl.revert();
      orbitAnim?.revert();
    };
  }, [stageStatus, reducedMotion]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const sectionEl = sectionRef.current;
        const copyCardEl = copyCardRef.current;
        const portraitCardEl = portraitCardRef.current;
        const scrollHintEl = scrollHintRef.current;
        const scrollHintBtnEl = scrollHintBtnRef.current;
        if (!sectionEl || !copyCardEl || !portraitCardEl) return;

        // Measure untransformed slot wrappers so ScrollTrigger resize refreshes compute cleanly
        const measureOffsets = () => {
          const sectionRect = sectionEl.getBoundingClientRect();
          const copySlotRect = (copyCardEl.parentElement ?? copyCardEl).getBoundingClientRect();
          const portraitSlotRect = (
            portraitCardEl.parentElement ?? portraitCardEl
          ).getBoundingClientRect();

          const originX = sectionRect.left + sectionRect.width * 0.5;
          const originY =
            sectionRect.top + Math.min(sectionRect.height, window.innerHeight - 72) * 0.5;

          return {
            copyDx: originX - (copySlotRect.left + copySlotRect.width * 0.5),
            copyDy: originY - (copySlotRect.top + copySlotRect.height * 0.5),
            portraitDx: originX - (portraitSlotRect.left + portraitSlotRect.width * 0.5),
            portraitDy: originY - (portraitSlotRect.top + portraitSlotRect.height * 0.5),
          };
        };

        copyCardEl.style.pointerEvents = "none";
        portraitCardEl.style.pointerEvents = "none";

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionEl,
            start: "top 72",
            end: "+=580",
            pin: true,
            scrub: 0.65,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              heroScrollRef.current = self.progress;
              const interactive = self.progress > 0.35 ? "auto" : "none";
              copyCardEl.style.pointerEvents = interactive;
              portraitCardEl.style.pointerEvents = interactive;
              if (scrollHintBtnEl) {
                scrollHintBtnEl.style.pointerEvents = self.progress < 0.2 ? "auto" : "none";
              }
            },
          },
        });

        if (scrollHintEl) {
          scrollTl.fromTo(
            scrollHintEl,
            { opacity: 1, y: 0 },
            { opacity: 0, y: 12, duration: 0.26, ease: "power2.out" },
            0
          );
        }

        scrollTl
          .fromTo(
            copyCardEl,
            {
              x: () => measureOffsets().copyDx,
              y: () => measureOffsets().copyDy + 24,
              scale: 0.68,
              rotateY: 12,
              rotateZ: -3,
              opacity: 0,
            },
            {
              x: 0,
              y: 0,
              scale: 1,
              rotateY: 0,
              rotateZ: 0,
              opacity: 1,
              duration: 0.85,
              ease: "power3.out",
            },
            0
          )
          .fromTo(
            portraitCardEl,
            {
              x: () => measureOffsets().portraitDx,
              y: () => measureOffsets().portraitDy + 24,
              scale: 0.68,
              rotateY: -12,
              rotateZ: 3,
              opacity: 0,
            },
            {
              x: 0,
              y: 0,
              scale: 1,
              rotateY: 0,
              rotateZ: 0,
              opacity: 1,
              duration: 0.85,
              ease: "power3.out",
            },
            0.15
          );

        let lastViewportW = window.innerWidth;
        const resizeObserver = new ResizeObserver(() => {
          const nextW = window.innerWidth;
          if (nextW !== lastViewportW) {
            lastViewportW = nextW;
            ScrollTrigger.refresh();
          }
        });
        resizeObserver.observe(document.documentElement);

        const rafId = requestAnimationFrame(() => ScrollTrigger.refresh());
        return () => {
          cancelAnimationFrame(rafId);
          resizeObserver.disconnect();
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  // Guard reduced-motion visual clean state on mount when CSS classes aren't reverted
  useEffect(() => {
    if (!reducedMotion) return;
    if (copyCardRef.current) {
      copyCardRef.current.style.opacity = "1";
      copyCardRef.current.style.pointerEvents = "auto";
    }
    if (portraitCardRef.current) {
      portraitCardRef.current.style.opacity = "1";
      portraitCardRef.current.style.pointerEvents = "auto";
    }
    if (emblemRef.current) emblemRef.current.style.opacity = "1";
  }, [reducedMotion]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative !w-full !max-w-full overflow-hidden border-b border-[#D4D4D4] bg-[#F7F7F5] text-[#0A0A0A] dark:border-[#262626] dark:bg-[#0A0A0A] dark:text-[#FAFAFA]"
    >
      {/* Panggung 3D Blender (Buku Terbuka & Logo Monogram) + Garis Meja */}
      <div
        aria-hidden="true"
        className="js-hero-mark-parallax pointer-events-none absolute inset-0 z-0 flex items-center justify-center select-none"
      >
        <HeroThreeStage
          reducedMotion={reducedMotion}
          scrollProgressRef={heroScrollRef}
          onStatusChange={setStageStatus}
        />

        <div
          ref={deskLineRef}
          className="js-hero-desk motion-reduce:hidden absolute top-[73%] h-px w-[240px] bg-[#0A0A0A]/30 sm:top-[75%] sm:w-[320px] dark:bg-[#FAFAFA]/30"
        />

        {stageStatus === "fallback" && (
          <>
            <div
              ref={bookRef}
              className="js-hero-book motion-reduce:hidden pointer-events-none absolute inset-0 z-0 flex items-center justify-center [perspective:1200px]"
            >
          <div
            ref={bookInnerRef}
            className="relative h-[200px] w-[155px] sm:h-[260px] sm:w-[200px] lg:h-[290px] lg:w-[225px] [transform-style:preserve-3d]"
          >
            <div className="absolute inset-0 rounded-r-[4px] border-2 border-[#0A0A0A]/40 bg-[#FFFFFF]/90 p-5 shadow-[0_24px_40px_-20px_rgba(10,10,10,0.35)] dark:border-[#FAFAFA]/40 dark:bg-[#141414]/90 dark:shadow-[0_24px_40px_-18px_rgba(0,0,0,0.95)]">
              <div className="flex h-full flex-col justify-between border-l border-[#0A0A0A]/25 pl-3.5 dark:border-[#FAFAFA]/25">
                <div className="flex flex-col gap-2.5 pt-3">
                  <span className="h-px w-3/4 bg-[#0A0A0A]/25 dark:bg-[#FAFAFA]/25" />
                  <span className="h-px w-1/2 bg-[#0A0A0A]/20 dark:bg-[#FAFAFA]/20" />
                </div>
                <div className="flex flex-col gap-2 pb-3">
                  <span className="h-px w-5/6 bg-[#0A0A0A]/25 dark:bg-[#FAFAFA]/25" />
                  <span className="h-px w-2/3 bg-[#0A0A0A]/20 dark:bg-[#FAFAFA]/20" />
                </div>
              </div>
            </div>

            <div
              ref={bookCoverRef}
              className="js-book-cover absolute inset-0 origin-left rounded-r-[4px] border-2 border-[#0A0A0A]/45 bg-[#FFFFFF]/95 p-5 [transform-style:preserve-3d] dark:border-[#FAFAFA]/45 dark:bg-[#141414]/95"
            >
              <div className="flex h-full w-full flex-col justify-between border border-[#0A0A0A]/20 p-3 dark:border-[#FAFAFA]/20">
                <span className="h-px w-8 bg-[#0A0A0A]/35 dark:bg-[#FAFAFA]/35" />
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded border border-[#0A0A0A]/30 dark:border-[#FAFAFA]/30">
                  <span className="h-3 w-3 rotate-45 border border-[#0A0A0A]/45 dark:border-[#FAFAFA]/45" />
                </div>
                <span className="h-px w-full bg-[#0A0A0A]/25 dark:bg-[#FAFAFA]/25" />
              </div>
            </div>
          </div>
        </div>

        <div
          ref={emblemRef}
          className="js-hero-emblem relative z-10 w-[460px] sm:w-[680px] lg:w-[860px] [mask-image:radial-gradient(ellipse_at_50%_50%,black_44%,transparent_86%)]"
        >
          <svg
            ref={markSvgRef}
            viewBox="0 0 440 440"
            fill="none"
            className="h-auto w-full text-[#0A0A0A] opacity-[0.17] dark:text-[#FAFAFA] dark:opacity-[0.19]"
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
          </>
        )}
      </div>

      {/* Konten Hero Ditata Seperti Dua Kartu di Atas Meja (Muncul Saat Digulir) */}
      <div
        onFocusCapture={() => {
          if (!reducedMotion && window.scrollY < 500) {
            window.scrollTo({ top: 580, behavior: "smooth" });
          }
        }}
        className="relative z-10 mx-auto grid min-h-[calc(100svh-4.5rem)] max-w-[1440px] grid-cols-1 items-center gap-10 px-5 py-10 md:px-10 md:py-16 lg:grid-cols-12 lg:gap-16 lg:px-20 lg:py-20 [perspective:1400px]"
      >
        <div className="js-hero-copy-parallax lg:col-span-7">
          <div
            ref={copyCardRef}
            className="js-hero-copy-card flex flex-col gap-6 rounded border border-[#D4D4D4] bg-[#FFFFFF] p-7 shadow-[0_22px_50px_-30px_rgba(10,10,10,0.2)] sm:p-9 lg:p-10 dark:border-[#262626] dark:bg-[#141414] dark:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.9)]"
          >
            <div className="flex flex-col gap-3">
              <h1 className="font-serif text-[2.125rem] leading-[1.12] font-bold tracking-tight sm:text-5xl lg:text-[3.5rem]">
                {PORTFOLIO_PROFILE.fullName}
              </h1>

              <p className="font-serif text-xl leading-[1.3] italic text-[#525252] sm:text-2xl lg:text-[1.75rem] dark:text-[#D4D4D4]">
                {PORTFOLIO_PROFILE.role}
              </p>
            </div>

            <div aria-hidden="true" className="h-px w-14 bg-[#0A0A0A] dark:bg-[#FAFAFA]" />

            <p className="max-w-xl text-base leading-[1.7] text-[#525252] md:text-lg dark:text-[#A3A3A3]">
              {PORTFOLIO_PROFILE.heroIntro}
            </p>

            <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:gap-6">
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
        </div>

        <div className="js-hero-portrait-parallax mx-auto w-full max-w-[440px] lg:col-span-5 lg:mx-0 lg:justify-self-end">
          <div ref={portraitCardRef} className="js-hero-portrait-card w-full">
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
                  className="overflow-hidden rounded-[2px] border border-[#D4D4D4] bg-[#141414] dark:border-[#262626]"
                >
                  <img
                    src={PORTFOLIO_PROFILE.portraitSrc}
                    alt={PORTFOLIO_PROFILE.portraitAlt}
                    width={PORTFOLIO_PROFILE.portraitWidth}
                    height={PORTFOLIO_PROFILE.portraitHeight}
                    fetchPriority="high"
                    decoding="async"
                    className="block h-auto w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!reducedMotion && (
        <div
          ref={scrollHintRef}
          className="pointer-events-none absolute inset-x-0 bottom-5 z-20 flex justify-center sm:bottom-7"
        >
          <button
            ref={scrollHintBtnRef}
            type="button"
            onClick={() => window.scrollTo({ top: 580, behavior: "smooth" })}
            className="pointer-events-auto inline-flex min-h-11 flex-col items-center gap-2 px-4 py-1 text-xs font-semibold tracking-[0.16em] uppercase text-[#525252] transition-colors duration-150 hover:text-[#0A0A0A] dark:text-[#A3A3A3] dark:hover:text-[#FAFAFA]"
          >
            <span>Gulir ke bawah</span>
            <span aria-hidden="true" className="block h-5 w-px bg-current opacity-55" />
          </button>
        </div>
      )}
    </section>
  );
}
