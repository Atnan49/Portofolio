# Atnan Septian Wijanarko — Developer Portfolio

Welcome to the repository of my personal portfolio website! This project is built using **Next.js 16**, **TypeScript**, and **Vanilla CSS** to present a clean, fast, and minimalist showcase of my selected work, tech stack, and experience.

🌐 **Live Website:** [https://project-6ivrc.vercel.app](https://project-6ivrc.vercel.app)

---

## 🎨 Design Philosophy & Aesthetics

The website is designed with a premium, typography-focused editorial layout:
- **Warm Minimalist Color Palette**: Warm background (`#F8F7F4`), sharp text, and a vibrant primary accent blue (`#1D4ED8`).
- **Sophisticated Typography**: Uses Google Fonts (Cormorant for elegant serif display headings and Outfit for clean, highly-readable body text) imported via `next/font` for optimal performance.
- **Dynamic Interactions**: Features scroll-triggered animations (fade-up and stagger reveals) using the `IntersectionObserver` API, alongside smooth micro-animations and interactive hover transitions.
- **Responsive Layout**: Designed mobile-first, ensuring readability and layout integrity across all devices.

---

## ⚡ Tech Stack & Tools

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Static Generation)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Type Safety)
- **Styling**: Vanilla CSS (Global Design Tokens & Variables)
- **Animations**: CSS Keyframes + Custom IntersectionObserver React hook
- **Deployment**: [Vercel](https://vercel.com/) (Connected to GitHub branch for CI/CD)

---

## 📂 Project Structure

```bash
portfolio/
├── public/                 # Static assets (Profile picture, vector graphics)
│   ├── profile.jpg         # 1:1 Optimized profile photo
│   └── *.svg               # Next.js boilerplate vectors
├── src/
│   ├── app/                # Next.js App Router root segment
│   │   ├── globals.css     # Design tokens, variables, component styles & media queries
│   │   ├── icon.svg        # Custom monogram SVG favicon
│   │   ├── layout.tsx      # Root layout, next/font imports, SEO metadata
│   │   └── page.tsx        # Main page assembling the sections
│   ├── components/         # Reusable structural components
│   │   ├── About.tsx       # Bio & grid profile image layout
│   │   ├── Contact.tsx     # Contact channels and external profiles
│   │   ├── Divider.tsx     # Section dividers
│   │   ├── Footer.tsx      # Copyright & location info
│   │   ├── Hero.tsx        # Responsive hero with scroll-indicator
│   │   ├── Navbar.tsx      # Fixed blur glassmorphism navigation & mobile toggle menu
│   │   ├── Projects.tsx    # List-based project showcase with external links
│   │   └── Skills.tsx      # Pill-based tech stack grid with featured badges
│   └── hooks/
│       └── useReveal.ts    # React Hook for triggering scroll-reveal animations
└── vercel.json             # Framework presets override config
```

---

## 🚀 Getting Started

To run the project locally, follow these steps:

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v18.x or newer recommended).

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Atnan49/Portofolio.git
   cd Portofolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. Open your browser and go to `http://localhost:3000`.

---

## 🛠️ Deploying Changes

This project is connected directly to **Vercel** via GitHub integration.

To update the live site:
1. Make your changes locally.
2. Commit and push your changes to GitHub:
   ```bash
   git add .
   git commit -m "Your update message"
   git push origin main
   ```
3. Vercel will automatically detect the commit, build, and deploy the new version of your portfolio.
