// ═══════════════════════════════════════════════════════════════════
//  data.js — المحور المركزي الموحّد لجميع صفحات 2043
//  يجب تحميله بعد tickers.js وقبل auth.js في كل صفحة
// ═══════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────
//  STORE — التخزين المحلي المشفّر
// ─────────────────────────────────────────────
const Store = (() => {
  const SECRET = '2043_secure_key_v2';

  function _enc(data) {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET).toString();
    } catch(e) {
      return JSON.stringify(data);
    }
  }

  function _dec(raw) {
    try {
      const bytes = CryptoJS.AES.decrypt(raw, SECRET);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch(e) {
      try { return JSON.parse(raw); } catch(e2) { return null; }
    }
  }

  return {
    save(key, data) {
      try {
        localStorage.setItem(key, _enc(data));
        localStorage.setItem(key + '_ts', Date.now().toString());
      } catch(e) {
        console.warn('Store.save error:', e);
      }
    },
    load(key, fallback = null) {
      try {
        const raw = localStorage.getItem(key);
        if (!raw) return fallback;
        const decoded = _dec(raw);
        return decoded !== null ? decoded : fallback;
      } catch(e) {
        return fallback;
      }
    },
    remove(key) {
      localStorage.removeItem(key);
      localStorage.removeItem(key + '_ts');
    },
    timestamp(key) {
      return parseInt(localStorage.getItem(key + '_ts') || '0');
    },
    clear() {
      const keysToKeep = [];
      const allKeys = Object.keys(localStorage);
      allKeys.forEach(k => {
        if (!k.startsWith('2043_') && !['portfolio_v1','transactions_v1',
            'dividends_v1','properties_v1','gold_v1','cash_v1',
            'savings_v1','networth_snapshots','settings_v1',
            'custom_tickers'].includes(k)) return;
        keysToKeep.push(k);
      });
      keysToKeep.forEach(k => localStorage.removeItem(k));
    }
  };
})();

// ─────────────────────────────────────────────
//  TICKER UTILITIES — نظام موحّد للأسهم
//  يُستخدم في كل الصفحات — لا تُعرَّف محلياً
// ─────────────────────────────────────────────
const TickerDB = (() => {
  // بناء Map من tickers.js (محمّل قبل data.js)
  // في حال تكرار الكود، نحتفظ بأول إدخال فقط
  const _map = new Map();

  function _build() {
    if (typeof TICKERS === 'undefined') return;
    TICKERS.forEach(t => {
      const code = String(t.code).trim().toUpperCase();
      if (!_map.has(code)) {
        _map.set(code, {
          code,
          name:     t.name     || code,
          sector:   t.sector   || 'غير محدد',
          coverage: t.coverage || 'محلي'
        });
      }
    });
    // دمج التيكرات المخصصة من الإعدادات
    const custom = Store.load('custom_tickers', []);
    custom.forEach(t => {
      const code = String(t.code).trim().toUpperCase();
      _map.set(code, {
        code,
        name:     t.name     || code,
        sector:   t.sector   || 'غير محدد',
        coverage: t.coverage || 'محلي'
      });
    });
  }

  _build();

  return {
    // إعادة بناء بعد إضافة تيكرات مخصصة
    rebuild() { _map.clear(); _build(); },

    lookup(code) {
      if (!code) return null;
      return _map.get(String(code).trim().toUpperCase()) || null;
    },

    name(code) {
      const t = this.lookup(code);
      return t ? t.name : String(code).trim().toUpperCase();
    },

    sector(code) {
      const t = this.lookup(code);
      return t ? t.sector : 'غير محدد';
    },

    coverage(code) {
      const t = this.lookup(code);
      return t ? t.coverage : 'محلي';
    },

    exists(code) {
      return this.lookup(code) !== null;
    },

    all() {
      return Array.from(_map.values());
    },

    search(query) {
      const q = query.trim().toLowerCase();
      if (!q) return this.all();
      return this.all().filter(t =>
        t.code.toLowerCase().includes(q) ||
        t.name.toLowerCase().includes(q) ||
        t.sector.toLowerCase().includes(q)
      );
    }
  };
})();

