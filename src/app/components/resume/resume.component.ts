import { Component, OnInit, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="resume" class="relative py-16 md:py-32 px-4 md:px-6 overflow-hidden bg-void">
      <!-- Parallax background decorative elements -->
      <div
        class="absolute inset-0 pointer-events-none"
        [style.transform]="'translateY(' + parallaxOffset() + 'px)'"
      >
        <div class="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full"
             style="background: radial-gradient(circle, rgba(255,107,0,0.04) 0%, transparent 70%)"></div>
      </div>

      <!-- Outline background Typography -->
      <div
        class="absolute right-[-5%] top-1/3 outline-bg-text select-none pointer-events-none font-black opacity-10 will-change-transform hidden md:block"
        [style.transform]="'translate3d(' + (parallaxOffset() * -0.5) + 'px, 0, 0)'"
      >
        RESUME
      </div>

      <div class="relative z-10 max-w-5xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-12">
          <p class="text-accent font-mono text-xs tracking-widest uppercase mb-4">Curriculum Vitae</p>
          <h2 class="text-4xl md:text-5xl font-display font-bold text-frost mb-4 text-balance">
            Interactive Resume
          </h2>
          <p class="text-muted max-w-xl mx-auto text-sm leading-relaxed">
            View my professional background, projects, skill details, and experience directly on the page, or download a physical copy.
          </p>
        </div>

        <!-- Resume Preview Container -->
        <div 
          class="apple-glass rounded-2xl overflow-hidden p-4 md:p-6 shadow-2xl flex flex-col gap-6"
          [style.opacity]="visible() ? '1' : '0'"
          [style.transform]="visible() ? 'translateY(0)' : 'translateY(30px)'"
          style="transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
        >
          <!-- Embed PDF Iframe with loading states -->
          <div class="relative w-full aspect-[1/1.414] md:h-[750px] md:aspect-auto rounded-xl overflow-hidden border border-border bg-abyss">
            <iframe
              src="https://drive.google.com/file/d/11mdOZEMuOfWKWChgJz9eLDnLmCx2rBvW/preview"
              class="w-full h-full border-none shadow-inner"
              allow="autoplay"
              loading="lazy"
              title="Vinay KR — Resume"
            ></iframe>
          </div>

          <!-- Buttons/Actions -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-border/60 pt-6">
            <a
              href="https://drive.google.com/file/d/11mdOZEMuOfWKWChgJz9eLDnLmCx2rBvW/view"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center gap-2.5 px-6 py-3.5 w-full sm:w-auto rounded-xl bg-accent hover:bg-accent-glow text-frost font-bold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              Open in New Tab
            </a>

            <a
              href="https://drive.google.com/uc?export=download&id=11mdOZEMuOfWKWChgJz9eLDnLmCx2rBvW"
              download="Vinay_KR_Resume.pdf"
              class="flex items-center justify-center gap-2.5 px-6 py-3.5 w-full sm:w-auto rounded-xl border border-border hover:border-accent/40 hover:bg-surface text-frost font-bold text-sm transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <svg class="w-4 h-4 text-accent" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
              Download PDF
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ResumeComponent implements OnInit {
  visible = signal(false);
  parallaxOffset = signal(0);

  @HostListener('window:scroll')
  onScroll() {
    this.parallaxOffset.set(window.scrollY * 0.02);
  }

  ngOnInit() {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) this.visible.set(true); },
      { threshold: 0.1 }
    );
    setTimeout(() => {
      const el = document.querySelector('#resume');
      if (el) observer.observe(el);
    }, 100);
  }
}
