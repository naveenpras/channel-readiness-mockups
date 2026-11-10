(function () {
  // Sample data + shared logic for the Edit product options (A and B).
  // Every metadata value carries a source: 'filename' (read by a pattern), 'existing' (already on the asset
  // before the product was created) or 'manual' (typed by a person).
  const mk = (o) => Object.assign({ labels: [], desc: '', label: '', labelSrc: null, meta: [], fileMeta: [], fileSeq: null, matched: true, unread: false, seq: null, seqSrc: null }, o, { img: 'assets/' + o.file + '.jpg' });
  const fm = (k, v) => ({ k, v, src: 'filename' });
  const LABELS = ['Main', 'Back', 'Side', 'Angle', 'Detail', 'Pair', 'Lifestyle', 'Packaging', 'Scale', 'Infographic'];
  const SRC = {
    filename: { label: 'From file name', short: 'File name', bg: '#EEF1FB', fg: '#3448C5', dot: '#3448C5' },
    existing: { label: 'Existing metadata', short: 'Existing', bg: '#F1F3F7', fg: '#4A5568', dot: '#8A94A6' },
    manual: { label: 'Set by you', short: 'Edited', bg: '#E7F6EE', fg: '#1B7F4B', dot: '#1B7F4B' },
  };
  const FIELDS = [
    { key: 'name', label: 'Name', req: '', multi: false, mono: false, ph: 'Product name' },
    { key: 'asin', label: 'ASIN', req: 'Amazon', multi: false, mono: true, ph: 'For example B0C8XK2N4T' },
    { key: 'ean', label: 'EAN', req: 'Amazon, Walmart', multi: false, mono: true, ph: '13 digits, for example 5901234123457' },
    { key: 'description', label: 'Description', req: '', multi: true, mono: false, ph: 'Describe the product for shoppers' },
  ];

  // The product metadata listed in IMG-8251. UPC, GTIN, EAN, ASIN and JAN are identifiers customers need depending on
  // the channel. Product, Variant and Brand are optional. Sequence is per asset, so it lives on the asset list.
  const FIELDS_JIRA = [
    { key: 'upc', label: 'UPC', req: '', hint: 'Walmart suggests EAN, UPC or GTIN', mono: true, ph: '12 digits, for example 012345678905' },
    { key: 'gtin', label: 'GTIN', req: 'Target', hint: '', mono: true, ph: '8, 12, 13 or 14 digits' },
    { key: 'ean', label: 'EAN', req: '', hint: 'Walmart suggests EAN, UPC or GTIN', mono: true, ph: '13 digits, for example 5901234123457' },
    { key: 'asin', label: 'ASIN', req: 'Amazon', hint: '', mono: true, ph: 'For example B0C8XK2N4T' },
    { key: 'jan', label: 'JAN', req: '', hint: 'Japan’s version of the GTIN', mono: true, ph: '13 digits, for example 4901234567894' },
    { key: 'name', label: 'Product', ph: 'Product name' },
    { key: 'variant', label: 'Variant', ph: 'Style, size, colour code or colorway' },
    { key: 'brand', label: 'Brand', ph: 'Brand name' },
    { key: 'description', label: 'Description', multi: true, ph: 'Describe the product for shoppers' },
  ];

  const PRODUCTS = {
    '60026': {
      sku: '60026', pattern: '{product}-{variant}_{sku}-{position}', patternName: 'Footwear files', folder: 'footwear/spring-26', created: '12 Sep 2026',
      map: [['sku', 'SKU'], ['product', 'Name'], ['variant', 'Name'], ['position', 'Sequence']],
      fields: {
        name: { v: 'Shoes black', src: 'filename', from: '{product} {variant}' },
        asin: { v: '', src: null, cands: [{ v: 'B0C8XK2N4T', src: 'existing', from: 'shoes-black_60026-1' }, { v: 'B0C8XK2N5U', src: 'existing', from: 'shoes-black_60026-3' }] },
        ean: { v: '', src: null, cands: [] },
        description: { v: '', src: null, cands: [{ v: 'Lightweight trail runner with a grippy lug sole and a breathable mesh upper.', src: 'existing', from: 'shoes-black_60026-1' }] },
      },
      assets: [
        mk({ id: 'shoes-black_60026-1', file: 'shoe-hero', seq: 1, seqSrc: 'filename', fileSeq: 1, label: 'Main', labelSrc: 'existing', meta: [fm('variant', 'black')] }),
        mk({ id: 'shoes-black_60026-2', file: 'shoe-side', seq: 2, seqSrc: 'filename', fileSeq: 2, label: 'Side', labelSrc: 'existing', meta: [fm('variant', 'black')] }),
        mk({ id: 'shoes-black_60026-3', file: 'shoe-pair', seq: 3, seqSrc: 'filename', fileSeq: 3, meta: [fm('variant', 'black')] }),
        mk({ id: 'shoes-black_60026-4', file: 'shoe-detail', seq: 4, seqSrc: 'filename', fileSeq: 4, meta: [fm('variant', 'black')] }),
      ],
    },
    'M006OA': {
      sku: 'M006OA', pattern: '{sku}-{colorcode}-{sequence}', patternName: 'AllSaints product code', folder: 'allsaints/ss26', created: '28 Aug 2026',
      map: [['sku', 'SKU'], ['colorcode', 'Asset metadata: colorcode'], ['sequence', 'Sequence']],
      fields: {
        name: { v: 'Brace polo', src: 'existing', from: 'M006OA-9073-1' },
        asin: { v: 'B0BX7QK91L', src: 'existing', from: 'M006OA-9073-1' },
        ean: { v: '5059912345678', src: 'manual', from: '' },
        description: { v: 'Slim-fit polo in organic cotton piqué with a ribbed collar and two-button placket.', src: 'existing', from: 'M006OA-9073-1' },
      },
      assets: [
        mk({ id: 'M006OA-9073-1', file: 'polo-front', seq: 1, seqSrc: 'filename', fileSeq: 1, label: 'Main', labelSrc: 'existing', meta: [fm('colorcode', '9073')] }),
        mk({ id: 'M006OA-9073-3', file: 'polo-angle', seq: 2, seqSrc: 'manual', fileSeq: 3, meta: [fm('colorcode', '9073')] }),
        mk({ id: 'M006OA-9073-2', file: 'polo-back', seq: 3, seqSrc: 'manual', fileSeq: 2, label: 'Back', labelSrc: 'existing', meta: [fm('colorcode', '9073')] }),
        mk({ id: 'M006OA-9073-4', file: 'polo-alt', seq: 4, seqSrc: null, fileSeq: 4, unread: true, fileMeta: [fm('colorcode', '9073')] }),
        mk({ id: 'M006OA_campaign', file: 'polo-lifestyle', seq: 5, seqSrc: 'manual', label: 'Lifestyle', labelSrc: 'manual', matched: false }),
      ],
    },
    // The three SKUs below match the SKU details screen. Their originals use the {sku}_{position} naming.
    'TLS-DRL-50026': {
      sku: 'TLS-DRL-50026', pattern: '{sku}_{position}', patternName: 'SKU and position', folder: 'tools/drills', created: '9 Sep 2026',
      map: [['sku', 'SKU'], ['position', 'Sequence']],
      fields: {
        name: { v: 'Cordless Drill/Driver 20V Brushless, Bare Tool — Variable Speed, LED, Metal Chuck', src: 'existing', from: 'TLS-DRL-50026_1' },
        asin: { v: '', src: null, cands: [{ v: 'B09XQ7LK2M', src: 'existing', from: 'TLS-DRL-50026_1' }, { v: 'B09XQ7LK2N', src: 'existing', from: 'TLS-DRL-50026_3' }] },
        ean: { v: '', src: null, cands: [] },
        brand: { v: 'Ridgeline', src: 'existing', from: 'TLS-DRL-50026_1' },
        description: { v: '', src: null, cands: [{ v: 'Cordless 20V brushless drill driver with a 2-speed gearbox, 13 mm keyless chuck and an LED work light.', src: 'existing', from: 'TLS-DRL-50026_1' }] },
      },
      assets: [
        mk({ id: 'TLS-DRL-50026_1', file: 'drill-hero', seq: 1, seqSrc: 'filename', fileSeq: 1, desc: 'Hero · Studio capture', labels: ['Main'] }),
        mk({ id: 'TLS-DRL-50026_2', file: 'drill-detail', seq: 2, seqSrc: 'filename', fileSeq: 2, desc: 'Chuck detail · Studio capture' }),
        mk({ id: 'TLS-DRL-50026_3', file: 'drill-detail2', seq: 3, seqSrc: 'filename', fileSeq: 3, desc: 'Trigger detail · Studio capture' }),
        mk({ id: 'TLS-DRL-50026_4', file: 'drill-callouts', seq: 4, seqSrc: 'filename', fileSeq: 4, desc: 'Callouts · Annotated overlay' }),
        mk({ id: 'TLS-DRL-50026_5', file: 'drill-battery', seq: 5, seqSrc: 'filename', fileSeq: 5, desc: 'Battery chart · Infographic', labels: ['Infographic'] }),
      ],
    },
    'FTW-RUN-60026': {
      sku: 'FTW-RUN-60026', pattern: '{sku}_{position}', patternName: 'SKU and position', folder: 'catalog/footwear', created: '12 Sep 2026',
      map: [['sku', 'SKU'], ['position', 'Sequence']],
      fields: {
        name: { v: 'Running Shoe Black/Gold — Lightweight Mesh Upper, Cushioned Midsole', src: 'existing', from: 'FTW-RUN-60026_1' },
        asin: { v: 'B0C8XK2N4T', src: 'existing', from: 'FTW-RUN-60026_1' },
        ean: { v: '5901234123457', src: 'manual', from: '' },
        gtin: { v: '05901234123457', src: 'manual', from: '' },
        variant: { v: 'Black/Gold', src: 'existing', from: 'FTW-RUN-60026_1' },
        brand: { v: 'Stride', src: 'existing', from: 'FTW-RUN-60026_1' },
        description: { v: 'Lightweight trail runner with a grippy lug sole and a breathable mesh upper.', src: 'existing', from: 'FTW-RUN-60026_1' },
      },
      assets: [
        mk({ id: 'FTW-RUN-60026_1', file: 'shoe-hero', seq: 1, seqSrc: 'filename', fileSeq: 1, desc: 'Hero pair · Studio capture', labels: ['Main'] }),
        mk({ id: 'FTW-RUN-60026_2', file: 'shoe-pair', seq: 2, seqSrc: 'filename', fileSeq: 2, desc: 'Pair front · Studio capture' }),
        mk({ id: 'FTW-RUN-60026_3', file: 'shoe-side', seq: 3, seqSrc: 'filename', fileSeq: 3, desc: 'Side profile · Studio capture' }),
        mk({ id: 'FTW-RUN-60026_4', file: 'shoe-alt', seq: 4, seqSrc: 'filename', fileSeq: 4, desc: 'Pair alt · Studio capture' }),
        mk({ id: 'FTW-RUN-60026_5', file: 'shoe-detail', seq: 5, seqSrc: 'filename', fileSeq: 5, desc: 'Side detail · Studio capture' }),
        mk({ id: 'FTW-RUN-60026_6', file: 'shoe-alt2', seq: 6, seqSrc: 'filename', fileSeq: 6, desc: 'Outsole · Studio capture' }),
      ],
    },
    'CAM-DSLR-10026': {
      sku: 'CAM-DSLR-10026', pattern: null, patternName: '', folder: 'catalog/electronics', created: '3 Sep 2026',
      map: [],
      fields: {
        name: { v: 'DSLR Camera Body 24MP — APS-C Sensor, 4K Video, Vari-Angle Touchscreen', src: 'manual', from: '' },
        asin: { v: 'B0BQ7XMN5P', src: 'existing', from: 'CAM-DSLR-10026_1' },
        upc: { v: '012345678905', src: 'manual', from: '' },
        brand: { v: 'Aperture', src: 'manual', from: '' },
        ean: { v: '', src: null, cands: [] },
        description: { v: '', src: null, cands: [] },
      },
      assets: [
        mk({ id: 'CAM-DSLR-10026_1', file: 'camera-front', seq: 1, seqSrc: 'manual', desc: 'Front · Studio capture', labels: ['Main'] }),
        mk({ id: 'CAM-DSLR-10026_2', file: 'camera-top', seq: 2, seqSrc: 'manual', desc: 'Top-down · Studio capture' }),
        mk({ id: 'CAM-DSLR-10026_3', file: 'camera-back', seq: 3, seqSrc: 'manual', desc: 'Rear panel · Studio capture' }),
        mk({ id: 'CAM-DSLR-10026_4', file: 'camera-inbox', seq: 4, seqSrc: 'manual', desc: 'In-box · Studio capture' }),
      ],
    },
  };
  const LIB = [['shoes-black_60026-5', 'shoe-alt'], ['shoes-black_60026-6', 'shoe-alt2'], ['M006OA-9073-5', 'polo-alt'], ['W551AB-1120-1', 'wshirt-front'], ['W551AB-1120-2', 'wshirt-back'], ['IMG_4471', 'shoe-detail'], ['size-chart_all', 'drink-nutrition'], ['lookbook_cover', 'wshirt-pose']].map(([id, file]) => mk({ id, file, folder: 'media-library/misc' }));

  const blank = () => ({ fe: {}, order: null, lab: {}, removed: [], added: [], read: [], saved: false });
  const ids = (p, s) => s.order || p.assets.map((a) => a.id);
  const lookup = (p) => { const m = {}; p.assets.concat(LIB).forEach((a) => { m[a.id] = a; }); return m; };
  const trunc = (t, n) => (t.length > n ? t.slice(0, n - 1) + '…' : t);

  function fieldRows(p, s, list) {
    return (list || FIELDS).map((f) => {
      const b = p.fields[f.key] || { v: '', src: null, cands: [] }, o = s.fe[f.key], cur = o || b, v = cur.v || '', cands = b.cands || [], bv = b.v || '';
      const st = v ? 'ok' : cands.length > 1 ? 'conflict' : cands.length === 1 ? 'suggest' : f.req ? 'missing' : 'empty';
      const src = v ? SRC[cur.src] || null : null;
      const fromText = v && cur.src === 'filename' ? 'Read from file name · ' + cur.from : v && cur.src === 'existing' ? 'Found on ' + (cur.from || 'your assets') : '';
      return {
        key: f.key, label: f.label, reqText: f.req ? 'required by ' + f.req : f.hint || '', hasSuffix: !!(f.req || f.hint), head: f.head || '', hasHead: !!f.head, multi: !!f.multi, single: !f.multi, font: f.mono ? "'Roboto Mono', monospace" : 'inherit', ph: f.ph, req: f.req, hasReq: !!f.req, value: v,
        st, showConflict: st === 'conflict', showSuggest: st === 'suggest', showMissing: st === 'missing', hasCands: cands.length > 0 && !v,
        bd: st === 'missing' ? '#B3261E' : st === 'conflict' || st === 'suggest' ? '#D9A526' : '#C6CDDA',
        hasChip: !!src, chipLabel: src ? src.label : '', chipBg: src ? src.bg : '#fff', chipFg: src ? src.fg : '#636D7E', dot: src ? src.dot : '#C6CDDA',
        hasFrom: !!fromText, fromText, showUndo: !!o, undoText: o ? (bv ? 'Was “' + trunc(bv, 36) + '”.' : 'Not saved yet.') : '',
        attn: !v && !!f.req, candIntro: cands.length > 1 ? 'Found ' + cands.length + ' values:' : 'Found on your assets:',
        cands: cands.map((c) => ({ raw: c, v: c.v, short: trunc(c.v, 32), from: c.from })),
        sugV: cands[0] ? trunc(cands[0].v, 72) : '', sugFrom: cands[0] ? cands[0].from : '',
      };
    });
  }

  function assets(p, s) {
    const m = lookup(p);
    let n = 0;
    return ids(p, s).map((id) => {
      const a = m[id], base = p.assets.find((x) => x.id === id), removed = s.removed.includes(id);
      if (!removed) n++;
      const seq = removed ? null : n;
      const seqSrc = !base ? 'manual' : seq === base.seq ? base.seqSrc : base.matched && seq === base.fileSeq ? 'filename' : 'manual';
      const hasLab = id in s.lab, label = hasLab ? s.lab[id] : a.label || '', labelSrc = hasLab ? (label ? 'manual' : null) : a.labelSrc;
      const read = s.read.includes(id);
      return { id, img: a.img, seq, seqSrc, label, labelSrc, removed, isNew: !base, isBase: !!base, meta: (a.meta || []).concat(read ? a.fileMeta || [] : []), unread: !!a.unread && !read, unmatched: base ? base.matched === false : false, fileSeq: a.fileSeq };
    });
  }

  // Presentational rows for the asset list (shared by A and B); handlers are added by the components.
  function assetRows(p, s) {
    const A = assets(p, s), live = A.filter((a) => !a.removed), firstId = live.length ? live[0].id : null, lastId = live.length ? live[live.length - 1].id : null;
    return A.map((a) => {
      const sq = a.seqSrc ? SRC[a.seqSrc] : null, lb = a.labelSrc ? SRC[a.labelSrc] : null;
      return {
        id: a.id, file: a.id, src: a.img, seq: a.removed ? '–' : String(a.seq), seqTiny: a.removed ? 'Removed' : sq ? sq.short : 'Auto', seqFg: sq ? sq.fg : '#8A94A6',
        meta: a.meta.map((x) => ({ k: x.k, v: x.v, bg: SRC[x.src].bg, fg: SRC[x.src].fg })), isNew: a.isNew, unmatched: a.unmatched, unread: a.unread,
        removed: a.removed, showRemove: !a.removed, op: a.removed ? 0.45 : 1, strike: a.removed ? 'line-through' : 'none',
        label: a.label, labelTiny: lb ? lb.short : '', labelFg: lb ? lb.fg : '#8A94A6',
        opts: [{ v: '', t: 'No label', sel: !a.label }].concat(LABELS.map((l) => ({ v: l, t: l, sel: a.label === l }))),
        upOp: a.removed || a.id === firstId ? 0.25 : 1, downOp: a.removed || a.id === lastId ? 0.25 : 1,
      };
    });
  }

  function attn(p, s) { return fieldRows(p, s).filter((r) => r.attn).map((r) => r.label); }

  function changes(p, s) {
    const A = assets(p, s), m = lookup(p);
    const nf = Object.keys(s.fe).length, nl = Object.keys(s.lab).filter((id) => !s.removed.includes(id)).length;
    const moved = A.filter((a) => a.isBase && !a.removed && a.seq !== m[a.id].seq).length;
    const parts = [];
    if (nf) parts.push(nf === 1 ? '1 field' : nf + ' fields');
    if (moved) parts.push(moved === 1 ? '1 asset moved' : moved + ' assets moved');
    if (nl) parts.push(nl === 1 ? '1 label' : nl + ' labels');
    if (s.added.length) parts.push(s.added.length + ' added');
    if (s.removed.length) parts.push(s.removed.length + ' removed');
    if (s.read.length) parts.push(s.read.length + ' read from file name');
    const total = nf + moved + nl + s.added.length + s.removed.length + s.read.length;
    return { total, text: total ? (total === 1 ? '1 unsaved change' : total + ' unsaved changes') : 'No changes yet', detail: parts.join(' · ') };
  }

  const act = {
    type: (p, s, key, v) => { const b = p.fields[key] || { v: '' }, fe = Object.assign({}, s.fe); if (v === (b.v || '')) delete fe[key]; else fe[key] = { v, src: v ? 'manual' : null, from: '' }; return { fe, saved: false }; },
    pick: (s, key, c) => ({ fe: Object.assign({}, s.fe, { [key]: { v: c.v, src: c.src, from: c.from } }), saved: false }),
    undo: (s, key) => { const fe = Object.assign({}, s.fe); delete fe[key]; return { fe, saved: false }; },
    move: (p, s, id, d) => {
      const a = ids(p, s).slice(), i = a.indexOf(id);
      let j = i + d;
      while (j >= 0 && j < a.length && s.removed.includes(a[j])) j += d;
      if (s.removed.includes(id) || j < 0 || j >= a.length) return null;
      const t = a[i]; a[i] = a[j]; a[j] = t;
      return { order: a, saved: false };
    },
    sort: (p, s) => ({ order: ids(p, s).slice().sort((x, y) => (x < y ? -1 : x > y ? 1 : 0)), saved: false }),
    label: (p, s, id, val) => { const m = lookup(p)[id], lab = Object.assign({}, s.lab); if (val === (m.label || '')) delete lab[id]; else lab[id] = val; return { lab, saved: false }; },
    remove: (p, s, id) => {
      if (s.added.includes(id)) return { order: ids(p, s).filter((x) => x !== id), added: s.added.filter((x) => x !== id), saved: false };
      return { removed: s.removed.includes(id) ? s.removed.filter((x) => x !== id) : s.removed.concat(id), saved: false };
    },
    read: (s, id) => ({ read: s.read.concat(id), saved: false }),
    add: (p, s, list) => ({ order: ids(p, s).concat(list), added: s.added.concat(list), saved: false }),
  };

  // Splits a file name by the product's pattern, e.g. shoes-black_60026-1 -> product / variant / sku / position.
  const esc = (x) => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  function parseSegs(pattern, id) {
    if (!pattern) return null;
    const toks = [], lits = [];
    let re = '^', last = 0, m;
    const rx = /\{([^}]*)\}/g;
    while ((m = rx.exec(pattern))) { const lit = pattern.slice(last, m.index); lits.push(lit); re += esc(lit) + '([^/]+?)'; toks.push(m[1].trim().toLowerCase()); last = rx.lastIndex; }
    const tail = pattern.slice(last); lits.push(tail); re += esc(tail) + '$';
    const mm = new RegExp(re).exec(id);
    if (!mm) return null;
    const out = [];
    toks.forEach((t, i) => {
      if (lits[i]) out.push({ text: lits[i], isLit: true, isVal: false, bg: 'transparent', fg: '#8A94A6', roleText: '' });
      const sku = t === 'sku';
      out.push({ text: mm[i + 1], isLit: false, isVal: true, bg: sku ? '#E3E8FA' : '#F1F3F7', fg: sku ? '#1F2F99' : '#323A45', roleText: t });
    });
    if (lits[toks.length]) out.push({ text: lits[toks.length], isLit: true, isVal: false, bg: 'transparent', fg: '#8A94A6', roleText: '' });
    return out;
  }
  function fileRows(p, s) {
    const m = lookup(p);
    return ids(p, s).filter((id) => !s.removed.includes(id)).map((id) => {
      const segs = parseSegs(p.pattern, id);
      return { id, src: m[id].img, segs: segs || [], matched: !!segs, unmatched: !segs, isNew: s.added.includes(id) };
    });
  }

  // What re-running the pattern would do. keep = leave values a person edited alone.
  function rerun(p, s, keep) {
    const A = assets(p, s), cur = {}, m = lookup(p);
    A.forEach((a) => { cur[a.id] = a; });
    const live = A.filter((a) => !a.removed), rows = [], unreadIds = [];
    live.filter((a) => a.unread).forEach((a) => {
      unreadIds.push(a.id);
      (m[a.id].fileMeta || []).forEach((x) => rows.push({ id: a.id, src: a.img, field: x.k, from: 'Empty', to: x.v, kind: 'fill', kindLabel: 'Fill', fg: '#1B7F4B', bg: '#E7F6EE' }));
    });
    const allIds = ids(p, s);
    let order = allIds;
    if (!keep) {
      const key = (id) => { const a = cur[id]; return a && !a.removed && !a.unmatched && a.fileSeq != null ? a.fileSeq : 1000 + allIds.indexOf(id); };
      order = allIds.slice().sort((x, y) => key(x) - key(y));
    }
    let n = 0;
    const nseq = {};
    order.forEach((id) => { if (!cur[id].removed) nseq[id] = ++n; });
    live.forEach((a) => {
      if (!a.isBase || a.unmatched || a.fileSeq == null) return;
      if (keep) { if (a.seq !== a.fileSeq && a.seqSrc === 'manual') rows.push({ id: a.id, src: a.img, field: 'Sequence', from: String(a.seq), to: String(a.fileSeq), kind: 'skip', kindLabel: 'Kept', fg: '#636D7E', bg: '#F1F3F7' }); }
      else if (nseq[a.id] !== a.seq) rows.push({ id: a.id, src: a.img, field: 'Sequence', from: String(a.seq), to: String(nseq[a.id]), kind: 'overwrite', kindLabel: 'Change', fg: '#8A5A00', bg: '#FFF6E0' });
    });
    const c = (k) => rows.filter((r) => r.kind === k).length;
    const fills = c('fill'), over = c('overwrite'), skip = c('skip');
    const text = [fills && fills + ' to fill', over && over + ' to change', skip && skip + ' kept as you edited them'].filter(Boolean).join(' · ');
    return { rows, order: keep ? s.order : order, unreadIds, fills, over, skip, actionable: fills + over > 0, text: text || 'Nothing to update. Every file already matches the pattern.' };
  }

  window.EP = { PRODUCTS, LIB, LABELS, SRC, FIELDS, FIELDS_JIRA, blank, ids, lookup, fieldRows, assets, assetRows, attn, changes, act, parseSegs, fileRows, rerun, trunc };
})();
