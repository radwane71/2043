// ═══════════════════════════════════════════════════════════
//  ticker-helper.js — توحيد نظام التيكر
//  الهدف: كل التحليل يعتمد على كود 4 أرقام، والاسم للعرض فقط
//  المصدر الوحيد للأسماء/القطاعات/التغطية: tickers.js (TICKERS)
// ═══════════════════════════════════════════════════════════

function _stripArabicDiacritics(s) {
  return String(s || '').replace(/[\u064B-\u0652\u0670\u0640]/g, '');
}

function _normName(s) {
  const x = _stripArabicDiacritics(String(s || '')).trim();
  return x
    .toLowerCase()
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/\s+/g, ' ')
    .replace(/[^\w\u0600-\u06FF ]/g, '');
}

// Aliases (متحفظة) — تستخدم فقط عند عدم العثور على مطابقة مباشرة في TICKERS
const ALIAS_TO_CODE = {
  // Arabic common shortcuts
  [_normName('أرامكو')]: '2222',
  [_normName('ارامكو')]: '2222',
  [_normName('الإتصالات السعودية')]: '7010',
  [_normName('الاتصالات السعودية')]: '7010',
  [_normName('كهرباء السعودية')]: '5110',
  [_normName('الكهرباء السعودية')]: '5110',
  [_normName('سابك للمغذيات الزراعية')]: '2020',
  [_normName('سابك للمغذيات')]: '2020',
  [_normName('المعذر ريت')]: '4334',
  [_normName('الراجحي ريت')]: '4340',
  [_normName('دراية ريت')]: '4339',
  [_normName('جدوى ريت السعودية')]: '4342',
  [_normName('الخبير ريت')]: '4348',
  [_normName('تعليم ريت')]: '4333',
  [_normName('سدكو كابيتال ريت')]: '4344',
  [_normName('الإنماء ريت الفندقي')]: '4349',
  [_normName('الانماء ريت الفندقي')]: '4349',
  [_normName('أسواق ع العثيم')]: '4001',
  [_normName('اسواق ع العثيم')]: '4001',

  // English / broker-style labels from data.js
  [_normName('NAHDI')]: '4164',
  [_normName('A.OTHAIM MARKET')]: '4001',
  [_normName('ALINMA BANK')]: '1150',
  [_normName('SIPCHEM')]: '2310',
  [_normName('Sipchem')]: '2310',
  [_normName('SABIC')]: '2010',
  [_normName('SABIC AGRI-NUTRIENTS')]: '2020',
  [_normName('SAUDI ELECTRICITY')]: '5110',
  [_normName('SAUDI ARAMCO')]: '2222',
  [_normName('STC')]: '7010',
  [_normName('RIYAD BANK')]: '1010',
  [_normName('JARIR')]: '4190',
  [_normName('MODERN MILLS')]: '2284',
  [_normName('LUBEREF')]: '2223',
  [_normName('YANBU CEMENT')]: '3060',
  [_normName('YAMAMAH CEMENT')]: '3020',
  [_normName('QASSIM CEMENT')]: '3040',
  [_normName('ALKHABEER REIT')]: '4348',
  [_normName('AL MAATHER REIT')]: '4334',
  [_normName('ALINMA HOSPITALITY REIT')]: '4349',
  [_normName('SEDCO CAPITAL REIT')]: '4344',
  [_normName('JADWA REIT SAUDI')]: '4342',
  [_normName('DERAYAH REIT')]: '4339',
  [_normName('AL RAJHI REIT')]: '4340',
  [_normName('UNITS TALEEM REIT')]: '4333',
  [_normName('CENOMI CENTERS')]: '4321',
  [_normName('FAKEEH CARE')]: '4017',
  [_normName('FITNESS TIME')]: '1830',
  [_normName('EXTRA')]: '4003',
};

function _buildMaps() {
  const codeMap = {};
  const nameMap = {};

  (window.TICKERS || []).forEach(t => {
    if (!t || !t.code) return;

    // لا تسمح بالـ override على نفس الكود (يحمي من تكرارات البيانات)
    if (!codeMap[t.code]) {
      codeMap[t.code] = t;
    }

    const k = _normName(t.name);
    if (k && !nameMap[k]) {
      nameMap[k] = t;
    }
  });

  return { codeMap, nameMap };
}

let _MAPS = _buildMaps();

function normalizeTickerCode(input) {
  if (!input) return input;

  const raw = String(input).trim();

  // digits → code
  if (/^\d{4}$/.test(raw)) return raw;
  if (/^\d{3}$/.test(raw)) return raw.padStart(4, '0');
  if (/^\d{5}$/.test(raw)) return raw; // احتياط

  // aliases
  const key = _normName(raw);
  const alias = ALIAS_TO_CODE[key];
  if (alias && _MAPS.codeMap[alias]) return alias;

  // exact name match inside TICKERS
  const byName = _MAPS.nameMap[key];
  if (byName && byName.code) return byName.code;

  return raw;
}

function getTickerInfo(code) {
  const c = normalizeTickerCode(code);
  const t = _MAPS.codeMap[c];
  if (!t) {
    return { code: c, name: c, sector: 'غير محدد', coverage: 'غير محدد', is_bluechip: false };
  }
  return {
    code: t.code,
    name: t.name,
    sector: t.sector,
    coverage: t.coverage,
    is_bluechip: !!t.is_bluechip,
  };
}

function getTickerName(code) {
  return getTickerInfo(code).name;
}

function getTickerSector(code) {
  return getTickerInfo(code).sector;
}

function isValidTickerCode(code) {
  const c = normalizeTickerCode(code);
  return !!_MAPS.codeMap[c];
}

function searchTicker(query) {
  if (!query) return null;

  // refresh maps if TICKERS changed dynamically
  if (!_MAPS || !_MAPS.codeMap) {
    _MAPS = _buildMaps();
  }

  const q = String(query).trim();
  const c = normalizeTickerCode(q);
  if (_MAPS.codeMap[c]) return _MAPS.codeMap[c];

  const key = _normName(q);
  if (_MAPS.nameMap[key]) return _MAPS.nameMap[key];

  // partial search (عرض فقط) — لا تستخدمها للتحويل الإحصائي
  const found = (window.TICKERS || []).find(t => {
    if (!t) return false;
    return String(t.code).includes(q) || _normName(t.name).includes(key);
  });

  return found || null;
}

// Export
window.TickerHelper = {
  normalizeCode: normalizeTickerCode,
  getName: getTickerName,
  getSector: getTickerSector,
  getInfo: getTickerInfo,
  isValid: isValidTickerCode,
  search: searchTicker,
};
