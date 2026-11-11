// --- RUTES DE LES IMATGES D'ESTAT ---
const IMAGES = {
  focus: "focus_normal.jpg",
  pausa: "focus_pausa.jpg",
  completat: "completat.jpg",
  avis: "avisos.jpg"
};

localStorage.removeItem("aibuddy_sync_pass");

// --- CATÀLEG DE PLANTILLES RÀPIDES ANTIBLOQUEIG ---
const catalegTasquesTDAH = {
  planificar_dia: {
    titol: "Planificar el dia",
    icona: "",
    descripcio: "Organitza les prioritats del dia en 5 passos clars sense saturar-te.",
    paraules_clau: ["planificar", "organitzar", "agenda", "llista", "dia", "horari", "calendari"],
    passos: [
      "Agafar l'agenda, el bolígraf blau i un post-it",
      "Apuntar totes les coses que et ronden pel cap",
      "Encerclar només la tasca més urgent d'avui",
      "Triar una segona tasca molt petita i fàcil",
      "Guardar la resta de la llista per més tard"
    ]
  },
  estudiar_temari: {
    titol: "Començar temari d'estudi",
    icona: "",
    descripcio: "Trenca el bloqueig inicial d'estudiar o llegir un document dens pas a pas.",
    paraules_clau: ["estudiar", "temari", "examen", "apunts", "universitat", "uni", "llegir", "deures"],
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
    icona: "",
    descripcio: "Contesta missatges acumulats sense caure en el perfeccionisme.",
    paraules_clau: ["correu", "correus", "mail", "email", "safata", "respondre", "redactar"],
    passos: [
      "Obrir la bústia i escollir un correu pendent",
      "Prémer el botó de respondre per obrir el quadre",
      "Escriure una salutació curta i el motiu en brut",
      "Llegir el text un sol cop sense perfeccionisme",
      "Prémer enviar immediatament"
    ]
  },
  motxilla_uni: {
    titol: "Motxilla Universitat",
    icona: "",
    descripcio: "Revisa i prepara el material bàsic per sortir de casa amb tranquil·litat.",
    paraules_clau: ["motxilla", "uni", "universitat", "clase", "ordinador", "carregador", "claus"],
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
    titol: "Ordenar escriptori",
    icona: "",
    descripcio: "Recupera un espai de treball net i lliure de soroll visual en pocs minuts.",
    paraules_clau: ["escriptori", "taula", "ordenar", "endreçar", "habitació", "recollir"],
    passos: [
      "Retirar tots els gots, tasses i plats cap a la cuina",
      "Llençar els papers inservibles i embolcalls a la paperera",
      "Apilar tots els llibres i llibretes en un cantó",
      "Deixar només l'ordinador i els estris bàsics a la vista",
      "Passar un drap ràpid per l'espai que ha quedat lliure"
    ]
  },
  netejar_cuina: {
    titol: "Netejar cuina",
    icona: "",
    descripcio: "Seqüència guiada per recollir plats i netejar el marbre sense atabalar-se.",
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
    titol: "Posar rentadora",
    icona: "",
    descripcio: "Passos concrets per separar una tanda de roba i posar-la en marxa.",
    paraules_clau: ["rentadora", "bugada", "rentar roba", "cistell"],
    passos: [
      "Destriar una tanda del mateix tipus de roba",
      "Tancar la porta i comprovar que no hi ha objectes dins",
      "Seleccionar el programa habitual i prémer el botó d'inici"
    ]
  },
  tramits_administratius: {
    titol: "Tràmits i papers",
    icona: "",
    descripcio: "Completa formularis o gestions pas a pas amb tota la documentació a mà.",
    paraules_clau: ["tràmit", "tramit", "paperassa", "factura", "banc", "cita", "formulari", "dni"],
    passos: [
      "Buscar el DNI o la targeta i deixar-los a la taula",
      "Obrir una sola pestanya al navegador amb la web",
      "Llegir únicament el primer quadre que cal omplir",
      "Completar les dades bàsiques pas a pas sense pressa",
      "Enviar el formulari i fer captura del comprovant"
    ]
  }
};

