// Contribute.jsx

// This page uses a custom form for contributions to the Data Work Landscape project (not Jotform embed)

import { NavLink } from "react-router-dom";


export default function Contribute() {
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

      {/* Form */}
      <section>
      <div className="w-full max-w-2xl mx-auto mt-20 text-left">
      <h3 className="text-4xl mb-4">Contribute to the project</h3>
        <p className="mb-4">Help us improve the dataset by submitting information about companies in the data work industry.</p>
      </div>
      
      {/* Form container */}
      <div className="flex justify-center items-center h-full bg-[#f3fdb8] pt-4 pb-12 rounded-2xl border border-transparent max-w-xl mx-auto mb-20">
            {/* Fields in the form */}
            <form action="http://localhost:8000/submit" method="POST" className="flex flex-col pt-6 gap-4 w-full max-w-md">
                <label htmlFor="company_name" className="">Company Name</label>
                <input name="company_name" className="p-2 border rounded" required />

                <label htmlFor="company_headquarters" className="">Company Headquarters</label>
                <input name="company_headquarters" className="p-2 border rounded" />

                <label htmlFor="company_type" className="">Company Type</label>
                <input name="company_type" className="p-2 border rounded" />

                <label htmlFor="workforce_model" className="">Company Model</label>
                <input name="workforce_model" className="p-2 border rounded" />

                <label htmlFor="in_house_marketplace_name" className="">Does the company have an in-house marketplace?</label>
                <input name="in_house_marketplace_name" className="p-2 border rounded" />

                <label htmlFor="product_project_assisted_by_data_workers" className="">What type of work did you do?</label>
                <input name="product_project_assisted_by_data_workers" className="p-2 border rounded" />

                <label htmlFor="known_worker_locations" className="">Where did you work?</label>
                <input name="known_worker_locations" className="p-2 border rounded" />


                {/* Consent checkbox */}
                <div>
                <div class="flex items-center gap-2">
                <input
                  name="input_5.1"
                  id="input_1_5_1"
                  type="checkbox"
                  value="1"
                  aria-describedby="gfield_consent_description_1_5"
                  aria-required="true"
                  aria-invalid="false"
                />
                <label for="input_1_5_1" class="gform-field-label gform-field-label--type-inline gfield_consent_label">
                  I agree to the <a href="/privacy-policy" class="underline text-blue-600">privacy policy</a> <span class="gfield_required gfield_required_asterisk">*</span>
                </label>
              </div>
                <p className="text-xs">By submitting this form, you agree to allow your contributions to be published as part of the Data Work Landscape project. All data will be anonymized and used only for this project. We do not share data with external companies. If you have questions about this, please reach out to info@techequity.us.</p>
                </div>
                
                {/* Submit button */}
                <button type="submit" className="p-2 bg-blue-500 text-white rounded">Submit</button>
            </form>
      </div>
      </section>
      </section>
    );
  }
  