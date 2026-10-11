import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { webglScene } from './webgl';

gsap.registerPlugin(ScrollTrigger);

class MotionSystem {
  private lenis: Lenis | null = null;
  private cursor: HTMLElement | null = null;
  private cursorLabel: HTMLElement | null = null;
  private isCursorActive = false;
  private cursorX = 0;
  private cursorY = 0;
  private targetCursorX = 0;
  private targetCursorY = 0;
  private isPreloaded = false;

  public init() {
    this.setupLenis();
    this.setupCustomCursor();
    this.setupPreloader();
    this.setupScrollIndicator();
    this.setupVideoModal();
    this.setupMenu();
    this.setupTransitions();
    this.setupMagneticElements();

    // Re-bind dynamic page elements on Astro page change
    document.addEventListener('astro:page-load', () => {
      this.rebindPageElements();
    });
  }

  // 1. Lenis Smooth Scrolling
  private setupLenis() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    try {
      this.lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        touchMultiplier: 1.5
      });

      // Connect Lenis to GSAP ScrollTrigger
      this.lenis.on('scroll', (e: { progress: number; scroll: number; limit: number }) => {
        ScrollTrigger.update();
        webglScene.setScrollProgress(e.progress);
        this.updateScrollHUD(e.progress, e.scroll);
      });

      gsap.ticker.add((time) => {
        this.lenis?.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    } catch (e) {
      console.warn('Lenis initialization bypassed:', e);
    }
  }

  // 2. Custom Magnetic Cursor
  private setupCustomCursor() {
    this.cursor = document.getElementById('cursor');
    this.cursorLabel = this.cursor?.querySelector('.cursor-label') || null;

    if (!this.cursor) return;

    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      this.cursor.style.display = 'none';
      return;
    }

    window.addEventListener('mousemove', (e) => {
      this.targetCursorX = e.clientX;
      this.targetCursorY = e.clientY;

      if (!this.isCursorActive) {
        this.isCursorActive = true;
        this.cursor?.classList.add('active');
        this.cursorX = e.clientX;
        this.cursorY = e.clientY;
      }
    }, { passive: true });

    // Smooth lerp loop for cursor
    const updateCursor = () => {
      if (this.isCursorActive && this.cursor) {
        this.cursorX += (this.targetCursorX - this.cursorX) * 0.18;
        this.cursorY += (this.targetCursorY - this.cursorY) * 0.18;
        this.cursor.style.transform = `translate3d(${this.cursorX}px, ${this.cursorY}px, 0)`;
      }
      requestAnimationFrame(updateCursor);
    };
    requestAnimationFrame(updateCursor);

    this.bindCursorHoverTargets();
  }

  private bindCursorHoverTargets() {
    const interactiveElements = document.querySelectorAll<HTMLElement>('[data-cursor]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        const type = el.getAttribute('data-cursor') || 'hover';
        this.cursor?.classList.add(`cursor-${type}`);
        if (this.cursorLabel) {
          const customText = el.getAttribute('data-cursor-text') || type.toUpperCase();
          this.cursorLabel.textContent = customText;
        }
      });

      el.addEventListener('mouseleave', () => {
        const type = el.getAttribute('data-cursor') || 'hover';
        this.cursor?.classList.remove(`cursor-${type}`);
        if (this.cursorLabel) {
          this.cursorLabel.textContent = '';
        }
      });
    });
  }

  // 3. Digit-Roller Preloader 0 -> 100
  private setupPreloader() {
    const preloader = document.getElementById('preloader');
    const inputBlocker = document.getElementById('input-blocker');
    const counterEl = document.getElementById('preloader-counter');
    const statusEl = document.getElementById('preloader-status');

    if (!preloader || !counterEl) return;

    // If already preloaded this session, perform instant reveal
    if (sessionStorage.getItem('lusion_preloaded') === 'true') {
      preloader.style.display = 'none';
      inputBlocker?.classList.remove('active');
      this.isPreloaded = true;
      return;
    }

    inputBlocker?.classList.add('active');

    const statusMessages = [
      'INITIALIZING THREE.JS ENGINE...',
      'ALLOCATING GPU BUFFERS...',
      'COMPILING GLSL SHADER PIPELINE...',
      'HYDRATING ASTRO SYSTEM SHELL...',
      'CALIBRATING MOTION TELEMETRY...',
      'SYSTEM READY // 100%'
    ];

    const counterObj = { val: 0 };

    gsap.to(counterObj, {
      val: 100,
      duration: 2.2,
      ease: 'power3.inOut',
      onUpdate: () => {
        const currentInt = Math.floor(counterObj.val);
        counterEl.textContent = String(currentInt).padStart(3, '0');

        // Dynamic status text ticker
        if (statusEl) {
          const statusIdx = Math.min(
            Math.floor((currentInt / 100) * statusMessages.length),
            statusMessages.length - 1
          );
          statusEl.textContent = statusMessages[statusIdx];
        }
      },
      onComplete: () => {
        sessionStorage.setItem('lusion_preloaded', 'true');
        this.isPreloaded = true;

        // Animate preloader exit
        const tl = gsap.timeline();
        tl.to('.preloader-bar', { scaleX: 1, duration: 0.3, ease: 'power2.out' })
          .to(preloader, {
            yPercent: -100,
            duration: 0.9,
            ease: 'expo.inOut',
            onComplete: () => {
              preloader.style.display = 'none';
              inputBlocker?.classList.remove('active');
            }
          })
          .from('#ui', {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'power3.out'
          }, '-=0.5');
      }
    });
  }

  // 4. Scroll Indicator & Crosshair HUD
  private setupScrollIndicator() {
    // Initial HUD update
    this.updateScrollHUD(0, 0);
  }

  private updateScrollHUD(progress: number, scrollY: number) {
    const indicator = document.getElementById('scroll-indicator-bar');
    if (indicator) {
      indicator.style.transform = `scaleY(${progress})`;
    }

    const scrollCoord = document.getElementById('hud-coord-y');
    if (scrollCoord) {
      scrollCoord.textContent = `Y: ${String(Math.round(scrollY)).padStart(4, '0')}PX`;
    }

    const scrollPercent = document.getElementById('hud-scroll-pct');
    if (scrollPercent) {
      scrollPercent.textContent = `${Math.round(progress * 100)}%`;
    }
  }

  // 5. Fullscreen Animated Menu
  private setupMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const menuOverlay = document.getElementById('menu-overlay');

    if (!menuToggle || !menuOverlay) return;

    let isMenuOpen = false;

    const openMenu = () => {
      isMenuOpen = true;
      menuOverlay.classList.add('is-open');
      document.body.classList.add('menu-locked');
      this.lenis?.stop();

      gsap.fromTo(
        '.menu-nav-link',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.2 }
      );
    };

    const closeMenu = () => {
      isMenuOpen = false;
      menuOverlay.classList.remove('is-open');
      document.body.classList.remove('menu-locked');
      this.lenis?.start();
    };

    // Delegated click listeners
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('#menu-toggle')) {
        e.preventDefault();
        if (isMenuOpen) closeMenu();
        else openMenu();
      } else if (target.closest('#menu-close') || (isMenuOpen && target.closest('.menu-nav-link'))) {
        closeMenu();
      }
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    });
  }

  // 6. Video Case Study Overlay Modal
  private setupVideoModal() {
    const videoOverlay = document.getElementById('video-overlay');
    const videoClose = document.getElementById('video-modal-close');
    const videoPlayer = document.getElementById('modal-video-element') as HTMLVideoElement | null;
    const playPauseBtn = document.getElementById('modal-play-toggle');
    const muteBtn = document.getElementById('modal-mute-toggle');
    const progressBar = document.getElementById('modal-progress-fill');
    const timeDisplay = document.getElementById('modal-timecode');
    const modalTitle = document.getElementById('modal-video-title');
    const modalClient = document.getElementById('modal-video-client');

    if (!videoOverlay) return;

    const openModal = (title: string, client: string, reelDuration: string) => {
      if (modalTitle) modalTitle.textContent = title;
      if (modalClient) modalClient.textContent = client;
      if (timeDisplay) timeDisplay.textContent = `00:00 / ${reelDuration}`;

      videoOverlay.classList.add('is-active');
      document.body.classList.add('video-locked');
      this.lenis?.stop();

      if (videoPlayer) {
        videoPlayer.currentTime = 0;
        videoPlayer.play().catch(() => {});
      }
    };

    const closeModal = () => {
      videoOverlay.classList.remove('is-active');
      document.body.classList.remove('video-locked');
      this.lenis?.start();

      if (videoPlayer) {
        videoPlayer.pause();
      }
    };

    videoClose?.addEventListener('click', closeModal);

    // Close when clicking modal backdrop
    videoOverlay.addEventListener('click', (e) => {
      if (e.target === videoOverlay) {
        closeModal();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && videoOverlay.classList.contains('is-active')) {
        closeModal();
      }
    });

    // Play/Pause button
    playPauseBtn?.addEventListener('click', () => {
      if (!videoPlayer) return;
      if (videoPlayer.paused) {
        videoPlayer.play();
        playPauseBtn.textContent = 'PAUSE';
      } else {
        videoPlayer.pause();
        playPauseBtn.textContent = 'PLAY';
      }
    });

    // Mute/Unmute button
    muteBtn?.addEventListener('click', () => {
      if (!videoPlayer) return;
      videoPlayer.muted = !videoPlayer.muted;
      muteBtn.textContent = videoPlayer.muted ? 'UNMUTE' : 'MUTE';
    });

    // Video progress update
    if (videoPlayer) {
      videoPlayer.addEventListener('timeupdate', () => {
        if (!videoPlayer.duration) return;
        const progress = (videoPlayer.currentTime / videoPlayer.duration) * 100;
        if (progressBar) progressBar.style.width = `${progress}%`;

        if (timeDisplay) {
          const curM = String(Math.floor(videoPlayer.currentTime / 60)).padStart(2, '0');
          const curS = String(Math.floor(videoPlayer.currentTime % 60)).padStart(2, '0');
          const durM = String(Math.floor(videoPlayer.duration / 60)).padStart(2, '0');
          const durS = String(Math.floor(videoPlayer.duration % 60)).padStart(2, '0');
          timeDisplay.textContent = `${curM}:${curS} / ${durM}:${durS}`;
        }
      });
    }

    // Global delegated trigger for video modals
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const trigger = target.closest('[data-video-trigger]') as HTMLElement | null;
      if (trigger) {
        e.preventDefault();
        const title = trigger.getAttribute('data-project-title') || 'CASE STUDY REEL';
        const client = trigger.getAttribute('data-project-client') || 'CLIENT';
        const dur = trigger.getAttribute('data-project-duration') || '02:00';
        openModal(title, client, dur);
      }
    });
  }

  // 7. Page Transitions Curtain / Wipe
  private setupTransitions() {
    const transitionOverlay = document.getElementById('transition-overlay');
    const inputBlocker = document.getElementById('input-blocker');

    document.addEventListener('astro:before-preparation', () => {
      inputBlocker?.classList.add('active');
      if (transitionOverlay) {
        gsap.to(transitionOverlay, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 0.5,
          ease: 'power3.inOut'
        });
      }
    });

    document.addEventListener('astro:after-swap', () => {
      window.scrollTo(0, 0);
      this.lenis?.scrollTo(0, { immediate: true });
    });

    document.addEventListener('astro:page-load', () => {
      if (transitionOverlay) {
        gsap.to(transitionOverlay, {
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
          duration: 0.6,
          ease: 'power3.out',
          onComplete: () => {
            inputBlocker?.classList.remove('active');
            // Reset clip path to top for next transition
            gsap.set(transitionOverlay, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' });
          }
        });
      }
    });
  }

  // 8. Magnetic Micro-interactions
  private setupMagneticElements() {
    const magneticBtns = document.querySelectorAll<HTMLElement>('.magnetic-btn');
    magneticBtns.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
          x: x * 0.35,
          y: y * 0.35,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.4)'
        });
      });
    });
  }

  // Rebind elements on route changes
  private rebindPageElements() {
    this.bindCursorHoverTargets();
    this.setupMagneticElements();
    ScrollTrigger.refresh();
  }
}

export const motionSystem = new MotionSystem();
