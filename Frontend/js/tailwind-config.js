// Questo script abilita e personalizza Tailwind CSS nel progetto.
tailwind.config = {
    // darkMode permette di gestire temi Light / Dark tramite assegnazione della classe "dark" all'html 
    darkMode: "class",
    theme: {
        extend: {
            // Sezione colori: qui sono mappati tutti i colori del brand Meditrip/CareItaly.
            // Quando scriveremo 'bg-primary' in HTML, Tailwind pescherà il colore '#506300' da qui.
            colors: {
                "secondary-fixed": "#eee854",
                "outline-variant": "#acadad",
                "tertiary-dim": "#5d4f00",
                "surface-bright": "#f6f6f6",
                "surface-container-lowest": "#ffffff",
                "primary-fixed-dim": "#c4ec2a",
                "surface-container-highest": "#dbdddd",
                "on-secondary-fixed-variant": "#615e00",
                // "surface" è il colore di sfondo generico della app in chiaro (grigietto chiarissimo)
                "surface-tint": "#506300",
                "on-surface-variant": "#5a5c5c",
                "inverse-surface": "#0c0f0f",
                "primary-container": "#d2fb3b",
                "surface-container-low": "#f0f1f1",
                "on-tertiary-container": "#5d4f00",
                "on-secondary": "#fef863",
                "surface": "#f6f6f6",
                // "primary" è il nostro verde scuro principale usato per scritte chiavi e pulsanti principali
                "primary": "#506300",
                "surface-container": "#e7e8e8",
                "on-secondary-fixed": "#434100",
                "primary-dim": "#455600",
                "background": "#f6f6f6",
                "tertiary-container": "#fedf46",
                "secondary": "#615e00",
                "secondary-container": "#eee854",
                "on-tertiary-fixed-variant": "#695900",
                "inverse-on-surface": "#9c9d9d",
                "on-primary": "#e2ff80", // Colore dei testi che poggiano su sfondi colore "primary"
                "surface-variant": "#dbdddd",
                "primary-fixed": "#d2fb3b",
                "error-container": "#f95630", // Arancione/Rosso d'errore
                "on-error": "#ffefec",
                "on-primary-fixed-variant": "#546800",
                "on-tertiary-fixed": "#483d00",
                "on-surface": "#2d2f2f",      // Colore del testo standard per il corpo principale (testo scuro)
                "tertiary": "#6b5b00",
                "tertiary-fixed-dim": "#efd138",
                "on-primary-container": "#4b5e00",
                "on-tertiary": "#fff3c8",
                "inverse-primary": "#d5fe3e",
                "error-dim": "#b92902",
                "secondary-fixed-dim": "#dfd947",
                "surface-container-high": "#e1e3e3",
                "on-secondary-container": "#575400",
                "on-background": "#2d2f2f",
                "on-primary-fixed": "#3b4a00",
                "outline": "#757777", // Colore bordi standard
                "tertiary-fixed": "#fedf46",
                "surface-dim": "#d2d5d5",
                "secondary-dim": "#555200",
                "on-error-container": "#520c00",
                "error": "#b02500" // Colore per i messaggi di warning
            },
            // Arrotondamenti usati sui bottoni e i moduli d'inserimento (modifica arrotondamento delle varie classi .rounded)
            borderRadius: {
                "DEFAULT": "0.25rem", // smusso basico .rounded
                "lg": "0.5rem",       // smusso medio .rounded-lg
                "xl": "0.75rem",      // smusso tondo .rounded-xl
                "full": "9999px"      // Per cerchi perfettamente rotondi o ellissi .rounded-full
            },
            // Ricollega la dichiarazione "font-headline" e simili predefinite da Tailwind al nostro font di Google specifico "Manrope"
            fontFamily: {
                "headline": ["Manrope"],
                "body": ["Manrope"],
                "label": ["Manrope"]
            }
        },
    },
};
