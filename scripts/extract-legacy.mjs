import {
  mkdirSync,
  readFileSync,
  readdirSync,
  unlinkSync,
  writeFileSync
} from 'node:fs';
import { resolve } from 'node:path';

const sourceFile = resolve(process.cwd(), 'legacy/obelisk-z-wallet.legacy.html');
const cssFile = resolve(process.cwd(), 'app/globals.css');
const bodyFile = resolve(process.cwd(), 'content/obelisk-body.html');
const runtimeFile = resolve(process.cwd(), 'public/runtime/obelisk-runtime.js');
const logoOutputFile = resolve(process.cwd(), 'public/assets/obelisk-z-logo.png');
const fragmentsDir = resolve(process.cwd(), 'content/fragments');
const fragmentsManifestFile = resolve(process.cwd(), 'content/fragments/manifest.json');
const staticFallbackFile = resolve(process.cwd(), 'public/index.html');

const html = readFileSync(sourceFile, 'utf8');

function extractBetween(content, startTag, endTag) {
  const start = content.indexOf(startTag);
  if (start === -1) {
    throw new Error(`Tag inicial não encontrada: ${startTag}`);
  }

  const end = content.indexOf(endTag, start + startTag.length);
  if (end === -1) {
    throw new Error(`Tag final não encontrada: ${endTag}`);
  }

  return content.slice(start + startTag.length, end).trim();
}

let css = extractBetween(html, '<style>', '</style>');
let body = extractBetween(html, '<body>', '<script>');
let runtime = extractBetween(html, '<script>', '</script>');

// Remove comentário "military-style" do topo do body legado.
body = body.replace(/^<!--[\s\S]*?-->\s*/, '');
body = body.replace(/<!--[\s\S]*?-->/g, (commentBlock) =>
  commentBlock.includes('PHANTOM-CORE RUNTIME') ? '' : commentBlock
);

// Remove o modal legado de devtools (ficou obsoleto após limpeza do runtime).
body = body.replace(
  /<div class="DT" id="ΨΔ">[\s\S]*?<\/div>\s*(?=<canvas id="α">)/,
  ''
);

// Extrai todos os PNGs inline para assets estáticos.
const pngDataUris = [
  ...new Set(html.match(/data:image\/png;base64,[A-Za-z0-9+/=]+/g) ?? [])
];
const exportedPngAssets = [];

if (pngDataUris.length > 0) {
  mkdirSync(resolve(process.cwd(), 'public/assets'), { recursive: true });

  pngDataUris.forEach((dataUri, index) => {
    const fileName = index === 0 ? 'obelisk-z-logo.png' : `legacy-inline-${index + 1}.png`;
    const outputPath = resolve(process.cwd(), `public/assets/${fileName}`);
    const publicPath = `/assets/${fileName}`;
    const base64 = dataUri.replace('data:image/png;base64,', '');

    writeFileSync(outputPath, Buffer.from(base64, 'base64'));
    body = body.split(dataUri).join(publicPath);
    exportedPngAssets.push(publicPath);
  });
}

// Remove camada anti-devtools e interceptações agressivas.
runtime = runtime.replace(/\/\/ SENTINEL:[\s\S]*?\/\/ NAV/g, '// NAV');
runtime = runtime.replace(/\/\/ AEGIS:[\s\S]*?\/\/ NAV/g, '// NAV');
runtime = runtime.replace(/debugger;\s*/g, '');

// Evita falha em runtime caso o id legado do <html> não exista.
runtime = runtime.replace(
  "document.getElementById('Φ').setAttribute('lang',ΦΛ[λ].ΦH);",
  "(document.getElementById('Φ')||document.documentElement).setAttribute('lang',ΦΛ[λ].ΦH);"
);

// Define PT como idioma padrão.
runtime = runtime.replace(
  "let ΦΩ=localStorage.getItem('Φ_ω')||'en';",
  "let ΦΩ=localStorage.getItem('Φ_ω')||'pt';"
);

