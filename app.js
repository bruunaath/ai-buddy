// --- DICCIONARI DE 10 CATEGORIES HABITUALS AuDHD ---
const catalegTasquesTDAH = {
  netejar_cuina: {
    titol: "Netejar la cuina",
    paraules_clau: ["cuina", "plats", "fregadera", "marbre", "escurar", "aiguera", "rentaplats"],
    passos: [
      "Posar música animada o el teu pòdcast preferit",
      "Llençar només els envasos i brossa visible",
      "Agrupar tots els plats bruts dins l'aigüera",
      "Rentar només cinc peces o omplir el rentaplats",
      "Passar una baieta humida per un tros de marbre"
    ]
  },
  posar_rentadora: {
    titol: "Posar una rentadora",
    paraules_clau: ["rentadora", "bugada", "rentar roba", "cistell"],
    passos: [
      "Portar el cistell de roba bruta davant la rentadora",
      "Ficar a dins només una tanda del mateix tipus",
      "Tancar la porta sense preocupar-se per la resta",
      "Posar un rajolí de detergent i suavitzant al calaix",
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
      "Subratllar tres paraules clau sense aturar-se a memoritzar",
      "Escriure dues frases de resum amb les teves paraules"
    ]
  },
  respondre_correus: {
    titol: "Respondre correus pendents",
    paraules_clau: ["correu", "correus", "mail", "email", "safata", "respondre", "professor", " redactar", "contestar"],
    passos: [
      "Obrir la bústia i escollir només un correu pendent",
      "Prémer el botó de respondre per obrir el quadre",
      "Escriure una salutació curta i el motiu en brut",
      "Llegir el text un sol cop sense perfeccionisme",
      "Prémer enviar immediatament i descansar un minut"
    ]
  },
  ordenar_escriptori: {
    titol: "Ordenar l'escriptori",
    paraules_clau: ["escriptori", "taula", "ordenar", "endreçar", "endrecar", "habitació", "habitacio", "netejar", "recollir", "pols"],
    passos: [
      "Retirar tots els gots, tasses i plats cap a la cuina",
      "Llençar els papers inservibles i embolcalls a la paperera",
      "Apilar tots els llibres i llibretes en un cantó",
      "Deixar només l'ordinador i un bolígraf al centre",
      "Passar un drap ràpid per l'espai que ha quedat lliure"
    ]
  },
  apat_rapid: {
    titol: "Fer un àpat ràpid",
    paraules_clau: ["cuinar", "dinar", "sopar", "esmorzar", "menjar", "àpat", "apat", "fam", "recepta", "tupper", "bullir", "fregir"],
    passos: [
      "Beure un glop d'aigua per calmar la gana",
      "Obrir la nevera i triar l'opció més fàcil",
      "Treure només els ingredients i un sol plat o paella",
      "Escalfar o barrejar el menjar durant cinc minuts",
      "Seure a menjar tranquil·lament sense recollir encara"
    ]
  },
  planificar_dia: {
    titol: "Planificar el dia",
    paraules_clau: ["planificar", "organitzar", "agenda", "llista", "dia", "horari", "calendari", "setmana"],
    passos: [
      "Agafar un paper en blanc i un bolígraf qualsevol",
      "Apuntar totes les coses que et ronden pel cap",
      "Encerclar només la tasca més urgent d'avui",
      "Triar una segona tasca molt petita i fàcil",
      "Guardar la resta de la llista per a demà"
    ]
  },
  dutxa_i_motxilla: {
    titol: "Dutxar-se i preparar la motxilla",
    paraules_clau: ["dutxa", "dutxar", "motxilla", "maleta", "preparar", "sortir", "bany", "higiene"],
    passos: [
      "Deixar la motxilla oberta damunt del llit",
      "Ficar-hi a dins el carregador, claus, cartera i llibreta",
      "Agafar una tovallola neta i roba còmoda i entrar al bany",
      "Obrir l'aigua calenta i entrar sota l'aigua dos minuts",
      "Ensabonar-se ràpidament, sortir i vestir-se sense pressa"
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
  },
  recollir_roba: {
    titol: "Recollir la roba estesa",
    paraules_clau: ["estendre", "estesa", "plegar", "roba seca", "armari", "roba", "planxar", "sabates"],
    passos: [
      "Despenjar tota la roba seca i deixar-la sobre el llit",
      "Separar en un munt petit només la roba interior i mitjons",
      "Desar aquest munt petit directament dins del calaix",
      "Plegar o penjar només cinc samarretes o pantalons",
      "Guardar aquestes cinc peces a l'armari i descansar"
    ]
  }
};

// --- VALORS PREDETERMINATS ---
const defaultRoutineSteps = [
  "Beure un got d'aigua",
  "Prendre la medicació",
  "Obrir la persiana i ventilar",
  "Dutxa ràpida o rentar-se la cara",
  "Esmorzar sense pantalles"
];

const defaultHobbies = [
  "Llegir un llibre o còmic",
  "Escoltar música relaxant",
  "Dibuixar o pintar lliurement",
  "Jugar a un videojoc tranquil",
  "Passejar sense rumb fix"
];

// --- ESTAT CENTRALITZAT (Local + Núvol) ---
let state = {
  currentSteps: [
    "Escriu una tasca o tria una plantilla ràpida",
    "Avança pas a pas sense distraccions"
  ],
  currentIndex: 0,
  parkedThoughts: [],
  routineSteps: [...defaultRoutineSteps],
  routineIndex: 0,
  hobbySteps: [...defaultHobbies],
  hobbyIndex: 0,
  updatedAt: 0
};

// Configuració de Supabase (es guarda al navegador de cada dispositiu)
let config = {
  supaUrl: localStorage.getItem("aibuddy_supa_url") || "",
  supaKey: localStorage.getItem("aibuddy_supa_key") || "",
  syncId: localStorage.getItem("aibuddy_sync_id") || "usuari_principal"
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
const taskInput = document.getElementById("task-input");
const btnSend = document.getElementById("btn-send");
const btnOk = document.getElementById("btn-ok");
const btnNext = document.getElementById("btn-next");
const btnPrev = document.getElementById("btn-prev");

const routineStepDisplay = document.getElementById("routine-step-display");
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
const pomoEmoji = document.getElementById("pomo-emoji");
const pomoStatusLabel = document.getElementById("pomo-status-label");
const btnPomoOk = document.getElementById("btn-pomo-ok");
const btnPomoNext = document.getElementById("btn-pomo-next");
const btnPomoReset = document.getElementById("btn-pomo-reset");

const cfgSupaUrl = document.getElementById("cfg-supa-url");
const cfgSupaKey = document.getElementById("cfg-supa-key");
const cfgSyncId = document.getElementById("cfg-sync-id");
const btnSaveSettings = document.getElementById("btn-save-settings");

// --- PERSISTÈNCIA I SINCRONITZACIÓ (LocalStorage + Supabase REST) ---
function cleanSupaUrl(rawUrl) {
  if (!rawUrl) return "";
  return rawUrl
    .trim()
    .replace(/\/rest\/v1\/?$/i, "")
    .replace(/\/+$/, "");
}

function loadLocalState() {
  const saved = localStorage.getItem("aibuddy_state");
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
  localStorage.setItem("aibuddy_state", JSON.stringify(state));
  updateAllDisplays();

  const baseUrl = cleanSupaUrl(config.supaUrl);
  if (baseUrl && config.supaKey && config.syncId) {
    try {
      statusBadge.textContent = "🔄 Sincr...";
      const res = await fetch(`${baseUrl}/rest/v1/user_state`, {
        method: "POST",
        headers: {
          "apikey": config.supaKey,
          "Authorization": `Bearer ${config.supaKey}`,
          "Content-Type": "application/json",
          "Prefer": "resolution=merge-duplicates"
        },
        body: JSON.stringify({
          id: config.syncId,
          data: state,
          updated_at: new Date().toISOString()
        })
      });
      if (res.ok) {
        statusBadge.textContent = "🟢 Sincronitzat";
      } else {
        statusBadge.textContent = "🟠 Error Núvol";
      }
    } catch (err) {
      statusBadge.textContent = "⚪ Offline";
    }
  } else {
    statusBadge.textContent = "⚪ Local";
  }
}

async function pullRemoteState() {
  const baseUrl = cleanSupaUrl(config.supaUrl);
  if (!baseUrl || !config.supaKey || !config.syncId) {
    statusBadge.textContent = "⚪ Local";
    return;
  }
  try {
    const url = `${baseUrl}/rest/v1/user_state?id=eq.${encodeURIComponent(config.syncId)}&select=data`;
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
          localStorage.setItem("aibuddy_state", JSON.stringify(state));
          updateAllDisplays();
        }
        statusBadge.textContent = "🟢 Sincronitzat";
      } else {
        await saveState();
      }
    } else {
      statusBadge.textContent = "🟠 Error Núvol";
    }
  } catch (e) {
    statusBadge.textContent = "⚪ Offline";
  }
}

