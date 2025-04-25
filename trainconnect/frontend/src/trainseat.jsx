import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./App.css";

const TrainSeat = () => {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [filterWindow, setFilterWindow] = useState(false);
  const [foodOption, setFoodOption] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { train, seatClass, passengerCount, travelDate } = location.state || {};

  // Load seats with booking status
  const loadSeats = async () => {
    const totalSeats = 108;
    const generatedSeats = [];
    let bookedSeatIds = [];

    try {
      const formattedClass = seatClass.split(":")[0];

      const res = await axios.get(
        `http://localhost:5000/api/bookings/bookedseats/${train.id}/${formattedClass}/${travelDate}`
      );

      bookedSeatIds = res.data.bookedSeats.map((seat) => parseInt(seat));
    } catch (err) {
      console.error("Failed to fetch booked seats:", err);
    }

    for (let i = 1; i <= totalSeats; i++) {
      generatedSeats.push({
        id: i,
        booked: bookedSeatIds.includes(i),
        isWindow: i % 6 === 1 || i % 6 === 0,
      });
    }

    setSeats(generatedSeats);
  };

  useEffect(() => {
    if (train && seatClass && travelDate) {
      loadSeats();
    }
  }, [train.id, seatClass, travelDate]);

  const handleSeatClick = (seat) => {
    if (seat.booked) return;

    const isSelected = selectedSeats.includes(seat.id);
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seat.id));
    } else {
      if (selectedSeats.length >= passengerCount) {
        alert(`You can only select ${passengerCount} seat(s).`);
        return;
      }
      setSelectedSeats([...selectedSeats, seat.id]);
    }
  };

  const handleConfirmBooking = async () => {
    if (selectedSeats.length !== passengerCount) {
      alert(`Please select exactly ${passengerCount} seat(s).`);
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Login required!");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/bookings/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          userName: user.name,
          email: user.email,
          trainId: train.id,
          trainName: train.train_name,
          origin: train.origin,
          destination: train.destination,
          seatClass,
          selectedSeats,
          foodOption,
          passengerCount,
          travelDate,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Booking failed:", errorText);
        throw new Error("Booking failed");
      }

      alert("Booking confirmed!");
      setSelectedSeats([]);
      await loadSeats();
      navigate("/tickets");
    } catch (err) {
      console.error("Booking error:", err);
      alert("Booking failed.");
    }
  };

  const renderRows = () => {
    const rows = [];
    for (let i = 0; i < seats.length; i += 6) {
      const row = seats.slice(i, i + 6);
      rows.push(
        <tr key={i}>
          {row.slice(0, 3).map((seat) => (
            <td key={seat.id}>
              <button
                className={`seat ${
                  seat.booked
                    ? "booked faded"
                    : selectedSeats.includes(seat.id)
                    ? "selected"
                    : "available"
                } ${filterWindow && !seat.isWindow ? "faded" : ""}`}
                onClick={() => handleSeatClick(seat)}
              >
                {seat.booked ? "X" : seat.id}
              </button>
            </td>
          ))}
          <td className="aisle-space"></td>
          {row.slice(3, 6).map((seat) => (
            <td key={seat.id}>
              <button
                className={`seat ${
                  seat.booked
                    ? "booked faded"
                    : selectedSeats.includes(seat.id)
                    ? "selected"
                    : "available"
                } ${filterWindow && !seat.isWindow ? "faded" : ""}`}
                onClick={() => handleSeatClick(seat)}
              >
                {seat.booked ? "X" : seat.id}
              </button>
            </td>
          ))}
        </tr>
      );
    }
    return rows;
  };

  return (
    <div className="seat-page">
      <div className="top-options">
        <label>
         <div className="selectedcount">
    Selected Seats: {selectedSeats.length} / {passengerCount}
  </div>
  </label>
        <label>
          <input
            type="checkbox"
            checked={filterWindow}
            onChange={() => setFilterWindow(!filterWindow)}
          />
          Window seats
        </label>
        <label>
          <input
            type="checkbox"
            checked={foodOption}
            onChange={() => setFoodOption(!foodOption)}
          />
          Include Food
        </label>
      </div>

      <div className="train-container">
        <h2>Book your seat</h2>
        <table className="seat-table">
          <tbody>{renderRows()}</tbody>
        </table>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button className="confirm-button" onClick={handleConfirmBooking}>
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainSeat;
