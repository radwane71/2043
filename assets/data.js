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
  //  5. العمليات — 191 عملية محدّثة حتى 19-02-2026
  // ──────────────────────────────────────────────
  transactions: [
    { no:1   , status:"Buy", ticker:"NAHDI", qty:73, price:94.45, total:6894.85, commission:10.69, vat:1.3, total_cost:6882.87 },
    { no:2   , status:"Buy", ticker:"NAHDI", qty:21, price:94.45, total:1983.45, commission:3.07, vat:0.37, total_cost:1980.0 },
    { no:3   , status:"Buy", ticker:"A.OTHAIM MARKET", qty:47, price:6.11, total:287.17, commission:0.45, vat:0.05, total_cost:286.67 },
    { no:4   , status:"Buy", ticker:"A.OTHAIM MARKET", qty:9, price:6.11, total:54.99, commission:0.09, vat:0.01, total_cost:54.89 },
    { no:5   , status:"Buy", ticker:"Sipchem", qty:985, price:15.2, total:14972.0, commission:23.21, vat:2.81, total_cost:14945.98 },
    { no:6   , status:"Buy", ticker:"ALINMA BANK", qty:283, price:24.5, total:6933.5, commission:10.75, vat:1.3, total_cost:6921.45 },
    { no:7   , status:"Buy", ticker:"A.OTHAIM MARKET", qty:45, price:6.32, total:284.4, commission:0.44, vat:0.05, total_cost:283.91 },
    { no:8   , status:"Buy", ticker:"A.OTHAIM MARKET", qty:20, price:6.3, total:126.0, commission:0.2, vat:0.02, total_cost:125.78 },
    { no:9   , status:"Buy", ticker:"A.OTHAIM MARKET", qty:75, price:6.3, total:472.5, commission:0.73, vat:0.09, total_cost:471.68 },
    { no:10  , status:"Sell", ticker:"EXTRA", qty:3, price:90.0, total:270.0, commission:0.42, vat:0.05, total_cost:269.53 },
    { no:11  , status:"Buy", ticker:"A.OTHAIM MARKET", qty:50, price:6.27, total:313.5, commission:0.49, vat:0.06, total_cost:312.96 },
    { no:12  , status:"Sell", ticker:"LUBEREF", qty:8, price:97.9, total:783.2, commission:1.21, vat:0.15, total_cost:781.84 },
    { no:13  , status:"Sell", ticker:"LUBEREF", qty:32, price:97.9, total:3132.8, commission:4.86, vat:0.59, total_cost:3127.36 },
    { no:14  , status:"Buy", ticker:"SABIC", qty:95, price:54.25, total:5153.75, commission:7.99, vat:0.97, total_cost:5144.79 },
    { no:15  , status:"Sell", ticker:"LUBEREF", qty:13, price:97.9, total:1272.7, commission:1.97, vat:0.24, total_cost:1270.49 },
    { no:16  , status:"Sell", ticker:"Yanbu Cement", qty:1, price:16.15, total:16.15, commission:0.03, vat:0.0, total_cost:16.12 },
    { no:17  , status:"Sell", ticker:"Yanbu Cement", qty:349, price:16.15, total:5636.35, commission:8.74, vat:1.06, total_cost:5626.55 },
    { no:18  , status:"Buy", ticker:"NAHDI", qty:56, price:99.2, total:5555.2, commission:8.61, vat:1.04, total_cost:5545.55 },
    { no:19  , status:"Buy", ticker:"EXTRA", qty:3, price:89.6, total:268.8, commission:0.42, vat:0.05, total_cost:268.33 },
    { no:20  , status:"Buy", ticker:"A.OTHAIM MARKET", qty:43, price:6.76, total:290.68, commission:0.45, vat:0.05, total_cost:290.17 },
    { no:21  , status:"Buy", ticker:"SABIC AGRI-NUTRIENTS", qty:2, price:116.2, total:232.4, commission:0.36, vat:0.04, total_cost:232.0 },
    { no:22  , status:"Buy", ticker:"SADAFCO", qty:1, price:240.5, total:240.5, commission:0.37, vat:0.05, total_cost:240.08 },
    { no:23  , status:"Buy", ticker:"SAUDI ELECTRICITY", qty:4, price:14.11, total:56.44, commission:0.09, vat:0.01, total_cost:56.34 },
    { no:24  , status:"Sell", ticker:"AL MAATHER REIT", qty:600, price:9.02, total:5412.0, commission:8.39, vat:1.02, total_cost:5402.59 },
    { no:25  , status:"Buy", ticker:"LUBEREF", qty:3, price:86.0, total:258.0, commission:0.4, vat:0.05, total_cost:257.55 },
    { no:26  , status:"Sell", ticker:"AL MAATHER REIT", qty:69, price:9.02, total:622.38, commission:0.96, vat:0.12, total_cost:621.3 },
    { no:27  , status:"Buy", ticker:"LUBEREF", qty:50, price:86.25, total:4312.5, commission:6.68, vat:0.81, total_cost:4305.0 },
    { no:28  , status:"Buy", ticker:"SABIC AGRI-NUTRIENTS", qty:20, price:116.3, total:2326.0, commission:3.61, vat:0.44, total_cost:2321.96 },
    { no:29  , status:"Sell", ticker:"AL MAATHER REIT", qty:75, price:9.02, total:676.5, commission:1.05, vat:0.13, total_cost:675.32 },
    { no:30  , status:"Sell", ticker:"ALINMA HOSPITALITY REIT", qty:69, price:8.14, total:561.66, commission:0.87, vat:0.11, total_cost:560.68 },
    { no:31  , status:"Buy", ticker:"SAUDI ELECTRICITY", qty:18, price:14.12, total:254.16, commission:0.39, vat:0.05, total_cost:253.72 },
    { no:32  , status:"Buy", ticker:"ALINMA HOSPITALITY REIT", qty:25, price:8.11, total:202.75, commission:0.31, vat:0.04, total_cost:202.4 },
    { no:33  , status:"Buy", ticker:"ALINMA HOSPITALITY REIT", qty:44, price:8.1, total:356.4, commission:0.55, vat:0.07, total_cost:355.78 },
    { no:34  , status:"Buy", ticker:"Qassim Cement", qty:99, price:41.66, total:4124.34, commission:6.39, vat:0.78, total_cost:4117.17 },
    { no:35  , status:"Buy", ticker:"ALKHABEER REIT", qty:47, price:5.65, total:265.55, commission:0.41, vat:0.05, total_cost:265.09 },
    { no:36  , status:"Buy", ticker:"STC", qty:22, price:42.84, total:942.48, commission:1.46, vat:0.18, total_cost:940.84 },
    { no:37  , status:"Buy", ticker:"ALKHABEER REIT", qty:7, price:5.65, total:39.55, commission:0.06, vat:0.01, total_cost:39.48 },
    { no:38  , status:"Buy", ticker:"SAUDI CEMENT", qty:100, price:36.94, total:3694.0, commission:5.73, vat:0.69, total_cost:3687.58 },
    { no:39  , status:"Buy", ticker:"SAUDI ARAMCO", qty:100, price:24.93, total:2493.0, commission:3.86, vat:0.47, total_cost:2488.67 },
    { no:40  , status:"Buy", ticker:"ALKHABEER REIT", qty:94, price:5.65, total:531.1, commission:0.82, vat:0.1, total_cost:530.18 },
    { no:41  , status:"Buy", ticker:"UNITS TALEEM REIT", qty:1, price:10.07, total:10.07, commission:0.02, vat:0.0, total_cost:10.05 },
    { no:42  , status:"Buy", ticker:"ALKHABEER REIT", qty:262, price:5.65, total:1480.3, commission:2.29, vat:0.28, total_cost:1477.73 },
    { no:43  , status:"Buy", ticker:"UNITS TALEEM REIT", qty:177, price:10.1, total:1787.7, commission:2.77, vat:0.34, total_cost:1784.59 },
    { no:44  , status:"Buy", ticker:"UNITS TALEEM REIT", qty:22, price:10.09, total:221.98, commission:0.34, vat:0.04, total_cost:221.59 },
    { no:45  , status:"Buy", ticker:"SEDCO CAPITAL REIT", qty:510, price:6.79, total:3462.9, commission:5.37, vat:0.65, total_cost:3456.88 },
    { no:46  , status:"Buy", ticker:"ALKHABEER REIT", qty:32, price:5.65, total:180.8, commission:0.28, vat:0.03, total_cost:180.49 },
    { no:47  , status:"Buy", ticker:"ALKHABEER REIT", qty:13, price:5.65, total:73.45, commission:0.11, vat:0.01, total_cost:73.32 },
    { no:48  , status:"Buy", ticker:"ALKHABEER REIT", qty:63, price:5.65, total:355.95, commission:0.55, vat:0.07, total_cost:355.33 },
    { no:49  , status:"Buy", ticker:"ALKHABEER REIT", qty:34, price:5.65, total:192.1, commission:0.3, vat:0.04, total_cost:191.77 },
    { no:50  , status:"Buy", ticker:"SEDCO CAPITAL REIT", qty:380, price:6.78, total:2576.4, commission:3.99, vat:0.48, total_cost:2571.92 },
    { no:51  , status:"Buy", ticker:"ALKHABEER REIT", qty:50, price:5.63, total:281.5, commission:0.44, vat:0.05, total_cost:281.01 },
    { no:52  , status:"Buy", ticker:"MOUWASAT", qty:162, price:72.95, total:11817.9, commission:18.32, vat:2.22, total_cost:11797.36 },
    { no:53  , status:"Buy", ticker:"MOUWASAT", qty:111, price:72.95, total:8097.45, commission:12.55, vat:1.52, total_cost:8083.38 },
    { no:54  , status:"Buy", ticker:"UNITS TALEEM REIT", qty:11, price:10.04, total:110.44, commission:0.17, vat:0.02, total_cost:110.25 },
    { no:55  , status:"Buy", ticker:"AL MAATHER REIT", qty:27, price:8.99, total:242.73, commission:0.38, vat:0.05, total_cost:242.31 },
    { no:56  , status:"Buy", ticker:"ALKHABEER REIT", qty:307, price:5.75, total:1765.25, commission:2.74, vat:0.33, total_cost:1762.18 },
    { no:57  , status:"Buy", ticker:"AL MAATHER REIT", qty:200, price:8.98, total:1796.0, commission:2.78, vat:0.34, total_cost:1792.88 },
    { no:58  , status:"Buy", ticker:"AL MAATHER REIT", qty:1, price:8.99, total:8.99, commission:0.01, vat:0.0, total_cost:8.97 },
    { no:59  , status:"Buy", ticker:"AL MAATHER REIT", qty:199, price:8.98, total:1787.02, commission:2.77, vat:0.34, total_cost:1783.91 },
    { no:60  , status:"Buy", ticker:"ALKHABEER REIT", qty:593, price:5.75, total:3409.75, commission:5.29, vat:0.64, total_cost:3403.82 },
    { no:61  , status:"Buy", ticker:"AL MAATHER REIT", qty:9, price:8.98, total:80.82, commission:0.13, vat:0.02, total_cost:80.68 },
    { no:62  , status:"Sell", ticker:"SABIC AGRI-NUTRIENTS", qty:75, price:120.8, total:9060.0, commission:14.04, vat:1.7, total_cost:9044.25 },
    { no:63  , status:"Buy", ticker:"AL MAATHER REIT", qty:2, price:9.05, total:18.1, commission:0.03, vat:0.0, total_cost:18.07 },
    { no:64  , status:"Sell", ticker:"ALKHABEER REIT", qty:90, price:5.79, total:521.1, commission:0.81, vat:0.1, total_cost:520.19 },
    { no:65  , status:"Sell", ticker:"ALKHABEER REIT", qty:660, price:5.79, total:3821.4, commission:5.92, vat:0.72, total_cost:3814.76 },
    { no:66  , status:"Buy", ticker:"SAUDI ARAMCO", qty:345, price:24.59, total:8483.55, commission:13.15, vat:1.59, total_cost:8468.81 },
    { no:67  , status:"Buy", ticker:"MOUWASAT", qty:87, price:73.8, total:6420.6, commission:9.95, vat:1.21, total_cost:6409.44 },
    { no:68  , status:"Buy", ticker:"MOUWASAT", qty:11, price:73.45, total:807.95, commission:1.25, vat:0.15, total_cost:806.55 },
    { no:69  , status:"Sell", ticker:"Yamamah Cement", qty:190, price:31.3, total:5947.0, commission:9.22, vat:1.12, total_cost:5936.66 },
    { no:70  , status:"Buy", ticker:"MOUWASAT", qty:41, price:73.45, total:3011.45, commission:4.67, vat:0.57, total_cost:3006.22 },
    { no:71  , status:"Buy", ticker:"SEDCO CAPITAL REIT", qty:758, price:6.98, total:5290.84, commission:8.2, vat:0.99, total_cost:5281.64 },
    { no:72  , status:"Sell", ticker:"DERAYAH REIT", qty:66, price:5.59, total:368.94, commission:0.57, vat:0.07, total_cost:368.3 },
    { no:73  , status:"Sell", ticker:"DERAYAH REIT", qty:592, price:5.59, total:3309.28, commission:5.13, vat:0.62, total_cost:3303.53 },
    { no:74  , status:"Sell", ticker:"DERAYAH REIT", qty:292, price:5.59, total:1632.28, commission:2.53, vat:0.31, total_cost:1629.44 },
    { no:75  , status:"Buy", ticker:"ALKHABEER REIT", qty:38, price:5.69, total:216.22, commission:0.34, vat:0.04, total_cost:215.84 },
    { no:76  , status:"Buy", ticker:"STC", qty:32, price:42.78, total:1368.96, commission:2.12, vat:0.26, total_cost:1366.58 },
    { no:77  , status:"Buy", ticker:"SAUDI ARAMCO", qty:60, price:24.91, total:1494.6, commission:2.32, vat:0.28, total_cost:1492.0 },
    { no:78  , status:"Buy", ticker:"JARIR", qty:40, price:13.18, total:527.2, commission:0.82, vat:0.1, total_cost:526.28 },
    { no:79  , status:"Buy", ticker:"STC", qty:3, price:42.78, total:128.34, commission:0.2, vat:0.02, total_cost:128.12 },
    { no:80  , status:"Buy", ticker:"AL MAATHER REIT", qty:186, price:9.04, total:1681.44, commission:2.61, vat:0.32, total_cost:1678.52 },
    { no:81  , status:"Sell", ticker:"Al RAJHI REIT", qty:172, price:8.29, total:1425.88, commission:2.21, vat:0.27, total_cost:1423.4 },
    { no:82  , status:"Buy", ticker:"AL MAATHER REIT", qty:79, price:9.04, total:714.16, commission:1.11, vat:0.13, total_cost:712.92 },
    { no:83  , status:"Sell", ticker:"Al RAJHI REIT", qty:123, price:8.29, total:1019.67, commission:1.58, vat:0.19, total_cost:1017.9 },
    { no:84  , status:"Buy", ticker:"MOUWASAT", qty:8, price:72.7, total:581.6, commission:0.9, vat:0.11, total_cost:580.59 },
    { no:85  , status:"Buy", ticker:"ALKHABEER REIT", qty:6, price:5.69, total:34.14, commission:0.05, vat:0.01, total_cost:34.08 },
    { no:86  , status:"Buy", ticker:"MOUWASAT", qty:5, price:72.7, total:363.5, commission:0.56, vat:0.07, total_cost:362.87 },
    { no:87  , status:"Buy", ticker:"Yamamah Cement", qty:120, price:29.64, total:3556.8, commission:5.51, vat:0.67, total_cost:3550.62 },
    { no:88  , status:"Buy", ticker:"MOUWASAT", qty:20, price:72.7, total:1454.0, commission:2.25, vat:0.27, total_cost:1451.47 },
    { no:89  , status:"Buy", ticker:"AL MAATHER REIT", qty:4, price:9.04, total:36.16, commission:0.06, vat:0.01, total_cost:36.1 },
    { no:90  , status:"Buy", ticker:"AL MAATHER REIT", qty:28, price:9.04, total:253.12, commission:0.39, vat:0.05, total_cost:252.68 },
    { no:91  , status:"Buy", ticker:"AL MAATHER REIT", qty:9, price:9.04, total:81.36, commission:0.13, vat:0.02, total_cost:81.22 },
    { no:92  , status:"Buy", ticker:"Qassim Cement", qty:16, price:41.24, total:659.84, commission:1.02, vat:0.12, total_cost:658.69 },
    { no:93  , status:"Buy", ticker:"MODERN MILLS", qty:81, price:31.06, total:2515.86, commission:3.9, vat:0.47, total_cost:2511.49 },
    { no:94  , status:"Buy", ticker:"MODERN MILLS", qty:10, price:31.12, total:311.2, commission:0.48, vat:0.06, total_cost:310.66 },
    { no:95  , status:"Buy", ticker:"Sipchem", qty:260, price:19.18, total:4986.8, commission:7.73, vat:0.94, total_cost:4978.13 },
    { no:96  , status:"Buy", ticker:"MODERN MILLS", qty:19, price:31.06, total:590.14, commission:0.91, vat:0.11, total_cost:589.11 },
    { no:97  , status:"Buy", ticker:"MODERN MILLS", qty:50, price:31.06, total:1553.0, commission:2.41, vat:0.29, total_cost:1550.3 },
    { no:98  , status:"Buy", ticker:"JADWA REIT SAUDI", qty:100, price:10.21, total:1021.0, commission:1.58, vat:0.19, total_cost:1019.23 },
    { no:99  , status:"Buy", ticker:"JADWA REIT SAUDI", qty:100, price:10.2, total:1020.0, commission:1.58, vat:0.19, total_cost:1018.23 },
    { no:100 , status:"Buy", ticker:"UNITS TALEEM REIT", qty:1, price:9.89, total:9.89, commission:0.02, vat:0.0, total_cost:9.87 },
    { no:101 , status:"Buy", ticker:"Yanbu Cement", qty:50, price:16.08, total:804.0, commission:1.25, vat:0.15, total_cost:802.6 },
    { no:102 , status:"Buy", ticker:"Yanbu Cement", qty:100, price:16.09, total:1609.0, commission:2.49, vat:0.3, total_cost:1606.2 },
    { no:103 , status:"Buy", ticker:"Yanbu Cement", qty:138, price:16.04, total:2213.52, commission:3.43, vat:0.42, total_cost:2209.67 },
    { no:104 , status:"Buy", ticker:"UNITS TALEEM REIT", qty:78, price:9.89, total:771.42, commission:1.2, vat:0.15, total_cost:770.08 },
    { no:105 , status:"Buy", ticker:"UNITS TALEEM REIT", qty:3, price:9.89, total:29.67, commission:0.05, vat:0.01, total_cost:29.62 },
    { no:106 , status:"Buy", ticker:"JADWA REIT SAUDI", qty:30, price:10.2, total:306.0, commission:0.47, vat:0.06, total_cost:305.47 },
    { no:107 , status:"Buy", ticker:"JADWA REIT SAUDI", qty:200, price:10.21, total:2042.0, commission:3.17, vat:0.38, total_cost:2038.45 },
    { no:108 , status:"Buy", ticker:"UNITS TALEEM REIT", qty:18, price:9.89, total:178.02, commission:0.28, vat:0.03, total_cost:177.71 },
    { no:109 , status:"Buy", ticker:"JADWA REIT SAUDI", qty:2, price:10.2, total:20.4, commission:0.03, vat:0.0, total_cost:20.36 },
    { no:110 , status:"Buy", ticker:"ALINMA BANK", qty:100, price:24.77, total:2477.0, commission:3.84, vat:0.47, total_cost:2472.69 },
    { no:111 , status:"Buy", ticker:"Yanbu Cement", qty:29, price:16.04, total:465.16, commission:0.72, vat:0.09, total_cost:464.35 },
    { no:112 , status:"Buy", ticker:"UNITS TALEEM REIT", qty:28, price:9.93, total:278.04, commission:0.43, vat:0.05, total_cost:277.56 },
    { no:113 , status:"Buy", ticker:"SAUDI ARAMCO", qty:100, price:23.51, total:2351.0, commission:3.64, vat:0.44, total_cost:2346.91 },
    { no:114 , status:"Buy", ticker:"JADWA REIT SAUDI", qty:68, price:10.2, total:693.6, commission:1.08, vat:0.13, total_cost:692.39 },
    { no:115 , status:"Buy", ticker:"Yanbu Cement", qty:4, price:16.04, total:64.16, commission:0.1, vat:0.01, total_cost:64.05 },
    { no:116 , status:"Buy", ticker:"Qassim Cement", qty:70, price:41.14, total:2879.8, commission:4.46, vat:0.54, total_cost:2874.79 },
    { no:117 , status:"Buy", ticker:"Yanbu Cement", qty:21, price:16.04, total:336.84, commission:0.52, vat:0.06, total_cost:336.25 },
    { no:118 , status:"Buy", ticker:"Yanbu Cement", qty:8, price:16.04, total:128.32, commission:0.2, vat:0.02, total_cost:128.1 },
    { no:119 , status:"Buy", ticker:"UNITS TALEEM REIT", qty:72, price:9.93, total:714.96, commission:1.11, vat:0.13, total_cost:713.72 },
    { no:120 , status:"Buy", ticker:"JADWA REIT SAUDI", qty:150, price:10.2, total:1530.0, commission:2.37, vat:0.29, total_cost:1527.34 },
    { no:121 , status:"Buy", ticker:"JADWA REIT SAUDI", qty:20, price:10.2, total:204.0, commission:0.32, vat:0.04, total_cost:203.65 },
    { no:122 , status:"Buy", ticker:"CENOMI CENTERS", qty:100, price:20.32, total:2032.0, commission:3.15, vat:0.38, total_cost:2028.47 },
    { no:123 , status:"Buy", ticker:"ALKHABEER REIT", qty:161, price:5.71, total:919.31, commission:1.42, vat:0.17, total_cost:917.71 },
    { no:124 , status:"Buy", ticker:"SAUDI CEMENT", qty:50, price:38.56, total:1928.0, commission:2.99, vat:0.36, total_cost:1924.65 },
    { no:125 , status:"Buy", ticker:"ALINMA BANK", qty:24, price:24.8, total:595.2, commission:0.92, vat:0.11, total_cost:594.17 },
    { no:126 , status:"Buy", ticker:"SAUDI ARAMCO", qty:180, price:23.5, total:4230.0, commission:6.56, vat:0.8, total_cost:4222.65 },
    { no:127 , status:"Buy", ticker:"Qassim Cement", qty:80, price:41.4, total:3312.0, commission:5.13, vat:0.62, total_cost:3306.24 },
    { no:128 , status:"Buy", ticker:"SABIC AGRI-NUTRIENTS", qty:15, price:119.4, total:1791.0, commission:2.78, vat:0.34, total_cost:1787.89 },
    { no:129 , status:"Buy", ticker:"DERAYAH REIT", qty:125, price:5.55, total:693.75, commission:1.08, vat:0.13, total_cost:692.54 },
    { no:130 , status:"Buy", ticker:"JARIR", qty:100, price:12.84, total:1284.0, commission:1.99, vat:0.24, total_cost:1281.77 },
    { no:131 , status:"Buy", ticker:"Qassim Cement", qty:100, price:41.64, total:4164.0, commission:6.45, vat:0.78, total_cost:4156.76 },
    { no:132 , status:"Buy", ticker:"STC", qty:50, price:41.86, total:2093.0, commission:3.24, vat:0.39, total_cost:2089.36 },
    { no:133 , status:"Buy", ticker:"CENOMI CENTERS", qty:100, price:20.5, total:2050.0, commission:3.18, vat:0.39, total_cost:2046.44 },
    { no:134 , status:"Buy", ticker:"SAUDI ARAMCO", qty:50, price:23.51, total:1175.5, commission:1.82, vat:0.22, total_cost:1173.46 },
    { no:135 , status:"Buy", ticker:"ALKHABEER REIT", qty:200, price:5.71, total:1142.0, commission:1.77, vat:0.21, total_cost:1140.02 },
    { no:136 , status:"Buy", ticker:"SAUDI CEMENT", qty:20, price:38.34, total:766.8, commission:1.19, vat:0.14, total_cost:765.47 },
    { no:137 , status:"Buy", ticker:"CENOMI CENTERS", qty:100, price:20.47, total:2047.0, commission:3.17, vat:0.38, total_cost:2043.44 },
    { no:138 , status:"Buy", ticker:"Al RAJHI REIT", qty:11, price:8.22, total:90.42, commission:0.14, vat:0.02, total_cost:90.26 },
    { no:139 , status:"Buy", ticker:"ALINMA BANK", qty:27, price:24.8, total:669.6, commission:1.04, vat:0.13, total_cost:668.44 },
    { no:140 , status:"Buy", ticker:"SABIC AGRI-NUTRIENTS", qty:10, price:119.9, total:1199.0, commission:1.86, vat:0.23, total_cost:1196.92 },
    { no:141 , status:"Buy", ticker:"STC", qty:50, price:41.98, total:2099.0, commission:3.25, vat:0.39, total_cost:2095.35 },
    { no:142 , status:"Buy", ticker:"SAUDI CEMENT", qty:60, price:38.34, total:2300.4, commission:3.57, vat:0.43, total_cost:2296.4 },
    { no:143 , status:"Buy", ticker:"Al RAJHI REIT", qty:4, price:8.22, total:32.88, commission:0.05, vat:0.01, total_cost:32.82 },
    { no:144 , status:"Buy", ticker:"STC", qty:100, price:41.96, total:4196.0, commission:6.5, vat:0.79, total_cost:4188.71 },
    { no:145 , status:"Buy", ticker:"JARIR", qty:100, price:12.82, total:1282.0, commission:1.99, vat:0.24, total_cost:1279.77 },
    { no:146 , status:"Buy", ticker:"SABIC AGRI-NUTRIENTS", qty:12, price:118.8, total:1425.6, commission:2.21, vat:0.27, total_cost:1423.12 },
    { no:147 , status:"Buy", ticker:"STC", qty:80, price:41.82, total:3345.6, commission:5.19, vat:0.63, total_cost:3339.79 },
    { no:148 , status:"Buy", ticker:"Al RAJHI REIT", qty:30, price:8.23, total:246.9, commission:0.38, vat:0.05, total_cost:246.47 },
    { no:149 , status:"Buy", ticker:"STC", qty:10, price:42.0, total:420.0, commission:0.65, vat:0.08, total_cost:419.27 },
    { no:150 , status:"Buy", ticker:"SAUDI CEMENT", qty:50, price:38.34, total:1917.0, commission:2.97, vat:0.36, total_cost:1913.67 },
    { no:151 , status:"Buy", ticker:"ALINMA BANK", qty:50, price:24.75, total:1237.5, commission:1.92, vat:0.23, total_cost:1235.35 },
    { no:152 , status:"Buy", ticker:"ALINMA BANK", qty:49, price:24.8, total:1215.2, commission:1.88, vat:0.23, total_cost:1213.09 },
    { no:153 , status:"Buy", ticker:"SABIC AGRI-NUTRIENTS", qty:20, price:118.9, total:2378.0, commission:3.69, vat:0.45, total_cost:2373.87 },
    { no:154 , status:"Buy", ticker:"ALKHABEER REIT", qty:150, price:5.71, total:856.5, commission:1.33, vat:0.16, total_cost:855.01 },
    { no:155 , status:"Buy", ticker:"ALKHABEER REIT", qty:36, price:5.71, total:205.56, commission:0.32, vat:0.04, total_cost:205.2 },
    { no:156 , status:"Buy", ticker:"Al RAJHI REIT", qty:38, price:8.22, total:312.36, commission:0.48, vat:0.06, total_cost:311.82 },
    { no:157 , status:"Buy", ticker:"JARIR", qty:25, price:12.84, total:321.0, commission:0.5, vat:0.06, total_cost:320.44 },
    { no:158 , status:"Buy", ticker:"Al RAJHI REIT", qty:47, price:8.22, total:386.34, commission:0.6, vat:0.07, total_cost:385.67 },
    { no:159 , status:"Buy", ticker:"SAUDI ARAMCO", qty:150, price:23.64, total:3546.0, commission:5.5, vat:0.67, total_cost:3539.84 },
    { no:160 , status:"Buy", ticker:"ALKHABEER REIT", qty:303, price:5.71, total:1730.13, commission:2.68, vat:0.33, total_cost:1727.12 },
    { no:161 , status:"Buy", ticker:"SAUDI CEMENT", qty:37, price:39.0, total:1443.0, commission:2.24, vat:0.27, total_cost:1440.49 },
    { no:162 , status:"Sell", ticker:"FAKEEH CARE", qty:35, price:41.5, total:1452.5, commission:2.25, vat:0.27, total_cost:1449.98 },
    { no:163 , status:"Buy", ticker:"SAUDI ARAMCO", qty:1, price:23.88, total:23.88, commission:0.04, vat:0.0, total_cost:23.84 },
    { no:164 , status:"Buy", ticker:"JARIR", qty:30, price:12.59, total:377.7, commission:0.59, vat:0.07, total_cost:377.04 },
    { no:165 , status:"Sell", ticker:"FITNESS TIME", qty:10, price:143.5, total:1435.0, commission:2.22, vat:0.27, total_cost:1432.51 },
    { no:166 , status:"Buy", ticker:"Al RAJHI REIT", qty:165, price:8.28, total:1366.2, commission:2.12, vat:0.26, total_cost:1363.83 },
    { no:167 , status:"Buy", ticker:"UNITS TALEEM REIT", qty:310, price:9.69, total:3003.9, commission:4.66, vat:0.56, total_cost:2998.68 },
    { no:168 , status:"Buy", ticker:"FAKEEH CARE", qty:35, price:41.0, total:1435.0, commission:2.22, vat:0.27, total_cost:1432.51 },
    { no:169 , status:"Buy", ticker:"JARIR", qty:160, price:12.95, total:2072.0, commission:3.21, vat:0.39, total_cost:2068.4 },
    { no:170 , status:"Buy", ticker:"FITNESS TIME", qty:1, price:143.3, total:143.3, commission:0.22, vat:0.03, total_cost:143.05 },
    { no:171 , status:"Buy", ticker:"SAUDI ARAMCO", qty:100, price:24.21, total:2421.0, commission:3.75, vat:0.46, total_cost:2416.79 },
    { no:172 , status:"Buy", ticker:"STC", qty:43, price:42.2, total:1814.6, commission:2.81, vat:0.34, total_cost:1811.45 },
    { no:173 , status:"Buy", ticker:"JADWA REIT SAUDI", qty:14, price:10.34, total:144.76, commission:0.22, vat:0.03, total_cost:144.51 },
    { no:174 , status:"Buy", ticker:"ALKHABEER REIT", qty:302, price:5.8, total:1751.6, commission:2.71, vat:0.33, total_cost:1748.56 },
    { no:175 , status:"Buy", ticker:"JADWA REIT SAUDI", qty:276, price:10.34, total:2853.84, commission:4.42, vat:0.54, total_cost:2848.88 },
    { no:176 , status:"Buy", ticker:"Yamamah Cement", qty:37, price:33.94, total:1255.78, commission:1.95, vat:0.24, total_cost:1253.6 },
    { no:177 , status:"Buy", ticker:"Yamamah Cement", qty:33, price:33.98, total:1121.34, commission:1.74, vat:0.21, total_cost:1119.39 },
    { no:178 , status:"Buy", ticker:"DERAYAH REIT", qty:825, price:5.49, total:4529.25, commission:7.02, vat:0.85, total_cost:4521.38 },
    { no:179 , status:"Buy", ticker:"FITNESS TIME", qty:9, price:143.3, total:1289.7, commission:2.0, vat:0.24, total_cost:1287.46 },
    { no:180 , status:"Buy", ticker:"ALKHABEER REIT", qty:318, price:5.8, total:1844.4, commission:2.86, vat:0.35, total_cost:1841.19 },
    { no:181 , status:"Buy", ticker:"MOUWASAT", qty:25, price:78.35, total:1958.75, commission:3.04, vat:0.37, total_cost:1955.35 },
    { no:182 , status:"Buy", ticker:"SABIC AGRI-NUTRIENTS", qty:18, price:119.0, total:2142.0, commission:3.32, vat:0.4, total_cost:2138.28 },
    { no:183 , status:"Buy", ticker:"SAUDI ARAMCO", qty:100, price:23.51, total:2351.0, commission:3.64, vat:0.44, total_cost:2346.91 },
    { no:184 , status:"Buy", ticker:"RIYAD BANK", qty:78, price:27.85, total:2172.3, commission:3.37, vat:0.41, total_cost:2168.52 },
    { no:185 , status:"Buy", ticker:"JADWA REIT SAUDI", qty:100, price:10.2, total:1020.0, commission:1.58, vat:0.19, total_cost:1018.23 },
    { no:186 , status:"Buy", ticker:"JADWA REIT SAUDI", qty:100, price:10.21, total:1021.0, commission:1.58, vat:0.19, total_cost:1019.23 },
    { no:187 , status:"Buy", ticker:"JARIR", qty:100, price:12.82, total:1282.0, commission:1.99, vat:0.24, total_cost:1279.77 },
    { no:188 , status:"Buy", ticker:"STC", qty:4, price:42.42, total:169.68, commission:0.26, vat:0.03, total_cost:169.39 },
    { no:189 , status:"Buy", ticker:"SAUDI ELECTRICITY", qty:2, price:14.3, total:28.6, commission:0.04, vat:0.01, total_cost:28.55 },
    { no:190 , status:"Buy", ticker:"SABIC AGRI-NUTRIENTS", qty:1, price:109.9, total:109.9, commission:0.17, vat:0.02, total_cost:109.71 },
    { no:191 , status:"Buy", ticker:"SADAFCO", qty:1, price:232.3, total:232.3, commission:0.36, vat:0.04, total_cost:231.9 },
  ],

  // ──────────────────────────────────────────────
  //  6. العقارات
  // ──────────────────────────────────────────────
  properties: [],

  // ──────────────────────────────────────────────
  //  7. خطط السيولة للضخ
  // ──────────────────────────────────────────────
