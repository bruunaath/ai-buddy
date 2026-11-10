// --- RUTES DE LES IMATGES D'ESTAT ---
const IMAGES = {
  focus: "focus_normal.jpg",
  pausa: "focus_pausa.jpg",
  completat: "completat.jpg",
  avis: "avisos.jpg"
};

localStorage.removeItem("aibuddy_sync_pass");

// --- CATÀLEG DE PLANTILLES RÀPIDES ANTIBLOQUEIG (TARGETES AMB ICONA, TÍTOL, DESCRIPCIÓ I 'READ DETAILS') ---
const catalegTasquesTDAH = {
  planificar_dia: {
    titol: "Planificar el dia",
    icona: "📅",
    descripcio: "Organitza les prioritats d'avui en 5 micro-passos clars sense saturar l'agenda.",
    paraules_clau: ["planificar", "organitzar", "agenda", "llista", "dia", "horari", "calendari", "setmana"],
    passos: [
      "Agafar l'agenda, el bolígraf blau i un post-it",
      "Apuntar totes les coses que et ronden pel cap",
      "Encerclar només la tasca més urgent d'avui",
      "Triar una segona tasca molt petita i fàcil",
      "Guardar la resta de la llista per més tard"
    ]
  },
  estudiar_temari: {
    titol: "Començar un temari dens",
    icona: "📚",
    descripcio: "Trenca el bloqueig inicial d'estudiar o llegir un document llarg pas a pas.",
    paraules_clau: ["estudiar", "temari", "examen", "apunts", "universitat", "uni", "llegir", "deures", "resum"],
    passos: [
      "Deixar el mòbil lluny i portar un got d'aigua",
      "Obrir només el document o llibre pel primer tema",
      "Llegir únicament els títols i el primer paràgraf",
      "Subratllar paraules clau sense aturar-se a memoritzar",
      "Escriure un resum amb les teves paraules"
    ]
  },
  respondre_correus: {
    titol: "Respondre correus pendents",
    icona: "✉️",
    descripcio: "Buidatge ràpid de missatges i correus acumulats sense caure en el perfeccionisme.",
    paraules_clau: ["correu", "correus", "mail", "email", "safata", "respondre", "professor", "redactar"],
    passos: [
      "Obrir la bústia i escollir un correu pendent",
      "Prémer el botó de respondre per obrir el quadre",
      "Escriure una salutació curta i el motiu en brut",
      "Llegir el text un sol cop sense perfeccionisme",
      "Prémer enviar immediatament"
    ]
  },
  motxilla_uni: {
    titol: "Preparar la motxilla",
    icona: "🎒",
    descripcio: "Llista verificable perquè no et deixis el carregador, les claus ni l'ordinador.",
    paraules_clau: ["motxilla", "uni", "universitat", "clase", "apunts", "ordinador", "carregador", "claus"],
    passos: [
      "Deixar la motxilla oberta damunt del llit",
      "Ficar a dins l'ordinador portàtil i la tablet",
      "Afegir els carregadors i els auriculars",
      "Afegir la llibreta i l'estoig amb bolígrafs",
      "Comprovar que portes la cartera i les claus",
      "Tancar la motxilla i deixar-la a l'entrada"
    ]
  },
  ordenar_escriptori: {
    titol: "Ordenar l'escriptori",
    icona: "🖥️",
    descripcio: "Recupera un espai de treball net i lliure d'estímuls visuals en pocs minuts.",
    paraules_clau: ["escriptori", "taula", "ordenar", "endreçar", "habitació", "netejar", "recollir"],
    passos: [
      "Retirar tots els gots, tasses i plats cap a la cuina",
      "Llençar els papers inservibles i embolcalls a la paperera",
      "Apilar tots els llibres i llibretes en un cantó",
      "Deixar només l'ordinador i els estris bàsics a la vista",
      "Passar un drap ràpid per l'espai que ha quedat lliure"
    ]
  },
  netejar_cuina: {
    titol: "Netejar la cuina",
    icona: "🍽️",
    descripcio: "Seqüència guiada per recollir plats i marbre amb música i sense atabalar-se.",
    paraules_clau: ["cuina", "plats", "fregadera", "marbre", "escurar", "aiguera", "rentaplats"],
    passos: [
      "Posar música animada",
      "Llençar només els envasos i brossa visible",
      "Agrupar tots els plats bruts dins l'aigüera",
      "Rentar només cinc peces o omplir el rentaplats",
      "Passar un drap humit pel marbre"
    ]
  },
  posar_rentadora: {
    titol: "Posar una rentadora",
    icona: "🧺",
    descripcio: "Passos directes per separar una tanda de roba i engegar el rentat.",
    paraules_clau: ["rentadora", "bugada", "rentar roba", "cistell"],
    passos: [
      "Destriar una tanda del mateix tipus de roba",
      "Tancar la porta i comprovar que no hi ha objectes dins",
      "Seleccionar el programa habitual i prémer el botó d'inici"
    ]
  },
  tramits_administratius: {
    titol: "Tràmits i gestions",
    icona: "📄",
    descripcio: "Supera la burocràcia i els formularis pas a pas amb tota la documentació a mà.",
    paraules_clau: ["tràmit", "tramit", "paperassa", "factura", "banc", "cita", "formulari", "pagar", "dni"],
    passos: [
      "Buscar el DNI o la targeta i deixar-los a la taula",
      "Obrir una sola pestanya al navegador amb la web",
      "Llegir únicament el primer quadre que cal omplir",
      "Completar les dades bàsiques pas a pas sense pressa",
      "Enviar el formulari i fer captura del comprovant"
    ]
  }
};

// --- HÀBITS DE MATÍ PREDETERMINATS (GRAELLA SELECCIONABLE) ---
const defaultRoutineCatalog = [
  { id: "wake_up", text: "Wake up / Despertar-se", icon: "⏰", selected: true },
  { id: "drink_water", text: "Drink water / Beure aigua", icon: "💧", selected: true },
  { id: "make_bed", text: "Make bed / Fer el llit", icon: "🛏️", selected: true },
  { id: "brush_teeth", text: "Brush teeth / Rentar dents", icon: "🪥", selected: true },
  { id: "skincare", text: "Skincare i cara fresca", icon: "🧼", selected: false },
  { id: "breakfast", text: "Breakfast / Esmorzar complet", icon: "🥣", selected: true },
  { id: "medication", text: "Cafè, vitamines o medicació", icon: "💊", selected: false },
  { id: "stretch", text: "Estiraments suaus (3 min)", icon: "🧘", selected: false }
];

// --- HOBBIES DE DESCANS PREDETERMINATS (GRAELLA SELECCIONABLE) ---
const defaultHobbiesCatalog = [
  { id: "read", text: "Llegir un capítol d'un llibre", icon: "📖", selected: true },
  { id: "music", text: "Escoltar música relaxant", icon: "🎧", selected: true },
  { id: "draw", text: "Pintar o dibuixar lliurement", icon: "🎨", selected: false },
  { id: "gaming", text: "Jugar a la consola (sense mòbil)", icon: "🎮", selected: true },
  { id: "walk", text: "Passejar 10 minuts a l'aire lliure", icon: "🌿", selected: false },
  { id: "tea", text: "Preparar una infusió calenta", icon: "🍵", selected: false }
];

const defaultPomoConfig = {
  focusMin: 25,
  shortBreakMin: 5,
  longBreakMin: 15,
  cyclesBeforeLong: 5
};

function getInitialState() {
  return {
    currentSteps: [
      "Escriu una tasca o tria una plantilla ràpida",
      "Avança pas a pas sense distraccions"
    ],
    currentIndex: 0,
    quickTodoList: [],
    parkedThoughts: [],
    routineCatalog: JSON.parse(JSON.stringify(defaultRoutineCatalog)),
    routineIndex: 0,
    hobbiesCatalog: JSON.parse(JSON.stringify(defaultHobbiesCatalog)),
    hobbyIndex: 0,
    pomoConfig: { ...defaultPomoConfig },
    completedPomodoros: 0,
    activityLog: [],
    activeDays: [new Date().toISOString().slice(0, 10)],
    updatedAt: 0
  };
}

