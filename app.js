const STORAGE_KEY = "brainManual.principles.v1";
const DAILY_KEY = "brainManual.daily.v1";
const DEFAULT_SCENES = ["想消费", "拖延", "饭后", "起床", "低落", "想逃避"];
const DOMAINS = ["金钱", "身体", "关系", "工作", "情绪", "成长"];

const state = {
  principles: loadPrinciples(),
  selectedScene: null,
};

const elements = {
  todayCard: document.querySelector("#todayCard"),
  shuffleButton: document.querySelector("#shuffleButton"),
  sceneChips: document.querySelector("#sceneChips"),
  sceneResults: document.querySelector("#sceneResults"),
  clearSceneButton: document.querySelector("#clearSceneButton"),
  form: document.querySelector("#principleForm"),
  editingId: document.querySelector("#editingId"),
  reminderInput: document.querySelector("#reminderInput"),
  actionInput: document.querySelector("#actionInput"),
  scenesInput: document.querySelector("#scenesInput"),
  domainInput: document.querySelector("#domainInput"),
  noteInput: document.querySelector("#noteInput"),
  cancelEditButton: document.querySelector("#cancelEditButton"),
  libraryList: document.querySelector("#libraryList"),
  domainFilter: document.querySelector("#domainFilter"),
  openLibraryButton: document.querySelector("#openLibraryButton"),
  libraryPanel: document.querySelector("#libraryPanel"),
  emptyTemplate: document.querySelector("#emptyTemplate"),
};

bootstrap();

function bootstrap() {
  populateDomainFilter();
  bindEvents();
  ensureDailyPrinciple();
  render();
}

