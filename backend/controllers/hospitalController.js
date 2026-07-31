// ======================================================
// Hospital Controller
// Blood & Organ Donor Management System
// ======================================================


const Hospital = require("../models/Hospital");

const Otp = require("../models/Otp");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const otpGenerator = require("otp-generator");

const sendOTP = require("../utils/sendOTP");




// ======================================================
// Register Hospital (Send OTP)
// ======================================================


const registerHospital = async (req, res) => {


    try {


        const {

            hospitalName,

            email,

            phone,

            address,

            password


        } = req.body;



        if(

            !hospitalName ||

            !email ||

            !phone ||

            !address ||

            !password

        ){

            return res.status(400).json({

                success:false,

                message:"Please fill all fields"

            });

        }



        const emailExists =

        await Hospital.findOne({

            email:email.toLowerCase().trim()

        });



        const phoneExists =

        await Hospital.findOne({

            phone:phone.trim()

        });



        if(emailExists || phoneExists){


            return res.status(400).json({

                success:false,

                message:"Email or Phone already registered"

            });


        }



        // Remove previous OTP

        await Otp.deleteMany({

            email:email.toLowerCase().trim()

        });




        const otp =

        otpGenerator.generate(6, {


            upperCaseAlphabets:false,

            lowerCaseAlphabets:false,

            specialChars:false,

            digits:true


        });





        await Otp.create({

            email:email.toLowerCase().trim(),

            otp,


            userType:"hospital",



            hospitalData:{


                hospitalName:hospitalName.trim(),


                email:email.toLowerCase().trim(),


                phone:phone.trim(),


                address:address.trim(),


                password,


                role:"hospital"


            },



            expiresAt:

            new Date(

                Date.now() + 5 * 60 * 1000

            )


        });





        await sendOTP(

            email,

            otp

        );





        return res.status(200).json({


            success:true,


            message:"OTP sent to hospital email"


        });




    }

    catch(error){


        console.log(

            "Hospital Register Error:",

            error

        );


        res.status(500).json({


            success:false,


            message:error.message


        });


    }


};
// ======================================================
// Verify Hospital OTP & Complete Registration
// ======================================================


const verifyHospitalOTP = async (req, res) => {


    try {


        const {

            email,

            otp


        } = req.body;



        if(!email || !otp){


            return res.status(400).json({


                success:false,


                message:"Email and OTP are required"


            });


        }




        const otpData =

        await Otp.findOne({


            email:email.toLowerCase(),


            otp,


            userType:"hospital"


        });





        if(!otpData){


            return res.status(400).json({


                success:false,


                message:"Invalid OTP"


            });


        }






        if(new Date() > otpData.expiresAt){



            await Otp.deleteOne({


                _id:otpData._id


            });




            return res.status(400).json({


                success:false,


                message:"OTP Expired"


            });



        }







        const hospitalData =

        otpData.hospitalData;





        hospitalData.password =

        await bcrypt.hash(


            hospitalData.password,


            10


        );






        const hospital =

        await Hospital.create(

            hospitalData

        );







        await Otp.deleteOne({


            _id:otpData._id


        });







        const hospitalResponse =

        hospital.toObject();



        delete hospitalResponse.password;







        return res.status(201).json({


            success:true,


            message:"Hospital Registered Successfully",


            hospital:hospitalResponse



        });






    }

    catch(error){



        console.log(

            "Verify Hospital OTP Error:",

            error

        );



        res.status(500).json({



            success:false,


            message:error.message



        });



    }


};








// ======================================================
// Login Hospital
// ======================================================


const loginHospital = async(req,res)=>{


    try{


        const {


            email,


            password



        } = req.body;





        if(!email || !password){



            return res.status(400).json({



                success:false,


                message:"Email and Password required"



            });



        }







        const hospital =

        await Hospital.findOne({


            email:email.toLowerCase().trim()



        })

        .select("+password");







        if(!hospital){


            return res.status(401).json({



                success:false,


                message:"Invalid Email or Password"



            });



        }







        const passwordMatch =

        await bcrypt.compare(


            password,


            hospital.password



        );






        if(!passwordMatch){



            return res.status(401).json({



                success:false,


                message:"Invalid Email or Password"



            });



        }









        const token =

        jwt.sign(



            {


                id:hospital._id,


                email:hospital.email,


                role:"hospital"



            },



            process.env.JWT_SECRET,



            {


                expiresIn:

                process.env.JWT_EXPIRE || "7d"



            }



        );








        const hospitalData =

        hospital.toObject();



        delete hospitalData.password;







        res.status(200).json({



            success:true,



            message:"Login Successful",



            token,



            hospital:hospitalData



        });




    }

    catch(error){



        console.log(

            "Hospital Login Error:",

            error

        );



        res.status(500).json({



            success:false,


            message:error.message



        });



    }


};
// ======================================================
// Get All Hospitals
// ======================================================


const getHospitals = async(req,res)=>{


    try{


        const hospitals =

        await Hospital.find()

        .select("-password")

        .sort({

            createdAt:-1

        });





        res.json({


            success:true,


            count:hospitals.length,


            hospitals



        });



    }

    catch(error){



        res.status(500).json({


            success:false,


            message:error.message



        });



    }


};








// ======================================================
// Get Hospital By ID
// ======================================================


const getHospitalById = async(req,res)=>{


    try{


        const hospital =

        await Hospital.findById(req.params.id)

        .select("-password");







        if(!hospital){


            return res.status(404).json({


                success:false,


                message:"Hospital not found"



            });



        }







        res.json({



            success:true,


            hospital



        });





    }

    catch(error){



        res.status(500).json({



            success:false,


            message:error.message



        });



    }


};









// ======================================================
// Update Hospital
// ======================================================


const updateHospital = async(req,res)=>{


    try{


        const {


            hospitalName,


            phone,


            address,


            profileImage



        } = req.body;







        const updatedHospital =

        await Hospital.findByIdAndUpdate(


            req.params.id,


            {



                hospitalName,


                phone,


                address,


                profileImage



            },


            {


                new:true,


                runValidators:true



            }


        )

        .select("-password");








        if(!updatedHospital){



            return res.status(404).json({



                success:false,


                message:"Hospital not found"



            });



        }








        res.json({



            success:true,



            message:"Hospital Updated Successfully",



            hospital:updatedHospital



        });





    }

    catch(error){



        res.status(500).json({



            success:false,


            message:error.message



        });



    }


};









// ======================================================
// Delete Hospital
// ======================================================


const deleteHospital = async(req,res)=>{


    try{


        const hospital =

        await Hospital.findByIdAndDelete(


            req.params.id


        );







        if(!hospital){


            return res.status(404).json({


                success:false,


                message:"Hospital not found"



            });



        }







        res.json({



            success:true,


            message:"Hospital Deleted Successfully"



        });





    }

    catch(error){



        res.status(500).json({



            success:false,


            message:error.message



        });



    }


};









// ======================================================
// Export Controller Functions
// ======================================================


module.exports = {


    registerHospital,


    verifyHospitalOTP,


    loginHospital,


    getHospitals,


    getHospitalById,


    updateHospital,


    deleteHospital



};