// --- LLISTES PREDETERMINADES BUIDES (COMENCEN DES DE ZERO) ---
const defaultRoutineCatalog = [];
const defaultHobbiesCatalog = [];

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
    routineCatalog: [],
    routineSteps: [],
    routineIndex: 0,
    hobbiesCatalog: [],
    hobbySteps: [],
    hobbyIndex: 0,
    pomoConfig: { ...defaultPomoConfig },
    completedPomodoros: 0,
    activityLog: [],
    activeDays: [new Date().toISOString().slice(0, 10)],
    updatedAt: 0
  };
}

let state = getInitialState();
let currentDashFilter = "all"; // 'all' | 'pending'

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
const routineHabitsGrid = document.getElementById("routine-habits-grid");
const routineInputNew = document.getElementById("routine-input-new");
const btnRoutineAdd = document.getElementById("btn-routine-add");
const btnRoutineReset = document.getElementById("btn-routine-reset");
const btnRoutineOk = document.getElementById("btn-routine-ok");
const btnRoutineNext = document.getElementById("btn-routine-next");
const btnRoutinePrev = document.getElementById("btn-routine-prev");

const hobbiesCapsulesGrid = document.getElementById("hobbies-capsules-grid");
const hobbyStepDisplay = document.getElementById("hobby-step-display");
const hobbyInputNew = document.getElementById("hobby-input-new");
const btnHobbyAdd = document.getElementById("btn-hobby-add");
const btnHobbyReset = document.getElementById("btn-hobby-reset");

const thoughtInput = document.getElementById("thought-input");
const btnPark = document.getElementById("btn-park");
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

// --- SINCRONITZACIÓ EN TEMPS REAL ENTRE FINESTRES ---
window.addEventListener("storage", (e) => {
  if (e.key === getLocalStorageKey()) {
    loadLocalState();
    updateAllDisplays();
  }
});

// --- REGISTRE D'HISTORIAL I RATXA ---
function logActivity(type, text) {
  if (!Array.isArray(state.activityLog)) state.activityLog = [];
  const now = new Date();
  state.activityLog.unshift({
    type,
    text,
    date: now.toISOString().slice(0, 10),
    time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  });
  if (state.activityLog.length > 50) state.activityLog = state.activityLog.slice(0, 50);

  const todayIso = now.toISOString().slice(0, 10);
  if (!Array.isArray(state.activeDays)) state.activeDays = [];
  if (!state.activeDays.includes(todayIso)) state.activeDays.push(todayIso);
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
  ["all", "pending"].forEach(tab => {
    const btn = document.getElementById(`dash-tab-${tab}`);
    if (!btn) return;
    btn.className = tab === filter
      ? "px-3 py-1 rounded-lg bg-[#3D67C4] text-white transition"
      : "px-3 py-1 rounded-lg opacity-75 hover:opacity-100 transition";
  });
  renderDashboard();
}
window.setDashFilter = setDashFilter;

