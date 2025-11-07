Simple Nigerian States app

Created By 
THOMAS OPEYEMI STEPHEN

This repository contains a small FastAPI backend and a React (Vite) frontend for managing Nigerian states and basic user auth.

Quick start (Backend)

1. Create a virtual environment and activate it (PowerShell):

   python -m venv venv
   .\venv\Scripts\activate

2. Install backend dependencies and run the server:

   pip install -r Backend/requirements.txt
   cd Backend
   uvicorn main:app --reload

3. Set required environment variables in a `.env` file or your shell:

   DBUSER, DBPASSWORD, DBNAME (and optional DBHOST, DBPORT)

Quick start (Frontend)

1. Open a new terminal and install frontend deps (from project root):

   cd Frontend
   npm install

2. Start the dev server:

   npm run dev

Notes

- Backend endpoints are under `/api` (signup, login, states).
- Frontend expects the backend at `http://127.0.0.1:8000` by default. You can change this with the `VITE_API_BASE` env variable or edit the frontend `api.js`.
- The database is created and seeded automatically on first run (development convenience).

That's it — the app is intentionally small and easy to run locally.
