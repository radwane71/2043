function requireAuth() {
  // إذا كنت تبغى نظام تسجيل دخول، ضيفه هنا
  // مؤقتاً نرجع true عشان الصفحات تشتغل
  return true;
}

function doLogout() {
  if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
    // يمكن مسح بيانات الجلسة أو التوجيه لصفحة تسجيل الدخول
    toast('🚀 تم تسجيل الخروج', 'info');
    setTimeout(() => window.location.href = 'dashboard.html', 800);
  }
}

function renderSidebar(activePage) {
  const pages = [
    { id:'dashboard',     icon:'🏠', label:'لوحة التحكم',       file:'dashboard.html'     },
    { id:'portfolio',     icon:'📉', label:'المحفظة',            file:'portfolio.html'     },
    { id:'transactions',  icon:'🔄', label:'العمليات',            file:'transactions.html'  },
    { id:'dividends',     icon:'💰', label:'التوزيعات',           file:'dividends.html'     },
    { id:'networth',      icon:'📊', label:'صافي الثروة',        file:'networth.html'      },
    { id:'properties',    icon:'🏢', label:'العقارات',            file:'properties.html'    },
    { id:'cashinvest',    icon:'💵', label:'السيولة للضخ',       file:'cashinvest.html'    },
    { id:'forecast',      icon:'🔭', label:'مستقبل المحفظة',    file:'forecast.html'      },
    { id:'salary',        icon:'💳', label:'سجلات الراتب',        file:'salary.html'        },
    { id:'salary-scale',  icon:'📈', label:'سلم الراتب',            file:'salary-scale.html'  },
    { id:'settings',      icon:'⚙️', label:'الإعدادات',           file:'settings.html'      },
  ];

  const navHTML = pages.map(p => `
    <a href="${p.file}" class="nav-item ${activePage === p.id ? 'active' : ''}">
      <span class="nav-icon">${p.icon}</span>
      <span>${p.label}</span>
    </a>
  `).join('');

  const ownerName = (window.APP && window.APP.settings && window.APP.settings.ownerName)
    ? window.APP.settings.ownerName
    : '';

  return `
    <div class="sidebar">
      <div class="sidebar-logo">
        <div class="logo-icon">📈</div>
        <h2>محفظة 2043</h2>
        <span>${ownerName}</span>
      </div>
      <nav class="sidebar-nav">
        <div class="nav-section">الرئيسية</div>
        ${navHTML}
      </nav>
      <div class="sidebar-footer">
        <button class="logout-btn" onclick="doLogout()">
          <span>🚺</span>
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </div>
  `;
}

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

function initPage(pageId) {
  if (!requireAuth()) return;
  document.body.insertAdjacentHTML('afterbegin', renderSidebar(pageId));
}
