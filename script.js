// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const navToggleButton = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  
  console.log('Toggle button:', navToggleButton);
  console.log('Nav menu:', navMenu);
  
  if (navToggleButton && navMenu) {
    navToggleButton.addEventListener('click', () => {
      console.log('Toggle clicked!');
      const isOpen = navMenu.classList.toggle('open');
      navToggleButton.setAttribute('aria-expanded', String(isOpen));
      console.log('Menu is now:', isOpen ? 'open' : 'closed');
    });
  } else {
    console.log('Elements not found!');
  }
});

// Theme toggle (persisted)
const themeToggleButton = document.getElementById('themeToggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const storedTheme = localStorage.getItem('theme');
const isDark = storedTheme ? storedTheme === 'dark' : prefersDark;
document.documentElement.dataset.theme = isDark ? 'dark' : 'light';

// Update button icon based on current theme
const updateThemeIcon = () => {
  if (themeToggleButton) {
    const isDarkTheme = document.documentElement.dataset.theme === 'dark';
    themeToggleButton.textContent = isDarkTheme ? '🌙' : '☀️';
  }
};

// Set initial icon
updateThemeIcon();

if (themeToggleButton) {
  themeToggleButton.addEventListener('click', () => {
    const current = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = current;
    localStorage.setItem('theme', current);
    updateThemeIcon();
  });
}

// Smooth scroll for internal links (with offset for sticky header)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 8;
    window.scrollTo({ top, behavior: 'smooth' });
    if (navMenu?.classList.contains('open')) navMenu.classList.remove('open');
  });
});

// Dynamic year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

