// HomeBlockLite.jsx
// This home page features hero/header section, then 
// below that are three blocks side by side to preview content
// PREVIEW BLOCKS DO NOT HAVE IMAGES

import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-[#f3fdb8] from-40% via-white to-[#f3fdb8]">

      {/* HERO SECTION */}
      <section
        id="home"
        className="flex flex-col justify-center items-start md:items-center md:text-center text-left w-full px-4 py-12
                  bg-no-repeat bg-[length:180%] md:bg-[length:75%] md:bg-[position:center_top]"
        style={{ backgroundImage: "url('/globe.png')" }}
      >
        <div className="flex flex-col md:items-center md:text-center items-start text-left mt-12">
          <h1 className="ml-2 mr-8 text-8xl md:text-9xl mb-4">Who Powers AI?</h1>
          <h3 className="ml-2 mr-8 text-3xl md:text-5xl mb-6">Exploring the Data Work Landscape</h3>
          <p className="mb-10 ml-2 mr-8 md:mb-4 pt-1 max-w-4xl text-base md:text-justify text-left">
            All around the world, tech companies in the AI industry are powered by workers who develop, train, test, and maintain AI systems. But these workers are hidden away behind virtual marketplaces and labyrinthine supply chains. To highlight the workers who make AI possible, we must shine a light on this shadowy industry.
          </p>
        </div>
      </section>

      {/* THREE PREVIEW BLOCKS */}
      <section className="flex flex-col md:flex-row gap-6 px-12 py-16 w-full">

        {/* Database block */}
        <Link to="/database" className="group flex-1 flex flex-col gap-4 border-2 border-[#041c2c] rounded p-6 hover:bg-[#041c2c] transition-all duration-200z">
          <h3 className="text-3xl group-hover:text-[#f3fdb8] transition-all duration-200">Browse the Database</h3>
          <p className="text-sm group-hover:text-[#f3fdb8]/80 transition-all duration-200">
            Browse companies involved in sourcing and managing AI data work globally, categorized by product type and business model.
          </p>
          <span className="mt-auto text-sm font-semibold uppercase tracking-widest group-hover:text-[#f3fdb8] transition-all duration-200">
            Explore →
          </span>
        </Link>

        {/* Graphs block */}
        <Link to="/graphs" className="group flex-1 flex flex-col gap-4 border-2 border-[#041c2c] rounded p-6 hover:bg-[#041c2c] transition-all duration-200">
          <h3 className="text-3xl group-hover:text-[#f3fdb8] transition-all duration-200">Explore the supply chain</h3>
          <p className="text-sm group-hover:text-[#f3fdb8]/80 transition-all duration-200">
            Interactive visualizations highlighting client, partner, supplier, and investor relationships in the AI data work industry.
          </p>
          <span className="mt-auto text-sm font-semibold uppercase tracking-widest group-hover:text-[#f3fdb8] transition-all duration-200">
            Explore →
          </span>
        </Link>

        {/* Profiles block */}
        <Link to="/profiles" className="group flex-1 flex flex-col gap-4 border-2 border-[#041c2c] rounded p-6 hover:bg-[#041c2c] transition-all duration-200">
          <h3 className="text-3xl group-hover:text-[#f3fdb8] transition-all duration-200">Review Company Profiles</h3>
          <p className="text-sm group-hover:text-[#f3fdb8]/80 transition-all duration-200">
            Detailed profiles of key players in the AI data work ecosystem, their relationships, and the experience of workers.
          </p>
          <span className="mt-auto text-sm font-semibold uppercase tracking-widest group-hover:text-[#f3fdb8] transition-all duration-200">
            Explore →
          </span>
        </Link>

      </section>

    </main>
  );
}