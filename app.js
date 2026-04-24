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

document.addEventListener("DOMContentLoaded", () => {
    initConverter();
    initCardDimensions();
});
