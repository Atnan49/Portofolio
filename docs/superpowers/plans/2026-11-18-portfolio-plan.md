# Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Atnan Septian Wijanarko's monochrome full-motion personal portfolio website in `d:\Portofolio` matching the approved FigCraft design and Design Spec.

**Architecture:** Modular React + TypeScript + Vite application styled with Tailwind CSS v4 (`@tailwindcss/vite`, `@custom-variant dark`), powered by `motion/react` under `<MotionConfig reducedMotion="user">` alongside native Web Platform APIs (`<dialog>`, `<meta name="color-scheme">`, View Transitions API, `:user-invalid`). Static data lives cleanly in `src/data/portfolio.ts`, with focused components per section and pure helper functions tested via Vitest plus full responsive/interactive browser checks in headless Chrome.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS v4 (`@tailwindcss/vite`), `motion` (`motion/react`), Vitest + jsdom.

**Spec:** `docs/superpowers/specs/2026-11-18-portfolio-design.md`

## Global Constraints

- Monochrome black-and-white design (`#0A0A0A`, `#141414`, `#F7F7F5`, `#FFFFFF`, `#D4D4D4`, `#525252`, `#A3A3A3`, `#737373`) with WCAG AA verified contrast in both light and dark modes.
- Zero emojis and zero em dashes (`—`) anywhere in source or UI copy.
- Only verified personal facts, verified URLs (`partiums.himatifums.org`, `Parti_mini_version`, `qomar-mi.vercel.app`, `Qomar`, `ebook-fikih.vercel.app`, `Ebook-Fikih`, `kaidahsorof.vercel.app`, `github.com/Atnan49`, `atnanseptian1@gmail.com`). Do not link private `Miftah-kaidah-sorof` repo (`404`).
- No numbering prefixes (`01 /`, `02`, etc.) on section titles or project rows.
- No caption under any photograph or project screenshot.
- All interactive controls >= 44px touch target, keyboard-operable (`Tab`, `Enter`, `Space`, `Escape`), visible `:focus-visible`, `cursor: pointer` on enabled interactive elements.
- Do not overwrite `Untitled.figcraft`.

## Review Focus

- Theme persistence and system-preference revert logic: toggling theme when stored value matches OS preference must remove the `localStorage` entry so future OS switches keep working, while malformed or blocked `localStorage` never crashes initial paint.
- Mobile `<dialog>` exit & backdrop dismiss across browsers: `closedby="any"` fallback on `pointerdown`/`pointerup` outside bounds must not dismiss when dragging text from inside to outside, and `cancel` event must route cleanly through exit transition helper.
- Contact form validation timing: empty fields must NOT show error styling before interaction or while typing (`onChange` clears errors, `onBlur`/`onSubmit` validates and focuses first invalid field), and `mailto:` link construction must properly URL-encode subject and body.
- Project preview switcher keyboard & screen-reader parity: clicking or keyboard-activating any of the 4 project items switches the active preview cleanly while still keeping real `<a href>` navigation to live site and GitHub repository separate and unambiguous.
- Reduced motion safety: under `prefers-reduced-motion: reduce`, `<MotionConfig reducedMotion="user">` disables spatial transforms/layout shifts while ensuring no section or hero copy stays stuck at `opacity: 0`.

---

### Task 1: Project Scaffolding, Dependencies, Assets, and Pure Utility Tests

**Files:**
- Create: `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`, `src/index.css`
- Create: `public/images/atnan-portrait.webp` (and `.jpg` fallback or crisp `.webp`), `public/images/projects/parti.webp`, `qomar.webp`, `ebook-fikih.webp`, `kaidah-sorof.webp`
- Create: `src/utils/theme.ts`, `src/utils/contact.ts`, `src/utils/__tests__/portfolioUtils.test.ts`

- [ ] **Step 1: Initialize `package.json`, `tsconfig.json`, and `vite.config.ts` and install dependencies (`react`, `react-dom`, `motion`, `tailwindcss`, `@tailwindcss/vite`, `vite`, `@vitejs/plugin-react`, `typescript`, `@types/react`, `@types/react-dom`, `vitest`, `jsdom`)**
- [ ] **Step 2: Convert and optimize static image assets from `scratch/` (`portrait_clean.jpg` and the 4 captured live site previews, removing browser scrollbars and keeping crisp aspect ratios) into `public/images/`**
- [ ] **Step 3: Write failing Vitest unit tests in `src/utils/__tests__/portfolioUtils.test.ts` covering theme toggle state resolution (`resolveNextColorScheme`, `applyColorSchemeMeta`) and contact form validation + `mailto:` URI building (`validateContactFields`, `buildMailtoHref`)**
- [ ] **Step 4: Run `npx vitest run` to confirm tests fail before implementation**
- [ ] **Step 5: Implement `src/utils/theme.ts` and `src/utils/contact.ts` cleanly following `modern-web-guidance` `dark-mode-toggle` and `forms` rules**
- [ ] **Step 6: Run `npx vitest run` and confirm all utility tests pass**

