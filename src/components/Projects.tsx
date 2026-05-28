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
    title: 'Video Downloader',
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

function ProjectMockup({ number }: { number: string }) {
  if (number === '01') {
    return (
      <div className="mockup-browser" aria-hidden="true">
        <div className="mockup-header">
          <div className="mockup-dot" />
          <div className="mockup-dot" />
          <div className="mockup-dot" />
          <div className="mockup-address">downloader.atnan.my.id</div>
        </div>
        <div className="mockup-content" style={{ display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'center' }}>
          <div style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--text)', textAlign: 'center' }}>
            Video Downloader
          </div>
          <div style={{ display: 'flex', gap: '4px', width: '100%' }}>
            <div style={{ flexGrow: 1, height: '20px', borderRadius: '4px', background: 'var(--bg)', border: '1px solid var(--border)', fontSize: '7px', display: 'flex', alignItems: 'center', paddingLeft: '6px', color: 'var(--subtle)' }}>
              Paste video link here...
            </div>
            <div style={{ width: '36px', height: '20px', borderRadius: '4px', background: 'var(--accent)', color: '#fff', fontSize: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              Fetch
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '4px' }}>
            {['YT', 'TT', 'IG', 'X'].map((platform) => (
              <span key={platform} style={{ fontSize: '6px', fontWeight: 'bold', padding: '2px 4px', borderRadius: '3px', background: 'var(--accent-light)', color: 'var(--accent)' }}>
                {platform}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (number === '02') {
    return (
      <div className="mockup-browser" aria-hidden="true">
        <div className="mockup-header">
          <div className="mockup-dot" />
          <div className="mockup-dot" />
          <div className="mockup-dot" />
          <div className="mockup-address">seraphic.std</div>
        </div>
        <div className="mockup-content" style={{ padding: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '9px', fontWeight: 'bold', fontFamily: 'var(--font-display)', color: 'var(--text)' }}>Seraphic.</span>
            <span style={{ fontSize: '6px', padding: '2px 5px', borderRadius: '10px', background: '#25D366', color: '#fff', fontWeight: 'bold' }}>Order WA</span>
          </div>
          <div style={{ textAlign: 'center', margin: '4px 0' }}>
            <div style={{ fontSize: '10px', fontWeight: 'bold', lineHeight: 1.1, color: 'var(--text)' }}>Creative Graphic Design</div>
            <div style={{ fontSize: '6px', color: 'var(--muted)', marginTop: '2px' }}>Ngawi, East Java</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px' }}>
            <div style={{ height: '30px', borderRadius: '4px', background: 'linear-gradient(45deg, #f093fb, #f5576c)' }} />
            <div style={{ height: '30px', borderRadius: '4px', background: 'linear-gradient(45deg, #5ee7df, #b490ca)' }} />
            <div style={{ height: '30px', borderRadius: '4px', background: 'linear-gradient(45deg, #c3cfe2, #c3cfe2)' }} />
          </div>
        </div>
      </div>
    );
  }

  if (number === '03') {
    return (
      <div className="mockup-browser" aria-hidden="true">
        <div className="mockup-header">
          <div className="mockup-dot" />
          <div className="mockup-dot" />
          <div className="mockup-dot" />
          <div className="mockup-address">repobook.dev</div>
        </div>
        <div className="mockup-content" style={{ padding: '8px', display: 'flex', gap: '8px' }}>
          <div style={{ width: '28px', display: 'flex', flexDirection: 'column', gap: '4px', borderRight: '1px solid var(--border)', paddingRight: '4px' }}>
            <div style={{ height: '5px', width: '20px', background: 'var(--accent)', borderRadius: '2px' }} />
            <div style={{ height: '4px', width: '15px', background: 'var(--border)', borderRadius: '1px' }} />
            <div style={{ height: '4px', width: '18px', background: 'var(--border)', borderRadius: '1px' }} />
            <div style={{ height: '4px', width: '12px', background: 'var(--border)', borderRadius: '1px' }} />
          </div>
          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ height: '8px', width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '3px' }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
              {[
                { title: 'AI', color: '#6366F1' },
                { title: 'JS', color: '#F59E0B' },
                { title: 'DB', color: '#10B981' },
                { title: 'Git', color: '#EF4444' }
              ].map((book, i) => (
                <div key={i} style={{ height: '32px', borderRadius: '3px', background: book.color, color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '3px' }}>
                  <div style={{ fontSize: '5px', fontWeight: 'bold' }}>{book.title}</div>
                  <div style={{ height: '2px', background: 'rgba(255,255,255,0.4)', borderRadius: '10px', width: '80%' }} />
                </div>
              ))}
            </div>
            <div style={{ height: '12px', borderRadius: '3px', background: 'var(--bg)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
              <span style={{ fontSize: '5px', color: 'var(--muted)' }}>Stats</span>
              <span style={{ fontSize: '5px', color: 'var(--accent)', fontWeight: 'bold' }}>85% Done</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

function ProjectCard({ project }: { project: Project }) {
  const hasLink = !!project.href;

  const metadata = (
    <div className="project-meta">
      <p className="project-number">{project.number}</p>
      <h3 className="project-title">
        {project.title} {hasLink && <span style={{ fontSize: '0.8em', marginLeft: '2px' }}>↗</span>}
      </h3>
      <p className="project-desc">{project.description}</p>
      <div className="project-tags">
        {project.tags.map((tag) => (
          <span key={tag} className="project-tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );

  const visual = (
    <div className="project-visual">
      <ProjectMockup number={project.number} />
    </div>
  );

  if (hasLink) {
    return (
      <a
        className="project-card reveal"
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {metadata}
        {visual}
      </a>
    );
  }

  return (
    <div className="project-card reveal">
      {metadata}
      {visual}
    </div>
  );
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
