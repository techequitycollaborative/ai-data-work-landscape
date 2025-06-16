// Home.jsx
// The main home page of the microsite with hero title, text, and button linking to the landscape data
// Background globe image is responsive to device/window size


import { Link } from "react-router-dom";


export default function Home() {
  return (
    <main
      className="flex flex-col justify-center items-center min-h-screen w-full bg-[#f3fdb8] px-4 
                bg-no-repeat bg-[position:center-bottom] bg-[position:70%_80%] bg-[length:180%] 
                md:bg-[length:75%] md:bg-top md:bg-[position:center_top]"
      style={{
        backgroundImage: "url('/globe.png')",
      }}
    >

      <section className="flex flex-col md:items-center md:text-center items-start text-left">
      {/* Hero section with title, subtitle, and description */}
      <h1 className="ml-2 mr-8 text-8xl md:text-9xl mb-4">Who Powers AI?</h1>
      <h3 className="ml-2 mr-8 text-3xl md:text-5xl mb-6">Exploring the Data Work Landscape</h3>
      <section className="items-start">
      <p className=" mb-10 ml-2 mr-8 md:mb-24 pt-1 max-w-4xl text-base md:text-justify text-left">
      All around the world, tech companies in the AI industry are powered by workers who develop, train, test, and maintain AI systems. But these workers are hidden away behind virtual marketplaces and labyrinthine supply chains. To highlight the workers who make AI possible, we must shine a light on this shadowy industry.
      </p>
      </section>
      {/* Button to navigate to the landscape page */}
      <Link to="/landscape">
        <button className="btn-home">EXPLORE THE DATA</button>
      </Link>
      </section>   

    </main>
  );
}
