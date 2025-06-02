// Contribute.jsx
// This version of the page uses an embedded jotform for the survey

export default function Contribute() {
    return (
      <section id="methods" 
      className="min-h-screen snap-start flex flex-col items-center pt-16"
      style={{background: "linear-gradient(to bottom, #f3fdb8 0%, #f3fdb8 8%, #ffffff 18%, #ffffff 100%)",}} /* Gradient background yellow to white */
      >
      
      {/* Main site header */}
      <h1 className="text-8xl mb-4 text-center">Who Powers AI?</h1>
      <h2 className="text-3xl text-center">Exploring the main players in the AI data work industry</h2>

      {/* JotForm Embed */}
      <div className="w-full max-w-4xl mx-auto mt-20">
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
    );
  }
  