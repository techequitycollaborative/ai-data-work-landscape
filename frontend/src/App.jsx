// src/App.jsx
// Primary entry point for the site, with routing and navigation

import { BrowserRouter as Router, Routes, Route, NavLink, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Methods from "./pages/Methods";
import Contribute_Jotform from "./pages/Contribute_Jotform";
import Landscape from "./pages/Landscape";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";

// Wrapper to use hooks with Router
function AppWrapper() {

  const location = useLocation();

  const showFooter = location.pathname !== "/";

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* NAVIGATION BAR */}
      <nav className="relative left-0 w-full bg-[#f3fdb8] z-10 p-4 mr-10 flex items-center justify-between">
        {/* LEFT SIDE: Logo */}
        <div>
          <a href="https://techequity.us" target="_blank" rel="noopener noreferrer">
            <img src="/logo.png" alt="TechEquity Logo" className="h-6" />
          </a>
        </div>
        {/* RIGHT SIDE: Navigation Links */}
        <div className="flex gap-10">
          <NavLink to="/about" className={({ isActive }) => isActive ? "underline" : ""}>about</NavLink>
          <NavLink to="/methods" className={({ isActive }) => isActive ? "underline" : ""}>methods</NavLink>
          <NavLink to="/input" className={({ isActive }) => isActive ? "underline" : ""}>input</NavLink>
          <NavLink to="/landscape" className={({ isActive }) => isActive ? "underline" : ""}>landscape</NavLink>
        </div>
      </nav>

      <ScrollToTop />

      {/* Main page content */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/methods" element={<Methods />} />
          <Route path="/input" element={<Contribute_Jotform />} />
          <Route path="/landscape" element={<Landscape />} />
        </Routes>
      </div>

      {/* FOOTER -- on every page except Home */}
      {showFooter && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

