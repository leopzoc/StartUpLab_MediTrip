const createAccountBtn = document.getElementById('create-account-btn');
const backBtn = document.getElementById('back-btn');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

async function handleSubmit() {
    const dati = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    };

    const response = await fetch("http://localhost:8000/registrazione", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dati)
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
