// ======================================================
// Emergency Blood Request
// Blood & Organ Donor Management System
// ======================================================

import { useState } from "react";
import axios from "axios";
import "./EmergencyRequests.css";


function EmergencyRequests() {


  const initialForm = {

    patientName:"",
    bloodGroup:"",
    unitsRequired:"",
    hospitalName:"",
    city:"",
    state:"",
    contactNumber:"",
    patientAge:"",
    patientGender:"Male",
    description:""

  };



  const [request,setRequest] =
  useState(initialForm);



  const [loading,setLoading] =
  useState(false);






  const handleChange=(e)=>{


    setRequest({

      ...request,

      [e.target.name]:
      e.target.value

    });


  };









  const handleSubmit=async(e)=>{


    e.preventDefault();



    if(loading)
      return;





    // Phone Validation

    if(!/^[6-9]\d{9}$/.test(request.contactNumber)){


      alert(
        "Enter valid 10 digit mobile number"
      );


      return;


    }





    if(Number(request.unitsRequired)<1){


      alert(
        "Units must be greater than zero"
      );


      return;


    }






    try{


      setLoading(true);




      const payload={



        patientName:
        request.patientName.trim(),



        bloodGroup:
        request.bloodGroup,



        unitsRequired:
        Number(request.unitsRequired),



        hospitalName:
        request.hospitalName.trim(),



        city:
        request.city.trim(),



        state:
        request.state.trim(),



        contactNumber:
        request.contactNumber,



        patientAge:
        request.patientAge
        ?
        Number(request.patientAge)
        :
        null,



        patientGender:
        request.patientGender,



        description:
        request.description.trim()



      };





      console.log(
        "Sending Emergency Data:",
        payload
      );








      const response =
      await axios.post(


        "http://127.0.0.1:5000/api/emergency",


        payload,


        {

          headers:{

            "Content-Type":
            "application/json"

          }

        }


      );






      console.log(
        "Emergency Response:",
        response.data
      );




      alert(

        response.data.message ||

        "Emergency Request Submitted"

      );





      setRequest(initialForm);



    }

    catch(error){



      console.log(

        "Emergency Error:",

        error.response?.data ||

        error.message

      );




      alert(


        error.response?.data?.message ||

        "Server connection failed"



      );



    }



    finally{


      setLoading(false);


    }


  };









  return (


    <div className="request-page">


      <div className="request-box">



        <h1>
          🚨 Emergency Blood Request
        </h1>




        <form onSubmit={handleSubmit}>




          <input

          type="text"

          name="patientName"

          placeholder="Patient Name"

          value={request.patientName}

          onChange={handleChange}

          required

          />







          <select

          name="bloodGroup"

          value={request.bloodGroup}

          onChange={handleChange}

          required

          >

          <option value="">
          Select Blood Group
          </option>

          <option>A+</option>
          <option>A-</option>
          <option>B+</option>
          <option>B-</option>
          <option>AB+</option>
          <option>AB-</option>
          <option>O+</option>
          <option>O-</option>


          </select>







          <input

          type="number"

          name="unitsRequired"

          placeholder="Required Units"

          value={request.unitsRequired}

          onChange={handleChange}

          min="1"

          required

          />







          <input

          type="text"

          name="hospitalName"

          placeholder="Hospital Name"

          value={request.hospitalName}

          onChange={handleChange}

          required

          />








          <input

          type="text"

          name="city"

          placeholder="City"

          value={request.city}

          onChange={handleChange}

          required

          />







          <input

          type="text"

          name="state"

          placeholder="State"

          value={request.state}

          onChange={handleChange}

          required

          />







          <input

          type="tel"

          name="contactNumber"

          placeholder="Contact Number"

          value={request.contactNumber}

          maxLength="10"

          onChange={handleChange}

          required

          />







          <input

          type="number"

          name="patientAge"

          placeholder="Patient Age"

          value={request.patientAge}

          onChange={handleChange}

          />








          <select

          name="patientGender"

          value={request.patientGender}

          onChange={handleChange}

          >

          <option>Male</option>

          <option>Female</option>

          <option>Other</option>

          </select>







          <textarea

          name="description"

          placeholder="Additional Information"

          value={request.description}

          onChange={handleChange}

          />








          <button

          type="submit"

          disabled={loading}

          >

          {

          loading

          ?

          "Submitting..."

          :

          "Submit Request"

          }


          </button>





        </form>


      </div>


    </div>


  );


}


export default EmergencyRequests;