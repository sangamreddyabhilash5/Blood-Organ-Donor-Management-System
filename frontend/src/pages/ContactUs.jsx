import { useState } from "react";
import "./ContactUs.css";

function ContactUs() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Your message has been sent successfully!");

    setFormData({
      fullName: "",
      email: "",
      subject: "",
      message: "",
    });

    // Connect your backend API here
    // axios.post("http://localhost:5000/api/contact", formData)
  };

  return (
    <div className="contact-container">

      <div className="contact-card">

        <h1>📞 Contact Us</h1>

        <p className="contact-description">
          Have a question or need assistance? We're here to help.
          Send us a message and our support team will respond as soon
          as possible.
        </p>

        <div className="contact-info">

          <div className="info-box">
            <h3>📍 Address</h3>
            <p>Visakhapatnam, Andhra Pradesh, India</p>
          </div>

          <div className="info-box">
            <h3>📧 Email</h3>
            <p>support@blooddonor.com</p>
          </div>

          <div className="info-box">
            <h3>📞 Phone</h3>
            <p>+91 98765 43210</p>
          </div>

          <div className="info-box">
            <h3>🚑 Emergency</h3>
            <p>Helpline : 108</p>
          </div>

        </div>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            rows="5"
            placeholder="Write your message..."
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">
            Send Message
          </button>

        </form>

      </div>

    </div>
  );
}

export default ContactUs;