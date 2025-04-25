import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrain, FaChair, FaUtensils, FaSearch, FaTicketAlt,} from "react-icons/fa";
import { MdDehaze } from "react-icons/md";
import "./App.css";

function BookingInitial() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [travel_date, setDate] = useState("");
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/trains/origins")
      .then((res) => res.json())
      .then((data) => setOriginSuggestions(data))
      .catch((err) => console.error("Error loading origins:", err));

    fetch("http://localhost:5000/api/trains/destinations")
      .then((res) => res.json())
      .then((data) => setDestinationSuggestions(data))
      .catch((err) => console.error("Error loading destinations:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!origin.trim() || !destination.trim() || !travel_date.trim()) {
      alert("Please fill in Origin, Destination, and Date before continuing.");
      return;
    }

    navigate("/trainlist", {
      state: { origin, destination, travel_date },
    });
  };

  return (
    <>
      <h1>TrainConnect 🚄</h1>
      <form onSubmit={handleSubmit} className="booking-form">
        <h2>Enter Booking Details</h2>
        <input list="originOptions" type="text" placeholder="Enter Origin" value={origin} onChange={(e) => setOrigin(e.target.value)} />
        <datalist id="originOptions">
          {originSuggestions.map((origin, index) => (
            <option key={index} value={origin} />
          ))}
        </datalist>
        <input list="destinationOptions" type="text" placeholder="Enter Destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
        <datalist id="destinationOptions">
          {destinationSuggestions.map((dest, index) => (
            <option key={index} value={dest} />
          ))}
        </datalist>
        <input type="date" value={travel_date} onChange={(e) => setDate(e.target.value)} />
        <button type="submit">Search</button>
      </form>

      <div className="feature-frame">
        <div className="feature"><FaChair className="icon" /><span>Seat Availability</span></div>
        <div className="feature"><FaTrain className="icon" /><span>Check Train</span></div>
        <div className="feature" onClick={() => window.open("https://www.ecatering.irctc.co.in/?showQuery=true&showTrainSearch=false", "_blank")}style={{ cursor: "pointer" }}><FaUtensils className="icon" /><span>IRCTC Food</span></div>
        <div className="feature" onClick={() => navigate("/searchTrain")} style={{ cursor: "pointer" }}><FaSearch className="icon" /><span>Search Train</span></div>
        <div className="feature"><FaTicketAlt className="icon" /><span>PNR Status</span></div>
        <div className="feature" onClick={() => navigate("/liveTrainStatus")} style={{ cursor: "pointer" }} ><MdDehaze className="icon" /><span>Running Status</span></div>
      </div>
    </>
  );
}

export default BookingInitial;