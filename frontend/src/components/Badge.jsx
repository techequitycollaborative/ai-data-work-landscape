// src/components/Badge.jsx
// Reusable badge component for company profiles, with color coding based on company type, workforce model, and relationship type

const BADGE_COLORS = {
    Workforce:           { bg: "#5b8dee", text: "#fff" },
    Platform:            { bg: "#7c5cbf", text: "#fff" },
    Customer:            { bg: "#5b8dee", text: "#fff" },
    Investor:            { bg: "#3aaf6e", text: "#fff" },
    "Parent Company":    { bg: "#888",    text: "#fff" },
    "Marketplace Model": { bg: "#041c2c", text: "#fff" },
    "Managed Workforce": { bg: "#041c2c", text: "#fff" },
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