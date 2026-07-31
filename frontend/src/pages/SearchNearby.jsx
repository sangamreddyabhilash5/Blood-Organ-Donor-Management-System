import { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import "./SearchNearby.css";

const API_URL = "http://localhost:5000/api/donors/nearby";

function SearchNearby() {
  const [donors, setDonors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================
  // Fetch Nearby Donors
  // ==========================
  const fetchNearbyDonors = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const response = await axios.get(API_URL, {
            params: {
              lat: coords.latitude,
              lng: coords.longitude,
            },
          });

          setDonors(response.data.donors || []);
        } catch (err) {
          console.log(err);

          setError(
            err.response?.data?.message ||
              "Unable to fetch nearby donors."
          );
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError(
          "Location permission denied. Please allow location access."
        );

        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  useEffect(() => {
    fetchNearbyDonors();
  }, [fetchNearbyDonors]);

  // ==========================
  // Search Filter
  // ==========================
  const filteredDonors = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return donors;

    return donors.filter((donor) => {
      return (
        donor.fullName?.toLowerCase().includes(value) ||
        donor.bloodGroup?.toLowerCase().includes(value) ||
        donor.city?.toLowerCase().includes(value)
      );
    });
  }, [search, donors]);

  // ==========================
  // Call Donor
  // ==========================
  const callDonor = useCallback((phone) => {
    if (!phone) {
      alert("Phone number not available.");
      return;
    }

    const confirmCall = window.confirm(
      `Call donor ${phone}?`
    );

    if (confirmCall) {
      window.location.href = `tel:${phone}`;
    }
  }, []);

  // ==========================
  // WhatsApp
  // ==========================
  const whatsappDonor = useCallback((phone, name) => {
    if (!phone) {
      alert("Phone number not available.");
      return;
    }

    const mobile = phone.replace(/\D/g, "");

    const whatsappNumber = mobile.startsWith("91")
      ? mobile
      : `91${mobile}`;

    const message = `Hello ${name},

I found your profile on the Blood & Organ Donor Management System.

Can you donate blood if you are available?

Thank you 🩸`;

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappURL, "_blank");
  }, []);

  // ==========================
  // Loading
  // ==========================
  if (loading) {
    return (
      <div className="nearby-page">
        <h2>Loading nearby donors...</h2>
      </div>
    );
  }

  // ==========================
  // Error
  // ==========================
  if (error) {
    return (
      <div className="nearby-page">
        <h2>{error}</h2>
      </div>
    );
  }

  // ==========================
  // UI
  // ==========================
  return (
    <div className="nearby-page">
      <h1>📍 Nearby Donors</h1>

      <p className="subtitle">
        {filteredDonors.length} Donor(s) Found
      </p>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search by Name, Blood Group or City..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredDonors.length === 0 ? (
        <h2>No nearby donors found.</h2>
      ) : (
        <div className="donor-grid">
          {filteredDonors.map((donor) => (
            <div
              className="donor-card"
              key={donor._id}
            >
              <h2>🩸 {donor.fullName}</h2>

              <span className="blood-badge">
                {donor.bloodGroup}
              </span>

              <p>
                <strong>📍 City:</strong> {donor.city}
              </p>

              <p>
                <strong>🏠 State:</strong> {donor.state}
              </p>

              <p>
                <strong>📞 Phone:</strong> {donor.phone}
              </p>

              <p className="distance">
                📏{" "}
                {Number(
                  donor.distance ?? 0
                ).toFixed(2)}{" "}
                km away
              </p>

              <div className="contact-buttons">
                <button
                  className="call-btn"
                  onClick={() =>
                    callDonor(donor.phone)
                  }
                >
                  📞 Call Donor
                </button>

                <button
                  className="whatsapp-btn"
                  onClick={() =>
                    whatsappDonor(
                      donor.phone,
                      donor.fullName
                    )
                  }
                >
                  💬 WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchNearby;