// ═══════════════════════════════════════════════════════════
//  ticker-helper.js — توحيد نظام التيكر
//  يحول جميع الأسماء إلى أكواد 4 أرقام
//  يضمن Data Integrity في جميع أنحاء النظام
// ═══════════════════════════════════════════════════════════

// خريطة التحويل من الاسم إلى الكود
const TICKER_NAME_TO_CODE = {
  // أسماء إنجليزية → أكواد
  "NAHDI": "4001",
  "A.OTHAIM MARKET": "4190", 
  "Sipchem": "2310",
  "ALINMA BANK": "1150",
  "EXTRA": "4164",
  "LUBEREF": "4342",
  "SABIC": "2010",
  "Yanbu Cement": "3040",
  "SADAFCO": "2020",
  "SAUDI ELECTRICITY": "5110",
  "AL MAATHER REIT": "4344",
  "SABIC AGRI-NUTRIENTS": "2270",
  "MOUWASAT": "4321",
  "JADWA REIT SAUDI": "4348",
  "ARIR": "4333",
  "Qassim Cement": "3040",
  "RIYAD BANK": "1010",
  "STC": "7010",
  "CENOMI CENTERS": "4002",
  "SAUDI ARAMCO": "2222",
  "ALKHABEER REIT": "4342",
  "SAUDI CEMENT": "3030",
  "Al RAJHI REIT": "4344",
  "JADWA REIT SAUDI": "4348",
  "FITNESS TIME": "4002",
  "DERAYAH REIT": "4348",
  "Yamamah Cement": "3040",
  "UNITS TALEEM REIT": "4348",
  "FAKEEH CARE": "4002",
  
  // أسماء عربية → أكواد
  "النهدي": "4164",
  "العثيم": "4001",
  "جرير": "4190",
  "أسمنت السعودية": "3030",
  "تعليم ريت": "4333",
  "سابك": "2010",
  "المراكز العربية": "4321",
  "المطاحن الحديثة": "2284",
  "الإنماء": "1150",
  "جدوى ريت السعودية": "4342",
  "أسمنت القصيم": "3040",
  "سيدكو ريت": "4344",
  "الخبير ريت": "4348",
  "سبكيم العالمية": "2310",
  "المواساة": "4002",
  "الكهرباء السعودية": "5110",
  "بنك الرياض": "1010",
  "سدافكو": "2270",
  "سابك للمغذيات": "2020",
  "أرامكو السعودية": "2222",
  "STC": "7010"
};

// دالة التحويل الموحدة
function normalizeTickerCode(ticker) {
  if (!ticker) return ticker;
  
  // إذا كان 4 أرقام، اعتبره كود صحيح
  if (/^\d{4}$/.test(ticker)) {
    return ticker;
  }
  
  // إذا كان كوداً آخر (مثل 7010)، اعتبره صحيح
  if (/^\d{3,5}$/.test(ticker)) {
    return ticker.padStart(4, '0');
  }
  
  // محاولة التحويل من الاسم
  const upperTicker = ticker.toUpperCase().trim();
  return TICKER_NAME_TO_CODE[upperTicker] || ticker;
}

// دالة موحدة للحصول على اسم التيكر
function getTickerName(code) {
  const normalizedCode = normalizeTickerCode(code);
  
  // البحث في TICKERS array
  const ticker = TICKERS.find(t => t.code === normalizedCode);
  return ticker ? ticker.name : normalizedCode;
}

// دالة موحدة للحصول على قطاع التيكر
function getTickerSector(code) {
  const normalizedCode = normalizeTickerCode(code);
  
  // البحث في TICKERS array
  const ticker = TICKERS.find(t => t.code === normalizedCode);
  return ticker ? ticker.sector : "غير محدد";
}

// دالة للتحقق من صحة الكود
function isValidTickerCode(code) {
  const normalized = normalizeTickerCode(code);
  return TICKERS.some(t => t.code === normalized);
}

// دالة لإنشاء خريطة سريعة
function createTickerMap() {
  const map = {};
  TICKERS.forEach(t => {
    map[t.code] = t;
    // إضافة الاسماء الممكنة للبحث
    map[t.name.toUpperCase()] = t;
  });
  return map;
}

// إنشاء الخريطة مرة واحدة
const TICKER_MAP = createTickerMap();

// دالة البحث المحسنة
function searchTicker(query) {
  if (!query) return null;
  
  const upperQuery = query.toUpperCase().trim();
  
  // البحث المباشر في الخريطة
  if (TICKER_MAP[upperQuery]) {
    return TICKER_MAP[upperQuery];
  }
  
  // البحث الجزئي
  return TICKERS.find(t => 
    t.code.includes(upperQuery) || 
    t.name.toUpperCase().includes(upperQuery)
  );
}

// دالة للحصول على معلومات السهم الكاملة
function getTickerInfo(code) {
  const normalizedCode = normalizeTickerCode(code);
  const ticker = TICKERS.find(t => t.code === normalizedCode);
  
  if (!ticker) {
    return {
      code: normalizedCode,
      name: normalizedCode,
      sector: "غير محدد",
      coverage: "غير محدد",
      is_bluechip: false
    };
  }
  
  return {
    code: ticker.code,
    name: ticker.name,
    sector: ticker.sector,
    coverage: ticker.coverage,
    is_bluechip: ticker.is_bluechip || false
  };
}

// التصدير للاستخدام العام
window.TickerHelper = {
  normalizeCode: normalizeTickerCode,
  getName: getTickerName,
  getSector: getTickerSector,
  getInfo: getTickerInfo,
  isValid: isValidTickerCode,
  search: searchTicker,
  map: TICKER_MAP
};
