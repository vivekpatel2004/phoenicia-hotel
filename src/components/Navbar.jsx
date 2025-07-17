import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setShowNavbar(window.scrollY < lastScrollY);
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleBookingClick = () => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <header className={`navbar-wrapper ${showNavbar ? "show" : "hide"}`}>
      <div className="navbar-top">
        <button className="nav-icon-button">☰ Menu</button>

        {/* Center Logo */}
        <div className="nav-logo">
          <div className="logo-wrapper">
            <div className="year">2025</div>
            <div className="logo-circle">
              <span className="logo-text">Royal</span>
            </div>
            <div className="stars">
              <div className="star-box" />
              <div className="star-box" />
              <div className="star-box" />
              <div className="star-box" />
            </div>
          </div>
        </div>

        <button className="nav-icon-button" onClick={handleBookingClick}>
          🛎 Booking
        </button>
      </div>

      <div className="navbar-bottom">
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#rooms">Rooms</a>
          <a href="#wellness">Wellness</a>
          <a href="#gastro">Gastro</a>
          <a href="#hotel">Hotel</a>
          <a href="#events">Events</a>
        </div>
      </div>
    </header>
  );
}
