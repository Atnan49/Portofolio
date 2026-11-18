import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { SELECTED_PROJECTS } from "../data/portfolio";

const EASE = [0.22, 1, 0.36, 1] as const;

export function WorkSection() {
  const [activeId, setActiveId] = useState(SELECTED_PROJECTS[0].id);
  const shouldReduceMotion = useReducedMotion();

  const activeProject =
    SELECTED_PROJECTS.find((item) => item.id === activeId) ?? SELECTED_PROJECTS[0];

  return (
    <section
      id="karya"
      className="bg-[#F7F7F5] text-[#0A0A0A] dark:bg-[#0A0A0A] dark:text-[#FAFAFA]"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-5 py-16 md:px-10 md:py-20 lg:gap-12 lg:px-20 lg:py-24">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <h2 className="font-serif text-3xl font-bold md:text-4xl">
            Karya Pilihan
          </h2>
          <p className="text-sm text-[#525252] md:text-[15px] dark:text-[#A3A3A3]">
            Empat proyek pilihan
          </p>
        </div>

        <div className="grid grid-cols-1 overflow-hidden rounded border border-[#D4D4D4] bg-[#FFFFFF] lg:grid-cols-12 dark:border-[#262626] dark:bg-[#141414]">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#141414] lg:col-span-6 lg:aspect-auto lg:min-h-[380px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeProject.id}
                src={activeProject.imageSrc}
                alt={activeProject.imageAlt}
                width={1260}
                height={800}
                loading="lazy"
                decoding="async"
                initial={
                  shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.02 }
                }
                animate={{ opacity: 1, scale: 1 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="block h-full w-full object-cover object-top transition-transform duration-500 ease-out hover:scale-[1.02]"
              />
            </AnimatePresence>
          </div>

          <div className="flex flex-col justify-center p-6 md:p-10 lg:col-span-6 lg:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.26, ease: EASE }}
                className="flex flex-col gap-4"
              >
                <p className="text-[13px] font-semibold text-[#525252] dark:text-[#A3A3A3]">
                  {activeProject.year} / {activeProject.stack}
                </p>

                <h3 className="font-serif text-2xl leading-[1.25] font-bold text-[#0A0A0A] md:text-[1.875rem] dark:text-[#FAFAFA]">
                  {activeProject.title}
                </h3>

                <p className="text-[15px] leading-[1.65] text-[#525252] dark:text-[#A3A3A3]">
                  {activeProject.summary}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <motion.a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex min-h-11 items-center justify-center rounded border border-[#0A0A0A] px-5 py-2.5 text-sm font-bold text-[#0A0A0A] transition-colors hover:bg-[#0A0A0A] hover:text-[#FAFAFA] dark:border-[#FAFAFA] dark:text-[#FAFAFA] dark:hover:bg-[#FAFAFA] dark:hover:text-[#0A0A0A]"
                  >
                    {activeProject.liveLabel}
                  </motion.a>

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
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <ul
          aria-label="Daftar proyek"
          className="divide-y divide-[#D4D4D4] border-y border-[#D4D4D4] dark:divide-[#262626] dark:border-[#262626]"
        >
          {SELECTED_PROJECTS.map((project) => {
            const isActive = project.id === activeProject.id;

            return (
              <li
                key={project.id}
                className="relative flex flex-col justify-between gap-4 py-6 md:flex-row md:items-center md:gap-8"
              >
                {isActive ? (
                  <motion.span
                    layoutId="active-project-marker"
                    aria-hidden="true"
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                    className="absolute inset-y-4 left-0 hidden w-0.5 bg-[#0A0A0A] md:block dark:bg-[#FAFAFA]"
                  />
                ) : null}

                <button
                  type="button"
                  onClick={() => setActiveId(project.id)}
                  onMouseEnter={() => setActiveId(project.id)}
                  aria-pressed={isActive}
                  className="flex flex-1 flex-col gap-1 text-left transition-opacity hover:opacity-80 md:pl-5"
                >
                  <span className="font-serif text-xl font-bold text-[#0A0A0A] md:text-[1.375rem] dark:text-[#FAFAFA]">
                    {project.title}
                  </span>
                  <span className="text-sm leading-[1.6] text-[#525252] dark:text-[#A3A3A3]">
                    {project.summary}
                  </span>
                </button>

                <div className="flex items-center justify-between gap-8 md:justify-end">
                  <span className="text-sm text-[#525252] dark:text-[#A3A3A3]">
                    {project.year}
                  </span>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex min-h-11 items-center border-b border-[#0A0A0A] px-1 text-sm font-bold text-[#0A0A0A] transition-opacity hover:opacity-75 dark:border-[#FAFAFA] dark:text-[#FAFAFA]"
                  >
                    Buka Aplikasi
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
