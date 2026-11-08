// --- RUTES DE LES IMATGES D'ESTAT ---
const IMAGES = {
  focus: "focus_normal.jpg",   // 1. Quan el Pomodoro està en marxa
  pausa: "focus_pausa.jpg",    // 2. Quan el Pomodoro es pausa
  completat: "completat.jpg",  // 3. Quan s'acaba el Pomodoro o qualsevol tasca
  avis: "avis.jpg"             // 4. Quan falten 5 minuts o menys de Pomodoro
};

// ID especial a Supabase on es guarden totes les sessions creades i nom de l'administradora
const ACCESS_LOG_ID = "__registre_accessos__";
const ADMIN_USER = "carla-brunat";

// --- DICCIONARI DE CATEGORIES HABITUALS AuDHD ---
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

// --- VALORS PREDETERMINATS ---
const defaultRoutineSteps = [
  "Posar música animada",
  "Obrir els llençols per ventilar el llit",
  "Rentar-me les dents",
  "Skincare bàsic",
  "Fer el llit",
  "Cafè i medicació",
  "Preparar l'esmorzar"
];

const defaultHobbies = [
  "Llegir un llibre",
  "Escoltar música relaxant",
  "Pintar lliurement",
  "Fer Diamond Painting",
  "Jugar a la Switch sense mirar el mòbil",
  "Veure Gilmore Girls",
  "Mirar Pinterest per motivar-me"
];

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
    updatedAt: 0
  };
}

// --- ESTAT CENTRALITZAT ---
let state = getInitialState();

// Configuració d'Usuari i Supabase (Per defecte: "convidat" i contrasenya buida)
let config = {
  supaUrl: localStorage.getItem("aibuddy_supa_url") || "https://qstjwfqrkemyfzudtoxb.supabase.co",
  supaKey: localStorage.getItem("aibuddy_supa_key") || "sb_publishable_RoRpRRP4I1p3PYzIrbRsqA_9YJSZZfq",
  syncUser: localStorage.getItem("aibuddy_sync_user") || "convidat",
  syncPass: localStorage.getItem("aibuddy_sync_pass") || ""
};

// Variables del Pomodoro Sensorial
let pomoTimer = null;
let pomoTotalSeconds = 1500; // 25 minuts
let pomoCurrentSeconds = 1500;
let isPomoPaused = false;

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
const btnPomoOk = document.getElementById("btn-pomo-ok");
const btnPomoNext = document.getElementById("btn-pomo-next");
const btnPomoReset = document.getElementById("btn-pomo-reset");

const quickTodoInput = document.getElementById("quick-todo-input");
const btnAddQuickTodo = document.getElementById("btn-add-quick-todo");
const quickTodoListContainer = document.getElementById("quick-todo-list");
const btnClearQuickTodos = document.getElementById("btn-clear-quick-todos");

const cfgSupaUrl = document.getElementById("cfg-supa-url");
const cfgSupaKey = document.getElementById("cfg-supa-key");
const cfgSyncId = document.getElementById("cfg-sync-id");
const cfgSyncPass = document.getElementById("cfg-sync-pass");
const btnTogglePass = document.getElementById("btn-toggle-pass");
const btnSaveSettings = document.getElementById("btn-save-settings");
const btnLogoutGuest = document.getElementById("btn-logout-guest");
const btnAdminPanel = document.getElementById("btn-admin-panel");

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

// --- COMPROVACIÓ D'ADMIN (NOMÉS CARLA-BRUNAT VEU EL BOTÓ D'ADMIN) ---
function updateAdminButtonVisibility() {
  if (!btnAdminPanel) return;
  const user = (config.syncUser || "").trim().toLowerCase();
  const pass = (config.syncPass || "").trim();
  if (user === ADMIN_USER && pass !== "") {
    btnAdminPanel.classList.remove("hidden");
  } else {
    btnAdminPanel.classList.add("hidden");
  }
}

// --- GESTIÓ MULTI-USUARI (CONVIDAT vs COMPTE PROPI) ---
function isGuestMode() {
  const user = (config.syncUser || "").trim().toLowerCase();
  const pass = (config.syncPass || "").trim();
  return !user || user === "convidat" || pass === "";
}

function getCloudSyncKey() {
  const user = (config.syncUser || "").trim().toLowerCase();
  const pass = (config.syncPass || "").trim();
  return `${user}::${pass}`;
}

