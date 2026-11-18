import { useCallback, useEffect, useState } from "react";
import { ScrollTrigger } from "./lib/gsap";
import { ScrollProgress } from "./components/ScrollProgress";
import { Header } from "./components/Header";
import { MobileMenuDialog } from "./components/MobileMenuDialog";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { WorkSection } from "./components/WorkSection";
import { ContactSection } from "./components/ContactSection";
import {
  applyColorSchemeDocument,
  getSystemTheme,
  readStoredScheme,
  resolveEffectiveTheme,
  resolveNextStoredScheme,
  writeStoredScheme,
  type ResolvedTheme,
  type StoredScheme,
} from "./utils/theme";

export default function App() {
  const [storedScheme, setStoredScheme] = useState<StoredScheme>(() => readStoredScheme());
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(() => getSystemTheme());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const resolvedTheme = resolveEffectiveTheme(storedScheme, systemTheme);

  useEffect(() => {
    applyColorSchemeDocument(storedScheme, systemTheme);
  }, [storedScheme, systemTheme]);

  useEffect(() => {
    let active = true;
    document.fonts?.ready.then(() => {
      if (active) ScrollTrigger.refresh();
    });

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleMediaChange = (event: MediaQueryListEvent) => {
      setSystemTheme(event.matches ? "dark" : "light");
    };
    const handleStorage = (event: StorageEvent) => {
      if (event.key === null || event.key === "color-scheme") {
        setStoredScheme(readStoredScheme());
      }
    };

    media.addEventListener("change", handleMediaChange);
    window.addEventListener("storage", handleStorage);
    return () => {
      active = false;
      media.removeEventListener("change", handleMediaChange);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const handleToggleTheme = useCallback(() => {
    const nextStored = resolveNextStoredScheme(resolvedTheme, systemTheme);
    const commit = () => {
      writeStoredScheme(nextStored);
      setStoredScheme(nextStored);
      applyColorSchemeDocument(nextStored, systemTheme);
    };

    const docWithTransition = document as Document & {
      startViewTransition?: (cb: () => void) => void;
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (typeof docWithTransition.startViewTransition === "function" && !reduceMotion) {
      docWithTransition.startViewTransition(commit);
    } else {
      commit();
    }
  }, [resolvedTheme, systemTheme]);

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#0A0A0A] dark:bg-[#0A0A0A] dark:text-[#FAFAFA]">
      <a
        href="#main-content"
        className="visually-hidden focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded focus:bg-[#0A0A0A] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-[#FAFAFA] dark:focus:bg-[#FAFAFA] dark:focus:text-[#0A0A0A]"
      >
        Lewati ke konten utama
      </a>

      <ScrollProgress />

      <Header
        resolvedTheme={resolvedTheme}
        onToggleTheme={handleToggleTheme}
        onOpenMobileMenu={() => setMobileMenuOpen(true)}
      />

      <MobileMenuDialog
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <WorkSection />
        <ContactSection />
      </main>
    </div>
  );
}
