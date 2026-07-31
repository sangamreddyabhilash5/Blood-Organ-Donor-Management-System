import { useState } from "react";
import "./AdminSettings.css";

function AdminSettings() {
  const [adminName, setAdminName] = useState("Administrator");
  const [email, setEmail] = useState("admin@blooddonor.com");
  const [phone, setPhone] = useState("9876543210");
  const [theme, setTheme] = useState("Light");
  const [notifications, setNotifications] = useState(true);

  const saveSettings = () => {
    alert("Settings Saved Successfully.");
  };

  return (
    <div className="settings-container">

      <div className="settings-card">

        <h1>⚙️ Admin Settings</h1>

        <p>
          Manage your profile and application settings.
        </p>

        <div className="section">

          <h2>👤 Profile Information</h2>

          <label>Admin Name</label>
          <input
            type="text"
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
          />

          <label>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Phone Number</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

        </div>

        <div className="section">

          <h2>🎨 Appearance</h2>

          <label>Theme</label>

          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option>Light</option>
            <option>Dark</option>
          </select>

        </div>

        <div className="section">

          <h2>🔔 Notifications</h2>

          <div className="toggle">

            <span>Receive Notifications</span>

            <input
              type="checkbox"
              checked={notifications}
              onChange={() =>
                setNotifications(!notifications)
              }
            />

          </div>

        </div>

        <div className="section">

          <h2>🔒 Change Password</h2>

          <input
            type="password"
            placeholder="Current Password"
          />

          <input
            type="password"
            placeholder="New Password"
          />

          <input
            type="password"
            placeholder="Confirm New Password"
          />

        </div>

        <button
          className="save-btn"
          onClick={saveSettings}
        >
          💾 Save Settings
        </button>

      </div>

    </div>
  );
}

export default AdminSettings;