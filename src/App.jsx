// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import SectionDivider from "./components/SectionDivider";
import ImageGrid from "./components/ImageGrid";
import FooterSection from "./components/FooterSection";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToHashElement from "./components/ScrollToHashElement"; // ✅ FIXED: now imported

// Pages
import Home from "./pages/Home";
import Room from "./pages/Room";
import Gastro from "./pages/Gastro";
import StayPackages from "./pages/StayPackages";
import Wellness from "./pages/Wellness";
import Hotel from "./pages/Hotel";
import Events from "./pages/Events";
import Login from "./pages/Login";
import Booking from "./pages/Booking";

// Dashboard Pages
import Dashboard from "./pages/Dashboard/Dashboard";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import EditProfile from "./pages/Dashboard/EditProfile";
import BookRoom from "./pages/Booking";
import MyBookings from "./pages/Dashboard/MyBooking";

// Admin Pages
import Admin from "./pages/Admin/Admin";
import AdminPanel from "./pages/Admin/AdminPanel";

// 🏠 Home Layout
function HomePage() {
  return (
    <main>
      <div id="home"><Home /></div>
      <div style={{ marginTop: "80px" }} />
      <SectionDivider roman="I" />
      <div id="rooms"><Room /></div>
      <div id="gastro"><Gastro /></div>
      <SectionDivider roman="II" />
      <ImageGrid />
      <div id="stay-packages"><StayPackages /></div>
      <div id="wellness"><Wellness /></div>
      <SectionDivider roman="IV" />
      <div id="hotel"><Hotel /></div>
      <div id="events"><Events /></div>
      <FooterSection />
    </main>
  );
}

// 📦 AppContent for conditional layout
function AppContent() {
  const location = useLocation();
  const hideNavbarRoutes = [
    "/login",
    "/booking",
    "/dashboard",
    "/dashboard/home",
    "/dashboard/book-room",
    "/dashboard/edit-profile",
    "/dashboard/my-bookings",
    "/admin",
    "/admin/panel",
  ];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <ScrollToHashElement />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/booking"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="home" />} />
          <Route path="home" element={<DashboardHome />} />
          <Route path="book-room" element={<BookRoom />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="my-bookings" element={<MyBookings />} />
        </Route>
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/panel"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

// 🚀 Main App
export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
