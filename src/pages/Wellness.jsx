import React from "react";
import "../styles/Wellness.css";

export default function WellnessFacilities() {
  return (
    <section className="wellness-section">
      <div className="wellness-track">
        {/* Card 1 */}
        <div className="wellness-card">
          <img src="/fitness.jpg" alt="Fitness Center" className="wellness-bg" />
          <div className="wellness-overlay">
            <h3 className="wellness-title">Fitness <br />Center</h3>
          </div>
        </div>

        {/* Card 2 */}
        <div className="wellness-card">
          <img src="/dining1.jpg" alt="On-Site Dining" className="wellness-bg" />
          <div className="wellness-overlay">
            <h3 className="wellness-title">On-Site <br />Dining</h3>
            <button className="wellness-button">Spa & Wellness</button>
          </div>
        </div>
        {/* Card 3 */}
        <div className="wellness-card">
          <img src="/spa.jpg" alt="Wellness Center" className="wellness-bg" />
          <div className="wellness-overlay">
            <h3 className="wellness-title">Wellness Center <br />& Spa</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
