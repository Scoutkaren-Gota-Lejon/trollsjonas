# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Trollsjönäs is a Gatsby 5 website for a scout camp/cabin rental facility near Gothenburg, Sweden. The site is in Swedish. It is hosted at https://trollsjonas.gotalejon.org.

## Commands

- **Dev server:** `npm start` (runs on http://localhost:8000, GraphiQL at http://localhost:8000/___graphql)
- **Build:** `npm run build`
- **Clean:** `npm run clean` (clears Gatsby cache)
- **Format:** `npm run format` (prettier on src/**/*.{ts,tsx})
- **Typecheck:** `npm run typecheck` (runs tsc --noEmit)

Requires Node 24.

## Architecture

**Content-driven pages:** Markdown files in `content/` are transformed into pages via `gatsby-node.ts` using the `src/templates/page.tsx` template. Each markdown file's frontmatter controls title, menu order, keywords, and SEO description. The `onlyurl` frontmatter flag prevents page generation (used for menu-only links).

**Custom components in Markdown:** The `hast-util-to-jsx-runtime` library maps HTML tags in rendered markdown to React components:
- `<booking-form>` → `Boka.tsx` (booking inquiry form, POSTs to `/api/booking.php`)
- `<price-calc>` → `PriceCalc.tsx` (client-side price calculator)

**Backend:** A PHP API under `static/api/` handles the booking form email (via PHPMailer). Requires `static/api/settings.php` with SMTP credentials for local development.

**Styling:** Emotion (CSS-in-JS) + MUI v7 components. Global styles in `GlobalStyle.tsx`.

**Image galleries:** `src/pages/bilder/` pages use `react-photo-album` with image data sourced via GraphQL from `src/images/stugor/*/caption.json` files.

**API utilities:** `src/backend-api/utils.ts` provides fetch wrappers (`makeServerPost`, `makeServerRequest`, etc.) used by the booking form.


## Tests

Run tests before commit.