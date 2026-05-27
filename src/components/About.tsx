'use client';

import Image from 'next/image';
import { useReveal } from '@/hooks/useReveal';

export default function About() {
  const ref = useReveal();

  return (
    <section id="about" ref={ref}>
      <div className="container about-container">
        <div className="about-image-wrapper reveal">
          <Image
            src="/profile.jpg"
            alt="Atnan Septian Wijanarko"
            width={320}
            height={320}
            className="about-image"
            priority
          />
        </div>
        <div className="about-content">
          <p className="section-label reveal">About</p>
          <p className="about-text reveal">
            Informatics student &amp; freelance developer based in <em>East Java, Indonesia</em> —
            building for the web, one thoughtful line at a time.
          </p>
          <p className="about-body reveal">
            I specialize in building web applications that are clean, fast, and easy to maintain.
            Currently studying Informatics while taking on freelance projects ranging from
            landing pages to full-stack systems. I believe good software is invisible —
            it just works, beautifully.
          </p>
        </div>
      </div>
    </section>
  );
}