function getLocalStorageKey() {
  if (isGuestMode()) return "aibuddy_state_convidat";
  return `aibuddy_state_${getCloudSyncKey()}`;
}

function cleanSupaUrl(rawUrl) {
  if (!rawUrl) return "";
  return rawUrl
    .trim()
    .replace(/\/rest\/v1\/?$/i, "")
    .replace(/\/+$/, "");
}

// --- REGISTRE D'ACCESSOS AL NÚVOL (PER AL FITXER ADMIN.HTML) ---
function getDeviceName() {
  const ua = navigator.userAgent || "";
  if (/iPhone|iPad|iPod/i.test(ua)) return "iPhone / iPad";
  if (/Android/i.test(ua)) return "Mòbil Android";
  if (/Mac/i.test(ua)) return "Ordinador Mac";
  if (/Win/i.test(ua)) return "Ordinador Windows";
  return "Navegador Web";
}

async function registrarSessioAlNuvol(usuari, esNouCompte = false) {
  const baseUrl = cleanSupaUrl(config.supaUrl);
  if (!baseUrl || !config.supaKey) return;

  try {
    const getUrl = `${baseUrl}/rest/v1/user_state?id=eq.${encodeURIComponent(ACCESS_LOG_ID)}&select=data`;
    const getRes = await fetch(getUrl, {
      headers: {
        "apikey": config.supaKey,
        "Authorization": `Bearer ${config.supaKey}`
      }
    });

    let sessions = [];
    if (getRes.ok) {
      const rows = await getRes.json();
      if (rows.length > 0 && rows[0].data && Array.isArray(rows[0].data.sessions)) {
        sessions = rows[0].data.sessions;
      }
    }

    const ara = new Date().toISOString();
    const dispositiu = getDeviceName();
    const cleanUser = usuari.trim().toLowerCase();

    const indexExistent = sessions.findIndex(s => s.usuari.toLowerCase() === cleanUser);
    if (indexExistent >= 0) {
      sessions[indexExistent].ultimAcces = ara;
      sessions[indexExistent].dispositiu = dispositiu;
      sessions[indexExistent].totalAccessos = (sessions[indexExistent].totalAccessos || 1) + 1;
    } else {
      sessions.unshift({
        usuari: usuari.trim(),
        creatEl: ara,
        ultimAcces: ara,
        dispositiu: dispositiu,
        tipus: esNouCompte ? "Nou registre" : "Sessió activa",
        totalAccessos: 1
      });
    }

    await fetch(`${baseUrl}/rest/v1/user_state`, {
      method: "POST",
      headers: {
        "apikey": config.supaKey,
        "Authorization": `Bearer ${config.supaKey}`,
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates"
      },
      body: JSON.stringify({
        id: ACCESS_LOG_ID,
        data: { sessions, updatedAt: Date.now() },
        updated_at: ara
      })
    });
  } catch (e) {
    console.log("No s'ha pogut actualitzar el registre d'accessos:", e);
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
}

async function saveState() {
  state.updatedAt = Date.now();
  localStorage.setItem(getLocalStorageKey(), JSON.stringify(state));
  updateAllDisplays();

  if (isGuestMode()) {
    if (statusBadge) statusBadge.textContent = "⚪ Convidat";
    return;
  }

  const baseUrl = cleanSupaUrl(config.supaUrl);
  const cloudId = getCloudSyncKey();

  if (baseUrl && config.supaKey && cloudId) {
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
          id: cloudId,
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
}

async function pullRemoteState() {
  if (isGuestMode()) {
    if (statusBadge) statusBadge.textContent = "⚪ Convidat";
    return false;
  }

  const baseUrl = cleanSupaUrl(config.supaUrl);
  const cloudId = getCloudSyncKey();
  if (!baseUrl || !config.supaKey || !cloudId) {
    if (statusBadge) statusBadge.textContent = "⚪ Local";
    return false;
  }

  try {
    const url = `${baseUrl}/rest/v1/user_state?id=eq.${encodeURIComponent(cloudId)}&select=data`;
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
          localStorage.setItem(getLocalStorageKey(), JSON.stringify(state));
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

  if (viewId !== "view-pomodoro" && pomoTimer) {
    clearInterval(pomoTimer);
  }

  const target = document.getElementById(viewId);
  if (target) target.classList.remove("hidden");

  if (viewId === "view-settings") {
    if (cfgSupaUrl) cfgSupaUrl.value = config.supaUrl;
    if (cfgSupaKey) cfgSupaKey.value = config.supaKey;
    if (cfgSyncId) cfgSyncId.value = config.syncUser || "convidat";
    if (cfgSyncPass) {
      cfgSyncPass.value = config.syncPass || "";
      cfgSyncPass.type = "password";
    }
    if (btnTogglePass) btnTogglePass.textContent = "👁️";
    updateAdminButtonVisibility();
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
  updateAdminButtonVisibility();
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

  if (Array.isArray(state.routineSteps) && state.routineSteps.length > 0 && state.routineIndex < state.routineSteps.length) {
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
    hobbyStepDisplay.textContent = "Afegeix algun hobby a la llista.";
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

// --- MOTOR INTEL·LIGENT LOCAL DE MICRO-PASSOS (AuDHD) ---
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
    if (state.routineIndex < state.routineSteps.length - 1) {
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
      state.routineSteps.push(newStep);
      routineInputNew.value = "";
      saveState();
    }
  });

  routineInputNew.addEventListener("keydown", (e) => {
    if (e.key === "Enter") btnRoutineAdd.click();
  });
}

if (btnRoutineReset) {
  btnRoutineReset.addEventListener("click", () => {
    state.routineSteps = [...defaultRoutineSteps];
    state.routineIndex = 0;
    saveState();
  });
}

// --- LÒGICA DE LA TO-DO LIST RÀPIDA ---
function renderQuickTodoList() {
  if (!quickTodoListContainer) return;
  quickTodoListContainer.innerHTML = "";
  
  if (!state.quickTodoList || state.quickTodoList.length === 0) {
    quickTodoListContainer.innerHTML = '<p class="text-xs text-stone-500 text-center py-6">No hi ha tasques ràpides pendents.</p>';
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
    checkbox.className = "w-4 h-4 accent-sky-500 rounded cursor-pointer";
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
    delBtn.className = "text-stone-500 hover:text-stone-300 text-xs px-2 py-1 shrink-0";
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
    if (state.hobbySteps.length > 0) {
      state.hobbyIndex = (state.hobbyIndex + 1) % state.hobbySteps.length;
      saveState();
    }
  });
}

if (btnHobbyPrev) {
  btnHobbyPrev.addEventListener("click", () => {
    if (state.hobbySteps.length > 0) {
      state.hobbyIndex = (state.hobbyIndex - 1 + state.hobbySteps.length) % state.hobbySteps.length;
      saveState();
    }
  });
}

if (btnHobbyAdd && hobbyInputNew) {
  btnHobbyAdd.addEventListener("click", () => {
    const newHobby = hobbyInputNew.value.trim();
    if (newHobby) {
      state.hobbySteps.push(newHobby);
      hobbyInputNew.value = "";
      saveState();
    }
  });

  hobbyInputNew.addEventListener("keydown", (e) => {
    if (e.key === "Enter") btnHobbyAdd.click();
  });
}

if (btnHobbyReset) {
  btnHobbyReset.addEventListener("click", () => {
    state.hobbySteps = [...defaultHobbies];
    state.hobbyIndex = 0;
    saveState();
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
    thoughtsListContainer.innerHTML = '<p class="text-xs text-stone-500 text-center py-8">No hi ha pensaments aparcats encara.</p>';
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
    delBtn.className = "text-stone-500 hover:text-stone-300 text-xs px-1";
    delBtn.textContent = "✕";
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

// --- LÒGICA DEL POMODORO SENSORIAL AMB IMATGES ---
function startPomodoro() {
  switchView("view-pomodoro");
  pomoCurrentSeconds = pomoTotalSeconds;
  isPomoPaused = false;
  if (btnPomoOk) btnPomoOk.textContent = "Pausar";
  if (pomoBar) pomoBar.style.width = "100%";
  updatePomodoroVisuals();

  if (pomoTimer) clearInterval(pomoTimer);

  pomoTimer = setInterval(() => {
    if (!isPomoPaused) {
      pomoCurrentSeconds--;
      const percentage = Math.max(0, (pomoCurrentSeconds / pomoTotalSeconds) * 100);
      if (pomoBar) pomoBar.style.width = `${percentage}%`;
      updatePomodoroVisuals();

      if (pomoCurrentSeconds <= 0) {
        clearInterval(pomoTimer);
        if (pomoBar) pomoBar.style.width = "0%";
      }
    }
  }, 1000);
}
window.startPomodoro = startPomodoro;

function updatePomodoroVisuals() {
  if (!pomoImg || !pomoStatusLabel) return;

  if (pomoCurrentSeconds <= 0) {
    pomoImg.src = IMAGES.completat;
    pomoStatusLabel.textContent = "Temps completat!";
  } else if (isPomoPaused) {
    pomoImg.src = IMAGES.pausa;
    pomoStatusLabel.textContent = "En Pausa";
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
    startPomodoro();
  });
}

if (btnPomoNext) {
  btnPomoNext.addEventListener("click", () => {
    if (pomoTimer) clearInterval(pomoTimer);
    switchView("view-menu");
  });
}

// --- DESAR CONFIGURACIÓ D'USUARI I SUPABASE ---
if (btnSaveSettings) {
  btnSaveSettings.addEventListener("click", async () => {
    const enteredUser = (cfgSyncId ? cfgSyncId.value.trim() : "") || "convidat";
    const enteredPass = cfgSyncPass ? cfgSyncPass.value.trim() : "";

    if (enteredUser.toLowerCase() !== "convidat" && !enteredPass) {
      showToast("⚠️ Afegeix una contrasenya per al teu usuari");
      if (cfgSyncPass) cfgSyncPass.focus();
      return;
    }

    if (cfgSupaUrl) config.supaUrl = cleanSupaUrl(cfgSupaUrl.value);
    if (cfgSupaKey) config.supaKey = cfgSupaKey.value.trim();
    config.syncUser = enteredUser;
    config.syncPass = enteredUser.toLowerCase() === "convidat" ? "" : enteredPass;

    localStorage.setItem("aibuddy_supa_url", config.supaUrl);
    localStorage.setItem("aibuddy_supa_key", config.supaKey);
    localStorage.setItem("aibuddy_sync_user", config.syncUser);
    localStorage.setItem("aibuddy_sync_pass", config.syncPass);

    loadLocalState();
    updateAllDisplays();

    if (isGuestMode()) {
      if (statusBadge) statusBadge.textContent = "⚪ Convidat";
      showToast("Mode Convidat actiu (Local)");
      switchView("view-menu");
      return;
    }

    btnSaveSettings.textContent = "Sincronitzant...";
    const esNouCompte = await pullRemoteState();
    await saveState();
    await registrarSessioAlNuvol(config.syncUser, esNouCompte);
    btnSaveSettings.textContent = "Desar i Sincronitzar";
    updateAdminButtonVisibility();
    showToast(`✓ Sessió iniciada: ${config.syncUser}`);
    switchView("view-menu");
  });
}

// --- TORNAR A MODE CONVIDAT ---
if (btnLogoutGuest) {
  btnLogoutGuest.addEventListener("click", () => {
    config.syncUser = "convidat";
    config.syncPass = "";
    localStorage.setItem("aibuddy_sync_user", "convidat");
    localStorage.setItem("aibuddy_sync_pass", "");

    if (cfgSyncId) cfgSyncId.value = "convidat";
    if (cfgSyncPass) {
      cfgSyncPass.value = "";
      cfgSyncPass.type = "password";
    }
    if (btnTogglePass) btnTogglePass.textContent = "👁️";

    loadLocalState();
    updateAllDisplays();
    if (statusBadge) statusBadge.textContent = "⚪ Convidat";
    showToast("Has tornat a mode Convidat");
    switchView("view-menu");
  });
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
updateAllDisplays();
pullRemoteState();

// --- SISTEMA D'ACTUALITZACIONS AUTOMÀTIQUES ---
async function checkForUpdates() {
  try {
    const res = await fetch("./index.html", { method: "HEAD", cache: "no-store" });
    if (res.ok) {
      const lastModified = res.headers.get("last-modified");
      if (lastModified) {
        const localVersion = localStorage.getItem("aibuddy_app_version");

        if (!localVersion) {
          localStorage.setItem("aibuddy_app_version", lastModified);
        } else if (localVersion !== lastModified) {
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
  localStorage.removeItem("aibuddy_app_version");
  window.location.reload();
};

checkForUpdates();
