/* =============================================================
   HAIR LOUNGE — script.js
   GSAP Animations, Preloader, Navbar, Popup, Forms
   ============================================================= */

(function () {
    'use strict';

    // ─── Register GSAP Plugin ──────────────────────────────
    gsap.registerPlugin(ScrollTrigger);

    // ─── Utility ───────────────────────────────────────────
    const qs  = (sel, ctx = document) => ctx.querySelector(sel);
    const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

    // ─── PRELOADER ─────────────────────────────────────────
    (function initPreloader() {
        const preloader  = qs('#preloader');
        const logoWrap   = qs('.preloader-logo-wrap');
        const hairSpans  = qsa('#preloaderHair span');
        const loungeSpans= qsa('#preloaderLounge span');
        const divider    = qs('.preloader-divider');
        const tagline    = qs('.preloader-tagline');
        const bar        = qs('.preloader-bar');
        const barFill    = qs('.preloader-bar-fill');

        const tl = gsap.timeline({
            onComplete: hidePreloader
        });

        // Logo fade in
        tl.to(logoWrap, { opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.2)

        // Bar appears
          .to(bar, { opacity: 1, duration: 0.3 }, 0.4)
          .to(barFill, { width: '100%', duration: 2, ease: 'power1.inOut' }, 0.5)

        // Letters stagger in — HAIR
          .to(hairSpans, {
              opacity: 1,
              y: 0,
              stagger: 0.08,
              duration: 0.5,
              ease: 'back.out(1.4)'
          }, 0.5)

        // Divider
          .to(divider, { opacity: 1, duration: 0.4 }, 0.9)

        // Letters stagger in — LOUNGE
          .to(loungeSpans, {
              opacity: 1,
              y: 0,
              stagger: 0.06,
              duration: 0.5,
              ease: 'back.out(1.4)'
          }, 1.0)

        // Tagline
          .to(tagline, { opacity: 1, y: 0, duration: 0.5 }, 1.5)

        // Hold
          .to({}, { duration: 0.8 });

        function hidePreloader() {
            gsap.to(preloader, {
                opacity: 0,
                duration: 0.7,
                ease: 'power2.inOut',
                onComplete: () => {
                    preloader.style.display = 'none';
                    document.body.style.overflow = '';
                    initHeroAnimation();
                }
            });
        }

        // Prevent scroll during preloader
        document.body.style.overflow = 'hidden';
    })();

    // ─── HERO ANIMATION ────────────────────────────────────
    function initHeroAnimation() {
        const eyebrow = qs('.hero-eyebrow');
        const lines   = qsa('.hl');
        const sub     = qs('.hero-sub');
        const actions = qs('.hero-actions');
        const trust   = qs('.hero-trust');
        const scroll  = qs('.hero-scroll');

        gsap.set([eyebrow, lines, sub, actions, trust, scroll], {
            opacity: 0,
            y: 30
        });

        const tl = gsap.timeline({ delay: 0.15 });

        tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
          .to(lines, {
              opacity: 1,
              y: 0,
              stagger: 0.15,
              duration: 0.7,
              ease: 'power3.out'
          }, '-=0.3')
          .to(sub, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
          .to(actions, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.35')
          .to(trust, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.35')
          .to(scroll, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2');
    }

    // ─── NAVBAR ────────────────────────────────────────────
    (function initNavbar() {
        const navbar    = qs('#navbar');
        const hamburger = qs('#hamburger');
        const navLinks  = qs('#navLinks');
        const links     = qsa('#navLinks a:not(.nav-cta)');

        // Scroll state
        const onScroll = () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();

        // Hamburger toggle
        hamburger.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            hamburger.classList.toggle('active', isOpen);
            hamburger.setAttribute('aria-expanded', isOpen);
            document.body.classList.toggle('menu-open', isOpen);
        });

        // Close on link click (mobile)
        qsa('#navLinks a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('menu-open');
            });
        });

        // Smooth scroll for all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const target = qs(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    const offset = parseInt(getComputedStyle(document.documentElement)
                        .getPropertyValue('--nav-h')) || 72;
                    const top = target.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
            });
        });
    })();

    // ─── SCROLL TRIGGER ANIMATIONS ─────────────────────────
    (function initScrollAnimations() {

        // Generic fade-up for sections
        const fadeUpSections = [
            '.about-content',
            '.about-visual',
            '.about-badge',
            '.gallery-cta',
            '.faq-list',
        ];

        fadeUpSections.forEach(sel => {
            qsa(sel).forEach(el => {
                gsap.from(el, {
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    },
                    opacity: 0,
                    y: 48,
                    duration: 0.8,
                    ease: 'power3.out'
                });
            });
        });

        // Section headers
        qsa('.section-header').forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 88%',
                },
                opacity: 0,
                y: 36,
                duration: 0.75,
                ease: 'power3.out'
            });
        });

        // Service cards — stagger
        gsap.from('.service-card', {
            scrollTrigger: {
                trigger: '.services-grid',
                start: 'top 82%',
            },
            opacity: 0,
            y: 56,
            duration: 0.65,
            stagger: 0.07,
            ease: 'power3.out'
        });

        // About badges — stagger
        gsap.from('.about-badge', {
            scrollTrigger: {
                trigger: '.about-badges',
                start: 'top 85%',
            },
            opacity: 0,
            x: -32,
            duration: 0.55,
            stagger: 0.12,
            ease: 'power3.out'
        });

        // About image frame
        gsap.from('.about-img-frame', {
            scrollTrigger: {
                trigger: '.about-visual',
                start: 'top 85%',
            },
            opacity: 0,
            scale: 0.94,
            duration: 0.9,
            ease: 'power3.out'
        });

        // About accent badge
        gsap.from('.about-accent-badge', {
            scrollTrigger: {
                trigger: '.about-visual',
                start: 'top 80%',
            },
            opacity: 0,
            x: 24,
            y: 12,
            duration: 0.7,
            delay: 0.3,
            ease: 'back.out(1.4)'
        });

        // Gallery items
        gsap.from('.gallery-item', {
            scrollTrigger: {
                trigger: '.gallery-grid',
                start: 'top 82%',
            },
            opacity: 0,
            scale: 0.9,
            duration: 0.55,
            stagger: 0.08,
            ease: 'power3.out'
        });

        // Video reel section title
        gsap.from('.video-reel .section-header', {
            scrollTrigger: {
                trigger: '.video-reel',
                start: 'top 85%',
            },
            opacity: 0,
            y: 32,
            duration: 0.7,
            ease: 'power3.out'
        });

        // Contact panel
        gsap.from('.contact-panel-inner', {
            scrollTrigger: {
                trigger: '.contact-grid',
                start: 'top 82%',
            },
            opacity: 0,
            x: -32,
            duration: 0.75,
            ease: 'power3.out'
        });

        // Contact list rows — stagger
        gsap.from('.cl-row', {
            scrollTrigger: {
                trigger: '.contact-list',
                start: 'top 82%',
            },
            opacity: 0,
            y: 16,
            duration: 0.45,
            stagger: 0.1,
            ease: 'power3.out'
        });

        // Contact map
        gsap.from('.contact-map', {
            scrollTrigger: {
                trigger: '.contact-map',
                start: 'top 85%',
            },
            opacity: 0,
            x: 32,
            duration: 0.8,
            ease: 'power3.out'
        });

        // Bottom form
        gsap.from('.bottom-form', {
            scrollTrigger: {
                trigger: '.bottom-form',
                start: 'top 85%',
            },
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: 'power3.out'
        });

        // FAQ items — stagger
        gsap.from('.faq-item', {
            scrollTrigger: {
                trigger: '.faq-list',
                start: 'top 85%',
            },
            opacity: 0,
            y: 24,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out'
        });

        // Footer
        gsap.from('.footer-grid > *', {
            scrollTrigger: {
                trigger: '.footer-grid',
                start: 'top 90%',
            },
            opacity: 0,
            y: 32,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out'
        });

    })();

    // ─── VIDEO REEL ─────────────────────────────────────────
    (function initVideoReel() {
        const track   = qs('#reelTrack');
        const wrapper = qs('#reelWrapper');
        const prevBtn = qs('#reelPrev');
        const nextBtn = qs('#reelNext');
        if (!track || !wrapper) return;

        // Calculate width of one set (half of all items = 6 originals)
        function getHalfWidth() {
            const items = qsa('.reel-item');
            const half  = items.length / 2;
            let w = 0;
            for (let i = 0; i < half; i++) {
                w += items[i].offsetWidth + 20; // gap: 20px
            }
            return w;
        }

        // Item width for arrow scroll step
        function getItemWidth() {
            const first = qs('.reel-item');
            return first ? first.offsetWidth + 20 : 300;
        }

        let reelTween;
        let currentOffset = 0; // tracks current x position for arrow nudge
        let resumeTimer   = null;

        function startReel() {
            track.style.animation = 'none'; // disable CSS fallback
            const halfW = getHalfWidth();
            currentOffset = 0;

            reelTween = gsap.to(track, {
                x: -halfW,
                duration: halfW / 40,   // ~40px/sec
                ease: 'none',
                repeat: -1,
                modifiers: {
                    x: gsap.utils.unitize(x => parseFloat(x) % -halfW)
                },
                onUpdate: () => {
                    // Sync currentOffset from tween for arrow logic
                    currentOffset = gsap.getProperty(track, 'x');
                }
            });
        }

        // Pause / resume helpers
        function pauseReel() {
            if (reelTween) reelTween.pause();
        }
        function resumeReel() {
            if (reelTween) reelTween.play();
        }

        // Arrow: nudge by one item width, pause auto-scroll, resume after idle
        function nudge(direction) {
            pauseReel();
            clearTimeout(resumeTimer);

            const step    = getItemWidth() * direction;
            const halfW   = getHalfWidth();
            let   target  = currentOffset - step;

            // Wrap within bounds
            if (target > 0) target -= halfW;
            if (target < -halfW) target += halfW;

            gsap.to(track, {
                x: target,
                duration: 0.5,
                ease: 'power2.out',
                onComplete: () => {
                    currentOffset = target;
                    // Sync the tween's progress to the new position
                    if (reelTween) {
                        const progress = Math.abs(target) / halfW;
                        reelTween.progress(progress % 1);
                    }
                }
            });

            // Resume auto-scroll after 3s of no interaction
            resumeTimer = setTimeout(resumeReel, 3000);
        }

        if (prevBtn) prevBtn.addEventListener('click', () => nudge(-1));
        if (nextBtn) nextBtn.addEventListener('click', () => nudge(1));

        // Pause on hover over the reel area, resume on leave
        wrapper.addEventListener('mouseenter', pauseReel);
        wrapper.addEventListener('mouseleave', () => {
            clearTimeout(resumeTimer);
            resumeReel();
        });

        // Start after layout settles
        window.addEventListener('load', startReel);

        // CSS fallback if GSAP doesn't initialise
        setTimeout(() => {
            if (!reelTween) track.style.animation = '';
        }, 3000);

        // Video click: toggle mute / unmute
        qsa('.reel-item').forEach(item => {
            const video = item.querySelector('video');
            const icon  = item.querySelector('.reel-mute-icon i');
            if (!video || !icon) return;

            item.addEventListener('click', () => {
                // Mute all other videos
                qsa('.reel-item video').forEach(v => { if (v !== video) v.muted = true; });
                qsa('.reel-mute-icon i').forEach(ic => { if (ic !== icon) ic.className = 'fas fa-volume-mute'; });

                if (video.muted) {
                    video.muted = false;
                    icon.className = 'fas fa-volume-up';
                } else {
                    video.muted = true;
                    icon.className = 'fas fa-volume-mute';
                }

                if (video.paused) video.play().catch(() => {});
            });
        });
    })();

    // ─── TESTIMONIALS CAROUSEL ─────────────────────────────
    // CSS animation handles the scroll — JS controls pause on hover
    (function initTestimonials() {
        const track   = qs('#testimonialsTrack');
        const wrapper = qs('.testimonials-wrapper');
        if (!track || !wrapper) return;

        // Already using CSS animation — JS just for hover pause
        // (covered by CSS .testimonials-wrapper:hover .testimonials-track)

        // Optional: touch/drag support on mobile
        let startX = 0;
        let scrollX = 0;

        wrapper.addEventListener('touchstart', e => {
            startX  = e.touches[0].clientX;
            track.style.animationPlayState = 'paused';
        }, { passive: true });

        wrapper.addEventListener('touchend', () => {
            track.style.animationPlayState = 'running';
        }, { passive: true });
    })();

    // ─── POPUP FORM ─────────────────────────────────────────
    (function initPopup() {
        const overlay = qs('#popup-overlay');
        const closeBtn= qs('#popupClose');
        if (!overlay) return;

        // Only show once per session
        if (sessionStorage.getItem('hl_popup_shown')) return;

        const showPopup = () => {
            overlay.classList.add('active');
            sessionStorage.setItem('hl_popup_shown', '1');
            // Trap focus in popup
            qs('#pf-name')?.focus();
        };

        // Show after 7 seconds
        setTimeout(showPopup, 7000);

        const closePopup = () => {
            overlay.classList.remove('active');
        };

        closeBtn.addEventListener('click', closePopup);

        // Close on overlay backdrop click
        overlay.addEventListener('click', e => {
            if (e.target === overlay) closePopup();
        });

        // Close on Escape key
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') closePopup();
        });
    })();

    // ─── FORM SUBMISSIONS ──────────────────────────────────
    (function initForms() {

        // Bottom contact form
        const contactForm = qs('#contact-form');
        const cfSuccess   = qs('#cf-success');

        if (contactForm && cfSuccess) {
            contactForm.addEventListener('submit', async function (e) {
                e.preventDefault();
                const btn = contactForm.querySelector('button[type=submit]');
                btn.disabled = true;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

                try {
                    const data = new FormData(contactForm);
                    const res  = await fetch(contactForm.action, {
                        method: 'POST',
                        body: data,
                        headers: { 'Accept': 'application/json' }
                    });

                    if (res.ok) {
                        contactForm.reset();
                        cfSuccess.classList.add('show');
                        btn.style.display = 'none';
                        gsap.from(cfSuccess, { opacity: 0, y: 12, duration: 0.5 });
                    } else {
                        throw new Error('Server error');
                    }
                } catch {
                    btn.disabled = false;
                    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                    alert('Something went wrong. Please try again or contact us on WhatsApp.');
                }
            });
        }

        // Popup form
        const popupForm = qs('#popup-form');
        const pfSuccess = qs('#pf-success');

        if (popupForm && pfSuccess) {
            popupForm.addEventListener('submit', async function (e) {
                e.preventDefault();
                const btn = popupForm.querySelector('button[type=submit]');
                btn.disabled = true;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

                try {
                    const data = new FormData(popupForm);
                    const res  = await fetch(popupForm.action, {
                        method: 'POST',
                        body: data,
                        headers: { 'Accept': 'application/json' }
                    });

                    if (res.ok) {
                        popupForm.reset();
                        pfSuccess.classList.add('show');
                        btn.style.display = 'none';
                        gsap.from(pfSuccess, { opacity: 0, y: 12, duration: 0.5 });
                    } else {
                        throw new Error('Server error');
                    }
                } catch {
                    btn.disabled = false;
                    btn.innerHTML = '<i class="fab fa-whatsapp"></i> Request Appointment';
                    alert('Something went wrong. Please contact us directly on WhatsApp.');
                }
            });
        }
    })();

    // ─── FAQ ANIMATION ─────────────────────────────────────
    (function initFAQ() {
        // Smooth answer reveal
        qsa('.faq-item').forEach(item => {
            item.addEventListener('toggle', () => {
                if (item.open) {
                    const answer = item.querySelector('.faq-answer');
                    if (answer) {
                        gsap.from(answer, {
                            opacity: 0,
                            y: -8,
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    }
                }
            });
        });
    })();

    // ─── HERO PARALLAX ─────────────────────────────────────
    (function initParallax() {
        const heroBg = qs('.hero-bg-img');
        if (!heroBg) return;

        gsap.to(heroBg, {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            },
            y: 80,
            ease: 'none'
        });
    })();

    // ─── ACTIVE NAV LINK ON SCROLL ──────────────────────────
    (function initActiveNav() {
        const sections = qsa('section[id]');
        const navAnchors = qsa('#navLinks a[href^="#"]');
        if (!sections.length || !navAnchors.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navAnchors.forEach(a => {
                        a.classList.toggle(
                            'active-nav',
                            a.getAttribute('href') === `#${id}`
                        );
                    });
                }
            });
        }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });

        sections.forEach(s => observer.observe(s));
    })();

    // ─── Ensure videos play on visibility ──────────────────
    (function initVideoObserver() {
        const videos = qsa('.reel-item video');
        if (!videos.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target;
                if (entry.isIntersecting) {
                    video.play().catch(() => {});
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.1 });

        videos.forEach(v => observer.observe(v));
    })();

})();
