// ======================================================
// Hospital Routes
// Blood & Organ Donor Management System
// ======================================================


const express = require("express");

const router = express.Router();



const {

    registerHospital,

    verifyHospitalOTP,

    loginHospital,

    getHospitals,

    getHospitalById,

    updateHospital,

    deleteHospital


} = require("../controllers/hospitalController");





console.log(
    "✅ hospitalRoutes.js Loaded Successfully"
);








// ======================================================
// AUTH ROUTES
// ======================================================


// Register Hospital - Send OTP

// POST /api/hospitals/register

router.post(

    "/register",

    registerHospital

);







// Verify Hospital OTP

// POST /api/hospitals/verify-otp

router.post(

    "/verify-otp",

    verifyHospitalOTP

);







// Hospital Login

// POST /api/hospitals/login

router.post(

    "/login",

    loginHospital

);









// ======================================================
// HOSPITAL MANAGEMENT ROUTES
// ======================================================





// Get All Hospitals

// GET /api/hospitals

router.get(

    "/",

    getHospitals

);








// Get Hospital By ID

// GET /api/hospitals/:id

router.get(

    "/:id",

    getHospitalById

);








// Update Hospital

// PUT /api/hospitals/:id

router.put(

    "/:id",

    updateHospital

);








// Delete Hospital

// DELETE /api/hospitals/:id

router.delete(

    "/:id",

    deleteHospital

);







module.exports = router;