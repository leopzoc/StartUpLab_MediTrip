from fastapi import FastAPI
from fastapi.responses import HTMLResponse
import sqlite3

app = FastAPI()

conn = sqlite3.connect("database.db", check_same_thread=False)
cursor = conn.cursor()

#Le foreign keys di default sono disattivate, le attivo
cursor.execute("PRAGMA foreign_keys = ON")

#USERS
cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    id_user INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    first_name TEXT,
    last_name TEXT,
    nationality TEXT,
    language TEXT,
    university TEXT,
    city TEXT,
    current_location TEXT,
    password TEXT,
    gender TEXT
)
""")

#INSURANCES
cursor.execute("""
CREATE TABLE IF NOT EXISTS insurances (
    id_insurance INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    headquarter TEXT,
    country TEXT,
    monetary_coverage REAL
)
""")

#FIELD
cursor.execute("""
CREATE TABLE IF NOT EXISTS field (
    id_field INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
)
""")

#DISEASES
cursor.execute("""
CREATE TABLE IF NOT EXISTS diseases (
    id_disease INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    id_field INTEGER,
    FOREIGN KEY (id_field) REFERENCES field(id_field)
)
""")

#COVER
cursor.execute("""
CREATE TABLE IF NOT EXISTS cover (
    id_cover INTEGER PRIMARY KEY AUTOINCREMENT,
    id_insurance INTEGER,
    id_disease INTEGER,
    FOREIGN KEY (id_insurance) REFERENCES insurances(id_insurance),
    FOREIGN KEY (id_disease) REFERENCES diseases(id_disease)
)
""")

#CLINICS
cursor.execute("""
CREATE TABLE IF NOT EXISTS clinics (
    id_clinic INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
)
""")

#OPERATING_IN
cursor.execute("""
CREATE TABLE IF NOT EXISTS operating_in (
    id_op INTEGER PRIMARY KEY AUTOINCREMENT,
    id_field INTEGER,
    id_clinic INTEGER,
    FOREIGN KEY (id_field) REFERENCES field(id_field),
    FOREIGN KEY (id_clinic) REFERENCES clinics(id_clinic)
)
""")

conn.commit()