function renderDashboard() {
  const dtEl = document.getElementById("dash-datetime");
  const streakBadge = document.getElementById("dash-streak-badge");
  const settingsStreakPill = document.getElementById("settings-streak-pill");

  const now = new Date();
  if (dtEl) {
    const formattedDate = now.toLocaleDateString("ca-ES", { weekday: "long", day: "numeric", month: "short" });
    const formattedTime = now.toLocaleTimeString("ca-ES", { hour: "2-digit", minute: "2-digit" });
    dtEl.textContent = `${formattedDate} · ${formattedTime}`;
  }

  // Actualitza la píndola gamificada de la capçalera i la de Configuració
  const streakCount = calculateStreak();
  const streakLabel = `${streakCount} ${streakCount === 1 ? "dia" : "dies"}`;
  if (streakBadge) streakBadge.textContent = `🔥 ${streakLabel} EN RATXA`;
  if (settingsStreakPill) settingsStreakPill.textContent = `🔥 ${streakLabel}`;

  // Percentatges i barres (ubicats dins de Configuració #view-settings)
  const todos = state.quickTodoList || [];
  const totalTodos = todos.length;
  const doneTodos = todos.filter(t => t.completed).length;
  const pendingTodos = totalTodos - doneTodos;
  const pctTodo = totalTodos === 0 ? 0 : Math.round((doneTodos / totalTodos) * 100);

  const barTodo = document.getElementById("kpi-bar-todo");
  const pctTodoEl = document.getElementById("kpi-pct-todo");
  const cntTodoEl = document.getElementById("kpi-count-todo");
  if (barTodo) barTodo.style.width = `${pctTodo}%`;
  if (pctTodoEl) pctTodoEl.textContent = `${pctTodo}%`;
  if (cntTodoEl) cntTodoEl.textContent = `${pendingTodos} pendents de ${totalTodos}`;

  const selectedHabits = getSelectedRoutineHabits();
  const totalHabits = selectedHabits.length;
  const doneHabits = Math.min(state.routineIndex || 0, totalHabits);
  const pctRoutine = totalHabits === 0 ? 0 : Math.round((doneHabits / totalHabits) * 100);

  const barRoutine = document.getElementById("kpi-bar-routine");
  const pctRoutineEl = document.getElementById("kpi-pct-routine");
  const cntRoutineEl = document.getElementById("kpi-count-routine");
  if (barRoutine) barRoutine.style.width = `${pctRoutine}%`;
  if (pctRoutineEl) pctRoutineEl.textContent = `${pctRoutine}%`;
  if (cntRoutineEl) cntRoutineEl.textContent = `${doneHabits}/${totalHabits} completats`;

  // Llista d'Activitat del Dia (Inici: To-Do List directa)
  const activeListEl = document.getElementById("dash-active-list");
  if (activeListEl) {
    activeListEl.innerHTML = "";
    const filteredTodos = [];

    todos.forEach((t, idx) => {
      if (currentDashFilter === "pending" && t.completed) return;
      filteredTodos.push({ idx, text: t.text, completed: t.completed });
    });

    if (filteredTodos.length === 0) {
      activeListEl.innerHTML = `
        <div class="bg-subtle border border-theme rounded-2xl p-4 text-center space-y-2">
          <p class="text-xs font-extrabold opacity-80">
            ${currentDashFilter === "pending" ? "No tens cap tasca ràpida pendent!" : "La teva To-Do List està buida."}
          </p>
          <button type="button" onclick="switchView('view-quick-todo')" class="btn-accent text-xs font-extrabold px-4 py-1.5 rounded-xl">
            + Afegir tasca a la To-Do
          </button>
        </div>
      `;
    } else {
      filteredTodos.forEach(item => {
        const row = document.createElement("div");
        row.className = "bg-subtle border border-theme px-3.5 py-2.5 rounded-xl flex justify-between items-center text-xs gap-2";
        row.innerHTML = `
          <label class="flex items-center gap-2.5 cursor-pointer flex-1 overflow-hidden">
            <input type="checkbox" class="w-4 h-4 accent-[#3D67C4] rounded cursor-pointer shrink-0" ${item.completed ? "checked" : ""} />
            <span class="font-bold truncate ${item.completed ? "line-through opacity-50" : ""}">${item.text}</span>
          </label>
          <button type="button" class="opacity-60 hover:opacity-100 font-extrabold px-1.5" title="Esborrar tasca">✕</button>
        `;
        row.querySelector("input").addEventListener("change", (e) => {
          state.quickTodoList[item.idx].completed = e.target.checked;
          if (e.target.checked) logActivity("todo", `Completada: ${state.quickTodoList[item.idx].text}`);
          saveState();
        });
        row.querySelector("button").addEventListener("click", () => {
          state.quickTodoList.splice(item.idx, 1);
          saveState();
        });
        activeListEl.appendChild(row);
      });
    }
  }

 // Graella dels últims 7 dies de ratxa (dins de Configuració - llegible en mode clar i fosc)
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
      cell.className = active
        ? "py-2 px-1 rounded-xl flex flex-col items-center justify-center gap-0.5 border-2 bg-[#F7E671] text-[#1A1A1A] border-[#1E3264] font-extrabold shadow-sm"
        : "py-2 px-1 rounded-xl flex flex-col items-center justify-center gap-0.5 border border-theme bg-subtle font-bold opacity-75";
      cell.innerHTML = `<span class="text-[10px] uppercase tracking-tighter">${diesSetmana[d.getDay()]}</span><span class="text-xs leading-none">${active ? "🔥" : "·"}</span>`;
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
    histContainer.innerHTML = `<p class="text-xs opacity-60 text-center py-6">Encara no hi ha registres a l'historial.</p>`;
    return;
  }

  logs.forEach(entry => {
    const div = document.createElement("div");
    div.className = "bg-subtle border border-theme px-3.5 py-2.5 rounded-xl flex justify-between items-center gap-2";
    div.innerHTML = `<span class="truncate font-bold">${entry.text}</span><span class="text-[10px] opacity-65 shrink-0">${entry.time}</span>`;
    histContainer.appendChild(div);
  });
}

