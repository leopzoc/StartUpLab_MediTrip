// Aggiungiamo un "ascoltatore di eventi": 
// Aspettiamo che tutta la struttura HTML (il "DOM") sia stata caricata prima di eseguire i nostri script.
// Se non lo facessimo, Javascript cercherebbe elementi nella pagina che ancora non ci sono ed andrebbe in blocco (errore Null).
document.addEventListener('DOMContentLoaded', () => {

    // === LOGICA DELLO STEP 1 (Gestione bottone Continue e Form) ===

    // Cerchiamo l'elemento (il bottone) html che porta la "targa" (ID) "continue-btn"
    const continueBtn = document.getElementById('continue-btn');

    // Se il bottone esiste nella pagina in cui ci troviamo, prosegui... 
    // Questa sicurezza serve per evitare errori console sulle pagine interne che non possiedono questo tasto.







    // Funzione che invia i dati al server
    async function handleSubmit() {
        const dati = {
            nome: document.getElementById("first-name").value,
            paese: document.getElementById("country").value,
            lingua: document.getElementById("language").value
        };

        const response = await fetch("http://localhost:8000/registrazione", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dati)
        });

        const risultato = await response.json();
        console.log(risultato);
    }







    if (continueBtn) {

        // Al bottone "Continue" diciamo: quando l'utente ti clicca ("click"), fai partire questa catena di istruzioni (e)
        continueBtn.addEventListener('click', async (e) => {

            // Per prima cosa catturiamo i vari moduli che ci servono dalla schermata in delle scatole (Variabili)
            const firstNameInput = document.getElementById('first-name');
            const countrySelect = document.getElementById('country');
            const languageSelect = document.getElementById('language');

            // Controllo di sicurezza rapido: se non troviamo il modulo del nome non siamo in index.html, non c'è nulla da inviare, esci (return).
            if (!firstNameInput) return;

            // Conserviamo il valore attualmente scritto nel modulo del nome, e togliamo gli spazi vuoti agli angoli (es: " Mario ") con .trim()
            const firstName = firstNameInput.value.trim();

            // Per sicurezza/pulizia, cerchiamo se è già presente da prima il messaggio di errore rosso
            const existingError = document.getElementById('first-name-error');
            // E se c'è, lo rimuoviamo affinchè sparisca dallo schermo e ci lasci un modulo pulito da rivalutare
            if (existingError) existingError.remove();

            // Rimuoviamo il CSS che gli dava il colore rosso dei bordi per resettare lo stato
            firstNameInput.classList.remove('border-red-500', 'border-2');

            // Logica di controllo (Validazione): 
            // Se "firstName" è falso, vuoto o solo formato spazi, significa che l'utente non ha scritto il suo nome!
            if (!firstName) {
                // Modifichiamo le classi Tailwind aggiungendo appositamente le proprietà dei bordi in Errore (Bordo 2 e Rosso al livello 500)
                firstNameInput.classList.add('border-red-500', 'border-2');

                // Creiamo noi a mano libera e dal nulla, un paragrafo html nuovo di zecca <p>
                const errorMsg = document.createElement('p');
                errorMsg.id = 'first-name-error';
                errorMsg.className = 'text-red-500 text-sm mt-1'; // Usiamo classi Tailwind per renderlo rosso testuale (text-red) e distanziarlo (mt-1)

                // Compiliamo il testo che vogliamo dire all'utente all'interno della pancia e del cuore del paragrafo
                errorMsg.textContent = 'Please enter your name';

                // Attacchiamo questo paragrafo appena nato fisicamente allo schermo in corrispondenza di dove si trova il box del nome
                firstNameInput.parentNode.appendChild(errorMsg);

                // Interrompiamo lo script (return). Siccome ci ritiriamo con un abort, il bottone "Continue" perde il suo effetto e NON proseguiamo sulle altre pagine
                return;
            }

            // --- FASE DATI VERIFICATA --- 
            // Se la logica qui in basso sta avvenendo, vuol dire che lo step precedente non ha bloccato ed il nome c'è!

            // Salviamo i dati raccolti dentro la memoria cache del browser (localStorage), una memoria temporanea ed utilissima.
            localStorage.setItem('user_name', firstName);
            localStorage.setItem('user_country', countrySelect.value);
            localStorage.setItem('user_language', languageSelect.value);
            // Aspettiamo che la richiesta al server finisca prima di cambiare pagina!
            await handleSubmit();

            // Redirezioniamo (cambiamo la schermata) spingendo il browser ad aprire il file del passaggio due 'step2.html'
            window.location.href = 'step2.html';
        });
    }

    // === LOGICA GLOBALE (CONDIVISA SU TUTTE LE PAGINE) ===

    // Per tutte le pagine a prescindere, all'avvio tentiamo di sbirciare dentro il foglietto del localStorage nominato "user_name"
    const userName = localStorage.getItem('user_name');

    // Se troviamo al suo interno un nome bello impresso e presente...
    if (userName) {
        // Cerchiamo TUTTI gli slot di saluto (class="user-name-display") disseminati per la pagina apposta per accogliere questo momento
        const nameDisplays = document.querySelectorAll('.user-name-display');

        // E per ogni slot trovato, sostituiamo con un colpo di biro spietato il suo contenuto base scrivendoci di forza il Nome
        // Il risultato è un bel banner che saluta per nome a display!
        nameDisplays.forEach(el => {
            el.textContent = userName;
        });
    }

    // === FUNZIONE DI NAVIGAZIONE e TASTI INDIETRO STORICO ===

    // Altri comandi utili generici: catturiamo tutte le "freccettine" visive fatte per tornare alla pagina pregressa
    // Capiamo che sono loro perchè in html ci abbiamo messo noi la scritta data-icon="arrow_back"
    const backArrows = document.querySelectorAll('[data-icon="arrow_back"]');

    // Aggiungiamo ad ognuna un piccolo controllore (Event listener sul Click dell'utente)
    backArrows.forEach(arrow => {
        arrow.addEventListener('click', () => {
            // Che ordina forzatamente alla cronologia del browser in memoria di fare uno step di retromarcia secco (-1 passaggi di back)
            // Lavorerà esattamente come premere il bottone del "Browser Indietro".
            window.history.back();
        });
    });
});
