// ScrollPage.jsx
// Scrollable hero page + data table section of the microsite

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
    <main className="snap-y snap-mandatory">
      
      {/* HOME SECTION */}
      <section id="home" 
        className="bg-center h-screen snap-start flex flex-col items-center justify-left pt-52 pb-52 mb-40"
        style={{ backgroundImage: "url('/globe.png')",
          backgroundSize: '75%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: "center top", // show top half of the image, not the full globe
         }}
        >
        <h1 className="text-9xl mb-4 mr-8">Who Powers AI?</h1>
        <h3 className="text-4xl mb-4 mr-8">Exploring the main players in the AI data work industry</h3>
        <p className="mb-24 ml-8 max-w-4xl">All around the world, tech companies in the AI industry are powered by workers who develop, train, test, and maintain AI systems. But these workers are hidden away behind virtual marketplaces and labyrinthine supply chains. To highlight the workers who make AI possible, we must shine a light on this shadowy industry.</p>
        <button onClick={scrollToData} className="btn-scroll">
        DIG IN
        </button>
        <span className="text-4xl mt-2 animate-bounce">⌄</span>
      </section>

      {/* DATA SECTION */}
      <section id="data" 
        className="min-h-screen snap-start flex flex-col items-center justify-left p-8 w-full">
        <h2 className="text-8xl mb-4">Who Powers AI?</h2>
        <h3 className="text-3xl mb-4">Exploring the main players in the AI data work industry</h3>
        <DataTable data={data} />
      </section>

    </main>
  );
}