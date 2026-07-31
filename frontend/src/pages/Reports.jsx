import "./Reports.css";

function Reports() {

  const reportData = [
    {
      title: "Total Donors",
      value: 125,
      icon: "🩸",
      color: "red",
    },
    {
      title: "Hospitals",
      value: 18,
      icon: "🏥",
      color: "blue",
    },
    {
      title: "Blood Requests",
      value: 42,
      icon: "📋",
      color: "orange",
    },
    {
      title: "Emergency Requests",
      value: 9,
      icon: "🚨",
      color: "purple",
    },
  ];

  const bloodGroups = [
    { group: "O+", donors: 35 },
    { group: "A+", donors: 28 },
    { group: "B+", donors: 22 },
    { group: "AB+", donors: 12 },
    { group: "O-", donors: 10 },
    { group: "A-", donors: 8 },
    { group: "B-", donors: 6 },
    { group: "AB-", donors: 4 },
  ];

  return (
    <div className="reports-container">

      <div className="reports-header">
        <h1>📊 Reports & Analytics</h1>
        <p>
          Monitor donor registrations, hospitals, blood requests and emergency statistics.
        </p>
      </div>

      <div className="stats-grid">

        {reportData.map((item, index) => (

          <div className={`stat-card ${item.color}`} key={index}>

            <div className="icon">
              {item.icon}
            </div>

            <h2>{item.value}</h2>

            <h3>{item.title}</h3>

          </div>

        ))}

      </div>

      <div className="analytics-grid">

        <div className="chart-card">

          <h2>🩸 Blood Group Availability</h2>

          {bloodGroups.map((item) => (

            <div className="blood-row" key={item.group}>

              <span>{item.group}</span>

              <div className="progress">

                <div
                  className="progress-fill"
                  style={{ width: `${item.donors * 2}%` }}
                ></div>

              </div>

              <span>{item.donors}</span>

            </div>

          ))}

        </div>

        <div className="summary-card">

          <h2>📈 Monthly Summary</h2>

          <ul>
            <li>✅ New Donors : 18</li>
            <li>✅ Blood Donations : 46</li>
            <li>✅ Emergency Cases : 7</li>
            <li>✅ Hospitals Joined : 3</li>
            <li>✅ Successful Matches : 39</li>
          </ul>

          <button>
            Download Report
          </button>

        </div>

      </div>

    </div>
  );
}

export default Reports;