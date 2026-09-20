document.getElementById('ano').textContent = new Date().getFullYear();

const header = document.querySelector('.site-header');
const toggle = document.querySelector('.nav-toggle');

toggle.addEventListener('click', () => {
  const isOpen = header.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    header.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

// Seletor de "Outros projetos"
const tabs = document.querySelectorAll('.project-tab');
const details = document.querySelectorAll('[data-detail]');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.project;
    tabs.forEach(t => t.classList.toggle('is-active', t === tab));
    details.forEach(d => { d.hidden = d.dataset.detail !== target; });
  });
});

// Revelar seções ao rolar
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const sections = document.querySelectorAll('.section');

if (prefersReducedMotion) {
  sections.forEach(s => s.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  sections.forEach(s => observer.observe(s));
}