let state = getInitialState();
let currentDashFilter = "all";

let config = {
  supaUrl: "https://qstjwfqrkemyfzudtoxb.supabase.co",
  supaKey: "sb_publishable_RoRpRRP4I1p3PYzIrbRsqA_9YJSZZfq",
  syncUser: localStorage.getItem("aibuddy_sync_user") || "convidat",
  syncHash: localStorage.getItem("aibuddy_sync_hash") || "",
  rgpdConsent: localStorage.getItem("aibuddy_rgpd_consent") === "true"
};

let pomoTimer = null;
let pomoPhase = "focus";
let pomoTotalSeconds = 1500;
let pomoCurrentSeconds = 1500;
let isPomoPaused = true;
let pendingServerVersion = null;

// --- ELEMENTS DOM ---
const statusBadge = document.getElementById("status-badge");
const stepDisplay = document.getElementById("step-display");
const stepCounter = document.getElementById("step-counter");
const completionBadge = document.getElementById("completion-badge");
const taskCompleteImg = document.getElementById("task-complete-img");
const taskInput = document.getElementById("task-input");
const btnSend = document.getElementById("btn-send");
const btnOk = document.getElementById("btn-ok");
const btnNext = document.getElementById("btn-next");
const btnPrev = document.getElementById("btn-prev");

const routineStepDisplay = document.getElementById("routine-step-display");
const routineCompletionBadge = document.getElementById("routine-completion-badge");
const routineHabitsGrid = document.getElementById("routine-habits-grid");
const routineInputNew = document.getElementById("routine-input-new");
const btnRoutineAdd = document.getElementById("btn-routine-add");
const btnRoutineReset = document.getElementById("btn-routine-reset");
const btnRoutineOk = document.getElementById("btn-routine-ok");
const btnRoutineNext = document.getElementById("btn-routine-next");
const btnRoutinePrev = document.getElementById("btn-routine-prev");

const hobbyStepDisplay = document.getElementById("hobby-step-display");
const hobbiesCapsulesGrid = document.getElementById("hobbies-capsules-grid");
const hobbyInputNew = document.getElementById("hobby-input-new");
const btnHobbyAdd = document.getElementById("btn-hobby-add");
const btnHobbyReset = document.getElementById("btn-hobby-reset");

const thoughtInput = document.getElementById("thought-input");
const btnPark = document.getElementById("btn-park");
const pomoThoughtInput = document.getElementById("pomo-thought-input");
const btnPomoPark = document.getElementById("btn-pomo-park");
const toastNotification = document.getElementById("toast-notification");
const thoughtsListContainer = document.getElementById("thoughts-list");
const btnClearThoughts = document.getElementById("btn-clear-thoughts");

const pomoBar = document.getElementById("pomo-bar");
const pomoImg = document.getElementById("pomo-img");
const pomoStatusLabel = document.getElementById("pomo-status-label");
const pomoModeBadge = document.getElementById("pomo-mode-badge");
const pomoTimeDisplay = document.getElementById("pomo-time-display");
const pomoCycleCounter = document.getElementById("pomo-cycle-counter");
const btnPomoOk = document.getElementById("btn-pomo-ok");
const btnPomoNext = document.getElementById("btn-pomo-next");
const btnPomoReset = document.getElementById("btn-pomo-reset");
const btnPomoSkipPhase = document.getElementById("btn-pomo-skip-phase");

const pomoCfgFocus = document.getElementById("pomo-cfg-focus");
const pomoCfgShort = document.getElementById("pomo-cfg-short");
const pomoCfgLong = document.getElementById("pomo-cfg-long");
const pomoCfgCycles = document.getElementById("pomo-cfg-cycles");
const btnSavePomoInline = document.getElementById("btn-save-pomo-inline");

const settingsPomoFocus = document.getElementById("settings-pomo-focus");
const settingsPomoShort = document.getElementById("settings-pomo-short");
const settingsPomoLong = document.getElementById("settings-pomo-long");
const settingsPomoCycles = document.getElementById("settings-pomo-cycles");
const btnSavePomoSettings = document.getElementById("btn-save-pomo-settings");

const quickTodoInput = document.getElementById("quick-todo-input");
const btnAddQuickTodo = document.getElementById("btn-add-quick-todo");
const quickTodoListContainer = document.getElementById("quick-todo-list");
const btnClearQuickTodos = document.getElementById("btn-clear-quick-todos");

const cfgSyncId = document.getElementById("cfg-sync-id");
const cfgSyncPass = document.getElementById("cfg-sync-pass");
const chkRgpdConsent = document.getElementById("chk-rgpd-consent");
const btnTogglePass = document.getElementById("btn-toggle-pass");
const btnSaveSettings = document.getElementById("btn-save-settings");
const btnLogoutGuest = document.getElementById("btn-logout-guest");
const btnExportData = document.getElementById("btn-export-data");
const btnDeleteAccount = document.getElementById("btn-delete-account");
const onboardingModal = document.getElementById("onboarding-modal");

// =========================================================
// 1. GESTIÓ DE FINESTRES FLOTANTS / WIDGETS (PC, MAC, ANDROID, iOS)
// =========================================================
async function openFloatingWidget(type) {
  const targetUrl = new URL(window.location.href);
  targetUrl.searchParams.set("widget", type);
  targetUrl.searchParams.set("view", type === "todo" ? "view-quick-todo" : "view-pomodoro");

  // 1) Si l'ordinador suporta Document Picture-in-Picture API (Chrome/Edge Desktop Always-on-Top natiu)
  if ("documentPictureInPicture" in window) {
    try {
      const pipWindow = await window.documentPictureInPicture.requestWindow({
        width: 370,
        height: type === "todo" ? 480 : 520
      });
      const iframe = pipWindow.document.createElement("iframe");
      iframe.src = targetUrl.toString();
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.border = "none";
      pipWindow.document.body.style.margin = "0";
      pipWindow.document.body.style.overflow = "hidden";
      pipWindow.document.body.appendChild(iframe);
      return;
    } catch (err) {
      console.log("Obrint amb window.open clàssic:", err);
    }
  }

  // 2) Fallback universal: Finestra flotant independent amb mides de Widget (370x500)
  const features = "popup=yes,width=370,height=510,left=80,top=80,resizable=yes,scrollbars=yes,menubar=no,toolbar=no,location=no,status=no";
  const win = window.open(targetUrl.toString(), `aibuddy_widget_${type}`, features);
  if (!win) {
    // Si estem en navegador mòbil amb bloqueig de popups, canviem directament a la vista
    if (type === "todo") switchView("view-quick-todo");
    else openPomodoroView();
  }
}
window.openFloatingWidget = openFloatingWidget;

// Sincronització en temps real entre la finestra principal i les finestres flotants
window.addEventListener("storage", (e) => {
  if (e.key === getLocalStorageKey()) {
    loadLocalState();
    updateAllDisplays();
  }
});

// =========================================================
// 2. SISTEMA D'HISTORIAL, STREAKS I DASHBOARD
// =========================================================
function logActivity(type, text) {
  if (!Array.isArray(state.activityLog)) state.activityLog = [];
  const now = new Date();
  state.activityLog.unshift({
    type, // 'todo' | 'thought' | 'routine' | 'pomo'
    text,
    date: now.toISOString().slice(0, 10),
    time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  });
  if (state.activityLog.length > 60) state.activityLog = state.activityLog.slice(0, 60);

  const todayIso = now.toISOString().slice(0, 10);
  if (!Array.isArray(state.activeDays)) state.activeDays = [];
  if (!state.activeDays.includes(todayIso)) {
    state.activeDays.push(todayIso);
  }
}

