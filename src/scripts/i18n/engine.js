import { en } from './en.js';
import { pt } from './pt.js';
import { es } from './es.js';
import { zh } from './zh.js';

const T = { en, pt, es, zh };

const META = {
  en: { flag: '🇺🇸', label: 'EN', html: 'en' },
  pt: { flag: '🇧🇷', label: 'PT', html: 'pt-BR' },
  es: { flag: '🇪🇸', label: 'ES', html: 'es' },
  zh: { flag: '🇨🇳', label: 'ZH', html: 'zh-Hans' }
};

let currentLang = localStorage.getItem('oz_lang') || 'en';

export function setLang(lang) {
  if (!T[lang]) return;
  currentLang = lang;
  localStorage.setItem('oz_lang', lang);

  document.documentElement.setAttribute('lang', META[lang].html);

  const flagEl = document.getElementById('ΛF0');
  const labelEl = document.getElementById('ΛL0');
  if (flagEl) flagEl.textContent = META[lang].flag;
  if (labelEl) labelEl.textContent = META[lang].label;

  document.querySelectorAll('[data-k]').forEach(el => {
    const key = el.dataset.k;
    const val = T[lang][key];
    if (val !== undefined) el.innerHTML = val;
  });

  document.querySelectorAll('.ΛO').forEach(o =>
    o.classList.toggle('Χ', o.dataset.lang === lang)
  );
  document.querySelectorAll('#ΝΜL0 button').forEach(b =>
    b.classList.toggle('Χ', b.dataset.lang === lang)
  );
}

export function getLang() {
  return currentLang;
}

export function initI18n() {
  setLang(currentLang);
}
