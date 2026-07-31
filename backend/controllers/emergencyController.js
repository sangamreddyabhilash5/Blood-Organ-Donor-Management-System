// ======================================================
// Emergency Request Controller
// Blood & Organ Donor Management System
// ======================================================


const EmergencyRequest =
require("../models/EmergencyRequest");


const Donor =
require("../models/Donor");


const Notification =
require("../models/Notification");




// ======================================================
// Create Emergency Request
// POST /api/emergency
// ======================================================


const createEmergencyRequest = async(req,res)=>{


try{


console.log(
"🚨 Emergency POST DATA:",
req.body
);



const {


patientName,

bloodGroup,

unitsRequired,

hospitalName,

city,

state,

contactNumber,

patientAge,

patientGender,

description,

requiredBefore


}=req.body;





if(

!patientName ||

!bloodGroup ||

!unitsRequired ||

!hospitalName ||

!city ||

!state ||

!contactNumber

){


return res.status(400).json({

success:false,

message:
"Please fill all required fields"

});


}







// Save Emergency Request


const emergency =

await EmergencyRequest.create({



patientName:
patientName.trim(),



bloodGroup,



unitsRequired:
Number(unitsRequired),



hospitalName:
hospitalName.trim(),



city:
city.trim(),



state:
state.trim(),



contactNumber,



patientAge:
patientAge
?
Number(patientAge)
:
null,



patientGender:
patientGender || "Male",



description:
description || "",



requiredBefore:
requiredBefore
?
new Date(requiredBefore)
:
new Date(),



status:
"Pending"



});







console.log(

"✅ Emergency Saved:",

emergency._id

);








// ======================================================
// Find Matching Donors
// ======================================================


const donors = await Donor.find({

bloodGroup:

bloodGroup,


city:

city,


availability:

true


});





console.log(

"🩸 Matching Donors:",

donors.length

);








// ======================================================
// Create Notifications
// ======================================================


for(const donor of donors){



await Notification.create({


donorId:

donor._id,


emergencyRequestId:

emergency._id,


bloodGroup,


city,


message:

`Emergency blood request for ${bloodGroup} in ${city}. Hospital: ${hospitalName}`



});



}








res.status(201).json({


success:true,


message:

"Emergency request created successfully",


matchedDonors:

donors.length,


request:

emergency



});




}


catch(error){


console.log(

"❌ Emergency Create Error:",

error.message

);



res.status(500).json({


success:false,


message:error.message



});


}


};









// ======================================================
// Get All Emergency Requests
// ======================================================


const getEmergencyRequests = async(req,res)=>{


try{


const requests =

await EmergencyRequest.find()

.sort({

createdAt:-1

});




res.json({


success:true,


count:

requests.length,


requests



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
// Get By ID
// ======================================================


const getEmergencyRequestById = async(req,res)=>{


try{


const request =

await EmergencyRequest.findById(

req.params.id

);



if(!request){


return res.status(404).json({


success:false,


message:

"Emergency request not found"



});


}



res.json({


success:true,


request



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
// Update Request
// ======================================================


const updateEmergencyRequest = async(req,res)=>{


try{


const request =

await EmergencyRequest.findByIdAndUpdate(

req.params.id,

req.body,

{

new:true,

runValidators:true

}

);



if(!request){


return res.status(404).json({


success:false,

message:

"Emergency request not found"


});


}



res.json({


success:true,


message:

"Emergency request updated successfully",


request



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
// Delete Request
// ======================================================


const deleteEmergencyRequest = async(req,res)=>{


try{


const request =

await EmergencyRequest.findByIdAndDelete(

req.params.id

);



if(!request){


return res.status(404).json({


success:false,


message:

"Emergency request not found"



});


}



res.json({


success:true,


message:

"Emergency request deleted successfully"



});


}

catch(error){


res.status(500).json({


success:false,


message:error.message


});


}


};









module.exports={


createEmergencyRequest,


getEmergencyRequests,


getEmergencyRequestById,


updateEmergencyRequest,


deleteEmergencyRequest


};