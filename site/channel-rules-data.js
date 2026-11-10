// Shared logic for the Channel Rules options (A and B).
// Image settings: background, frame, dimensions and file name. Each can be skipped.
// Video settings: format and friends, create if missing, VTT captions.
(function () {
  const RID = (p) => 'a_' + p.replace('assets/', '').replace(/[^a-z0-9]/gi, '_');
  const A = (p) => (window.__resources && window.__resources[RID(p)]) || p;

  // Metadata the customer has on their products (IMG-8251). The file name starts with one of these.
  const IDS = [['ASIN', 'B0C8XK2N4T'], ['GTIN', '00850012345678'], ['JAN', '4901234567894'], ['UPC', '012345678905'], ['EAN', '5901234123457'], ['SKU', 'APM-POL-40026']];
  const BGS = [['white', 'Pure white', '#FFFFFF'], ['grey', 'Light grey', '#F5F5F5'], ['beige', 'Beige', '#F5F0E6'], ['clear', 'Transparent', '']];
  const FRAMES = ['70', '75', '80', '85', '90'];
  const VOPTS = {
    fmt: ['MP4', 'MOV', 'WebM'], res: ['720p', '1080p', '4K'], aspect: ['16:9 horizontal', '9:16 vertical', '1:1 square'], size: ['500 MB', '1 GB', '5 GB'], dur: ['Up to 1 min', '1–2 min', '1–12 min'],
  };

  const CH = {
    amazon: { name: 'Amazon', kind: 'public', logo: A('assets/channel-amazon.png'), ident: 'ASIN', bg: 'white', frame: '85', min: 1000, max: 3000, src: 'Amazon image requirements',
      vid: { fmt: 'MP4', res: '1080p', aspect: '16:9 horizontal', size: '5 GB', dur: '1–2 min' } },
    walmart: { name: 'Walmart', kind: 'public', logo: A('assets/channel-walmart-mark.png'), ident: 'GTIN', bg: 'white', frame: null, min: 1500, max: 2200, src: 'Walmart image requirements',
      vid: { fmt: 'MP4', res: '1080p', aspect: '16:9 horizontal', size: '1 GB', dur: '1–2 min' } },
    target: { name: 'Target', kind: 'public', logo: A('assets/channel-target-mark.png'), ident: 'GTIN', bg: 'white', frame: null, min: 1200, max: 2400, src: 'Target Plus image requirements',
      vid: { fmt: 'MP4', res: '1080p', aspect: '16:9 horizontal', size: '1 GB', dur: '1–2 min' } },
    brand: { name: 'Brand site', kind: 'custom', logo: '', ident: 'SKU', bg: 'white', frame: '85', min: 1000, max: 3000,
      vid: { fmt: 'MP4', res: '1080p', aspect: '16:9 horizontal', size: '5 GB', dur: '1–12 min' } },
  };

  const pad = (n) => String(n).padStart(2, '0');
  const token = (k) => (k === 1 ? 'main' : 'PT' + pad((typeof k === 'number' ? k : 4) - 1));
  // A pattern is free text with {tokens}: {asin}, {gtin}, {jan}, {upc}, {ean}, {sku} and {position}. Everything else is kept as typed.
  const TOKENS = IDS.map((x) => '{' + x[0].toLowerCase() + '}').concat('{position}');
  const sample = (pattern, k) => String(pattern).replace(/\{(\w+)\}/g, (m, key) => {
    const kk = key.toLowerCase(); if (kk === 'position') return String(k);
    const hit = IDS.find((x) => x[0].toLowerCase() === kk); return hit ? hit[1] : m;
  });
  const num = (n) => Number(n).toLocaleString('en-US');

  const base = (c) => ({ bg: { on: true, val: c.bg }, frame: { on: c.frame != null, val: c.frame || '85' }, dim: { on: true, min: c.min, max: c.max }, name: { pattern: '{' + c.ident.toLowerCase() + '}.pt{position}.jpg' } });
  const initial = (ch) => {
    const c = CH[ch], b = base(c), s = { same: b, rest: JSON.parse(JSON.stringify(b)) }, id = '{' + c.ident.toLowerCase() + '}';
    for (let k = 1; k <= 8; k++) s[k] = JSON.parse(JSON.stringify(b));
    s[1].name.pattern = id + '.main.jpg';
    return { sets: s, n: 3, vid: { ...c.vid, create: false, vtt: true }, vname: { video: id + '.video.mp4', vtt: id + '.vtt' }, life: false };
  };

  // The four image settings for one target: 'same' (all images) or an image position or 'rest'.
  function cards(ctx, tk) {
    const { s, set, c, pub } = ctx, S = s.sets[tk];
    const put = (key, patch) => set({ sets: { ...s.sets, [tk]: { ...S, [key]: { ...S[key], ...patch } } } });
    const optsOf = (list, cur) => list.map((x) => ({ v: x[0], t: x[1], sel: x[0] === cur }));
    const ntok = tk === 'same' ? 1 : tk === 'rest' ? s.n + 1 : tk;
    const mk = (key, title, desc, extra) => {
      const st = S[key];
      const none = key === 'frame' && pub && c.frame == null;
      const on = !none && (key === 'name' ? true : st.on);
      return { key, title, desc, on, hasToggle: key !== 'name' && !none, none, toggle: () => put(key, { on: !st.on }), op: on ? 1 : 0.45, pe: on ? 'auto' : 'none', locked: pub && key !== 'name', editable: !pub || key === 'name',
        isBg: key === 'bg', isFrame: key === 'frame', isDim: key === 'dim', isName: key === 'name', tBg: on ? '#3448C5' : '#C6CDDA', tJ: on ? 'flex-end' : 'flex-start', ...extra };
    };
    const bgName = (BGS.find((x) => x[0] === S.bg.val) || BGS[0]);
    return [
      mk('bg', 'Background', pub ? 'Set by ' + c.name + '. Turn off if your originals already have it.' : 'Replace the background of every product image.', { valueText: bgName[1] + (bgName[2] ? ' ' + bgName[2] : ''), opts: optsOf(BGS, S.bg.val), onSel: (e) => put('bg', { val: e.target.value }), swatch: bgName[2] || '#FFFFFF' }),
      mk('frame', 'Frame', pub ? (c.frame == null ? c.name + ' has no framing rule.' : 'Set by ' + c.name + '. Turn off if your originals already have it.') : 'How much of the image the product fills.', { valueText: c.frame == null && pub ? 'No rule' : 'Product fills ' + S.frame.val + '%', opts: optsOf(FRAMES.map((f) => [f, 'Product fills ' + f + '%']), S.frame.val), onSel: (e) => put('frame', { val: e.target.value }) }),
      mk('dim', 'Dimensions', pub ? 'Set by ' + c.name + '. Turn off if your originals already fit.' : 'Images are resized to fit between the minimum and maximum.', { valueText: 'Min ' + num(S.dim.min) + ' px · Max ' + num(S.dim.max) + ' px', min: S.dim.min, max: S.dim.max, onMin: (e) => put('dim', { min: parseInt(e.target.value, 10) || 0 }), onMax: (e) => put('dim', { max: parseInt(e.target.value, 10) || 0 }) }),
      mk('name', 'File name', 'A pattern with tokens. Use any text between them.', {
        pattern: S.name.pattern, patEdit: true, onPattern: (e) => put('name', { pattern: e.target.value }),
        chips: TOKENS.map((tk2) => ({ t: tk2, add: () => put('name', { pattern: S.name.pattern + tk2 }) })),
        ex1: sample(S.name.pattern, ntok), ex2: tk === 'same' ? sample(S.name.pattern, 2) : '', hasEx2: tk === 'same', valueText: S.name.pattern }),
    ];
  }

  // Video, captions and lifestyle. Same in both options.
  function media(ctx) {
    const { s, set, c, pub } = ctx, v = s.vid;
    const fields = [['fmt', 'Format'], ['res', 'Resolution'], ['aspect', 'Aspect ratio'], ['size', 'Max file size'], ['dur', 'Duration']].map(([k, label]) => ({
      label, val: v[k], locked: pub, editable: !pub, opts: VOPTS[k].map((o) => ({ v: o, t: o, sel: o === v[k] })), onSel: (e) => set({ vid: { ...v, [k]: e.target.value } }) }));
    const nm = (k) => ({ pattern: s.vname[k], onPattern: (e) => set({ vname: { ...s.vname, [k]: e.target.value } }), ex: sample(s.vname[k], 1), chips: TOKENS.filter((x) => x !== '{position}').map((tk2) => ({ t: tk2, add: () => set({ vname: { ...s.vname, [k]: s.vname[k] + tk2 } }) })) });
    const tg = (on, fn) => ({ on, toggle: fn, bg: on ? '#3448C5' : '#C6CDDA', j: on ? 'flex-end' : 'flex-start' });
    return { vfields: fields, vname: nm('video'), tname: nm('vtt'),
      createVideo: tg(v.create, () => set({ vid: { ...v, create: !v.create } })), createVtt: tg(v.vtt, () => set({ vid: { ...v, vtt: !v.vtt } })), life: tg(s.life, () => set({ life: !s.life })),
      videoFmt: (v.fmt || 'MP4').toLowerCase() };
  }

  const SEG = (on) => (on ? { bg: 'rgba(52,72,197,0.10)', fg: '#3448C5', bd: '#3448C5' } : { bg: '#fff', fg: '#323A45', bd: '#C6CDDA' });

  // Everything the header, mode bar and sections need.
  function shell(ctx, switchTo) {
    const { s, c, pub } = ctx, m = s.mode;
    const mk = (mode, ch) => ({ pick: () => switchTo(mode, ch) });
    const x = (on) => SEG(on);
    return { showTabs: true, isPublic: pub, isCustom: !pub, isPer: m === 'per', isSame: m !== 'per',
      modeOpts: [['public', 'Public channel', 'amazon'], ['same', 'Custom: same settings', 'brand'], ['per', 'Custom: by position', 'brand']].map(([k, n, ch]) => ({ name: n, bg: x(m === k).bg, fg: x(m === k).fg, bd: x(m === k).bd, pick: () => switchTo(k, ch) })),
      chOpts: ['amazon', 'walmart', 'target'].map((k) => ({ name: CH[k].name, bg: x(s.ch === k).bg, fg: x(s.ch === k).fg, bd: x(s.ch === k).bd, pick: () => switchTo('public', k) })),
      logo: c.logo, chName: c.name, chSub: pub ? 'Public channel rules maintained by Cloudinary' : 'Custom channel. You set the values.', chSrc: c.src || '' };
  }

  window.CR = { A, IDS, TOKENS, BGS, CH, initial, cards, media, shell, SEG, sample, token, num };
})();
