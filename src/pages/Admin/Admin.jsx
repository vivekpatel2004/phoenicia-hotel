import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import "../../styles/Admin.css";

export default function Admin() {
  const [bookings, setBookings] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserBookings = async () => {
      const user = auth.currentUser;
      if (user) {
        setUserId(user.uid);
        const snapshot = await getDocs(collection(db, "bookings"));
        const userBookings = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((booking) => booking.userId === user.uid);

        setBookings(userBookings);
      }
    };

    fetchUserBookings();
  }, []);

  return (
    <div className="admin-container">
      <h2>📘 My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((b) => (
            <li key={b.id}>
              <strong>{b.roomType}</strong> booked on {b.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
