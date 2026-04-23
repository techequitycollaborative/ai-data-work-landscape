// src/components/Badge.jsx
// Reusable badge component for company profiles, with color coding based on company type, workforce model, and relationship type

const BADGE_COLORS = {
    Workforce:           { bg: "#cde1f9", text: "#000" },
    Tools:               { bg: "#ade4d1", text: "#000" },
    "Tools + Workforce": { bg: "#f6d7ff", text: "#000" },
    Customer:            { bg: "#5b8dee", text: "#fff" },
    Investor:            { bg: "#3aaf6e", text: "#fff" },
    "Marketplace Model": { bg: "#00495e", text: "#fff" },
    "BPO Model":         { bg: "#712f39", text: "#fff" },
    "Unclear":           { bg: "#444716", text: "#fff" },
    default:             { bg: "#ccc",    text: "#000" },
  };
  
  export default function Badge({ label }) {
    const c = BADGE_COLORS[label] || BADGE_COLORS.default;
    return (
      <span
        style={{ background: c.bg, color: c.text }}
        className="inline-block text-xs font-bold tracking-widest uppercase px-2 py-0.5"
      >
        {label}
      </span>
    );
  }