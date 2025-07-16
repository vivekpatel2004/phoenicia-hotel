import React from 'react';
import '../styles/ImageGrid.css';

const gridData = [
  { title: 'Rooms', image: '/room.jpg' },
  { title: 'Pools', image: '/pools.jpg' },
  { title: 'Dining', image: '/dining.jpg' }
];

export default function ImageGrid() {
  return (
    <section className="image-grid-section">
      <div className="image-grid-container">
        {gridData.map((item, index) => (
          <div className="image-box" key={index}>
            <img src={item.image} alt={item.title} className="bg-image" />
            <div className="dark-overlay" />
            <div className="title-box">
              <h2>{item.title}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Booking Frame */}
      <div className="booking-frame">
        <div className="booking-text">Accommodation</div>
      </div>
    </section>
  );
}
