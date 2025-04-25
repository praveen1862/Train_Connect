import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} TrainConnect. All rights reserved.</p>
      <p>Made by Praveen</p>
    </footer>
  );
}

export default Footer;
