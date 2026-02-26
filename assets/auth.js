// ═══════════════════════════════════════════════════════════════════
//  auth.js — نظام المصادقة الموحّد
//  يُحمَّل بعد data.js في كل صفحة
// ═══════════════════════════════════════════════════════════════════

const AUTH = (() => {
  const KEY       = 'auth_2043_v1';
  const SETUP_KEY = 'auth_setup_v1';
  const IDLE_MS   = 15 * 60 * 1000;  // 15 دقيقة
  let _idleTimer  = null;

  function _hash(pin) {
    try {
      return CryptoJS.SHA256(pin + '_2043_salt').toString();
    } catch(e) {
      // Fallback بسيط إذا CryptoJS غير محمّل
      return btoa(pin + '_2043_salt');
    }
  }

  function isSetup()      { return !!localStorage.getItem(SETUP_KEY); }
  function isLoggedIn()   { return !!sessionStorage.getItem(KEY); }
  function getPage()      { return window.location.pathname.split('/').pop() || 'index.html'; }

  function login(pin) {
    const stored = localStorage.getItem(SETUP_KEY);
    if (!stored) return false;
    if (_hash(pin) !== stored) return false;
    sessionStorage.setItem(KEY, '1');
    _resetIdle();
    return true;
  }

  function logout() {
    sessionStorage.removeItem(KEY);
    clearTimeout(_idleTimer);
    window.location.href = 'index.html';
  }

  function setup(pin) {
    localStorage.setItem(SETUP_KEY, _hash(pin));
    sessionStorage.setItem(KEY, '1');
    _resetIdle();
  }

  function changePin(oldPin, newPin) {
    if (!login(oldPin)) return false;
    setup(newPin);
    return true;
  }

  function _resetIdle() {
    clearTimeout(_idleTimer);
    _idleTimer = setTimeout(() => {
      if (isLoggedIn()) {
        sessionStorage.removeItem(KEY);
        toast('⏰ انتهت جلستك تلقائياً', 'warn');
        setTimeout(() => { window.location.href = 'index.html'; }, 1500);
      }
    }, IDLE_MS);
  }

  // ── تمديد الجلسة عند النشاط ──
  if (typeof document !== 'undefined') {
    ['click','keydown','mousemove','touchstart','scroll'].forEach(ev => {
      document.addEventListener(ev, () => { if (isLoggedIn()) _resetIdle(); }, { passive: true });
    });
  }

  return { isSetup, isLoggedIn, login, logout, setup, changePin };
})();

// ─────────────────────────────────────────────
//  initPage — يُستدعى في أول <script> لكل صفحة
// ─────────────────────────────────────────────
function initPage(pageName) {
  const page = pageName || 'unknown';

  // صفحة الدخول: إذا سُجّل الدخول ← ادش للداشبورد
  if (page === 'login' || page === 'index') {
    if (AUTH.isLoggedIn()) {
      window.location.href = 'dashboard.html';
      return;
    }
    return;
  }

  // كل الصفحات الأخرى: تحقق من الدخول
  if (!AUTH.isLoggedIn()) {
    window.location.href = 'index.html';
    return;
  }

  // ── إضافة Sidebar ──
  _injectSidebar(page);
}

// ─────────────────────────────────────────────
//  _injectSidebar — حقن القائمة الجانبية
// ─────────────────────────────────────────────
function _injectSidebar(activePage) {
  const nav = [
    { href:'dashboard.html',    icon:'🏠', label:'الرئيسية',      page:'dashboard'    },
    { href:'portfolio.html',    icon:'💹', label:'المحفظة',       page:'portfolio'    },
    { href:'transactions.html', icon:'🔄', label:'العمليات',      page:'transactions' },
    { href:'dividends.html',    icon:'💰', label:'التوزيعات',     page:'dividends'    },
    { href:'networth.html',     icon:'📊', label:'صافي الثروة',  page:'networth'     },
    { href:'properties.html',   icon:'🏠', label:'العقارات',      page:'properties'   },
    { href:'gold.html',         icon:'🥇', label:'الذهب',         page:'gold'         },
    { href:'cash.html',         icon:'💵', label:'السيولة',       page:'cash'         },
    { href:'cashinvest.html',   icon:'🏦', label:'ودائع واستثمار', page:'cashinvest'  },
    { href:'goals.html',        icon:'🎯', label:'الأهداف',       page:'goals'        },
    { href:'savings.html',      icon:'🐷', label:'المدخرات',      page:'savings'      },
    { href:'settings.html',     icon:'⚙️', label:'الإعدادات',     page:'settings'     }
  ];

  const sidebarHTML = `
    <div class="sidebar" id="sidebar">
      <div class="sidebar-logo">
        <span class="logo-icon">◈</span>
        <span class="logo-text">2043</span>
      </div>
      <nav class="sidebar-nav">
        ${nav.map(item => `
          <a href="${item.href}"
             class="nav-item${activePage === item.page ? ' active' : ''}"
             title="${item.label}">
            <span class="nav-icon">${item.icon}</span>
            <span class="nav-label">${item.label}</span>
          </a>
        `).join('')}
        <div class="nav-divider"></div>
        <button class="nav-item nav-logout" onclick="AUTH.logout()">
          <span class="nav-icon">🚪</span>
          <span class="nav-label">تسجيل الخروج</span>
        </button>
      </nav>
    </div>
    <div class="sidebar-overlay" id="sidebarOverlay" onclick="closeSidebar()"></div>
    <button class="sidebar-toggle" id="sidebarToggle" onclick="toggleSidebar()">☰</button>
  `;

  document.body.insertAdjacentHTML('afterbegin', sidebarHTML);

  // إضافة class للـ body
  document.body.classList.add('has-sidebar');
}

function toggleSidebar() {
  document.getElementById('sidebar')?.classList.toggle('open');
  document.getElementById('sidebarOverlay')?.classList.toggle('show');
}

function closeSidebar() {
  document.getElementById('sidebar')?.classList.remove('open');
  document.getElementById('sidebarOverlay')?.classList.remove('show');
}
