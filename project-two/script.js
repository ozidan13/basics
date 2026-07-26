// عناصر الواجهة
const modelButtons = document.querySelectorAll("[data-model]");
const colorButtons = document.querySelectorAll("[data-color]");
const patternButtons = document.querySelectorAll("[data-pattern]");
const nameInput = document.querySelector("#personal-name");
const decreaseButton = document.querySelector("#decrease");
const increaseButton = document.querySelector("#increase");
const resetButton = document.querySelector("#reset-customizer");
const addToCartButton = document.querySelector("#add-to-cart");

// قيم بسيطة بدل Data Model معقد في المستوى ده
let basePrice = 199;
let patternPrice = 25;
let quantity = 1;
let selectedModel = "iPhone 14 Pro";
let selectedColorName = "بنفسجي";
let selectedPatternName = "فرشات";

function selectButton(buttons, selectedButton) {
    buttons.forEach(function (button) {
        const isSelected = button === selectedButton;
        button.classList.toggle("is-selected", isSelected);
        button.setAttribute("aria-pressed", String(isSelected));
    });
}

function updateSummary() {
    const safeName = nameInput.value.trim() || "من غير اسم";
    const total = (basePrice + patternPrice) * quantity;

    document.querySelector("#summary-model").textContent = selectedModel;
    document.querySelector("#summary-color").textContent = selectedColorName;
    document.querySelector("#summary-pattern").textContent = selectedPatternName;
    document.querySelector("#summary-name").textContent = safeName;
    document.querySelector("#summary-quantity").textContent = quantity;
    document.querySelector("#quantity").textContent = quantity;
    document.querySelector("#total-price").textContent = total;
    document.querySelector("#name-count").textContent = nameInput.value.length;
    document.querySelector("#case-name").textContent = safeName;
    document.querySelector("#live-code").textContent = `color=${selectedColorName} · pattern=${selectedPatternName} · quantity=${quantity}`;

    decreaseButton.disabled = quantity === 1;
    increaseButton.disabled = quantity === 5;
}

modelButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        selectButton(modelButtons, button);
        selectedModel = button.dataset.model;
        basePrice = Number(button.dataset.price);
        updateSummary();
    });
});

colorButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        selectButton(colorButtons, button);
        selectedColorName = button.dataset.colorName;
        document.querySelector("#case-preview").style.setProperty("--case-color", button.dataset.color);
        document.querySelector("#summary-color-dot").style.backgroundColor = button.dataset.color;
        updateSummary();
    });
});

patternButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        selectButton(patternButtons, button);
        selectedPatternName = button.dataset.patternName;
        patternPrice = Number(button.dataset.patternPrice);

        const preview = document.querySelector("#case-preview");
        preview.classList.remove("pattern-dots", "pattern-brush", "pattern-lines");
        preview.classList.add(`pattern-${button.dataset.pattern}`);
        updateSummary();
    });
});

nameInput.addEventListener("input", updateSummary);

decreaseButton.addEventListener("click", function () {
    quantity = Math.max(1, quantity - 1);
    updateSummary();
});

increaseButton.addEventListener("click", function () {
    quantity = Math.min(5, quantity + 1);
    updateSummary();
});

addToCartButton.addEventListener("click", function () {
    document.querySelector("#customizer-status").textContent = `تمت إضافة ${quantity} قطعة من ${selectedModel} للسلة التجريبية.`;
});

resetButton.addEventListener("click", function () {
    const defaultModel = document.querySelector('[data-model="iPhone 14 Pro"]');
    const defaultColor = document.querySelector('[data-color-name="بنفسجي"]');
    const defaultPattern = document.querySelector('[data-pattern="brush"]');

    defaultModel.click();
    defaultColor.click();
    defaultPattern.click();
    nameInput.value = "Mazen";
    quantity = 1;
    document.querySelector("#customizer-status").textContent = "رجعنا كل الاختيارات للوضع الأساسي.";
    updateSummary();
    defaultModel.focus();
});

updateSummary();
