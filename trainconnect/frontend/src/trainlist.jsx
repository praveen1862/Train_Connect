import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";

function TrainList() {
  const location = useLocation();
  const navigate = useNavigate();
  const { origin, destination, travel_date } = location.state || {};
  const [trains, setTrains] = useState([]);
  const [passengerCount, setPassengerCount] = useState(1);
  const handleBooking = (train, seatClass) => {
  const user = localStorage.getItem("user");

    if (!user) {
      alert("Please login to book a train seat.");
      navigate("/login");
      return;
    }

    if (passengerCount < 1 || passengerCount > 6) {
      alert("Please select between 1 to 6 passengers.");
      return;
    }

    navigate("/trainseat", {
      state: {
        train,
        seatClass,
        passengerCount,
        travelDate: travel_date, // <-- FIXED!
      },
    });
  };

  useEffect(() => {
    if (origin && destination && travel_date) {
      fetch(`http://localhost:5000/api/trains?origin=${origin}&destination=${destination}&date=${travel_date}`)
        .then((res) => res.json())
        .then((data) => setTrains(data))
        .catch((error) => console.error("Error fetching trains:", error));
    }
  }, [origin, destination, travel_date]);

  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>Available Trains</h2>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <label>Passengers: </label>
        <input type="number" min="1" max="6" value={passengerCount} onChange={(e) => setPassengerCount(parseInt(e.target.value))} style={{ width: "50px", textAlign: "center" }} />
      </div>
      {trains.length === 0 ? (
        <p style={{ textAlign: "center" }}>No trains found.</p>
      ) : (
        trains.map((train) => (
          <div className="train-card-compact" key={train.id}>
            <div className="train-info-left">
              <h3>{train.train_name}</h3>
              <p>{train.origin} ➡ {train.destination}</p>
              <p>Arrival: {train.arrival_time} | Departure: {train.departure_time}</p>
            </div>
            <div className="train-prices-right">
              <button onClick={() => handleBooking(train, "AC1")}>AC1 ₹{train.ac1_price}</button>
              <button onClick={() => handleBooking(train, "AC2")}>AC2 ₹{train.ac2_price}</button>
              <button onClick={() => handleBooking(train, "AC3")}>AC3 ₹{train.ac3_price}</button>
              <button onClick={() => handleBooking(train, "Sitting")}>Sitting ₹{train.sitting_price}</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default TrainList;