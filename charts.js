import { benchmarks, blockLabels } from './questions.js';

const charts = {
  mainRadar: null,
  dqaiq: null,
  benchmark: null,
  semaforo: null,
  miniRadar: null,
  thermo: null
};

const palette = ['#2563eb', '#06b6d4', '#22c55e', '#f59e0b', '#8b5cf6', '#ef4444'];

function ensureContext(id) { const el = document.getElementById(id); return el ? el.getContext('2d') : null; }

export function renderMainCharts(scores) {
  const dimLabels = scores.dimScores.map(d => d.title);
  const dimValues = scores.dimScores.map(d => d.score);
  const totalDims = scores.dimScores.length;

  if (!charts.mainRadar && ensureContext('chart-main-radar')) {
    charts.mainRadar = new Chart(ensureContext('chart-main-radar'), {
      type: 'radar',
      data: { labels: dimLabels, datasets: [{ label: 'Empresa', data: dimValues, backgroundColor: 'rgba(37,99,235,0.25)', borderColor: '#2563eb' }] },
      options: baseRadarOptions()
    });
  } else if (charts.mainRadar) {
    charts.mainRadar.data.labels = dimLabels;
    charts.mainRadar.data.datasets[0].data = dimValues;
    charts.mainRadar.update();
  }

  if (!charts.dqaiq && ensureContext('chart-dqaiq')) {
    charts.dqaiq = new Chart(ensureContext('chart-dqaiq'), {
      type: 'bar',
      data: { labels: ['DQ', 'AIQ'], datasets: [{ label: 'Empresa', data: [scores.dq, scores.aiq], backgroundColor: ['#2563eb', '#22c55e'] }] },
      options: baseBarOptions()
    });
  } else if (charts.dqaiq) {
    charts.dqaiq.data.datasets[0].data = [scores.dq, scores.aiq];
    charts.dqaiq.update();
  }

  if (!charts.benchmark && ensureContext('chart-benchmark')) {
    charts.benchmark = new Chart(ensureContext('chart-benchmark'), {
      type: 'bar',
      data: {
        labels: ['DQ', 'AIQ'],
        datasets: [
          { label: 'Empresa', data: [scores.dq, scores.aiq], backgroundColor: 'rgba(37,99,235,0.8)' },
          { label: 'Sector', data: [benchmarks.sector.dq, benchmarks.sector.aiq], backgroundColor: 'rgba(148,163,253,0.8)' },
          { label: 'Líderes', data: [benchmarks.leaders.dq, benchmarks.leaders.aiq], backgroundColor: 'rgba(34,197,94,0.8)' },
          { label: 'Promedio histórico', data: [benchmarks.previous.dq, benchmarks.previous.aiq], backgroundColor: 'rgba(234,179,8,0.8)' }
        ]
      },
      options: baseBarOptions(true)
    });
  } else if (charts.benchmark) {
    charts.benchmark.data.datasets[0].data = [scores.dq, scores.aiq];
    charts.benchmark.update();
  }

  if (!charts.semaforo && ensureContext('chart-semaforo')) {
    charts.semaforo = new Chart(ensureContext('chart-semaforo'), {
      type: 'bar',
      data: { labels: dimLabels, datasets: [{ label: 'Puntaje', data: dimValues, backgroundColor: dimValues.map(colorSemaforo) }] },
      options: baseBarOptions(false, true)
    });
  } else if (charts.semaforo) {
    charts.semaforo.data.labels = dimLabels;
    charts.semaforo.data.datasets[0].data = dimValues;
    charts.semaforo.data.datasets[0].backgroundColor = dimValues.map(colorSemaforo);
    charts.semaforo.update();
  }
}

