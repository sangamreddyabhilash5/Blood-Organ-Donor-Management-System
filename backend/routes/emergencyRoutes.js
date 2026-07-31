// ======================================================
// Emergency Request Routes
// Blood & Organ Donor Management System
// ======================================================

const express = require("express");

const router = express.Router();

console.log("✅ emergencyRoutes.js Loaded Successfully");


// ======================================================
// Controller Import
// ======================================================

const {

    createEmergencyRequest,
    getEmergencyRequests,
    getEmergencyRequestById,
    updateEmergencyRequest,
    deleteEmergencyRequest

} = require("../controllers/emergencyController");




// ======================================================
// Test Route
// ======================================================

router.get("/test",(req,res)=>{


    res.status(200).json({

        success:true,

        message:
        "🚑 Emergency API Working Successfully"

    });


});





// ======================================================
// CREATE EMERGENCY REQUEST
// POST /api/emergency
// ======================================================

router.post("/",async(req,res)=>{


    console.log(
        "🚨 Emergency POST Request Received"
    );


    console.log(
        "Body:",
        req.body
    );


    createEmergencyRequest(req,res);


});







// ======================================================
// GET ALL REQUESTS
// GET /api/emergency
// ======================================================

router.get("/",(req,res)=>{


    console.log(
        "📄 Fetching Emergency Requests"
    );


    getEmergencyRequests(req,res);


});








// ======================================================
// GET SINGLE REQUEST
// GET /api/emergency/:id
// ======================================================

router.get("/:id",

    getEmergencyRequestById

);







// ======================================================
// UPDATE REQUEST
// PUT /api/emergency/:id
// ======================================================

router.put("/:id",

    updateEmergencyRequest

);








// ======================================================
// DELETE REQUEST
// DELETE /api/emergency/:id
// ======================================================

router.delete("/:id",

    deleteEmergencyRequest

);






module.exports = router;