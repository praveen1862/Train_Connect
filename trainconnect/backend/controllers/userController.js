const db = require('../config/db');

// SIGNUP CONTROLLER
const signupUser = (req, res) => {
  const { userName, email, password, phone } = req.body;

  console.log("SIGNUP REQUEST DATA:", { userName, email, password, phone }); // Debug log

  const sql = 'INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)';
  db.query(sql, [userName, email, password, phone], (err, result) => {
    if (err) {
      console.error('Signup error:', err);  // 💥 This will show the actual cause in your terminal
      return res.status(500).json({ message: 'Signup failed', error: err });
    }
    res.status(200).json({ message: 'Signup successful!' });
  });
};

// LOGIN CONTROLLER
const loginUser = (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error('Login error:', err);
      return res.status(500).json({ message: 'Login failed' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = results[0];
    res.status(200).json({ message: 'Login successful!', user });
  });
};

module.exports = { signupUser, loginUser };
