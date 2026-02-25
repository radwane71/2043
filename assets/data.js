// ═══════════════════════════════════════════════════════════
//  data.js — المصدر الوحيد لكل البيانات والمتغيرات
//  أي تعديل هنا ينعكس على كل صفحات الموقع تلقائياً
// ═══════════════════════════════════════════════════════════

const APP = {

  // ──────────────────────────────────────────────
  //  1. إعدادات عامة
  // ──────────────────────────────────────────────
  settings: {
    ownerName:        "رضوان الجهني",
    currency:         "SAR",
    retirementYear:   2043,
    startYear:        2025,
    targetYield:      0.06,
    targetCapital:    1000000,
    maxPositionPct:   0.07,
    maxSectorPct:     0.25,
    blueChipMaxPct:   0.12,
    minPositions:     20,
    maxPositions:     25,
    rebalanceThresh:  0.05,
  },

  // ──────────────────────────────────────────────
  //  2. إعدادات العمولات والضرائب
  // ──────────────────────────────────────────────
  fees: {
    commissionRate:   0.00155,
    vatRate:          0.15,
    minCommission:    0,
  },

  // ──────────────────────────────────────────────
  //  3. بيانات المحفظة — 21 سهم
  // ──────────────────────────────────────────────
  portfolio: [
    {
      stock:          "الكهرباء السعودية",
      ticker:         "5110",
      sector:         "المرافق العامة",
      qty:            24,
      avg_cost:       14.16,
      current_price:  13.76,
      goal_alloc:     0.05,
      buy_zone_max:   14.5,
      sell_zone_low:  19,
      sell_zone_high: 21,
      decision:       "تجميع",
      eval:           "تجميع - الهدف على اليمين",
      is_bluechip:    false,
    },
    {
      stock:          "بنك الرياض",
      ticker:         "1010",
      sector:         "البنوك",
      qty:            78,
      avg_cost:       27.85,
      current_price:  27.9,
      goal_alloc:     0.05,
      buy_zone_max:   27.5,
      sell_zone_low:  33,
      sell_zone_high: 35,
      decision:       "تجميع",
      eval:           "تجميع - الهدف على اليمين",
      is_bluechip:    false,
    },
    {
      stock:          "سدافكو",
      ticker:         "2270",
      sector:         "إنتاج الأغذية",
      qty:            2,
      avg_cost:       236.82,
      current_price:  196.3,
      goal_alloc:     0.04,
      buy_zone_max:   225,
      sell_zone_low:  305,
      sell_zone_high: 325,
      decision:       "تجميع",
      eval:           "إحتفاظ وتجميع خفيف",
      is_bluechip:    false,
    },
    {
      stock:          "سابك للمغذيات",
      ticker:         "2020",
      sector:         "بتروكيميال",
      qty:            23,
      avg_cost:       116.22,
      current_price:  127,
      goal_alloc:     0.05,
      buy_zone_max:   118,
      sell_zone_low:  145,
      sell_zone_high: 150,
      decision:       "تجميع",
      eval:           "تجميع بمناطق الشراء",
      is_bluechip:    false,
    },
    {
      stock:          "العثيم",
      ticker:         "4001",
      sector:         "تجزئة",
      qty:            289,
      avg_cost:       6.34,
      current_price:  6.17,
      goal_alloc:     0.04,
      buy_zone_max:   7.8,
      sell_zone_low:  9,
      sell_zone_high: 10.5,
      decision:       "مراقبة",
      eval:           "مراقبة نتائج Q1 2026",
      is_bluechip:    false,
    },
    {
      stock:          "جرير",
      ticker:         "4190",
      sector:         "تجزئة كمالية",
      qty:            555,
      avg_cost:       12.9,
      current_price:  14.1,
      goal_alloc:     0.05,
      buy_zone_max:   13,
      sell_zone_low:  15.8,
      sell_zone_high: 16.5,
      decision:       "تجميع",
      eval:           "تجميع بمناطق الشراء",
      is_bluechip:    false,
    },
    {
      stock:          "أسمنت السعودية",
      ticker:         "3030",
      sector:         "إسمنت",
      qty:            317,
      avg_cost:       38.08,
      current_price:  32.9,
      goal_alloc:     0.06,
      buy_zone_max:   35,
      sell_zone_low:  46.5,
      sell_zone_high: 48,
      decision:       "تجميع",
      eval:           "احتفاظ ونظر للنتائج",
      is_bluechip:    false,
    },
    {
      stock:          "تعليم ريت",
      ticker:         "4333",
      sector:         "صناديق ريت",
      qty:            721,
      avg_cost:       9.89,
      current_price:  9.45,
      goal_alloc:     0.04,
      buy_zone_max:   10,
      sell_zone_low:  11.8,
      sell_zone_high: 12.5,
      decision:       "احتفاظ",
      eval:           "احتفاظ",
      is_bluechip:    false,
    },
    {
      stock:          "سابك",
      ticker:         "2010",
      sector:         "بتروكيميال",
      qty:            95,
      avg_cost:       54.34,
      current_price:  54.8,
      goal_alloc:     0.03,
      buy_zone_max:   58,
      sell_zone_low:  78,
      sell_zone_high: 85,
      decision:       "مراقبة",
      eval:           "مراقبة نتائج Q1 2026",
      is_bluechip:    false,
    },
    {
      stock:          "المراكز العربية",
      ticker:         "4321",
      sector:         "عقارات",
      qty:            300,
      avg_cost:       20.47,
      current_price:  18.06,
      goal_alloc:     0.03,
      buy_zone_max:   19.8,
      sell_zone_low:  26,
      sell_zone_high: 28,
      decision:       "تجميع",
      eval:           "تجميع بمناطق الشراء",
      is_bluechip:    false,
    },
    {
      stock:          "STC",
      ticker:         "7010",
      sector:         "اتصالات",
      qty:            394,
      avg_cost:       42.15,
      current_price:  42.46,
      goal_alloc:     0.08,
      buy_zone_max:   42.5,
      sell_zone_low:  54,
      sell_zone_high: 58,
      decision:       "تجميع",
      eval:           "تجميع بمناطق الشراء",
      is_bluechip:    true,
    },
    {
      stock:          "المطاحن الحديثة",
      ticker:         "2284",
      sector:         "إنتاج الأغذية",
      qty:            160,
      avg_cost:       31.12,
      current_price:  25.8,
      goal_alloc:     0.02,
      buy_zone_max:   28.5,
      sell_zone_low:  41,
      sell_zone_high: 43,
      decision:       "احتفاظ",
      eval:           "احتفاظ",
      is_bluechip:    false,
    },
    {
      stock:          "الإنماء",
      ticker:         "1150",
      sector:         "البنوك",
      qty:            533,
      avg_cost:       24.67,
      current_price:  27.94,
      goal_alloc:     0.06,
      buy_zone_max:   25.5,
      sell_zone_low:  33,
      sell_zone_high: 34.5,
      decision:       "احتفاظ",
      eval:           "احتفاظ",
      is_bluechip:    false,
    },
    {
      stock:          "جدوى ريت السعودية",
      ticker:         "4342",
      sector:         "صناديق ريت",
      qty:            1160,
      avg_cost:       10.26,
      current_price:  11.44,
      goal_alloc:     0.05,
      buy_zone_max:   10.5,
      sell_zone_low:  13.8,
      sell_zone_high: 14.5,
      decision:       "احتفاظ",
      eval:           "احتفاظ",
      is_bluechip:    false,
    },
    {
      stock:          "أسمنت القصيم",
      ticker:         "3040",
      sector:         "إسمنت",
      qty:            365,
      avg_cost:       41.55,
      current_price:  42.34,
      goal_alloc:     0.06,
      buy_zone_max:   41.5,
      sell_zone_low:  55,
      sell_zone_high: 58,
      decision:       "احتفاظ",
      eval:           "احتفاظ",
      is_bluechip:    false,
    },
    {
      stock:          "سيدكو ريت",
      ticker:         "4344",
      sector:         "صناديق ريت",
      qty:            1648,
      avg_cost:       6.89,
      current_price:  7.04,
      goal_alloc:     0.04,
      buy_zone_max:   7,
      sell_zone_low:  8.5,
      sell_zone_high: 9,
      decision:       "تخفيف",
      eval:           "تخفيف 0.9% عند الهدف",
      is_bluechip:    false,
    },
    {
      stock:          "أرامكو السعودية",
      ticker:         "2222",
      sector:         "الطاقة",
      qty:            1186,
      avg_cost:       24.13,
      current_price:  25.74,
      goal_alloc:     0.12,
      buy_zone_max:   24.8,
      sell_zone_low:  28,
      sell_zone_high: 33,
      decision:       "احتفاظ",
      eval:           "احتفاظ",
      is_bluechip:    true,
    },
    {
      stock:          "الخبير ريت",
      ticker:         "4348",
      sector:         "صناديق ريت",
      qty:            2266,
      avg_cost:       5.73,
      current_price:  5.61,
      goal_alloc:     0.04,
      buy_zone_max:   6,
      sell_zone_low:  7.7,
      sell_zone_high: 8.2,
      decision:       "تخفيف",
      eval:           "تخفيف 1.7% عند الهدف",
      is_bluechip:    false,
    },
    {
      stock:          "النهدي",
      ticker:         "4164",
      sector:         "تجزئة",
      qty:            150,
      avg_cost:       96.39,
      current_price:  96,
      goal_alloc:     0.04,
      buy_zone_max:   97,
      sell_zone_low:  130,
      sell_zone_high: 145,
      decision:       "تخفيف",
      eval:           "تخفيف 1.7% عند الهدف",
      is_bluechip:    false,
    },
    {
      stock:          "سبكيم العالمية",
      ticker:         "2310",
      sector:         "بتروكيميال",
      qty:            1245,
      avg_cost:       16.06,
      current_price:  14.04,
      goal_alloc:     0,
      buy_zone_max:   15.1,
      sell_zone_low:  20,
      sell_zone_high: 27.5,
      decision:       "تخفيف",
      eval:           "خروج حسب الخطة: 30%@19.8 / 30%@21.9 / 40%@24.6",
      is_bluechip:    false,
    },
    {
      stock:          "المواساة",
      ticker:         "4002",
      sector:         "رعاية صحية",
      qty:            470,
      avg_cost:       73.56,
      current_price:  61.95,
      goal_alloc:     0.05,
      buy_zone_max:   72,
      sell_zone_low:  90,
      sell_zone_high: 98,
      decision:       "تخفيف",
      eval:           "خروج جزئي: 50%@91 / 30%@93 / إبقاء 20%",
      is_bluechip:    false,
    },
  ],

  // ──────────────────────────────────────────────
  //  4. التوزيعات المستلمة
  // ──────────────────────────────────────────────
  dividends: [
    { no:1,  date:"2025-08-01", stock:"جرير",           amount:25.6   },
    { no:2,  date:"2025-08-01", stock:"أرامكو",          amount:496.47 },
    { no:3,  date:"2025-09-01", stock:"دراية ريت",       amount:320.75 },
    { no:4,  date:"2025-09-01", stock:"جدوى ريت",        amount:60.83  },
    { no:5,  date:"2025-09-01", stock:"أسمنت القصيم",    amount:746.7  },
    { no:6,  date:"2025-10-01", stock:"الخبير ريت",      amount:65.1   },
    { no:7,  date:"2025-11-01", stock:"الإنماء",         amount:75     },
    { no:8,  date:"2025-11-01", stock:"جرير",            amount:155.4  },
    { no:9,  date:"2025-11-01", stock:"STC",             amount:675.13 },
    { no:10, date:"2025-11-01", stock:"أرامكو",          amount:34.82  },
    { no:11, date:"2025-12-01", stock:"جدوى ريت",        amount:232    },
    { no:12, date:"2025-12-01", stock:"سبكيم",           amount:130    },
    { no:13, date:"2025-12-01", stock:"المواساة",        amount:470    },
    { no:14, date:"2025-12-01", stock:"أسمنت القصيم",    amount:294.24 },
  ],

  // ──────────────────────────────────────────────
  //  5. العمليات
  // ──────────────────────────────────────────────
  transactions: [
    { no:1,   status:"Buy",  ticker:"NAHDI",               qty:73,   price:94.45,  total:6894.85,  commission:10.69, vat:1.30,  total_cost:6882.87  },
    { no:2,   status:"Buy",  ticker:"NAHDI",               qty:21,   price:94.45,  total:1983.45,  commission:3.07,  vat:0.37,  total_cost:1980.00  },
    { no:3,   status:"Buy",  ticker:"A.OTHAIM",            qty:47,   price:6.11,   total:287.17,   commission:0.45,  vat:0.05,  total_cost:286.67   },
    { no:5,   status:"Buy",  ticker:"Sipchem",             qty:985,  price:15.2,   total:14972,    commission:23.21, vat:2.81,  total_cost:14945.98 },
    { no:6,   status:"Buy",  ticker:"ALINMA BANK",         qty:283,  price:24.5,   total:6933.5,   commission:10.75, vat:1.30,  total_cost:6921.45  },
    { no:10,  status:"Sell", ticker:"EXTRA",               qty:3,    price:90,     total:270,      commission:0.42,  vat:0.05,  total_cost:269.53   },
    { no:14,  status:"Buy",  ticker:"SABIC",               qty:95,   price:54.25,  total:5153.75,  commission:7.99,  vat:0.97,  total_cost:5144.79  },
    { no:34,  status:"Buy",  ticker:"Qassim Cement",       qty:99,   price:41.66,  total:4124.34,  commission:6.39,  vat:0.78,  total_cost:4117.17  },
    { no:36,  status:"Buy",  ticker:"STC",                 qty:22,   price:42.84,  total:942.48,   commission:1.46,  vat:0.18,  total_cost:940.84   },
    { no:39,  status:"Buy",  ticker:"SAUDI ARAMCO",        qty:100,  price:24.93,  total:2493,     commission:3.86,  vat:0.47,  total_cost:2488.67  },
    { no:52,  status:"Buy",  ticker:"MOUWASAT",            qty:162,  price:72.95,  total:11817.9,  commission:18.32, vat:2.22,  total_cost:11797.36 },
    { no:62,  status:"Sell", ticker:"SABIC AGRI-NUTRIENTS",qty:75,   price:120.8,  total:9060,     commission:14.04, vat:1.70,  total_cost:9044.25  },
    { no:66,  status:"Buy",  ticker:"SAUDI ARAMCO",        qty:345,  price:24.59,  total:8483.55,  commission:13.15, vat:1.59,  total_cost:8468.81  },
    { no:78,  status:"Buy",  ticker:"JARIR",               qty:40,   price:13.18,  total:527.2,    commission:0.82,  vat:0.10,  total_cost:526.28   },
    { no:113, status:"Buy",  ticker:"SAUDI ARAMCO",        qty:100,  price:23.51,  total:2351,     commission:3.64,  vat:0.44,  total_cost:2346.91  },
    { no:126, status:"Buy",  ticker:"SAUDI ARAMCO",        qty:180,  price:23.5,   total:4230,     commission:6.56,  vat:0.80,  total_cost:4222.65  },
    { no:130, status:"Buy",  ticker:"JARIR",               qty:100,  price:12.84,  total:1284,     commission:1.99,  vat:0.24,  total_cost:1281.77  },
    { no:159, status:"Buy",  ticker:"SAUDI ARAMCO",        qty:150,  price:23.64,  total:3546,     commission:5.50,  vat:0.67,  total_cost:3539.84  },
    { no:171, status:"Buy",  ticker:"SAUDI ARAMCO",        qty:100,  price:24.21,  total:2421,     commission:3.75,  vat:0.46,  total_cost:2416.79  },
    { no:184, status:"Buy",  ticker:"RIYAD BANK",          qty:78,   price:27.85,  total:2172.3,   commission:3.37,  vat:0.41,  total_cost:2168.52  },
    { no:191, status:"Buy",  ticker:"SADAFCO",             qty:1,    price:232.3,  total:232.3,    commission:0.36,  vat:0.04,  total_cost:231.90   },
  ],

  // ──────────────────────────────────────────────
  //  6. العقارات
  // ──────────────────────────────────────────────
  properties: [],

  // ──────────────────────────────────────────────
  //  7. خطط السيولة للضخ
  // ──────────────────────────────────────────────
  cashPlans: [],

  // ──────────────────────────────────────────────
  //  8. صافي الثروة
  // ──────────────────────────────────────────────
  netWorth: {
    portfolio:   221460.67,
    properties:  0,
    cash:        0,
    debts:       0,
    lastUpdated: "2026-02-25",
  },
};

