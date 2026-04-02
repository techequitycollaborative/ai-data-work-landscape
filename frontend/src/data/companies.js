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
      whatTheyDo: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      relationships: [
        { company: "Maze", type: "Customer", notes: "We could put a note here" },
        { company: "Kickstarter", type: "Customer", notes: "We could put a note here" },
        { company: "Remesh", type: "Customer", notes: "We could put a note here" },
      ],
      sources: [
        { label: "Scale AI's rivals say they're going hard to win its contractors and clients. Our servers are melting.", url: "https://www.businessinsider.com/scale-ai-meta-big-tech-rivals-poach-contractors-clients-2025-6" },
        { label: "4 side hustles you can do from your couch—some pay up to $270 for 30 minutes of work and don't require a degree", url: "https://www.cnbc.com/2024/12/20/side-hustles-you-can-do-from-couch-some-dont-require-degree.html" },
        { label: "I have a side hustle training AI and reviewing online ads...", url: "https://www.businessinsider.com/data-worker-side-gig-freelance-training-reviewing-ads-2025" },
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