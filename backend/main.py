from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pymysql

app = FastAPI()

# permitir acesso do frontend (Vue no localhost:5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# conecta no MySQL
def get_conn():
    return pymysql.connect(
        host="127.0.0.1",
        user="root",
        password="n321",  # << coloque sua senha aqui
        database="sistema_tcc",         # nome do banco que você criou com DB_APS.sql
        cursorclass=pymysql.cursors.DictCursor
    )

@app.get("/health")
def health():
    return {"ok": True}

@app.post("/auth/login")
def login(data: dict):
    email = data.get("email")
    password = data.get("password")

    with get_conn() as conn, conn.cursor() as cur:
        cur.execute("SELECT idUsuario, nome, email, senha, tipo_usuario FROM Usuario WHERE email=%s", (email,))
        user = cur.fetchone()

    if not user or user["senha"] != password:
        raise HTTPException(status_code=401, detail="Credenciais inválidas")

    return {
        "token": "fake-token",
        "user": {
            "id": user["idUsuario"],
            "name": user["nome"],
            "email": user["email"],
            "role": user["tipo_usuario"]
        }
    }
