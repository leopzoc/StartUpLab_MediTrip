const createAccountBtn = document.getElementById('create-account-btn');
const backBtn = document.getElementById('back-btn');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

async function handleSubmit() {
    // 1. Recuperiamo tutti i dati salvati nei passaggi precedenti dal localStorage
    const nome = localStorage.getItem('user_name') || "";
    const paese = localStorage.getItem('user_country') || "";
    const lingua = localStorage.getItem('user_language') || "";
    const citta = localStorage.getItem('user_city') || "";
    const universita = localStorage.getItem('user_university') || "";

    // 2. Creiamo un UNICO grande oggetto con tutti i dati
    const datiDefinitivi = {
        nome: nome,
        paese: paese,
        lingua: lingua,
        città: citta,
        università: universita,
        email: emailInput.value,
        password: passwordInput.value,
    };

    // 3. Facciamo un'unica richiesta per registrare tutto nel Database
    const response = await fetch("http://localhost:8000/registrazione", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datiDefinitivi)
    });

    const risultato = await response.json();
    console.log(risultato);
}


if (createAccountBtn) {
    createAccountBtn.addEventListener('click', async (e) => {
        e.preventDefault(); // Prevent default form submission if inside a form

        // ... validazione email e password

        // Attendi che la richiesta al server finisca prima di cambiare pagina
        await handleSubmit();
        
        // Vai alla pagina successiva
        window.location.href = 'Fine.html';
    });
}

if (backBtn) {
    backBtn.addEventListener('click', () => {
        window.location.href = 'step2.html';
    });
}
