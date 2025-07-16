// ✅ FINAL FIXED CODE — src/pages/Login.jsx
import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, provider } from "../firebase";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [showPhoneForm, setShowPhoneForm] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const adminEmail = "youremail@gmail.com";

  useEffect(() => {
    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          { size: "invisible", callback: () => {} },
          auth
        );
        window.recaptchaVerifier.render();
      }
    } catch (err) {
      console.error("reCAPTCHA error:", err.message);
    }
  }, []);

  const saveUserToFirestore = async (user) => {
    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      await setDoc(ref, {
        name: user.displayName || "",
        email: user.email || "",
        phone: user.phoneNumber || "",
        createdAt: new Date().toISOString(),
      });
    }
  };

  const checkUserAndRedirect = async (user) => {
    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);

    const redirectTo = location.state?.from?.pathname || "/dashboard"; // ✅ stays here

    if (user.email === adminEmail) {
      return navigate("/admin");
    }

    if (snap.exists() && snap.data().name) {
      navigate(redirectTo); // ✅ Go back to requested path or dashboard
    } else {
      navigate("/dashboard/fill-details");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem("user", JSON.stringify(user));
      await saveUserToFirestore(user);
      await checkUserAndRedirect(user);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEmailLogin = async () => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, pass);
      const user = res.user;
      localStorage.setItem("user", JSON.stringify(user));
      await saveUserToFirestore(user);
      await checkUserAndRedirect(user);
    } catch (err) {
      alert("No user found. Try Signup.");
    }
  };

  const handleSignup = async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, pass);
      const user = res.user;
      localStorage.setItem("user", JSON.stringify(user));
      await saveUserToFirestore(user);
      await checkUserAndRedirect(user);
    } catch (err) {
      alert(err.message);
    }
  };

  const sendOtp = async () => {
    if (!phone.startsWith("+91")) {
      return alert("Use +91 format for phone number");
    }
    try {
      const result = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
      setConfirmationResult(result);
      alert("OTP Sent!");
    } catch (err) {
      alert(err.message);
    }
  };

  const verifyOtp = async () => {
    if (!confirmationResult) return alert("Please send OTP first");
    try {
      const res = await confirmationResult.confirm(otp);
      const user = res.user;
      localStorage.setItem("user", JSON.stringify(user));
      await saveUserToFirestore(user);
      await checkUserAndRedirect(user);
    } catch {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Log in to Royal Hotels</h2>

        {!showPhoneForm ? (
          <>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <button className="login-button" onClick={handleEmailLogin}>
              Continue with Email
            </button>

            <div className="or-divider">OR</div>

            <button className="google-button" onClick={handleGoogleLogin}>
              <img src="https://img.icons8.com/color/16/google-logo.png" alt="G" />
              Continue with Google
            </button>

            <p className="signup-text">
              Don't have an account?{" "}
              <span onClick={handleSignup} className="signup-link">Sign Up</span>
            </p>

            <p
              style={{ marginTop: "10px", cursor: "pointer", color: "#4da6ff" }}
              onClick={() => setShowPhoneForm(true)}
            >
              Use phone instead?
            </p>
          </>
        ) : (
          <>
            <input
              placeholder="Phone Number (+91...)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button onClick={sendOtp}>Send OTP</button>
            <input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={verifyOtp}>Verify OTP</button>

            <p
              style={{ marginTop: "10px", cursor: "pointer", color: "#4da6ff" }}
              onClick={() => setShowPhoneForm(false)}
            >
              Use Google or Email instead?
            </p>
          </>
        )}

        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
}
