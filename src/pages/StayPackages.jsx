import React from 'react';
import '../styles/StayPackages.css';

const packageData = [
  {
    title: 'Royal Weekend Escape Package',
    subtitle: 'from BHD 280 / 1 person / 3 Night',
    image: '/escape.jpg'
  },
  {
    title: 'Family Fun Staycation',
    subtitle: 'from BHD 110 / 1 person / 1 Night',
    image: '/family1.jpg'
  },
  {
    title: "Family Fun Staycation",
    subtitle: "from BHD 110 / 1 person / 1 Night",
    image: "/family2.jpg",
  },
];

export default function StayPackages() {
  return (
    <section className="stay-packages-section">
      <h2 className="section-heading">Stay packages</h2>
      <div className="package-scroll">
        <div className="package-track">
          {packageData.map((item, index) => (
            <div className="package-card" key={index}>
              <img src={item.image} alt={item.title} className="package-image" />
              <div className="package-white-border"></div>
              <div className="package-overlay">
                <span className="all-season">All season</span>
                <h3 className="package-title">{item.title}</h3>
                <p className="package-subtitle">{item.subtitle}</p>
                <div className="button-group">
                  <button className="package-button">More</button>
                  <div className="icon-button">
                    <div className="icon-mail">
                      <div className="rectangle8" />
                      <div className="rectangle12" />
                      <div className="rectangle13" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="scroll-indicator-line"></div>
    </section>
  );
}