// src/pages/ProfileDetail.jsx
// Individual company profile page with prev/next navigation

import { useParams, useNavigate, NavLink } from "react-router-dom";
import { COMPANIES } from "../data/companies";
import Badge, { BadgeList } from "../components/Badge";
import ReactMarkdown from "react-markdown";

export default function ProfileDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const currentIndex = COMPANIES.findIndex(c => c.slug === slug);
  const company = COMPANIES[currentIndex];

  // If no company matches the slug, show a "not found" message with a back link
  if (!company) {
    return (
      <div>
        <p>Company not found.</p>
        <button onClick={() => navigate("/profiles")}>← Back to Profiles</button>
      </div>
    );
  }

  const prevCompany = currentIndex > 0 ? COMPANIES[currentIndex - 1] : null;
  const nextCompany = currentIndex < COMPANIES.length - 1 ? COMPANIES[currentIndex + 1] : null;

  return (
    
    <main id="profile-detail">
      <div
        className="w-full min-h-screen"
        /* Gradient here is a bit higher so the yellow doesn't lay on top of the profile sections
        Especially the overview card */
        style={{
          background: "linear-gradient(to bottom, #f3fdb8 0%, #f3fdb8 5%, #ffffff 10%, #ffffff 100%)",
          backgroundSize: "100% 200vh",
          backgroundRepeat: "no-repeat",
        }}
      >
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 pt-8">

        {/* Header: company name + prev/next */}
        <div className="profile-header">
          <h1>{company.name}</h1>

          <div className="profile-nav-buttons">
            <button
              onClick={() => prevCompany && navigate(`/profiles/${prevCompany.slug}`)}
              disabled={!prevCompany}
            >
              ← Previous
            </button>
            <span>|</span>
            <button
              onClick={() => nextCompany && navigate(`/profiles/${nextCompany.slug}`)}
              disabled={!nextCompany}
            >
              Next →
            </button>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="profile-grid">

          {/* LEFT COLUMN */}
          <div>
            {/* Overview */}
            <section className="profile-section">
              <h2>Overview</h2>
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p>{children}</p>,
                  a: ({ href, children }) => (
                    <a href={href} target="_blank" rel="noopener noreferrer"
                       className="text-blue-600 underline hover:opacity-70 transition-all">
                      {children}
                    </a>
                  ),
                }}
              >
                {company.whatTheyDo}
              </ReactMarkdown>
            </section>
          
          {/* Sources card - only display if sources is not blank */}
          {company.sources?.length > 0 && (
              <div className="profile-card">
                  <h3>In the news</h3>
                  <ul className="sources-list">
                    {company.sources.map((src, i) => (
                      <li key={i}>
                        <a href={src.url} target="_blank" rel="noopener noreferrer">
                          › {src.label}
                        </a>
                      </li>
                    ))}
                  </ul>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN (sidebar) */}
          <div className="profile-sidebar">

            {/* Overview card */}
            <div className="profile-card overview-card">
              <h3>Company Details</h3>
              <table>
                <tbody>
                  {[
                    { label: "Headquarters",   value: company.hq },
                    { label: "Established",    value: company.established },
                    { label: "Company type",   value: <Badge label={company.companyType} /> },
                    { label: "Workforce model",value: <BadgeList labels={company.workforceModel} /> },
                  ].map(({ label, value }) => (
                    <tr key={label}>
                      <td>{label}:</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Key Business Relationships */}
            <div className="profile-card">
              <h3>Key Business Relationships</h3>
              <table className="profile-table w-full table-fixed">
                <thead>
                  <tr>
                    <th className="w-[55%]">Company</th>
                    <th className="w-[45%]">Relationship</th>
                  </tr>
                </thead>
                <tbody>
                  {company.relationships.map((rel, i) => (
                    <tr key={i}>
                      {/* break-words and whitespace-normal to prevent long company names from breaking the layout */}
                      <td className="break-words whitespace-normal">{rel.company}</td>
                      <td><Badge label={rel.type} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
          </div>
        </div>

        {/* Back link */}
        <div className="profile-back">
          <button onClick={() => navigate("/profiles")}>← All Profiles</button>
        </div>

      </div>
      </div>
    </main>
  );
}