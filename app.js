// --- RUTES DE LES IMATGES D'ESTAT ---
const IMAGES = {
  focus: "focus_normal.jpg",   // 1. Quan el Pomodoro està en marxa
  pausa: "focus_pausa.jpg",    // 2. Quan el Pomodoro es pausa o és en descans
  completat: "completat.jpg",  // 3. Quan s'acaba el Pomodoro o qualsevol tasca
  avis: "avis.jpg"             // 4. Quan falten 5 minuts o menys de Pomodoro
};

// Neteja preventiva de qualsevol contrasenya antiga en text pla al navegador (Compliment RGPD)
localStorage.removeItem("aibuddy_sync_pass");

// --- DICCIONARI DE CATEGORIES HABITUALS ---
const catalegTasquesTDAH = {
  netejar_cuina: {
    titol: "Netejar la cuina",
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
    paraules_clau: ["rentadora", "bugada", "rentar roba", "cistell"],
    passos: [
      "Destriar una tanda del mateix tipus de roba",
      "Tancar la porta i comprovar que no hi ha objectes dins",
      "Seleccionar el programa habitual i prémer el botó d'inici"
    ]
  },
  estudiar_temari: {
    titol: "Començar a estudiar un temari dens",
    paraules_clau: ["estudiar", "temari", "examen", "apunts", "universitat", "uni", "llegir", "deures", "resum", "esquema", "memoritzar", "practica"],
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
    paraules_clau: ["correu", "correus", "mail", "email", "safata", "respondre", "professor", "redactar", "contestar"],
    passos: [
      "Obrir la bústia i escollir un correu pendent",
      "Prémer el botó de respondre per obrir el quadre",
      "Escriure una salutació curta i el motiu en brut",
      "Llegir el text un sol cop sense perfeccionisme",
      "Prémer enviar immediatament"
    ]
  },
  ordenar_escriptori: {
    titol: "Ordenar l'escriptori",
    paraules_clau: ["escriptori", "taula", "ordenar", "endreçar", "endrecar", "habitació", "habitacio", "netejar", "recollir", "pols"],
    passos: [
      "Retirar tots els gots, tasses i plats cap a la cuina",
      "Llençar els papers inservibles i embolcalls a la paperera",
      "Apilar tots els llibres i llibretes en un cantó",
      "Deixar només l'ordinador i els estris bàsics a la vista",
      "Passar un drap ràpid per l'espai que ha quedat lliure"
    ]
  },
  planificar_dia: {
    titol: "Planificar el dia",
    paraules_clau: ["planificar", "organitzar", "agenda", "llista", "dia", "horari", "calendari", "setmana"],
    passos: [
      "Agafar l'agenda, el bolígraf blau i un post-it",
      "Apuntar totes les coses que et ronden pel cap",
      "Encerclar només la tasca més urgent d'avui",
      "Triar una segona tasca molt petita i fàcil",
      "Guardar la resta de la llista per més tard"
    ]
  },
  motxilla_uni: {
    titol: "Preparar la motxilla de la uni",
    paraules_clau: ["motxilla", "uni", "universitat", "clase", "apunts", "ordinador", "carregador", "claus", "cartera"],
    passos: [
      "Deixar la motxilla oberta damunt del llit",
      "Ficar a dins l'ordinador portàtil i la tablet",
      "Afegir els carregadors i els auriculars",
      "Afegir la llibreta i l'estoig amb bolígrafs",
      "Comprovar que portes la cartera i el necesser d'imprescindibles",
      "Tancar la motxilla i deixar-la a l'entrada de l'habitació"
    ]
  },
  tramits_administratius: {
    titol: "Fer tràmits administratius",
    paraules_clau: ["tràmit", "tramit", "paperassa", "factura", "banc", "cita", "formulari", "pagar", "metge", "impost", "matricula", "dni"],
    passos: [
      "Buscar el DNI o la targeta i deixar-los a la taula",
      "Obrir una sola pestanya al navegador amb la web",
      "Llegir únicament el primer quadre que cal omplir",
      "Completar les dades bàsiques pas a pas sense pressa",
      "Enviar el formulari i fer captura del comprovant"
    ]
  }
};

// --- VALORS PREDETERMINATS BUITS ---
const defaultRoutineSteps = [];
const defaultHobbies = [];

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
    routineSteps: [...defaultRoutineSteps],
    routineIndex: 0,
    hobbySteps: [...defaultHobbies],
    hobbyIndex: 0,
    pomoConfig: { ...defaultPomoConfig },
    completedPomodoros: 0,
    updatedAt: 0
  };
}