window.addEventListener("focus", pullRemoteState);
setInterval(pullRemoteState, 20000);

// --- GESTIÓ DE VISTES ---
function switchView(viewId) {
  const views = ["view-menu", "view-tasks", "view-thoughts", "view-pomodoro", "view-routine", "view-hobbies", "view-settings"];
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
    cfgSupaUrl.value = config.supaUrl;
    cfgSupaKey.value = config.supaKey;
    cfgSyncId.value = config.syncId;
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
}

function updateTaskDisplay() {
  if (Array.isArray(state.currentSteps) && state.currentSteps.length > 0 && state.currentIndex < state.currentSteps.length) {
    completionBadge.classList.add("hidden");
    completionBadge.classList.remove("flex");
    stepDisplay.classList.remove("hidden");
    stepDisplay.textContent = state.currentSteps[state.currentIndex];
    stepCounter.textContent = `Pas ${state.currentIndex + 1} de ${state.currentSteps.length}`;
  } else {
    stepDisplay.classList.add("hidden");
    completionBadge.classList.remove("hidden");
    completionBadge.classList.add("flex");
    stepCounter.textContent = "Completat";
  }
}

function updateRoutineDisplay() {
  if (Array.isArray(state.routineSteps) && state.routineSteps.length > 0 && state.routineIndex < state.routineSteps.length) {
    routineStepDisplay.textContent = `${state.routineIndex + 1}/${state.routineSteps.length} · ${state.routineSteps[state.routineIndex]}`;
  } else {
    routineStepDisplay.textContent = "✨ Has finalitzat tots els passos de matí!";
  }
}

