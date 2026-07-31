import { useState } from "react";
import "./HospitalProfile.css";

function HospitalProfile() {
  const [hospital, setHospital] = useState({
    name: "Apollo Hospital",
    email: "apollo@gmail.com",
    phone: "9876543210",
    address: "Visakhapatnam",
  });

  const handleChange = (e) => {
    setHospital({
      ...hospital,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile Updated Successfully!");
    console.log(hospital);
  };

  return (
    <div className="page-container">
      <h1>🏥 Hospital Profile</h1>

      <form className="profile-form" onSubmit={handleSubmit}>

        <label>Hospital Name</label>
        <input
          type="text"
          name="name"
          value={hospital.name}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={hospital.email}
          onChange={handleChange}
        />

        <label>Phone Number</label>
        <input
          type="text"
          name="phone"
          value={hospital.phone}
          onChange={handleChange}
        />

        <label>Address</label>
        <textarea
          name="address"
          rows="4"
          value={hospital.address}
          onChange={handleChange}
        ></textarea>

        <button type="submit">
          Save Changes
        </button>

      </form>
    </div>
  );
}

export default HospitalProfile;