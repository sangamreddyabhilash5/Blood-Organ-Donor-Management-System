// ======================================================
// Donor Controller
// Blood & Organ Donor Management System
// ======================================================


const otpGenerator = require("otp-generator");

const sendOTP = require("../utils/sendOTP");

const Otp = require("../models/Otp");

const Donor = require("../models/Donor");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");




// ======================================================
// Calculate Distance (KM)
// ======================================================

function calculateDistance(
    lat1,
    lon1,
    lat2,
    lon2
){

    const R = 6371;


    const dLat =
        (lat2 - lat1) *
        Math.PI / 180;


    const dLon =
        (lon2 - lon1) *
        Math.PI / 180;



    const a =

        Math.sin(dLat / 2) *
        Math.sin(dLat / 2)

        +

        Math.cos(lat1 * Math.PI / 180) *

        Math.cos(lat2 * Math.PI / 180)

        *

        Math.sin(dLon / 2) *

        Math.sin(dLon / 2);



    const c =

        2 *

        Math.atan2(

            Math.sqrt(a),

            Math.sqrt(1 - a)

        );



    return R * c;

}







// ======================================================
// Register Donor (Send OTP)
// ======================================================


const registerDonor = async(req,res)=>{


    try{


        const {


            fullName,

            email,

            phone,

            password,

            bloodGroup,

            age,

            gender,

            city,

            state,

            donorType,

            organs,

            location



        } = req.body;






        if(

            !fullName ||

            !email ||

            !phone ||

            !password ||

            !bloodGroup ||

            !age ||

            !gender ||

            !city ||

            !state

        ){


            return res.status(400).json({


                success:false,


                message:"Please fill all required fields"



            });


        }








        const existingDonor = await Donor.findOne({


            $or:[


                {


                    email:
                    email.trim().toLowerCase()


                },


                {


                    phone:
                    phone.trim()


                }


            ]


        });







        if(existingDonor){


            return res.status(400).json({


                success:false,


                message:"Email or Phone already registered"



            });


        }








        await Otp.deleteMany({


            email:
            email.trim().toLowerCase(),


            userType:"donor"



        });









        const otp = otpGenerator.generate(

            6,

            {

                upperCaseAlphabets:false,

                lowerCaseAlphabets:false,

                specialChars:false,

                digits:true

            }

        );









        await Otp.create({


            email:
            email.trim().toLowerCase(),



            otp,



            userType:"donor",




            expiresAt:


            new Date(

                Date.now()
                +
                5 * 60 * 1000

            ),






            donorData:{



                fullName:
                fullName.trim(),



                email:
                email.trim().toLowerCase(),



                phone:
                phone.trim(),



                password,



                bloodGroup,



                age:
                Number(age),



                gender,



                city:
                city.trim(),



                state:
                state.trim(),



                donorType:
                donorType || "Blood",



                organs:
                organs || [],



                availability:true,



                totalDonations:0,



                pendingRequests:0,



                role:"donor",





                location:{


                    latitude:
                    location?.latitude || 0,


                    longitude:
                    location?.longitude || 0



                }



            }



        });








        console.log(`[Register] Attempting to send OTP to ${email}`);
        try {
            await sendOTP(
                email,
                otp
            );
            console.log(`[Register] OTP successfully sent to ${email}`);
        } catch (emailError) {
            console.error(`[Register] Failed to send OTP email:`, emailError);
            return res.status(500).json({
                success: false,
                message: "Failed to send OTP email. Check backend email configuration."
            });
        }







        return res.status(200).json({


            success:true,


            message:
            "OTP sent to email. Please verify to complete registration"



        });





    }


    catch(error){


        return res.status(500).json({


            success:false,


            message:error.message



        });


    }


};
// ======================================================
// Verify OTP & Complete Registration
// ======================================================