// ─────────────────────────────────────────────
//  H — أدوات مساعدة موحّدة
// ─────────────────────────────────────────────
const H = {
  // تنسيق الأرقام
  fmt(n, decimals = 2) {
    const num = parseFloat(n) || 0;
    return num.toLocaleString('ar-SA', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  },

  // نسبة مئوية بإشارة
  pct(n, decimals = 2) {
    const num = parseFloat(n) || 0;
    const sign = num >= 0 ? '+' : '';
    return `${sign}${num.toFixed(decimals)}%`;
  },

  // اليوم بصيغة YYYY-MM-DD
  today() {
    return new Date().toISOString().split('T')[0];
  },

  // ── Ticker Shortcuts (تُوجَّه لـ TickerDB دائماً) ──
  tickerName(code)     { return TickerDB.name(code); },
  tickerSector(code)   { return TickerDB.sector(code); },
  tickerCoverage(code) { return TickerDB.coverage(code); },
  tickerExists(code)   { return TickerDB.exists(code); },

  // ── حساب العمولات (تداول — السوق السعودي) ──
  calcCommission(total) {
    const settings = Store.load('settings_v1', {});
    const rate = (settings.commissionRate !== undefined)
      ? parseFloat(settings.commissionRate) / 100
      : 0.0015;  // 0.15% افتراضي
    const vatRate = (settings.vatRate !== undefined)
      ? parseFloat(settings.vatRate) / 100
      : 0.15;    // 15% VAT افتراضي
    const commission = total * rate;
    const vat        = commission * vatRate;
    const net        = total + commission + vat;
    return {
      commission: parseFloat(commission.toFixed(4)),
      vat:        parseFloat(vat.toFixed(4)),
      net:        parseFloat(net.toFixed(4))
    };
  },

  // ── لون حسب القيمة ──
  colorClass(n) {
    const num = parseFloat(n) || 0;
    if (num > 0)  return 'pos';
    if (num < 0)  return 'neg';
    return 'text3';
  },

  colorStyle(n) {
    const num = parseFloat(n) || 0;
    if (num > 0)  return 'color:var(--green)';
    if (num < 0)  return 'color:var(--red)';
    return 'color:var(--text3)';
  },

  // ── normalize helpers — لمعالجة البيانات القديمة ──
  normalizeTransaction(t) {
    if (!t) return null;
    return {
      no:          t.no         || 0,
      status:      t.status     || 'Buy',
      ticker:      (t.ticker    || t.stock  || '').toString().trim().toUpperCase(),
      qty:         parseFloat(t.qty)    || 0,
      price:       parseFloat(t.price)  || 0,
      total:       parseFloat(t.total)  || parseFloat(t.qty) * parseFloat(t.price) || 0,
      commission:  parseFloat(t.commission) || 0,
      vat:         parseFloat(t.vat)    || 0,
      total_cost:  parseFloat(t.total_cost) || parseFloat(t.total) || 0,
      date:        t.date || H.today()
    };
  },

  normalizeTransactions(arr) {
    if (!Array.isArray(arr)) return [];
    return arr.map((t, i) => {
      const n = H.normalizeTransaction(t);
      if (n) n.no = i + 1;
      return n;
    }).filter(Boolean);
  },

  normalizeDividend(d) {
    if (!d) return null;
    // دعم البيانات القديمة: stock → ticker
    const ticker = (d.ticker || d.stock || '').toString().trim().toUpperCase();
    return {
      no:     d.no     || 0,
      date:   d.date   || H.today(),
      ticker: ticker,
      stock:  TickerDB.name(ticker),  // دائماً من TickerDB
      amount: parseFloat(d.amount)  || 0,
      note:   d.note   || ''
    };
  },

  normalizeDividends(arr) {
    if (!Array.isArray(arr)) return [];
    return arr.map((d, i) => {
      const n = H.normalizeDividend(d);
      if (n) n.no = i + 1;
      return n;
    }).filter(Boolean);
  },

  normalizePortfolioItem(p) {
    if (!p) return null;
    const ticker = (p.ticker || p.stock || '').toString().trim().toUpperCase();
    return {
      ticker:        ticker,
      qty:           parseFloat(p.qty)           || 0,
      avg_cost:      parseFloat(p.avg_cost)       || 0,
      current_price: parseFloat(p.current_price) || parseFloat(p.avg_cost) || 0,
      sector:        p.sector    || TickerDB.sector(ticker),
      coverage:      p.coverage  || TickerDB.coverage(ticker)
    };
  },

  normalizePortfolio(arr) {
    if (!Array.isArray(arr)) return [];
    return arr.map(p => H.normalizePortfolioItem(p)).filter(Boolean);
  }
};

// ─────────────────────────────────────────────
//  APP — البيانات الافتراضية (seed)
//  تُستخدم فقط عند أول تشغيل قبل أي إدخال
// ─────────────────────────────────────────────
const APP = {
  get portfolio() {
    return H.normalizePortfolio(Store.load('portfolio_v1', _DEFAULT_PORTFOLIO));
  },
  get transactions() {
    return H.normalizeTransactions(Store.load('transactions_v1', _DEFAULT_TRANSACTIONS));
  },
  get dividends() {
    return H.normalizeDividends(Store.load('dividends_v1', _DEFAULT_DIVIDENDS));
  },
  get properties() {
    return Store.load('properties_v1', _DEFAULT_PROPERTIES);
  },
  get gold() {
    return Store.load('gold_v1', _DEFAULT_GOLD);
  },
  get cash() {
    return Store.load('cash_v1', _DEFAULT_CASH);
  },
  get savings() {
    return Store.load('savings_v1', _DEFAULT_SAVINGS);
  },
  get settings() {
    return Store.load('settings_v1', _DEFAULT_SETTINGS);
  }
};

// ─────────────────────────────────────────────
//  البيانات الافتراضية
// ─────────────────────────────────────────────
const _DEFAULT_PORTFOLIO = [
  { ticker:'2222', qty:100, avg_cost:27.50, current_price:28.10 },
  { ticker:'4190', qty:50,  avg_cost:95.00, current_price:98.20 },
  { ticker:'1120', qty:75,  avg_cost:82.00, current_price:88.50 },
  { ticker:'2010', qty:30,  avg_cost:70.00, current_price:72.00 },
  { ticker:'7010', qty:60,  avg_cost:42.00, current_price:45.60 }
];

const _DEFAULT_TRANSACTIONS = [
  { no:1, status:'Buy', ticker:'2222', qty:100, price:27.50, total:2750, commission:4.125,  vat:0.6188, total_cost:2754.7438, date:'2024-01-15' },
  { no:2, status:'Buy', ticker:'4190', qty:50,  price:95.00, total:4750, commission:7.125,  vat:1.0688, total_cost:4758.1938, date:'2024-02-20' },
  { no:3, status:'Buy', ticker:'1120', qty:75,  price:82.00, total:6150, commission:9.225,  vat:1.3838, total_cost:6160.6088, date:'2024-03-10' },
  { no:4, status:'Buy', ticker:'2010', qty:30,  price:70.00, total:2100, commission:3.15,   vat:0.4725, total_cost:2103.6225, date:'2024-04-05' },
  { no:5, status:'Buy', ticker:'7010', qty:60,  price:42.00, total:2520, commission:3.78,   vat:0.567,  total_cost:2524.347,  date:'2024-05-12' }
];

const _DEFAULT_DIVIDENDS = [
  { no:1, date:'2024-08-01', ticker:'4190', stock:'جرير',           amount:875.00,  note:'توزيع 2024' },
  { no:2, date:'2024-09-15', ticker:'1120', stock:'الراجحي',        amount:1012.50, note:'Q2 2024' },
  { no:3, date:'2024-11-20', ticker:'7010', stock:'اس تي سي',       amount:540.00,  note:'H1 2024' },
  { no:4, date:'2025-02-10', ticker:'2222', stock:'أرامكو السعودية', amount:630.00,  note:'Q4 2024' }
];

const _DEFAULT_PROPERTIES = [
  { id:1, name:'شقة الرياض', type:'سكني', value:650000, purchase_price:550000, purchase_date:'2020-03-15', rent_monthly:2500, area:120, location:'الرياض', notes:'' }
];

const _DEFAULT_GOLD = [
  { id:1, type:'سبيكة', weight:50, unit:'جرام', purchase_price:280, purchase_date:'2023-06-01', current_price:310, notes:'' }
];

const _DEFAULT_CASH = [
  { id:1, name:'البنك الأهلي', type:'حساب جاري',   amount:45000, currency:'SAR', notes:'' },
  { id:2, name:'الراجحي',     type:'حساب توفير',   amount:28000, currency:'SAR', notes:'' }
];

const _DEFAULT_SAVINGS = [
  { id:1, name:'صندوق الطوارئ', target:100000, current:65000, monthly_contribution:2000, start_date:'2023-01-01', notes:'' }
];

const _DEFAULT_SETTINGS = {
  commissionRate: 0.15,   // %
  vatRate:        15,     // %
  currency:       'SAR',
  theme:          'dark',
  language:       'ar'
};

// ─────────────────────────────────────────────
//  recalculatePortfolioFromTransactions
//  يُعيد بناء المحفظة من العمليات مع الحفاظ
//  على current_price الموجود
// ─────────────────────────────────────────────
function recalculatePortfolioFromTransactions() {
  const transactions = H.normalizeTransactions(
    Store.load('transactions_v1', [])
  );

  // قراءة current_price الحالية قبل الكتابة
  const currentPortfolio = H.normalizePortfolio(
    Store.load('portfolio_v1', [])
  );
  const priceMap = {};
  currentPortfolio.forEach(p => {
    priceMap[p.ticker] = p.current_price;
  });

  // حساب المراكز
  const positions = {};

  transactions.forEach(t => {
    const ticker = t.ticker;
    if (!ticker) return;

    if (!positions[ticker]) {
      positions[ticker] = {
        ticker,
        totalQty:      0,
        totalCost:     0,
        realizedPnL:   0,
        sector:        TickerDB.sector(ticker),
        coverage:      TickerDB.coverage(ticker)
      };
    }

    const pos = positions[ticker];

    if (t.status === 'Buy') {
      pos.totalCost += t.total_cost || t.total;
      pos.totalQty  += t.qty;
    } else if (t.status === 'Sell') {
      const avgBeforeSell = pos.totalQty > 0 ? pos.totalCost / pos.totalQty : 0;
      pos.totalQty  -= t.qty;
      pos.totalCost -= avgBeforeSell * t.qty;
      pos.realizedPnL += (t.total - avgBeforeSell * t.qty);
      // لا تجعل التكلفة سالبة
      if (pos.totalCost < 0) pos.totalCost = 0;
      if (pos.totalQty  < 0) pos.totalQty  = 0;
    }
  });

  // بناء المحفظة الجديدة
  const newPortfolio = Object.values(positions)
    .filter(p => p.totalQty > 0)
    .map(p => {
      const avg_cost = p.totalQty > 0 ? p.totalCost / p.totalQty : 0;
      // احتفظ بـ current_price السابق، إن لم يوجد استخدم avg_cost
      const current_price = priceMap[p.ticker] || avg_cost;
      return {
        ticker:        p.ticker,
        qty:           parseFloat(p.totalQty.toFixed(4)),
        avg_cost:      parseFloat(avg_cost.toFixed(4)),
        current_price: parseFloat(current_price.toFixed(4)),
        sector:        p.sector,
        coverage:      p.coverage
      };
    });

  Store.save('portfolio_v1', newPortfolio);
  return newPortfolio;
}

// ─────────────────────────────────────────────
//  updateTransactions — تحديث موحّد مع مزامنة
// ─────────────────────────────────────────────
function updateTransactions(updaterFn) {
  const current = H.normalizeTransactions(
    Store.load('transactions_v1', [])
  );
  const updated = updaterFn(current);
  const normalized = H.normalizeTransactions(updated);
  Store.save('transactions_v1', normalized);

  // إطلاق حدث مزامنة للصفحات الأخرى
  try {
    window.dispatchEvent(new StorageEvent('storage', {
      key:      'transactions_v1',
      newValue: localStorage.getItem('transactions_v1')
    }));
  } catch(e) {}

  return normalized;
}

// ─────────────────────────────────────────────
//  syncAfterTransactionChange — مزامنة شاملة
// ─────────────────────────────────────────────
function syncAfterTransactionChange() {
  recalculatePortfolioFromTransactions();
  try {
    window.dispatchEvent(new CustomEvent('2043:dataChanged', {
      detail: { source: 'transactions', ts: Date.now() }
    }));
  } catch(e) {}
}

// ─────────────────────────────────────────────
//  TOAST — إشعارات موحّدة
// ─────────────────────────────────────────────
function toast(msg, type = 'success', duration = 3000) {
  const existing = document.getElementById('toast_2043');
  if (existing) existing.remove();

  const colors = {
    success: 'var(--green)',
    error:   'var(--red)',
    warn:    'var(--yellow)',
    info:    'var(--accent)'
  };

  const el = document.createElement('div');
  el.id = 'toast_2043';
  el.style.cssText = `
    position:fixed; bottom:24px; left:50%; transform:translateX(-50%);
    background:var(--card); border:1px solid ${colors[type] || colors.info};
    color:var(--text); padding:12px 24px; border-radius:10px;
    font-size:14px; font-weight:600; z-index:9999;
    box-shadow:0 4px 24px rgba(0,0,0,.4);
    animation:fadeInUp .2s ease;
    pointer-events:none; text-align:center; max-width:90vw;
  `;
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), duration);
}

