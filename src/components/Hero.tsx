'use client';

import { useEffect, useState } from 'react';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="hero" className="hero">
      <div className="container">
        <div className="hero-inner">
          <p className="hero-eyebrow">Fullstack Web Developer</p>
          <h1 className="hero-name">
            Atnan<br />
            Septian <em>Wijanarko</em>
          </h1>
          <p className="hero-tagline">
            Crafting purposeful web experiences — clean code, thoughtful design, real impact.
          </p>
          <div className="hero-cta">
            <a href="#contact" className="btn-primary">Get in touch ↗</a>
            <a href="#projects" className="btn-ghost">See my work →</a>
          </div>
        </div>
      </div>
      <div className={`hero-scroll${mounted ? ' hero-scroll-visible' : ''}`}>
        <span>Scroll</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}
