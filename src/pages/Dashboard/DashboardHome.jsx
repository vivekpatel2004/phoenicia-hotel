import React from "react";
import "../../styles/DashboardHome.css";

export default function DashboardHome() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <section className="dashboard-home">
      <div className="dashboard-card">
        <h2 className="welcome-title">
          👋 Welcome, {user?.displayName || user?.email || "Guest"}
        </h2>
        <p className="user-email">
          We're glad to have you at <strong>Hotel Phoenicia Royale</strong>
        </p>
        <p className="dashboard-info">
          Access your profile, manage bookings, or explore rooms — all in one place.
        </p>
      </div>
    </section>
  );
}
