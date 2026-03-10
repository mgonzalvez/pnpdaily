const DEFAULT_TIPS = [
    { source: "r/printandplay", content: "Use a bone folder for crisp folding - score first, fold over a ruler edge." },
    { source: "Martin's PnP Hideaway", content: "Laminating cards in sleeves before mounting to cardstock extends longevity significantly." },
    { source: "BGG Geeklists", content: "Color test print all pages on regular printer before committing to the final print run." },
    { source: "r/printandplay", content: "Keep a small test kit of paper stocks, adhesives, and blades for quick prototyping." },
    { source: "Martin's PnP Hideaway", content: "Use alignment marks on front/back prints to cut cleaner double-sided cards." }
];

const DEFAULT_TOOLS = [
    { name: "Inkscape", description: "Free vector graphics software for editing templates and creating custom PnP assets.", url: "https://inkscape.org/" },
    { name: "GIMP", description: "Free raster image editor for resizing art, cleanup, and print prep.", url: "https://www.gimp.org/" },
    { name: "Canva", description: "Quick design workspace for labels, tuckboxes, and overlays.", url: "https://www.canva.com/" },
    { name: "Blender", description: "3D modeling software for printable miniatures and terrain.", url: "https://www.blender.org/" }
];

const DEFAULT_GAMES = [
    {
        name: "Mini Rogue",
        source: "PnP Community Pick",
        description: "A compact solo dungeon crawl with fast setup and strong replayability.",
        url: ""
    },
    {
        name: "Bargain Basement Bathysphere",
        source: "PnP Community Pick",
        description: "Solo campaign-style deep-sea dice game with free downloadable content.",
        url: ""
    },
    {
        name: "Utopia Engine",
        source: "PnP Community Pick",
        description: "Classic roll-and-write puzzle game that is quick to print and teach.",
        url: ""
    }
];

const DEFAULT_CONTESTS = [
    {
        title: "Monthly Solo Design Challenge",
        description: "Community print-and-play design prompt with voting and build logs.",
        url: ""
    }
];

const DEFAULT_WIPS = [
    {
        title: "Pocket Card Battler Prototype",
        description: "A compact deck-driven combat prototype currently being iterated in public.",
        url: ""
    }
];

const DEFAULT_ARTICLES = [
    {
        title: "The Art of Miniature PnP Conversion",
        author: "Alex Chen",
        date: "March 7, 2026",
        summary: "Exploring how print and play gamers are pushing the boundaries of miniatures through innovative materials and techniques.",
        slug: "mini-conversion"
    }
];

window.addEventListener("DOMContentLoaded", async () => {
    renderEditorial(getRandomItem(DEFAULT_ARTICLES));

    const [tips, tools, games, contests, wips, posts] = await Promise.all([
        loadTips(),
        loadTools(),
        loadGames(),
        loadContests(),
        loadWips(),
        loadPostsManifest()
    ]);

    renderTip(getRandomItem(tips));
    renderTool(getRandomItem(tools));
    renderGame(getRandomItem(games));
    renderCommunityFeed(getRandomItem(contests), getRandomItem(wips));
    if (posts.length) {
        renderEditorial(posts[0]);
    }
});

async function loadTips() {
    try {
        const csv = await fetchCsv("assets/tips.csv");
        const parsed = parseTipsCsv(csv);
        return parsed.length ? parsed : DEFAULT_TIPS;
    } catch (error) {
        console.log("Using default tips:", error);
        return DEFAULT_TIPS;
    }
}

async function loadTools() {
    try {
        const csv = await fetchCsv("assets/tools.csv");
        const parsed = parseToolsCsv(csv);
        return parsed.length ? parsed : DEFAULT_TOOLS;
    } catch (error) {
        console.log("Using default tools:", error);
        return DEFAULT_TOOLS;
    }
}

async function loadGames() {
    try {
        const csv = await fetchCsv("assets/games.csv");
        const parsed = parseGamesCsv(csv);
        return parsed.length ? parsed : DEFAULT_GAMES;
    } catch (error) {
        console.log("Using default games:", error);
        return DEFAULT_GAMES;
    }
}

