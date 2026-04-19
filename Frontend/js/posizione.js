const continueBtn = document.getElementById('continue-btn1');
const cityInput = document.getElementById('city');
const universityInput = document.getElementById('university');

continueBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Salviamo citta e universita nella memoria del browser
    localStorage.setItem('user_city', cityInput.value);
    localStorage.setItem('user_university', universityInput.value);
    
    window.location.href = 'step3.html';
});