const verifyOTP = async(req,res)=>{


    try{


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







        const otpData = await Otp.findOne({


            email:
            email.toLowerCase(),


            otp,


            userType:"donor"



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







        const donorData = otpData.donorData;






        donorData.password = await bcrypt.hash(


            donorData.password,


            10


        );







        const donor = await Donor.create(


            donorData


        );







        await Otp.deleteOne({


            _id:otpData._id



        });








        const donorResponse = donor.toObject();



        delete donorResponse.password;








        return res.status(201).json({


            success:true,


            message:"Registration Successful",


            donor:donorResponse



        });





    }


    catch(error){


        console.log(error);



        return res.status(500).json({


            success:false,


            message:error.message



        });



    }


};









// ======================================================
// Login Donor
// ======================================================


const loginDonor = async(req,res)=>{


    try{


        const email =

        req.body.email
        .trim()
        .toLowerCase();




        const password =

        req.body.password
        .trim();








        const donor = await Donor.findOne({


            email



        })


        .select("+password");







        if(!donor){



            return res.status(401).json({


                success:false,


                message:"Invalid Email or Password"



            });


        }







        const match = await bcrypt.compare(


            password,


            donor.password



        );







        if(!match){



            return res.status(401).json({


                success:false,


                message:"Invalid Email or Password"



            });



        }







        const token = jwt.sign(


            {


                id:donor._id,


                email:donor.email,


                role:"donor"



            },



            process.env.JWT_SECRET,



            {


                expiresIn:"7d"



            }



        );







        const donorData = donor.toObject();



        delete donorData.password;







        return res.json({



            success:true,



            message:"Login Successful",



            token,



            donor:donorData



        });




    }


    catch(error){


        return res.status(500).json({


            success:false,


            message:error.message



        });


    }


};
// ======================================================
// Get Donor Dashboard
// ======================================================


const getDonorDashboard = async(req,res)=>{


    try{


        const donor = await Donor.findById(

            req.params.id

        )

        .select("-password");







        if(!donor){


            return res.status(404).json({


                success:false,


                message:"Donor not found"



            });


        }







        return res.json({


            success:true,


            donor,



            totalDonations:

            donor.totalDonations || 0,



            pendingRequests:

            donor.pendingRequests || 0,



            availability:

            donor.availability



        });





    }


    catch(error){


        return res.status(500).json({


            success:false,


            message:error.message



        });


    }


};









// ======================================================
// Get All Donors
// ======================================================


const getAllDonors = async(req,res)=>{


    try{


        const donors = await Donor.find()


        .select("-password")


        .sort({


            createdAt:-1



        });








        return res.json({


            success:true,


            count:donors.length,


            donors



        });





    }


    catch(error){


        return res.status(500).json({


            success:false,


            message:error.message



        });


    }


};
// ======================================================
// Get Nearby Donors
// ======================================================


const getNearbyDonors = async(req,res)=>{


    try{


        const {


            lat,


            lng



        } = req.query;






        if(!lat || !lng){


            return res.status(400).json({


                success:false,


                message:"Latitude and longitude required"



            });


        }








        const donors = await Donor.find()


        .select("-password");









        const nearbyDonors = donors.map((donor)=>{


            let distance = 0;





            if(

                donor.location &&

                donor.location.latitude &&

                donor.location.longitude

            ){


                distance = calculateDistance(



                    Number(lat),



                    Number(lng),



                    donor.location.latitude,



                    donor.location.longitude



                );


            }








            return {


                ...donor.toObject(),



                distance:

                distance.toFixed(2)



            };



        });








        nearbyDonors.sort(


            (a,b)=>


            Number(a.distance) -

            Number(b.distance)



        );








        return res.json({


            success:true,


            count:nearbyDonors.length,


            donors:nearbyDonors



        });





    }


    catch(error){



        return res.status(500).json({



            success:false,



            message:error.message



        });



    }


};











// ======================================================
// Get Donor By ID
// ======================================================


const getDonorById = async(req,res)=>{


    try{


        const donor = await Donor.findById(

            req.params.id

        )

        .select("-password");








        if(!donor){


            return res.status(404).json({



                success:false,



                message:"Donor not found"



            });



        }







        return res.json({



            success:true,



            donor



        });





    }


    catch(error){


        return res.status(500).json({



            success:false,



            message:error.message



        });



    }


};











// ======================================================
// Update Donor
// ======================================================


const updateDonor = async(req,res)=>{


    try{


        const donor = await Donor.findByIdAndUpdate(


            req.params.id,


            req.body,


            {


                new:true,


                runValidators:true



            }



        )

        .select("-password");








        if(!donor){


            return res.status(404).json({



                success:false,



                message:"Donor not found"



            });



        }







        return res.json({



            success:true,



            message:"Donor Updated Successfully",



            donor



        });





    }


    catch(error){


        return res.status(500).json({



            success:false,



            message:error.message



        });



    }


};
// ======================================================
// Delete Donor
// ======================================================


const deleteDonor = async(req,res)=>{


    try{


        const donor = await Donor.findByIdAndDelete(


            req.params.id



        );






        if(!donor){


            return res.status(404).json({



                success:false,



                message:"Donor not found"



            });



        }







        return res.json({



            success:true,



            message:"Donor Deleted Successfully"



        });





    }


    catch(error){


        return res.status(500).json({



            success:false,



            message:error.message



        });



    }


};











// ======================================================
// Export Controller Functions
// ======================================================


module.exports = {


    registerDonor,


    verifyOTP,


    loginDonor,


    getDonorDashboard,


    getAllDonors,


    getNearbyDonors,


    getDonorById,


    updateDonor,


    deleteDonor



};