function calculateStreak() {
  if (!Array.isArray(state.activeDays) || state.activeDays.length === 0) return 1;
  const uniqueDays = [...new Set(state.activeDays)].sort().reverse();
  let streak = 0;
  const cursor = new Date();

  for (let i = 0; i < 365; i++) {
    const iso = cursor.toISOString().slice(0, 10);
    if (uniqueDays.includes(iso)) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else if (i === 0) {
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }
  return Math.max(1, streak);
}

function setDashFilter(filter) {
  currentDashFilter = filter;
  ["all", "pending", "routine"].forEach(tab => {
    const btn = document.getElementById(`dash-tab-${tab}`);
    if (!btn) return;
    if (tab === filter) {
      btn.className = "px-2.5 py-1 rounded-lg bg-[#5C8ED6] text-white transition";
    } else {
      btn.className = "px-2.5 py-1 rounded-lg opacity-75 hover:opacity-100 transition";
    }
  });
  renderDashboard();
}
window.setDashFilter = setDashFilter;

function renderDashboard() {
  // 1. Salutació i Data/Hora
  const greetEl = document.getElementById("dash-greeting");
  const dtEl = document.getElementById("dash-datetime");
  const streakBadge = document.getElementById("dash-streak-badge");

  const now = new Date();
  const hour = now.getHours();
  const greetingPrefix = hour < 13 ? "Bon dia" : hour < 20 ? "Bona tarda" : "Bona nit";
  const userName = isGuestMode() ? "Convidat" : config.syncUser;
  if (greetEl) greetEl.textContent = `${greetingPrefix}, ${userName}! 👋`;

  if (dtEl) {
    const formattedDate = now.toLocaleDateString("ca-ES", { weekday: "short", day: "numeric", month: "short" });
    const formattedTime = now.toLocaleTimeString("ca-ES", { hour: "2-digit", minute: "2-digit" });
    dtEl.textContent = `📅 ${formattedDate} · ⏰ ${formattedTime}`;
  }

  const streakCount = calculateStreak();
  if (streakBadge) {
    streakBadge.textContent = `🔥 ${streakCount} ${streakCount === 1 ? "dia actiu" : "dies seguits"}`;
  }

  // 2. KPIs i Anells de Progrés
  const todos = state.quickTodoList || [];
  const totalTodos = todos.length;
  const doneTodos = todos.filter(t => t.completed).length;
  const pendingTodos = totalTodos - doneTodos;
  const pctTodo = totalTodos === 0 ? 0 : Math.round((doneTodos / totalTodos) * 100);

  const ringTodo = document.getElementById("kpi-ring-todo");
  const pctTodoEl = document.getElementById("kpi-pct-todo");
  const cntTodoEl = document.getElementById("kpi-count-todo");
  if (ringTodo) ringTodo.style.strokeDashoffset = String(94.2 - (94.2 * pctTodo) / 100);
  if (pctTodoEl) pctTodoEl.textContent = `${pctTodo}%`;
  if (cntTodoEl) cntTodoEl.textContent = `${pendingTodos} pendents`;

  const selectedHabits = getSelectedRoutineHabits();
  const totalHabits = selectedHabits.length;
  const doneHabits = Math.min(state.routineIndex || 0, totalHabits);
  const pctRoutine = totalHabits === 0 ? 0 : Math.round((doneHabits / totalHabits) * 100);

  const ringRoutine = document.getElementById("kpi-ring-routine");
  const pctRoutineEl = document.getElementById("kpi-pct-routine");
  const cntRoutineEl = document.getElementById("kpi-count-routine");
  if (ringRoutine) ringRoutine.style.strokeDashoffset = String(94.2 - (94.2 * pctRoutine) / 100);
  if (pctRoutineEl) pctRoutineEl.textContent = `${pctRoutine}%`;
  if (cntRoutineEl) cntRoutineEl.textContent = `${doneHabits}/${totalHabits} completats`;

  const cntPomoEl = document.getElementById("kpi-count-pomo");
  if (cntPomoEl) cntPomoEl.textContent = `${state.completedPomodoros || 0} completats`;

  const cntThoughtsEl = document.getElementById("kpi-count-thoughts");
  if (cntThoughtsEl) cntThoughtsEl.textContent = `${(state.parkedThoughts || []).length} aparcats`;

  // 3. Llista d'activitat activa del dia + Empty State guiat
  const activeListEl = document.getElementById("dash-active-list");
  if (activeListEl) {
    activeListEl.innerHTML = "";
    const items = [];

    if (currentDashFilter === "all" || currentDashFilter === "pending") {
      todos.forEach((t, idx) => {
        if (currentDashFilter === "pending" && t.completed) return;
        items.push({ kind: "todo", idx, text: t.text, completed: t.completed });
      });
    }

    if (currentDashFilter === "all" || currentDashFilter === "routine") {
      selectedHabits.forEach((h, hIdx) => {
        const isDone = hIdx < (state.routineIndex || 0);
        if (currentDashFilter === "pending" && isDone) return;
        items.push({ kind: "routine", idx: hIdx, text: `${h.icon} ${h.text}`, completed: isDone });
      });
    }

    if (items.length === 0) {
      activeListEl.innerHTML = `
        <div class="bg-subtle border border-dashed border-theme rounded-2xl p-6 text-center space-y-2.5">
          <div class="text-2xl">🌱</div>
          <p class="text-xs font-extrabold">Tot net! No tens cap element actiu en aquesta vista.</p>
          <p class="text-[11px] opacity-75">Afegeix una tasca ràpida o tria una plantilla antibloqueig per començar.</p>
          <div class="flex justify-center gap-2 pt-1">
            <button type="button" onclick="switchView('view-quick-todo')" class="btn-primary text-xs font-bold px-3.5 py-2 rounded-xl">+ Nova Tasca Ràpida</button>
            <button type="button" onclick="switchView('view-templates')" class="btn-accent text-xs font-bold px-3.5 py-2 rounded-xl">📋 Plantilles</button>
          </div>
        </div>
      `;
    } else {
      items.forEach(item => {
        const row = document.createElement("div");
        row.className = "bg-subtle border border-theme px-3.5 py-2.5 rounded-2xl flex justify-between items-center text-xs gap-2";
        row.innerHTML = `
          <label class="flex items-center gap-2.5 cursor-pointer flex-1 overflow-hidden">
            <input type="checkbox" class="w-4 h-4 accent-[#5C8ED6] rounded cursor-pointer shrink-0" ${item.completed ? "checked" : ""} />
            <span class="font-semibold truncate ${item.completed ? "line-through opacity-55" : ""}">${item.text}</span>
          </label>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${item.kind === "todo" ? "bg-[#5C8ED6]/20 text-[#5C8ED6]" : "bg-[#F7E671] text-[#1A1A1A]"}">
            ${item.kind === "todo" ? "To-Do" : "Rutina"}
          </span>
        `;
        row.querySelector("input").addEventListener("change", (e) => {
          if (item.kind === "todo") {
            state.quickTodoList[item.idx].completed = e.target.checked;
            if (e.target.checked) logActivity("todo", `Completada: ${state.quickTodoList[item.idx].text}`);
          } else {
            state.routineIndex = e.target.checked ? item.idx + 1 : item.idx;
            if (e.target.checked) logActivity("routine", `Pas rutina: ${item.text}`);
          }
          saveState();
        });
        activeListEl.appendChild(row);
      });
    }
  }

  // 4. Visualització dels últims 7 dies (Streaks)
  const streakDaysEl = document.getElementById("dash-streak-days");
  if (streakDaysEl) {
    streakDaysEl.innerHTML = "";
    const diesSetmana = ["Dg", "Dl", "Dt", "Dc", "Dj", "Dv", "Ds"];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const iso = d.toISOString().slice(0, 10);
      const active = (state.activeDays || []).includes(iso) || i === 0;
      const cell = document.createElement("div");
      cell.className = `p-1.5 rounded-xl flex flex-col items-center gap-1 border ${active ? "bg-[#F7E671] text-[#1A1A1A] border-[#2B4380] font-extrabold" : "opacity-50 border-transparent"}`;
      cell.innerHTML = `
        <span class="text-[10px]">${diesSetmana[d.getDay()]}</span>
        <span class="text-xs">${active ? "🔥" : "·"}</span>
      `;
      streakDaysEl.appendChild(cell);
    }
  }

  renderHistoryList();
}

