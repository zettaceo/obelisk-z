import { setLang } from './i18n/engine.js';

export function initNav() {
  const nav = document.getElementById('Ν0');
  const menuBtn = document.getElementById('ΝΒ0');
  const mobileMenu = document.getElementById('ΝΜ0');
  const closeBtn = document.getElementById('ΝX0');
  const langBtn = document.getElementById('ΛΒ0');
  const langDropdown = document.getElementById('ΛD0');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('Νs', scrollY > 60);
  }, { passive: true });

  menuBtn.addEventListener('click', () => mobileMenu.classList.add('open'));
  closeBtn.addEventListener('click', () => mobileMenu.classList.remove('open'));

  mobileMenu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => mobileMenu.classList.remove('open'))
  );

  langBtn.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = langDropdown.classList.toggle('open');
    langBtn.classList.toggle('open', isOpen);
  });

  document.addEventListener('click', () => {
    langDropdown.classList.remove('open');
    langBtn.classList.remove('open');
  });

  document.querySelectorAll('.ΛO').forEach(o =>
    o.addEventListener('click', e => {
      e.stopPropagation();
      setLang(o.dataset.lang);
      langDropdown.classList.remove('open');
      langBtn.classList.remove('open');
    })
  );

  document.querySelectorAll('#ΝΜL0 button').forEach(b =>
    b.addEventListener('click', () => setLang(b.dataset.lang))
  );

  document.querySelectorAll('a[href^="#"]').forEach(a =>
    a.addEventListener('click', e => {
      const target = document.getElementById(a.getAttribute('href').slice(1));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    })
  );
}
