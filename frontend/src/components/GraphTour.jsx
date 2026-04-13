// components/GraphTour.jsx
// A helper component to guide users through the graphs
// Features pop-ups with info about key aspects of the graphs, which users can click through

import { useState, useEffect, useCallback, useRef } from "react";

const NETWORK_STEPS = [
  {
    id: "node",
    label: "Data work company nodes",
    body: "Nodes in red are data work companies — the primary subjects of this network. Hover on any node to see its relationships and view company details.",
    getTarget: (container) => {
      const svg = container.querySelector("svg");
      if (!svg) return null;
      const circles = svg.querySelectorAll("circle");
      for (const c of circles) {
        if (c.getAttribute("stroke") === "#ff3b00" && parseFloat(c.getAttribute("r")) > 10) {
          const rect = c.getBoundingClientRect();
          const cr = container.getBoundingClientRect();
          return { x: rect.left - cr.left, y: rect.top - cr.top, w: rect.width, h: rect.height };
        }
      }
      return null;
    },
    anchor: "right",
  },
  {
    id: "links",
    label: "Relationship lines",
    body: "Each line represents a business relationship. Hover on a node to highlight only its connections.",
    getTarget: (container) => {
      const line = container.querySelector("line.link");
      if (!line) return null;
      const rect = line.getBoundingClientRect();
      const cr = container.getBoundingClientRect();
      return { x: rect.left - cr.left, y: rect.top - cr.top, w: Math.max(rect.width, 60), h: Math.max(rect.height, 10) };
    },
    anchor: "below",
  },
  {
    id: "search",
    label: "Search bar",
    body: "Type a company name to zoom directly to it. Click the Clear button to return to the default view.",
    getTarget: () => {
      const el = document.getElementById("rn-company-search");
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const wrap = document.getElementById("rn-graph-container").getBoundingClientRect();
      return { x: rect.left - wrap.left - 8, y: -46 + (rect.top - wrap.top) + 4, w: rect.width + 16, h: rect.height + 8 };
    },
    anchor: "below",
  },
  {
    id: "legend",
    label: "Legend",
    body: "The legend maps line colors to relationship types.",
    getTarget: () => {
      const el = document.getElementById("rn-network-legend");
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const wrap = document.getElementById("rn-graph-container").getBoundingClientRect();
      return { x: rect.left - wrap.left - 8, y: -46 + (rect.top - wrap.top) + 4, w: rect.width + 16, h: rect.height + 8 };
    },
    anchor: "below-left",
  },
];

const INVESTOR_STEPS = [
  {
    id: "inv-company",
    label: "Data work company nodes",
    body: "The left column lists data work companies. Hover on one to highlight all its investor connections.",
    getTarget: (container) => {
      const circle = container.querySelector(".bp-node-company");
      if (!circle) return null;
      const rect = circle.getBoundingClientRect();
      const cr = container.getBoundingClientRect();
      return { x: rect.left - cr.left, y: rect.top - cr.top, w: rect.width, h: rect.height };
    },
    anchor: "right",
  },
  {
    id: "inv-investor",
    label: "Investor nodes",
    body: "The right column lists investors. Hover on one to see which data work companies it has funded.",
    getTarget: (container) => {
      const circle = container.querySelector(".bp-node-investor");
      if (!circle) return null;
      const rect = circle.getBoundingClientRect();
      const cr = container.getBoundingClientRect();
      return { x: rect.left - cr.left, y: rect.top - cr.top, w: rect.width, h: rect.height };
    },
    anchor: "left",
  },
  {
    id: "inv-search",
    label: "Search bar",
    body: "Filter the graph by typing a company or investor name.",
    getTarget: () => {
      const el = document.getElementById("rn-bp-filter");
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const wrap = document.getElementById("rn-graph-container").getBoundingClientRect();
      return { x: rect.left - wrap.left - 8, y: -46 + (rect.top - wrap.top) + 4, w: rect.width + 16, h: rect.height + 8 };
    },
    anchor: "below",
  },
];

export function useGraphTour() {
    const [active, setActive] = useState(false);
    const [step, setStep] = useState(0);
    const stepsRef = useRef(NETWORK_STEPS);
    const [, forceRender] = useState(0);
  
    const startNetwork = useCallback(() => {
      stepsRef.current = NETWORK_STEPS;
      setStep(0);
      setActive(true);
      forceRender(n => n + 1);
    }, []);
  
    const startInvestor = useCallback(() => {
      stepsRef.current = INVESTOR_STEPS;
      setStep(0);
      setActive(true);
      forceRender(n => n + 1);
    }, []);
  
    const stop = useCallback(() => setActive(false), []);
  
    const next = useCallback(() => {
      setStep(s => {
        if (s < stepsRef.current.length - 1) return s + 1;
        setActive(false);
        return s;
      });
    }, []);
  
    const prev = useCallback(() => setStep(s => Math.max(0, s - 1)), []);
  
    return { active, step, steps: stepsRef.current, startNetwork, startInvestor, stop, next, prev };
  }

