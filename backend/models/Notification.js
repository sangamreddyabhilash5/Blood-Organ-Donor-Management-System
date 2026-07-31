// ======================================================
// Notification Model
// Blood & Organ Donor Management System
// ======================================================


const mongoose = require("mongoose");




// ======================================================
// Schema
// ======================================================


const notificationSchema = new mongoose.Schema(

{

    donorId: {

        type: mongoose.Schema.Types.ObjectId,

        ref:"Donor",

        required:true

    },


    emergencyRequestId: {

        type: mongoose.Schema.Types.ObjectId,

        ref:"EmergencyRequest",

        required:true

    },


    message: {

        type:String,

        required:true,

        trim:true

    },


    bloodGroup: {

        type:String,

        required:true,

        uppercase:true,

        trim:true

    },


    city: {

        type:String,

        required:true,

        trim:true

    },


    status: {

        type:String,

        enum:[

            "Unread",
            "Read",
            "Accepted",
            "Rejected"

        ],

        default:"Unread"

    },


    respondedAt: {

        type:Date,

        default:null

    }


},


{

    timestamps:true,

    collection:"notifications"

}

);







// ======================================================
// Prevent Model Overwrite
// ======================================================


const Notification =

mongoose.models.Notification ||

mongoose.model(

    "Notification",

    notificationSchema

);







// Debug

console.log(
    "Notification Model Exported:",
    typeof Notification
);


module.exports = Notification;   