function updateHobbyDisplay() {
  if (Array.isArray(state.hobbySteps) && state.hobbySteps.length > 0) {
    if (state.hobbyIndex >= state.hobbySteps.length) state.hobbyIndex = 0;
    hobbyStepDisplay.textContent = state.hobbySteps[state.hobbyIndex];
  } else {
    hobbyStepDisplay.textContent = "Afegeix algun hobby a la llista.";
  }
}

// --- NAVEGACIÓ DE TASQUES I PLANTILLES ---
btnOk.addEventListener("click", () => {
  if (state.currentIndex < state.currentSteps.length) {
    state.currentIndex++;
    saveState();
  }
});

btnNext.addEventListener("click", () => {
  if (state.currentIndex < state.currentSteps.length - 1) {
    state.currentIndex++;
    saveState();
  }
});

btnPrev.addEventListener("click", () => {
  if (state.currentIndex > 0) {
    state.currentIndex--;
    saveState();
  }
});

function loadTemplate(categoriaId) {
  // Compatibilitat amb crides antigues i amb les 10 categories noves
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

  // 1. Regles dinàmiques contextuals (extreuen destinatari, lloc o tema si n'hi ha)
  if (/\b(trucar|parlar per telefon|telefonar)\b/i.test(normalitzat)) {
    const dest = extreureContext(/\b(trucar|parlar|telefonar|al|a la|amb)\b/gi, "contacte");
    return [
      "Apuntar en un paper què vols dir",
      "Buscar el contacte a l'agenda del mòbil",
      "Fer una respiració fonda abans de marcar",
      `Prémer el botó de trucar (${dest})`,
      "Dir hola i llegir el teu guió",
      "Anotar la resposta just en penjar"
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
        "Redactar l'esborrany sense mirar les faltes",
        "Llegir el text en veu alta un cop",
        "Prémer el botó d'enviar i descansar"
      ];
    }
    return [...catalegTasquesTDAH.respondre_correus.passos];
  }

  if (/\b(comprar|supermercat|super|botiga|mercat|encarrecs|farmacia)\b/i.test(normalitzat)) {
    const item = extreureContext(/\b(anar a|comprar|fer la|al|a la)\b/gi, "la compra");
    return [
      "Mirar ràpidament què falta a la cuina",
      `Apuntar tres coses bàsiques per a ${item}`,
      "Agafar les claus, cartera i una bossa",
      "Sortir de casa i anar cap al lloc",
      "Agafar primer el que tens a la llista",
      "Pagar, tornar a casa i desar el fresc"
    ];
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

  // 2. Comprovació directa contra el Diccionari de les 10 Categories TDAH
  for (const key in catalegTasquesTDAH) {
    const categoria = catalegTasquesTDAH[key];
    const coincideix = categoria.paraules_clau.some(paraula =>
      normalitzat.includes(normalitzarText(paraula))
    );
    if (coincideix) {
      return [...categoria.passos];
    }
  }

  // 3. Estructura genèrica empàtica per a qualsevol altra tasca
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
btnSend.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  switchView("view-tasks");
  taskInput.value = "";

  stepDisplay.classList.remove("hidden", "animate-subtle-pulse");
  completionBadge.classList.add("hidden");

  state.currentSteps = generarMicroPassos(taskText);
  state.currentIndex = 0;
  saveState();
});

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") btnSend.click();
});

