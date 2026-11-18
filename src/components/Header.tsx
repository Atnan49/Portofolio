import { motion } from "motion/react";
import { PORTFOLIO_PROFILE } from "../data/portfolio";
import type { ResolvedTheme } from "../utils/theme";

interface HeaderProps {
  resolvedTheme: ResolvedTheme;
  onToggleTheme: () => void;
  onOpenMobileMenu: () => void;
}

const NAV_ITEMS = [
  { href: "#tentang", label: "Tentang" },
  { href: "#karya", label: "Karya" },
  { href: "#kontak", label: "Kontak" },
];

export function Header({ resolvedTheme, onToggleTheme, onOpenMobileMenu }: HeaderProps) {
  const nextLabel = resolvedTheme === "dark" ? "Mode: Terang" : "Mode: Gelap";
  const themeAriaLabel =
    resolvedTheme === "dark"
      ? "Ganti ke mode terang"
      : "Ganti ke mode gelap";

  return (
    <header className="sticky top-0 z-40 border-b border-[#D4D4D4] bg-[#F7F7F5]/95 backdrop-blur-sm transition-colors duration-200 dark:border-[#262626] dark:bg-[#0A0A0A]/95">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-3.5 md:px-10 lg:px-20">
        <a
          href="#hero"
          className="inline-flex min-h-11 items-center font-serif text-lg font-semibold tracking-tight text-[#0A0A0A] transition-opacity hover:opacity-75 md:text-xl dark:text-[#FAFAFA]"
        >
          {PORTFOLIO_PROFILE.brandName}
        </a>

        <nav aria-label="Navigasi utama" className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative inline-flex min-h-11 items-center text-[15px] font-medium text-[#525252] transition-colors hover:text-[#0A0A0A] dark:text-[#D4D4D4] dark:hover:text-[#FAFAFA]"
            >
              <span>{item.label}</span>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-2 h-px origin-left scale-x-0 bg-current transition-transform duration-200 group-hover:scale-x-100"
              />
            </a>
          ))}

          <motion.button
            type="button"
            onClick={onToggleTheme}
            aria-label={themeAriaLabel}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex min-h-11 items-center justify-center rounded border border-[#737373] bg-[#FFFFFF] px-4 text-[13px] font-semibold text-[#0A0A0A] transition-colors hover:bg-[#0A0A0A] hover:text-[#FAFAFA] dark:bg-[#141414] dark:text-[#FAFAFA] dark:hover:bg-[#FAFAFA] dark:hover:text-[#0A0A0A]"
          >
            {nextLabel}
          </motion.button>
        </nav>

        <div className="flex items-center gap-2.5 md:hidden">
          <motion.button
            type="button"
            onClick={onToggleTheme}
            aria-label={themeAriaLabel}
            whileTap={{ scale: 0.96 }}
            className="inline-flex min-h-11 items-center justify-center rounded border border-[#737373] bg-[#FFFFFF] px-3 text-[13px] font-semibold text-[#0A0A0A] dark:bg-[#141414] dark:text-[#FAFAFA]"
          >
            {resolvedTheme === "dark" ? "Terang" : "Gelap"}
          </motion.button>

          <motion.button
            type="button"
            onClick={onOpenMobileMenu}
            aria-haspopup="dialog"
            whileTap={{ scale: 0.96 }}
            className="inline-flex min-h-11 items-center justify-center rounded bg-[#0A0A0A] px-3.5 text-[13px] font-bold text-[#FAFAFA] dark:bg-[#FAFAFA] dark:text-[#0A0A0A]"
          >
            Menu
          </motion.button>
        </div>
      </div>
    </header>
  );
}
