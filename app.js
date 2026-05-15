const STORAGE_KEY = "brainManual.principles.v1";
const DAILY_KEY = "brainManual.daily.v1";
const STARTER_SEED_KEY = "brainManual.starterSeed.v1";
const STARTER_VERSION = "2026-05-15-1";
const DEFAULT_SCENES = ["想消费", "拖延", "饭后", "起床", "低落", "想逃避"];
const DOMAINS = ["金钱", "身体", "关系", "工作", "情绪", "成长"];
const STARTER_PRINCIPLES = [
  {
    reminder: "家里只放我看第一眼就有生命力的东西。",
    action: "拿起这个东西，问自己：我第一眼看到它，是被滋养，还是只是觉得“还能用”？如果不是被滋养，就不要买；已经拥有的，就移出主要视线。",
    scenes: ["买家居", "整理房间", "想囤东西", "换装饰", "收拾桌面"],
    domain: "身体",
    note: "家里的东西会反复进入我的眼睛，慢慢塑造我的状态。能留在身边的，应该让我变安静、变舒展、变有生命力。",
  },
  {
    reminder: "不做主观判断，只做事实记录。",
    action: "把脑子里的评价改写成可观察事实：谁、在什么时候、做了什么、产生了什么结果。",
    scenes: ["情绪上头", "判断他人", "复盘", "沟通前"],
    domain: "情绪",
    note: "先回到事实，判断才不会被情绪带走。",
  },
  {
    reminder: "准时出摊。",
    action: "到点就进入工作位置，先开始十分钟，不等状态、不等灵感。",
    scenes: ["拖延", "开始工作", "写作", "学习"],
    domain: "工作",
    note: "像摊主一样稳定出现，让系统相信我会来。",
  },
  {
    reminder: "无论你是什么身份，都用职业选手的态度对待当下的任务。",
    action: "先问：如果我是职业选手，此刻会怎么准备、怎么执行、怎么复盘？然后照做第一步。",
    scenes: ["运动", "写作", "做任务", "状态松散"],
    domain: "成长",
    note: "运动时想象自己是职业运动员，写作时想象自己是村上春树。",
  },
  {
    reminder: "不把结果与自尊心绑定。",
    action: "把结果写成反馈：哪里有效、哪里无效、下一轮改什么。不要把它翻译成我行不行。",
    scenes: ["失败", "被评价", "发布作品", "考试", "复盘"],
    domain: "情绪",
    note: "结果用来校准系统，不用来审判自己。",
  },
  {
    reminder: "系统导向大于目标导向。",
    action: "把目标改写成今天可重复的动作：时间、地点、触发点、最小动作。",
    scenes: ["制定计划", "立目标", "习惯养成", "焦虑未来"],
    domain: "成长",
    note: "目标给方向，系统负责让它每天发生。",
  },
  {
    reminder: "期望不明确，问题就不明确。",
    action: "先写清楚我期待什么、对方期待什么、完成标准是什么，再继续讨论问题。",
    scenes: ["沟通", "关系冲突", "工作协作", "需求不清"],
    domain: "关系",
    note: "很多问题不是做不到，而是期待没有被说清楚。",
  },
  {
    reminder: "问题复杂度源于情绪而非事实。",
    action: "先把事实列三条，再把情绪单独写一行，分开处理。",
    scenes: ["焦虑", "低落", "关系冲突", "决策困难"],
    domain: "情绪",
    note: "事实通常比感受简单，先拆开就有路。",
  },
  {
    reminder: "先出发，路上缺啥补啥。",
    action: "先做一个最小可行动作，遇到真实缺口时再补工具、资料或能力。",
    scenes: ["拖延", "准备过度", "新项目", "害怕开始"],
    domain: "成长",
    note: "很多缺口只有出发后才会真实出现。",
  },
  {
    reminder: "只有能够被看到的事情才能够被管理。",
    action: "把这件事外化到一个可见位置：清单、日历、白板、表格或桌面。",
    scenes: ["混乱", "计划", "复盘", "任务管理"],
    domain: "工作",
    note: "看不见的事情会留在脑子里消耗注意力。",
  },
  {
    reminder: "通过标准操作流程控制目标结果。",
    action: "先写下这件事的固定流程：触发条件、操作步骤、检查标准。之后按流程执行，不靠临场发挥。",
    scenes: ["制定计划", "复盘", "工作流程", "目标管理"],
    domain: "工作",
    note: "结果不只靠愿望控制，更多靠稳定可重复的过程控制。",
  },
  {
    reminder: "决策和行动分离。",
    action: "先在清醒时做决定，把下一步写清楚；到执行时只照着做，不重新谈判。",
    scenes: ["拖延", "执行计划", "习惯养成", "意志力不足"],
    domain: "成长",
    note: "不要在最想逃避的时候，重新决定自己要不要做。",
  },
  {
    reminder: "当我不想做某事的时候，坚持做这件事本身也是一种技能。",
    action: "把目标降到最小，只完成一个可交付动作，让自己练习“不想做也能开始”。",
    scenes: ["拖延", "抗拒", "运动", "写作", "学习"],
    domain: "成长",
    note: "这不是单次任务的胜负，而是在训练一种可迁移的执行能力。",
  },
  {
    reminder: "The two-day rule：Never skip two days in a row.",
    action: "如果昨天已经断了，今天就做最小版本，哪怕只做两分钟，也要把连续中断截住。",
    scenes: ["习惯中断", "运动", "学习", "写作", "恢复节奏"],
    domain: "成长",
    note: "允许一天不完美，但不要让缺席变成新的惯性。",
  },
  {
    reminder: "2 分钟能完成的事情立刻做，不挂后台占据大脑 CPU。",
    action: "看到一个两分钟内能完成的小事，马上处理；如果不能马上做，就放进一个明确清单。",
    scenes: ["小任务", "收拾", "消息回复", "任务管理", "混乱"],
    domain: "工作",
    note: "小事挂在脑子里，会持续消耗注意力。",
  },
  {
    reminder: "不想干、很难干的事情，先干 5 分钟。",
    action: "只承诺 5 分钟，打开材料、进入现场、做第一个动作，让新的真实信息带我往前走。",
    scenes: ["拖延", "困难任务", "害怕开始", "写作", "学习"],
    domain: "成长",
    note: "想象里的困难经常失真，开始后的一手信息更可靠。",
  },
  {
    reminder: "72 小时内没启动的事情，往往就不会再做。",
    action: "决定要做后，在 72 小时内安排一个启动动作：预约、下单、建文档、发消息或完成第一步。",
    scenes: ["新想法", "计划", "项目启动", "机会判断"],
    domain: "工作",
    note: "想法需要在热度还在的时候进入现实，否则很容易停在脑内。",
  },
  {
    reminder: "在完成任何任务前，我做的最后一件事，就是明确具体下一步行动。",
    action: "收尾前写下下一步：具体动作、发生时间、放在哪里。不要让下次启动从重新想起开始。",
    scenes: ["任务收尾", "复盘", "写作", "项目推进", "学习"],
    domain: "工作",
    note: "好的结束，会降低下一次开始的阻力。",
  },
  {
    reminder: "事以密成，不要过早、过度分享正在推进的事情。",
    action: "在事情还没有形成稳定成果前，先把分享冲动写下来，继续推进下一步，只向真正相关的人同步必要信息。",
    scenes: ["想分享", "新计划", "项目推进", "社交表达"],
    domain: "工作",
    note: "过早分享会消耗行动的能量，也容易让外界反馈提前干扰判断。",
  },
  {
    reminder: "欲望不被跟随，就不会成为行为；它通常只有 3 分钟的体量。",
    action: "欲望出现时先不行动，计时 3 分钟，只观察身体感受和念头变化，等它自己退潮。",
    scenes: ["冲动消费", "想刷短视频", "想吃东西", "情绪上头", "欲望来了"],
    domain: "情绪",
    note: "欲望不是命令，只是一阵短暂的信号。",
  },
  {
    reminder: "脑子里反刍 1 小时的内容，说出来可能只要 3 分钟。",
    action: "打开语音，倒脑子 3 分钟，只说事实、感受和卡住点，不追求表达完整。",
    scenes: ["反刍", "焦虑", "低落", "脑子很满", "睡前"],
    domain: "情绪",
    note: "把内容从脑内搬到外部，先清空大脑 CPU。",
  },
  {
    reminder: "想干蠢事时，手写 1 分钟我的身份。",
    action: "拿纸写下：我是一个不做这件事的人，因为它会消耗我的生命。写满 1 分钟，再决定要不要继续。",
    scenes: ["想看短剧", "想刷短视频", "冲动行为", "自控力下降"],
    domain: "成长",
    note: "身份提醒比临时克制更有力量。",
  },
  {
    reminder: "给计划设置保质期：24 小时内没有外部结果，就默认它开始腐烂。",
    action: "计划写下后，立刻安排一个 24 小时内能产生的外部结果：发一条消息、建一个文件、完成第一步，或让别人能看到进展。",
    scenes: ["制定计划", "准备过度", "拖延", "新项目", "目标管理"],
    domain: "工作",
    note: "计划放得越久，越容易变成自我感动的证据。准备如果不能导向行动，就只是另一种消耗。",
  },
  {
    reminder: "拖延时，不要用大脑想，把自己扔到环境里。",
    action: "立刻移动到任务发生的地方：打开文档、坐到桌前、穿上鞋、进入现场。先让环境接管我，再开始第一个动作。",
    scenes: ["拖延", "害怕开始", "困难任务", "写作", "运动"],
    domain: "成长",
    note: "拖延时继续在脑子里想，只会制造更多阻力。环境比意志力更可靠。",
  },
  {
    reminder: "不开始干蠢事，就不消耗意志力。",
    action: "在第一步发生前切断入口：关掉页面、把手机放远、离开触发场景，不跟它进入拉扯。",
    scenes: ["想刷短视频", "想看短剧", "冲动行为", "自控力下降", "欲望来了"],
    domain: "成长",
    note: "最省力的自控，是不让自己进入需要自控的局面。",
  },
];

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
  seedStarterPrinciples();
  populateDomainFilter();
  bindEvents();
  ensureDailyPrinciple();
  render();
}

function seedStarterPrinciples() {
  if (localStorage.getItem(STARTER_SEED_KEY) === STARTER_VERSION) return;

  const now = Date.now();
  const existingReminders = new Set(state.principles.map((principle) => principle.reminder));
  const additions = STARTER_PRINCIPLES.filter((principle) => !existingReminders.has(principle.reminder)).map(
    (principle, index) => ({
      ...principle,
      id: crypto.randomUUID(),
      enabled: true,
      createdAt: now + index,
    }),
  );

  if (additions.length > 0) {
    state.principles = [...state.principles, ...additions];
    persistPrinciples();
  }
  localStorage.setItem(STARTER_SEED_KEY, STARTER_VERSION);
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
