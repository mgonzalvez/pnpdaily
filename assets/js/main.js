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

const DEFAULT_CROWDFUNDING = [
    {
        title: "Pocket Civ Builder Campaign",
        description: "Compact civilization card game campaign offering print-and-play files for backers.",
        url: ""
    },
    {
        title: "Solo Dungeon Zine Launch",
        description: "Small-batch solo dungeon crawler with immediate PnP access during the campaign.",
        url: ""
    },
    {
        title: "Modular Skirmish Pack",
        description: "Terrain and card-driven skirmish project with printable rewards and stretch content.",
        url: ""
    }
];

const DEFAULT_SITES = [
    {
        name: "PnPFinder",
        description: "Search and discover worthwhile print-and-play games from around the hobby.",
        url: "http://pnpfinder.com"
    },
    {
        name: "PnP Launchpad",
        description: "Track current and upcoming print-and-play crowdfunding projects and promotions.",
        url: "https://launchpad.gonzhome.us"
    },
    {
        name: "PnPTools",
        description: "A directory of useful tools for printing, formatting, crafting, and prototyping PnP games.",
        url: "https://pnptools.gonzhome.us"
    },
    {
        name: "Martin's Card Prototyper",
        description: "Design quick card prototypes and export individual cards or print-ready sheets.",
        url: "https://prototyper.gonzhome.us"
    },
    {
        name: "Martin's Card Extractor",
        description: "Extract individual card images from PnP PDFs by drawing grids along card boundaries.",
        url: "https://extractor.gonzhome.us"
    },
    {
        name: "Martin's Card Formatter",
        description: "Lay out card images into properly formatted print-and-play PDF files.",
        url: "https://formatter.gonzhome.us"
    }
];

const DEFAULT_BUILDS = [
    {
        source: "hideaway",
        name: "Martin G.",
        title: "Bargain Basement Bathysphere",
        url: "http://pnpfinder.com",
        blurb: "I wanted something quick to print that still felt like a real campaign game."
    },
    {
        source: "hideaway",
        name: "Lena M.",
        title: "Mini Rogue",
        url: "http://pnpfinder.com",
        blurb: "I am keeping the build simple and focusing on clean cards and a sturdy tracker."
    },
    {
        source: "hideaway",
        name: "Carlos R.",
        title: "Voyages",
        url: "http://pnpfinder.com",
        blurb: "This one keeps hitting the sweet spot for me between easy setup and satisfying play."
    },
    {
        source: "reddit",
        name: "meeplepilot",
        title: "Utopia Engine",
        url: "http://pnpfinder.com",
        blurb: "I was in the mood for something compact, puzzly, and easy to get to the table."
    },
    {
        source: "reddit",
        name: "cardcraftingcat",
        title: "Gloomholdin'",
        url: "http://pnpfinder.com",
        blurb: "The challenge here is keeping the footprint tiny without the build feeling flimsy."
    },
    {
        source: "reddit",
        name: "hexandink",
        title: "Ragemore",
        url: "http://pnpfinder.com",
        blurb: "I like how much game this packs into a very manageable little print job."
    },
    {
        source: "bgg",
        name: "T. Warren",
        title: "Deck Hand Contest Entry",
        url: "https://boardgamegeek.com",
        blurb: "Still tightening the rules, but the core loop is finally starting to feel right."
    },
    {
        source: "bgg",
        name: "Maya L.",
        title: "9-Card Contest Prototype",
        url: "https://boardgamegeek.com",
        blurb: "I am trying to get the most out of the tiny format without making it feel cramped."
    },
    {
        source: "bgg",
        name: "RookDesigns",
        title: "Solo Adventure WIP",
        url: "https://boardgamegeek.com",
        blurb: "This is now fully playable, and I am mostly testing pacing and decision tension."
    }
];

