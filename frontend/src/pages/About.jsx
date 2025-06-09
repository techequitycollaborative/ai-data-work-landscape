// About.jsx
// About the project and techequity page

import {NavLink} from "react-router-dom";


export default function About() {
  return (
    <section id="about" 
      className="min-h-screen snap-start flex flex-col items-center pt-16"
      style={{background: "linear-gradient(to bottom, #f3fdb8 0%, #f3fdb8 12%, #ffffff 22%, #ffffff 100%)",}} /* Gradient background yellow to white */
      >
      
      {/* Main site header */}
      <h1 className="text-8xl mb-4 text-center">
        <NavLink to="/" className="hover:underline">
          Who Powers AI?
        </NavLink>
      </h1>      
      <h2 className="text-3xl text-center">Exploring the Data Work Landscape</h2>

      {/* Section header + body text centered in a narrower column */}
      <div className="w-full max-w-2xl mx-auto mt-20 text-left">
        <h3 className="text-4xl mb-4">About the project</h3>
        <h4 className="text-2xl pt-2 mb-4">About the Data Work Landscape</h4>
        <p>
        AI is everywhere, consuming our data, content, and resources, relying on masses of workers worldwide to maintain its illusion of automagical ease. The workers who make it possible are often intentionally hidden behind virtual marketplaces and <a href="https://techequity.us/2025/01/31/ai-supply-chains-explained/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">complex supply chains</a>. Without knowing who these companies are, these workers are left in the shadows, vulnerable to exploitation and harm.
        </p>  
        <br />
        <p>
        We created the Data Work Landscape to shine a light on this shadowy industry by identifying companies that provide data work services, such as data collection, curation, annotation, model training, content moderation, and more. You can read more about the project <a href="https://techequity.us" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">here</a>.
        </p>
        <br />   
        <p>
        This project is just a snapshot of this growing industry. We hope that by pulling back the curtain, we can support further research and advocacy for the workers who power AI.
        </p>
        <br />
        <p>
        We need your help to complete the picture. If you’re familiar with or work in the AI data work industry, please <NavLink to="/Input" className="text-blue-600 underline">share your experiences with us</NavLink>. 
        </p>
        
        <h4 className="text-2xl pt-6 mb-4">About TechEquity</h4>
        <p>
        The tech industry plays a consequential role in our society and within our communities. We want to see tech foster prosperity, not exacerbate inequity. We’re addressing how tech intersects with the most consequential areas of the economy for everyday people: where they live (housing) and the conditions under which they work (labor). 
        </p>
        <br />
        <p className="pb-4">
        Tackling tech’s intersection with economic equity requires a multi-faceted approach. We:
        </p>
          <ul className="list-disc pl-6 space-y-2">
            <li> Raise public consciousness about emerging areas where tech companies create economic inequity.</li>
            <li> Articulate and advocate for the regulation and adoption of industry-wide standards to address the harms and opportunities we identify.</li>
            <li> Support implementation and enforcement of these regulatory agendas and industry standards.</li>
            <li> Work with advocates and workers in California and around the world to understand AI’s global supply chain and build frameworks to protect workers everywhere.</li>
          </ul>
        <br />
        Learn more about TechEquity <a href="https://techequity.us" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">here</a>.
        <br />
        <br />
      </div>

    </section>
  );
}
