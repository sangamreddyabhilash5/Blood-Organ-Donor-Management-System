import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Profile.css";

function Profile() {

  const navigate = useNavigate();

  const donorId = localStorage.getItem("donorId");
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    bloodGroup: "",
    age: "",
    gender: "",
    city: "",
    state: "",
  });


  useEffect(() => {

    if (!donorId || !token) {
      alert("Please login first.");
      navigate("/donor-login");
      return;
    }

    fetchProfile();

  }, []);



  // ===========================
  // Fetch Donor Profile
  // ===========================

  const fetchProfile = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/donors/${donorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      setFormData(res.data.donor);


    } catch (error) {

      console.error(
        "Fetch Profile Error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Unable to load profile"
      );

    } finally {

      setLoading(false);

    }

  };



  // ===========================
  // Handle Input Change
  // ===========================

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };



  // ===========================
  // Update Profile
  // ===========================

  const updateProfile = async (e) => {

    e.preventDefault();


    try {


      const res = await axios.put(

        `http://localhost:5000/api/donors/${donorId}`,

        formData,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

      );


      alert(res.data.message);


      // Update local storage data

      localStorage.setItem(
        "donor",
        JSON.stringify(res.data.donor)
      );


    } catch (error) {


      console.error(
        "Update Profile Error:",
        error
      );


      alert(

        error.response?.data?.message ||

        "Profile Update Failed"

      );


    }

  };



  if (loading) {

    return (

      <h2
        style={{
          textAlign:"center",
          marginTop:"50px"
        }}
      >

        Loading...

      </h2>

    );

  }



  return (

    <div className="profile-page">

      <div className="profile-card">


        <h1>
          👤 My Profile
        </h1>



        <form onSubmit={updateProfile}>


          <input

            type="text"

            name="fullName"

            placeholder="Full Name"

            value={formData.fullName}

            onChange={handleChange}

            required

          />



          <input

            type="email"

            name="email"

            placeholder="Email"

            value={formData.email}

            onChange={handleChange}

            required

          />



          <input

            type="text"

            name="phone"

            placeholder="Phone Number"

            value={formData.phone}

            onChange={handleChange}

            required

          />



          <select

            name="bloodGroup"

            value={formData.bloodGroup}

            onChange={handleChange}

            required

          >

            <option value="">
              Select Blood Group
            </option>

            <option value="A+">A+</option>

            <option value="A-">A-</option>

            <option value="B+">B+</option>

            <option value="B-">B-</option>

            <option value="AB+">AB+</option>

            <option value="AB-">AB-</option>

            <option value="O+">O+</option>

            <option value="O-">O-</option>


          </select>




          <input

            type="number"

            name="age"

            placeholder="Age"

            value={formData.age}

            onChange={handleChange}

            min="18"

            max="65"

            required

          />



          <select

            name="gender"

            value={formData.gender}

            onChange={handleChange}

            required

          >

            <option value="">
              Select Gender
            </option>

            <option value="Male">
              Male
            </option>

            <option value="Female">
              Female
            </option>

            <option value="Other">
              Other
            </option>


          </select>




          <input

            type="text"

            name="city"

            placeholder="City"

            value={formData.city}

            onChange={handleChange}

            required

          />



          <input

            type="text"

            name="state"

            placeholder="State"

            value={formData.state}

            onChange={handleChange}

            required

          />



          <button type="submit">

            Update Profile

          </button>



        </form>


      </div>


    </div>

  );

}


export default Profile;