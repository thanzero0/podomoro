/**
 * Its Podomoro - Stable Timer Logic Engine & 9 Dynamic Organic Motion Themes
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- STATE ENGINE ---
  const state = {
    mode: 'pomodoro', // 'pomodoro' | 'shortBreak' | 'longBreak'
    timerState: 'stopped', // 'stopped' | 'running' | 'paused'
    timeLeft: 25 * 60,
    totalDuration: 25 * 60,
    timerId: null,
    targetEndTime: null, // Robust Timestamp-based Countdown Engine to avoid unwanted resets!
    
    // User Settings
    settings: {
      pomodoro: 25,
      shortBreak: 5,
      longBreak: 15,
      theme: 'cyberpunk',
      motionSpeed: 5,
      bgDarken: 40
    },

    // Tasks & Focus Data
    tasks: [],

    // Stats
    stats: {
      completedSessionsToday: 0,
      totalFocusMinutesToday: 0,
      currentStreak: 1
    },

    // Audio Ambience
    ambientTracks: { rain: 0, waves: 0, forest: 0, space: 0 }
  };

  // --- DOM ELEMENTS ---
  const el = {
    app: document.getElementById('app'),
    bgCanvas: document.getElementById('bg-canvas'),
    bgOverlay: document.querySelector('.bg-overlay'),
    
    // Timer Display
    timerDisplay: document.getElementById('timer-display'),
    ringCircle: document.querySelector('.progress-ring__circle'),
    modeBtns: document.querySelectorAll('.mode-btn'),
    
    // Controls
    btnStart: document.getElementById('btn-start'),
    startIcon: document.getElementById('start-icon'),
    startBtnText: document.getElementById('start-btn-text'),
    btnReset: document.getElementById('btn-reset'),
    btnSkip: document.getElementById('btn-skip'),
    
    // Header & Actions
    streakCount: document.getElementById('streak-count'),
    btnMasterMenu: document.getElementById('btn-master-menu'),
    btnZenMode: document.getElementById('btn-zen-mode'),
    
    // Tasks
    taskBarContainer: document.getElementById('task-bar-container'),
    btnToggleTaskPanel: document.getElementById('btn-toggle-task-panel'),
    taskChevron: document.getElementById('task-chevron'),
    taskPanelContent: document.getElementById('task-panel-content'),
    addTaskForm: document.getElementById('add-task-form'),
    taskTitleInput: document.getElementById('task-title-input'),
    taskList: document.getElementById('task-list'),
    completedTasksCount: document.getElementById('completed-tasks-count'),
    totalTasksCount: document.getElementById('total-tasks-count'),

    // Master Modal
    modalMaster: document.getElementById('modal-master'),
    btnCloseMaster: document.getElementById('btn-close-master'),
    masterTabs: document.querySelectorAll('.master-tab'),
    masterTabContents: document.querySelectorAll('.master-tab-content'),
    
    // Themes & Sliders
    themeCards: document.querySelectorAll('.theme-card'),
    speedSlider: document.getElementById('speed-slider'),
    darkenSlider: document.getElementById('darken-slider'),
    
    // Audio Tracks & Settings
    audioTrackVols: document.querySelectorAll('.audio-track-vol'),
    settingPomoTime: document.getElementById('setting-pomo-time'),
    settingShortBreak: document.getElementById('setting-short-break'),
    settingLongBreak: document.getElementById('setting-long-break'),
    btnSaveSettings: document.getElementById('btn-save-settings')
  };

  // --- INIT ---
  function init() {
    loadLocalStorage();
    initGenerativeMotionEngine();
    applyTheme(state.settings.theme);
    updateTimerDisplay();
    renderTasks();
    updateHeaderStats();
    setupEventListeners();
  }

  // --- LOCAL STORAGE ---
  function loadLocalStorage() {
    const savedSettings = localStorage.getItem('itspodomoro_settings');
    if (savedSettings) Object.assign(state.settings, JSON.parse(savedSettings));

    const savedTasks = localStorage.getItem('itspodomoro_tasks');
    if (savedTasks) state.tasks = JSON.parse(savedTasks);

    const savedStats = localStorage.getItem('itspodomoro_stats');
    if (savedStats) Object.assign(state.stats, JSON.parse(savedStats));

    el.settingPomoTime.value = state.settings.pomodoro;
    el.settingShortBreak.value = state.settings.shortBreak;
    el.settingLongBreak.value = state.settings.longBreak;
    el.speedSlider.value = state.settings.motionSpeed;
    el.darkenSlider.value = state.settings.bgDarken;

    state.totalDuration = state.settings[state.mode] * 60;
    state.timeLeft = state.totalDuration;
  }

  function saveSettingsToStorage() {
    localStorage.setItem('itspodomoro_settings', JSON.stringify(state.settings));
    localStorage.setItem('itspodomoro_tasks', JSON.stringify(state.tasks));
    localStorage.setItem('itspodomoro_stats', JSON.stringify(state.stats));
  }

  // --- 9 GENERATIVE ORGANIC MOTION THEMES (HTML5 CANVAS ENGINE) ---
  let canvasCtx = null;
  let animFrameId = null;
  let motionElements = [];
  let canvasTime = 0;

  function initGenerativeMotionEngine() {
    canvasCtx = el.bgCanvas.getContext('2d');
    
    function handleResize() {
      el.bgCanvas.width = window.innerWidth;
      el.bgCanvas.height = window.innerHeight;
      createMotionElements();
    }
    window.addEventListener('resize', handleResize);
    handleResize();

    function renderLoop() {
      canvasTime += (state.settings.motionSpeed / 5) * 0.015;
      canvasCtx.clearRect(0, 0, el.bgCanvas.width, el.bgCanvas.height);

      switch (state.settings.theme) {
        case 'cyberpunk': drawCyberpunkNeonScene(); break;
        case 'galaxy': drawCosmicGalaxyScene(); break;
        case 'lofi': drawLofiRainScene(); break;
        case 'nature': drawSereneNatureScene(); break;
        case 'synthwave': drawSynthwaveGridScene(); break;
        case 'liquid': drawOrganicLiquidScene(); break;
        case 'matrix': drawMatrixDigitalRain(); break; // NEW 7
        case 'fireflies': drawMidnightFireflies(); break; // NEW 8
        case 'waves': drawSunsetOceanWaves(); break; // NEW 9
        default: drawCyberpunkNeonScene(); break;
      }

      animFrameId = requestAnimationFrame(renderLoop);
    }
    renderLoop();
  }

  function createMotionElements() {
    const w = el.bgCanvas.width;
    const h = el.bgCanvas.height;
    motionElements = [];

    for (let i = 0; i < 120; i++) {
      motionElements.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 4 + 1,
        speedY: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 1.5,
        alpha: Math.random() * 0.8 + 0.2,
        char: String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96))
      });
    }
  }

  // Theme 1: Cyberpunk Neon Rain
  function drawCyberpunkNeonScene() {
    const w = el.bgCanvas.width, h = el.bgCanvas.height;
    const grad = canvasCtx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#050b14'); grad.addColorStop(0.5, '#120024'); grad.addColorStop(1, '#001a2c');
    canvasCtx.fillStyle = grad; canvasCtx.fillRect(0, 0, w, h);

    canvasCtx.lineWidth = 1.8;
    motionElements.forEach(p => {
      p.y += p.speedY * (state.settings.motionSpeed / 3);
      if (p.y > h) p.y = -20;
      const rainGrad = canvasCtx.createLinearGradient(p.x, p.y, p.x, p.y + 25);
      rainGrad.addColorStop(0, 'rgba(0, 242, 254, 0)'); rainGrad.addColorStop(1, 'rgba(255, 0, 127, 0.8)');
      canvasCtx.strokeStyle = rainGrad; canvasCtx.beginPath(); canvasCtx.moveTo(p.x, p.y); canvasCtx.lineTo(p.x - 1, p.y + 25); canvasCtx.stroke();
    });
  }

  // Theme 2: Cosmic Nebula Galaxy
  function drawCosmicGalaxyScene() {
    const w = el.bgCanvas.width, h = el.bgCanvas.height;
    canvasCtx.fillStyle = '#060212'; canvasCtx.fillRect(0, 0, w, h);
    const cx = w / 2 + Math.cos(canvasTime * 0.5) * 100;
    const cy = h / 2 + Math.sin(canvasTime * 0.5) * 60;
    const nebGrad = canvasCtx.createRadialGradient(cx, cy, 50, cx, cy, 400);
    nebGrad.addColorStop(0, 'rgba(168, 85, 247, 0.35)'); nebGrad.addColorStop(0.5, 'rgba(236, 72, 153, 0.15)'); nebGrad.addColorStop(1, 'transparent');
    canvasCtx.fillStyle = nebGrad; canvasCtx.fillRect(0, 0, w, h);

    motionElements.forEach(p => {
      p.alpha += Math.sin(canvasTime * 2 + p.x) * 0.02;
      canvasCtx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, Math.min(1, p.alpha))})`;
      canvasCtx.beginPath(); canvasCtx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2); canvasCtx.fill();
    });
  }

  // Theme 3: Cozy Lofi Rain Drops
  function drawLofiRainScene() {
    const w = el.bgCanvas.width, h = el.bgCanvas.height;
    canvasCtx.fillStyle = '#140d07'; canvasCtx.fillRect(0, 0, w, h);
    const warmGrad = canvasCtx.createRadialGradient(w * 0.8, h * 0.2, 20, w * 0.8, h * 0.2, 500);
    warmGrad.addColorStop(0, 'rgba(245, 158, 11, 0.25)'); warmGrad.addColorStop(1, 'transparent');
    canvasCtx.fillStyle = warmGrad; canvasCtx.fillRect(0, 0, w, h);

    motionElements.forEach(p => {
      p.y += p.speedY * 0.3; if (p.y > h) p.y = -10;
      canvasCtx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      canvasCtx.beginPath(); canvasCtx.arc(p.x, p.y, p.size * 1.4, 0, Math.PI * 2); canvasCtx.fill();
    });
  }

  // Theme 4: Serene Bamboo Forest
  function drawSereneNatureScene() {
    const w = el.bgCanvas.width, h = el.bgCanvas.height;
    const grad = canvasCtx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#022c22'); grad.addColorStop(1, '#064e3b');
    canvasCtx.fillStyle = grad; canvasCtx.fillRect(0, 0, w, h);

    motionElements.forEach(p => {
      p.x += Math.sin(canvasTime + p.y * 0.01) * 1.5; p.y += p.speedY * 0.6; if (p.y > h) p.y = -10;
      canvasCtx.fillStyle = 'rgba(16, 185, 129, 0.6)';
      canvasCtx.beginPath(); canvasCtx.ellipse(p.x, p.y, p.size * 2, p.size, Math.PI / 4, 0, Math.PI * 2); canvasCtx.fill();
    });
  }

  // Theme 5: Sunset Synthwave Grid
  function drawSynthwaveGridScene() {
    const w = el.bgCanvas.width, h = el.bgCanvas.height;
    const skyGrad = canvasCtx.createLinearGradient(0, 0, 0, h * 0.65);
    skyGrad.addColorStop(0, '#1e1b4b'); skyGrad.addColorStop(1, '#831843');
    canvasCtx.fillStyle = skyGrad; canvasCtx.fillRect(0, 0, w, h);

    const sunY = h * 0.6;
    const sunGrad = canvasCtx.createLinearGradient(0, sunY - 70, 0, sunY + 70);
    sunGrad.addColorStop(0, '#ff7eb3'); sunGrad.addColorStop(1, '#ff758c');
    canvasCtx.fillStyle = sunGrad; canvasCtx.beginPath(); canvasCtx.arc(w / 2, sunY, 75, 0, Math.PI * 2); canvasCtx.fill();

    canvasCtx.strokeStyle = 'rgba(255, 117, 140, 0.4)'; canvasCtx.lineWidth = 1.5;
    for (let x = -w; x < w * 2; x += 60) {
      canvasCtx.beginPath(); canvasCtx.moveTo(w / 2, sunY); canvasCtx.lineTo(x, h); canvasCtx.stroke();
    }
  }

  // Theme 6: Organic Liquid Flow
  function drawOrganicLiquidScene() {
    const w = el.bgCanvas.width, h = el.bgCanvas.height;
    canvasCtx.fillStyle = '#0f172a'; canvasCtx.fillRect(0, 0, w, h);

    for (let i = 0; i < 3; i++) {
      canvasCtx.fillStyle = i === 0 ? 'rgba(139, 92, 246, 0.25)' : i === 1 ? 'rgba(6, 182, 212, 0.2)' : 'rgba(236, 72, 153, 0.15)';
      canvasCtx.beginPath(); canvasCtx.moveTo(0, h);
      for (let x = 0; x <= w; x += 40) {
        const y = Math.sin(x * 0.003 + canvasTime + i) * 60 + h * 0.5 + (i * 40);
        canvasCtx.lineTo(x, y);
      }
      canvasCtx.lineTo(w, h); canvasCtx.closePath(); canvasCtx.fill();
    }
  }

  // --- 3 NEW MOTION THEMES ---

  // Theme 7: Matrix Digital Rain
  function drawMatrixDigitalRain() {
    const w = el.bgCanvas.width, h = el.bgCanvas.height;
    canvasCtx.fillStyle = '#021206'; canvasCtx.fillRect(0, 0, w, h);
    canvasCtx.font = '14px monospace';

    motionElements.forEach(p => {
      p.y += p.speedY * (state.settings.motionSpeed / 2); if (p.y > h) p.y = -20;
      canvasCtx.fillStyle = '#22c55e';
      canvasCtx.fillText(p.char, p.x, p.y);
    });
  }

  // Theme 8: Midnight Fireflies Glow
  function drawMidnightFireflies() {
    const w = el.bgCanvas.width, h = el.bgCanvas.height;
    canvasCtx.fillStyle = '#09090b'; canvasCtx.fillRect(0, 0, w, h);

    motionElements.forEach(p => {
      p.x += Math.sin(canvasTime + p.y * 0.05) * 1.2;
      p.y += Math.cos(canvasTime + p.x * 0.05) * 1.2;
      
      const glowGrad = canvasCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 5);
      glowGrad.addColorStop(0, 'rgba(234, 179, 8, 0.9)');
      glowGrad.addColorStop(1, 'transparent');
      canvasCtx.fillStyle = glowGrad;
      canvasCtx.beginPath(); canvasCtx.arc(p.x, p.y, p.size * 5, 0, Math.PI * 2); canvasCtx.fill();
    });
  }

  // Theme 9: Sunset Ocean Waves
  function drawSunsetOceanWaves() {
    const w = el.bgCanvas.width, h = el.bgCanvas.height;
    const sky = canvasCtx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, '#0f172a'); sky.addColorStop(0.6, '#1e3a8a'); sky.addColorStop(1, '#0284c7');
    canvasCtx.fillStyle = sky; canvasCtx.fillRect(0, 0, w, h);

    for (let i = 0; i < 4; i++) {
      canvasCtx.fillStyle = `rgba(59, 130, 246, ${0.15 + i * 0.08})`;
      canvasCtx.beginPath(); canvasCtx.moveTo(0, h);
      for (let x = 0; x <= w; x += 30) {
        const y = Math.sin(x * 0.005 + canvasTime * 1.5 + i * 1.2) * (20 + i * 10) + h * 0.6 + (i * 35);
        canvasCtx.lineTo(x, y);
      }
      canvasCtx.lineTo(w, h); canvasCtx.closePath(); canvasCtx.fill();
    }
  }

  // --- APPLY THEME ---
  function applyTheme(themeName) {
    state.settings.theme = themeName;
    document.body.className = `theme-${themeName}`;

    el.themeCards.forEach(card => {
      card.classList.toggle('active', card.dataset.theme === themeName);
    });

    applyOverlayEffects();
    saveSettingsToStorage();
  }

  function applyOverlayEffects() {
    const darken = el.darkenSlider.value / 100;
    el.bgOverlay.style.background = `rgba(5, 8, 17, ${darken})`;
    state.settings.motionSpeed = parseInt(el.speedSlider.value);
    state.settings.bgDarken = el.darkenSlider.value;
  }

  // --- STABLE TIMESTAMP-BASED TIMER ENGINE (Prevents accidental reset) ---
  function updateTimerDisplay() {
    const minutes = Math.floor(state.timeLeft / 60);
    const seconds = state.timeLeft % 60;
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    el.timerDisplay.textContent = formattedTime;
    document.title = `${formattedTime} - Its Podomoro`;

    const progressFraction = 1 - (state.timeLeft / state.totalDuration);
    const strokeDashoffset = 942.47 * (1 - progressFraction);
    el.ringCircle.style.strokeDashoffset = strokeDashoffset;
  }

  function startTimer() {
    if (state.timerState === 'running') return;
    
    state.timerState = 'running';
    state.targetEndTime = Date.now() + (state.timeLeft * 1000);

    el.startIcon.className = 'fa-solid fa-pause';
    el.startBtnText.textContent = 'PAUSE';

    state.timerId = setInterval(() => {
      const now = Date.now();
      const remainingSeconds = Math.max(0, Math.round((state.targetEndTime - now) / 1000));

      state.timeLeft = remainingSeconds;
      updateTimerDisplay();

      if (remainingSeconds <= 0) {
        completeSession();
      }
    }, 200);
  }

  function pauseTimer() {
    state.timerState = 'paused';
    if (state.timerId) clearInterval(state.timerId);
    state.timerId = null;

    el.startIcon.className = 'fa-solid fa-play';
    el.startBtnText.textContent = 'START';
  }

  function resetTimer() {
    pauseTimer();
    state.timerState = 'stopped';
    state.totalDuration = state.settings[state.mode] * 60;
    state.timeLeft = state.totalDuration;
    updateTimerDisplay();
  }

  function switchMode(newMode) {
    if (state.mode === newMode && state.timerState === 'running') return;
    state.mode = newMode;
    el.modeBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === newMode);
    });
    resetTimer();
  }

  function completeSession() {
    pauseTimer();
    playAlarmSound();

    if (state.mode === 'pomodoro') {
      state.stats.completedSessionsToday++;
      state.stats.totalFocusMinutesToday += state.settings.pomodoro;
      updateHeaderStats();
      saveSettingsToStorage();
      switchMode('shortBreak');
    } else {
      switchMode('pomodoro');
    }
  }

  function playAlarmSound() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.6);
    gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
    osc.start(); osc.stop(audioCtx.currentTime + 1.2);
  }

  // --- TASK MANAGER ---
  function addTask(title) {
    state.tasks.push({ id: Date.now().toString(), title, completed: false });
    saveSettingsToStorage();
    renderTasks();
  }

  function toggleTaskComplete(id) {
    const task = state.tasks.find(t => t.id === id);
    if (task) { task.completed = !task.completed; saveSettingsToStorage(); renderTasks(); }
  }

  function deleteTask(id) {
    state.tasks = state.tasks.filter(t => t.id !== id);
    saveSettingsToStorage();
    renderTasks();
  }

  function renderTasks() {
    el.taskList.innerHTML = '';
    const completedCount = state.tasks.filter(t => t.completed).length;
    el.completedTasksCount.textContent = completedCount;
    el.totalTasksCount.textContent = state.tasks.length;

    state.tasks.forEach(task => {
      const li = document.createElement('li');
      li.className = `task-item ${task.completed ? 'completed' : ''}`;
      li.innerHTML = `
        <div class="task-left">
          <div class="checkbox-custom" data-id="${task.id}">${task.completed ? '<i class="fa-solid fa-check"></i>' : ''}</div>
          <span class="task-title-text">${escapeHTML(task.title)}</span>
        </div>
        <button class="btn-task-action btn-delete-task" data-id="${task.id}"><i class="fa-solid fa-trash-can"></i></button>
      `;

      li.querySelector('.checkbox-custom').addEventListener('click', () => toggleTaskComplete(task.id));
      li.querySelector('.btn-delete-task').addEventListener('click', () => deleteTask(task.id));
      el.taskList.appendChild(li);
    });
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag));
  }

  function updateHeaderStats() {
    el.streakCount.textContent = state.stats.currentStreak;
  }

  // --- EVENT LISTENERS ---
  function setupEventListeners() {
    el.btnStart.addEventListener('click', () => state.timerState === 'running' ? pauseTimer() : startTimer());
    el.btnReset.addEventListener('click', resetTimer);
    el.btnSkip.addEventListener('click', () => { if (confirm('Skip this session?')) completeSession(); });

    el.modeBtns.forEach(btn => btn.addEventListener('click', () => switchMode(btn.dataset.mode)));

    el.btnToggleTaskPanel.addEventListener('click', () => {
      el.taskPanelContent.classList.toggle('hidden');
      el.taskChevron.className = el.taskPanelContent.classList.contains('hidden') ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down';
    });

    el.addTaskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = el.taskTitleInput.value.trim();
      if (title) { addTask(title); el.taskTitleInput.value = ''; }
    });

    el.btnZenMode.addEventListener('click', () => el.app.classList.toggle('zen-clean-mode'));

    el.btnMasterMenu.addEventListener('click', () => el.modalMaster.classList.add('active'));
    el.btnCloseMaster.addEventListener('click', () => el.modalMaster.classList.remove('active'));

    el.masterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        el.masterTabs.forEach(t => t.classList.remove('active'));
        el.masterTabContents.forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
      });
    });

    el.themeCards.forEach(card => {
      card.addEventListener('click', () => applyTheme(card.dataset.theme));
    });

    el.speedSlider.addEventListener('input', applyOverlayEffects);
    el.darkenSlider.addEventListener('input', applyOverlayEffects);

    // Save Settings ONLY updates settings WITHOUT resetting running timer!
    el.btnSaveSettings.addEventListener('click', () => {
      state.settings.pomodoro = parseInt(el.settingPomoTime.value) || 25;
      state.settings.shortBreak = parseInt(el.settingShortBreak.value) || 5;
      state.settings.longBreak = parseInt(el.settingLongBreak.value) || 15;
      saveSettingsToStorage();
      if (state.timerState !== 'running') resetTimer();
      el.modalMaster.classList.remove('active');
    });
  }

  init();
});
