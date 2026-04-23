// FooterDetailed.jsx
// Footer component for the website, featuring more details such as logo, navigation, and privacy policy

// FooterDetailed.jsx
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer id="myFooter" className="bg-[#041c2c] text-[#f3fdb8] pt-10 pb-6 px-12">
      
      {/* Main footer content */}
      <div className="flex flex-row flex-wrap items-start justify-between gap-10 mb-10">

        {/* Logo block */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img src="/favicon1.png" alt="Globe favicon" className="h-8 w-auto" />
            <span className="font-light text-sm">The Data Work Landscape</span>
          </div>
          <img src="/logo_white.png" alt="TechEquity Logo" className="h-16 w-auto ml-12" />
        </div>

        {/* Nav links — 2x2 grid 
        <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm">
          <NavLink to="/database" className="hover:opacity-60 transition-all">Database</NavLink>
          <NavLink to="/graphs" className="hover:opacity-60 transition-all">Graphs</NavLink>
          <NavLink to="/profiles" className="hover:opacity-60 transition-all">Profiles</NavLink>
          <NavLink to="/about" className="hover:opacity-60 transition-all">About</NavLink>
        </div>*/}

        {/* Nav links - list */}
        <div className="flex flex-col gap-3 text-sm items-end mr-2">
        <span className="font-semibold uppercase tracking-widest mb-1">Explore</span>
        <NavLink to="/database" className="hover:opacity-60 transition-all">Database</NavLink>
        <NavLink to="/graphs" className="hover:opacity-60 transition-all">Graphs</NavLink>
        <NavLink to="/profiles" className="hover:opacity-60 transition-all">Profiles</NavLink>
        <NavLink to="/about" className="hover:opacity-60 transition-all">About</NavLink>
        </div>

      </div>

        {/* Bottom bar */}
        <div className="border-t border-[#f3fdb8]/20 pt-4 flex items-center justify-center gap-8 text-xs text-[#f3fdb8]/50">
        <a href="https://techequity.us/privacy-policy/" className="hover:opacity-100 transition-all" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
        <a href="https://techequity.us/code-of-conduct/" className="hover:opacity-100 transition-all" target="_blank" rel="noopener noreferrer">Terms of Use</a>
        <p>© 2026 TechEquity. All Rights Reserved.</p>
        </div>

    </footer>
  );
}