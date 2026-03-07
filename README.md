# OBELISK-Z — Landing Institucional (Vercel)

Projeto institucional da OBELISK-Z reestruturado para arquitetura moderna com Next.js, preservando o visual original e elevando o padrão de organização, responsividade e deploy.

## Stack

- Next.js (App Router)
- React
- CSS global extraído do layout legado

## Estrutura

- `app/` — rota principal e layout global
- `app/opengraph-image.js` e `app/twitter-image.js` — imagens sociais dinâmicas
- `components/` — casca da página institucional
- `content/` — fragmento HTML legado já separado
- `public/runtime/` — script runtime legado já separado
- `public/assets/` — imagens extraídas do legado (sem base64 inline em produção)
- `legacy/` — backup do HTML monolítico original
- `scripts/extract-legacy.mjs` — extrator para regenerar CSS/HTML/runtime

## Scripts

```bash
npm run extract:legacy   # extrai css/body/runtime a partir do HTML legado
npm run dev              # ambiente local
npm run build            # build de produção
npm run start            # sobe build de produção
```

## Deploy na Vercel

1. Conecte o repositório na Vercel.
2. Framework detectado automaticamente: **Next.js**.
3. Build Command: `npm run build`
4. Output: padrão do Next.js.
5. Deploy.

## Observações de qualidade aplicadas

- Remoção da camada anti-devtools do runtime.
- Default de idioma ajustado para **PT-BR**.
- SEO institucional avançado com metadata + Open Graph/Twitter image dinâmica.
- Ajustes premium de responsividade (mobile, tablet, desktop e telas grandes/TV).
- Refino visual do núcleo central do ecossistema:
  - remoção da bolinha rosa sólida atrás da logo;
  - substituição por acabamento mais sutil/premium.
- Extração automática da logo inline para asset estático em `public/assets/`.