cashPlans: [
  { date:"2026-11", amount:0,     target:"فترة تعديل", status:"مخطط", note:"أرقام تقريبية" },
  { date:"2026-12", amount:0,     target:"فترة تعديل", status:"مخطط", note:"أرقام تقريبية" },
  ...[1,2,3,4,5,6,7,8,9,10,11,12].map(m=>({ date:`2027-${String(m).padStart(2,'0')}`, amount:10621, target:"متنوع", status:"مخطط", note:"" })),
  ...[1,2,3,4,5,6,7,8].map(m=>({ date:`2028-${String(m).padStart(2,'0')}`, amount:11390, target:"متنوع", status:"مخطط", note:"" })),
  ...[9,10,11,12].map(m=>({ date:`2028-${String(m).padStart(2,'0')}`, amount:12390, target:"متنوع", status:"مخطط", note:"" })),
  ...[1,2,3,4,5,6,7,8,9,10,11,12].map(m=>({ date:`2029-${String(m).padStart(2,'0')}`, amount:13189, target:"متنوع", status:"مخطط", note:"" })),
  ...[2030,2031,2032,2033,2034,2035].flatMap(y=>[1,2,3,4,5,6,7,8,9,10,11,12].map(m=>({ date:`${y}-${String(m).padStart(2,'0')}`, amount:8000, target:"متنوع", status:"مخطط", note:"" }))),
  ...[1,2,3,4,5,6,7,8,9,10,11,12].map(m=>({ date:`2036-${String(m).padStart(2,'0')}`, amount:19757, target:"متنوع", status:"مخطط", note:"" })),
  ...[1,2,3,4,5,6,7,8,9,10,11,12].map(m=>({ date:`2037-${String(m).padStart(2,'0')}`, amount:20852, target:"متنوع", status:"مخطط", note:"" })),
  ...[1,2,3,4,5,6,7,8,9,10,11,12].map(m=>({ date:`2038-${String(m).padStart(2,'0')}`, amount:21990, target:"متنوع", status:"مخطط", note:"" })),
  ...[1,2,3,4,5,6,7,8,9,10,11,12].map(m=>({ date:`2039-${String(m).padStart(2,'0')}`, amount:23173, target:"متنوع", status:"مخطط", note:"" })),
  ...[1,2,3,4,5,6,7,8,9,10,11,12].map(m=>({ date:`2040-${String(m).padStart(2,'0')}`, amount:24404, target:"متنوع", status:"مخطط", note:"" })),
  ...[2041,2042,2043,2044,2045,2046,2047,2048,2049,2050,2051,2052,2053].flatMap(y=>[1,2,3,4,5,6,7,8,9,10,11,12].map(m=>({ date:`${y}-${String(m).padStart(2,'0')}`, amount:25076, target:"متنوع", status:"مخطط", note:"" }))),
],

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

