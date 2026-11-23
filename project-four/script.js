// 1) البيانات الثابتة
const STORAGE_KEY = "codehub-egypt-trip-planner-v1";
const destinations = [
    { id: "siwa", name: "سيوة", region: "western", regionLabel: "مطروح", category: "nature", categoryLabel: "طبيعة واسترخاء", budget: 650, rating: 4.8, duration: 3, art: "art-siwa", description: "واحة هادية وسط الصحراء، عيون مياه وبيوت طينية وغروب صعب تنساه." },
    { id: "luxor", name: "الأقصر", region: "upper", regionLabel: "صعيد مصر", category: "history", categoryLabel: "تاريخ وآثار", budget: 700, rating: 4.9, duration: 4, art: "art-luxor", description: "متحف مفتوح فيه المعابد والمقابر والنيل، ومكان أساسي لأي حد بيحب التاريخ." },
    { id: "dahab", name: "دهب", region: "sinai", regionLabel: "جنوب سيناء", category: "adventure", categoryLabel: "بحر ومغامرة", budget: 550, rating: 4.7, duration: 4, art: "art-dahab", description: "بحر صافي وجبال وأنشطة غطس، مع جو بسيط ومريح يناسب الرحلات الشبابية." },
    { id: "alexandria", name: "الإسكندرية", region: "coast", regionLabel: "الساحل الشمالي", category: "culture", categoryLabel: "بحر ومدينة", budget: 600, rating: 4.4, duration: 2, art: "art-alex", description: "مشي على البحر، مكتبة ومتاحف وأكل بحري في مدينة ليها روح مختلفة." },
    { id: "aswan", name: "أسوان", region: "upper", regionLabel: "صعيد مصر", category: "culture", categoryLabel: "ثقافة ونيل", budget: 580, rating: 4.8, duration: 3, art: "art-aswan", description: "نيل هادي وقرى نوبية وألوان دافية، مناسبة لرحلة بطيئة مليانة تفاصيل." },
    { id: "cairo", name: "القاهرة التاريخية", region: "coast", regionLabel: "القاهرة", category: "history", categoryLabel: "تاريخ ومدينة", budget: 750, rating: 4.5, duration: 2, art: "art-cairo", description: "شوارع قديمة ومساجد وأسواق وحكايات في كل زاوية من قلب العاصمة." },
    { id: "white-desert", name: "الصحراء البيضاء", region: "western", regionLabel: "الواحات", category: "adventure", categoryLabel: "تخييم ومغامرة", budget: 500, rating: 4.7, duration: 2, art: "art-desert", description: "تكوينات طباشيرية غريبة وسماء مليانة نجوم وتجربة تخييم مختلفة تماماً." },
    { id: "ras-mohamed", name: "رأس محمد", region: "sinai", regionLabel: "جنوب سيناء", category: "nature", categoryLabel: "بحر وطبيعة", budget: 620, rating: 4.9, duration: 2, art: "art-ras", description: "محمية بحرية بشعاب مرجانية ومياه واضحة، مثالية للسنوركلينج والهدوء." }
];

const currency = new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP", maximumFractionDigits: 0 });

// 2) الحالة الحالية
const state = {
    activeView: "discover",
    search: "",
    region: "all",
    category: "all",
    sort: "recommended",
    favorites: [],
    itinerary: [],
    editingTripId: null
};

// 3) عناصر DOM
const viewButtons = document.querySelectorAll("[data-view]");
const viewPanels = document.querySelectorAll("[data-panel]");
const destinationResults = document.querySelector("#destination-results");
const favoriteResults = document.querySelector("#favorite-results");
const tripStops = document.querySelector("#trip-stops");
const globalStatus = document.querySelector("#global-status");
const dialog = document.querySelector("#destination-dialog");
const itineraryForm = document.querySelector("#itinerary-form");
let dialogDestinationId = null;
let lastDialogTrigger = null;

// 4) التخزين والتحقق
function isValidTrip(item) {
    return Boolean(
        item &&
        typeof item.id === "string" &&
        destinations.some(function (destination) { return destination.id === item.destinationId; }) &&
        /^\d{4}-\d{2}-\d{2}$/.test(item.startDate) &&
        Number.isInteger(item.days) && item.days >= 1 && item.days <= 30 &&
        Number.isInteger(item.travelers) && item.travelers >= 1 && item.travelers <= 10 &&
        typeof item.note === "string" && item.note.length <= 120
    );
}

