// ======================================================
// Axios Shared Configuration
// Blood & Organ Donor Management System
// ======================================================
// All API calls go through this single instance so that
// switching the backend URL only requires changing
// VITE_API_URL in the .env file.
// ======================================================

import axios from "axios";

// Reads from .env (local) or Vercel environment variables (production)
const BASE_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api";

const API = axios.create({
    baseURL: BASE_URL,
    timeout: 60000, // 60s — handles Render free tier cold start
});

// ======================================================
// Attach JWT Token Automatically
// ======================================================

API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ======================================================
// Global Response Error Handler
// ======================================================

API.interceptors.response.use(
    (response) => response,
    (error) => {
        // Token expired → force logout
        if (error.response?.status === 401) {
            const message = error.response?.data?.message || "";
            if (message.includes("expired") || message.includes("Invalid token")) {
                localStorage.clear();
                window.location.href = "/donor-login";
            }
        }
        return Promise.reject(error);
    }
);

export default API;
