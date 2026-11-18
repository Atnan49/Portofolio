import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { PORTFOLIO_PROFILE } from "../data/portfolio";

const EASE = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 36]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="border-b border-[#D4D4D4] bg-[#F7F7F5] text-[#0A0A0A] dark:border-[#262626] dark:bg-[#0A0A0A] dark:text-[#FAFAFA]"
    >
      <div className="mx-auto grid min-h-[calc(100svh-4.5rem)] max-w-[1440px] grid-cols-1 items-center gap-10 px-5 py-10 md:px-10 md:py-16 lg:grid-cols-12 lg:gap-16 lg:px-20 lg:py-20">
        <div className="flex flex-col gap-6 lg:col-span-7">
          <div className="flex flex-col gap-3">
            <div className="overflow-hidden">
              <motion.h1
                initial={
                  shouldReduceMotion
                    ? false
                    : { opacity: 0, y: 28, clipPath: "inset(0 0 100% 0)" }
                }
                animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
                transition={{ duration: 0.7, ease: EASE }}
                className="font-serif text-[2.25rem] leading-[1.08] font-bold tracking-tight sm:text-5xl lg:text-[3.75rem]"
              >
                {PORTFOLIO_PROFILE.fullName}
              </motion.h1>
            </div>

            <div className="overflow-hidden">
              <motion.p
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.14, ease: EASE }}
                className="font-serif text-xl leading-[1.25] italic text-[#525252] sm:text-2xl lg:text-[1.875rem] dark:text-[#D4D4D4]"
              >
                {PORTFOLIO_PROFILE.role}
              </motion.p>
            </div>
          </div>

          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.28, ease: EASE }}
            className="max-w-xl text-base leading-[1.7] text-[#525252] md:text-lg dark:text-[#A3A3A3]"
          >
            {PORTFOLIO_PROFILE.heroIntro}
          </motion.p>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
            className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:gap-6"
          >
            <motion.a
              href="#karya"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex min-h-12 items-center justify-center rounded bg-[#0A0A0A] px-7 py-3 text-[15px] font-bold text-[#FAFAFA] transition-colors hover:bg-[#262626] dark:bg-[#FAFAFA] dark:text-[#0A0A0A] dark:hover:bg-[#D4D4D4]"
            >
              Lihat Karya Pilihan
            </motion.a>

            <motion.a
              href="#kontak"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex min-h-12 items-center justify-center rounded border border-[#737373] px-5 py-3 text-[15px] font-semibold text-[#0A0A0A] transition-colors hover:bg-[#0A0A0A] hover:text-[#FAFAFA] sm:rounded-none sm:border-0 sm:border-b sm:border-current sm:px-1 sm:hover:bg-transparent sm:hover:text-[#525252] dark:text-[#FAFAFA] dark:hover:bg-[#FAFAFA] dark:hover:text-[#0A0A0A] sm:dark:hover:bg-transparent sm:dark:hover:text-[#D4D4D4]"
            >
              Hubungi Saya
            </motion.a>
          </motion.div>
        </div>

        <div className="lg:col-span-5 lg:justify-self-end">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.18, ease: EASE }}
            style={shouldReduceMotion ? undefined : { y: portraitY }}
            className="mx-auto w-full max-w-[440px] overflow-hidden rounded-[2px] border border-[#D4D4D4] bg-[#141414] dark:border-[#262626]"
          >
            <img
              src={PORTFOLIO_PROFILE.portraitSrc}
              alt={PORTFOLIO_PROFILE.portraitAlt}
              width={PORTFOLIO_PROFILE.portraitWidth}
              height={PORTFOLIO_PROFILE.portraitHeight}
              fetchPriority="high"
              decoding="async"
              className="block h-auto w-full object-cover transition-transform duration-500 ease-out hover:scale-[1.02]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
