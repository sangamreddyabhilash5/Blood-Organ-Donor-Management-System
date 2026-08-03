# 🩸 Blood & Organ Donor Management System (BloodConnect)

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-blue.svg)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-18.x-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646cff.svg)](https://vitejs.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A full-stack, life-saving platform designed to seamlessly connect blood and organ donors with patients and hospitals in urgent need. Built with real-time location matching, automated OTP verification via Nodemailer, emergency broadcasts, and serverless Vercel deployment support.

---

## 📌 Table of Contents

- [✨ Key Features](#-key-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📂 Project Structure](#-project-structure)
- [🚀 Quick Start Guide](#-quick-start-guide)
  - [Prerequisites](#prerequisites)
  - [1. Clone Repository](#1-clone-repository)
  - [2. Backend Setup](#2-backend-setup)
  - [3. Frontend Setup](#3-frontend-setup)
- [🔐 Environment Variables](#-environment-variables)
- [🌐 Vercel Deployment Guide](#-vercel-deployment-guide)
- [📡 API Reference](#-api-reference)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)

---

## ✨ Key Features

### 🩸 Donor Management
- **User Registration & OTP Verification:** Secure signup requiring real-time 6-digit email OTP verification powered by Nodemailer.
- **Dual Donor Support:** Register as a **Blood Donor** (with blood group selection) or **Organ Donor** (kidney, liver, heart, eyes, etc.).
- **Geolocation Matching:** Captures latitude & longitude to locate the nearest active donors during medical emergencies.
- **Donor Dashboard:** View donation history, personal details, and update availability status.

### 🏥 Hospital Portal
- **Hospital Accounts:** Dedicated authentication for verified medical centers.
- **Urgent Blood Requests:** Hospitals can post urgent blood and organ requests with specified urgency levels.
- **Inventory & Patient Matching:** Match required blood types directly against active registered donors.

### 🚨 Emergency System & Reports
- **Emergency Broadcasts:** Public-facing emergency request feed visible to registered donors.
- **PDF Report Generation:** Instant PDF report generation for donation history and emergency logs using `PDFKit`.
- **Automated Alerts:** Email notifications dispatched to matching donors during urgent calls.

---

## 🛠️ Tech Stack

| Domain | Technologies Used |
| :--- | :--- |
| **Frontend** | React.js (Vite), React Router DOM, Axios, Custom CSS & Glassmorphism UI |
| **Backend** | Node.js, Express.js (v5.x), Mongoose |
| **Database** | MongoDB Atlas (Cloud Relational Documents) |
| **Authentication & Security** | JSON Web Tokens (JWT), Bcrypt.js, CORS preflight handling |
| **Services & Tools** | Nodemailer (Gmail SMTP), PDFKit (PDF Generation), Dotenv |
| **Deployment** | Vercel (Frontend Static Host + Backend Serverless Functions) |

---

## 📂 Project Structure

```text
Blood-Organ-Donor-System/
├── backend/
│   ├── config/
│   │   └── db.js                # MongoDB connection handler & serverless caching
│   ├── controllers/
│   │   ├── donorController.js   # Donor Auth, OTP, Dashboard & Matching logic
│   │   ├── hospitalController.js# Hospital Auth & Emergency Requests
│   │   ├── emergencyController.js# Emergency Request Feed
│   │   ├── profileController.js # Profile Management
│   │   └── reportController.js   # PDF Report generation
│   ├── models/                  # Mongoose Schemas (Donor, Hospital, Emergency, etc.)
│   ├── routes/                  # Express Router Modules
│   ├── utils/                   # Nodemailer OTP helper
│   ├── server.js                # Express App entrypoint & Vercel export handler
│   ├── vercel.json              # Backend Vercel serverless rewrite rules
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/                 # Axios configuration & API interceptors
│   │   ├── components/          # Navigation, Protected Routes, Footer
│   │   ├── pages/               # React UI Pages (Register, Login, Dashboard, etc.)
│   │   ├── App.jsx              # Main React Router Component
│   │   └── main.jsx
│   ├── vercel.json              # Frontend Vercel rewrites & SPA proxy
│   └── package.json
└── README.md
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)
- A MongoDB Atlas connection URI
- A Gmail account with an **App Password** for Nodemailer OTP emails

---

### 1. Clone Repository

```bash
git clone https://github.com/sangamreddyabhilash5/Blood-Organ-Donor-Management-System.git
cd Blood-Organ-Donor-Management-System
```

---

### 2. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create environment file
# Windows (PowerShell):
New-Item -ItemType File -Name .env
# Linux / macOS:
touch .env
```

Add the following variables to `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/blooddonor?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_digit_app_password
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

Start the backend development server:

```bash
npm run dev
```

---

### 3. Frontend Setup

Open a second terminal window:

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Create environment file
# Windows (PowerShell):
New-Item -ItemType File -Name .env
# Linux / macOS:
touch .env
```

Add the following variable to `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend Vite development server:

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser! 🚀

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

| Variable | Required | Description |
| :--- | :---: | :--- |
| `PORT` | Yes | Local server port (Default: `5000`) |
| `MONGO_URI` | Yes | MongoDB Atlas connection string |
| `JWT_SECRET` | Yes | Secret key used for signing JWT tokens |
| `EMAIL_USER` | Yes | Gmail address for sending OTP emails |
| `EMAIL_PASS` | Yes | 16-character Gmail App Password |
| `FRONTEND_URL` | Yes | Allowed frontend origin for CORS |
| `NODE_ENV` | Yes | Environment mode (`development` / `production`) |

### Frontend (`frontend/.env`)

| Variable | Required | Description |
| :--- | :---: | :--- |
| `VITE_API_URL` | Yes | Base URL for API requests (`http://localhost:5000/api` or Vercel URL) |

---

## 🌐 Vercel Deployment Guide

This project is optimized for deployment on **Vercel** with separate projects for Frontend and Backend.

### 1. Backend Deployment (Vercel)
1. Import repository on [Vercel](https://vercel.com/new).
2. Set **Root Directory** to `backend`.
3. Add all Environment Variables (`MONGO_URI`, `JWT_SECRET`, `EMAIL_USER`, `EMAIL_PASS`, `FRONTEND_URL`, `NODE_ENV=production`).
4. Ensure **MongoDB Atlas Network Access** includes `0.0.0.0/0` (Allow Access from Anywhere).

### 2. Frontend Deployment (Vercel)
1. Import repository as a new Vercel project.
2. Set **Root Directory** to `frontend`.
3. Set Environment Variable `VITE_API_URL` to `https://<your-backend-project>.vercel.app/api`.
4. Deploy! `frontend/vercel.json` automatically proxies API calls to your live backend.

---

## 📡 API Reference

### Donor Routes (`/api/donors`)
- `POST /api/donors/register` — Register donor & trigger email OTP
- `POST /api/donors/verify-otp` — Verify 6-digit OTP code
- `POST /api/donors/login` — Donor authentication (returns JWT token)
- `GET  /api/donors/dashboard/:id` — Get donor profile & stats
- `GET  /api/donors/nearby` — Get active donors sorted by proximity

### Hospital Routes (`/api/hospitals` / `/api/hospital`)
- `POST /api/hospitals/register` — Hospital account registration
- `POST /api/hospitals/login` — Hospital authentication

### Emergency Routes (`/api/emergency`)
- `POST /api/emergency/create` — Create urgent blood request
- `GET  /api/emergency/list` — List active emergency broadcasts

---

## 🤝 Contributing

Contributions are warmly welcome! If you'd like to improve BloodConnect:

1. Fork the Project (`https://github.com/sangamreddyabhilash5/Blood-Organ-Donor-Management-System/fork`)
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Made with ❤️ to help save lives!
</p>