function renderHistoryList() {
  const histContainer = document.getElementById("dash-history-list");
  if (!histContainer) return;

  const query = (document.getElementById("history-search-input")?.value || "").trim().toLowerCase();
  const typeFilter = document.getElementById("history-type-filter")?.value || "all";

  const logs = (state.activityLog || []).filter(entry => {
    const matchesType = typeFilter === "all" || entry.type === typeFilter;
    const matchesQuery = !query || entry.text.toLowerCase().includes(query);
    return matchesType && matchesQuery;
  });

  histContainer.innerHTML = "";
  if (logs.length === 0) {
    histContainer.innerHTML = `<p class="text-[11px] opacity-60 text-center py-4">Cap registre a l'historial amb aquest filtre.</p>`;
    return;
  }

  logs.slice(0, 12).forEach(entry => {
    const div = document.createElement("div");
    div.className = "bg-subtle border border-theme px-3 py-2 rounded-xl flex justify-between items-center gap-2";
    div.innerHTML = `
      <span class="truncate font-medium">${entry.text}</span>
      <span class="text-[10px] opacity-60 shrink-0">${entry.time}</span>
    `;
    histContainer.appendChild(div);
  });
}

document.getElementById("history-search-input")?.addEventListener("input", renderHistoryList);
document.getElementById("history-type-filter")?.addEventListener("change", renderHistoryList);

// =========================================================
// 3. PLANTILLES RÀPIDES ANTIBLOQUEIG (TARGETES HORITZONTALS)
// =========================================================
function renderTemplatesView() {
  const container = document.getElementById("templates-cards-container");
  if (!container) return;
  container.innerHTML = "";

  Object.keys(catalegTasquesTDAH).forEach(key => {
    const item = catalegTasquesTDAH[key];
    const card = document.createElement("div");
    card.className = "bg-card border-2 border-theme hover:border-[#5C8ED6] rounded-3xl p-4 flex items-center gap-4 shadow-sm transition";
    card.innerHTML = `
      <!-- Espai quadrat per a imatge o icona a l'esquerra -->
      <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#5C8ED6]/15 border-2 border-[#5C8ED6]/40 flex items-center justify-center text-3xl shrink-0">
        ${item.icona || "📋"}
      </div>
      <!-- Bloc de text a la dreta amb títol en negreta, descripció i botó Read Details -->
      <div class="flex-1 min-w-0">
        <h3 class="text-sm sm:text-base font-extrabold truncate">${item.titol}</h3>
        <p class="text-xs opacity-80 mt-0.5 line-clamp-2 leading-relaxed">${item.descripcio}</p>
        <div class="mt-2.5">
          <button type="button" data-template="${key}" class="btn-accent text-xs font-extrabold px-4 py-1.5 rounded-xl shadow-sm">
            Read Details &#8250;
          </button>
        </div>
      </div>
    `;
    card.querySelector("button").addEventListener("click", () => {
      loadTemplate(key);
      switchView("view-tasks");
    });
    container.appendChild(card);
  });
}

// =========================================================
// 4. RUTINA GUIADA DE PASSOS (GRAELLA D'HÀBITS SELECCIONABLES)
// =========================================================
function ensureCatalogsIntegrity() {
  if (!Array.isArray(state.routineCatalog) || state.routineCatalog.length === 0) {
    state.routineCatalog = JSON.parse(JSON.stringify(defaultRoutineCatalog));
  }
  if (!Array.isArray(state.hobbiesCatalog) || state.hobbiesCatalog.length === 0) {
    state.hobbiesCatalog = JSON.parse(JSON.stringify(defaultHobbiesCatalog));
  }
}

function getSelectedRoutineHabits() {
  ensureCatalogsIntegrity();
  return state.routineCatalog.filter(h => h.selected);
}

function renderRoutineGrid() {
  ensureCatalogsIntegrity();
  if (!routineHabitsGrid) return;
  routineHabitsGrid.innerHTML = "";

  const selectedList = getSelectedRoutineHabits();

  state.routineCatalog.forEach((habit, idx) => {
    const btn = document.createElement("div");
    const isCurrentActiveStep = habit.selected && selectedList[state.routineIndex]?.id === habit.id;
    btn.className = `habit-capsule ${habit.selected ? "selected" : ""} ${isCurrentActiveStep ? "ring-4 ring-[#5C8ED6]" : ""}`;
    btn.innerHTML = `
      <div class="flex items-center gap-2.5 overflow-hidden">
        <span class="text-lg shrink-0">${habit.icon || "🌅"}</span>
        <span class="text-xs sm:text-sm truncate">${habit.text}</span>
      </div>
      <span class="text-xs font-extrabold px-2 py-0.5 rounded-full ${habit.selected ? "bg-[#2B4380] text-white" : "opacity-50"}">
        ${habit.selected ? "✓ Actiu" : "+ Triar"}
      </span>
    `;
    btn.addEventListener("click", () => {
      state.routineCatalog[idx].selected = !state.routineCatalog[idx].selected;
      state.routineIndex = 0;
      saveState();
    });
    routineHabitsGrid.appendChild(btn);
  });
}

function updateRoutineDisplay() {
  renderRoutineGrid();
  if (!routineStepDisplay) return;

  const selected = getSelectedRoutineHabits();
  if (selected.length === 0) {
    if (routineCompletionBadge) {
      routineCompletionBadge.classList.add("hidden");
      routineCompletionBadge.classList.remove("flex");
    }
    routineStepDisplay.classList.remove("hidden");
    routineStepDisplay.textContent = "Tria almenys un hàbit a la graella per iniciar la teva rutina.";
    return;
  }

  if (state.routineIndex < selected.length) {
    if (routineCompletionBadge) {
      routineCompletionBadge.classList.add("hidden");
      routineCompletionBadge.classList.remove("flex");
    }
    routineStepDisplay.classList.remove("hidden");
    const current = selected[state.routineIndex];
    routineStepDisplay.textContent = `Pas ${state.routineIndex + 1} de ${selected.length}: ${current.icon} ${current.text}`;
  } else {
    routineStepDisplay.textContent = "Has completat tots els hàbits seleccionats d'avui!";
    if (routineCompletionBadge) {
      routineCompletionBadge.classList.remove("hidden");
      routineCompletionBadge.classList.add("flex");
    }
  }
}

// =========================================================
// 5. HOBBIES DE DESCANS (GRAELLA DE CÀPSULES SELECCIONABLES)
// =========================================================
function updateHobbyDisplay() {
  ensureCatalogsIntegrity();
  if (!hobbiesCapsulesGrid) return;
  hobbiesCapsulesGrid.innerHTML = "";

  const selectedCount = state.hobbiesCatalog.filter(h => h.selected).length;
  if (hobbyStepDisplay) {
    hobbyStepDisplay.textContent = selectedCount > 0
      ? `Tens ${selectedCount} activitats de descans seleccionades per avui`
      : "Tria les teves activitats preferides a la graella o afegeix-ne una de nova";
  }

  state.hobbiesCatalog.forEach((hobby, idx) => {
    const capsule = document.createElement("div");
    capsule.className = `habit-capsule ${hobby.selected ? "selected" : ""}`;
    capsule.innerHTML = `
      <div class="flex items-center gap-2.5 overflow-hidden">
        <span class="text-lg shrink-0">${hobby.icon || "🎨"}</span>
        <span class="text-xs sm:text-sm truncate">${hobby.text}</span>
      </div>
      <span class="text-xs font-extrabold">${hobby.selected ? "★ Triat" : "○"}</span>
    `;
    capsule.addEventListener("click", () => {
      state.hobbiesCatalog[idx].selected = !state.hobbiesCatalog[idx].selected;
      saveState();
    });
    hobbiesCapsulesGrid.appendChild(capsule);
  });
}

