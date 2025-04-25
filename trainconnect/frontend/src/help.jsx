import React from "react";
import "./App.css";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaQuestionCircle } from "react-icons/fa";

function Help() {
  return (
    <div className="help-container">
      <h1><FaQuestionCircle className="help-icon" /> Help & Support</h1>

      <div className="faq-section">
        <h2>❓ Frequently Asked Questions</h2>
        <div className="faq-box">
          <p><strong>📌 How do I book a seat?</strong><br />Go to the Home page and enter your booking details.</p>
          <p><strong>📌 How do I check my bookings?</strong><br />Click on "Bookings" in the navbar to view your reservations.</p>
          <p><strong>📌 How do I get my ticket?</strong><br />After booking, go to "Tickets" to download your ticket.</p>
          </div>
      </div>

      <div className="contact-section">
        <h2>📞 Contact Support</h2>
        <div className="contact-box">
          <p><FaEnvelope className="icon" /> <strong>Email:</strong> support@railwaybooking.com</p>
          <p><FaPhoneAlt className="icon" /> <strong>Phone:</strong> +91 9876543210</p>
          <p><FaMapMarkerAlt className="icon" /> <strong>Address:</strong> Chennai, Tamil Nadu, India</p>
        </div>
      </div>
    </div>
  );
}

export default Help;
