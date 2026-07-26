const STORAGE_KEY = "codehub-expense-tracker-v1";
const ALLOWED_TYPES = ["income", "expense"];
const CATEGORY_LABELS = {
    salary: "راتب",
    freelance: "عمل حر",
    food: "أكل",
    transport: "مواصلات",
    bills: "فواتير",
    shopping: "مشتريات",
    entertainment: "ترفيه",
    other: "أخرى"
};

const currencyFormatter = new Intl.NumberFormat("ar-EG", {
    style: "currency",
    currency: "EGP",
    minimumFractionDigits: 2
});

let transactions = [];
let editingId = null;

const form = document.querySelector("#transaction-form");
const descriptionInput = document.querySelector("#description");
const amountInput = document.querySelector("#amount");
const typeInput = document.querySelector("#type");
const categoryInput = document.querySelector("#category");
const dateInput = document.querySelector("#date");
const typeFilter = document.querySelector("#type-filter");
const categoryFilter = document.querySelector("#category-filter");
const list = document.querySelector("#transaction-list");
const formError = document.querySelector("#form-error");
const appStatus = document.querySelector("#app-status");

function isValidTransaction(item) {
    return Boolean(
        item &&
        typeof item.id === "string" &&
        typeof item.description === "string" &&
        item.description.trim().length >= 2 &&
        Number.isFinite(item.amount) &&
        item.amount > 0 &&
        ALLOWED_TYPES.includes(item.type) &&
        Object.hasOwn(CATEGORY_LABELS, item.category) &&
        /^\d{4}-\d{2}-\d{2}$/.test(item.date)
    );
}

function loadTransactions() {
    const storedValue = localStorage.getItem(STORAGE_KEY);
    if (!storedValue) return [];

    try {
        const parsedValue = JSON.parse(storedValue);
        if (!Array.isArray(parsedValue) || !parsedValue.every(isValidTransaction)) {
            throw new Error("Invalid transaction schema");
        }
        return parsedValue;
    } catch (error) {
        appStatus.textContent = "البيانات المحفوظة كانت غير صالحة، فبدأنا بقائمة آمنة وفاضية.";
        localStorage.removeItem(STORAGE_KEY);
        return [];
    }
}

function saveTransactions() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    } catch (error) {
        appStatus.textContent = "التغيير ظهر، لكن المتصفح مقدرش يحفظه محلياً.";
    }
}