// =========================================================
// 6. SINCRONITZACIÓ, ESTAT LOCAL I SUPABASE
// =========================================================
function checkInitialOnboarding() {
  const seenOnboarding = localStorage.getItem("aibuddy_guest_onboarding_seen");
  const isWidget = new URLSearchParams(window.location.search).has("widget");
  if (isGuestMode() && !seenOnboarding && !isWidget) {
    openOnboarding();
  }
}

function openOnboarding() {
  if (onboardingModal) onboardingModal.classList.remove("hidden");
}
window.openOnboarding = openOnboarding;

function closeOnboarding() {
  if (onboardingModal) onboardingModal.classList.add("hidden");
  localStorage.setItem("aibuddy_guest_onboarding_seen", "true");
}
window.closeOnboarding = closeOnboarding;

window.togglePassVisibility = function() {
  const passInput = document.getElementById("cfg-sync-pass");
  const toggleBtn = document.getElementById("btn-toggle-pass");
  if (!passInput) return;
  if (passInput.type === "password") {
    passInput.type = "text";
    if (toggleBtn) toggleBtn.textContent = "🙈";
  } else {
    passInput.type = "password";
    if (toggleBtn) toggleBtn.textContent = "👁️";
  }
};

function isGuestMode() {
  const user = (config.syncUser || "").trim().toLowerCase();
  return !user || user === "convidat" || !config.syncHash;
}

function getLocalStorageKey() {
  if (isGuestMode()) return "aibuddy_state_convidat";
  return `aibuddy_state_${config.syncHash}`;
}

function cleanSupaUrl(rawUrl) {
  if (!rawUrl) return "";
  return rawUrl.trim().replace(/\/rest\/v1\/?$/i, "").replace(/\/+$/, "");
}

async function computeSecureSyncHash(username, password) {
  const normalizedUser = username.trim().toLowerCase();
  const cleanPass = password.trim();
  const rawPayload = `aibuddy_v1_salt::${normalizedUser}::${cleanPass}`;
  const msgBuffer = new TextEncoder().encode(rawPayload);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  return `u_${hashHex.slice(0, 40)}`;
}

function ensurePomoConfigIntegrity() {
  if (!state.pomoConfig || typeof state.pomoConfig !== "object") {
    state.pomoConfig = { ...defaultPomoConfig };
  } else {
    state.pomoConfig = {
      focusMin: Math.max(1, parseInt(state.pomoConfig.focusMin, 10) || 25),
      shortBreakMin: Math.max(1, parseInt(state.pomoConfig.shortBreakMin, 10) || 5),
      longBreakMin: Math.max(1, parseInt(state.pomoConfig.longBreakMin, 10) || 15),
      cyclesBeforeLong: Math.max(1, parseInt(state.pomoConfig.cyclesBeforeLong, 10) || 5)
    };
  }
  if (typeof state.completedPomodoros !== "number" || state.completedPomodoros < 0) {
    state.completedPomodoros = 0;
  }
}

function loadLocalState() {
  state = getInitialState();
  const saved = localStorage.getItem(getLocalStorageKey());
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      state = { ...state, ...parsed };
    } catch (e) {
      console.error("Error carregant estat local:", e);
    }
  }
  ensurePomoConfigIntegrity();
  ensureCatalogsIntegrity();
  syncPomoInputsFromState();
}

async function saveState() {
  ensurePomoConfigIntegrity();
  state.updatedAt = Date.now();
  localStorage.setItem(getLocalStorageKey(), JSON.stringify(state));
  updateAllDisplays();

  if (isGuestMode()) {
    if (statusBadge) statusBadge.textContent = "⚪ Convidat";
    return;
  }

  const baseUrl = cleanSupaUrl(config.supaUrl);
  if (!baseUrl || !config.supaKey || !config.syncHash) return;

  try {
    if (statusBadge) statusBadge.textContent = "🔄 Sincr...";
    const res = await fetch(`${baseUrl}/rest/v1/user_state`, {
      method: "POST",
      headers: {
        "apikey": config.supaKey,
        "Authorization": `Bearer ${config.supaKey}`,
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates"
      },
      body: JSON.stringify({
        id: config.syncHash,
        data: state,
        updated_at: new Date().toISOString()
      })
    });

    if (res.ok) {
      if (statusBadge) statusBadge.textContent = `🟢 ${config.syncUser}`;
    } else {
      if (statusBadge) statusBadge.textContent = "🟠 Error Núvol";
    }
  } catch (err) {
    if (statusBadge) statusBadge.textContent = "⚪ Offline";
  }
}

async function pullRemoteState() {
  if (isGuestMode()) {
    if (statusBadge) statusBadge.textContent = "⚪ Convidat";
    return false;
  }

  const baseUrl = cleanSupaUrl(config.supaUrl);
  if (!baseUrl || !config.supaKey || !config.syncHash) return false;

  try {
    const url = `${baseUrl}/rest/v1/user_state?id=eq.${encodeURIComponent(config.syncHash)}&select=data`;
    const res = await fetch(url, {
      headers: {
        "apikey": config.supaKey,
        "Authorization": `Bearer ${config.supaKey}`
      }
    });

    if (res.ok) {
      const rows = await res.json();
      if (rows.length > 0 && rows[0].data) {
        const remoteState = rows[0].data;
        if ((remoteState.updatedAt || 0) > (state.updatedAt || 0)) {
          state = { ...state, ...remoteState };
          ensurePomoConfigIntegrity();
          ensureCatalogsIntegrity();
          localStorage.setItem(getLocalStorageKey(), JSON.stringify(state));
          syncPomoInputsFromState();
          updateAllDisplays();
        }
        if (statusBadge) statusBadge.textContent = `🟢 ${config.syncUser}`;
        return false;
      } else {
        await saveState();
        return true;
      }
    }
  } catch (e) {
    if (statusBadge) statusBadge.textContent = "⚪ Offline";
  }
  return false;
}

window.addEventListener("focus", pullRemoteState);
setInterval(pullRemoteState, 20000);

// --- NAVEGACIÓ DE VISTES ---
function switchView(viewId) {
  const views = [
    "view-menu",
    "view-tasks",
    "view-templates",
    "view-thoughts",
    "view-pomodoro",
    "view-routine",
    "view-hobbies",
    "view-settings",
    "view-quick-todo"
  ];
  views.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden");
  });

  const target = document.getElementById(viewId);
  if (target) target.classList.remove("hidden");

  if (viewId === "view-settings") {
    if (cfgSyncId) cfgSyncId.value = config.syncUser || "convidat";
    if (cfgSyncPass) {
      cfgSyncPass.value = "";
      cfgSyncPass.type = "password";
    }
    if (chkRgpdConsent) chkRgpdConsent.checked = config.rgpdConsent || !isGuestMode();
    if (btnTogglePass) btnTogglePass.textContent = "👁️";
    syncPomoInputsFromState();
  }
  updateAllDisplays();
}
window.switchView = switchView;

function updateAllDisplays() {
  renderDashboard();
  updateTaskDisplay();
  renderTemplatesView();
  updateRoutineDisplay();
  updateHobbyDisplay();
  renderParkedThoughts();
  renderQuickTodoList();
  updatePomodoroCycleText();
}

