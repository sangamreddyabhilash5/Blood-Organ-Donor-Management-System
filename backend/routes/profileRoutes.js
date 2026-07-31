// ======================================================
// Profile Routes
// Blood & Organ Donor Management System
// ======================================================

const express = require("express");

const router = express.Router();


// Import Controller Functions

const {
    getProfile,
    updateProfile
} = require("../controllers/profileController");


// Import Authentication Middleware

const { protect } = require("../middleware/authMiddleware");




// ======================================================
// PROFILE ROUTES
// ======================================================



// @route   GET /api/profile/:id
// @desc    Get Donor Profile
// @access  Private

router.get(
    "/:id",
    protect,
    getProfile
);





// @route   PUT /api/profile/:id
// @desc    Update Donor Profile
// @access  Private

router.put(
    "/:id",
    protect,
    updateProfile
);






// Export Router

module.exports = router;