// src/pages/Profiles.jsx
// Lists all company profiles; click a company to go to its profile detail page

import { useNavigate, NavLink } from "react-router-dom";
import { COMPANIES } from "../data/companies";
import Badge from "../components/Badge";
import Expander from "../components/Expander";


export default function Profiles() {
  const navigate = useNavigate();

  return (
    <main
      id="profiles" className="bg-white">
      <section
        /* Gradient here is a bit higher so as not to have yellow on any of the company names */
        className="min-h-screen snap-start flex flex-col items-start md:items-center pt-8 pb-16"
        style={{
          background: "linear-gradient(to bottom, #f3fdb8 0%, #f3fdb8 9%, #ffffff 16%, #ffffff 100%)",
          backgroundSize: "100% 200vh",
          backgroundRepeat: "no-repeat",
        }}
      > 
      {/* Main site header 
      <h1 className="text-6xl md:text-8xl mb-4 ml-2 mr-8 text-left md:text-center">
        <NavLink to="/" className="hover:underline">
          Who Powers AI?
        </NavLink>
      </h1>
      <h2 className="text-2xl md:text-3xl text-left ml-2 mr-8 md:text-center mb-10">
        Exploring the Data Work Landscape
      </h2>*/}

      {/* Profiles section */}
      <div className="w-full px-12 md:px-20 mt-6 md:mt-20">

        {/* Section header */}
        <div className="border-b-2 border-[#041c2c] pb-3 mb-6">
          <h1 className="text-5xl md:text-6xl m-0 leading-none">Profiles</h1>
        </div>

        <p className="mt-2 text-sm text-gray-500 font-normal normal-case" style={{ fontFamily: "'Roboto Serif', serif" }}>
        A closer look at some of the companies providing data services to the AI industry: who they are, how they operate, and what that means for the workers powering it all.
        </p>
        <br></br> 

        {/* Company list */}
        <div className="flex flex-col">
          {COMPANIES.map((company, index) => (
            <button
              key={company.slug}
              onClick={() => navigate(`/profiles/${company.slug}`)}
              className="
                flex items-center justify-between w-full
                bg-transparent border-0 border-b border-gray-200
                py-4 px-0 cursor-pointer text-left
                transition-colors duration-100
                hover:bg-[#f3fdb8]
              "
            >
              {/* Index + Name */}
              <div className="flex items-baseline gap-4">
                <span className="text-xs text-gray-400 min-w-[1.5rem]" style={{ fontFamily: "'Roboto Serif', serif" }}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-2xl uppercase" style={{ fontFamily: "'Anton', sans-serif", letterSpacing: "0.04em", color: "#041c2c" }}>
                  {company.name}
                </span>
              </div>

              {/* Company hq label */}
              <div className="flex items-center gap-3 shrink-0">
                <span className="hidden sm:inline text-xs text-gray-400" style={{ fontFamily: "'Roboto Serif', serif" }}>
                  {company.hq}
                </span>
                <span className="text-sm font-bold">→</span>
              </div>
            </button>
          ))}

        {/* Expander with disclaimer */}
        <div className="mt-6">
          <Expander title="A note about these profiles">
          <div className="space-y-4">
            <p>
            Data work is an opaque industry. Companies are generally not required to reveal contractual relationships and these contracts shift constantly. In the absence of transparent information, these profiles are based on an incomplete set of publicly available sources including news coverage, academic and trade publications, and company websites.
            </p>
            <p>
            These profiles provide a snapshot of some of the companies that provide data services and their relationships, but this resource is not—and cannot be—exhaustive or completely up-to-date.
            </p>
            <p>
              Visit our <a href="https://dataworklandscape.org/about" className="text-blue-600 underline hover:opacity-70 transition-all">About</a> page for more information on our methodology and limitations.
            </p>
          </div>
          </Expander>
        </div>
        </div>
      </div>
    </section>
  </main>
  );
}