function updateTaskDisplay() {
  if (!stepDisplay || !completionBadge || !stepCounter) return;

  if (Array.isArray(state.currentSteps) && state.currentSteps.length > 0 && state.currentIndex < state.currentSteps.length) {
    completionBadge.classList.add("hidden");
    completionBadge.classList.remove("flex");
    stepDisplay.classList.remove("hidden");
    stepDisplay.textContent = state.currentSteps[state.currentIndex];
    stepCounter.textContent = `PAS ${state.currentIndex + 1} DE ${state.currentSteps.length}`;
  } else {
    stepDisplay.classList.add("hidden");
    if (taskCompleteImg) taskCompleteImg.src = IMAGES.completat;
    completionBadge.classList.remove("hidden");
    completionBadge.classList.add("flex");
    stepCounter.textContent = "COMPLETAT";
  }
}

// --- BOTONS DE MICRO-PASSOS ---
if (btnOk) {
  btnOk.addEventListener("click", () => {
    if (state.currentIndex < state.currentSteps.length) {
      const finishedStep = state.currentSteps[state.currentIndex];
      state.currentIndex++;
      logActivity("todo", `Pas completat: ${finishedStep}`);
      saveState();
    }
  });
}

if (btnNext) {
  btnNext.addEventListener("click", () => {
    if (state.currentIndex < state.currentSteps.length - 1) {
      state.currentIndex++;
      saveState();
    }
  });
}

if (btnPrev) {
  btnPrev.addEventListener("click", () => {
    if (state.currentIndex > 0) {
      state.currentIndex--;
      saveState();
    }
  });
}

function loadTemplate(categoriaId) {
  if (catalegTasquesTDAH[categoriaId]) {
    state.currentSteps = [...catalegTasquesTDAH[categoriaId].passos];
    state.currentIndex = 0;
    saveState();
    showToast(`📋 Plantilla: ${catalegTasquesTDAH[categoriaId].titol}`);
  }
}
window.loadTemplate = loadTemplate;

// --- MOTOR HEURÍSTIC LOCAL DE MICRO-PASSOS ---
function normalitzarText(str) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function generarMicroPassos(rawTask) {
  const original = (rawTask || "").trim();
  const normalitzat = normalitzarText(original);

  for (const key in catalegTasquesTDAH) {
    const categoria = catalegTasquesTDAH[key];
    const coincideix = categoria.paraules_clau.some(paraula =>
      normalitzat.includes(normalitzarText(paraula))
    );
    if (coincideix) return [...categoria.passos];
  }

  const resumTasca = original.split(/\s+/).slice(0, 4).join(" ");
  return [
    `Preparar només el material bàsic per a "${resumTasca}"`,
    "Fer únicament el primer micro-pas durant 3 minuts",
    "Continuar amb la part més senzilla sense perfeccionisme",
    "Revisar i desar el que ja has avançat"
  ];
}

if (btnSend && taskInput) {
  btnSend.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (!taskText) return;
    taskInput.value = "";
    state.currentSteps = generarMicroPassos(taskText);
    state.currentIndex = 0;
    logActivity("todo", `Desglossada: ${taskText}`);
    saveState();
    switchView("view-tasks");
  });

  taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") btnSend.click();
  });
}

// --- CONTROLS DE LA RUTINA GUIADA ---
if (btnRoutineOk) {
  btnRoutineOk.addEventListener("click", () => {
    const selected = getSelectedRoutineHabits();
    if (selected.length === 0) return;
    if (state.routineIndex < selected.length) {
      logActivity("routine", `Fet: ${selected[state.routineIndex].text}`);
      state.routineIndex++;
    } else {
      state.routineIndex = 0;
    }
    saveState();
  });
}

if (btnRoutineNext) {
  btnRoutineNext.addEventListener("click", () => {
    const selected = getSelectedRoutineHabits();
    if (state.routineIndex < selected.length - 1) {
      state.routineIndex++;
      saveState();
    }
  });
}

if (btnRoutinePrev) {
  btnRoutinePrev.addEventListener("click", () => {
    if (state.routineIndex > 0) {
      state.routineIndex--;
      saveState();
    }
  });
}

if (btnRoutineAdd && routineInputNew) {
  btnRoutineAdd.addEventListener("click", () => {
    const text = routineInputNew.value.trim();
    if (!text) return;
    ensureCatalogsIntegrity();
    state.routineCatalog.push({
      id: `custom_${Date.now()}`,
      text,
      icon: "✨",
      selected: true
    });
    routineInputNew.value = "";
    saveState();
    showToast("✓ Pas afegit a la rutina");
  });

  routineInputNew.addEventListener("keydown", (e) => {
    if (e.key === "Enter") btnRoutineAdd.click();
  });
}

if (btnRoutineReset) {
  btnRoutineReset.addEventListener("click", () => {
    ensureCatalogsIntegrity();
    state.routineCatalog.forEach(h => { h.selected = false; });
    state.routineIndex = 0;
    saveState();
    showToast("Rutina buidada");
  });
}

// --- CONTROLS DE HOBBIES DE DESCANS ---
if (btnHobbyAdd && hobbyInputNew) {
  btnHobbyAdd.addEventListener("click", () => {
    const newHobby = hobbyInputNew.value.trim();
    if (!newHobby) return;
    ensureCatalogsIntegrity();
    state.hobbiesCatalog.push({
      id: `hobby_${Date.now()}`,
      text: newHobby,
      icon: "🌟",
      selected: true
    });
    hobbyInputNew.value = "";
    saveState();
    showToast("✓ Hobby afegit");
  });

  hobbyInputNew.addEventListener("keydown", (e) => {
    if (e.key === "Enter") btnHobbyAdd.click();
  });
}

if (btnHobbyReset) {
  btnHobbyReset.addEventListener("click", () => {
    state.hobbiesCatalog = [];
    saveState();
    showToast("Llista de hobbies buidada");
  });
}

// --- TO-DO LIST RÀPIDA ---
function renderQuickTodoList() {
  if (!quickTodoListContainer) return;
  quickTodoListContainer.innerHTML = "";

  if (!state.quickTodoList || state.quickTodoList.length === 0) {
    quickTodoListContainer.innerHTML = '<p class="text-xs opacity-60 text-center py-6">No hi ha tasques ràpides pendents.</p>';
    return;
  }

  state.quickTodoList.forEach((item, idx) => {
    const todoItem = document.createElement("div");
    todoItem.className = "bg-subtle border border-theme p-3 rounded-2xl flex justify-between items-center text-xs gap-2 transition";

    const leftDiv = document.createElement("label");
    leftDiv.className = "flex items-center gap-3 overflow-hidden cursor-pointer flex-1";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.completed || false;
    checkbox.className = "w-4 h-4 accent-[#5C8ED6] rounded cursor-pointer shrink-0";
    checkbox.addEventListener("change", () => {
      state.quickTodoList[idx].completed = checkbox.checked;
      if (checkbox.checked) logActivity("todo", `Fet: ${item.text}`);
      saveState();
    });

    const textSpan = document.createElement("span");
    textSpan.className = `font-semibold break-words ${item.completed ? "line-through opacity-50" : ""}`;
    textSpan.textContent = item.text;

    leftDiv.appendChild(checkbox);
    leftDiv.appendChild(textSpan);

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.className = "opacity-60 hover:opacity-100 font-bold text-xs px-2 py-1 shrink-0";
    delBtn.textContent = "✕";
    delBtn.setAttribute("aria-label", `Esborrar tasca: ${item.text}`);
    delBtn.addEventListener("click", () => {
      state.quickTodoList.splice(idx, 1);
      saveState();
    });

    todoItem.appendChild(leftDiv);
    todoItem.appendChild(delBtn);
    quickTodoListContainer.appendChild(todoItem);
  });
}

if (btnAddQuickTodo && quickTodoInput) {
  btnAddQuickTodo.addEventListener("click", () => {
    const text = quickTodoInput.value.trim();
    if (text) {
      state.quickTodoList.push({ text, completed: false });
      quickTodoInput.value = "";
      logActivity("todo", `Afegida: ${text}`);
      saveState();
      showToast("✓ Tasca ràpida afegida");
    }
  });

  quickTodoInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") btnAddQuickTodo.click();
  });
}

