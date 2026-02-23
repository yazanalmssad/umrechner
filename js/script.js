/* Simple static converter with translations and exchange-rate fetch */
const translations = {de:null};
const currentLang = 'de';
const BASE_PATH = window.location.pathname.startsWith('/umrechner/') ? '/umrechner' : '';
const withBase = (path) => `${BASE_PATH}${path}`;

const lengthUnits = {
  nm: 0.000000001,
  um: 0.000001,
  mm: 0.001,
  cm: 0.01,
  dm: 0.1,
  m: 1,
  km: 1000,
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
  mi: 1609.344,
  nmi: 1852
};

const areaUnits = {
  'mm2': 0.000001,
  'cm2': 0.0001,
  'm2': 1,
  'a': 100,
  'ha': 10000,
  'km2': 1000000,
  'in2': 0.00064516,
  'ft2': 0.09290304,
  'yd2': 0.83612736,
  'ac': 4046.8564224,
  'mi2': 2589988.110336
};

const weightUnits = {
  ug: 0.000000001,
  mg: 0.000001,
  g: 0.001,
  kg: 1,
  t: 1000,
  oz: 0.028349523125,
  lb: 0.45359237,
  st: 6.35029318
};

const timeUnits = {
  ms: 0.001,
  s: 1,
  min: 60,
  h: 3600,
  d: 86400,
  wk: 604800,
  mo: 2629746,
  yr: 31556952
};

const speedUnits = {
  'm/s': 1,
  'km/h': 0.2777777778,
  'km/s': 1000,
  'mph': 0.44704,
  'kn': 0.514444,
  'ft/s': 0.3048
};

const volumeUnits = {
  ml: 0.001,
  l: 1,
  m3: 1000,
  tsp: 0.00492892159375,
  tbsp: 0.01478676478125,
  cup: 0.2365882365,
  pt: 0.473176473,
  qt: 0.946352946,
  gal: 3.785411784
};

const energyUnits = {
  J: 1,
  kJ: 1000,
  Wh: 3600,
  kWh: 3600000,
  kcal: 4184,
  MJ: 1000000,
  GJ: 1000000000,
  eV: 0.0000000000000000001602176634,
  BTU: 1055.05585262
};


const pressureUnits = {
  Pa: 1,
  kPa: 1000,
  MPa: 1000000,
  bar: 100000,
  psi: 6894.757,
  atm: 101325,
  mmHg: 133.322,
  inHg: 3386.389
};

const powerUnits = {
  W: 1,
  kW: 1000,
  MW: 1000000,
  GW: 1000000000,
  PS: 735.49875,
  hp: 745.699872
};

const tempUnits = ['C','F','K','R'];
const currencies = [
  'EUR','USD','GBP','JPY','CHF','CAD','AUD','CNY',
  'SEK','NOK','DKK','PLN','CZK','HUF','RON','BGN',
  'TRY','ILS','SAR','AED','QAR','KWD',
  'INR','KRW','SGD','HKD','TWD','THB','MYR','IDR','PHP','VND',
  'MXN','BRL','ARS','CLP','COP','PEN','ZAR','NZD'
];

