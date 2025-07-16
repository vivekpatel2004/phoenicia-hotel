import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import "../../styles/AdminPanel.css";

export default function AdminPanel() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;

      if (currentUser) {
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            setUserData({ id: currentUser.uid, ...docSnap.data() });
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="admin-panel">
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li className="active">🙍‍♂️ My Profile</li>
          <li>📩 Messages</li>
          <li>📊 Reports</li>
        </ul>
      </aside>

      <main className="admin-main">
        <h1>Welcome, Admin 👑</h1>

        {userData ? (
          <div className="user-card">
            <h3>👤 Profile Info</h3>
            <p><strong>Name:</strong> {userData.name || "N/A"}</p>
            <p><strong>Email:</strong> {userData.email || "N/A"}</p>
            <p><strong>Phone:</strong> {userData.phone || "N/A"}</p>
            <p><strong>City:</strong> {userData.city || "N/A"}</p>
          </div>
        ) : (
          <p className="loading">Loading your profile...</p>
        )}
      </main>
    </div>
  );
}
