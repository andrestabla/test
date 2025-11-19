import { dimensions, benchmarks, blockLabels } from './questions.js';
import {
  getDimensions,
  getCurrentDim,
  setCurrentDim,
  getCurrentBlock,
  setCurrentBlock,
  getResponsesFor,
  setAnswer,
  countAnswered,
  blockAnswered,
  blockRange,
  dimensionComplete,
  markSubmitted,
  isSubmitted,
  computeScores,
  pendingCount,
  setChartsLoaded,
  chartsAreLoaded,
  awardBadge,
  getBadges,
  syncBadges
} from './state.js';
import { renderMainCharts, renderMiniRadar, renderThermometer, graphPlaceholders, miniPlaceholders, destroyMiniCharts } from './charts.js';

const sideMenu = document.getElementById('sideMenu');
const questionContainer = document.getElementById('questionContainer');
const wizardBreadcrumb = document.getElementById('wizardBreadcrumb');
const blockChip = document.getElementById('blockChip');
const blockName = document.getElementById('blockName');
const blockBreadcrumb = document.getElementById('blockBreadcrumb');
const blockProgressBar = document.getElementById('blockProgressBar');
const blockFeedback = document.getElementById('blockFeedback');
const globalProgress = document.getElementById('globalProgress');
const globalProgressBar = document.getElementById('globalProgressBar');
const dimsDone = document.getElementById('dimsDone');
const globalStatus = document.getElementById('globalStatus');
const wizardStatus = document.getElementById('wizardStatus');
const pendingQuestions = document.getElementById('pendingQuestions');
const resultStatus = document.getElementById('resultStatus');
const resultsCharts = document.getElementById('resultsCharts');
const actionsContainer = document.getElementById('actionsContainer');
const dimensionInsights = document.getElementById('dimensionInsights');
const finalSummary = document.getElementById('finalSummary');
const toast = document.getElementById('toast');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalBody = document.getElementById('modalBody');
const closeModalBtn = document.getElementById('closeModal');
const badgeContainer = document.getElementById('badgeContainer');
const startWizardBtn = document.getElementById('startWizard');
const prevDimBtn = document.getElementById('prevDim');
const nextDimBtn = document.getElementById('nextDim');

let focusIndex = 0;
let confettiTimer;
const blockDone = {};

function buildMenu() {
  const dims = getDimensions();
  sideMenu.innerHTML = '';
  const welcomeBtn = document.createElement('button');
  welcomeBtn.innerHTML = '🏁 Inicio';
  welcomeBtn.addEventListener('click', () => document.getElementById('welcomeCard').scrollIntoView({ behavior: 'smooth' }));
  sideMenu.appendChild(welcomeBtn);
  dims.forEach((dim, idx) => {
    const btn = document.createElement('button');
    btn.innerHTML = `${dim.icon} ${dim.short}`;
    btn.addEventListener('click', () => switchDimension(idx));
    if (idx === getCurrentDim()) btn.classList.add('active');
    sideMenu.appendChild(btn);
  });
  const resBtn = document.createElement('button');
  resBtn.innerHTML = '📊 Resultados';
  resBtn.addEventListener('click', scrollToResults);
  sideMenu.appendChild(resBtn);
  const actBtn = document.createElement('button');
  actBtn.innerHTML = '🚀 Acciones';
  actBtn.addEventListener('click', () => document.getElementById('actionsCard').scrollIntoView({ behavior: 'smooth' }));
  sideMenu.appendChild(actBtn);
}

function switchDimension(idx) {
  setCurrentDim(idx);
  setCurrentBlock(0);
  renderWizard();
  updateBreadcrumb();
  miniPlaceholders();
  destroyMiniCharts();
}