// ═══════════════════════════════════════════════════════════
//  Storage — localStorage دائم + sessionStorage للمصادقة فقط
// ═══════════════════════════════════════════════════════════
const Store = {
  _mem: {},

  // ── قراءة ──────────────────────────────────────────────
  get(key) {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : null;
    } catch(e) {
      return this._mem[key] ?? null;
    }
  },

  // ── كتابة ──────────────────────────────────────────────
  set(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
      this._mem[key] = val;          // نسخة في الذاكرة أيضاً
    } catch(e) {
      this._mem[key] = val;
    }
  },

  // ── حذف مفتاح ─────────────────────────────────────────
  del(key) {
    try { localStorage.removeItem(key); } catch(e) {}
    delete this._mem[key];
  },

  // ── تحميل مع fallback ─────────────────────────────────
  load(key, fallback) {
    const v = this.get(key);
    return v !== null ? v : fallback;
  },

  // ── حفظ ───────────────────────────────────────────────
  save(key, data) {
    this.set(key, data);
  },

  // ── حجم البيانات المحفوظة ─────────────────────────────
  sizeKB() {
    try {
      let total = 0;
      for (let k in localStorage) {
        if (localStorage.hasOwnProperty(k))
          total += localStorage[k].length + k.length;
      }
      return (total * 2 / 1024).toFixed(1); // UTF-16 → bytes → KB
    } catch(e) { return '—'; }
  },
};

