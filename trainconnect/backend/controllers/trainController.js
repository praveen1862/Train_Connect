const { connection } = require("../config/db");

const getTrains = (req, res) => {
  const { origin, destination, travel_date } = req.body;

  if (!origin || !destination || !travel_date) {
    return res.status(400).json({ message: "Missing origin, destination and date." });
  }

  const query = `
    SELECT * FROM trains
    WHERE origin = ? AND destination = ? AND travel_date = ?
  `;

  connection.query(query, [origin, destination, travel_date], (err, results) => {
    if (err) {
      console.error("❌ Error fetching trains:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No trains available for your route 😢" });
    }
    res.json(results);
  });
};

module.exports = { getTrains };

