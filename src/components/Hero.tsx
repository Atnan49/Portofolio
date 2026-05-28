'use client';

import { useEffect, useState } from 'react';

const words = ['clean code', 'thoughtful design', 'real impact'];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="hero">
      <div className="container">
        <div className="hero-inner">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            <span>Fullstack Web Developer</span>
          </div>
          
          <h1 className="hero-name">
            Atnan<br />
            Septian <em>Wijanarko</em>
          </h1>
          
          <p className="hero-tagline-container">
            Crafting purposeful web experiences focused on{' '}
            <span className="rotating-text-wrapper">
              <span key={wordIndex} className="rotating-text-word">
                {words[wordIndex]}
              </span>
            </span>.
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