const unitLabels = {
  length: {
    nm: 'Nanometer (nm)',
    um: 'Mikrometer (um)',
    mm: 'Millimeter (mm)',
    cm: 'Zentimeter (cm)',
    dm: 'Dezimeter (dm)',
    m: 'Meter (m)',
    km: 'Kilometer (km)',
    in: 'Zoll (in)',
    ft: 'Fu\u00DF (ft)',
    yd: 'Yard (yd)',
    mi: 'Meile (mi)',
    nmi: 'Seemeile (nmi)'
  },
  area: {
    mm2: 'Quadratmillimeter (mm2)',
    cm2: 'Quadratzentimeter (cm2)',
    m2: 'Quadratmeter (m2)',
    a: 'Ar (a)',
    ha: 'Hektar (ha)',
    km2: 'Quadratkilometer (km2)',
    in2: 'Quadratzoll (in2)',
    ft2: 'Quadratfu\u00DF (ft2)',
    yd2: 'Quadratyard (yd2)',
    ac: 'Acre (ac)',
    mi2: 'Quadratmeile (mi2)'
  },
  weight: {
    ug: 'Mikrogramm (ug)',
    mg: 'Milligramm (mg)',
    g: 'Gramm (g)',
    kg: 'Kilogramm (kg)',
    t: 'Tonne (t)',
    oz: 'Unze (oz)',
    lb: 'Pfund (lb)',
    st: 'Stone (st)'
  },
  time: {
    ms: 'Millisekunde (ms)',
    s: 'Sekunde (s)',
    min: 'Minute (min)',
    h: 'Stunde (h)',
    d: 'Tag (d)',
    wk: 'Woche (wk)',
    mo: 'Monat (mo)',
    yr: 'Jahr (yr)'
  },
  speed: {
    'm/s': 'Meter pro Sekunde (m/s)',
    'km/h': 'Kilometer pro Stunde (km/h)',
    'km/s': 'Kilometer pro Sekunde (km/s)',
    mph: 'Meilen pro Stunde (mph)',
    kn: 'Knoten (kn)',
    'ft/s': 'Fu\u00DF pro Sekunde (ft/s)'
  },
  volume: {
    ml: 'Milliliter (ml)',
    l: 'Liter (l)',
    m3: 'Kubikmeter (m3)',
    tsp: 'Teel\u00F6ffel (tsp)',
    tbsp: 'Essl\u00F6ffel (tbsp)',
    cup: 'Tasse (cup)',
    pt: 'Pint (pt)',
    qt: 'Quart (qt)',
    gal: 'Gallone (gal)'
  },
  energy: {
    J: 'Joule (J)',
    kJ: 'Kilojoule (kJ)',
    Wh: 'Wattstunde (Wh)',
    kWh: 'Kilowattstunde (kWh)',
    kcal: 'Kilokalorie (kcal)',
    MJ: 'Megajoule (MJ)',
    GJ: 'Gigajoule (GJ)',
    eV: 'Elektronenvolt (eV)',
    BTU: 'British Thermal Unit (BTU)'
  },
  pressure: {
    Pa: 'Pascal (Pa)',
    kPa: 'Kilopascal (kPa)',
    MPa: 'Megapascal (MPa)',
    bar: 'Bar (bar)',
    psi: 'Pfund pro Quadratzoll (psi)',
    atm: 'Atmosph\u00E4re (atm)',
    mmHg: 'Millimeter Quecksilbers\u00E4ule (mmHg)',
    inHg: 'Zoll Quecksilbers\u00E4ule (inHg)'
  },
  power: {
    W: 'Watt (W)',
    kW: 'Kilowatt (kW)',
    MW: 'Megawatt (MW)',
    GW: 'Gigawatt (GW)',
    PS: 'Pferdestärke (PS)',
    hp: 'Horsepower (hp)'
  },
  temperature: {
    C: 'Celsius (C)',
    F: 'Fahrenheit (F)',
    K: 'Kelvin (K)',
    R: 'Rankine (R)'
  },
  currency: {
    EUR: 'Euro (EUR)',
    USD: 'US-Dollar (USD)',
    GBP: 'Britisches Pfund (GBP)',
    JPY: 'Japanischer Yen (JPY)',
    CHF: 'Schweizer Franken (CHF)',
    CAD: 'Kanadischer Dollar (CAD)',
    AUD: 'Australischer Dollar (AUD)',
    CNY: 'Chinesischer Yuan (CNY)',
    SEK: 'Schwedische Krone (SEK)',
    NOK: 'Norwegische Krone (NOK)',
    DKK: 'D\u00E4nische Krone (DKK)',
    PLN: 'Polnischer ZÅ‚oty (PLN)',
    CZK: 'Tschechische Krone (CZK)',
    HUF: 'Ungarischer Forint (HUF)',
    RON: 'Rum\u00E4nischer Leu (RON)',
    BGN: 'Bulgarischer Lew (BGN)',
    TRY: 'T\u00FCrkische Lira (TRY)',
    ILS: 'Israelischer Schekel (ILS)',
    SAR: 'Saudi-Riyal (SAR)',
    AED: 'VAE-Dirham (AED)',
    QAR: 'Katar-Riyal (QAR)',
    KWD: 'Kuwait-Dinar (KWD)',
    INR: 'Indische Rupie (INR)',
    KRW: 'S\u00FCdkoreanischer Won (KRW)',
    SGD: 'Singapur-Dollar (SGD)',
    HKD: 'Hongkong-Dollar (HKD)',
    TWD: 'Neuer Taiwan-Dollar (TWD)',
    THB: 'Thail\u00E4ndischer Baht (THB)',
    MYR: 'Malaysischer Ringgit (MYR)',
    IDR: 'Indonesische Rupiah (IDR)',
    PHP: 'Philippinischer Peso (PHP)',
    VND: 'Vietnamesischer Äá»“ng (VND)',
    MXN: 'Mexikanischer Peso (MXN)',
    BRL: 'Brasilianischer Real (BRL)',
    ARS: 'Argentinischer Peso (ARS)',
    CLP: 'Chilenischer Peso (CLP)',
    COP: 'Kolumbianischer Peso (COP)',
    PEN: 'Peruanischer Sol (PEN)',
    ZAR: 'S\u00FCdafrikanischer Rand (ZAR)',
    NZD: 'Neuseeland-Dollar (NZD)'
  }
};

// Helpers
const $ = id => document.getElementById(id);
const setText = (id, key) => {
  const el = $(id);
  if(el) el.innerText = t(key);
};
const setHtml = (id, key) => {
  const el = $(id);
  if(el) el.innerHTML = t(key);
};
const on = (id, event, handler) => {
  const el = $(id);
  if(el) el.addEventListener(event, handler);
};

function t(key){
  const dict = translations[currentLang] || {};
  return dict[key] || key;
}

function fmt(n){
  if(!Number.isFinite(n)) return '-';
  const abs = Math.abs(n);
  const digits = abs >= 100 ? 2 : abs >= 1 ? 4 : 6;
  return Number(n.toFixed(digits)).toString();
}

