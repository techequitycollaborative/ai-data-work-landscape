// Methods.jsx
// Data methodology page

import { Link, NavLink } from "react-router-dom";


export default function Methods() {
    return (

        <section id="methods" 
          className="min-h-screen snap-start flex flex-col items-start md:items-center pt-16"
          style={{
            background: "linear-gradient(to bottom, #f3fdb8 0%, #f3fdb8 11%, #ffffff 18%, #ffffff 100%)",
            minHeight: "200vh", // keep for long content if needed
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 200vh", // matches visual height of gradient
          }}
        >
        
        {/* Main site header */}
        <h1 className=" text-6xl md:text-8xl mb-4 ml-2 mr-8 text-left md:text-center">
          <NavLink to="/" className="hover:underline">
            Who Powers AI?
          </NavLink>
        </h1>      
        <h2 className="text-2xl md:text-3xl text-left ml-2 mr-8 md:text-center">Exploring the Data Work Landscape</h2>
      
        {/* Section header + body text centered in a narrower column */}
        <section>
        <section className="ml-2 mr-8">
        <div className="w-full max-w-2xl mx-auto mt-6 md:mt-20 text-left">
          <h3 className="text-4xl md:mb-4">Methodology</h3>
          <h4 className="text-2xl pt-2 mb-4">Data collection & sources</h4>
          <p>
          To populate this database, we identified companies from news coverage, academic and trade publications that mentioned data workers, content moderation, and AI model building and training broadly defined. Following this, we conducted desk research on each company. This involved:
            <ul className="list-disc pl-6 pt-4 space-y-2">
              <li> Surveying company websites, looking specifically for descriptions of the products and services offered, lists of clients and investors, listings of job openings, and information about the location of workers</li>
              <li> Studying news coverage, interviews with founders/other C-suite members, and profiles on sites including Crunchbase and PitchBook to identify headquarters locations, investors, and other information</li>
              <li> Using company LinkedIn profiles to triangulate categories of job openings and worker locations</li>
            </ul>
          </p>

          <h4 className="text-2xl pt-6 mb-4">Definitions</h4>
          <p> 
          <span className="font-bold pb-2">Data Work</span>
          <br />
          We define data work as consisting of data collection, data curation, data annotation, model training, model evaluation, data verification, and content moderation. By extension, any company that offers these services is considered a part of the Data Work Landscape. You can learn more about data work <a href="https://techequity.us/2025/01/31/ai-supply-chains-explained/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">here</a>.
          <br />
          <br />
          <span className="font-bold pb-2">Company Type</span>
          <br />
          We categorize companies by the primary products and services they offer. We found that data work companies offer products and services that fall into three general categories:
          <ul className="list-disc pl-6 pt-4 space-y-2">
              <li><i>Tools:</i> AI tools such as generative AI, AI automation, data analysis, large language models (LLMs), data management, real-time analytics, and more </li>  
              <li><i>Workforce:</i> A workforce to carry out various key tasks in the development and implementation of AI tools, or</li>  
              <li><i>Tools + Workforce:</i> Some combination of both tools and a workforce </li>
            </ul>
          <br />
          <span className="font-bold pb-2">Workforce Model</span>
          <br />
          Our interest lies primarily in understanding how workers are integrated into the data work portion of the AI supply chain. Our research revealed that companies that fall into the <i>workforce</i> category tend to follow one of three organizational models:
          <ul className="list-disc pl-6 pt-4 space-y-2">
              <li><i>BPO (Business Process Outsourcing) Model:</i> A BPO is a type of outsourcing where a third-party provider is engaged to carry out parts of a company’s operations. Data workers are employed at delivery centers, which are typically physical offices based in countries around the world</li>
              <li><i>Marketplace Model:</i> Digital platforms where distributed workers perform tasks that are posted. Data workers typically work remotely, logging onto these platforms to access tasks</li>  
              <li><i>A combination</i> of BPOs and marketplaces</li>
            </ul>
          <br />
          Additionally, these BPOs and marketplaces may be operated through two arrangements. They can be outsourced to third-party providers, which can also be BPOs or marketplaces. Or, they can be owned and operated in-house as subsidiaries or divisions within the AI company itself.
          <br />
          <br />
          For example, Scale AI has two subsidiaries, <a href="https://scale.com/blog/new-era-outlier" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Outlier</a> and <a href="http://scale.com/blog/remotasks-overview" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Remotasks</a> (which are listed in the <i>In-House Marketplace</i> column in the <Link to="/landscape" className="text-blue-600 underline">Data Work Landscape</Link>). These are both marketplaces where data workers can find work and Scale AI clients can find a workforce. In addition, Scale AI also <a href="https://www.inc.com/sam-blum/investigation-into-scale-ai-also-targets-its-hr-partners-hireart-and-upwork/91159063" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">outsources work to UpWork</a>, an independent company that operates a marketplace model.
          <br />
          <br />
          To download our full data dictionary, click <a href="/data-dictionary.csv" download target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">here</a>. 
          </p>

          <h4 className="text-2xl pt-6 mb-4">Limitations</h4>
          <p>
          Some of the data contained in our database is collected from the websites of the data companies under study. Many of the companies listed do not have much publicly available information. As a result, cross-verification against other sources is not always possible. It’s also likely that this information will change over time. We aim to update it periodically as new information becomes available.
          <br />
          <br />
          Additionally, our database doesn’t yet give a clear picture of who the biggest players in the Data Work Landscape are. We're working on identifying key indicators—like company growth, VC funding, revenue, number of data workers, and client relationships—that can help us answer this question.
          <br />
          <br />
          These data gaps pose limitations to understanding how these companies operate and the impact they’re having on workers in the AI supply chain. We aim to continue this body of research in order to shed light on this industry. 
          <br />
          <br />
          If you have information you’d like to contribute to the project, please share it with us <Link to="/input" className="text-blue-600 underline">here</Link>.
          </p>
          <h4 className="text-2xl pt-6 mb-4">Download the landscape</h4>
          <p>
          You can download the Data Work Landscape for research and educational purposes by clicking the download button at the bottom of the <Link to="/landscape" className="text-blue-600 underline">landscape</Link>.
          </p>  
          </div>
          </section>
        </section>
        
      </section>
    );
  }
  