// Otimizações de performance e acessibilidade para múltiplos dispositivos.
runtime = runtime.replace(
  "const ΠC=document.getElementById('α'),ΠX=ΠC.getContext('2d');",
  "const REDUCE_MOTION=typeof matchMedia==='function'&&matchMedia('(prefers-reduced-motion: reduce)').matches;const ΠC=document.getElementById('α'),ΠX=ΠC.getContext('2d');"
);
runtime = runtime.replace(
  "const ΠΑ=Array.from({length:160},()=>new ΠΡ());",
  "const ΠΜ=REDUCE_MOTION?0:(innerWidth<640?64:innerWidth<1200?110:160);const ΠΑ=Array.from({length:ΠΜ},()=>new ΠΡ());"
);
runtime = runtime.replace('(function ΠΦ(){', 'if(ΠΑ.length)(function ΠΦ(){');
runtime = runtime.replace('(function ΟΦ(){', 'if(!REDUCE_MOTION)(function ΟΦ(){');
runtime = runtime.replace('(function ΕΦ(){', 'if(!REDUCE_MOTION)(function ΕΦ(){');
runtime = runtime.replace(
  "document.querySelectorAll('a[href^=\"#\"]').forEach(α=>α.addEventListener('click',ε=>{const τ=document.getElementById(α.getAttribute('href').slice(1));if(τ){ε.preventDefault();τ.scrollIntoView({behavior:'smooth',block:'start'});}}));",
  "document.querySelectorAll('a[href^=\"#\"]').forEach(α=>α.addEventListener('click',ε=>{const τ=document.getElementById(α.getAttribute('href').slice(1));if(τ){ε.preventDefault();τ.scrollIntoView({behavior:REDUCE_MOTION?'auto':'smooth',block:'start'});}}));"
);

