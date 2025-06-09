// Contribute.jsx
// This version of the page uses an embedded jotform for the survey


import { NavLink } from "react-router-dom";

export default function Contribute_Jotform() {
    return (
      <section id="contribute" 
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

      {/* Page header */}
      <section>
      <div className="w-full max-w-2xl mx-auto mt-20 text-left">
      <h3 className="text-4xl mb-4">Contribute to the project</h3>
        <p className="mb-4">Want to add to the Data Work Landscape? Help shine a light on the data work industry by submitting information on companies already listed or that should be listed here.</p>
      </div>
      
      {/* JotForm Embed */}
      <div className="w-full max-w-4xl mx-auto mt-6">
          <iframe
              src="https://form.jotform.com/251525543823052"
              title="Contribute Form"
              width="100%"
              height="800px"
              frameBorder="0"
              allowFullScreen
          ></iframe>
      </div>
      
    
      </section>
    </section>
    );
  }
  