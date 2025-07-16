// src/pages/Dashboard/MyBookings.jsx
import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import "../../styles/MyBooking.css";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const user = auth.currentUser;
      if (user) {
        const snapshot = await getDocs(collection(db, "bookings"));
        const myBookings = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((b) => b.userId === user.uid);
        setBookings(myBookings);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="my-bookings">
      <h2>📘 My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((b) => (
            <li key={b.id}>
              <strong>{b.roomType}</strong> from {b.checkIn} to {b.checkOut}
              <br />
              Guests: {b.guests}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
