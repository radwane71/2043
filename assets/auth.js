// ═══════════════════════════════════════════════════════════
//  auth.js — نظام الحماية المشترك
// ═══════════════════════════════════════════════════════════

// ── التحقق من الجلسة ────────────────────────────────────────
function requireAuth() {
  try {
    if (sessionStorage.getItem('auth_2043') !== '1')
      window.location.href = 'index.html';
  } catch(e) {
    window.location.href = 'index.html';
  }
}

// ── تسجيل الخروج ────────────────────────────────────────────
function doLogout() {
  try { sessionStorage.removeItem('auth_2043'); } catch(e) {}
  window.location.href = 'index.html';
}

// ── Store — localStorage wrapper ────────────────────────────
const Store = {
  load: (key, fallback) => {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : fallback;
    } catch(e) { return fallback; }
  },
  save: (key, val) => {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) {}
  },
  get: (key) => {
    try { return localStorage.getItem(key); } catch(e) { return null; }
  },
  set: (key, val) => {
    try { localStorage.setItem(key, val); } catch(e) {}
  }
};

// ── Sidebar HTML ─────────────────────────────────────────────
function renderSidebar(activePage) {
  const pages = [
    { id:'dashboard',    icon:'🏠', label:'لوحة التحكم',     file:'dashboard.html'    },
    { id:'portfolio',    icon:'💹', label:'المحفظة',          file:'portfolio.html'    },
    { id:'transactions', icon:'🔄', label:'العمليات',          file:'transactions.html' },
    { id:'dividends',    icon:'💰', label:'التوزيعات',         file:'dividends.html'    },
    { id:'networth',     icon:'📊', label:'صافي الثروة',      file:'networth.html'     },
    { id:'properties',   icon:'🏢', label:'العقارات',          file:'properties.html'   },
    { id:'cashinvest',   icon:'💵', label:'السيولة للضخ',     file:'cashinvest.html'   },
    { id:'forecast',     icon:'🔭', label:'مستقبل المحفظة',   file:'forecast.html'     },
    { id:'settings',     icon:'⚙️', label:'الإعدادات',         file:'settings.html'     },
  ];

  const navHTML = pages.map(p => `
    <a href="${p.file}" class="nav-item ${activePage === p.id ? 'active' : ''}">
      <span class="nav-icon">${p.icon}</span>
      <span>${p.label}</span>
    </a>
  `).join('');

  return `
    <div class="sidebar">
      <div class="sidebar-logo">
        <div class="logo-icon">📈</div>
        <h2>محفظة 2043</h2>
        <span>رضوان الجهني</span>
      </div>
      <nav class="sidebar-nav">
        <div class="nav-section">الرئيسية</div>
        ${navHTML}
      </nav>
      <div class="sidebar-footer">
        <button class="logout-btn" onclick="doLogout()">
          <span>🚪</span>
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </div>
  `;
}

// ── Toast ────────────────────────────────────────────────────
function toast(msg, type = 'success') {
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.className = `show ${type}`;
  clearTimeout(el._t);
  el._t = setTimeout(() => { el.className = ''; }, 2800);
}

// ── initPage ─────────────────────────────────────────────────
function initPage(pageId) {
  requireAuth();
  document.body.insertAdjacentHTML('afterbegin', renderSidebar(pageId));
}