function loadSavedState() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    try {
        const parsed = JSON.parse(stored);
        const validFavorites = Array.isArray(parsed.favorites) && parsed.favorites.every(function (id) {
            return destinations.some(function (destination) { return destination.id === id; });
        });
        const validItinerary = Array.isArray(parsed.itinerary) && parsed.itinerary.every(isValidTrip);
        if (!validFavorites || !validItinerary) throw new Error("Invalid saved schema");

        state.favorites = [...new Set(parsed.favorites)];
        state.itinerary = parsed.itinerary;
    } catch (error) {
        localStorage.removeItem(STORAGE_KEY);
        globalStatus.textContent = "البيانات القديمة كانت غير صالحة، فبدأنا بحالة آمنة من غير ما التطبيق يقف.";
    }
}

function saveState() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ favorites: state.favorites, itinerary: state.itinerary }));
    } catch (error) {
        globalStatus.textContent = "التغيير ظاهر، لكن المتصفح مقدرش يحفظه محلياً.";
    }
}

function createId() {
    if (globalThis.crypto && typeof globalThis.crypto.randomUUID === "function") return globalThis.crypto.randomUUID();
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getDestination(id) {
    return destinations.find(function (destination) { return destination.id === id; });
}

// 5) وظائف الرسم
function createButton(label, action, destinationId, className) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = className;
    button.dataset.action = action;
    button.dataset.destinationId = destinationId;
    button.textContent = label;
    return button;
}

function createDestinationCard(destination, index) {
    const card = document.createElement("article");
    card.className = `destination-card ${index === 0 ? "is-featured" : ""}`;
    card.dataset.destinationId = destination.id;

    const art = document.createElement("div");
    art.className = `destination-art ${destination.art}`;
    art.setAttribute("aria-hidden", "true");
    const artName = document.createElement("strong");
    artName.textContent = destination.name;
    art.append(artName);

    const copy = document.createElement("div");
    copy.className = "destination-copy";
    const meta = document.createElement("p");
    meta.className = "destination-meta";
    meta.textContent = `${destination.regionLabel} · ${destination.categoryLabel}`;
    const title = document.createElement("h2");
    title.textContent = destination.name;
    const description = document.createElement("p");
    description.className = "destination-description";
    description.textContent = destination.description;

    const facts = document.createElement("dl");
    facts.className = "destination-facts";
    [["التقييم", `★ ${destination.rating}`], ["ميزانية يومية", currency.format(destination.budget)], ["مدة مقترحة", `${destination.duration} أيام`]].forEach(function (fact) {
        const group = document.createElement("div");
        const term = document.createElement("dt");
        const value = document.createElement("dd");
        term.textContent = fact[0]; value.textContent = fact[1]; group.append(term, value); facts.append(group);
    });

    const actions = document.createElement("div");
    actions.className = "destination-actions";
    const favoriteButton = createButton(state.favorites.includes(destination.id) ? "♥ محفوظة" : "♡ مفضلة", "favorite", destination.id, "favorite-button");
    favoriteButton.setAttribute("aria-pressed", String(state.favorites.includes(destination.id)));
    favoriteButton.setAttribute("aria-label", state.favorites.includes(destination.id) ? `شيل ${destination.name} من المفضلة` : `ضيف ${destination.name} للمفضلة`);
    actions.append(favoriteButton, createButton("التفاصيل", "details", destination.id, "details-button"), createButton("ضيف لرحلتي", "add-to-trip", destination.id, "add-trip-button"));

    copy.append(meta, title, description, facts, actions);
    card.append(art, copy);
    return card;
}

