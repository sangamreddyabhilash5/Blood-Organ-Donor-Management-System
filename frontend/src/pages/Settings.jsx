import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css";

function Settings() {
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    fullName: "Abhilash",
    email: "abhilash@example.com",
    phone: "9876543210",
    notifications: true,
    availability: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    alert("Settings updated successfully.");
    // Connect PUT API here
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/donor-login");
  };

  return (
    <div className="settings-container">

      <div className="settings-card">

        <h1>⚙️ Account Settings</h1>

        <p>
          Manage your account information and application preferences.
        </p>

        <div className="settings-section">

          <h2>👤 Personal Information</h2>

          <input
            type="text"
            name="fullName"
            value={settings.fullName}
            onChange={handleChange}
            placeholder="Full Name"
          />

          <input
            type="email"
            name="email"
            value={settings.email}
            onChange={handleChange}
            placeholder="Email Address"
          />

          <input
            type="text"
            name="phone"
            value={settings.phone}
            onChange={handleChange}
            placeholder="Phone Number"
          />

        </div>

        <div className="settings-section">

          <h2>🔔 Preferences</h2>

          <label className="switch-row">
            <span>Receive Notifications</span>

            <input
              type="checkbox"
              name="notifications"
              checked={settings.notifications}
              onChange={handleChange}
            />
          </label>

          <label className="switch-row">
            <span>Available for Donation</span>

            <input
              type="checkbox"
              name="availability"
              checked={settings.availability}
              onChange={handleChange}
            />
          </label>

        </div>

        <div className="button-group">

          <button
            className="save-btn"
            onClick={handleSave}
          >
            Save Changes
          </button>

          <button
            className="password-btn"
            onClick={() => navigate("/change-password")}
          >
            Change Password
          </button>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}

export default Settings;