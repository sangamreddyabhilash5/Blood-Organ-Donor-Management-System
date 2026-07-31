import "./Dashboard.css";
import { useNavigate, Link } from "react-router-dom";

function HospitalDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("hospital");
    navigate("/hospital-login");
  };

  return (
    <div className="dashboard">

      {/* Header */}
      <header className="dashboard-header">
        <h1>🏥 Hospital Dashboard</h1>
        <p>Manage blood requests, donors, and inventory efficiently.</p>
      </header>

      {/* Statistics */}
      <div className="stats">

        <div className="stat-card">
          <h2>125</h2>
          <p>Registered Donors</p>
        </div>

        <div className="stat-card">
          <h2>18</h2>
          <p>Emergency Requests</p>
        </div>

        <div className="stat-card">
          <h2>96</h2>
          <p>Blood Units Available</p>
        </div>

      </div>

      {/* Dashboard Cards */}
      <div className="cards">

        <div className="card">
          <h3>🔍 Search Donors</h3>
          <p>Find donors by blood group and location.</p>
          <button onClick={() => navigate("/search-donors")}>
            Search
          </button>
        </div>

        <div className="card">
          <h3>🚨 Emergency Requests</h3>
          <p>Create and manage urgent blood requests.</p>
          <button onClick={() => navigate("/emergency-requests")}>
            View Requests
          </button>
        </div>

        <div className="card">
          <h3>🩸 Blood Inventory</h3>
          <p>Monitor available blood units and stock.</p>
          <button onClick={() => navigate("/blood-inventory")}>
            Manage Inventory
          </button>
        </div>

        <div className="card">
          <h3>📜 Request History</h3>
          <p>View all previous blood request records.</p>
          <button onClick={() => navigate("/request-history")}>
            View History
          </button>
        </div>

        <div className="card">
          <h3>👨‍⚕️ Donor Management</h3>
          <p>View registered donors and their availability.</p>
          <button onClick={() => navigate("/manage-donors")}>
            Manage Donors
          </button>
        </div>

        <div className="card">
          <h3>⚙️ Hospital Profile</h3>
          <p>Update hospital information and contact details.</p>
          <button onClick={() => navigate("/hospital-profile")}>
            Edit Profile
          </button>
        </div>

        {/* Nearby Donors */}
        <div className="card">
          <h3>📍 Nearby Donors</h3>

          <p>
            Search nearby blood donors based on the hospital's current location.
          </p>

          <Link to="/nearby-donors">
            <button>Search Nearby</button>
          </Link>
        </div>

      </div>

      {/* Logout */}
      <div className="logout-section">
        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

    </div>
  );
}

export default HospitalDashboard;