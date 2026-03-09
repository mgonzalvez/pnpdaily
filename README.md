# PnPDaily - Print & Play Daily Roundup

Fast static site for daily print-and-play highlights: rotating game/tip/tool spotlights, a featured editorial, and a paper-weight converter.

## Current Features

- Tip of the Day card (random, from `assets/tips.csv` if present, otherwise built-in defaults)
- PnP Game Spotlight card (random, from `assets/games.csv` if present, otherwise built-in defaults)
- Tool Spotlight card (random, from `assets/tools.csv` if present, otherwise built-in defaults)
- Featured Editorial card (latest post from `posts/manifest.json`, generated from Markdown)
- Paper Weight Converter widget (lb <-> gsm with Text/Book vs Cover paper types)
- Mobile responsive dark theme

## Content Sources

- `assets/tips.csv`
  - Headers: `Source,Content`
- `assets/games.csv`
  - Headers: `Name,Description,URL` (optional `Source`)
- `assets/tools.csv`
  - Headers: `Name,Description,URL`
- `posts/*.md`
  - Markdown editorial sources

If CSV files are missing or empty, homepage uses JavaScript fallback content from `assets/js/main.js`.

## Editorial Build Workflow

Editorial pages are generated from Markdown using:

```bash
node scripts/build-posts.mjs
```

This script generates:

- `posts/*.html` for each `posts/*.md`
- `posts/index.html` (article list)
- `posts/manifest.json` (metadata for homepage featured article)

Expected Markdown format:

```markdown
# Article Title

*By Author Name | March 8, 2026*

---

Article body...
```

## Deployment

GitHub Actions:

- `.github/workflows/deploy.yml`
  - Trigger: push to `main` + every 6 hours
  - Pulls latest CSV data from repository vars (if set)
  - Runs `node scripts/build-posts.mjs`
  - Deploys site to GitHub Pages

- `.github/workflows/fetch-sheets.yml`
  - Trigger: hourly
  - Fetches CSV from Google Sheets URLs into `assets/`
  - Commits only when CSV content changed

Repository variables required for sheet sync:

- `GOOGLE_TIPS_CSV_URL`
- `GOOGLE_GAMES_CSV_URL`
- `GOOGLE_TOOLS_CSV_URL`

## Local Development

No framework required.

1. Edit HTML/CSS/JS and/or `posts/*.md`
2. Run `node scripts/build-posts.mjs` after Markdown edits
3. Open `index.html` in a browser

## Project Structure

```bash
pnpdaily/
├── index.html
├── styles.css
├── app.js
├── assets/
│   ├── js/main.js
│   ├── tips.csv           # optional, generated/synced
│   ├── games.csv          # optional, generated/synced
│   └── tools.csv          # optional, generated/synced
├── posts/
│   ├── *.md               # source editorial content
│   ├── *.html             # generated editorial pages
│   ├── index.html         # generated article index
│   └── manifest.json      # generated metadata for homepage
├── scripts/
│   └── build-posts.mjs
└── .github/workflows/
    ├── deploy.yml
    └── fetch-sheets.yml
```

## Maintainer Notes

- Keep `posts/*.md` as source of truth for editorials.
- Re-run build script whenever Markdown articles change.
- Homepage dynamic behavior lives in `assets/js/main.js`.
- Converter logic lives in `app.js` using U.S. basis-size factors for Text/Book and Cover stocks.
