// Contribute_Jotform.jsx
// This version of the page uses an embedded jotform for the survey


import { NavLink } from "react-router-dom";

export default function Contribute_Jotform() {
    return (
      <main id='input'>
      <section id="input_main" 
      className="min-h-screen snap-start flex flex-col items-center pt-16"
      style={{
        //background: "linear-gradient(to bottom, #f3fdb8 0%, #f3fdb8 12%, #ffffff 22%, #ffffff 100%)",
        background: "linear-gradient(to bottom, #f3fdb8 0%, #f3fdb8 11%, #ffffff 18%, #ffffff 100%)",
        minHeight: "200vh",
        backgroundSize: "100% 200vh", // matches visual height of gradient
      }} /* Gradient background yellow to white */
      >
      
      {/* Main site header */}
      <h1 className="text-8xl mb-4 text-center">
        <NavLink to="/" className="hover:underline">
          Who Powers AI?
        </NavLink>
      </h1>
      <h2 className="text-3xl text-center">Exploring the Data Work Landscape</h2>

      {/* Page header */}
      <section>
      <div className="w-full max-w-2xl mx-auto mt-20 text-left">
      <h3 className="text-4xl mb-4">Share your info</h3>
        <p className="mb-4">Do you work for one of the companies highlighted on this page? Do you work for a company not listed here? We want to hear from you. We want to learn more about other companies in the AI data space, as well as stories from people who have been involved in data work.
        <br />
        <br />
        Share your data work story or submit details of companies we might have missed.
        </p>
      </div>
      
      {/* JotForm Embed */}
      <div className="w-full max-w-2xl mx-auto mt-6">
          <iframe
              src="https://form.jotform.com/251525543823052"
              title="Contribute Form"
              width="100%"
              height="800px"
              frameBorder="0"
              allowFullScreen
          ></iframe>
      </div>
      
      <div className="w-full max-w-2xl mx-auto mt-6 mb-10 text-left">
      <h4 className="text-2xl pt-2 mb-4">Contact us</h4>
      <p>
      If you’d like to reach out to the team behind the Data Work Landscape, you can email <a href="mailto:info@techequity.us" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">info@techequity.us</a> to get in touch.
      </p>
      </div>
      
      </section>
    </section>
    </main>
    );
  }
  