document.getElementById("history-search-input")?.addEventListener("input", renderHistoryList);
document.getElementById("history-type-filter")?.addEventListener("change", renderHistoryList);

// --- RENDERITZAT DE PLANTILLES RÀPIDES ANTIBLOQUEIG ---
function renderTemplatesView() {
  const container = document.getElementById("templates-cards-container");
  if (!container) return;
  container.innerHTML = "";

  Object.keys(catalegTasquesTDAH).forEach(key => {
    const item = catalegTasquesTDAH[key];
    const card = document.createElement("div");
    card.className = "tactile-card rounded-3xl p-4 flex items-center gap-4 transition";
    card.innerHTML = `
      <div class="w-16 h-16 rounded-2xl bg-[#F7E671] border-2 border-[#1E3264] flex items-center justify-center text-2xl shrink-0">
        ${item.icona}
      </div>
      <div class="flex-1 min-w-0">
        <h3 class="text-sm font-extrabold truncate">${item.titol}</h3>
        <p class="text-xs opacity-80 mt-0.5 leading-relaxed">${item.descripcio}</p>
        <button type="button" class="mt-2.5 btn-primary text-xs font-extrabold px-4 py-1.5 rounded-xl">
          Read Details
        </button>
      </div>
    `;
    card.querySelector("button").addEventListener("click", () => {
      loadTemplate(key);
      switchView("view-tasks");
    });
    container.appendChild(card);
  });
}

// --- GRAELLA DE RUTINA GUIADA DE PASSOS (100% BUIDA D'INICI) ---
function ensureCatalogsIntegrity() {
  if (!Array.isArray(state.routineCatalog)) {
    state.routineCatalog = [];
  }
  if (!Array.isArray(state.hobbiesCatalog)) {
    state.hobbiesCatalog = [];
  }
}

function getSelectedRoutineHabits() {
  ensureCatalogsIntegrity();
  return state.routineCatalog.filter(h => h.selected);
}

function updateRoutineDisplay() {
  ensureCatalogsIntegrity();
  if (!routineHabitsGrid) return;
  routineHabitsGrid.innerHTML = "";

  const selected = getSelectedRoutineHabits();

  if (state.routineCatalog.length === 0) {
    routineHabitsGrid.innerHTML = `<p class="text-xs opacity-60 text-center py-4 col-span-full">La teva rutina està buida. Escriu i afegeix el teu primer hàbit a sota per començar des de zero.</p>`;
  } else {
    state.routineCatalog.forEach((habit, idx) => {
      const capsule = document.createElement("div");
      const isCurrentActive = habit.selected && selected[state.routineIndex]?.id === habit.id;
      capsule.className = `habit-capsule ${habit.selected ? "selected" : ""} ${isCurrentActive ? "ring-4 ring-[#3D67C4]" : ""}`;
      capsule.innerHTML = `
        <div class="flex items-center gap-2.5 overflow-hidden">
          <span class="text-lg shrink-0">${habit.icon || "✨"}</span>
          <span class="text-xs sm:text-sm truncate">${habit.text}</span>
        </div>
        <span class="text-xs font-extrabold">${habit.selected ? "✓" : "+"}</span>
      `;
      capsule.addEventListener("click", () => {
        state.routineCatalog[idx].selected = !state.routineCatalog[idx].selected;
        state.routineIndex = 0;
        saveState();
      });
      routineHabitsGrid.appendChild(capsule);
    });
  }

  if (routineStepDisplay) {
    if (state.routineCatalog.length === 0) {
      routineStepDisplay.textContent = "Afegeix el teu primer pas per crear la teva rutina";
    } else if (selected.length === 0) {
      routineStepDisplay.textContent = "Selecciona els hàbits que vulguis fer avui";
    } else if (state.routineIndex < selected.length) {
      const curr = selected[state.routineIndex];
      routineStepDisplay.textContent = `Pas actual (${state.routineIndex + 1}/${selected.length}): ${curr.icon || ""} ${curr.text}`;
    } else {
      routineStepDisplay.textContent = "🎉 Has completat tota la teva rutina!";
    }
  }
}

