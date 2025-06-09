// About.jsx
// About the project and techequity page

import {NavLink} from "react-router-dom";


export default function About() {
  return (
    <section id="about" 
      className="min-h-screen snap-start flex flex-col items-center pt-16"
      style={{background: "linear-gradient(to bottom, #f3fdb8 0%, #f3fdb8 20%, #ffffff 40%, #ffffff 100%)",}} /* Gradient background yellow to white */
      >
      
      {/* Main site header */}
      <h1 className="text-8xl mb-4 text-center">
        <NavLink to="/" className="hover:underline">
          Who Powers AI?
        </NavLink>
      </h1>      
      <h2 className="text-3xl text-center">Exploring the main players in the AI data work industry</h2>

      {/* Section header + body text centered in a narrower column */}
      <div className="w-full max-w-2xl mx-auto mt-20 text-left">
        <h3 className="text-4xl mb-4">About the project</h3>
        <h4 className="text-2xl pt-2 mb-4">About the Data Work Landscape</h4>
        <p>
        As AI becomes more prevalent in our daily lives, the workers who make it possible are often hidden behind virtual marketplaces and complex supply chains. The Data Work Landscape is a project that aims to shed light on this shadowy industry by mapping the companies that provide data work services, such as data collection, curation, annotation, model training, and content moderation. This project is just a snapshot of this shadowy and nascent industry. We hope it serves as a starting point for further research and advocacy around the workers who power AI.
        </p>  
        <h4 className="text-2xl pt-6 mb-4">About TechEquity</h4>
        <p>
        The tech industry plays a consequential role in our society and within our communities. We want to see tech foster prosperity, not exacerbate inequity. We’re addressing how tech intersects with the most consequential areas of the economy for everyday people: where they live (housing) and the conditions under which they work (labor). Tackling tech’s intersection with economic equity requires a multi-faceted approach. We:
        <br />
        <br />
          <ul className="list-disc pl-6 space-y-2">
            <li> Raise public consciousness about emerging areas where tech companies create economic inequity.</li>
            <li> Articulate and advocate for the regulation and adoption of industry-wide standards to address the harms and opportunities we identify.</li>
            <li> Support implementation and enforcement of these regulatory agendas and industry standards.</li>
            <li> Work with advocates and workers in California and around the world to understand AI’s global supply chain and build frameworks to protect workers everywhere.</li>
          </ul>
        <br />
        <br />
        Learn more about TechEquity <a href="https://techequity.us" className="text-blue-600 underline">here</a>.
        <br />
        <br />
        </p>
      </div>

    </section>
  );
}
