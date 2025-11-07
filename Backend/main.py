from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, EmailStr, Field
from database import get_db_session
from sqlalchemy import text
from sqlalchemy.orm import Session
import bcrypt
from dotenv import load_dotenv
import os
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
load_dotenv()
FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")
app = FastAPI(
    title="Nigerian States API",
    description="An API for managing Nigerian states information and user authentication",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_ORIGIN, "http://localhost:3000", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def root():
    return {
        "message": "Welcome to Nigerian States API",
    }
class SignupRequest(BaseModel):
    full_name: str = Field(..., min_length=1)
    email: EmailStr
    password: str = Field(..., min_length=6)
class LoginRequest(BaseModel):
    email: EmailStr
    password: str
class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
@app.post("/api/signup")
def signup(payload: SignupRequest, db: Session = Depends(get_db_session)):
    q = text("SELECT id FROM users WHERE email = :email")
    res = db.execute(q, {"email": payload.email}).first()
    if res:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed = bcrypt.hashpw(payload.password.encode("utf-8"), bcrypt.gensalt())
    password_hash = hashed.decode("utf-8")
    insert_q = text("""
        INSERT INTO users (full_name, email, password_hash)
        VALUES (:full_name, :email, :password_hash)
    """)
    r = db.execute(insert_q, {
        "full_name": payload.full_name,
        "email": payload.email,
        "password_hash": password_hash
    })
    db.commit()
    # fetch the created user's id
    id_row = db.execute(text("SELECT id FROM users WHERE email = :email"), {"email": payload.email}).mappings().first()
    user_id = id_row["id"] if id_row else None
    return {"message": "User created successfully", "user_id": user_id}
@app.post("/api/login")
def login(payload: LoginRequest, db: Session = Depends(get_db_session)):
    q = text("SELECT id, full_name, email, password_hash FROM users WHERE email = :email")
    row = db.execute(q, {"email": payload.email}).mappings().first()
    if not row:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    stored_hash = row["password_hash"]
    if not bcrypt.checkpw(payload.password.encode("utf-8"), stored_hash.encode("utf-8")):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    user = {"id": row["id"], "full_name": row["full_name"], "email": row["email"]}
    return {"message": "Login successful", "user": user}
@app.get("/api/states")
def get_states(db: Session = Depends(get_db_session)):
    q = text("SELECT id, name, capital, region, slogan, population, landmarks FROM states ORDER BY name")
    rows = db.execute(q).mappings().all()
    # convert RowMapping objects to plain dicts
    states = [dict(r) for r in rows]
    return {"states": states}
if __name__ == "__main__":
    uvicorn.run(app, host=os.getenv("HOST", "127.0.0.1"), port=int(os.getenv("PORT", "8000")))

























