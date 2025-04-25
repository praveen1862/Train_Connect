import React, { useState } from "react";
import "./App.css";

const LiveTrainStatus = () => {
  const [trainNumber, setTrainNumber] = useState("12636"); // Vaigai SF Express
  const [date, setDate] = useState("11-04-2025");
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");

  const fetchLiveTrainStatus = async () => {
    const apiKey = "YOUR_API_KEY"; // Replace with your actual API key
    const url = `https://indianrailapi.com/api/v2/livetrainstatus/apikey/${apiKey}/trainnumber/${trainNumber}/date/${date}/`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.ResponseCode === "200") {
        setStatus(data);
        setError("");
      } else {
        setError(data.Message || "Couldn't fetch status. Check train number/date.");
        setStatus(null);
      }
    } catch (err) {
      setError("Network error or invalid response. Try again later.");
      setStatus(null);
    }
  };

  return (
    <div className="live-train-status-container">
      <h2>🚆 Live Train Running Status</h2>

      <div className="live-train-status-inputs">
        <input
          type="text"
          value={trainNumber}
          onChange={(e) => setTrainNumber(e.target.value)}
          placeholder="Enter Train Number"
        />
        <input
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="DD-MM-YYYY"
        />
        <button onClick={fetchLiveTrainStatus}>Get Status</button>
      </div>

      {error && <p className="live-train-error">{error}</p>}

      {status && (
        <div className="live-train-status-result">
          <h3>
            {status.TrainName} ({status.TrainNo})
          </h3>
          <p><strong>Position:</strong> {status.CurrentStation?.StationName}</p>
          <p><strong>Expected Arrival:</strong> {status.CurrentStation?.ActualArrival}</p>
          <p><strong>Last Updated:</strong> {status.LastUpdated}</p>
        </div>
      )}
    </div>
  );
};

export default LiveTrainStatus;
