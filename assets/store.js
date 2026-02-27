// ═══════════════════════════════════════════════════════════
//  store.js — دوال مساعدة للتخزين (Store معرّف في data.js)
// ═══════════════════════════════════════════════════════════

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

// Export to window
window.updateTransactions = updateTransactions;
window.updatePortfolio = updatePortfolio;
