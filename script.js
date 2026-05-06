/* =============================================
   VISWAS SETTY — PORTFOLIO SCRIPTS
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ── CUSTOM CURSOR ────────────────────────────
  const cursor    = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  function animateRing() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    cursorRing.style.left = rx + 'px';
    cursorRing.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .skill-card, .project-card, .cert-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hovering');
      cursorRing.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovering');
      cursorRing.classList.remove('hovering');
    });
  });

  // ── SCROLL PROGRESS BAR ──────────────────────
  const progressBar = document.getElementById('progressBar');
  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }

  // ── NAV SHRINK ON SCROLL ─────────────────────
  const nav = document.querySelector('nav');
  function handleScroll() {
    updateProgress();
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });

  // ── SCROLL REVEAL ────────────────────────────
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 70);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  reveals.forEach(r => revealObserver.observe(r));

  // ── ACTIVE NAV LINK ON SCROLL ────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = 'var(--accent1)';
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => sectionObserver.observe(s));

  // ── SMOOTH SCROLL FOR NAV LINKS ──────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── TYPING EFFECT ON HERO TAG ────────────────
  const heroTag = document.querySelector('.hero-tag-text');
  if (heroTag) {
    const text = heroTag.textContent;
    heroTag.textContent = '';
    let i = 0;
    setTimeout(() => {
      const type = () => {
        if (i < text.length) {
          heroTag.textContent += text[i++];
          setTimeout(type, 40);
        }
      };
      type();
    }, 400);
  }

  // ── CARD TILT EFFECT ─────────────────────────
  document.querySelectorAll('.project-card, .skill-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-5px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
      card.style.transition = 'transform 0.05s';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s ease, border-color 0.25s, background 0.25s';
    });
  });

});
