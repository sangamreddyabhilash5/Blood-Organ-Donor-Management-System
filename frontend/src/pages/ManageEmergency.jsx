import { useState } from "react";
import "./ManageEmergency.css";

function ManageEmergency() {
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const [requests, setRequests] = useState([
    {
      id: 1,
      patient: "Rahul Kumar",
      bloodGroup: "O+",
      hospital: "Apollo Hospital",
      city: "Visakhapatnam",
      units: 2,
      priority: "Critical",
      status: "Pending",
    },
    {
      id: 2,
      patient: "Priya Sharma",
      bloodGroup: "A-",
      hospital: "KGH Hospital",
      city: "Visakhapatnam",
      units: 1,
      priority: "High",
      status: "Pending",
    },
    {
      id: 3,
      patient: "Ramesh",
      bloodGroup: "B+",
      hospital: "CARE Hospital",
      city: "Hyderabad",
      units: 3,
      priority: "Medium",
      status: "Pending",
    },
    {
      id: 4,
      patient: "Sneha",
      bloodGroup: "AB+",
      hospital: "Rainbow Hospital",
      city: "Vijayawada",
      units: 2,
      priority: "Critical",
      status: "Resolved",
    },
  ]);

  const resolveRequest = (id) => {
    setRequests(
      requests.map((request) =>
        request.id === id
          ? { ...request, status: "Resolved" }
          : request
      )
    );
  };

  const deleteRequest = (id) => {
    if (window.confirm("Delete this emergency request?")) {
      setRequests(requests.filter((request) => request.id !== id));
    }
  };

  const filteredRequests = requests.filter((request) => {
    const matchSearch = request.patient
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchPriority =
      priorityFilter === "All" ||
      request.priority === priorityFilter;

    return matchSearch && matchPriority;
  });

  return (
    <div className="emergency-container">

      <div className="emergency-card">

        <h1>🚨 Manage Emergency Requests</h1>

        <p className="subtitle">
          Monitor and manage all emergency blood requests.
        </p>

        <div className="summary">

          <div className="summary-box">
            <h3>Total Requests</h3>
            <span>{requests.length}</span>
          </div>

          <div className="summary-box critical">
            <h3>Critical Cases</h3>
            <span>
              {
                requests.filter(
                  (r) => r.priority === "Critical"
                ).length
              }
            </span>
          </div>

          <div className="summary-box resolved">
            <h3>Resolved</h3>
            <span>
              {
                requests.filter(
                  (r) => r.status === "Resolved"
                ).length
              }
            </span>
          </div>

        </div>

        <div className="filters">

          <input
            type="text"
            placeholder="Search Patient..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={priorityFilter}
            onChange={(e) =>
              setPriorityFilter(e.target.value)
            }
          >
            <option>All</option>
            <option>Critical</option>
            <option>High</option>
            <option>Medium</option>
          </select>

        </div>

        <table>

          <thead>

            <tr>
              <th>Patient</th>
              <th>Blood</th>
              <th>Hospital</th>
              <th>City</th>
              <th>Units</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredRequests.map((request) => (

              <tr key={request.id}>

                <td>{request.patient}</td>

                <td>{request.bloodGroup}</td>

                <td>{request.hospital}</td>

                <td>{request.city}</td>

                <td>{request.units}</td>

                <td>
                  <span
                    className={`priority ${request.priority.toLowerCase()}`}
                  >
                    {request.priority}
                  </span>
                </td>

                <td>
                  <span
                    className={`status ${request.status.toLowerCase()}`}
                  >
                    {request.status}
                  </span>
                </td>

                <td>

                  <button className="view-btn">
                    View
                  </button>

                  {request.status !== "Resolved" && (
                    <button
                      className="resolve-btn"
                      onClick={() =>
                        resolveRequest(request.id)
                      }
                    >
                      Resolve
                    </button>
                  )}

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteRequest(request.id)
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ManageEmergency;