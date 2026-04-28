document.addEventListener('DOMContentLoaded', () => {
  const BODY_AREAS = [
    { id: 'head', emoji: '🧠', label: 'Head' },
    { id: 'eyes', emoji: '👁️', label: 'Eyes' },
    { id: 'ears', emoji: '👂', label: 'Ears & nose' },
    { id: 'throat', emoji: '🗣️', label: 'Throat' },
    { id: 'chest', emoji: '❤️', label: 'Chest' },
    { id: 'stomach', emoji: '🫃', label: 'Stomach' },
    { id: 'back', emoji: '🔙', label: 'Back' },
    { id: 'skin', emoji: '🩺', label: 'Skin' },
    { id: 'teeth', emoji: '🦷', label: 'Teeth' },
    { id: 'legs', emoji: '🦵', label: 'Legs & feet' },
    { id: 'mental', emoji: '💬', label: 'Mental health' },
    { id: 'other', emoji: '➕', label: 'Other' },
  ];

  const grid = document.getElementById('body-areas-grid');
  const nextBtn = document.getElementById('next-btn');
  let selectedAreas = [];

  function render() {
    grid.innerHTML = '';
    BODY_AREAS.forEach(area => {
      const isSelected = selectedAreas.includes(area.id);
      const div = document.createElement('div');
      div.className = `pill-btn ${isSelected ? 'selected' : ''}`;
      div.style.cssText = `
        flex-direction: column; gap: 4px; padding: 14px 8px;
        border-radius: 16px; text-align: center;
        font-size: 12px; font-weight: 600;
      `;
      div.innerHTML = `
        <span style="font-size: 22px;">${area.emoji}</span>
        <span>${area.label}</span>
      `;
      div.addEventListener('click', () => {
        if (isSelected) {
          selectedAreas = selectedAreas.filter(id => id !== area.id);
        } else {
          selectedAreas.push(area.id);
        }
        updateNextBtn();
        render();
      });
      grid.appendChild(div);
    });
  }

  function updateNextBtn() {
    const canProceed = selectedAreas.length > 0;
    nextBtn.classList.toggle('disabled', !canProceed);
    nextBtn.style.pointerEvents = canProceed ? 'auto' : 'none';
  }

  nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (selectedAreas.length === 0) return;

    // Salva l'array come stringa JSON → ['head', 'eyes', 'chest']
    sessionStorage.setItem('selectedAreas', JSON.stringify(selectedAreas));

    // Vai alla pagina dei sintomi (unica per tutti)
    window.location.href = 'symptoms.html';
  });

  render();
  updateNextBtn();
});