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
    title: 'Video Downloder',
    description:
      'A multi-platform video downloader supporting TikTok, YouTube, Instagram, and Twitter/X. Built for speed and simplicity — no sign-up, no friction. Monetized with ad networks and deployed on Railway.',
    tags: ['Node.js', 'yt-dlp', 'Railway', 'Cloudflare'],
    href: 'https://github.com/Atnan49/downloder_video',
  },
  {
    number: '02',
    title: 'Seraphic-Std',
    description:
      'Landing page for a graphic design service brand based in Ngawi, East Java. Clean, conversion-focused design with WhatsApp order integration, portfolio gallery, and FAQ section. Delivered fully to client with hosting on Vercel.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Vercel'],
    href: 'https://github.com/Atnan49/Seraphic_std',
  },
  {
    number: '03',
    title: 'RepoBook',
    description:
      'An interactive digital book repository allowing users to search, read, upload, and save PDF ebooks. Features secure PDF streaming to protect file sources, admin moderation, and reading statistics.',
    tags: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript', 'Docker'],
    href: 'https://github.com/Atnan49/Repo_ebook',
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
