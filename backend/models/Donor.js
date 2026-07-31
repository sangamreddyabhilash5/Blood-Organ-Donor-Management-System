// ======================================================
// Donor Model
// Blood & Organ Donor Management System
// ======================================================

const mongoose = require("mongoose");


const donorSchema = new mongoose.Schema(

{

    // ======================================================
    // Personal Details
    // ======================================================


    fullName: {

        type:String,

        required:[
            true,
            "Full name is required"
        ],

        trim:true,

        minlength:[
            3,
            "Full name must be at least 3 characters"
        ],

        maxlength:[
            50,
            "Full name cannot exceed 50 characters"
        ]

    },




    email: {

        type:String,

        required:[
            true,
            "Email is required"
        ],

        unique:true,

        lowercase:true,

        trim:true,

        match:[
            /^\S+@\S+\.\S+$/,
            "Please enter a valid email address"
        ]

    },





    phone: {

        type:String,

        required:[
            true,
            "Phone number is required"
        ],

        unique:true,

        trim:true,

        match:[
            /^[6-9]\d{9}$/,
            "Enter valid 10 digit mobile number"
        ]

    },





    password: {

        type:String,

        required:[
            true,
            "Password is required"
        ],

        minlength:[
            6,
            "Password must be minimum 6 characters"
        ],

        select:false

    },







    // ======================================================
    // Donor Information
    // ======================================================


    bloodGroup: {

        type:String,

        required:[
            true,
            "Blood group is required"
        ],

        enum:[

            "A+",
            "A-",
            "B+",
            "B-",
            "AB+",
            "AB-",
            "O+",
            "O-"

        ]

    },





    age: {

        type:Number,

        required:[
            true,
            "Age is required"
        ],

        min:[
            18,
            "Minimum age is 18"
        ],

        max:[
            65,
            "Maximum age is 65"
        ]

    },





    gender: {

        type:String,

        required:[
            true,
            "Gender is required"
        ],

        enum:[

            "Male",
            "Female",
            "Other"

        ]

    },





    city: {

        type:String,

        required:[
            true,
            "City is required"
        ],

        trim:true

    },





    state: {

        type:String,

        required:[
            true,
            "State is required"
        ],

        trim:true

    },







    // ======================================================
    // GPS Location
    // ======================================================


    location:{


        latitude:{

            type:Number,

            default:null

        },


        longitude:{

            type:Number,

            default:null

        }


    },







    // ======================================================
    // Donor Type
    // ======================================================


    donorType: {

        type:String,

        enum:[

            "Blood",

            "Organ",

            "Both",

            "Blood Donor",

            "Organ Donor"

        ],

        default:"Blood"

    },







    organs:{

        type:[String],

        default:[]

    },







    // ======================================================
    // Dashboard Information
    // ======================================================


    availability:{

        type:Boolean,

        default:true

    },




    totalDonations:{

        type:Number,

        default:0

    },




    pendingRequests:{

        type:Number,

        default:0

    },




    lastDonationDate:{

        type:Date,

        default:null

    },







    // ======================================================
    // Profile
    // ======================================================


    profileImage:{

        type:String,

        default:
        "https://via.placeholder.com/150"

    }



},


{

    timestamps:true,

    versionKey:false

}

);







// ======================================================
// Indexes
// ======================================================


donorSchema.index({
    bloodGroup:1
});


donorSchema.index({
    city:1
});


donorSchema.index({
    state:1
});


donorSchema.index({
    availability:1
});


donorSchema.index({
    location:"2dsphere"
});







module.exports = mongoose.model(
    "Donor",
    donorSchema
);