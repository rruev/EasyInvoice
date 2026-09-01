# EasyInvoice

EasyInvoice is a full-stack invoice generator app. It lets you create an account, manage your clients, and generate PDF invoices in just a few clicks.

- **Backend**: Node.js, Express, Prisma (PostgreSQL), Puppeteer (HTML → PDF)
- **Frontend**: React, Vite, React Router

## Features

- User authentication (register/login) with JWT
- Manage your business profile (bank details, tax ID, contact info)
- Create, edit, and manage clients
- Create invoices and generate downloadable PDF invoices from HTML templates
- Dashboard with invoice stats

## Screenshot

![EasyInvoice homepage](./.github/assets/homepage.png)

## Getting Started

Follow the steps below to clone, install, and run EasyInvoice locally. 

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/EasyInvoice.git
cd EasyInvoice
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure backend environment variables

Create a `.env` file inside `backend/`:

```bash
touch .env
```

Then open `backend/.env` and add the following, filling in the values as described below:

```
DATABASE_URL="paste-your-connection-string-here"
FRONTEND_URL="http://localhost:5173"
JWT_SECRET="paste-a-random-secret-here"
ENCRYPTION_KEY="paste-a-random-secret-here"
```

### 4. Set up your database

You have two options:

**Option A — Create a free temporary Postgres database (no signup needed):**

```bash
npx create-db
```

This spins up a temporary hosted PostgreSQL database and prints a connection string. Copy it into `DATABASE_URL` in `backend/.env`.

**Option B — Use your own PostgreSQL database:**

Set `DATABASE_URL` in `backend/.env` to your own connection string, e.g.:

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE_NAME"
```

### 5. Run database migrations and generate Prisma client

From the `backend/` folder:

```bash
npx prisma migrate deploy
npx prisma generate
```

### 6. Start the backend server

```bash
npm run dev
```

The backend will run at `http://localhost:3000`.

### 7. Install frontend dependencies

Open a new terminal in the project root:

```bash
cd frontend
npm install
```

### 8. Configure frontend environment variables

Create a `.env` file inside `frontend/`:

```bash
echo 'VITE_API_URL="http://localhost:3000"' > .env
```

### 9. Start the frontend

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## Project Structure

```
backend/    # Express API, Prisma schema & migrations, PDF generation
frontend/   # React + Vite client app
```