async function loadContests() {
    try {
        const csv = await fetchCsv("assets/contests.csv");
        const parsed = parseContestCsv(csv);
        return parsed.length ? parsed : DEFAULT_CONTESTS;
    } catch (error) {
        console.log("Using default contests:", error);
        return DEFAULT_CONTESTS;
    }
}

async function loadWips() {
    try {
        const csv = await fetchCsv("assets/wips.csv");
        const parsed = parseWipCsv(csv);
        return parsed.length ? parsed : DEFAULT_WIPS;
    } catch (error) {
        console.log("Using default WIPs:", error);
        return DEFAULT_WIPS;
    }
}

async function fetchCsv(path) {
    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) {
        throw new Error(`Failed to fetch ${path}: ${response.status}`);
    }
    return response.text();
}

async function loadPostsManifest() {
    try {
        const response = await fetch("posts/manifest.json", { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Failed to fetch posts/manifest.json: ${response.status}`);
        }

        const posts = await response.json();
        if (!Array.isArray(posts)) {
            return [];
        }

        return posts.filter((post) => (
            post
            && typeof post.slug === "string"
            && typeof post.title === "string"
            && typeof post.author === "string"
            && typeof post.summary === "string"
            && typeof post.date === "string"
        ));
    } catch (error) {
        console.log("Using default editorial article:", error);
        return [];
    }
}

function parseTipsCsv(csvText) {
    return parseCsvRows(csvText)
        .map((row) => ({
            source: getField(row, ["source"]).trim(),
            content: getField(row, ["content", "tip"]).trim()
        }))
        .filter((row) => row.source && row.content);
}

function parseToolsCsv(csvText) {
    return parseCsvRows(csvText)
        .map((row) => ({
            name: getField(row, ["name", "tool", "title"]).trim(),
            description: getField(row, ["description", "summary", "notes"]).trim(),
            url: getField(row, ["url", "link"]).trim()
        }))
        .filter((row) => row.name && row.description);
}

function parseGamesCsv(csvText) {
    return parseCsvRows(csvText)
        .map((row) => ({
            name: getField(row, ["name", "game", "title"]).trim(),
            source: getField(row, ["source", "community", "subreddit"]).trim(),
            description: getField(row, ["description", "notes", "summary"]).trim(),
            url: getField(row, ["url", "link"]).trim()
        }))
        .filter((row) => row.name);
}

function parseContestCsv(csvText) {
    return parseCsvRows(csvText)
        .map((row) => ({
            title: getField(row, ["title", "name", "contest"]).trim(),
            description: getField(row, ["description", "summary", "notes"]).trim(),
            url: getField(row, ["url", "link"]).trim()
        }))
        .filter((row) => row.title);
}

function parseWipCsv(csvText) {
    return parseCsvRows(csvText)
        .map((row) => ({
            title: getField(row, ["title", "name", "wip", "thread"]).trim(),
            description: getField(row, ["description", "summary", "notes"]).trim(),
            url: getField(row, ["url", "link"]).trim()
        }))
        .filter((row) => row.title);
}

function parseCsvRows(csvText) {
    const lines = csvText
        .replace(/\r\n/g, "\n")
        .replace(/\r/g, "\n")
        .split("\n")
        .filter((line) => line.trim().length);

    if (lines.length < 2) {
        return [];
    }

    const headers = splitCsvLine(lines[0]).map((header) => normalizeHeader(header));

    return lines.slice(1).map((line) => {
        const values = splitCsvLine(line);
        const row = {};
        headers.forEach((header, index) => {
            row[header] = (values[index] || "").trim();
        });
        return row;
    });
}

function splitCsvLine(line) {
    const values = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i += 1) {
        const char = line[i];
        const next = line[i + 1];

        if (char === "\"" && next === "\"" && inQuotes) {
            current += "\"";
            i += 1;
            continue;
        }

        if (char === "\"") {
            inQuotes = !inQuotes;
            continue;
        }

        if (char === "," && !inQuotes) {
            values.push(current);
            current = "";
            continue;
        }

        current += char;
    }

    values.push(current);
    return values;
}

function normalizeHeader(header) {
    return String(header || "")
        .replace(/^\uFEFF/, "")
        .trim()
        .toLowerCase();
}

function getField(row, keys) {
    for (const key of keys) {
        if (typeof row[key] === "string") {
            return row[key];
        }
    }
    return "";
}

function renderTip(tip) {
    const tipElement = document.getElementById("tip-content");
    if (!tipElement || !tip) {
        return;
    }

    tipElement.innerHTML = `
        <p><strong>From:</strong> ${escapeHtml(tip.source)}</p>
        <p>${escapeHtml(tip.content)}</p>
    `;
}

function renderTool(tool) {
    const toolsElement = document.getElementById("tools-content");
    if (!toolsElement || !tool) {
        return;
    }

    const safeName = escapeHtml(tool.name);
    const safeDescription = escapeHtml(tool.description);
    const safeUrl = tool.url ? escapeHtml(tool.url) : "";

    toolsElement.innerHTML = `
        <p><strong>${safeName}</strong></p>
        <p>${safeDescription}</p>
        ${safeUrl ? `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer">Check out tool</a>` : ""}
    `;
}

function renderGame(game) {
    const gameElement = document.getElementById("game-content");
    if (!gameElement || !game) {
        return;
    }

    const safeName = escapeHtml(game.name);
    const safeDescription = game.description
        ? escapeHtml(game.description)
        : "Current community favorite worth checking out.";
    const safeUrl = game.url ? escapeHtml(game.url) : "";

    gameElement.innerHTML = `
        <p><strong>${safeName}</strong></p>
        <p>Powered by <a href="https://pnpfinder.com" target="_blank" rel="noopener noreferrer">PnPFinder.com</a></p>
        <p>${safeDescription}</p>
        ${safeUrl ? `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer">View game</a>` : ""}
    `;
}

function renderCommunityFeed(contest, wip) {
    const communityElement = document.getElementById("community-content");
    if (!communityElement) {
        return;
    }

    const contestMarkup = contest
        ? renderFeedCardMarkup("Ongoing Contest", contest, "View contest")
        : `<p class="empty-content">No contest entries available.</p>`;

    const wipMarkup = wip
        ? renderFeedCardMarkup("Notable WIP Thread", wip, "View thread")
        : `<p class="empty-content">No WIP entries available.</p>`;

    communityElement.innerHTML = `
        <div class="community-block">${contestMarkup}</div>
        <div class="community-block">${wipMarkup}</div>
    `;
}

function renderFeedCardMarkup(sectionLabel, item, linkLabel) {
    const safeTitle = escapeHtml(item.title);
    const safeDescription = item.description
        ? escapeHtml(item.description)
        : "Current community thread worth checking out.";
    const safeUrl = item.url ? escapeHtml(item.url) : "";

    return `
        <p class="feed-label">${escapeHtml(sectionLabel)}</p>
        <p><strong>${safeTitle}</strong></p>
        <p>${safeDescription}</p>
        ${safeUrl ? `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer">${linkLabel}</a>` : ""}
    `;
}

function renderEditorial(article) {
    const editorialElement = document.getElementById("editorial-content");
    if (!editorialElement || !article) {
        return;
    }

    editorialElement.innerHTML = `
        <div class="editorial-card">
            <h2>${escapeHtml(article.title)}</h2>
            <p class="author">By ${escapeHtml(article.author)} | ${escapeHtml(article.date)}</p>
            <p class="summary">${escapeHtml(article.summary)}</p>
            <a href="posts/${encodeURIComponent(article.slug)}.html" class="read-more-btn">Read Full Article</a>
        </div>
    `;
}

function getRandomItem(array) {
    if (!array || !array.length) {
        return null;
    }
    return array[Math.floor(Math.random() * array.length)];
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = String(text || "");
    return div.innerHTML;
}