function bindEvents() {
  elements.shuffleButton.addEventListener("click", () => {
    const next = pickRandomEnabled(getTodayPrincipleId());
    saveDailyPrinciple(next?.id ?? null);
    render();
  });

  elements.clearSceneButton.addEventListener("click", () => {
    state.selectedScene = null;
    render();
  });

  elements.form.addEventListener("submit", (event) => {
    event.preventDefault();
    saveFromForm();
  });

  elements.cancelEditButton.addEventListener("click", resetForm);

  elements.domainFilter.addEventListener("change", renderLibrary);

  elements.openLibraryButton.addEventListener("click", () => {
    elements.libraryPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function populateDomainFilter() {
  DOMAINS.forEach((domain) => {
    const option = document.createElement("option");
    option.value = domain;
    option.textContent = domain;
    elements.domainFilter.append(option);
  });
}

function render() {
  renderToday();
  renderScenes();
  renderSceneResults();
  renderLibrary();
}

function renderToday() {
  const principle = getTodayPrinciple();
  elements.todayCard.innerHTML = "";

  if (!principle) {
    elements.todayCard.append(emptyState());
    elements.shuffleButton.disabled = true;
    return;
  }

  elements.shuffleButton.disabled = enabledPrinciples().length < 2;
  elements.todayCard.append(createHeroCard(principle));
}

function renderScenes() {
  const scenes = [...new Set([...DEFAULT_SCENES, ...state.principles.flatMap((item) => item.scenes)])].filter(Boolean);
  elements.sceneChips.innerHTML = "";

  scenes.forEach((scene) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `scene-chip${scene === state.selectedScene ? " is-active" : ""}`;
    button.textContent = scene;
    button.addEventListener("click", () => {
      state.selectedScene = scene;
      render();
    });
    elements.sceneChips.append(button);
  });

  elements.clearSceneButton.hidden = !state.selectedScene;
}

function renderSceneResults() {
  elements.sceneResults.innerHTML = "";
  if (!state.selectedScene) return;

  const matches = state.principles.filter((item) => item.enabled && item.scenes.includes(state.selectedScene));
  if (matches.length === 0) {
    elements.sceneResults.append(emptyMessage(`还没有适用于“${state.selectedScene}”的原则。`));
    return;
  }

  matches.forEach((principle) => elements.sceneResults.append(createSmallCard(principle, false)));
}

function renderLibrary() {
  const filter = elements.domainFilter.value;
  const items = state.principles
    .filter((item) => filter === "all" || item.domain === filter)
    .sort((a, b) => b.createdAt - a.createdAt);

  elements.libraryList.innerHTML = "";
  if (items.length === 0) {
    elements.libraryList.append(emptyState());
    return;
  }

  items.forEach((principle) => elements.libraryList.append(createSmallCard(principle, true)));
}

function createHeroCard(principle) {
  const fragment = document.createDocumentFragment();
  const reminder = document.createElement("p");
  reminder.className = "principle-line";
  reminder.textContent = principle.reminder;

  const action = document.createElement("p");
  action.className = "next-step";
  action.textContent = `下一步：${principle.action}`;

  fragment.append(reminder, action, createMetaRow(principle));
  return fragment;
}

function createSmallCard(principle, withActions) {
  const card = document.createElement("article");
  card.className = `small-card${principle.enabled ? "" : " is-disabled"}`;

  const title = document.createElement("p");
  title.className = "small-title";
  title.textContent = principle.reminder;

  const action = document.createElement("p");
  action.className = "small-action";
  action.textContent = `下一步：${principle.action}`;

  card.append(title, action, createMetaRow(principle));

  if (principle.note) {
    const note = document.createElement("p");
    note.className = "small-note";
    note.textContent = principle.note;
    card.append(note);
  }

  if (withActions) {
    card.append(createCardActions(principle));
  }

  return card;
}

function createMetaRow(principle) {
  const row = document.createElement("div");
  row.className = "meta-row";
  [principle.domain, ...principle.scenes].filter(Boolean).forEach((text) => {
    const pill = document.createElement("span");
    pill.className = "meta-pill";
    pill.textContent = text;
    row.append(pill);
  });
  return row;
}

function createCardActions(principle) {
  const actions = document.createElement("div");
  actions.className = "card-actions";

  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.className = "ghost-button";
  editButton.textContent = "编辑";
  editButton.addEventListener("click", () => startEdit(principle));

  const toggleButton = document.createElement("button");
  toggleButton.type = "button";
  toggleButton.className = "ghost-button";
  toggleButton.textContent = principle.enabled ? "停用" : "启用";
  toggleButton.addEventListener("click", () => togglePrinciple(principle.id));

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "danger-button";
  deleteButton.textContent = "删除";
  deleteButton.addEventListener("click", () => deletePrinciple(principle.id));

  actions.append(editButton, toggleButton, deleteButton);
  return actions;
}

function saveFromForm() {
  const reminder = elements.reminderInput.value.trim();
  const action = elements.actionInput.value.trim();
  if (!reminder || !action) return;

  const scenes = normalizeScenes(elements.scenesInput.value);
  const principle = {
    id: elements.editingId.value || crypto.randomUUID(),
    reminder,
    action,
    scenes,
    domain: elements.domainInput.value,
    note: elements.noteInput.value.trim(),
    enabled: true,
    createdAt: Date.now(),
  };

  const existingIndex = state.principles.findIndex((item) => item.id === principle.id);
  if (existingIndex >= 0) {
    principle.enabled = state.principles[existingIndex].enabled;
    principle.createdAt = state.principles[existingIndex].createdAt;
    state.principles[existingIndex] = principle;
  } else {
    state.principles.push(principle);
  }

  persistPrinciples();
  ensureDailyPrinciple();
  resetForm();
  render();
}

function startEdit(principle) {
  elements.editingId.value = principle.id;
  elements.reminderInput.value = principle.reminder;
  elements.actionInput.value = principle.action;
  elements.scenesInput.value = principle.scenes.join("、");
  elements.domainInput.value = principle.domain;
  elements.noteInput.value = principle.note;
  elements.cancelEditButton.hidden = false;
  elements.reminderInput.focus();
  elements.form.scrollIntoView({ behavior: "smooth", block: "center" });
}

function resetForm() {
  elements.form.reset();
  elements.editingId.value = "";
  elements.cancelEditButton.hidden = true;
}

function togglePrinciple(id) {
  const item = state.principles.find((principle) => principle.id === id);
  if (!item) return;
  item.enabled = !item.enabled;
  persistPrinciples();
  ensureDailyPrinciple();
  render();
}

function deletePrinciple(id) {
  const item = state.principles.find((principle) => principle.id === id);
  if (!item) return;
  const confirmed = window.confirm(`删除这条原则？\n\n${item.reminder}`);
  if (!confirmed) return;

  state.principles = state.principles.filter((principle) => principle.id !== id);
  if (getTodayPrincipleId() === id) saveDailyPrinciple(null);
  persistPrinciples();
  ensureDailyPrinciple();
  render();
}

function normalizeScenes(value) {
  return value
    .split(/[、,，\s]+/)
    .map((scene) => scene.trim())
    .filter(Boolean);
}

function ensureDailyPrinciple() {
  const daily = loadDaily();
  const today = todayKey();
  const current = state.principles.find((item) => item.id === daily.id && item.enabled);
  if (daily.date === today && current) return;

  const next = pickRandomEnabled();
  saveDailyPrinciple(next?.id ?? null);
}

function pickRandomEnabled(excludeId = null) {
  const items = enabledPrinciples().filter((item) => item.id !== excludeId);
  const pool = items.length > 0 ? items : enabledPrinciples();
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

function getTodayPrinciple() {
  const id = getTodayPrincipleId();
  return state.principles.find((item) => item.id === id && item.enabled) ?? null;
}

function getTodayPrincipleId() {
  return loadDaily().id;
}

function saveDailyPrinciple(id) {
  localStorage.setItem(DAILY_KEY, JSON.stringify({ date: todayKey(), id }));
}

function enabledPrinciples() {
  return state.principles.filter((item) => item.enabled);
}

function todayKey() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function loadPrinciples() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persistPrinciples() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.principles));
}

function loadDaily() {
  try {
    return JSON.parse(localStorage.getItem(DAILY_KEY)) ?? {};
  } catch {
    return {};
  }
}

function emptyState() {
  return elements.emptyTemplate.content.cloneNode(true);
}

function emptyMessage(message) {
  const box = document.createElement("div");
  box.className = "empty-state";
  const title = document.createElement("p");
  title.className = "empty-title";
  title.textContent = message;
  box.append(title);
  return box;
}
