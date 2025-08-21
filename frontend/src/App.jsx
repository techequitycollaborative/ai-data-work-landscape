// src/App.jsx
// Primary entry point for the microsite, with routing to other pages and navigation configuration

import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Methods from "./pages/Methods";
import Contribute_Jotform from "./pages/Contribute_Jotform_cached";
import Landscape from "./pages/Landscape";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import { Menu, X } from "lucide-react"; // or any icon library
import ReactGA from "react-ga4"; // for Google Analytics tracking

// Initialize Google Analytics once, then use GAListener to track page views for other pages
ReactGA.initialize("G-40YPSZ5R18");

function GAListener({ children }) {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);

  return children;
}

function AppWrapper() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const showFooter = location.pathname !== "/";

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* NAVIGATION BAR */}
      <nav className="relative left-0 w-full bg-[#f3fdb8] z-30 p-4 flex items-center justify-between">
        {/* Logo */}
        <a href="https://techequity.us" target="_blank" rel="noopener noreferrer">
          <img src="/logo.png" alt="TechEquity Logo" className="h-8 md:h-6 w-auto" />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-10 mr-2">
          <NavLink to="/about" className={({ isActive }) => isActive ? "underline" : ""}>about</NavLink>
          <NavLink to="/methods" className={({ isActive }) => isActive ? "underline" : ""}>methods</NavLink>
          <NavLink to="/input" className={({ isActive }) => isActive ? "underline" : ""}>input</NavLink>
          <NavLink to="/landscape" className={({ isActive }) => isActive ? "underline" : ""}>landscape</NavLink>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-black z-50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Overlay Menu */}
      {menuOpen && (
        <div className="fixed top-0 right-0 h-full w-1/2 bg-white/80 backdrop-blur-md shadow-lg flex flex-col items-start gap-6 p-6 text-black text-lg z-40">
          {/* Close button */}
          <button
            onClick={() => setMenuOpen(false)}
            className="self-end mb-4 p-2 rounded hover:bg-gray-200"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>

          <NavLink to="/" onClick={() => setMenuOpen(false)}>home</NavLink>
          <NavLink to="/about" onClick={() => setMenuOpen(false)}>about</NavLink>
          <NavLink to="/methods" onClick={() => setMenuOpen(false)}>methods</NavLink>
          <NavLink to="/input" onClick={() => setMenuOpen(false)}>input</NavLink>
          <NavLink to="/landscape" onClick={() => setMenuOpen(false)}>landscape</NavLink>
        </div>
      )}



      <ScrollToTop />

      {/* Main Content */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/methods" element={<Methods />} />
          <Route path="/input" element={<Contribute_Jotform />} />
          <Route path="/landscape" element={<Landscape />} />
        </Routes>
      </div>

      {/* Footer */}
      {showFooter && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <GAListener>
        <AppWrapper />
      </GAListener>
    </Router>
  );
}
