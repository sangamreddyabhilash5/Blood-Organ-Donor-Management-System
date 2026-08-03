import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axiosConfig";
import "./Login.css";

function Register() {

    const navigate = useNavigate();

    const initialForm = {
        fullName: "",
        email: "",
        phone: "",
        bloodGroup: "",
        age: "",
        gender: "",
        city: "",
        state: "",
        password: "",
        donorType: "Blood",
        location: {
            latitude: null,
            longitude: null
        }
    };

    const [formData, setFormData] = useState(initialForm);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // ✅ OTP STATES
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);

    const [locationLoading, setLocationLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getCurrentLocation();
    }, []);

    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            setLocationLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setFormData(prev => ({
                    ...prev,
                    location: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                }));
                setLocationLoading(false);
            },
            () => {
                setLocationLoading(false);
            }
        );
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError("");
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (formData.password.length < 6) {
            setError("Password must contain minimum 6 characters");
            return;
        }

        if (!/^[6-9]\d{9}$/.test(formData.phone)) {
            setError("Enter valid 10 digit mobile number");
            return;
        }

        try {
            setLoading(true);

            const response = await API.post(
                "/donors/register",
                {
                    fullName: formData.fullName.trim(),
                    email: formData.email.trim().toLowerCase(),
                    phone: formData.phone,
                    bloodGroup: formData.bloodGroup,
                    age: Number(formData.age),
                    gender: formData.gender,
                    city: formData.city.trim(),
                    state: formData.state.trim(),
                    password: formData.password,
                    donorType: formData.donorType,
                    location: formData.location
                }
            );

            alert(response.data.message);

            // ✅ SHOW OTP INPUT
            // For testing since emails are blocked on Render free tier
            if (response.data.otp) {
                console.log("=== OTP FOR TESTING ===", response.data.otp);
            }
            setOtpSent(true);

        } catch (error) {

            console.log("Register Error:", error);
            console.log("Backend message:", error.response?.data);

            setError(
                error.response?.data?.message ||
                error.message ||
                "Registration failed"
            );

        } finally {
            setLoading(false);
        }
    };

    // ✅ VERIFY OTP
    const verifyOTP = async () => {
        try {

            const res = await API.post(
                "/donors/verify-otp",
                {
                    email: formData.email,
                    otp
                }
            );

            alert(res.data.message);

            navigate("/donor-login");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Invalid OTP"
            );

        }
    };

    return (
        <div className="login-container">

            <form className="login-box" onSubmit={handleRegister}>

                <h1>🩸 Donor Registration</h1>

                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}

                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                />

                {/* ✅ EMAIL DISABLED AFTER OTP */}
                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={otpSent}
                    required
                />

                <input
                    type="tel"
                    name="phone"
                    placeholder="Mobile Number"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength="10"
                    required
                />

                <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Blood Group</option>
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                    <option>O+</option>
                    <option>O-</option>
                </select>

                <select
                    name="donorType"
                    value={formData.donorType}
                    onChange={handleChange}
                >
                    <option value="Blood">Blood Donor</option>
                    <option value="Organ">Organ Donor</option>
                    <option value="Both">Blood & Organ Donor</option>
                </select>

                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={formData.age}
                    onChange={handleChange}
                    min="18"
                    max="65"
                    required
                />

                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                </select>

                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    required
                />

                <div className="password-box">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button
                        type="button"
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "🙈" : "👁️"}
                    </button>
                </div>

                <p>
                    {
                        locationLoading
                            ? "📍 Detecting Location..."
                            : "✅ Location detected"
                    }
                </p>

                {/* ✅ OTP UI */}
                {
                    otpSent && (
                        <>
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                maxLength={6}
                            />

                            <button
                                type="button"
                                onClick={verifyOTP}
                            >
                                Verify OTP
                            </button>
                        </>
                    )
                }

                {/* ✅ HIDE REGISTER BUTTON AFTER OTP */}
                {
                    !otpSent && (
                        <button
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Registering..." : "Register"}
                        </button>
                    )
                }

                <p>
                    Already Registered?{" "}
                    <Link to="/donor-login">
                        Login Here
                    </Link>
                </p>

            </form>

        </div>
    );
}

export default Register;