import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const Bookings = () => {
  const [lastBooking, setLastBooking] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/api/bookings/tickets?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            const sorted = [...data].sort(
              (a, b) => new Date(b.travel_date) - new Date(a.travel_date)
            );
            setLastBooking(sorted[0]);
          }
        })
        .catch((err) => console.error("Error fetching bookings:", err));
    }
  }, []);

  const handleNewBooking = () => {
    navigate("/");
  };

  const handleAllTicket = () => {
    navigate("/tickets");
  };

  return (
    <div className="bookings-page">
      <h2 className="ticket-heading">📦 Your Latest Booking</h2>

      {lastBooking ? (
        <div className="recentbookings">
          <div className="recenttickets">
            <h3>{lastBooking.train_name}</h3>
            <p><strong>Route:</strong> {lastBooking.origin} ➡ {lastBooking.destination}</p>
            <p><strong>Name:</strong> {lastBooking.user_name}</p>
            <p><strong>Class:</strong> {lastBooking.seat_class}</p>
            <p><strong>Seat No:</strong> {lastBooking.seat_numbers}</p>
            <p><strong>Date:</strong> {new Date(lastBooking.travel_date).toLocaleDateString("en-GB")}</p>
            <p><strong>Food:</strong> {lastBooking.food_option}</p>
            <p><strong>Passengers:</strong> {lastBooking.passenger_count}</p>
            <div className="button-group">
              <button className="confirm-button" onClick={handleAllTicket}>
                View All Tickets
              </button>
              <button className="confirm-button" onClick={handleNewBooking}>
                Book Another Ticket
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p style={{ textAlign: "center", marginTop: "30px" }}>No bookings found.</p>
      )}
    </div>
  );
};

export default Bookings;
