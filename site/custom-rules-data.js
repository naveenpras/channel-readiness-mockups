// Logic for the Custom Channel Rules page. Same layout as the public channel page, but every value is configurable.
(function () {
  const num = (n) => Number(n).toLocaleString('en-US');
  const initial = () => ({
    name: 'Brand site', en: true,
    transparent: 'Off', bgHex: '#FFFFFF', shadow: 'None',
    cm: 'Exact size', fw: 2000, fh: 2000, fit: 'Pad', ls: 2000, ar: '1:1', ss: 1000, dpi: 72, enhOn: true, fill: 85, margin: 2,
    acm: 'Exact size', afw: 2000, afh: 2000, afit: 'Pad', als: 2000, aar: '1:1', ass: 1000,
    pat: { main: '{sku}.main.jpg', shot: '{sku}_{position}_{tag}.jpg', add: '{sku}_{position}.jpg' }, num: 'continue',
    ops: { s: ['bg', 'dim'], a: ['dim'], v: [] }, open: { 's:bg': true }, menu: '',
    lw: 2000, lh: 2000, ldpi: '72',
    vfmt: 'MP4', vsize: 5000, vres: '1080p', var: '16:9', vcr: '4:5', cfmt: 'MP4', csize: 5000, cres: '1080p', car: '16:9',
    vpat: { video: '{sku}.video.mp4', vtt: '{sku}.video.vtt' },
  });

  function vals(s, set) {
    const fill = (p, pos, tag) => window.PR.fill(p, 'SKU', pos, tag);
    const sel = (list, cur) => list.map((x) => { const a = Array.isArray(x) ? x : [x, x]; return { v: a[0], t: a[1], sel: a[0] === cur }; });
    const n = (k) => (e) => set({ [k]: Math.max(0, parseInt(e.target.value, 10) || 0) });
    const onHex = (e) => { let v = String(e.target.value).trim().replace(/^#?/, '#').toUpperCase(); if (/^#[0-9A-F]{3}$/.test(v)) v = '#' + v[1] + v[1] + v[2] + v[2] + v[3] + v[3]; set({ bgHex: /^#[0-9A-F]{6}$/.test(v) ? v : s.bgHex }); };
    const pick = (k) => (e) => set({ [k]: e.target.value });
    const hex = s.bgHex;
    const pf = (key, label, ex) => ({ key, label, note: '', value: s.pat[key], onChange: (e) => set({ pat: { ...s.pat, [key]: e.target.value } }), ex });
    const vp = (key, label) => ({ key, label, note: '', value: s.vpat[key], onChange: (e) => set({ vpat: { ...s.vpat, [key]: e.target.value } }), ex: fill(s.vpat[key], 1, '') });
    const seg = (list, cur, key) => list.map((v) => { const on = v === cur; return { label: v, bg: on ? '#fff' : 'transparent', fg: on ? '#0A0C0F' : '#636D7E', sh: on ? '0 1px 2px rgba(10,12,15,0.12)' : 'none', onClick: () => set({ [key]: v }) }; });
    const crop = (p, k) => ({
      [p + 'cmSeg']: seg(['Exact size', 'Keep aspect ratio', 'Aspect ratio'], s[k.cm], k.cm), [p + 'mExact']: s[k.cm] === 'Exact size', [p + 'mKeep']: s[k.cm] === 'Keep aspect ratio', [p + 'mRatio']: s[k.cm] === 'Aspect ratio',
      [p + 'fitSeg']: seg(['Pad', 'Crop'], s[k.fit], k.fit), [p + 'arSeg']: seg(['1:1', '4:5', '3:4', '16:9'], s[k.ar], k.ar),
      [k.fw]: s[k.fw], [k.fh]: s[k.fh], ['on' + k.fw[0].toUpperCase() + k.fw.slice(1)]: n(k.fw), ['on' + k.fh[0].toUpperCase() + k.fh.slice(1)]: n(k.fh),
      [p + 'lsv']: s[k.ls], [p + 'onLs']: n(k.ls), [p + 'ssv']: s[k.ss], [p + 'onSs']: n(k.ss),
    });
    const cropSum = (cm, w, h, fit, ls, ar, ss) => (cm === 'Exact size' ? num(w) + ' × ' + num(h) + ' px, ' + fit.toLowerCase() + ' if the shape differs' : cm === 'Keep aspect ratio' ? 'Longest side ' + num(ls) + ' px, proportions kept' : ar + ', shortest side at least ' + num(ss) + ' px');
    const shotCount = 5;

    const NAMES = {
      s: { bg: 'Remove and replace background', dim: 'Dimensions', dpi: 'Resolution', fr: 'Fix product framing' },
      a: { dim: 'Dimensions', life: 'Create a lifestyle image if the product has none' },
      v: { make: 'Create a video if the product has none', vtt: 'Create captions (VTT) if missing' },
    };
    const SUM = {
      s: { bg: s.transparent === 'On' ? 'Transparent background' : hex.toLowerCase() + ' background, ' + (s.shadow === 'None' ? 'no shadow' : 'natural shadow'),
        dim: cropSum(s.cm, s.fw, s.fh, s.fit, s.ls, s.ar, s.ss), dpi: '', fr: s.fill + '% fill, ' + s.margin + '% edge margin' },
      a: { dim: cropSum(s.acm, s.afw, s.afh, s.afit, s.als, s.aar, s.ass), life: num(s.lw) + ' × ' + num(s.lh) + ' px, ' + s.ldpi + ' dpi. Made with AI from the main image' },
      v: { make: s.cfmt + ', ' + s.cres + ', ' + s.car + ', up to ' + num(s.csize) + ' MB. Made with AI', vtt: 'Used from the product if it has one. Otherwise made with AI' },
    };
    const out = {};
    const prefix = { s: 'opS_', a: 'opA_', v: 'opV_' };
    ['s', 'a', 'v'].forEach((sec) => {
      const list = s.ops[sec];
      Object.keys(NAMES[sec]).forEach((k) => {
        const key = sec + ':' + k, open = !!s.open[key];
        out[prefix[sec] + k] = { on: list.includes(k), name: NAMES[sec][k], sum: SUM[sec][k], open, chev: open ? 'expand_less' : 'expand_more',
          toggle: () => set({ open: { ...s.open, [key]: !open } }),
          remove: (e) => { if (e && e.stopPropagation) e.stopPropagation(); set({ ops: { ...s.ops, [sec]: list.filter((x) => x !== k) } }); } };
      });
      const left = Object.keys(NAMES[sec]).filter((k) => !list.includes(k));
      out['menu' + sec.toUpperCase()] = { can: left.length > 0, open: s.menu === sec, toggle: () => set({ menu: s.menu === sec ? '' : sec }),
        items: left.map((k) => ({ name: NAMES[sec][k], add: () => set({ ops: { ...s.ops, [sec]: list.concat(k) }, open: { ...s.open, [sec + ':' + k]: true }, menu: '' }) })) };
    });
    return {
      ...out,
      name: s.name, onName: (e) => set({ name: e.target.value }),
      enBg: s.en ? '#3448C5' : '#C6CDDA', enJ: s.en ? 'flex-end' : 'flex-start', toggleEn: () => set({ en: !s.en }),
      bgHex: hex, bgHexLower: hex.toLowerCase(), onHex,
      bgSeg: seg(['Off', 'On'], s.transparent, 'transparent'), bgColor: s.transparent === 'Off', bgTransparent: s.transparent === 'On', shadowSeg: seg(['None', 'Keep natural'], s.shadow, 'shadow'),
      ...crop('', { cm: 'cm', fw: 'fw', fh: 'fh', fit: 'fit', ar: 'ar', ls: 'ls', ss: 'ss' }),
      enhBg: s.enhOn ? '#3448C5' : '#C6CDDA', enhJ: s.enhOn ? 'flex-end' : 'flex-start', toggleEnh: () => set({ enhOn: !s.enhOn }),
      dpiV: s.dpi, onDpiV: n('dpi'),
      fillV: s.fill, onFill: (e) => set({ fill: Math.max(50, Math.min(100, parseInt(e.target.value, 10) || 85)) }), marginV: s.margin, onMargin: (e) => set({ margin: Math.max(0, Math.min(20, parseInt(e.target.value, 10) || 0)) }),
      pMain: pf('main', 'Main image', fill(s.pat.main, 1, 'main')), pShot: pf('shot', 'Other product shots', fill(s.pat.shot, 2, 'front')), pAdd: pf('add', 'Additional images', fill(s.pat.add, s.num === 'continue' ? shotCount + 1 : 1, 'lifestyle')),
      vTokenHint: '{sku}, {upc}',
      ...crop('a', { cm: 'acm', fw: 'afw', fh: 'afh', fit: 'afit', ar: 'aar', ls: 'als', ss: 'ass' }),
      numOpts: sel([['continue', 'Continue after the product shots'], ['own', 'Start their own sequence']], s.num), onNum: pick('num'),
      lw: s.lw, lh: s.lh, onLw: n('lw'), onLh: n('lh'), ldpiOpts: sel([['72', '72 dpi'], ['150', '150 dpi'], ['300', '300 dpi']], s.ldpi), onLdpi: pick('ldpi'),
      vfmtV: s.vfmt, onVfmtT: pick('vfmt'), vsizeV: s.vsize, onVsizeN: n('vsize'), vresSeg: seg(['720p', '1080p'], s.vres, 'vres'), varSeg: seg(['16:9', '9:16', 'Custom'], s.var, 'var'), varCustom: s.var === 'Custom', vcrV: s.vcr, onVcr: pick('vcr'),
      cfmtV: s.cfmt, onCfmtT: pick('cfmt'), csizeV: s.csize, onCsizeN: n('csize'), cresSeg: seg(['720p', '1080p'], s.cres, 'cres'), carSeg: seg(['16:9', '9:16'], s.car, 'car'),
      pVideo: vp('video', 'Video'), pVtt: vp('vtt', 'Captions (VTT)'),
    };
  }
  window.CU = { initial, vals };
})();
