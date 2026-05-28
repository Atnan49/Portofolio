'use client';

import { useReveal } from '@/hooks/useReveal';

interface Skill {
  name: string;
  featured: boolean;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend & UI',
    skills: [
      { name: 'Next.js', featured: true },
      { name: 'TypeScript', featured: true },
      { name: 'JavaScript', featured: false },
      { name: 'HTML / CSS', featured: false },
      { name: 'Tailwind CSS', featured: false },
      { name: 'Livewire', featured: false },
    ],
  },
  {
    title: 'Backend & DB',
    skills: [
      { name: 'Laravel', featured: true },
      { name: 'PHP', featured: false },
      { name: 'MySQL', featured: false },
    ],
  },
  {
    title: 'Tools & DevOps',
    skills: [
      { name: 'Git', featured: false },
      { name: 'Vercel', featured: false },
      { name: 'WordPress', featured: false },
      { name: 'Docker', featured: false },
    ],
  },
];

function getSkillIcon(name: string) {
  switch (name) {
    case 'Next.js':
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 17V7l6 10h-2l-4-6.6V17h-2z" />
        </svg>
      );
    case 'TypeScript':
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M7 10h4v2H9v5H7v-5H6v-2h1zM14 10h4l-2 3.5 2 3.5h-4z" />
        </svg>
      );
    case 'JavaScript':
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M15 9h-3a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4h-3M9 9v6a2 2 0 0 0 2 2" />
        </svg>
      );
    case 'Laravel':
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.5 4H21v3.5M21 4L13 12m1-8h3.5V7.5M14 4L6 12m-2.5 4H7v3.5M7 20l8-8M3.5 20H7v-3.5M3.5 20l8-8" />
        </svg>
      );
    case 'PHP':
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="12" rx="10" ry="6" />
          <path d="M8 9.5h2a2 2 0 0 1 0 4H8v-4zM14 9.5h2a2 2 0 0 1 0 4h-2v-4z" />
        </svg>
      );
    case 'Livewire':
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      );
    case 'MySQL':
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6" />
        </svg>
      );
    case 'HTML / CSS':
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      );
    case 'Tailwind CSS':
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3c-1.2 0-2.4.6-3.6 1.8-1.2 1.2-1.8 2.4-1.8 3.6 0 1.2.6 2.4 1.8 3.6 1.2 1.2 2.4 1.8 3.6 1.8s2.4-.6 3.6-1.8c1.2-1.2 1.8-2.4 1.8-3.6 0-1.2-.6-2.4-1.8-3.6C14.4 3.6 13.2 3 12 3z" />
          <path d="M6 9c-1.2 0-2.4.6-3.6 1.8C1.2 12 .6 13.2.6 14.4c0 1.2.6 2.4 1.8 3.6 1.2 1.2 2.4 1.8 3.6 1.8s2.4-.6 3.6-1.8c1.2-1.2 1.8-2.4 1.8-3.6 0-1.2-.6-2.4-1.8-3.6C8.4 9.6 7.2 9 6 9z" />
        </svg>
      );
    case 'Git':
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="18" r="3" />
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path d="M6 9v12M21 15a3 3 0 0 0-3-3h-9L6 9" />
        </svg>
      );
    case 'Vercel':
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3l10 17H2L12 3z" />
        </svg>
      );
    case 'WordPress':
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 22a10 10 0 0 1-5.74-1.8L9.5 11l2.5 7 2.5-7 3.24 9.2A10 10 0 0 1 12 22z" />
        </svg>
      );
    case 'Docker':
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="10" width="3" height="3" rx="0.5" />
          <rect x="9" y="10" width="3" height="3" rx="0.5" />
          <rect x="13" y="10" width="3" height="3" rx="0.5" />
          <rect x="9" y="6" width="3" height="3" rx="0.5" />
          <path d="M2 15h20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="1" />
        </svg>
      );
  }
}

export default function Skills() {
  const ref = useReveal();

  return (
    <section id="skills" ref={ref}>
      <div className="container">
        <p className="section-label reveal">Tech Stack</p>
        <div className="skills-container reveal">
          {skillCategories.map((category) => (
            <div key={category.title} className="skills-category-card">
              <h3 className="skills-category-title">{category.title}</h3>
              <div className="skills-grid-inner">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="skill-row">
                    <span className="skill-icon-container">
                      {getSkillIcon(skill.name)}
                    </span>
                    <span className="skill-name">{skill.name}</span>
                    {skill.featured && (
                      <span className="skill-tag-tiny">CORE</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
