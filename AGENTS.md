# PnPDaily Project - Developer Instructions

## Setup

### 1. Google Sheets (Tips, Games, Tools, Crowdfunding, Contests, WIPs, and Poll Results)

Create seven Google Sheets or tabs and publish each tab as CSV.

Tips sheet headers:

```text
Title,Source,Content
```

Tools sheet headers:

```text
Name,Description,URL
```

Games sheet headers:

```text
Name,Description,URL
```

Crowdfunding sheet headers:

```text
Title,Description,URL
```

Contests sheet headers:

```text
Title,Description,URL
```

WIPs sheet headers:

```text
Title,Description,URL
```

Poll results sheet headers:

```text
Option,Votes
```

Publish steps:

1. File -> Share -> Publish to web
2. Choose the tab
3. Export as CSV
4. Copy URL

Access requirement:

1. Set the sheet sharing to `Anyone with the link can view`
2. Confirm the CSV URL works in an incognito browser window
3. Prefer direct export URLs:

```text
https://docs.google.com/spreadsheets/d/<SHEET_ID>/export?format=csv&gid=<TAB_GID>
```

### 2. GitHub Repository Variables

In `Settings -> Secrets and variables -> Actions`, add:

- `GOOGLE_TIPS_CSV_URL`
- `GOOGLE_GAMES_CSV_URL`
- `GOOGLE_TOOLS_CSV_URL`
- `GOOGLE_CROWDFUNDING_CSV_URL`
- `GOOGLE_CONTESTS_CSV_URL`
- `GOOGLE_WIPS_CSV_URL`
- `GOOGLE_POLL_RESULTS_CSV_URL`

## Content Workflow

### Editorial Articles

Use Markdown files in `/posts` as source content.

1. Create `posts/<slug>.md`
2. Use this format:

```markdown
# Article Title

*By Author Name | March 8, 2026*

---

Article body...
```

3. Regenerate editorial outputs:

```bash
node scripts/build-posts.mjs
```

This creates/updates:

- `posts/<slug>.html`
- `posts/index.html`
- `posts/manifest.json`

Homepage reads `posts/manifest.json` and shows the latest article.

### Tips/Games/Tools/Crowdfunding/Contests/WIPs/Poll Updates

Edit rows in Google Sheets. The deploy workflow fetches `assets/tips.csv`, `assets/games.csv`, `assets/tools.csv`, `assets/crowdfunding.csv`, `assets/contests.csv`, `assets/wips.csv`, and `assets/poll-results.csv` hourly and republishes the site automatically.

## Runtime Behavior

On homepage load:

1. `assets/js/main.js` tries to load `assets/tips.csv`, `assets/games.csv`, `assets/tools.csv`, `assets/crowdfunding.csv`, `assets/contests.csv`, `assets/wips.csv`, and `assets/poll-results.csv`
2. If CSV files are unavailable/invalid, built-in defaults are used
3. Game, tip, tool, crowdfunding, and WIP entries are selected randomly per page load; contests render the current contest rows from the sheet; poll results are tallied from the published results sheet
4. `posts/manifest.json` is loaded and latest editorial is shown
5. `app.js` runs lb <-> gsm conversion with Text/Book vs Cover paper type selection

## Deployment Workflows

- `deploy.yml`
  - Runs on push to `main` and hourly
  - Fetches Google Sheets CSV (when URLs are configured)
  - Runs `node scripts/build-posts.mjs`
  - Publishes to GitHub Pages

## Key Files

- `index.html` - homepage layout
- `styles.css` - theme and responsive styles
- `assets/js/main.js` - rotating content + editorial feature logic
- `app.js` - paper-weight converter
- `scripts/build-posts.mjs` - Markdown -> HTML/manifest generator
- `posts/*.md` - editorial source files

## Troubleshooting

### Content not refreshing

1. Verify CSV URLs are valid, public, and work without Google login
2. Check Actions runs for `deploy.yml`
3. Hard refresh browser cache

### Editorial card/link issues

1. Run `node scripts/build-posts.mjs`
2. Confirm `posts/manifest.json` exists and includes expected slug
3. Confirm corresponding `posts/<slug>.html` exists

### Converter issues

Use browser console:

```javascript
console.log("Converter loaded:", typeof convertPaperWeight === 'function');
```

## Maintenance Checklist

- Add/update tips in Google Sheets
- Add/update games in Google Sheets
- Add/update tools in Google Sheets
- Add/update crowdfunding entries in Google Sheets
- Add/update contests in Google Sheets
- Add/update WIPs in Google Sheets
- Add/update poll results in Google Sheets/Form pipeline
- Add/edit editorial Markdown in `/posts`
- Run post build script after Markdown changes
- Verify deploy workflow status after push

---

*Last updated: March 8, 2026 | Maintained by PnP Daily Team*
