// ═══════════════════════════════════════════════════════════
//  data-sync.js — نظام المزامنة المركزي (العمود الفقري)
//  هذا المحرك يربط العمليات بالمحفظة وبصافي الثروة والداشبورد
// ═══════════════════════════════════════════════════════════

class DataSync {
  constructor() {
    this.listeners = {};
    this.init();
  }

  init() {
    window.addEventListener('storage', (e) => {
      if (e.key && e.key.startsWith('sync_')) {
        const dataType = e.key.replace('sync_', '');
        this.notifyLocalListeners(dataType, JSON.parse(e.newValue));
      }
    });
  }

  onDataChanged(dataType, callback) {
    if (!this.listeners[dataType]) this.listeners[dataType] = [];
    this.listeners[dataType].push(callback);
  }

  notifyDataChanged(dataType, data) {
    const syncObj = { timestamp: Date.now(), data: data };
    localStorage.setItem(`sync_${dataType}`, JSON.stringify(syncObj));
    this.notifyLocalListeners(dataType, data);
  }

  notifyLocalListeners(dataType, data) {
    if (this.listeners[dataType]) {
      this.listeners[dataType].forEach(callback => callback(data));
    }
  }
}

const dataSync = new DataSync();

// ─── وظائف الربط التلقائي ───

// تحديث المحفظة بناءً على العمليات المخزنة
function recalculatePortfolio() {
  const txs = Store.load('transactions_v1', APP.transactions);
  const tickerMap = {};

  txs.forEach(t => {
    if (!tickerMap[t.ticker]) {
      const found = TICKERS.find(x => x.code === t.ticker) || { name: t.ticker, sector: 'غير محدد' };
      tickerMap[t.ticker] = {
        stock: found.name, ticker: t.ticker, sector: found.sector,
        qty: 0, avg_cost: 0, current_price: 0, goal_alloc: 0.05,
        buy_zone_max: 0, sell_zone_low: 0, sell_zone_high: 0,
        decision: 'مراقبة', eval: '', is_bluechip: false
      };
      // استعادة البيانات الحالية (مثل السعر) من المحفظة الموجودة
      const oldPort = Store.load('portfolio_v1', APP.portfolio);
      const exist = oldPort.find(p => p.ticker === t.ticker);
      if (exist) {
        tickerMap[t.ticker].current_price = exist.current_price;
        tickerMap[t.ticker].goal_alloc = exist.goal_alloc;
        tickerMap[t.ticker].buy_zone_max = exist.buy_zone_max;
        tickerMap[t.ticker].sell_zone_low = exist.sell_zone_low;
        tickerMap[t.ticker].decision = exist.decision;
      }
    }
    const s = tickerMap[t.ticker];
    if (t.status === 'Buy') {
      const totalCost = (s.qty * s.avg_cost) + (t.total_cost || t.total || 0);
      s.qty += t.qty;
      s.avg_cost = s.qty > 0 ? totalCost / s.qty : 0;
    } else {
      s.qty = Math.max(0, s.qty - t.qty);
    }
  });

  const newPort = Object.values(tickerMap).filter(p => p.qty > 0);
  Store.save('portfolio_v1', newPort);
  dataSync.notifyDataChanged('portfolio', newPort);
  return newPort;
}

// تحديث ملخص صافي الثروة
function updateNetWorthBackbone() {
  const port = Store.load('portfolio_v1', APP.portfolio);
  const portValue = port.reduce((s, p) => s + (p.qty * p.current_price), 0);
  const nwFull = Store.load('networth_full_v1', { properties: [], cars: [], cash: [], other: [], liabilities: [] });
  
  const propValue = nwFull.properties.reduce((s, p) => s + (p.value || 0), 0);
  const cashValue = nwFull.cash.reduce((s, c) => s + (c.amount || 0), 0);
  const otherValue = nwFull.other.reduce((s, o) => s + (o.value || 0), 0);
  const debtValue = nwFull.liabilities.reduce((s, l) => s + (l.remain || 0), 0);

  const summary = {
    portfolio: portValue,
    properties: propValue,
    cash: cashValue + otherValue,
    debts: debtValue,
    lastUpdated: new Date().toISOString().split('T')[0]
  };

  Store.save('networth_summary_v1', summary);
  dataSync.notifyDataChanged('networth', summary);
}

window.dataSync = dataSync;
window.recalculatePortfolio = recalculatePortfolio;
window.updateNetWorthBackbone = updateNetWorthBackbone;