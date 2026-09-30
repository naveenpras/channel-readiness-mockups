(function () {
  const IMG = {
    shoe: ['shoe-hero', 'shoe-side', 'shoe-pair', 'shoe-detail', 'shoe-alt', 'shoe-alt2'],
    polo: ['polo-front', 'polo-back', 'polo-angle', 'polo-alt', 'polo-lifestyle'],
    wshirt: ['wshirt-front', 'wshirt-back', 'wshirt-pose', 'wshirt-alt'],
    camera: ['camera-front', 'camera-back', 'camera-top', 'camera-inbox'],
    drill: ['drill-hero', 'drill-detail', 'drill-detail2', 'drill-battery', 'drill-callouts'],
  };
  const img = (set, i) => 'assets/' + IMG[set][i % IMG[set].length] + '.jpg';
  let seed = 11;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  const F = (id, set, i, folder) => ({ id, img: img(set, i), folder });

  const fw = [];
  [['shoes-black_60026-1', 0], ['shoes-black_60026-2', 1], ['shoes-white_70026-1', 4], ['shoes-white_70026-2', 5]].forEach(([id, i]) => fw.push(F(id, 'shoe', i, 'footwear/spring-26')));
  const names = ['shoes', 'runner', 'trail', 'loafer', 'boot', 'sneaker', 'sandal'];
  const vars = ['black', 'white', 'navy', 'red', 'grey', 'tan'];
  for (let i = 0; i < 144; i++) {
    const sku = String(60100 + i * 7), n = 1 + Math.floor(rnd() * 4);
    for (let p = 1; p <= n; p++) fw.push(F(names[i % 7] + '-' + vars[(i * 5) % 6] + '_' + sku + '-' + p, 'shoe', i + p, 'footwear/spring-26'));
    if (i === 9) ['shoes-black-60031', 'spring-banner_hero', 'lookbook_cover'].forEach((id, k) => fw.push(F(id, 'shoe', k, 'footwear/spring-26')));
    if (i === 60) ['IMG_4471', 'size-chart_all', 'IMG_4472'].forEach((id, k) => fw.push(F(id, 'shoe', k + 2, 'footwear/spring-26')));
  }
  const te = [];
  const L = 'ABCDEFGHJKLMNPRSTUVWXYZ';
  const models = ['E7SA', 'K2PB'];
  while (models.length < 38) models.push(L[Math.floor(rnd() * 23)] + Math.floor(rnd() * 10) + L[Math.floor(rnd() * 23)] + L[Math.floor(rnd() * 23)]);
  models.forEach((m, i) => {
    const n = 1 + Math.floor(rnd() * 3), date = ['1123', '0924', '0326'][i % 3];
    for (let p = 1; p <= n; p++) te.push(F(m + '_0' + p + '_' + date, i % 2 ? 'drill' : 'camera', i + p, 'testequity/uploads'));
    if (i === 5) ['E7SA-datasheet', 'catalog_2024'].forEach((id, k) => te.push(F(id, 'camera', k, 'testequity/uploads')));
  });
  const as = [];
  const codes = ['M006OA'];
  while (codes.length < 46) codes.push((rnd() > 0.5 ? 'M' : 'W') + String(Math.floor(rnd() * 900) + 100).padStart(3, '0') + L[Math.floor(rnd() * 23)] + L[Math.floor(rnd() * 23)]);
  codes.forEach((c, i) => {
    const colors = i % 4 === 0 ? ['9073', '1120'] : [String(1000 + Math.floor(rnd() * 8999))];
    colors.forEach((col, ci) => { const n = 1 + Math.floor(rnd() * 3); for (let s = 0; s < n; s++) as.push(F(c + '-' + col + '-' + s, i % 2 ? 'wshirt' : 'polo', i + s + ci, 'allsaints/ss26')); });
    if (i === 7) ['lookbook-ss26', 'M006OA_9073_0'].forEach((id, k) => as.push(F(id, 'polo', k, 'allsaints/ss26')));
  });

  const FOLDERS = [
    { key: 'footwear', label: 'footwear/spring-26', files: fw },
    { key: 'testequity', label: 'testequity/uploads', files: te },
    { key: 'allsaints', label: 'allsaints/ss26', files: as },
  ];
  const SAVED = [
    { id: 'fw', name: 'Footwear files', pattern: '{product}-{variant}_{sku}-{position}', folder: 'footwear', used: 'Last used 12 Sep 2026' },
    { id: 'te', name: 'TestEquity uploads', pattern: '{sku}_{position}_{date}', folder: 'testequity', used: 'Last used 3 Sep 2026' },
    { id: 'as', name: 'AllSaints product code', pattern: '{sku}-{colorcode}-{sequence}', folder: 'allsaints', used: 'Last used 28 Aug 2026' },
  ];

  const EXISTING = {
    '60026': { name: 'Shoes black', assets: [F('shoes-black_60026-1', 'shoe', 0, 'footwear/spring-26')] },
    '70026': { name: 'Shoes white', assets: [F('shoes-white_studio_70026', 'shoe', 3, 'footwear/archive')] },
    'E7SA': { name: 'E7SA signal analyzer', assets: [F('E7SA_front_legacy', 'camera', 0, 'testequity/archive'), F('E7SA_back_legacy', 'camera', 1, 'testequity/archive')] },
    'K2PB': { name: 'K2PB power supply', assets: [F('K2PB_main', 'drill', 0, 'testequity/archive')] },
    'M006OA': { name: 'Brace polo', assets: [F('M006OA-9073-0', 'polo', 0, 'allsaints/ss26'), F('M006OA_campaign', 'polo', 4, 'allsaints/campaign')] },
    'FTW-RUN-60026': { name: 'Trail runner', assets: ['shoe-hero', 'shoe-side', 'shoe-pair', 'shoe-detail'].map((n, i) => F('FTW-RUN-60026_' + (i + 1), 'shoe', IMG.shoe.indexOf(n), 'catalog/footwear')) },
    'APW-SHT-30026': { name: 'Classic polo', assets: [0, 1, 2].map((i) => F('APW-SHT-30026_' + (i + 1), 'polo', i, 'catalog/apparel')) },
    'CAM-DSLR-10026': { name: 'Mirrorless camera body', assets: [0, 1, 2, 3].map((i) => F('CAM-DSLR-10026_' + (i + 1), 'camera', i, 'catalog/electronics')) },
  };
  for (let i = 0; i < 144; i += 9) { const sku = String(60100 + i * 7); EXISTING[sku] = { name: names[i % 7][0].toUpperCase() + names[i % 7].slice(1) + ' ' + vars[(i * 5) % 6], assets: [F(sku + '_legacy', 'shoe', i, 'footwear/archive')] }; }

  const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const isIgnore = (t) => !t || t === 'ignore' || t[0] === '_';
  function compile(pattern) {
    const toks = [], lits = []; let re = '^', last = 0, m; const rx = /\{([^}]*)\}/g;
    while ((m = rx.exec(pattern))) { const lit = pattern.slice(last, m.index); lits.push(lit); re += esc(lit) + '([^/]+?)'; toks.push(m[1].trim().toLowerCase()); last = rx.lastIndex; }
    const tail = pattern.slice(last).replace(/\.(jpe?g|png|webp|tiff?)$/i, ''); lits.push(tail); re += esc(tail) + '$';
    const skuIdx = toks.indexOf('sku');
    let error = null;
    if (!pattern.trim()) error = 'Type a pattern to start matching files.';
    else if (/[{}]/.test(pattern.replace(/\{[^{}]*\}/g, ''))) error = 'A brace is not closed. Fields look like {position}.';
    else if (toks.some((t) => !t)) error = 'A field has no name. Use a name such as {position}.';
    else if (skuIdx < 0) error = 'Add {sku} so we know which part of the name is the SKU.';
    else if (toks.filter((t) => t === 'sku').length > 1) error = 'Use {sku} only once.';
    else if (lits.slice(1, -1).some((l) => l === '')) error = 'Put a separator such as - or _ between fields.';
    return { toks, lits, re: new RegExp(re), skuIdx, error };
  }
  const cap = (s) => s ? s[0].toUpperCase() + s.slice(1) : s;
  function guessName(fields) {
    const a = fields.product || fields.name || fields.model || '', b = fields.variant || fields.color || fields.colour || '';
    return [cap(a), b].filter(Boolean).join(' ');
  }
  function parts(c, m) {
    const out = [];
    c.toks.forEach((t, i) => { if (c.lits[i]) out.push({ text: c.lits[i], tok: null }); out.push({ text: m[i + 1], tok: t, isSku: i === c.skuIdx }); });
    if (c.lits[c.toks.length]) out.push({ text: c.lits[c.toks.length], tok: null });
    return out;
  }
  function run(folderKey, pattern) {
    const f = FOLDERS.find((x) => x.key === folderKey) || FOLDERS[0];
    const c = compile(pattern);
    const empty = { products: 0, created: 0, updated: 0, unchanged: 0, files: 0, newLinks: 0, unmatched: f.files.length, total: f.files.length };
    if (c.error) return { error: c.error, products: [], unmatched: f.files, stats: empty, toks: c.toks };
    const map = new Map(), unmatched = [];
    for (const file of f.files) {
      const m = c.re.exec(file.id);
      if (!m || !m[c.skuIdx + 1]) { unmatched.push(file); continue; }
      const sku = m[c.skuIdx + 1], fields = {};
      c.toks.forEach((t, i) => { fields[t] = m[i + 1]; });
      const meta = c.toks.map((t, i) => ({ key: t, val: m[i + 1] })).filter((x, i) => i !== c.skuIdx && !isIgnore(x.key));
      if (!map.has(sku)) map.set(sku, { sku, files: [], fields });
      map.get(sku).files.push({ ...file, meta, parts: parts(c, m) });
    }
    const products = [...map.values()].map((p) => {
      const ex = EXISTING[p.sku], linked = new Set(ex ? ex.assets.map((a) => a.id) : []);
      p.files.forEach((fl) => { fl.already = linked.has(fl.id); });
      const newCount = p.files.filter((x) => !x.already).length;
      return { ...p, status: !ex ? 'new' : newCount ? 'updated' : 'unchanged', name: ex ? ex.name : guessName(p.fields), existing: ex ? ex.assets.filter((a) => !p.files.some((fl) => fl.id === a.id)) : [], newCount };
    });
    const st = { products: products.length, created: 0, updated: 0, unchanged: 0, files: 0, newLinks: 0, unmatched: unmatched.length, total: f.files.length };
    products.forEach((p) => { st[p.status === 'new' ? 'created' : p.status]++; st.files += p.files.length; st.newLinks += p.newCount; });
    return { error: null, products, unmatched, stats: st, toks: c.toks };
  }
  function splitSample(id) {
    return id.split(/([-_.])/).filter((s) => s !== '').map((s) => (/^[-_.]$/.test(s) ? { lit: s } : { text: s, role: 'ignore' }));
  }
  function segments(id, pattern) {
    const c = compile(pattern), m = !c.error || c.toks.length ? c.re.exec(id) : null;
    if (m) { const out = []; c.toks.forEach((t, i) => { if (c.lits[i]) out.push({ lit: c.lits[i] }); out.push({ text: m[i + 1], role: t }); }); if (c.lits[c.toks.length]) out.push({ lit: c.lits[c.toks.length] }); return { segs: out, matched: true }; }
    return { segs: splitSample(id), matched: false };
  }
  const buildPattern = (segs) => segs.map((s) => (s.lit != null ? s.lit : '{' + (s.role || 'ignore') + '}')).join('');
  const LIBRARY = [];
  const seen = new Set();
  Object.values(EXISTING).forEach((e) => e.assets.forEach((a) => { if (!seen.has(a.id)) { seen.add(a.id); LIBRARY.push(a); } }));
  FOLDERS.forEach((f) => f.files.forEach((a) => { if (!seen.has(a.id)) { seen.add(a.id); LIBRARY.push(a); } }));
  const findSku = (q) => { const k = Object.keys(EXISTING).find((s) => s.toLowerCase() === q.trim().toLowerCase()); return k ? { sku: k, ...EXISTING[k] } : null; };
  const suggest = (q) => { const t = q.trim().toLowerCase(); if (!t) return []; return Object.keys(EXISTING).filter((s) => s.toLowerCase().includes(t) || EXISTING[s].name.toLowerCase().includes(t)).slice(0, 5).map((s) => ({ sku: s, ...EXISTING[s] })); };
  const searchLib = (q, n) => { const t = (q || '').trim().toLowerCase(); return (t ? LIBRARY.filter((a) => a.id.toLowerCase().includes(t) || a.folder.includes(t)) : LIBRARY).slice(0, n || 24); };
  const ROLES = ['sku', 'product', 'variant', 'colorcode', 'position', 'sequence', 'date', 'ignore'];
  window.PP = { FOLDERS, SAVED, EXISTING, LIBRARY, ROLES, compile, run, segments, buildPattern, findSku, suggest, searchLib, isIgnore };
})();
