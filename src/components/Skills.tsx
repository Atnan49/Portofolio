'use client';

import { useReveal } from '@/hooks/useReveal';

const skills = [
  { name: 'Next.js', featured: true },
  { name: 'TypeScript', featured: true },
  { name: 'Laravel', featured: false },
  { name: 'PHP', featured: false },
  { name: 'Livewire', featured: false },
  { name: 'MySQL', featured: false },
  { name: 'JavaScript', featured: false },
  { name: 'HTML / CSS', featured: false },
  { name: 'WordPress', featured: false },
  { name: 'Tailwind CSS', featured: false },
  { name: 'Vercel', featured: false },
  { name: 'Git', featured: false },
];

export default function Skills() {
  const ref = useReveal();

  return (
    <section id="skills" ref={ref}>
      <div className="container">
        <p className="section-label reveal">Tech Stack</p>
        <div className="skills-grid reveal">
          {skills.map((skill) => (
            <span
              key={skill.name}
              className={`skill-tag${skill.featured ? ' featured' : ''}`}
            >
              <span className="skill-dot"></span>
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
