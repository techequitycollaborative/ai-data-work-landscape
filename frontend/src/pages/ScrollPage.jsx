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

    </main>
  );
}