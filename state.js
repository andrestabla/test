import { dimensions } from './questions.js';

const STORAGE_KEY = 'mdia-respuestas-v2';
const state = {
  currentDim: 0,
  currentBlock: 0,
  responses: loadSaved(),
  submitted: new Set(loadSubmitted()),
  chartsLoaded: false,
  badges: new Set()
};

function loadSaved() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};
  try { return JSON.parse(raw); } catch { return {}; }
}
function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.responses)); }
function loadSubmitted() {
  const raw = localStorage.getItem(`${STORAGE_KEY}-submitted`);
  if (!raw) return [];
  try { return JSON.parse(raw); } catch { return []; }
}
function saveSubmitted() { localStorage.setItem(`${STORAGE_KEY}-submitted`, JSON.stringify([...state.submitted])); }

export function getDimensions() { return dimensions; }
export function getCurrentDim() { return state.currentDim; }
export function setCurrentDim(idx) { state.currentDim = idx; state.currentBlock = 0; }
export function getCurrentBlock() { return state.currentBlock; }
export function setCurrentBlock(idx) { state.currentBlock = idx; }

export function getResponsesFor(dimId) { return state.responses[dimId] || {}; }
export function setAnswer(dimId, index, value) {
  if (!state.responses[dimId]) state.responses[dimId] = {};
  state.responses[dimId][index] = value;
  saveState();
}

export function countAnswered(dimId) {
  const answers = getResponsesFor(dimId);
  return Object.keys(answers).length;
}

export function blockRange(blockIndex) { return { start: blockIndex * 10, end: blockIndex * 10 + 9 }; }

export function blockAnswered(dimId, blockIndex) {
  const answers = getResponsesFor(dimId);
  const { start, end } = blockRange(blockIndex);
  let count = 0;
  for (let i = start; i <= end; i++) if (answers[i] !== undefined) count++;
  return count;
}

export function dimensionComplete(dimId) { return countAnswered(dimId) === 30; }
export function allComplete() { return dimensions.every(d => dimensionComplete(d.id)); }

export function markSubmitted(dimId) { state.submitted.add(dimId); saveSubmitted(); }
export function isSubmitted(dimId) { return state.submitted.has(dimId); }

export function computeScores() {
  const dimScores = dimensions.map(dim => {
    const answers = getResponsesFor(dim.id);
    const values = Array.from({ length: 30 }, (_, i) => answers[i] ?? 0);
    const normalized = values.map(v => Math.max(0, (v - 1) * 25));
    const average = normalized.reduce((a, b) => a + b, 0) / normalized.length;
    const blocks = dim.blocks.map((_, idx) => {
      const slice = normalized.slice(idx * 10, idx * 10 + 10);
      const avg = slice.reduce((a, b) => a + b, 0) / slice.length;
      return Math.round(avg);
    });
    return { id: dim.id, title: dim.title, short: dim.short, color: dim.color, score: Math.round(average), blocks };
    const average = values.reduce((a, b) => a + b, 0) / values.length;
    const blocks = dim.blocks.map((_, idx) => {
      const slice = values.slice(idx * 10, idx * 10 + 10);
      const avg = slice.reduce((a, b) => a + b, 0) / slice.length;
      return Math.round(avg * 20);
    });
    return { id: dim.id, title: dim.title, short: dim.short, color: dim.color, score: Math.round(average * 20), blocks };
  });
  const dq = Math.round(dimScores.reduce((acc, d) => acc + d.score, 0) / dimScores.length || 0);
  const aiq = Math.round(dimScores.reduce((acc, d) => acc + d.score * (dimensions.find(dd => dd.id === d.id).weightAIQ), 0));
  return { dimScores, dq, aiq };
}

export function pendingCount() {
  const answered = dimensions.reduce((acc, dim) => acc + countAnswered(dim.id), 0);
  return dimensions.length * 30 - answered;
}

export function setChartsLoaded(v) { state.chartsLoaded = v; }
export function chartsAreLoaded() { return state.chartsLoaded; }

export function awardBadge(badge) { state.badges.add(badge); localStorage.setItem(`${STORAGE_KEY}-badges`, JSON.stringify([...state.badges])); }
export function getBadges() {
  return state.badges;
}
export function syncBadges() {
  const raw = localStorage.getItem(`${STORAGE_KEY}-badges`);
  if (raw) {
    try { const arr = JSON.parse(raw); arr.forEach(b => state.badges.add(b)); } catch { /* ignore */ }
  }
}

syncBadges();