function renderWizard() {
  const dim = getDimensions()[getCurrentDim()];
  const blockIdx = getCurrentBlock();
  const { start, end } = blockRange(blockIdx);
  const questions = dim.blocks[blockIdx].questions.map((text, i) => ({ text, index: start + i }));
  questionContainer.innerHTML = '';
  focusIndex = start;
  questions.forEach((q, localIdx) => {
    const card = document.createElement('div');
    card.className = 'question';
    card.tabIndex = 0;
    card.setAttribute('aria-label', `Pregunta ${q.index + 1} sobre ${dim.title}`);
    card.dataset.qindex = q.index;
    card.addEventListener('focus', () => { focusIndex = q.index; updateBreadcrumb(); });

    const title = document.createElement('h4');
    title.innerHTML = `<span class="tag">${dim.short}</span> ${q.index + 1}. ${q.text} <span class="pill-sm" title="Ejemplo: documenta, mide y ajusta. Relevancia: aporta al índice de madurez.">ℹ</span>`;
    card.appendChild(title);

    const info = document.createElement('div');
    info.className = 'breadcrumb';
    info.innerHTML = `<span title="Ejemplo: nivel 4 = bien implementado">Pulsa 1–5 o usa flechas. Hover 4/5 muestra detalle.</span>`;
    card.appendChild(info);

    const opts = document.createElement('div');
    opts.className = 'options';
    const saved = getResponsesFor(dim.id)[q.index];
    [1, 2, 3, 4, 5].forEach(val => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.dataset.value = val;
      btn.innerHTML = `<span aria-hidden="true">${val}</span>`;
      btn.title = val >= 4 ? (val === 4 ? '4 = bien implementado' : '5 = optimizado y medido') : `Nivel ${val}`;
      if (saved === val) btn.classList.add('selected');
      btn.addEventListener('click', () => selectAnswer(dim.id, q.index, val));
      opts.appendChild(btn);
    });
    card.appendChild(opts);
    questionContainer.appendChild(card);
  });

  updateNavigation();
  updateBlockProgress();
  updatePending();
  updateWizardStatus();
}

function selectAnswer(dimId, qIndex, val) {
  setAnswer(dimId, qIndex, val);
  const buttons = questionContainer.querySelectorAll(`[data-qindex="${qIndex}"] button`);
  buttons.forEach(btn => btn.classList.toggle('selected', Number(btn.dataset.value) === val));
  showToast(`Guardado: pregunta ${qIndex + 1} = ${val}`);
  updateBlockProgress();
  updateGlobal();
  maybeMilestones(dimId);
}

function updateBreadcrumb() {
  const dim = getDimensions()[getCurrentDim()];
  const blockIdx = getCurrentBlock();
  const { start, end } = blockRange(blockIdx);
  wizardBreadcrumb.textContent = `Dimensión ${getCurrentDim() + 1} › ${dim.title} › Pregunta ${focusIndex + 1}/30`;
  blockChip.textContent = `Bloque ${blockIdx + 1} de 3`;
  blockName.textContent = dim.blocks[blockIdx].name;
  blockBreadcrumb.textContent = `Preguntas ${start + 1}-${end + 1}`;
}

function updateNavigation() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  prevBtn.disabled = getCurrentBlock() === 0;
  nextBtn.disabled = getCurrentBlock() === 2;
  prevBtn.onclick = () => {
    if (getCurrentBlock() > 0) setCurrentBlock(getCurrentBlock() - 1);
    renderWizard();
    updateBreadcrumb();
  };
  nextBtn.onclick = () => {
    if (getCurrentBlock() < 2) setCurrentBlock(getCurrentBlock() + 1);
    renderWizard();
    updateBreadcrumb();
  };
}

