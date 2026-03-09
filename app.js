// Paper Weight Converter
// Factors derived from standard U.S. basis sizes:
// Text/Book: 25x38 in (950 in^2), Cover: 20x26 in (520 in^2)
// gsm = lb * (1406.5 / basisArea)
const GSM_PER_LB = {
    text: 1406.5 / 950,
    cover: 1406.5 / 520
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

document.addEventListener("DOMContentLoaded", initConverter);
