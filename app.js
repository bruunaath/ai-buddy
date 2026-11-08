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
    "Escriu una tasca o tria una opció",
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

// Configuració d'APIs (es guarda al navegador de cada dispositiu)
let config = {
  geminiKey: localStorage.getItem("aibuddy_gemini_key") || "",
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

const cfgGeminiKey = document.getElementById("cfg-gemini-key");
const cfgSupaUrl = document.getElementById("cfg-supa-url");
const cfgSupaKey = document.getElementById("cfg-supa-key");
const cfgSyncId = document.getElementById("cfg-sync-id");
const btnSaveSettings = document.getElementById("btn-save-settings");

// --- PERSISTÈNCIA I SINCRONITZACIÓ (LocalStorage + Supabase REST) ---
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

  if (config.supaUrl && config.supaKey && config.syncId) {
    try {
      statusBadge.textContent = "🔄 Sincr...";
      const url = `${config.supaUrl.replace(/\/$/, "")}/rest/v1/user_state?id=eq.${encodeURIComponent(config.syncId)}`;
      const res = await fetch(`${config.supaUrl.replace(/\/$/, "")}/rest/v1/user_state`, {
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
  if (!config.supaUrl || !config.supaKey || !config.syncId) {
    statusBadge.textContent = "⚪ Local";
    return;
  }
  try {
    const url = `${config.supaUrl.replace(/\/$/, "")}/rest/v1/user_state?id=eq.${encodeURIComponent(config.syncId)}&select=data`;
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
        // Si encara no existeix al núvol, pugem l'estat actual
        await saveState();
      }
    }
  } catch (e) {
    statusBadge.textContent = "⚪ Offline";
  }
}

// Sincronitza automàticament quan tornes a obrir la pestanya al mòbil o PC
window.addEventListener("focus", pullRemoteState);
setInterval(pullRemoteState, 20000);

// --- GESTIÓ DE VISTES ---
function switchView(viewId) {
  const views = ["view-menu", "view-tasks", "view-thoughts", "view-pomodoro", "view-routine", "view-hobbies", "view-settings"];
  views.forEach(id => document.getElementById(id).classList.add("hidden"));

  if (viewId !== "view-pomodoro" && pomoTimer) {
    clearInterval(pomoTimer);
  }

  document.getElementById(viewId).classList.remove("hidden");

  if (viewId === "view-Settings" || viewId === "view-settings") {
    cfgGeminiKey.value = config.geminiKey;
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
  if (state.currentSteps.length > 0 && state.currentIndex < state.currentSteps.length) {
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
  if (state.routineSteps.length > 0 && state.routineIndex < state.routineSteps.length) {
    routineStepDisplay.textContent = `${state.routineIndex + 1}/${state.routineSteps.length} · ${state.routineSteps[state.routineIndex]}`;
  } else {
    routineStepDisplay.textContent = "✨ Has finalitzat tots els passos de matí!";
  }
}

function updateHobbyDisplay() {
  if (state.hobbySteps.length > 0) {
    if (state.hobbyIndex >= state.hobbySteps.length) state.hobbyIndex = 0;
    hobbyStepDisplay.textContent = state.hobbySteps[state.hobbyIndex];
  } else {
    hobbyStepDisplay.textContent = "Afegeix algun hobby a la llista.";
  }
}

// --- LÒGICA DE TASQUES I IA (GOOGLE GEMINI EN CATALÀ) ---
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

function loadTemplate(templateType) {
  if (templateType === "estudi") {
    state.currentSteps = [
      "Obrir el material d'estudi",
      "Llegir el resum del tema 1",
      "Fer un esquema de punts clau",
      "Repassar i tancar pestanyes"
    ];
  } else if (templateType === "neteja") {
    state.currentSteps = [
      "Agafar una bossa d'escombraries",
      "Recollir objectes del terra",
      "Netejar la superfície de la taula",
      "Ventilar l'habitació 2 minuts"
    ];
  }
  state.currentIndex = 0;
  saveState();
}
window.loadTemplate = loadTemplate;

// --- MOTOR INTEL·LIGENT LOCAL DE MICRO-PASSOS (AuDHD) ---
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
  const normalitzat = original
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  function extreureContext(regexVerbs, fallback) {
    const net = original
      .replace(regexVerbs, "")
      .replace(/^(el|la|els|les|un|una|uns|unes|al|del|per a|per|de|a)\s+/i, "")
      .trim();
    if (!net || net.length < 2) return fallback;
    const paraules = net.split(/\s+/);
    return paraules.slice(0, 3).join(" ").toLowerCase();
  }

  const categories = [
    {
      id: "comunicacio",
      regex: /\b(escriure|redactar|correu|mail|email|missatge|whatsapp|respondre|contestar|trucar|parlar|enviar)\b/i,
      generar: () => {
        const dest = extreureContext(/\b(escriure|redactar|enviar|respondre|contestar|trucar|parlar|un|el|correu|mail|missatge|whatsapp)\b/gi, "destinatari");
        if (normalitzat.includes("trucar") || normalitzat.includes("parlar")) {
          return [
            "Apuntar en un paper què vols dir",
            "Buscar el contacte a l'agenda del mòbil",
            "Fer una respiració fonda abans de marcar",
            `Prem el botó de trucar (${dest})`,
            "Dir hola i llegir el teu guió",
            "Anotar la resposta just en penjar"
          ];
        }
        return [
          "Obrir l'aplicació de correu o missatgeria",
          `Crear un missatge nou per a ${dest}`,
          "Escriure un assumpte o salutació ben curta",
          "Redactar l'esborrany sense mirar les faltes",
          "Llegir el text en veu alta un cop",
          "Prémer el botó d'enviar i tancar"
        ];
      }
    },
    {
      id: "neteja_ordre",
      regex: /\b(netejar|ordenar|endrecar|recollir|escombrar|fregar|pols|habitacio|cuina|bany|taula|escriptori|llit|plat|plats)\b/i,
      generar: () => {
        const zona = extreureContext(/\b(netejar|ordenar|endreçar|endrecar|recollir|escombrar|fregar)\b/gi, "l'espai");
        return [
          "Posar música animada o un pòdcast curt",
          "Agafar una bossa petita per a brossa",
          `Retirar només els residus visibles de ${zona}`,
          "Agrupar els objectes que estan fora de lloc",
          "Despejar i netejar una sola superfície plana",
          "Guardar cinc coses al seu lloc exacte"
        ];
      }
    },
    {
      id: "estudi_lectura",
      regex: /\b(estudiar|llegir|repassar|examen|apunts|tema|deures|resum|esquema|memoritzar|practica|universitat|uni)\b/i,
      generar: () => {
        const tema = extreureContext(/\b(estudiar|llegir|repassar|fer|preparar|els|el|la)\b/gi, "el temari");
        return [
          "Deixar el mòbil lluny o en mode avió",
          "Portar un got d'aigua a la taula",
          `Obrir només el document sobre ${tema}`,
          "Llegir únicament els títols i el primer paràgraf",
          "Subratllar tres paraules o idees molt clau",
          "Escriure dues frases de resum amb les teves paraules"
        ];
      }
    },
    {
      id: "feina_projectes",
      regex: /\b(treball|projecte|informe|presentacio|programar|codi|dissenyar|redactar|entrega|feina|document)\b/i,
      generar: () => {
        const proj = extreureContext(/\b(fer|acabar|començar|comencar|preparar|el|la|un|una)\b/gi, "el document");
        return [
          "Tancar totes les pestanyes que no necessitis",
          `Obrir el fitxer de ${proj} en pantalla`,
          "Escriure tres punts clau sense donar-los forma",
          "Completar només el primer apartat durant cinc minuts",
          "Desar els canvis fets fins ara mateix",
          "Anotar quin serà el següent pas petit"
        ];
      }
    },
    {
      id: "compres_encarrecs",
      regex: /\b(comprar|supermercat|super|botiga|llista|mercat|encarrecs|farmacia|pa|menjar)\b/i,
      generar: () => {
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
    },
    {
      id: "cuina_apats",
      regex: /\b(cuinar|preparar|dinar|sopar|esmorzar|menjar|recepta|bullir|fregir|forn|tupper)\b/i,
      generar: () => {
        const plat = extreureContext(/\b(cuinar|preparar|fer|el|la|un|una)\b/gi, "l'àpat");
        return [
          "Buidar un tros del marbre de la cuina",
          `Treure els ingredients necessaris per a ${plat}`,
          "Agafar una sola paella, olla o bol",
          "Tallar o preparar el primer ingredient bàsic",
          "Encendre el foc o escalfar-ho amb calma",
          "Servir al plat i recollir un estri"
        ];
      }
    },
    {
      id: "roba_bugada",
      regex: /\b(rentadora|roba|estendre|plegar|planxar|armari|sabates|maleta|motxilla)\b/i,
      generar: () => {
        if (normalitzat.includes("motxilla") || normalitzat.includes("maleta")) {
          return [
            "Obrir la bossa buida damunt del llit",
            "Posar a sobre el que necessites demà",
            "Guardar primer el carregador, claus i cartera",
            "Afegir la resta d'objectes sense estrès",
            "Tancar la cremallera i deixar-la a l'entrada"
          ];
        }
        return [
          "Recollir la roba i portar-la al cistell",
          "Separar només una càrrega del mateix tipus",
          "Posar-la dins la rentadora o sobre el llit",
          "Afegir sabó i engegar o començar a plegar",
          "Guardar només cinc peces dins de l'armari"
        ];
      }
    },
    {
      id: "autocura_salut",
      regex: /\b(dutxa|dutxar|rentar|dents|medicacio|pastilla|dormir|descansar|esport|caminar|gimnas|ioga|estirar)\b/i,
      generar: () => {
        if (normalitzat.includes("dutx") || normalitzat.includes("bany")) {
          return [
            "Buscar la tovallola i deixar roba preparada",
            "Entrar al bany i obrir l'aigua calenta",
            "Entrar sota l'aigua només dos minuts",
            "Ensabonar el cos i esbandir amb calma",
            "Eixugar-se bé i posar-se roba ben còmoda"
          ];
        }
        return [
          "Deixar el que estàs fent ara mateix",
          "Beure un glop llarg d'aigua fresca",
          "Preparar el que necessites a mà",
          "Dedicar només dos minuts a començar l'acció",
          "Felicitar-te per haver cuidat el teu cos"
        ];
      }
    },
    {
      id: "tramits_admin",
      regex: /\b(factura|pagar|banc|cita|metge|tramit|paper|formulari|impost|matricula|renovacio|dni)\b/i,
      generar: () => {
        const tramit = extreureContext(/\b(fer|pagar|demanar|omplir|el|la|un|una)\b/gi, "el tràmit");
        return [
          "Tenir el DNI o targeta a prop teu",
          `Obrir la pàgina web per a ${tramit}`,
          "Llegir només el primer pas que demanen",
          "Omplir les teves dades bàsiques al formulari",
          "Revisar que tot estigui bé i confirmar",
          "Desar el comprovant o fer captura de pantalla"
        ];
      }
    }
  ];

  for (const cat of categories) {
    if (cat.regex.test(normalitzat)) {
      return cat.generar();
    }
  }

  const resumTasca = original.split(/\s+/).slice(0, 3).join(" ").toLowerCase();

  return [
    "Fer una respiració fonda i deixar el mòbil",
    `Preparar l'espai per a "${resumTasca}"`,
    "Fer l'acció més petita i fàcil primer",
    "Continuar avançant només durant tres minuts seguits",
    "Revisar el que ja has aconseguit fer",
    "Decidir si continues una mica o descanses"
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

  // Generem els micro-passos a l'instant amb la IA local i sincronitzem amb Supabase
  state.currentSteps = generarMicroPassos(taskText);
  state.currentIndex = 0;
  saveState();
});

// Permetre enviar amb la tecla Enter
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
    thoughtItem.innerHTML = `
      <span class="text-stone-200 break-words">${item.text}</span>
      <div class="flex items-center gap-2 shrink-0">
        <span class="text-[10px] text-stone-500">${item.time}</span>
        <button data-idx="${idx}" class="text-stone-600 hover:text-stone-300 text-xs px-1">✕</button>
      </div>
    `;
    thoughtItem.querySelector("button").addEventListener("click", () => {
      state.parkedThoughts.splice(idx, 1);
      saveState();
    });
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

// --- DESAR CONFIGURACIÓ ---
btnSaveSettings.addEventListener("click", async () => {
  config.geminiKey = cfgGeminiKey.value.trim();
  config.supaUrl = cfgSupaUrl.value.trim();
  config.supaKey = cfgSupaKey.value.trim();
  config.syncId = cfgSyncId.value.trim() || "usuari_principal";

  localStorage.setItem("aibuddy_gemini_key", config.geminiKey);
  localStorage.setItem("aibuddy_supa_url", config.supaUrl);
  localStorage.setItem("aibuddy_supa_key", config.supaKey);
  localStorage.setItem("aibuddy_sync_id", config.syncId);

  await pullRemoteState();
  await saveState();
  showToast("Configuració desada!");
  switchView("view-menu");
});

// --- INICIALITZACIÓ ---
loadLocalState();
updateAllDisplays();
pullRemoteState();
