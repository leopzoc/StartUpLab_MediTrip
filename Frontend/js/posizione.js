const continueBtn = document.getElementById('continue-btn1');
const cityInput = document.getElementById('city');
const universityInput = document.getElementById('university');

async function handleSubmit() {
    const dati = {
        città: document.getElementById("city").value,
        università: document.getElementById("university").value,
    };

    const response = await fetch("http://localhost:8000/registrazione", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dati)
    });

    const risultato = await response.json();
    console.log(risultato);
}



continueBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    // await handleSubmit();
    window.location.href = 'step3.html';
});
