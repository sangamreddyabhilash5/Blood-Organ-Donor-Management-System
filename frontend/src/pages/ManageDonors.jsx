import { useState } from "react";
import "./ManageDonors.css";

function ManageDonors() {
  const donors = [
    {
      id: 1,
      name: "Rahul",
      blood: "O+",
      city: "Vizag",
      status: "Available",
    },
    {
      id: 2,
      name: "Kiran",
      blood: "A+",
      city: "Hyderabad",
      status: "Unavailable",
    },
    {
      id: 3,
      name: "Sai",
      blood: "B+",
      city: "Vijayawada",
      status: "Available",
    },
  ];

  const [search, setSearch] = useState("");

  const filteredDonors = donors.filter(
    (donor) =>
      donor.name.toLowerCase().includes(search.toLowerCase()) ||
      donor.blood.toLowerCase().includes(search.toLowerCase()) ||
      donor.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-container">
      <h1>👨‍⚕️ Manage Donors</h1>

      <div className="top-bar">
        <div className="count-card">
          Total Donors: <strong>{donors.length}</strong>
        </div>

        <input
          type="text"
          placeholder="Search donor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blood Group</th>
            <th>City</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredDonors.length > 0 ? (
            filteredDonors.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.blood}</td>
                <td>{item.city}</td>
                <td>
                  <span
                    className={
                      item.status === "Available"
                        ? "available"
                        : "unavailable"
                    }
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No donors found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ManageDonors;