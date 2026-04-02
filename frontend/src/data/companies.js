// src/data/companies.js
// Starter data for company profiles
// TODO: Connect to db via backend API or imported json file
export const COMPANIES = [
    {
      slug: "prolific",
      name: "Prolific",
      hq: "London, United Kingdom",
      established: 2018,
      companyType: "Workforce",
      workforceModel: "Marketplace Model",
      whatTheyDo: `Prolific is a research platform that connects researchers with a large pool of vetted participants for online studies. Unlike traditional crowdsourcing platforms, Prolific focuses on high-quality, representative samples for academic and commercial research, offering tools to filter participants by demographic criteria and ensuring fair pay standards.
  
                  Prolific differentiates itself through its commitment to ethical research practices, including minimum pay requirements and transparent data practices. The platform has become a go-to for behavioral scientists and AI researchers needing reliable human feedback at scale.`,
      relationships: [
        { company: "Google", type: "Customer", notes: "Research partnerships for AI training datasets" },
        { company: "Stanford University", type: "Customer", notes: "Academic research studies" },
        { company: "Y Combinator", type: "Investor", notes: "Seed funding round" },
      ],
      sources: [
        { label: "Scale AI's rivals say they're going hard to win its contractors and clients. Our servers are melting.", url: "#" },
        { label: "4 side hustles you can do from your couch—some pay up to $270 for 30 minutes of work and don't require a degree", url: "#" },
        { label: "I have a side hustle training AI and reviewing online ad", url: "#" },
      ],
    },
    {
      slug: "mercor",
      name: "Mercor",
      hq: "San Francisco, CA, USA",
      established: 2022,
      companyType: "Workforce",
      workforceModel: "Marketplace Model",
      whatTheyDo: `Mercor is a company that supplies workers to train AI models built by companies such as OpenAI and Anthropic. Mercor positions itself as providing higher value training and evaluation data by hiring qualified professionals across a wide range of occupations to question AI models, critique their responses, and create detailed examples of accurate responses, together with the reasoning that went into crafting them. Mercor operates on a marketplace model, where distributed workers perform tasks that are posted to a digital platform. Workers are hired as independent contractors and are paid by the hour. Workers have no knowledge of which clients they are working for or which models they are training. There is no guarantee of on-going work and no fixed working hours; projects can become available at any time. Workers have reported projects becoming scarce, reduction in time allocated to complete tasks, and reduction in pay compared to similar previous projects. After signing on, workers are expected to install monitoring software on their computers which tracks time spent on projects and determines pay.`,
      relationships: [
        { company: "Anthropic", type: "Customer", notes: "" },
        { company: "Meta", type: "Customer", notes: "" },
        { company: "OpenAI", type: "Customer", notes: "" },
        { company: "Felicis", type: "Investor", notes: "" },
        { company: "General Catalyst", type: "Investor", notes: "" },
        { company: "Link Ventures", type: "Investor", notes: "" },
        { company: "Menlo Ventures", type: "Investor", notes: "" },
        { company: "SignalRank", type: "Investor", notes: "" },
      ],
      sources: [
        { label: "Mercor company website", url: "https://www.mercor.com/" },
        { label: "White collar workers training AI", url: "https://www.theverge.com/cs/features/877388/white-collar-workers-training-ai-mercor" },
        { label: "The recruitment company training AI to do your job", url: "https://www.ft.com/content/0cab0fcd-e355-40e8-83a3-2ad5066d7b48" },
      ],
    },
  ];