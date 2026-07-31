// ======================================================
// Professional Hospital Donor Report Generator
// Blood & Organ Donor Management System
// ======================================================


const PDFDocument = require("pdfkit");
const Donor = require("../models/Donor");




// ======================================================
// Generate Donor PDF Report
// ======================================================


const generateDonorReport = async(req,res)=>{


try{


const donors = await Donor.find()
.select("-password")
.sort({
    createdAt:-1
});



if(donors.length===0){

return res.status(404).json({

success:false,

message:"No donor records available"

});

}




const doc = new PDFDocument({

size:"A4",

margin:40,

bufferPages:true

});





res.setHeader(
"Content-Type",
"application/pdf"
);


res.setHeader(

"Content-Disposition",

"attachment; filename=Hospital_Donor_Report.pdf"

);



doc.pipe(res);





// ======================================================
// HEADER
// ======================================================


doc.rect(0,0,595,90)
.fill("#b71c1c");



doc
.fillColor("#ffffff")
.fontSize(24)
.text(

"CITY CARE HOSPITAL",

40,
25,
{
align:"center"
}

);



doc
.fontSize(12)
.text(

"Blood Bank Management System",

40,
55,
{
align:"center"
}

);




doc.moveDown(4);




// ======================================================
// REPORT INFO
// ======================================================


doc
.fillColor("#000")
.fontSize(11);



doc.text(
`Report ID       : HOSP-${Date.now()}`
);


doc.text(
`Generated Date  : ${new Date().toLocaleString()}`
);


doc.text(
"Department      : Blood Bank Department"
);


doc.text(
"Report Type     : Donor Availability Report"
);



doc.moveDown(2);







// ======================================================
// SUMMARY CARDS
// ======================================================


const total = donors.length;


const available =
donors.filter(
d=>d.availability
).length;



const unavailable =
total-available;



function card(x,title,value,color){


doc.rect(x,230,150,70)
.fill(color);



doc
.fillColor("#ffffff")
.fontSize(11)
.text(
title,
x+10,
245
);


doc
.fontSize(22)
.text(
value.toString(),
x+10,
270
);


}



card(
50,
"Total Donors",
total,
"#1565c0"
);



card(
220,
"Available",
available,
"#2e7d32"
);



card(
390,
"Unavailable",
unavailable,
"#c62828"
);




doc.moveDown(8);





// ======================================================
// BLOOD GROUP REPORT
// ======================================================


doc
.fillColor("#b71c1c")
.fontSize(16)
.text(
"Blood Group Availability"
);



doc.moveDown();



const groups={};



donors.forEach(d=>{


groups[d.bloodGroup] =
(groups[d.bloodGroup]||0)+1;


});




doc
.fillColor("#000")
.fontSize(11);



Object.entries(groups)
.forEach(([group,count])=>{


doc.text(

`${group}  :  ${count} Donors`

);


});





doc.moveDown(2);






// ======================================================
// DONOR TABLE
// ======================================================



doc
.fillColor("#b71c1c")
.fontSize(16)
.text(
"Registered Donor Details"
);



doc.moveDown();




let tableTop = doc.y;



// Header


doc
.rect(
40,
tableTop,
520,
25
)
.fill("#b71c1c");



doc
.fillColor("#ffffff")
.fontSize(10);



doc.text("Name",50,tableTop+8);

doc.text("Blood",180,tableTop+8);

doc.text("Phone",250,tableTop+8);

doc.text("City",370,tableTop+8);

doc.text("Status",470,tableTop+8);



let y =
tableTop+35;



donors.forEach((donor)=>{



if(y>720){

doc.addPage();

y=50;

}




doc
.fillColor("#000")
.fontSize(10);



doc.text(
donor.fullName.substring(0,18),
50,
y
);



doc.text(
donor.bloodGroup,
180,
y
);



doc.text(
donor.phone,
250,
y
);



doc.text(
donor.city || "-",
370,
y
);



doc.text(

donor.availability
?"Available"
:"Inactive",

470,
y

);



doc
.strokeColor("#cccccc")
.moveTo(
40,
y+15
)
.lineTo(
560,
y+15
)
.stroke();



y+=30;



});








// ======================================================
// AUTHORIZATION
// ======================================================


doc.addPage();



doc
.fillColor("#b71c1c")
.fontSize(18)
.text(
"Hospital Authorization"
);



doc.moveDown(3);



doc
.fillColor("#000")
.fontSize(12)
.text(

"Verified By : ______________________"

);



doc.moveDown();


doc.text(

"Designation : Blood Bank Administrator"

);



doc.moveDown(4);



doc.text(

"Hospital Seal & Signature"

);



doc.moveDown(3);



doc.text(

"____________________________"

);





// ======================================================
// FOOTER
// ======================================================


const range =
doc.bufferedPageRange();



for(let i=0;i<range.count;i++){


doc.switchToPage(i);



doc
.fontSize(9)
.fillColor("#777")
.text(

`Page ${i+1} of ${range.count} | City Care Hospital Blood Bank`,

40,
780,
{
align:"center"
}

);


}





doc.end();



}

catch(error){


console.log(error);



res.status(500).json({

success:false,

message:"PDF Generation Failed"

});


}


};





module.exports={
generateDonorReport
};