export function renderMiniRadar(dimScore) {
  const ctx = ensureContext('miniRadar');
  if (!ctx) return;
  const labels = blockLabels;
  if (!charts.miniRadar) {
    charts.miniRadar = new Chart(ctx, {
      type: 'radar',
      data: { labels, datasets: [{ label: 'Subdimensiones', data: dimScore.blocks, backgroundColor: 'rgba(6,182,212,0.2)', borderColor: '#06b6d4' }] },
      options: baseRadarOptions()
    });
  } else {
    charts.miniRadar.data.datasets[0].data = dimScore.blocks;
    charts.miniRadar.update();
  }
}

export function renderThermometer(value) {
  const ctx = ensureContext('thermo');
  if (!ctx) return;
  if (!charts.thermo) {
    charts.thermo = new Chart(ctx, {
      type: 'bar',
      data: { labels: ['Madurez'], datasets: [{ label: 'Puntaje', data: [value], backgroundColor: colorSemaforo(value) }] },
      options: { indexAxis: 'y', scales: { x: { suggestedMin: 0, suggestedMax: 100, ticks: { color: '#cbd5e1' }, grid: { color: 'rgba(255,255,255,0.08)' } }, y: { ticks: { color: '#cbd5e1' } } }, plugins: { legend: { display: false } } }
    });
  } else {
    charts.thermo.data.datasets[0].data = [value];
    charts.thermo.data.datasets[0].backgroundColor = colorSemaforo(value);
    charts.thermo.update();
  }
}

function baseRadarOptions() {
  return {
    responsive: true,
    scales: { r: { suggestedMin: 0, suggestedMax: 100, ticks: { stepSize: 20, backdropColor: 'transparent', color: '#94a3b8' }, grid: { color: 'rgba(148,163,253,0.3)' }, angleLines: { color: 'rgba(37,99,235,0.35)' }, pointLabels: { color: '#e2e8f0', font: { size: 10 } } } },
    plugins: { legend: { labels: { color: '#e2e8f0', font: { size: 11 } } } }
  };
}

function baseBarOptions(showLegend = false, narrow = false) {
  return {
    indexAxis: narrow ? 'y' : 'x',
    responsive: true,
    scales: {
      x: { ticks: { color: '#cbd5e1', font: { size: 10 } }, grid: { color: 'rgba(55,65,81,0.4)' }, suggestedMin: 0, suggestedMax: 100 },
      y: { ticks: { color: '#cbd5e1', font: { size: 10 } }, grid: { color: 'rgba(55,65,81,0.4)' }, suggestedMin: 0, suggestedMax: 100 }
    },
    plugins: { legend: { display: showLegend, labels: { color: '#e2e8f0', font: { size: 11 } } } }
  };
}

function colorSemaforo(v) {
  if (v < 45) return 'rgba(239,68,68,0.9)';
  if (v < 60) return 'rgba(245,158,11,0.9)';
  if (v < 75) return 'rgba(132,204,22,0.9)';
  return 'rgba(34,197,94,0.9)';
}

export function graphPlaceholders(container) {
  container.innerHTML = `
    <div class="chart-wrap"><canvas id="chart-main-radar" aria-label="Radar de dimensiones" role="img"></canvas></div>
    <div class="chart-wrap"><canvas id="chart-dqaiq" aria-label="Barra DQ y AIQ" role="img"></canvas></div>
    <div class="chart-wrap"><canvas id="chart-benchmark" aria-label="Benchmark sector y líderes" role="img"></canvas></div>
    <div class="chart-wrap"><canvas id="chart-semaforo" aria-label="Semáforo de dimensiones" role="img"></canvas></div>`;
}

export function miniPlaceholders() {
  document.getElementById('miniRadarWrap').innerHTML = '<canvas id="miniRadar" aria-label="Radar de subdimensiones" role="img"></canvas>';
  document.getElementById('thermoWrap').innerHTML = '<canvas id="thermo" aria-label="Termómetro de madurez" role="img"></canvas>';
}

export function destroyMiniCharts() {
  if (charts.miniRadar) { charts.miniRadar.destroy(); charts.miniRadar = null; }
  if (charts.thermo) { charts.thermo.destroy(); charts.thermo = null; }
}
