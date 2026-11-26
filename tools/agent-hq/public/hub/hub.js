/* Agent HQ hub: the main dashboard. Every page is native and wired to the HQ API (/api/*). No dependencies.
   The old dashboard still answers at /legacy for anyone who wants it, but nothing in the hub links there. */
(() => {
'use strict';

// ================================================================ icons
const P = {
  home:'<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
  lead:'<path d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.5-.8z"/>',
  team:'<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M17 14c2.5 0 4 2 4 5"/>',
  tasks:'<rect x="4" y="3" width="16" height="18" rx="3"/><path d="M8 8h8M8 12h8M8 16h5"/>',
  review:'<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.5 2.5L16 9.5"/>',
  library:'<path d="M4 4h5v16H4zM10 4h4v16h-4z"/><path d="M15.5 5l4 .9-3 14.4-4-.9z"/>',
  vault:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/>',
  create:'<path d="M5 19 19 5"/><path d="M15 5h4v4"/><path d="M6 4v3M4.5 5.5h3M18 16v3M16.5 17.5h3"/>',
  games:'<rect x="2.5" y="7" width="19" height="11" rx="5"/><path d="M7 12.5h4M9 10.5v4"/><circle cx="16" cy="11.5" r="1"/><circle cx="18" cy="13.5" r="1"/>',
  pitches:'<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
  market:'<path d="M4 19V5"/><path d="M4 19h16"/><path d="M7 15l4-4 3 3 5-6"/>',
  packs:'<path d="M12 3 21 7.5v9L12 21l-9-4.5v-9z"/><path d="M3 7.5 12 12l9-4.5M12 12v9"/>',
  settings:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  chev:'<path d="m6 9 6 6 6-6"/>',
  chevr:'<path d="m9 6 6 6-6 6"/>',
  back:'<path d="M19 12H5M11 6l-6 6 6 6"/>',
  right:'<path d="M5 12h14M13 6l6 6-6 6"/>',
  grid:'<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
  refresh:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8"/><path d="M4 4v4h4"/><path d="M4 13a8 8 0 0 0 14.3 4.9L20 16"/><path d="M20 20v-4h-4"/>',
  bell:'<path d="M6 8a6 6 0 1 1 12 0c0 7 3 8 3 8H3s3-1 3-8"/><path d="M10 20a2 2 0 0 0 4 0"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  pause:'<rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/>',
  play:'<path d="M7 5v14l11-7z"/>',
  copy:'<rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
  check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  checkc:'<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.5 2.5L16 9.5"/>',
  camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
  upload:'<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v4h16v-4"/>',
  download:'<path d="M12 4v12M7 11l5 5 5-5"/><path d="M4 20h16"/>',
  eye:'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  code:'<path d="m8 7-5 5 5 5M16 7l5 5-5 5"/>',
  box:'<path d="M12 3 21 7.5v9L12 21l-9-4.5v-9z"/><path d="M3 7.5 12 12l9-4.5M12 12v9"/>',
  plan:'<path d="M4 6h16M4 12h16M4 18h16"/>',
  sliders:'<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
  x:'<path d="M6 6l12 12M18 6 6 18"/>',
  min:'<path d="M5 12h14"/>',
  pen:'<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>',
  wand:'<path d="m4 20 11-11"/><path d="m14 4 1 2 2 1-2 1-1 2-1-2-2-1 2-1zM19 11l.7 1.3L21 13l-1.3.7L19 15l-.7-1.3L17 13l1.3-.7z"/>',
  image:'<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-9 9"/>',
  film:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4"/>',
  spark:'<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/>',
  msg:'<path d="M4 5h16v11H9l-5 4z"/>',
  hammer:'<path d="M14 6 18 10"/><path d="m3 21 9-9"/><path d="M12 4l6 6 3-3-6-6z"/>',
  map:'<path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2z"/><path d="M9 4v14M15 6v14"/>',
  coin:'<circle cx="12" cy="12" r="8"/><path d="M12 8v8M9.5 10h4a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 0 0 3h4"/>',
  shop:'<path d="M4 9h16l-1 11H5z"/><path d="M8 9V7a4 4 0 0 1 8 0v2"/>',
  kid:'<circle cx="12" cy="7" r="3.5"/><path d="M6 21v-3a6 6 0 0 1 12 0v3"/>',
  bug:'<rect x="7" y="8" width="10" height="12" rx="5"/><path d="M12 8V5M9 5l-1-2M15 5l1-2M3 13h4M17 13h4M4 19l3-2M20 19l-3-2"/>',
  shield:'<path d="M12 3 20 6v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>',
  flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
  pulse:'<path d="M3 12h4l2-6 4 12 2-6h6"/>',
  brush:'<path d="M14 4l6 6-8 8-6-6z"/><path d="M6 12c-2 0-3 1.5-3 4v4h4c2.5 0 4-1 4-3"/>',
  key:'<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M17 6l3 3"/>',
  arch:'<path d="M3 21h18M5 21V10l7-6 7 6v11"/><path d="M9 21v-6h6v6"/>',
  book:'<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h11"/>',
  link:'<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V14M12 17.5v.01"/>',
  palette:'<path d="M12 3a9 9 0 1 0 0 18c1.2 0 2-.8 2-2 0-.6-.2-1-.6-1.4-.4-.4-.6-.8-.6-1.4 0-1.1.9-2 2-2H17a4 4 0 0 0 4-4c0-4-4-7.2-9-7.2z"/><circle cx="7.5" cy="11.5" r="1"/><circle cx="10.5" cy="7.5" r="1"/><circle cx="15" cy="7.5" r="1"/>',
  trash:'<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
  archive:'<rect x="3" y="4" width="18" height="5" rx="1.5"/><path d="M5 9v10h14V9M10 13h4"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  send:'<path d="M4 12 20 4l-6 16-3-7z"/><path d="m11 13 9-9"/>',
  rocket:'<path d="M14 4c3 0 6 3 6 6-2 4-6 7-9 8l-5-5c1-3 4-7 8-9z"/><circle cx="14.5" cy="9.5" r="1.5"/><path d="M6 13l-3 1 2 3M11 18l-1 3-3-2"/>',
  lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  history:'<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 8v4l3 2"/>',
  ext:'<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.01"/>',
  warn:'<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17v.01"/>',
  studio:'<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>',
  layers:'<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
};
const ic = (n, cls = '') => `<span class="i ${cls}">${P[n] ? `<svg viewBox="0 0 24 24" aria-hidden="true">${P[n]}</svg>` : ''}</span>`;
const hydrate = (root = document) => root.querySelectorAll('.i[data-i]').forEach(el => { el.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${P[el.dataset.i] || ''}</svg>`; el.removeAttribute('data-i'); });

// ================================================================ small helpers
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
const fmt = n => n == null || n === '' || Number.isNaN(Number(n)) ? '—' : Number(n).toLocaleString('en-US');
const short = n => { n = Number(n); if (!Number.isFinite(n)) return '—'; const a = Math.abs(n); return a >= 1e6 ? (n / 1e6).toFixed(a >= 1e7 ? 0 : 1) + 'M' : a >= 1e3 ? (n / 1e3).toFixed(a >= 1e4 ? 0 : 1) + 'K' : String(Math.round(n)); };
const cap = s => String(s || '').charAt(0).toUpperCase() + String(s || '').slice(1);
const ago = iso => { if (!iso) return ''; const s = Math.max(0, (Date.now() - Date.parse(iso)) / 1000); return s < 45 ? 'just now' : s < 3600 ? `${Math.floor(s / 60) || 1}m ago` : s < 86400 ? `${Math.floor(s / 3600)}h ago` : `${Math.floor(s / 86400)}d ago`; };
const when = iso => iso ? new Date(iso).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—';
const isImg = p => /\.(png|jpe?g|webp|gif|svg)$/i.test(p || '');
const plural = (n, w, ws = w + 's') => `${n} ${n === 1 ? w : ws}`;
const slugify = s => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40);
const stamp = t => Date.parse(t.endedAt || t.startedAt || t.createdAt) || 0;

// ================================================================ connection
const BASE = location.pathname.startsWith('/hq') ? '/hq' : '';
const readToken = () => {
  const m = location.hash.match(/(?:^#|&)owner=([0-9a-f]{64})/);
  if (m) {
    try { localStorage.setItem('hq-owner', m[1]); } catch { /* private mode */ }
    history.replaceState(null, '', location.pathname + location.search + '#/home');
    return m[1];
  }
  try { return localStorage.getItem('hq-owner') || ''; } catch { return ''; }
};
const TOKEN = BASE ? 'via-site' : readToken();
async function api(method, p, body) {
  const r = await fetch(BASE + p, { method, headers: { 'x-hq-token': TOKEN, ...(body !== undefined ? { 'content-type': 'application/json' } : {}) }, body: body !== undefined ? JSON.stringify(body) : undefined });
  let j = null; try { j = await r.json(); } catch { /* empty */ }
  if (!r.ok) throw new Error((j && (j.error || j.message)) || `Request failed (${r.status})`);
  return j;
}
// run an action: toast the result, return the answer or null
async function run(fn, ok) { try { const r = await fn(); if (ok) toast(ok); return r ?? true; } catch (e) { toast(e.message, true); return null; } }
const mediaUrl = p => p ? BASE + '/media/' + String(p).replace(/\\/g, '/').replace(/^\.agent-hq\/media\//, '').replace(/^\/+/, '').split('/').map(encodeURIComponent).join('/') : '';
const assetUrl = p => mediaUrl('assets/' + String(p || '').replace(/\\/g, '/').replace(/^assets\//, ''));

// ================================================================ state
const S = { loaded: false, err: '', tasks: [], asks: [], games: [], roles: [], settings: {}, lanes: {}, running: [], pitches: [], stageRequests: [], engines: {}, studio: {} };
const X = {};               // page data, loaded on demand (see want)
const inflight = {};
const U = {                 // what the owner picked on screen
  game: (() => { try { return localStorage.getItem('hq-hub-game') || 'all'; } catch { return 'all'; } })(),
  draft: {}, tq: '', tf: 'open', trole: '', rvSel: 0, libQ: '', libKind: 'all', catQ: '', catType: '', skillQ: '', vaultQ: '',
  createKind: 'asset', createGame: null, createText: '', showArchived: false, chatChannel: '', chatSync: false, chatFull: {},
  sortId: 'top-trending', pitchQ: '', settingsQ: '',
};
let lastLoad = 0;
async function loadState() {
  try { Object.assign(S, await api('GET', '/api/state')); S.loaded = true; S.err = ''; lastLoad = Date.now(); }
  catch (e) { S.err = /401|403|token|sign/i.test(e.message) ? 'signin' : e.message; }
  if (U.game !== 'all' && S.loaded && !S.games.some(g => g.slug === U.game)) U.game = 'all';
  schedule();
}
let loadT;
const loadSoon = () => { clearTimeout(loadT); loadT = setTimeout(loadState, 350); };

// want(key, path): the cached answer, or undefined while it loads (the page re-renders when it arrives)
function want(key, path, { force = false } = {}) {
  if (!force && key in X) return X[key];
  if (!inflight[key]) {
    inflight[key] = api('GET', path).then(v => { X[key] = v; }).catch(e => { X[key] = { __err: e.message }; }).finally(() => { delete inflight[key]; schedule(); });
  }
  return X[key];
}
const drop = (...keys) => { for (const k of keys) for (const x of Object.keys(X)) if (x === k || x.startsWith(k + ':')) delete X[x]; };
const failed = v => v && typeof v === 'object' && '__err' in v;

// ================================================================ roles and games
const ROLE_LOOK = {
  lead:['lead','#ffd27a'], scout:['market','#7fd3ff'], architect:['arch','#b9a4ff'], builder:['hammer','#5fe3ff'], ui:['grid','#ff8fc8'],
  designer:['brush','#ff6fb1'], world:['map','#7ee08f'], librarian:['library','#a5f3ff'], economy:['coin','#fff07a'], merchant:['shop','#ffb36b'],
  thumbnails:['image','#ff7a8a'], 'kid-tester':['kid','#9bf0c2'], playtester:['bug','#4ee6c5'], reviewer:['shield','#c7b8ff'], producer:['flag','#ffd9a0'], liveops:['pulse','#8ab4ff'],
};
const role = id => { const r = S.roles.find(x => x.id === id) || { id, label: id ? cap(id) : 'HQ', job: '' }; const [icon, c] = ROLE_LOOK[id] || ['spark', '#c7b8ff']; return { ...r, icon, c }; };
const av = (id, size = '') => { const r = role(id); return `<span class="av ${size}" style="--c:${r.c}" title="${esc(r.label)}">${ic(r.icon)}</span>`; };
const liveGames = () => S.games.filter(g => !g.archivedAt);
const gameBy = s => S.games.find(g => g.slug === s);
const gameName = s => gameBy(s)?.name || (s || 'No game');
const sceneOf = slug => `<div class="scene s${[...String(slug || 'x')].reduce((a, c) => a + c.charCodeAt(0), 0) % 4}"></div>`;
const gameArt = g => g?.icon ? `<img src="${mediaUrl(g.icon)}" alt="">` : sceneOf(g?.slug);
const STAGES = ['pitched', 'designed', 'assets', 'built', 'balanced', 'art', 'ready', 'live', 'graded'];
const STAGE_LBL = { pitched:'Pitched', designed:'Designed', assets:'Assets', built:'Built', balanced:'Balanced', art:'Art', ready:'Ready', live:'Live', graded:'Graded' };
const OPEN = t => ['queued', 'working', 'review'].includes(t.state);
const inGame = slug => U.game === 'all' || !slug || slug === U.game;   // work with no game shows under every game
const askGame = a => a.game || S.tasks.find(t => t.id === a.taskId)?.game || '';
const needsYou = () => S.asks.filter(a => a.state === 'open' && !a.superseded && a.kind !== 'reference' && inGame(askGame(a)));
const gTasks = () => S.tasks.filter(t => inGame(t.game));
const ST_LBL = { working:'Working', review:'In review', queued:'Queued', done:'Done', failed:'Failed', canceled:'Canceled' };
const stChip = s => `<span class="st ${esc(s)}">${s === 'working' ? '<span class="spinner" style="width:11px;height:11px;border-width:2px"></span>' : ''}${ST_LBL[s] || cap(s)}</span>`;
function setGame(slug) {
  U.game = slug; U.rvSel = 0;
  try { localStorage.setItem('hq-hub-game', slug); } catch { /* private mode */ }
  schedule();
}

// ================================================================ navigation
const NAV = [
  ['Workspace', [
    { id:'home', label:'Home', icon:'home' },
    { id:'review', label:'Review', icon:'review', badge:() => needsYou().length, tone:'y' },
    { id:'lead', label:'Lead', icon:'lead', badge:() => (X.threads && !failed(X.threads) ? (X.threads.find(t => t.role === 'lead') || {}).unread : 0) || 0 },
    { id:'team', label:'Team', icon:'team', badge:() => gTasks().filter(t => t.state === 'working').length, tone:'g' },
    { id:'tasks', label:'Tasks', icon:'tasks', badge:() => gTasks().filter(OPEN).length },
  ]],
  ['Studio', [
    { id:'games', label:'Games', icon:'games' },
    { id:'create', label:'Create', icon:'create' },
    { id:'library', label:'Library', icon:'library' },
    { id:'packs', label:'Asset Packs', icon:'packs', gold:1 },
    { id:'vault', label:'Vault', icon:'vault' },
    { id:'pitches', label:'Pitches', icon:'pitches', badge:() => S.pitches.filter(p => ['proposed', 'changes'].includes(p.state)).length, tone:'y' },
    { id:'market', label:'Market', icon:'market' },
  ]],
  ['Connect', [
    { id:'chat', label:'Discord', icon:'msg' },
    { id:'link', label:'HQ Link', icon:'link' },
    { id:'settings', label:'Settings', icon:'settings' },
    { id:'help', label:'Help', icon:'help' },
  ]],
];
const ALL_NAV = NAV.flatMap(([, items]) => items);
function renderNav(cur) {
  $('#nav').innerHTML = NAV.map(([h, items]) => `<div class="nav-h">${h}</div>` + items.map(n => {
    const b = S.loaded && n.badge ? n.badge() : 0;
    return `<a href="#/${n.id}" class="${cur === n.id ? 'on' : ''} ${n.gold ? 'gold' : ''}" ${cur === n.id ? 'aria-current="page"' : ''}>${ic(n.icon)}<span class="lbl">${n.label}</span>${b ? `<span class="badge ${n.tone || ''}">${b}</span>` : ''}</a>`;
  }).join('')).join('');
  const run = S.tasks.filter(t => t.state === 'working').length, slots = Number(S.settings.budget) || 2, q = S.tasks.filter(t => t.state === 'queued').length;
  $('#sideFoot').innerHTML = S.loaded ? `<a class="lane-card" href="#/settings/usage">
    <div class="lane-top"><span>${S.settings.paused ? 'Paused' : run ? `${run} of ${slots} slots working` : 'Agents idle'}</span><small>${q} queued</small></div>
    <div class="meter ${S.settings.paused ? 'vi' : ''}"><i style="width:${Math.min(100, run / slots * 100)}%"></i></div></a>` : '';
}
function renderTop(r, title) {
  $('#crumbPage').textContent = title;
  $('#gameName').textContent = U.game === 'all' ? 'All games' : gameName(U.game);
  const g = gameBy(U.game);
  $('#gpIc').innerHTML = U.game !== 'all' && g ? gameArt(g) : ic('grid');
  const n = needsYou().length, ib = $('#inboxN');
  ib.hidden = !n; ib.textContent = n;
  const sp = $('#statusPill');
  const working = S.tasks.filter(t => t.state === 'working').length;
  sp.className = 'status-pill' + (S.err ? ' err' : S.settings.paused ? ' paused' : !working ? ' off' : '');
  sp.innerHTML = `<i class="dot"></i><span>${S.err ? 'Not connected' : S.settings.paused ? 'Paused' : working ? `${working} working · updated ${ago(new Date(lastLoad).toISOString())}` : `Live · updated ${ago(new Date(lastLoad).toISOString())}`}</span>`;
}

// ================================================================ router
const route = () => {
  const parts = location.hash.replace(/^#\/?/, '').split('?')[0].split('/').filter(Boolean).map(s => { try { return decodeURIComponent(s); } catch { return s; } });
  return { page: parts[0] || 'home', a: parts[1] || '', b: parts[2] || '' };
};
const PAGES = {};
let lastHash = '', rafs = [], schedT = 0;
function schedule() { if (schedT) return; schedT = setTimeout(() => { schedT = 0; render(false); }, 16); } // a timer, not rAF: rAF stops in a hidden tab
function render(fresh = true) {
  const r = route();
  const page = PAGES[r.page] || PAGES.home;
  const v = $('#view');
  const scroll = v.scrollTop;
  const f = document.activeElement, fid = f && f.id && v.contains(f) ? f.id : null, sel = fid ? [f.selectionStart, f.selectionEnd] : null;
  const mb = $('#msgs'); U.msgsNearBottom = !mb || mb.scrollHeight - mb.scrollTop - mb.clientHeight < 90; U.msgsScroll = mb ? mb.scrollTop : 0;
  rafs.forEach(fn => fn()); rafs = [];
  const title = typeof page.title === 'function' ? page.title(r) : page.title;
  renderNav(PAGES[r.page] ? (page.nav || r.page) : 'home');
  renderTop(r, title);
  let html;
  if (S.err === 'signin') html = `<div class="page"><div class="card empty">${ic('key')}<p><b>Sign in to Agent HQ.</b> Open it from the Agent HQ shortcut on your desktop: it adds your owner key to this browser.</p></div></div>`;
  else if (!S.loaded) html = `<div class="page">${S.err ? `<div class="card empty">${ic('warn')}<p><b>Agent HQ did not answer.</b> ${esc(S.err)}</p><button class="btn" data-act="reload-state">${ic('refresh')}Try again</button></div>` : skeleton()}</div>`;
  else { try { html = `<div class="page">${page.render(r)}</div>`; } catch (e) { console.error(e); html = `<div class="page"><div class="card empty">${ic('warn')}<p><b>This page hit a snag.</b> ${esc(e.message)}</p><button class="btn" data-act="reload-state">${ic('refresh')}Reload</button></div></div>`; } }
  v.classList.toggle('anim', fresh);
  v.innerHTML = html;
  if (!fresh) v.scrollTop = scroll; else v.scrollTop = 0;
  if (fid) { const n = document.getElementById(fid); if (n) { n.focus(); try { if (sel) n.setSelectionRange(sel[0], sel[1]); } catch { /* not text */ } } }
  hydrate(v);
  if (page.after) page.after(r, fresh);
  iconPicker();
}
function onHash() {
  const h = location.hash;
  if (h === lastHash) return;
  const before = route().page; lastHash = h;
  closeLayers(true);
  $('#side').classList.remove('open');
  render(true);
  if (before) $('#view').focus({ preventScroll: true });
}
const skeleton = () => `<div class="skel" style="height:34px;width:260px;margin-bottom:12px"></div><div class="skel" style="height:16px;width:420px;margin-bottom:28px"></div><div class="grid g3">${'<div class="skel" style="height:150px"></div>'.repeat(6)}</div>`;
const loadingCard = (h = 140) => `<div class="skel" style="height:${h}px"></div>`;
const errCard = (msg, key) => `<div class="card empty">${ic('warn')}<p>${esc(msg)}</p>${key ? `<button class="btn sm" data-act="retry-load" data-key="${esc(key)}">${ic('refresh')}Try again</button>` : ''}</div>`;
const emptyCard = (icon, title, text = '', action = '') => `<div class="card empty">${ic(icon)}<p><b>${title}</b>${text ? '<br>' + text : ''}</p>${action}</div>`;
const pageHead = (title, sub, acts = '') => `<div class="page-h"><div><h1>${title}</h1>${sub ? `<p>${sub}</p>` : ''}</div>${acts ? `<div class="acts">${acts}</div>` : ''}</div>`;
const tabs = (base, cur, list) => `<nav class="tabs" aria-label="Sections">${list.map(([id, label, icon, badge]) => `<a href="#/${base}${id ? '/' + id : ''}" class="${cur === id ? 'on' : ''}">${icon ? ic(icon) : ''}${label}${badge ? `<span class="badge">${badge}</span>` : ''}</a>`).join('')}</nav>`;
const seg = (act, cur, opts, extra = '') => `<div class="seg" role="group">${opts.map(([v, l]) => `<button type="button" class="${String(cur) === String(v) ? 'on' : ''}" data-act="${act}" data-v="${esc(v)}" ${extra}>${l}</button>`).join('')}</div>`;

// ================================================================ overlays
let toastN = 0;
function toast(msg, bad = false) {
  const box = $('#toasts'), id = 't' + (++toastN);
  box.insertAdjacentHTML('beforeend', `<div class="toast ${bad ? 'err' : ''}" id="${id}">${ic(bad ? 'warn' : 'check')}<span>${esc(msg)}</span></div>`);
  hydrate(box);
  setTimeout(() => $('#' + id)?.remove(), bad ? 5200 : 2800);
}
let lastFocus = null;
function openDrawer({ title, sub = '', icon = '', body = '', foot = '' }) {
  lastFocus = document.activeElement;
  const d = $('#drawer');
  d.querySelector('.drawer').innerHTML = `<div class="dr-h">${icon}<div class="t"><h2 id="drawerTitle">${title}</h2>${sub ? `<p>${sub}</p>` : ''}</div><button class="icon-btn" data-act="close" aria-label="Close">${ic('x')}</button></div><div class="dr-b">${body}</div>${foot ? `<div class="dr-f">${foot}</div>` : ''}`;
  d.hidden = false; hydrate(d);
  d.querySelector('.icon-btn').focus();
}
const drawerBody = html => { const b = $('#drawer .dr-b'); if (b) { b.innerHTML = html; hydrate(b); } };
function openModal({ title, body = '', foot = '', wide = false }) {
  lastFocus = document.activeElement;
  const m = $('#modal');
  const box = m.querySelector('.modal');
  box.className = 'modal' + (wide ? ' wide' : '');
  box.innerHTML = `<div class="md-h"><h2 id="modalTitle">${title}</h2><button class="icon-btn" data-act="close" aria-label="Close">${ic('x')}</button></div><div class="md-b">${body}</div>${foot ? `<div class="md-f">${foot}</div>` : ''}`;
  m.hidden = false; hydrate(m);
  (box.querySelector('input,textarea,select') || box.querySelector('.icon-btn')).focus();
}
function closeLayers(all = false) {
  const m = $('#modal'), d = $('#drawer');
  if (!m.hidden) { m.hidden = true; if (!all) { lastFocus?.focus?.(); return; } }
  if (!d.hidden) { d.hidden = true; U.drawer = null; }
  $('#menu').hidden = true;
  if (!all) lastFocus?.focus?.();
}
function confirmBox({ title, text, ok = 'Confirm', tone = 'primary', act, data = {} }) {
  const attrs = Object.entries(data).map(([k, v]) => `data-${k}="${esc(v)}"`).join(' ');
  openModal({ title, body: `<p>${text}</p>`, foot: `<button class="btn ghost" data-act="close">Cancel</button><button class="btn ${tone}" data-act="${act}" ${attrs}>${ok}</button>` });
}
function openMenu(anchor, html) {
  const m = $('#menu');
  if (!m.hidden && m.dataset.for === anchor.id) { m.hidden = true; return; }
  m.innerHTML = html; m.dataset.for = anchor.id || '';
  const r = anchor.getBoundingClientRect();
  m.style.left = Math.min(r.left, innerWidth - 260) + 'px'; m.style.top = r.bottom + 6 + 'px';
  m.hidden = false; hydrate(m);
}

// ================================================================ actions (data-act="name" on any element)
const ACT = {};
document.addEventListener('click', e => {
  if ($('#side').classList.contains('open') && !e.target.closest('#side,.menu-btn')) { $('#side').classList.remove('open'); e.preventDefault(); return; }
  const el = e.target.closest('[data-act]');
  if (!el) { if (!e.target.closest('#menu,#gamePick')) $('#menu').hidden = true; return; }
  const fn = ACT[el.dataset.act];
  if (!fn) return;
  if (el.tagName === 'A' && !el.getAttribute('href')?.startsWith('#')) return;
  e.preventDefault();
  fn(el, e);
});
document.addEventListener('input', e => {
  const el = e.target;
  if (el.dataset.bind) { U[el.dataset.bind] = el.value; if (el.dataset.live) liveInput(el); }
  if (el.dataset.draft) U.draft[el.dataset.draft] = el.value;
  if (el.tagName === 'TEXTAREA' && el.classList.contains('grow')) { el.style.height = 'auto'; el.style.height = Math.min(180, el.scrollHeight) + 'px'; }
});
let liveT;
function liveInput(el) { clearTimeout(liveT); liveT = setTimeout(() => { if (el.dataset.drop) drop(el.dataset.drop); schedule(); }, Number(el.dataset.live) || 250); }
document.addEventListener('submit', e => e.preventDefault());

ACT.close = () => closeLayers();
ACT.cmdk = () => openCmdk();
ACT.menu = () => $('#side').classList.toggle('open');
ACT['reload-state'] = () => { S.err = ''; render(true); loadState(); };
ACT['retry-load'] = el => { drop(el.dataset.key); schedule(); };
ACT.go = el => { location.hash = el.dataset.to; };

$('#gamePick').addEventListener('click', e => {
  e.stopPropagation();
  openMenu($('#gamePick'), [`<button data-act="pick-game" data-v="all" class="${U.game === 'all' ? 'on' : ''}"><span class="gi">${ic('grid')}</span>All games</button>`,
    ...liveGames().map(g => `<button data-act="pick-game" data-v="${esc(g.slug)}" class="${U.game === g.slug ? 'on' : ''}"><span class="gi">${gameArt(g)}</span>${esc(g.name)}</button>`),
    '<hr>', `<button data-act="new-game"><span class="gi">${ic('plus')}</span>New game</button>`, `<button data-act="go" data-to="#/games"><span class="gi">${ic('games')}</span>All games page</button>`].join(''));
});
ACT['pick-game'] = el => { $('#menu').hidden = true; setGame(el.dataset.v); toast(el.dataset.v === 'all' ? 'Showing every game' : `Showing ${gameName(el.dataset.v)}`); };

// sending work: a message to a role becomes a task for it
async function sendTo(roleId, text, game = U.game !== 'all' ? U.game : undefined) {
  if (!text) return null;
  const r = await run(() => api('POST', '/api/messages', { role: roleId, text, ...(game ? { game } : {}) }), roleId === 'lead' ? 'Sent to the Lead' : `Sent to ${role(roleId).label}`);
  if (r) { drop('msgs:' + roleId, 'threads'); loadSoon(); }
  return r;
}

// ---------------------------------------------------------------- new task
function newTaskModal(preset = {}) {
  const g = preset.game ?? (U.game !== 'all' ? U.game : '');
  openModal({
    title: 'New task',
    body: `<p>Say what should be done. The Lead can split it up and pick the agents, or you can hand it to one agent yourself.</p>
      <div class="field"><label for="ntWho">Who does it</label><select class="select" id="ntWho"><option value="">Let the Lead plan it (recommended)</option>${S.roles.filter(r => r.enabled !== false).map(r => `<option value="${esc(r.id)}" ${preset.role === r.id ? 'selected' : ''}>${esc(r.label)}</option>`).join('')}</select></div>
      <div class="field"><label for="ntGame">For which game</label><select class="select" id="ntGame"><option value="">No game</option>${liveGames().map(x => `<option value="${esc(x.slug)}" ${x.slug === g ? 'selected' : ''}>${esc(x.name)}</option>`).join('')}</select></div>
      <div class="field"><label for="ntTitle">What should be done</label><input class="input" id="ntTitle" maxlength="200" placeholder="e.g. Add a daily reward chest to the lobby" value="${esc(preset.title || '')}"></div>
      <div class="field"><label for="ntBody">Details <span class="muted">(optional)</span></label><textarea class="textarea" id="ntBody" placeholder="What done looks like, files, references…">${esc(preset.body || '')}</textarea></div>`,
    foot: `<button class="btn ghost" data-act="close">Cancel</button><button class="btn primary" data-act="nt-submit">${ic('send')}Start it</button>`,
  });
}
ACT['new-task'] = el => newTaskModal({ role: el.dataset.role, game: el.dataset.game });
ACT['nt-submit'] = async el => {
  const who = $('#ntWho').value, game = $('#ntGame').value, title = $('#ntTitle').value.trim(), body = $('#ntBody').value.trim();
  if (!title) { $('#ntTitle').focus(); return toast('Say what should be done first', true); }
  el.disabled = true;
  const ok = who
    ? await run(() => api('POST', '/api/tasks', { role: who, title, body, ...(game ? { game } : {}) }), `Queued for the ${role(who).label}`)
    : await run(() => api('POST', '/api/messages', { role: 'lead', text: body ? `${title}\n\n${body}` : title, ...(game ? { game } : {}) }), 'Sent to the Lead to plan');
  el.disabled = false;
  if (ok) { closeLayers(); drop('msgs', 'threads', 'alltasks'); loadState(); }
};

// ================================================================ HOME
PAGES.home = {
  title: 'Home',
  render() {
    const working = gTasks().filter(t => t.state === 'working');
    const queued = gTasks().filter(t => t.state === 'queued');
    const asks = needsYou();
    const recent = gTasks().slice().sort((a, b) => stamp(b) - stamp(a));
    const groups = [
      ['Working now', 'code', recent.filter(t => t.state === 'working').slice(0, 5)],
      ['Waiting for your review', 'review', recent.filter(t => t.state === 'review').slice(0, 4)],
      ['Finished lately', 'checkc', recent.filter(t => ['done', 'failed', 'canceled'].includes(t.state)).slice(0, 5)],
      ['Up next', 'clock', recent.filter(t => t.state === 'queued').slice(-4).reverse()],
    ].filter(g => g[2].length);
    const lib = want('library', '/api/library');
    const imgs = (lib && !failed(lib) ? lib.assets || [] : []).filter(isImg).slice(-6).reverse();
    const hr = new Date().getHours();
    const hi = `${hr < 5 ? 'Late night' : hr < 12 ? 'Good morning' : hr < 18 ? 'Good afternoon' : 'Good evening'}${S.settings.ownerName ? ', ' + esc(S.settings.ownerName) : ''}`;
    const scope = U.game === 'all' ? 'across all games' : `on ${esc(gameName(U.game))}`;
    const vl = working[0];
    const games = liveGames().slice().sort((a, b) => (Date.parse(b.lastActivity || b.updatedAt) || 0) - (Date.parse(a.lastActivity || a.updatedAt) || 0)).slice(0, 4);
    return `
    <div class="hello"><div><h1>${hi}</h1><p>Here is what your studio is doing ${scope}.</p></div>
      <div class="sum"><a href="#/team"><span class="dot" style="${working.length ? '' : 'background:var(--tx3);box-shadow:none;animation:none'}"></span><b>${working.length}</b> working</a><a href="#/review">${ic('bell', 'sm')}<b>${asks.length}</b> need you</a><a href="#/tasks">${ic('clock', 'sm')}<b>${queued.length}</b> queued</a></div></div>
    <form class="ask" data-act="noop"><span class="ask-ic"></span><input id="askIn" data-draft="home" value="${esc(U.draft.home || '')}" placeholder="Ask the Lead anything, or say what to build next…" autocomplete="off" aria-label="Message the Lead"><button class="btn primary" data-act="ask-send" type="submit">Ask ${ic('right', 'sm')}</button><button class="btn ghost hide-sm" data-act="new-task" type="button">${ic('tasks')}New task</button></form>
    <div class="split">
      <section>
        <div class="sec-h">Needs you <span class="badge y">${asks.length}</span><span class="sp"></span>${asks.length > 4 ? `<a class="more" href="#/review">See all ${ic('right')}</a>` : ''}</div>
        ${asks.length ? `<div class="needs">${asks.slice(0, 4).map((a, i) => `<a class="need" href="#/review" data-act="open-ask" data-i="${i}">${av(a.role, 'sm')}<div class="t"><b>${esc(a.title)}</b><span>${esc(role(a.role).label)} · ${a.kind === 'review' ? 'Review' : a.options?.length ? `${a.options.length} options` : cap(a.kind)} · ${ago(a.createdAt)}</span></div>${a.mediaPath && isImg(a.mediaPath) ? `<img src="${mediaUrl(a.mediaPath)}" alt="">` : ''}${ic('chevr', 'sm')}</a>`).join('')}</div>` : `<div class="all-clear" style="margin-bottom:26px">${ic('checkc')}All clear. Nothing is waiting for you.</div>`}
        <div class="sec-h"><i class="dot"></i>What’s happening</div>
        <a class="galaxy" href="#/vault"><canvas id="galaxyCv" aria-hidden="true"></canvas><span class="gt">Vault</span><span class="open">Open ${ic('right', 'sm')}</span>
          <span class="gc" id="galaxyLine">${vl ? `<b>${esc(role(vl.role).label)}</b> is working on ${esc(vl.title)}` : 'Agents read the vault before they build'}</span></a>
        <div class="card feed">${groups.length ? groups.map(([h, icon, rows]) => `
          <div class="fg"><div class="fg-h">${ic(icon)}${h} <span class="x">×${rows.length}</span></div>
          ${rows.map(t => `<div class="ev" data-act="task" data-id="${esc(t.id)}" role="button" tabindex="0">${av(t.role, 'sm')}
            <div class="who"><b>${esc(role(t.role).label)}</b>·<span>${esc(gameName(t.game))}</span>·<span>${ago(t.endedAt || t.startedAt || t.createdAt)}</span></div>${t.state === 'failed' ? '<span class="tag r">Failed</span>' : ''}
            <div class="what">${ic(t.state === 'failed' ? 'x' : t.state === 'done' ? 'check' : t.state === 'working' ? 'code' : 'tasks', t.state === 'done' ? 'ok' : t.state === 'failed' ? 'bad' : '')}<span>${esc(t.title)}</span></div></div>`).join('')}</div>`).join('')
          + (imgs.length ? `<div class="fg"><div class="fg-h">${ic('image')}Latest pictures from your agents</div><div class="thumbs">${imgs.map(p => `<a href="${assetUrl(p)}" target="_blank" rel="noopener" title="${esc(p.split('/').pop())}"><img src="${assetUrl(p)}" alt="" loading="lazy"></a>`).join('')}</div></div>` : '')
          : `<div class="empty">${ic('spark')}<p><b>Nothing has happened yet.</b><br>Ask the Lead for something above, or start a task.</p><button class="btn sm" data-act="new-task">${ic('plus')}New task</button></div>`}</div>
      </section>
      <aside class="stack">
        <div class="card live"><div class="card-h"><i class="dot" style="${working.length ? '' : 'background:var(--tx3);box-shadow:none;animation:none'}"></i>Live now<span class="sp"></span><a class="more" href="#/team">Team ${ic('right')}</a></div>
          ${working.length ? working.map(t => `<div class="live-row" data-act="task" data-id="${esc(t.id)}" role="button" tabindex="0">${av(t.role)}<div class="t"><b>${esc(role(t.role).label)}</b><span>On: ${esc(t.title)}</span></div>${S.settings.paused ? ic('pause') : '<span class="spinner"></span>'}</div>`).join('')
            : `<div class="empty" style="padding:18px 10px">${ic('clock')}<p>Nobody is working${U.game === 'all' ? '' : ' on this game'} right now.${queued.length ? `<br>${plural(queued.length, 'task')} waiting to start.` : ''}</p></div>`}
          <div class="note">${ic('spark')}Agents run on your Claude plan</div></div>
        <div class="card pad qs"><div class="card-h">${ic('sliders')}Quick settings</div>
          <div class="qrow"><div class="ql">Agents <small>${S.settings.paused ? 'nothing new starts' : 'running'}</small></div><button class="btn sm ${S.settings.paused ? 'good' : ''}" style="width:100%" data-act="pause">${ic(S.settings.paused ? 'play' : 'pause')}${S.settings.paused ? 'Resume all agents' : 'Pause all agents'}</button></div>
          <div class="qrow"><div class="ql">Agents at once</div>${seg('set', S.settings.budget, [[1, '1'], [2, '2'], [3, '3'], [4, '4']], 'data-key="budget" data-type="int"')}</div>
          <div class="qrow"><div class="ql">Studios for agents</div>${seg('set', S.settings.studioLanes, [[0, 'Off'], [1, '1'], [2, '2'], ['all', 'All']], 'data-key="studioLanes" data-type="enum"')}</div>
          <div class="qrow"><div class="ql">Run mode <small>${S.settings.runMode === 'hourly' ? 'waits for the app worker' : 'starts in seconds'}</small></div>${seg('set', S.settings.runMode, [['instant', 'Instant'], ['hourly', 'Hourly']], 'data-key="runMode" data-type="enum"')}</div>
          <a class="more" href="#/settings">All settings ${ic('right')}</a></div>
        <div class="card pad"><div class="card-h">${ic('games')}Games<span class="sp"></span><button class="btn xs" data-act="new-game">${ic('plus')}New</button></div>
          ${games.length ? games.map(g => `<a class="mini-game" href="#/games/${esc(g.slug)}"><span class="gi">${gameArt(g)}</span><span class="t"><b>${esc(g.name)}</b><span>${STAGE_LBL[g.stage] || cap(g.stage)} · ${plural(g.openTasks || 0, 'open task')}</span></span>${ic('chevr', 'sm')}</a>`).join('') : '<div class="empty" style="padding:14px">No games yet.</div>'}</div>
      </aside>
    </div>`;
  },
  after() { starfield($('#galaxyCv'), false); },
};
ACT.noop = () => {};
ACT['ask-send'] = async () => {
  const inp = $('#askIn'), t = inp.value.trim();
  if (!t) { inp.focus(); return; }
  inp.disabled = true;
  const ok = await sendTo('lead', t);
  inp.disabled = false;
  if (ok) { U.draft.home = ''; location.hash = '#/lead'; }
};
ACT['open-ask'] = el => { U.rvSel = Number(el.dataset.i) || 0; location.hash = '#/review'; };
ACT.pause = async () => { const p = S.settings.paused; if (await run(() => api('POST', p ? '/api/resume' : '/api/pause'), p ? 'Agents are back to work' : 'Paused: running tasks finish, nothing new starts')) loadState(); };
ACT.set = async el => {
  const key = el.dataset.key, type = el.dataset.type, raw = el.dataset.v;
  const value = type === 'int' || type === 'number' ? Number(raw) : type === 'bool' ? raw === 'true' : type === 'enum' && /^\d+$/.test(raw) ? Number(raw) : raw;
  if (await run(() => api('POST', '/api/settings', { key, value }), 'Saved')) { S.settings[key] = value; schedule(); }
};

// ================================================================ REVIEW
PAGES.review = {
  title: r => r.a === 'history' ? 'Review history' : 'Review',
  render(r) {
    const list = needsYou();
    const head = pageHead('Review', 'Decisions, pictures and finished work waiting for your say. Your answer goes straight back to the agent.',
      list.filter(a => a.kind === 'review').length > 1 ? `<button class="btn" data-act="approve-all">${ic('check')}Approve all ${list.filter(a => a.kind === 'review').length} reviews</button>` : '');
    const t = tabs('review', r.a || '', [['', 'Waiting', 'bell', list.length || ''], ['history', 'History', 'history']]);
    if (r.a === 'history') {
      const done = S.asks.filter(a => a.state !== 'open' && inGame(askGame(a))).slice(0, 80);
      return head + t + (done.length ? `<div class="list card">${done.map(a => `<button class="li" data-act="ask-detail" data-id="${esc(a.id)}">${av(a.role, 'sm')}<div class="t"><b>${esc(a.title)}</b><span>${esc(role(a.role).label)} · ${a.state === 'dismissed' ? 'Dismissed' : 'Answered'} ${ago(a.answeredAt || a.createdAt)}${a.answer ? ' · ' + esc(answerText(a)) : ''}</span></div>${verdictTag(a)}</button>`).join('')}</div>` : emptyCard('history', 'No answered items yet.'));
    }
    if (!list.length) return head + t + `<div class="card empty" style="padding:56px 20px">${ic('checkc', 'lg')}<p><b>All clear.</b><br>Nothing is waiting for you${U.game === 'all' ? '' : ' in ' + esc(gameName(U.game))}. New decisions show up here and in the Inbox.</p></div>`;
    U.rvSel = Math.min(U.rvSel, list.length - 1);
    const a = list[U.rvSel];
    return head + t + `<div class="rv-wrap">
      <div class="rv-list">${list.map((x, i) => `<button class="rv ${i === U.rvSel ? 'on' : ''}" data-act="rv-pick" data-i="${i}"><span class="th2">${x.mediaPath && isImg(x.mediaPath) ? `<img src="${mediaUrl(x.mediaPath)}" alt="">` : av(x.role)}</span><span class="t"><b>${esc(x.title)}</b><span>${esc(role(x.role).label)} · ${ago(x.createdAt)}</span></span></button>`).join('')}</div>
      ${decidePanel(a)}</div>`;
  },
};
const answerText = a => { const o = (a.options || []).find(x => x.id === a.answer); if (o) return o.label; const s = String(a.answer || ''); return s.length > 60 ? s.slice(0, 60) + '…' : s; };
const verdictTag = a => a.verdict === 'approved' ? '<span class="tag g">Approved</span>' : a.verdict === 'changes' ? '<span class="tag y">Changes</span>' : a.verdict === 'rejected' ? '<span class="tag r">Rejected</span>' : a.verdict === 'held' ? '<span class="tag">Held</span>' : a.state === 'dismissed' ? '<span class="tag">Dismissed</span>' : '<span class="tag v">Answered</span>';
function decidePanel(a) {
  const r = role(a.role), opts = Array.isArray(a.options) ? a.options : [];
  const task = S.tasks.find(t => t.id === a.taskId);
  const kindLbl = { review:'Review', decision:'Decision', try:'Try this', approve:'Approval' }[a.kind] || cap(a.kind);
  let actions;
  if (a.kind === 'review') actions = `
    <button class="opt approve" data-act="answer" data-v="approve">${ic('check')}<span class="lbl">Approve</span><kbd>A</kbd></button>
    <button class="opt changes" data-act="ask-note" data-mode="changes">${ic('msg')}<span class="lbl">Ask for changes<small>Say what to change; it goes back to the ${esc(r.label)}.</small></span><kbd>C</kbd></button>
    <div class="note-box" id="noteBox" hidden><textarea id="noteTxt" placeholder="What should change?"></textarea><div class="row"><button class="btn sm ghost" data-act="note-cancel">Cancel</button><button class="btn sm primary" data-act="note-send">${ic('send')}<span id="noteSendL">Send back</span></button></div></div>
    <button class="opt" data-act="ask-note" data-mode="hold">${ic('pause')}<span class="lbl">Hold<small>Park it with a reason.</small></span></button>
    <button class="opt reject" data-act="ask-note" data-mode="reject">${ic('x')}<span class="lbl">Reject</span><kbd>R</kbd></button>`;
  else actions = (opts.length ? opts.map((o, i) => `<button class="opt ${o.recommended ? 'approve' : ''}" data-act="answer" data-v="${esc(o.id)}">${ic(o.recommended ? 'check' : 'chevr')}<span class="lbl">${esc(o.label)}${o.recommended ? ' <span class="tag" style="background:rgba(255,255,255,.2);color:#fff">Recommended</span>' : ''}${o.description ? `<small>${esc(o.description)}</small>` : ''}</span>${i < 9 ? `<kbd>${i + 1}</kbd>` : ''}</button>`).join('')
      : `<button class="opt approve" data-act="answer" data-v="done">${ic('check')}<span class="lbl">${a.kind === 'try' ? 'Done, I tried it' : 'OK'}</span></button>`)
    + `<div class="field" style="margin:12px 0 0"><label for="freeTxt" class="muted" style="font-weight:600">Or say it in your own words</label><div style="display:flex;gap:8px"><input class="input" id="freeTxt" placeholder="Type an answer and press Enter"><button class="btn" data-act="answer-free">${ic('send')}</button></div></div>`;
  return `<div class="decide"><div class="decide-in">
    <div class="decide-h">${av(a.role, 'lg')}<div><h2>${esc(a.title)}</h2><p>${esc(r.label)} · ${kindLbl}${task?.game ? ' · ' + esc(gameName(task.game)) : ''} · ${ago(a.createdAt)}</p></div></div>
    ${a.why ? `<p class="why">${esc(a.why)}</p>` : ''}
    ${a.mediaPath ? (isImg(a.mediaPath) ? `<a class="shot" href="${mediaUrl(a.mediaPath)}" target="_blank" rel="noopener"><img src="${mediaUrl(a.mediaPath)}" alt="Picture to review"></a>` : `<a class="btn sm" style="margin-bottom:14px" href="${mediaUrl(a.mediaPath)}" target="_blank" rel="noopener">${ic('ext')}Open the file</a>`) : ''}
    ${actions}
    <div class="row-sp" style="margin-top:14px">${task ? `<button class="btn xs ghost" data-act="task" data-id="${esc(task.id)}">${ic('tasks')}Open the task</button>` : '<span></span>'}<button class="btn xs ghost" data-act="dismiss" data-id="${esc(a.id)}">${ic('min')}Dismiss without answering</button></div>
  </div></div>`;
}
const curAsk = () => needsYou()[U.rvSel];
async function answer(value, msg) {
  const a = curAsk(); if (!a) return;
  if (await run(() => api('POST', `/api/asks/${a.id}/answer`, { answer: value }), msg || 'Answered')) loadState();
}
ACT['rv-pick'] = el => { U.rvSel = Number(el.dataset.i); schedule(); };
ACT.answer = el => { const a = curAsk(); const o = (a?.options || []).find(x => x.id === el.dataset.v); answer(el.dataset.v, el.dataset.v === 'approve' ? 'Approved' : o ? `Picked: ${o.label}` : 'Done'); };
ACT['answer-free'] = () => { const v = $('#freeTxt').value.trim(); if (!v) return $('#freeTxt').focus(); answer(v, 'Answer sent'); };
let noteMode = 'changes';
ACT['ask-note'] = el => { noteMode = el.dataset.mode; $('#noteBox').hidden = false; $('#noteTxt').placeholder = noteMode === 'changes' ? 'What should change?' : noteMode === 'hold' ? 'Why hold it?' : 'Why reject it? (optional)'; $('#noteSendL').textContent = noteMode === 'changes' ? 'Send back' : noteMode === 'hold' ? 'Hold it' : 'Reject'; $('#noteTxt').focus(); };
ACT['note-cancel'] = () => { $('#noteBox').hidden = true; };
ACT['note-send'] = () => {
  const n = $('#noteTxt').value.trim();
  if (!n && noteMode !== 'reject') return $('#noteTxt').focus();
  answer(noteMode === 'reject' ? (n ? 'reject:' + n : 'reject') : `${noteMode}:${n}`, noteMode === 'changes' ? 'Sent back with your notes' : noteMode === 'hold' ? 'Held' : 'Rejected');
};
ACT.dismiss = async el => { if (await run(() => api('POST', `/api/asks/${el.dataset.id}/dismiss`), 'Dismissed')) loadState(); };
ACT['approve-all'] = () => { const n = needsYou().filter(a => a.kind === 'review').length; confirmBox({ title: `Approve all ${n} reviews?`, text: 'Every open review in this list is approved and its task is marked done. Decisions with options stay for you to pick.', ok: `Approve ${n}`, tone: 'good', act: 'approve-all-go' }); };
ACT['approve-all-go'] = async () => { const ids = needsYou().filter(a => a.kind === 'review').map(a => a.id); closeLayers(); if (await run(() => api('POST', '/api/asks/approve-all', { ids }), `Approved ${ids.length}`)) loadState(); };
ACT['ask-detail'] = el => {
  const a = S.asks.find(x => x.id === el.dataset.id); if (!a) return;
  openDrawer({ title: esc(a.title), sub: `${esc(role(a.role).label)} · asked ${when(a.createdAt)}`, icon: av(a.role, 'lg'), body: `
    ${a.why ? `<p class="why">${esc(a.why)}</p>` : ''}${a.mediaPath && isImg(a.mediaPath) ? `<a class="shot" href="${mediaUrl(a.mediaPath)}" target="_blank" rel="noopener"><img src="${mediaUrl(a.mediaPath)}" alt=""></a>` : ''}
    <dl class="kv"><dt>Status</dt><dd>${verdictTag(a)}</dd><dt>Answer</dt><dd class="pre">${esc(a.answer ? answerText(a) : '—')}</dd>${a.verdictNote ? `<dt>Note</dt><dd class="pre">${esc(a.verdictNote)}</dd>` : ''}<dt>Answered</dt><dd>${when(a.answeredAt)}</dd></dl>
    ${(a.options || []).length ? `<div class="sec-h">Options it had</div><div class="list card">${a.options.map(o => `<div class="li">${ic(o.id === a.answer ? 'checkc' : 'min')}<div class="t"><b>${esc(o.label)}</b>${o.description ? `<span class="wrap">${esc(o.description)}</span>` : ''}</div></div>`).join('')}</div>` : ''}`,
    foot: a.taskId ? `<button class="btn" data-act="task" data-id="${esc(a.taskId)}">${ic('tasks')}Open the task</button>` : '' });
};

// ================================================================ AGENTS: Lead, Team and each agent's chat
function agentStatus(id) {
  const t = S.tasks.find(x => x.role === id && x.state === 'working') || S.tasks.find(x => x.role === id && x.state === 'review') || S.tasks.find(x => x.role === id && x.state === 'queued');
  return t ? { st: t.state, task: t } : { st: 'idle', task: null };
}
PAGES.lead = { title: 'Lead', nav: 'lead', render: () => chatPage('lead'), after: (r, fresh) => chatAfter('lead', fresh) };
PAGES.team = {
  title: r => r.a ? role(r.a).label : 'Team', nav: 'team',
  render(r) {
    if (r.a) return chatPage(r.a);
    const threads = want('threads', '/api/threads');
    const unread = id => threads && !failed(threads) ? (threads.find(t => t.role === id) || {}).unread || 0 : 0;
    const cnt = { working: 0, review: 0, queued: 0, idle: 0 };
    const cards = S.roles.map(x => { const s = agentStatus(x.id); cnt[s.st]++; return [x, s]; });
    return pageHead('Team', `${S.roles.length} agents, each with its own job. Open one to talk to it: whatever you send becomes a task for it.`, `<button class="btn primary" data-act="new-task">${ic('plus')}New task</button>`)
      + `<div class="chips"><span class="chip"><span class="dot"></span><b>${cnt.working}</b> working</span><span class="chip"><b>${cnt.review}</b> in review</span><span class="chip"><b>${cnt.queued}</b> queued</span><span class="chip"><b>${cnt.idle}</b> idle</span></div>
      <div class="grid g4">${cards.map(([x, s]) => `<a class="card pad click" href="#/team/${esc(x.id)}" style="display:flex;flex-direction:column;gap:12px;${x.enabled === false ? 'opacity:.55' : ''}">
        <div style="display:flex;gap:12px;align-items:center">${av(x.id, 'lg')}<div style="flex:1;min-width:0"><b style="display:block;font-weight:700">${esc(x.label)}</b><span style="font-size:12px">${s.st === 'idle' ? `<span class="muted">${x.enabled === false ? 'Turned off' : 'Idle'}</span>` : stChip(s.st)}</span></div>${unread(x.id) ? `<span class="badge vi" style="background:var(--vi);color:#fff">${unread(x.id)}</span>` : ''}</div>
        <div style="font-size:12.5px;color:var(--tx2);line-height:1.45;min-height:36px">${esc(x.job || '')}</div>
        ${s.task ? `<div style="font-size:12px;color:var(--tx3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">On: ${esc(s.task.title)}</div>` : ''}
        <div style="display:flex;gap:6px;flex-wrap:wrap"><span class="tag">${esc(x.engine || 'app')}</span>${x.model ? `<span class="tag v">${esc(x.model)}</span>` : ''}${x.needsStudio ? '<span class="tag c">Studio</span>' : ''}</div></a>`).join('')}</div>`;
  },
  after: (r, fresh) => { if (r.a) chatAfter(r.a, fresh); },
};
function chatPage(id) {
  const r = role(id);
  if (!S.roles.some(x => x.id === id)) return emptyCard('team', 'No such agent.', '', `<a class="btn sm" href="#/team">${ic('back')}Back to the team</a>`);
  const threads = want('threads', '/api/threads');
  const msgs = want('msgs:' + id, `/api/messages?role=${encodeURIComponent(id)}`);
  const s = agentStatus(id);
  const order = S.roles.map(x => x.id).sort((a, b) => (a === 'lead' ? -1 : b === 'lead' ? 1 : 0) || (Date.parse(thr(threads, b)?.last?.createdAt) || 0) - (Date.parse(thr(threads, a)?.last?.createdAt) || 0));
  const base = id === 'lead' ? '#/lead' : '#/team/';
  return `<div class="chat-wrap">
    <div class="card threads" aria-label="Agents">${order.map(x => { const t = thr(threads, x); return `<a class="th ${x === id ? 'on' : ''}" href="${x === 'lead' ? '#/lead' : '#/team/' + esc(x)}">${av(x, 'sm')}<span class="t"><b>${esc(role(x).label)}</b><span>${t?.last ? esc((t.last.from === 'owner' ? 'You: ' : '') + t.last.text) : 'No messages yet'}</span></span>${t?.unread && x !== id ? `<span class="badge" style="background:var(--vi);color:#fff">${t.unread}</span>` : ''}</a>`; }).join('')}</div>
    <div class="card convo">
      <div class="convo-h">${av(id)}<div class="t"><b>${esc(r.label)}</b><span>${s.task ? `${ST_LBL[s.st]}: ${esc(s.task.title)}` : esc(r.job || '')}</span></div>
        <div class="acts"><button class="btn xs" data-act="lessons" data-role="${esc(id)}">${ic('book')}Lessons</button><button class="btn xs" data-act="past-chats" data-role="${esc(id)}">${ic('history')}Past chats</button><button class="btn xs" data-act="fresh-chat" data-role="${esc(id)}">${ic('refresh')}Start fresh</button></div></div>
      <div class="msgs" id="msgs">${msgs === undefined ? `<div class="empty"><span class="spinner w"></span></div>` : failed(msgs) ? errCard(msgs.__err, 'msgs:' + id) : msgs.length ? msgs.map(m => msgHtml(m, id)).join('') : `<div class="empty">${ic('msg')}<p><b>No messages yet.</b><br>${id === 'lead' ? 'Tell the Lead what you want built; it plans the work and hands it to the right agents.' : `Ask the ${esc(r.label)} for something. It becomes a task for it.`}</p></div>`}</div>
      <form class="compose" data-act="noop"><textarea class="grow" id="compose" data-draft="${esc(id)}" placeholder="Message ${esc(r.label)}… (Enter sends, Shift+Enter for a new line)" aria-label="Message">${esc(U.draft[id] || '')}</textarea><button class="btn primary" data-act="chat-send" data-role="${esc(id)}" type="submit">${ic('send')}Send</button></form>
    </div></div>`;
}
const thr = (threads, id) => threads && !failed(threads) ? threads.find(t => t.role === id) : null;
function msgHtml(m, id) {
  const me = m.from === 'owner', sys = m.from === 'system';
  const imgs = (m.attachPaths || []).filter(isImg);
  return `<div class="msg ${me ? 'me' : sys ? 'sys' : ''}">${me || sys ? '' : av(id, 'sm')}<div style="min-width:0">${sys ? '' : `<div class="meta">${me ? 'You' : esc(role(id).label)} · ${ago(m.createdAt)}</div>`}<div class="bub">${esc(m.text)}${imgs.length ? `<div class="thumbs" style="padding:8px 0 0">${imgs.map(p => `<a href="${mediaUrl(p)}" target="_blank" rel="noopener"><img src="${mediaUrl(p)}" alt=""></a>`).join('')}</div>` : ''}</div>${m.taskId ? `<button class="btn xs ghost" style="margin-top:4px" data-act="task" data-id="${esc(m.taskId)}">${ic('tasks')}Task</button>` : ''}</div></div>`;
}
const readMarked = {};
const seenCount = {};
function chatAfter(id, fresh) {
  const box = $('#msgs'), n = Array.isArray(X['msgs:' + id]) ? X['msgs:' + id].length : -1;
  // stay where the owner scrolled, unless the chat just opened, a message arrived, or they were already at the bottom
  if (box) box.scrollTop = fresh || U.msgsNearBottom || seenCount[id] !== n ? box.scrollHeight : U.msgsScroll;
  seenCount[id] = n;
  const t = thr(X.threads, id);
  if (t?.unread && !readMarked[id]) { readMarked[id] = 1; api('POST', `/api/threads/${encodeURIComponent(id)}/read`).then(() => { delete readMarked[id]; drop('threads'); schedule(); }).catch(() => { delete readMarked[id]; }); }
}
ACT['chat-send'] = async el => {
  const id = el.dataset.role, box = $('#compose'), t = box.value.trim();
  if (!t) return box.focus();
  box.disabled = true;
  const ok = await sendTo(id, t);
  box.disabled = false;
  if (ok) { U.draft[id] = ''; box.value = ''; schedule(); setTimeout(() => $('#compose')?.focus(), 50); }
};
document.addEventListener('keydown', e => {
  if (e.target.id === 'compose' && e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); $('[data-act="chat-send"]')?.click(); }
  if (e.target.id === 'freeTxt' && e.key === 'Enter') { e.preventDefault(); ACT['answer-free'](); }
});
ACT['fresh-chat'] = el => confirmBox({ title: `Start a fresh chat with ${esc(role(el.dataset.role).label)}?`, text: 'The current conversation moves to Past chats, and the agent starts without its old context. Lessons it learned stay.', ok: 'Start fresh', act: 'fresh-go', data: { role: el.dataset.role } });
ACT['fresh-go'] = async el => { closeLayers(); if (await run(() => api('POST', `/api/messages/${encodeURIComponent(el.dataset.role)}/reset`), 'New conversation started')) { drop('msgs:' + el.dataset.role, 'threads'); schedule(); } };
ACT.lessons = async el => {
  const id = el.dataset.role, r = role(id);
  openDrawer({ title: `What the ${esc(r.label)} has learned`, sub: 'Lessons and your corrections go into every brief this agent gets.', icon: av(id, 'lg'), body: `<div class="empty"><span class="spinner w"></span></div>` });
  let mem, prefs;
  try { [mem, prefs] = await Promise.all([api('GET', `/api/memory/${id}`), api('GET', `/api/memory/${id}/preferences`).catch(() => ({ preferences: [] }))]); } catch (e) { return drawerBody(errCard(e.message)); }
  const P2 = prefs.preferences || [];
  drawerBody(`
    <div class="sec-h">Teach it something</div>
    <div style="display:flex;gap:8px;margin-bottom:6px"><input class="input" id="lessonIn" maxlength="300" placeholder="e.g. Always test on a phone layout before asking for review"><button class="btn primary" data-act="lesson-add" data-role="${esc(id)}">${ic('plus')}Add</button></div>
    <small class="muted">One short sentence. It is saved to this agent's memory file.</small>
    <div class="sec-h">Lessons <span class="badge">${mem.lessons.length}</span></div>
    ${mem.lessons.length ? `<div class="list card">${mem.lessons.slice().reverse().map(l => `<div class="li">${ic('book')}<div class="t"><b style="white-space:normal">${esc(l.text)}</b><span>${esc(l.date)}</span></div></div>`).join('')}</div>` : '<p class="muted">No lessons yet.</p>'}
    <div class="sec-h">Your corrections <span class="badge">${(mem.corrections || []).length}</span></div>
    ${(mem.corrections || []).length ? `<div class="list card">${mem.corrections.slice().reverse().map(c => `<div class="li">${ic(c.kind === 'preference' ? 'check' : 'pen')}<div class="t"><b style="white-space:normal">${esc(c.text)}</b><span>${esc(cap(c.kind || 'correction'))}${c.game ? ' · ' + esc(gameName(c.game)) : ''} · ${esc(c.date || '')}</span></div>${c.id ? `<button class="btn xs ghost" data-act="corr-del" data-role="${esc(id)}" data-id="${esc(c.id)}" aria-label="Remove">${ic('trash')}</button>` : ''}</div>`).join('')}</div>` : '<p class="muted">None yet. When you ask for changes or reject work, it is remembered here.</p>'}
    <div class="sec-h">Preferences <span class="badge">${P2.length}</span></div>
    ${P2.length ? `<div class="list card">${P2.map(p => `<div class="li">${ic('spark')}<div class="t"><b style="white-space:normal">${esc(p.text)}</b><span>${esc(p.date || '')}</span></div><button class="btn xs ghost" data-act="pref-del" data-role="${esc(id)}" data-id="${esc(p.id)}" aria-label="Remove">${ic('trash')}</button></div>`).join('')}</div>` : '<p class="muted">None yet.</p>'}`);
};
ACT['lesson-add'] = async el => { const v = $('#lessonIn').value.trim(); if (!v) return $('#lessonIn').focus(); if (await run(() => api('POST', `/api/memory/${el.dataset.role}`, { lesson: v }), 'Lesson saved')) ACT.lessons(el); };
ACT['corr-del'] = async el => { if (await run(() => api('DELETE', `/api/memory/${el.dataset.role}/corrections/${el.dataset.id}`), 'Removed')) ACT.lessons(el); };
ACT['pref-del'] = async el => { if (await run(() => api('DELETE', `/api/memory/${el.dataset.role}/preferences/${el.dataset.id}`), 'Removed')) ACT.lessons(el); };
ACT['past-chats'] = async el => {
  const id = el.dataset.role;
  openDrawer({ title: `Past chats with ${esc(role(id).label)}`, sub: 'Earlier conversations, kept when you started fresh.', icon: av(id, 'lg'), body: '<div class="empty"><span class="spinner w"></span></div>' });
  let arcs; try { arcs = await api('GET', `/api/threads/${id}/archives`); } catch (e) { return drawerBody(errCard(e.message)); }
  drawerBody(arcs.length ? `<div class="list card">${arcs.map(a => `<button class="li" data-act="past-open" data-role="${esc(id)}" data-id="${esc(a.id)}">${ic('history')}<div class="t"><b>${esc(a.preview || 'Conversation')}</b><span>${when(a.startedAt)} to ${when(a.endedAt)} · ${plural(a.count || 0, 'message')}</span></div>${ic('chevr', 'sm')}</button>`).join('')}</div>` : emptyCard('history', 'No past chats yet.'));
};
ACT['past-open'] = async el => {
  let m; try { m = await api('GET', `/api/messages?role=${el.dataset.role}&archive=${el.dataset.id}`); } catch (e) { return toast(e.message, true); }
  drawerBody(`<button class="btn xs" data-act="past-chats" data-role="${esc(el.dataset.role)}" style="margin-bottom:12px">${ic('back')}All past chats</button><div class="msgs" style="padding:0">${m.map(x => msgHtml(x, el.dataset.role)).join('') || '<p class="muted">Empty.</p>'}</div>`);
};

// ================================================================ TASKS
PAGES.tasks = {
  title: 'Tasks',
  render(r) {
    if (r.a && U.openedFromHash !== r.a) { U.openedFromHash = r.a; setTimeout(() => openTask(r.a), 0); }
    const all = gTasks();
    const q = U.tq.trim().toLowerCase();
    const F = { open: OPEN, working: t => t.state === 'working', review: t => t.state === 'review', queued: t => t.state === 'queued', failed: t => t.state === 'failed', done: t => ['done', 'canceled'].includes(t.state), all: () => true };
    const list = all.filter(F[U.tf] || OPEN).filter(t => (!U.trole || t.role === U.trole) && (!q || `${t.title} ${t.body || ''} ${role(t.role).label}`.toLowerCase().includes(q)));
    const count = k => all.filter(F[k]).length;
    const filters = [['open', 'Open'], ['working', 'Working'], ['review', 'In review'], ['queued', 'Queued'], ['failed', 'Failed'], ['done', 'Done'], ['all', 'All']];
    const row = t => `<div class="task ${t.state === 'working' ? 'working' : ''}" data-act="task" data-id="${esc(t.id)}" role="button" tabindex="0">${av(t.role)}
      <div class="t"><b>${esc(t.title)}</b><span>${esc(role(t.role).label)} · ${esc(gameName(t.game))} · ${ago(t.endedAt || t.startedAt || t.createdAt)}${t.attempt > 1 ? ` · try ${t.attempt}` : ''}${t.engine ? ' · ' + esc(t.engine) : ''}</span></div>
      ${stChip(t.state)}${ic('chevr', 'sm')}</div>`;
    let body;
    if (!list.length) body = emptyCard(U.tf === 'open' ? 'checkc' : 'search', U.tf === 'open' && !q ? 'Nothing open right now.' : 'No tasks match.', U.tf === 'open' && !q ? 'Start one, or ask the Lead on Home.' : '', U.tf === 'open' && !q ? `<button class="btn sm" data-act="new-task">${ic('plus')}New task</button>` : '');
    else if (U.tf === 'open') body = [['working', 'Working now'], ['review', 'Waiting for review'], ['queued', 'Queued']].map(([s, h]) => { const rows = list.filter(t => t.state === s); return rows.length ? `<div class="group-h">${h} <span class="badge ${s === 'working' ? 'g' : s === 'review' ? 'y' : ''}">${rows.length}</span></div>${rows.map(row).join('')}` : ''; }).join('');
    else body = list.slice().sort((a, b) => stamp(b) - stamp(a)).slice(0, 200).map(row).join('') + (list.length > 200 ? `<p class="muted" style="text-align:center">Showing the newest 200 of ${list.length}.</p>` : '');
    return pageHead('Tasks', `${count('open')} open ${U.game === 'all' ? 'across all games' : 'in ' + esc(gameName(U.game))}. Click a task for its details, log and actions.`,
      `${count('done') ? `<button class="btn ghost" data-act="clear-finished">${ic('archive')}Clear finished</button>` : ''}<button class="btn primary" data-act="new-task">${ic('plus')}New task</button>`)
      + `<div class="toolbar"><label class="search-box">${ic('search')}<input id="tq" data-bind="tq" data-live="150" value="${esc(U.tq)}" placeholder="Search tasks" aria-label="Search tasks"></label>
        <select class="select" id="trole" aria-label="Agent"><option value="">Every agent</option>${S.roles.map(x => `<option value="${esc(x.id)}" ${U.trole === x.id ? 'selected' : ''}>${esc(x.label)}</option>`).join('')}</select></div>
      <div class="chips">${filters.map(([k, l]) => `<button class="chip ${U.tf === k ? 'on' : ''}" data-act="tf" data-v="${k}">${l} <b>${count(k)}</b></button>`).join('')}</div>${body}`;
  },
};
document.addEventListener('change', e => {
  if (e.target.id === 'trole') { U.trole = e.target.value; schedule(); }
  if (e.target.id === 'sortSel') { U.sortId = e.target.value; schedule(); }
});
document.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[role="button"][data-act]')) { e.preventDefault(); e.target.click(); } });
ACT.tf = el => { U.tf = el.dataset.v; schedule(); };
ACT['clear-finished'] = () => confirmBox({ title: 'Clear finished tasks?', text: 'Done, failed and canceled tasks leave the board. Nothing is deleted from their games.', ok: 'Clear them', act: 'clear-go' });
ACT['clear-go'] = async () => { closeLayers(); if (await run(() => api('POST', '/api/tasks/clear-finished'), 'Finished tasks cleared')) loadState(); };
ACT.task = el => openTask(el.dataset.id);
async function openTask(id) {
  const local = S.tasks.find(t => t.id === id);
  U.drawer = id;
  const head = t => ({ title: esc(t.title), sub: `${esc(role(t.role).label)} · ${esc(gameName(t.game))} · created ${when(t.createdAt)}`, icon: av(t.role, 'lg') });
  openDrawer({ ...(local ? head(local) : { title: 'Task', sub: id }), body: '<div class="empty"><span class="spinner w"></span></div>' });
  let t;
  try { t = await api('GET', `/api/tasks/${encodeURIComponent(id)}`); } catch (e) { return drawerBody(errCard(e.message)); }
  if (U.drawer !== id) return;
  const parent = t.parentId ? S.tasks.find(x => x.id === t.parentId) : null;
  const kids = S.tasks.filter(x => x.parentId === t.id);
  const foot = [
    `<button class="btn" data-act="go" data-to="${t.role === 'lead' ? '#/lead' : '#/team/' + esc(t.role)}">${ic('msg')}Message ${esc(role(t.role).label)}</button>`,
    ['queued', 'working', 'review'].includes(t.state) ? `<button class="btn bad" data-act="task-cancel" data-id="${esc(t.id)}">${ic('x')}Cancel</button>` : '',
    ['failed', 'canceled', 'done'].includes(t.state) ? `<button class="btn" data-act="task-retry" data-id="${esc(t.id)}">${ic('refresh')}Run again</button>` : '',
  ].join('');
  const d = $('#drawer .drawer'); if (!d) return;
  d.querySelector('.dr-h h2').innerHTML = esc(t.title);
  d.querySelector('.dr-h p').innerHTML = `${esc(role(t.role).label)} · ${esc(gameName(t.game))} · created ${when(t.createdAt)}`;
  drawerBody(`
    <div style="display:flex;gap:8px;align-items:center;margin-bottom:16px">${stChip(t.state)}${t.attempt > 1 ? `<span class="tag">Try ${t.attempt}</span>` : ''}${t.gateFor ? '<span class="tag v">Check</span>' : ''}${t.needsStudio ? '<span class="tag c">Uses Studio</span>' : ''}</div>
    <dl class="kv">
      <dt>Agent</dt><dd>${esc(role(t.role).label)}</dd>
      <dt>Game</dt><dd><select class="select" id="taskGame" data-id="${esc(t.id)}" style="height:34px;max-width:280px"><option value="">No game</option>${liveGames().map(g => `<option value="${esc(g.slug)}" ${g.slug === t.game ? 'selected' : ''}>${esc(g.name)}</option>`).join('')}</select></dd>
      <dt>Engine</dt><dd>${esc(t.engine || '—')}${t.model ? ' · ' + esc(t.model) : ''}</dd>
      <dt>Started</dt><dd>${when(t.startedAt)}</dd><dt>Ended</dt><dd>${when(t.endedAt)}</dd>
      ${t.costUsd != null ? `<dt>Cost</dt><dd>$${Number(t.costUsd).toFixed(2)}</dd>` : ''}
      <dt>Asked by</dt><dd>${esc(t.createdBy === 'owner' ? 'You' : role(t.createdBy).label || t.createdBy || '—')}</dd>
      ${parent ? `<dt>Part of</dt><dd><a href="#" data-act="task" data-id="${esc(parent.id)}" style="color:var(--vi2)">${esc(parent.title)}</a></dd>` : ''}
    </dl>
    ${t.error ? `<div class="sec-h" style="color:var(--rd)">Error</div><div class="block pre" style="border-color:rgba(255,107,122,.3)">${esc(t.error)}</div>` : ''}
    ${t.summary ? `<div class="sec-h">What it did</div><div class="block pre">${esc(t.summary)}</div>` : ''}
    <div class="sec-h">The ask</div><div class="block pre">${esc(t.body || t.title)}</div>
    ${kids.length ? `<div class="sec-h">Tasks it started <span class="badge">${kids.length}</span></div><div class="list card">${kids.map(k => `<button class="li" data-act="task" data-id="${esc(k.id)}">${av(k.role, 'sm')}<div class="t"><b>${esc(k.title)}</b><span>${esc(role(k.role).label)}</span></div>${stChip(k.state)}</button>`).join('')}</div>` : ''}
    <div class="sec-h">Activity log<span class="sp"></span><button class="btn xs" data-act="task-log" data-id="${esc(t.id)}">${ic('refresh')}Load</button><button class="btn xs ghost" data-act="task-brief" data-id="${esc(t.id)}">${ic('book')}Brief it got</button></div>
    <div id="taskLog"><p class="muted" style="font-size:13px">Press Load to read what the agent did, step by step.</p></div>`);
  $('#drawer .dr-f')?.remove();
  d.insertAdjacentHTML('beforeend', `<div class="dr-f">${foot}</div>`); hydrate(d);
  if (['working', 'done', 'failed'].includes(t.state)) ACT['task-log']({ dataset: { id: t.id } });
}
document.addEventListener('change', async e => {
  if (e.target.id !== 'taskGame') return;
  const v = e.target.value;
  if (await run(() => api('POST', `/api/tasks/${e.target.dataset.id}/game`, { game: v || null }), v ? `Moved to ${gameName(v)}` : 'Moved out of every game')) loadState();
});
ACT['task-cancel'] = async el => { if (await run(() => api('POST', `/api/tasks/${el.dataset.id}/cancel`), 'Canceled')) { loadState(); openTask(el.dataset.id); } };
ACT['task-retry'] = async el => { if (await run(() => api('POST', `/api/tasks/${el.dataset.id}/retry`), 'Queued again')) { loadState(); openTask(el.dataset.id); } };
ACT['task-brief'] = async el => {
  const box = $('#taskLog'); if (!box) return;
  box.innerHTML = '<div class="empty"><span class="spinner w"></span></div>';
  try { const b = await api('GET', `/api/tasks/${el.dataset.id}/brief`); box.innerHTML = `<div class="block pre mono" style="max-height:480px">${esc(typeof b === 'string' ? b : b.brief || b.text || JSON.stringify(b, null, 2))}</div>`; }
  catch (e) { box.innerHTML = errCard(e.message); hydrate(box); }
};
ACT['task-log'] = async el => {
  const box = $('#taskLog'); if (!box) return;
  box.innerHTML = '<div class="empty"><span class="spinner w"></span></div>';
  let L; try { L = await api('GET', `/api/tasks/${el.dataset.id}/log`); } catch (e) { box.innerHTML = errCard(e.message); return hydrate(box); }
  const items = [];
  for (const line of L.lines || []) {
    let j; try { j = JSON.parse(line); } catch { if (String(line).trim()) items.push(['res', 'min', esc(String(line).slice(0, 400))]); continue; }
    const content = j.message?.content;
    if (j.type === 'assistant' && Array.isArray(content)) for (const c of content) {
      if (c.type === 'text' && c.text?.trim()) items.push(['say', 'msg', esc(c.text.trim().slice(0, 1200))]);
      if (c.type === 'tool_use') { const inp = c.input || {}; const hint = inp.file_path || inp.path || inp.command || inp.pattern || inp.query || inp.url || inp.title || inp.skill || ''; items.push(['tool', 'code', `<code>${esc(c.name)}</code> ${esc(String(hint).slice(0, 160))}`]); }
    }
    else if (j.type === 'result') items.push(['say', 'checkc', `<b>Finished</b>${j.total_cost_usd != null ? ` · $${Number(j.total_cost_usd).toFixed(2)}` : ''}${j.num_turns ? ` · ${j.num_turns} turns` : ''}${j.result ? '<br>' + esc(String(j.result).slice(0, 1200)) : ''}`]);
    else if (j.type === 'system' && j.subtype === 'init') items.push(['res', 'play', `Started${j.model ? ' on ' + esc(j.model) : ''}`]);
  }
  box.innerHTML = items.length ? `<div class="log">${items.slice(-160).map(([k, i, h]) => `<div class="log-i ${k}">${ic(i)}<div class="pre" style="min-width:0">${h}</div></div>`).join('')}</div>` : '<p class="muted" style="font-size:13px">No activity recorded yet.</p>';
  hydrate(box);
};

// ================================================================ GAMES
PAGES.games = {
  title: r => r.a ? gameName(r.a) : 'Games',
  render(r) {
    if (r.a) return gamePage(r.a, r.b || '');
    const list = S.games.filter(g => U.showArchived ? g.archivedAt : !g.archivedAt);
    const archived = S.games.filter(g => g.archivedAt).length;
    return pageHead('Games', 'Every game the studio is making, where it sits in the pipeline, and what is open on it.',
      `${archived ? `<button class="btn ghost" data-act="toggle-archived">${ic('archive')}${U.showArchived ? 'Show active' : `Archived (${archived})`}</button>` : ''}<button class="btn primary" data-act="new-game">${ic('plus')}New game</button>`)
      + (list.length ? `<div class="grid g3">${list.map(g => { const si = STAGES.indexOf(g.stage); return `
        <a class="card click game-c" href="#/games/${esc(g.slug)}">
          <div class="cov">${gameArt(g)}<span class="stage tag" style="background:rgba(10,8,16,.75);color:#fff;backdrop-filter:blur(6px)">${STAGE_LBL[g.stage] || cap(g.stage)}</span></div>
          <div class="bd"><b>${esc(g.name)}</b><p>${esc(g.nextStep || g.note || 'No next step written yet.')}</p>
            <div class="row"><span class="tag">v${esc(g.version)}</span>${g.openTasks ? `<span class="tag g">${plural(g.openTasks, 'open task')}</span>` : '<span class="tag">Nothing open</span>'}${(g.todos || []).length ? `<span class="tag y">${(g.todos || []).length} for you</span>` : ''}${g.isPublic ? '<span class="tag c">Public</span>' : ''}${g.slug === U.game ? '<span class="tag v">Selected</span>' : ''}</div>
            <div class="stages" title="${STAGE_LBL[g.stage]}">${STAGES.map((s, i) => `<i class="${i < si ? 'on' : i === si ? 'now' : ''}"></i>`).join('')}</div></div></a>`; }).join('')}</div>`
        : emptyCard('games', U.showArchived ? 'No archived games.' : 'No games yet.', U.showArchived ? '' : 'Create one, or approve a pitch and the Lead sets it up.', U.showArchived ? '' : `<button class="btn sm primary" data-act="new-game">${ic('plus')}New game</button>`));
  },
};
ACT['toggle-archived'] = () => { U.showArchived = !U.showArchived; schedule(); };
function gamePage(slug, tab) {
  const g = gameBy(slug);
  if (!g) return emptyCard('games', 'That game was not found.', '', `<a class="btn sm" href="#/games">${ic('back')}All games</a>`);
  const si = STAGES.indexOf(g.stage);
  const reqs = S.stageRequests.filter(x => x.game === slug);
  const head = `<a class="btn xs ghost" href="#/games" style="margin-bottom:14px">${ic('back')}All games</a>
    <div class="ghero"><div class="gi">${gameArt(g)}</div><div class="t"><h1>${esc(g.name)}</h1>
      <div class="row"><span class="tag v">${STAGE_LBL[g.stage] || cap(g.stage)}</span><span class="tag">Version ${esc(g.version)}${g.versionType ? ' · ' + esc(g.versionType) : ''}</span>${g.isPublic ? '<span class="tag c">Public</span>' : '<span class="tag">Private</span>'}${g.archivedAt ? '<span class="tag y">Archived</span>' : ''}${g.universeId ? `<span class="tag">Universe ${esc(g.universeId)}</span>` : ''}</div></div>
      <div class="acts">${U.game !== slug ? `<button class="btn" data-act="pick-game" data-v="${esc(slug)}">${ic('eye')}Focus on this game</button>` : ''}<button class="btn primary" data-act="new-task" data-game="${esc(slug)}">${ic('plus')}New task</button></div></div>`
    + tabs('games/' + slug, tab, [['', 'Overview', 'info'], ['pipeline', 'Pipeline', 'layers', reqs.length || ''], ['live', 'Live numbers', 'pulse'], ['gate', 'Publish gate', 'lock']]);
  if (tab === 'pipeline') return head + gamePipeline(g, si, reqs);
  if (tab === 'live') return head + gameLive(g);
  if (tab === 'gate') return head + gameGate(g);
  const tasks = S.tasks.filter(t => t.game === slug);
  const open = tasks.filter(OPEN).sort((a, b) => stamp(b) - stamp(a));
  const done = tasks.filter(t => !OPEN(t)).sort((a, b) => stamp(b) - stamp(a)).slice(0, 6);
  const todos = g.todos || [];
  const cl = g.changelog || { heading: '', bullets: [] };
  return head + `<div class="split"><section class="stack">
    <div class="card pad"><div class="card-h">${ic('flag')}Next step and notes</div>
      <div class="field"><label for="gNext">Next step</label><input class="input" id="gNext" maxlength="300" value="${esc(g.nextStep || '')}" placeholder="What should happen next on this game?"></div>
      <div class="field"><label for="gNote">Note</label><textarea class="textarea" id="gNote" maxlength="2000" placeholder="Anything the team should know">${esc(g.note || '')}</textarea></div>
      <div class="grid g2"><div class="field"><label for="gName">Name</label><input class="input" id="gName" maxlength="100" value="${esc(g.name)}"></div><div class="field"><label for="gUni">Roblox universe id</label><input class="input" id="gUni" inputmode="numeric" value="${esc(g.universeId || '')}" placeholder="Digits only, for live numbers"></div></div>
      <div class="grid g2"><div class="field"><label for="gVer">Version</label><input class="input" id="gVer" type="number" min="1" max="9999" value="${esc(g.version)}"></div><div class="field"><label for="gVerT">Version label</label><input class="input" id="gVerT" maxlength="40" value="${esc(g.versionType || '')}" placeholder="e.g. Alpha, Update 3"></div></div>
      <button class="btn primary" data-act="game-save" data-slug="${esc(slug)}">${ic('check')}Save changes</button></div>
    <div class="card pad"><div class="card-h">${ic('history')}What is new in this version</div>
      <div class="field"><label for="gClH">Heading</label><input class="input" id="gClH" maxlength="200" value="${esc(cl.heading || '')}" placeholder="e.g. The heist update"></div>
      <div class="field"><label for="gClB">Changes <span class="muted">(one per line)</span></label><textarea class="textarea" id="gClB" placeholder="New vault room&#10;Faster trucks">${esc((cl.bullets || []).join('\n'))}</textarea></div>
      <button class="btn" data-act="game-changelog" data-slug="${esc(slug)}">${ic('check')}Save changelog</button></div>
  </section><aside class="stack">
    <div class="card pad"><div class="card-h">${ic('bell')}Waiting for you <span class="badge y">${todos.length}</span></div>${todos.length ? `<div class="list">${todos.map(a => `<a class="li" href="#/review">${av(a.role, 'sm')}<div class="t"><b>${esc(a.title)}</b><span>${esc(role(a.role).label)} · ${ago(a.createdAt)}</span></div></a>`).join('')}</div>` : '<p class="muted" style="margin:0">Nothing for you on this game.</p>'}</div>
    <div class="card pad"><div class="card-h">${ic('tasks')}Open work <span class="badge g">${open.length}</span><span class="sp"></span><button class="btn xs" data-act="game-tasks" data-slug="${esc(slug)}">All ${ic('right')}</button></div>${open.length ? `<div class="list">${open.slice(0, 8).map(t => `<button class="li" data-act="task" data-id="${esc(t.id)}">${av(t.role, 'sm')}<div class="t"><b>${esc(t.title)}</b><span>${esc(role(t.role).label)}</span></div>${stChip(t.state)}</button>`).join('')}</div>` : '<p class="muted" style="margin:0">Nothing open.</p>'}
      ${done.length ? `<div class="sec-h" style="margin-top:16px">Finished lately</div><div class="list">${done.map(t => `<button class="li" data-act="task" data-id="${esc(t.id)}">${av(t.role, 'sm')}<div class="t"><b>${esc(t.title)}</b><span>${ago(t.endedAt || t.createdAt)}</span></div>${stChip(t.state)}</button>`).join('')}</div>` : ''}</div>
    <div class="card pad"><div class="card-h">${ic('studio')}Game tools</div><div class="stack" style="gap:8px">
      <button class="btn" data-act="game-play" data-slug="${esc(slug)}">${ic('play')}Build and open in Studio</button>
      <button class="btn" data-act="game-icon" data-slug="${esc(slug)}">${ic('image')}${g.icon ? 'Change the icon' : 'Pick an icon'}</button>
      <button class="btn ghost" data-act="game-archive" data-slug="${esc(slug)}">${ic('archive')}${g.archivedAt ? 'Restore from the archive' : 'Move to the archive'}</button></div>
      <p class="muted" style="font-size:12px;margin:10px 0 0">Build and open uses Rojo to make a place file from the repo and opens it. It never publishes.</p></div>
  </aside></div>`;
}
ACT['game-tasks'] = el => { setGame(el.dataset.slug); U.tf = 'open'; location.hash = '#/tasks'; };
ACT['game-save'] = async el => {
  const slug = el.dataset.slug, uni = $('#gUni').value.trim();
  if (uni && !/^\d{1,15}$/.test(uni)) return toast('The universe id is digits only', true);
  const body = { name: $('#gName').value.trim(), nextStep: $('#gNext').value.trim(), note: $('#gNote').value.trim(), version: Number($('#gVer').value) || 1, versionType: $('#gVerT').value.trim(), universeId: uni || null };
  if (!body.name) return toast('The game needs a name', true);
  if (await run(() => api('PATCH', `/api/games/${encodeURIComponent(slug)}`, body), 'Saved')) loadState();
};
ACT['game-changelog'] = async el => {
  const bullets = $('#gClB').value.split('\n').map(s => s.trim()).filter(Boolean).slice(0, 30);
  if (await run(() => api('PATCH', `/api/games/${encodeURIComponent(el.dataset.slug)}`, { changelog: { heading: $('#gClH').value.trim(), bullets } }), 'Changelog saved')) loadState();
};
ACT['game-play'] = async el => { const r = await run(() => api('POST', `/api/games/${encodeURIComponent(el.dataset.slug)}/play`), 'Building the place: Studio opens in a moment'); if (r?.file) toast('Built ' + r.file.split(/[\\/]/).pop()); };
ACT['game-archive'] = el => { const g = gameBy(el.dataset.slug); confirmBox({ title: g.archivedAt ? `Restore ${esc(g.name)}?` : `Archive ${esc(g.name)}?`, text: g.archivedAt ? 'It comes back to the Games page and the game menu.' : 'It leaves the Games page and the game menu. Nothing is deleted, and you can restore it.', ok: g.archivedAt ? 'Restore' : 'Archive', act: 'game-archive-go', data: { slug: g.slug } }); };
ACT['game-archive-go'] = async el => { const g = gameBy(el.dataset.slug); closeLayers(); if (await run(() => api('POST', `/api/games/${encodeURIComponent(g.slug)}/archive`, { archived: !g.archivedAt }), g.archivedAt ? 'Restored' : 'Archived')) { if (!g.archivedAt && U.game === g.slug) setGame('all'); loadState(); } };
function newGameModal() {
  openModal({ title: 'New game', body: `<p>Give it a working title. You can rename it later. Agents start building once you send it work.</p>
    <div class="field"><label for="ngName">Name</label><input class="input" id="ngName" maxlength="100" placeholder="e.g. Steal a Vault"></div>
    <div class="field"><label for="ngSlug">Short id</label><input class="input" id="ngSlug" maxlength="40" placeholder="steal-a-vault"><small>Lowercase letters, digits and dashes. Used in folders and links.</small></div>`,
    foot: `<button class="btn ghost" data-act="close">Cancel</button><button class="btn primary" data-act="ng-submit">${ic('plus')}Create game</button>` });
  const n = $('#ngName'), s = $('#ngSlug'); let touched = false;
  n.addEventListener('input', () => { if (!touched) s.value = slugify(n.value); });
  s.addEventListener('input', () => { touched = true; });
}
ACT['new-game'] = () => { $('#menu').hidden = true; newGameModal(); };
ACT['ng-submit'] = async el => {
  const name = $('#ngName').value.trim(), slug = slugify($('#ngSlug').value || name);
  if (!name) return $('#ngName').focus();
  if (slug.length < 2) return toast('The short id needs at least two letters or digits', true);
  el.disabled = true;
  const g = await run(() => api('POST', '/api/games', { name, slug }), `${name} created`);
  el.disabled = false;
  if (g) { closeLayers(); await loadState(); location.hash = '#/games/' + slug; }
};
function gamePipeline(g, si, reqs) {
  const hist = want('stagereq:' + g.slug, `/api/stage-requests?game=${encodeURIComponent(g.slug)}`);
  const past = hist && !failed(hist) ? hist.filter(x => !['open', 'held'].includes(x.state)) : [];
  return `<div class="pipe">${STAGES.map((s, i) => `<div class="${i < si ? 'done' : i === si ? 'now' : ''}"><b>${i + 1}</b>${STAGE_LBL[s]}</div>`).join('')}</div>
    <div class="sec-h">Stage requests waiting for you <span class="badge y">${reqs.length}</span></div>
    ${reqs.length ? reqs.map(x => `<div class="card pad" style="margin-bottom:10px"><div class="card-h">${av(x.role, 'sm')}${esc(role(x.role).label)} asks to move from <span class="tag">${STAGE_LBL[x.fromStage]}</span> to <span class="tag v">${STAGE_LBL[x.toStage]}</span><span class="sp"></span>${x.state === 'held' ? '<span class="tag y">Held</span>' : ''}<span class="muted" style="font-size:12px;font-weight:500">${ago(x.createdAt)}</span></div>
      <div class="block pre" style="margin-bottom:12px">${esc(x.evidence || '')}</div>${x.reason ? `<p class="muted" style="font-size:12.5px">Held because: ${esc(x.reason)}</p>` : ''}
      <div class="acts"><button class="btn good" data-act="stage-decide" data-id="${esc(x.id)}" data-v="approved">${ic('check')}Approve the move</button><button class="btn" data-act="stage-decide" data-id="${esc(x.id)}" data-v="held">${ic('pause')}Hold</button><button class="btn bad" data-act="stage-decide" data-id="${esc(x.id)}" data-v="rejected">${ic('x')}Send back</button></div></div>`).join('')
      : `<div class="card empty" style="padding:22px">${ic('layers')}<p>No stage request is open. The Producer asks here when ${esc(g.name)} is ready for <b>${STAGE_LBL[STAGES[si + 1]] || 'the next stage'}</b>.${g.reworkCount ? ` Sent back for rework ${plural(g.reworkCount, 'time')} so far.` : ''}</p></div>`}
    <div class="sec-h">Decided before</div>
    ${hist === undefined ? loadingCard(80) : past.length ? `<div class="list card">${past.map(x => `<div class="li">${ic(x.state === 'approved' ? 'checkc' : 'x')}<div class="t"><b>${STAGE_LBL[x.fromStage]} → ${STAGE_LBL[x.toStage]}</b><span class="wrap">${esc(cap(x.state))} ${ago(x.decidedAt || x.createdAt)}${x.reason ? ' · ' + esc(x.reason) : ''}${(x.criteriaFailed || []).length ? ' · failed ' + esc(x.criteriaFailed.join(', ')) : ''}</span></div></div>`).join('')}</div>` : '<p class="muted">Nothing decided yet.</p>'}`;
}
ACT['stage-decide'] = el => {
  const v = el.dataset.v, id = el.dataset.id;
  if (v === 'approved') return confirmBox({ title: 'Approve the stage move?', text: 'The game moves to the next stage and the Lead is told.', ok: 'Approve', tone: 'good', act: 'stage-go', data: { id, v } });
  openModal({ title: v === 'held' ? 'Hold this stage move' : 'Send it back for rework', body: `<div class="field"><label for="stReason">Why${v === 'held' ? ' hold it' : ''}?</label><textarea class="textarea" id="stReason" placeholder="Say what is missing"></textarea></div>
    <div class="field"><label for="stCrit">Failed checks <span class="muted">(optional)</span></label><input class="input" id="stCrit" placeholder="Rubric ids like G5 S4"></div>`,
    foot: `<button class="btn ghost" data-act="close">Cancel</button><button class="btn ${v === 'held' ? '' : 'bad'}" data-act="stage-go" data-id="${esc(id)}" data-v="${v}">${v === 'held' ? 'Hold it' : 'Send back'}</button>` });
};
ACT['stage-go'] = async el => {
  const v = el.dataset.v, reason = $('#stReason')?.value.trim(), crit = ($('#stCrit')?.value || '').toUpperCase().split(/[\s,]+/).filter(Boolean);
  if (v !== 'approved' && !reason) return $('#stReason').focus();
  if (crit.some(c => !/^[A-Z][0-9]{1,2}$/.test(c))) return toast('Failed checks look like G5 or S4', true);
  closeLayers();
  if (await run(() => api('POST', `/api/stage-requests/${el.dataset.id}/decide`, { state: v, ...(reason ? { reason } : {}), criteriaFailed: crit }), v === 'approved' ? 'Stage approved' : v === 'held' ? 'Held' : 'Sent back')) { drop('stagereq'); loadState(); }
};
function gameLive(g) {
  const L = want('live:' + g.slug, `/api/games/${encodeURIComponent(g.slug)}/live`);
  if (L === undefined) return loadingCard(220);
  if (failed(L)) return errCard(L.__err, 'live:' + g.slug);
  const tiles = L.stats?.tiles || [];
  const lt = L.latest || {};
  const conn = S.settings.openCloud?.configured;
  const pub = [['Playing now', lt.playing], ['Visits', lt.visits], ['Favorites', lt.favorites], ['Like ratio', L.metrics?.likeRatio != null ? Math.round(L.metrics.likeRatio * 100) + '%' : null]];
  return `<div class="row-sp" style="margin-bottom:14px"><p class="muted" style="margin:0">${L.stats?.asOf ? `Game numbers as of ${when(L.stats.asOf)}.` : 'The game has not reported any numbers yet.'} Anything not measured says so; nothing is made up.</p><button class="btn sm" data-act="live-refresh" data-slug="${esc(g.slug)}">${ic('refresh')}Refresh</button></div>
    <div class="sec-h">Roblox public numbers ${g.universeId ? '' : '<span class="tag y">Needs a universe id</span>'}</div>
    <div class="tiles">${pub.map(([k, v]) => `<div class="card tile"><small>${k}</small><b>${v == null ? '<span class="muted" style="font-size:15px">Not measured</span>' : typeof v === 'number' ? short(v) : esc(v)}</b></div>`).join('')}</div>
    <div class="sec-h">From the game itself</div>
    <div class="tiles">${tiles.map(t => `<div class="card tile"><small>${esc(t.label)}</small><b>${t.value == null ? '<span class="muted" style="font-size:15px">Not measured</span>' : esc(Math.round(t.value * 10) / 10) + esc(t.unit === '%' ? '%' : ' ' + (t.unit || ''))}</b><span>Target: ${esc(t.target || '—')}</span></div>`).join('')}</div>
    ${(L.attention || []).length ? `<div class="sec-h">Needs attention</div><div class="list card">${L.attention.map(a => `<div class="li">${ic('warn')}<div class="t"><b style="white-space:normal">${esc(a.text || a.label || a)}</b></div></div>`).join('')}</div>` : ''}
    <div class="card pad" style="margin-top:18px"><div class="card-h">${ic('key')}Live numbers connection <span class="sp"></span>${conn ? '<span class="tag g">Connected</span>' : '<span class="tag">Not connected</span>'}</div>
      <p class="muted" style="margin:0 0 12px;font-size:13px">The game writes counts (no user ids) to a DataStore called HQStats. Agent HQ reads them with a Roblox Open Cloud key that only has DataStore read access for this experience. The key is stored on this PC and never shown again.</p>
      <div class="grid g2"><div class="field"><label for="ocKey">Open Cloud key</label><input class="input" id="ocKey" type="password" autocomplete="off" placeholder="${conn ? 'Saved. Paste a new key to replace it' : 'Paste the key'}"></div><div class="field"><label for="ocUni">Universe id</label><input class="input" id="ocUni" inputmode="numeric" value="${esc(g.universeId || '')}"></div></div>
      <div class="acts"><button class="btn primary" data-act="oc-save" data-slug="${esc(g.slug)}">${ic('check')}Save and fetch</button>${conn ? `<button class="btn ghost" data-act="oc-remove">${ic('trash')}Remove the key</button>` : ''}</div></div>`;
}
ACT['live-refresh'] = async el => { if (await run(() => api('POST', `/api/games/${encodeURIComponent(el.dataset.slug)}/live/refresh`), 'Refreshed')) { drop('live:' + el.dataset.slug); schedule(); } };
ACT['oc-save'] = async el => {
  const apiKey = $('#ocKey').value.trim(), universeId = $('#ocUni').value.trim();
  if (!apiKey) return $('#ocKey').focus();
  if (!/^\d{1,15}$/.test(universeId)) return toast('The universe id is digits only', true);
  if (await run(() => api('POST', '/api/settings', { key: 'openCloud', value: { apiKey, universeId, game: el.dataset.slug } }), 'Connected')) { await loadState(); ACT['live-refresh'](el); }
};
ACT['oc-remove'] = async () => { if (await run(() => api('POST', '/api/settings', { key: 'openCloud', value: null }), 'Key removed')) loadState(); };
function gameGate(g) {
  const G = want('gate:' + g.slug, `/api/games/${encodeURIComponent(g.slug)}/gate`);
  if (G === undefined) return loadingCard(220);
  if (failed(G)) return errCard(G.__err, 'gate:' + g.slug);
  const ready = g.stage === 'ready', pastReady = STAGES.indexOf(g.stage) >= STAGES.indexOf('ready');
  return `<p class="muted" style="margin:0 0 16px;max-width:760px">The acts only you can do. Agent HQ never publishes, never makes a game public and never spends money: you do those in Roblox, then record them here. Each needs two steps and the game's short id typed in.</p>
    <div class="split"><section class="stack">
      <div class="card pad"><div class="card-h">${ic('rocket')}Make this version live <span class="sp"></span>${g.stage === 'live' ? '<span class="tag g">Live</span>' : ready ? '<span class="tag v">Ready</span>' : `<span class="tag">At ${STAGE_LBL[g.stage]}</span>`}</div>
        <p class="muted" style="margin:0 0 12px;font-size:13px">${ready ? 'You published this version in Roblox? Record it here.' : g.stage === 'live' ? 'This game is marked live.' : 'Only a game at the Ready stage can go live.'}</p>
        <button class="btn primary" data-act="gate-start" data-slug="${esc(g.slug)}" data-v="live" ${ready ? '' : 'disabled'}>${ic('rocket')}I published it: mark live</button></div>
      <div class="card pad"><div class="card-h">${ic('globe')}Set the experience public <span class="sp"></span>${g.isPublic ? `<span class="tag c">Public since ${when(g.publicSinceUtc)}</span>` : '<span class="tag">Private</span>'}</div>
        <p class="muted" style="margin:0 0 12px;font-size:13px">${g.isPublic ? 'Recorded as public.' : pastReady ? 'You made it public in Roblox? Record it here.' : 'It must reach Ready first.'}</p>
        <button class="btn" data-act="gate-start" data-slug="${esc(g.slug)}" data-v="public" ${!g.isPublic && pastReady ? '' : 'disabled'}>${ic('globe')}I made it public</button></div>
      <div class="card pad"><div class="card-h">${ic('coin')}Ad money notes</div>
        <p class="muted" style="margin:0 0 10px;font-size:13px">Advice only: ad money is spent in Roblox by you. Keep a note of what you spent and why.</p>
        <div style="display:flex;gap:8px;margin-bottom:12px"><input class="input" id="adNote" maxlength="2000" placeholder="e.g. 2,000 Robux on sponsored ads, Friday"><button class="btn" data-act="ad-note" data-slug="${esc(g.slug)}">${ic('plus')}Add</button></div>
        ${(G.adNotes || []).length ? `<div class="list">${G.adNotes.map(n => `<div class="li">${ic('coin')}<div class="t"><b style="white-space:normal">${esc(n.note)}</b><span>${when(n.at)}</span></div></div>`).join('')}</div>` : '<p class="muted" style="margin:0;font-size:13px">No notes yet.</p>'}</div>
    </section><aside class="card pad"><div class="card-h">${ic('checkc')}Before you publish</div>
      ${G.checklist.map(c => `<div class="check ${c.done ? 'on' : ''}" data-act="gate-check" data-slug="${esc(g.slug)}" data-id="${esc(c.id)}" data-done="${c.done ? 1 : 0}" role="checkbox" aria-checked="${c.done}" tabindex="0"><span class="box">${c.done ? ic('check') : ''}</span><span>${esc(c.label)}</span></div>`).join('')}
      <p class="muted" style="font-size:12px;margin:12px 0 0">${G.checklist.filter(c => c.done).length} of ${G.checklist.length} done. Only you can tick these.</p></aside></div>`;
}
ACT['gate-check'] = async el => { if (await run(() => api('POST', `/api/games/${encodeURIComponent(el.dataset.slug)}/gate/checklist`, { id: el.dataset.id, done: el.dataset.done !== '1' }))) { drop('gate:' + el.dataset.slug); schedule(); } };
ACT['ad-note'] = async el => { const v = $('#adNote').value.trim(); if (!v) return $('#adNote').focus(); if (await run(() => api('POST', `/api/games/${encodeURIComponent(el.dataset.slug)}/ad-note`, { note: v }), 'Note saved')) { drop('gate:' + el.dataset.slug); schedule(); } };
ACT['gate-start'] = async el => {
  const slug = el.dataset.slug, action = el.dataset.v;
  const c = await run(() => api('POST', `/api/games/${encodeURIComponent(slug)}/gate/start`, { action }));
  if (!c) return;
  openModal({ title: action === 'live' ? 'Confirm: mark this version live' : 'Confirm: the experience is public',
    body: `<p>Step 2 of 2. This records that <b>you</b> did it in Roblox; Agent HQ changes nothing on Roblox. The confirmation expires in 2 minutes.</p><div class="field"><label for="gateTyped">Type <code class="mono" style="color:var(--vi2)">${esc(slug)}</code> to confirm</label><input class="input" id="gateTyped" autocomplete="off" spellcheck="false"></div>`,
    foot: `<button class="btn ghost" data-act="close">Cancel</button><button class="btn primary" data-act="gate-confirm" data-slug="${esc(slug)}" data-c="${esc(c.challengeId)}" id="gateGo" disabled>Confirm</button>` });
  $('#gateTyped').addEventListener('input', e => { $('#gateGo').disabled = e.target.value !== slug; });
};
ACT['gate-confirm'] = async el => {
  const r = await run(() => api('POST', `/api/games/${encodeURIComponent(el.dataset.slug)}/gate/confirm`, { challengeId: el.dataset.c, typed: $('#gateTyped').value }), 'Recorded');
  if (r) { closeLayers(); drop('gate:' + el.dataset.slug); loadState(); }
};
ACT['game-icon'] = async el => {
  const g = gameBy(el.dataset.slug); if (!g) return;
  openModal({ title: `Icon for ${esc(g.name)}`, wide: true, body: '<div class="empty"><span class="spinner w"></span></div>' });
  const opts = await iconChoices(g);
  $('#modal .md-b').innerHTML = opts.length ? `<p>Pick from the pictures the agents made for this game.</p><div class="ip-grid">${opts.map((o, i) => `<button class="ip-opt" data-act="icon-set" data-slug="${esc(g.slug)}" data-path="${esc(o.path)}" title="${esc(o.name)}"><img src="${mediaUrl(o.path)}" alt="${esc(o.name)}"></button>`).join('')}</div>`
    : `<div class="empty">${ic('image')}<p><b>No pictures for this game yet.</b><br>The Thumbnail artist can make three icon options for you to pick from.</p><button class="btn primary" data-act="icon-make" data-slug="${esc(g.slug)}">${ic('wand')}Ask for 3 icon options</button></div>`;
  hydrate($('#modal'));
};
ACT['icon-set'] = async el => { if (await run(() => api('PATCH', `/api/games/${encodeURIComponent(el.dataset.slug)}`, { icon: el.dataset.path }), 'Icon set')) { closeLayers(); $('#iconPick')?.setAttribute('hidden', ''); loadState(); } };
ACT['icon-make'] = async el => {
  const g = gameBy(el.dataset.slug);
  if (await run(() => api('POST', '/api/tasks', { role: 'thumbnails', game: g.slug, title: `3 square game icon options for ${g.name}`.slice(0, 200), body: `Make 3 square 512x512 game icon options for ${g.name}, save each with hq_asset_add as kind icon for this game, and ask the owner to pick one.` }), 'Queued for the Thumbnail artist')) {
    try { localStorage.setItem(`hq-icon-asked-${g.slug}`, String(Date.now())); } catch { /* private mode */ }
    closeLayers(); $('#iconPick')?.setAttribute('hidden', ''); loadState();
  }
};

// ================================================================ CREATE
const KINDS = [
  ['asset', '3D model or prop', 'box', 'librarian', 'A model the game uses: a prop, vehicle, building piece.', 'a stud-style getaway van, chunky wheels, bright red, low poly…'],
  ['vfx', 'Effect', 'spark', 'builder', 'A visual effect built with VFX Forge.', 'a gold coin burst when a vault opens, short and punchy, readable on a phone…'],
  ['ui', 'Screen or HUD look', 'grid', 'designer', 'Concept options for a screen; you pick one, then UI builds it.', 'a shop screen for trucks: three cards, big prices, a clear buy button…'],
  ['icon', 'Icon or thumbnail', 'image', 'thumbnails', 'Store icon and thumbnails, at least 3 variants.', 'a cartoon thief sprinting out of a glowing vault with a bag of cash…'],
  ['map', 'Map or area', 'map', 'world', 'A place in the world: blockout first, then detail.', 'a back alley behind the bank with two shortcuts and a rooftop route…'],
  ['promo', 'Promo video', 'film', 'thumbnails', 'A short promo of the game.', 'a 15 second rush through the best places, every cut on the beat…'],
];
PAGES.create = {
  title: 'Create',
  render() {
    const k = KINDS.find(x => x[0] === U.createKind) || KINDS[0];
    if (U.createGame === null) U.createGame = U.game !== 'all' ? U.game : (liveGames()[0]?.slug || '');
    const lib = want('library', '/api/library');
    const imgs = (lib && !failed(lib) ? lib.assets || [] : []).filter(isImg).slice(-12).reverse();
    const made = S.tasks.filter(t => /^Create /.test(t.title) && inGame(t.game)).sort((a, b) => stamp(b) - stamp(a)).slice(0, 6);
    return pageHead(`Create <span class="tag v">${ic('spark', 'sm')}New</span>`, 'Describe what you want. It goes to the right agent as a task, and anything that needs your eye comes back to Review.')
      + `<div class="sec-h">What do you want made</div>
      <div class="kinds">${KINDS.map(([id, l, i, r, d]) => `<button class="kind ${id === k[0] ? 'on' : ''}" data-act="ckind" data-v="${id}"><span class="ic">${ic(i)}</span><b>${l}</b><small>${d}</small><span class="tag" style="align-self:flex-start">${esc(role(r).label)}</span></button>`).join('')}</div>
      <div class="sec-h">For which game</div>
      <div class="gchips"><button class="gchip ${!U.createGame ? 'on' : ''}" data-act="cgame" data-v=""><span class="gi">${ic('grid')}</span>No game</button>${liveGames().map(g => `<button class="gchip ${U.createGame === g.slug ? 'on' : ''}" data-act="cgame" data-v="${esc(g.slug)}"><span class="gi">${gameArt(g)}</span>${esc(g.name)}</button>`).join('')}</div>
      <div class="card prompt"><textarea id="cPrompt" data-bind="createText" placeholder="${esc(k[5])}" aria-label="Describe it">${esc(U.createText)}</textarea>
        <div class="prompt-bar"><span class="muted" style="font-size:12.5px">${ic('info', 'sm')} Goes to the <b style="color:var(--tx)">${esc(role(k[3]).label)}</b>${U.createGame ? ` for ${esc(gameName(U.createGame))}` : ''}.</span><span class="sp"></span><button class="btn primary" data-act="create-go">${ic('wand')}Create</button></div></div>
      ${made.length ? `<div class="sec-h">Your recent requests</div><div class="list card">${made.map(t => `<button class="li" data-act="task" data-id="${esc(t.id)}">${av(t.role, 'sm')}<div class="t"><b>${esc(t.title.replace(/^Create [^:]+: /, ''))}</b><span>${esc(role(t.role).label)} · ${ago(t.createdAt)}</span></div>${stChip(t.state)}</button>`).join('')}</div>` : ''}
      <div class="sec-h">Latest pictures from your agents</div>
      ${lib === undefined ? loadingCard(120) : imgs.length ? `<div class="thumbs" style="padding:0">${imgs.map(p => `<a href="${assetUrl(p)}" target="_blank" rel="noopener" title="${esc(p)}"><img src="${assetUrl(p)}" alt="" loading="lazy"></a>`).join('')}</div>` : '<p class="muted">No pictures yet.</p>'}`;
  },
};
ACT.ckind = el => { U.createKind = el.dataset.v; schedule(); };
ACT.cgame = el => { U.createGame = el.dataset.v; schedule(); };
ACT['create-go'] = async el => {
  const k = KINDS.find(x => x[0] === U.createKind) || KINDS[0], text = U.createText.trim();
  if (!text) return $('#cPrompt').focus();
  el.disabled = true;
  const r = await run(() => api('POST', '/api/tasks', { role: k[3], title: `Create ${k[1].toLowerCase()}: ${text}`.slice(0, 200), body: text, ...(U.createGame ? { game: U.createGame } : {}) }), `Sent to the ${role(k[3]).label}`);
  el.disabled = false;
  if (r) { U.createText = ''; loadState(); }
};

// ================================================================ LIBRARY
PAGES.library = {
  title: 'Library',
  render(r) {
    const t = tabs('library', r.a, [['', 'Your assets', 'box'], ['catalog', 'Free catalog', 'globe'], ['skills', 'Skills', 'book']]);
    const head = pageHead('Library', 'Everything your agents build with: your own files, the free catalog, and the skills they follow.');
    if (r.a === 'catalog') return head + t + libCatalog();
    if (r.a === 'skills') return head + t + libSkills();
    const A = want('assets', '/api/assets');
    if (A === undefined) return head + t + loadingCard(260);
    if (failed(A)) return head + t + errCard(A.__err, 'assets');
    const counts = A.counts || {};
    const kinds = [['all', 'Everything', 'grid'], ['model', 'Models', 'box'], ['image', 'Pictures', 'image'], ['icon', 'Icons', 'spark'], ['thumbnail', 'Thumbnails', 'image'], ['sound', 'Sounds', 'pulse']];
    const q = U.libQ.trim().toLowerCase();
    const mine = (A.assets || []).filter(a => (U.libKind === 'all' || a.kind === U.libKind) && (!q || `${a.name} ${(a.tags || []).join(' ')}`.toLowerCase().includes(q)));
    return head + t + `<label class="searchbar">${ic('search')}<input id="libQ" data-bind="libQ" data-live="120" value="${esc(U.libQ)}" placeholder="Search your assets by name or tag" aria-label="Search your assets"></label>
      <div class="chips">${kinds.map(([k, l, i]) => `<button class="chip ${U.libKind === k ? 'on' : ''}" data-act="libkind" data-v="${k}">${ic(i)}${l} <b>${fmt(k === 'all' ? counts.all : counts[k] || 0)}</b></button>`).join('')}<span class="chip">${ic('upload')}On Roblox <b>${fmt(A.onRoblox || 0)}</b></span></div>
      ${mine.length ? `<div class="assets">${mine.map(a => `<div class="asset"><div class="pv ${a.kind === 'image' ? 'photo' : ''}">${a.file && isImg(a.file) && !a.missing ? `<img src="${assetUrl(a.file)}" alt="" loading="lazy">` : ic(a.kind === 'sound' ? 'pulse' : 'box')}
          <div class="over">${a.robloxId ? `<button class="btn xs primary" data-act="copy" data-v="${esc(a.robloxId)}" title="Copy the Roblox asset id">${ic('copy')}Id</button>` : ''}${a.file && !a.missing ? `<a class="btn xs" href="${assetUrl(a.file)}" target="_blank" rel="noopener">${ic('ext')}Open</a>` : ''}</div></div>
        <div class="meta"><b title="${esc(a.name)}">${esc(a.name)}</b><div class="k"><span class="tag">${esc(a.kind)}</span>${a.scope?.startsWith('game:') ? `<span class="tag v">${esc(gameName(a.scope.slice(5)))}</span>` : `<span class="tag">${esc(a.scope || 'studio')}</span>`}${a.robloxId ? '<span class="tag g">On Roblox</span>' : ''}${a.missing ? '<span class="tag r">File missing</span>' : ''}</div><small>${esc(a.file || '')}</small></div></div>`).join('')}</div>`
        : emptyCard('box', (A.assets || []).length ? 'Nothing matches.' : 'No assets yet.', (A.assets || []).length ? 'Try another word or kind.' : 'Agents add what they make here. The free catalog has thousands more.', `<a class="btn sm" href="#/library/catalog">${ic('globe')}Open the free catalog</a>`)}`;
  },
};
ACT.libkind = el => { U.libKind = el.dataset.v; schedule(); };
ACT.copy = async el => { try { await navigator.clipboard.writeText(el.dataset.v); toast('Copied ' + el.dataset.v); } catch { toast('Could not copy: ' + el.dataset.v, true); } };
function libCatalog() {
  const q = U.catQ.trim(), key = `cat:${q}:${U.catType}`;
  const C = want(key, `/api/catalog?q=${encodeURIComponent(q)}&limit=48${U.catType ? '&type=' + encodeURIComponent(U.catType) : ''}`);
  const base = X['cat::'] && !failed(X['cat::']) ? X['cat::'] : C && !failed(C) ? C : null;
  return `<label class="searchbar">${ic('search')}<input id="catQ" data-bind="catQ" data-live="350" value="${esc(U.catQ)}" placeholder="Search free models, textures and skies: brick, lamp, crate…" aria-label="Search the catalog"></label>
    ${base ? `<div class="chips"><button class="chip ${!U.catType ? 'on' : ''}" data-act="cattype" data-v="">Everything <b>${fmt(base.total)}</b></button>${Object.entries(base.types || {}).map(([k, v]) => `<button class="chip ${U.catType === k ? 'on' : ''}" data-act="cattype" data-v="${esc(k)}">${esc(cap(k.replace('-', ' ')))} <b>${fmt(v)}</b></button>`).join('')}</div>` : ''}
    ${C === undefined ? loadingCard(260) : failed(C) ? errCard(C.__err, key) : (C.results || []).length ? `<p class="muted" style="font-size:12.5px;margin:-4px 0 12px">${fmt(C.found ?? C.results.length)} found${q ? ` for “${esc(q)}”` : ''}. Sources: ${Object.entries(C.sources || {}).map(([k, v]) => `${esc(k)} ${fmt(v)}`).join(' · ')}.</p>
      <div class="assets">${C.results.map(a => `<div class="asset"><div class="pv photo">${a.preview ? `<img src="${esc(a.preview)}" alt="" loading="lazy">` : ic(a.type === 'model' ? 'box' : a.type === 'ui-kit' ? 'palette' : 'image')}
        <div class="over">${a.source !== 'uilab' ? `<button class="btn xs primary" data-act="cat-get" data-id="${esc(a.id)}" title="Download it to this PC and add it to your assets">${ic('download')}Get</button>` : ''}${a.url ? `<a class="btn xs" href="${esc(a.url)}" target="_blank" rel="noopener">${ic('ext')}</a>` : ''}</div></div>
        <div class="meta"><b title="${esc(a.name)}">${esc(a.name)}</b><div class="k"><span class="tag">${esc(a.type)}</span><span class="tag">${esc(a.licence || '')}</span>${a.onThisPc ? '<span class="tag g">On this PC</span>' : ''}</div><small>${esc(a.source)}${a.triangles ? ` · ${short(a.triangles)} tris` : ''}</small></div></div>`).join('')}</div>`
      : emptyCard('search', 'Nothing matches.', 'Try a simpler word.')}`;
}
ACT.cattype = el => { U.catType = el.dataset.v; schedule(); };
ACT['cat-get'] = async el => { el.disabled = true; const r = await run(() => api('POST', '/api/catalog/fetch', { id: el.dataset.id }), 'Downloaded and added to your assets'); el.disabled = false; if (r) drop('assets', 'cat'); schedule(); };
function libSkills() {
  const L = want('library', '/api/library');
  if (L === undefined) return loadingCard(200);
  if (failed(L)) return errCard(L.__err, 'library');
  const q = U.skillQ.trim().toLowerCase();
  const list = (L.skills || []).filter(s => !q || `${s.name} ${s.description}`.toLowerCase().includes(q));
  return `<label class="searchbar">${ic('search')}<input id="skillQ" data-bind="skillQ" data-live="100" value="${esc(U.skillQ)}" placeholder="Search ${fmt((L.skills || []).length)} skills" aria-label="Search skills"></label>
    ${list.length ? `<div class="grid g3">${list.map(s => `<div class="card pad"><div class="card-h">${ic('book')}${esc(s.name)}</div><p class="muted" style="margin:0;font-size:13px;line-height:1.5">${esc(String(s.description || '').replace(/^[>|]\s*/, '').slice(0, 220) || 'No description.')}</p></div>`).join('')}</div>` : emptyCard('book', 'No skills match.')}`;
}

// ================================================================ ASSET PACKS (packs + UI kits)
PAGES.packs = {
  title: 'Asset Packs',
  render(r) {
    const head = pageHead('Asset Packs', 'Packs attached to the Library, and UI kits: other games’ interfaces studied for ideas (never shipped or copied).', r.a === 'kits' ? `<button class="btn" data-act="kit-add">${ic('plus')}Study a Roblox game's UI</button>` : '');
    const t = tabs('packs', r.a, [['', 'Packs', 'packs'], ['kits', 'UI kits', 'palette']]);
    if (r.a === 'kits') {
      const K = want('uilab', '/api/uilab');
      if (K === undefined) return head + t + loadingCard(240);
      if (failed(K)) return head + t + errCard(K.__err, 'uilab');
      return head + t + `<div class="chips"><span class="chip"><b>${fmt(K.stats?.kits)}</b> kits</span><span class="chip"><b>${fmt(K.stats?.icons)}</b> icons</span><span class="chip"><b>${fmt(K.stats?.screens)}</b> screens</span></div>
        ${(K.kits || []).length ? `<div class="grid g3">${K.kits.map(k => `<button class="card click pad" style="text-align:left;display:flex;flex-direction:column;gap:10px" data-act="kit" data-id="${esc(k.id)}">
          <div class="card-h" style="margin:0">${ic('palette')}<span style="flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(k.name)}</span><span class="tag">${esc(k.kind)}</span></div>
          <div class="palette">${(k.palette || []).slice(0, 8).map(c => `<i style="background:${esc(c.hex || c)}"></i>`).join('')}</div>
          <div class="icons-grid" style="grid-template-columns:repeat(8,1fr)">${(k.preview || []).slice(0, 8).map(p => `<div><img src="${mediaUrl(p)}" alt="" loading="lazy"></div>`).join('')}</div>
          <span class="muted" style="font-size:12px">${Object.entries(k.counts || {}).map(([a, b]) => `${b} ${a}`).join(' · ')}${k.game ? ' · for ' + esc(gameName(k.game)) : ''}</span></button>`).join('')}</div>`
          : emptyCard('palette', 'No UI kits yet.', 'Study a Roblox game to collect its palette, icons and screens for reference.')}`;
    }
    const Pk = want('packs', '/api/catalog?type=pack&limit=100');
    if (Pk === undefined) return head + t + loadingCard(240);
    if (failed(Pk)) return head + t + errCard(Pk.__err, 'packs');
    const packs = Pk.results || [];
    return head + t + (packs.length ? `<div class="grid g3">${packs.map(p => `<div class="card pad" style="display:flex;flex-direction:column;gap:10px">
        <div style="display:flex;gap:12px;align-items:center"><span class="av lg" style="--c:#ffb36b">${ic('packs')}</span><div style="min-width:0"><b style="display:block;font-weight:800">${esc(p.name)}</b><span class="muted" style="font-size:12px">${esc(p.source || '')}</span></div></div>
        <p class="muted" style="margin:0;font-size:13px;line-height:1.5">${esc(String(p.description || '').slice(0, 180))}</p>
        <div class="row-sp" style="margin-top:auto"><span class="tag">${esc(p.licence || 'See licence')}</span>${p.onThisPc === false ? '<span class="tag">Not on this PC</span>' : '<span class="tag g">Attached</span>'}</div></div>`).join('')}</div>`
      : emptyCard('packs', 'No packs attached yet.', 'Packs you download (Kenney, game-icons.net, the LihFolk pack) show up here once Agent HQ finds them. Their licences live in assets/LICENSES.md.', `<a class="btn sm" href="#/library/catalog">${ic('globe')}Browse the free catalog</a>`));
  },
};
ACT.kit = async el => {
  openDrawer({ title: 'UI kit', body: '<div class="empty"><span class="spinner w"></span></div>' });
  let k; try { k = await api('GET', `/api/uilab/${encodeURIComponent(el.dataset.id)}`); } catch (e) { return drawerBody(errCard(e.message)); }
  $('#drawer h2').textContent = k.name;
  $('#drawer .dr-h .t').insertAdjacentHTML('beforeend', `<p>${esc(k.licence || '')}</p>`);
  drawerBody(`<div class="palette" style="margin-bottom:16px">${(k.palette || []).slice(0, 12).map(c => `<i title="${esc(c.hex)}" style="background:${esc(c.hex)};height:30px"></i>`).join('')}</div>
    <div class="field"><label for="kitGame">Use it for</label><select class="select" id="kitGame" data-id="${esc(k.id)}"><option value="">No game</option>${liveGames().map(g => `<option value="${esc(g.slug)}" ${k.game === g.slug ? 'selected' : ''}>${esc(g.name)}</option>`).join('')}</select></div>
    ${k.note ? `<div class="sec-h">What the designer noted</div><div class="block doc" style="max-height:none">${md(typeof k.note === 'string' ? k.note : k.note.note || '')}</div>` : ''}
    ${(k.screens || []).length ? `<div class="sec-h">Screens <span class="badge">${k.screens.length}</span></div><div class="thumbs" style="grid-template-columns:repeat(2,1fr);padding:0">${k.screens.slice(0, 12).map(p => `<a href="${mediaUrl(p)}" target="_blank" rel="noopener" style="aspect-ratio:16/10"><img src="${mediaUrl(p)}" alt="" loading="lazy"></a>`).join('')}</div>` : ''}
    ${(k.icons || []).length ? `<div class="sec-h">Icons <span class="badge">${k.icons.length}</span></div><div class="icons-grid">${k.icons.slice(0, 64).map(i => { const p = i.file || i.path || i; return `<div title="${esc(i.name || '')}"><img src="${mediaUrl(p)}" alt="" loading="lazy"></div>`; }).join('')}</div>` : ''}
    <div class="sec-h">Ask a designer to study it</div><textarea class="textarea" id="kitAsk" placeholder="What should they look for? e.g. how the shop shows prices"></textarea>`);
  const d = $('#drawer .drawer');
  d.insertAdjacentHTML('beforeend', `<div class="dr-f"><button class="btn primary" data-act="kit-study" data-id="${esc(k.id)}">${ic('eye')}Study it</button>${k.source?.startsWith('https://') ? `<a class="btn" href="${esc(k.source)}" target="_blank" rel="noopener">${ic('ext')}Source</a>` : ''}</div>`); hydrate(d);
};
document.addEventListener('change', async e => { if (e.target.id === 'kitGame' && await run(() => api('POST', `/api/uilab/${e.target.dataset.id}/meta`, { game: e.target.value }), 'Saved')) drop('uilab'); });
ACT['kit-study'] = async el => { const r = await run(() => api('POST', `/api/uilab/${el.dataset.id}/study`, { ask: $('#kitAsk').value.trim() }), 'A designer is studying it'); if (r) { closeLayers(); loadState(); } };
ACT['kit-add'] = () => openModal({ title: "Study a Roblox game's UI", body: `<p>Agent HQ downloads the game's public icons, badges and store art, then a designer notes what works. It is for study only: never shipped or copied.</p>
  <div class="field"><label for="kaUni">Universe id</label><input class="input" id="kaUni" inputmode="numeric" placeholder="Digits, from the game's Creator Hub or Market page"></div>
  <div class="field"><label for="kaName">Name</label><input class="input" id="kaName" maxlength="100" placeholder="The game's name"></div>
  <div class="field"><label for="kaAsk">What to look for <span class="muted">(optional)</span></label><input class="input" id="kaAsk" maxlength="1000"></div>`,
  foot: `<button class="btn ghost" data-act="close">Cancel</button><button class="btn primary" data-act="kit-add-go">${ic('download')}Add it</button>` });
ACT['kit-add-go'] = async el => {
  const universeId = $('#kaUni').value.trim(); if (!/^\d{1,20}$/.test(universeId)) return toast('The universe id is digits only', true);
  el.disabled = true;
  const r = await run(() => api('POST', '/api/uilab/game', { universeId, name: $('#kaName').value.trim(), ask: $('#kaAsk').value.trim() }), 'Added: a designer studies it next');
  el.disabled = false;
  if (r) { closeLayers(); drop('uilab'); schedule(); }
};

// ================================================================ VAULT (knowledge + notebook)
PAGES.vault = {
  title: 'Vault',
  render(r) {
    if (r.a === 'notebook') return pageHead('Notebook', 'Notes you and the agents keep, plus the game bible mirrored from your Google Doc.') + tabs('vault', 'notebook', [['', 'Knowledge', 'vault'], ['notebook', 'Notebook', 'book']]) + notebook();
    const q = U.vaultQ;
    const hits = q ? want('ks:' + q, `/api/knowledge/search?q=${encodeURIComponent(q)}&limit=12`) : null;
    const V = want('vault', '/api/vault');
    const PB = want('playbook', '/api/playbook');
    return `<div class="vhero"><canvas id="vaultCv" aria-hidden="true"></canvas><div class="ov"><h1>Vault</h1><p>LihFolk V2 notes, Roblox docs, reference cards and your research. Agents read this before they build; you can too.</p>
      <form class="searchbar" data-act="noop">${ic('search')}<input id="vaultQ" value="${esc(q)}" placeholder="Search: session lock, safe area, rate limit…" aria-label="Search the vault"><button class="btn sm primary" data-act="vault-search" type="submit">Search</button></form></div></div>
      ${tabs('vault', '', [['', 'Knowledge', 'vault'], ['notebook', 'Notebook', 'book']])}
      ${q ? `<div class="sec-h">Results for “${esc(q)}”<span class="sp"></span><button class="btn xs ghost" data-act="vault-clear">${ic('x')}Clear</button></div>${hits === undefined ? loadingCard(160) : failed(hits) ? errCard(hits.__err, 'ks:' + q) : (hits.results || []).length ? `<div class="list card">${hits.results.map(h => `<button class="li" data-act="note" data-source="${esc(h.source)}" data-path="${esc(h.path)}" style="align-items:flex-start"><span class="tag ${h.trust === 'high' ? 'g' : ''}" style="margin-top:2px">${esc(h.source)}</span><div class="t"><b>${esc(h.title)}</b><span class="wrap">${esc(String(h.snippet || '').slice(0, 220))}</span></div>${ic('chevr', 'sm')}</button>`).join('')}</div>${(hits.skipped || []).length ? `<p class="muted" style="font-size:12px">Not searched: ${hits.skipped.map(s => `${esc(s.source)} (${esc(s.reason)})`).join(', ')}.</p>` : ''}` : emptyCard('search', 'No notes match.', 'Try other words.')}` : ''}
      <div class="sec-h">Playbook chapters</div>
      ${V === undefined ? loadingCard(200) : failed(V) ? errCard(V.__err, 'vault') : `<div class="grid g4">${V.chapters.map(c => { const pb = PB && !failed(PB) ? PB.find(p => p.n === c.n) : null; return `<button class="card click chap" data-act="chapter" data-n="${c.n}" style="text-align:left"><span class="n">${c.n}</span><span style="min-width:0"><b>${esc(c.title)}</b><small>${fmt(String(c.text || '').split(/\s+/).length)} words${pb?.for?.length ? ' · ' + esc(pb.for.slice(0, 3).map(x => role(x).label).join(', ')) : ''}</small></span></button>`; }).join('')}</div>`}`;
  },
  after(r) { if (!r.a) starfield($('#vaultCv'), true); },
};
ACT['vault-search'] = () => { U.vaultQ = $('#vaultQ').value.trim(); schedule(); };
ACT['vault-clear'] = () => { U.vaultQ = ''; schedule(); };
ACT.note = async el => {
  openDrawer({ title: 'Note', sub: esc(el.dataset.source), icon: `<span class="av lg" style="--c:#b9a4ff">${ic('book')}</span>`, body: '<div class="empty"><span class="spinner w"></span></div>' });
  let n; try { n = await api('GET', `/api/knowledge/read?source=${encodeURIComponent(el.dataset.source)}&path=${encodeURIComponent(el.dataset.path)}`); } catch (e) { return drawerBody(errCard(e.message)); }
  $('#drawer h2').textContent = n.title || el.dataset.path;
  drawerBody(`<div class="doc">${md(n.text || '')}</div>`);
};
ACT.chapter = el => {
  const c = (X.vault?.chapters || []).find(x => String(x.n) === el.dataset.n); if (!c) return;
  const pb = Array.isArray(X.playbook) ? X.playbook.find(p => p.n === c.n) : null;
  openDrawer({ title: `${c.n}. ${esc(c.title)}`, sub: 'Playbook chapter', icon: `<span class="av lg" style="--c:#b9a4ff">${ic('book')}</span>`, body: `${pb ? `<div class="chips">${(pb.for || []).map(x => `<span class="chip">${esc(role(x).label)}</span>`).join('')}${(pb.skills || []).map(s => `<span class="chip">${ic('book')}${esc(s)}</span>`).join('')}</div>` : ''}<div class="doc">${md(c.text || '')}</div>${pb?.lihfolk?.length ? `<div class="sec-h">Vault notes it points to</div><div class="list card">${pb.lihfolk.map(t => `<button class="li" data-act="vault-find" data-q="${esc(t)}">${ic('vault')}<div class="t"><b>${esc(t)}</b></div>${ic('search', 'sm')}</button>`).join('')}</div>` : ''}` });
};
ACT['vault-find'] = el => { closeLayers(); U.vaultQ = el.dataset.q; location.hash = '#/vault'; schedule(); };
function notebook() {
  const N = want('notebook', '/api/notebook');
  const D = want('nbdoc', '/api/notebook/doc');
  return `<div class="split"><section>
    <div class="card pad" style="margin-bottom:16px"><div class="card-h">${ic('pen')}Add a note</div>
      <textarea class="textarea" id="nbText" placeholder="An idea, a decision, something to remember…"></textarea>
      <div class="row-sp" style="margin-top:10px"><select class="select" id="nbGame" style="width:auto;min-width:200px"><option value="">No game</option>${liveGames().map(g => `<option value="${esc(g.slug)}" ${U.game === g.slug ? 'selected' : ''}>${esc(g.name)}</option>`).join('')}</select><button class="btn primary" data-act="nb-add">${ic('plus')}Save note</button></div></div>
    ${N === undefined ? loadingCard(200) : failed(N) ? errCard(N.__err, 'notebook') : (N.entries || []).length ? `<div class="list card">${N.entries.filter(n => inGame(n.game)).map(n => `<div class="li" style="align-items:flex-start">${n.role ? av(n.role, 'sm') : `<span class="av sm" style="--c:#ffd27a">${ic('kid')}</span>`}<div class="t"><b style="white-space:pre-wrap;font-weight:500">${esc(n.text)}</b><span>${n.who === 'owner' ? 'You' : esc(role(n.role).label)}${n.game ? ' · ' + esc(gameName(n.game)) : ''} · ${when(n.at)}</span></div><button class="btn xs ghost" data-act="nb-del" data-id="${esc(n.id)}" aria-label="Delete">${ic('trash')}</button></div>`).join('')}</div>` : emptyCard('book', 'No notes yet.')}
  </section><aside class="card pad"><div class="card-h">${ic('book')}Game bible</div>
    ${D === undefined ? loadingCard(100) : failed(D) ? errCard(D.__err, 'nbdoc') : (D.sections || []).length ? `<p class="muted" style="font-size:12.5px;margin:0 0 10px">Synced ${when(D.syncedAt)}.</p><div class="list">${D.sections.map(s => `<button class="li" data-act="nb-section" data-id="${esc(s.id)}">${ic('book')}<div class="t"><b>${esc(s.title)}</b><span>${fmt(s.words)} words</span></div></button>`).join('')}</div>` : `<p class="muted" style="font-size:13px;margin:0">Not synced yet. Link your Google Doc in <a href="#/settings/notebook" style="color:var(--vi2)">Settings › Notebook</a>; the app worker mirrors it here.</p>`}
  </aside></div>`;
}
ACT['nb-add'] = async () => { const text = $('#nbText').value.trim(); if (!text) return $('#nbText').focus(); const game = $('#nbGame').value; if (await run(() => api('POST', '/api/notebook', { text, ...(game ? { game } : {}) }), 'Note saved')) { drop('notebook'); schedule(); } };
ACT['nb-del'] = el => confirmBox({ title: 'Delete this note?', text: 'It is removed from the notebook.', ok: 'Delete', tone: 'bad', act: 'nb-del-go', data: { id: el.dataset.id } });
ACT['nb-del-go'] = async el => { closeLayers(); if (await run(() => api('DELETE', `/api/notebook/${el.dataset.id}`), 'Deleted')) { drop('notebook'); schedule(); } };
ACT['nb-section'] = async el => {
  openDrawer({ title: 'Game bible', body: '<div class="empty"><span class="spinner w"></span></div>' });
  try { const s = await api('GET', `/api/notebook/doc/${encodeURIComponent(el.dataset.id)}`); $('#drawer h2').textContent = s.title; drawerBody(`<div class="doc">${md(s.text || '')}</div>`); } catch (e) { drawerBody(errCard(e.message)); }
};
// markdown, small and safe: escaped first, then headings, lists, bold, code and http(s) links
function md(src) {
  const text = String(src).replace(/^---\n[\s\S]*?\n---\n?/, '').replace(/<!--[\s\S]*?-->/g, '');
  const inline = s => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>').replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (m, a, b) => `<b>${b || a}</b>`);
  const out = []; let list = false, para = [];
  const flush = () => { if (para.length) { out.push(`<p>${para.map(inline).join(' ')}</p>`); para = []; } };
  for (const raw of text.split('\n')) {
    const l = raw.trimEnd();
    const h = /^(#{1,4})\s+(.*)$/.exec(l), li = /^\s*[-*]\s+(.*)$/.exec(l) || /^\s*\d+\.\s+(.*)$/.exec(l);
    if (h) { flush(); if (list) { out.push('</ul>'); list = false; } const n = Math.min(3, h[1].length); out.push(`<h${n}>${inline(h[2])}</h${n}>`); }
    else if (li) { flush(); if (!list) { out.push('<ul>'); list = true; } out.push(`<li>${inline(li[1])}</li>`); }
    else if (!l.trim()) { flush(); if (list) { out.push('</ul>'); list = false; } }
    else { if (list) { out.push('</ul>'); list = false; } para.push(l.replace(/^>\s?/, '')); }
  }
  flush(); if (list) out.push('</ul>');
  return out.join('');
}

// ================================================================ PITCHES
PAGES.pitches = {
  title: 'Pitches',
  render(r) {
    const all = S.pitches;
    const waiting = all.filter(p => ['proposed', 'evaluating', 'changes'].includes(p.state));
    const mine = all.filter(p => p.origin === 'owner');
    const hist = all.filter(p => !['proposed', 'evaluating', 'changes'].includes(p.state));
    const head = pageHead('Pitches', 'Game ideas from the Market scout with chart evidence, plus your own ideas checked against the market.',
      `<button class="btn" data-act="score-idea">${ic('flag')}Score an idea</button><button class="btn" data-act="new-idea">${ic('pen')}My own idea</button><button class="btn primary" data-act="find-game">${ic('spark')}Find my next game</button>`);
    const t = tabs('pitches', r.a, [['', 'Waiting for you', 'bell', waiting.length || ''], ['ideas', 'Your ideas', 'pen', mine.length || ''], ['scores', 'Idea scores', 'flag'], ['history', 'History', 'history']]);
    if (r.a === 'scores') return head + t + ideaScores();
    const list = r.a === 'ideas' ? mine : r.a === 'history' ? hist : waiting;
    if (!list.length) return head + t + emptyCard('pitches', r.a === 'history' ? 'No decided pitches yet.' : r.a === 'ideas' ? 'No ideas of your own yet.' : 'No pitches waiting.', r.a ? '' : 'Ask the Scout to find your next game; pitches arrive here with evidence.', r.a ? '' : `<button class="btn sm primary" data-act="find-game">${ic('spark')}Find my next game</button>`);
    return head + t + `<div class="grid g3">${list.map(p => `<div class="card pitch">
      <div class="row">${pitchState(p)}${p.window ? `<span class="tag">${esc(p.window)}</span>` : ''}${p.format ? `<span class="tag v">${esc(p.format)}</span>` : ''}${p.look ? `<span class="tag">${esc(p.look)}</span>` : ''}${p.origin === 'owner' ? '<span class="tag c">Your idea</span>' : ''}</div>
      <h3>${esc(p.title)}</h3><p>${esc(p.oneLiner || p.game?.howItPlays || '')}</p>${p.edge ? `<p><b style="color:var(--tx)">Edge:</b> ${esc(p.edge)}</p>` : ''}
      <div class="acts"><button class="btn sm" data-act="pitch" data-id="${esc(p.id)}">${ic('eye')}Details</button>${['proposed', 'changes'].includes(p.state) ? `<button class="btn sm good" data-act="pitch-approve" data-id="${esc(p.id)}">${ic('check')}Approve</button><button class="btn sm ghost" data-act="pitch-changes" data-id="${esc(p.id)}">Changes</button><button class="btn sm ghost" data-act="pitch-decline" data-id="${esc(p.id)}">Decline</button>` : ''}</div></div>`).join('')}</div>`;
  },
};
const pitchState = p => ({ proposed: '<span class="tag y">Waiting for you</span>', evaluating: '<span class="tag">Scout is checking</span>', changes: '<span class="tag y">Changes asked</span>', approved: '<span class="tag g">Approved</span>', declined: '<span class="tag r">Declined</span>', withdrawn: '<span class="tag">Withdrawn</span>' }[p.state] || `<span class="tag">${esc(cap(p.state))}</span>`);
ACT.pitch = el => {
  const p = S.pitches.find(x => x.id === el.dataset.id); if (!p) return;
  const sec = (h, body) => body ? `<div class="sec-h">${h}</div>${body}` : '';
  const txt = v => v ? `<p style="margin:0;color:var(--tx2);line-height:1.6">${esc(v)}</p>` : '';
  const m = p.money || {}, g = p.game || {}, ev = p.evidence || {}, b = p.building || {};
  openDrawer({ title: esc(p.title), sub: `${p.origin === 'owner' ? 'Your idea' : 'From the Scout'} · ${when(p.createdAt)}`, icon: `<span class="av lg" style="--c:#7fd3ff">${ic('pitches')}</span>`, body: `
    <div class="chips">${pitchState(p)}${p.window ? `<span class="tag">${esc(p.window)}</span>` : ''}${p.format ? `<span class="tag v">${esc(p.format)}</span>` : ''}${p.look ? `<span class="tag">${esc(p.look)}</span>` : ''}</div>
    ${txt(p.oneLiner)}${sec('How we differ', txt(p.edge))}${sec('How it plays', txt(g.howItPlays || g.coreLoop))}
    ${sec('Money', txt(m.verdict || m.summary || m.model))}${sec('Evidence', txt(ev.summary))}
    ${(p.comparables || []).length ? sec('Comparable games', `<table class="table"><tr><th>Game</th><th class="num">Playing</th><th class="num">Likes</th><th class="num">Upvotes/day</th></tr>${p.comparables.map(c => `<tr><td>${esc(c.name)}</td><td class="num">${short(c.playing)}</td><td class="num">${c.likeRatio != null ? esc(c.likeRatio) + '%' : '—'}</td><td class="num">${short(c.upvotesPerDay)}</td></tr>`).join('')}</table>`) : ''}
    ${(p.competitors || []).length ? sec('Closest competitors', `<div class="list card">${p.competitors.map(c => `<div class="li" style="align-items:flex-start">${ic('games')}<div class="t"><b>${esc(c.name)}</b><span class="wrap">${esc([c.whatItIs, c.gap && 'Gap: ' + c.gap].filter(Boolean).join(' · '))}</span></div></div>`).join('')}</div>`) : ''}
    ${sec('Building it', txt([b.summary, b.size && 'Size: ' + b.size, (b.systems || []).length && 'Systems: ' + [].concat(b.systems).join(', ')].filter(Boolean).join('. ')))}
    ${(p.risks || []).length ? sec('Risks', `<ul style="margin:0;padding-left:18px;color:var(--tx2)">${[].concat(p.risks).map(x => `<li>${esc(x)}</li>`).join('')}</ul>`) : ''}
    ${p.note ? sec('Your note', txt(p.note)) : ''}`,
    foot: ['proposed', 'changes'].includes(p.state) ? `<button class="btn good" data-act="pitch-approve" data-id="${esc(p.id)}">${ic('check')}Approve</button><button class="btn" data-act="pitch-changes" data-id="${esc(p.id)}">${ic('msg')}Ask for changes</button><button class="btn ghost" data-act="pitch-decline" data-id="${esc(p.id)}">Decline</button>` : '' });
};
ACT['pitch-approve'] = el => confirmBox({ title: 'Approve this pitch?', text: 'The Lead starts planning it, and the other open pitches are withdrawn.', ok: 'Approve', tone: 'good', act: 'pitch-go', data: { id: el.dataset.id, v: 'approved' } });
ACT['pitch-decline'] = el => openModal({ title: 'Decline this pitch', body: `<div class="field"><label for="pNote">Why? <span class="muted">(optional, helps the Scout)</span></label><textarea class="textarea" id="pNote"></textarea></div>`, foot: `<button class="btn ghost" data-act="close">Cancel</button><button class="btn bad" data-act="pitch-go" data-id="${esc(el.dataset.id)}" data-v="declined">Decline</button>` });
ACT['pitch-changes'] = el => openModal({ title: 'Ask the Scout for changes', body: `<div class="field"><label for="pNote">What should change?</label><textarea class="textarea" id="pNote"></textarea></div>`, foot: `<button class="btn ghost" data-act="close">Cancel</button><button class="btn primary" data-act="pitch-go" data-id="${esc(el.dataset.id)}" data-v="changes">${ic('send')}Send</button>` });
ACT['pitch-go'] = async el => {
  const v = el.dataset.v, note = $('#pNote')?.value.trim();
  if (v === 'changes' && !note) return $('#pNote').focus();
  closeLayers();
  if (await run(() => api('POST', `/api/pitches/${el.dataset.id}/decide`, { state: v, ...(note ? { note } : {}) }), v === 'approved' ? 'Approved: the Lead is planning it' : v === 'changes' ? 'Sent to the Scout' : 'Declined')) loadState();
};
ACT['find-game'] = async () => { if (await sendTo('scout', 'Find my next game: pitch 3 to 4 ideas with chart evidence.', '')) toast('The Scout is looking at the charts'); };
const ideaModal = (title, act, text) => openModal({ title, body: `<p>${text}</p><div class="field"><label for="idTitle">Working title</label><input class="input" id="idTitle" maxlength="200"></div><div class="field"><label for="idText">The idea</label><textarea class="textarea" id="idText" maxlength="2000" placeholder="How it plays, what makes it different, who it is for…"></textarea></div>`, foot: `<button class="btn ghost" data-act="close">Cancel</button><button class="btn primary" data-act="${act}">${ic('send')}Send to the Scout</button>` });
ACT['new-idea'] = () => ideaModal('My own game idea', 'idea-go', 'The Scout checks it against the charts and comparable games, then writes it up as a full pitch for you to decide on.');
ACT['score-idea'] = () => ideaModal('Score an idea', 'score-go', 'The Scout scores it 0 to 10 on demand, competition, money, the first five minutes and build size, with evidence.');
const ideaVals = () => { const title = $('#idTitle').value.trim(), idea = $('#idText').value.trim(); if (!title) { $('#idTitle').focus(); return null; } if (!idea) { $('#idText').focus(); return null; } return { title, idea }; };
ACT['idea-go'] = async () => { const v = ideaVals(); if (!v) return; closeLayers(); if (await run(() => api('POST', '/api/pitches/ideas', v), 'Sent: the Scout is checking it')) loadState(); };
ACT['score-go'] = async () => { const v = ideaVals(); if (!v) return; closeLayers(); if (await run(() => api('POST', '/api/idea-scores', v), 'Sent: the Scout is scoring it')) { drop('ideas'); location.hash = '#/pitches/scores'; loadState(); } };
function ideaScores() {
  const I = want('ideas', '/api/idea-scores');
  if (I === undefined) return loadingCard(200);
  if (failed(I)) return errCard(I.__err, 'ideas');
  if (!(I.ideas || []).length) return emptyCard('flag', 'No ideas scored yet.', '', `<button class="btn sm primary" data-act="score-idea">${ic('flag')}Score an idea</button>`);
  return `<div class="grid g2">${I.ideas.map(i => `<div class="card pad"><div class="card-h">${ic('flag')}${esc(i.title)}<span class="sp"></span>${i.state === 'open' ? '<span class="tag">Scout is scoring</span>' : `<span class="tag ${i.overall >= 7 ? 'g' : i.overall >= 5 ? 'y' : 'r'}" style="font-size:13px;height:26px">${esc(i.overall ?? '—')}/10</span>`}</div>
    <p class="muted" style="margin:0 0 12px;font-size:13px">${esc(i.idea)}</p>
    ${(i.rows || []).map(rw => `<div class="score" title="${esc(rw.evidence || '')}"><span>${esc(rw.name)}</span><div class="meter vi"><i style="width:${(Number(rw.score) || 0) * 10}%"></i></div><b style="text-align:right">${esc(rw.score)}</b></div>`).join('')}
    ${i.verdict ? `<p style="margin:12px 0 0"><b>Verdict:</b> ${esc(i.verdict)}</p>` : ''}${i.change ? `<p class="muted" style="margin:6px 0 0;font-size:13px">To raise it: ${esc(i.change)}</p>` : ''}</div>`).join('')}</div>`;
}

// ================================================================ MARKET
PAGES.market = {
  title: 'Market',
  render(r) {
    const M = want('market', '/api/market');
    const head = pageHead('Market', M && !failed(M) && M.latest ? `Roblox charts, last read ${ago(M.latest.fetchedAt)}. ${M.history?.snapshots ? `${M.history.snapshots} snapshots since ${when(M.history.since)}.` : ''} Refreshes every ${S.settings.marketEveryHours || 0} hours.` : 'Roblox charts, read on a timer.', `<button class="btn" data-act="market-refresh">${ic('refresh')}Refresh now</button>`);
    const t = tabs('market', r.a, [['', 'Biggest moves', 'pulse'], ['new', 'New on the charts', 'spark'], ['charts', 'Every chart', 'market']]);
    if (M === undefined) return head + t + loadingCard(320);
    if (failed(M)) return head + t + errCard(M.__err, 'market');
    if (!M.latest) return head + t + emptyCard('market', 'No chart snapshot yet.', 'Press Refresh now to read the charts.');
    const gcell = (name, icon) => `<div class="gname">${icon ? `<img src="${esc(icon)}" alt="" loading="lazy">` : ''}<b title="${esc(name)}">${esc(name)}</b></div>`;
    const delta = v => v == null ? '<span class="muted">—</span>' : v > 0 ? `<span class="up">+${fmt(v)}</span>` : v < 0 ? `<span class="down">${fmt(v)}</span>` : '0';
    if (r.a === 'new') {
      const rows = M.history?.newOnCharts || [];
      return head + t + (rows.length ? `<div class="card" style="overflow:auto"><table class="table"><tr><th>Game</th><th class="num">Playing</th><th>First seen</th></tr>${rows.map(g => `<tr><td>${gcell(g.name, g.iconUrl)}</td><td class="num">${fmt(g.playing)}</td><td>${ago(g.firstSeen)}</td></tr>`).join('')}</table></div>` : emptyCard('spark', 'Nothing new since the last snapshot.'));
    }
    if (r.a === 'charts') {
      const sorts = M.sorts || [];
      const rows = (M.velocity?.perSort || {})[U.sortId] || [];
      return head + t + `<div class="toolbar"><select class="select" id="sortSel" aria-label="Chart">${sorts.map(s => `<option value="${esc(s.id)}" ${s.id === U.sortId ? 'selected' : ''}>${esc(s.name)} (${s.count})</option>`).join('')}</select></div>
        <div class="card" style="overflow:auto"><table class="table"><tr><th class="num">#</th><th>Game</th><th class="num">Playing</th><th class="num">Rank change</th><th class="num">Players change</th><th class="num">Likes</th><th class="num">On lists</th></tr>${rows.slice(0, 100).map(g => `<tr><td class="num">${g.rank}</td><td>${gcell(g.name)}</td><td class="num">${fmt(g.playing)}</td><td class="num">${delta(g.rankDelta)}</td><td class="num">${delta(g.playersDelta)}</td><td class="num">${g.likePct != null ? g.likePct + '%' : '—'}</td><td class="num">${g.sortsCount ?? '—'}</td></tr>`).join('')}</table></div>`;
    }
    const moves = (M.velocity?.moves || []).slice(0, 40);
    return head + t + (moves.length ? `<div class="card" style="overflow:auto"><table class="table"><tr><th>Game</th><th>Chart</th><th class="num">Rank change</th><th class="num">Players change</th><th class="num">%</th></tr>${moves.map(m => `<tr><td>${gcell(m.name)}</td><td><span class="tag">${esc(m.sortName)}</span></td><td class="num">${delta(m.rankDelta)}</td><td class="num">${delta(m.playersDelta)}</td><td class="num">${m.playersPct != null ? `<span class="${m.playersPct >= 0 ? 'up' : 'down'}">${m.playersPct > 0 ? '+' : ''}${m.playersPct}%</span>` : '—'}</td></tr>`).join('')}</table></div>` : emptyCard('pulse', 'No moves yet.', 'Moves need two snapshots to compare.'));
  },
};
ACT['market-refresh'] = async el => { el.disabled = true; const r = await run(() => api('POST', '/api/market/refresh'), 'Charts refreshed'); el.disabled = false; if (r) { drop('market'); schedule(); } };

// ================================================================ DISCORD (read only)
PAGES.chat = {
  title: 'Discord',
  render() {
    const key = 'discord:' + U.chatChannel;
    const C = want(key, `/api/discord/chat${U.chatChannel ? '?channel=' + encodeURIComponent(U.chatChannel) : ''}`);
    const head = pageHead('Discord', `Your Discord server, made easy to read: names instead of ids, long posts shortened, HQ sync posts folded.${C && !failed(C) ? ` Updated ${ago(C.fetchedAt)}.` : ''}`,
      `<button class="btn ghost" data-act="chat-sync">${ic(U.chatSync ? 'eye' : 'min')}${U.chatSync ? 'Hide' : 'Show'} HQ sync</button><button class="btn" data-act="chat-refresh">${ic('refresh')}Refresh</button>`);
    if (C === undefined) return head + loadingCard(300);
    if (failed(C)) return head + emptyCard('msg', 'Discord could not be read.', esc(C.__err) + '<br>It reads through your HQ Link bot. Set it up on the HQ Link page.', `<a class="btn sm" href="#/link">${ic('link')}HQ Link</a>`);
    const items = C.items.filter(i => U.chatSync || i.kind !== 'sync');
    const people = [...new Set(C.items.filter(i => i.kind !== 'sync').map(i => i.author))];
    return head + `<div class="chips">${C.channels.slice(0, 14).map(ch => `<button class="chip ${C.channel.id === ch.id ? 'on' : ''}" data-act="chan" data-v="${esc(ch.id)}">#${esc(ch.name)}${ch.link ? ' <b>HQ Link</b>' : ''}</button>`).join('')}</div>
      <p class="muted" style="font-size:12.5px;margin:-4px 0 12px">#${esc(C.channel.name)} · ${people.length} ${people.length === 1 ? 'sender' : 'senders'}${people.length ? ': ' + people.map(esc).join(', ') : ''}. Read only.</p>
      <div class="card"><div class="msgs" id="dmsgs" style="max-height:calc(100vh - 330px)">${items.length ? items.map(i => i.kind === 'sync'
        ? `<div class="msg sys"><div class="bub">${ic('refresh', 'sm')} ${i.count} HQ sync message${i.count > 1 ? 's' : ''} · ${ago(i.at)}</div></div>`
        : `<div class="msg ${(C.me || []).includes(i.authorId) ? 'me' : ''}">${(C.me || []).includes(i.authorId) ? '' : `<span class="av sm" style="--c:${i.bot ? '#8ab4ff' : '#ffd27a'}">${ic(i.bot ? 'spark' : 'kid')}</span>`}<div style="min-width:0"><div class="meta">${esc(i.author)}${i.bot ? ' · bot' : ''} · ${ago(i.at)}</div>${i.lines.map(l => `<div class="bub" style="margin-top:4px">${l.replyTo ? `<small style="opacity:.6">↪ ${esc(l.replyTo)}</small><br>` : ''}${esc(U.chatFull[l.id] && l.full ? l.full : l.text)}${l.n > 1 ? ` <b style="opacity:.7">×${l.n}</b>` : ''}${l.full ? ` <button class="btn xs ghost" data-act="chat-full" data-v="${esc(l.id)}">${U.chatFull[l.id] ? 'less' : 'more'}</button>` : ''}</div>`).join('')}</div></div>`).join('')
        : '<div class="empty">No messages in this channel yet.</div>'}</div></div>`;
  },
  after(r, fresh) { const d = $('#dmsgs'); if (d && fresh) d.scrollTop = d.scrollHeight; },
};
ACT.chan = el => { U.chatChannel = el.dataset.v; schedule(); };
ACT['chat-sync'] = () => { U.chatSync = !U.chatSync; schedule(); };
ACT['chat-full'] = el => { U.chatFull[el.dataset.v] = !U.chatFull[el.dataset.v]; schedule(); };
ACT['chat-refresh'] = () => { drop('discord'); schedule(); };

// ================================================================ HQ LINK (partner, co-op, updates)
PAGES.link = {
  title: 'HQ Link',
  render() {
    const L = want('link', '/api/link'), C = want('coop', '/api/coop'), V = want('version', '/api/version');
    const head = pageHead('HQ Link', 'Your link to a partner’s Agent HQ over Discord: messages, the shared co-op game, and Agent HQ updates.', `<button class="btn" data-act="link-poll">${ic('refresh')}Check for messages</button>`);
    if (L === undefined) return head + loadingCard(300);
    if (failed(L)) return head + errCard(L.__err, 'link');
    if (!L.enabled) return head + `<div class="grid g2"><div class="card pad"><div class="card-h">${ic('link')}Set up HQ Link</div><p class="muted" style="font-size:13px;margin:0 0 12px">Needs a Discord bot you made and a channel both HQs can read. The bot token stays on this PC.</p>
      <div class="field"><label for="lkTok">Bot token</label><input class="input" id="lkTok" type="password" autocomplete="off"></div><div class="field"><label for="lkChan">Channel id</label><input class="input" id="lkChan" inputmode="numeric"></div><div class="field"><label for="lkName">Your name on the link</label><input class="input" id="lkName" maxlength="40"></div>
      <button class="btn primary" data-act="link-setup">${ic('check')}Connect</button></div>
      <div class="card pad"><div class="card-h">${ic('key')}Join with an invite</div><p class="muted" style="font-size:13px;margin:0 0 12px">Your partner can send you an invite code from their HQ Link page.</p><div class="field"><label for="lkInv">Invite code</label><input class="input" id="lkInv" placeholder="HQL1…"></div><button class="btn" data-act="link-join">${ic('link')}Join</button></div></div>`;
    const peers = L.peers || [];
    const log = (L.log || []).slice(-60);
    return head + `<div class="split"><section>
      <div class="card pad"><div class="card-h">${ic('msg')}Messages with ${peers.length ? esc(peers.map(p => p.name).join(', ')) : 'your partner'}</div>${L.note ? `<p class="muted" style="font-size:12.5px;margin:-6px 0 12px">${ic('info', 'sm')} ${esc(L.note)}</p>` : ''}
        <div class="feedlog" id="linkLog">${log.length ? log.map(m => `<div class="fl ${m.dir === 'out' ? 'out' : ''}"><span class="k">${ago(m.at)}</span><div class="b"><small>${m.dir === 'out' ? 'You' : esc(m.from || 'Partner')} · ${esc(m.kind || '')}</small>${esc(m.text || m.title || '')}</div></div>`).join('') : '<div class="empty">No messages yet.</div>'}</div>
        <div class="compose" style="padding:12px 0 0;border:0"><textarea class="grow" id="linkSay" data-draft="__link" maxlength="1800" placeholder="Write to your partner's HQ (posts in your HQ Link Discord channel)">${esc(U.draft.__link || '')}</textarea><button class="btn primary" data-act="link-say">${ic('send')}Send</button></div></div>
    </section><aside class="stack">
      <div class="card pad"><div class="card-h">${ic('team')}Partner<span class="sp"></span>${L.error ? '<span class="tag r">Error</span>' : '<span class="tag g">Linked</span>'}</div>
        ${peers.length ? peers.map(p => `<div class="li" style="padding:6px 0"><span class="av sm" style="--c:#8ab4ff">${ic('kid')}</span><div class="t"><b>${esc(p.name)}</b><span>${L.peerVersion?.from === p.name ? `Running ${esc(String(L.peerVersion.commit || '').slice(0, 7))}` : 'Paired'}</span></div><button class="btn xs ghost" data-act="link-unpair" data-id="${esc(p.id)}" data-name="${esc(p.name)}">Unpair</button></div>`).join('') : '<p class="muted" style="margin:0">Nobody paired yet.</p>'}
        <p class="muted" style="font-size:12px;margin:10px 0 0">You are “${esc(L.name || '')}”. Partner tasks today: ${esc(L.partnerUsedToday ?? 0)}.${L.lastPoll ? ` Last checked ${ago(L.lastPoll)}.` : ''}${L.error ? ` <span style="color:var(--rd)">${esc(L.error)}</span>` : ''}</p>
        ${L.invite ? `<button class="btn xs" style="margin-top:10px" data-act="copy" data-v="${esc(L.invite)}">${ic('copy')}Copy my invite code</button>` : ''}</div>
      ${C && !failed(C) && C.enabled ? `<div class="card pad"><div class="card-h">${ic('games')}Co-op: ${esc(gameName(C.game))}</div>
        <dl class="kv" style="grid-template-columns:96px 1fr"><dt>You</dt><dd>${esc(C.me)} · ${C.load ? `${C.load.q} queued, ${C.load.w} working` : ''}</dd><dt>Partner</dt><dd>${esc(C.partner)}${C.peer?.load ? ` · ${C.peer.load.q} queued, ${C.peer.load.w} working` : ''}</dd>
        <dt>Your files</dt><dd class="mono">${(C.myLane || []).map(esc).join('<br>')}</dd><dt>Theirs</dt><dd class="mono">${(C.partnerLane || []).map(esc).join('<br>')}</dd><dt>Shared</dt><dd class="mono">${(C.shared || []).map(esc).join('<br>')}</dd></dl>
        ${C.suggestion ? `<p class="muted" style="font-size:12.5px;margin:0 0 10px">${ic('info', 'sm')} Next task is best taken by ${C.suggestion.who === 'me' ? 'you' : 'your partner'}: ${esc(C.suggestion.why)}</p>` : ''}
        ${C.lanesAgree === false ? '<p style="color:var(--am);font-size:12.5px">Your file lanes and your partner’s do not match.</p>' : ''}
        ${(C.peer?.items || []).length ? `<div class="sec-h" style="margin-top:6px">Partner's board</div><div class="list">${C.peer.items.slice(0, 8).map(i => `<div class="li" style="padding:6px 0">${av(i.r, 'sm')}<div class="t"><b>${esc(i.t)}</b><span>${esc(role(i.r).label)}</span></div>${stChip(i.s)}</div>`).join('')}</div>` : ''}</div>` : ''}
      ${V && !failed(V) ? `<div class="card pad"><div class="card-h">${ic('rocket')}Agent HQ version</div>
        <dl class="kv" style="grid-template-columns:96px 1fr"><dt>Running</dt><dd class="mono">${esc(V.short)} · ${esc(V.branch)}</dd>${V.lastShared ? `<dt>Last shared</dt><dd>${ago(V.lastShared.at)}</dd>` : ''}${V.partner ? `<dt>Partner sent</dt><dd><span class="mono">${esc(String(V.partner.commit || '').slice(0, 7))}</span> ${ago(V.partner.at)}${V.partner.notes ? `<br><span class="muted" style="font-size:12px">${esc(String(V.partner.notes).slice(0, 200))}</span>` : ''}</dd>` : ''}</dl>
        <div class="acts"><button class="btn sm" data-act="version-apply">${ic('download')}Update now</button><button class="btn sm ghost" data-act="version-share">${ic('send')}Share my version</button></div></div>` : ''}
    </aside></div>`;
  },
  after() { const l = $('#linkLog'); if (l) l.scrollTop = l.scrollHeight; },
};
ACT['link-poll'] = async () => { if (await run(() => api('POST', '/api/link/poll'), 'Checked')) { drop('link', 'coop'); schedule(); } };
ACT['link-say'] = async el => { const t = $('#linkSay').value.trim(); if (!t) return $('#linkSay').focus(); el.disabled = true; const r = await run(() => api('POST', '/api/link/say', { text: t }), 'Sent to your partner'); el.disabled = false; if (r) { U.draft.__link = ''; drop('link'); schedule(); } };
ACT['link-unpair'] = el => confirmBox({ title: `Unpair ${esc(el.dataset.name)}?`, text: 'Their HQ stops receiving your messages and board until you pair again.', ok: 'Unpair', tone: 'bad', act: 'link-unpair-go', data: { id: el.dataset.id } });
ACT['link-unpair-go'] = async el => { closeLayers(); if (await run(() => api('POST', '/api/link/unpair', { id: el.dataset.id }), 'Unpaired')) { drop('link'); schedule(); } };
ACT['link-setup'] = async () => { const botToken = $('#lkTok').value.trim(), channelId = $('#lkChan').value.trim(), name = $('#lkName').value.trim(); if (!botToken || !channelId) return toast('The bot token and channel id are both needed', true); if (await run(() => api('POST', '/api/link/setup', { botToken, channelId, name }), 'Connected')) { drop('link'); schedule(); } };
ACT['link-join'] = async () => { const invite = $('#lkInv').value.trim(); if (!invite) return $('#lkInv').focus(); if (await run(() => api('POST', '/api/link/join', { invite }), 'Joined')) { drop('link'); schedule(); } };
ACT['version-apply'] = () => confirmBox({ title: 'Update Agent HQ now?', text: 'It moves to the newest version of its branch and restarts in a few seconds. Running tasks may be cut short.', ok: 'Update', act: 'version-apply-go' });
ACT['version-apply-go'] = async () => { closeLayers(); await run(() => api('POST', '/api/version/apply', {}), 'Updating: Agent HQ restarts in a moment'); };
ACT['version-share'] = () => openModal({ title: 'Share your Agent HQ version', body: `<p>Posts your version and notes on HQ Link, so your partner sees “Update now”.</p><div class="field"><label for="shNotes">Notes <span class="muted">(optional)</span></label><textarea class="textarea" id="shNotes" maxlength="1500"></textarea></div>`, foot: `<button class="btn ghost" data-act="close">Cancel</button><button class="btn primary" data-act="version-share-go">${ic('send')}Share</button>` });
ACT['version-share-go'] = async () => { const notes = $('#shNotes').value.trim(); closeLayers(); if (await run(() => api('POST', '/api/version/share', notes ? { notes } : {}), 'Shared')) { drop('version'); schedule(); } };

// ================================================================ SETTINGS
PAGES.settings = {
  title: 'Settings',
  render(r) {
    const SC = want('schema', '/api/settings/schema');
    if (SC === undefined) return pageHead('Settings', '') + loadingCard(300);
    if (failed(SC)) return pageHead('Settings', '') + errCard(SC.__err, 'schema');
    const secs = [...SC.sections, { id: 'health', label: 'Health check' }];
    const cur = secs.some(s => s.id === r.a) ? r.a : 'usage';
    const head = pageHead('Settings', 'How Agent HQ runs: usage, lanes, engines, art, knowledge and connections. Changes save as you make them.');
    const t = `<nav class="tabs" aria-label="Sections">${secs.map(s => `<a href="#/settings/${s.id}" class="${cur === s.id ? 'on' : ''}">${esc(s.label)}</a>`).join('')}</nav>`;
    if (cur === 'health') return head + t + healthCheck();
    const fields = SC.fields.filter(f => f.section === cur);
    return head + t + `<div class="card pad">${fields.map(settingRow).join('') || '<p class="muted">Nothing here.</p>'}</div>`;
  },
};
function settingRow(f) {
  const v = S.settings[f.key];
  const opt = o => typeof o === 'object' ? [o.value, o.label || o.value] : [o, cap(String(o))];
  let ctl = '';
  if (f.type === 'bool') ctl = `<button class="switch ${v ? 'on' : ''}" role="switch" aria-checked="${!!v}" aria-label="${esc(f.label)}" data-act="set" data-key="${esc(f.key)}" data-type="bool" data-v="${!v}"></button>`;
  else if (f.type === 'enum') { const os = (f.options || []).map(opt); ctl = os.length <= 4 ? seg('set', v, os, `data-key="${esc(f.key)}" data-type="enum"`) : `<select class="select" data-setsel="${esc(f.key)}">${os.map(([a, b]) => `<option value="${esc(a)}" ${String(v) === String(a) ? 'selected' : ''}>${esc(b)}</option>`).join('')}</select>`; }
  else if (f.type === 'int' || f.type === 'number') ctl = `<div style="display:flex;gap:8px"><input class="input" style="width:120px" type="number" id="set_${esc(f.key)}" value="${esc(v ?? '')}" ${f.min != null ? `min="${f.min}"` : ''} ${f.max != null ? `max="${f.max}"` : ''} step="${f.type === 'int' ? 1 : 'any'}"><button class="btn sm" data-act="set-input" data-key="${esc(f.key)}" data-type="${f.type}">Save</button></div>`;
  else if (f.type === 'string') ctl = `<div style="display:flex;gap:8px"><input class="input" id="set_${esc(f.key)}" value="${esc(v ?? '')}" maxlength="${f.max || 500}"><button class="btn sm" data-act="set-input" data-key="${esc(f.key)}" data-type="string">Save</button></div>`;
  else return customSetting(f, v);
  return `<div class="set-row"><div class="t"><b>${esc(f.label)}</b><small>${esc(f.help || '')}</small></div><div class="ctl">${ctl}</div></div>`;
}
document.addEventListener('change', async e => {
  const k = e.target.dataset?.setsel; if (!k) return;
  const raw = e.target.value, value = /^\d+$/.test(raw) ? Number(raw) : raw;
  if (await run(() => api('POST', '/api/settings', { key: k, value }), 'Saved')) { S.settings[k] = value; schedule(); }
});
ACT['set-input'] = async el => {
  const k = el.dataset.key, t = el.dataset.type, raw = $('#set_' + k).value;
  const value = t === 'int' ? parseInt(raw, 10) : t === 'number' ? Number(raw) : raw.trim();
  if (t !== 'string' && !Number.isFinite(value)) return toast('That is not a number', true);
  const r = await run(() => api('POST', '/api/settings', { key: k, value }), 'Saved');
  if (r) { S.settings[k] = r.value ?? value; schedule(); }
};
function customSetting(f, v) {
  const wrap = body => `<div class="set-row" style="flex-direction:column;align-items:stretch"><div class="t"><b>${esc(f.label)}</b><small>${esc(f.help || '')}</small></div>${body}</div>`;
  if (f.key === 'laneSchedules') {
    const L = v || {};
    return wrap(`<div class="card" style="overflow:auto"><table class="table"><tr><th>Lane</th><th>On</th><th>Every (min)</th><th>From</th><th>To</th><th>Most tasks per run</th></tr>${Object.entries(L).map(([k, x]) => `<tr><td><b>${k === 'app' ? 'Claude app worker' : k === 'antigravity' ? 'Antigravity design' : esc(k)}</b></td>
      <td><button class="switch ${x.enabled ? 'on' : ''}" data-act="ls-toggle" data-k="${esc(k)}" role="switch" aria-checked="${!!x.enabled}" aria-label="${esc(k)} on"></button></td>
      <td><input class="input" style="width:90px;height:34px" type="number" min="5" max="1440" id="ls_${esc(k)}_every" value="${esc(x.everyMinutes)}"></td>
      <td><input class="input" style="width:90px;height:34px" id="ls_${esc(k)}_from" value="${esc(x.activeFrom)}"></td><td><input class="input" style="width:90px;height:34px" id="ls_${esc(k)}_to" value="${esc(x.activeTo)}"></td>
      <td><input class="input" style="width:80px;height:34px" type="number" min="1" max="20" id="ls_${esc(k)}_max" value="${esc(x.maxTasks)}"></td></tr>`).join('')}</table></div>
      <div><button class="btn sm primary" data-act="ls-save">${ic('check')}Save lane schedules</button></div>`);
  }
  if (f.key === 'roleEngines') {
    const E = v || {}, engines = ['app', 'claude-cli', 'antigravity', 'codex', 'groq', 'nim', 'echo'];
    return wrap(`<div class="card" style="overflow:auto;max-height:460px"><table class="table"><tr><th>Agent</th><th>Engine</th><th>Model</th></tr>${S.roles.map(x => `<tr><td>${av(x.id, 'sm')} <b style="margin-left:6px">${esc(x.label)}</b></td>
      <td><select class="select" style="height:34px;width:170px" id="re_${esc(x.id)}_e"><option value="">Default (${esc(x.engine || 'app')})</option>${engines.map(e => `<option value="${e}" ${E[x.id]?.engine === e ? 'selected' : ''}>${e}</option>`).join('')}</select></td>
      <td><input class="input" style="height:34px;width:200px" id="re_${esc(x.id)}_m" value="${esc(E[x.id]?.model || '')}" placeholder="${esc(x.model || 'default')}"></td></tr>`).join('')}</table></div>
      <div><button class="btn sm primary" data-act="re-save">${ic('check')}Save engines</button> <span class="muted" style="font-size:12px">Claude engines take opus, sonnet or haiku.</span></div>`);
  }
  if (f.key === 'schedules') {
    const list = Array.isArray(v) ? v : [];
    return wrap(`${list.length ? `<div class="list card">${list.map((s, i) => `<div class="li">${av(s.role, 'sm')}<div class="t"><b>${esc(s.title)}</b><span>${esc(role(s.role).label)} · every ${fmt(s.everyMinutes)} min${s.lastRunAt ? ' · last ran ' + ago(s.lastRunAt) : ''}</span></div><button class="switch ${s.enabled ? 'on' : ''}" data-act="sch-toggle" data-i="${i}" role="switch" aria-checked="${!!s.enabled}" aria-label="On"></button><button class="btn xs ghost" data-act="sch-del" data-i="${i}" aria-label="Delete">${ic('trash')}</button></div>`).join('')}</div>` : '<p class="muted" style="margin:0">No recurring tasks.</p>'}
      <div class="card pad" style="background:transparent"><div style="display:grid;grid-template-columns:1fr 180px 130px auto;gap:8px;align-items:end">
        <div class="field" style="margin:0"><label for="schTitle">Task</label><input class="input" id="schTitle" maxlength="200" placeholder="e.g. Read the charts and post 3 breakouts"></div>
        <div class="field" style="margin:0"><label for="schRole">Agent</label><select class="select" id="schRole">${S.roles.map(x => `<option value="${esc(x.id)}">${esc(x.label)}</option>`).join('')}</select></div>
        <div class="field" style="margin:0"><label for="schEvery">Every (min)</label><input class="input" id="schEvery" type="number" min="1" value="1440"></div>
        <button class="btn primary" data-act="sch-add">${ic('plus')}Add</button></div></div>`);
  }
  if (f.key === 'partnerAccess') {
    const x = v || {};
    return wrap(`<div class="card pad" style="background:transparent"><div class="row-sp" style="margin-bottom:12px"><span>Let your partner's requests run agents</span><button class="switch ${x.enabled ? 'on' : ''}" data-act="pa-toggle" role="switch" aria-checked="${!!x.enabled}" aria-label="Partner access"></button></div>
      <div class="grid g2"><div class="field"><label for="paLevel">Level</label><select class="select" id="paLevel">${[['read', 'Read only roles'], ['lane', 'Their file lane'], ['all', 'Everything, Lead included']].map(([a, b]) => `<option value="${a}" ${x.level === a ? 'selected' : ''}>${b}</option>`).join('')}</select></div><div class="field"><label for="paLimit">Tasks a day</label><input class="input" id="paLimit" type="number" min="0" value="${esc(x.dailyLimit ?? 0)}"></div></div>
      <div class="field"><span class="lbl">Agents they may use without asking</span><div class="chips" style="margin:0">${S.roles.map(r2 => `<button class="chip ${(x.autoRoles || []).includes(r2.id) ? 'on' : ''}" data-act="pa-role" data-id="${esc(r2.id)}">${esc(r2.label)}</button>`).join('')}</div></div>
      <button class="btn sm primary" data-act="pa-save">${ic('check')}Save partner access</button></div>`);
  }
  if (f.key === 'providers') {
    const pv = v || {};
    return wrap(`<div class="grid g2">${Object.entries(pv).map(([id, p]) => `<div class="card pad" style="background:transparent"><div class="card-h">${ic('key')}${esc(p.label || id)}<span class="sp"></span>${p.configured ? '<span class="tag g">Key saved</span>' : '<span class="tag">No key</span>'}</div><div style="display:flex;gap:8px"><input class="input" id="pv_${esc(id)}" type="password" autocomplete="off" placeholder="${p.configured ? 'Paste a new key to replace it' : 'Paste the API key'}"><button class="btn sm" data-act="pv-save" data-id="${esc(id)}">Save</button></div>${p.configured ? `<button class="btn xs ghost" style="margin-top:8px" data-act="pv-remove" data-id="${esc(id)}">${ic('trash')}Remove the key</button>` : ''}</div>`).join('')}</div><small class="muted">Keys are written to this PC only and never shown again.</small>`);
  }
  if (f.key === 'openCloud') return wrap(`<div class="row-sp"><span>${v?.configured ? '<span class="tag g">Connected</span>' : '<span class="tag">Not connected</span>'}</span><span class="muted" style="font-size:12.5px">Connect it per game: Games › a game › Live numbers.</span></div>`);
  if (f.key === 'coop') return wrap(`<div class="row-sp"><span>${v?.enabled ? `<span class="tag g">On</span> ${esc(gameName(v.game))} with ${esc(v.partner || 'your partner')}` : '<span class="tag">Off</span>'}</span><a class="btn sm" href="#/link">${ic('link')}Open HQ Link</a></div>`);
  if (f.key === 'codexAccounts' || f.key === 'claudeAccounts') {
    const list = Array.isArray(v) ? v : [];
    return wrap(`${list.length ? `<div class="list card">${list.map(a => `<div class="li">${ic('key')}<div class="t"><b>${esc(typeof a === 'string' ? a : a.name || a.label || a.id || 'Account')}</b>${typeof a === 'object' && a.status ? `<span>${esc(a.status)}</span>` : ''}</div></div>`).join('')}</div>` : '<p class="muted" style="margin:0">No extra accounts.</p>'}<small class="muted">Add one with <code class="mono">scripts/${f.key === 'codexAccounts' ? 'codex' : 'claude'}-add-account.ps1</code>; you sign in yourself.</small>`);
  }
  return wrap(`<div class="block mono">${esc(JSON.stringify(v, null, 2))}</div>`);
}
ACT['ls-toggle'] = el => { const k = el.dataset.k; S.settings.laneSchedules[k].enabled = !S.settings.laneSchedules[k].enabled; el.classList.toggle('on'); };
ACT['ls-save'] = async () => {
  const out = {};
  for (const [k, x] of Object.entries(S.settings.laneSchedules || {})) out[k] = { enabled: !!x.enabled, everyMinutes: parseInt($(`#ls_${k}_every`).value, 10), activeFrom: $(`#ls_${k}_from`).value.trim(), activeTo: $(`#ls_${k}_to`).value.trim(), maxTasks: parseInt($(`#ls_${k}_max`).value, 10) };
  const r = await run(() => api('POST', '/api/settings', { key: 'laneSchedules', value: out }), 'Lane schedules saved');
  if (r) { S.settings.laneSchedules = r.value; schedule(); }
};
ACT['re-save'] = async () => {
  const out = {};
  for (const x of S.roles) { const e = $(`#re_${x.id}_e`).value, m = $(`#re_${x.id}_m`).value.trim(); if (e) out[x.id] = { engine: e, model: m || null }; }
  const r = await run(() => api('POST', '/api/settings', { key: 'roleEngines', value: out }), 'Engines saved');
  if (r) { S.settings.roleEngines = r.value; loadState(); }
};
const saveSchedules = async (list, msg) => { const r = await run(() => api('POST', '/api/settings', { key: 'schedules', value: list }), msg); if (r) { S.settings.schedules = r.value; schedule(); } };
ACT['sch-toggle'] = el => { const list = (S.settings.schedules || []).map((s, i) => i === Number(el.dataset.i) ? { ...s, enabled: !s.enabled } : s); saveSchedules(list, 'Saved'); };
ACT['sch-del'] = el => saveSchedules((S.settings.schedules || []).filter((s, i) => i !== Number(el.dataset.i)), 'Removed');
ACT['sch-add'] = () => { const title = $('#schTitle').value.trim(), every = parseInt($('#schEvery').value, 10); if (!title) return $('#schTitle').focus(); if (!(every >= 1)) return toast('Every must be at least 1 minute', true); saveSchedules([...(S.settings.schedules || []), { role: $('#schRole').value, title, body: '', everyMinutes: every, enabled: true }], 'Recurring task added'); };
ACT['pa-toggle'] = el => { S.settings.partnerAccess = { ...S.settings.partnerAccess, enabled: !S.settings.partnerAccess?.enabled }; el.classList.toggle('on'); };
ACT['pa-role'] = el => { const pa = S.settings.partnerAccess || {}; const set = new Set(pa.autoRoles || []); set.has(el.dataset.id) ? set.delete(el.dataset.id) : set.add(el.dataset.id); S.settings.partnerAccess = { ...pa, autoRoles: [...set] }; el.classList.toggle('on'); };
ACT['pa-save'] = async () => {
  const value = { ...S.settings.partnerAccess, level: $('#paLevel').value, dailyLimit: parseInt($('#paLimit').value, 10) || 0 };
  const r = await run(() => api('POST', '/api/settings', { key: 'partnerAccess', value }), 'Partner access saved');
  if (r) { S.settings.partnerAccess = r.value; schedule(); } else loadState();
};
ACT['pv-save'] = async el => { const k = $('#pv_' + el.dataset.id).value.trim(); if (!k) return $('#pv_' + el.dataset.id).focus(); if (await run(() => api('POST', '/api/settings', { key: 'providers', value: { id: el.dataset.id, apiKey: k } }), 'Key saved')) loadState(); };
ACT['pv-remove'] = async el => { if (await run(() => api('POST', '/api/settings', { key: 'providers', value: { id: el.dataset.id, apiKey: null } }), 'Key removed')) loadState(); };
function healthCheck() {
  const H = want('readiness', '/api/readiness');
  if (H === undefined) return loadingCard(300);
  if (failed(H)) return errCard(H.__err, 'readiness');
  const ok = b => b ? `<span class="tag g">${ic('check', 'sm')}Ready</span>` : '<span class="tag y">Missing</span>';
  return `<div class="row-sp" style="margin-bottom:14px"><p class="muted" style="margin:0">Checked ${when(H.at)}. ${H.ok ? 'Everything the agents need is here.' : `${plural((H.missing || []).length, 'thing')} missing.`}</p><button class="btn sm" data-act="retry-load" data-key="readiness">${ic('refresh')}Check again</button></div>
    <div class="grid g2">
      <div class="card pad"><div class="card-h">${ic('code')}Tools</div><div class="list">${Object.entries(H.tools || {}).map(([k, t]) => `<div class="li" style="padding:8px 0">${ic('box')}<div class="t"><b>${esc(k)}</b><span>${esc(t.path || (t.found ? 'Found' : 'Not found on this PC'))}</span></div>${ok(t.found)}</div>`).join('')}</div></div>
      <div class="card pad"><div class="card-h">${ic('vault')}Knowledge</div><div class="list">${(H.knowledge || []).map(k => `<div class="li" style="padding:8px 0">${ic('book')}<div class="t"><b>${esc(k.label)}</b><span>${k.found ? `${fmt(k.notes)} notes · ${short(k.words)} words` : 'Not found'}</span></div>${ok(k.found)}</div>`).join('')}</div></div>
      <div class="card pad"><div class="card-h">${ic('brush')}Creative tools</div><div class="list">${(H.creative || []).map(c => `<div class="li" style="padding:8px 0">${ic('wand')}<div class="t"><b>${esc(c.label)}</b><span class="wrap">${esc(c.ready ? c.detail || 'Ready' : `${c.detail || 'Not ready'}${c.fix ? ' · fix: ' + c.fix : ''}`)}</span></div>${ok(c.ready)}</div>`).join('')}</div></div>
      <div class="card pad"><div class="card-h">${ic('team')}Agents with missing skills</div>${(H.roles || []).filter(x => (x.missing || []).length).length ? `<div class="list">${H.roles.filter(x => (x.missing || []).length).map(x => `<div class="li" style="padding:8px 0;align-items:flex-start">${av(x.id, 'sm')}<div class="t"><b>${esc(x.label)}</b><span class="wrap">${x.missing.map(esc).join(', ')}</span></div></div>`).join('')}</div>` : '<p class="muted" style="margin:0">Every agent has its skills.</p>'}</div>
    </div>`;
}

// ================================================================ HELP
PAGES.help = {
  title: 'Help',
  render() {
    const card = (icon, t, body, link) => `<div class="card pad"><div class="card-h">${ic(icon)}${t}</div><p class="muted" style="margin:0 0 ${link ? 12 : 0}px;font-size:13.5px;line-height:1.6">${body}</p>${link || ''}</div>`;
    return pageHead('Help', 'How Agent HQ works, in one page.') + `<div class="grid g3">
      ${card('lead', 'Ask the Lead', 'Say what you want built on Home or the Lead page. The Lead plans it and hands tasks to the right agents.', `<a class="btn sm" href="#/lead">${ic('right')}Open the Lead</a>`)}
      ${card('team', 'Talk to any agent', 'Every agent on the Team page has its own chat. A message becomes a task for it. Lessons shows what it has learned from you.', `<a class="btn sm" href="#/team">${ic('right')}Open the Team</a>`)}
      ${card('review', 'Review is your inbox', 'Pictures, decisions and finished work wait here. Approve, ask for changes, or pick an option; your answer goes straight back to the agent.', `<a class="btn sm" href="#/review">${ic('right')}Open Review</a>`)}
      ${card('tasks', 'Follow the work', 'Tasks shows everything open and done. Click one for what it did, step by step, and to cancel, rerun or move it to another game.', `<a class="btn sm" href="#/tasks">${ic('right')}Open Tasks</a>`)}
      ${card('games', 'Games and the pipeline', 'Each game moves through nine stages. The Producer asks to move it on; you approve on the game\'s Pipeline tab. The Publish gate records what only you do in Roblox.', `<a class="btn sm" href="#/games">${ic('right')}Open Games</a>`)}
      ${card('grid', 'The game menu', 'The menu at the top left picks one game. Home, Tasks, Review and the badges then show only that game. Pick All games to see everything.')}
      ${card('pause', 'Pause anytime', 'Pause all agents on Home or in Settings: running tasks finish and nothing new starts until you resume.')}
      ${card('shield', 'What HQ never does', 'It never publishes, never makes a game public and never spends Robux or money. Those stay with you.')}
      ${card('search', 'Keyboard', '<b>Ctrl K</b> search and jump anywhere. On Review: <b>1-9</b> pick an option, <b>A</b> approve, <b>C</b> ask for changes, <b>R</b> reject. <b>Esc</b> closes a panel.')}
    </div>`;
  },
};

// ================================================================ search (Ctrl K)
function cmdItems() {
  return [
    ...ALL_NAV.map(n => ({ g: 'Pages', label: n.label, icon: n.icon, go: () => { location.hash = '#/' + n.id; } })),
    { g: 'Actions', label: 'New task', icon: 'plus', go: () => newTaskModal() },
    { g: 'Actions', label: 'New game', icon: 'games', go: () => newGameModal() },
    { g: 'Actions', label: S.settings.paused ? 'Resume all agents' : 'Pause all agents', icon: S.settings.paused ? 'play' : 'pause', go: () => ACT.pause() },
    ...S.roles.map(r => ({ g: 'Agents', label: r.label, icon: role(r.id).icon, go: () => { location.hash = r.id === 'lead' ? '#/lead' : '#/team/' + r.id; } })),
    ...liveGames().map(g => ({ g: 'Games', label: g.name, icon: 'games', go: () => { location.hash = '#/games/' + g.slug; } })),
    ...S.tasks.filter(OPEN).map(t => ({ g: 'Open tasks', label: t.title, hint: ST_LBL[t.state], icon: 'tasks', go: () => openTask(t.id) })),
    ...needsYou().map(a => ({ g: 'Needs you', label: a.title, icon: 'bell', go: () => { U.rvSel = needsYou().indexOf(a); location.hash = '#/review'; schedule(); } })),
  ];
}
let cmdSel = 0, cmdList = [];
function openCmdk() { $('#cmdk').hidden = false; const i = $('#cmdkInput'); i.value = ''; cmdSel = 0; drawCmdk(); i.focus(); }
function drawCmdk() {
  const q = $('#cmdkInput').value.trim().toLowerCase();
  cmdList = cmdItems().filter(x => !q || String(x.label).toLowerCase().includes(q)).slice(0, 40);
  cmdSel = Math.min(cmdSel, Math.max(0, cmdList.length - 1));
  let g = '';
  $('#cmdkList').innerHTML = cmdList.map((x, i) => `${x.g !== g ? `<div class="cmdk-g">${esc(g = x.g)}</div>` : ''}<button class="${i === cmdSel ? 'on' : ''}" data-ci="${i}">${ic(x.icon)}<span class="l">${esc(x.label)}</span>${x.hint ? `<small>${esc(x.hint)}</small>` : ''}</button>`).join('') || '<div class="empty">No matches</div>';
  $('#cmdkList .on')?.scrollIntoView({ block: 'nearest' });
}
$('#cmdkInput').addEventListener('input', () => { cmdSel = 0; drawCmdk(); });
$('#cmdkList').addEventListener('click', e => { const b = e.target.closest('[data-ci]'); if (b) { $('#cmdk').hidden = true; cmdList[+b.dataset.ci].go(); } });
$('#cmdk').addEventListener('click', e => { if (e.target.id === 'cmdk') $('#cmdk').hidden = true; });

document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); return openCmdk(); }
  if (!$('#cmdk').hidden) {
    if (e.key === 'Escape') $('#cmdk').hidden = true;
    else if (e.key === 'ArrowDown') { cmdSel = Math.min(cmdSel + 1, cmdList.length - 1); drawCmdk(); e.preventDefault(); }
    else if (e.key === 'ArrowUp') { cmdSel = Math.max(cmdSel - 1, 0); drawCmdk(); e.preventDefault(); }
    else if (e.key === 'Enter' && cmdList[cmdSel]) { e.preventDefault(); $('#cmdk').hidden = true; cmdList[cmdSel].go(); }
    return;
  }
  if (e.key === 'Escape') { if (!$('#modal').hidden || !$('#drawer').hidden || !$('#menu').hidden) { closeLayers(); return; } $('#side').classList.remove('open'); }
  const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName || '');
  if (typing || e.ctrlKey || e.metaKey || e.altKey || !$('#modal').hidden || !$('#drawer').hidden || route().page !== 'review' || route().a) return;
  if (/^[1-9]$/.test(e.key)) { const b = $$('#view .decide [data-act="answer"]')[Number(e.key) - 1]; if (b) { e.preventDefault(); b.click(); } return; }
  const map = { a: '[data-act="answer"][data-v="approve"]', c: '[data-act="ask-note"][data-mode="changes"]', r: '[data-act="ask-note"][data-mode="reject"]' };
  const sel = map[e.key.toLowerCase()];
  if (sel && $('#view ' + sel)) { e.preventDefault(); $('#view ' + sel).click(); }
});