// ─────────────────────────────────────────────
//  NET WORTH — حساب صافي الثروة الكامل
// ─────────────────────────────────────────────
function calcNetWorth() {
  const portfolio   = APP.portfolio;
  const properties  = APP.properties;
  const gold        = APP.gold;
  const cash        = APP.cash;
  const savings     = APP.savings;

  const stocksValue = portfolio.reduce(
    (s, p) => s + p.qty * p.current_price, 0
  );
  const propertiesValue = properties.reduce(
    (s, p) => s + (parseFloat(p.value) || 0), 0
  );

  // حساب الذهب: الوزن × سعر الجرام الحالي
  const goldValue = gold.reduce((s, g) => {
    const weightInGrams = g.unit === 'كيلو' ? g.weight * 1000 : g.weight;
    return s + weightInGrams * (parseFloat(g.current_price) || 0);
  }, 0);

  const cashValue    = cash.reduce(   (s, c) => s + (parseFloat(c.amount)   || 0), 0);
  const savingsValue = savings.reduce((s, sv) => s + (parseFloat(sv.current) || 0), 0);

  const total = stocksValue + propertiesValue + goldValue + cashValue + savingsValue;

  // تكلفة المحفظة
  const stocksCost = portfolio.reduce(
    (s, p) => s + p.qty * p.avg_cost, 0
  );

  return {
    total,
    stocksValue,
    propertiesValue,
    goldValue,
    cashValue,
    savingsValue,
    stocksCost,
    stocksPnL:     stocksValue - stocksCost,
    stocksPnLPct:  stocksCost > 0 ? (stocksValue - stocksCost) / stocksCost * 100 : 0
  };
}
