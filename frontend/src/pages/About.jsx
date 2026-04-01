// About.jsx
// About the project and techequity page

import { NavLink, Link } from "react-router-dom";
import { useState } from "react";

function Expander({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 text-left"
        style={{ fontFamily: "'Roboto Serif', serif", background: "none", border: "none", cursor: "pointer" }}
      >
        <h5>{title}</h5>
        <span
          style={{
            display: "inline-block",
            transform: open ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
            fontSize: "1.2rem",
            color: "#712f39",
          }}
        >
          ›
        </span>
      </button>
      {open && <div className="pb-6">{children}</div>}
    </div>
  );
}

export default function About() {
  return (
    <main id='about' className="bg-white">
      <section
        className="min-h-screen snap-start flex flex-col items-start md:items-center pt-16"
        style={{
          background: "linear-gradient(to bottom, #f3fdb8 0%, #f3fdb8 11%, #ffffff 18%, #ffffff 100%)",
          backgroundSize: "100% 200vh",
          backgroundRepeat: "no-repeat",
        }}
      > 
      {/* Main site header 
        <h1 className="text-6xl md:text-8xl mb-4 ml-2 mr-8 text-left md:text-center">
          <NavLink to="/" className="hover:underline">Who Powers AI?</NavLink>
        </h1>
        <h2 className="text-2xl md:text-3xl text-left ml-2 mr-8 md:text-center">Exploring the Data Work Landscape</h2>
        */}

        {/* Section header */}
        <div className="w-full max-w-2xl mx-auto mt-6 md:mt-20 text-left ml-2 mr-8">
        <div className="border-b-2 border-[#041c2c] pb-3 mb-6">
          <h1 className="text-5xl md:text-6xl m-0 leading-none">About the project</h1>
        </div>

          {/* Section content */}
          <h4 className="text-2xl pt-2 mb-4">About the Data Work Landscape</h4>
          <p>
            AI is everywhere, consuming our data, content, and resources, relying on masses of workers worldwide to maintain its illusion of magical ease. The workers who make it possible are often intentionally hidden behind virtual marketplaces and <a href="https://techequity.us/2025/01/31/ai-supply-chains-explained/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">complex supply chains</a>. Without knowing who these companies are, these workers are left in the shadows, vulnerable to exploitation and harm.
          </p>
          <br />
          <p>
            We created the Data Work Landscape to shine a light on this shadowy industry by identifying companies that provide data work services, such as data collection, curation, annotation, model training, content moderation, and more.
          </p>
          <br />
          <p>
            This project is just a snapshot of this growing industry. We hope that by pulling back the curtain, we can support further research and advocacy for the workers who power AI. This is also just one project among many being led by researchers and advocates investigating the data work sector.
          </p>
          <br />
          <p>
            We need your help to complete the picture. If you're familiar with or work in the AI data work industry, please <a href="https://form.jotform.com/techequity/data-work-landscape" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">share your experiences with us</a>.
          </p>
          <br />
          <h4 className="text-2xl pt-2 mb-4">Methodology</h4>
          <div className="mt-4">

            <Expander title="Data collection & sources">
              <p>
                To populate this database, we identified companies from news coverage, academic and trade publications that mentioned data workers, content moderation, and AI model building and training broadly defined. Following this, we conducted desk research on each company. This involved:
              </p>
              <ul className="list-disc pl-6 pt-4 space-y-2">
                <li>Surveying company websites, looking specifically for descriptions of the products and services offered, lists of clients and investors, listings of job openings, and information about the location of workers</li>
                <li>Studying news coverage, interviews with founders/other C-suite members, and profiles on sites including Crunchbase and PitchBook to identify headquarters locations, investors, and other information</li>
                <li>Using company LinkedIn profiles to triangulate categories of job openings and worker locations</li>
              </ul>
            </Expander>

            <Expander title="Definitions">
              <p>
                <span className="font-bold">Data Work</span>
                <br />
                We define data work as consisting of data collection, data curation, data annotation, model training, model evaluation, data verification, and content moderation. By extension, any company that offers these services is considered a part of the Data Work Landscape. You can learn more about data work <a href="https://techequity.us/2025/01/31/ai-supply-chains-explained/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">here</a>.
                <br /><br />
                <span className="font-bold">Company Type</span>
                <br />
                We categorize companies by the primary products and services they offer. We found that data work companies offer products and services that fall into three general categories:
              </p>
              <ul className="list-disc pl-6 pt-4 space-y-2">
                <li><i>Tools:</i> AI tools such as generative AI, AI automation, data analysis, large language models (LLMs), data management, real-time analytics, and more</li>
                <li><i>Workforce:</i> A workforce to carry out various key tasks in the development and implementation of AI tools, or</li>
                <li><i>Tools + Workforce:</i> Some combination of both tools and a workforce</li>
              </ul>
              <br />
              <p>
                <span className="font-bold">Workforce Model</span>
                <br />
                Our interest lies primarily in understanding how workers are integrated into the data work portion of the AI supply chain. Our research revealed that companies that fall into the <i>workforce</i> category tend to follow one of three organizational models:
              </p>
              <ul className="list-disc pl-6 pt-4 space-y-2">
                <li><i>BPO (Business Process Outsourcing) Model:</i> A BPO is a type of outsourcing where a third-party provider is engaged to carry out parts of a company's operations. Data workers are employed at delivery centers, which are typically physical offices based in countries around the world</li>
                <li><i>Marketplace Model:</i> Digital platforms where distributed workers perform tasks that are posted. Data workers typically work remotely, logging onto these platforms to access tasks</li>
                <li><i>A combination</i> of BPOs and marketplaces</li>
              </ul>
              <br />
              <p>
                Additionally, these BPOs and marketplaces may be operated through two arrangements. They can be outsourced to third-party providers, which can also be BPOs or marketplaces. Or, they can be owned and operated in-house as subsidiaries or divisions within the AI company itself.
                <br /><br />
                For example, Scale AI has two subsidiaries, <a href="https://scale.com/blog/new-era-outlier" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Outlier</a> and <a href="http://scale.com/blog/remotasks-overview" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Remotasks</a> (which are listed in the <i>In-House Marketplace</i> column in the <Link to="/landscape" className="text-blue-600 underline">Data Work Landscape</Link>). These are both marketplaces where data workers can find work and Scale AI clients can find a workforce. In addition, Scale AI also <a href="https://www.inc.com/sam-blum/investigation-into-scale-ai-also-targets-its-hr-partners-hireart-and-upwork/91159063" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">outsources work to UpWork</a>, an independent company that operates a marketplace model.
                <br /><br />
                To download our full data dictionary, click <a href="/data-dictionary.csv" download target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">here</a>.
              </p>
            </Expander>

            <Expander title="Limitations">
              <p>
                Some of the data contained in our database is collected from the websites of the data companies under study. Many of the companies listed do not have much publicly available information. As a result, cross-verification against other sources is not always possible. It's also likely that this information will change over time. We aim to update it periodically as new information becomes available.
                <br /><br />
                Additionally, our database doesn't yet give a clear picture of who the biggest players in the Data Work Landscape are. We're working on identifying key indicators—like company growth, VC funding, revenue, number of data workers, and client relationships—that can help us answer this question.
                <br /><br />
                These data gaps pose limitations to understanding how these companies operate and the impact they're having on workers in the AI supply chain. We aim to continue this body of research in order to shed light on this industry.
              </p>
            </Expander>

            <Expander title="Download the landscape">
              <p>
                You can download the Data Work Landscape for research and educational purposes by clicking the download button at the bottom of the <Link to="/landscape" className="text-blue-600 underline">landscape</Link>.
              </p>
            </Expander>

          </div>

          <h4 className="text-2xl pt-10 mb-4">About TechEquity</h4>
          <p>
          We raise public consciousness about economic equity issues resulting from the tech industry’s products and practices and advocate for change that ensures tech’s evolution benefits everyone. Learn more about TechEquity <a href="https://techequity.us" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">here</a>.
          </p>
        </div>
      </section>
    </main>
  );
}