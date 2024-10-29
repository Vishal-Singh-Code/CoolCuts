import './App.css';
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MaybeShowNavbar from './components/MaybeShowNavbar';
import Home from './components/Home';
import Service from './components/Services';
import BookAppointment from './components/BookAppointment';
import MyAppointment from './components/MyAppointments';
import AppointmentList from './components/AppointmentList';
import AdminPanel from './components/AdminPanel';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Login from './components/Login';
import Signup from './components/Signup';
import Logout from './components/Logout';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => setIsLoading(false);

    // If document is already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      // Otherwise, set up event listener
      window.addEventListener('load', handleLoad);
    }

    // Clean up event listener
    return () => {
      window.removeEventListener('load', handleLoad);
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
          <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
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
}

export default App;
