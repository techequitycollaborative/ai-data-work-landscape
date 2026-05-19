// components/HoverTooltip.jsx
// Hover tooltip for buttons on the network graph

import { useState } from "react";

export default function HoverTooltip({ children, tip }) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      style={{ position: "relative", display: "inline-flex", alignItems: "center" }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}

      {visible && (
        <div style={{
          position:      "absolute",
          bottom:        "calc(100% + 8px)",
          left:          "50%",
          transform:     "translateX(-50%)",
          width:         180,
          background:    "#041c2c",
          color:         "#fff",
          fontSize:      11,
          fontFamily:    "IBM Plex Mono, monospace",
          fontWeight:    400,
          lineHeight:    1.5,
          padding:       "7px 10px",
          borderRadius:  2,
          pointerEvents: "none",
          zIndex:        100,
          whiteSpace:    "normal",
          textAlign:     "left",
        }}>
          {tip}
          {/* Arrow pointing down */}
          <div style={{
            position:    "absolute",
            top:         "100%",
            left:        "50%",
            transform:   "translateX(-50%)",
            width:       0,
            height:      0,
            borderLeft:  "5px solid transparent",
            borderRight: "5px solid transparent",
            borderTop:   "5px solid #041c2c",
          }} />
        </div>
      )}
    </div>
  );
}