// Paper Weight Converter
// Factors derived from standard U.S. basis sizes:
// Text/Book: 25x38 in (950 in^2), Cover: 20x26 in (520 in^2)
// gsm = lb * (1406.5 / basisArea)
const GSM_PER_LB = {
    text: 1406.5 / 950,
    cover: 1406.5 / 520
};

const CARD_SIZES = {
    poker: {
        inches: "2.5 x 3.5",
        mm: "63.5 x 88.9"
    },
    tarot: {
        inches: "2.75 x 4.75",
        mm: "70 x 120"
    },
    jumbo: {
        inches: "3.5 x 5",
        mm: "88.9 x 127"
    },
    bridge: {
        inches: "2.25 x 3.5",
        mm: "57.2 x 88.9"
    },
    euro: {
        inches: "2.32 x 3.62",
        mm: "58.9 x 91.9"
    },
    domino: {
        inches: "1.75 x 3.5",
        mm: "44.5 x 88.9"
    },
    mini: {
        inches: "1.625 x 2.5",
        mm: "41 x 63"
    },
    miniEuropean: {
        inches: "1.6875 x 2.625",
        mm: "44 x 68"
    },
    micro: {
        inches: "1.25 x 1.75",
        mm: "31.8 x 44.5"
    }
};

function initConverter() {
    const input = document.getElementById("weight-input");
    const paperType = document.getElementById("paper-type-select");
    const inputUnit = document.getElementById("input-unit-select");

    if (!input || !paperType || !inputUnit) {
        return;
    }

    const savedPaperType = localStorage.getItem("pnp_paper_type");
    const savedInputUnit = localStorage.getItem("pnp_input_unit");

    if (savedPaperType && GSM_PER_LB[savedPaperType]) {
        paperType.value = savedPaperType;
    }
    if (savedInputUnit === "lb" || savedInputUnit === "gsm") {
        inputUnit.value = savedInputUnit;
    }

    input.addEventListener("input", convertPaperWeight);
    paperType.addEventListener("change", () => {
        localStorage.setItem("pnp_paper_type", paperType.value);
        convertPaperWeight();
    });
    inputUnit.addEventListener("change", () => {
        localStorage.setItem("pnp_input_unit", inputUnit.value);
        convertPaperWeight();
    });

    convertPaperWeight();
}

function initCardDimensions() {
    const select = document.getElementById("card-size-select");
    const imperial = document.getElementById("card-size-imperial");
    const metric = document.getElementById("card-size-metric");

    if (!select || !imperial || !metric) {
        return;
    }

    const savedCardSize = localStorage.getItem("pnp_card_size");
    if (savedCardSize && CARD_SIZES[savedCardSize]) {
        select.value = savedCardSize;
    }

    const render = () => {
        const selected = CARD_SIZES[select.value] || CARD_SIZES.poker;
        imperial.textContent = selected.inches;
        metric.textContent = selected.mm;
        localStorage.setItem("pnp_card_size", select.value);
    };

    select.addEventListener("change", render);
    render();
}

function convertPaperWeight() {
    const input = document.getElementById("weight-input");
    const paperType = document.getElementById("paper-type-select");
    const inputUnit = document.getElementById("input-unit-select");
    const result = document.getElementById("converted-result");
    const label = document.getElementById("converted-label");

    if (!input || !paperType || !inputUnit || !result || !label) {
        return;
    }

    const value = Number(input.value);
    if (!Number.isFinite(value) || value <= 0) {
        result.textContent = "";
        label.textContent = "";
        return;
    }

    const factor = GSM_PER_LB[paperType.value];
    const typeLabel = paperType.value === "cover" ? "cover" : "text/book";

    if (inputUnit.value === "lb") {
        const gsm = value * factor;
        result.textContent = formatValue(gsm);
        label.textContent = `gsm (${typeLabel})`;
    } else {
        const lb = value / factor;
        result.textContent = formatValue(lb);
        label.textContent = `lb ${typeLabel}`;
    }
}

