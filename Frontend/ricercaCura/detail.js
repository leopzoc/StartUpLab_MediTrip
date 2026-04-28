document.addEventListener('DOMContentLoaded', () => {
  const INFO_ROWS = [
    { icon: '📍', label: 'Address', val: 'Via Massarenti 9, 40138 Bologna' },
    { icon: '🕐', label: 'Today', val: 'Open 8:00 AM – 8:00 PM', highlight: true },
    { icon: '🌐', label: 'Languages', val: 'English · Italian · German' },
    { icon: '💳', label: 'Payment', val: 'Covered by EHIC — show your card at reception' },
    { icon: '📋', label: 'What to bring', val: 'EHIC card · Passport · Symptom description' },
  ];

  const infoContainer = document.getElementById('info-rows-container');
  INFO_ROWS.forEach(row => {
    const div = document.createElement('div');
    div.style.display = 'flex';
    div.style.gap = '12px';
    div.style.padding = '14px 0';
    div.style.borderBottom = '1px solid #F0F0F0';
    
    div.innerHTML = `
      <span style="font-size: 18px; flex-shrink: 0;">${row.icon}</span>
      <div>
        <div style="font-size: 12px; font-weight: 700; color: #888; margin-bottom: 2px;">${row.label.toUpperCase()}</div>
        <div style="font-size: 14px; color: ${row.highlight ? '#059669' : '#1C1C1A'}; font-weight: ${row.highlight ? '700' : '400'}; line-height: 1.4;">${row.val}</div>
      </div>
    `;
    infoContainer.appendChild(div);
  });

  const goingBtn = document.getElementById('im-going-btn');
  let going = false;

  goingBtn.addEventListener('click', () => {
    going = true;
    goingBtn.style.background = '#059669';
    goingBtn.style.color = '#fff';
    goingBtn.textContent = '✓ Saved to history';
  });
});
