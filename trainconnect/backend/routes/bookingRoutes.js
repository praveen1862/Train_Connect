const express = require('express');
const router = express.Router();
const {
  bookTicket,
  getTickets,
  cancelTicket,
  getBookedSeats
} = require('../controllers/bookingController');

router.post('/book', bookTicket);
router.get('/tickets', getTickets);
router.delete('/cancel/:id', cancelTicket);
router.get("/bookedseats/:trainId/:seatClass/:travel_date", getBookedSeats);

module.exports = router;
