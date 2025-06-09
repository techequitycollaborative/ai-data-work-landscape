// Landscape.jsx

import DataTable from "../components/DataTable";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Landscape() {
  const [data, setData] = useState([]);

  useEffect(() => {
    //fetch("https://data-work-landscape-lymyf.ondigitalocean.app/ai-data-work-landscape-backend/data") // for production
    fetch("http://localhost:8000/data") // for development
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <main id="landscape" 
        className="min-h-screen snap-start flex flex-col items-center pt-16"
        style={{background: "linear-gradient(to bottom, #f3fdb8 0%, #f3fdb8 8%, #ffffff 18%, #ffffff 100%)",}} /* Gradient background yellow to white */
        >
        
        {/* Main site header */}
        <h1 className="text-8xl mb-4 text-center">
        <NavLink to="/" className="hover:underline">
          Who Powers AI?
        </NavLink>
        </h1>
        <h2 className="text-3xl text-center">Exploring the main players in the AI data work industry</h2>

        {/* Section for data table */}
        <DataTable data={data} />
    </main>
  );
}