// ═══════════════════════════════════════════════════════════
//  Helpers
// ═══════════════════════════════════════════════════════════
const H = {

  fmt(n, d = 2) {
    return Number(n).toLocaleString('ar-SA', {
      minimumFractionDigits: d,
      maximumFractionDigits: d,
    });
  },

  pct(n, decimals = 2) {
    const cls  = n >= 0 ? 'pos' : 'neg';
    const sign = n >= 0 ? '+' : '';
    return `<span class="${cls}">${sign}${(n * 100).toFixed(decimals)}%</span>`;
  },

  badge(decision) {
    const map = {
      'تجميع':  ['acc',    'تجميع ↑'],
      'احتفاظ': ['hold',   'احتفاظ'],
      'إحتفاظ': ['hold',   'احتفاظ'],
      'مراقبة': ['watch',  'مراقبة 👁'],
      'تخفيف':  ['reduce', 'تخفيف ↓'],
      'بيع':    ['sell',   'بيع ✕'],
    };
    for (const [key, [cls, label]] of Object.entries(map)) {
      if (decision.includes(key))
        return `<span class="badge badge-${cls}">${label}</span>`;
    }
    return `<span class="badge">${decision}</span>`;
  },

  portfolioMarketValue() {
    return APP.portfolio.reduce((s, p) => s + p.qty * p.current_price, 0);
  },

  portfolioCost() {
    return APP.portfolio.reduce((s, p) => s + p.qty * p.avg_cost, 0);
  },

  calcCommission(total) {
    const c    = APP.fees;
    const comm = Math.max(total * c.commissionRate, c.minCommission);
    const vat  = comm * c.vatRate;
    return { commission: comm, vat, net: total - comm - vat };
  },

  today() {
    return new Date().toISOString().split('T')[0];
  },
};

// ═══════════════════════════════════════════════════════════
//  Auth — المصادقة تعتمد على sessionStorage فقط
//  (تنتهي عند إغلاق المتصفح — هذا مقصود للأمان)
//  بينما البيانات تبقى في localStorage
// ═══════════════════════════════════════════════════════════
function requireAuth() {
  try {
    if (sessionStorage.getItem('auth_2043') !== '1') {
      window.location.href = 'index.html';
      return false;
    }
  } catch(e) {
    // sessionStorage محجوب — نسمح بالمرور
  }
  return true;
}

function doLogout() {
  try {
    sessionStorage.removeItem('auth_2043'); // امسح الجلسة فقط
    // localStorage يبقى — البيانات محفوظة
  } catch(e) {}
  window.location.href = 'index.html';
}
