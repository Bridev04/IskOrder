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

## Deploy

Recommended setup:

- Frontend: Vercel
- Backend API: Railway

### Railway Backend

Create a Railway project from the GitHub repo and set the service root directory to `backend`. Railway will use `backend/railway.json` to start the API:

```text
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

After Railway deploys, generate a public domain for the backend service. Then add this Railway environment variable, replacing the value with your Vercel domain:

```text
CORS_ALLOWED_ORIGINS=https://your-vercel-app.vercel.app
```

For Vercel preview deployments, you can also set:

```text
CORS_ALLOW_ORIGIN_REGEX=https://.*\.vercel\.app
```

### Vercel Frontend

Import the same GitHub repo into Vercel and set the project root directory to `frontend`. Use the default Next.js build settings.

Add this Vercel environment variable, replacing the value with your Railway backend URL:

```text
NEXT_PUBLIC_API_BASE_URL=https://your-railway-backend.up.railway.app
```

Deploy the backend first, then deploy or redeploy the frontend after setting `NEXT_PUBLIC_API_BASE_URL`.

## Notes

- Cart data is stored in browser localStorage.
- The most recent mock order is stored in browser sessionStorage for the confirmation page.
- Only one restaurant can be checked out at a time to keep the demo simple.
- Restaurant pages include sample order bundles inspired by public menu references, but prices and availability are still mock/demo data.
