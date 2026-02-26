// ═══════════════════════════════════════════════════════════
//  data-sync.js — نظام المزامنة المركزي للبيانات
//  يضمن تحديث جميع الصفحات فوراً عند أي تغيير
// ═══════════════════════════════════════════════════════════

class DataSync {
  constructor() {
    this.listeners = {};
    this.lastUpdate = {};
    this.init();
  }

  init() {
    // الاستماع للتغييرات في localStorage
    window.addEventListener('storage', (e) => {
      if (e.key && e.key.startsWith('sync_')) {
        this.handleStorageChange(e.key, e.newValue);
      }
    });

    // تحديث كل 30 ثانية للتأكد من المزامنة
    setInterval(() => this.checkForUpdates(), 30000);
  }

  // إضافة مستمع لتغييرات البيانات
  onDataChanged(dataType, callback) {
    if (!this.listeners[dataType]) {
      this.listeners[dataType] = [];
    }
    this.listeners[dataType].push(callback);
  }

  // إزالة مستمع
  removeDataListener(dataType, callback) {
    if (this.listeners[dataType]) {
      this.listeners[dataType] = this.listeners[dataType].filter(cb => cb !== callback);
    }
  }

  // إعلام جميع المستمعين بالتغيير
  notifyDataChanged(dataType, data) {
    const timestamp = Date.now();
    this.lastUpdate[dataType] = timestamp;

    // حفظ في localStorage للمزامنة بين الصفحات
    localStorage.setItem(`sync_${dataType}`, JSON.stringify({
      data,
      timestamp,
      source: window.location.pathname
    }));

    // إعلام المستمعين في نفس الصفحة
    if (this.listeners[dataType]) {
      this.listeners[dataType].forEach(callback => {
        try {
          callback(data, timestamp);
        } catch (error) {
          console.error('Error in data listener:', error);
        }
      });
    }

    // إرسال إشارة للمزامنة الفورية
    this.broadcastUpdate(dataType, timestamp);
  }

  // معالجة التغييرات من localStorage
  handleStorageChange(key, newValue) {
    if (!newValue) return;

    try {
      const parsed = JSON.parse(newValue);
      const dataType = key.replace('sync_', '');
      
      // تجاهل التحديثات من نفس الصفحة
      if (parsed.source === window.location.pathname) return;

      // التحقق من أن التحديث جديد
      if (this.lastUpdate[dataType] && this.lastUpdate[dataType] >= parsed.timestamp) {
        return;
      }

      this.lastUpdate[dataType] = parsed.timestamp;

      // إعلام المستمعين
      if (this.listeners[dataType]) {
        this.listeners[dataType].forEach(callback => {
          try {
            callback(parsed.data, parsed.timestamp);
          } catch (error) {
            console.error('Error in cross-page listener:', error);
          }
        });
      }
    } catch (error) {
      console.error('Error parsing sync data:', error);
    }
  }

  // بث التحديث لجميع الصفحات
  broadcastUpdate(dataType, timestamp) {
    // استخدام postMessage للمزامنة الفورية في نفس النافذة
    if (window.opener) {
      window.opener.postMessage({
        type: 'dataSync',
        dataType,
        timestamp
      }, '*');
    }

    // إعلام جميع النوافذ المفتوحة
    window.postMessage({
      type: 'dataSync',
      dataType,
      timestamp
    }, '*');
  }

  // التحقق من التحديثات الدورية
  checkForUpdates() {
    const dataTypes = ['portfolio', 'transactions', 'dividends', 'networth'];
    
    dataTypes.forEach(dataType => {
      const syncKey = `sync_${dataType}`;
      const syncData = localStorage.getItem(syncKey);
      
      if (syncData) {
        try {
          const parsed = JSON.parse(syncData);
          if (!this.lastUpdate[dataType] || parsed.timestamp > this.lastUpdate[dataType]) {
            this.handleStorageChange(syncKey, syncData);
          }
        } catch (error) {
          console.error('Error checking updates:', error);
        }
      }
    });
  }

