// Database.jsx
// Page for the database

import DataTable from "../components/DataTable_Simple";
import DataComponent from "../components/Data";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import convertToCSV from '../components/ConvertCSV';

export default function Database() {
  const [data, setData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);

  useEffect(() => {
    const API_URLS = {
      production: "https://data-work-landscape-lymyf.ondigitalocean.app/ai-data-work-landscape-backend/data",
      development: "https://dev-dwl-gxd6w.ondigitalocean.app/ai-data-work-landscape-backend/data",
      local: "http://localhost:8000/data",
    };

    const getApiUrl = () => {
      const hostname = window.location.hostname;
      if (hostname === "localhost" || hostname === "127.0.0.1") return API_URLS.local;
      if (hostname.includes("dev-")) return API_URLS.development;
      return API_URLS.production;
    };

    fetch(getApiUrl())
      .then((res) => res.json())
      .then(setData)
      // error handling
      .catch((err) => console.error("Failed to fetch data:", err));
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
    <main id="database" 
        className="min-h-screen snap-start flex flex-col pt-8 pb-16"
        style={{
            background: "linear-gradient(to bottom, #f3fdb8 0%, #f3fdb8 11%, #ffffff 18%, #ffffff 100%)",
            //minHeight: "200vh",
            backgroundSize: "100% 200vh", // matches visual height of gradient
        }} /* Gradient background yellow to white */
        
        >
        
        {/* Main site header 
        <h1 className=" text-6xl md:text-8xl mb-4 ml-2 mr-8 text-left md:text-center">
          <NavLink to="/" className="hover:underline">
            Who Powers AI?
          </NavLink>
        </h1>      
        <h2 className="text-2xl md:text-3xl text-left ml-2 mr-8 md:text-center">Exploring the Data Work Landscape</h2>
        */}
        
        <div className="w-full px-12 md:px-20 mt-6 md:mt-20">

        {/* Section header */}
        <div className="border-b-2 border-[#041c2c] pb-3 mb-6">
          <h1 className="text-5xl md:text-6xl m-0 leading-none">Database</h1>
        </div>

        <p className="mt-2 text-sm text-gray-500 font-normal normal-case" 
                      style={{ fontFamily: "'Roboto Serif', serif" }}>
          An overview of the AI data work ecosystem: the companies shaping this invisible industry.
        </p>
        <br></br> 

        </div>

        {/* Section for data table */}
        <div className="w-full px-12 md:px-20">
        <DataComponent initialData={data} onDataChange={setDisplayedData} />

          {/* Download data button */}
          <div className="flex justify-start ml-6 mr-8 md:justify-end mt-2 md:ml-2 md:mr-2">
            <button
              onClick={handleDownloadCSV}
              className="btn-download text-xs px-3 py-1"
            >
              Download Full Data
            </button>
            </div>
        </div>

        {/* Call to action for contributors */}
        <div className="w-full mt-10 mb-10 px-4 text-center text-sm">
            <p>Do you work in the tech industry and contribute to AI systems?</p>
            <NavLink to="/input" className="text-blue-600 underline">We want to hear from you.</NavLink> 
        </div>    
    </main>
  );
}


