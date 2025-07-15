import { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Logo } from "./Icons.js";
import { AuthContext } from "../context/AuthContext";

// Reusable NavItem component
const NavItem = ({ to, label, onClick }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block md:inline-block p-2 md:mt-0 mr-5 text-xl md:text-xl hover:text-teal-400 ${isActive ? "text-teal-400" : "text-white"
      }`
    }
    onClick={onClick}
  >
    {label}
  </NavLink>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const handleLogout = () => {
    logout();
    closeMenu();
    navigate('/');
  };

  // Role check
  const isAdmin = user?.id === 1;

  return (
    <header className="bg-black text-gray-100 body-font sticky top-0 z-50">
      <div className="container mx-auto flex flex-wrap p-3 flex-row items-center justify-between">

        {/* Logo */}
        <div className="flex items-center">
          <Link className="flex title-font font-medium items-center text-white" to="/">
            <Logo />
            <span className="ml-3 text-xl">CoolCuts</span>
          </Link>
        </div>

        {/* Hamburger (mobile) */}
        <div className="md:hidden flex items-center">
          <button
            aria-label="Toggle navigation menu"
            className="text-white focus:outline-none"
            onClick={toggleMenu}
          >
            {isOpen ? (
              // "X" icon
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-6 h-6"
                viewBox="0 0 24 24"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger icon
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-6 h-6"
                viewBox="0 0 24 24"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Nav Links */}
        <nav
          className={`md:flex md:items-center md:ml-auto md:mr-0 w-full md:w-auto transition-all duration-300 ease-in-out ${isOpen ? "flex flex-col items-center " : "hidden"}`}>

          <NavItem to="/" label="Home" onClick={closeMenu} />
          <NavItem to="/services" label="Services" onClick={closeMenu} />
          <NavItem to="/book-appointment" label="Book Appointment" onClick={closeMenu} />

          {/* Conditional Routes */}
          {user && (
            <NavItem
              to={isAdmin ? "/appointment-list" : "/myappointments"}
              label={isAdmin ? "Appointment List" : "My Appointments"}
              onClick={closeMenu}
            />
          )}

          {!isAdmin && (
            <>
              <NavItem to="/about-us" label="About Us" onClick={closeMenu} />
              <NavItem to="/contact-us" label="Contact Us" onClick={closeMenu} />
            </>
          )}

          {isAdmin && (
            <NavItem to="/admin-panel" label="Admin Panel" onClick={closeMenu} />
          )}

          {/* Auth Links */}
          {!user ? (
            <>
              <Link
                to="/login"
                onClick={closeMenu}
                className="block md:inline-block p-2 md:mt-0 mr-5 hover:text-violet-400 text-white text-xl md:text-xl"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={closeMenu}
                className="block md:inline-block p-2 md:mt-0 mr-5 hover:text-violet-400 text-white text-xl md:text-xl"
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="block md:inline-block p-2 md:mt-0 mr-5 hover:text-violet-400 text-white text-xl md:text-xl"
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
