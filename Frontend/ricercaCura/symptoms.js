/**
 * Questo evento assicura che il codice JavaScript venga eseguito SOLO DOPO che 
 * tutta la struttura HTML della pagina è stata caricata dal browser. 
 * Se provassimo a cercare gli elementi HTML prima che la pagina sia pronta, 
 * riceveremmo un errore perché Javascript non li troverebbe!
 */
document.addEventListener('DOMContentLoaded', () => {

  // ─── 1. RECUPERO DEI DATI DALLA PAGINA PRECEDENTE ───────────────────────────

  /**
   * "sessionStorage" è una memoria temporanea del browser che dura finché la tab è aperta.
   * Nella pagina precedente (body.html), abbiamo salvato le aree del corpo scelte dall'utente.
   * Qui usiamo "getItem" per recuperare quel dato usando la chiave 'selectedAreas'.
   * Quello che otteniamo è una "stringa" di testo (perché il sessionStorage salva solo testo).
   */
  const raw = sessionStorage.getItem('selectedAreas');

  /**
   * Controllo di sicurezza: se la variabile "raw" è vuota o inesistente (ad esempio se 
   * l'utente ha aperto questa pagina direttamente scrivendo l'URL senza passare da body.html),
   * lo reindirizziamo forzatamente alla pagina iniziale ('index.html').
   * Il "return" finale ferma immediatamente l'esecuzione del resto del codice.
   */
  if (!raw) {
    window.location.href = 'body.html';
    return;
  }

  /**
   * Poiché i dati salvati nel sessionStorage erano un array convertito in stringa di testo
   * (tramite JSON.stringify), ora dobbiamo fare l'operazione inversa.
   * JSON.parse() prende la stringa (es. "['head', 'eyes']") e la ritrasforma 
   * in un vero e proprio Array Javascript utilizzabile.
   */
  const selectedAreas = JSON.parse(raw);

  // ─── 2. IL NOSTRO "DATABASE" DEI SINTOMI ───────────────────────────────────────

  /**
   * SYMPTOMS è un "Oggetto" Javascript che fa da dizionario.
   * Ogni "chiave" (es. head, eyes, ears) corrisponde a una delle aree del corpo.
   * Il "valore" associato ad ogni chiave è un "Array" (lista) di altri piccoli oggetti,
   * dove ogni oggettino rappresenta un sintomo specifico con il suo 'id' e la sua 'label' (l'etichetta visibile).
   */
  const SYMPTOMS = {
    head: [
      { id: 'headache', label: 'Headache' },
      { id: 'migraine', label: 'Migraine' },
      { id: 'dizziness', label: 'Dizziness' },
      { id: 'head_pressure', label: 'Pressure / heaviness' },
      { id: 'confusion', label: 'Confusion / brain fog' },
    ],
    eyes: [
      { id: 'tearing', label: 'Tearing / watery eyes' },
      { id: 'eye_pain', label: 'Eye pain' },
      { id: 'blurred', label: 'Blurred vision' },
      { id: 'red_eyes', label: 'Red eyes' },
      { id: 'eye_itching', label: 'Itching' },
    ],
    ears: [
      { id: 'earache', label: 'Earache' },
      { id: 'tinnitus', label: 'Ringing (tinnitus)' },
      { id: 'stuffy_nose', label: 'Stuffy nose' },
      { id: 'runny_nose', label: 'Runny nose' },
      { id: 'sneezing', label: 'Sneezing' },
    ],
    throat: [
      { id: 'sore_throat', label: 'Sore throat' },
      { id: 'swallowing', label: 'Difficulty swallowing' },
      { id: 'hoarseness', label: 'Hoarseness' },
      { id: 'dry_throat', label: 'Dry throat' },
    ],
    chest: [
      { id: 'chest_pain', label: 'Chest pain' },
      { id: 'palpitations', label: 'Palpitations' },
      { id: 'short_breath', label: 'Shortness of breath' },
      { id: 'cough', label: 'Cough' },
      { id: 'wheezing', label: 'Wheezing' },
    ],
    stomach: [
      { id: 'nausea', label: 'Nausea' },
      { id: 'vomiting', label: 'Vomiting' },
      { id: 'stomach_pain', label: 'Stomach pain' },
      { id: 'diarrhea', label: 'Diarrhea' },
      { id: 'constipation', label: 'Constipation' },
      { id: 'bloating', label: 'Bloating' },
    ],
    back: [
      { id: 'lower_back', label: 'Lower back pain' },
      { id: 'upper_back', label: 'Upper back pain' },
      { id: 'stiffness', label: 'Stiffness' },
      { id: 'sciatica', label: 'Sciatica' },
    ],
    skin: [
      { id: 'rash', label: 'Rash' },
      { id: 'itching', label: 'Itching' },
      { id: 'acne', label: 'Acne' },
      { id: 'dryness', label: 'Dryness' },
      { id: 'bruising', label: 'Bruising' },
    ],
    teeth: [
      { id: 'toothache', label: 'Toothache' },
      { id: 'sensitivity', label: 'Sensitivity' },
      { id: 'bleeding_gums', label: 'Bleeding gums' },
      { id: 'jaw_pain', label: 'Jaw pain' },
    ],
    legs: [
      { id: 'leg_pain', label: 'Leg pain' },
      { id: 'swelling', label: 'Swelling' },
      { id: 'cramps', label: 'Cramps' },
      { id: 'numbness', label: 'Numbness / tingling' },
      { id: 'foot_pain', label: 'Foot pain' },
    ],
    mental: [
      { id: 'anxiety', label: 'Anxiety' },
      { id: 'depression', label: 'Depression' },
      { id: 'insomnia', label: 'Insomnia' },
      { id: 'stress', label: 'Stress' },
      { id: 'panic', label: 'Panic attacks' },
      { id: 'mood_swings', label: 'Mood swings' },
    ],
    other: [
      { id: 'fever', label: 'Fever' },
      { id: 'fatigue', label: 'Fatigue' },
      { id: 'weight_loss', label: 'Unexplained weight loss' },
      { id: 'night_sweats', label: 'Night sweats' },
    ],
  };

  // ─── 3. GESTIONE DELLO STATO (LA MEMORIA DELLA PAGINA) ───────────────────────

  /**
   * Creiamo un oggetto vuoto chiamato "selectedSymptoms".
   * Questo oggetto fungerà da "memoria a breve termine" per la nostra pagina.
   * Man mano che l'utente clicca sui vari sintomi, li salveremo qui dentro, 
   * divisi per area. Ad esempio diventerà: { head: ['migraine'], back: ['stiffness'] }
   */
  const selectedSymptoms = {};

  /**
   * "getElementById" serve per prendere un elemento specifico dal file HTML.
   * In questo caso, "catturiamo" la griglia dove andremo ad inserire i sintomi
   * e il pulsante "Next" per poterlo abilitare o disabilitare.
   */
  const grid = document.getElementById('symptoms-grid');
  const nextBtn = document.getElementById('next-btn');

  // ─── 4. FUNZIONE DI RENDER (DISEGNO DELL'INTERFACCIA) ─────────────────────────

  /**
   * La funzione "render" ha il compito di generare tutto il codice HTML necessario
   * in modo dinamico e aggiornare l'interfaccia. Ogni volta che l'utente clicca
   * qualcosa, questa funzione verrà richiamata per "ridisegnare" tutto.
   */
  function render() {
    // La prima cosa da fare in un render è "pulire la lavagna". 
    // Svuotiamo l'HTML della griglia, altrimenti ogni volta che chiamiamo render() i bottoni si sdoppierebbero.
    grid.innerHTML = '';

    /**
     * Facciamo un ciclo "forEach" sull'array "selectedAreas" (le aree scelte nella pagina prima).
     * areaId sarà la singola area (es. "head", o "eyes") ad ogni passaggio del ciclo.
     */
    selectedAreas.forEach(areaId => {

      // Prendiamo dal nostro database (SYMPTOMS) la lista di sintomi corrispondente all'area.
      // Il "|| []" significa "se non trovi l'area (è undefined), usa un array vuoto come fallback".
      const symptoms = SYMPTOMS[areaId] || [];

      // Se nel nostro stato (selectedSymptoms) non esiste ancora una lista (array) per questa
      // specifica area, creiamone una vuota. Ci servirà per salvare le scelte.
      if (!selectedSymptoms[areaId]) selectedSymptoms[areaId] = [];

      // --- CREAZIONE DEL TITOLO DELLA SEZIONE ---
      // Creiamo un nuovo "div" al volo usando Javascript
      const title = document.createElement('div');
      title.className = 'symptom-section-title'; // Gli assegniamo la classe CSS per farlo bello

      // Impostiamo il testo del titolo usando le due funzioni di utility (che spieghiamo giù)
      // Il risultato sarà qualcosa tipo "🧠 Head"
      title.textContent = `${getEmoji(areaId)} ${capitalize(areaId)}`;

      // Inseriamo fisicamente questo nuovo div dentro la griglia HTML
      grid.appendChild(title);

      // --- CREAZIONE DEI BOTTONI (PILLS) DEI SINTOMI ---
      /**
       * Ora facciamo un ciclo dentro il ciclo! Per ogni sintomo appartenente a questa area,
       * creiamo il suo pulsante.
       */
      symptoms.forEach(symptom => {

        // Controlliamo se questo specifico sintomo è attualmente presente
        // nell'array delle selezioni (selectedSymptoms[areaId]). Il metodo .includes() restituisce true o false.
        const isSelected = selectedSymptoms[areaId].includes(symptom.id);

        // Creiamo il div che farà da bottone
        const div = document.createElement('div');

        // Se isSelected è true, aggiungiamo la classe "selected" al bottone (che lo colora di verde grazie al CSS)
        // Altrimenti non aggiungiamo nulla (''). Questo si chiama "operatore ternario" (? :).
        div.className = `pill-btn ${isSelected ? 'selected' : ''}`;

        // Il testo del bottone sarà la label del sintomo (es. "Headache")
        div.textContent = symptom.label;

        /**
         * Aggiungiamo un "ascoltatore di eventi" al bottone. 
         * Quando l'utente ci clicca sopra (evento 'click'), esegui questa funzione:
         */
        div.addEventListener('click', () => {
          if (isSelected) {
            // Se era già selezionato, l'utente lo vuole DESELEZIONARE.
            // Usiamo il metodo .filter() per creare una copia dell'array che 
            // contiene tutti gli elementi TRANNE (id !==) quello su cui ha cliccato.
            selectedSymptoms[areaId] = selectedSymptoms[areaId].filter(id => id !== symptom.id);
          } else {
            // Se non era selezionato, l'utente lo vuole SELEZIONARE.
            // Usiamo .push() per infilare l'id del sintomo in fondo all'array.
            selectedSymptoms[areaId].push(symptom.id);
          }

          // Dopo aver cambiato lo stato, dobbiamo:
          // 1. Controllare se il pulsante "Next" va abilitato o disabilitato.
          updateNextBtn();
          // 2. Ridisegnare tutto! Chiamando render() il codice ricomincerà da grid.innerHTML = ''
          // ma stavolta le variabili (isSelected) avranno i valori aggiornati, quindi i colori cambieranno!
          render();
        });

        // Infine, inseriamo anche questo bottone nella griglia HTML
        grid.appendChild(div);
      });
    });
  }

  // ─── 5. CONTROLLO DEL PULSANTE NEXT ───────────────────────────────────────────

  function updateNextBtn() {
    /**
     * Dobbiamo capire se l'utente ha selezionato almeno un sintomo in totale.
     * "Object.values(selectedSymptoms)" ci restituisce tutti gli array interni 
     * (es: [['migraine'], [], ['rash']]).
     * Il metodo ".some()" verifica se ALMENO UNO (some) di questi array 
     * ha una lunghezza maggiore di 0 (arr.length > 0).
     * canProceed sarà un booleano: true (si può procedere) o false (non si può).
     */
    const canProceed = Object.values(selectedSymptoms).some(arr => arr.length > 0);

    // .classList.toggle('disabled', !canProceed) aggiunge la classe CSS "disabled"
    // (che di solito rende il bottone grigio) solo se !canProceed è vero (ovvero se non possiamo procedere).
    nextBtn.classList.toggle('disabled', !canProceed);

    // Impostiamo pointerEvents: 'auto' (cliccabile) o 'none' (invisibile al mouse/dito).
    nextBtn.style.pointerEvents = canProceed ? 'auto' : 'none';
  }

  // ─── 6. GESTIONE DEL CLICK SUL PULSANTE NEXT ──────────────────────────────────

  /**
   * Quando clicchiamo su "Next", cosa succede?
   */
  nextBtn.addEventListener('click', (e) => {
    // blocchiamo il comportamento default se è un tag <a>
    e.preventDefault();

    // Ricontrolliamo per sicurezza se si può procedere. 
    // Se è false (non ci sono sintomi), usiamo return per interrompere qui la funzione.
    const canProceed = Object.values(selectedSymptoms).some(arr => arr.length > 0);
    if (!canProceed) return;

    // Se siamo arrivati qui, l'utente ha selezionato dei sintomi!
    // Usiamo di nuovo il sessionStorage per salvare tutto l'oggetto "selectedSymptoms".
    // JSON.stringify() converte il nostro fantastico oggetto Javascript in una semplice stringa di testo,
    // perché il sessionStorage accetta solo stringhe!
    sessionStorage.setItem('selectedSymptoms', JSON.stringify(selectedSymptoms));

    // Infine, diciamo al browser di navigare verso la prossima pagina (loading.html)
    window.location.href = 'loading.html';

    //DA AGGIUNGERE LA FUNZIONE PER MEMORIZZARE I SINTOMI NEL DB
  });

  // ─── 7. FUNZIONI DI UTILITY (AIUTANTI) ────────────────────────────────────────

  /**
   * Questa piccola funzione prende in ingresso l'id di un'area (es. "head")
   * e restituisce l'emoji corrispondente cercandola nel suo "map".
   * Se non la trova, restituisce una stringa vuota ('').
   */
  function getEmoji(areaId) {
    const map = {
      head: '🧠', eyes: '👁️', ears: '👂', throat: '🗣️',
      chest: '❤️', stomach: '🫃', back: '🔙', skin: '🩺',
      teeth: '🦷', legs: '🦵', mental: '💬', other: '➕',
    };
    return map[areaId] || '';
  }

  /**
   * Questa funzione prende una parola (es. "head") e la fa diventare "Head".
   * - str.charAt(0).toUpperCase() prende la prima lettera (posizione 0) e la fa maiuscola (H).
   * - str.slice(1) prende tutto il resto della parola partendo dalla posizione 1 (ead).
   * Sommando le due cose ottieni "Head".
   */
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // ─── 8. AVVIO (INITIALIZATION) ────────────────────────────────────────────────

  // Appena la pagina si è caricata, chiamiamo subito la funzione "render()" 
  // per disegnare l'interfaccia la primissima volta.
  render();

  // E aggiorniamo il bottone Next (che all'inizio sarà ovviamente disabilitato 
  // perché selectedSymptoms è vuoto).
  updateNextBtn();
});