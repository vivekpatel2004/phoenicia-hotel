// src/pages/Dashboard/EditProfile.jsx
import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import "../../styles/EditProfile.css"; // ✅ Create this file

export default function EditProfile() {
  const [userData, setUserData] = useState({ name: "", phone: "", city: "" });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
        setLoading(false);
      } catch (error) {
        alert("Failed to load profile.");
      }
    };
    fetchDetails();
  }, [user]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, userData);

      localStorage.setItem("user", JSON.stringify({ displayName: userData.name }));

      alert("Profile updated!");
      setEditing(false);
    } catch (error) {
      alert("Failed to update profile.");
    }
  };

  if (loading) return <div className="edit-profile">Loading...</div>;

  return (
    <div className="edit-profile">
      <h2>👤 My Profile</h2>

      {!editing ? (
        <div className="profile-view">
          <p><strong>Name:</strong> {userData.name || "N/A"}</p>
          <p><strong>Phone:</strong> {userData.phone || "N/A"}</p>
          <p><strong>City:</strong> {userData.city || "N/A"}</p>
          <button onClick={() => setEditing(true)}>Edit Profile</button>
        </div>
      ) : (
        <form className="profile-form" onSubmit={handleSave}>
          <input
            name="name"
            placeholder="Full Name"
            value={userData.name}
            onChange={handleChange}
            required
          />
          <input
            name="phone"
            placeholder="Phone Number"
            value={userData.phone}
            onChange={handleChange}
            required
          />
          <input
            name="city"
            placeholder="City"
            value={userData.city}
            onChange={handleChange}
            required
          />
          <div className="btn-group">
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}
