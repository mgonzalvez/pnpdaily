import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, "posts");

async function main() {
  const files = await fs.readdir(POSTS_DIR);
  const markdownFiles = files.filter((name) => name.endsWith(".md")).sort();

  const posts = [];

  for (const fileName of markdownFiles) {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(POSTS_DIR, fileName);
    const raw = await fs.readFile(fullPath, "utf8");

    const parsed = parsePost(raw, slug);
    const html = renderPostHtml(parsed);

    await fs.writeFile(path.join(POSTS_DIR, `${slug}.html`), html, "utf8");
    posts.push(parsed);
  }

  posts.sort((a, b) => {
    const aTime = a.dateValue ?? 0;
    const bTime = b.dateValue ?? 0;
    if (aTime !== bTime) return bTime - aTime;
    return a.title.localeCompare(b.title);
  });

  await fs.writeFile(
    path.join(POSTS_DIR, "manifest.json"),
    JSON.stringify(
      posts.map(({ title, author, date, summary, slug }) => ({
        title,
        author,
        date,
        summary,
        slug
      })),
      null,
      2
    ) + "\n",
    "utf8"
  );

  await fs.writeFile(path.join(POSTS_DIR, "index.html"), renderPostsIndexHtml(posts), "utf8");

  console.log(`Built ${posts.length} post(s).`);
}

function parsePost(raw, slug) {
  const lines = raw.replace(/\r\n/g, "\n").split("\n");
  const title = (lines.find((line) => line.startsWith("# ")) || "# Untitled").replace(/^#\s+/, "").trim();

  const bylineLine = lines.find((line) => /^\*By\s+.+\|\s*.+\*$/.test(line.trim())) || "";
  const bylineMatch = bylineLine.trim().match(/^\*By\s+(.+?)\s*\|\s*(.+?)\*$/);
  const author = bylineMatch ? bylineMatch[1].trim() : "PnPDaily Team";
  const date = bylineMatch ? bylineMatch[2].trim() : "";
  const dateValue = date ? Date.parse(date) : NaN;

  const dividerIndex = lines.findIndex((line) => line.trim() === "---");
  const bodyLines = dividerIndex >= 0 ? lines.slice(dividerIndex + 1) : lines;
  const bodyMarkdown = bodyLines.join("\n").trim();
  const bodyHtml = markdownToHtml(bodyMarkdown);
  const summary = extractSummary(bodyMarkdown) || "Editorial update from the PnPDaily team.";

  return {
    title,
    author,
    date,
    dateValue: Number.isFinite(dateValue) ? dateValue : null,
    summary,
    slug,
    bodyHtml
  };
}

function extractSummary(markdown) {
  const lines = markdown.split("\n").map((line) => line.trim());
  for (const line of lines) {
    if (!line || line === "---" || line.startsWith("#") || /^[-*]\s+/.test(line) || /^\d+\.\s+/.test(line)) {
      continue;
    }
    const clean = stripMarkdown(line);
    if (!clean) continue;
    return clean.length > 200 ? `${clean.slice(0, 197)}...` : clean;
  }
  return "";
}

function stripMarkdown(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/\[(.+?)\]\((.+?)\)/g, "$1")
    .trim();
}

function markdownToHtml(markdown) {
  const lines = markdown.split("\n");
  const out = [];
  let paragraph = [];
  let listMode = null;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    out.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
    paragraph = [];
  };

  const closeList = () => {
    if (!listMode) return;
    out.push(listMode === "ol" ? "</ol>" : "</ul>");
    listMode = null;
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      closeList();
      continue;
    }

    if (line === "---") {
      flushParagraph();
      closeList();
      out.push("<hr>");
      continue;
    }

    const h2 = line.match(/^##\s+(.+)$/);
    if (h2) {
      flushParagraph();
      closeList();
      out.push(`<h2>${inlineMarkdown(h2[1])}</h2>`);
      continue;
    }

    const h3 = line.match(/^###\s+(.+)$/);
    if (h3) {
      flushParagraph();
      closeList();
      out.push(`<h3>${inlineMarkdown(h3[1])}</h3>`);
      continue;
    }

    const ol = line.match(/^\d+\.\s+(.+)$/);
    if (ol) {
      flushParagraph();
      if (listMode !== "ol") {
        closeList();
        out.push("<ol>");
        listMode = "ol";
      }
      out.push(`<li>${inlineMarkdown(ol[1])}</li>`);
      continue;
    }

    const ul = line.match(/^[-*]\s+(.+)$/);
    if (ul) {
      flushParagraph();
      if (listMode !== "ul") {
        closeList();
        out.push("<ul>");
        listMode = "ul";
      }
      out.push(`<li>${inlineMarkdown(ul[1])}</li>`);
      continue;
    }

    paragraph.push(line);
  }

  flushParagraph();
  closeList();
  return out.join("\n");
}