// ═══════════════════════════════════════════════════════════
//  Data processing functions
// ═══════════════════════════════════════════════════════════
function normalizeTransactions(transactions) {
  const allTickers = [...TICKERS, ...Store.load('custom_tickers', [])];
  
  return transactions.map(t => {
    const normalized = { ...t };
    
    // تخزين الكود الإنجليزي فقط - لا نغيره أبداً
    // الاسم العربي يتم جلبه من tickers.js عند العرض فقط
    if (!normalized.ticker && normalized.name) {
      // إذا كان هناك اسم عربي فقط، حاول العثور على الكود
      const found = allTickers.find(ticker => 
        ticker.name === normalized.name || 
        ticker.name.includes(normalized.name) ||
        normalized.name.includes(ticker.name)
      );
      if (found) {
        normalized.ticker = found.code;
      }
    }
    
    // لا نضيف name أبداً - سيتم جلبه من tickers.js عند العرض
    delete normalized.name;
    
    return normalized;
  });
}

function normalizeDividends(dividends) {
  const allTickers = [...TICKERS, ...Store.load('custom_tickers', [])];
  const tickerMap = {};
  allTickers.forEach(t => {
    tickerMap[t.code] = t.name;
  });
  
  return dividends.map(d => {
    const normalized = { ...d };
    
    // إضافة ticker إذا لم يكن موجوداً
    if (!normalized.ticker && normalized.stock) {
      const found = allTickers.find(t => t.name === normalized.stock);
      if (found) {
        normalized.ticker = found.code;
      }
    }
    
    return normalized;
  });
}

// ═══════════════════════════════════════════════════════════
//  Export globals for all pages
// ═════════════════════════════════════════════════════════
window.APP = APP;
window.H = H;
window.Store = Store;
window.requireAuth = requireAuth;
window.doLogout = doLogout;
window.normalizeTransactions = normalizeTransactions;
window.normalizeDividends = normalizeDividends;

// ═══════════════════════════════════════════════════════════
//  Common utility functions
// ═════════════════════════════════════════════════════════
window.exportCSV = function(data, filename) {
  if (!data || data.length === 0) {
    toast('لا توجد بيانات للتصدير', 'warn');
    return;
  }
  
  const headers = Object.keys(data[0]);
  const csvContent = '\uFEFF' + [
    headers.join(','),
    ...data.map(row => headers.map(h => row[h] ?? '').join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename || `export_${H.today()}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
  toast('✅ تم تصدير الملف', 'success');
};

window.dl = function(content, filename, type) {
  const blob = new Blob([content], { type: type || 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
};
