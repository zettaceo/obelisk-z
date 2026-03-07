/**
 * OBELISK-Z // PHANTOM CORE v3.1.4
 * CLASSIFICATION: RESTRICTED — ZETTA SECURITY FRAMEWORK
 */

import './styles/variables.css';
import './styles/base.css';
import './styles/nav.css';
import './styles/hero.css';
import './styles/sections.css';
import './styles/animations.css';
import './styles/responsive.css';

import { initSecurity } from './scripts/security/devtools.js';
import { initIntegrity } from './scripts/security/integrity.js';
import { initI18n } from './scripts/i18n/engine.js';
import { initNav } from './scripts/nav.js';
import { initParticles } from './scripts/canvas/particles.js';
import { initOrbit } from './scripts/canvas/orbit.js';
import { initEcosystem } from './scripts/canvas/ecosystem.js';
import { initReveal } from './scripts/reveal.js';
import { initTerminal } from './scripts/terminal.js';

initSecurity();
initIntegrity();
initNav();
initI18n();
initParticles();
initOrbit();
initEcosystem();
initReveal();
initTerminal();
