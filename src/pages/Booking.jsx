// src/pages/Booking.jsx
import React, { useState } from "react";
import "../styles/Booking.css";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function Booking() {
  const [formData, setFormData] = useState({
    name: "",
    checkIn: "",
    checkOut: "",
    roomType: "Deluxe",
    guests: 1,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to book.");
      return;
    }

    try {
      await addDoc(collection(db, "bookings"), {
        ...formData,
        email: user.email,
        userId: user.uid,
        timestamp: new Date(),
      });

      alert("Booking confirmed!");
      setFormData({
        name: "",
        checkIn: "",
        checkOut: "",
        roomType: "Deluxe",
        guests: 1,
      });
    } catch (err) {
      console.error("Booking failed", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="booking-container">
      <h2>🛎️ Book Your Stay</h2>

      <form className="booking-form" onSubmit={handleSubmit}>
        <label>Full Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          required
        />

        <label>Check-in Date:</label>
        <input
          type="date"
          name="checkIn"
          value={formData.checkIn}
          onChange={handleChange}
          required
        />

        <label>Check-out Date:</label>
        <input
          type="date"
          name="checkOut"
          value={formData.checkOut}
          onChange={handleChange}
          required
        />

        <label>Room Type:</label>
        <select
          name="roomType"
          value={formData.roomType}
          onChange={handleChange}
        >
          <option>Deluxe</option>
          <option>Suite</option>
          <option>Standard</option>
        </select>

        <label>Guests:</label>
        <input
          type="number"
          name="guests"
          min="1"
          value={formData.guests}
          onChange={handleChange}
          required
        />

        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
}
