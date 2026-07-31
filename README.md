# Interview Question Tracker

## What the app does

Saves interview questions to a database so you can build up a list over time.

- Displays every saved question in React.
- A form lets you add a new question.
- The new question is sent to a Flask API, which saves it in Supabase.
- The new question appears in the list right away, with no page refresh.

## How to run the backend

Flask, on port 5002.

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

Requires `backend/.env`:

```
SUPABASE_URL=your-project-url
SUPABASE_KEY=your-anon-key
```

## How to run the frontend

React + Vite. Start the backend first.

```bash
cd frontend
npm install
npm run dev
```

Then open the URL Vite prints (usually <http://localhost:5173>).

Requires `frontend/.env`:

```
VITE_BACKEND=http://127.0.0.1:5002
```
