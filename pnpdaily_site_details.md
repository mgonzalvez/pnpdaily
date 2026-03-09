# PnPDaily Site Details

## Vision

- Static GitHub Pages site for daily print-and-play highlights.
- Quick homepage scan: rotating tip, rotating tool, featured editorial, converter widget.

## Implemented Architecture (March 8, 2026)

- Frontend: `index.html`, `styles.css`, `app.js`, `assets/js/main.js`
- Data inputs:
  - `assets/tips.csv`
  - `assets/tools.csv`
  - `posts/manifest.json`
- Editorial source of truth: `posts/*.md`
- Editorial build generator: `scripts/build-posts.mjs`

## Content Flow

1. Homepage loads.
2. Main script fetches CSV data for tips/tools and falls back to defaults when needed.
3. Main script fetches `posts/manifest.json` and renders latest editorial.
4. Converter script handles grams/oz/lbs conversion with localStorage unit memory.

## Automation Flow

- `deploy.yml`
  - Push to `main` + 6-hour schedule
  - Pull CSV from repo variables
  - Build posts from Markdown
  - Deploy to GitHub Pages

- `fetch-sheets.yml`
  - Hourly CSV refresh from Google Sheets
  - Commit only on changes

## Work Log

### March 8, 2026

- Stabilized homepage script wiring (`assets/js/main.js` now loaded by `index.html`).
- Replaced placeholder data-loading behavior with real CSV parsing + fallback defaults.
- Added `posts/manifest.json` loading for homepage editorial card.
- Added Markdown-to-HTML generator (`scripts/build-posts.mjs`).
- Generated editorial outputs (`posts/index.html`, `posts/mini-conversion.html`, `posts/manifest.json`).
- Updated deploy workflow to run editorial build before publishing.
- Updated fetch workflow to avoid empty commits.
- Corrected and synchronized documentation (`README.md`, `AGENTS.md`).

### March 9, 2026

- Reworked homepage layout into four top half-size widgets:
  - PnP Game Spotlight
  - Paper Weight Converter
  - Tip of the Day
  - Tool Spotlight
- Moved editorial feature below widgets as a full-width section.
- Added game spotlight data flow from `assets/games.csv` with fallback defaults.
- Added `GOOGLE_GAMES_CSV_URL` support in deploy and sheet-fetch workflows.
