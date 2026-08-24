/**
 * Podomoro Time - Minimalist Cyber & Generative Motion Canvas Engine
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- STATE ENGINE ---
  const state = {
    mode: 'pomodoro', // 'pomodoro' | 'shortBreak' | 'longBreak'
    timerState: 'stopped', // 'stopped' | 'running' | 'paused'
    timeLeft: 25 * 60,
    totalDuration: 25 * 60,
    timerId: null,
    
    // User Settings
    settings: {
      pomodoro: 25,
      shortBreak: 5,
      longBreak: 15,
      autoBreak: false,
      autoPomo: false,
      alarmSound: 'chime',
      theme: 'cyberpunk',
      motionSpeed: 5,
      bgDarken: 40
    },

    // Tasks & Focus Data
    tasks: [],
    activeTaskId: null,

    // Stats
    stats: {
      completedSessionsToday: 0,
      totalFocusMinutesToday: 0,
      currentStreak: 1,
      bestStreak: 1,
      weeklyMinutes: [45, 60, 90, 120, 75, 110, 0]
    },

    // Audio Ambience Track Volumes
    ambientTracks: { rain: 0, waves: 0, forest: 0, space: 0, fire: 0, tick: 0 }
  };

  // --- DOM ELEMENTS ---
  const el = {
    app: document.getElementById('app'),
    bgCanvas: document.getElementById('bg-canvas'),
    bgOverlay: document.querySelector('.bg-overlay'),
    
    // Timer Display
    timerDisplay: document.getElementById('timer-display'),
    timerStatusLabel: document.getElementById('timer-status-label'),
    ringCircle: document.querySelector('.progress-ring__circle'),
    modeBtns: document.querySelectorAll('.mode-btn'),
    sessionDots: document.getElementById('session-dots'),
    
    // Timer Controls
    btnStart: document.getElementById('btn-start'),
    startIcon: document.getElementById('start-icon'),
    startBtnText: document.getElementById('start-btn-text'),
    btnReset: document.getElementById('btn-reset'),
    btnSkip: document.getElementById('btn-skip'),
    
    // Header & Zen Actions
    streakCount: document.getElementById('streak-count'),
    btnMasterMenu: document.getElementById('btn-master-menu'),
    btnZenMode: document.getElementById('btn-zen-mode'),
    
    // Tasks Bar
    taskBarContainer: document.getElementById('task-bar-container'),
    btnToggleTaskPanel: document.getElementById('btn-toggle-task-panel'),
    taskChevron: document.getElementById('task-chevron'),
    taskPanelContent: document.getElementById('task-panel-content'),
    addTaskForm: document.getElementById('add-task-form'),
    taskTitleInput: document.getElementById('task-title-input'),
    taskPomoEst: document.getElementById('task-pomo-est'),
    taskList: document.getElementById('task-list'),
    completedTasksCount: document.getElementById('completed-tasks-count'),
    totalTasksCount: document.getElementById('total-tasks-count'),
    activeTaskTitle: document.getElementById('active-task-title'),

    // Master Modal & Tabs
    modalMaster: document.getElementById('modal-master'),
    btnCloseMaster: document.getElementById('btn-close-master'),
    masterTabs: document.querySelectorAll('.master-tab'),
    masterTabContents: document.querySelectorAll('.master-tab-content'),
    
    // Theme Selector & Sliders
    themeCards: document.querySelectorAll('.theme-card'),
    speedSlider: document.getElementById('speed-slider'),
    darkenSlider: document.getElementById('darken-slider'),
    
    // Audio Tracks & Settings Inputs
    audioTrackVols: document.querySelectorAll('.audio-track-vol'),
    settingPomoTime: document.getElementById('setting-pomo-time'),
    settingShortBreak: document.getElementById('setting-short-break'),
    settingLongBreak: document.getElementById('setting-long-break'),
    settingAutoBreak: document.getElementById('setting-auto-break'),
    settingAutoPomo: document.getElementById('setting-auto-pomo'),
    settingSoundAlarm: document.getElementById('setting-sound-alarm'),
    btnSaveSettings: document.getElementById('btn-save-settings'),

    // Analytics Dashboard
    statsTotalSessions: document.getElementById('stats-total-sessions'),
    statsTotalHours: document.getElementById('stats-total-hours'),
    statsBestStreak: document.getElementById('stats-best-streak'),
    statsTaskRatio: document.getElementById('stats-task-ratio'),
    weeklyChart: document.getElementById('weekly-chart')
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
    const savedSettings = localStorage.getItem('podomoro_settings');
    if (savedSettings) Object.assign(state.settings, JSON.parse(savedSettings));

    const savedTasks = localStorage.getItem('podomoro_tasks');
    if (savedTasks) state.tasks = JSON.parse(savedTasks);

    const savedStats = localStorage.getItem('podomoro_stats');
    if (savedStats) Object.assign(state.stats, JSON.parse(savedStats));

    el.settingPomoTime.value = state.settings.pomodoro;
    el.settingShortBreak.value = state.settings.shortBreak;
    el.settingLongBreak.value = state.settings.longBreak;
    el.settingAutoBreak.checked = state.settings.autoBreak;
    el.settingAutoPomo.checked = state.settings.autoPomo;
    el.settingSoundAlarm.value = state.settings.alarmSound;
    el.speedSlider.value = state.settings.motionSpeed;
    el.darkenSlider.value = state.settings.bgDarken;

    state.totalDuration = state.settings[state.mode] * 60;
    state.timeLeft = state.totalDuration;
  }

  function saveSettingsToStorage() {
    localStorage.setItem('podomoro_settings', JSON.stringify(state.settings));
    localStorage.setItem('podomoro_tasks', JSON.stringify(state.tasks));
    localStorage.setItem('podomoro_stats', JSON.stringify(state.stats));
  }

  // --- 6 GENERATIVE MOTION ANIMATION ENGINE (HTML5 CANVAS) ---
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

      // Render Active Theme Motion Scene
      switch (state.settings.theme) {
        case 'cyberpunk': drawCyberpunkNeonScene(); break;
        case 'galaxy': drawCosmicGalaxyScene(); break;
        case 'lofi': drawLofiRainScene(); break;
        case 'nature': drawSereneNatureScene(); break;
        case 'synthwave': drawSynthwaveGridScene(); break;
        case 'liquid': drawOrganicLiquidScene(); break;
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

    // Create 120 Particles / Motion Nodes
    for (let i = 0; i < 120; i++) {
      motionElements.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 4 + 1,
        speedY: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 1.5,
        alpha: Math.random() * 0.8 + 0.2,
        length: Math.random() * 25 + 10,
        colorHue: Math.random() * 60
      });
    }
  }

  // 1. Cyberpunk Neon City Rain
  function drawCyberpunkNeonScene() {
    const w = el.bgCanvas.width;
    const h = el.bgCanvas.height;

    // Dark Cyber Gradient Background
    const grad = canvasCtx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#050b14');
    grad.addColorStop(0.5, '#120024');
    grad.addColorStop(1, '#001a2c');
    canvasCtx.fillStyle = grad;
    canvasCtx.fillRect(0, 0, w, h);

    // Neon Rain Streak Animation
    canvasCtx.lineWidth = 1.8;
    motionElements.forEach(p => {
      p.y += p.speedY * (state.settings.motionSpeed / 3);
      if (p.y > h) p.y = -20;

      const rainGrad = canvasCtx.createLinearGradient(p.x, p.y, p.x, p.y + p.length);
      rainGrad.addColorStop(0, 'rgba(0, 242, 254, 0)');
      rainGrad.addColorStop(1, 'rgba(255, 0, 127, 0.8)');

      canvasCtx.strokeStyle = rainGrad;
      canvasCtx.beginPath();
      canvasCtx.moveTo(p.x, p.y);
      canvasCtx.lineTo(p.x - 1, p.y + p.length);
      canvasCtx.stroke();
    });
  }

  // 2. Cosmic Nebula Galaxy
  function drawCosmicGalaxyScene() {
    const w = el.bgCanvas.width;
    const h = el.bgCanvas.height;

    canvasCtx.fillStyle = '#060212';
    canvasCtx.fillRect(0, 0, w, h);

    // Swirling Nebula Orbs
    const cx = w / 2 + Math.cos(canvasTime * 0.5) * 100;
    const cy = h / 2 + Math.sin(canvasTime * 0.5) * 60;
    const nebGrad = canvasCtx.createRadialGradient(cx, cy, 50, cx, cy, 400);
    nebGrad.addColorStop(0, 'rgba(168, 85, 247, 0.35)');
    nebGrad.addColorStop(0.5, 'rgba(236, 72, 153, 0.15)');
    nebGrad.addColorStop(1, 'transparent');
    canvasCtx.fillStyle = nebGrad;
    canvasCtx.fillRect(0, 0, w, h);

    // Twinkling Starfield
    motionElements.forEach(p => {
      p.alpha += Math.sin(canvasTime * 2 + p.x) * 0.02;
      canvasCtx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, Math.min(1, p.alpha))})`;
      canvasCtx.beginPath();
      canvasCtx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
      canvasCtx.fill();
    });
  }

  // 3. Cozy Lofi Rain Drops
  function drawLofiRainScene() {
    const w = el.bgCanvas.width;
    const h = el.bgCanvas.height;

    canvasCtx.fillStyle = '#140d07';
    canvasCtx.fillRect(0, 0, w, h);

    // Warm Lofi Ambient Light Glow
    const warmGrad = canvasCtx.createRadialGradient(w * 0.8, h * 0.2, 20, w * 0.8, h * 0.2, 500);
    warmGrad.addColorStop(0, 'rgba(245, 158, 11, 0.25)');
    warmGrad.addColorStop(1, 'transparent');
    canvasCtx.fillStyle = warmGrad;
    canvasCtx.fillRect(0, 0, w, h);

    // Rain Glass Condensation Droplets
    motionElements.forEach(p => {
      p.y += p.speedY * 0.3;
      if (p.y > h) p.y = -10;
      canvasCtx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      canvasCtx.beginPath();
      canvasCtx.arc(p.x, p.y, p.size * 1.4, 0, Math.PI * 2);
      canvasCtx.fill();
    });
  }

  // 4. Serene Bamboo Forest
  function drawSereneNatureScene() {
    const w = el.bgCanvas.width;
    const h = el.bgCanvas.height;

    const grad = canvasCtx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#022c22');
    grad.addColorStop(1, '#064e3b');
    canvasCtx.fillStyle = grad;
    canvasCtx.fillRect(0, 0, w, h);

    // Floating Emerald Leaf Particles
    motionElements.forEach(p => {
      p.x += Math.sin(canvasTime + p.y * 0.01) * 1.5;
      p.y += p.speedY * 0.6;
      if (p.y > h) p.y = -10;

      canvasCtx.fillStyle = 'rgba(16, 185, 129, 0.6)';
      canvasCtx.beginPath();
      canvasCtx.ellipse(p.x, p.y, p.size * 2, p.size, Math.PI / 4, 0, Math.PI * 2);
      canvasCtx.fill();
    });
  }

  // 5. Sunset Synthwave Grid
  function drawSynthwaveGridScene() {
    const w = el.bgCanvas.width;
    const h = el.bgCanvas.height;

    const skyGrad = canvasCtx.createLinearGradient(0, 0, 0, h * 0.65);
    skyGrad.addColorStop(0, '#1e1b4b');
    skyGrad.addColorStop(1, '#831843');
    canvasCtx.fillStyle = skyGrad;
    canvasCtx.fillRect(0, 0, w, h);

    // Glowing Sun
    const sunY = h * 0.6;
    const sunGrad = canvasCtx.createLinearGradient(0, sunY - 70, 0, sunY + 70);
    sunGrad.addColorStop(0, '#ff7eb3');
    sunGrad.addColorStop(1, '#ff758c');
    canvasCtx.fillStyle = sunGrad;
    canvasCtx.beginPath();
    canvasCtx.arc(w / 2, sunY, 75, 0, Math.PI * 2);
    canvasCtx.fill();

    // Perspective Grid Lines
    canvasCtx.strokeStyle = 'rgba(255, 117, 140, 0.4)';
    canvasCtx.lineWidth = 1.5;
    for (let x = -w; x < w * 2; x += 60) {
      canvasCtx.beginPath();
      canvasCtx.moveTo(w / 2, sunY);
      canvasCtx.lineTo(x, h);
      canvasCtx.stroke();
    }
  }

  // 6. Organic Liquid Flow
  function drawOrganicLiquidScene() {
    const w = el.bgCanvas.width;
    const h = el.bgCanvas.height;

    canvasCtx.fillStyle = '#0f172a';
    canvasCtx.fillRect(0, 0, w, h);

    // Dynamic Morphing Fluid Waves
    for (let i = 0; i < 3; i++) {
      canvasCtx.fillStyle = i === 0 ? 'rgba(139, 92, 246, 0.25)' : i === 1 ? 'rgba(6, 182, 212, 0.2)' : 'rgba(236, 72, 153, 0.15)';
      canvasCtx.beginPath();
      canvasCtx.moveTo(0, h);
      for (let x = 0; x <= w; x += 40) {
        const y = Math.sin(x * 0.003 + canvasTime + i) * 60 + h * 0.5 + (i * 40);
        canvasCtx.lineTo(x, y);
      }
      canvasCtx.lineTo(w, h);
      canvasCtx.closePath();
      canvasCtx.fill();
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

  // --- TIMER DISPLAY & CONTROLS ---
  function updateTimerDisplay() {
    const minutes = Math.floor(state.timeLeft / 60);
    const seconds = state.timeLeft % 60;
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    el.timerDisplay.textContent = formattedTime;
    document.title = `${formattedTime} - Podomoro Time`;

    const progressFraction = 1 - (state.timeLeft / state.totalDuration);
    const strokeDashoffset = 942.47 * (1 - progressFraction);
    el.ringCircle.style.strokeDashoffset = strokeDashoffset;
  }

  function startTimer() {
    if (state.timerState === 'running') return;
    
    state.timerState = 'running';
    el.startIcon.className = 'fa-solid fa-pause';
    el.startBtnText.textContent = 'PAUSE';
    el.timerStatusLabel.textContent = state.mode === 'pomodoro' ? 'FOCUS TIME' : 'REST TIME';

    state.timerId = setInterval(() => {
      if (state.timeLeft > 0) {
        state.timeLeft--;
        updateTimerDisplay();

        if (state.mode === 'pomodoro' && state.timeLeft % 60 === 0 && state.timeLeft !== state.totalDuration) {
          state.stats.totalFocusMinutesToday++;
          updateHeaderStats();
        }
      } else {
        completeSession();
      }
    }, 1000);
  }

  function pauseTimer() {
    state.timerState = 'paused';
    clearInterval(state.timerId);
    el.startIcon.className = 'fa-solid fa-play';
    el.startBtnText.textContent = 'START';
    el.timerStatusLabel.textContent = 'PAUSED';
  }

  function resetTimer() {
    pauseTimer();
    state.timerState = 'stopped';
    state.totalDuration = state.settings[state.mode] * 60;
    state.timeLeft = state.totalDuration;
    el.timerStatusLabel.textContent = 'READY TO FOCUS';
    updateTimerDisplay();
  }

  function switchMode(newMode) {
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
      if (state.activeTaskId) {
        const activeTask = state.tasks.find(t => t.id === state.activeTaskId);
        if (activeTask) { activeTask.completedPomo++; renderTasks(); }
      }

      updateHeaderStats();
      saveSettingsToStorage();

      const isLongBreak = state.stats.completedSessionsToday % 4 === 0;
      switchMode(isLongBreak ? 'longBreak' : 'shortBreak');

      if (state.settings.autoBreak) startTimer();
    } else {
      switchMode('pomodoro');
      if (state.settings.autoPomo) startTimer();
    }
  }

  function playAlarmSound() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (state.settings.alarmSound === 'chime') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.6);
    } else if (state.settings.alarmSound === 'digital') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    } else {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(432, audioCtx.currentTime);
    }

    gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);

    osc.start();
    osc.stop(audioCtx.currentTime + 1.2);
  }

  // --- TASK MANAGER ---
  function addTask(title, estPomo) {
    state.tasks.push({
      id: Date.now().toString(),
      title,
      estPomo: parseInt(estPomo) || 1,
      completedPomo: 0,
      completed: false
    });
    saveSettingsToStorage();
    renderTasks();
  }

  function toggleTaskComplete(id) {
    const task = state.tasks.find(t => t.id === id);
    if (task) { task.completed = !task.completed; saveSettingsToStorage(); renderTasks(); }
  }

  function deleteTask(id) {
    state.tasks = state.tasks.filter(t => t.id !== id);
    if (state.activeTaskId === id) {
      state.activeTaskId = null;
      el.activeTaskTitle.textContent = 'Ready for Deep Focus';
    }
    saveSettingsToStorage();
    renderTasks();
  }

  function setActiveFocusTask(id) {
    state.activeTaskId = id;
    const task = state.tasks.find(t => t.id === id);
    if (task) el.activeTaskTitle.textContent = task.title;
    renderTasks();
  }

  function renderTasks() {
    el.taskList.innerHTML = '';
    const completedCount = state.tasks.filter(t => t.completed).length;
    el.completedTasksCount.textContent = completedCount;
    el.totalTasksCount.textContent = state.tasks.length;

    state.tasks.forEach(task => {
      const li = document.createElement('li');
      li.className = `task-item ${task.completed ? 'completed' : ''} ${state.activeTaskId === task.id ? 'active-focus' : ''}`;
      li.innerHTML = `
        <div class="task-left">
          <div class="checkbox-custom" data-id="${task.id}">${task.completed ? '<i class="fa-solid fa-check"></i>' : ''}</div>
          <span class="task-title-text">${escapeHTML(task.title)}</span>
        </div>
        <div class="task-right">
          <span class="task-pomo-count">${task.completedPomo}/${task.estPomo}</span>
          <button class="btn-task-action btn-select-task" data-id="${task.id}"><i class="fa-solid fa-crosshairs"></i></button>
          <button class="btn-task-action btn-delete-task" data-id="${task.id}"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      `;

      li.querySelector('.checkbox-custom').addEventListener('click', () => toggleTaskComplete(task.id));
      li.querySelector('.btn-select-task').addEventListener('click', () => setActiveFocusTask(task.id));
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

  function renderAnalyticsModal() {
    el.statsTotalSessions.textContent = state.stats.completedSessionsToday;
    el.statsTotalHours.textContent = `${(state.stats.totalFocusMinutesToday / 60).toFixed(1)} hrs`;
    el.statsBestStreak.textContent = `${state.stats.bestStreak} days`;
    
    const totalT = state.tasks.length;
    const compT = state.tasks.filter(t => t.completed).length;
    el.statsTaskRatio.textContent = `${totalT === 0 ? 0 : Math.round((compT / totalT) * 100)}%`;

    el.weeklyChart.innerHTML = '';
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const maxVal = Math.max(...state.stats.weeklyMinutes, 120);

    state.stats.weeklyMinutes.forEach((mins, i) => {
      const barWrapper = document.createElement('div');
      barWrapper.className = 'chart-bar-wrapper';
      barWrapper.innerHTML = `
        <div class="chart-bar-fill" style="height: ${Math.max((mins / maxVal) * 100, 5)}%;"></div>
        <span class="chart-bar-label">${days[i]}</span>
      `;
      el.weeklyChart.appendChild(barWrapper);
    });
  }

  // --- EVENT LISTENERS ---
  function setupEventListeners() {
    el.btnStart.addEventListener('click', () => state.timerState === 'running' ? pauseTimer() : startTimer());
    el.btnReset.addEventListener('click', resetTimer);
    el.btnSkip.addEventListener('click', () => { if (confirm('Skip this session?')) completeSession(); });

    el.modeBtns.forEach(btn => btn.addEventListener('click', () => switchMode(btn.dataset.mode)));

    // Task Panel Expand / Collapse
    el.btnToggleTaskPanel.addEventListener('click', () => {
      el.taskPanelContent.classList.toggle('hidden');
      el.taskChevron.className = el.taskPanelContent.classList.contains('hidden') ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down';
    });

    el.addTaskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = el.taskTitleInput.value.trim();
      if (title) { addTask(title, el.taskPomoEst.value); el.taskTitleInput.value = ''; }
    });

    // Zen Mode Toggle (Clean Screen)
    el.btnZenMode.addEventListener('click', () => {
      el.app.classList.toggle('zen-clean-mode');
    });

    // Master Control Drawer
    el.btnMasterMenu.addEventListener('click', () => el.modalMaster.classList.add('active'));
    el.btnCloseMaster.addEventListener('click', () => el.modalMaster.classList.remove('active'));

    // Master Inner Tabs
    el.masterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        el.masterTabs.forEach(t => t.classList.remove('active'));
        el.masterTabContents.forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        const targetId = tab.dataset.tab;
        document.getElementById(targetId).classList.add('active');
        if (targetId === 'tab-stats') renderAnalyticsModal();
      });
    });

    // Theme Cards
    el.themeCards.forEach(card => {
      card.addEventListener('click', () => applyTheme(card.dataset.theme));
    });

    el.speedSlider.addEventListener('input', applyOverlayEffects);
    el.darkenSlider.addEventListener('input', applyOverlayEffects);

    // Save Settings
    el.btnSaveSettings.addEventListener('click', () => {
      state.settings.pomodoro = parseInt(el.settingPomoTime.value) || 25;
      state.settings.shortBreak = parseInt(el.settingShortBreak.value) || 5;
      state.settings.longBreak = parseInt(el.settingLongBreak.value) || 15;
      state.settings.autoBreak = el.settingAutoBreak.checked;
      state.settings.autoPomo = el.settingAutoPomo.checked;
      state.settings.alarmSound = el.settingSoundAlarm.value;
      saveSettingsToStorage();
      resetTimer();
      el.modalMaster.classList.remove('active');
    });
  }

  init();
});
