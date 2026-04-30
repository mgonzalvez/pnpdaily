const POLL_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeHGc4YCSyQal-4M-lF8wzR7j_xPUKmPv-vIDyaYIQK-PYSzw/viewform?usp=publish-editor";
const POLL_STORAGE_KEY = "pnp_poll_voted";

window.addEventListener("DOMContentLoaded", async () => {
    const isSitesPage = document.getElementById("sites-content") !== null;

    if (isSitesPage) {
        const sites = await loadSites();
        renderSites(sites);
        return;
    }

    const data = await loadData();

    const tips = data.tips || [];
    const tools = data.tools || [];
    const crowdfunding = data.crowdfunding || [];
    const builds = data.builds || [];
    const games = data.games || [];
    const contests = data.contests || [];
    const wips = data.wips || [];
    const pollResults = data.poll || [];
    const posts = await loadPostsManifest();

    renderTip(getRandomItem(tips));
    renderTool(getRandomItem(tools));
    renderCrowdfunding(getRandomItem(crowdfunding));
    renderBuilds(builds);
    renderGame(getRandomItem(games));
    renderContests(contests);
    renderWips(getRandomItem(wips));
    renderPoll(pollResults);
    if (posts.length) {
        renderEditorial(posts[0]);
    }
});

async function loadData() {
    try {
        const response = await fetch("assets/data.json", { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Failed to fetch assets/data.json: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.log("Using default data:", error);
        return {};
    }
}

async function loadSites() {
    try {
        const data = await loadData();
        const parsed = data.sites || [];
        return parsed;
    } catch (error) {
        console.log("No sites directory available:", error);
        return [];
    }
}

async function loadTips() {
    try {
        const data = await loadData();
        const parsed = data.tips || [];
        return parsed;
    } catch (error) {
        console.log("No tips available:", error);
        return [];
    }
}

async function loadTools() {
    try {
        const data = await loadData();
        const parsed = data.tools || [];
        return parsed;
    } catch (error) {
        console.log("No tools available:", error);
        return [];
    }
}

async function loadGames() {
    try {
        const data = await loadData();
        const parsed = data.games || [];
        return parsed;
    } catch (error) {
        console.log("No games available:", error);
        return [];
    }
}

async function loadCrowdfunding() {
    try {
        const data = await loadData();
        const parsed = data.crowdfunding || [];
        return parsed;
    } catch (error) {
        console.log("No crowdfunding data available:", error);
        return [];
    }
}

async function loadBuilds() {
    try {
        const data = await loadData();
        const parsed = data.builds || [];
        return parsed;
    } catch (error) {
        console.log("No builds data available:", error);
        return [];
    }
}

async function loadContests() {
    try {
        const data = await loadData();
        const parsed = data.contests || [];
        return parsed;
    } catch (error) {
        console.log("No contests data available:", error);
        return [];
    }
}

async function loadWips() {
    try {
        const data = await loadData();
        const parsed = data.wips || [];
        return parsed;
    } catch (error) {
        console.log("No WIPs data available:", error);
        return [];
    }
}

async function loadPollResults() {
    try {
        const data = await loadData();
        const parsed = data.poll || [];
        return parsed;
    } catch (error) {
        console.log("No poll results available:", error);
        return [];
    }
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

    const sorted = [...contests].sort((a, b) => {
        const da = Date.parse(a.ends);
        const db = Date.parse(b.ends);
        if (Number.isNaN(da)) return 1;
        if (Number.isNaN(db)) return -1;
        return da - db;
    });

    contestsElement.innerHTML = sorted.map((contest) => {
        const safeTitle = escapeHtml(contest.title);
        const safeUrl = contest.url ? escapeHtml(contest.url) : "";
        const formattedEnds = formatContestEndDate(contest.ends);

        return `
            <p>
                ${safeUrl
                    ? `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer"><strong>${safeTitle}</strong></a>`
                    : `<strong>${safeTitle}</strong>`}
                ${formattedEnds ? `<span class="contest-end-date"> · ends ${escapeHtml(formattedEnds)}</span>` : ""}
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
    const safeDesigner = wip.designer ? escapeHtml(wip.designer) : "Unknown designer";
    const safeDescription = wip.description
        ? escapeHtml(wip.description)
        : "Current community thread worth checking out.";
    const safeUrl = wip.url ? escapeHtml(wip.url) : "";
    const titleMarkup = safeUrl
        ? `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer"><strong>${safeTitle}</strong></a>`
        : `<strong>${safeTitle}</strong>`;

    wipsElement.innerHTML = `
        <p>${titleMarkup}, designed by <strong>${safeDesigner}</strong>.</p>
        <p>${safeDescription}</p>
    `;
}

function getBuildsForSource(builds, sourceKey) {
    return getRandomItems(
        builds.filter((build) => build.source === sourceKey),
        3
    );
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
    const optionButtons = results.length ? results.map((item) => `
        <button class="poll-option-btn" data-option="${escapeAttribute(item.option)}" ${hasVoted ? "disabled" : ""}>
            ${escapeHtml(item.option)}
        </button>
    `).join("") : `<p class="empty-content">No poll options available.</p>`;

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
        <p><strong>Do you prefer print and play card files with bleed or without bleed?</strong></p>
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

function isContestActive(ends) {
    const value = String(ends || "").trim();
    if (!value) {
        return true;
    }

    const dateValue = Date.parse(value);
    if (Number.isNaN(dateValue)) {
        return true;
    }

    const contestDate = new Date(dateValue);
    contestDate.setHours(23, 59, 59, 999);
    return contestDate.getTime() >= Date.now();
}

function formatContestEndDate(ends) {
    const value = String(ends || "").trim();
    if (!value) {
        return "";
    }

    const dateValue = Date.parse(value);
    if (Number.isNaN(dateValue)) {
        return value;
    }

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    }).format(new Date(dateValue));
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
