import { Component, OnInit, OnDestroy, signal, PLATFORM_ID, Inject, DestroyRef, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-cursor',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (!isTouch()) {
      <!-- Outer glowing circle (lagging trailing effect) -->
      <div
        #outerRing
        class="fixed rounded-full pointer-events-none z-[9999] border mix-blend-screen bg-accent/5"
        style="width: 24px; height: 24px; left: 0; top: 0; opacity: 0; transform: translate3d(-100px, -100px, 0); will-change: transform; transition: opacity 0.3s ease, width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease, border-color 0.3s ease;"
      ></div>

      <!-- Inner active dot (instant cursor position) -->
      <div
        #innerDot
        class="fixed w-2 h-2 bg-frost rounded-full pointer-events-none z-[10000]"
        style="left: 0; top: 0; opacity: 0; transform: translate3d(-100px, -100px, 0); will-change: transform; transition: opacity 0.3s ease;"
      ></div>
    }
  `,
})
export class CursorComponent implements OnInit, OnDestroy {
  @ViewChild('outerRing') outerRing?: ElementRef<HTMLDivElement>;
  @ViewChild('innerDot') innerDot?: ElementRef<HTMLDivElement>;

  // Target positions (pure properties for 60fps loop performance)
  private mouseX = -100;
  private mouseY = -100;
  private trailX = -100;
  private trailY = -100;

  private isHovered = false;
  private isVisible = false;
  isTouch = signal(false);

  private animFrameId?: number;
  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private destroyRef: DestroyRef
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      this.destroyRef.onDestroy(() => {
        document.documentElement.classList.remove('custom-cursor-active');
      });
    }
  }

  ngOnInit() {
    if (!this.isBrowser) return;

    this.checkDeviceType();
    if (this.isTouch()) return;

    document.documentElement.classList.add('custom-cursor-active');

    // Attach event listeners (native, not @HostListener, for zero Angular overhead in 60fps loop)
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseout', this.handleMouseLeave);
    document.addEventListener('mouseenter', this.handleMouseEnter);

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('mousemove', this.handleMouseMove);
      window.removeEventListener('mouseout', this.handleMouseLeave);
      document.removeEventListener('mouseenter', this.handleMouseEnter);
      document.documentElement.classList.remove('custom-cursor-active');
    });

    // Start native frame animation rendering loop
    this.animate();
  }

  ngOnDestroy() {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
    }
  }

  private checkDeviceType() {
    const hasTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      (window.matchMedia && window.matchMedia('(hover: none)').matches);
    this.isTouch.set(hasTouch);
  }

  // ── Native event handlers (no Angular change detection overhead) ────
  private handleMouseMove = (event: MouseEvent) => {
    if (this.isTouch()) return;

    if (!this.isVisible) {
      this.isVisible = true;
      this.trailX = event.clientX;
      this.trailY = event.clientY;
    }

    this.mouseX = event.clientX;
    this.mouseY = event.clientY;

    // Interactive element detection
    const target = event.target as HTMLElement | null;
    if (target) {
      this.isHovered = !!(
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.card-hover') ||
        target.closest('[appTilt]')
      );
    }
  };

  private handleMouseLeave = (event: MouseEvent) => {
    if (!event.relatedTarget && !(event as any).toElement) {
      this.isVisible = false;
    }
  };

  private handleMouseEnter = () => {
    this.isVisible = true;
  };

  // ── 60fps animation loop ────────────────────────────────────────

  private animate = () => {
    const lerpSpeed = 0.08;
    this.trailX += (this.mouseX - this.trailX) * lerpSpeed;
    this.trailY += (this.mouseY - this.trailY) * lerpSpeed;

    if (this.innerDot && this.outerRing) {
      const innerEl = this.innerDot.nativeElement;
      const outerEl = this.outerRing.nativeElement;

      // Visibility
      innerEl.style.opacity = this.isVisible ? '1' : '0';
      outerEl.style.opacity = this.isVisible ? '1' : '0';

      const ringOffset = this.isHovered ? 24 : 12;

      innerEl.style.transform = `translate3d(${this.mouseX - 4}px, ${this.mouseY - 4}px, 0)`;
      outerEl.style.transform = `translate3d(${this.trailX - ringOffset}px, ${this.trailY - ringOffset}px, 0)`;

      // ── Section-aware dynamic colors ──────────────────────────
      let accentRGB = this.getAccentRGB();

      if (this.isHovered) {
        outerEl.style.width = '48px';
        outerEl.style.height = '48px';
        outerEl.style.boxShadow = `0 0 25px rgba(${accentRGB}, 0.55)`;
        outerEl.style.borderColor = `rgba(${accentRGB}, 0.9)`;
        innerEl.style.backgroundColor = `rgba(${accentRGB}, 1)`;
        outerEl.style.backgroundColor = `rgba(${accentRGB}, 0.08)`;
      } else {
        outerEl.style.width = '24px';
        outerEl.style.height = '24px';
        outerEl.style.boxShadow = 'none';
        outerEl.style.borderColor = `rgba(${accentRGB}, 0.5)`;
        const isLightMode = document.documentElement.classList.contains('light-mode');
        innerEl.style.backgroundColor = isLightMode ? 'rgba(17, 24, 39, 0.9)' : 'rgba(244, 245, 248, 0.9)';
        outerEl.style.backgroundColor = 'transparent';
      }
    }

    this.animFrameId = requestAnimationFrame(this.animate);
  };

  /** Determine the accent RGB based on which section the cursor is over. */
  private getAccentRGB(): string {
    const sections = ['home', 'about', 'skills', 'experience', 'resume', 'projects', 'conference', 'major-project', 'certifications', 'contact'];
    let currentSectionId = 'home';

    for (const secId of sections) {
      const el = document.getElementById(secId);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (this.mouseY >= rect.top && this.mouseY <= rect.bottom) {
          currentSectionId = secId;
          break;
        }
      }
    }

    // Check if hovering a navbar anchor
    const hoveredElement = document.elementFromPoint(this.mouseX, this.mouseY);
    if (hoveredElement) {
      const anchor = hoveredElement.closest('a');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('#') && href !== '#') {
          currentSectionId = href.substring(1);
        }
      }
    }

    const activeSec = currentSectionId;
    const isLightMode = document.documentElement.classList.contains('light-mode');

    // Light-mode palette (deeper, more saturated for contrast on white)
    if (isLightMode) {
      switch (activeSec) {
        case 'home':
        case 'contact':
          return '234, 88, 12'; // Orange-600
        case 'about':
          return '79, 70, 229'; // Indigo-600
        case 'skills':
          return '147, 51, 234'; // Purple-600
        case 'experience':
          return '8, 145, 178'; // Cyan-600
        case 'resume':
          return '217, 119, 6'; // Amber-600
        case 'projects':
          return '220, 38, 38'; // Red-600
        case 'conference':
          return '16, 185, 129'; // Emerald-600
        case 'major-project':
          return '202, 138, 4'; // Yellow-600
        case 'certifications':
          return '5, 150, 105'; // Emerald-600
        default:
          return '234, 88, 12';
      }
    }

    // Dark-mode palette (vivid neon-ish for contrast on black)
    switch (activeSec) {
      case 'home':
      case 'contact':
        return '255, 107, 0'; // Accent Orange
      case 'about':
        return '99, 102, 241'; // Indigo
      case 'skills':
        return '168, 85, 247'; // Purple
      case 'experience':
        return '6, 182, 212'; // Cyan
      case 'resume':
        return '245, 158, 11'; // Amber
      case 'projects':
        return '239, 68, 68'; // Red
      case 'conference':
        return '16, 185, 129'; // Emerald
      case 'major-project':
        return '241, 196, 15'; // Yellow
      case 'certifications':
        return '16, 185, 129'; // Emerald
      default:
        return '255, 107, 0';
    }
  }

}
