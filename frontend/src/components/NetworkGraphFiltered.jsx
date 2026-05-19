// components/NetworkGraphFiltered.jsx
// Original network graph was too cluttered due to high volume of data
// This alternative network graph allows users to first select a company before any data appears
// NOTE: this currently includes ALL relationships, including investors (so investor graph is not a separate graph)

import { useEffect, useRef, useState, useCallback } from "react";
import * as d3 from "d3";
import Papa from "papaparse";
import nodesRaw from "../data/nodes.csv?raw";
import relationshipsRaw from "../data/relationships.csv?raw";
import "../graph.css";

// Constants (match graph.css CSS variables exactly) 
const NODE_COLOR      = "#00495e";
const DATA_WORK_COLOR = "#ff3b00";
const FALLBACK_COLOR  = "#ade4d1";

const REL_TYPES = {
  customer: { color: "#0041d9", label: "Customers" },
  partner:  { color: "#712f39", label: "Partners"  },
  subcontractor: { color: "#f1592d", label: "Subcontractors" },  // amber — distinct from DATA_WORK_COLOR red
  investor: { color: "#2d9f8b", label: "Investors" },
};

const REL_TOOLTIPS = {
  customer:
    "A business that purchases a company’s goods or services, tools, etc.",
  partner:
    "A business or institution with which a company maintains a strategic relationship (e.g. a data work company partnering with a cloud service provider).",
  subcontractor:
    "A business to which a company outsources parts of its production or service process (e.g. Scale AI outsources data work to UpWork).",
  investor:
    "A business or individual that commits capital to a company in expectation of a financial return.",
};

const UNCLEAR_TYPES = new Set(["unclear", "could not verify any relationship"]);

function relColor(type) {
  return REL_TYPES[type]?.color ?? FALLBACK_COLOR;
}

function isDataWork(node) {
  return node?.industry === "Data Work Company";
}

// Parse raw data
const _rawNodes = Papa.parse(nodesRaw, { header: true, skipEmptyLines: true }).data;
const _rawRels  = Papa.parse(relationshipsRaw, { header: true, skipEmptyLines: true }).data;

// Build a temporary node map from ALL raw nodes (needed to validate link endpoints)
const _rawNodeMap = new Map(_rawNodes.map(d => [d.name.trim(), d]));

// Parse all links, filtering only to nodes that exist
const _ALL_LINKS = _rawRels
  .map(d => ({
    source:              d.source.trim(),
    target:              d.target.trim(),
    type:                (d.relationship_type || "").trim().toLowerCase() || "unknown",
    relationship_source: (d.relationship_source || "").trim(),
    include:             (d["Include in graphs on microsite?"] || "").trim().toLowerCase(),
  }))
  .filter(d => _rawNodeMap.has(d.source) && _rawNodeMap.has(d.target));

console.log("Raw rels:", _rawRels.length);
console.log("After node existence filter:", _ALL_LINKS.length);

// Keep only verified relationships that are marked for inclusion
// i.e. they cannot have 'unclear' or 'could not verify' types, and must have 'yes' in the include column
const ALL_LINKS = _ALL_LINKS.filter(l =>
  !UNCLEAR_TYPES.has(l.type) &&
  l.include === "yes"
);

// Now we know which IDs have legit relationships
const LEGIT_IDS = new Set(ALL_LINKS.flatMap(l => [l.source, l.target]));

// Build ALL_NODES filtered to only legit companies
const ALL_NODES = _rawNodes
  .map(d => ({
    id:       d.name.trim(),
    name:     d.name.trim(),
    type:     (d.type     || "").trim(),
    industry: (d.industry || "").trim(),
    location: (d.location || "").trim(),
  }))
  .filter(n => LEGIT_IDS.has(n.id));

// NODE_MAP now only contains legit nodes
const NODE_MAP = new Map(ALL_NODES.map(n => [n.id, n]));