function navigateDim(delta) {
  const next = getCurrentDim() + delta;
  if (next < 0 || next >= getDimensions().length) return;
  setCurrentDim(next);
  setCurrentBlock(0);
  buildMenu();
  renderWizard();
  updateBreadcrumb();
  miniPlaceholders();
  destroyMiniCharts();
  document.getElementById('welcomeCard').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function updateBlockProgress() {
  const dim = getDimensions()[getCurrentDim()];
  const answered = blockAnswered(dim.id, getCurrentBlock());
  blockProgressBar.style.width = `${(answered / 10) * 100}%`;
  const blockKey = `${dim.id}-${getCurrentBlock()}`;
  if (answered === 10 && !blockDone[blockKey]) {
    showToast('✓ Bloque completado · Excelente, avanza al siguiente.');
    blockDone[blockKey] = true;
  }
  blockFeedback.textContent = answered === 10 ? 'Bloque completo · puedes pasar al siguiente' : `Progreso del bloque: ${answered}/10`;
}

function maybeMilestones(dimId) {
  const answered = countAnswered(dimId);
  if (answered === 10 || answered === 20 || answered === 30) {
    showToast(`${answered}/30 · ¡Vas muy bien!`);
  }
}

function updateGlobal() {
  const answered = getDimensions().reduce((acc, d) => acc + countAnswered(d.id), 0);
  const pct = Math.round((answered / (getDimensions().length * 30)) * 100);
  globalProgress.textContent = `${pct}%`;
  globalProgressBar.style.width = `${pct}%`;
  const submittedCount = getDimensions().filter(d => isSubmitted(d.id)).length;
  dimsDone.textContent = `${submittedCount} / 6`;
  if (pct === 100) { globalStatus.textContent = 'Madurez calculada'; awardBadgeOnce('🏅 Madurez calculada'); }
  if (submittedCount === getDimensions().length) {
    globalStatus.textContent = 'Resultados completos (DQ / AIQ finales)';
  }
}

function updateWizardStatus() {
  const dim = getDimensions()[getCurrentDim()];
  const answered = countAnswered(dim.id);
  const left = 30 - answered;
  wizardStatus.textContent = left ? `Te faltan ${left} preguntas para enviar ${dim.short}` : 'Listo para enviar';
  document.getElementById('submitDim').disabled = left !== 0;
  nextDimBtn.disabled = getCurrentDim() === getDimensions().length - 1;
  prevDimBtn.disabled = getCurrentDim() === 0;
}

function updatePending() {
  const remaining = pendingCount();
  pendingQuestions.textContent = remaining ? `Te faltan ${remaining} preguntas para completar toda la evaluación` : '¡Cuestionario completo!';
}

function scrollToResults() {
  document.getElementById('resultsCard').scrollIntoView({ behavior: 'smooth' });
}

function showToast(text) {
  toast.textContent = text;
  toast.style.display = 'block';
  setTimeout(() => (toast.style.display = 'none'), 1800);
}

function validateDimension() {
  const dim = getDimensions()[getCurrentDim()];
  return dimensionComplete(dim.id);
}

function submitDimension() {
  if (!validateDimension()) { showToast('Completa todas las preguntas antes de enviar'); return; }
  const dim = getDimensions()[getCurrentDim()];
  markSubmitted(dim.id);
  const scores = computeScores();
  const dimScore = scores.dimScores.find(d => d.id === dim.id);
  showModal(`Puntaje de ${dim.title}: ${dimScore.score}% · Subdimensiones ${dimScore.blocks.join(' / ')}%`);
  renderMiniRadar(dimScore);
  renderThermometer(dimScore.score);
  updateInsights(scores);
  updateGlobal();
  renderActions(scores);
  triggerConfetti();
  updateResults(scores);
  maybeBadges();
}

function showModal(message) {
  modalBody.textContent = message;
  modalBackdrop.style.display = 'flex';
}
function closeModal() { modalBackdrop.style.display = 'none'; }
closeModalBtn.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', e => { if (e.target === modalBackdrop) closeModal(); });

function updateInsights(scores) {
  dimensionInsights.innerHTML = '';
  scores.dimScores.forEach((dimScore, idx) => {
    const card = document.createElement('div');
    card.className = 'insight-card';
    const level = levelFromScore(dimScore.score);
    const subLevelText = dimScore.blocks.map((b, i) => `${blockLabels[i]}: ${b}%`).join(' · ');
    const bestIdx = dimScore.blocks.indexOf(Math.max(...dimScore.blocks));
    const worstIdx = dimScore.blocks.indexOf(Math.min(...dimScore.blocks));
    const detail = `Fuerte: ${blockLabels[bestIdx]} · Brecha: ${blockLabels[worstIdx]}`;
    const guidance = level.key === 'bajo'
      ? 'Activa controles mínimos, define dueños y cubre riesgos críticos.'
      : level.key === 'intermedio'
        ? 'Escala pilotos, formaliza métricas y cierra brechas de gobierno.'
        : 'Optimiza, comparte buenas prácticas y refuerza resiliencia y ética.';
    card.innerHTML = `
      <div class="insight-head">
        <div>${dimensions[idx].icon} ${dimScore.title}</div>
        <span class="level ${level.key}">${level.label}</span>
      </div>
      <div class="breadcrumb">${subLevelText}</div>
      <p>${level.text} ${detail}. ${guidance}</p>
    `;
    dimensionInsights.appendChild(card);
  });
}

function levelFromScore(score) {
  if (score < 45) return { key: 'bajo', label: 'Bajo', text: 'Brecha crítica: fija controles básicos, casos rápidos y liderazgo visible.' };
  if (score < 67) return { key: 'intermedio', label: 'Intermedio', text: 'Consolida prácticas, escala pilotos y formaliza métricas de impacto.' };
  return { key: 'alto', label: 'Alto', text: 'Sigue escalando IA, comparte buenas prácticas y fortalece resiliencia.' };
}

function renderActions(scores) {
  actionsContainer.innerHTML = '';
  scores.dimScores.forEach(ds => {
    const card = document.createElement('div');
    card.className = 'action-card';
    const level = levelFromScore(ds.score);
    const recs = buildRecs(ds.score);
    card.innerHTML = `
      <div class="insight-head"><div>${dimensions.find(d => d.id === ds.id).icon} ${ds.title}</div><span class="pill-sm">${ds.score}%</span></div>
      <p class="breadcrumb">${level.label} · ${recs.title}</p>
      <ul class="list">${recs.items.map(i => `<li>${i}</li>`).join('')}</ul>
    `;
    actionsContainer.appendChild(card);
  });
}

function buildRecs(score) {
  if (score < 45) return { title: 'Primeros 90 días', items: ['Define quick wins y dueños de dato/IA', 'Cubre vacíos de seguridad y ética', 'Financia 1–2 pilotos con ROI claro'] };
  if (score < 67) return { title: 'Escala y mide', items: ['Estandariza playbooks y MLOps', 'Formaliza KPIs por subdimensión', 'Escala casos de uso a más áreas'] };
  return { title: 'Optimiza y comparte', items: ['Automatiza monitoreo y alertas', 'Benchmark continuo con líderes', 'Comparte biblioteca de modelos y datos'] };
}

function updateResults(scores) {
  if (!chartsAreLoaded()) {
    graphPlaceholders(resultsCharts);
    setChartsLoaded(true);
  }
  renderMainCharts(scores);
  resultStatus.textContent = 'Actualizado';
  const heroScore = document.querySelector('.hero-score');
  heroScore.innerHTML = `DQ ${scores.dq}% <small>· AIQ ${scores.aiq}%</small>`;
  const best = scores.dimScores.reduce((a, b) => (b.score > a.score ? b : a), scores.dimScores[0]);
  const worst = scores.dimScores.reduce((a, b) => (b.score < a.score ? b : a), scores.dimScores[0]);
  finalSummary.textContent = `Fortaleza: ${best.title} (${best.score}%). Brecha crítica: ${worst.title} (${worst.score}%). Benchmark sector DQ ${benchmarks.sector.dq}% / líderes ${benchmarks.leaders.dq}%.`;
}

function awardBadgeOnce(label) {
  if (!getBadges().has(label)) {
    awardBadge(label);
    addBadge(label);
  }
}

function addBadge(label) {
  const pill = document.createElement('span');
  pill.className = 'pill';
  pill.textContent = label;
  badgeContainer.appendChild(pill);
}

function renderBadges() {
  badgeContainer.innerHTML = '';
  getBadges().forEach(addBadge);
}

function maybeBadges() {
  const submitted = Array.from({ length: getDimensions().length }).filter((_, idx) => isSubmitted(getDimensions()[idx].id)).length;
  if (submitted === 1) awardBadgeOnce('🥇 Primera dimensión');
  if (submitted === 3) awardBadgeOnce('⭐ 50% completado');
  if (submitted === 6) awardBadgeOnce('🏁 Todas las dimensiones');
}

function triggerConfetti() {
  const container = document.getElementById('confetti');
  container.innerHTML = '';
  for (let i = 0; i < 50; i++) {
    const piece = document.createElement('span');
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = ['#2563eb', '#06b6d4', '#22c55e', '#f59e0b', '#ef4444'][Math.floor(Math.random() * 5)];
    piece.style.animationDelay = `${Math.random() * 0.5}s`;
    container.appendChild(piece);
  }
  clearTimeout(confettiTimer);
  confettiTimer = setTimeout(() => (container.innerHTML = ''), 2000);
}

function handleKeyboard(e) {
  if (['1','2','3','4','5'].includes(e.key)) {
    const val = Number(e.key);
    const dim = getDimensions()[getCurrentDim()];
    selectAnswer(dim.id, focusIndex, val);
  }
  if (e.key === 'ArrowRight' || e.key === 'ArrowUp') adjustValue(1);
  if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') adjustValue(-1);
  if (e.key === 'PageDown') document.getElementById('nextBtn').click();
  if (e.key === 'PageUp') document.getElementById('prevBtn').click();
  if (e.key === 'Enter' && e.metaKey) document.getElementById('submitDim').click();
}

function adjustValue(delta) {
  const dim = getDimensions()[getCurrentDim()];
  const current = getResponsesFor(dim.id)[focusIndex] || 0;
  let next = current + delta;
  if (next < 1) next = 1;
  if (next > 5) next = 5;
  selectAnswer(dim.id, focusIndex, next);
}

document.addEventListener('keydown', handleKeyboard);

document.getElementById('submitDim').addEventListener('click', submitDimension);
document.getElementById('generateZip').addEventListener('click', generateZip);
document.getElementById('downloadPdf').addEventListener('click', downloadPdf);
startWizardBtn.addEventListener('click', () => document.getElementById('blockBreadcrumb').scrollIntoView({ behavior: 'smooth', block: 'start' }));
prevDimBtn.addEventListener('click', () => navigateDim(-1));
nextDimBtn.addEventListener('click', () => navigateDim(1));

document.getElementById('questionContainer').addEventListener('mouseover', e => {
  const btn = e.target.closest('button[data-value]');
  if (btn && ['4','5'].includes(btn.dataset.value)) {
    showToast(btn.dataset.value === '4' ? '4 = bien implementado y estable' : '5 = optimizado, medido y escalable');
  }
});

function generateZip() {
  const files = ['index.html', 'questions.js', 'state.js', 'charts.js', 'main.js', 'README.md'];
  const zip = new JSZip();
  const promises = files.map(path => fetch(path).then(r => r.text()).then(content => zip.file(path, content)));
  Promise.all(promises).then(() => zip.generateAsync({ type: 'blob' })).then(content => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(content);
    a.download = 'mdia-offline.zip';
    a.click();
    showToast('Paquete offline generado');
  }).catch(() => showToast('No se pudo generar el ZIP offline'));
}

function downloadPdf() {
  const element = document.getElementById('resultsCard');
  html2pdf().from(element).set({ filename: 'mdia-reporte.pdf', margin: 10 }).save();
}

function init() {
  syncBadges();
  buildMenu();
  renderWizard();
  updateBreadcrumb();
  updateGlobal();
  miniPlaceholders();
  renderBadges();
}

init();