// --- GRAELLA DE HOBBIES DE DESCANS (100% BUIDA D'INICI) ---
function updateHobbyDisplay() {
  ensureCatalogsIntegrity();
  if (hobbiesCapsulesGrid) {
    hobbiesCapsulesGrid.innerHTML = "";
    if (state.hobbiesCatalog.length === 0) {
      hobbiesCapsulesGrid.innerHTML = `<p class="text-xs opacity-60 text-center py-4 col-span-full">La teva llista de hobbies està buida. Afegeix les teves activitats de descans a sota.</p>`;
    } else {
      state.hobbiesCatalog.forEach((hobby, idx) => {
        const capsule = document.createElement("div");
        capsule.className = `habit-capsule ${hobby.selected ? "selected" : ""}`;
        capsule.innerHTML = `
          <div class="flex items-center gap-2.5 overflow-hidden">
            <span class="text-lg shrink-0">${hobby.icon || "🌟"}</span>
            <span class="text-xs sm:text-sm truncate">${hobby.text}</span>
          </div>
          <span class="text-xs font-extrabold">${hobby.selected ? "✓" : ""}</span>
        `;
        capsule.addEventListener("click", () => {
          state.hobbiesCatalog[idx].selected = !state.hobbiesCatalog[idx].selected;
          saveState();
        });
        hobbiesCapsulesGrid.appendChild(capsule);
      });
    }
  }

  if (hobbyStepDisplay) {
    if (state.hobbiesCatalog.length === 0) {
      hobbyStepDisplay.textContent = "La teva llista de hobbies està buida.";
    } else {
      if (state.hobbyIndex >= state.hobbiesCatalog.length) state.hobbyIndex = 0;
      hobbyStepDisplay.textContent = state.hobbiesCatalog[state.hobbyIndex].text;
    }
  }
}

// --- FUNCIONS BASE DE SESSIÓ I ESTAT ---
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
  const storageKey = getLocalStorageKey();
  const saved = localStorage.getItem(storageKey);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      state = { ...state, ...parsed };
    } catch (e) {
      console.error("Error carregant estat local:", e);
    }
  }

  // Migració automàtica per esborrar qualsevol rutina o hobby predeterminat antic guardat al navegador
  const migrationKey = `aibuddy_empty_defaults_v2_${storageKey}`;
  if (!localStorage.getItem(migrationKey)) {
    state.routineCatalog = [];
    state.routineSteps = [];
    state.routineIndex = 0;
    state.hobbiesCatalog = [];
    state.hobbySteps = [];
    state.hobbyIndex = 0;
    localStorage.setItem(migrationKey, "true");
    localStorage.setItem(storageKey, JSON.stringify(state));
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
    if (statusBadge) statusBadge.textContent = res.ok ? `🟢 ${config.syncUser}` : "🟠 Error";
  } catch (err) {
    if (statusBadge) statusBadge.textContent = "⚪ Offline";
  }
}

async function pullRemoteState() {
  if (isGuestMode()) return false;
  const baseUrl = cleanSupaUrl(config.supaUrl);
  if (!baseUrl || !config.supaKey || !config.syncHash) return false;

  try {
    const url = `${baseUrl}/rest/v1/user_state?id=eq.${encodeURIComponent(config.syncHash)}&select=data`;
    const res = await fetch(url, {
      headers: { "apikey": config.supaKey, "Authorization": `Bearer ${config.supaKey}` }
    });
    if (res.ok) {
      const rows = await res.json();
      if (rows.length > 0 && rows[0].data && (rows[0].data.updatedAt || 0) > (state.updatedAt || 0)) {
        state = { ...state, ...rows[0].data };
        ensurePomoConfigIntegrity();
        ensureCatalogsIntegrity();
        localStorage.setItem(getLocalStorageKey(), JSON.stringify(state));
        syncPomoInputsFromState();
        updateAllDisplays();
      }
      if (statusBadge) statusBadge.textContent = `🟢 ${config.syncUser}`;
    }
  } catch (e) {}
  return false;
}