if (btnClearQuickTodos) {
  btnClearQuickTodos.addEventListener("click", () => {
    state.quickTodoList = [];
    saveState();
    showToast("Tasques ràpides esborrades");
  });
}

// --- PENSAMENTS APARCATS (DES DEL PEU DE PÀGINA O DES DEL POMODORO) ---
function showToast(msg = "+ Pensament guardat") {
  if (!toastNotification) return;
  toastNotification.textContent = msg;
  toastNotification.classList.remove("opacity-0", "translate-y-[-10px]");
  toastNotification.classList.add("opacity-100", "translate-y-0");

  setTimeout(() => {
    toastNotification.classList.remove("opacity-100", "translate-y-0");
    toastNotification.classList.add("opacity-0", "translate-y-[-10px]");
  }, 2500);
}

function parkNewThought(rawText) {
  const thoughtText = (rawText || "").trim();
  if (!thoughtText) return;
  const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  state.parkedThoughts.push({ text: thoughtText, time: timeStr });
  logActivity("thought", `💭 ${thoughtText}`);
  saveState();
  showToast("+ Pensament aparcat");
}

if (btnPark && thoughtInput) {
  btnPark.addEventListener("click", () => {
    parkNewThought(thoughtInput.value);
    thoughtInput.value = "";
  });
  thoughtInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") btnPark.click();
  });
}

if (btnPomoPark && pomoThoughtInput) {
  btnPomoPark.addEventListener("click", () => {
    parkNewThought(pomoThoughtInput.value);
    pomoThoughtInput.value = "";
  });
  pomoThoughtInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") btnPomoPark.click();
  });
}

function renderParkedThoughts() {
  if (!thoughtsListContainer) return;
  thoughtsListContainer.innerHTML = "";
  if (!state.parkedThoughts || state.parkedThoughts.length === 0) {
    thoughtsListContainer.innerHTML = '<p class="text-xs opacity-60 text-center py-8 md:col-span-2">No hi ha pensaments aparcats encara.</p>';
    return;
  }

  state.parkedThoughts.forEach((item, idx) => {
    const thoughtItem = document.createElement("div");
    thoughtItem.className = "bg-subtle border border-theme p-3 rounded-2xl flex justify-between items-center text-xs gap-2";
    thoughtItem.innerHTML = `
      <span class="font-semibold break-words">${item.text}</span>
      <div class="flex items-center gap-2 shrink-0">
        <span class="text-[10px] opacity-60">${item.time}</span>
        <button type="button" class="opacity-60 hover:opacity-100 font-bold px-1">✕</button>
      </div>
    `;
    thoughtItem.querySelector("button").addEventListener("click", () => {
      state.parkedThoughts.splice(idx, 1);
      saveState();
    });
    thoughtsListContainer.appendChild(thoughtItem);
  });
}

if (btnClearThoughts) {
  btnClearThoughts.addEventListener("click", () => {
    state.parkedThoughts = [];
    saveState();
  });
}

// --- POMODORO SENSORIAL ---
function syncPomoInputsFromState() {
  ensurePomoConfigIntegrity();
  const cfg = state.pomoConfig;
  if (pomoCfgFocus) pomoCfgFocus.value = cfg.focusMin;
  if (pomoCfgShort) pomoCfgShort.value = cfg.shortBreakMin;
  if (pomoCfgLong) pomoCfgLong.value = cfg.longBreakMin;
  if (pomoCfgCycles) pomoCfgCycles.value = cfg.cyclesBeforeLong;

  if (settingsPomoFocus) settingsPomoFocus.value = cfg.focusMin;
  if (settingsPomoShort) settingsPomoShort.value = cfg.shortBreakMin;
  if (settingsPomoLong) settingsPomoLong.value = cfg.longBreakMin;
  if (settingsPomoCycles) settingsPomoCycles.value = cfg.cyclesBeforeLong;
}

