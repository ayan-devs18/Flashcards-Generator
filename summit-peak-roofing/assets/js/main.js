/* =========================================================
   Summit Peak Roofing Co. — interactions & animations
   ========================================================= */

(() => {
    'use strict';

    const $  = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- 1. Preloader ---------- */
    window.addEventListener('load', () => {
        const pre = $('#preloader');
        if (!pre) return;
        setTimeout(() => pre.classList.add('is-hidden'), 450);
    });

    /* ---------- 2. Year in footer ---------- */
    const yearEl = $('#year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ---------- 3. Header on scroll ---------- */
    const header = $('#header');
    const onScrollHeader = () => {
        header.classList.toggle('is-scrolled', window.scrollY > 12);
    };
    onScrollHeader();
    window.addEventListener('scroll', onScrollHeader, { passive: true });

    /* ---------- 4. Mobile nav ---------- */
    const navToggle = $('#navToggle');
    const nav = $('#nav');
    if (navToggle && nav) {
        const close = () => {
            nav.classList.remove('is-open');
            navToggle.classList.remove('is-open');
            navToggle.setAttribute('aria-expanded', 'false');
        };
        navToggle.addEventListener('click', () => {
            const open = !nav.classList.contains('is-open');
            nav.classList.toggle('is-open', open);
            navToggle.classList.toggle('is-open', open);
            navToggle.setAttribute('aria-expanded', String(open));
        });
        $$('.nav__link', nav).forEach(a => a.addEventListener('click', close));
        window.addEventListener('resize', () => { if (innerWidth > 760) close(); });
    }

    /* ---------- 5. Scroll-reveal ---------- */
    const reveals = $$('[data-reveal]');
    if ('IntersectionObserver' in window && !prefersReducedMotion) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const delay = parseInt(el.dataset.delay || '0', 10);
                    setTimeout(() => el.classList.add('is-visible'), delay);
                    io.unobserve(el);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        reveals.forEach(el => io.observe(el));
    } else {
        reveals.forEach(el => el.classList.add('is-visible'));
    }

    /* ---------- 6. Counter animation ---------- */
    const counters = $$('[data-count]');
    if ('IntersectionObserver' in window && counters.length) {
        const animate = (el) => {
            const target = parseInt(el.dataset.count, 10) || 0;
            const duration = 1600;
            const start = performance.now();
            const tick = (now) => {
                const p = Math.min(1, (now - start) / duration);
                const eased = 1 - Math.pow(1 - p, 3);
                el.textContent = Math.round(target * eased).toLocaleString();
                if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        };
        const cio = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    animate(e.target);
                    cio.unobserve(e.target);
                }
            });
        }, { threshold: 0.4 });
        counters.forEach(c => cio.observe(c));
    } else {
        counters.forEach(c => c.textContent = (parseInt(c.dataset.count, 10) || 0).toLocaleString());
    }

    /* ---------- 7. Active nav link on scroll ---------- */
    const sections = ['home', 'services', 'about', 'offer', 'testimonials', 'contact']
        .map(id => document.getElementById(id))
        .filter(Boolean);
    const navLinks = $$('.nav__link');
    if ('IntersectionObserver' in window && sections.length) {
        const sio = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    navLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === `#${id}`));
                }
            });
        }, { threshold: 0.45 });
        sections.forEach(s => sio.observe(s));
    }

    /* ---------- 8. Hero rain ---------- */
    const rain = $('#heroRain');
    if (rain && !prefersReducedMotion) {
        const drops = window.innerWidth < 760 ? 30 : 70;
        const frag = document.createDocumentFragment();
        for (let i = 0; i < drops; i++) {
            const i_el = document.createElement('i');
            i_el.style.left              = `${Math.random() * 100}%`;
            i_el.style.animationDuration = `${0.6 + Math.random() * 1.2}s`;
            i_el.style.animationDelay    = `${Math.random() * -2}s`;
            i_el.style.opacity           = `${0.3 + Math.random() * 0.7}`;
            i_el.style.height            = `${40 + Math.random() * 90}px`;
            frag.appendChild(i_el);
        }
        rain.appendChild(frag);
    }

    /* ---------- 9. Subtle hero parallax ---------- */
    const sun       = $('.hero__sun');
    const mountains = $('.hero__mountains');
    const city      = $('.hero__city');
    if (sun && !prefersReducedMotion) {
        const onMove = (e) => {
            const cx = (e.clientX / window.innerWidth - 0.5);
            const cy = (e.clientY / window.innerHeight - 0.5);
            sun.style.transform       = `translate(${cx * -20}px, ${cy * -10}px)`;
            mountains.style.transform = `translate(${cx * -14}px, 0)`;
            city.style.transform      = `translate(${cx * -28}px, 0)`;
        };
        window.addEventListener('mousemove', onMove, { passive: true });

        const onScrollParallax = () => {
            const y = window.scrollY;
            sun.style.translate       = `0 ${y * 0.15}px`;
            mountains.style.translate = `0 ${y * 0.08}px`;
            city.style.translate      = `0 ${y * 0.04}px`;
        };
        window.addEventListener('scroll', onScrollParallax, { passive: true });
    }

    /* ---------- 10. Testimonial carousel ---------- */
    const carousel = $('#testimonialCarousel');
    if (carousel) {
        const track    = $('.testimonials__track', carousel);
        const slides   = $$('.testimonial', carousel);
        const prevBtn  = $('.testimonials__nav--prev', carousel);
        const nextBtn  = $('.testimonials__nav--next', carousel);
        const dotsWrap = $('#testimonialDots');
        let index = 0;
        let timer = null;

        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
            dot.addEventListener('click', () => go(i));
            dotsWrap.appendChild(dot);
        });
        const dots = $$('button', dotsWrap);

        const go = (i) => {
            index = (i + slides.length) % slides.length;
            track.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach((d, di) => d.classList.toggle('is-active', di === index));
        };
        const next = () => go(index + 1);
        const prev = () => go(index - 1);

        nextBtn.addEventListener('click', () => { next(); restart(); });
        prevBtn.addEventListener('click', () => { prev(); restart(); });

        const start   = () => { if (!prefersReducedMotion) timer = setInterval(next, 6000); };
        const stop    = () => { clearInterval(timer); };
        const restart = () => { stop(); start(); };

        carousel.addEventListener('mouseenter', stop);
        carousel.addEventListener('mouseleave', start);

        let touchX = null;
        carousel.addEventListener('touchstart', (e) => { touchX = e.changedTouches[0].clientX; stop(); }, { passive: true });
        carousel.addEventListener('touchend',   (e) => {
            if (touchX == null) return;
            const diff = e.changedTouches[0].clientX - touchX;
            if (Math.abs(diff) > 40) (diff < 0 ? next() : prev());
            touchX = null;
            start();
        }, { passive: true });

        go(0);
        start();
    }

    /* ---------- 11. Lead form ---------- */
    const form = $('#leadForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name    = $('#name', form).value.trim();
            const phone   = $('#phone', form).value.trim();
            const email   = $('#email', form).value.trim();
            const service = $('#service', form).value;

            if (!name || !phone || !email || !service) {
                form.querySelectorAll('input, select').forEach(input => {
                    if (input.required && !input.value.trim()) {
                        input.style.borderColor = '#e74c3c';
                        input.addEventListener('input', () => { input.style.borderColor = ''; }, { once: true });
                    }
                });
                return;
            }

            const btn = form.querySelector('button[type="submit"]');
            const original = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = 'Sending…';
            setTimeout(() => {
                form.reset();
                btn.disabled = false;
                btn.innerHTML = original;
                const success = $('#formSuccess');
                if (success) {
                    success.hidden = false;
                    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    setTimeout(() => { success.hidden = true; }, 8000);
                }
            }, 900);
        });
    }

    /* ---------- 12. Back-to-top ---------- */
    const toTop = $('#toTop');
    if (toTop) {
        const onScrollTop = () => {
            toTop.classList.toggle('is-visible', window.scrollY > 600);
        };
        onScrollTop();
        window.addEventListener('scroll', onScrollTop, { passive: true });
        toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    /* ---------- 13. Magnetic CTA effect (desktop only) ---------- */
    if (matchMedia('(pointer:fine)').matches && !prefersReducedMotion) {
        $$('.btn--primary').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const r = btn.getBoundingClientRect();
                const x = e.clientX - (r.left + r.width  / 2);
                const y = e.clientY - (r.top  + r.height / 2);
                btn.style.transform = `translate(${x * 0.15}px, ${y * 0.2}px) scale(1.03)`;
            });
            btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
        });
    }
})();
