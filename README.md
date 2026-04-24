# PnPDaily - Print & Play Daily Roundup

Fast static site for print-and-play highlights: rotating homepage widgets, featured editorial, print utilities, community poll, live crafting roundup, and a directory of Martin's PnP sites.

## Project Structure

```
pnpdaily/
├── index.html          # Homepage with rotating widgets
├── sites.html          # Martin's PnP Sites directory
├── styles.css          # Theme and responsive styles
├── app.js              # Paper Weight Converter + Card Dimensions widgets
├── assets/
│   ├── js/main.js      # Rotating content logic + editorial feature
│   └── data.json       # All data (tips, tools, games, crowdfunding, sites, builds, contests, wips, poll, articles)
├── posts/              # Editorial Markdown → HTML (run `node scripts/build-posts.mjs`)
├── drafts/             # Unpublished editorial drafts
├── scripts/
│   └── build-posts.mjs # Markdown to HTML/manifest generator
└── .github/workflows/
    └── deploy.yml      # GitHub Actions: push to main + hourly
```

## Data Source

`assets/data.json` is the single source of truth. All homepage widgets read from it. If it's missing or invalid, `assets/js/main.js` falls back to built-in defaults.

JSON structure:

| Section | Fields |
|---------|--------|
| `tips` | `title`, `source`, `content` |
| `tools` | `name`, `description`, `url` |
| `games` | `name`, `designer`, `source`, `description`, `url` |
| `crowdfunding` | `title`, `description`, `url` |
| `sites` | `name`, `description`, `url` |
| `builds` | `source`, `name`, `title`, `url`, `blurb` |
| `contests` | `title`, `ends`, `description`, `url` |
| `wips` | `title`, `designer`, `description`, `url` |
| `poll` | `option`, `votes` |
| `articles` | `title`, `author`, `date`, `summary`, `slug` |

## Content Workflow

### Updating Data

Provide the data and the agent will update `assets/data.json` and `assets/js/main.js` (both must stay in sync).

### Editorial Posts

1. Create `posts/<slug>.md` with format:

```markdown
# Article Title

*By Author Name | March 8, 2026*

---

Article body...
```

2. Run `node scripts/build-posts.mjs`
3. To publish a draft: move from `drafts/` to `posts/`, then rebuild

Use [VOICE.md](VOICE.md) as the writing style reference.

## Maintenance

- Update `assets/data.json` with new content
- Run `node scripts/build-posts.mjs` after Markdown changes
- Verify `index.html` and `sites.html` after layout changes
- Check deploy workflow status after push
