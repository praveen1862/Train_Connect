import React, { useEffect, useState } from "react";
import "./App.css";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/api/bookings/tickets?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setTickets(data))
        .catch((err) => console.error("Failed to fetch tickets", err));
    }
  }, []);

  const handleCancel = (id) => {
    if (window.confirm("Cancel this ticket?")) {
      fetch(`http://localhost:5000/api/bookings/cancel/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {
          setTickets(tickets.filter((ticket) => ticket.id !== id));
        });
    }
  };

  return (
    <div className="ticket-page">
      <h2 className="ticket-heading">🎫 Your Booked Tickets</h2>
      {tickets.length === 0 ? (
        <p style={{ textAlign: "center" }}>No tickets booked yet.</p>
      ) : (
        <div className="ticket-container">
          {tickets.map((ticket) => (
            <div className="real-ticket" key={ticket.id}>
              <div className="ticket-left">
                <h3>{ticket.train_name}</h3>
                <br />
                <p>
                  <strong>Route:</strong> {ticket.origin} ➡ {ticket.destination}
                </p>
                <p>
                  <strong>Name:</strong> {ticket.user_name}
                </p>
                <p>
                  <strong>Class:</strong> {ticket.seat_class}
                </p>
                <p>
                  <strong>Seat No:</strong> {ticket.seat_numbers}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(ticket.travel_date).toLocaleDateString("en-GB")}
                </p>
              </div>

              <div className="ticket-right">
                <p>
                  <strong>Food:</strong> {ticket.food_option}
                </p>
                <p>
                  <strong>Passengers:</strong> {ticket.passenger_count}
                </p>

                {/* Show if food option is yes/1/true */}
                {["1", "yes", "true"].includes(
                  ticket.food_option?.toString().toLowerCase()
                ) && (
                  <>
                    <p className="with-food-tag">
                       <strong>With Food </strong>
                    </p>
                    <a
                      href="https://www.ecatering.irctc.co.in/?showQuery=true&showTrainSearch=false"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="cancel-button">
                        Order Food
                      </button>
                    </a>
                  </>
                )}
                <br></br>
                <button
                  className="cancel-button"
                  onClick={() => handleCancel(ticket.id)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tickets;
