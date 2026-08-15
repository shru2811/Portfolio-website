const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('shruti-theme');

if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) body.classList.add('dark');

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  localStorage.setItem('shruti-theme', body.classList.contains('dark') ? 'dark' : 'light');
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('in-view'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();

const progress = document.querySelector('.loader-track i');
const percent = document.querySelector('.loader-percent');
let value = 0;
const timer = setInterval(() => {
  value = Math.min(value + Math.ceil(Math.random() * 13), 100);
  percent.textContent = String(value).padStart(2, '0');
  if (value === 100) {
    clearInterval(timer);
    progress.classList.add('go');
    setTimeout(() => document.querySelector('.loader').classList.add('done'), 350);
  }
}, 70);

// Cursor choreography is intentionally disabled for touch and reduced-motion users.
const finePointer = window.matchMedia('(pointer: fine)');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (finePointer.matches && !reduceMotion.matches) {
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  let mouseX = -100, mouseY = -100, ringX = -100, ringY = -100;

  window.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    body.classList.add('cursor-active');
  });

  const trail = () => {
    ringX += (mouseX - ringX) * .16;
    ringY += (mouseY - ringY) * .16;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(trail);
  };
  trail();

  document.querySelectorAll('a, button').forEach((element) => {
    element.addEventListener('mouseenter', () => {
      body.classList.add('cursor-hover');
      body.classList.toggle('cursor-project', element.closest('.project') !== null);
    });
    element.addEventListener('mouseleave', () => body.classList.remove('cursor-hover', 'cursor-project'));
  });

  document.addEventListener('mouseleave', () => body.classList.remove('cursor-active'));
  document.addEventListener('mouseenter', () => body.classList.add('cursor-active'));
}
