// ======================================================
// Report Routes
// Blood & Organ Donor Management System
// ======================================================


const express = require("express");

const router = express.Router();


// Debug Check

console.log("✅ reportRoutes.js Loaded Successfully");



// ======================================================
// Controller
// ======================================================

const {
    generateDonorReport

} = require("../controllers/reportController");





// ======================================================
// Test Route
// URL:
// http://localhost:5000/api/reports
// ======================================================


router.get(
    "/",
    (req,res)=>{

        res.status(200).json({

            success:true,

            message:
            "📄 Report API Working Successfully"

        });

    }
);







// ======================================================
// Donor PDF Report
// URL:
// http://localhost:5000/api/reports/donors
// ======================================================


router.get(

    "/donors",

    generateDonorReport

);







// ======================================================
// Export Router
// ======================================================


module.exports = router;