// --- CANVI DE PANTALLA AMB TRANSICIONS DINÀMIQUES FLUIDES ---
function switchView(viewId) {
  const views = [
    "view-menu",
    "view-history",
    "view-tasks",
    "view-templates",
    "view-thoughts",
    "view-pomodoro",
    "view-routine",
    "view-hobbies",
    "view-settings",
    "view-quick-todo"
  ];

  const performSwitch = () => {
    views.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.add("hidden");
    });

    const target = document.getElementById(viewId);
    if (target) {
      target.classList.remove("hidden");
      target.style.animation = "none";
      void target.offsetWidth;
      target.style.animation = "";
    }

    if (viewId === "view-settings") {
      if (cfgSyncId) cfgSyncId.value = config.syncUser || "convidat";
      if (cfgSyncPass) cfgSyncPass.value = "";
      if (chkRgpdConsent) chkRgpdConsent.checked = config.rgpdConsent || !isGuestMode();
      syncPomoInputsFromState();
    }
    updateAllDisplays();
  };

  if (document.startViewTransition) {
    document.startViewTransition(performSwitch);
  } else {
    performSwitch();
  }
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

// --- BOTONS DE TASQUES I PLANTILLES ---
if (btnOk) {
  btnOk.addEventListener("click", () => {
    if (state.currentIndex < state.currentSteps.length) {
      logActivity("todo", `Pas completat: ${state.currentSteps[state.currentIndex]}`);
      state.currentIndex++;
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
    showToast(`Plantilla: ${catalegTasquesTDAH[categoriaId].titol}`);
  }
}
window.loadTemplate = loadTemplate;

function normalitzarText(str) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function generarMicroPassos(rawTask) {
  const original = (rawTask || "").trim();
  const normalitzat = normalitzarText(original);

  for (const key in catalegTasquesTDAH) {
    const categoria = catalegTasquesTDAH[key];
    if (categoria.paraules_clau.some(p => normalitzat.includes(normalitzarText(p)))) {
      return [...categoria.passos];
    }
  }

  const resumTasca = original.split(/\s+/).slice(0, 4).join(" ");
  return [
    `Preparar l'espai bàsic per a "${resumTasca}"`,
    "Fer l'acció més petita i fàcil primer",
    "Continuar avançant només durant cinc minuts",
    "Revisar el que ja has aconseguit fer"
  ];
}

if (btnSend && taskInput) {
  btnSend.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (!taskText) return;
    taskInput.value = "";
    state.currentSteps = generarMicroPassos(taskText);
    state.currentIndex = 0;
    logActivity("todo", `Tasca dividida: ${taskText}`);
    saveState();
    switchView("view-tasks");
  });
  taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") btnSend.click();
  });
}