// Adjacency map: id → [{ neighbor, type, relationship_source }]
const ADJACENCY = new Map();
ALL_LINKS.forEach(({ source, target, type, relationship_source }) => {
  if (!ADJACENCY.has(source)) ADJACENCY.set(source, []);
  if (!ADJACENCY.has(target)) ADJACENCY.set(target, []);
  ADJACENCY.get(source).push({ neighbor: target, type, relationship_source });
  ADJACENCY.get(target).push({ neighbor: source, type, relationship_source });
});

// Total degree per node (for badge on neighbour nodes)
const DEGREE = new Map();
ALL_NODES.forEach(n => DEGREE.set(n.id, ADJACENCY.get(n.id)?.length ?? 0));

const ALL_COMPANY_NAMES = ALL_NODES.map(n => n.name).sort();

// Data Work Companies — shown in sidebar for quick selection (alphabetized)
const DATA_WORK_COMPANIES = ALL_NODES
  .filter(n => n.industry === "Data Work Company")
  .map(n => n.name)
  .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));

//  Ego subgraph builder 
function buildEgoGraph(centerId, hops, activeTypes) {
  const visited = new Map(); // id → hop distance
  const queue   = [centerId];
  visited.set(centerId, 0);

  while (queue.length) {
    const current = queue.shift();
    const dist    = visited.get(current);
    if (dist >= hops) continue;
    (ADJACENCY.get(current) || []).forEach(({ neighbor, type }) => {
      if (!activeTypes.has(type)) return;
      if (!visited.has(neighbor)) {
        visited.set(neighbor, dist + 1);
        queue.push(neighbor);
      }
    });
  }

  const nodeIds = new Set(visited.keys());
  const nodes   = [...nodeIds]
    .map(id => ({ ...NODE_MAP.get(id), hopDistance: visited.get(id) }))
    .filter(Boolean);

  const linkSet = new Set();
  const links   = [];
  ALL_LINKS.forEach(l => {
    if (!nodeIds.has(l.source) || !nodeIds.has(l.target)) return;
    if (!activeTypes.has(l.type)) return;
    const key = [l.source, l.target, l.type].join("||");
    if (linkSet.has(key)) return;
    linkSet.add(key);
    links.push({ ...l });
  });

  return { nodes, links };
}

