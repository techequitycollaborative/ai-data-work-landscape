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
        className="min-h-screen snap-start flex flex-col items-center pt-16 pb-16"
        style={{background: "linear-gradient(to bottom, #f3fdb8 0%, #f3fdb8 17%, #ffffff 27%, #ffffff 100%)",}} /* Gradient background yellow to white */
        >
        
        {/* Main site header */}
        <h1 className="text-8xl mb-4 text-center">
        <NavLink to="/" className="hover:underline">
          Who Powers AI?
        </NavLink>
        </h1>
        <h2 className="text-3xl text-center">Exploring the Data Work Landscape</h2>

        {/* Section for data table */}
        <DataTable data={data} />
        <div className="w-full max-w-4xl mx-auto mt-10 mb-10 text-center text-sm">
            <p>Do you work in the tech industry and contribute to AI systems?</p>
            <NavLink to="/Input" className="text-blue-600 underline">We want to hear from you.</NavLink> 
        </div>    
    </main>
  );
}