function applyTranslations(){
  document.title = t('title');
  const titleEl = $('title');
  if(titleEl){
    titleEl.innerText = t('title');
  }
  setText('mode-label', 'category');
  setText('mode-length', 'length');
  setText('mode-area', 'area');
  setText('mode-weight', 'weight');
  setText('mode-time', 'time');
  setText('mode-speed', 'speed');
  setText('mode-temperature', 'temperature');
  setText('mode-volume', 'volume');
  setText('mode-energy', 'energy');
  setText('mode-pressure', 'pressure');
  setText('mode-power', 'power');
  setText('mode-currency', 'currency');

  setText('length-title', 'length');
  setText('length-label', 'value');
  setText('label-from', 'from');
  setText('label-to', 'to');
  setText('length-convert', 'convert');

  setText('area-title', 'area');
  setText('area-label', 'value');
  setText('label-from-area', 'from');
  setText('label-to-area', 'to');
  setText('area-convert', 'convert');

  setText('weight-title', 'weight');
  setText('weight-label', 'value');
  setText('label-from-weight', 'from');
  setText('label-to-weight', 'to');
  setText('weight-convert', 'convert');

  setText('time-title', 'time');
  setText('time-label', 'value');
  setText('label-from-time', 'from');
  setText('label-to-time', 'to');
  setText('time-convert', 'convert');

  setText('speed-title', 'speed');
  setText('speed-label', 'value');
  setText('label-from-speed', 'from');
  setText('label-to-speed', 'to');
  setText('speed-convert', 'convert');

  setText('temperature-title', 'temperature');
  setText('temperature-label', 'value');
  setText('label-from-temperature', 'from');
  setText('label-to-temperature', 'to');
  setText('temperature-convert', 'convert');

  setText('volume-title', 'volume');
  setText('volume-label', 'value');
  setText('label-from-volume', 'from');
  setText('label-to-volume', 'to');
  setText('volume-convert', 'convert');

  setText('energy-title', 'energy');
  setText('energy-label', 'value');
  setText('label-from-energy', 'from');
  setText('label-to-energy', 'to');
  setText('energy-convert', 'convert');

  setText('pressure-title', 'pressure');
  setText('pressure-label', 'value');
  setText('label-from-pressure', 'from');
  setText('label-to-pressure', 'to');
  setText('pressure-convert', 'convert');

  setText('power-title', 'power');
  setText('power-label', 'value');
  setText('label-from-power', 'from');
  setText('label-to-power', 'to');
  setText('power-convert', 'convert');

  setText('currency-title', 'currency');
  setText('currency-label', 'amount');
  setText('label-from-currency', 'from');
  setText('label-to-currency', 'to');
  setText('currency-convert', 'convert');

  setText('instruction-title', 'instruction_title');
  setText('instruction-text', 'instruction_text');

  const setInfo = (titleId, bodyId, titleKey, bodyKey) => {
    const titleEl = $(titleId);
    const bodyEl = $(bodyId);
    if(titleEl) titleEl.innerText = t(titleKey);
    if(bodyEl) bodyEl.innerHTML = t(bodyKey);
  };
  setInfo('length-info-title', 'length-info-body', 'length_info_title', 'length_info_body');
  setInfo('area-info-title', 'area-info-body', 'area_info_title', 'area_info_body');
  setInfo('weight-info-title', 'weight-info-body', 'weight_info_title', 'weight_info_body');
  setInfo('time-info-title', 'time-info-body', 'time_info_title', 'time_info_body');
  setInfo('speed-info-title', 'speed-info-body', 'speed_info_title', 'speed_info_body');
  setInfo('temperature-info-title', 'temperature-info-body', 'temperature_info_title', 'temperature_info_body');
  setInfo('volume-info-title', 'volume-info-body', 'volume_info_title', 'volume_info_body');
  setInfo('energy-info-title', 'energy-info-body', 'energy_info_title', 'energy_info_body');
  setInfo('pressure-info-title', 'pressure-info-body', 'pressure_info_title', 'pressure_info_body');
  setInfo('power-info-title', 'power-info-body', 'power_info_title', 'power_info_body');
  setInfo('currency-info-title', 'currency-info-body', 'currency_info_title', 'currency_info_body');
  setInfo('intro-title', 'intro-text', 'intro_title', 'intro_text');
  setInfo('overview-title', 'overview-text', 'overview_title', 'overview_text');
}

