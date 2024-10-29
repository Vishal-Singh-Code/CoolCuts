import React, { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Logo } from "./Icons.js";
import { AuthContext } from "../context/AuthContext"; // Make sure to import your AuthContext

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate(); // Use context to get user and logout function

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  let a, b;
  if (user && user.id === 1) {
    a = '/appointment-list';
    b = 'Appointment List';
  }
  else {
    a = '/myappointments';
    b = 'My Appointments';
  }

  const handleLogout = () => {
    logout(); // Call your logout function
    closeMenu(); // Close the menu if needed
    navigate('/'); // Redirect to the home page
  };

  return (
    <header style={{ backgroundColor: '#121212' }} className="bg-black text-gray-100 body-font fixed-top">
      <div className="container mx-auto flex flex-wrap p-3 flex-row items-center justify-between">
        <div className="flex items-center">
          <Link className="flex title-font font-medium items-center text-white" to="/">
            <Logo />
            <span className="ml-3 text-xl">CoolCuts</span>
          </Link>
        </div>
        <div className="md:hidden flex items-center">
          <button
            className="text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-6 h-6"
              viewBox="0 0 24 24"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        <nav className={`md:flex md:items-center md:ml-auto md:mr-0 w-full md:w-auto ${isOpen ? 'block' : 'hidden'}`}>
          {/* home */}
          <NavLink
             to="/"
            className={({ isActive }) =>
              `block md:inline-block p-2 md:mt-0 mr-5 text-xl md:text-xl hover:text-teal-400 ${isActive ? 'text-teal-400' : 'text-white'
              }`
            }
            onClick={closeMenu} // Close menu on click
          >
            Home
          </NavLink>
          {/* Services */}
          <NavLink
             to="/services"
            className={({ isActive }) =>
              `block md:inline-block p-2 md:mt-0 mr-5 text-xl md:text-xl hover:text-teal-400 ${isActive ? 'text-teal-400' : 'text-white'
              }`
            }
            onClick={closeMenu} // Close menu on click
          >
            Services
          </NavLink>
          {/* Book Appointment */}
          <NavLink
             to="/book-appointment"
            className={({ isActive }) =>
              `block md:inline-block p-2 md:mt-0 mr-5 text-xl md:text-xl hover:text-teal-400 ${isActive ? 'text-teal-400' : 'text-white'
              }`
            }
            onClick={closeMenu} // Close menu on click
          >
            Book Appointment
          </NavLink>
          {/* Appointment List / My Appointment */}
          {user && (
            <NavLink
               to={a}
              className={({ isActive }) =>
                `block md:inline-block p-2 md:mt-0 mr-5 text-xl md:text-xl hover:text-teal-400 ${isActive ? 'text-teal-400' : 'text-white'
                }`
              }
              onClick={closeMenu} // Close menu on click
            >
              {b}
            </NavLink>
          )}
          {/* About Us and Contact Us */}
          {user?.id !== 1 && (
            <>
              <NavLink
                 to="/about-us"
                className={({ isActive }) =>
                  `block md:inline-block p-2 md:mt-0 mr-5 text-xl md:text-xl hover:text-teal-400 ${isActive ? 'text-teal-400' : 'text-white'
                  }`
                }
                onClick={closeMenu} // Close menu on click
              >
                About Us
              </NavLink>

              <NavLink
                 to="/contact-us"
                className={({ isActive }) =>
                  `block md:inline-block p-2 md:mt-0 mr-5 text-xl md:text-xl hover:text-teal-400 ${isActive ? 'text-teal-400' : 'text-white'
                  }`
                }
                onClick={closeMenu} // Close menu on click
              >
                Contact Us
              </NavLink>
            </>
          )}
          {/* Admin Panel */}
          {user?.id === 1 && (
            <NavLink
               to="/admin-panel"
              className={({ isActive }) =>
                `block md:inline-block p-2 md:mt-0 mr-5 text-xl md:text-xl hover:text-teal-400 ${isActive ? 'text-teal-400' : 'text-white'
                }`
              }
              onClick={closeMenu} // Close menu on click
            >
              Admin Panel
            </NavLink>
          )}
          {/* Login and Signup */}
          {!user ? (
            <>
              <Link
                className="block md:inline-block p-2 md:mt-0 mr-5 hover:text-violet-400 text-white text-xl md:text-xl"
                to="/login"
                onClick={closeMenu} // Close menu on click
              >
                Login
              </Link>
              <Link
                className="block md:inline-block p-2 md:mt-0 mr-5 hover:text-violet-400 text-white text-xl md:text-xl"
                to="/signup"
                onClick={closeMenu} // Close menu on click
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              className="block md:inline-block p-2 md:mt-0 mr-5 hover:text-violet-400 text-white text-xl md:text-xl"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