function getDiscoverResults() {
    const query = state.search.trim().toLowerCase();
    const originalOrder = new Map(destinations.map(function (item, index) { return [item.id, index]; }));
    const results = destinations.filter(function (destination) {
        const searchable = `${destination.name} ${destination.description} ${destination.categoryLabel} ${destination.regionLabel}`.toLowerCase();
        const matchesSearch = !query || searchable.includes(query);
        const matchesRegion = state.region === "all" || destination.region === state.region;
        const matchesCategory = state.category === "all" || destination.category === state.category;
        return matchesSearch && matchesRegion && matchesCategory;
    });

    return results.sort(function (a, b) {
        if (state.sort === "rating") return b.rating - a.rating;
        if (state.sort === "budget") return a.budget - b.budget;
        if (state.sort === "name") return a.name.localeCompare(b.name, "ar");
        return originalOrder.get(a.id) - originalOrder.get(b.id);
    });
}

function renderDiscover() {
    const results = getDiscoverResults();
    destinationResults.replaceChildren(...results.map(createDestinationCard));
    document.querySelector("#result-count").textContent = results.length;
    document.querySelector("#no-destinations").hidden = results.length !== 0;
}

function renderFavorites() {
    const favorites = state.favorites.map(getDestination).filter(Boolean);
    favoriteResults.replaceChildren(...favorites.map(createDestinationCard));
    document.querySelector("#empty-favorites").hidden = favorites.length !== 0;
    document.querySelector("#favorite-count").textContent = favorites.length;
}

function createTripStop(trip, index) {
    const destination = getDestination(trip.destinationId);
    const item = document.createElement("li");
    item.className = "trip-stop";
    const number = document.createElement("span");
    number.className = "stop-number"; number.textContent = index + 1;
    const copy = document.createElement("div");
    const title = document.createElement("h3"); title.textContent = destination.name;
    const meta = document.createElement("p"); meta.textContent = `${trip.startDate} · ${trip.days} أيام · ${trip.travelers} مسافرين`;
    copy.append(title, meta);
    if (trip.note) { const note = document.createElement("p"); note.className = "stop-note"; note.textContent = trip.note; copy.append(note); }
    const cost = document.createElement("strong"); cost.textContent = currency.format(destination.budget * trip.days * trip.travelers);
    const actions = document.createElement("div"); actions.className = "stop-actions";
    const edit = document.createElement("button"); edit.type = "button"; edit.dataset.tripAction = "edit"; edit.dataset.tripId = trip.id; edit.textContent = "تعديل";
    const remove = document.createElement("button"); remove.type = "button"; remove.dataset.tripAction = "remove"; remove.dataset.tripId = trip.id; remove.textContent = "حذف";
    actions.append(edit, remove); item.append(number, copy, cost, actions); return item;
}

function renderItinerary() {
    tripStops.replaceChildren(...state.itinerary.map(createTripStop));
    const totalDays = state.itinerary.reduce(function (total, trip) { return total + trip.days; }, 0);
    const totalTravelers = state.itinerary.reduce(function (total, trip) { return total + trip.travelers; }, 0);
    const totalBudget = state.itinerary.reduce(function (total, trip) {
        const destination = getDestination(trip.destinationId);
        return total + destination.budget * trip.days * trip.travelers;
    }, 0);
    document.querySelector("#summary-stops").textContent = state.itinerary.length;
    document.querySelector("#summary-days").textContent = totalDays;
    document.querySelector("#summary-travelers").textContent = totalTravelers;
    document.querySelector("#summary-budget").textContent = currency.format(totalBudget);
    document.querySelector("#trip-count").textContent = state.itinerary.length;
    document.querySelector("#visible-trip-count").textContent = state.itinerary.length;
    document.querySelector("#empty-itinerary").hidden = state.itinerary.length !== 0;
}

function renderAll() {
    renderDiscover(); renderFavorites(); renderItinerary();
}

// 6) التنقل والإجراءات
function showView(viewName) {
    state.activeView = viewName;
    viewButtons.forEach(function (button) {
        const active = button.dataset.view === viewName;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
    });
    viewPanels.forEach(function (panel) { panel.hidden = panel.dataset.panel !== viewName; });
    document.querySelector(`[data-panel="${viewName}"] h1`).focus({ preventScroll: true });
    document.querySelector(`[data-panel="${viewName}"]`).scrollIntoView({ block: "start" });
}

