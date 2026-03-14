# PnPDaily - Print & Play Daily Roundup

Fast static site for print-and-play highlights: rotating homepage widgets, a featured editorial, print utilities, a lightweight community poll, a live crafting roundup, and a linked directory of Martin's other PnP sites.

## Current Features

- Tip of the Day card (random, from `assets/tips.csv` if present, otherwise built-in defaults)
- PnP Game Spotlight card (random, from `assets/games.csv` if present, otherwise built-in defaults)
- Tool Spotlight card (random, from `assets/tools.csv` if present, otherwise built-in defaults)
- `PnP Crowdfunding Roundup` card (1 random entry from `assets/crowdfunding.csv`, with built-in defaults)
- `What PnP Games Are People Crafting Right Now?` section (9 compact build cards from `assets/builds.csv`, grouped by PnP Hideaway, Reddit, and BGG)
- `Martin's PnP Sites` page (directory cards from `assets/sites.csv`, with built-in defaults)
- `BGG Contests` card (current entries from `assets/contests.csv`, with built-in defaults)
- `Notable BGG Work-in-Progress Thread` card (1 random entry from `assets/wips.csv`, with built-in defaults)
- `PnP Community Poll` card (Google Form vote flow with results from `assets/poll-results.csv`)
- Featured Editorial card (latest post from `posts/manifest.json`, generated from Markdown)
- Paper Weight Converter widget (lb <-> gsm with Text/Book vs Cover paper types)
- Card Dimensions widget (popular card sizes in inches and millimeters)
- Header community dropdown and linked community footer
- Mobile responsive dark theme

## Content Sources

- `assets/tips.csv`
  - Headers: `Title,Source,Content`
- `assets/games.csv`
  - Headers: `Name,Designer,Description,URL` (optional `Source`)
- `assets/tools.csv`
  - Headers: `Name,Description,URL`
- `assets/sites.csv`
  - Headers: `Name,Description,URL`
- `assets/builds.csv`
  - Headers: `Source,Name,Title,URL,Blurb`
- `assets/contests.csv`
  - Headers: `Title,Ends,Description,URL`
- `assets/crowdfunding.csv`
  - Headers: `Title,Description,URL`
- `assets/wips.csv`
  - Headers: `Title,Designer,Description,URL`
- `assets/poll-results.csv`
  - Headers: `Option,Votes`
- `posts/*.md`
  - Markdown editorial sources

If CSV files are missing or empty, the homepage and sites directory page use JavaScript fallback content from `assets/js/main.js`.

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
  - Trigger: push to `main` + hourly schedule
  - Pulls latest CSV data from repository vars (if set)
  - Runs `node scripts/build-posts.mjs`
  - Deploys site to GitHub Pages

Repository variables required for sheet sync:

- `GOOGLE_TIPS_CSV_URL`
- `GOOGLE_GAMES_CSV_URL`
- `GOOGLE_TOOLS_CSV_URL`
- `GOOGLE_CROWDFUNDING_CSV_URL`
- `GOOGLE_SITES_CSV_URL`
- `GOOGLE_BUILDS_CSV_URL`
- `GOOGLE_CONTESTS_CSV_URL`
- `GOOGLE_WIPS_CSV_URL`
- `GOOGLE_POLL_RESULTS_CSV_URL`

Google Sheets access requirement:

- Each sheet/tab used for CSV export must be shared as `Anyone with the link can view`
- The CSV URL must work in an incognito browser window without logging into Google
- Prefer direct export URLs in this format:
  `https://docs.google.com/spreadsheets/d/<SHEET_ID>/export?format=csv&gid=<TAB_GID>`

## Local Development

No framework required.

1. Edit HTML/CSS/JS and/or `posts/*.md`
2. Run `node scripts/build-posts.mjs` after Markdown edits
3. Open `index.html` and `sites.html` in a browser

## Project Structure

```bash
pnpdaily/
├── index.html
├── sites.html
├── styles.css
├── favicon.svg
├── app.js
├── assets/
│   ├── js/main.js
│   ├── tips.csv           # optional, generated/synced
│   ├── games.csv          # optional, generated/synced
│   ├── tools.csv          # optional, generated/synced
│   ├── crowdfunding.csv   # optional, generated/synced
│   ├── sites.csv          # optional, generated/synced
│   ├── builds.csv         # optional, generated/synced
│   ├── contests.csv       # optional, generated/synced
│   ├── wips.csv           # optional, generated/synced
│   └── poll-results.csv   # optional, generated/synced
├── posts/
│   ├── *.md               # source editorial content
│   ├── *.html             # generated editorial pages
│   ├── index.html         # generated article index
│   └── manifest.json      # generated metadata for homepage
├── scripts/
│   └── build-posts.mjs
└── .github/workflows/
    └── deploy.yml
```

## Maintainer Notes

- Keep `posts/*.md` as source of truth for editorials.
- Re-run build script whenever Markdown articles change.
- Homepage dynamic behavior lives in `assets/js/main.js`.
- The sites directory page also uses `assets/js/main.js`.
- Converter logic lives in `app.js` using U.S. basis-size factors for Text/Book and Cover stocks.