const premiumOverrides = `

/* ===== Premium overrides (estrutura Vercel) ===== */

/* Integra fontes do next/font às variáveis originais do layout */
:root{
  --Φ:var(--font-orbitron),monospace;
  --Ψ:var(--font-syne),sans-serif;
  --Ω:var(--font-space-mono),monospace;
}

/* Evita wrappers extras alterarem o layout legado */
.legacy-fragment{display:contents}

/* Barra de progresso do scroll no topo */
.scroll-progress{
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:3px;
  z-index:1200;
  pointer-events:none;
  background:rgba(184,79,255,.14);
  backdrop-filter:blur(2px);
  transition:opacity .2s ease;
}
.scroll-progress__fill{
  width:100%;
  height:100%;
  transform:scaleX(0);
  transform-origin:left center;
  background:linear-gradient(90deg,var(--π),var(--μ),var(--γ));
  box-shadow:0 0 14px rgba(184,79,255,.55);
}

/* Base estrutural para evitar clipping em traduções e grids densos */
.Ξ,.Pg > *,.ELg > *,.Rdk > *{min-width:0}
.WhiD,.PkD,.SiD,.McD,.Rpi li,.ELd,.CFd,.Ηd,.Wht p,.Zp{overflow-wrap:anywhere}
.ELg{grid-template-columns:repeat(5,minmax(0,1fr))}
.Η{min-height:100dvh}

/* Hardening anti-overflow horizontal */
html,body,main{
  max-width:100%;
  overflow-x:clip;
  overscroll-behavior-x:none;
}
body{
  touch-action:pan-y pinch-zoom;
}
.Ηdg,.Eg{
  overflow:clip;
}
.EN{
  max-width:min(46vw,220px);
}
.ENc{
  max-width:100%;
}
.ENn,.ENs{
  overflow:hidden;
  text-overflow:ellipsis;
}

/* Remove a bolinha rosa sólida atrás da logo central e aplica acabamento premium discreto */
.Eco{
  width:auto;
  height:auto;
  border-radius:0;
  background:transparent;
  box-shadow:none;
  position:relative;
  isolation:isolate;
}
.Eco::before{
  content:'';
  position:absolute;
  width:74px;
  height:74px;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  border-radius:50%;
  border:1px solid rgba(184,79,255,.34);
  box-shadow:0 0 26px rgba(184,79,255,.28), inset 0 0 18px rgba(184,79,255,.08);
  background:radial-gradient(circle, rgba(184,79,255,.08) 0%, rgba(184,79,255,0) 68%);
  z-index:-1;
}
.Eco img{
  width:56px;
  height:56px;
  filter:drop-shadow(0 0 8px rgba(184,79,255,.35));
}

/* Refino visual do Zion sem alterar composição da seção */
.ZrI{
  width:clamp(168px, 24vw, 232px);
  filter:drop-shadow(0 0 26px rgba(184,79,255,.42)) drop-shadow(0 16px 28px rgba(184,79,255,.22));
}
.Zrg{
  opacity:.62;
  filter:blur(26px);
}
.Zrr,.Zrr2{
  opacity:.8;
}

/* Responsividade robusta: dispositivos pequenos */
@media (max-width: 768px){
  .Ν{padding:14px 0}
  .Ξ{padding:0 clamp(14px,4vw,22px)}
  .ENc{padding:9px 12px;gap:8px}
  .ENn{font-size:.54rem}
  .ENs{display:none}
  .Ecr{width:96px;height:96px}
  .Eco::before{width:64px;height:64px}
  .Eco img{width:48px;height:48px}
}

@media (max-width: 520px){
  .h1{font-size:clamp(1.8rem,10vw,2.4rem)}
  .h2{font-size:clamp(1.2rem,7vw,1.7rem)}
  .EN{transform:translate(-50%,-50%) scale(.88)}
  #e0{top:8% !important}
  #e1{left:86% !important}
  #e4{left:14% !important}
  .Zrr,.Zrr2{display:none}
  .Zrg{opacity:.44}
  .ΒΑ{display:grid;grid-template-columns:1fr;max-width:100%}
  .Β{justify-content:center;width:100%}
  .Ηst{display:grid;grid-template-columns:1fr 1fr;gap:14px}
  .Ηst > div{min-width:0}
  .TmBd{font-size:.72rem;padding:16px}
  .Rdk{gap:26px}
  .Rdi{padding:0 10px}
  .Pk,.Mc{padding:28px 20px}
}

@media (max-width: 390px){
  .Νn{font-size:.68rem}
  .Νs2{display:none}
  .Ηd,.Wht p,.Zp{font-size:.9rem;line-height:1.7}
  .EN{transform:translate(-50%,-50%) scale(.8)}
  .ENc{padding:8px 10px}
  .Ecr{width:82px;height:82px}
  .Eco::before{width:56px;height:56px}
  .Eco img{width:40px;height:40px}
  .Ηcw img{width:78px;height:78px}
  .ΗΝd{width:44px;height:44px}
  .ΗΝn{font-size:.43rem}
  .ΝΜ a{padding:12px 24px}
}

/* Modo desktop no celular: força legibilidade e evita miniaturização extrema */
@media (pointer: coarse) and (hover: none) and (min-width: 900px){
  html{font-size:19px}
  .Ξ{max-width:100%;padding:0 18px}
  .Ν{padding:12px 0}
  .Νlk{display:none}
  .Νc{display:none}
  .ΝΒ{display:block}
  .Η{padding:126px 0 58px;min-height:auto}
  .Ηi,.Whg,.Sg,.Zg{grid-template-columns:1fr;gap:36px}
  .Ηdg{height:360px}
  .Pg,.Mg{grid-template-columns:1fr 1fr}
  .Eg{height:340px;max-width:100%}
  .ELg{grid-template-columns:1fr 1fr;gap:14px}
  .Rdk{grid-template-columns:1fr 1fr;gap:26px}
  .Rdk::before{display:none}
}

@media (pointer: coarse) and (hover: none) and (min-width: 900px) and (max-height: 520px){
  html{font-size:20px}
}

/* Notebooks com altura reduzida (evita sensação de "vazio" no desktop baixo) */
@media (max-height: 820px) and (min-width: 900px){
  .Λ{padding:96px 0}
  .Η{padding:138px 0 72px;min-height:auto}
  .Ηdg{height:500px}
}

@media (max-height: 700px) and (min-width: 900px){
  .Ν{padding:12px 0}
  .Η{padding:124px 0 56px}
  .Ηdg{height:440px}
  .Whg,.Sg{gap:56px}
}

/* Desktop premium: melhora escala e densidade visual sem alterar o design */
@media (min-width: 1200px){
  .Ξ{max-width:1400px;padding:0 clamp(24px,3.4vw,72px)}
  .Ν{padding:22px 0}
  .Νn{font-size:.92rem}
  .Νs2{font-size:.56rem;letter-spacing:.22em}
  .Νlk a{font-size:.72rem;padding:8px 13px}
  .ΛΒ{font-size:.66rem;padding:8px 13px}
  .Η{padding:176px 0 98px}
  .Ηi{gap:clamp(64px,6vw,108px)}
  .Ηd{max-width:620px;font-size:1.02rem}
  .Ηst{gap:38px}
  .Ηdg{height:580px}
  .Whg{gap:96px}
  .Pg{gap:24px}
  .Sg{gap:92px}
  .Mg{gap:28px}
  .Eg{max-width:760px;height:540px}
  .ELg{gap:20px}
  .Rdk{gap:12px}
  .Rph{padding:0 18px}
  .CF{padding:156px 0}
}

@media (min-width: 1280px){
  html{font-size:16.2px}
}

@media (min-width: 1440px){
  html{font-size:16.5px}
  .Ξ{max-width:1480px}
  .Ηdg{height:620px}
  .TmBd{max-height:340px}
}

/* Telas muito grandes (desktop ultrawide e TV) */
@media (min-width: 1800px){
  html{font-size:17px}
  .Ξ{max-width:1520px}
}

@media (min-width: 2560px){
  html{font-size:19px}
  .Ξ{max-width:1880px}
}

/* Acessibilidade para quem prefere menos animação */
@media (prefers-reduced-motion: reduce){
  *, *::before, *::after{
    animation:none !important;
    transition:none !important;
    scroll-behavior:auto !important;
  }
}

@media (max-width: 520px){
  .scroll-progress{height:2.5px}
}
`;

