import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import "../styles/Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      alert("Logout failed!");
    }
  };

  const user = JSON.parse(localStorage.getItem("user"));
  if (!auth.currentUser) return null;

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <p className="sidebar-user">👤 {user?.displayName || "Guest"}</p>
      </div>
      <ul className="sidebar-links">
        <li><Link to="/">🏠 Home</Link></li>
        <li><Link to="/dashboard/home">📋 Dashboard</Link></li>
        <li><Link to="/dashboard/my-bookings">📘 My Bookings</Link></li>
        <li><Link to="/dashboard/edit-profile">✏️ Edit Profile</Link></li>
        <li><Link to="/dashboard/book-room">🏨 Book a Room</Link></li>
        <li>
          <button className="logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </li>
      </ul>
      <div className="sidebar-footer">
        <p>📋 Dashboard Panel</p>
        <p>© 2025 Phoenicia Royale</p>
      </div>
    </div>
  );
}