// ================================================================ the galaxy (vault card and hero)
function starfield(cv, big) {
  if (!cv) return;
  const ctx = cv.getContext('2d');
  let W = 0, H = 0; const dpr = Math.min(2, devicePixelRatio || 1);
  const fit = () => { const r = cv.getBoundingClientRect(); W = r.width; H = r.height; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
  fit();
  const N = big ? 620 : 420;
  const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
  const pts = Array.from({ length: N }, () => { const r = Math.abs(gauss()) * (big ? .34 : .3) + .012, h = Math.random(); return { a: Math.random() * Math.PI * 2, r, s: .35 + Math.random() * (r < .12 ? 2 : 1.2), sp: .0004 + .0025 * (.05 / (r + .05)), hue: h < .3 ? 315 : h < .7 ? 265 : 225, tw: Math.random() * 6 }; });
  const dust = Array.from({ length: 130 }, () => ({ x: Math.random(), y: Math.random(), s: Math.random() * 1.1 }));
  let t = 0, id = 0, last = -1e9, seen = true;
  const io = new IntersectionObserver(([en]) => { seen = en.isIntersecting; }); io.observe(cv);
  const draw = (now = 0) => {
    if (!seen || document.hidden || now - last < 33) { id = requestAnimationFrame(draw); return; }
    last = now; t++;
    ctx.clearRect(0, 0, W, H);
    for (const d of dust) { ctx.fillStyle = `rgba(255,255,255,${.15 + .25 * Math.sin(t * .02 + d.x * 20) ** 2})`; ctx.fillRect(d.x * W, d.y * H, d.s, d.s); }
    const X0 = W * (big ? .68 : .78), Y0 = H * .5, sc = Math.max(W, H);
    const pos = pts.map(p => { p.a += p.sp; const rr = p.r * sc; return [X0 + Math.cos(p.a) * rr * 1.25, Y0 + Math.sin(p.a) * rr * .5]; });
    for (const [ox, oy, rad, col] of [[-.12, -.05, .28, '140,90,255'], [.05, .08, .22, '255,90,200'], [-.22, .1, .2, '80,120,255']]) {
      const gx = X0 + ox * sc, gy = Y0 + oy * sc, gr = ctx.createRadialGradient(gx, gy, 0, gx, gy, rad * sc);
      gr.addColorStop(0, `rgba(${col},.13)`); gr.addColorStop(1, `rgba(${col},0)`); ctx.fillStyle = gr; ctx.fillRect(0, 0, W, H);
    }
    ctx.lineWidth = .55;
    const L = Math.min(N, 150), D = big ? 2600 : 1800, paths = [new Path2D(), new Path2D(), new Path2D(), new Path2D()];
    for (let i = 0; i < L; i++) { const [x1, y1] = pos[i]; for (let j = i + 1; j < L; j++) { const [x2, y2] = pos[j], dx = x1 - x2, dy = y1 - y2, d2 = dx * dx + dy * dy; if (d2 < D) { const b = Math.min(3, Math.floor((1 - d2 / D) * 4)); paths[b].moveTo(x1, y1); paths[b].lineTo(x2, y2); } } }
    paths.forEach((pth, b) => { ctx.strokeStyle = `rgba(185,165,255,${((b + .5) / 4) * .28})`; ctx.stroke(pth); });
    for (let i = 0; i < N; i++) { const p = pts[i], [x, y] = pos[i]; ctx.fillStyle = `hsla(${p.hue},90%,80%,${.45 + .55 * Math.abs(Math.sin(t * .03 + p.tw))})`; ctx.beginPath(); ctx.arc(x, y, p.s, 0, 7); ctx.fill(); }
    for (let k = 0; k < 5; k++) {
      const ang = Math.PI + (k - 2) * .14 + Math.sin(t * .004 + k) * .05, len = sc * (.18 + k * .03);
      const g = ctx.createLinearGradient(X0, Y0, X0 + Math.cos(ang) * len, Y0 + Math.sin(ang) * len * .5);
      g.addColorStop(0, 'rgba(255,255,255,.9)'); g.addColorStop(1, 'rgba(160,140,255,0)');
      ctx.strokeStyle = g; ctx.lineWidth = 2.2 - k * .3; ctx.beginPath(); ctx.moveTo(X0, Y0); ctx.lineTo(X0 + Math.cos(ang) * len, Y0 + Math.sin(ang) * len * .5); ctx.stroke();
    }
    const R0 = big ? 34 : 22;
    const g = ctx.createRadialGradient(X0, Y0, R0 * .4, X0, Y0, R0 * 3.2);
    g.addColorStop(0, 'rgba(200,170,255,.55)'); g.addColorStop(.4, 'rgba(120,80,255,.25)'); g.addColorStop(1, 'rgba(60,30,160,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(X0, Y0, R0 * 3.6, R0 * 2, 0, 0, 7); ctx.fill();
    ctx.lineWidth = big ? 5 : 3.5; ctx.strokeStyle = 'rgba(255,255,255,.95)'; ctx.shadowColor = '#c9b6ff'; ctx.shadowBlur = 22;
    ctx.beginPath(); ctx.ellipse(X0, Y0, R0, R0 * .78, 0, 0, 7); ctx.stroke(); ctx.shadowBlur = 0;
    ctx.fillStyle = '#05040a'; ctx.beginPath(); ctx.ellipse(X0, Y0, R0 * .78, R0 * .58, 0, 0, 7); ctx.fill();
    id = requestAnimationFrame(draw);
  };
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { draw(1e9); cancelAnimationFrame(id); } else id = requestAnimationFrame(draw);
  const ro = new ResizeObserver(fit); ro.observe(cv);
  rafs.push(() => { cancelAnimationFrame(id); io.disconnect(); ro.disconnect(); });
}
let galaxyI = 0;
setInterval(() => {
  const el = $('#galaxyLine'), w = gTasks().filter(t => t.state === 'working');
  if (!el || w.length < 2) return;
  const t = w[++galaxyI % w.length];
  el.style.opacity = 0; setTimeout(() => { el.innerHTML = `<b>${esc(role(t.role).label)}</b> is working on ${esc(t.title)}`; el.style.opacity = 1; }, 300);
}, 4500);

// ================================================================ every live game needs an icon
let pickerFor = '';
async function iconChoices(g) {
  if (!X.assets || failed(X.assets)) { try { X.assets = await api('GET', '/api/assets'); } catch { X.assets = { assets: [] }; } }
  const order = ['thumbnail', 'icon', 'image'];
  const fromAssets = (X.assets.assets || []).filter(a => a.scope === `game:${g.slug}` && order.includes(a.kind) && isImg(a.file) && !a.missing).sort((a, b) => order.indexOf(a.kind) - order.indexOf(b.kind)).map(a => ({ path: a.file, name: a.name }));
  const fromReviews = S.asks.filter(a => a.mediaPath && isImg(a.mediaPath) && askGame(a) === g.slug).map(a => ({ path: a.mediaPath, name: a.title }));
  const seen = new Set();
  return [...fromAssets, ...fromReviews].filter(o => !seen.has(o.path) && seen.add(o.path)).slice(0, 24);
}
async function iconPicker() {
  const box = $('#iconPick');
  if (!S.loaded || !$('#modal').hidden) return;
  const todo = liveGames().filter(x => !x.icon);
  if (!todo.length) { if (box) box.hidden = true; pickerFor = ''; return; }
  const asked = g => { try { return Date.now() - (Number(localStorage.getItem(`hq-icon-asked-${g.slug}`)) || 0) < 24 * 3600e3; } catch { return false; } };
  let g = null, opts = [];
  for (const x of todo) { const o = await iconChoices(x); if (o.length) { g = x; opts = o; break; } if (!asked(x)) { g = x; break; } }
  if (!g) { if (box) box.hidden = true; pickerFor = ''; return; }
  if (pickerFor === g.slug && box && !box.hidden) return;
  pickerFor = g.slug;
  const el = box || document.body.appendChild(Object.assign(document.createElement('div'), { id: 'iconPick', className: 'icon-pick' }));
  el.hidden = false; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-labelledby', 'ipTitle');
  el.innerHTML = `<div class="ip-card"><h2 id="ipTitle">Pick an icon for ${esc(g.name)}</h2><p class="sub">Every game needs one: it shows in the game menu and on its card. Pick from what the agents made for it.</p>
    ${opts.length ? `<div class="ip-grid">${opts.map(o => `<button class="ip-opt" data-act="icon-set" data-slug="${esc(g.slug)}" data-path="${esc(o.path)}" title="${esc(o.name)}"><img src="${mediaUrl(o.path)}" alt="${esc(o.name)}"></button>`).join('')}</div>`
      : `<p>No thumbnails or concept images for this game yet.</p><div class="acts"><button class="btn primary" data-act="icon-make" data-slug="${esc(g.slug)}">${ic('wand')}Ask the Thumbnail artist for 3 icon options</button><button class="btn ghost" data-act="icon-later" data-slug="${esc(g.slug)}">Not now</button></div>`}</div>`;
  hydrate(el);
  el.querySelector('button')?.focus();
}

// ================================================================ latest-copy check: a quiet bar when HQ is behind its branch
async function freshBar() {
  let f; try { f = await api('GET', '/api/copies'); } catch { return; }
  let bar = $('#freshBar');
  if (f.ok) { if (bar) bar.hidden = true; return; }
  bar ||= document.body.appendChild(Object.assign(document.createElement('div'), { id: 'freshBar', className: 'fresh-bar' }));
  bar.setAttribute('role', 'status');
  const lines = [];
  if (f.hq?.behind) lines.push(`Agent HQ is ${plural(f.hq.behind, 'commit')} behind ${esc(f.hq.branch)}. <button class="btn xs primary" data-act="version-apply">Update now</button>`);
  for (const x of (f.sessions || []).filter(x => x.active && x.missing)) lines.push(`Claude session <b>${esc(x.branch)}</b> is missing ${plural(x.missing, 'newer Agent HQ commit')}: pull ${esc(f.hq.branch)} into it before it changes Agent HQ.`);
  for (const g of (f.games || []).filter(g => g.stale)) lines.push(`${esc(gameName(g.slug))} has a newer copy (${esc(g.newest.commit)}${g.newest.branches.length ? ` on ${g.newest.branches.map(esc).join(', ')}` : ''}) than the one HQ builds in (${esc(g.hqCommit || 'none')}).`);
  if (!lines.length) { bar.hidden = true; return; }
  bar.hidden = false;
  bar.innerHTML = `${ic('info')}<div>${lines.join('<br>')}</div><button class="icon-btn" data-act="fresh-x" aria-label="Hide until the next check">${ic('x')}</button>`;
  hydrate(bar);
}
ACT['fresh-x'] = () => { $('#freshBar').hidden = true; };
ACT['icon-later'] = el => { try { localStorage.setItem(`hq-icon-asked-${el.dataset.slug}`, String(Date.now())); } catch { /* private mode */ } $('#iconPick').hidden = true; pickerFor = ''; iconPicker(); };

// ================================================================ live updates and boot
function listen() {
  if (!TOKEN) return;
  const es = new EventSource(BASE + '/api/events?token=' + encodeURIComponent(TOKEN));
  for (const t of ['task', 'ask', 'pitch', 'settings', 'game', 'stage', 'role']) es.addEventListener(t, loadSoon);
  const onMsg = e => { let m = null; try { m = JSON.parse(e.data); } catch { /* not json */ } drop('threads'); if (m?.role) drop('msgs:' + m.role); else drop('msgs'); const p = route().page; if (p === 'lead' || p === 'team') schedule(); };
  es.addEventListener('message', onMsg);
  es.addEventListener('log', onMsg);
  es.addEventListener('notebook', () => { drop('notebook', 'nbdoc'); if (route().page === 'vault') schedule(); });
  es.onerror = () => { /* the browser reconnects by itself; the minute timer keeps the page fresh */ };
}
$('#refresh').addEventListener('click', async () => {
  const b = $('#refresh'); b.classList.add('spin');
  const p = route().page;
  for (const k of Object.keys(X)) if (!['schema', 'vault', 'playbook'].includes(k)) delete X[k];
  await loadState();
  b.classList.remove('spin'); toast(p === 'home' ? 'Up to date' : 'Refreshed');
});
setInterval(() => { if (S.loaded) renderTop(route(), $('#crumbPage').textContent); }, 15000);
setInterval(loadState, 60000);
setInterval(() => { if (route().page === 'chat') { drop('discord'); schedule(); } }, 30000);
setTimeout(freshBar, 4000);
setInterval(freshBar, 10 * 60000);

hydrate();
window.addEventListener('hashchange', onHash);
lastHash = location.hash;
render(true);
loadState();
listen();
})();
