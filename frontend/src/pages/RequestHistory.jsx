import "./RequestHistory.css";

function RequestHistory() {
  const requests = [
    {
      id: 1,
      patient: "Ramesh",
      blood: "O+",
      hospital: "Apollo",
      status: "Completed",
    },
    {
      id: 2,
      patient: "Suresh",
      blood: "A+",
      hospital: "KGH",
      status: "Pending",
    },
    {
      id: 3,
      patient: "Mahesh",
      blood: "B-",
      hospital: "Care",
      status: "Completed",
    },
  ];

  return (
    <div className="page-container">
      <h1>📜 Request History</h1>

      <div className="history-container">
        {requests.length > 0 ? (
          requests.map((item) => (
            <div className="history-card" key={item.id}>
              <h3>{item.patient}</h3>

              <p>
                <strong>Blood Group:</strong> {item.blood}
              </p>

              <p>
                <strong>Hospital:</strong> {item.hospital}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`status ${
                    item.status === "Completed"
                      ? "completed"
                      : "pending"
                  }`}
                >
                  {item.status}
                </span>
              </p>
            </div>
          ))
        ) : (
          <p className="no-data">No request history available.</p>
        )}
      </div>
    </div>
  );
}

export default RequestHistory;