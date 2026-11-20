# BART — Bach Bao Portfolio 2026

Interactive Senior Art portfolio built with Next.js 15 (static export), React 19, Framer Motion, and CSS Grid (100% Zero Flexbox).

- **Live site (GitHub Pages):** https://bachbao2689-ops.github.io/web-portfolio/

## Structure

- `Develop/` — Next.js application source code, public web assets, and build configuration.
- `.github/workflows/nextjs.yml` — Automated build and GitHub Pages deployment from `Develop/out`.

## Local Development

```bash
cd Develop
npm install
npm run dev -- --port 3001
```

Open http://127.0.0.1:3001.

## Verification Commands

```bash
cd Develop
npm run lint
npm run typecheck
npm run build
```
