const toggle = document.getElementById('langToggle');
const themeToggle = document.getElementById('themeToggle');
const translatable = document.querySelectorAll('[data-en][data-fr]');

let currentLang = 'en';

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;

  translatable.forEach((element) => {
    element.innerHTML = element.dataset[lang];
  });

  if (toggle) {
    toggle.textContent = lang === 'en' ? 'FR' : 'EN';
  }

  localStorage.setItem('portfolio-lang', lang);
}

function setTheme(theme) {
  const dark = theme === 'dark';
  document.body.classList.toggle('dark-mode', dark);

  if (themeToggle) {
    themeToggle.textContent = dark ? 'LIGHT' : 'DARK';
  }

  localStorage.setItem('portfolio-theme', theme);
}

const savedLang = localStorage.getItem('portfolio-lang');
if (savedLang === 'fr') {
  setLanguage('fr');
} else {
  setLanguage('en');
}

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'dark') {
  setTheme('dark');
} else {
  setTheme('light');
}

if (toggle) {
  toggle.addEventListener('click', () => {
    setLanguage(currentLang === 'en' ? 'fr' : 'en');
  });
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-mode');
    setTheme(isDark ? 'light' : 'dark');
  });
}

const projectCards = document.querySelectorAll('.project-card[data-video]');
const videoModal = document.getElementById('videoModal');
const videoFrame = document.getElementById('videoFrame');
const videoClose = document.getElementById('videoClose');

function buildEmbedUrl(baseUrl) {
  if (!baseUrl) return '';
  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}autoplay=1&rel=0`;
}

function openVideo(url) {
  if (!videoModal || !videoFrame) return;
  videoFrame.src = buildEmbedUrl(url);
  videoModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeVideo() {
  if (!videoModal || !videoFrame) return;
  videoModal.classList.remove('active');
  videoFrame.src = '';
  document.body.style.overflow = '';
}

projectCards.forEach((card) => {
  card.addEventListener('click', () => {
    openVideo(card.dataset.video);
  });
});

if (videoClose) {
  videoClose.addEventListener('click', closeVideo);
}

if (videoModal) {
  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
      closeVideo();
    }
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeVideo();
  }
});