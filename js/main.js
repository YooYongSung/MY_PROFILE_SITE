// ============================================================
// Dragon Castle — Portfolio Site Scripts
// ============================================================

// ── Edit this array to change the Skills section ──
const skills = [
  { name: 'HTML', desc: 'Semantic, accessible markup for the web.', icon: '📄' },
  { name: 'CSS', desc: 'Modern, responsive styling and layout.', icon: '🎨' },
  { name: 'JavaScript', desc: 'Interactive, dynamic client-side logic.', icon: '⚡' },
  { name: 'JAVA', desc: 'Robust backend systems and services.', icon: '☕' },
  { name: 'AOS', desc: 'Native Android application development.', icon: '📱' },
  { name: 'CLAUDE', desc: 'AI-assisted development and text tooling.', icon: '🤖' },
];

// ── Edit this array to change the Projects section ──
const projects = [
  {
    title: 'REST API Platform',
    desc: 'A scalable Spring Boot backend powering authentication, data, and business logic for a multi-client app.',
    tags: ['Java', 'Spring Boot', 'MySQL'],
    link: '#',
    icon: '⚙️',
  },
  {
    title: 'Android Companion App',
    desc: 'A native AOS app built for daily use, focused on smooth UX and reliable offline-first data sync.',
    tags: ['Java', 'Android', 'Retrofit'],
    link: '#',
    icon: '📱',
  },
  {
    title: 'AI Text Assistant',
    desc: 'A Claude-powered writing assistant that drafts, edits, and refines text through a simple web interface.',
    tags: ['Claude', 'JavaScript', 'Node.js'],
    link: '#',
    icon: '🤖',
  },
];

// ============================================================
// Theme toggle (dark default, persisted to localStorage)
// ============================================================
function initTheme() {
  const root = document.documentElement;
  const toggleBtn = document.getElementById('theme-toggle');

  toggleBtn.addEventListener('click', () => {
    const isDark = root.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

// ============================================================
// Typing effect in the hero section
// ============================================================
function initTyping() {
  const el = document.getElementById('typing-text');
  if (!el) return;

  const phrases = ['Backend Developer', 'Frontend Developer', 'AI Text Developer'];
  const TYPE_SPEED = 90;
  const DELETE_SPEED = 45;
  const HOLD_TIME = 1600;

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const current = phrases[phraseIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);

      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, HOLD_TIME);
        return;
      }
      setTimeout(tick, TYPE_SPEED);
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);

      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(tick, 300);
        return;
      }
      setTimeout(tick, DELETE_SPEED);
    }
  }

  tick();
}

// ============================================================
// Scroll reveal animations
// ============================================================
function initReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    targets.forEach((t) => t.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach((t) => observer.observe(t));
}

// ============================================================
// Render skill cards
// ============================================================
function renderSkills() {
  const grid = document.getElementById('skills-grid');
  if (!grid) return;

  grid.innerHTML = skills
    .map(
      (s, i) => `
    <div class="reveal group p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#16161f] hover:-translate-y-1.5 hover:border-brand-blue dark:hover:border-brand-cyan transition-all duration-300" style="transition-delay:${i * 80}ms">
      <div class="text-2xl mb-3">${s.icon}</div>
      <h3 class="font-semibold text-slate-800 dark:text-slate-100 mb-1">${s.name}</h3>
      <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">${s.desc}</p>
    </div>
  `
    )
    .join('');
}

// ============================================================
// Render project cards
// ============================================================
function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  grid.innerHTML = projects
    .map(
      (p, i) => `
    <a href="${p.link}" class="reveal group block p-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#16161f] hover:-translate-y-1.5 hover:border-brand-blue dark:hover:border-brand-cyan transition-all duration-300" style="transition-delay:${i * 100}ms">
      <div class="text-3xl mb-4">${p.icon}</div>
      <h3 class="font-semibold text-lg text-slate-800 dark:text-slate-100 mb-2 group-hover:text-brand-blue dark:group-hover:text-brand-cyan transition-colors">${p.title}</h3>
      <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">${p.desc}</p>
      <div class="flex flex-wrap gap-2">
        ${p.tags
          .map(
            (tag) =>
              `<span class="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">${tag}</span>`
          )
          .join('')}
      </div>
    </a>
  `
    )
    .join('');
}

// ============================================================
// Navigation: scroll header state, mobile menu, active link
// ============================================================
function initNav() {
  const header = document.getElementById('site-header');
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('main section[id]');

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  mobileBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  document.querySelectorAll('.mobile-nav-link').forEach((link) => {
    link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
  });

  if ('IntersectionObserver' in window && sections.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((s) => navObserver.observe(s));
  }
}

// ============================================================
// Copy email to clipboard
// ============================================================
function initCopyEmail() {
  const btn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast');
  if (!btn || !toast) return;

  btn.addEventListener('click', async () => {
    const email = 'zzugliys@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
    } catch (err) {
      // Fallback for environments without Clipboard API (e.g. file:// in some browsers)
      const temp = document.createElement('textarea');
      temp.value = email;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      document.body.removeChild(temp);
    }

    toast.classList.add('show');
    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(() => toast.classList.remove('show'), 1500);
  });
}

// ============================================================
// Footer year
// ============================================================
function setYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

// ============================================================
// Init
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTyping();
  renderSkills();
  renderProjects();
  initReveal();
  initNav();
  initCopyEmail();
  setYear();
});
