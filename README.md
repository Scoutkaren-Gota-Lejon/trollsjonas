# Trollsjönäs

Astro-webbplats för Scoutkåren Göta Lejons friluftsgård Trollsjönäs.

[https://trollsjonas.gotalejon.org](https://trollsjonas.gotalejon.org)

### Setup

* node 24
* `npm install`
* Skapa `public/api/settings.php` (gitignorerad):

```php
<?php

$SMTP_USERNAME = "";
$SMTP_PASSWORD = "";
```

* `npm start` — utvecklingsserver på http://localhost:4321

### Kommandon

| Kommando | Gör |
| --- | --- |
| `npm start` / `npm run dev` | Utvecklingsserver |
| `npm run build` | Produktionsbygge till `dist/` |
| `npm run serve` | Förhandsvisa bygget (kör i bakgrunden på macOS — stoppa med `npx astro preview stop`) |
| `npm run lint` | ESLint + Prettier-kontroll |
| `npm run typecheck` | `astro check` |
| `npm test` | Enhetstester (Vitest) |
| `npm run test:e2e` | E2E-tester (Playwright) |
| `npm run clean` | Rensa `dist/` och `.astro/` |

## Publicera ändringar

Push till `develop` bygger och deployar automatiskt via GitHub Actions
(`.github/workflows/build.yml`), som speglar `dist/` till
`trollsjonas.gotalejon.org/public_html/` över SFTP.

Manuellt, om det behövs:

1. Gör ändringen.
2. Testa med `npm start`.
3. Bygg med `npm run build`.
4. Ersätt innehållet i `trollsjonas.gotalejon.org/public_html/` på webbhotellet
   med innehållet i `dist/` — utom `api/settings.php`, som bara finns på servern.

## Struktur

* `content/` — sidinnehåll som Markdown/MDX, en fil per sida
* `src/pages/` — routing; `[...slug].astro` genererar sidorna från `content/`
* `src/components/` — `.astro` för statiskt, `.tsx` för de tre interaktiva öarna
* `src/images/` — bilder, optimeras vid bygget av `astro:assets`
* `public/` — filer som kopieras rakt igenom, inklusive PHP-API:t under `api/`
