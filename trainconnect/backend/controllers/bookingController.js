const db = require('../config/db'); // Adjust path if needed

// POST /api/bookings/book
exports.bookTicket = (req, res) => {
  const {
    userId,
    userName,
    email,
    trainId,
    trainName,
    origin,
    destination,
    seatClass,
    selectedSeats,
    foodOption,
    passengerCount,
    travelDate
  } = req.body;

  const seatNumbersStr = selectedSeats.join(',');

  const query = `
    INSERT INTO tickets 
    (user_id, user_name, email, train_id, train_name, origin, destination, seat_class, seat_numbers, food_option, passenger_count, travel_date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      userId,
      userName,
      email,
      trainId,
      trainName,
      origin,
      destination,
      seatClass,
      seatNumbersStr,
      foodOption ? 1 : 0,
      passengerCount,
      travelDate
    ],
    (err, result) => {
      if (err) {
        console.error("Booking error:", err);
        return res.status(500).json({ error: 'Booking failed.' });
      }

      res.status(201).json({ message: 'Ticket booked successfully', ticketId: result.insertId });
    }
  );
};

// GET /api/bookings/tickets
exports.getTickets = (req, res) => {
  db.query("SELECT * FROM tickets", (err, results) => {
    if (err) {
      console.error("Error fetching tickets:", err);
      return res.status(500).json({ error: "Failed to fetch tickets." });
    }
    res.json(results);
  });
};

// DELETE /api/bookings/cancel/:id
exports.cancelTicket = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM tickets WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error canceling ticket:", err);
      return res.status(500).json({ error: "Failed to cancel ticket." });
    }

    res.json({ message: "Ticket cancelled successfully" });
  });
};

// GET /api/bookings/bookedseats/:trainId/:seatClass/:travel_date
exports.getBookedSeats = (req, res) => {
  const { trainId, seatClass, travel_date } = req.params;

  const query = `
    SELECT seat_numbers FROM tickets
    WHERE train_id = ? AND seat_class = ? AND travel_date = ?
  `;

  db.query(query, [trainId, seatClass, travel_date], (err, results) => {
    if (err) {
      console.error("Error fetching booked seats:", err);
      return res.status(500).json({ error: "Database error" });
    }

    let bookedSeats = [];
    results.forEach(row => {
      if (row.seat_numbers) {
        bookedSeats.push(...row.seat_numbers.split(',').map(Number));
      }
    });

    res.json({ bookedSeats });
  });
};


// GET tickets for a specific user by email
exports.getTickets = (req, res) => {
  const userEmail = req.query.email;

  if (!userEmail) {
    return res.status(400).json({ message: "Email is required to fetch tickets." });
  }

  const query = `
    SELECT t.*, tr.train_name, tr.origin, tr.destination
    FROM tickets t
    JOIN trains tr ON t.train_id = tr.id
    WHERE t.email = ?
    ORDER BY t.travel_date DESC
  `;

  db.query(query, [userEmail], (err, results) => {
    if (err) {
      console.error("❌ Error fetching tickets:", err);
      return res.status(500).json({ message: "Server error while fetching tickets." });
    }

    res.json(results);
  });
};
