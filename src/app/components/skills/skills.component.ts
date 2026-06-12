import { Component, OnInit, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiltDirective } from '../../directives/tilt.directive';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, TiltDirective, SafeHtmlPipe],
  template: `
    <section id="skills" class="relative py-16 md:py-32 px-4 md:px-6 overflow-hidden">
      <!-- Parallax bg element -->
      <div
        class="absolute inset-0 pointer-events-none"
        [style.transform]="'translateY(' + parallaxOffset() + 'px)'"
      >
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
             style="background: radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)"></div>
      </div>

      <!-- Outline background Typography -->
      <div
        class="absolute left-[-15%] top-1/3 outline-bg-text select-none pointer-events-none font-black opacity-10 will-change-transform hidden md:block"
        [style.transform]="'translate3d(' + (parallaxOffset() * -1.0) + 'px, 0, 0)'"
      >
        EXPERTISE
      </div>

      <div class="relative z-10 max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <p class="text-accent font-mono text-xs tracking-widest uppercase mb-4">Technical Expertise</p>
          <h2 class="text-4xl md:text-5xl font-display font-bold text-frost text-balance">
            Skills &amp; Technologies
          </h2>
        </div>

        <!-- Category grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (category of categories; track category.name) {
            <div
              appTilt
              [maxTilt]="10"
              [scale]="1.03"
              class="p-6 rounded-2xl apple-glass card-hover"
            >
              <div class="flex items-center gap-3 mb-5">
                <div class="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                  <span [innerHTML]="category.icon | safeHtml" class="text-accent"></span>
                </div>
                <h3 class="font-display font-semibold text-frost">{{ category.name }}</h3>
              </div>
              <div class="flex flex-wrap gap-2">
                @for (skill of category.skills; track skill.name) {
                  <span class="px-3 py-1.5 rounded-xl text-sm font-bold bg-void border border-border text-frost hover:border-accent/50 hover:text-accent transition-all duration-300 drop-shadow-md">
                    {{ skill.name }}
                  </span>
                }
              </div>
            </div>
          }
        </div>

        <!-- Tag cloud -->
        <div class="mt-12 text-center">
          <p class="text-muted text-sm mb-6 font-mono">Also familiar with</p>
          <div class="flex flex-wrap justify-center gap-2">
            @for (tag of extraTags; track tag) {
              <span class="px-3 py-1.5 rounded-full text-xs font-medium apple-glass text-frost hover:border-accent/50 hover:text-accent transition-all duration-200 cursor-default">
                {{ tag }}
              </span>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class SkillsComponent implements OnInit {
  visible = signal(false);
  parallaxOffset = signal(0);

  categories = [
    {
      name: 'Frontend',
      icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>',
      skills: [
        { name: 'Angular', level: 95 },
        { name: 'React', level: 88 },
        { name: 'TypeScript', level: 92 },
        { name: 'Tailwind CSS', level: 90 },
        { name: 'RxJS', level: 85 },
      ],
    },
    {
      name: 'Backend',
      icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/></svg>',
      skills: [
        { name: 'Node.js / Express', level: 90 },
        { name: 'Go (Chi)', level: 82 },
        { name: 'ASP.NET Core / C#', level: 80 },
        { name: 'REST API Design', level: 93 },
      ],
    },
    {
      name: 'Databases',
      icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"/></svg>',
      skills: [
        { name: 'PostgreSQL', level: 88 },
        { name: 'MySQL', level: 85 },
        { name: 'Redis', level: 85 },
        { name: 'SQL Server', level: 80 },
        { name: 'MongoDB', level: 72 },
      ],
    },
    {
      name: 'DevOps & Cloud',
      icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/></svg>',
      skills: [
        { name: 'Docker', level: 88 },
        { name: 'GitHub Actions', level: 85 },
        { name: 'AWS (EC2, S3)', level: 75 },
        { name: 'MinIO', level: 80 },
        { name: 'Cloudflare Tunnel', level: 78 },
      ],
    },
    {
      name: 'Auth & Security',
      icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>',
      skills: [
        { name: 'Auth0 / OAuth2', level: 90 },
        { name: 'JWT & 2FA', level: 88 },
        { name: 'RBAC Systems', level: 85 },
        { name: 'Crypto Signatures', level: 78 },
      ],
    },
    {
      name: 'Testing & Quality',
      icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>',
      skills: [
        { name: 'Cypress E2E', level: 92 },
        { name: 'Unit Testing', level: 82 },
        { name: 'Swagger / OpenAPI', level: 85 },
        { name: 'Integration Tests', level: 78 },
      ],
    },
  ];

  extraTags = ['PostGIS', 'LiFi Protocol', 'EVM / Web3', 'Nginx', 'UFW', 'goose', 'TypeORM', 'pgx/v5', 'Microservices'];

  @HostListener('window:scroll')
  onScroll() {
    this.parallaxOffset.set(window.scrollY * 0.03);
  }

  ngOnInit() {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) this.visible.set(true); },
      { threshold: 0.1 }
    );
    setTimeout(() => {
      const el = document.querySelector('#skills');
      if (el) observer.observe(el);
    }, 100);
  }
}
