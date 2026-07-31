// ======================================================
// Notification Controller
// Blood & Organ Donor Management System
// ======================================================


const mongoose = require("mongoose");

const Notification =
require("../models/Notification");




// ======================================================
// Debug Model Check
// ======================================================


console.log(
    "✅ Notification Model Loaded"
);


console.log(
    "Model Type:",
    typeof Notification
);


console.log(
    "Model Name:",
    Notification.modelName
);







// ======================================================
// GET DONOR NOTIFICATIONS
// GET /api/notifications/:donorId
// ======================================================


const getNotifications = async(req,res)=>{


    try{


        const donorId =
        req.params.donorId;



        // Validate MongoDB ID

        if(
            !mongoose.Types.ObjectId.isValid(donorId)
        ){


            return res.status(400).json({

                success:false,

                message:
                "Invalid Donor ID"

            });


        }





        const notifications =

        await Notification
        .find({

            donorId: donorId

        })

        .populate({

            path:"emergencyRequestId"

        })

        .sort({

            createdAt:-1

        });







        res.status(200).json({

            success:true,

            count:
            notifications.length,

            notifications

        });



    }


    catch(error){


        console.error(

            "❌ Fetch Notification Error:",

            error.message

        );



        res.status(500).json({

            success:false,

            message:
            error.message

        });



    }


};









// ======================================================
// MARK NOTIFICATION AS READ
// PUT /api/notifications/read/:id
// ======================================================


const markNotificationRead = async(req,res)=>{


    try{


        const notification =

        await Notification.findByIdAndUpdate(


            req.params.id,


            {

                status:"Read",

                respondedAt:
                new Date()

            },


            {

                new:true

            }


        );







        if(!notification){


            return res.status(404).json({

                success:false,

                message:
                "Notification not found"

            });


        }







        res.status(200).json({


            success:true,


            message:
            "Notification marked as read",


            notification


        });




    }


    catch(error){



        console.error(

            "❌ Mark Notification Error:",

            error.message

        );



        res.status(500).json({

            success:false,

            message:
            error.message

        });



    }


};









// ======================================================
// CREATE NOTIFICATION
// Used when emergency request is created
// ======================================================


const createNotification = async(req,res)=>{


    try{


        const notification =

        await Notification.create(req.body);



        res.status(201).json({

            success:true,

            message:
            "Notification Created Successfully",

            notification

        });



    }

    catch(error){


        console.error(

            "❌ Create Notification Error:",

            error.message

        );



        res.status(500).json({

            success:false,

            message:
            error.message

        });



    }


};









// ======================================================
// EXPORT
// ======================================================


module.exports = {


    getNotifications,

    markNotificationRead,

    createNotification


};