function formatSeconds(sec) {
  const safeSec = Math.max(0, Math.floor(sec));
  const m = String(Math.floor(safeSec / 60)).padStart(2, "0");
  const s = String(safeSec % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function getPhaseDurationSeconds(phase) {
  ensurePomoConfigIntegrity();
  const cfg = state.pomoConfig;
  if (phase === "shortBreak") return cfg.shortBreakMin * 60;
  if (phase === "longBreak") return cfg.longBreakMin * 60;
  return cfg.focusMin * 60;
}

function updatePomodoroCycleText() {
  ensurePomoConfigIntegrity();
  if (pomoCycleCounter) {
    const target = state.pomoConfig.cyclesBeforeLong;
    const currentInCycle = state.completedPomodoros % target;
    pomoCycleCounter.textContent = `Pomodoros completats: ${currentInCycle} / ${target} (Total: ${state.completedPomodoros})`;
  }
}

function setupPomodoroPhase(phase, autoStart = true) {
  pomoPhase = phase;
  pomoTotalSeconds = getPhaseDurationSeconds(phase);
  pomoCurrentSeconds = pomoTotalSeconds;
  isPomoPaused = !autoStart;

  if (btnPomoOk) btnPomoOk.textContent = isPomoPaused ? "Reprendre" : "Pausar";
  if (pomoBar) pomoBar.style.width = "100%";

  updatePomodoroCycleText();
  updatePomodoroVisuals();

  if (pomoTimer) clearInterval(pomoTimer);
  pomoTimer = setInterval(tickPomodoro, 1000);
}

function tickPomodoro() {
  if (isPomoPaused) return;
  pomoCurrentSeconds--;
  const percentage = Math.max(0, (pomoCurrentSeconds / pomoTotalSeconds) * 100);
  if (pomoBar) pomoBar.style.width = `${percentage}%`;
  updatePomodoroVisuals();

  if (pomoCurrentSeconds <= 0) {
    handlePhaseCompletion();
  }
}

function handlePhaseCompletion() {
  if (pomoTimer) clearInterval(pomoTimer);
  if (pomoBar) pomoBar.style.width = "0%";

  ensurePomoConfigIntegrity();
  const cfg = state.pomoConfig;

  if (pomoPhase === "focus") {
    state.completedPomodoros = (state.completedPomodoros || 0) + 1;
    logActivity("pomo", `🍅 Pomodoro #${state.completedPomodoros} completat`);
    saveState();

    const isLongBreakDue = state.completedPomodoros % cfg.cyclesBeforeLong === 0;
    if (isLongBreakDue) {
      showToast(`🎉 Descans llarg (${cfg.longBreakMin} min)`);
      setupPomodoroPhase("longBreak", true);
    } else {
      showToast(`✓ Descans curt (${cfg.shortBreakMin} min)`);
      setupPomodoroPhase("shortBreak", true);
    }
  } else {
    showToast("🎯 Tornem al bloc de Focus");
    setupPomodoroPhase("focus", true);
  }
}

function openPomodoroView() {
  switchView("view-pomodoro");
  if (!pomoTimer) {
    setupPomodoroPhase("focus", true);
  }
}
window.openPomodoroView = openPomodoroView;
window.startPomodoro = openPomodoroView;

function updatePomodoroVisuals() {
  if (!pomoImg || !pomoStatusLabel) return;
  if (pomoTimeDisplay) pomoTimeDisplay.textContent = formatSeconds(pomoCurrentSeconds);

  if (pomoModeBadge) {
    if (pomoPhase === "focus") pomoModeBadge.textContent = `🎯 Bloc de Focus (${state.pomoConfig.focusMin} min)`;
    else if (pomoPhase === "shortBreak") pomoModeBadge.textContent = `☕ Descans Curt (${state.pomoConfig.shortBreakMin} min)`;
    else pomoModeBadge.textContent = `🌿 Descans Llarg (${state.pomoConfig.longBreakMin} min)`;
  }

  if (pomoCurrentSeconds <= 0) {
    pomoImg.src = IMAGES.completat;
    pomoStatusLabel.textContent = "Temps completat!";
  } else if (isPomoPaused) {
    pomoImg.src = IMAGES.pausa;
    pomoStatusLabel.textContent = "En Pausa";
  } else if (pomoPhase !== "focus") {
    pomoImg.src = IMAGES.pausa;
    pomoStatusLabel.textContent = pomoPhase === "longBreak" ? "Descans Llarg" : "Descans Curt";
  } else if (pomoCurrentSeconds <= 300) {
    pomoImg.src = IMAGES.avis;
    pomoStatusLabel.textContent = "Últims 5 minuts";
  } else {
    pomoImg.src = IMAGES.focus;
    pomoStatusLabel.textContent = "En Focus";
  }
}

if (btnPomoOk) {
  btnPomoOk.addEventListener("click", () => {
    isPomoPaused = !isPomoPaused;
    btnPomoOk.textContent = isPomoPaused ? "Reprendre" : "Pausar";
    updatePomodoroVisuals();
  });
}

if (btnPomoReset) {
  btnPomoReset.addEventListener("click", () => {
    setupPomodoroPhase(pomoPhase, true);
    showToast("Temporitzador reiniciat");
  });
}

if (btnPomoSkipPhase) {
  btnPomoSkipPhase.addEventListener("click", handlePhaseCompletion);
}

if (btnPomoNext) {
  btnPomoNext.addEventListener("click", () => {
    if (pomoTimer) clearInterval(pomoTimer);
    pomoTimer = null;
    switchView("view-menu");
  });
}

function savePomoConfiguration(focusVal, shortVal, longVal, cyclesVal, restartNow = false) {
  state.pomoConfig = {
    focusMin: Math.min(120, Math.max(1, parseInt(focusVal, 10) || 25)),
    shortBreakMin: Math.min(60, Math.max(1, parseInt(shortVal, 10) || 5)),
    longBreakMin: Math.min(90, Math.max(1, parseInt(longVal, 10) || 15)),
    cyclesBeforeLong: Math.min(12, Math.max(1, parseInt(cyclesVal, 10) || 5))
  };
  syncPomoInputsFromState();
  saveState();
  if (restartNow) setupPomodoroPhase("focus", true);
  showToast("✓ Configuració de Pomodoro desada");
}

if (btnSavePomoInline) {
  btnSavePomoInline.addEventListener("click", () => {
    savePomoConfiguration(pomoCfgFocus?.value, pomoCfgShort?.value, pomoCfgLong?.value, pomoCfgCycles?.value, true);
  });
}

if (btnSavePomoSettings) {
  btnSavePomoSettings.addEventListener("click", () => {
    savePomoConfiguration(settingsPomoFocus?.value, settingsPomoShort?.value, settingsPomoLong?.value, settingsPomoCycles?.value, false);
  });
}

// --- CREDENCIALS I RGPD ---
if (btnSaveSettings) {
  btnSaveSettings.addEventListener("click", async () => {
    const enteredUser = (cfgSyncId ? cfgSyncId.value.trim() : "") || "convidat";
    const enteredPass = cfgSyncPass ? cfgSyncPass.value.trim() : "";

    if (enteredUser.toLowerCase() === "convidat") {
      logoutToGuestMode("Mode Convidat actiu (100% Local)");
      return;
    }
    if (chkRgpdConsent && !chkRgpdConsent.checked) {
      showToast("⚠️ Marca la casella de consentiment RGPD");
      return;
    }
    if (!enteredPass) {
      showToast("⚠️ Escriu una contrasenya");
      return;
    }

    btnSaveSettings.disabled = true;
    try {
      const cleanUser = enteredUser.toLowerCase();
      const enteredHash = await computeSecureSyncHash(cleanUser, enteredPass);
      config.syncUser = cleanUser;
      config.syncHash = enteredHash;
      config.rgpdConsent = true;

      localStorage.setItem("aibuddy_sync_user", config.syncUser);
      localStorage.setItem("aibuddy_sync_hash", config.syncHash);
      localStorage.setItem("aibuddy_rgpd_consent", "true");

      loadLocalState();
      await pullRemoteState();
      await saveState();
      showToast(`✓ Sessió activa: ${config.syncUser}`);
      switchView("view-menu");
    } finally {
      btnSaveSettings.disabled = false;
    }
  });
}

function logoutToGuestMode(toastMsg = "Has tornat a mode Convidat") {
  config.syncUser = "convidat";
  config.syncHash = "";
  localStorage.setItem("aibuddy_sync_user", "convidat");
  localStorage.removeItem("aibuddy_sync_hash");
  loadLocalState();
  updateAllDisplays();
  if (statusBadge) statusBadge.textContent = "⚪ Convidat";
  showToast(toastMsg);
  switchView("view-menu");
}

if (btnLogoutGuest) {
  btnLogoutGuest.addEventListener("click", () => logoutToGuestMode());
}

function exportMyData() {
  const blob = new Blob([JSON.stringify({ app: "AI Buddy", exportedAt: new Date().toISOString(), state }, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "aibuddy_dades.json";
  a.click();
  URL.revokeObjectURL(url);
}
if (btnExportData) btnExportData.addEventListener("click", exportMyData);

async function deleteMyCloudData() {
  if (!confirm("Vols esborrar totes les dades guardades?")) return;
  localStorage.clear();
  state = getInitialState();
  updateAllDisplays();
  switchView("view-menu");
}
if (btnDeleteAccount) btnDeleteAccount.addEventListener("click", deleteMyCloudData);

// --- TEMA CLAR / FOSC AMB LA NOVA PALETA ---
function initTheme() {
  const savedTheme = localStorage.getItem("aibuddy_theme") || "light";
  const body = document.body;
  const themeBtn = document.getElementById("btn-theme-toggle");

  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    if (themeBtn) themeBtn.textContent = "☀️";
  } else {
    body.classList.remove("dark-mode");
    if (themeBtn) themeBtn.textContent = "🌙";
  }
}

function toggleTheme() {
  const body = document.body;
  const themeBtn = document.getElementById("btn-theme-toggle");
  if (body.classList.contains("dark-mode")) {
    body.classList.remove("dark-mode");
    localStorage.setItem("aibuddy_theme", "light");
    if (themeBtn) themeBtn.textContent = "🌙";
  } else {
    body.classList.add("dark-mode");
    localStorage.setItem("aibuddy_theme", "dark");
    if (themeBtn) themeBtn.textContent = "☀️";
  }
}
window.toggleTheme = toggleTheme;

// --- INICIALITZACIÓ I DETECCIÓ DE WIDGET FLOTANT O DRECERA MÒBIL ---
initTheme();
loadLocalState();
pomoTotalSeconds = getPhaseDurationSeconds("focus");
pomoCurrentSeconds = pomoTotalSeconds;
updatePomodoroVisuals();
updateAllDisplays();

// Comprovar si s'obre des d'un Widget o Drecera (URL Params: ?widget=todo | ?widget=pomodoro | ?view=...)
(function handleStartupRouting() {
  const params = new URLSearchParams(window.location.search);
  const widgetType = params.get("widget");
  const viewParam = params.get("view");

  if (widgetType === "todo" || viewParam === "quick-todo" || viewParam === "view-quick-todo") {
    if (widgetType === "todo") {
      document.body.classList.add("widget-floating-mode");
      try { window.resizeTo(370, 500); } catch (e) {}
    }
    switchView("view-quick-todo");
    return;
  }

  if (widgetType === "pomodoro" || viewParam === "pomodoro" || viewParam === "view-pomodoro") {
    if (widgetType === "pomodoro") {
      document.body.classList.add("widget-floating-mode");
      try { window.resizeTo(370, 520); } catch (e) {}
    }
    openPomodoroView();
    return;
  }

  switchView("view-menu");
})();

checkInitialOnboarding();
pullRemoteState();
setInterval(renderDashboard, 30000);
