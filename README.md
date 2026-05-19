# IskOrder

IskOrder is a local full-stack concept website for food ordering around UP Diliman. It is a demo app only: no authentication, no database, and all restaurant/menu data is mock data.

## Tech Stack

- Frontend: Next.js App Router + Tailwind CSS
- Backend: FastAPI
- Data: in-memory Python arrays in `backend/app/data.py`

## Project Structure

```text
backend/
  app/
    main.py
    data.py
    schemas.py
  requirements.txt
frontend/
  app/
  components/
  lib/
  package.json
  tailwind.config.ts
```

## Run Locally

Open two terminals from the project root.

### Terminal 1: Backend

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The API will run at `http://localhost:8000`.

### Terminal 2: Frontend

```powershell
cd frontend
npm install
npm run dev
```

The website will run at `http://localhost:3000`.

## API Routes

- `GET /health`
- `GET /restaurants`
- `GET /restaurants/{restaurant_id}`
- `POST /orders`

## Frontend Environment

The frontend API URL defaults to `http://localhost:8000`. To change it, create `frontend/.env.local`:

```text
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

## Notes

- Cart data is stored in browser localStorage.
- The most recent mock order is stored in browser sessionStorage for the confirmation page.
- Only one restaurant can be checked out at a time to keep the demo simple.
- Restaurant pages include sample order bundles inspired by public menu references, but prices and availability are still mock/demo data.
