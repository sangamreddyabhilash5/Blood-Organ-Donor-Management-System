import "./TermsConditions.css";

function TermsConditions() {
  return (
    <div className="terms-container">

      <div className="terms-card">

        <h1>📜 Terms & Conditions</h1>

        <p className="terms-intro">
          Welcome to the Blood & Organ Donor Management System.
          By using this application, you agree to comply with the following
          terms and conditions. Please read them carefully before using
          our services.
        </p>

        <div className="terms-section">
          <h2>1. Eligibility</h2>

          <p>
            Users must provide accurate information during registration.
            Donors should meet the medical eligibility requirements for
            blood or organ donation.
          </p>
        </div>

        <div className="terms-section">
          <h2>2. User Responsibilities</h2>

          <ul>
            <li>Provide correct personal information.</li>
            <li>Maintain confidentiality of your account.</li>
            <li>Update your profile regularly.</li>
            <li>Use the platform responsibly.</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>3. Hospital Responsibilities</h2>

          <ul>
            <li>Register using valid hospital details.</li>
            <li>Create genuine blood requests only.</li>
            <li>Protect donor information.</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>4. Blood Requests</h2>

          <p>
            Emergency and regular blood requests must contain correct
            information. False or misleading requests are strictly prohibited.
          </p>
        </div>

        <div className="terms-section">
          <h2>5. Privacy</h2>

          <p>
            Personal information will only be used for donor management,
            emergency communication, and healthcare-related purposes.
          </p>
        </div>

        <div className="terms-section">
          <h2>6. Prohibited Activities</h2>

          <ul>
            <li>Providing false information.</li>
            <li>Misusing donor details.</li>
            <li>Attempting unauthorized system access.</li>
            <li>Creating fake emergency requests.</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>7. Account Suspension</h2>

          <p>
            Accounts violating these terms may be suspended or permanently
            removed without prior notice.
          </p>
        </div>

        <div className="terms-section">
          <h2>8. Changes to Terms</h2>

          <p>
            These Terms & Conditions may be updated periodically.
            Continued use of the application indicates acceptance of
            the latest version.
          </p>
        </div>

        <div className="terms-footer">
          <strong>Version:</strong> 1.0.0
        </div>

      </div>

    </div>
  );
}

export default TermsConditions;