function formatValue(num) {
    if (num >= 100) return num.toFixed(0);
    if (num >= 10) return num.toFixed(1);
    return num.toFixed(2).replace(/\.?0+$/, "");
}

function initBGGGenerator() {
    const startId = document.getElementById("bgg-start-id");
    const count = document.getElementById("bgg-count");
    const direction = document.getElementById("bgg-direction");
    const size = document.getElementById("bgg-size");
    const inline = document.getElementById("bgg-inline");
    const output = document.getElementById("bgg-output");
    const status = document.getElementById("bgg-status");

    if (!startId || !count || !direction || !size || !inline || !output || !status) {
        return;
    }

    const savedStartId = localStorage.getItem("pnp_bgg_start_id");
    const savedCount = localStorage.getItem("pnp_bgg_count");
    const savedDirection = localStorage.getItem("pnp_bgg_direction");
    const savedSize = localStorage.getItem("pnp_bgg_size");
    const savedInline = localStorage.getItem("pnp_bgg_inline");

    if (savedStartId && Number(savedStartId) >= 1) {
        startId.value = savedStartId;
    }
    if (savedCount && Number(savedCount) >= 1) {
        count.value = savedCount;
    }
    if (savedDirection && (savedDirection === "up" || savedDirection === "down")) {
        direction.value = savedDirection;
    }
    if (savedSize && ["thumb", "small", "medium", "large", "original"].includes(savedSize)) {
        size.value = savedSize;
    }
    if (savedInline !== null) {
        inline.checked = savedInline === "true";
    }

    function generate() {
        const start = Number(startId.value);
        const qty = Number(count.value);
        const dir = direction.value;
        const sz = size.value;
        const isInline = inline.checked;

        if (!Number.isInteger(start) || start < 1) {
            status.textContent = "Enter a valid starting image ID.";
            status.style.color = "var(--accent)";
            return;
        }
        if (!Number.isInteger(qty) || qty < 1 || qty > 1000) {
            status.textContent = "Enter a count between 1 and 1000.";
            status.style.color = "var(--accent)";
            return;
        }

        const step = dir === "up" ? 1 : -1;
        const separator = isInline ? " " : "\n";
        const tags = [];

        for (let i = 0; i < qty; i++) {
            const id = start + (i * step);
            if (id < 1) break;
            tags.push(`[imageid=${id} ${sz} inline]`);
        }

        output.value = tags.join(separator);
        status.textContent = `Generated ${tags.length} image tags.`;
        status.style.color = "";
    }

    async function copyOutput() {
        if (!output.value) generate();

        try {
            await navigator.clipboard.writeText(output.value);
            status.textContent = "Copied to clipboard.";
        } catch {
            output.select();
            document.execCommand("copy");
            status.textContent = "Copied to clipboard.";
        }
    }

    startId.addEventListener("input", () => {
        localStorage.setItem("pnp_bgg_start_id", startId.value);
    });
    count.addEventListener("input", () => {
        localStorage.setItem("pnp_bgg_count", count.value);
    });
    direction.addEventListener("change", () => {
        localStorage.setItem("pnp_bgg_direction", direction.value);
    });
    size.addEventListener("change", () => {
        localStorage.setItem("pnp_bgg_size", size.value);
    });
    inline.addEventListener("change", () => {
        localStorage.setItem("pnp_bgg_inline", inline.checked);
    });

    document.getElementById("bgg-generate").addEventListener("click", generate);
    document.getElementById("bgg-copy").addEventListener("click", copyOutput);
    document.getElementById("bgg-clear").addEventListener("click", () => {
        output.value = "";
        status.textContent = "";
    });

    generate();
}

document.addEventListener("DOMContentLoaded", () => {
    initConverter();
    initCardDimensions();
    initBGGGenerator();
});
