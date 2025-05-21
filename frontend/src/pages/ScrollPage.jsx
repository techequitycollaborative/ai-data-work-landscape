// Scroll.jsx
// This page will house content for the scrollable sections of the microsite

// Use "9xl" for large text and "6xl" for medium text in headers

import DataTable from "../components/DataTable";
import { useEffect, useState } from "react";

export default function ScrollPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/data")
      .then((res) => res.json())
      .then(setData);
  }, []);

  const scrollToData = () => {
    const dataSection = document.getElementById("data");
    if (dataSection) {
      dataSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="snap-y snap-mandatory h-screen overflow-y-scroll">
      
      {/* HOME SECTION */}
      <section id="home" className="h-screen snap-start flex flex-col items-center justify-center">
        <h1 className="text-9xl mb-8">Who Powers AI?</h1>
        <button onClick={scrollToData} className="btn-scroll">
        DIG IN
        </button>
        <span className="text-4xl mt-2 animate-bounce">⌄</span>
      </section>

      {/* DATA SECTION */}
      <section id="data" className="min-h-screen snap-start flex flex-col items-center justify-start p-8 w-full">
        <h1 className="text-6xl mb-4">Data Work Landscape</h1>
        <DataTable data={data} />
      </section>

      {/* CONTRIBUTE SECTION */}
      <section id="contribute" className="h-screen snap-start flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl mb-4">Contribute</h1>
        <form action="http://localhost:8000/submit" method="POST" className="flex flex-col gap-4 w-full max-w-md">
          <input name="company_name" placeholder="Company Name" className="p-2 border rounded" required />
          <input name="company_website" placeholder="Website" className="p-2 border rounded" required />
          <input name="company_headquarters" placeholder="Headquarters" className="p-2 border rounded" />
          <input name="workforce_model" placeholder="Workforce Model" className="p-2 border rounded" />
          <input name="pay_rate" placeholder="Pay Rate" className="p-2 border rounded" />
          <input name="known_worker_locations" placeholder="Known Worker Locations" className="p-2 border rounded" />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">Submit</button>
        </form>
      </section>
    
    </main>
  );
}