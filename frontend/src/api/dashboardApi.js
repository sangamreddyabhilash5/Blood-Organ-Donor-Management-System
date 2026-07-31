import axios from "axios";


// ======================================================
// Donor API Configuration
// Blood & Organ Donor Management System
// ======================================================


const API = axios.create({

    baseURL: "http://localhost:5000/api",

});



// ======================================================
// Add JWT Token Automatically
// ======================================================

API.interceptors.request.use((config) => {


    const token = localStorage.getItem("token");


    if (token) {

        config.headers.Authorization =
            `Bearer ${token}`;

    }


    return config;

});




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