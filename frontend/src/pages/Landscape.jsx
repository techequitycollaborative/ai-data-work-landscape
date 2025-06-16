// Landscape.jsx
// Page for the data table

import DataTable from "../components/DataTable_Simple";
import DataComponent from "../components/Data";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import convertToCSV from '../components/ConvertCSV';

export default function Landscape() {
  //const [data, setData] = useState([]);
  const [data, setData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]); // holds filtered/memoized data from table

  useEffect(() => {
    //fetch("https://data-work-landscape-lymyf.ondigitalocean.app/ai-data-work-landscape-backend/data") // for production
    fetch("http://localhost:8000/data") // for development
      .then((res) => res.json())
      .then(setData);
  }, []);

  // Download to CSV function
    const handleDownloadCSV = () => {
      const csv = convertToCSV(displayedData);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
  
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "data.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

  return (
    <main id="landscape" 
        className="min-h-screen snap-start flex flex-col pt-16 pb-16"
        style={{
            background: "linear-gradient(to bottom, #f3fdb8 0%, #f3fdb8 11%, #ffffff 18%, #ffffff 100%)",
            //minHeight: "200vh",
            backgroundSize: "100% 200vh", // matches visual height of gradient
        }} /* Gradient background yellow to white */
        
        >
        
        {/* Main site header */}
        <h1 className="text-8xl mb-4 ml-2 mr-8 text-left md:text-center">
          <NavLink to="/" className="hover:underline">
            Who Powers AI?
          </NavLink>
        </h1>      
        <h2 className="text-3xl text-left ml-2 mr-8 md:text-center">Exploring the Data Work Landscape</h2>

        {/* Section for data table */}
        <DataComponent initialData={data} onDataChange={setDisplayedData} />

        {/* Download data button */}
        <div className="flex justify-start mt-2">
          <button
            onClick={handleDownloadCSV}
            className="btn-download text-xs ml-4 px-3 py-1"
          >
            Download Full Data
          </button>
          </div>

        {/* Call to action for contributors */}
        <div className="w-full max-w-4xl mx-auto mt-10 mb-10 ml-2 mr-8 text-left md:text-center text-sm">
            <p>Do you work in the tech industry and contribute to AI systems?</p>
            <NavLink to="/Input" className="text-blue-600 underline">We want to hear from you.</NavLink> 
        </div>    
    </main>
  );
}