function navigateToPair(mode, from, to){
  if(!from || !to || from === to) return;
  const slug = (u) => mode === 'speed' ? u.replace(/\//g, '-') : u;
  const target = withBase(`/pages/${mode}/${slug(from)}-zu-${slug(to)}/`);
  if(window.location.pathname !== target) window.location.href = target;
}

function setMode(mode){
  const cards = {
    length: 'card-length',
    area: 'card-area',
    weight: 'card-weight',
    time: 'card-time',
    speed: 'card-speed',
    temperature: 'card-temperature',
    volume: 'card-volume',
    energy: 'card-energy',
    pressure: 'card-pressure',
    power: 'card-power',
    currency: 'card-currency'
  };
  Object.entries(cards).forEach(([key, id])=>{
    const el = $(id);
    if(!el) return;
    if(key === mode){
      el.classList.remove('hidden');
      el.hidden = false;
    }else{
      el.classList.add('hidden');
      el.hidden = true;
    }
  });
}

function populateSelect(selectEl, options, labels){
  selectEl.innerHTML = '';
  for(const opt of options){
    const o = document.createElement('option');
    o.value = opt;
    o.textContent = labels?.[opt] || opt;
    selectEl.appendChild(o);
  }
}

function convertUnits(value, fromFactor, toFactor){
  return value * (fromFactor / toFactor);
}

function convertTemperature(value, from, to){
  if(from === to) return value;
  let c;
  if(from === 'C') c = value;
  if(from === 'F') c = (value - 32) * 5/9;
  if(from === 'K') c = value - 273.15;
  if(from === 'R') c = (value - 491.67) * 5/9;
  if(to === 'C') return c;
  if(to === 'F') return (c * 9/5) + 32;
  if(to === 'K') return c + 273.15;
  if(to === 'R') return (c + 273.15) * 9/5;
  return value;
}

function tempFormula(value, from, to, result){
  const v = fmt(value);
  const r = fmt(result);
  if(from === to) return `${t('calculation')}: ${v} ${from} = ${r} ${to}`;
  if(from === 'C' && to === 'F') return `${t('calculation')}: (${v} x 9/5) + 32 = ${r} F`;
  if(from === 'F' && to === 'C') return `${t('calculation')}: (${v} - 32) x 5/9 = ${r} C`;
  if(from === 'C' && to === 'K') return `${t('calculation')}: ${v} + 273.15 = ${r} K`;
  if(from === 'K' && to === 'C') return `${t('calculation')}: ${v} - 273.15 = ${r} C`;
  if(from === 'F' && to === 'K') return `${t('calculation')}: (${v} - 32) x 5/9 + 273.15 = ${r} K`;
  if(from === 'K' && to === 'F') return `${t('calculation')}: (${v} - 273.15) x 9/5 + 32 = ${r} F`;
  if(from === 'R' && to === 'C') return `${t('calculation')}: (${v} - 491.67) x 5/9 = ${r} C`;
  if(from === 'C' && to === 'R') return `${t('calculation')}: (${v} + 273.15) x 9/5 = ${r} R`;
  if(from === 'R' && to === 'K') return `${t('calculation')}: ${v} x 5/9 = ${r} K`;
  if(from === 'K' && to === 'R') return `${t('calculation')}: ${v} x 9/5 = ${r} R`;
  if(from === 'F' && to === 'R') return `${t('calculation')}: ${v} + 459.67 = ${r} R`;
  if(from === 'R' && to === 'F') return `${t('calculation')}: ${v} - 459.67 = ${r} F`;
  return `${t('calculation')}: ${v} ${from} = ${r} ${to}`;
}

function doLength(){
  const input = $('length-input');
  const fromEl = $('length-from');
  const toEl = $('length-to');
  if(!input || !fromEl || !toEl) return;
  const v = parseFloat(input.value) || 0;
  const from = fromEl.value;
  const to = toEl.value;
  const res = convertUnits(v, lengthUnits[from], lengthUnits[to]);
  const resultEl = $('length-result');
  const calcEl = $('length-calc');
  if(resultEl) resultEl.textContent = `${res} ${to}`;
  if(calcEl) calcEl.textContent = `${t('calculation')}: ${fmt(v)} ${from} x (${fmt(lengthUnits[from])} / ${fmt(lengthUnits[to])}) = ${fmt(res)} ${to}`;
  if(from !== to){
    const target = withBase(`/pages/length/${from}-zu-${to}/`);
    const path = window.location.pathname;
    if(path !== target) window.location.href = target;
  }
}

function doArea(){
  const input = $('area-input');
  const fromEl = $('area-from');
  const toEl = $('area-to');
  if(!input || !fromEl || !toEl) return;
  const v = parseFloat(input.value) || 0;
  const from = fromEl.value;
  const to = toEl.value;
  const res = convertUnits(v, areaUnits[from], areaUnits[to]);
  const resultEl = $('area-result');
  const calcEl = $('area-calc');
  if(resultEl) resultEl.textContent = `${res} ${to}`;
  if(calcEl) calcEl.textContent = `${t('calculation')}: ${fmt(v)} ${from} x (${fmt(areaUnits[from])} / ${fmt(areaUnits[to])}) = ${fmt(res)} ${to}`;
  if(from !== to){
    const target = withBase(`/pages/area/${from}-zu-${to}/`);
    const path = window.location.pathname;
    if(path !== target) window.location.href = target;
  }
}

function doWeight(){
  const input = $('weight-input');
  const fromEl = $('weight-from');
  const toEl = $('weight-to');
  if(!input || !fromEl || !toEl) return;
  const v = parseFloat(input.value) || 0;
  const from = fromEl.value;
  const to = toEl.value;
  const res = convertUnits(v, weightUnits[from], weightUnits[to]);
  const resultEl = $('weight-result');
  const calcEl = $('weight-calc');
  if(resultEl) resultEl.textContent = `${res} ${to}`;
  if(calcEl) calcEl.textContent = `${t('calculation')}: ${fmt(v)} ${from} x (${fmt(weightUnits[from])} / ${fmt(weightUnits[to])}) = ${fmt(res)} ${to}`;
  if(from !== to){
    const target = withBase(`/pages/weight/${from}-zu-${to}/`);
    const path = window.location.pathname;
    if(path !== target) window.location.href = target;
  }
}

function doTime(){
  const input = $('time-input');
  const fromEl = $('time-from');
  const toEl = $('time-to');
  if(!input || !fromEl || !toEl) return;
  const v = parseFloat(input.value) || 0;
  const from = fromEl.value;
  const to = toEl.value;
  const res = convertUnits(v, timeUnits[from], timeUnits[to]);
  const resultEl = $('time-result');
  const calcEl = $('time-calc');
  if(resultEl) resultEl.textContent = `${res} ${to}`;
  if(calcEl) calcEl.textContent = `${t('calculation')}: ${fmt(v)} ${from} x (${fmt(timeUnits[from])} / ${fmt(timeUnits[to])}) = ${fmt(res)} ${to}`;
  if(from !== to){
    const target = withBase(`/pages/time/${from}-zu-${to}/`);
    const path = window.location.pathname;
    if(path !== target) window.location.href = target;
  }
}

function doSpeed(){
  const input = $('speed-input');
  const fromEl = $('speed-from');
  const toEl = $('speed-to');
  if(!input || !fromEl || !toEl) return;
  const v = parseFloat(input.value) || 0;
  const from = fromEl.value;
  const to = toEl.value;
  const res = convertUnits(v, speedUnits[from], speedUnits[to]);
  const resultEl = $('speed-result');
  const calcEl = $('speed-calc');
  if(resultEl) resultEl.textContent = `${res} ${to}`;
  if(calcEl) calcEl.textContent = `${t('calculation')}: ${fmt(v)} ${from} x (${fmt(speedUnits[from])} / ${fmt(speedUnits[to])}) = ${fmt(res)} ${to}`;
  if(from !== to){
    const slug = (u) => u.replace(/\//g, '-');
    const target = withBase(`/pages/speed/${slug(from)}-zu-${slug(to)}/`);
    const path = window.location.pathname;
    if(path !== target) window.location.href = target;
  }
}

function doTemperature(){
  const input = $('temperature-input');
  const fromEl = $('temperature-from');
  const toEl = $('temperature-to');
  if(!input || !fromEl || !toEl) return;
  const v = parseFloat(input.value) || 0;
  const from = fromEl.value;
  const to = toEl.value;
  const res = convertTemperature(v, from, to);
  const resultEl = $('temperature-result');
  const calcEl = $('temperature-calc');
  if(resultEl) resultEl.textContent = `${res} ${to}`;
  if(calcEl) calcEl.textContent = tempFormula(v, from, to, res);
  if(from !== to){
    const target = withBase(`/pages/temperature/${from}-zu-${to}/`);
    const path = window.location.pathname;
    if(path !== target) window.location.href = target;
  }
}

function doVolume(){
  const input = $('volume-input');
  const fromEl = $('volume-from');
  const toEl = $('volume-to');
  if(!input || !fromEl || !toEl) return;
  const v = parseFloat(input.value) || 0;
  const from = fromEl.value;
  const to = toEl.value;
  const res = convertUnits(v, volumeUnits[from], volumeUnits[to]);
  const resultEl = $('volume-result');
  const calcEl = $('volume-calc');
  if(resultEl) resultEl.textContent = `${res} ${to}`;
  if(calcEl) calcEl.textContent = `${t('calculation')}: ${fmt(v)} ${from} x (${fmt(volumeUnits[from])} / ${fmt(volumeUnits[to])}) = ${fmt(res)} ${to}`;
  if(from !== to){
    const target = withBase(`/pages/volume/${from}-zu-${to}/`);
    const path = window.location.pathname;
    if(path !== target) window.location.href = target;
  }
}

function doEnergy(){
  const input = $('energy-input');
  const fromEl = $('energy-from');
  const toEl = $('energy-to');
  if(!input || !fromEl || !toEl) return;
  const v = parseFloat(input.value) || 0;
  const from = fromEl.value;
  const to = toEl.value;
  const res = convertUnits(v, energyUnits[from], energyUnits[to]);
  const resultEl = $('energy-result');
  const calcEl = $('energy-calc');
  if(resultEl) resultEl.textContent = `${res} ${to}`;
  if(calcEl) calcEl.textContent = `${t('calculation')}: ${fmt(v)} ${from} x (${fmt(energyUnits[from])} / ${fmt(energyUnits[to])}) = ${fmt(res)} ${to}`;
  if(from !== to){
    const target = withBase(`/pages/energy/${from}-zu-${to}/`);
    const path = window.location.pathname;
    if(path !== target) window.location.href = target;
  }
}

function doPower(){
  const input = $('power-input');
  const fromEl = $('power-from');
  const toEl = $('power-to');
  if(!input || !fromEl || !toEl) return;
  const v = parseFloat(input.value) || 0;
  const from = fromEl.value;
  const to = toEl.value;
  const res = convertUnits(v, powerUnits[from], powerUnits[to]);
  const resultEl = $('power-result');
  const calcEl = $('power-calc');
  if(resultEl) resultEl.textContent = `${res} ${to}`;
  if(calcEl) calcEl.textContent = `${t('calculation')}: ${fmt(v)} ${from} x (${fmt(powerUnits[from])} / ${fmt(powerUnits[to])}) = ${fmt(res)} ${to}`;
  if(from !== to){
    const target = withBase(`/pages/power/${from}-zu-${to}/`);
    const path = window.location.pathname;
    if(path !== target) window.location.href = target;
  }
}



function doPressure(){
  const input = $('pressure-input');
  const fromEl = $('pressure-from');
  const toEl = $('pressure-to');
  if(!input || !fromEl || !toEl) return;
  const v = parseFloat(input.value) || 0;
  const from = fromEl.value;
  const to = toEl.value;
  const res = convertUnits(v, pressureUnits[from], pressureUnits[to]);
  const resultEl = $('pressure-result');
  const calcEl = $('pressure-calc');
  if(resultEl) resultEl.textContent = `${res} ${to}`;
  if(calcEl) calcEl.textContent = `${t('calculation')}: ${fmt(v)} ${from} x (${fmt(pressureUnits[from])} / ${fmt(pressureUnits[to])}) = ${fmt(res)} ${to}`;
  if(from !== to){
    const target = withBase(`/pages/pressure/${from}-zu-${to}/`);
    const path = window.location.pathname;
    if(path !== target) window.location.href = target;
  }
}

const converters = {
  length: doLength,
  area: doArea,
  weight: doWeight,
  time: doTime,
  speed: doSpeed,
  power: doPower,
  temperature: doTemperature,
  volume: doVolume,
  energy: doEnergy,
  pressure: doPressure
};

function swapUnits(mode){
  const fromEl = $(`${mode}-from`);
  const toEl = $(`${mode}-to`);
  if(!fromEl || !toEl) return;
  const tmp = fromEl.value;
  fromEl.value = toEl.value;
  toEl.value = tmp;
  const fn = converters[mode];
  if(fn) fn();
}

async function doCurrency(){
  const input = $('currency-input');
  const fromEl = $('currency-from');
  const toEl = $('currency-to');
  if(!input || !fromEl || !toEl) return;
  const v = parseFloat(input.value) || 0;
  const from = fromEl.value;
  const to = toEl.value;
  if(from !== to){
    const target = withBase(`/pages/currency/${from}-zu-${to}/`);
    const path = window.location.pathname;
    if(path !== target) window.location.href = target;
  }
  if(v === 0){
    const resultEl = $('currency-result');
    if(resultEl) resultEl.textContent = `0.0000 ${to}`;
    return;
  }
  const resultEl = $('currency-result');
  if(resultEl) resultEl.textContent = t('loading');
  try{
    const cachedKey = `fx-${from}-${to}`;
    const cached = JSON.parse(localStorage.getItem(cachedKey) || 'null');
    const now = Date.now();
    if(cached && now - cached.ts < 1000*60*60*12){
      const converted = v * cached.rate;
      if(resultEl) resultEl.textContent = `${converted.toFixed(4)} ${to}`;
      return;
    }
    const url = `https://open.er-api.com/v6/latest/${from}`;
    const r = await fetch(url);
    if(!r.ok){
      throw new Error(`fx request failed: ${r.status}`);
    }
    const j = await r.json();
    const rate = j?.rates?.[to];
    if(!Number.isFinite(rate)){
      throw new Error('fx rate missing');
    }
    localStorage.setItem(cachedKey, JSON.stringify({rate,ts:now}));
    const converted = v * rate;
    if(resultEl) resultEl.textContent = `${converted.toFixed(4)} ${to}`;
  }catch(e){
    if(resultEl) resultEl.textContent = t('error');
  }
}

async function loadLocales(){
  const localeVersion = '12';
  const [de] = await Promise.all([
    fetch(withBase(`/locales/de.json?v=${localeVersion}`)).then(r=>r.json())
  ]);
  translations.de = de;
  applyTranslations();
}

function setup(){
  const validModes = new Set([
    'length','area','weight','time','speed','temperature','volume','energy','pressure','power'
  ]);
  const getInitialMode = () => {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get('cat');
    if(fromQuery && validModes.has(fromQuery)) return fromQuery;
    const fromHash = window.location.hash.replace('#','');
    if(fromHash && validModes.has(fromHash)) return fromHash;
    const fromData = document.body?.dataset?.mode;
    if(fromData && validModes.has(fromData)) return fromData;
    return 'length';
  };
  const lengthFrom = $('length-from');
  const lengthTo = $('length-to');
  const areaFrom = $('area-from');
  const areaTo = $('area-to');
  const weightFrom = $('weight-from');
  const weightTo = $('weight-to');
  const timeFrom = $('time-from');
  const timeTo = $('time-to');
  const speedFrom = $('speed-from');
  const speedTo = $('speed-to');
  const temperatureFrom = $('temperature-from');
  const temperatureTo = $('temperature-to');
  const volumeFrom = $('volume-from');
  const volumeTo = $('volume-to');
  const energyFrom = $('energy-from');
  const energyTo = $('energy-to');
  const pressureFrom = $('pressure-from');
  const pressureTo = $('pressure-to');
  const powerFrom = $('power-from');
  const powerTo = $('power-to');
  const currencyFrom = $('currency-from');
  const currencyTo = $('currency-to');

  if(lengthFrom) populateSelect(lengthFrom, Object.keys(lengthUnits), unitLabels.length);
  if(lengthTo) populateSelect(lengthTo, Object.keys(lengthUnits), unitLabels.length);
  if(areaFrom) populateSelect(areaFrom, Object.keys(areaUnits), unitLabels.area);
  if(areaTo) populateSelect(areaTo, Object.keys(areaUnits), unitLabels.area);
  if(weightFrom) populateSelect(weightFrom, Object.keys(weightUnits), unitLabels.weight);
  if(weightTo) populateSelect(weightTo, Object.keys(weightUnits), unitLabels.weight);
  if(timeFrom) populateSelect(timeFrom, Object.keys(timeUnits), unitLabels.time);
  if(timeTo) populateSelect(timeTo, Object.keys(timeUnits), unitLabels.time);
  if(speedFrom) populateSelect(speedFrom, Object.keys(speedUnits), unitLabels.speed);
  if(speedTo) populateSelect(speedTo, Object.keys(speedUnits), unitLabels.speed);
  if(temperatureFrom) populateSelect(temperatureFrom, tempUnits, unitLabels.temperature);
  if(temperatureTo) populateSelect(temperatureTo, tempUnits, unitLabels.temperature);
  if(volumeFrom) populateSelect(volumeFrom, Object.keys(volumeUnits), unitLabels.volume);
  if(volumeTo) populateSelect(volumeTo, Object.keys(volumeUnits), unitLabels.volume);
  if(energyFrom) populateSelect(energyFrom, Object.keys(energyUnits), unitLabels.energy);
  if(energyTo) populateSelect(energyTo, Object.keys(energyUnits), unitLabels.energy);
  if(pressureFrom) populateSelect(pressureFrom, Object.keys(pressureUnits), unitLabels.pressure);
  if(pressureTo) populateSelect(pressureTo, Object.keys(pressureUnits), unitLabels.pressure);
  if(powerFrom) populateSelect(powerFrom, Object.keys(powerUnits), unitLabels.power);
  if(powerTo) populateSelect(powerTo, Object.keys(powerUnits), unitLabels.power);
  if(currencyFrom) populateSelect(currencyFrom, currencies, unitLabels.currency);
  if(currencyTo) populateSelect(currencyTo, currencies, unitLabels.currency);

  if(lengthFrom) lengthFrom.value = 'm';
  if(lengthTo) lengthTo.value = 'km';
  if(areaFrom) areaFrom.value = 'm2';
  if(areaTo) areaTo.value = 'ha';
  if(weightFrom) weightFrom.value = 'kg';
  if(weightTo) weightTo.value = 'g';
  if(timeFrom) timeFrom.value = 's';
  if(timeTo) timeTo.value = 'min';
  if(speedFrom) speedFrom.value = 'km/h';
  if(speedTo) speedTo.value = 'm/s';
  if(temperatureFrom) temperatureFrom.value = 'C';
  if(temperatureTo) temperatureTo.value = 'F';
  if(volumeFrom) volumeFrom.value = 'l';
  if(volumeTo) volumeTo.value = 'ml';
  if(energyFrom) energyFrom.value = 'kWh';
  if(energyTo) energyTo.value = 'Wh';
  if(pressureFrom) pressureFrom.value = 'bar';
  if(pressureTo) pressureTo.value = 'psi';
  if(powerFrom) powerFrom.value = 'W';
  if(powerTo) powerTo.value = 'kW';
  if(currencyFrom) currencyFrom.value = 'EUR';
  if(currencyTo) currencyTo.value = 'USD';
  const bodyMode = document.body?.dataset?.mode;
  if(bodyMode === 'currency'){
    window.location.href = withBase('/index.html');
    return;
  }
  const bodyFrom = document.body?.dataset?.from;
  const bodyTo = document.body?.dataset?.to;
  const modeSelects = {
    length: {from: lengthFrom, to: lengthTo},
    area: {from: areaFrom, to: areaTo},
    weight: {from: weightFrom, to: weightTo},
    time: {from: timeFrom, to: timeTo},
    speed: {from: speedFrom, to: speedTo},
    power: {from: powerFrom, to: powerTo},
    temperature: {from: temperatureFrom, to: temperatureTo},
    volume: {from: volumeFrom, to: volumeTo},
    energy: {from: energyFrom, to: energyTo},
    pressure: {from: pressureFrom, to: pressureTo},
    currency: {from: currencyFrom, to: currencyTo}
  };
  const setIfExists = (select, value) => {
    if(!select || !value) return;
    const exists = Array.from(select.options).some(o => o.value === value);
    if(exists) select.value = value;
  };
  if(bodyMode && modeSelects[bodyMode]){
    setIfExists(modeSelects[bodyMode].from, bodyFrom);
    setIfExists(modeSelects[bodyMode].to, bodyTo);
  }
  const bindPairNav = (mode, fromEl, toEl) => {
    if(!fromEl || !toEl) return;
    const handler = () => navigateToPair(mode, fromEl.value, toEl.value);
    fromEl.addEventListener('change', handler);
    toEl.addEventListener('change', handler);
  };
  bindPairNav('length', lengthFrom, lengthTo);
  bindPairNav('area', areaFrom, areaTo);
  bindPairNav('weight', weightFrom, weightTo);
  bindPairNav('time', timeFrom, timeTo);
  bindPairNav('speed', speedFrom, speedTo);
  bindPairNav('temperature', temperatureFrom, temperatureTo);
  bindPairNav('volume', volumeFrom, volumeTo);
  bindPairNav('energy', energyFrom, energyTo);
  bindPairNav('pressure', pressureFrom, pressureTo);
  bindPairNav('power', powerFrom, powerTo);
  const pairModes = new Set([
    'length','area','weight','time','speed','temperature','volume','energy','pressure','power'
  ]);
  document.addEventListener('change', (e) => {
    const target = e.target;
    if(!(target instanceof HTMLSelectElement)) return;
    const id = target.id || '';
    if(!id.endsWith('-from') && !id.endsWith('-to')) return;
    const mode = id.split('-')[0];
    if(!pairModes.has(mode)) return;
    const fromEl = $(`${mode}-from`);
    const toEl = $(`${mode}-to`);
    if(fromEl && toEl) navigateToPair(mode, fromEl.value, toEl.value);
  });
  const initialMode = getInitialMode();
  const modeSelect = $('mode-select');
  const isCategoryPage = Boolean(document.body?.dataset?.mode) && window.location.pathname.includes('/pages/');
  if(modeSelect) modeSelect.value = initialMode;

  on('length-convert', 'click', doLength);
  on('area-convert', 'click', doArea);
  on('weight-convert', 'click', doWeight);
  on('time-convert', 'click', doTime);
  on('speed-convert', 'click', doSpeed);
  on('temperature-convert', 'click', doTemperature);
  on('volume-convert', 'click', doVolume);
  on('energy-convert', 'click', doEnergy);
  on('power-convert', 'click', doPower);
  on('pressure-convert', 'click', doPressure);
  on('mode-select', 'change', (e)=> {
    const value = e.target.value;
    if(isCategoryPage){
      window.location.href = withBase(`/pages/${value}/`);
      return;
    }
    setMode(value);
  });

  on('length-input', 'input', doLength);
  on('area-input', 'input', doArea);
  on('weight-input', 'input', doWeight);
  on('time-input', 'input', doTime);
  on('speed-input', 'input', doSpeed);
  on('temperature-input', 'input', doTemperature);
  on('volume-input', 'input', doVolume);
  on('energy-input', 'input', doEnergy);
  on('power-input', 'input', doPower);
  on('pressure-input', 'input', doPressure);
  on('length-from', 'change', doLength);
  on('length-to', 'change', doLength);
  on('area-from', 'change', doArea);
  on('area-to', 'change', doArea);
  on('weight-from', 'change', doWeight);
  on('weight-to', 'change', doWeight);
  on('time-from', 'change', doTime);
  on('time-to', 'change', doTime);
  on('time-from', 'input', doTime);
  on('time-to', 'input', doTime);
  on('speed-from', 'change', doSpeed);
  on('speed-to', 'change', doSpeed);
  on('speed-from', 'input', doSpeed);
  on('speed-to', 'input', doSpeed);
  on('temperature-from', 'change', doTemperature);
  on('temperature-to', 'change', doTemperature);
  on('temperature-from', 'input', doTemperature);
  on('temperature-to', 'input', doTemperature);
  on('volume-from', 'change', doVolume);
  on('volume-to', 'change', doVolume);
  on('volume-from', 'input', doVolume);
  on('volume-to', 'input', doVolume);
  on('energy-from', 'change', doEnergy);
  on('energy-to', 'change', doEnergy);
  on('energy-from', 'input', doEnergy);
  on('energy-to', 'input', doEnergy);
  on('power-from', 'change', doPower);
  on('power-to', 'change', doPower);
  on('power-from', 'input', doPower);
  on('power-to', 'input', doPower);
  on('pressure-from', 'change', doPressure);
  on('pressure-to', 'change', doPressure);
  on('pressure-from', 'input', doPressure);
  on('pressure-to', 'input', doPressure);

  document.querySelectorAll('.swap-btn').forEach(btn => {
    btn.addEventListener('click', () => swapUnits(btn.dataset.mode));
  });

  loadLocales();
  setMode(initialMode);
}

window.addEventListener('DOMContentLoaded', setup);






