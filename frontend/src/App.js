import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import MaybeShowNavbar from "./components/MaybeShowNavbar";
import Logout from "./components/Logout";

// pages
import Home from "./pages/Home";
import Service from "./pages/Services";
import BookAppointment from "./pages/BookAppointment";
import MyAppointment from "./pages/MyAppointments";
import AppointmentList from "./pages/AppointmentList";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import AdminPanel from "./pages/AdminPanel";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { AuthProvider } from "./context/AuthContext";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => setIsLoading(false);

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <div>
      {isLoading && <LoadingScreen />}
      <AuthProvider>
        <Router>
          <MaybeShowNavbar>
            <Navbar />
          </MaybeShowNavbar>
          <div
            className={`transition-opacity duration-500 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Service />} />
              <Route path="/book-appointment" element={<BookAppointment />} />
              <Route path="/myappointments" element={<MyAppointment />} />
              <Route path="/appointment-list" element={<AppointmentList />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/admin-panel" element={<AdminPanel />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
