import React from 'react';
import '../styles/Events.css';


export default function ShowcaseSection() {
  return (
    <section className="showcase-container">
      <div className="showcase-inner-wrapper">
        <img src="/showcase.jpg" alt="Corporate Event" className="showcase-bg-image" />

        {/* Gradient overlay */}
        <div className="gradient-overlay" />

        {/* Center Main Title */}
        <h1 className="showcase-main-title">Corporate Events</h1>

        {/* Three Layer Box */}
        <div className="three-layer-box">
          <div className="box-layer box-layer-1" />
          <div className="box-layer box-layer-2" />
          <div className="box-layer box-layer-3">
            <h2 className="box-heading">For companies</h2>
            <p className="box-description">
              Host your formal business meetings in a unique and refreshing setting.
              Enjoy elegant venues, comfortable accommodations, and exceptional cuisine
              that elevate every professional gathering.
            </p>
            <button className="box-button">MORE</button>
          </div>
        </div>
      </div>
    </section>
  );
}
