// ═══════════════════════════════════════════════════════════════════
//  data-sync.js — نظام المزامنة بين الصفحات
//  يعتمد على storage events + CustomEvents
// ═══════════════════════════════════════════════════════════════════

const dataSync = (() => {
  const _listeners = {};  // { dataKey: [callback, ...] }

  // ── الاستماع لتغييرات localStorage من نافذة أخرى ──
  window.addEventListener('storage', (e) => {
    if (!e.key) return;
    const key = _storageKeyToDataKey(e.key);
    if (!key) return;
    _notify(key, e.newValue);
  });

  // ── الاستماع للأحداث المخصصة (نفس النافذة) ──
  window.addEventListener('2043:dataChanged', (e) => {
    const source = e.detail?.source;
    if (!source) return;
    _notifyFromStore(source);
  });

  function _storageKeyToDataKey(storageKey) {
    const map = {
      'portfolio_v1':        'portfolio',
      'transactions_v1':     'transactions',
      'dividends_v1':        'dividends',
      'properties_v1':       'properties',
      'gold_v1':             'gold',
      'cash_v1':             'cash',
      'savings_v1':          'savings',
      'networth_snapshots':  'networth',
      'settings_v1':         'settings',
      'custom_tickers':      'tickers'
    };
    return map[storageKey] || null;
  }

  function _notify(dataKey, rawValue) {
    const callbacks = _listeners[dataKey] || [];
    if (!callbacks.length) return;

    let data = null;
    try {
      const decoded = _tryDecode(rawValue);
      data = decoded;
    } catch(e) {
      data = null;
    }

    callbacks.forEach(cb => {
      try { cb(data, Date.now()); } catch(e) {}
    });
  }

  function _notifyFromStore(dataKey) {
    const storeKeyMap = {
      'portfolio':    'portfolio_v1',
      'transactions': 'transactions_v1',
      'dividends':    'dividends_v1',
      'properties':   'properties_v1',
      'gold':         'gold_v1',
      'cash':         'cash_v1',
      'savings':      'savings_v1',
      'settings':     'settings_v1',
      'tickers':      'custom_tickers'
    };
    const storeKey = storeKeyMap[dataKey];
    if (!storeKey) return;

    const raw = localStorage.getItem(storeKey);
    _notify(dataKey, raw);
  }

  function _tryDecode(raw) {
    if (!raw) return null;
    try {
      const bytes = CryptoJS.AES.decrypt(raw, '2043_secure_key_v2');
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch(e) {
      try { return JSON.parse(raw); } catch(e2) { return null; }
    }
  }

  return {
    // تسجيل مستمع لمفتاح بيانات معين
    onDataChanged(dataKey, callback) {
      if (!_listeners[dataKey]) _listeners[dataKey] = [];
      _listeners[dataKey].push(callback);
    },

    // إزالة مستمع
    offDataChanged(dataKey, callback) {
      if (!_listeners[dataKey]) return;
      _listeners[dataKey] = _listeners[dataKey].filter(cb => cb !== callback);
    },

    // إشعار يدوي
    emit(dataKey) {
      _notifyFromStore(dataKey);
    }
  };
})();
