import React from "react";
import './App.css';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user?.name || "User"} 👋</h2>
      <p>This is your dashboard. More features coming soon!</p>
      <button
        className="logout-button"
        onClick={() => {
          localStorage.removeItem("user");
          localStorage.setItem("isLoggedIn", "false");
          window.location.href = "/login"; // kick them back to home
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
