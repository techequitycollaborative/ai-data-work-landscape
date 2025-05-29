// src/App.jsx

import { BrowserRouter as Router, Routes, Route, NavLink, useLocation, useNavigate } from "react-router-dom";
import ScrollPage from "./pages/ScrollPage";
import About from "./pages/About";
import Methods from "./pages/Methods";
import Contribute from "./pages/Contribute";
import { useEffect } from "react";

// Wrapper to use hooks with Router
function AppWrapper() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/" && location.state?.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="scroll-smooth h-screen overflow-y-scroll">
      {/* NAVIGATION BAR */}
      {/* Add "shadow" to add bordered effect to nav bar */}
      <nav className="relative left-0 w-full bg-[#f3fdb8] z-10 p-4 flex items-center justify-between"> 
        {/* LEFT SIDE: Logo */}
        <div>
          <NavLink to="/">
          <h4 className="text-xs text-bold text-[#041c2c]">The Data Work <br></br>Landscape</h4>
          {/*<img src="/logo.png" alt="TechEquity Logo" className="h-6" />*/}
          </NavLink>
        </div>
        {/* RIGHT SIDE: Navigation Links */}
        <div className="flex gap-4">
          <NavLink to="/about" className={({ isActive }) => isActive ? "underline" : ""}>about</NavLink>
          <NavLink to="/methods" className={({ isActive }) => isActive ? "underline" : ""}>methods</NavLink>
          <NavLink to="/contribute" className={({ isActive }) => isActive ? "underline" : ""}>contribute</NavLink>
          {/*<button onClick={() => scrollToSection("contribute")}>contribute</button>*/}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<ScrollPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/methods" element={<Methods />} />
        <Route path="/contribute" element={<Contribute />} />
      </Routes>
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
