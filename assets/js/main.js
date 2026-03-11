const DEFAULT_TIPS = [
    { title: "Cleaner folds", source: "r/printandplay", content: "Use a bone folder for crisp folding - score first, fold over a ruler edge." },
    { title: "Longer-lasting cards", source: "Martin's PnP Hideaway", content: "Laminating cards in sleeves before mounting to cardstock extends longevity significantly." },
    { title: "Test before full print", source: "BGG Geeklists", content: "Color test print all pages on regular printer before committing to the final print run." },
    { title: "Keep a test kit", source: "r/printandplay", content: "Keep a small test kit of paper stocks, adhesives, and blades for quick prototyping." },
    { title: "Use alignment marks", source: "Martin's PnP Hideaway", content: "Use alignment marks on front/back prints to cut cleaner double-sided cards." }
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

const POLL_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSe4btzJ_XPS5Y7rxlTc7ST9KI7QAdbspm8Ai86QxYbgM0SVEA/viewform?usp=publish-editor";
const POLL_STORAGE_KEY = "pnp_poll_voted";

const DEFAULT_POLL_RESULTS = [
    {
        option: "3x3 card grid - duplex format",
        votes: 0
    },
    {
        option: "Gutterfold - foldable format",
        votes: 0
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

    const [tips, tools, games, contests, wips, pollResults, posts] = await Promise.all([
        loadTips(),
        loadTools(),
        loadGames(),
        loadContests(),
        loadWips(),
        loadPollResults(),
        loadPostsManifest()
    ]);

    renderTip(getRandomItem(tips));
    renderTool(getRandomItem(tools));
    renderGame(getRandomItem(games));
    renderContests(contests);
    renderWip(getRandomItem(wips));
    renderPoll(pollResults);
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

async function loadPollResults() {
    try {
        const csv = await fetchCsv("assets/poll-results.csv");
        const parsed = parsePollResultsCsv(csv);
        return parsed.length ? parsed : DEFAULT_POLL_RESULTS;
    } catch (error) {
        console.log("Using default poll results:", error);
        return DEFAULT_POLL_RESULTS;
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
            title: getField(row, ["title"]).trim(),
            source: getField(row, ["source"]).trim(),
            content: getField(row, ["content", "tip"]).trim()
        }))
        .filter((row) => row.title && row.content);
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

function parsePollResultsCsv(csvText) {
    return parseCsvRows(csvText)
        .map((row) => ({
            option: getField(row, ["option", "choice", "answer"]).trim(),
            votes: Number(getField(row, ["votes", "count", "total"]).trim() || 0)
        }))
        .filter((row) => row.option);
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
        <p><strong>${escapeHtml(tip.title)}</strong></p>
        <p>${escapeHtml(tip.content)}</p>
        ${tip.source ? `<p><strong>Source:</strong> ${escapeHtml(tip.source)}</p>` : ""}
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

function renderContests(contests) {
    const contestsElement = document.getElementById("contests-content");
    if (!contestsElement) {
        return;
    }

    if (!contests.length) {
        contestsElement.innerHTML = `<p class="empty-content">No contest entries available.</p>`;
        return;
    }

    contestsElement.innerHTML = contests.map((contest) => {
        const safeTitle = escapeHtml(contest.title);
        const safeUrl = contest.url ? escapeHtml(contest.url) : "";

        return `
            <p>
                ${safeUrl
                    ? `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer"><strong>${safeTitle}</strong></a>`
                    : `<strong>${safeTitle}</strong>`}
            </p>
        `;
    }).join("");
}

function renderWip(wip) {
    const wipsElement = document.getElementById("wips-content");
    if (!wipsElement) {
        return;
    }

    wipsElement.innerHTML = wip
        ? renderFeedCardMarkup("Notable WIP Thread", wip, "View thread")
        : `<p class="empty-content">No WIP entries available.</p>`;
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

function renderPoll(results) {
    const pollElement = document.getElementById("poll-content");
    if (!pollElement) {
        return;
    }

    const hasVoted = localStorage.getItem(POLL_STORAGE_KEY) === "true";
    const totalVotes = results.reduce((sum, item) => sum + (Number.isFinite(item.votes) ? item.votes : 0), 0);
    const optionButtons = DEFAULT_POLL_RESULTS.map((item) => `
        <button class="poll-option-btn" data-option="${escapeAttribute(item.option)}" ${hasVoted ? "disabled" : ""}>
            ${escapeHtml(item.option)}
        </button>
    `).join("");

    const resultsMarkup = results.map((item) => {
        const votes = Number.isFinite(item.votes) ? item.votes : 0;
        const pct = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
        return `
            <div class="poll-result-row">
                <div class="poll-result-head">
                    <span><strong>${escapeHtml(item.option)}</strong></span>
                    <span>${pct}%</span>
                </div>
                <div class="poll-bar">
                    <div class="poll-bar-fill" style="width: ${pct}%"></div>
                </div>
                <p class="poll-vote-count">${votes} vote${votes === 1 ? "" : "s"}</p>
            </div>
        `;
    }).join("");

    pollElement.innerHTML = `
        <p><strong>Which print and play card file format do you prefer?</strong></p>
        <div class="poll-options">${optionButtons}</div>
        <div class="community-block">
            <p class="feed-label">Current Results</p>
            ${resultsMarkup}
            <p class="poll-total"><strong>Total votes:</strong> ${totalVotes}</p>
            <p><a href="${escapeAttribute(POLL_FORM_URL)}" target="_blank" rel="noopener noreferrer">${hasVoted ? "Vote again in Google Form" : "Open poll form"}</a></p>
        </div>
    `;

    pollElement.querySelectorAll(".poll-option-btn").forEach((button) => {
        button.addEventListener("click", () => {
            localStorage.setItem(POLL_STORAGE_KEY, "true");
            window.open(POLL_FORM_URL, "_blank", "noopener,noreferrer");
            renderPoll(results);
        });
    });
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

function escapeAttribute(text) {
    return String(text || "")
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}
