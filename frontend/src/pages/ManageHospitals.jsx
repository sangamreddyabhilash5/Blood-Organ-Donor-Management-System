import { useState } from "react";
import "./ManageHospitals.css";

function ManageHospitals() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("All");

  const hospitals = [
    {
      id: 1,
      name: "Apollo Hospital",
      city: "Visakhapatnam",
      phone: "9876543210",
      email: "apollo@gmail.com",
      status: "Active",
    },
    {
      id: 2,
      name: "KGH Hospital",
      city: "Visakhapatnam",
      phone: "9123456789",
      email: "kgh@gmail.com",
      status: "Active",
    },
    {
      id: 3,
      name: "CARE Hospital",
      city: "Hyderabad",
      phone: "9988776655",
      email: "care@gmail.com",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Rainbow Hospital",
      city: "Vijayawada",
      phone: "9012345678",
      email: "rainbow@gmail.com",
      status: "Active",
    },
  ];

  const filteredHospitals = hospitals.filter((hospital) => {
    const matchName = hospital.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCity =
      city === "All" || hospital.city === city;

    return matchName && matchCity;
  });

  return (
    <div className="hospital-container">

      <div className="hospital-card">

        <h1>🏥 Manage Hospitals</h1>

        <p className="description">
          View and manage all registered hospitals.
        </p>

        <div className="filters">

          <input
            type="text"
            placeholder="Search Hospital..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option>All</option>
            <option>Visakhapatnam</option>
            <option>Hyderabad</option>
            <option>Vijayawada</option>
          </select>

        </div>

        <table>

          <thead>
            <tr>
              <th>Hospital</th>
              <th>City</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredHospitals.map((hospital) => (

              <tr key={hospital.id}>

                <td>{hospital.name}</td>

                <td>{hospital.city}</td>

                <td>{hospital.phone}</td>

                <td>{hospital.email}</td>

                <td>
                  <span
                    className={
                      hospital.status === "Active"
                        ? "active"
                        : "inactive"
                    }
                  >
                    {hospital.status}
                  </span>
                </td>

                <td>

                  <button className="view-btn">
                    View
                  </button>

                  <button className="edit-btn">
                    Edit
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

          <h3>
            Total Hospitals : {filteredHospitals.length}
          </h3>

        </div>

      </div>

    </div>
  );
}

export default ManageHospitals;