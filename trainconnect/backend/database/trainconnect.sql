USE trainconnect;

CREATE TABLE IF NOT EXISTS trains (
  id INT AUTO_INCREMENT PRIMARY KEY,
  train_name VARCHAR(100),
  origin VARCHAR(100),
  destination VARCHAR(100),
  departure_time TIME,
  arrival_time TIME,
  boarding_details TEXT,
  ac1_price INT,
  ac2_price INT,
  ac3_price INT,
  sleeper_price INT,
  sitting_price INT,
  tatkal_ac1_price INT,
  tatkal_ac2_price INT,
  tatkal_ac3_price INT,
  tatkal_sleeper_price INT,
  tatkal_sitting_price INT,
  ac1_seats INT,
  ac2_seats INT,
  ac3_seats INT,
  sleeper_seats INT,
  sitting_seats INT,
  status ENUM('Available', 'Waiting List', 'General')
);

INSERT INTO trains (
  train_name, origin, destination, departure_time, arrival_time, boarding_details,
  ac1_price, ac2_price, ac3_price, sleeper_price, sitting_price,
  tatkal_ac1_price, tatkal_ac2_price, tatkal_ac3_price, tatkal_sleeper_price, tatkal_sitting_price,
  ac1_seats, ac2_seats, ac3_seats, sleeper_seats, sitting_seats, status
) VALUES (
  'Peral City Superfast Express', 'Chennai', 'Chennai', '06:30:00', '08:00:00', 'Platform 1',
  1500, 1200, 900, 500, 300,
  1800, 1500, 1200, 700, 400,
  5, 10, 20, 30, 40, 'Available'
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL
);

CREATE TABLE tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    user_name VARCHAR(100),
    email VARCHAR(100),
    train_id INT,
    train_name VARCHAR(100),
    origin VARCHAR(100),
    destination VARCHAR(100),
    seat_class VARCHAR(20),
    seat_numbers VARCHAR(255),
    food_option VARCHAR(10),
    passenger_count INT,
    ticket_number INT UNIQUE,
    booking_date DATE,
    travel_date DATE
);

select * from trains;
select * from users;
select * from tickets;