import { useState } from "react";
import "./AdminProfile.css";

function AdminProfile() {
  const [admin] = useState({
    name: "Administrator",
    email: "admin@blooddonor.com",
    phone: "+91 9876543210",
    role: "System Administrator",
    joined: "01 January 2026",
    status: "Active",
    address: "Visakhapatnam, Andhra Pradesh",
  });

  const editProfile = () => {
    alert("Edit Profile feature will be available soon.");
  };

  return (
    <div className="profile-container">

      <div className="profile-card">

        <div className="profile-header">

          <div className="profile-avatar">
            👨‍💼
          </div>

          <h1>{admin.name}</h1>

          <p>{admin.role}</p>

        </div>

        <div className="profile-details">

          <div className="detail-box">
            <h3>📧 Email</h3>
            <p>{admin.email}</p>
          </div>

          <div className="detail-box">
            <h3>📱 Phone</h3>
            <p>{admin.phone}</p>
          </div>

          <div className="detail-box">
            <h3>📍 Address</h3>
            <p>{admin.address}</p>
          </div>

          <div className="detail-box">
            <h3>📅 Joined</h3>
            <p>{admin.joined}</p>
          </div>

          <div className="detail-box">
            <h3>🟢 Status</h3>
            <span className="status">
              {admin.status}
            </span>
          </div>

        </div>

        <button
          className="edit-btn"
          onClick={editProfile}
        >
          ✏️ Edit Profile
        </button>

      </div>

    </div>
  );
}

export default AdminProfile;