// --- BOTONS DE LA RUTINA ---
if (btnRoutineOk) {
  btnRoutineOk.addEventListener("click", () => {
    const selected = getSelectedRoutineHabits();
    if (selected.length === 0) {
      if (routineInputNew) routineInputNew.focus();
      return;
    }
    if (state.routineIndex < selected.length) {
      logActivity("routine", `Rutina: ${selected[state.routineIndex].text}`);
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
    state.routineCatalog.push({ id: `r_${Date.now()}`, text, icon: "✨", selected: true });
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
    state.routineCatalog = [];
    state.routineSteps = [];
    state.routineIndex = 0;
    saveState();
    showToast("Rutina buidada completament");
  });
}

// --- BOTONS DE HOBBIES ---
if (btnHobbyAdd && hobbyInputNew) {
  btnHobbyAdd.addEventListener("click", () => {
    const text = hobbyInputNew.value.trim();
    if (!text) return;
    ensureCatalogsIntegrity();
    state.hobbiesCatalog.push({ id: `h_${Date.now()}`, text, icon: "🌟", selected: true });
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
    state.hobbySteps = [];
    state.hobbyIndex = 0;
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
    todoItem.className = "bg-subtle border border-theme p-3 rounded-2xl flex justify-between items-center text-xs gap-2";

    const leftDiv = document.createElement("label");
    leftDiv.className = "flex items-center gap-3 overflow-hidden cursor-pointer flex-1";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.completed || false;
    checkbox.className = "w-4 h-4 accent-[#3D67C4] rounded cursor-pointer shrink-0";
    checkbox.addEventListener("change", () => {
      state.quickTodoList[idx].completed = checkbox.checked;
      if (checkbox.checked) logActivity("todo", `Fet: ${item.text}`);
      saveState();
    });

    const textSpan = document.createElement("span");
    textSpan.className = `font-bold break-words ${item.completed ? "line-through opacity-50" : ""}`;
    textSpan.textContent = item.text;

    leftDiv.appendChild(checkbox);
    leftDiv.appendChild(textSpan);

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.className = "opacity-60 hover:opacity-100 font-extrabold text-xs px-2 py-1 shrink-0";
    delBtn.textContent = "✕";
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
      logActivity("todo", `Tasca ràpida: ${text}`);
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
  });
}

// --- PENSAMENTS APARCATS ---
function showToast(msg = "+ Pensament guardat") {
  if (!toastNotification) return;
  toastNotification.textContent = msg;
  toastNotification.classList.remove("opacity-0", "translate-y-[-10px]");
  toastNotification.classList.add("opacity-100", "translate-y-0");
  setTimeout(() => {
    toastNotification.classList.remove("opacity-100", "translate-y-0");
    toastNotification.classList.add("opacity-0", "translate-y-[-10px]");
  }, 2400);
}

if (btnPark && thoughtInput) {
  btnPark.addEventListener("click", () => {
    const thoughtText = thoughtInput.value.trim();
    if (thoughtText) {
      const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      state.parkedThoughts.push({ text: thoughtText, time: timeStr });
      thoughtInput.value = "";
      logActivity("thought", `💭 ${thoughtText}`);
      saveState();
      showToast("+ Pensament guardat");
    }
  });
  thoughtInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") btnPark.click();
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
      <span class="font-bold break-words">${item.text}</span>
      <div class="flex items-center gap-2 shrink-0">
        <span class="text-[10px] opacity-60">${item.time}</span>
        <button type="button" class="opacity-60 hover:opacity-100 font-extrabold px-1">✕</button>
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
    pomoCycleCounter.textContent = `Pomodoros completats: ${currentInCycle} / ${target}`;
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

  if (pomoCurrentSeconds <= 0) handlePhaseCompletion();
}

function handlePhaseCompletion() {
  if (pomoTimer) clearInterval(pomoTimer);
  if (pomoBar) pomoBar.style.width = "0%";
  ensurePomoConfigIntegrity();
  const cfg = state.pomoConfig;

  if (pomoPhase === "focus") {
    state.completedPomodoros = (state.completedPomodoros || 0) + 1;
    logActivity("todo", ` Pomodoro #${state.completedPomodoros} completat`);
    saveState();
    const isLongBreakDue = state.completedPomodoros % cfg.cyclesBeforeLong === 0;
    setupPomodoroPhase(isLongBreakDue ? "longBreak" : "shortBreak", true);
  } else {
    setupPomodoroPhase("focus", true);
  }
}

function openPomodoroView() {
  switchView("view-pomodoro");
  if (!pomoTimer) setupPomodoroPhase("focus", true);
}
window.openPomodoroView = openPomodoroView;
window.startPomodoro = openPomodoroView;

function updatePomodoroVisuals() {
  if (!pomoImg || !pomoStatusLabel) return;
  if (pomoTimeDisplay) pomoTimeDisplay.textContent = formatSeconds(pomoCurrentSeconds);

  if (pomoModeBadge) {
    if (pomoPhase === "focus") pomoModeBadge.textContent = ` Bloc de Focus`;
    else if (pomoPhase === "shortBreak") pomoModeBadge.textContent = ` Descans Curt`;
    else pomoModeBadge.textContent = ` Descans Llarg`;
  }

  if (pomoCurrentSeconds <= 0) {
    pomoImg.src = IMAGES.completat;
    pomoStatusLabel.textContent = "Completat!";
  } else if (isPomoPaused) {
    pomoImg.src = IMAGES.pausa;
    pomoStatusLabel.textContent = "En Pausa";
  } else if (pomoPhase !== "focus") {
    pomoImg.src = IMAGES.pausa;
    pomoStatusLabel.textContent = "Descans";
  } else if (pomoCurrentSeconds <= 300) {
    pomoImg.src = IMAGES.avis;
    pomoStatusLabel.textContent = "Últims 5 min";
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
  btnPomoReset.addEventListener("click", () => setupPomodoroPhase(pomoPhase, true));
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
  showToast("✓ Configuració desada");
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

// --- CONFIGURACIÓ D'USUARI I TEMA ---
if (btnSaveSettings) {
  btnSaveSettings.addEventListener("click", async () => {
    const enteredUser = (cfgSyncId ? cfgSyncId.value.trim() : "") || "convidat";
    const enteredPass = cfgSyncPass ? cfgSyncPass.value.trim() : "";
    if (enteredUser.toLowerCase() === "convidat") {
      logoutToGuestMode();
      return;
    }
    if (chkRgpdConsent && !chkRgpdConsent.checked) {
      showToast("⚠️ Accepta el consentiment RGPD");
      return;
    }
    if (!enteredPass) {
      showToast("⚠️ Escriu una contrasenya");
      return;
    }
    const cleanUser = enteredUser.toLowerCase();
    config.syncUser = cleanUser;
    config.syncHash = await computeSecureSyncHash(cleanUser, enteredPass);
    config.rgpdConsent = true;
    localStorage.setItem("aibuddy_sync_user", config.syncUser);
    localStorage.setItem("aibuddy_sync_hash", config.syncHash);
    localStorage.setItem("aibuddy_rgpd_consent", "true");
    loadLocalState();
    await pullRemoteState();
    await saveState();
    switchView("view-menu");
  });
}

function logoutToGuestMode() {
  config.syncUser = "convidat";
  config.syncHash = "";
  localStorage.setItem("aibuddy_sync_user", "convidat");
  localStorage.removeItem("aibuddy_sync_hash");
  loadLocalState();
  updateAllDisplays();
  if (statusBadge) statusBadge.textContent = "⚪ Convidat";
  switchView("view-menu");
}
if (btnLogoutGuest) btnLogoutGuest.addEventListener("click", logoutToGuestMode);

if (btnExportData) {
  btnExportData.addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "aibuddy_dades.json";
    a.click();
  });
}

if (btnDeleteAccount) {
  btnDeleteAccount.addEventListener("click", () => {
    if (!confirm("Vols eliminar totes les dades?")) return;
    localStorage.clear();
    state = getInitialState();
    updateAllDisplays();
    switchView("view-menu");
  });
}

function initTheme() {
  const savedTheme = localStorage.getItem("aibuddy_theme") || "light";
  const themeBtn = document.getElementById("btn-theme-toggle");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (themeBtn) themeBtn.textContent = "☀️";
  } else {
    document.body.classList.remove("dark-mode");
    if (themeBtn) themeBtn.textContent = "🌙";
  }
}

