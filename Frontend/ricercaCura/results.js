document.addEventListener('DOMContentLoaded', () => {
  const CLINICS = [
    {
      id: 'policlinico',
      name: 'Policlinico Sant\'Orsola',
      type: 'Public',
      coverage: 'Covered',
      dist: '1.2 km · ~15 min',
      langs: 'EN · IT · DE',
      hours: 'Open until 8:00 PM',
      featured: true,
    },
    {
      id: 'cmb',
      name: 'CMB Medical Centre',
      type: 'Private',
      coverage: 'Partial',
      dist: '0.6 km · ~8 min',
      langs: 'EN · IT',
      hours: 'Open until 7:00 PM',
      featured: false,
    },
    {
      id: 'asl',
      name: 'ASL Bologna Nord',
      type: 'Public',
      coverage: 'Out of pocket',
      dist: '2.3 km · ~28 min',
      langs: 'IT',
      hours: 'Open until 6:00 PM',
      featured: false,
    },
  ];

  const filters = ['All', 'Covered', 'Open now'];
  let activeFilter = 'All';

  const filtersContainer = document.getElementById('filters-container');
  const clinicsContainer = document.getElementById('clinics-container');

  function renderFilters() {
    filtersContainer.innerHTML = '';
    filters.forEach(f => {
      const btn = document.createElement('div');
      btn.className = `filter-btn ${activeFilter === f ? 'selected' : ''}`;
      btn.textContent = f;
      btn.addEventListener('click', () => {
        activeFilter = f;
        renderFilters();
        renderClinics();
      });
      filtersContainer.appendChild(btn);
    });
  }

  function renderClinics() {
    clinicsContainer.innerHTML = '';
    
    let filtered = CLINICS;
    if (activeFilter === 'Covered') {
      filtered = CLINICS.filter(c => c.coverage === 'Covered');
    }

    filtered.forEach(c => {
      const div = document.createElement('div');
      div.className = c.featured ? 'clinic-card-featured' : 'clinic-card';
      
      let banner = c.featured ? `<div class="featured-banner">⭐ Best match for your coverage</div>` : '';
      
      let typeBadge = c.type === 'Public' ? 'badge-teal' : 'badge-gray';
      
      let covBadge = 'badge-red';
      let covText = '✕ Out of pocket';
      if (c.coverage === 'Covered') { covBadge = 'badge-green'; covText = '✓ Covered by your insurance'; }
      else if (c.coverage === 'Partial') { covBadge = 'badge-amber'; covText = '⚠ Partial cover'; }
      
      div.innerHTML = `
        ${banner}
        <div style="padding: 18px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
            <div style="font-size: 16px; font-weight: 700; color: #1C1C1A; flex: 1;">${c.name}</div>
            <span class="badge ${typeBadge}" style="margin-left: 8px; flex-shrink: 0;">${c.type}</span>
          </div>
          <div style="margin-bottom: 10px;">
            <span class="badge ${covBadge}">${covText}</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 6px; font-size: 13px; color: #666;">
            <div>📍 ${c.dist}</div>
            <div>🌐 ${c.langs}</div>
            <div>🕐 ${c.hours}</div>
          </div>
          <div style="display: flex; gap: 10px; margin-top: 14px;">
            <button class="btn-outline" style="flex: 1; font-size: 13px;" onclick="event.stopPropagation();">Directions</button>
            <button class="btn-teal" style="flex: 1; font-size: 13px;" onclick="event.stopPropagation(); window.location.href='detail.html';">Details</button>
          </div>
        </div>
      `;
      
      div.addEventListener('click', () => {
        window.location.href = 'detail.html';
      });
      
      clinicsContainer.appendChild(div);
    });
  }

  renderFilters();
  renderClinics();
});
