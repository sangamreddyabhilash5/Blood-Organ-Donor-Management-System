import API from "./axiosConfig";

// ======================================================
// Emergency API
// Blood & Organ Donor Management System
// ======================================================
// Uses shared Axios instance — base URL comes from
// VITE_API_URL environment variable.
// Calls are prefixed with /emergency below.
// ======================================================


// ======================================================
// Get All Emergency Requests
// ======================================================

export const getEmergencyRequests = async () => {
  try {
    const response = await API.get("/emergency");
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
    const response = await API.post("/emergency", data);
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
    const response = await API.get(`/emergency/${id}`);
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
    const response = await API.put(`/emergency/${id}`, data);
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
    const response = await API.delete(`/emergency/${id}`);
    return response.data;
  } catch (error) {
    console.error("Delete Emergency Request Error:", error);
    throw error;
  }
};

export default API;