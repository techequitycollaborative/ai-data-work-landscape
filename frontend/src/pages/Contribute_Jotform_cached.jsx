// Contribute.jsx
// Updated version using the cached JotForm component

import { NavLink } from "react-router-dom";
import { memo } from 'react';
import CachedJotForm from '../components/Form'; // Import the cached component

const Contribute_Jotform = memo(function Contribute_Jotform() {
  return (
    <main id='input' className="bg-white">
      <section 
        id="input_main"
        className="min-h-screen snap-start flex flex-col items-center pt-16"
        style={{
          background: "linear-gradient(to bottom, #f3fdb8 0%, #f3fdb8 11%, #ffffff 18%, #ffffff 100%)",
          //minHeight: "200vh",
          backgroundSize: "100% 200vh", // matches visual height of gradient
          backgroundRepeat: "no-repeat",
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
            <p className="mb-4">
              Do you work for one of the companies highlighted on this page? Do you have an addition, edit, or suggestion to contribute to the Data Work Landscape? We want to hear from you. We want to learn more about other companies in the AI data space, as well as collect stories from people who have been involved in data work.
              <br />
              <br />
              Share your data work story or submit details of companies we might have missed. Submit anonymously or provide your contact information if you’d like us to follow up with you.
            </p>
          </div>
          
          {/* Cached JotForm Component */}
          <CachedJotForm 
            src="https://form.jotform.com/251525543823052"
            title="Contribute Form"
            width="100%"
            height="500px"
            className="w-full max-w-2xl mx-auto mt-6 border border-gray-300 rounded-lg shadow-lg p-4"
          />
          
          <div className="w-full max-w-2xl mx-auto mt-6 mb-10 text-left">
            <h4 className="text-2xl pt-2 mb-4">Contact us</h4>
            <p>
              If you'd like to reach out to the team behind the Data Work Landscape, you can email{' '}
              <a 
                href="mailto:info@techequity.us" 
                className="text-blue-600 underline" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                info@techequity.us
              </a>{' '}
              to get in touch.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
});

export default Contribute_Jotform;