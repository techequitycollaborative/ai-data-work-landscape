// Graphs.jsx
// Page for two network graph data viz

import NetworkGraph from "../components/NetworkGraph";
import Expander from "../components/Expander";

export default function Graphs() {
  return (
    <main
      id="network"
      className="min-h-screen snap-start flex flex-col pt-8 pb-16"
      style={{
        background: "linear-gradient(to bottom, #f3fdb8 0%, #f3fdb8 11%, #ffffff 18%, #ffffff 100%)",
        backgroundSize: "100% 200vh",
      }}
    >
      <div className="w-full px-12 md:px-20 mt-6 md:mt-20">

        {/* Section header */}
        <div className="border-b-2 border-[#041c2c] pb-3 mb-6">
          <h1 className="text-5xl md:text-6xl m-0 leading-none">Graphs</h1>
        </div>

        <p className="mt-2 text-sm text-gray-500 font-normal normal-case" 
                      style={{ fontFamily: "'Roboto Serif', serif" }}>
          Explore the relationships between data work companies, their customers, partners, and investors.
        </p>
        <br />

      </div>

      {/* Network graph */}
      <div className="w-full px-12 md:px-20">
        <NetworkGraph />
      </div>

      {/* Expander with disclaimer */}
      <div className="w-full px-12 md:px-20 mt-4">
        <Expander title="A note about these graphs">
        <div className="space-y-4">
        <p>
        Data work is an opaque industry. Companies are generally not required to reveal contractual relationships and these contracts shift constantly. In the absence of transparent information, these graphs are based on an incomplete set of publicly available sources including news coverage, academic and trade publications, and company websites.
        </p>
        <p>
        The graphs provide a snapshot of some of the companies involved in data services and their relationships, but this resource is not—and cannot be—exhaustive or completely up-to-date. It’s not often that information is made public about when contracts start and end nor the specific type of services exchanged.
        </p>
        <p>
          Visit our <a href="https://dataworklandscape.org/about" className="text-blue-600 underline hover:opacity-70 transition-all">About</a> page for more information on our methodology and limitations.
        </p>
        </div>
        </Expander>
    </div>

    </main>
  );
}