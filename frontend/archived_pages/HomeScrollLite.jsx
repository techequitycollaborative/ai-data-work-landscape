// HomeScrollLite.jsx
// This home page features hero/header section, then 
// scrolls down to preview sections for each tab (database, graphs, profiles)
// In this version, the hero section is smaller and does not take over the full window
// so that the following sections are more visible immediately. 

import { Link } from "react-router-dom";

export default function Home() {

    // scroll functionality
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    // Option 1 Gradient: yellow - white
    //<main className="bg-gradient-to-b from-[#f3fdb8] via-white to-white">

    // Option 2 Gradient: yellow - white - yellow
    <main className="bg-gradient-to-b from-[#f3fdb8] via-white to-[#f3fdb8]">

      {/* HERO SECTION */}
      <section
        id="home"
        className="flex flex-col justify-center items-start md:items-center md:text-center text-left w-full px-4 py-24
                  bg-no-repeat bg-[length:180%] md:bg-[length:75%] md:bg-[position:center_top]"
        style={{ backgroundImage: "url('/globe.png')" }}
      >
        <div className="flex flex-col md:items-center md:text-center items-start text-left">
          <h1 className="ml-2 mr-8 text-8xl md:text-9xl mb-4">Who Powers AI?</h1>
          <h3 className="ml-2 mr-8 text-3xl md:text-5xl mb-6">Exploring the Data Work Landscape</h3>
          <p className="mb-10 ml-2 mr-8 md:mb-4 pt-1 max-w-4xl text-base md:text-justify text-left">
            All around the world, tech companies in the AI industry are powered by workers who develop, train, test, and maintain AI systems. But these workers are hidden away behind virtual marketplaces and labyrinthine supply chains. To highlight the workers who make AI possible, we must shine a light on this shadowy industry.
          </p>
        </div>
      </section>

      {/* DATABASE PREVIEW — image left, text right */}
      <section
        id="preview-database"
        className="flex flex-col md:flex-row items-center gap-8 px-12 py-16 w-full"
      >
        <div className="w-full md:w-1/2 flex justify-center">
          <img src="/database-preview.png" alt="Database preview" className="rounded shadow-2xl border-2 border-[#041c2c] w-full max-w-xl h-120 w-140 object-cover" />
        </div>
        <div className="max-w-xl md:w-1/2 flex flex-col items-start gap-4">
          <h3 className="text-7xl md:text-5xl">Browse companies shaping AI data work</h3>
          <p className="max-w-xl">
            A database tracking companies involved in sourcing and managing data work globally and categorizes them by the type of products they offer and their business models.
          </p>
          <Link to="/database">
            <button className="btn-home mt-2">EXPLORE THE DATABASE</button>
          </Link>
        </div>
      </section>

      {/* GRAPHS PREVIEW — text left, image right */}
      <section
        id="preview-graphs"
        className="flex flex-col md:flex-row-reverse items-center gap-8 px-16 py-16 w-full"
      >
        <div className="w-full md:w-1/2 flex justify-center">
          <img src="/graphs-preview.png" alt="Graphs preview" className="rounded shadow-2xl border-2 border-[#041c2c] w-full max-w-xl h-120 w-140 object-cover" />
        </div>
        <div className="max-w-xl md:w-1/2 flex flex-col items-start gap-4 md:pl-12">
          <h2 className="text-7xl md:text-5xl">Visualize the AI data work industry</h2>
          <p className="max-w-xl">
            Interactive charts and visualizations higlighting client, partner, supplier and investor relationships in the industry.
          </p>
          <Link to="/graphs">
            <button className="btn-home mt-2">VIEW THE GRAPHS</button>
          </Link>
        </div>
      </section>

      {/* PROFILES PREVIEW — image left, text right */}
      <section
        id="preview-profiles"
        className="flex flex-col md:flex-row items-center gap-8 px-12 py-16 w-full"
      >
        <div className="w-full md:w-1/2 flex justify-center">
          <img src="/profiles-preview.png" alt="Profiles preview" className="rounded shadow-2xl border-2 border-[#041c2c] w-full max-w-xl h-120 w-140 object-cover" />
        </div>
        <div className="max-w-xl md:w-1/2 flex flex-col items-start gap-4">
          <h3 className="text-7xl md:text-5xl">Deep dive into key players</h3>
          <p className="max-w-xl ">
            Detailed profiles of key players in the AI data work ecosystem, their relationships, and the experience of workers.
          </p>
          <Link to="/profiles">
            <button className="btn-home mt-2">READ THE PROFILES</button>
          </Link>
        </div>
      </section>

    </main>
  );
}