// --- ESTAT CENTRALITZAT ---
let state = getInitialState();

// Configuració de Supabase i Identificador Criptogràfic (SHA-256)
let config = {
  supaUrl: "https://qstjwfqrkemyfzudtoxb.supabase.co",
  supaKey: "sb_publishable_RoRpRRP4I1p3PYzIrbRsqA_9YJSZZfq",
  syncUser: localStorage.getItem("aibuddy_sync_user") || "convidat",
  syncHash: localStorage.getItem("aibuddy_sync_hash") || "",
  rgpdConsent: localStorage.getItem("aibuddy_rgpd_consent") === "true"
};

// Variables del Pomodoro Sensorial amb Gestió de Descansos
let pomoTimer = null;
let pomoPhase = "focus"; // 'focus' | 'shortBreak' | 'longBreak'
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
const routineInputNew = document.getElementById("routine-input-new");
const btnRoutineAdd = document.getElementById("btn-routine-add");
const btnRoutineReset = document.getElementById("btn-routine-reset");
const btnRoutineOk = document.getElementById("btn-routine-ok");
const btnRoutineNext = document.getElementById("btn-routine-next");
const btnRoutinePrev = document.getElementById("btn-routine-prev");

const hobbyStepDisplay = document.getElementById("hobby-step-display");
const hobbyInputNew = document.getElementById("hobby-input-new");
const btnHobbyAdd = document.getElementById("btn-hobby-add");
const btnHobbyReset = document.getElementById("btn-hobby-reset");
const btnHobbyNext = document.getElementById("btn-hobby-next");
const btnHobbyPrev = document.getElementById("btn-hobby-prev");

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

// --- MODAL D'INTRODUCCIÓ (ONBOARDING CONVIDAT DE 0) ---
function checkInitialOnboarding() {
  const seenOnboarding = localStorage.getItem("aibuddy_guest_onboarding_seen");
  if (isGuestMode() && !seenOnboarding) {
    openOnboarding();
  }
}

function openOnboarding() {
  if (onboardingModal) {
    onboardingModal.classList.remove("hidden");
  }
}
window.openOnboarding = openOnboarding;

function closeOnboarding() {
  if (onboardingModal) {
    onboardingModal.classList.add("hidden");
  }
  localStorage.setItem("aibuddy_guest_onboarding_seen", "true");
}
window.closeOnboarding = closeOnboarding;

// --- MOSTRAR / OCULTAR CONTRASENYA ---
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

// --- GESTIÓ D'USUARI XIFRAT vs MODE CONVIDAT (100% LOCAL) ---
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
  return rawUrl
    .trim()
    .replace(/\/rest\/v1\/?$/i, "")
    .replace(/\/+$/, "");
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
  if (!baseUrl || !config.supaKey || !config.syncHash) {
    if (statusBadge) statusBadge.textContent = "⚪ Local";
    return false;
  }

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
    } else {
      if (statusBadge) statusBadge.textContent = "🟠 Error Núvol";
      return false;
    }
  } catch (e) {
    if (statusBadge) statusBadge.textContent = "⚪ Offline";
    return false;
  }
}

window.addEventListener("focus", pullRemoteState);
setInterval(pullRemoteState, 20000);

// --- GESTIÓ DE VISTES ---
function switchView(viewId) {
  const views = ["view-menu", "view-tasks", "view-thoughts", "view-pomodoro", "view-routine", "view-hobbies", "view-settings", "view-quick-todo"];
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
    if (chkRgpdConsent) {
      chkRgpdConsent.checked = config.rgpdConsent || !isGuestMode();
    }
    if (btnTogglePass) btnTogglePass.textContent = "👁️";
    syncPomoInputsFromState();
  }
  updateAllDisplays();
}
window.switchView = switchView;

// --- ACTUALITZACIÓ D'INTERFÍCIE ---
function updateAllDisplays() {
  updateTaskDisplay();
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
    stepCounter.textContent = `Pas ${state.currentIndex + 1} de ${state.currentSteps.length}`;
  } else {
    stepDisplay.classList.add("hidden");
    if (taskCompleteImg) taskCompleteImg.src = IMAGES.completat;
    completionBadge.classList.remove("hidden");
    completionBadge.classList.add("flex");
    stepCounter.textContent = "Completat";
  }
}

