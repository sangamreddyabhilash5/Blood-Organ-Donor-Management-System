import axios from "axios";

// ======================================================
// Emergency API
// Blood & Organ Donor Management System
// ======================================================

const API = axios.create({
  baseURL: "http://localhost:5000/api/emergency",
});

// ======================================================
// Add JWT Token Automatically
// ======================================================

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ======================================================
// Get All Emergency Requests
// ======================================================

export const getEmergencyRequests = async () => {
  try {
    const response = await API.get("/");
    return response.data;
  } catch (error) {
    console.error("Get Emergency Requests Error:", error);
    throw error;
  }
};

// ======================================================
// Create Emergency Request
// ======================================================

export const createEmergencyRequest = async (data) => {
  try {
    const response = await API.post("/", data);
    return response.data;
  } catch (error) {
    console.error("Create Emergency Request Error:", error);
    throw error;
  }
};

// ======================================================
// Get Emergency Request By ID
// ======================================================

export const getEmergencyRequestById = async (id) => {
  try {
    const response = await API.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Get Emergency Request Error:", error);
    throw error;
  }
};

// ======================================================
// Update Emergency Request
// ======================================================

export const updateEmergencyRequest = async (id, data) => {
  try {
    const response = await API.put(`/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Update Emergency Request Error:", error);
    throw error;
  }
};

// ======================================================
// Delete Emergency Request
// ======================================================

export const deleteEmergencyRequest = async (id) => {
  try {
    const response = await API.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Delete Emergency Request Error:", error);
    throw error;
  }
};

export default API;