document.addEventListener('DOMContentLoaded', () => {
  // Inject components using JS to avoid duplicating SVGs in every HTML file

  // 1. Status Bar
  const statusBarContainer = document.getElementById('status-bar-container');
  if (statusBarContainer) {
    const isDark = statusBarContainer.dataset.dark === 'true';
    const fill = isDark ? '#fff' : '#111';
    const strokeOpacity = isDark ? '0.4' : '0.4';
    statusBarContainer.innerHTML = `
      <div class="status-bar${isDark ? ' dark' : ''}">
        <span class="time">9:41</span>
        <div class="icons">
          <svg width="17" height="12" viewBox="0 0 17 12" fill="${fill}">
            <rect x="0" y="8" width="3" height="4" rx="0.7"/><rect x="4.5" y="5.5" width="3" height="6.5" rx="0.7"/>
            <rect x="9" y="3" width="3" height="9" rx="0.7"/><rect x="13.5" y="0" width="3.2" height="12" rx="0.7"/>
          </svg>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="${fill}">
            <path d="M8 2.5C10 2.5 11.8 3.3 13.2 4.6L14.2 3.5C12.5 1.9 10.4 1 8 1 5.6 1 3.5 1.9 1.8 3.5L2.8 4.6C4.2 3.3 6 2.5 8 2.5Z"/>
            <path d="M8 6C9.2 6 10.3 6.5 11.1 7.3L12.1 6.3C11 5.2 9.6 4.5 8 4.5 6.4 4.5 5 5.2 3.9 6.3L4.9 7.3C5.7 6.5 6.8 6 8 6Z"/>
            <circle cx="8" cy="10" r="1.5"/>
          </svg>
          <svg width="25" height="12" viewBox="0 0 25 12" fill="${fill}">
            <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="${fill}" stroke-opacity="${strokeOpacity}" fill="none"/>
            <rect x="2" y="2" width="18" height="8" rx="2" fill="${fill}"/>
            <path d="M23 4v4c.9-.3 1.5-1.2 1.5-2s-.6-1.7-1.5-2z" fill="${fill}" opacity="0.4"/>
          </svg>
        </div>
      </div>
    `;
  }

  // 2. Home Indicator
  const homeIndicatorContainer = document.getElementById('home-indicator-container');
  if (homeIndicatorContainer) {
    const isDark = homeIndicatorContainer.dataset.dark === 'true';
    homeIndicatorContainer.innerHTML = `
      <div class="home-indicator${isDark ? ' dark' : ''}">
        <div class="home-bar"></div>
      </div>
    `;
  }

  // 3. Bottom Nav
  const bottomNavContainer = document.getElementById('bottom-nav-container');
  if (bottomNavContainer) {
    const activeId = bottomNavContainer.dataset.active || 'home';
    const tabs = [
      {
        id: 'home', label: 'Home', link: 'home.html', icon: (on) => `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="${on ? '#14B8A6' : '#CCC'}">
          <path d="M3 12L12 3l9 9v9a1 1 0 01-1 1h-5v-5H9v5H4a1 1 0 01-1-1v-9z"/>
        </svg>`
      },
      {
        id: 'triage', label: 'Care', link: 'triage.html', icon: (on) => `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${on ? '#14B8A6' : '#CCC'}" stroke-width="2" stroke-linecap="round">
          <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z"/><path d="M12 8v4l3 3"/>
        </svg>`
      },
      {
        id: 'coverage', label: 'Coverage', link: '#', icon: (on) => `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="${on ? '#14B8A6' : '#CCC'}">
          <path d="M12 2L4 6v6c0 5.2 3.4 10.1 8 11.2 4.6-1.1 8-6 8-11.2V6L12 2z"/>
        </svg>`
      },
      {
        id: 'documents', label: 'Documents', link: '#', icon: (on) => `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${on ? '#14B8A6' : '#CCC'}" stroke-width="2" stroke-linecap="round">
          <rect x="5" y="2" width="14" height="20" rx="2"/><path d="M9 7h6M9 11h6M9 15h4"/>
        </svg>`
      },
    ];

    let html = '<div class="bottom-nav">';
    tabs.forEach(t => {
      const on = activeId === t.id;
      html += `
        <a href="${t.link}" class="nav-item">
          ${t.icon(on)}
          <span class="nav-label" style="color: ${on ? '#14B8A6' : '#BBB'}; font-weight: ${on ? 700 : 500}">${t.label}</span>
        </a>
      `;
    });
    html += '</div>';
    bottomNavContainer.innerHTML = html;
  }

  // 4. Back Button
  const backBtnContainer = document.getElementById('back-btn-container');
  if (backBtnContainer) {
    const isDark = backBtnContainer.dataset.dark === 'true';
    const link = backBtnContainer.dataset.link || 'javascript:history.back()';
    const stroke = isDark ? '#fff' : '#1C1C1A';
    backBtnContainer.innerHTML = `
      <a href="${link}" class="back-btn${isDark ? ' dark' : ''}">
        <svg width="9" height="16" viewBox="0 0 9 16" fill="none">
          <path d="M8 1L1 8l7 7" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
    `;
  }
});
