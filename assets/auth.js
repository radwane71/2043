function renderSidebar(activePage) {
  const pages = [
    { id:'dashboard',     icon:'🏠', label:'لوحة التحكم',       file:'dashboard.html'     },
    { id:'portfolio',     icon:'💹', label:'المحفظة',            file:'portfolio.html'     },
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

  return `
    <div class="sidebar">
      <div class="sidebar-logo">
        <div class="logo-icon">📈</div>
        <h2>محفظة 2043</h2>
        <span>1</span>
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
  requireAuth();
  document.body.insertAdjacentHTML('afterbegin', renderSidebar(pageId));
}
