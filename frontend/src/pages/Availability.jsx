import { useState } from "react";
import "./Availability.css";

function Availability() {

  const [available, setAvailable] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("Today");


  const toggleAvailability = () => {
    setAvailable(!available);
    setLastUpdated(new Date().toLocaleString());
  };


  return (
    <div className="availability-container">

      <div className="availability-card">

        <h1>✅ Donor Availability</h1>

        <p>
          Update your availability status so recipients can find you
          during emergency blood requirements.
        </p>


        {/* Current Status */}

        <div className="status-box">

          <h2>
            Current Status:
            <span className={available ? "available" : "unavailable"}>
              {available ? " Available" : " Not Available"}
            </span>
          </h2>

          <p>
            Last Updated: {lastUpdated}
          </p>

        </div>



        {/* Toggle Button */}

        <button
          className={
            available 
            ? "btn-unavailable" 
            : "btn-available"
          }
          onClick={toggleAvailability}
        >

          {
            available 
            ? "Mark as Unavailable" 
            : "Mark as Available"
          }

        </button>



        {/* Donor Information */}

        <div className="info-box">

          <h3>Why update your availability?</h3>

          <ul>
            <li>
              ✔ Help patients find available donors quickly.
            </li>

            <li>
              ✔ Receive emergency blood requests.
            </li>

            <li>
              ✔ Keep your donor profile updated.
            </li>

            <li>
              ✔ Increase chances of saving lives.
            </li>
          </ul>

        </div>


      </div>

    </div>
  );
}

export default Availability;