// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, RecaptchaVerifier } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAYJqprk7BNh6lel3oxAZOeeig1WlVIpCI",
  authDomain: "hotel-2b029.firebaseapp.com",
  projectId: "hotel-2b029",
  storageBucket: "hotel-2b029.appspot.com",
  messagingSenderId: "1063161368835",
  appId: "1:1063161368835:web:b2936d1994d5cf466b1936",
  measurementId: "G-P78MJ5J6W5"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Auth & Providers
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ✅ Firestore
const db = getFirestore(app);

// ✅ Exports
export { auth, provider, db, RecaptchaVerifier };
