// ═══════════════════════════════════════════════════════════
//  store.js — نظام التخزين المركزي
//  المصدر الوحيد لحفظ واسترجاع البيانات
// ═══════════════════════════════════════════════════════════

const Store = {
  // حفظ بيانات
  save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Store.save error:', e);
      return false;
    }
  },

  // استرجاع بيانات
  load(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return fallback;
      return JSON.parse(raw);
    } catch (e) {
      console.error('Store.load error:', e);
      return fallback;
    }
  },

  // قيمة نصية بسيطة
  get(key) {
    return localStorage.getItem(key);
  },

  // حذف
  remove(key) {
    localStorage.removeItem(key);
  },

  // مسح كل شي
  clear() {
    localStorage.clear();
  }
};

// ─── دوال مخصصة للعمليات ───

function updateTransactions(updaterFn) {
  const current = Store.load('transactions_v1', APP.transactions || []);
  const updated = typeof updaterFn === 'function' ? updaterFn(current) : updaterFn;
  Store.save('transactions_v1', updated);
  
  // مزامنة تلقائية
  if (window.dataSync) {
    dataSync.notifyDataChanged('transactions', updated);
  }
  
  return updated;
}

function updatePortfolio(updaterFn) {
  const current = Store.load('portfolio_v1', APP.portfolio || []);
  const updated = typeof updaterFn === 'function' ? updaterFn(current) : updaterFn;
  Store.save('portfolio_v1', updated);
  
  if (window.dataSync) {
    dataSync.notifyDataChanged('portfolio', updated);
  }
  
  return updated;
}

function normalizeTransactions(txs) {
  if (!Array.isArray(txs)) return [];
  
  return txs.map(t => {
    // تطبيع نظام التيكر إذا موجود
    if (window.TickerHelper && t.ticker) {
      t.ticker = window.TickerHelper.normalizeCode(t.ticker);
    }
    
    // حساب الإجمالي إذا مفقود
    if (!t.total && t.qty && t.price) {
      t.total = t.qty * t.price;
    }
    
    // حساب العمولة إذا مفقودة
    if (t.total && (!t.commission || !t.vat || !t.total_cost)) {
      const fees = window.H ? H.calcCommission(t.total) : { commission: 0, vat: 0, net: t.total };
      t.commission = t.commission || fees.commission;
      t.vat = t.vat || fees.vat;
      t.total_cost = t.total_cost || fees.net;
    }
    
    return t;
  });
}

// ─── Helper Functions ───

const H = {
  // تنسيق الأرقام
  fmt(n, decimals = 2) {
    if (n == null || isNaN(n)) return '0.00';
    return parseFloat(n).toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  },

  // التاريخ اليوم
  today() {
    return new Date().toISOString().split('T')[0];
  },

  // حساب العمولة
  calcCommission(total) {
    const commission = total * 0.00155; // 0.155%
    const vat = commission * 0.15;       // 15% VAT
    const net = total + commission + vat;
    return {
      commission: parseFloat(commission.toFixed(4)),
      vat: parseFloat(vat.toFixed(4)),
      net: parseFloat(net.toFixed(4))
    };
  },

  // اسم التيكر
  tickerName(code) {
    if (!code) return '—';
    if (window.TickerHelper) {
      return TickerHelper.getName(code) || code;
    }
    // fallback: بحت في TICKERS مباشرة
    if (window.TICKERS) {
      const found = TICKERS.find(t => t.code === code);
      return found ? found.name : code;
    }
    return code;
  }
};

// Export to window
window.Store = Store;
window.updateTransactions = updateTransactions;
window.updatePortfolio = updatePortfolio;
window.normalizeTransactions = normalizeTransactions;
window.H = H;
