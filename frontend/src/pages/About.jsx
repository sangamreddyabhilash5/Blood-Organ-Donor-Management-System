import "./About.css";

function About() {
  return (
    <div className="about-container">

      <div className="about-card">

        <h1>🩸 About Blood & Organ Donor Management System</h1>

        <p className="intro">
          The Blood & Organ Donor Management System is a web application
          designed to connect blood donors, hospitals, and patients on a
          single platform. It helps people find suitable blood donors
          quickly during emergencies while maintaining secure donor
          information.
        </p>

        <div className="about-section">
          <h2>🎯 Our Mission</h2>
          <p>
            To save lives by making blood and organ donation simple,
            fast, and accessible for everyone through digital technology.
          </p>
        </div>

        <div className="about-section">
          <h2>🌍 Our Vision</h2>
          <p>
            To build a trusted healthcare platform where every patient
            can quickly find the right donor during emergencies.
          </p>
        </div>

        <div className="about-section">
          <h2>⭐ Key Features</h2>

          <ul>
            <li>✔ Donor Registration & Login</li>
            <li>✔ Hospital Registration & Login</li>
            <li>✔ Blood Request Management</li>
            <li>✔ Emergency Blood Requests</li>
            <li>✔ Search Blood Donors</li>
            <li>✔ Donation History</li>
            <li>✔ Donor Availability Status</li>
            <li>✔ Notifications & Alerts</li>
            <li>✔ Secure Authentication</li>
            <li>✔ Responsive User Interface</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>❤️ Why Donate Blood?</h2>

          <p>
            Every blood donation can help save multiple lives. Your
            contribution supports accident victims, surgery patients,
            cancer patients, and people with chronic illnesses.
          </p>
        </div>

        <div className="about-section">
          <h2>👨‍💻 Developed By</h2>

          <p>
            Department of Information Technology
          </p>

          <p>
            Vignan Institute of Information Technology
          </p>

          <p>
            Blood & Organ Donor Management System
          </p>
        </div>

        <div className="version-box">
          <strong>Version :</strong> 1.0.0
        </div>

      </div>

    </div>
  );
}

export default About;