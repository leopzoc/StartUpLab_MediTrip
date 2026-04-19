from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
import sqlite3

app = FastAPI()
# ---sbloccare il traffico ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Permette a tutti i siti di contattarti (per ora va bene così)
    allow_credentials=True,
    allow_methods=["*"], # Permette tutti i metodi (POST, GET, OPTIONS, ecc.)
    allow_headers=["*"], # Permette tutti gli header (Content-Type, ecc.)
)

conn = sqlite3.connect("database.db", check_same_thread=False)
cursor = conn.cursor()


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
    accounts.append(dati)

    print(accounts)
    return {"status":"ok!"}

@app.post("/login", tags=["Users"])
async def login(dati: dict):
    for a in accounts:
        if a["email"] == dati["email"] and a["password"] == dati["password"]:
            return {"status":"ok!"}
    return {"status":"error!"}