const DEFAULT_GAMES = [
    {
        name: "Mini Rogue",
        designer: "Nuts! Publishing",
        source: "PnP Community Pick",
        description: "A compact solo dungeon crawl with fast setup and strong replayability.",
        url: ""
    },
    {
        name: "Bargain Basement Bathysphere",
        designer: "Scott Almes",
        source: "PnP Community Pick",
        description: "Solo campaign-style deep-sea dice game with free downloadable content.",
        url: ""
    },
    {
        name: "Utopia Engine",
        designer: "Matt Riddle",
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

    const [tips, tools, crowdfunding, sites, builds, games, contests, wips, pollResults, posts] = await Promise.all([
        loadTips(),
        loadTools(),
        loadCrowdfunding(),
        loadSites(),
        loadBuilds(),
        loadGames(),
        loadContests(),
        loadWips(),
        loadPollResults(),
        loadPostsManifest()
    ]);

    renderTip(getRandomItem(tips));
    renderTool(getRandomItem(tools));
    renderCrowdfunding(getRandomItem(crowdfunding));
    renderSites(sites);
    renderBuilds(builds);
    renderGame(getRandomItem(games));
    renderContests(contests);
    renderWips(getRandomItem(wips));
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

async function loadCrowdfunding() {
    try {
        const csv = await fetchCsv("assets/crowdfunding.csv");
        const parsed = parseCrowdfundingCsv(csv);
        return parsed.length ? parsed : DEFAULT_CROWDFUNDING;
    } catch (error) {
        console.log("Using default crowdfunding roundup:", error);
        return DEFAULT_CROWDFUNDING;
    }
}

async function loadSites() {
    try {
        const csv = await fetchCsv("assets/sites.csv");
        const parsed = parseSitesCsv(csv);
        return parsed.length ? parsed : DEFAULT_SITES;
    } catch (error) {
        console.log("Using default sites directory:", error);
        return DEFAULT_SITES;
    }
}

async function loadBuilds() {
    try {
        const csv = await fetchCsv("assets/builds.csv");
        const parsed = parseBuildsCsv(csv);
        return parsed.length ? parsed : DEFAULT_BUILDS;
    } catch (error) {
        console.log("Using default builds feed:", error);
        return DEFAULT_BUILDS;
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
            designer: getField(row, ["designer", "author"]).trim(),
            source: getField(row, ["source", "community", "subreddit"]).trim(),
            description: getField(row, ["description", "notes", "summary"]).trim(),
            url: getField(row, ["url", "link"]).trim()
        }))
        .filter((row) => row.name);
}

function parseSitesCsv(csvText) {
    return parseCsvRows(csvText)
        .map((row) => ({
            name: getField(row, ["name", "title", "site"]).trim(),
            description: getField(row, ["description", "summary", "notes"]).trim(),
            url: getField(row, ["url", "link"]).trim()
        }))
        .filter((row) => row.name);
}

function parseBuildsCsv(csvText) {
    return parseCsvRows(csvText)
        .map((row) => ({
            source: normalizeBuildSource(getField(row, ["source", "community", "1"]).trim()),
            name: getField(row, ["name", "username", "user"]).trim(),
            title: getField(row, ["title", "game", "name"]).trim(),
            url: getField(row, ["url", "link"]).trim(),
            blurb: getField(row, ["blurb", "quote", "description", "notes"]).trim()
        }))
        .filter((row) => row.source && row.name && row.title);
}

function parseCrowdfundingCsv(csvText) {
    return parseCsvRows(csvText)
        .map((row) => ({
            title: getField(row, ["title", "name", "project", "campaign"]).trim(),
            description: getField(row, ["description", "summary", "notes"]).trim(),
            url: getField(row, ["url", "link"]).trim()
        }))
        .filter((row) => row.title);
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
        <p>${safeUrl
            ? `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer"><strong>${safeName}</strong></a>`
            : `<strong>${safeName}</strong>`}</p>
        <p>${safeDescription}</p>
    `;
}

function renderGame(game) {
    const gameElement = document.getElementById("game-content");
    if (!gameElement || !game) {
        return;
    }

    const safeName = escapeHtml(game.name);
    const safeDesigner = game.designer ? escapeHtml(game.designer) : "Unknown designer";
    const safeDescription = game.description
        ? escapeHtml(game.description)
        : "Current community favorite worth checking out.";
    const safeUrl = game.url ? escapeHtml(game.url) : "";
    const titleMarkup = safeUrl
        ? `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer"><strong>${safeName}</strong></a>`
        : `<strong>${safeName}</strong>`;

    gameElement.innerHTML = `
        <p>${titleMarkup}, designed by <strong>${safeDesigner}</strong>.</p>
        <p>Powered by <a href="https://pnpfinder.com" target="_blank" rel="noopener noreferrer">PnPFinder.com</a></p>
        <p>${safeDescription}</p>
    `;
}

