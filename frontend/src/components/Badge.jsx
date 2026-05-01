// src/components/Badge.jsx
// Reusable badge component for company profiles, with color coding based on company type, workforce model, and relationship type

const BADGE_COLORS = {
    Workforce:           { bg: "#cde1f9", text: "#000" },
    Tools:               { bg: "#ade4d1", text: "#000" },
    "Tools + Workforce": { bg: "#f6d7ff", text: "#000" },
    Customer:            { bg: "#5b8dee", text: "#fff" },
    Investor:            { bg: "#3aaf6e", text: "#fff" },
    Partner:             { bg: "#f9a825", text: "#fff" },
    "Marketplace Model": { bg: "#00495e", text: "#fff" },
    "BPO Model":         { bg: "#712f39", text: "#fff" },
    "Unclear":           { bg: "#444716", text: "#fff" },
    default:             { bg: "#ccc",    text: "#000" },
  };
  
  const BADGE_TOOLTIPS = {
    Workforce:           "Company provides a workforce to carry out various key tasks in the development and implementation of AI tools.",
    Tools:               "Company provides AI tools such as generative AI, AI automation, data analysis, large language models (LLMs), data management, real-time analytics, and more.",
    "Tools + Workforce": "Company provides some combination of both tools and a workforce.",
    "Marketplace Model": "Digital platforms where distributed workers perform tasks that are posted. Data workers typically work remotely, logging onto these platforms to access tasks.",
    "BPO Model":         "A BPO is a type of outsourcing where a third-party provider is engaged to carry out parts of a company's operations. Data workers are employed at delivery centers, which are typically physical offices based in countries around the world.",
    "Unclear":           "The workforce model for this company is not clear based on available sources.",
  };
  
  export default function Badge({ label }) {
    const c = BADGE_COLORS[label] || BADGE_COLORS.default;
    const tooltip = BADGE_TOOLTIPS[label];
  
    return (
      <span className="relative inline-block group">
        <span
          style={{ background: c.bg, color: c.text }}
          className="inline-block text-xs font-bold tracking-widest uppercase px-2 py-0.5 cursor-default"
        >
          {label}
        </span>
  
        {tooltip && (
          <span className="
            absolute z-50 bottom-full left-0 mb-2 w-56
            bg-[#041c2c] text-[#ffff]
            text-xs font-normal normal-case tracking-normal
            px-3 py-2
            opacity-0 group-hover:opacity-100
            transition-opacity duration-200
            pointer-events-none
          ">
            {tooltip}
            {/* little arrow pointing down */}
            <span className="absolute top-full left-4 border-4 border-transparent border-t-[#041c2c]" />
          </span>
        )}
      </span>
    );
  }