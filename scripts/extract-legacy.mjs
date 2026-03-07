import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const sourceFile = resolve(process.cwd(), 'legacy/obelisk-z-wallet.legacy.html');
const cssFile = resolve(process.cwd(), 'app/globals.css');
const bodyFile = resolve(process.cwd(), 'content/obelisk-body.html');
const runtimeFile = resolve(process.cwd(), 'public/runtime/obelisk-runtime.js');
const logoOutputFile = resolve(process.cwd(), 'public/assets/obelisk-z-logo.png');

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

// Define PT como idioma padrão.
runtime = runtime.replace(
  "let ΦΩ=localStorage.getItem('Φ_ω')||'en';",
  "let ΦΩ=localStorage.getItem('Φ_ω')||'pt';"
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
  .EN{transform:translate(-50%,-50%) scale(.88)}
  #e0{top:8% !important}
  #e1{left:86% !important}
  #e4{left:14% !important}
  .Zrr,.Zrr2{display:none}
  .Zrg{opacity:.44}
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
`;

css = `${css.trim()}\n${premiumOverrides}`.trim() + '\n';
body = body.trim() + '\n';
runtime = runtime.trim() + '\n';

writeFileSync(cssFile, css, 'utf8');
writeFileSync(bodyFile, body, 'utf8');
writeFileSync(runtimeFile, runtime, 'utf8');

console.log('Arquivos extraídos com sucesso:');
console.log('- app/globals.css');
console.log('- content/obelisk-body.html');
console.log('- public/runtime/obelisk-runtime.js');
if (exportedPngAssets.length > 0) {
  exportedPngAssets.forEach((asset) => console.log(`- public${asset}`));
} else {
  console.log(`- public/assets/${logoOutputFile.split('/').pop()}`);
}
