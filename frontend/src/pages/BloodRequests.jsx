import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axiosConfig";
import "./BloodRequests.css";

function BloodRequests() {

  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchRequests();

  }, []);

  const fetchRequests = async () => {

    try {

      const res = await API.get(
        "/emergency"
      );

      setRequests(res.data.requests);

    } catch (error) {

      console.log(error);

      alert("Unable to load blood requests.");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="blood-request-container">

      <div className="blood-request-card">

        <h1>🩸 Blood Requests</h1>

        <p>
          Live emergency blood requests from hospitals.
        </p>

        {loading ? (

          <h3>Loading...</h3>

        ) : requests.length === 0 ? (

          <h3>No Emergency Requests Found</h3>

        ) : (

          <div className="request-list">

            {requests.map((request) => (

              <div
                className="request-box"
                key={request._id}
              >

                <h3>
                  🩸 {request.bloodGroup} Blood Required
                </h3>

                <p>
                  <b>Patient :</b>
                  {" "}
                  {request.patientName}
                </p>

                <p>
                  <b>Hospital :</b>
                  {" "}
                  {request.hospitalName}
                </p>

                <p>
                  <b>City :</b>
                  {" "}
                  {request.city}
                </p>

                <p>
                  <b>State :</b>
                  {" "}
                  {request.state}
                </p>

                <p>
                  <b>Units :</b>
                  {" "}
                  {request.unitsRequired}
                </p>

                <p>
                  <b>Contact :</b>
                  {" "}
                  {request.contactNumber}
                </p>

                <span
                  className={`status ${request.status.toLowerCase()}`}
                >
                  {request.status}
                </span>

                <button
                  className="donate-btn"
                  onClick={() =>
                    alert(
                      "Donation request accepted successfully."
                    )
                  }
                >
                  Donate Now
                </button>

              </div>

            ))}

          </div>

        )}

        <button
          className="request-btn"
          onClick={() => navigate("/donor-dashboard")}
        >
          ← Back to Dashboard
        </button>

      </div>

    </div>

  );

}

export default BloodRequests;