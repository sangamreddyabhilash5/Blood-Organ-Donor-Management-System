import { useState } from "react";
import "./BloodInventory.css";

function BloodInventory() {
  const bloodStock = [
    { id: 1, group: "A+", units: 18 },
    { id: 2, group: "A-", units: 7 },
    { id: 3, group: "B+", units: 15 },
    { id: 4, group: "B-", units: 5 },
    { id: 5, group: "O+", units: 25 },
    { id: 6, group: "O-", units: 8 },
    { id: 7, group: "AB+", units: 10 },
    { id: 8, group: "AB-", units: 4 },
  ];

  const [search, setSearch] = useState("");

  const filteredBlood = bloodStock.filter((item) =>
    item.group.toLowerCase().includes(search.toLowerCase())
  );

  const totalUnits = bloodStock.reduce((sum, item) => sum + item.units, 0);

  const getStatus = (units) => {
    if (units >= 15) return "High";
    if (units >= 8) return "Medium";
    return "Low";
  };

  return (
    <div className="inventory-container">

      <h1>🩸 Blood Inventory</h1>

      <div className="inventory-top">
        <div className="total-card">
          <h2>{totalUnits}</h2>
          <p>Total Units</p>
        </div>

        <input
          type="text"
          placeholder="Search Blood Group..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="inventory-table">
        <thead>
          <tr>
            <th>Blood Group</th>
            <th>Available Units</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredBlood.length > 0 ? (
            filteredBlood.map((item) => (
              <tr key={item.id}>
                <td>{item.group}</td>
                <td>{item.units}</td>
                <td>
                  <span className={`status ${getStatus(item.units).toLowerCase()}`}>
                    {getStatus(item.units)}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No Blood Group Found</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
}

export default BloodInventory;