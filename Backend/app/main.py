from fastapi import FastAPI
from fastapi.responses import HTMLResponse
import sqlite3

app = FastAPI()

conn = sqlite3.connect("database.db", check_same_thread=False)
cursor = conn.cursor()

emails = ["leonardo.pulzone@gmail.com","giuseppe@peppe.it","francesco@francesco.it"]

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


