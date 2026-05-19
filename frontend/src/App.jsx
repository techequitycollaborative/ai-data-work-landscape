// src/App.jsx
// Primary entry point for the microsite, with routing to other pages and navigation configuration

import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/HomeBlockLite";
import About from "./pages/About";
import Database from "./pages/Database";
import Profiles from "./pages/Profiles";
import ProfileDetail from "./pages/ProfileDetail";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/FooterDetailed";
import { Menu, X } from "lucide-react"; // or any icon library
import ReactGA from "react-ga4"; // for Google Analytics tracking
import NetworkGraph from "./pages/NetworkGraphPage";

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
  
  // Remove footer from home page
  const showFooter = location.pathname !== "/";

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* NAVIGATION BAR */}
      <nav className="relative left-0 w-full bg-[#f3fdb8] z-30 p-4 flex items-center justify-between">
        {/* Tech Equity Logo  - with hover effect to indicate it is clickable 
        <NavLink to="/">
          <img src="/logo.png" alt="TechEquity Logo" className="h-8 md:h-6 w-auto hover:opacity-40 transition-all duration-150" />
        </NavLink>*/}

        {/* Just favicon
        <NavLink to="/">
          <img src="/favicon1.png" alt="Globe favicon" className="h-8 md:h-6 w-auto hover:opacity-40 transition-all duration-150" />
        </NavLink> */}

        {/* Favicon + text */}
        <NavLink to="/" className="flex items-center gap-2 hover:opacity-40 transition-all duration-150">
          <img src="/favicon1.png" alt="TechEquity Logo" className="h-8 md:h-6 w-auto" />
          <span className="font-light">The Data Work Landscape</span>
      </NavLink>

        {/* Just text, no logo/favicon
        <NavLink to="/" className="no-underline leading-tight" style={{ fontFamily: "'Anton', sans-serif", color: '#041c2c' }}>
          <span className="block">DATA WORK</span>
          <span className="block">LANDSCAPE</span>
      </NavLink>*/}

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-10 mr-2">
          <NavLink to="/database" className={({ isActive }) => isActive ? "underline" : ""}>database</NavLink>
          <NavLink to="/networkgraph" className={({ isActive }) => isActive ? "underline" : ""}>network graph</NavLink>
          <NavLink to="/profiles" className={({ isActive }) => isActive ? "underline" : ""}>profiles</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "underline" : ""}>about</NavLink>
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
          <NavLink to="/database" onClick={() => setMenuOpen(false)}>database</NavLink>
          <NavLink to="/networkgraph" onClick={() => setMenuOpen(false)}>network graph</NavLink>     
          <NavLink to="/profiles" onClick={() => setMenuOpen(false)}>profiles</NavLink>
          <NavLink to="/about" onClick={() => setMenuOpen(false)}>about</NavLink>  
        </div>
      )}



      <ScrollToTop />

      {/* Main Content */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/database" element={<Database />} />
          <Route path="/networkgraph" element={<NetworkGraph/>} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/profiles/:slug" element={<ProfileDetail />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>

      {/* Footer */}
      {<Footer />}
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
