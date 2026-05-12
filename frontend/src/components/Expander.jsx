//components/Expander.jsx
// Expander component for use across pages

import { useState } from "react";

export default function Expander({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 text-left"
        style={{ fontFamily: "'Roboto Serif', serif", background: "none", border: "none", cursor: "pointer" }}
      >
        <h5>{title}</h5>
        <span
          style={{
            display: "inline-block",
            transform: open ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
            fontSize: "2rem",
            color: "#712f39",
          }}
        >
          ›
        </span>
      </button>
      {open && <div className="pb-6">{children}</div>}
    </div>
  );
}