  // حفظ البيانات مع المزامنة
  saveAndSync(dataType, data) {
    // حفظ البيانات الأصلية
    Store.save(`${dataType}_v1`, data);
    
    // إعلام بالتغيير
    this.notifyDataChanged(dataType, data);
  }

  // تحديث البيانات مع المزامنة
  updateAndSync(dataType, updater) {
    const currentData = Store.load(`${dataType}_v1`, APP[dataType] || []);
    const updatedData = updater(currentData);
    
    this.saveAndSync(dataType, updatedData);
    return updatedData;
  }
}

// إنشاء نسخة واحدة من نظام المزامنة
const dataSync = new DataSync();

// دوال مساعدة للتحديثات الفورية
function updatePortfolio(updater) {
  return dataSync.updateAndSync('portfolio', updater);
}

function updateTransactions(updater) {
  return dataSync.updateAndSync('transactions', updater);
}

function updateDividends(updater) {
  return dataSync.updateAndSync('dividends', updater);
}

function updateNetWorth(updater) {
  return dataSync.updateAndSync('networth', updater);
}

// دالة لإعادة حساب المحفظة بناءً على العمليات
function recalculatePortfolioFromTransactions() {
  const transactions = Store.load('transactions_v1', APP.transactions);
  const portfolio = Store.load('portfolio_v1', APP.portfolio);
  
  // إنشاء خريطة للتيكرات
  const tickerMap = {};
  portfolio.forEach(stock => {
    tickerMap[stock.ticker] = {...stock};
  });

  // تطبيق العمليات على المحفظة
  transactions.forEach(tx => {
    if (!tickerMap[tx.ticker]) {
      // البحث عن التيكر في قائمة التيكرات
      const tickerInfo = TICKERS.find(t => t.code === tx.ticker);
      if (tickerInfo) {
        tickerMap[tx.ticker] = {
          stock: tickerInfo.name,
          ticker: tx.ticker,
          sector: tickerInfo.sector || 'غير محدد',
          qty: 0,
          avg_cost: 0,
          current_price: tickerMap[tx.ticker]?.current_price || 0,
          goal_alloc: 0.05,
          buy_zone_max: tickerMap[tx.ticker]?.buy_zone_max || 0,
          sell_zone_low: tickerMap[tx.ticker]?.sell_zone_low || 0,
          sell_zone_high: tickerMap[tx.ticker]?.sell_zone_high || 0,
          decision: 'مراقبة',
          eval: 'تمت إضافته من العمليات',
          is_bluechip: tickerInfo.is_bluechip || false
        };
      }
    }

    if (tickerMap[tx.ticker]) {
      const stock = tickerMap[tx.ticker];
      if (tx.status === 'Buy') {
        const newTotal = (stock.qty * stock.avg_cost) + tx.total_cost;
        const newQty = stock.qty + tx.qty;
        stock.avg_cost = newQty > 0 ? newTotal / newQty : 0;
        stock.qty = newQty;
      } else if (tx.status === 'Sell' && stock.qty > 0) {
        stock.qty = Math.max(0, stock.qty - tx.qty);
      }
    }
  });

  const updatedPortfolio = Object.values(tickerMap).filter(stock => stock.qty > 0);
  updatePortfolio(() => updatedPortfolio);
  
  return updatedPortfolio;
}

// دالة لتحديث جميع الصفحات عند إضافة عملية
function syncAfterTransactionChange() {
  // إعادة حساب المحفظة
  recalculatePortfolioFromTransactions();
  
  // إجبار تحديث الصفحات الأخرى
  setTimeout(() => {
    dataSync.notifyDataChanged('dashboard', { action: 'refresh' });
    dataSync.notifyDataChanged('portfolio', { action: 'refresh' });
    dataSync.notifyDataChanged('networth', { action: 'refresh' });
  }, 100);
}

// التصدير للاستخدام العام
window.DataSync = DataSync;
window.dataSync = dataSync;
window.updatePortfolio = updatePortfolio;
window.updateTransactions = updateTransactions;
window.updateDividends = updateDividends;
window.updateNetWorth = updateNetWorth;
window.recalculatePortfolioFromTransactions = recalculatePortfolioFromTransactions;
window.syncAfterTransactionChange = syncAfterTransactionChange;
