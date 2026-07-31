// ======================================================
// Notification Routes
// Blood & Organ Donor Management System
// ======================================================


const express = require("express");

const router = express.Router();




// Controller

const {

    getNotifications,

    markNotificationRead,

    createNotification


} = require("../controllers/notificationController");





console.log(
    "✅ notificationRoutes.js Loaded Successfully"
);









// ======================================================
// TEST API
// GET /api/notifications/test
// ======================================================


router.get(

    "/test",

    (req,res)=>{


        res.status(200).json({


            success:true,


            message:
            "Notification API Working Successfully"


        });


    }

);









// ======================================================
// CREATE NOTIFICATION
// POST /api/notifications
// ======================================================


router.post(

    "/",

    createNotification

);









// ======================================================
// GET DONOR NOTIFICATIONS
// GET /api/notifications/:donorId
// ======================================================


router.get(

    "/:donorId",

    getNotifications

);









// ======================================================
// MARK NOTIFICATION AS READ
// PUT /api/notifications/read/:id
// ======================================================


router.put(

    "/read/:id",

    markNotificationRead

);



module.exports = router;