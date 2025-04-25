const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET trains based on origin, destination, date
router.get("/", (req, res) => {
  const { origin, destination } = req.query;

  if (!origin || !destination) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  const query = `
    SELECT * FROM trains 
    WHERE origin = ? AND destination = ?
  `;

  db.query(query, [origin, destination], (err, results) => {
    if (err) {
      console.error("Error fetching trains:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// GET unique origin names
router.get("/origins", (req, res) => {
  db.query("SELECT DISTINCT origin FROM trains", (err, results) => {
    if (err) return res.status(500).send(err);
    const origins = results.map((row) => row.origin);
    res.json(origins);
  });
});

// GET unique destination names
router.get("/destinations", (req, res) => {
  db.query("SELECT DISTINCT destination FROM trains", (err, results) => {
    if (err) return res.status(500).send(err);
    const destinations = results.map((row) => row.destination);
    res.json(destinations);
  });
});

module.exports = router;

// GET trains by origin and destination (for searchTrain.jsx)
router.get("/search", (req, res) => {
  const { origin, destination } = req.query;

  if (!origin || !destination) {
    return res.status(400).json({ message: "Origin and destination are required." });
  }

  const query = `
    SELECT * FROM trains 
    WHERE origin = ? AND destination = ?
  `;

  db.query(query, [origin, destination], (err, results) => {
    if (err) {
      console.error("Error fetching searched trains:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json(results);
  });
});