function createId() {
    if (globalThis.crypto && typeof globalThis.crypto.randomUUID === "function") {
        return globalThis.crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getFormValues() {
    return {
        description: descriptionInput.value.trim(),
        amount: Number(amountInput.value),
        type: typeInput.value,
        category: categoryInput.value,
        date: dateInput.value
    };
}

function validateForm(values) {
    if (values.description.length < 2) return "اكتب وصف من حرفين على الأقل.";
    if (!Number.isFinite(values.amount) || values.amount <= 0) return "اكتب مبلغ صحيح أكبر من صفر.";
    if (!ALLOWED_TYPES.includes(values.type)) return "اختار نوع عملية صحيح.";
    if (!Object.hasOwn(CATEGORY_LABELS, values.category)) return "اختار فئة صحيحة.";
    if (!/^\d{4}-\d{2}-\d{2}$/.test(values.date)) return "اختار تاريخ صحيح.";
    return "";
}

function getFilteredTransactions() {
    return transactions
        .filter(function (item) {
            return typeFilter.value === "all" || item.type === typeFilter.value;
        })
        .filter(function (item) {
            return categoryFilter.value === "all" || item.category === categoryFilter.value;
        })
        .sort(function (a, b) {
            return b.date.localeCompare(a.date);
        });
}

function createActionButton(label, action, id, className) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = className;
    button.dataset.action = action;
    button.dataset.id = id;
    button.textContent = label;
    return button;
}

function createTransactionRow(item) {
    const row = document.createElement("li");
    row.className = `transaction-row ${item.type}`;

    const date = document.createElement("time");
    date.dateTime = item.date;
    date.textContent = item.date;

    const description = document.createElement("strong");
    description.textContent = item.description;

    const category = document.createElement("span");
    category.className = "category-tag";
    category.textContent = CATEGORY_LABELS[item.category];

    const type = document.createElement("span");
    type.className = "type-tag";
    type.textContent = item.type === "income" ? "دخل ↑" : "مصروف ↓";

    const amount = document.createElement("b");
    amount.className = "transaction-amount";
    amount.textContent = currencyFormatter.format(item.amount);

    const actions = document.createElement("div");
    actions.className = "row-actions";
    actions.append(
        createActionButton("تعديل", "edit", item.id, "edit-button"),
        createActionButton("حذف", "delete", item.id, "delete-button")
    );

    row.append(date, description, category, type, amount, actions);
    return row;
}

function renderSummary() {
    const incomeItems = transactions.filter(function (item) { return item.type === "income"; });
    const expenseItems = transactions.filter(function (item) { return item.type === "expense"; });
    const income = incomeItems.reduce(function (total, item) { return total + item.amount; }, 0);
    const expense = expenseItems.reduce(function (total, item) { return total + item.amount; }, 0);

    document.querySelector("#balance-total").textContent = currencyFormatter.format(income - expense);
    document.querySelector("#income-total").textContent = currencyFormatter.format(income);
    document.querySelector("#expense-total").textContent = currencyFormatter.format(expense);
    document.querySelector("#income-count").textContent = incomeItems.length;
    document.querySelector("#expense-count").textContent = expenseItems.length;
}

function renderTransactions() {
    const filteredTransactions = getFilteredTransactions();
    list.replaceChildren(...filteredTransactions.map(createTransactionRow));

    document.querySelector("#visible-count").textContent = filteredTransactions.length;
    document.querySelector("#total-count").textContent = transactions.length;
    document.querySelector("#empty-state").hidden = transactions.length !== 0;
    document.querySelector("#no-results-state").hidden = transactions.length === 0 || filteredTransactions.length !== 0;
    document.querySelector(".list-head").hidden = filteredTransactions.length === 0;
}

function renderApp() {
    renderSummary();
    renderTransactions();
}

function resetForm() {
    form.reset();
    editingId = null;
    document.querySelector("#form-title").textContent = "إضافة عملية جديدة";
    document.querySelector("#form-mode").textContent = "وضع الإضافة";
    document.querySelector("#save-transaction").textContent = "حفظ العملية";
    document.querySelector("#cancel-edit").hidden = true;
    dateInput.value = new Date().toISOString().slice(0, 10);
    formError.textContent = "";
}

function startEditing(id) {
    const transaction = transactions.find(function (item) { return item.id === id; });
    if (!transaction) return;

    editingId = id;
    descriptionInput.value = transaction.description;
    amountInput.value = transaction.amount;
    typeInput.value = transaction.type;
    categoryInput.value = transaction.category;
    dateInput.value = transaction.date;
    document.querySelector("#form-title").textContent = "تعديل العملية";
    document.querySelector("#form-mode").textContent = "وضع التعديل";
    document.querySelector("#save-transaction").textContent = "حفظ التعديل";
    document.querySelector("#cancel-edit").hidden = false;
    formError.textContent = "";
    descriptionInput.focus();
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const values = getFormValues();
    const errorMessage = validateForm(values);

    if (errorMessage) {
        formError.textContent = errorMessage;
        return;
    }

    if (editingId) {
        transactions = transactions.map(function (item) {
            return item.id === editingId ? { id: item.id, ...values } : item;
        });
        appStatus.textContent = "تم حفظ تعديل العملية بنجاح.";
    } else {
        transactions.push({ id: createId(), ...values });
        appStatus.textContent = "تمت إضافة العملية بنجاح.";
    }

    saveTransactions();
    resetForm();
    renderApp();
    descriptionInput.focus();
});

list.addEventListener("click", function (event) {
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    if (button.dataset.action === "edit") {
        startEditing(button.dataset.id);
        return;
    }

    if (button.dataset.action === "delete") {
        transactions = transactions.filter(function (item) { return item.id !== button.dataset.id; });
        if (editingId === button.dataset.id) resetForm();
        saveTransactions();
        renderApp();
        appStatus.textContent = "تم حذف العملية.";
        descriptionInput.focus();
    }
});

document.querySelector("#cancel-edit").addEventListener("click", function () {
    resetForm();
    appStatus.textContent = "تم إلغاء التعديل من غير تغيير البيانات.";
    descriptionInput.focus();
});

typeFilter.addEventListener("change", renderTransactions);
categoryFilter.addEventListener("change", renderTransactions);

document.querySelector("#clear-filters").addEventListener("click", function () {
    typeFilter.value = "all";
    categoryFilter.value = "all";
    renderTransactions();
    typeFilter.focus();
});

dateInput.value = new Date().toISOString().slice(0, 10);
transactions = loadTransactions();
renderApp();
