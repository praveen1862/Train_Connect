import React, { useState } from "react"; // removed useEffect
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./App.css";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    phone: "",
    // Removed ipAddress field since it's not used anywhere
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/signup", formData);
      console.log(res.data);
      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Signup Failed. Please try again");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <input type="text" name="userName" placeholder="Name" value={formData.userName} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
        <button type="submit">Signup</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
};

export default Signup;
