// src/App.jsx

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ScrollPage from "./pages/ScrollPage";
import About from "./pages/About";
import Methods from "./pages/Methods";

/* Navigation bar and scroll pages on main page */
export default function App() {
  return (
    <Router>
      <div className="scroll-smooth">
      <nav className="fixed top-0 right-0 left-0 w-full bg-white z-10 p-4 shadow flex justify-end">
          <Link to="/" className="ml-4">Home</Link>
          <Link to="/about" className="ml-4">About</Link>
          <Link to="/methods" className="ml-4">Methods</Link>
          <a href="#contribute" className="ml-4">Contribute</a>
      </nav>

        <Routes>
          <Route path="/" element={<ScrollPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/methods" element={<Methods />} />
        </Routes>
      </div>
    </Router>
  );
}