// --- LÒGICA DE RUTINA DE MATÍ ---
btnRoutineOk.addEventListener("click", () => {
  if (state.routineIndex < state.routineSteps.length) {
    state.routineIndex++;
    saveState();
  } else {
    state.routineIndex = 0;
    saveState();
  }
});

btnRoutineNext.addEventListener("click", () => {
  if (state.routineIndex < state.routineSteps.length - 1) {
    state.routineIndex++;
    saveState();
  }
});

btnRoutinePrev.addEventListener("click", () => {
  if (state.routineIndex > 0) {
    state.routineIndex--;
    saveState();
  }
});

btnRoutineAdd.addEventListener("click", () => {
  const newStep = routineInputNew.value.trim();
  if (newStep) {
    state.routineSteps.push(newStep);
    routineInputNew.value = "";
    saveState();
  }
});

btnRoutineReset.addEventListener("click", () => {
  state.routineSteps = [...defaultRoutineSteps];
  state.routineIndex = 0;
  saveState();
});

// --- LÒGICA DE HOBBIES ---
btnHobbyNext.addEventListener("click", () => {
  if (state.hobbySteps.length > 0) {
    state.hobbyIndex = (state.hobbyIndex + 1) % state.hobbySteps.length;
    saveState();
  }
});

btnHobbyPrev.addEventListener("click", () => {
  if (state.hobbySteps.length > 0) {
    state.hobbyIndex = (state.hobbyIndex - 1 + state.hobbySteps.length) % state.hobbySteps.length;
    saveState();
  }
});

