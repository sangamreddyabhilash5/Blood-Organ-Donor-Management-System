import { useState } from "react";
import "./ManageBloodRequests.css";

function ManageBloodRequests() {
  const [search, setSearch] = useState("");
  const [bloodGroup, setBloodGroup] = useState("All");
  const [status, setStatus] = useState("All");

  const requests = [
    {
      id: 1,
      patient: "Rahul",
      bloodGroup: "O+",
      hospital: "Apollo Hospital",
      city: "Visakhapatnam",
      units: 2,
      status: "Pending",
    },
    {
      id: 2,
      patient: "Priya",
      bloodGroup: "A+",
      hospital: "KGH Hospital",
      city: "Visakhapatnam",
      units: 1,
      status: "Approved",
    },
    {
      id: 3,
      patient: "Kiran",
      bloodGroup: "B+",
      hospital: "CARE Hospital",
      city: "Hyderabad",
      units: 3,
      status: "Emergency",
    },
    {
      id: 4,
      patient: "Sneha",
      bloodGroup: "AB-",
      hospital: "Rainbow Hospital",
      city: "Vijayawada",
      units: 2,
      status: "Rejected",
    },
  ];

  const filteredRequests = requests.filter((request) => {
    const matchSearch = request.patient
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchBlood =
      bloodGroup === "All" ||
      request.bloodGroup === bloodGroup;

    const matchStatus =
      status === "All" ||
      request.status === status;

    return matchSearch && matchBlood && matchStatus;
  });

  return (
    <div className="request-container">

      <div className="request-card">

        <h1>🩸 Manage Blood Requests</h1>

        <p className="description">
          View and manage all blood requests submitted by hospitals and patients.
        </p>

        <div className="filters">

          <input
            type="text"
            placeholder="Search Patient..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
          >
            <option>All</option>
            <option>O+</option>
            <option>O-</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>All</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
            <option>Emergency</option>
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
                    className={`status ${request.status.toLowerCase()}`}
                  >
                    {request.status}
                  </span>
                </td>

                <td>

                  <button className="view-btn">
                    View
                  </button>

                  <button className="approve-btn">
                    Approve
                  </button>

                  <button className="delete-btn">
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        <div className="footer">
          <h3>Total Requests : {filteredRequests.length}</h3>
        </div>

      </div>

    </div>
  );
}

export default ManageBloodRequests;