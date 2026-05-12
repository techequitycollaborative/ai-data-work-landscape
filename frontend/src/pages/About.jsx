// About.jsx
// About the project and techequity page

import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import Expander from "../components/Expander";
import convertToCSV from "../components/ConvertCSV";

export default function About() {
  const [displayedData, setDisplayedData] = useState([]);

  useEffect(() => {
    const API_URLS = {
      production: "https://data-work-landscape-lymyf.ondigitalocean.app/ai-data-work-landscape-backend/data",
      development: "https://dev-dwl-gxd6w.ondigitalocean.app/ai-data-work-landscape-backend/data",
      local: "http://localhost:8000/data",
    };
    const getApiUrl = () => {
      const hostname = window.location.hostname;
      if (hostname === "localhost" || hostname === "127.0.0.1") return API_URLS.local;
      if (hostname.includes("dev-")) return API_URLS.development;
      return API_URLS.production;
    };
    fetch(getApiUrl())
      .then((res) => res.json())
      .then(setDisplayedData)
      .catch((err) => console.error("Failed to fetch data:", err));
  }, []);

  const handleDownloadCSV = () => {
    const csv = convertToCSV(displayedData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main id='about' className="bg-white">
      <section
        className="min-h-screen snap-start flex flex-col items-start md:items-center pt-8 pb-16"
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
        <div className="w-full px-12 md:px-20 mt-6 md:mt-20">
        <div className="border-b-2 border-[#041c2c] pb-3 mb-6">
          <h1 className="text-5xl md:text-6xl m-0 leading-none">About the project</h1>
        </div>

          {/* Section content */}
          <h4 className="text-2xl pt-2 mb-4">About the Data Work Landscape</h4>
          <p>
          AI is everywhere, consuming our data, content, and resources, relying on masses of workers worldwide to maintain its illusion of magical ease. The workers who make it possible are often intentionally hidden behind virtual marketplaces and <a href="https://techequity.us/2025/01/31/ai-supply-chains-explained/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">complex supply chains</a>. Little information is currently publicly available explaining how this industry operates, leaving workers vulnerable to exploitation and harm.
          </p>
          <br />
          <p>
          We created the Data Work Landscape to shine a light on this shadowy industry by identifying companies that provide data work services, such as data collection, curation, annotation, model training, content moderation, and more. This project is just a snapshot of this growing industry. We launched this microsite in 2025 with the database feature. In the spring of 2026, we updated the database, added profiles of some of the companies in the database and launched visualizations to highlight the relationships between these companies and their reported customers, investors, and partners.
          </p>
          <br />
          <p>
          We hope that by pulling back the curtain, we can support further research and advocacy for the workers who power AI.
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
                To populate our company database, network graph, and company profiles, we identified companies from news coverage, academic and trade publications that mentioned data workers, content moderation, and AI model building and training broadly defined. Following this, we conducted desk research on each company. This involved:
              </p>
              <ul className="list-disc pl-6 pt-4 space-y-2">
                <li>Surveying company websites, looking specifically for descriptions of the products and services offered, lists of customers and investors, listings of job openings, and information about the location of workers;</li>
                <li>Studying news coverage, interviews with founders/other C-suite members, and profiles on sites including Crunchbase and PitchBook, among other sources, to identify headquarters locations, investors, and other information;</li>
                <li>Using company LinkedIn profiles to triangulate categories of job openings and worker locations.</li>
              </ul>
              <br />
              <p>

              </p>
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
                <li><i>Tools:</i> AI tools such as generative AI, AI automation, data analysis, large language models (LLMs), data management, real-time analytics, and more;</li>
                <li><i>Workforce:</i> A workforce to carry out various key tasks in the development and implementation of AI tools; or,</li>
                <li><i>Tools + Workforce:</i> Some combination of both tools and a workforce.</li>
              </ul>
              <br />
              <p>
                <span className="font-bold">Workforce Model</span>
                <br />
                Our interest lies primarily in understanding how workers are integrated into the data portion of the AI supply chain. Our research revealed that companies that fall into the <i>workforce</i> category tend to follow one of three organizational models:
              </p>
              <ul className="list-disc pl-6 pt-4 space-y-2">
                <li><i>BPO (Business Process Outsourcing) Model:</i> A BPO is a type of outsourcing where a third-party provider is engaged to carry out parts of a company's operations. Data workers are employed at delivery centers, which are typically physical offices based in countries around the world.</li>
                <li><i>Marketplace Model:</i> Digital platforms where distributed workers perform tasks that are posted. Data workers typically work remotely, logging onto these platforms to access tasks.</li>
                <li><i>A combination</i> of BPOs and marketplaces.</li>
              </ul>
              <br />
              <p>
                Additionally, these BPOs and marketplaces may be operated through two arrangements. They can be outsourced to third-party providers, which can also be BPOs or marketplaces. Or, they can be owned and operated in-house as subsidiaries or divisions within the AI company itself.
                <br /><br />
                For example, Scale AI has two subsidiaries, <a href="https://scale.com/blog/new-era-outlier" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Outlier</a> and <a href="http://scale.com/blog/remotasks-overview" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Remotasks</a> (which are listed in the <i>In-House Marketplace</i> column in the <Link to="/database" className="text-blue-600 underline">database</Link>). These are both marketplaces where data workers can find work and Scale AI customers can find a workforce. In addition, Scale AI also <a href="https://www.inc.com/sam-blum/investigation-into-scale-ai-also-targets-its-hr-partners-hireart-and-upwork/91159063" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">outsources work to UpWork</a>, an independent company that operates a marketplace model.
              </p>
              <br />
              <p>
                <span className="font-bold">Relationship Type</span>
                <br />
                In company profiles and our visualization feature, we also categorize different kinds of relationships that companies have with other businesses. Here is how we have defined these relationships:
              </p>
              <ul className="list-disc pl-6 pt-4 space-y-2">
                <li><i>Customer:</i> A business that purchases a company’s goods or services, tools, etc.
                </li>
                <li><i>Partner:</i> A business or institution with which a company maintains a strategic relationship (e.g. a data work company partnering with a cloud service provider);</li>
                <li><i>Investor:</i> A business or individual that commits capital to a company in expectation of a financial return;</li>
                <li><i>Subcontractor:</i> A business to which a company outsources parts of its production or service process (e.g. Scale AI outsources data work to UpWork).</li>
              </ul>
              <br />
            </Expander>

            <Expander title="Limitations">
              <p>
                Some of the data contained in our database is collected from the websites of the data companies under study. Many of the companies listed do not have much publicly available information. As a result, cross-verification against other sources is not always possible.
                <br /><br />
                It’s also likely that this information will change over time. It’s not often that information is made public about when contracts start and end. For example, any customer, investor or partner relationship between companies might end without public announcement. As such, the relationships we note in this microsite are those that have ever existed between the companies in question and for which we found public documentation. If the ending of a contract is officially announced by a company, we will update the microsite accordingly when possible. We aim to similarly update other fields of data periodically as new verifiable information becomes available.
                <br /><br />
                Many of the data companies offer a range of different kinds of services and since many of these companies are startups, they are prone to pivot their entire business models over time. Information about the specific nature of the services data companies provide to customers and the details of partnerships are rarely available. In some cases, we have been able to clarify when a company that provided a range of services has worked with a customer specifically on data work, but since it is not always possible to discern the specific services being offered to customers, we have opted to include any records of customer and partnership relationships in cases where the specific nature of the services provided has not been available.
                <br /><br />
                Additionally, our database doesn’t yet give a clear picture of who the biggest players in the Data Work Landscape are. We're working on identifying key indicators—like company growth, VC funding, revenue, number of data workers, and customer relationships—that can help us answer this question.
                <br /><br />
                These data gaps pose limitations to understanding how these companies operate and the impact they’re having on workers in the AI supply chain. Data work is an opaque industry. Companies are generally not required to reveal contractual relationships and these contracts shift constantly. In the absence of transparent information, information on this site is based on an incomplete set of publicly available sources including news coverage, academic and trade publications, and company websites. The information provided on this site is a snapshot of some of the companies that provide data services and their relationships, but this resource is not—and cannot be— exhaustive or completely up-to-date.
                <br /><br />
                We aim to continue this research in order to shed light on this industry. If you have information you’d like to contribute to the project, please <a href="https://form.jotform.com/techequity/data-work-landscape" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">share it with us</a>.
              </p>
            </Expander>

            <Expander title="Download the landscape">
              <p>
              The data on this site is free to use for non-commercial educational purposes.
              <ul className="list-disc pl-6 pt-4 space-y-2">
                <li>You can download our company database <button onClick={handleDownloadCSV} className="text-blue-600 underline">here</button> and our full data dictionary <a href="/data-dictionary.csv" download target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">here</a>.</li>
                <li>You can access our relationship graph data and full list of sources here.</li>
              </ul>
              </p>
            </Expander>

            <Expander title="Acknowledgments">
              <p>
              We’d like to thank the following undergraduate students at the University of California Berkeley for their support conducting some of the research for this project: Anvi Abhijit Gaikwad, Yasamin L. Hatefi, Georgia Darcy Richards, Naomi Tran, Mads Emil Matz Walbum, Alicia Williams-LeDoux.
              </p>
              <br />
              <p>
              This is also just one project among many being led by researchers and advocates investigating the data work sector. We’ve compiled a list of reports, books, maps, and other resources from friends worldwide if you want to <a href="https://techequity.us/2025/06/25/whos-powering-ai-shining-a-light-on-the-ai-data-work-industry/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">learn more</a>.
              </p>
            </Expander>

          </div>

          <h4 className="text-2xl pt-10 mb-4">About TechEquity</h4>
          <p>
          We raise public consciousness about economic equity issues resulting from the tech industry’s products and practices and advocate for change that ensures tech’s evolution benefits everyone. Learn more about TechEquity <a href="https://techequity.us" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">here</a>.
          </p>

          <h4 className="text-2xl pt-10 mb-4">Contact us</h4>
          <p>
          If you’d like to reach out to the team behind the Data Work Landscape, you can email <a href="mailto:info@techequity.us" className="text-blue-600 underline">info@techequity.us</a> to get in touch.
          </p>
        </div>
      </section>
    </main>
  );
}