btnHobbyAdd.addEventListener("click", () => {
  const newHobby = hobbyInputNew.value.trim();
  if (newHobby) {
    state.hobbySteps.push(newHobby);
    hobbyInputNew.value = "";
    saveState();
  }
});

btnHobbyReset.addEventListener("click", () => {
  state.hobbySteps = [...defaultHobbies];
  state.hobbyIndex = 0;
  saveState();
});

// --- LÒGICA DE PENSAMENTS APARCATS ---
function showToast(msg = "+ Pensament guardat") {
  toastNotification.textContent = msg;
  toastNotification.classList.remove("opacity-0", "translate-y-[-10px]");
  toastNotification.classList.add("opacity-100", "translate-y-0");

  setTimeout(() => {
    toastNotification.classList.remove("opacity-100", "translate-y-0");
    toastNotification.classList.add("opacity-0", "translate-y-[-10px]");
  }, 2500);
}

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

function renderParkedThoughts() {
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
    delBtn.className = "text-stone-600 hover:text-stone-300 text-xs px-1";
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

btnClearThoughts.addEventListener("click", () => {
  state.parkedThoughts = [];
  saveState();
});

// --- LÒGICA DEL POMODORO SENSORIAL ---
function startPomodoro() {
  switchView("view-pomodoro");
  pomoCurrentSeconds = pomoTotalSeconds;
  isPomoPaused = false;
  btnPomoOk.textContent = "Pausar";
  pomoBar.style.width = "100%";
  updatePomodoroVisuals();

  if (pomoTimer) clearInterval(pomoTimer);

  pomoTimer = setInterval(() => {
    if (!isPomoPaused) {
      pomoCurrentSeconds--;
      const percentage = Math.max(0, (pomoCurrentSeconds / pomoTotalSeconds) * 100);
      pomoBar.style.width = `${percentage}%`;
      updatePomodoroVisuals();

      if (pomoCurrentSeconds <= 0) {
        clearInterval(pomoTimer);
        pomoBar.style.width = "0%";
      }
    }
  }, 1000);
}
window.startPomodoro = startPomodoro;

function updatePomodoroVisuals() {
  if (pomoCurrentSeconds <= 0) {
    pomoEmoji.textContent = "🎉";
    pomoStatusLabel.textContent = "Temps completat!";
  } else if (isPomoPaused) {
    pomoEmoji.textContent = "☕";
    pomoStatusLabel.textContent = "En Pausa";
  } else if (pomoCurrentSeconds <= pomoTotalSeconds * 0.2) {
    pomoEmoji.textContent = "🌅";
    pomoStatusLabel.textContent = "Últim tram";
  } else {
    pomoEmoji.textContent = "🌱";
    pomoStatusLabel.textContent = "En Focus";
  }
}

btnPomoOk.addEventListener("click", () => {
  isPomoPaused = !isPomoPaused;
  btnPomoOk.textContent = isPomoPaused ? "Reprendre" : "Pausar";
  updatePomodoroVisuals();
});

btnPomoReset.addEventListener("click", () => {
  startPomodoro();
});

btnPomoNext.addEventListener("click", () => {
  if (pomoTimer) clearInterval(pomoTimer);
  switchView("view-menu");
});

// --- DESAR CONFIGURACIÓ SUPABASE ---
btnSaveSettings.addEventListener("click", async () => {
  config.supaUrl = cleanSupaUrl(cfgSupaUrl.value);
  config.supaKey = cfgSupaKey.value.trim();
  config.syncId = cfgSyncId.value.trim() || "usuari_principal";

  localStorage.setItem("aibuddy_supa_url", config.supaUrl);
  localStorage.setItem("aibuddy_supa_key", config.supaKey);
  localStorage.setItem("aibuddy_sync_id", config.syncId);

  await pullRemoteState();
  await saveState();
  showToast("Sincronització desada!");
  switchView("view-menu");
});

// --- INICIALITZACIÓ ---
loadLocalState();
updateAllDisplays();
pullRemoteState();