function updateRoutineDisplay() {
  if (!routineStepDisplay) return;

  if (!Array.isArray(state.routineSteps) || state.routineSteps.length === 0) {
    if (routineCompletionBadge) {
      routineCompletionBadge.classList.add("hidden");
      routineCompletionBadge.classList.remove("flex");
    }
    routineStepDisplay.classList.remove("hidden");
    routineStepDisplay.textContent = "La teva rutina està buida. Afegeix el teu primer pas a sota per personalitzar-la.";
    return;
  }

  if (state.routineIndex < state.routineSteps.length) {
    if (routineCompletionBadge) {
      routineCompletionBadge.classList.add("hidden");
      routineCompletionBadge.classList.remove("flex");
    }
    routineStepDisplay.classList.remove("hidden");
    routineStepDisplay.textContent = `${state.routineIndex + 1}/${state.routineSteps.length} · ${state.routineSteps[state.routineIndex]}`;
  } else {
    routineStepDisplay.classList.add("hidden");
    if (routineCompletionBadge) {
      routineCompletionBadge.classList.remove("hidden");
      routineCompletionBadge.classList.add("flex");
    }
  }
}

function updateHobbyDisplay() {
  if (!hobbyStepDisplay) return;

  if (Array.isArray(state.hobbySteps) && state.hobbySteps.length > 0) {
    if (state.hobbyIndex >= state.hobbySteps.length) state.hobbyIndex = 0;
    hobbyStepDisplay.textContent = state.hobbySteps[state.hobbyIndex];
  } else {
    hobbyStepDisplay.textContent = "La teva llista de hobbies està buida. Afegeix les teves activitats de descans a sota.";
  }
}

// --- NAVEGACIÓ DE TASQUES I PLANTILLES ---
if (btnOk) {
  btnOk.addEventListener("click", () => {
    if (state.currentIndex < state.currentSteps.length) {
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
  const aliasMap = {
    estudi: "estudiar_temari",
    neteja: "ordenar_escriptori"
  };
  const key = aliasMap[categoriaId] || categoriaId;

  if (catalegTasquesTDAH[key]) {
    state.currentSteps = [...catalegTasquesTDAH[key].passos];
    state.currentIndex = 0;
    saveState();
    showToast(`Plantilla: ${catalegTasquesTDAH[key].titol}`);
  }
}
window.loadTemplate = loadTemplate;

// --- MOTOR HEURÍSTIC LOCAL DE MICRO-PASSOS ---
function normalitzarText(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function generarMicroPassos(rawTask) {
  if (!rawTask || typeof rawTask !== "string" || !rawTask.trim()) {
    return [
      "Respira fons i deixa anar les espatlles",
      "Escriu una tasca concreta al quadre",
      "Prem el botó per dividir-la en passos",
      "Comença pel primer pas sense pressa"
    ];
  }

  const original = rawTask.trim();
  const normalitzat = normalitzarText(original);

  function extreureContext(regexVerbs, fallback) {
    const net = original
      .replace(regexVerbs, "")
      .replace(/^(el|la|els|les|un|una|uns|unes|al|del|per a|per|de|a)\s+/i, "")
      .trim();
    if (!net || net.length < 2) return fallback;
    const paraules = net.split(/\s+/);
    return paraules.slice(0, 3).join(" ").toLowerCase();
  }

  if (/\b(trucar|parlar per telefon|telefonar)\b/i.test(normalitzat)) {
    const dest = extreureContext(/\b(trucar|parlar|telefonar|al|a la|amb)\b/gi, "contacte");
    return [
      "Pensar què vols dir",
      "Buscar el contacte a l'agenda del mòbil",
      "Fer una respiració fonda abans de marcar",
      `Prémer el botó de trucar (${dest})`,
      "Dir hola i llegir el teu guió mental",
      "Anotar mentalment la resposta just en penjar"
    ];
  }

  if (/\b(escriure|redactar|correu|mail|email|missatge|whatsapp|respondre|contestar|enviar)\b/i.test(normalitzat)) {
    const teContextEspecific = original.split(/\s+/).length >= 3;
    if (teContextEspecific) {
      const dest = extreureContext(/\b(escriure|redactar|enviar|respondre|contestar|un|el|correu|mail|missatge|whatsapp)\b/gi, "destinatari");
      return [
        "Obrir l'aplicació de correu o missatgeria",
        `Crear un missatge nou per a ${dest}`,
        "Escriure un assumpte o salutació ben curta",
        "Redactar l'esborrany",
        "Llegir el text en veu alta un cop",
        "Prémer el botó d'enviar"
      ];
    }
    return [...catalegTasquesTDAH.respondre_correus.passos];
  }

  if (/\b(treball|projecte|informe|presentacio|programar|codi|dissenyar|entrega|feina)\b/i.test(normalitzat)) {
    const proj = extreureContext(/\b(fer|acabar|començar|comencar|preparar|el|la|un|una)\b/gi, "el document");
    return [
      "Tancar totes les pestanyes que no necessitis",
      `Obrir el fitxer de ${proj} en pantalla`,
      "Escriure tres punts clau sense donar-los forma",
      "Completar només el primer apartat cinc minuts",
      "Desar els canvis fets fins ara mateix"
    ];
  }

  for (const key in catalegTasquesTDAH) {
    const categoria = catalegTasquesTDAH[key];
    const coincideix = categoria.paraules_clau.some(paraula =>
      normalitzat.includes(normalitzarText(paraula))
    );
    if (coincideix) {
      return [...categoria.passos];
    }
  }

  const resumTasca = original.split(/\s+/).slice(0, 3).join(" ").toLowerCase();
  return [
    "Fer una respiració fonda i deixar el mòbil",
    `Preparar l'espai bàsic per a "${resumTasca}"`,
    "Fer l'acció més petita i fàcil primer",
    "Continuar avançant només durant tres minuts",
    "Revisar el que ja has aconseguit fer"
  ];
}

// --- ESDEVENIMENTS DEL BOTÓ ENVIAR I TECLA ENTER ---
if (btnSend && taskInput) {
  btnSend.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (!taskText) return;

    switchView("view-tasks");
    taskInput.value = "";

    if (stepDisplay) stepDisplay.classList.remove("hidden", "animate-subtle-pulse");
    if (completionBadge) completionBadge.classList.add("hidden");

    state.currentSteps = generarMicroPassos(taskText);
    state.currentIndex = 0;
    saveState();
  });

  taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") btnSend.click();
  });
}

