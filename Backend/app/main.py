from fastapi import FastAPI
from fastapi import HTMLResponse


app = FastAPI()


app.title = "MediTrip API"
app.version = "0.0.1"

@app.get("/", tags=["Home"])
def read_root():
    return {"CIAO BELLI"}


@app.get("/home", tags=["Home"])
def read_root():
    return {"CIAO BELLI"}




