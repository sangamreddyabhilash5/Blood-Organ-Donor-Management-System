// ======================================================
// Hospital Model
// Blood & Organ Donor Management System
// ======================================================

const mongoose = require("mongoose");



const hospitalSchema = new mongoose.Schema(

{

    // ==============================
    // Basic Information
    // ==============================


    hospitalName:{

        type:String,

        required:[
            true,
            "Hospital name is required"
        ],

        trim:true,

        minlength:3,

        maxlength:100

    },



    registrationNumber:{

        type:String,

        unique:true,

        sparse:true,

        trim:true

    },





    email:{

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
            "Invalid email format"
        ]

    },





    phone:{

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





    emergencyContact:{

        type:String,

        default:""

    },







    // ==============================
    // Address Details
    // ==============================


    address:{

        type:String,

        required:[
            true,
            "Address is required"
        ],

        trim:true

    },



    city:{

        type:String,

        default:"",

        trim:true

    },



    state:{

        type:String,

        default:"",

        trim:true

    },



    pincode:{

        type:String,

        default:"",

        trim:true

    },







    // ==============================
    // Location
    // ==============================


    latitude:{

        type:Number,

        default:null

    },



    longitude:{

        type:Number,

        default:null

    },







    // ==============================
    // Authentication
    // ==============================


    password:{

        type:String,

        required:[
            true,
            "Password is required"
        ],

        minlength:[
            6,
            "Password must contain minimum 6 characters"
        ],

        select:false

    },





    role:{

        type:String,

        enum:[

            "hospital"

        ],

        default:"hospital"

    },







    // ==============================
    // Profile
    // ==============================


    profileImage:{

        type:String,

        default:
        "https://via.placeholder.com/150"

    },







    // ==============================
    // Account Status
    // ==============================


    isVerified:{

        type:Boolean,

        default:false

    },



    status:{

        type:String,

        enum:[

            "Active",

            "Inactive"

        ],

        default:"Active"

    },







    // ==============================
    // Blood Bank Details
    // ==============================


    bloodBankAvailable:{

        type:Boolean,

        default:true

    },



    availableBloodGroups:[

        {

            type:String,

            uppercase:true,

            trim:true

        }

    ]



},


{

    timestamps:true

}

);




// No manual indexes required
// unique:true already creates indexes



module.exports = mongoose.model(
    "Hospital",
    hospitalSchema
);