//  Component
export default function NetworkGraphFiltered() {
  const svgRef       = useRef(null);
  const containerRef = useRef(null);
  const tooltipRef   = useRef(null);
  const simRef       = useRef(null);

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [hops,            setHops]            = useState(1);
  const [activeTypes,     setActiveTypes]     = useState(new Set(Object.keys(REL_TYPES)));
  const [searchVal,       setSearchVal]       = useState("");
  const [suggestions,     setSuggestions]     = useState([]);
  const [selIdx,          setSelIdx]          = useState(-1);
  const [graphStats,      setGraphStats]      = useState(null);

  //  Search 
  const handleSearchChange = useCallback(e => {
    const q = e.target.value;
    setSearchVal(q);
    setSelIdx(-1);
    if (!q.trim()) { setSuggestions([]); return; }
    setSuggestions(
      ALL_COMPANY_NAMES
        .filter(n => n.toLowerCase().includes(q.trim().toLowerCase()))
        .slice(0, 10)
    );
  }, []);

  const selectCompany = useCallback(name => {
    setSelectedCompany(name);
    setSearchVal(name);
    setSuggestions([]);
    setSelIdx(-1);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedCompany(null);
    setSearchVal("");
    setSuggestions([]);
    setSelIdx(-1);
    setGraphStats(null);
    if (simRef.current) { simRef.current.stop(); simRef.current = null; }
    d3.select(svgRef.current).selectAll("*").remove();
  }, []);

  const toggleType = useCallback(type => {
    setActiveTypes(prev => {
      const next = new Set(prev);
      next.has(type) ? next.delete(type) : next.add(type);
      return next;
    });
  }, []);

  const handleKeyDown = useCallback(e => {
    if (!suggestions.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelIdx(i => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelIdx(i => (i - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selIdx >= 0) selectCompany(suggestions[selIdx]);
      else if (suggestions.length === 1) selectCompany(suggestions[0]);
    } else if (e.key === "Escape") {
      setSuggestions([]);
    }
  }, [suggestions, selIdx, selectCompany]);

  //  D3 render 
  useEffect(() => {
    if (!selectedCompany) return;

    const svg       = d3.select(svgRef.current);
    const container = containerRef.current;
    const tooltip   = tooltipRef.current;

    svg.selectAll("*").remove();
    if (simRef.current) simRef.current.stop();

    const { nodes, links } = buildEgoGraph(selectedCompany, hops, activeTypes);
    setGraphStats({ nodes: nodes.length, links: links.length });
    if (!nodes.length) return;

    let width  = container.clientWidth;
    let height = container.clientHeight;

    svg.attr("width", width).attr("height", height);

    //  Defs: glow filter + arrow markers 
    const defs  = svg.append("defs");
    const glowF = defs.append("filter").attr("id", "egf-glow");
    glowF.append("feGaussianBlur").attr("stdDeviation", "3.5").attr("result", "coloredBlur");
    const fmg = glowF.append("feMerge");
    fmg.append("feMergeNode").attr("in", "coloredBlur");
    fmg.append("feMergeNode").attr("in", "SourceGraphic");

    [...new Set(links.map(l => l.type))].forEach(type => {
      defs.append("marker")
        .attr("id",          `egf-arrow-${type}`)
        .attr("viewBox",     "0 -4 8 8")
        .attr("refX",        18).attr("refY", 0)
        .attr("markerWidth", 6).attr("markerHeight", 6)
        .attr("orient",      "auto")
        .append("path")
        .attr("d",       "M0,-4L8,0L0,4")
        .attr("fill",    relColor(type))
        .attr("opacity", 0.7);
    });

    //  Zoom + pan 
    const g    = svg.append("g");
    const zoom = d3.zoom()
      .scaleExtent([0.1, 5])
      .on("zoom", event => g.attr("transform", event.transform));
    svg.call(zoom);

    //  Force simulation 
    // Scale repulsion + link distance by graph size so 2-hop views stay readable
    const N = nodes.length;

    // Charge: stronger repulsion for larger graphs
    const chargeStrength = n => {
      if (n.id === selectedCompany) return -1400;
      return N > 80 ? -900 : N > 40 ? -700 : -550;
    };

    // Link distance: hop-2 edges pushed further out; bigger graphs need more room
    const linkDistance = d => {
      const sHop = (typeof d.source === "object" ? d.source : nodes.find(n => n.id === d.source))?.hopDistance;
      const tHop = (typeof d.target === "object" ? d.target : nodes.find(n => n.id === d.target))?.hopDistance;
      const base = N > 80 ? 200 : N > 40 ? 175 : 150;
      return (sHop === 2 || tHop === 2) ? base + 60 : base;
    };

    // Collision radius: give nodes more personal space in dense graphs
    const collideRadius = N > 80 ? 60 : N > 40 ? 52 : 44;

    const centerNode = nodes.find(n => n.id === selectedCompany);
    if (centerNode) { centerNode.fx = width / 2; centerNode.fy = height / 2; }

    const sim = d3.forceSimulation(nodes)
      .force("link",      d3.forceLink(links).id(d => d.id).distance(linkDistance).strength(0.45))
      .force("charge",    d3.forceManyBody().strength(chargeStrength).distanceMax(700))
      .force("center",    d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide(collideRadius).strength(1.0).iterations(3))
      .force("x",         d3.forceX(width  / 2).strength(0.025))
      .force("y",         d3.forceY(height / 2).strength(0.025))
      .alphaDecay(0.022)   // slower cool-down → nodes settle into better positions
      .velocityDecay(0.4); // a little more friction keeps things from flying around

    simRef.current = sim;

    // Release centre pin after it's had time to anchor the ring
    setTimeout(() => {
      if (centerNode) { centerNode.fx = null; centerNode.fy = null; }
    }, 1000);

    //  Links (use graph.css .link classes for colour) 
    const linkSel = g.append("g").attr("class", "links")
      .selectAll("line").data(links).join("line")
      .attr("class", d => `link ${d.type}`);
      // arrowheads omitted (matches original NetworkGraph)

    //  Nodes
    const nodeSel = g.append("g").attr("class", "nodes")
      .selectAll("g").data(nodes).join("g")
      .attr("class", "node")
      .call(
        d3.drag()
          .on("start", (e, d) => { if (!e.active) sim.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
          .on("drag",  (e, d) => { d.fx = e.x; d.fy = e.y; })
          .on("end",   (e, d) => { if (!e.active) sim.alphaTarget(0); d.fx = null; d.fy = null; })
      );

    // Outer ring of nodes
    nodeSel.append("circle")
      .attr("r",            d => d.id === selectedCompany ? 22 : 16)
      .attr("fill",         d => isDataWork(d) ? DATA_WORK_COLOR : NODE_COLOR)
      .attr("fill-opacity", 0.18)
      .attr("stroke",       d => isDataWork(d) ? DATA_WORK_COLOR : NODE_COLOR)
      .attr("stroke-width", d => d.id === selectedCompany ? 2 : 1);

    // Inner glow dot of nodes
    nodeSel.append("circle")
      .attr("r",            d => d.id === selectedCompany ? 7 : 5)
      .attr("fill",         d => isDataWork(d) ? DATA_WORK_COLOR : NODE_COLOR)
      .attr("fill-opacity", 0.8)
      .style("filter",      "url(#egf-glow)");

    // Dashed ring on hop-2 nodes — visual cue they are one step further out
    nodeSel.filter(d => d.hopDistance === 2)
      .append("circle")
      .attr("r",               20)
      .attr("fill",            "none")
      .attr("stroke",          "#5a6380")
      .attr("stroke-width",    0.75)
      .attr("stroke-dasharray","3,3")
      .attr("stroke-opacity",  0.4)
      .attr("pointer-events",  "none");

    // Label
    nodeSel.append("text")
      .attr("x",                 d => d.id === selectedCompany ? 0  : 20)
      .attr("y",                 d => d.id === selectedCompany ? 36 : 0)
      .attr("text-anchor",       d => d.id === selectedCompany ? "middle" : "start")
      .attr("dominant-baseline", d => d.id === selectedCompany ? "auto" : "middle")
      .attr("font-weight",       d => d.id === selectedCompany || isDataWork(d) ? "700" : "400")
      .attr("fill",              d => isDataWork(d) ? DATA_WORK_COLOR : null) // null inherits graph.css fill
      .text(d => d.name.length > 28 ? d.name.slice(0, 26) + "…" : d.name);

    //  Interactions 
    nodeSel
      .on("mouseover", function(event, d) {
        // Collect rendered neighbours + their link indices
        const neighbourIds = new Set([d.id]);
        const hitLinks     = [];
        links.forEach((l, i) => {
          const s = typeof l.source === "object" ? l.source.id : l.source;
          const t = typeof l.target === "object" ? l.target.id : l.target;
          if (s === d.id || t === d.id) {
            neighbourIds.add(s);
            neighbourIds.add(t);
            hitLinks.push({ i, type: l.type, other: s === d.id ? t : s });
          }
        });

        nodeSel
          .classed("dimmed",      n => !neighbourIds.has(n.id))
          .classed("highlighted", n =>  neighbourIds.has(n.id));
        linkSel
          .classed("dimmed",      (l, i) => !hitLinks.find(h => h.i === i))
          .classed("highlighted", (l, i) =>  !!hitLinks.find(h => h.i === i));

        // Count rendered relationships by type
        const byType = {};
        hitLinks.forEach(({ type }) => {
          byType[type] = (byType[type] || 0) + 1;
        });

        const totalDeg  = DEGREE.get(d.id) ?? 0;
        const shownDeg  = neighbourIds.size - 1;
        const nodeColor = isDataWork(d) ? DATA_WORK_COLOR : NODE_COLOR;

        // Pluralize helper
        const rWord = n => n === 1 ? "relationship" : "relationships";

        // Relationship type rows — DATA WORK COMPANIES ONLY
        const typeRows = isDataWork(d)
          ? Object.entries(byType).map(([t, count]) =>
              `<div class="tip-type-row">
                <span class="tip-type-dot" style="background:${relColor(t)}"></span>
                <span class="tip-type-label">${REL_TYPES[t]?.label ?? t}</span>
                <span class="tip-type-count">${count}</span>
              </div>`
            ).join("")
          : "";

        const divider = isDataWork(d) && Object.keys(byType).length
          ? `<div class="tip-divider"></div>` : "";

        tooltip.innerHTML = `
          <div class="tip-color-bar" style="background:${nodeColor}"></div>
          <div class="tip-name">${d.name}</div>
          ${d.industry ? `<div class="tip-industry" style="color:${nodeColor}">${d.industry}</div>` : ""}
          ${d.location  ? `<div class="tip-location"  style="color:${nodeColor}">${d.location}</div>`  : ""}
          ${divider}
          ${typeRows}
          <div class="tip-footer">${shownDeg} shown&nbsp;·&nbsp;${totalDeg} direct ${rWord(totalDeg)}</div>
        `;
        tooltip.classList.add("visible");
        moveTooltip(event);
      })
      .on("mousemove", moveTooltip)
      .on("mouseleave", () => {
        nodeSel.classed("dimmed", false).classed("highlighted", false);
        linkSel.classed("dimmed", false).classed("highlighted", false);
        tooltip.classList.remove("visible");
      })
      .on("click", (event, d) => {
        if (d.id !== selectedCompany) selectCompany(d.name);
      });

    //  Tick 
    sim.on("tick", () => {
      linkSel
        .attr("x1", d => d.source.x).attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x).attr("y2", d => d.target.y);
      nodeSel.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    // Auto-fit to graph bounds once simulation has cooled
    sim.on("end", () => {
      const PAD = 90;
      const xs  = nodes.map(n => n.x).filter(Boolean);
      const ys  = nodes.map(n => n.y).filter(Boolean);
      if (!xs.length) return;
      const x0 = Math.min(...xs) - PAD, x1 = Math.max(...xs) + PAD;
      const y0 = Math.min(...ys) - PAD, y1 = Math.max(...ys) + PAD;
      const sc = Math.min(0.9, Math.min(width / (x1 - x0), height / (y1 - y0)));
      const tx = width  / 2 - sc * (x0 + x1) / 2;
      const ty = height / 2 - sc * (y0 + y1) / 2;
      svg.transition().duration(700)
        .call(zoom.transform, d3.zoomIdentity.translate(tx, ty).scale(sc));
    });

    //  Resize 
    function handleResize() {
      width  = container.clientWidth;
      height = container.clientHeight;
      svg.attr("width", width).attr("height", height);
      sim.force("center", d3.forceCenter(width / 2, height / 2)).alpha(0.2).restart();
    }
    window.addEventListener("resize", handleResize);

    //  Zoom buttons
    const btnIn  = document.getElementById("egf-zoom-in");
    const btnOut = document.getElementById("egf-zoom-out");
    const btnRst = document.getElementById("egf-zoom-reset");
    const onIn   = () => svg.transition().duration(300).call(zoom.scaleBy, 1.4);
    const onOut  = () => svg.transition().duration(300).call(zoom.scaleBy, 0.7);
    const onRst  = () => svg.transition().duration(400).call(
      zoom.transform,
      d3.zoomIdentity.translate(width / 2, height / 2).scale(1).translate(-width / 2, -height / 2)
    );
    btnIn?.addEventListener("click",  onIn);
    btnOut?.addEventListener("click", onOut);
    btnRst?.addEventListener("click", onRst);

    function moveTooltip(event) {
      const rect = container.getBoundingClientRect();
      const x    = event.clientX - rect.left;
      const y    = event.clientY - rect.top;
      const tw   = tooltip.offsetWidth  + 16;
      const th   = tooltip.offsetHeight + 16;
      tooltip.style.left = (x + tw > width  ? x - tw : x + 16) + "px";
      tooltip.style.top  = (y + th > height ? y - th : y + 8)  + "px";
    }

    return () => {
      sim.stop();
      window.removeEventListener("resize", handleResize);
      btnIn?.removeEventListener("click",  onIn);
      btnOut?.removeEventListener("click", onOut);
      btnRst?.removeEventListener("click", onRst);
    };
  }, [selectedCompany, hops, activeTypes, selectCompany]);

  //  Derived values for JSX 
  const centerNode = selectedCompany ? NODE_MAP.get(selectedCompany) : null;
  const totalDeg   = selectedCompany ? (DEGREE.get(selectedCompany) ?? 0) : 0;

  //  JSX
  return (
    <div
      className="network-page"
      style={{
        display:       "flex",
        flexDirection: "column",
        height:        "calc(100vh - 56px)",
        border:        "1px solid #1e2330",
        borderRadius:  "0.5rem",
        overflow: "visible",
      }}
    >
      {/*  Header  */}
      <header className="network-header" style={{ gap: 40 }}>

        {/* Search — uses graph.css .search classes */}
        <div className="search" id="rn-network-search" style={{ position: "relative" }}>
          <span className="search-label">Explore a company</span>
          <input
            type="text"
            value={searchVal}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            placeholder="Type a company name…"
            autoComplete="off"
            spellCheck={false}
          />
          {suggestions.length > 0 && (
            <ul
              className="suggestions"
              style={{ display: "block", position: "absolute", top: "calc(100% + 28px)", left: 0 }}
            >
              {suggestions.map((name, i) => (
                <li
                  key={name}
                  style={i === selIdx ? { background: "var(--accent)", color: "#fff" } : {}}
                  onMouseDown={() => selectCompany(name)}
                >
                  {name}
                </li>
              ))}
            </ul>
          )}
          {selectedCompany && (
            <button
              className="bp-clear-btn"
              onClick={clearSelection}
              style={{ marginLeft: 8 }}
            >
              Clear
            </button>
          )}
        </div>

        {/* Depth toggle — uses graph.css .view-toggle classes */}
        <div className="view-toggle">

          <div className="level-tooltip-wrap">
            <button
              className={`toggle-btn${hops === 1 ? " active" : ""}`}
              onClick={() => setHops(1)}
            >
              1 Level
            </button>

            <div className="level-tooltip">
              Shows only direct relationships of the selected company.
              <span className="level-tooltip-arrow" />
            </div>
          </div>

          <div className="toggle-divider" />

          <div className="level-tooltip-wrap">
            <button
              className={`toggle-btn${hops === 2 ? " active" : ""}`}
              onClick={() => setHops(2)}
            >
              2 Levels
            </button>

            <div className="level-tooltip">
              Shows direct relationships plus relationships of relationships.
              <span className="level-tooltip-arrow" />
            </div>
          </div>

        </div>

        {/* Relationship type filter — toggle buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{
            color:         "var(--text-dim)",
            fontSize:      "10px",
            fontFamily:    "IBM Plex Mono, monospace",
            textTransform: "uppercase",
            letterSpacing: ".08em",
            marginRight:   2,
            flexShrink:    0,
          }}>
            Show
          </span>

          {Object.entries(REL_TYPES).map(([k, { color, label }]) => {
            const on = activeTypes.has(k);

            return (
              <div key={k} className="level-tooltip-wrap">

                <button
                  onClick={() => toggleType(k)}
                  style={{
                    display:       "flex",
                    alignItems:    "center",
                    gap:           6,
                    padding:       "4px 10px",
                    fontFamily:    "IBM Plex Mono, monospace",
                    fontSize:      11,
                    cursor:        "pointer",
                    userSelect:    "none",
                    borderRadius:  4,
                    border:        `1px solid ${on ? color : "#d0d7db"}`,
                    background:    on ? `${color}18` : "transparent",
                    color:         on ? color : "var(--text-dim)",
                    fontWeight:    on ? 600 : 400,
                    opacity:       on ? 1 : 0.55,
                    transition:    "all 0.15s",
                  }}
                >
                  <span style={{
                    width:        8,
                    height:       8,
                    borderRadius: "50%",
                    background:   on ? color : "#ccc",
                    flexShrink:   0,
                    transition:   "background 0.15s",
                  }} />

                  {label}
                </button>

                <div className="level-tooltip">
                  {REL_TOOLTIPS[k]}
                  <span className="level-tooltip-arrow" />
                </div>

              </div>
            );
          })}
        </div>

        {/* Stats */}
        {graphStats && (
          <span style={{
            marginLeft:    "auto",
            fontSize:      10,
            color:         "var(--text-dim)",
            fontFamily:    "IBM Plex Mono, monospace",
            letterSpacing: "0.04em",
            whiteSpace:    "nowrap",
          }}>
            <span>
              SHOWING:&nbsp;&nbsp;&nbsp;
            </span>
            {graphStats.nodes} {graphStats.nodes === 1 ? "company" : "companies"}
            &nbsp;·&nbsp;
            {graphStats.links} {graphStats.links === 1 ? "relationship" : "relationships"}
          </span>
        )}

      </header>

      {/* Body: sidebar + graph */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* Data Work Companies sidebar */}
        <div style={{
          width:        200,
          flexShrink:   0,
          borderRight:  "1px solid #1e2330",
          overflowY:    "auto",
          background:   "#fafafa",
          display:      "flex",
          flexDirection:"column",
        }}>
          <div style={{
            padding:       "10px 12px 6px",
            fontFamily:    "IBM Plex Mono, monospace",
            fontSize:      9,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color:         "var(--text-dim)",
            borderBottom:  "1px solid #e8eaed",
            flexShrink:    0,
          }}>
            Data Work Companies
          </div>
          <ul style={{ listStyle: "none", margin: 0, padding: "4px 0", flex: 1 }}>
            {DATA_WORK_COMPANIES.map(name => {
              const isSelected = name === selectedCompany;
              return (
                <li key={name}>
                  <button
                    onClick={() => isSelected ? clearSelection() : selectCompany(name)}
                    style={{
                      display:    "block",
                      width:      "100%",
                      textAlign:  "left",
                      padding:    "5px 12px",
                      fontFamily: "IBM Plex Mono, monospace",
                      fontSize:   10,
                      fontWeight: isSelected ? 700 : 400,
                      color:      isSelected ? "#fff" : DATA_WORK_COLOR,
                      background: isSelected ? DATA_WORK_COLOR : "transparent",
                      border:     "none",
                      cursor:     "pointer",
                      lineHeight: 1.4,
                      transition: "background 0.12s, color 0.12s",
                    }}
                    onMouseEnter={e => {
                      if (!isSelected) {
                        e.currentTarget.style.background = `${DATA_WORK_COLOR}18`;
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isSelected) {
                        e.currentTarget.style.background = "transparent";
                      }
                    }}
                  >
                    {name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Graph container */}
        <div id="rn-graph-container" ref={containerRef} style={{ flex: 1, position: "relative", overflow: "hidden" }}>

        {/* Empty state -- what intially renders on the page */}
        {!selectedCompany && (
          <div style={{
            position:       "absolute",
            inset:          0,
            display:        "flex",
            flexDirection:  "column",
            alignItems:     "center",
            justifyContent: "center",
            gap:            14,
            pointerEvents:  "none",
          }}>
            {/* Rest of instructional text */}
            <div style={{
              fontFamily:    "IBM Plex Mono, monospace",
              fontSize:      16,
              color:         "var(--text)",
              fontWeight:    600,
              letterSpacing: "0.06em",
            }}>
              Select a company to explore its relationships
            </div>
            <ol style={{
              fontFamily:  "IBM Plex Mono, monospace",
              fontSize:    11,
              color:       "var(--text)",
              lineHeight:  2,
              textAlign:   "left",
              fontWeight:  500,
              paddingLeft: 22,
              margin:      0,
            }}>
              <li>- To start, type any company name into the search bar, or select a data work company from the list on the left.</li>
              <li>- Click a node in the network graph to jump to that company and explore its relationships.</li>
              <li>- To go back to the previously selected company, click on its node.</li>
              <li>- Toggle on and off different relationship types: customers, partners, subcontractors, and investors.</li>
              <li>- Select <strong>1 level</strong> to show direct relationships, or <strong>2 levels</strong> to show relationships of relationships.</li>
            </ol>
            <div style={{
              fontFamily:    "IBM Plex Mono, monospace",
              fontSize:      9,
              color:         "var(--text)",
              letterSpacing: "0.1em",
              marginTop:     6,
            }}>
              {ALL_NODES.length} companies&nbsp;·&nbsp;{ALL_LINKS.length} relationships in dataset
            </div>
          </div>
        )}

        {/* Selected company info strip */}
        {centerNode && (
          <div style={{
            position:    "absolute",
            top:         12,
            left:        12,
            display:     "flex",
            alignItems:  "baseline",
            gap:         10,
            background:  "rgba(255,255,255,0.93)",
            border:      "1px solid #1e2330",
            borderRadius: 4,
            padding:     "6px 12px",
            zIndex:      10,
            fontFamily:  "IBM Plex Mono, monospace",
            fontSize:    11,
          }}>
            <span style={{
              fontWeight: 700,
              color: isDataWork(centerNode) ? DATA_WORK_COLOR : NODE_COLOR,
            }}>
              {centerNode.name}
            </span>
            {centerNode.industry && (
              <span style={{ fontSize: 10, color: "var(--text-dim)" }}>
                {centerNode.industry}
              </span>
            )}
            {centerNode.industry && centerNode.location && (
              <span style={{ fontSize: 10, color: "#ccc" }}>|</span>
            )}
            {centerNode.location && (
              <span style={{ fontSize: 10, color: "var(--text-dim)" }}>
                {centerNode.location}
              </span>
            )}
            <span style={{ fontSize: 9, color: "#bbb", marginLeft: 4 }}>
              {totalDeg} direct {totalDeg === 1 ? "relationship" : "relationships"}
            </span>
          </div>
        )}

        <svg ref={svgRef} />

        {/* Tooltip */}
        <div ref={tooltipRef} id="tooltip" />

        {/* Zoom controls */}
        {selectedCompany && (
          <div id="rn-controls">
            <button className="ctrl-btn" id="egf-zoom-in">+</button>
            <button className="ctrl-btn" id="egf-zoom-out">−</button>
            <button className="ctrl-btn" id="egf-zoom-reset" style={{ fontSize: "12px" }}>⌖</button>
          </div>
        )}

        </div>{/* end graph container */}
      </div>{/* end body flex */}
    </div>
  );
}

// Extend graph.css #tooltip with the extra sub-elements we need
// All base styles (background, border, font, opacity transition) come from
// graph.css — we only add what's new here.
const egfStyle = document.createElement("style");
egfStyle.textContent = `
  .network-page #tooltip .tip-divider    { border-top:1px solid #e5e7eb; margin:8px 0 6px; }
  .network-page #tooltip .tip-type-row   { display:flex; align-items:center; gap:7px; margin:4px 0; }
  .network-page #tooltip .tip-type-dot   { width:8px; height:8px; border-radius:50%; flex-shrink:0; }
  .network-page #tooltip .tip-type-label { font-size:11px; color:var(--text-dim); flex:1; text-transform:uppercase; letter-spacing:0.06em; }
  .network-page #tooltip .tip-type-count { font-size:11px; color:var(--text); font-weight:600; }
  .network-page #tooltip .tip-footer     { font-size:9px; color:#bbb; margin-top:8px; border-top:1px solid #f0f0f0; padding-top:5px; }
`;
if (!document.getElementById("egf-extra-style")) {
  egfStyle.id = "egf-extra-style";
  document.head.appendChild(egfStyle);
}