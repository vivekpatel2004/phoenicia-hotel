// src/pages/Dashboard/FillDetails.jsx
import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import "../../styles/FillDetails.css";

export default function FillDetails() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const user = auth.currentUser;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ Save to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        phone,
        city,
        email: user.email || "",
      });

      // ✅ Save name to localStorage for Sidebar
      localStorage.setItem("user", JSON.stringify({
        displayName: name,
      }));

      alert("Details saved!");
      navigate("/dashboard"); // redirect to dashboard home
    } catch (err) {
      alert("Failed to save details.");
    }
  };

  return (
    <section className="fill-container">
      <div className="fill-box">
        <h2 className="fill-title">Fill Your Details</h2>
        <form onSubmit={handleSubmit} className="fill-form">
          <input
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <button type="submit">Save and Continue</button>
        </form>
      </div>
    </section>
  );
}
