// src/pages/ProfileDetail.jsx
// Individual company profile page with prev/next navigation

import { useParams, useNavigate, NavLink } from "react-router-dom";
import { COMPANIES } from "../data/companies";
import Badge from "../components/Badge";
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
            {/* What they do */}
            <section className="profile-section">
              <h2>What They Do</h2>
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

            {/* Key Business Relationships */}
            <section className="profile-section">
              <h2>Key Business Relationships</h2>
              <table className="profile-table">
                <thead>
                  <tr>
                    {["Company", "Relationship", "Notes"].map(h => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {company.relationships.map((rel, i) => (
                    <tr key={i}>
                      <td>{rel.company}</td>
                      <td><Badge label={rel.type} /></td>
                      <td>{rel.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>

          {/* RIGHT COLUMN (sidebar) */}
          <div className="profile-sidebar">

            {/* Overview card */}
            <div className="profile-card">
              <h3>Overview</h3>
              <table>
                <tbody>
                  {[
                    { label: "Headquarters",   value: company.hq },
                    { label: "Established",    value: company.established },
                    { label: "Company type",   value: <Badge label={company.companyType} /> },
                    { label: "Workforce model",value: <Badge label={company.workforceModel} /> },
                  ].map(({ label, value }) => (
                    <tr key={label}>
                      <td>{label}:</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Sources card */}
            <div className="profile-card">
              <h3>Sources</h3>
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
          </div>
        </div>

        {/* Back link */}
        <div className="profile-back">
          <button onClick={() => navigate("/profiles")}>← All Profiles</button>
        </div>

      </div>
    </main>
  );
}