function inlineMarkdown(text) {
  const escaped = escapeHtml(text);
  return escaped
    .replace(/\[(.+?)\]\(((?:https?:\/\/|mailto:)[^\s)]+)\)/g, (match, label, href) => {
      if (href.startsWith("mailto:")) {
        return `<a href="${href}">${label}</a>`;
      }
      return `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`;
    })
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderPostHtml(post) {
  const safeDate = post.date ? ` | ${escapeHtml(post.date)}` : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(post.title)} | PnPDaily</title>
  <link rel="stylesheet" href="../styles.css">
</head>
<body>
  <div class="container">
    <header>
      <h1><span class="highlight">PnPDaily</span></h1>
      <p class="tagline">Editorial</p>
    </header>

    <section id="editorial">
      <div class="editorial-card" style="text-align:left;">
        <h2>${escapeHtml(post.title)}</h2>
        <p class="author">By ${escapeHtml(post.author)}${safeDate}</p>
        ${post.bodyHtml}
        <p style="margin-top: 1.5rem;">
          <a href="../index.html" class="read-more-btn">Back to Home</a>
        </p>
      </div>
    </section>
  </div>
</body>
</html>
`;
}

function renderPostsIndexHtml(posts) {
  const rows = posts
    .map(
      (post) => `
            <tr>
              <td style="padding:0.5rem;"><a href="${encodeURIComponent(post.slug)}.html">${escapeHtml(post.title)}</a></td>
              <td style="padding:0.5rem;">${escapeHtml(post.author)}</td>
              <td style="padding:0.5rem;">${escapeHtml(post.date || "")}</td>
            </tr>`
    )
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PnPDaily Articles</title>
  <link rel="stylesheet" href="../styles.css">
</head>
<body>
  <div class="container">
    <header>
      <div class="header-top">
        <h1><span class="highlight">PnPDaily</span> Articles</h1>
        <div class="header-actions">
          <a class="action-btn" href="../index.html">Home</a>
          <details class="community-menu">
            <summary class="action-btn solid">Join the Community</summary>
            <div class="community-menu-panel">
              <a href="https://facebook.com/groups/pnphideaway" target="_blank" rel="noopener noreferrer">PnP Hideaway</a>
              <a href="https://reddit.com/r/printandplay" target="_blank" rel="noopener noreferrer">r/printandplay</a>
              <a href="https://boardgamegeek.com/geeklist/374344/what-print-and-play-games-are-you-crafting-or-plan" target="_blank" rel="noopener noreferrer">BGG Crafting Geeklist</a>
            </div>
          </details>
        </div>
      </div>
      <p class="tagline">Editorial content from the print and play community</p>
    </header>

    <section id="editorial">
      <div class="editorial-card" style="text-align:left;">
        <h2>Featured Articles</h2>

        <table style="width:100%; border-collapse:collapse; margin-top:1rem;">
          <thead>
            <tr>
              <th style="text-align:left; border-bottom:1px solid var(--border-color); padding:0.5rem;">Article</th>
              <th style="text-align:left; border-bottom:1px solid var(--border-color); padding:0.5rem;">Author</th>
              <th style="text-align:left; border-bottom:1px solid var(--border-color); padding:0.5rem;">Date</th>
            </tr>
          </thead>
          <tbody>
${rows}
          </tbody>
        </table>

        <p style="margin-top: 1.5rem;">
          <a href="../index.html" class="read-more-btn">Back to Home</a>
        </p>
      </div>
    </section>
  </div>
</body>
</html>
`;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
