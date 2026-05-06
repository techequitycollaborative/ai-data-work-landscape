// components/NetworkGraph.jsx
// component for the two network data visualizations 
// these graphs are rendered on the Network page

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import Papa from "papaparse";
import nodesRaw from "../data/nodes.csv?raw";
import relationshipsRaw from "../data/relationships.csv?raw";
import "../graph.css";
import { useGraphTour, GraphTourOverlay } from "./GraphTour";

export default function NetworkGraph() {
  const networkSvgRef   = useRef(null);
  const containerRef    = useRef(null);
  const investorSvgRef  = useRef(null);
  const tooltipRef      = useRef(null);
  const invTooltipRef   = useRef(null);
  const tour = useGraphTour();
  const [currentView, setCurrentView] = useState("network");

  useEffect(() => {

    const svgEl = networkSvgRef.current;
    if (!svgEl) return;
    
    // Clear any previous render
    d3.select(svgEl).selectAll("*").remove();
    d3.select(investorSvgRef.current).selectAll("*").remove();

    const container = containerRef.current;
    const tooltip   = tooltipRef.current;
    const invTip    = invTooltipRef.current;
    let width       = container.clientWidth;
    let height      = container.clientHeight;
    let viewMode = "network";

    const NODE_COLOR      = "#00495e";
    const DATA_WORK_COLOR = "#ff3b00";
    const FALLBACK_COLOR  = "#ade4d1";
    const ROW_HEIGHT      = 26;

    const linkColor = {
      "customer":                  "#0041d9",
      "partner":                   "#712f39",
      "supplier":                  "#f1592d",
      "investor":                  "#2d9f8b",
      "unknown":                   "#ade4d1",
    };

    // Toggle 
    const networkView    = document.getElementById("rn-network-view");
    const investorView   = document.getElementById("rn-investor-view");
    const btnNetwork     = document.getElementById("rn-btn-network");
    const btnInvestor    = document.getElementById("rn-btn-investor");
    const networkSearch  = document.getElementById("rn-network-search");
    const zoomControls   = document.getElementById("rn-controls");
    const networkLegend  = document.getElementById("rn-network-legend");

    btnNetwork.addEventListener("click", () => {
      setCurrentView("network");
      viewMode = "network";
      networkView.classList.remove("hidden");
      investorView.classList.add("hidden");
      btnNetwork.classList.add("active");
      btnInvestor.classList.remove("active");
      networkLegend.style.display = "";
      networkSearch.style.display = "";
      zoomControls.style.display = "";
    });

    btnInvestor.addEventListener("click", () => {
      setCurrentView("investor");
      viewMode = "investor";
      investorView.classList.remove("hidden");
      networkView.classList.add("hidden");
      btnInvestor.classList.add("active");
      btnNetwork.classList.remove("active");
      networkLegend.style.display = "none";
      networkSearch.style.display = "none";
      zoomControls.style.display = "none";
      setTimeout(() => renderBipartite(), 50);
    });

    // Network SVG setup 
    const svg  = d3.select(networkSvgRef.current);
    const g    = svg.append("g");
    const zoom = d3.zoom().scaleExtent([0.2, 4])
      .on("zoom", (event) => g.attr("transform", event.transform));
    svg.call(zoom);

    const defs = svg.append("defs");
    const glowF = defs.append("filter").attr("id", "rn-glow");
    glowF.append("feGaussianBlur").attr("stdDeviation", "3.5").attr("result", "coloredBlur");
    const fmg = glowF.append("feMerge");
    fmg.append("feMergeNode").attr("in", "coloredBlur");
    fmg.append("feMergeNode").attr("in", "SourceGraphic");

    function safeId(str) {
      if ((str || "").toLowerCase().includes("supplier")) return "supplier";
      return (str || "").toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");
    }

    let renderBipartite = () => {};

    //  Load data 
    const rawNodes         = Papa.parse(nodesRaw, { header: true, skipEmptyLines: true }).data;
    const rawRelationships = Papa.parse(relationshipsRaw, { header: true, skipEmptyLines: true }).data;

      const nodes = rawNodes.map(d => ({
        id:       d.name.trim(),
        name:     d.name.trim(),
        type:     (d.type || "").trim(),
        industry: (d.industry || "").trim(),
        location: (d.location || "").trim(),
      }));
      const nodeIds = new Set(nodes.map(d => d.id));

      const allLinks = rawRelationships.map(d => ({
        source: d.source.trim(),
        target: d.target.trim(),
        type:   (d.relationship_type || "").trim().toLowerCase() || "unknown",
        relationship_source: (d.relationship_source || "").trim(),
      })).filter(d => nodeIds.has(d.source) && nodeIds.has(d.target));

      const networkLinks  = allLinks.filter(l => l.type !== "investor");
      const investorLinks = allLinks.filter(l => l.type === "investor");

      const networkNodeIds = new Set(networkLinks.flatMap(l => [l.source, l.target]));
      const networkNodes   = nodes.filter(d => networkNodeIds.has(d.id));

      // Arrow markers
      [...new Set(networkLinks.map(l => l.type))].forEach(type => {
        const color = linkColor[type] || FALLBACK_COLOR;
        defs.append("marker")
          .attr("id", `rn-arrow-${safeId(type)}`)
          .attr("viewBox", "0 -4 8 8").attr("refX", 18).attr("refY", 0)
          .attr("markerWidth", 6).attr("markerHeight", 6).attr("orient", "auto")
          .append("path").attr("d", "M0,-4L8,0L0,4").attr("fill", color).attr("opacity", 0.7);
      });

      //  Search 
      const searchInput  = document.getElementById("rn-company-search");
      const suggestions  = document.getElementById("rn-company-suggestions");
      const networkClear = document.getElementById("rn-network-clear");
      const companyNames = networkNodes.map(n => n.name);
      let selIdx = -1;

      searchInput.addEventListener("input", function () {
        const q = this.value.trim().toLowerCase();
        suggestions.innerHTML = ""; selIdx = -1;
        if (!q) { suggestions.style.display = "none"; node.classed("dimmed", false).classed("highlighted", false); link.classed("dimmed", false); return; }
        const matches = companyNames.filter(n => n.toLowerCase().includes(q));
        matches.forEach(name => {
          const li = document.createElement("li"); li.textContent = name;
          li.addEventListener("click", () => selectCompany(name));
          suggestions.appendChild(li);
        });
        suggestions.style.display = matches.length ? "block" : "none";
      });

      searchInput.addEventListener("keydown", function (e) {
        const items = Array.from(suggestions.querySelectorAll("li"));
        if (!items.length) return;
        if (e.key === "ArrowDown") { e.preventDefault(); selIdx = (selIdx + 1) % items.length; hlItems(items); }
        else if (e.key === "ArrowUp") { e.preventDefault(); selIdx = (selIdx - 1 + items.length) % items.length; hlItems(items); }
        else if (e.key === "Enter") { e.preventDefault(); if (selIdx >= 0) { selectCompany(items[selIdx].textContent); selIdx = -1; } }
        else if (e.key === "Escape") { suggestions.style.display = "none"; selIdx = -1; }
      });

      function hlItems(items) { items.forEach((li, i) => { li.style.background = i === selIdx ? "var(--accent)" : ""; li.style.color = i === selIdx ? "#fff" : "var(--text)"; }); }
      function selectCompany(name) {
        const m = networkNodes.find(n => n.name === name); if (!m) return;
        svg.transition().duration(600).call(zoom.transform, d3.zoomIdentity.translate(width / 2, height / 2).scale(1.8).translate(-m.x, -m.y));
        node.classed("highlighted", d => d.id === m.id).classed("dimmed", d => d.id !== m.id);
        link.classed("dimmed", true); suggestions.style.display = "none"; searchInput.value = name;
      }

      // Force simulation
      const simulation = d3.forceSimulation(networkNodes)
        .force("link", d3.forceLink(networkLinks).id(d => d.id).distance(140).strength(0.8))
        .force("charge", d3.forceManyBody().strength(-600))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collision", d3.forceCollide(40))
        .force("x", d3.forceX(width / 2).strength(0.08))
        .force("y", d3.forceY(height / 2).strength(0.08));
        // Set initial zoom amount and position to show full graph
        svg.call(zoom.transform, d3.zoomIdentity.translate(width / 2, height / 2).scale(0.35).translate(-width / 2, -height / 2));

      const link = g.append("g").attr("class", "links")
        .selectAll("line").data(networkLinks).join("line")
        .attr("class", d => `link ${safeId(d.type)}`)
        // create arrowheads -- turned off
        //.attr("marker-end", d => `url(#rn-arrow-${safeId(d.type)})`);

      const node = g.append("g").attr("class", "nodes")
        .selectAll("g").data(networkNodes).join("g")
        .attr("class", "node").call(drag(simulation));

      node.append("circle").attr("r", 16)
        .attr("fill", d => d.industry === "Data Work Company" ? DATA_WORK_COLOR : NODE_COLOR).attr("fill-opacity", 0.18)
        .attr("stroke", d => d.industry === "Data Work Company" ? DATA_WORK_COLOR : NODE_COLOR);
      node.append("circle").attr("r", 5)
        .attr("fill", d => d.industry === "Data Work Company" ? DATA_WORK_COLOR : NODE_COLOR).attr("fill-opacity", 0.8)
        .style("filter", "url(#rn-glow)");
      node.append("text").attr("x", 20).attr("y", 0).text(d => d.name)
        .attr("font-weight", d => d.industry === "Data Work Company" ? "700" : "400")
        .attr("fill", d => d.industry === "Data Work Company" ? DATA_WORK_COLOR : null);

      node.on("mouseover", function (event, d) {
        const cIds = new Set([d.id]); const cIdx = new Set(); const rSrc = new Set();
        networkLinks.forEach((l, i) => {
          const s = typeof l.source === "object" ? l.source.id : l.source;
          const t = typeof l.target === "object" ? l.target.id : l.target;
          if (s === d.id || t === d.id) { cIds.add(s); cIds.add(t); cIdx.add(i); if (l.relationship_source) rSrc.add(l.relationship_source.trim()); }
        });
        node.classed("dimmed", n => !cIds.has(n.id)).classed("highlighted", n => cIds.has(n.id));
        link.classed("dimmed", (l, i) => !cIdx.has(i)).classed("highlighted", (l, i) => cIdx.has(i));
        const srcHTML = rSrc.size > 0 ? `<div class="tip-sources"><span class="tip-sources-label">Sources:</span>${[...rSrc].map(s => `<div class="tip-source-item">${s}</div>`).join("")}</div>` : "";
        tooltip.innerHTML = `<div class="tip-color-bar" style="background:${NODE_COLOR}"></div><div class="tip-name">${d.name}</div>${d.industry ? `<div class="tip-industry" style="color:${NODE_COLOR}">${d.industry}</div>` : ""}${d.location ? `<div class="tip-location" style="color:${NODE_COLOR}">${d.location}</div>` : ""}${srcHTML}`;
        tooltip.classList.add("visible"); moveTooltip(event);
      }).on("mousemove", moveTooltip).on("mouseleave", () => {
        node.classed("dimmed", false).classed("highlighted", false);
        link.classed("dimmed", false).classed("highlighted", false);
        tooltip.classList.remove("visible");
      });

      // Clear button for network graph
      networkClear.addEventListener("click", () => {
        searchInput.value = "";
        suggestions.style.display = "none";
        node.classed("dimmed", false).classed("highlighted", false);
        link.classed("dimmed", false);
        svg.transition().duration(400).call(zoom.transform, d3.zoomIdentity.translate(width / 2, height / 2).scale(0.35).translate(-width / 2, -height / 2));
      });

      simulation.on("tick", () => {
        link.attr("x1", d => d.source.x).attr("y1", d => d.source.y).attr("x2", d => d.target.x).attr("y2", d => d.target.y);
        node.attr("transform", d => `translate(${d.x},${d.y})`);
      });

      function drag(sim) {
        return d3.drag()
          .on("start", (e, d) => { if (!e.active) sim.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
          .on("drag", (e, d) => { d.fx = e.x; d.fy = e.y; })
          .on("end", (e, d) => { if (!e.active) sim.alphaTarget(0); d.fx = null; d.fy = null; });
      }

      function handleResize() {
        width = container.clientWidth;
        height = container.clientHeight;
        simulation.force("center", d3.forceCenter(width / 2, height / 2)).alpha(0.3).restart();
        if (viewMode === "investor") renderBipartite();
      }
      window.addEventListener("resize", handleResize);

      //  Bipartite filter 
      const bpFilterInput = document.getElementById("rn-bp-filter");
      const bpSuggestions = document.getElementById("rn-bp-suggestions");
      const bpClear       = document.getElementById("rn-bp-clear");
      const allBpNames    = [...new Set([...investorLinks.map(l => l.source), ...investorLinks.map(l => l.target)])].sort();
      let filterQuery     = "";
      let bpSelIdx        = -1;

      function updateBpSuggestions() {
        const q = bpFilterInput.value.trim().toLowerCase();
        bpSuggestions.innerHTML = ""; bpSelIdx = -1;
        if (!q) { bpSuggestions.style.display = "none"; return; }
        const matches = allBpNames.filter(n => n.toLowerCase().includes(q));
        if (!matches.length) { bpSuggestions.style.display = "none"; return; }
        matches.forEach(name => {
          const li = document.createElement("li"); li.textContent = name;
          li.addEventListener("mousedown", e => { e.preventDefault(); applyFilter(name); });
          bpSuggestions.appendChild(li);
        });
        bpSuggestions.style.display = "block";
      }

      function applyFilter(name) {
        filterQuery = name ? name.toLowerCase() : "";
        bpFilterInput.value = name || "";
        bpSuggestions.style.display = "none"; bpSelIdx = -1;
        renderBipartite();
      }

      bpFilterInput.addEventListener("input", updateBpSuggestions);
      bpFilterInput.addEventListener("keydown", function (e) {
        const items = Array.from(bpSuggestions.querySelectorAll("li"));
        if (e.key === "ArrowDown") { e.preventDefault(); bpSelIdx = (bpSelIdx + 1) % items.length; items.forEach((li, i) => li.classList.toggle("active", i === bpSelIdx)); }
        else if (e.key === "ArrowUp") { e.preventDefault(); bpSelIdx = (bpSelIdx - 1 + items.length) % items.length; items.forEach((li, i) => li.classList.toggle("active", i === bpSelIdx)); }
        else if (e.key === "Enter") { e.preventDefault(); if (bpSelIdx >= 0) applyFilter(items[bpSelIdx].textContent); else { const exact = allBpNames.find(n => n.toLowerCase() === this.value.trim().toLowerCase()); applyFilter(exact || this.value.trim()); } }
        else if (e.key === "Escape") { bpSuggestions.style.display = "none"; bpSelIdx = -1; }
      });
      bpFilterInput.addEventListener("blur", () => setTimeout(() => { bpSuggestions.style.display = "none"; }, 120));
      bpClear.addEventListener("click", () => applyFilter(""));

      //  Bipartite render 
      renderBipartite = function () {
        width = container.clientWidth;
        const visibleLinks = filterQuery
          ? investorLinks.filter(l => l.source.toLowerCase().includes(filterQuery) || l.target.toLowerCase().includes(filterQuery))
          : investorLinks;

        const infoEl = document.getElementById("rn-bp-filter-info");
        if (filterQuery && visibleLinks.length === 0) infoEl.textContent = "No results.";
        else if (filterQuery) infoEl.textContent = `${[...new Set(visibleLinks.map(l => l.source))].length} company · ${[...new Set(visibleLinks.map(l => l.target))].length} investors`;
        else infoEl.textContent = `${[...new Set(visibleLinks.map(l => l.source))].length} companies · ${[...new Set(visibleLinks.map(l => l.target))].length} investors`;

        const companies = [...new Set(visibleLinks.map(l => l.source))].sort();
        const investors  = [...new Set(visibleLinks.map(l => l.target))].sort();

        const PAD_TOP = 50; const PAD_BOTTOM = 30;
        const companyColH  = companies.length * ROW_HEIGHT;
        const investorColH = investors.length * ROW_HEIGHT;
        const svgHeight    = PAD_TOP + Math.max(companyColH, investorColH) + PAD_BOTTOM;

        const scrollInner = document.getElementById("rn-investor-scroll-inner");
        scrollInner.style.height = svgHeight + "px";

        const invSvg = d3.select(investorSvgRef.current);
        invSvg.selectAll("*").remove();
        invSvg.attr("width", width).attr("height", svgHeight);

        if (visibleLinks.length === 0) {
          invSvg.append("text").attr("x", width / 2).attr("y", svgHeight / 2).attr("text-anchor", "middle").attr("dominant-baseline", "middle").attr("font-family", "IBM Plex Mono, monospace").attr("font-size", "13px").attr("fill", "#5a6380").text("No results found.");
          return;
        }

        const colLeftX  = width * 0.30;
        const colRightX = width * 0.70;
        const companyY  = i => PAD_TOP + (i + 0.5) * (companyColH / companies.length);
        const investorY = i => PAD_TOP + (i + 0.5) * (investorColH / investors.length);
        const companyIndex  = new Map(companies.map((c, i) => [c, i]));
        const investorIndex = new Map(investors.map((inv, i) => [inv, i]));

        invSvg.append("text").attr("class", "bp-col-header").attr("x", colLeftX).attr("y", PAD_TOP - 28).attr("text-anchor", "middle").text("Data Work Companies");
        invSvg.append("text").attr("class", "bp-col-header").attr("x", colRightX).attr("y", PAD_TOP - 28).attr("text-anchor", "middle").text("Investors");

        const linkSel = invSvg.append("g").attr("class", "bp-links")
          .selectAll("path").data(visibleLinks).join("path")
          .attr("class", "bp-link")
          .attr("d", d => {
            const x1 = colLeftX, y1 = companyY(companyIndex.get(d.source));
            const x2 = colRightX, y2 = investorY(investorIndex.get(d.target));
            const mx = (x1 + x2) / 2;
            return `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
          });

        const companyG = invSvg.append("g").attr("class", "bp-companies");
        companies.forEach((company, i) => {
          const cy = companyY(i);
          const grp = companyG.append("g").attr("transform", `translate(${colLeftX},${cy})`).datum(company);
          grp.append("circle").attr("class", "bp-node-company").attr("r", 5);
          grp.append("text").attr("class", "bp-company-label").attr("x", -11).attr("y", 0).text(company);
          grp.on("mouseover", function (event) {
            const connected = new Set(visibleLinks.filter(l => l.source === company).map(l => l.target));
            linkSel.classed("dimmed", l => l.source !== company).classed("highlighted", l => l.source === company);
            invSvg.selectAll(".bp-node-investor").classed("dimmed", function () { return !connected.has(d3.select(this.parentNode).datum()); }).classed("highlighted", function () { return connected.has(d3.select(this.parentNode).datum()); });
            invSvg.selectAll(".bp-node-company").classed("dimmed", function () { return d3.select(this.parentNode).datum() !== company; }).classed("highlighted", function () { return d3.select(this.parentNode).datum() === company; });
            const relLinks = visibleLinks.filter(l => l.source === company);
            const sources = [...new Set(relLinks.map(l => l.relationship_source).filter(Boolean))];
            invTip.innerHTML = `<div class="inv-tip-label">Data Work Company</div><div class="inv-tip-name" style="color:#ff3b00">${company}</div><div class="inv-tip-connections">${connected.size} investor${connected.size !== 1 ? "s" : ""}: ${[...connected].join(", ")}</div>${sources.length ? `<div class="inv-tip-source">Source: ${sources.join(", ")}</div>` : ""}`;
            invTip.classList.add("visible"); moveBpTooltip(event);
          }).on("mousemove", moveBpTooltip).on("mouseleave", resetHL);
        });

        const investorG = invSvg.append("g").attr("class", "bp-investors");
        investors.forEach((investor, i) => {
          const iy = investorY(i);
          const grp = investorG.append("g").attr("transform", `translate(${colRightX},${iy})`).datum(investor);
          grp.append("circle").attr("class", "bp-node-investor").attr("r", 5);
          grp.append("text").attr("class", "bp-investor-label").attr("x", 11).attr("y", 0).text(investor);
          grp.on("mouseover", function (event) {
            const connected = new Set(visibleLinks.filter(l => l.target === investor).map(l => l.source));
            const relLinks  = visibleLinks.filter(l => l.target === investor);
            linkSel.classed("dimmed", l => l.target !== investor).classed("highlighted", l => l.target === investor);
            invSvg.selectAll(".bp-node-company").classed("dimmed", function () { return !connected.has(d3.select(this.parentNode).datum()); }).classed("highlighted", function () { return connected.has(d3.select(this.parentNode).datum()); });
            invSvg.selectAll(".bp-node-investor").classed("dimmed", function () { return d3.select(this.parentNode).datum() !== investor; }).classed("highlighted", function () { return d3.select(this.parentNode).datum() === investor; });
            const sources = [...new Set(relLinks.map(l => l.relationship_source).filter(Boolean))];
            invTip.innerHTML = `<div class="inv-tip-label">Investor</div><div class="inv-tip-name" style="color:#2d9f8b">${investor}</div><div class="inv-tip-connections">${connected.size} investe${connected.size !== 1 ? "es" : "e"}: ${[...connected].join(", ")}</div>${sources.length ? `<div class="inv-tip-source">Source: ${sources.join(", ")}</div>` : ""}`;
            invTip.classList.add("visible"); moveBpTooltip(event);
          }).on("mousemove", moveBpTooltip).on("mouseleave", resetHL);
        });

        function resetHL() {
          linkSel.classed("dimmed", false).classed("highlighted", false);
          invSvg.selectAll(".bp-node-company,.bp-node-investor").classed("dimmed", false).classed("highlighted", false);
          invTip.classList.remove("visible");
        }
      };

      function moveBpTooltip(event) {
        invTip.style.left = (event.clientX + 16) + "px";
        invTip.style.top  = (event.clientY + 8) + "px";
        const tw = invTip.offsetWidth + 16;
        const th = invTip.offsetHeight + 16;
        if (event.clientX + tw > window.innerWidth)  invTip.style.left = (event.clientX - tw) + "px";
        if (event.clientY + th > window.innerHeight) invTip.style.top  = (event.clientY - th) + "px";
      }

    function moveTooltip(event) {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const tw = tooltip.offsetWidth + 16;
      const th = tooltip.offsetHeight + 16;
      tooltip.style.left = (x + tw > width ? x - tw : x + 16) + "px";
      tooltip.style.top  = (y + th > height ? y - th : y + 8) + "px";
    }

    // Zoom controls
    document.getElementById("rn-zoom-in").addEventListener("click",  () => svg.transition().duration(300).call(zoom.scaleBy, 1.4));
    document.getElementById("rn-zoom-out").addEventListener("click", () => svg.transition().duration(300).call(zoom.scaleBy, 0.7));
    document.getElementById("rn-reset").addEventListener("click",    () => svg.transition().duration(400).call(zoom.transform, d3.zoomIdentity.translate(width / 2, height / 2).scale(1).translate(-width / 2, -height / 2)));

    return () => {
        d3.select(svgEl).selectAll("*").remove();
        window.removeEventListener("resize", handleResize);
      };

  }, []);

  return (
      <div className="network-page" style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 56px)", border: "1px solid #1e2330", borderRadius: "0.5rem", overflow: "hidden" }}>         
      <header className="network-header">
            {/* Toggle */}
            <div className="view-toggle">
              <button className="toggle-btn active" id="rn-btn-network">Clients</button>
              <div className="toggle-divider" />
              <button className="toggle-btn" id="rn-btn-investor">Investors</button>
            </div>
            {/* Network search */}
            <div className="search" id="rn-network-search">
              <span className="search-label">Search for a company</span>
              <input type="text" id="rn-company-search" autoComplete="off" spellCheck="false" />
              <button id="rn-network-clear" className="bp-clear-btn">Clear</button>
              <ul id="rn-company-suggestions" className="suggestions" />
            </div>
            {/* Legend */}
            <div className="legend" id="rn-network-legend">
              <div className="legend-group">
                <span style={{ color: "#5a6380", fontSize: "10px", textTransform: "uppercase", letterSpacing: ".08em" }}>Relationship type</span>
                <div className="legend-item"><div className="legend-line" style={{ background: "#0041d9" }} />Customer</div>
                <div className="legend-item"><div className="legend-line" style={{ background: "#712f39" }} />Partner</div>
                <div className="legend-item"><div className="legend-line" style={{ background: "#f1592d" }} />Supplier</div>
              </div>
            </div>
            {/* Helper tour button */}
            <button
              onClick={() => currentView === "network" ? tour.startNetwork() : tour.startInvestor()}
              className="help-btn"
              style={{
                fontSize: 12, padding: "4px 12px",
                border: "0.5px solid rgba(0,73,94,0.3)", borderRadius: 8,
                background: "#00495e", cursor: "pointer", color: "white",
                fontFamily: "IBM Plex Mono, monospace",
              }}
            >
              ?
            </button>
          </header>
      
          {/* Graph container */}
          <div id="rn-graph-container" ref={containerRef} style={{ flex: 1, position: "relative", overflow: "hidden" }}>
            {/* Network view */}
            <div id="rn-network-view" style={{ position: "absolute", inset: 0 }}>
              <svg ref={networkSvgRef} style={{ width: "100%", height: "100%" }} />
            </div>
            {/* Investor view */}
            <div id="rn-investor-view" className="hidden" style={{ position: "absolute", inset: 0, overflowY: "auto", display: "flex", flexDirection: "column" }}>
              <div className="bp-filter-wrap">
                <span className="bp-filter-label">Search for a company</span>
                <div className="bp-filter-input-wrap">
                  <input type="text" id="rn-bp-filter" placeholder="Type a company name…" autoComplete="off" spellCheck="false" />
                  <ul id="rn-bp-suggestions" className="bp-suggestions" />
                </div>
                <button className="bp-clear-btn" id="rn-bp-clear">Clear</button>
                <span className="bp-filter-info" id="rn-bp-filter-info" />
              </div>
              <div id="rn-investor-scroll-inner" style={{ position: "relative", flexShrink: 0 }}>
                <svg ref={investorSvgRef} id="rn-investor-svg" style={{ display: "block" }} />
              </div>
              <div ref={invTooltipRef} id="inv-tooltip" />
            </div>
            <div ref={tooltipRef} id="tooltip" />
            {/* Zoom controls */}
            <div id="rn-controls">
              <button className="ctrl-btn" id="rn-zoom-in">+</button>
              <button className="ctrl-btn" id="rn-zoom-out">−</button>
              <button className="ctrl-btn" id="rn-reset" style={{ fontSize: "12px" }}>⌖</button>
            </div>
            <GraphTourOverlay
            containerRef={containerRef}
            active={tour.active}
            step={tour.step}
            steps={tour.steps}
            next={tour.next}
            prev={tour.prev}
            stop={tour.stop}
          />
          </div>
        </div>
  );
}