export function GraphTourOverlay({ containerRef, active, step, steps, next, prev, stop }) {
  const [pos, setPos] = useState(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;
    function compute() {
      const target = steps[step].getTarget(containerRef.current);
      setPos(target);
    }
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [active, step, containerRef, steps]);

  if (!active) return null;

  const s = steps[step];
  const containerH = containerRef.current?.clientHeight || 500;
  const containerW = containerRef.current?.clientWidth  || 800;
  const POPUP_W = 230;
  const POPUP_H = 160;
  const pad = 10;

  let spotStyle = { top: 0, left: 0, width: 40, height: 40, borderRadius: "50%" };
  let popupStyle = { top: 60, left: 60, width: POPUP_W };

  if (pos) {
    const sl = pos.x - pad, st = pos.y - pad;
    const sw = pos.w + pad * 2, sh = pos.h + pad * 2;
    spotStyle = {
      left: sl, top: st, width: sw, height: sh,
      borderRadius: pos.h < 28 ? 6 : 50,
    };
    let pl, pt;
    if (s.anchor === "right")       { pl = sl + sw + 12; pt = st + sh / 2 - POPUP_H / 2; }
    else if (s.anchor === "left")   { pl = sl - POPUP_W - 12; pt = st + sh / 2 - POPUP_H / 2; }
    else if (s.anchor === "below")  { pl = sl + sw / 2 - POPUP_W / 2; pt = st + sh + 12; }
    else                            { pl = sl + sw - POPUP_W; pt = st + sh + 12; }

    pl = Math.max(8, Math.min(pl, containerW - POPUP_W - 8));
    pt = Math.max(8, Math.min(pt, containerH - POPUP_H - 8));
    popupStyle = { left: pl, top: pt, width: POPUP_W };
  }

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 200, pointerEvents: "none" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)" }} />
      <div style={{
        position: "absolute", pointerEvents: "none",
        boxShadow: "0 0 0 9999px rgba(0,0,0,0.35)",
        transition: "all 0.35s cubic-bezier(.4,0,.2,1)",
        ...spotStyle,
      }} />
      <div style={{
        position: "absolute", pointerEvents: "all",
        background: "#fff",
        border: "0.5px solid rgba(0,0,0,0.15)",
        borderRadius: 12, padding: "14px 16px",
        boxSizing: "border-box",
        transition: "left 0.35s cubic-bezier(.4,0,.2,1), top 0.35s cubic-bezier(.4,0,.2,1)",
        fontFamily: "IBM Plex Mono, monospace",
        ...popupStyle,
      }}>
        <button
          onClick={stop}
          style={{
            position: "absolute", top: 8, right: 8,
            background: "none", border: "none", cursor: "pointer",
            fontSize: 14, lineHeight: 1, color: "#888", padding: "0 2px",
            fontFamily: "IBM Plex Mono, monospace",
          }}
        >×</button>
        <div style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".08em", color: "#888", marginBottom: 4 }}>
          Step {step + 1} of {steps.length}
        </div>
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 6, color: "#111" }}>
          {s.label}
        </div>
        <div style={{ fontSize: 12, lineHeight: 1.6, color: "#555", marginBottom: 14 }}>
          {s.body}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 5 }}>
            {steps.map((_, i) => (
              <div key={i} style={{
                width: 5, height: 5, borderRadius: "50%",
                background: i === step ? "#111" : "rgba(0,0,0,0.15)",
                transition: "background .2s",
              }} />
            ))}
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {step > 0 && (
              <button onClick={prev} style={{
                fontSize: 12, padding: "4px 10px", borderRadius: 8,
                border: "0.5px solid rgba(0,0,0,0.2)", background: "transparent",
                color: "#555", cursor: "pointer", fontFamily: "IBM Plex Mono, monospace",
              }}>Back</button>
            )}
            <button onClick={next} style={{
                fontSize: 12, padding: "4px 10px", borderRadius: 8,
                border: "none", background: "#111", color: "#fff", cursor: "pointer",
                fontFamily: "IBM Plex Mono, monospace",
                }}>
                {step === steps.length - 1 ? "Done" : "Next"}
                </button>
          </div>
        </div>
      </div>
    </div>
  );
}