function renderSites(sites) {
    const sitesElement = document.getElementById("sites-content");
    if (!sitesElement) {
        return;
    }

    if (!sites.length) {
        sitesElement.innerHTML = `<p class="empty-content">No site entries available.</p>`;
        return;
    }

    sitesElement.innerHTML = sites.map((site) => {
        const safeName = escapeHtml(site.name);
        const safeDescription = site.description
            ? escapeHtml(site.description)
            : "Useful print-and-play site or tool.";
        const safeUrl = site.url ? escapeHtml(site.url) : "";

        return `
            <article class="card site-card">
                <h2>${safeUrl
                    ? `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer"><strong>${safeName}</strong></a>`
                    : `<strong>${safeName}</strong>`}</h2>
                <p>${safeDescription}</p>
            </article>
        `;
    }).join("");
}

function renderBuilds(builds) {
    const columns = {
        hideaway: document.getElementById("builds-hideaway"),
        reddit: document.getElementById("builds-reddit"),
        bgg: document.getElementById("builds-bgg")
    };

    if (!columns.hideaway || !columns.reddit || !columns.bgg) {
        return;
    }

    ["hideaway", "reddit", "bgg"].forEach((sourceKey) => {
        const sourceBuilds = getBuildsForSource(builds, sourceKey);
        columns[sourceKey].innerHTML = sourceBuilds.map((build, index) => renderBuildCard(build, index)).join("");
    });
}

function renderCrowdfunding(entry) {
    const crowdfundingElement = document.getElementById("crowdfunding-content");
    if (!crowdfundingElement) {
        return;
    }

    if (!entry) {
        crowdfundingElement.innerHTML = `<p class="empty-content">No crowdfunding entries available.</p>`;
        return;
    }

    const safeTitle = escapeHtml(entry.title);
    const safeDescription = entry.description
        ? escapeHtml(entry.description)
        : "Current print-and-play crowdfunding campaign worth checking out.";
    const safeUrl = entry.url ? escapeHtml(entry.url) : "";

    crowdfundingElement.innerHTML = `
        <p>
            ${safeUrl
                ? `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer"><strong>${safeTitle}</strong></a>`
                : `<strong>${safeTitle}</strong>`}
        </p>
        <p>${safeDescription}</p>
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

function renderWips(wip) {
    const wipsElement = document.getElementById("wips-content");
    if (!wipsElement) {
        return;
    }

    if (!wip) {
        wipsElement.innerHTML = `<p class="empty-content">No WIP entries available.</p>`;
        return;
    }

    const safeTitle = escapeHtml(wip.title);
    const safeDescription = wip.description
        ? escapeHtml(wip.description)
        : "Current community thread worth checking out.";
    const safeUrl = wip.url ? escapeHtml(wip.url) : "";

    wipsElement.innerHTML = `
        <p>
            ${safeUrl
                ? `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer"><strong>${safeTitle}</strong></a>`
                : `<strong>${safeTitle}</strong>`}
        </p>
        <p>${safeDescription}</p>
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

function getBuildsForSource(builds, sourceKey) {
    const primary = getRandomItems(
        builds.filter((build) => build.source === sourceKey),
        3
    );
    if (primary.length === 3) {
        return primary;
    }

    const fallbackPool = DEFAULT_BUILDS.filter((build) => build.source === sourceKey);
    const seenTitles = new Set(primary.map((build) => build.title));
    const fallbacks = fallbackPool
        .filter((build) => !seenTitles.has(build.title))
        .slice(0, 3 - primary.length);

    return [...primary, ...fallbacks];
}

function renderBuildCard(build, index) {
    const safeName = escapeHtml(build.name);
    const safeTitle = escapeHtml(build.title);
    const safeBlurb = escapeHtml(build.blurb || "Currently deep in the middle of the build.");
    const safeUrl = build.url ? escapeHtml(build.url) : "";
    const titleMarkup = safeUrl
        ? `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer"><strong>${safeTitle}</strong></a>`
        : `<strong>${safeTitle}</strong>`;

    const variants = [
        `${safeName} is crafting ${titleMarkup} and says "${safeBlurb}"`,
        `${safeName} is currently building ${titleMarkup}. Their take: "${safeBlurb}"`,
        `${safeName} has ${titleMarkup} on the table right now and says "${safeBlurb}"`,
        `Right now ${safeName} is working on ${titleMarkup}, saying "${safeBlurb}"`,
        `${safeName} is putting together ${titleMarkup} and says "${safeBlurb}"`
    ];

    return `
        <article class="build-card">
            <p>${variants[index % variants.length]}</p>
        </article>
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

function getRandomItems(array, count) {
    if (!array || !array.length) {
        return [];
    }

    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, Math.min(count, shuffled.length));
}

function normalizeBuildSource(source) {
    const value = String(source || "").trim().toLowerCase();

    if (value.includes("hideaway") || value.includes("facebook") || value === "fb") {
        return "hideaway";
    }

    if (value.includes("reddit") || value.includes("printandplay")) {
        return "reddit";
    }

    if (value.includes("bgg") || value.includes("boardgamegeek")) {
        return "bgg";
    }

    return "";
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
