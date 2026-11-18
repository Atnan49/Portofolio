import { motion, useReducedMotion } from "motion/react";
import {
  PORTFOLIO_PROFILE,
  PROFILE_META,
  STACK_CATEGORIES,
} from "../data/portfolio";

const EASE = [0.22, 1, 0.36, 1] as const;

export function AboutSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="tentang"
      className="border-b border-[#D4D4D4] bg-[#F7F7F5] text-[#0A0A0A] dark:border-[#262626] dark:bg-[#0A0A0A] dark:text-[#FAFAFA]"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-5 py-16 md:px-10 md:py-20 lg:grid-cols-12 lg:gap-16 lg:px-20 lg:py-24">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="flex flex-col gap-6 lg:col-span-4"
        >
          <h2 className="font-serif text-2xl font-bold md:text-[1.75rem]">
            Tentang
          </h2>

          <dl className="divide-y divide-[#D4D4D4] border-y border-[#D4D4D4] dark:divide-[#262626] dark:border-[#262626]">
            {PROFILE_META.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between gap-4 py-3.5 text-sm"
              >
                <dt className="text-[#525252] dark:text-[#A3A3A3]">{row.label}</dt>
                <dd className="text-right font-semibold text-[#0A0A0A] dark:text-[#FAFAFA]">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <div className="flex flex-col gap-6 lg:col-span-8">
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="font-serif text-[1.375rem] leading-[1.45] text-[#0A0A0A] md:text-[1.75rem] dark:text-[#FAFAFA]"
          >
            {PORTFOLIO_PROFILE.aboutLead}
          </motion.p>

          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
            className="text-[15px] leading-[1.7] text-[#525252] md:text-base dark:text-[#A3A3A3]"
          >
            {PORTFOLIO_PROFILE.aboutBody}
          </motion.p>

          <motion.div
            initial={shouldReduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.65, ease: EASE }}
            className="h-px origin-left bg-[#D4D4D4] dark:bg-[#262626]"
          />

          <div className="grid grid-cols-1 gap-6 pt-1 sm:grid-cols-3 sm:gap-7">
            {STACK_CATEGORIES.map((group, index) => (
              <motion.div
                key={group.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: index * 0.07, ease: EASE }}
                className="flex flex-col gap-1.5"
              >
                <h3 className="text-[13px] font-bold text-[#0A0A0A] dark:text-[#FAFAFA]">
                  {group.title}
                </h3>
                <p className="text-sm leading-[1.6] text-[#525252] dark:text-[#A3A3A3]">
                  {group.items}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
