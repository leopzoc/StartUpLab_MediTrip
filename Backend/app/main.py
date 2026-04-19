from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
import sqlite3

# --- SETUP DATABASE SQLITE ---
# Ci connettiamo al file database.db creato da 'db/manage_db.py'!
conn = sqlite3.connect("db/database.db", check_same_thread=False)
cursor = conn.cursor()

app = FastAPI()
# ---sbloccare il traffico ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
    try:
        # Usiamo i nomi delle colonne aggiornati (nationality, language, university, city) scritte in manage_db.py
        cursor.execute("""
            INSERT INTO users (email, first_name, last_name, nationality, language, university, city, password) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            dati.get("email"), 
            dati.get("nome"),         
            dati.get("cognome", ""),  
            dati.get("paese"),         # Mappato su nationality
            dati.get("lingua", ""),    # Mappato su language
            dati.get("università", ""),# Mappato su university
            dati.get("città", ""),     # Mappato su city
            dati.get("password")
        ))
        conn.commit()
        
        # Leggiamo TUTTI gli utenti (nessun WHERE) e usiamo fetchall() per prenderli in blocco
        cursor.execute("SELECT * FROM users")
        tutti_gli_utenti = cursor.fetchall()
        
        # Stampiamo la lista nel terminale a scopi di debug
        print("--- LISTA UTENTI NEL DB ---")
        for u in tutti_gli_utenti:
            print(u)
            
        return {"status": "ok!", "message": "Utente registrato nel database ufficiale!"}
    except Exception as e:
        return {"status": "error!", "message": str(e)}

@app.post("/login", tags=["Users"])
async def login(dati: dict):
    # Facciamo finta di cercare nella tabella "users"
    cursor.execute("SELECT * FROM users WHERE email = ? AND password = ?", (dati["email"], dati["password"]))
    utente = cursor.fetchone()
    
    if utente:
        return {"status": "ok!", "message": "Login avvenuto con successo!"}
    
    return {"status": "error!", "message": "Credenziali errate"}





