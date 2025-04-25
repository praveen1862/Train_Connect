🚄 TrainConnect – Full-Stack Train Booking System
📌 Overview:
TrainConnect is a full-stack, responsive train ticket booking web application that allows users to search, view, and book train tickets in a smooth and interactive interface. It features real-time seat availability, route-specific searches, and more — powered by React, Node.js, and MySQL.

🧠 Features Breakdown:
✅ BookingInitial.jsx (Homepage)
Acts as the central hub of the app.

User-friendly form to enter:

Origin

Destination

Travel Date

Includes auto-suggestion (using <datalist>) for origin and destination — populated dynamically from the DB.

Contains a feature grid for quick navigation to:

Seat Availability

Train Search

IRCTC Food (external)

Live Running Status

PNR Status (future scope)

🔍 SearchTrain.jsx
Dedicated page to search trains by origin and destination.

Origin & destination inputs come with auto-suggestions pulled from the backend.

Shows a list of all matching trains in elegant, white card-style containers.

Displays total number of trains found.

Clean, mobile-friendly layout with minimal design distractions.

📃 TrainList.jsx
After booking details are submitted from BookingInitial, this page fetches and lists all trains for the selected route on a specific date.

Connects with the backend using /api/trains endpoint.

🪑 TrainSeat.jsx
Shows seat layout per train and per class (e.g., AC1, AC2, Sleeper).

Supports date-specific seat locking — only locks booked seats on the selected date.

Fades/locks booked seats visually.

Handles seat booking and displays confirmation.

🎟 Tickets.jsx
Displays booked tickets per user.

Pulls data based on user’s email.

Shows train name, origin, destination, travel date, seat numbers, etc.

📦 SeatAvailability.jsx
Allows users to check how many seats are booked/available on a specific train and date.

Uses clean color indicators (e.g., green for available).

Accepts input via auto-suggest enabled train selector.

🚦 LiveTrainStatus.jsx
Connects to real-time train running status API.

Accepts train name or number input.

Shows current running status (e.g., on-time, delayed).

💾 Backend (Node.js + Express):
API Endpoints:

/api/trains – fetch trains by origin, destination, date

/api/trains/origins & /api/trains/destinations – for auto-suggestions

/api/bookings/bookedseats/:trainId/:seatClass/:travel_date – fetch booked seats

/api/bookings/book – seat booking logic

/api/bookings/cancel – cancel bookings

/api/bookings/tickets – fetch all user tickets

Controllers:

TrainController.js

BookingController.js

Routes:

trainRoutes.js

bookingRoutes.js

🧱 Database – MySQL (trainconnect)
Tables:

trains – stores train details (origin, destination, departure, arrival, class, prices)

tickets – stores all booking details (user email, seats, travel_date, class)

users – stores signup/login data (optional feature)

All train-related queries support date-specific filtering.

🛠 Tech Stack:
Frontend: React, JSX, CSS Modules

Backend: Node.js, Express.js

Database: MySQL

Design Tools: Figma (used in early wireframes)

Icons: react-icons

💡 Highlights:
No UI component is hard-coded — everything is database-driven.

Booking and seat selection are travel-date aware.

All search inputs use live datalist auto-suggestions.

Code is modular, well-commented, and extensible.

🧪 Future Enhancements:
Add user authentication and login-based ticket history.

Integrate live IRCTC APIs for PNR status and train positions.

Add admin panel to manage trains and view system analytics.

Implement payment gateway for real bookings (Razorpay/Stripe).

