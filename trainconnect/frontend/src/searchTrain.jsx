import React, { useEffect, useState } from "react";
import "./App.css";

const SearchTrain = () => {
  const [trains, setTrains] = useState([]);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/trains/origins")
      .then((res) => res.json())
      .then((data) => setOriginSuggestions(data))
      .catch((err) => console.error("Failed to fetch origins:", err));

    fetch("http://localhost:5000/api/trains/destinations")
      .then((res) => res.json())
      .then((data) => setDestinationSuggestions(data))
      .catch((err) => console.error("Failed to fetch destinations:", err));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!origin || !destination) {
      setError("Please select both origin and destination.");
      return;
    }

    setLoading(true);
    setError("");

    fetch(`http://localhost:5000/api/trains/search?origin=${origin}&destination=${destination}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setError(data.message);
          setTrains([]);
        } else {
          setTrains(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Search error:", err);
        setError("Something went wrong.");
        setLoading(false);
      });
  };

return (
  <div className="search-train-container">
    <h2>🚆 Search Trains</h2>
    <form onSubmit={handleSearch} className="search-bar">
      <input
        list="originOptions"
        type="text"
        placeholder="Origin"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
      />
      <datalist id="originOptions">
        {originSuggestions.map((o, i) => (
          <option key={i} value={o} />
        ))}
      </datalist>

      <input
        list="destinationOptions"
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <datalist id="destinationOptions">
        {destinationSuggestions.map((d, i) => (
          <option key={i} value={d} />
        ))}
      </datalist>

      <button type="submit">Search</button>
    </form>

    {loading && <p>Loading trains...</p>}
    {error && <p style={{ color: "red" }}>{error}</p>}

    {!loading && trains.length > 0 && (
      <>
      <h3>🎯 Total Trains: {trains.length}</h3>
        <div className="train-list">
          {trains.map((train, index) => (
            <div key={index} className="train-card">
              <h2>{train.train_name}</h2>
              <p><strong>From:</strong> {train.origin}</p>
              <p><strong>To:</strong> {train.destination}</p>
              <p><strong>Departure:</strong> {train.departure_time}</p>
              <p><strong>Arrival:</strong> {train.arrival_time}</p>
            </div>
          ))}
        </div>
      </>
    )}
  </div>
);

};

export default SearchTrain;
