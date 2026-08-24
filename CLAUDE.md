# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Trollsjönäs is an Astro 7 website for a scout camp/cabin rental facility near Gothenburg, Sweden. The site is in Swedish. It is hosted at https://trollsjonas.gotalejon.org.

## Commands

- **Dev server:** `npm start` (runs on http://localhost:4321)
- **Build:** `npm run build` (outputs to `dist/`)
- **Preview:** `npm run serve` (daemonizes on macOS, foreground on Linux; stop with `npx astro preview stop`)
- **Clean:** `npm run clean` (removes `dist/` and `.astro/`)
- **Format:** `npm run format` (prettier on src/**/*.{ts,tsx,astro})
- **Lint:** `npm run lint` (eslint + prettier --check)
- **Typecheck:** `npm run typecheck` (runs astro check)

Requires Node 24.

## Architecture

**Content-driven pages:** Markdown/MDX files in `content/` are loaded by the `pages` content collection (`src/content.config.ts`) and rendered by `src/pages/[...slug].astro`. Each file's frontmatter controls title, menu order, keywords, and SEO description. The `onlyurl` flag excludes an entry from page generation while keeping its menu label and SEO data — used by `bilder.md` and `stugor.md`, whose routes are hand-authored.

**Interactive islands:** Only three components ship JavaScript; every other page is zero-JS. Pages embedding one are `.mdx` and import it directly:
- `content/kontakt.mdx` → `Boka.tsx` (booking inquiry form, POSTs to `/api/booking.php`)
- `content/hyra.mdx` → `PriceCalc.tsx` (client-side price calculator)
- `bilder/[gallery].astro` → `Bilder.tsx` (photo album + lightbox; owns lightbox state only, images are resolved at build time)

**Backend:** A PHP API under `public/api/` handles the booking form email (via PHPMailer). Requires `public/api/settings.php` with SMTP credentials for local development; it is gitignored, excluded from the deploy mirror, and denied by `public/.htaccess`.

**Styling:** Tailwind v4 (via `@tailwindcss/vite`) for components, plus `src/styles/global.css` for base typography. Markdown content is styled with element selectors rather than Tailwind's `prose`, to preserve the original typographic scale. Form inputs are local components in `src/components/form/`; dates use a native `<input type="date">`, so the browser provides the calendar, keyboard entry and locale-appropriate display.

**Image galleries:** `src/pages/bilder/[gallery].astro` serves all five galleries. It globs `src/images/stugor/*/*.jpg` once, optimizes via `getImage()`, and reads captions from the adjacent `caption.json` (matched on image basename). Gallery URL slugs deliberately differ from their folder names — the mapping lives in `src/galleries.ts` and must not be changed without breaking existing URLs.

**Deployment:** `dist/` is mirrored to Apache shared hosting over SFTP by `.github/workflows/build.yml` on push to `develop`. Output must stay fully static — no adapter, no Node server. `public/.htaccess` carries redirects, caching, and compression rules.

**E2E server:** Playwright serves `dist/` with `e2e/static-server.js`, not `astro preview` — the latter daemonizes on macOS but stays in the foreground on Linux, so it hangs CI as a `webServer.command`. The static server reproduces the two behaviours the specs rely on: directory URLs resolve to `index.html`, and unknown paths return `404.html` with a real 404 status.

**API utilities:** `src/backend-api/utils.ts` provides fetch wrappers (`makeServerPost`, `makeServerRequest`, etc.) used by the booking form.


## Tests

Run tests before commit.