css = `${css.trim()}\n${premiumOverrides}`.trim() + '\n';
body = body.trim() + '\n';
runtime = runtime.trim() + '\n';

// Gera fragmentos por seção para componentização fase 3.
const fragmentEntries = [];
const sectionRegex = /<section[\s\S]*?<\/section>/g;
let cursor = 0;
let match = sectionRegex.exec(body);
let fragmentIndex = 0;

mkdirSync(fragmentsDir, { recursive: true });
readdirSync(fragmentsDir)
  .filter((file) => file.endsWith('.html') || file === 'manifest.json')
  .forEach((file) => {
    unlinkSync(resolve(fragmentsDir, file));
  });

while (match) {
  if (match.index > cursor) {
    const prelude = body.slice(cursor, match.index).trim();
    if (prelude) {
      const name = `fragment-${String(fragmentIndex).padStart(2, '0')}.html`;
      writeFileSync(resolve(fragmentsDir, name), `${prelude}\n`, 'utf8');
      fragmentEntries.push({ name, type: 'interstitial' });
      fragmentIndex += 1;
    }
  }

  const sectionHtml = match[0].trim();
  const sectionId = sectionHtml.match(/id="([^"]+)"/)?.[1] ?? `section-${fragmentIndex}`;
  const name = `fragment-${String(fragmentIndex).padStart(2, '0')}-${sectionId}.html`;
  writeFileSync(resolve(fragmentsDir, name), `${sectionHtml}\n`, 'utf8');
  fragmentEntries.push({ name, type: 'section', sectionId });
  fragmentIndex += 1;

  cursor = sectionRegex.lastIndex;
  match = sectionRegex.exec(body);
}

const tail = body.slice(cursor).trim();
if (tail) {
  const name = `fragment-${String(fragmentIndex).padStart(2, '0')}-tail.html`;
  writeFileSync(resolve(fragmentsDir, name), `${tail}\n`, 'utf8');
  fragmentEntries.push({ name, type: 'tail' });
}

writeFileSync(
  fragmentsManifestFile,
  `${JSON.stringify({ fragments: fragmentEntries }, null, 2)}\n`,
  'utf8'
);

// Fallback estático para ambientes Vercel mal configurados.
const staticFallbackHtml = `<!DOCTYPE html>
<html id="Φ" lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover">
  <meta name="theme-color" content="#06020f">
  <title>OBELISK-Z</title>
  <meta name="description" content="Infraestrutura institucional para operação segura no ecossistema ZETTA.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Syne:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
  <style>${css}</style>
  <style>:root{--Φ:'Orbitron',monospace;--Ψ:'Syne',sans-serif;--Ω:'Space Mono',monospace;}</style>
</head>
<body>
${body}
<script>${runtime}</script>
</body>
</html>
`;
writeFileSync(staticFallbackFile, staticFallbackHtml, 'utf8');

writeFileSync(cssFile, css, 'utf8');
writeFileSync(bodyFile, body, 'utf8');
writeFileSync(runtimeFile, runtime, 'utf8');

console.log('Arquivos extraídos com sucesso:');
console.log('- app/globals.css');
console.log('- content/obelisk-body.html');
console.log('- public/runtime/obelisk-runtime.js');
console.log('- content/fragments/manifest.json');
console.log('- public/index.html');
if (exportedPngAssets.length > 0) {
  exportedPngAssets.forEach((asset) => console.log(`- public${asset}`));
} else {
  console.log(`- public/assets/${logoOutputFile.split('/').pop()}`);
}