function toggleFavorite(destinationId) {
    if (state.favorites.includes(destinationId)) {
        state.favorites = state.favorites.filter(function (id) { return id !== destinationId; });
        globalStatus.textContent = "اتشالت الوجهة من المفضلة.";
    } else {
        state.favorites.push(destinationId);
        globalStatus.textContent = "اتحفظت الوجهة في المفضلة.";
    }
    saveState(); renderDiscover(); renderFavorites();
}

function prepareTrip(destinationId) {
    showView("itinerary");
    document.querySelector("#trip-destination").value = destinationId;
    document.querySelector("#trip-start-date").focus();
    globalStatus.textContent = `اختار تفاصيل رحلتك إلى ${getDestination(destinationId).name}.`;
}

function openDetails(destinationId, trigger) {
    const destination = getDestination(destinationId);
    dialogDestinationId = destinationId;
    lastDialogTrigger = trigger;
    document.querySelector("#dialog-art").className = `dialog-art destination-art ${destination.art}`;
    document.querySelector("#dialog-meta").textContent = `${destination.regionLabel} · ${destination.categoryLabel}`;
    document.querySelector("#dialog-title").textContent = destination.name;
    document.querySelector("#dialog-description").textContent = destination.description;
    document.querySelector("#dialog-rating").textContent = `★ ${destination.rating}`;
    document.querySelector("#dialog-budget").textContent = currency.format(destination.budget);
    document.querySelector("#dialog-duration").textContent = `${destination.duration} أيام`;
    dialog.showModal();
    document.querySelector("#dialog-close").focus();
}

function closeDialog() {
    dialog.close();
    if (lastDialogTrigger) lastDialogTrigger.focus();
}

function handleDestinationAction(event) {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    if (button.dataset.action === "favorite") toggleFavorite(button.dataset.destinationId);
    if (button.dataset.action === "details") openDetails(button.dataset.destinationId, button);
    if (button.dataset.action === "add-to-trip") prepareTrip(button.dataset.destinationId);
    if (button.dataset.action === "show-discover") showView("discover");
    if (button.dataset.action === "reset-discovery") resetDiscovery();
}

function resetDiscovery() {
    state.search = ""; state.region = "all"; state.category = "all"; state.sort = "recommended";
    document.querySelector("#search").value = "";
    document.querySelector("#region-filter").value = "all";
    document.querySelector("#category-filter").value = "all";
    document.querySelector("#sort-select").value = "recommended";
    renderDiscover(); document.querySelector("#search").focus();
}

// 7) نموذج الرحلة
function getTripValues() {
    return {
        destinationId: document.querySelector("#trip-destination").value,
        startDate: document.querySelector("#trip-start-date").value,
        days: Number(document.querySelector("#trip-days").value),
        travelers: Number(document.querySelector("#trip-travelers").value),
        note: document.querySelector("#trip-note").value.trim()
    };
}

function validateTrip(values) {
    if (!getDestination(values.destinationId)) return "اختار وجهة صحيحة.";
    if (!/^\d{4}-\d{2}-\d{2}$/.test(values.startDate)) return "اختار تاريخ بداية صحيح.";
    if (!Number.isInteger(values.days) || values.days < 1 || values.days > 30) return "عدد الأيام لازم يكون من 1 إلى 30.";
    if (!Number.isInteger(values.travelers) || values.travelers < 1 || values.travelers > 10) return "عدد المسافرين لازم يكون من 1 إلى 10.";
    if (values.note.length > 120) return "الملاحظة لازم تكون 120 حرف أو أقل.";
    const duplicate = state.itinerary.some(function (trip) {
        return trip.destinationId === values.destinationId && trip.startDate === values.startDate && trip.id !== state.editingTripId;
    });
    if (duplicate) return "الوجهة دي موجودة في نفس التاريخ. عدّل المحطة الحالية أو اختار تاريخ تاني.";
    return "";
}

function resetTripForm() {
    itineraryForm.reset(); state.editingTripId = null;
    document.querySelector("#trip-days").value = 3; document.querySelector("#trip-travelers").value = 2;
    document.querySelector("#trip-start-date").value = new Date().toISOString().slice(0,10);
    document.querySelector("#trip-form-mode").textContent = "إضافة محطة";
    document.querySelector("#save-trip").textContent = "ضيف لرحلتي";
    document.querySelector("#cancel-trip-edit").hidden = true;
    document.querySelector("#trip-error").textContent = "";
}

