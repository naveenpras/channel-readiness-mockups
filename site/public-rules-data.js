// Shared logic for the Public Channel Rules options (A and B).
// Product shots: studio images of the product, changed to match the channel.
// Additional images: callouts, lifestyle, in use, annotated, packaging, info panels. Only fitted and named.
(function () {
  const RID = (p) => 'a_' + p.replace('assets/', '').replace(/[^a-z0-9]/gi, '_');
  const A = (p) => (window.__resources && window.__resources[RID(p)]) || p;

  const IDS = [['ASIN', 'B0C8XK2N4T'], ['GTIN', '00850012345678'], ['UPC', '012345678905'], ['EAN', '5901234123457'], ['JAN', '4901234567894'], ['SKU', 'APM-POL-40026']];
  const TOKENS = IDS.map((x) => '{' + x[0].toLowerCase() + '}').concat(['{position}', '{tag}']);
  const SHOT_TAGS = ['main', 'front', 'back', 'left', 'right', 'top', 'flatlay', 'ghost'];

  // fixed: the channel needs an exact size. range: the channel sets a long-side range.
  const CH = {
    amazon: { name: 'Amazon', logo: A('assets/channel-amazon.png'), src: 'Amazon image requirements', id: 'ASIN',
      bg: 'Pure white', rgb: [255, 255, 255], dpi: '72 dpi', framing: 'Product fills 85% of the frame, not cut off',
      size: { kind: 'range', min: 1500, max: 10000, text: 'Long side from 1,500 to 10,000 px', how: 'Scaled to fit. Enhanced if the original is smaller.', addHow: 'Scaled only', short: 'Scaled to 1,500–10,000 px' },
      pat: { main: '{asin}.MAIN.jpg', shot: '{asin}.PT{position}.jpg', add: '{asin}.PT{position}.jpg' }, num: 'continue', life: { w: 2000, h: 2000, dpi: '72' },
      vid: { fmt: 'MP4', res: '1080p', size: '5 GB', dur: '2 min' }, vpat: { video: '{asin}.video.mp4', vtt: '{asin}.video.vtt' } },
    walmart: { name: 'Walmart', logo: A('assets/channel-walmart-mark.png'), src: 'Walmart image requirements', id: 'GTIN',
      bg: 'Pure white', rgb: [255, 255, 255], dpi: '72 dpi', framing: 'Product centred, not cut off',
      size: { kind: 'fixed', w: 2000, h: 2000, text: 'At least 2,000 × 2,000 px', how: 'Cropped to fit, with the product kept in view. Enhanced if the original is smaller.', addHow: 'Padded to 2,000 × 2,000 px', short: 'Cropped to 2,000 × 2,000 px' },
      pat: { main: '{gtin}.jpg', shot: '{gtin}_{position}_{tag}.jpg', add: '{gtin}_extra{position}.jpg' }, num: 'own', life: { w: 2200, h: 2200, dpi: '72' },
      vid: { fmt: 'MP4', res: '1080p', size: '1 GB', dur: '2 min' }, vpat: { video: '{gtin}_video.mp4', vtt: '{gtin}_video.vtt' } },
    target: { name: 'Target', logo: A('assets/channel-target-mark.png'), src: 'Target Plus image requirements', id: 'GTIN',
      bg: 'White', rgb: [255, 255, 255], dpi: '72 dpi', framing: 'Product centred, not cut off',
      size: { kind: 'fixed', w: 1200, h: 1200, text: 'At least 1,200 × 1,200 px', how: 'Cropped to fit, with the product kept in view. Enhanced if the original is smaller.', addHow: 'Padded to 1,200 × 1,200 px', short: 'Cropped to 1,200 × 1,200 px' },
      pat: { main: '{gtin}.jpg', shot: '{gtin}_alt{position}.jpg', add: '{gtin}_alt{position}.jpg' }, num: 'continue', life: { w: 2400, h: 2400, dpi: '72' },
      vid: { fmt: 'MP4', res: '1080p', size: '1 GB', dur: '2 min' }, vpat: { video: '{gtin}_video.mp4', vtt: '{gtin}_video.vtt' } },
  };

  const PRODS = {
    polo: { name: 'Men’s piqué polo, maroon', shots: [
      { img: A('assets/polo-front.jpg'), tag: 'main' }, { img: A('assets/polo-back.jpg'), tag: 'back' },
      { img: A('assets/polo-angle.jpg'), tag: 'front' }, { img: A('assets/polo-alt.jpg'), tag: 'front', person: true }, { img: A('assets/wshirt-front.jpg'), tag: 'flatlay' } ],
      extras: [ { img: A('assets/polo-lifestyle.jpg'), kind: 'Lifestyle' }, { img: A('assets/wshirt-pose.jpg'), kind: 'Product in use' }, { img: '', kind: 'Info panel', name: 'Size chart' } ] },
    camera: { name: 'DSLR camera body, 24MP, black', shots: [
      { img: A('assets/camera-front.jpg'), tag: 'main' }, { img: A('assets/camera-back.jpg'), tag: 'back' }, { img: A('assets/camera-top.jpg'), tag: 'top' } ],
      extras: [ { img: A('assets/camera-inbox.jpg'), kind: 'Packaging' } ] },
  };

  const initial = (ch) => { const c = CH[ch]; return { ch, id: c.id, pat: { ...c.pat }, num: c.num, dup: 'number', crop: false, life: false, lw: c.size.kind === 'range' ? c.size.min : c.life.w, lh: c.size.kind === 'range' ? c.size.min : c.life.h, ldpi: c.life.dpi, prod: 'polo', tab: 'shots', enh: true, frame: false, vcreate: false, vvtt: true, vpat: { ...c.vpat }, lmin: c.size.min || 0, lmax: c.size.max || 0 }; };

  const pad = (n) => String(n).padStart(2, '0');
  const fill = (pattern, id, pos, tag) => String(pattern).replace(/\{(\w+)\}/g, (m, k) => {
    const kk = k.toLowerCase();
    if (kk === 'position') return pad(pos);
    if (kk === 'tag') return tag == null ? '' : tag;
    const hit = IDS.find((x) => x[0].toLowerCase() === kk); return hit ? hit[1] : m;
  });
  // Replace {id} with the chosen ID field when a pattern was written with it.
  const idTok = (s) => '{' + s.id.toLowerCase() + '}';

  function vals(s, set, switchTo) {
    const c = CH[s.ch], x = (on) => (on ? { bg: 'rgba(52,72,197,0.10)', fg: '#3448C5', bd: '#3448C5' } : { bg: '#fff', fg: '#323A45', bd: '#C6CDDA' });
    const prod = PRODS[s.prod];
    const num = (n) => Number(n).toLocaleString('en-US');
    const hex = '#' + c.rgb.map((n) => n.toString(16).padStart(2, '0')).join('').toUpperCase();
    const pills = (a, b, which) => [[a, which === 0], [b, which === 1]].map(([t2, on]) => ({ t: t2, bg: on ? 'rgba(52,72,197,0.10)' : '#fff', fg: on ? '#3448C5' : '#8A94A6', bd: on ? '#3448C5' : '#DFE3EA' }));
    const R = (k, v, o) => ({ k, v, sw: '', hasSw: false, pills: [], hasPills: false, ...(o || {}) });
    const fixed = c.size.kind === 'fixed';
    const shotRows = [
      R('Background', 'RGB ' + c.rgb.join(', ') + ' (' + hex + ')', { sw: hex, hasSw: true }),
      R('Dimensions', fixed ? 'Fixed size: ' + num(c.size.w) + ' × ' + num(c.size.h) + ' px' : 'Min ' + num(c.size.min) + ' px, max ' + num(c.size.max) + ' px on the long side'),
      R('Dimension adjustments', fixed ? 'The product stays in view' : 'Scaled to fit. Nothing is cut or added', fixed ? { pills: pills('Crop', 'Pad', 0), hasPills: true } : {}),
      R('Resolution', c.dpi),
    ];
    const vrows = (dur) => [R('Format', c.vid.fmt), R('Resolution', c.vid.res), R('Max file size', c.vid.size), R('Max duration', dur)];
    const vp = (key, label, note, ex) => ({ key, label, note, value: s.vpat[key], onChange: (e) => set({ vpat: { ...s.vpat, [key]: e.target.value } }), ex: fill(s.vpat[key], s.id, 1, '') });
    const tg = (on) => ({ bg: on ? '#3448C5' : '#C6CDDA', j: on ? 'flex-end' : 'flex-start' });
    const addRows = [
      R('Dimensions', fixed ? 'Fixed size: ' + num(c.size.w) + ' × ' + num(c.size.h) + ' px' : 'Min ' + num(c.size.min) + ' px, max ' + num(c.size.max) + ' px on the long side'),
      R('Dimension adjustments', fixed ? 'Crop and Pad' : 'Scaled to fit. Nothing is cut or added'),
    ];

    // Names. Product shots first. Each tag is made unique when two shots share it.
    const seen = {}, rows = [], used = {};
    prod.shots.forEach((sh, i) => {
      const pos = i + 1;
      seen[sh.tag] = (seen[sh.tag] || 0) + 1;
      const tag = s.dup === 'number' && seen[sh.tag] > 1 ? sh.tag + seen[sh.tag] : sh.tag;
      const isMain = i === 0 && sh.tag === 'main';
      const name = fill(isMain ? s.pat.main : s.pat.shot, s.id, pos, tag);
      rows.push({ group: 'shot', img: sh.img, hasImg: true, kind: 'Product shot', label: tag, name, treat: (sh.person && s.crop ? 'Cropped at the face. ' : '') + c.size.short + ', ' + c.bg.toLowerCase() + ' background' + (s.frame ? ', product fills 85%' : ''), main: isMain });
    });
    const mShots = prod.shots.length;
    const hasLife = prod.extras.some((e) => e.kind === 'Lifestyle');
    const extras = prod.extras.map((e) => ({ ...e }));
    if (s.life && !hasLife) extras.push({ img: '', kind: 'Lifestyle', name: 'New lifestyle image', created: true });
    extras.forEach((e, i) => {
      const pos = s.num === 'continue' ? mShots + i + 1 : i + 1;
      rows.push({ group: 'add', img: e.img, hasImg: !!e.img, kind: 'Additional', label: e.kind + (e.name && !e.created ? ' · ' + e.name : ''), created: !!e.created, name: fill(s.pat.add, s.id, pos, e.kind.toLowerCase().replace(/ /g, '-')), treat: (e.created ? 'Created from the main image. ' + (c.size.kind === 'fixed' ? num(c.size.w) + ' × ' + num(c.size.h) + ' px' : num(s.lw) + ' × ' + num(s.lh) + ' px') + ', ' + c.dpi + '. ' : '') + c.size.addHow + (e.created ? '' : '. Content not changed') });
    });
    rows.forEach((r) => { used[r.name] = (used[r.name] || 0) + 1; });
    rows.forEach((r) => { r.clash = used[r.name] > 1; });
    const clashes = Object.values(used).filter((n) => n > 1).length;

    const chip = (pat, key) => TOKENS.map((t) => ({ t, add: () => set({ pat: { ...s.pat, [key]: s.pat[key] + t } }) }));
    const pf = (key, label, note) => ({ key, label, note, value: s.pat[key], onChange: (e) => set({ pat: { ...s.pat, [key]: e.target.value } }), chips: chip(s.pat[key], key),
      ex: fill(s.pat[key], s.id, key === 'main' ? 1 : key === 'shot' ? 2 : (s.num === 'continue' ? mShots + 1 : 1), key === 'add' ? 'lifestyle' : key === 'main' ? 'main' : 'front') });
    const sel = (list, cur) => list.map(([v, t]) => ({ v, t, sel: v === cur }));

    return { showTabs: true,
      chOpts: ['amazon', 'walmart', 'target'].map((k) => ({ name: CH[k].name, bg: x(s.ch === k).bg, fg: x(s.ch === k).fg, bd: x(s.ch === k).bd, pick: () => switchTo(k) })),
      prodOpts: [['polo', 'Polo'], ['camera', 'Camera']].map(([k, n]) => ({ name: n, bg: x(s.prod === k).bg, fg: x(s.prod === k).fg, bd: x(s.prod === k).bd, pick: () => set({ prod: k }) })),
      logo: c.logo, chName: c.name, chSrc: c.src,
      shotRows: shotRows, addRows: addRows,
      videoRows: vrows(c.vid.dur), videoCreateRows: vrows('4 s'), vTokenHint: '{' + s.id.toLowerCase() + '}, {upc}',
      vcOn: s.vcreate, vcBg: tg(s.vcreate).bg, vcJ: tg(s.vcreate).j, toggleVc: () => set({ vcreate: !s.vcreate }),
      vtOn: s.vvtt, vtBg: tg(s.vvtt).bg, vtJ: tg(s.vvtt).j, toggleVt: () => set({ vvtt: !s.vvtt }),
      pVideo: vp('video', 'Video', 'Named like the product images'), pVtt: vp('vtt', 'Captions (VTT)', 'Same name as the video'),
      frameOn: s.frame, frameBg: s.frame ? '#3448C5' : '#C6CDDA', frameJ: s.frame ? 'flex-end' : 'flex-start', toggleFrame: () => set({ frame: !s.frame }),
      enhOn: s.enh, enhBg: s.enh ? '#3448C5' : '#C6CDDA', enhJ: s.enh ? 'flex-end' : 'flex-start', toggleEnh: () => set({ enh: !s.enh }),
      tokenHint: '{' + s.id.toLowerCase() + '}, {upc}, {tag}', lifeDpiText: c.dpi + ', the ' + c.name + ' minimum',
      idOpts: IDS.map(([v]) => ({ v, t: v, sel: v === s.id })), onId: (e) => { const old = s.id.toLowerCase(), nu = e.target.value.toLowerCase(); const sw = (p) => p.split('{' + old + '}').join('{' + nu + '}'); set({ id: e.target.value, pat: { main: sw(s.pat.main), shot: sw(s.pat.shot), add: sw(s.pat.add) } }); },
      pMain: pf('main', 'Main image', 'The product shot labelled main'), pShot: pf('shot', 'Other product shots', 'Each shot has its tag and position'), pAdd: pf('add', 'Additional images', 'Callouts, lifestyle, product in use, packaging, info panels'),
      dupOpts: sel([['number', 'Add a number: front, front2'], ['same', 'Keep the tag: front, front']], s.dup), onDup: (e) => set({ dup: e.target.value }),
      numOpts: sel([['continue', 'Continue after the product shots'], ['own', 'Start their own sequence']], s.num), onNum: (e) => set({ num: e.target.value }),
      cropOn: s.crop, cropBg: s.crop ? '#3448C5' : '#C6CDDA', cropJ: s.crop ? 'flex-end' : 'flex-start', toggleCrop: () => set({ crop: !s.crop }),
      lifeOn: s.life, lifeBg: s.life ? '#3448C5' : '#C6CDDA', lifeJ: s.life ? 'flex-end' : 'flex-start', toggleLife: () => set({ life: !s.life }),
      lifeRange: !fixed, lifeFixed: fixed, lifeOut: !fixed && (Math.max(s.lw, s.lh) < c.size.min || Math.max(s.lw, s.lh) > c.size.max), lifeRangeText: fixed ? '' : num(c.size.min) + ' to ' + num(c.size.max) + ' px', lifeFixedText: num(c.size.w || 0) + ' × ' + num(c.size.h || 0) + ' px', lmin: s.lmin, lmax: s.lmax, onLmin: (e) => set({ lmin: parseInt(e.target.value, 10) || 0 }), onLmax: (e) => set({ lmax: parseInt(e.target.value, 10) || 0 }),
      lw: s.lw, lh: s.lh, onLw: (e) => set({ lw: parseInt(e.target.value, 10) || 0 }), onLh: (e) => set({ lh: parseInt(e.target.value, 10) || 0 }),
      dpiOpts: sel([['72', '72 dpi'], ['150', '150 dpi'], ['300', '300 dpi']], s.ldpi), onDpi: (e) => set({ ldpi: e.target.value }),
      lifeDefault: fixed ? c.name + ' needs a fixed size, so it is set by the channel.' : 'Starts at the ' + c.name + ' minimum, ' + num(c.size.min) + ' × ' + num(c.size.min) + ' px. The long side can go up to ' + num(c.size.max) + ' px.',
      sample: rows.map((r, i) => ({ ...r, n: i + 1, noImg: !r.hasImg, iconName: r.created ? 'auto_awesome' : 'description', isShot: r.group === 'shot', nameFg: r.clash ? '#B3261E' : '#0A0C0F', gBg: r.group === 'shot' ? 'rgba(52,72,197,0.10)' : '#F1F3F7', gFg: r.group === 'shot' ? '#3448C5' : '#636D7E', gName: r.group === 'shot' ? 'Product shot' : 'Additional' })),
      sampleName: prod.name, hasClash: clashes > 0, clashText: clashes + (clashes === 1 ? ' file name is used twice.' : ' file names are used twice.') + ' Add {position} or {tag} to the pattern.',
      shotCount: prod.shots.length, addCount: extras.length,
      tabOpts: [['shots', 'Product shots'], ['add', 'Additional images']].map(([k, n]) => ({ name: n, fw: s.tab === k ? '600' : '400', fg: s.tab === k ? '#0A0C0F' : '#636D7E', line: s.tab === k ? '#3448C5' : 'transparent', pick: () => set({ tab: k }) })),
      tabShots: s.tab === 'shots', tabAdd: s.tab === 'add' };
  }

  window.PR = { A, CH, IDS, TOKENS, initial, vals, fill, PRODS };
})();
