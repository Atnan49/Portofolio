'use client';

import { useReveal } from '@/hooks/useReveal';

interface Project {
  number: string;
  title: string;
  description: string;
  tags: string[];
  href?: string;
}

const projects: Project[] = [
  {
    number: '01',
    title: 'tarifter.com',
    description:
      'A multi-platform video downloader supporting TikTok, YouTube, Instagram, and Twitter/X. Built for speed and simplicity — no sign-up, no friction. Monetized with ad networks and deployed on Railway.',
    tags: ['Node.js', 'yt-dlp', 'Railway', 'Cloudflare'],
    href: 'https://tarifter.com',
  },
  {
    number: '02',
    title: 'Seraphic.Std',
    description:
      'Landing page for a graphic design service brand based in Ngawi, East Java. Clean, conversion-focused design with WhatsApp order integration, portfolio gallery, and FAQ section. Delivered fully to client with hosting on Vercel.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Vercel'],
    href: 'https://seraphic-std-five.vercel.app',
  },
  {
    number: '03',
    title: 'HIMATIF Attendance System',
    description:
      'A real-time RFID card-based attendance system for the Informatics Student Association at UMS. Features live attendance tracking via WebSocket, role-based access, event management, and member card registration.',
    tags: ['Laravel 11', 'Livewire 3', 'Laravel Reverb', 'MySQL', 'Spatie'],
  },
];

function ProjectCard({ project }: { project: Project }) {
  const hasLink = !!project.href;

  const content = (
    <>
      <div>
        <p className="project-number">{project.number}</p>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className={`project-arrow${!hasLink ? ' no-link' : ''}`}>
        {hasLink ? '↗' : '—'}
      </div>
    </>
  );

  if (hasLink) {
    return (
      <a
        className="project-card has-link reveal"
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return <div className="project-card reveal">{content}</div>;
}

export default function Projects() {
  const ref = useReveal();

  return (
    <section id="projects" ref={ref}>
      <div className="container">
        <p className="section-label reveal">Selected Work</p>
        <div className="projects-list">
          {projects.map((project) => (
            <ProjectCard key={project.number} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
