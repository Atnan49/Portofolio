import { useEffect, useRef, useState } from "react";
import { SELECTED_PROJECTS } from "../data/portfolio";
import { Flip, SplitText, gsap, useGSAP } from "../lib/gsap";

function useIsDesktopLg(): boolean {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" && typeof window.matchMedia === "function"
      ? window.matchMedia("(min-width: 1024px)").matches
      : true
  );

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    setIsDesktop(mq.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

export function WorkSection() {
  const [activeId, setActiveId] = useState<string | null>(SELECTED_PROJECTS[0].id);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const isDesktop = useIsDesktopLg();

  const containerRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});
  const showcaseRef = useRef<HTMLDivElement>(null);
  const detailPanelRef = useRef<HTMLDivElement>(null);
  const flipStateRef = useRef<Flip.FlipState | null>(null);
  const originOffsetRef = useRef({ x: -160, y: 0 });

  const activeProject =
    SELECTED_PROJECTS.find((item) => item.id === activeId) ?? SELECTED_PROJECTS[0];

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        SplitText.create(".js-work-title", {
          type: "lines",
          mask: "lines",
          linesClass: "gsap-split-line",
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.lines, {
              yPercent: 115,
              duration: 0.5,
              ease: "power4.out",
              scrollTrigger: {
                trigger: ".js-work-header",
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            });
          },
        });

        gsap.from(".js-work-count", {
          clipPath: "inset(0% 0% 100% 0%)",
          y: 28,
          duration: 0.45,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".js-work-header",
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.utils.toArray<HTMLElement>(".js-work-card").forEach((card) => {
          const cardTl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          });

          cardTl
            .from(card, {
              y: 52,
              scale: 0.95,
              duration: 0.5,
              ease: "power3.out",
            })
            .from(
              card,
              {
                opacity: 0,
                duration: 0.16,
                ease: "none",
              },
              0
            );
        });

        if (isDesktop && showcaseRef.current) {
          const showcaseTl = gsap.timeline({
            scrollTrigger: {
              trigger: showcaseRef.current,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          });

          showcaseTl
            .from(showcaseRef.current, {
              y: 62,
              scale: 0.95,
              duration: 0.56,
              ease: "power3.out",
            })
            .from(
              showcaseRef.current,
              {
                opacity: 0,
                duration: 0.16,
                ease: "none",
              },
              0
            );
        }
      });

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [isDesktop], revertOnUpdate: true }
  );

  useGSAP(
    () => {
      const state = flipStateRef.current;
      if (!state) return;
      flipStateRef.current = null;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const flipTargets = containerRef.current?.querySelectorAll("[data-flip-id]");
      if (flipTargets && flipTargets.length > 0) {
        Flip.from(state, {
          targets: flipTargets,
          duration: 0.56,
          ease: "expo.out",
          absolute: true,
          scale: true,
          nested: true,
        });
      }

      if (isDesktop && detailPanelRef.current) {
        const { x, y } = originOffsetRef.current;
        gsap.fromTo(
          detailPanelRef.current,
          {
            x,
            y,
            scale: 0.76,
            clipPath: "inset(0% 100% 0% 0%)",
            opacity: 0.35,
          },
          {
            x: 0,
            y: 0,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 0.52,
            ease: "expo.out",
            clearProps: "clipPath",
            overwrite: true,
          }
        );

        const detailItems = detailPanelRef.current.querySelectorAll(".js-detail-item");
        if (detailItems.length > 0) {
          gsap.fromTo(
            detailItems,
            { x: -16 },
            {
              x: 0,
              duration: 0.42,
              stagger: 0.04,
              delay: 0.05,
              ease: "power3.out",
              overwrite: true,
            }
          );
        }
      } else if (!isDesktop && activeId) {
        const mobileDetail = containerRef.current?.querySelector(
          `[data-mobile-detail="${activeId}"]`
        );
        if (mobileDetail) {
          gsap.fromTo(
            mobileDetail,
            {
              clipPath: "inset(0% 0% 100% 0%)",
              y: -14,
            },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              y: 0,
              duration: 0.44,
              ease: "power3.out",
              clearProps: "clipPath",
              overwrite: true,
            }
          );
        }
      }
    },
    { scope: containerRef, dependencies: [activeId, isDesktop] }
  );

  const selectProject = contextSafe((id: string) => {
    if (!isDesktop && id === activeId) {
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && containerRef.current) {
        flipStateRef.current = Flip.getState(
          containerRef.current.querySelectorAll("[data-flip-id]")
        );
      }
      setActiveId(null);
      return;
    }

    if (id === activeId) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion && containerRef.current) {
      flipStateRef.current = Flip.getState(
        containerRef.current.querySelectorAll("[data-flip-id]")
      );

      const cardEl = cardRefs.current[id];
      const showcaseEl = showcaseRef.current;
      if (cardEl && showcaseEl) {
        const cardRect = cardEl.getBoundingClientRect();
        const showcaseRect = showcaseEl.getBoundingClientRect();
        const rawDx =
          cardRect.left +
          cardRect.width * 0.48 -
          (showcaseRect.left + showcaseRect.width * 0.36);
        const rawDy =
          cardRect.top +
          cardRect.height / 2 -
          (showcaseRect.top + showcaseRect.height * 0.68);
        originOffsetRef.current = {
          x: Math.max(-260, Math.min(-90, rawDx)),
          y: Math.max(-210, Math.min(210, rawDy)),
        };
      }
    }

    setActiveId(id);
  });

  const handleCardHover = (id: string) => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(hover: hover)").matches
    ) {
      setHoveredId(id);
      selectProject(id);
    }
  };

  return (
    <section
      id="karya"
      ref={containerRef}
      className="overflow-x-clip bg-[#F7F7F5] text-[#0A0A0A] dark:bg-[#0A0A0A] dark:text-[#FAFAFA]"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-5 py-16 md:px-10 md:py-20 lg:gap-12 lg:px-20 lg:py-24">
        <div className="js-work-header flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <h2 className="js-work-title font-serif text-3xl font-bold md:text-4xl">
            Karya Pilihan
          </h2>
          <p className="js-work-count text-sm text-[#525252] md:text-[15px] dark:text-[#A3A3A3]">
            Empat proyek pilihan
          </p>
        </div>

        {isDesktop ? (
          <div className="grid grid-cols-12 items-start gap-10 xl:gap-12">
            <ul
              aria-label="Daftar proyek"
              onMouseLeave={() => setHoveredId(null)}
              className="js-work-list col-span-5 flex flex-col gap-3"
            >
              {SELECTED_PROJECTS.map((project) => {
                const isActive = project.id === activeProject.id;
                const isHovered = hoveredId === project.id;

                return (
                  <li
                    key={project.id}
                    ref={(el) => {
                      cardRefs.current[project.id] = el;
                    }}
                    className="js-work-card relative"
                  >
                    {isActive ? (
                      <>
                        <span
                          data-flip-id="work-active-bg"
                          aria-hidden="true"
                          className="absolute inset-0 z-0 rounded border border-[#0A0A0A] bg-[#FFFFFF] shadow-[0_8px_24px_-12px_rgba(10,10,10,0.16)] dark:border-[#FAFAFA] dark:bg-[#141414] dark:shadow-[0_8px_28px_-12px_rgba(0,0,0,0.75)]"
                        />
                        <span
                          data-flip-id="work-active-bridge"
                          aria-hidden="true"
                          className="pointer-events-none absolute top-1/2 -right-5 z-0 hidden h-px w-5 -translate-y-1/2 bg-[#0A0A0A] lg:block xl:-right-6 xl:w-6 dark:bg-[#FAFAFA]"
                        />
                      </>
                    ) : (
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 z-0 rounded border border-[#D4D4D4] bg-transparent transition-colors duration-200 dark:border-[#262626]"
                      />
                    )}

                    <button
                      type="button"
                      onClick={() => selectProject(project.id)}
                      onMouseEnter={() => handleCardHover(project.id)}
                      onFocus={() => selectProject(project.id)}
                      aria-pressed={isActive}
                      className="relative z-10 flex w-full items-center gap-4 p-4 text-left transition-transform duration-150 hover:translate-x-1 active:scale-[0.99]"
                    >
                      <div className="relative h-11 w-[70px] shrink-0 rounded-[2px] border border-[#D4D4D4] bg-[#141414] dark:border-[#262626]">
                        {!isActive ? (
                          <div
                            data-flip-id={`work-img-${project.id}`}
                            className="relative z-10 h-full w-full overflow-hidden rounded-[2px]"
                          >
                            <img
                              src={project.imageSrc}
                              alt=""
                              aria-hidden="true"
                              width={1260}
                              height={800}
                              loading="lazy"
                              decoding="async"
                              className={`block h-full w-full object-cover object-center transition-all duration-300 ${
                                isHovered ? "scale-105 opacity-100" : "opacity-85"
                              }`}
                            />
                          </div>
                        ) : (
                          <div className="flex h-full w-full items-center justify-center rounded-[2px] bg-[#0A0A0A] text-[#FAFAFA] dark:bg-[#FAFAFA] dark:text-[#0A0A0A]">
                            <svg
                              aria-hidden="true"
                              viewBox="0 0 16 16"
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.75"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M4 12 12 4M6 4h6v6" />
                            </svg>
                          </div>
                        )}
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="truncate font-serif text-lg font-bold text-[#0A0A0A] xl:text-xl dark:text-[#FAFAFA]">
                            {project.title}
                          </span>
                          <span className="shrink-0 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3]">
                            {project.year}
                          </span>
                        </div>
                        <span className="truncate text-[13px] text-[#525252] dark:text-[#A3A3A3]">
                          {project.stack}
                        </span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="sticky top-24 col-span-7">
              <div
                ref={showcaseRef}
                data-testid="desktop-project-preview"
                className="rounded border border-[#D4D4D4] bg-[#FFFFFF] dark:border-[#262626] dark:bg-[#141414]"
              >
                <div className="relative aspect-[16/10] w-full bg-[#141414]">
                  <div
                    key={activeProject.id}
                    data-flip-id={`work-img-${activeProject.id}`}
                    className="relative z-20 h-full w-full overflow-hidden rounded-t-[3px] bg-[#141414]"
                  >
                    <img
                      src={activeProject.imageSrc}
                      alt={activeProject.imageAlt}
                      width={1260}
                      height={800}
                      loading="lazy"
                      decoding="async"
                      className="block h-full w-full object-cover object-center transition-transform duration-500 ease-out hover:scale-[1.02]"
                    />
                  </div>
                </div>

                <div className="p-7 xl:p-8">
                  <div
                    ref={detailPanelRef}
                    key={activeProject.id}
                    className="flex flex-col gap-3"
                  >
                    <p className="js-detail-item text-[13px] font-semibold text-[#525252] dark:text-[#A3A3A3]">
                      {activeProject.year} / {activeProject.stack}
                    </p>

                    <h3 className="js-detail-item font-serif text-2xl leading-[1.25] font-bold text-[#0A0A0A] xl:text-[1.75rem] dark:text-[#FAFAFA]">
                      {activeProject.title}
                    </h3>

                    <p className="js-detail-item text-[15px] leading-[1.65] text-[#525252] dark:text-[#A3A3A3]">
                      {activeProject.summary}
                    </p>

                    <div className="js-detail-item flex flex-wrap items-center gap-4 pt-2">
                      <a
                        href={activeProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center justify-center rounded border border-[#0A0A0A] px-5 py-2.5 text-sm font-bold text-[#0A0A0A] transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#0A0A0A] hover:text-[#FAFAFA] active:scale-[0.98] dark:border-[#FAFAFA] dark:text-[#FAFAFA] dark:hover:bg-[#FAFAFA] dark:hover:text-[#0A0A0A]"
                      >
                        {activeProject.liveLabel}
                      </a>

                      {activeProject.repoUrl ? (
                        <a
                          href={activeProject.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-11 items-center border-b border-[#0A0A0A] px-1 text-sm font-semibold text-[#0A0A0A] transition-opacity hover:opacity-70 dark:border-[#FAFAFA] dark:text-[#FAFAFA]"
                        >
                          Lihat Kode di GitHub
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <ul aria-label="Daftar proyek" className="js-work-list flex flex-col gap-4">
            {SELECTED_PROJECTS.map((project) => {
              const isActive = project.id === activeId;

              return (
                <li
                  key={project.id}
                  className={`js-work-card rounded border transition-colors duration-200 ${
                    isActive
                      ? "border-[#0A0A0A] bg-[#FFFFFF] dark:border-[#FAFAFA] dark:bg-[#141414]"
                      : "border-[#D4D4D4] bg-transparent dark:border-[#262626]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => selectProject(project.id)}
                    aria-expanded={isActive}
                    className="flex w-full items-center gap-3.5 p-4 text-left transition-transform duration-150 active:scale-[0.99]"
                  >
                    {!isActive ? (
                      <div
                        data-flip-id={`work-img-${project.id}`}
                        className="relative z-10 h-10 w-16 shrink-0 overflow-hidden rounded-[2px] border border-[#D4D4D4] bg-[#141414] dark:border-[#262626]"
                      >
                        <img
                          src={project.imageSrc}
                          alt=""
                          aria-hidden="true"
                          width={1260}
                          height={800}
                          loading="lazy"
                          decoding="async"
                          className="block h-full w-full object-cover object-center opacity-85"
                        />
                      </div>
                    ) : null}

                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="font-serif text-lg font-bold text-[#0A0A0A] dark:text-[#FAFAFA]">
                          {project.title}
                        </span>
                        <span className="shrink-0 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3]">
                          {project.year}
                        </span>
                      </div>
                      {!isActive ? (
                        <span className="truncate text-xs text-[#525252] dark:text-[#A3A3A3]">
                          {project.stack}
                        </span>
                      ) : null}
                    </div>
                  </button>

                  {isActive ? (
                    <div className="flex flex-col gap-3.5 px-4 pb-4">
                      <p className="text-xs font-semibold text-[#525252] dark:text-[#A3A3A3]">
                        {project.stack}
                      </p>

                      <div className="relative aspect-[16/10] w-full">
                        <div
                          data-flip-id={`work-img-${project.id}`}
                          className="relative z-20 h-full w-full overflow-hidden rounded-[2px] border border-[#D4D4D4] bg-[#141414] dark:border-[#262626]"
                        >
                          <img
                            src={project.imageSrc}
                            alt={project.imageAlt}
                            width={1260}
                            height={800}
                            loading="lazy"
                            decoding="async"
                            className="block h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>

                      <div
                        data-mobile-detail={project.id}
                        className="flex flex-col gap-3.5"
                      >
                        <p className="text-sm leading-[1.6] text-[#525252] dark:text-[#A3A3A3]">
                          {project.summary}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 pt-1">
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-11 items-center justify-center rounded border border-[#0A0A0A] px-4 py-2 text-sm font-bold text-[#0A0A0A] transition-colors hover:bg-[#0A0A0A] hover:text-[#FAFAFA] dark:border-[#FAFAFA] dark:text-[#FAFAFA] dark:hover:bg-[#FAFAFA] dark:hover:text-[#0A0A0A]"
                          >
                            {project.liveLabel}
                          </a>

                          {project.repoUrl ? (
                            <a
                              href={project.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex min-h-11 items-center border-b border-[#0A0A0A] px-1 text-sm font-semibold text-[#0A0A0A] dark:border-[#FAFAFA] dark:text-[#FAFAFA]"
                            >
                              Lihat Kode di GitHub
                            </a>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