### Task 2: HTML Document Shell, Fonts, Tailwind v4 Theme & Motion CSS

**Files:**
- Create: `index.html`, `src/index.css`

- [ ] **Step 1: Write `index.html` with `lang="id"`, descriptive `<title>` and `<meta name="description">`, `<meta name="color-scheme" content="light dark">`, tiny inline FOUC-prevention `<script>` right after `<meta>`, and Google Fonts (`Playfair Display` + `Nunito Sans`)**
- [ ] **Step 2: Write `src/index.css` with `@import "tailwindcss";`, `@custom-variant dark (&:where(.dark, .dark *));`, `@theme` tokens, base `cursor: pointer` on enabled interactive controls, high-contrast `:focus-visible`, `:user-invalid` field styling, and native `<dialog>` `@starting-style` + `allow-discrete` + `overscroll-behavior: contain` top-layer transitions**

### Task 3: Portfolio Data Module and Modular UI Sections

**Files:**
- Create: `src/data/portfolio.ts`
- Create: `src/components/ScrollProgress.tsx`
- Create: `src/components/Header.tsx`
- Create: `src/components/MobileMenuDialog.tsx`
- Create: `src/components/HeroSection.tsx`
- Create: `src/components/AboutSection.tsx`
- Create: `src/components/WorkSection.tsx`
- Create: `src/components/ContactSection.tsx`
- Create: `src/App.tsx`, `src/main.tsx`

- [ ] **Step 1: Create `src/data/portfolio.ts` containing Atnan's verified bio, GitHub stack categories, the 4 real projects (`PARTI HIMATIF UMS 2026`, `QOMAR`, `Smart E-Book Digital Fikih`, `Miftah Kaidah Shorof`), and social/email links**
- [ ] **Step 2: Build `ScrollProgress.tsx`, `Header.tsx`, and `MobileMenuDialog.tsx` (native `<dialog>` with Safari outside-click fallback, Escape handling, and focus management)**
- [ ] **Step 3: Build `HeroSection.tsx` (choreographed `motion/react` entrance, `fetchpriority="high"` portrait with explicit dimensions and scroll-linked container depth, primary/secondary actions)**
- [ ] **Step 4: Build `AboutSection.tsx` (factual metadata table, narrative bio, 3-column GitHub stack grid, animated hairline divider)**
- [ ] **Step 5: Build `WorkSection.tsx` (interactive 4-project showcase with `AnimatePresence mode="wait"` live screenshot transitions, `layoutId` active hairline marker, and direct live/GitHub links; zero numbering)**
- [ ] **Step 6: Build `ContactSection.tsx` and `App.tsx` (accessible contact form with blur/submit validation, `mailto:` action, one-click email copy with live status announcement, compact footer, `<MotionConfig reducedMotion="user">` wrapper)**

### Task 4: Build, Typecheck, Unit Test, and Full-Viewport Browser Verification

**Files:**
- Verify: `dist/` build, `npx tsc --noEmit`, `npx vitest run`, headless Chrome render & interactive verification at `1440x900`, `1024x768`, `768x1024`, `390x844` across Light & Dark themes.

- [ ] **Step 1: Run `npx tsc --noEmit`, `npx vitest run`, and `npm run build` — verify zero TypeScript, test, or Vite build errors**
- [ ] **Step 2: Serve built `dist/` locally and run automated Chrome/Playwright-style CDP or Node browser verification across `1440`, `1024`, `768`, and `390` checking zero console errors, zero horizontal overflow, light/dark theme toggle persistence, mobile `<dialog>` open/Escape/close, project switcher visual change, copy-email button state, contact form validation + valid submission, and capture real screenshots**
- [ ] **Step 3: Inspect rendered screenshots visually with `read_file` and execute the complete `antislop` Delivery Gate check**
