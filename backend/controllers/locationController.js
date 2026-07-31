const Donor = require("../models/Donor");


// ======================================
// Calculate Distance (KM)
// ======================================

function calculateDistance(
    lat1,
    lon1,
    lat2,
    lon2
) {

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







// ======================================
// Get Nearby Donors
// ======================================

const getNearbyDonors = async(req,res)=>{


    try{


        const {
            lat,
            lng
        } = req.query;




        if(!lat || !lng){

            return res.status(400).json({

                success:false,

                message:
                "Latitude and longitude required"

            });

        }




        const userLat = Number(lat);

        const userLng = Number(lng);






        // Get all donors

        const donors = await Donor.find()

        .select("-password");







        const nearbyDonors = donors.map((donor)=>{


            let distance = 0;



            // Calculate only if location exists

            if(

                donor.location &&

                donor.location.latitude &&

                donor.location.longitude

            ){


                distance =
                calculateDistance(

                    userLat,

                    userLng,

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







        // Sort by nearest

        nearbyDonors.sort(

            (a,b)=>

            Number(a.distance)

            -

            Number(b.distance)

        );







        res.status(200).json({

            success:true,

            count:
            nearbyDonors.length,

            donors:
            nearbyDonors

        });





    }

    catch(error){


        console.log(
            "Nearby Donor Error:",
            error
        );



        res.status(500).json({

            success:false,

            message:
            error.message

        });


    }


};






module.exports = {

    getNearbyDonors

};