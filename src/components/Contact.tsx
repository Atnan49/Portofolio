'use client';

import { useReveal } from '@/hooks/useReveal';

const contactLinks = [
  { label: '✉ Email', href: 'mailto:atnanseptian1@gmail.com' },
  { label: '⌥ GitHub', href: 'https://github.com/Atnan49', external: true },
  { label: '↗ Freelancer', href: 'https://freelancer.com/u/atnan49', external: true },
];

export default function Contact() {
  const ref = useReveal();

  return (
    <section id="contact" ref={ref}>
      <div className="container">
        <p className="section-label reveal">Contact</p>
        <h2 className="contact-heading reveal">
          Let&apos;s build something<br />
          <em>worth remembering.</em>
        </h2>
        <p className="contact-desc reveal">
          Open for freelance projects, collaborations, or just a good conversation about the web.
        </p>
        <div className="contact-links reveal">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              className="contact-link"
              href={link.href}
              {...(link.external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