function toggleTheme() {
  const isDark = document.body.classList.toggle("dark-mode");
  localStorage.setItem("aibuddy_theme", isDark ? "dark" : "light");
  const themeBtn = document.getElementById("btn-theme-toggle");
  if (themeBtn) themeBtn.textContent = isDark ? "☀️" : "🌙";
}
window.toggleTheme = toggleTheme;

// --- INICIALITZACIÓ ---
initTheme();
loadLocalState();
pomoTotalSeconds = getPhaseDurationSeconds("focus");
pomoCurrentSeconds = pomoTotalSeconds;
updatePomodoroVisuals();
updateAllDisplays();

(function handleStartupRouting() {
  const params = new URLSearchParams(window.location.search);
  const widgetType = params.get("widget");
  const viewParam = params.get("view");

  if (widgetType === "todo" || viewParam === "quick-todo" || viewParam === "view-quick-todo") {
    document.body.classList.add("widget-todo-mode");
    switchView("view-quick-todo");
    try { window.resizeTo(360, 460); } catch (e) {}
    return;
  }

  if (widgetType === "pomodoro" || viewParam === "pomodoro" || viewParam === "view-pomodoro") {
    document.body.classList.add("widget-pomo-mode");
    openPomodoroView();
    try { window.resizeTo(360, 500); } catch (e) {}
    return;
  }

  switchView("view-menu");
})();

pullRemoteState();
setInterval(renderDashboard, 30000);