// --- LÒGICA DE RUTINA DE MATÍ ---
if (btnRoutineOk) {
  btnRoutineOk.addEventListener("click", () => {
    if (!Array.isArray(state.routineSteps) || state.routineSteps.length === 0) {
      if (routineInputNew) routineInputNew.focus();
      return;
    }
    if (state.routineIndex < state.routineSteps.length) {
      state.routineIndex++;
      saveState();
    } else {
      state.routineIndex = 0;
      saveState();
    }
  });
}

if (btnRoutineNext) {
  btnRoutineNext.addEventListener("click", () => {
    if (Array.isArray(state.routineSteps) && state.routineIndex < state.routineSteps.length - 1) {
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
    const newStep = routineInputNew.value.trim();
    if (newStep) {
      if (!Array.isArray(state.routineSteps)) state.routineSteps = [];
      state.routineSteps.push(newStep);
      routineInputNew.value = "";
      saveState();
      showToast("✓ Pas afegit a la rutina");
    }
  });

  routineInputNew.addEventListener("keydown", (e) => {
    if (e.key === "Enter") btnRoutineAdd.click();
  });
}

if (btnRoutineReset) {
  btnRoutineReset.addEventListener("click", () => {
    state.routineSteps = [];
    state.routineIndex = 0;
    saveState();
    showToast("Rutina buidada");
  });
}

// --- LÒGICA DE LA TO-DO LIST RÀPIDA ---
function renderQuickTodoList() {
  if (!quickTodoListContainer) return;
  quickTodoListContainer.innerHTML = "";
  
  if (!state.quickTodoList || state.quickTodoList.length === 0) {
    quickTodoListContainer.innerHTML = '<p class="text-xs text-stone-500 text-center py-6 md:col-span-2">No hi ha tasques ràpides pendents.</p>';
    return;
  }

  state.quickTodoList.forEach((item, idx) => {
    const todoItem = document.createElement("div");
    todoItem.className = "bg-stone-950 border border-stone-800 p-3 rounded-xl flex justify-between items-center text-xs gap-2 transition";

    const leftDiv = document.createElement("div");
    leftDiv.className = "flex items-center gap-3 overflow-hidden";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.completed || false;
    checkbox.className = "w-4 h-4 accent-sky-500 rounded cursor-pointer shrink-0";
    checkbox.setAttribute("aria-label", `Marcar tasca: ${item.text}`);
    checkbox.addEventListener("change", () => {
      state.quickTodoList[idx].completed = checkbox.checked;
      saveState();
    });

    const textSpan = document.createElement("span");
    textSpan.className = `text-stone-200 break-words ${item.completed ? "line-through text-stone-500" : ""}`;
    textSpan.textContent = item.text;

    leftDiv.appendChild(checkbox);
    leftDiv.appendChild(textSpan);

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.className = "text-stone-500 hover:text-stone-300 text-xs px-2 py-1 shrink-0";
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

// --- LÒGICA DE HOBBIES ---
if (btnHobbyNext) {
  btnHobbyNext.addEventListener("click", () => {
    if (Array.isArray(state.hobbySteps) && state.hobbySteps.length > 0) {
      state.hobbyIndex = (state.hobbyIndex + 1) % state.hobbySteps.length;
      saveState();
    } else if (hobbyInputNew) {
      hobbyInputNew.focus();
    }
  });
}

if (btnHobbyPrev) {
  btnHobbyPrev.addEventListener("click", () => {
    if (Array.isArray(state.hobbySteps) && state.hobbySteps.length > 0) {
      state.hobbyIndex = (state.hobbyIndex - 1 + state.hobbySteps.length) % state.hobbySteps.length;
      saveState();
    }
  });
}

if (btnHobbyAdd && hobbyInputNew) {
  btnHobbyAdd.addEventListener("click", () => {
    const newHobby = hobbyInputNew.value.trim();
    if (newHobby) {
      if (!Array.isArray(state.hobbySteps)) state.hobbySteps = [];
      state.hobbySteps.push(newHobby);
      state.hobbyIndex = state.hobbySteps.length - 1;
      hobbyInputNew.value = "";
      saveState();
      showToast("✓ Hobby afegit");
    }
  });

  hobbyInputNew.addEventListener("keydown", (e) => {
    if (e.key === "Enter") btnHobbyAdd.click();
  });
}

if (btnHobbyReset) {
  btnHobbyReset.addEventListener("click", () => {
    state.hobbySteps = [];
    state.hobbyIndex = 0;
    saveState();
    showToast("Llista de hobbies buidada");
  });
}

// --- LÒGICA DE PENSAMENTS APARCATS ---
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

if (btnPark && thoughtInput) {
  btnPark.addEventListener("click", () => {
    const thoughtText = thoughtInput.value.trim();
    if (thoughtText) {
      state.parkedThoughts.push({
        text: thoughtText,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      });
      thoughtInput.value = "";
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
    thoughtsListContainer.innerHTML = '<p class="text-xs text-stone-500 text-center py-8 md:col-span-2">No hi ha pensaments aparcats encara.</p>';
    return;
  }

  state.parkedThoughts.forEach((item, idx) => {
    const thoughtItem = document.createElement("div");
    thoughtItem.className = "bg-stone-950 border border-stone-800 p-3 rounded-xl flex justify-between items-center text-xs gap-2";

    const textSpan = document.createElement("span");
    textSpan.className = "text-stone-200 break-words";
    textSpan.textContent = item.text;

    const rightDiv = document.createElement("div");
    rightDiv.className = "flex items-center gap-2 shrink-0";

    const timeSpan = document.createElement("span");
    timeSpan.className = "text-[10px] text-stone-500";
    timeSpan.textContent = item.time;

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.className = "text-stone-500 hover:text-stone-300 text-xs px-1";
    delBtn.textContent = "✕";
    delBtn.setAttribute("aria-label", `Esborrar pensament: ${item.text}`);
    delBtn.addEventListener("click", () => {
      state.parkedThoughts.splice(idx, 1);
      saveState();
    });

    rightDiv.appendChild(timeSpan);
    rightDiv.appendChild(delBtn);
    thoughtItem.appendChild(textSpan);
    thoughtItem.appendChild(rightDiv);
    thoughtsListContainer.appendChild(thoughtItem);
  });
}

if (btnClearThoughts) {
  btnClearThoughts.addEventListener("click", () => {
    state.parkedThoughts = [];
    saveState();
  });
}

// --- LÒGICA DEL POMODORO SENSORIAL AMB TEMPS PERSONALITZABLE I DESCANSOS AUTOMÀTICS ---
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

  if (btnPomoOk) btnPomoOk.textContent = isPomoPaused ? "Iniciar" : "Pausar";
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
    saveState();

    const isLongBreakDue = state.completedPomodoros % cfg.cyclesBeforeLong === 0;
    if (isLongBreakDue) {
      showToast(`🎉 ${cfg.cyclesBeforeLong} Pomodoros completats! Descans llarg (${cfg.longBreakMin} min)`);
      setupPomodoroPhase("longBreak", true);
    } else {
      showToast(`✓ Pomodoro completat! Descans curt (${cfg.shortBreakMin} min)`);
      setupPomodoroPhase("shortBreak", true);
    }
  } else {
    showToast("🎯 Descans acabat! Tornem al bloc de Focus");
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

  if (pomoTimeDisplay) {
    pomoTimeDisplay.textContent = formatSeconds(pomoCurrentSeconds);
  }

  if (pomoModeBadge) {
    if (pomoPhase === "focus") {
      pomoModeBadge.textContent = `🎯 Bloc de Focus (${state.pomoConfig.focusMin} min)`;
    } else if (pomoPhase === "shortBreak") {
      pomoModeBadge.textContent = `☕ Descans Curt (${state.pomoConfig.shortBreakMin} min)`;
    } else {
      pomoModeBadge.textContent = `🌴 Descans Llarg (${state.pomoConfig.longBreakMin} min)`;
    }
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
    showToast("⏱️ Fase actual reiniciada");
  });
}

if (btnPomoSkipPhase) {
  btnPomoSkipPhase.addEventListener("click", () => {
    handlePhaseCompletion();
  });
}

if (btnPomoNext) {
  btnPomoNext.addEventListener("click", () => {
    if (pomoTimer) clearInterval(pomoTimer);
    pomoTimer = null;
    switchView("view-menu");
  });
}

function savePomoConfiguration(focusVal, shortVal, longVal, cyclesVal, restartNow = false) {
  const focusMin = Math.min(120, Math.max(1, parseInt(focusVal, 10) || 25));
  const shortBreakMin = Math.min(60, Math.max(1, parseInt(shortVal, 10) || 5));
  const longBreakMin = Math.min(90, Math.max(1, parseInt(longVal, 10) || 15));
  const cyclesBeforeLong = Math.min(12, Math.max(1, parseInt(cyclesVal, 10) || 5));

  state.pomoConfig = {
    focusMin,
    shortBreakMin,
    longBreakMin,
    cyclesBeforeLong
  };

  syncPomoInputsFromState();
  saveState();

  if (restartNow) {
    setupPomodoroPhase("focus", true);
  } else {
    pomoTotalSeconds = getPhaseDurationSeconds(pomoPhase);
    pomoCurrentSeconds = pomoTotalSeconds;
    updatePomodoroVisuals();
  }
  showToast("✓ Configuració del Pomodoro desada");
}

if (btnSavePomoInline) {
  btnSavePomoInline.addEventListener("click", () => {
    savePomoConfiguration(
      pomoCfgFocus ? pomoCfgFocus.value : 25,
      pomoCfgShort ? pomoCfgShort.value : 5,
      pomoCfgLong ? pomoCfgLong.value : 15,
      pomoCfgCycles ? pomoCfgCycles.value : 5,
      true
    );
  });
}

if (btnSavePomoSettings) {
  btnSavePomoSettings.addEventListener("click", () => {
    savePomoConfiguration(
      settingsPomoFocus ? settingsPomoFocus.value : 25,
      settingsPomoShort ? settingsPomoShort.value : 5,
      settingsPomoLong ? settingsPomoLong.value : 15,
      settingsPomoCycles ? settingsPomoCycles.value : 5,
      false
    );
  });
}

// --- INICI DE SESSIÓ XIFRAT (SHA-256) I VALIDACIÓ D'USUARI ÚNIC AL NÚVOL ---
if (btnSaveSettings) {
  btnSaveSettings.addEventListener("click", async () => {
    const enteredUser = (cfgSyncId ? cfgSyncId.value.trim() : "") || "convidat";
    const enteredPass = cfgSyncPass ? cfgSyncPass.value.trim() : "";

    if (enteredUser.toLowerCase() === "convidat") {
      logoutToGuestMode("Mode Convidat actiu (100% Local)");
      return;
    }

    if (chkRgpdConsent && !chkRgpdConsent.checked) {
      showToast("⚠️ Marca la casella de consentiment RGPD per sincronitzar");
      chkRgpdConsent.focus();
      return;
    }

    if (!enteredPass) {
      showToast("⚠️ Escriu una contrasenya per protegir el teu usuari");
      if (cfgSyncPass) cfgSyncPass.focus();
      return;
    }

    btnSaveSettings.disabled = true;
    btnSaveSettings.textContent = "Verificant credencials...";

    try {
      const baseUrl = cleanSupaUrl(config.supaUrl);
      const cleanUser = enteredUser.toLowerCase();
      const enteredHash = await computeSecureSyncHash(cleanUser, enteredPass);

      const checkRes = await fetch(`${baseUrl}/rest/v1/user_credentials?username=eq.${encodeURIComponent(cleanUser)}`, {
        headers: {
          "apikey": config.supaKey,
          "Authorization": `Bearer ${config.supaKey}`
        }
      });

      if (!checkRes.ok) throw new Error("Error de connexió amb el servidor");

      const existingUsers = await checkRes.json();

      if (existingUsers.length > 0) {
        const storedHash = existingUsers[0].password_hash;
        if (storedHash !== enteredHash) {
          showToast("❌ Contrasenya incorrecta per a aquest usuari");
          btnSaveSettings.disabled = false;
          btnSaveSettings.textContent = "Desar i Sincronitzar";
          if (cfgSyncPass) cfgSyncPass.focus();
          return;
        }
      } else {
        const insertRes = await fetch(`${baseUrl}/rest/v1/user_credentials`, {
          method: "POST",
          headers: {
            "apikey": config.supaKey,
            "Authorization": `Bearer ${config.supaKey}`,
            "Content-Type": "application/json",
            "Prefer": "resolution=ignore-duplicates"
          },
          body: JSON.stringify({
            username: cleanUser,
            password_hash: enteredHash
          })
        });

        if (!insertRes.ok) {
          showToast("⚠️ Aquest nom d'usuari ja està registrat amb una altra contrasenya.");
          btnSaveSettings.disabled = false;
          btnSaveSettings.textContent = "Desar i Sincronitzar";
          return;
        }
      }

      config.syncUser = cleanUser;
      config.syncHash = enteredHash;
      config.rgpdConsent = true;

      localStorage.setItem("aibuddy_sync_user", config.syncUser);
      localStorage.setItem("aibuddy_sync_hash", config.syncHash);
      localStorage.setItem("aibuddy_rgpd_consent", "true");
      localStorage.removeItem("aibuddy_sync_pass");

      if (cfgSyncPass) cfgSyncPass.value = "";

      loadLocalState();
      updateAllDisplays();

      await pullRemoteState();
      await saveState();

      showToast(`✓ Sessió iniciada correctament: ${config.syncUser}`);
      switchView("view-menu");
    } catch (err) {
      console.error(err);
      showToast("⚠️ Error en validar les credencials al núvol");
    } finally {
      btnSaveSettings.disabled = false;
      btnSaveSettings.textContent = "Desar i Sincronitzar";
    }
  });
}

// --- TANCAR SESSIÓ I TORNAR A MODE CONVIDAT ---
function logoutToGuestMode(toastMsg = "Has tornat a mode Convidat") {
  config.syncUser = "convidat";
  config.syncHash = "";

  localStorage.setItem("aibuddy_sync_user", "convidat");
  localStorage.removeItem("aibuddy_sync_hash");
  localStorage.removeItem("aibuddy_sync_pass");

  if (cfgSyncId) cfgSyncId.value = "convidat";
  if (cfgSyncPass) {
    cfgSyncPass.value = "";
    cfgSyncPass.type = "password";
  }
  if (btnTogglePass) btnTogglePass.textContent = "👁️";

  loadLocalState();
  updateAllDisplays();
  if (statusBadge) statusBadge.textContent = "⚪ Convidat";
  showToast(toastMsg);
  switchView("view-menu");
}

if (btnLogoutGuest) {
  btnLogoutGuest.addEventListener("click", () => {
    logoutToGuestMode("Has tornat a mode Convidat");
  });
}

// --- DRETS RGPD: ART. 20 PORTABILITAT (.JSON) I ART. 17 SUPRESSIÓ TOTAL ---
function exportMyData() {
  try {
    const exportPayload = {
      app: "AI Buddy - Organitzador Personal i Focus",
      exportedAt: new Date().toISOString(),
      usuari: isGuestMode() ? "convidat (local)" : config.syncUser,
      state: state
    };

    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "aibuddy_dades_usuari.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("📥 Dades exportades (.JSON)");
  } catch (e) {
    showToast("⚠️ Error en exportar les dades");
  }
}
window.exportMyData = exportMyData;

if (btnExportData) {
  btnExportData.addEventListener("click", exportMyData);
}

async function deleteMyCloudData() {
  const confirmMsg = isGuestMode()
    ? "Vols esborrar totes les dades guardades en aquest dispositiu?"
    : `Vols eliminar definitivament totes les teves dades del núvol (${config.syncUser}) i d'aquest dispositiu? Aquesta acció és irreversible.`;

  if (!confirm(confirmMsg)) return;

  const baseUrl = cleanSupaUrl(config.supaUrl);
  const currentHash = config.syncHash;

  if (!isGuestMode() && baseUrl && config.supaKey && currentHash) {
    try {
      await fetch(`${baseUrl}/rest/v1/user_state?id=eq.${encodeURIComponent(currentHash)}`, {
        method: "DELETE",
        headers: {
          "apikey": config.supaKey,
          "Authorization": `Bearer ${config.supaKey}`
        }
      });
    } catch (e) {
      console.error("Error eliminant les dades del núvol:", e);
    }
  }

  const savedTheme = localStorage.getItem("aibuddy_theme");
  const savedVersion = localStorage.getItem("aibuddy_app_version");
  localStorage.clear();
  if (savedTheme) localStorage.setItem("aibuddy_theme", savedTheme);
  if (savedVersion) localStorage.setItem("aibuddy_app_version", savedVersion);

  config.syncUser = "convidat";
  config.syncHash = "";
  config.rgpdConsent = false;

  if (chkRgpdConsent) chkRgpdConsent.checked = false;
  state = getInitialState();
  localStorage.setItem("aibuddy_state_convidat", JSON.stringify(state));

  syncPomoInputsFromState();
  updateAllDisplays();
  if (statusBadge) statusBadge.textContent = "⚪ Convidat";
  showToast("🗑️ Compte i dades eliminats correctament");
  switchView("view-menu");
}
window.deleteMyCloudData = deleteMyCloudData;

if (btnDeleteAccount) {
  btnDeleteAccount.addEventListener("click", deleteMyCloudData);
}

// --- GESTIÓ DE TEMES (CLAR / FOSC) ---
function initTheme() {
  const savedTheme = localStorage.getItem("aibuddy_theme") || "dark";
  const body = document.body;
  const themeBtn = document.getElementById("btn-theme-toggle");

  if (savedTheme === "light") {
    body.classList.add("light-mode");
    if (themeBtn) themeBtn.textContent = "🌙";
  } else {
    body.classList.remove("light-mode");
    if (themeBtn) themeBtn.textContent = "☀️";
  }
}

function toggleTheme() {
  const body = document.body;
  const themeBtn = document.getElementById("btn-theme-toggle");
  
  if (body.classList.contains("light-mode")) {
    body.classList.remove("light-mode");
    localStorage.setItem("aibuddy_theme", "dark");
    if (themeBtn) themeBtn.textContent = "☀️";
  } else {
    body.classList.add("light-mode");
    localStorage.setItem("aibuddy_theme", "light");
    if (themeBtn) themeBtn.textContent = "🌙";
  }
}
window.toggleTheme = toggleTheme;

initTheme();

// --- INICIALITZACIÓ ---
loadLocalState();
pomoTotalSeconds = getPhaseDurationSeconds("focus");
pomoCurrentSeconds = pomoTotalSeconds;
updatePomodoroVisuals();
updateAllDisplays();

if (statusBadge) {
  statusBadge.textContent = isGuestMode() ? "⚪ Convidat" : `🟢 ${config.syncUser}`;
}

checkInitialOnboarding();
pullRemoteState();

// --- SISTEMA D'ACTUALITZACIONS AUTOMÀTIQUES (BASAT EN VERSION.JSON) ---
async function checkForUpdates() {
  try {
    const res = await fetch(`./version.json?t=${Date.now()}`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (data && data.version) {
        const serverVersion = String(data.version).trim();
        const localVersion = localStorage.getItem("aibuddy_app_version");

        if (!localVersion) {
          localStorage.setItem("aibuddy_app_version", serverVersion);
        } else if (localVersion !== serverVersion) {
          pendingServerVersion = serverVersion;
          const banner = document.getElementById("update-banner");
          if (banner) banner.classList.remove("hidden");
        }
      }
    }
  } catch (e) {
    console.log("No s'ha pogut comprovar l'actualització:", e);
  }
}

window.applyUpdate = function() {
  if (pendingServerVersion) {
    localStorage.setItem("aibuddy_app_version", pendingServerVersion);
  } else {
    localStorage.removeItem("aibuddy_app_version");
  }
  window.location.reload();
};

checkForUpdates();
