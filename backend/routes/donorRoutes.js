// ======================================================
// Donor Routes
// Blood & Organ Donor Management System
// ======================================================

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// ======================================================
// Import Donor Controller
// ======================================================

const {
    registerDonor,
    verifyOTP,
    loginDonor,
    getDonorDashboard,
    getAllDonors,
    getNearbyDonors,
    getDonorById,
    updateDonor,
    deleteDonor
} = require("../controllers/donorController");

// ======================================================
// Validate MongoDB ID
// ======================================================

const validateId = (req, res, next) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {

        return res.status(400).json({
            success: false,
            message: "Invalid Donor ID"
        });

    }

    next();

};

// ======================================================
// AUTH ROUTES
// ======================================================

// Register Donor (Send OTP)
router.post(
    "/register",
    registerDonor
);

// Verify OTP
router.post(
    "/verify-otp",
    verifyOTP
);

// Login
router.post(
    "/login",
    loginDonor
);

// ======================================================
// DASHBOARD
// ======================================================

router.get(
    "/dashboard/:id",
    validateId,
    getDonorDashboard
);

// ======================================================
// NEARBY DONORS
// ======================================================

router.get(
    "/nearby",
    getNearbyDonors
);

// ======================================================
// DONOR CRUD
// ======================================================

// Get All Donors
router.get(
    "/",
    getAllDonors
);

// Get Donor By ID
router.get(
    "/:id",
    validateId,
    getDonorById
);

// Update Donor
router.put(
    "/:id",
    validateId,
    updateDonor
);

// Delete Donor
router.delete(
    "/:id",
    validateId,
    deleteDonor
);

// ======================================================
// Export
// ======================================================

module.exports = router;