function startTripEdit(tripId) {
    const trip = state.itinerary.find(function (item) { return item.id === tripId; });
    if (!trip) return;
    state.editingTripId = tripId;
    document.querySelector("#trip-destination").value = trip.destinationId;
    document.querySelector("#trip-start-date").value = trip.startDate;
    document.querySelector("#trip-days").value = trip.days;
    document.querySelector("#trip-travelers").value = trip.travelers;
    document.querySelector("#trip-note").value = trip.note;
    document.querySelector("#trip-form-mode").textContent = "تعديل محطة";
    document.querySelector("#save-trip").textContent = "حفظ التعديل";
    document.querySelector("#cancel-trip-edit").hidden = false;
    document.querySelector("#trip-destination").focus();
}

itineraryForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const values = getTripValues();
    const errorMessage = validateTrip(values);
    if (errorMessage) { document.querySelector("#trip-error").textContent = errorMessage; return; }

    if (state.editingTripId) {
        state.itinerary = state.itinerary.map(function (trip) { return trip.id === state.editingTripId ? { id: trip.id, ...values } : trip; });
        globalStatus.textContent = "تم حفظ تعديل المحطة.";
    } else {
        state.itinerary.push({ id: createId(), ...values });
        globalStatus.textContent = `تمت إضافة ${getDestination(values.destinationId).name} إلى رحلتك.`;
    }
    saveState(); resetTripForm(); renderItinerary(); document.querySelector("#trip-destination").focus();
});

tripStops.addEventListener("click", function (event) {
    const button = event.target.closest("button[data-trip-action]");
    if (!button) return;
    if (button.dataset.tripAction === "edit") startTripEdit(button.dataset.tripId);
    if (button.dataset.tripAction === "remove") {
        state.itinerary = state.itinerary.filter(function (trip) { return trip.id !== button.dataset.tripId; });
        if (state.editingTripId === button.dataset.tripId) resetTripForm();
        saveState(); renderItinerary(); globalStatus.textContent = "تم حذف المحطة من الرحلة.";
        document.querySelector("#trip-destination").focus();
    }
});

// 8) ربط الأحداث والتشغيل
viewButtons.forEach(function (button) { button.addEventListener("click", function () { showView(button.dataset.view); }); });
destinationResults.addEventListener("click", handleDestinationAction);
favoriteResults.addEventListener("click", handleDestinationAction);
document.querySelector("#no-destinations").addEventListener("click", handleDestinationAction);
document.querySelector("#empty-favorites").addEventListener("click", handleDestinationAction);
document.querySelector("#search").addEventListener("input", function (event) { state.search = event.target.value; renderDiscover(); });
document.querySelector("#region-filter").addEventListener("change", function (event) { state.region = event.target.value; renderDiscover(); });
document.querySelector("#category-filter").addEventListener("change", function (event) { state.category = event.target.value; renderDiscover(); });
document.querySelector("#sort-select").addEventListener("change", function (event) { state.sort = event.target.value; renderDiscover(); });
document.querySelector("#reset-discovery").addEventListener("click", resetDiscovery);
document.querySelector("#dialog-close").addEventListener("click", closeDialog);
document.querySelector("#dialog-add").addEventListener("click", function () { const id = dialogDestinationId; closeDialog(); prepareTrip(id); });
dialog.addEventListener("click", function (event) { if (event.target === dialog) closeDialog(); });
dialog.addEventListener("cancel", function (event) { event.preventDefault(); closeDialog(); });
document.querySelector("#cancel-trip-edit").addEventListener("click", function () { resetTripForm(); globalStatus.textContent = "تم إلغاء التعديل."; document.querySelector("#trip-destination").focus(); });

const destinationSelect = document.querySelector("#trip-destination");
destinations.forEach(function (destination) { const option = document.createElement("option"); option.value = destination.id; option.textContent = destination.name; destinationSelect.append(option); });
document.querySelector("#trip-start-date").min = new Date().toISOString().slice(0,10);
resetTripForm();
loadSavedState();
renderAll();
