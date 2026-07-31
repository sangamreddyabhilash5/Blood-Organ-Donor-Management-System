import "./PrivacyPolicy.css";

function PrivacyPolicy() {
  return (
    <div className="privacy-container">

      <div className="privacy-card">

        <h1>🔒 Privacy Policy</h1>

        <p className="privacy-intro">
          Your privacy is important to us. This Privacy Policy explains how
          the Blood & Organ Donor Management System collects, uses, stores,
          and protects your personal information while using this platform.
        </p>

        <div className="privacy-section">
          <h2>1. Information We Collect</h2>

          <ul>
            <li>Full Name</li>
            <li>Email Address</li>
            <li>Phone Number</li>
            <li>Blood Group</li>
            <li>City and State</li>
            <li>Donation History</li>
            <li>Hospital Details (if applicable)</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2>2. How We Use Your Information</h2>

          <ul>
            <li>Verify donor and hospital accounts.</li>
            <li>Match donors with blood requests.</li>
            <li>Send emergency notifications.</li>
            <li>Maintain donation history.</li>
            <li>Improve application performance and security.</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2>3. Data Security</h2>

          <p>
            We use secure authentication and encrypted communication where
            applicable to protect your personal information from unauthorized
            access, modification, or disclosure.
          </p>
        </div>

        <div className="privacy-section">
          <h2>4. Information Sharing</h2>

          <p>
            Personal information is shared only when necessary to facilitate
            blood donation between donors, hospitals, and recipients.
            We do not sell or share personal information with third parties
            for marketing purposes.
          </p>
        </div>

        <div className="privacy-section">
          <h2>5. User Responsibilities</h2>

          <ul>
            <li>Provide accurate information.</li>
            <li>Keep login credentials confidential.</li>
            <li>Update your profile regularly.</li>
            <li>Report unauthorized account activity immediately.</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2>6. Your Rights</h2>

          <ul>
            <li>View your personal information.</li>
            <li>Update your profile details.</li>
            <li>Delete your account.</li>
            <li>Request correction of incorrect information.</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2>7. Cookies & Session Data</h2>

          <p>
            This application may use session storage or authentication tokens
            to keep users logged in securely and improve the user experience.
          </p>
        </div>

        <div className="privacy-section">
          <h2>8. Policy Updates</h2>

          <p>
            This Privacy Policy may be updated from time to time.
            Continued use of the application indicates acceptance of any
            revised policy.
          </p>
        </div>

        <div className="privacy-footer">
          <strong>Last Updated:</strong> July 2026
        </div>

      </div>

    </div>
  );
}

export default PrivacyPolicy;