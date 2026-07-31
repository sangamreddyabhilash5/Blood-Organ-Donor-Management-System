import "./DonationHistory.css";

function DonationHistory() {

  const donations = [
    {
      id: 1,
      type: "Blood Donation",
      date: "15 July 2026",
      bloodGroup: "O+",
      hospital: "Apollo Hospital",
      location: "Visakhapatnam",
      units: 2,
      status: "Completed",
    },
    {
      id: 2,
      type: "Blood Donation",
      date: "10 March 2026",
      bloodGroup: "A+",
      hospital: "KGH Hospital",
      location: "Visakhapatnam",
      units: 1,
      status: "Completed",
    },
  ];


  return (
    <div className="donation-container">

      <div className="donation-card">

        <h1>📜 Donation History</h1>

        <p>
          Track your previous blood donations and contribution history.
        </p>


        {/* Donation Summary */}

        <div className="summary-box">
          <h3>Total Donations</h3>
          <span>{donations.length}</span>
        </div>


        {donations.length > 0 ? (

          <div className="history-box">

            {donations.map((donation) => (

              <div 
                className="history-item" 
                key={donation.id}
              >

                <h3>
                  🩸 {donation.type}
                </h3>


                <div className="donation-details">

                  <p>
                    <b>📅 Date:</b> {donation.date}
                  </p>

                  <p>
                    <b>🩸 Blood Group:</b> {donation.bloodGroup}
                  </p>

                  <p>
                    <b>🏥 Hospital:</b> {donation.hospital}
                  </p>

                  <p>
                    <b>📍 Location:</b> {donation.location}
                  </p>

                  <p>
                    <b>🧪 Units Donated:</b> {donation.units}
                  </p>

                </div>


                <span className="status">
                  ✅ {donation.status}
                </span>


              </div>

            ))}

          </div>

        ) : (

          <div className="empty-history">

            <h3>No Donations Yet</h3>

            <p>
              Your completed donation records will appear here.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default DonationHistory;