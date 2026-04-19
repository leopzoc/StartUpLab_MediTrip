from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
import sqlite3

# --- SETUP DATABASE SQLITE ---
# Si connette al file database.db (se non esiste lo crea lui)
conn = sqlite3.connect("database.db", check_same_thread=False)
cursor = conn.cursor()

# Creiamo la tabella "utenti" se non esiste già, con colonne per ogni dato
cursor.execute("""
CREATE TABLE IF NOT EXISTS utenti (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    paese TEXT,
    lingua TEXT,
    citta TEXT,
    universita TEXT,
    email TEXT UNIQUE,
    password TEXT
)
""")
conn.commit()

app = FastAPI()
# ---sbloccare il traffico ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Permette a tutti i siti di contattarti (per ora va bene così)
    allow_credentials=True,
    allow_methods=["*"], # Permette tutti i metodi (POST, GET, OPTIONS, ecc.)
    allow_headers=["*"], # Permette tutti gli header (Content-Type, ecc.)
)

# (Rimosse le connessioni sqlite3 duplicate qui siccome l'ho spostata sopra)


accounts = []
app.title = "MediTrip API"
app.version = "0.0.1"

@app.get("/", tags=["Home"])
def read_root():
    return {"CIAO BELLI"}


@app.get("/home", tags=["Home"])
def read_home():
    return {"HOME"}


@app.get("/Email/{email}", tags=["Home"])
def get_email(email: str):
    for e in emails:
        if e == email:
            return "ciao leonardo!"
        else:
            return None


@app.post("/registrazione", tags=["Users"])
async def registrazione(dati: dict):
    # Diciamo a Python di usare i dati ricevuti per inserirli nel Database!
    try:
        cursor.execute("""
            INSERT INTO utenti (nome, paese, lingua, citta, universita, email, password) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (
            dati.get("nome"), 
            dati.get("paese"), 
            dati.get("lingua"), 
            dati.get("città"), 
            dati.get("università"), 
            dati.get("email"), 
            dati.get("password")
        ))
        conn.commit()
        return {"status": "ok!", "message": "Utente registrato nel database!"}
    except Exception as e:
        return {"status": "error!", "message": str(e)}

@app.post("/login", tags=["Users"])
async def login(dati: dict):
    # Cerchiamo l'utente nel Database invece che nella lista "accounts"
    cursor.execute("SELECT * FROM utenti WHERE email = ? AND password = ?", (dati["email"], dati["password"]))
    utente = cursor.fetchone()
    
    if utente:
        return {"status": "ok!", "message": "Login avvenuto con successo!"}
    
    return {"status": "error!", "message": "Credenziali errate"}





