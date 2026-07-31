import API from "./axiosConfig";


// ======================================================
// Donor API Configuration
// Blood & Organ Donor Management System
// ======================================================
// Uses shared Axios instance — base URL comes from
// VITE_API_URL environment variable.
// ======================================================










// ======================================================
// Get Donor Dashboard Data
// ======================================================

export const getDonorDashboard = async (id) => {

    try {

        const response = await API.get(
            `/donors/dashboard/${id}`
        );

        return response.data;


    } catch (error) {

        console.error(
            "Dashboard Fetch Error:",
            error
        );

        throw error;

    }

};




// ======================================================
// Get Donor Profile
// ======================================================

export const getDonorProfile = async (id) => {

    try {

        const response = await API.get(
            `/profile/${id}`
        );

        return response.data;


    } catch (error) {

        console.error(
            "Profile Fetch Error:",
            error
        );

        throw error;

    }

};




// ======================================================
// Update Donor Profile
// ======================================================

export const updateDonorProfile = async (id, data) => {

    try {

        const response = await API.put(
            `/profile/${id}`,
            data
        );

        return response.data;


    } catch (error) {

        console.error(
            "Profile Update Error:",
            error
        );

        throw error;

    }

};



export default API;