'use client'
import { useInView, useScrollY } from '@/hooks/useParallax'
import { ShieldCheck, Monitor, DollarSign, Users, ArrowLeftRight, ClipboardCheck, Github, ArrowRight } from 'lucide-react'

const featuredTags = [
  'Go', 'Clean Architecture', 'PostgreSQL', 'PostGIS', 'Redis',
  'WebSockets', 'MinIO', 'Kotlin', 'Jetpack Compose', 'Cloudflare Tunnel',
]

const projects = [
  {
    title: 'Firewall Policy Manager',
    desc: 'High-performance firewall policy system with 15+ RESTful APIs, atomic bulk operations, and TypeORM transaction rollback for zero data corruption.',
    Icon: ShieldCheck,
    github: 'https://github.com/vi-nayKR',
    tags: ['Node.js', 'TypeScript', 'TypeORM', 'Auth0', 'Redis'],
  },
  {
    title: 'AI Error Logger',
    desc: 'AI-driven error logging tool centralising frontend crash reports and backend telemetry, reducing bug resolution time by ~30%.',
    Icon: Monitor,
    github: 'https://github.com/vi-nayKR',
    tags: ['React', '.NET Core', 'LLM API', 'TypeScript'],
  },
  {
    title: 'Cage-Credit API',
    desc: 'Financial transaction system for casino operations covering bank account management, voucher redemption, denomination exchange, and check cashing.',
    Icon: DollarSign,
    github: 'https://github.com/vi-nayKR',
    tags: ['ASP.NET Core', 'C#', 'SQL Server', 'REST API'],
  },
  {
    title: 'Engage Platform Modules',
    desc: 'Angular frontend modules for player management platform with complex SQL Server stored procedure optimisation and ~20% load time improvement.',
    Icon: Users,
    github: 'https://github.com/vi-nayKR',
    tags: ['Angular', 'RxJS', 'TypeScript', 'SQL Server'],
  },
  {
    title: 'Cross-chain Swap Cache',
    desc: 'Redis caching layer for cross-chain swap quotes with strict user-ownership and quote-expiry validation using LiFi Protocol.',
    Icon: ArrowLeftRight,
    github: 'https://github.com/vi-nayKR',
    tags: ['Redis', 'Node.js', 'Web3', 'LiFi Protocol', 'EVM'],
  },
  {
    title: 'Cypress Test Suite',
    desc: '750+ end-to-end Cypress automated test cases reducing manual UI testing by 50% and cutting critical production defects across agile release cycles.',
    Icon: ClipboardCheck,
    github: 'https://github.com/vi-nayKR',
    tags: ['Cypress', 'E2E Testing', 'TypeScript', 'Angular'],
  },
]

export default function Projects() {
  const { ref, inView } = useInView(0.1)
  const scrollY = useScrollY()

  return (
    <section
      id="projects"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Parallax glow */}
      <div
        className="parallax-layer absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 65%)',
          transform: `translateY(${scrollY * 0.02}px)`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-accent font-mono text-xs tracking-widest uppercase mb-4">Open Source & Work</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-frost text-balance">
            Featured Projects
          </h2>
        </div>

        {/* Featured: Medha API */}
        <div
          className="mb-8 p-8 rounded-2xl bg-surface border border-border card-hover overflow-hidden relative transition-all duration-700"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.09) 0%, transparent 65%)' }}
            aria-hidden="true"
          />
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 md:gap-12">
            {/* Left side: details */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs font-mono text-accent bg-accent/10 px-2 py-1 rounded mb-2 inline-block">
                    Featured Project
                  </span>
                  <h3 className="text-2xl font-display font-bold text-frost">Medha</h3>
                  <p className="text-accent text-xs font-mono tracking-widest uppercase mt-0.5">A SACRED BRIDGE</p>
                </div>
                <a
                  href="https://github.com/vi-nayKR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-accent/50 text-muted hover:text-frost text-sm transition-all duration-200 self-start sm:self-center"
                >
                  <Github className="w-4 h-4" />
                  View Code
                </a>
              </div>

              {/* Short, concise, clear cut description */}
              <div className="space-y-4 mb-6 text-muted text-sm leading-relaxed max-w-2xl">
                <p>
                  <strong className="text-frost">Setu:</strong> A sacred bridge connecting Yajmans and Pandits, designed purely for dharmic connection.
                </p>
                <p>
                  <strong className="text-frost">Architecture:</strong> Clean Architecture with isolated bounded contexts across four layers: Domain, Postgres Repository (pgx/PostGIS), Service, and Handler.
                </p>
                <p>
                  <strong className="text-frost">Core Systems:</strong> Real-time WebSocket chat (Redis Pub/Sub), spatial matchmaking (ST_DWithin), MinIO media proxying, and CI/CD deployment via Cloudflare Tunnel.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {featuredTags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs font-mono bg-void border border-accent/30 text-accent">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right side: Mobile Screenshot */}
            <div className="w-full lg:w-64 shrink-0 flex justify-center">
              <div className="w-48 lg:w-full max-w-[220px] aspect-[9/20] overflow-hidden rounded-2xl border border-border/30 bg-void/50 shadow-2xl relative group/medha-img">
                <img
                  src="medha-app.png"
                  alt="Medha App Onboarding"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/medha-img:scale-105"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(({ title, desc, Icon, github, tags }, i) => (
            <div
              key={title}
              className="p-6 rounded-2xl bg-surface border border-border card-hover flex flex-col transition-all duration-700"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(30px)',
                transitionDelay: `${0.1 + i * 0.08}s`,
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-frost transition-colors"
                    aria-label={`GitHub link for ${title}`}
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
              </div>
              <h3 className="font-display font-semibold text-frost mb-2">{title}</h3>
              <p className="text-sm text-muted leading-relaxed flex-1 mb-4">{desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded text-xs bg-void border border-border text-muted font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://github.com/vi-nayKR"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl border border-border hover:border-accent/50 text-frost font-semibold text-sm transition-all duration-200 hover:bg-surface hover:-translate-y-0.5"
          >
            <Github className="w-5 h-5" />
            See all repositories on GitHub
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
