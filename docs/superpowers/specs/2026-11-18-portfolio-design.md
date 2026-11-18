# Personal Portfolio Design Specification

**Design Read:** Reading this as: Personal portfolio and software engineering profile for clients, recruiters, and peers of Atnan Septian Wijanarko, in a high-contrast monochrome editorial style, dial ENERGY 2 / RHYTHM 3 / MOTION 3.

## 1. Intent and Scope

Build the personal website for **Atnan Septian Wijanarko** (Informatics Engineering student at Universitas Muhammadiyah Surakarta since 2024, focused on App, Web, and IoT software development) inside `d:\Portofolio` using **React + Vite + Tailwind CSS v4 + TypeScript + Motion (`motion/react`)**.

### Goals
- Present Atnan's verified bio, monochrome studio portrait, GitHub-backed tech stack, and four selected works (**PARTI HIMATIF UMS 2026**, **QOMAR**, **Smart E-Book Digital Fikih**, and **Miftah Kaidah Shorof**) with real links.
- Deliver choreographed, 60fps GPU-composited full motion (`MOTION 3`) using `motion/react` and modern CSS Scroll-Driven / Top-Layer / View Transitions primitives, while respecting `prefers-reduced-motion`.
- Support responsive desktop, tablet, and mobile layouts (`1440`, `1024`, `768`, `390`) and functional Light/Dark monochrome themes with verified WCAG AA contrast.

### Non-Goals and Anti-Goals
- No invented statistics, fake testimonials, generic AI buzzwords, em dashes (`—`), or emojis anywhere in UI or source code.
- No server-side backend; contact submission formats a structured `mailto:atnanseptian1@gmail.com` draft alongside one-click email copy.
- Do not modify or overwrite `Untitled.figcraft`.

## 2. Visual System and Contrast

- **Palette (Monochrome Black & White)**:
  - Dark surfaces: `#0A0A0A` (primary dark ground), `#141414` (elevated surface), `#262626` (hairline divider), `#737373` (interactive input/button borders, 4.18:1 on `#0A0A0A` / 3.89:1 on `#141414`).
  - Dark text: `#FAFAFA` (18.97:1), `#D4D4D4` (13.36:1), `#A3A3A3` (7.30:1 on `#141414`, >7.9:1 on `#0A0A0A`).
  - Light surfaces: `#F7F7F5` (gallery paper ground), `#FFFFFF` (elevated surface), `#D4D4D4` (hairline divider), `#737373` (interactive borders, 4.42:1 on `#F7F7F5` / 4.74:1 on `#FFFFFF`).
  - Light text: `#0A0A0A` (18.46:1), `#525252` (7.28:1).
- **Theme Behavior**:
  - Follows system preference by default (`<meta name="color-scheme" content="light dark">`) and allows manual override via a two-state toggle (`Mode: Gelap / Terang`) stored in `localStorage` (removed when toggling back to match system preference) with View Transitions API sweep when supported.
  - Both light and dark themes must preserve readability and contrast across every section, form control, dialog, and focus ring (`:focus-visible`).
- **Typography**:
  - Display: `Playfair Display` (editorial contrast matching the studio portrait lighting).
  - Body & UI: `Nunito Sans` (open humanist legibility across paragraphs and controls).

## 3. Page Architecture and Content

1. **Header (`<header>`)**: Brand anchor (`Atnan Septian`), section nav (`Tentang`, `Karya`, `Kontak`), `ThemeToggle` button, and on mobile an explicitly labeled `Menu` button opening a native `<dialog>` drawer.
2. **Hero (`#hero`)**: First-screen framing (`min-h-[calc(100svh-5rem)]` on desktop) with `<h1>` (`Atnan Septian Wijanarko`), role (`Pengembang Software: App, Web, dan IoT`), concise intro with hard fact (`sejak 2024`), specific CTAs (`Lihat Karya Pilihan`, `Hubungi Saya`), and watermark-free monochrome portrait (`width=747`, `height=899`, `fetchpriority="high"`, no caption).
3. **Tentang (`#tentang`)**: Asymmetric split with factual metadata table (`Kampus`, `Angkatan`, `Fokus`), narrative bio, and 3-column GitHub-verified Tech Stack (`Web & Frontend`, `Backend & Data`, `App, PWA & IoT`).
4. **Karya Pilihan (`#karya`)**:
   - Interactive split showcase + 4-item selectable editorial list:
     - **PARTI HIMATIF UMS 2026** (`https://partiums.himatifums.org/`, repo `https://github.com/Atnan49/Parti_mini_version`)
     - **QOMAR (Komik Digital Bahasa Arab)** (`https://qomar-mi.vercel.app/`, repo `https://github.com/Atnan49/Qomar`)
     - **Smart E-Book Digital Fikih** (`https://ebook-fikih.vercel.app/`, repo `https://github.com/Atnan49/Ebook-Fikih`)
     - **Miftah Kaidah Shorof** (`https://kaidahsorof.vercel.app/`)
   - Hovering, focusing, or selecting any project updates the preview showcase panel smoothly via `AnimatePresence` + `layoutId` active hairline indicator, with working live app and GitHub links (omitting private repo links that 404).
5. **Kontak & Footer (`#kontak`, `<footer>`)**: Direct email (`atnanseptian1@gmail.com`) with one-click copy + live feedback, GitHub profile (`https://github.com/Atnan49`), accessible contact form (`Nama`, `Email`, `Pesan`) validating on `blur`/`submit` and clearing on `input` (`:user-invalid`, `aria-invalid`, `aria-describedby`, `aria-live="polite"`) opening a prefilled `mailto:` draft, and compact footer with back-to-top anchor.

## 4. Motion Choreography (`MOTION 3`)

- Root wrapped in `<MotionConfig reducedMotion="user">`.
- **Scroll Progress Bar**: 2px top indicator driven by `useScroll` + `useSpring` via GPU `scaleX`.
- **Hero Entrance**: Sequential compositor-only entrance (`opacity`, `y`, subtle `clipPath` mask) settling within ~1s, plus subtle scroll-linked portrait container depth (`useScroll` + `useTransform` on `y`).
- **About & Section Rules**: Hairline dividers (`scaleX: 0 -> 1`) and focused lead reveals (`viewport={{ once: true, amount: 0.25 }}`) with content always visible under reduced motion.
- **Interactive Project Switcher**: `AnimatePresence mode="wait"` image crossfade + `layoutId` indicator + subtle `scale(1.02)` hover zoom inside overflow-clipped frames.
- **Top-Layer Mobile Dialog & Theme Toggle**: Native `<dialog>` animated with CSS `@starting-style` + `transition-behavior: allow-discrete` (plus Firefox/Safari closing attribute fallback) and `document.startViewTransition` for theme changes.
