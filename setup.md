# 🚀 LibraryOS Launch Setup Guide

Follow these steps to set up and launch the LibraryOS full-stack application.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Python 3.8+**
- **Node.js 18+**
- **npm** (comes with Node.js)

---

## 🛠 1. Backend Setup (FastAPI)

The backend is a lightweight FastAPI application that uses in-memory storage.

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
2.  **Create a virtual environment (recommended):**
    ```bash
    python3 -m venv venv
    ```
3.  **Activate the virtual environment:**
    -   *Linux/macOS:* `source venv/bin/activate`
    -   *Windows:* `venv\Scripts\activate`
4.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
5.  **Start the server:**
    ```bash
    uvicorn main:app --reload --port 8000
    ```
    > The API will be available at [http://localhost:8000](http://localhost:8000).  
    > View interactive docs at [http://localhost:8000/docs](http://localhost:8000/docs).

---

## ⚛️ 2. Frontend Setup (React + Vite)

The frontend is a modern React SPA powered by Vite.

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    > The application will be available at [http://localhost:3000](http://localhost:3000).

---

## 🔐 Default Credentials

Use these credentials to test the application:

### Admin Dashboard
- **Username:** `admin`
- **Password:** `admin123`

### Student Dashboard
- Use any of these **Student IDs**:
  - `101` (Alice Smith)
  - `102` (Bob Johnson)
  - `103` (Charlie Brown)
  - ...up to `110`

---

## 📦 Production Deployment (Optional)

If you wish to build the frontend for production:
1.  Run `npm run build` in the `frontend` directory.
2.  Serve the resulting `dist/` folder using a static file server or integrate it with your backend.

---

## ⚠️ Important Note
This application uses **in-memory storage**. All data modifications (new books, students, or borrow records) will be reset when the FastAPI server restarts. This is intentional for this prototype/demo version.
