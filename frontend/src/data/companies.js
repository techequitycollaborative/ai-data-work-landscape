// src/data/companies.js
// Starter data for company profiles
// TODO: Connect to db via backend API or imported json file
export const COMPANIES = [
  {
    slug: "appen",
    name: "Appen",
    hq: "Chatswood, NSW, Australia",
    established: 1996,
    companyType: "Tools + Workforce",
    workforceModel: ["Marketplace Model","BPO Model"],
    whatTheyDo: `Appen is an Australia-based company providing AI training data services such as  data collection, data annotation, and data labeling through its platform CrowdGen as well as through call centers. It’s unclear whether or not Appen outsources labor to subcontractors. Appen is [a minority investor in other data companies](https://www.appen.com/press-release/appen-invests-in-synthetic-data) such as Mindtech which is “a synthetic data company that creates training datasets for computer vision models.” 

According to the [CrowdGen website](https://jobs.lever.co/appen), workers are hired as contractors and paid per hour with pay depending on the project. The Guardian [reported](https://www.theguardian.com/australia-news/2024/oct/25/contractors-training-amazon-meta-and-microsofts-ai-systems-left-without-pay-after-appen-moves-to-new-platform) in 2023 that when Appen was migrating to its new worker platform CrowdGen, as many as a third of all data workers (many of whom worked for companies such as Amazon, Meta and Microsoft) remained unpaid with workers instructed to continue working on projects with no clarity on when payments would be made. Appen workers have also raised concerns over [unrealistic timelines and the consequent impact on product quality.](https://www.cnbc.com/2023/09/06/appen-which-helps-amazon-and-google-train-ai-is-reeling.html) One Appen data worker, working on Google Bard (Gemini’s predecessor) submitted [a letter to the U.S. Congress](https://x.com/AlphabetWorkers/status/1658489222695915522/photo/1), writing that the pace imposed on data workers like himself could result in a [lower quality product.](https://www.alphabetworkersunion.org/press/statement-from-ed-stackhouse-google-rater-ai-worker-and-member-of-the-alphabet-workers-union-cwa-on-senates-ai-insights-forum) Workers reported being overworked and having to assess answers from AI models that were [far beyond their expertise](https://www.bloomberg.com/news/articles/2023-07-12/google-s-ai-chatbot-is-trained-by-humans-who-say-they-re-overworked-underpaid-and-frustrated?srnd=technology-vp&sref=YfHlo0rL), in fields such as medicine and state laws, causing anxiety regarding the reliability of such models.`,
    relationships: [
      { company: "Adobe", type: "Customer", notes: "" },
      { company: "Amazon", type: "Customer", notes: "" },
      { company: "Clear Global", type: "Customer", notes: "" },
      { company: "Meta", type: "Customer", notes: "" },
      { company: "Microsoft", type: "Customer", notes: "" },
      { company: "Salesforce", type: "Customer", notes: "" },
      { company: "Nvidia", type: "Customer", notes: "" },
      { company: "US Department of Defense", type: "Customer", notes: "" },
      { company: "Knockri", type: "Partner", notes: "" },
    ],
    sources: [
      { label: "Inside the turmoil at Appen, the former AI darling that’s reeling from executive exits, big losses", url: "https://www.cnbc.com/2023/09/06/appen-which-helps-amazon-and-google-train-ai-is-reeling.html" },
      { label: "Google’s AI Chatbot Is Trained by Humans Who Say They’re Overworked, Underpaid and Frustrated", url: "https://www.bloomberg.com/news/articles/2023-07-12/google-s-ai-chatbot-is-trained-by-humans-who-say-they-re-overworked-underpaid-and-frustrated?srnd=technology-vp&sref=YfHlo0rL" },
      { label: "Statement from Ed Stackhouse, Google rater, AI worker and member of the Alphabet Workers Union-CWA on Senate's AI Insights Forum", url: "https://www.alphabetworkersunion.org/press/statement-from-ed-stackhouse-google-rater-ai-worker-and-member-of-the-alphabet-workers-union-cwa-on-senates-ai-insights-forum" },
    ],
  },
  {
    slug: "globallogic",
    name: "GlobalLogic",
    hq: "San Jose, CA, USA",
    established: 2000,
    companyType: "TBD",
    workforceModel: "TBD",
    whatTheyDo: `GlobalLogic is a US-based subsidiary of the Japanese conglomerate Hitachi. The company [advertises a wide range of services](https://www.globallogic.com/services/) such as product strategy and experience design, digital business transformation, intelligence engineering, software product engineering, technology modernization, embedded engineering and IT/OT Transformation (IoT embedded software/hardware). GlobalLogic also [promotes its global footprint](https://www.globallogic.com/about/locations/) with offices in Asia, Europe, North America, South America and the Middle East. One of GlobalLogic’s main clients is Google, with GlobalLogic workers rating and training Google’s AI models like Gemini and AI Overviews.

[Workers report](https://www.theguardian.com/technology/2025/sep/11/google-gemini-ai-training-humans?utm_source=chatgpt.com) wages that are not commensurate with qualifications, heavy workloads and unreasonable time pressures forcing them to cut corners and making them fearful of the reliability of the AI models they are helping to build. GlobalLogic began to conduct rolling layoffs in 2025 which [workers allege were in retaliation for speaking up about low pay and lack of job security.](https://www.yahoo.com/news/articles/over-200-google-ai-subcontractors-173144334.html) Workers began to organize when GlobalLogic hourly pay rates dropped even as hiring ramped up, with [wide disparities in pay, benefits, and job security](https://www.alphabetworkersunion.org/campaigns/globallogic-pay-parity) reported [between workers.](https://www.thenation.com/article/society/google-ai-workers-union/) The company responded by allegedly clamping down on communications and instituting a [“policy prohibiting discussion of wages in its online internal forums”](https://fortune.com/2025/02/18/alphabet-ai-workers-illegally-silenced-pay-complaint-alleges/) and reportedly fired an employee who was discussing pay issues on internal forums. The Alphabet Workers Union (AWU) [filed a complaint](https://fortune.com/2025/02/18/alphabet-ai-workers-illegally-silenced-pay-complaint-alleges/) against these actions with the NLRB in 2025.`,
    relationships: [
      { company: "Adobe", type: "Partner", notes: "" },
      { company: "Amazon Web Services", type: "Partner", notes: "" },
      { company: "Boomi", type: "Partner", notes: "" },
      { company: "Elektrobit", type: "Partner", notes: "" },
      { company: "Google", type: "Customer", notes: "" },
      { company: "Google Cloud", type: "Partner", notes: "" },
      { company: "Microsoft", type: "Partner", notes: "" },
      { company: "Nvidia", type: "Partner", notes: "" },
      { company: "Salesforce", type: "Partner", notes: "" },
      { company: "ServiceNow", type: "Partner", notes: "" },
    ],
    sources: [
      { label: "How thousands of ‘overworked, underpaid’ humans train Google’s AI to seem smart", url: "https://www.theguardian.com/technology/2025/sep/11/google-gemini-ai-training-humans?utm_source=chatgpt.com" },
      { label: "Over 200 Google AI subcontractors laid off after complaining about low pay, poor working conditions: repor", url: "https://www.yahoo.com/news/articles/over-200-google-ai-subcontractors-173144334.html" },
      { label: "The Human Workforce Behind AI Wants a Union", url: "https://www.thenation.com/article/society/google-ai-workers-union/" },
      { label: "Alphabet AI workers were illegally silenced about pay, complaint alleges", url: "https://fortune.com/2025/02/18/alphabet-ai-workers-illegally-silenced-pay-complaint-alleges/" },
    ],
  },
  {
    slug: "handshakeai",
    name: "Handshake AI",
    hq: "San Francisco, CA, USA",
    established: 2022,
    companyType: "Workforce",
    workforceModel: "Marketplace Model",
    whatTheyDo: `Mercor is a company that [supplies workers to train AI models](https://www.theinformation.com/articles/two-openai-business-partners-each-discuss-2-billion-valuation) built by companies such as OpenAI and Anthropic. Mercor positions itself as providing higher value training and evaluation data by hiring qualified [professionals across a wide range of occupations](https://www.businessinsider.com/how-much-ai-training-companies-paying-investment-bankers-wall-street-2025-11). The company markets itself as [“the definitive network for human knowledge and capabilities”](https://www.mercor.com/blog/building-the-network-of-human-knowledge/). Workers are required to question AI models, critique their responses, and create detailed examples of accurate responses, together with the reasoning that went into crafting them. 

Distributed workers perform tasks that are posted to a digital platform. According to Mercor job postings, workers are hired as independent contractors and are paid by the hour. Workers are hired from across the world, with [India being the largest source,](https://futurism.com/startup-investors-gig-jobs-ai) followed by the U.S. Mercor [used automated AI interviews](https://web.archive.org/web/20260419080820/https://www.forbes.com/sites/alexkonrad/2024/09/18/mercor-ai-interviewer-reaches-250-million-valuation/) to hire workers despite [research that shows that biases may be embedded in such systems](https://www.washington.edu/news/2024/10/31/ai-bias-resume-screening-race-gender/).

Workers report that there is no guarantee of on-going work and no fixed working hours; [projects can become available at any time,](https://web.archive.org/web/20260312083703/https://nymag.com/intelligencer/article/white-collar-workers-training-ai.html) which some workers say places them under immense stress as they try to get scarce jobs. After signing on, workers reported having to [install monitoring software on their computers,](https://web.archive.org/web/20260312083703/https://nymag.com/intelligencer/article/white-collar-workers-training-ai.html) including software called [Insightful](https://www.wsj.com/tech/ai/mercor-ai-startup-personal-data-lawsuit-0b5c349b), which [tracks time spent](https://www.bloomberg.com/news/features/2026-04-16/ai-company-hiring-on-linkedin-wants-to-train-your-replacement-at-work) on projects and [determines pay](https://web.archive.org/web/20260312083703/https://nymag.com/intelligencer/article/white-collar-workers-training-ai.html). If workers are unable to complete complex tasks within assigned timeframes, they are likely to be [“offboarded.”](https://web.archive.org/web/20260312083703/https://nymag.com/intelligencer/article/white-collar-workers-training-ai.html) Workers have also [reported](https://www.forbes.com/sites/iainmartin/2025/11/12/the-worlds-youngest-self-made-billionaires-just-slashed-these-workers-wages-by-a-third/) projects becoming scarce, sudden and large-scale layoffs, reduction in time allocated to complete tasks, and [reduction in pay compared to similar previous projects](https://www.businessinsider.com/mercor-cuts-contractors-meta-project-less-money-musen-nova-ai-2025-11). 

In March 2026, [Mercor experienced a data breach,](https://techcrunch.com/2026/03/31/mercor-says-it-was-hit-by-cyberattack-tied-to-compromise-of-open-source-litellm-project/) leading to the exposure of “the [personal data](https://www.strikegraph.com/blog/the-mercor-breach-exposed-silicon-valleys-fragile-ai-supply-chain) of 40,000+ contractors, proprietary source code, video interviews, and potentially the AI training methodologies of multiple frontier labs”.  Meta [reportedly instituted a pause on all projects with Mercor](https://www.wired.com/story/meta-pauses-work-with-mercor-after-data-breach-puts-ai-industry-secrets-at-risk/) in April 2026 and [at least five lawsuits](https://www.businessinsider.com/mercor-lawsuits-data-breach-2026-4) have been filed against the company by contractors claiming damages for the disclosure of their data.`,
    relationships: [
      { company: "Anthropic", type: "Customer", notes: "" },
      { company: "Applied Compute", type: "Customer", notes: "" },
      { company: "Benchmark", type: "Investor", notes: "" },
      { company: "Felicis", type: "Investor", notes: "" },
      { company: "General Catalyst", type: "Investor", notes: "" },
      { company: "Jack Dorsey", type: "Investor", notes: "" },
      { company: "Larry Summers", type: "Investor", notes: "" },
      { company: "Link Ventures", type: "Investor", notes: "" },
      { company: "Menlo Ventures", type: "Investor", notes: "" },
      { company: "Meta", type: "Customer", notes: "" },
      { company: "OpenAI", type: "Customer", notes: "" },
      { company: "Peter Thiel", type: "Investor", notes: "" },
      { company: "Robinhood Ventures", type: "Investor", notes: "" },
      { company: "SignalRank", type: "Investor", notes: "" },
    ],
    sources: [
      { label: "The World’s Youngest Self Made Billionaires Just Slashed These Workers’ Wages", url: "https://www.forbes.com/sites/iainmartin/2025/11/12/the-worlds-youngest-self-made-billionaires-just-slashed-these-workers-wages-by-a-third/" },
      { label: "The Laid-off Scientists and Lawyers Training AI to Steal Their Careers", url: "https://web.archive.org/web/20260312083703/https://nymag.com/intelligencer/article/white-collar-workers-training-ai.html" },
      { label: "An AI startup powering Meta and OpenAI cut thousands of workers — then offered them a similar project for less money", url: "https://www.businessinsider.com/mercor-cuts-contractors-meta-project-less-money-musen-nova-ai-2025-11" },
      { label: "Meta Pauses Work With Mercor After Data Breach Puts AI Industry Secrets at Risk", url: "https://www.wired.com/story/meta-pauses-work-with-mercor-after-data-breach-puts-ai-industry-secrets-at-risk/" },
    ],
  },
  {
    slug: "labelbox",
    name: "LabelBox",
    hq: "San Francisco, CA, USA",
    established: 2022,
    companyType: "Workforce",
    workforceModel: "Marketplace Model",
    whatTheyDo: `Mercor is a company that [supplies workers to train AI models](https://www.theinformation.com/articles/two-openai-business-partners-each-discuss-2-billion-valuation) built by companies such as OpenAI and Anthropic. Mercor positions itself as providing higher value training and evaluation data by hiring qualified [professionals across a wide range of occupations](https://www.businessinsider.com/how-much-ai-training-companies-paying-investment-bankers-wall-street-2025-11). The company markets itself as [“the definitive network for human knowledge and capabilities”](https://www.mercor.com/blog/building-the-network-of-human-knowledge/). Workers are required to question AI models, critique their responses, and create detailed examples of accurate responses, together with the reasoning that went into crafting them. 

Distributed workers perform tasks that are posted to a digital platform. According to Mercor job postings, workers are hired as independent contractors and are paid by the hour. Workers are hired from across the world, with [India being the largest source,](https://futurism.com/startup-investors-gig-jobs-ai) followed by the U.S. Mercor [used automated AI interviews](https://web.archive.org/web/20260419080820/https://www.forbes.com/sites/alexkonrad/2024/09/18/mercor-ai-interviewer-reaches-250-million-valuation/) to hire workers despite [research that shows that biases may be embedded in such systems](https://www.washington.edu/news/2024/10/31/ai-bias-resume-screening-race-gender/).

Workers report that there is no guarantee of on-going work and no fixed working hours; [projects can become available at any time,](https://web.archive.org/web/20260312083703/https://nymag.com/intelligencer/article/white-collar-workers-training-ai.html) which some workers say places them under immense stress as they try to get scarce jobs. After signing on, workers reported having to [install monitoring software on their computers,](https://web.archive.org/web/20260312083703/https://nymag.com/intelligencer/article/white-collar-workers-training-ai.html) including software called [Insightful](https://www.wsj.com/tech/ai/mercor-ai-startup-personal-data-lawsuit-0b5c349b), which [tracks time spent](https://www.bloomberg.com/news/features/2026-04-16/ai-company-hiring-on-linkedin-wants-to-train-your-replacement-at-work) on projects and [determines pay](https://web.archive.org/web/20260312083703/https://nymag.com/intelligencer/article/white-collar-workers-training-ai.html). If workers are unable to complete complex tasks within assigned timeframes, they are likely to be [“offboarded.”](https://web.archive.org/web/20260312083703/https://nymag.com/intelligencer/article/white-collar-workers-training-ai.html) Workers have also [reported](https://www.forbes.com/sites/iainmartin/2025/11/12/the-worlds-youngest-self-made-billionaires-just-slashed-these-workers-wages-by-a-third/) projects becoming scarce, sudden and large-scale layoffs, reduction in time allocated to complete tasks, and [reduction in pay compared to similar previous projects](https://www.businessinsider.com/mercor-cuts-contractors-meta-project-less-money-musen-nova-ai-2025-11). 

In March 2026, [Mercor experienced a data breach,](https://techcrunch.com/2026/03/31/mercor-says-it-was-hit-by-cyberattack-tied-to-compromise-of-open-source-litellm-project/) leading to the exposure of “the [personal data](https://www.strikegraph.com/blog/the-mercor-breach-exposed-silicon-valleys-fragile-ai-supply-chain) of 40,000+ contractors, proprietary source code, video interviews, and potentially the AI training methodologies of multiple frontier labs”.  Meta [reportedly instituted a pause on all projects with Mercor](https://www.wired.com/story/meta-pauses-work-with-mercor-after-data-breach-puts-ai-industry-secrets-at-risk/) in April 2026 and [at least five lawsuits](https://www.businessinsider.com/mercor-lawsuits-data-breach-2026-4) have been filed against the company by contractors claiming damages for the disclosure of their data.`,
    relationships: [
      { company: "Anthropic", type: "Customer", notes: "" },
      { company: "Applied Compute", type: "Customer", notes: "" },
      { company: "Benchmark", type: "Investor", notes: "" },
      { company: "Felicis", type: "Investor", notes: "" },
      { company: "General Catalyst", type: "Investor", notes: "" },
      { company: "Jack Dorsey", type: "Investor", notes: "" },
      { company: "Larry Summers", type: "Investor", notes: "" },
      { company: "Link Ventures", type: "Investor", notes: "" },
      { company: "Menlo Ventures", type: "Investor", notes: "" },
      { company: "Meta", type: "Customer", notes: "" },
      { company: "OpenAI", type: "Customer", notes: "" },
      { company: "Peter Thiel", type: "Investor", notes: "" },
      { company: "Robinhood Ventures", type: "Investor", notes: "" },
      { company: "SignalRank", type: "Investor", notes: "" },
    ],
    sources: [
      { label: "The World’s Youngest Self Made Billionaires Just Slashed These Workers’ Wages", url: "https://www.forbes.com/sites/iainmartin/2025/11/12/the-worlds-youngest-self-made-billionaires-just-slashed-these-workers-wages-by-a-third/" },
      { label: "The Laid-off Scientists and Lawyers Training AI to Steal Their Careers", url: "https://web.archive.org/web/20260312083703/https://nymag.com/intelligencer/article/white-collar-workers-training-ai.html" },
      { label: "An AI startup powering Meta and OpenAI cut thousands of workers — then offered them a similar project for less money", url: "https://www.businessinsider.com/mercor-cuts-contractors-meta-project-less-money-musen-nova-ai-2025-11" },
      { label: "Meta Pauses Work With Mercor After Data Breach Puts AI Industry Secrets at Risk", url: "https://www.wired.com/story/meta-pauses-work-with-mercor-after-data-breach-puts-ai-industry-secrets-at-risk/" },
    ],
  },
    {
      slug: "mercor",
      name: "Mercor",
      hq: "San Francisco, CA, USA",
      established: 2022,
      companyType: "Workforce",
      workforceModel: "Marketplace Model",
      whatTheyDo: `Mercor is a company that [supplies workers to train AI models](https://www.theinformation.com/articles/two-openai-business-partners-each-discuss-2-billion-valuation) built by companies such as OpenAI and Anthropic. Mercor positions itself as providing higher value training and evaluation data by hiring qualified [professionals across a wide range of occupations](https://www.businessinsider.com/how-much-ai-training-companies-paying-investment-bankers-wall-street-2025-11). The company markets itself as [“the definitive network for human knowledge and capabilities”](https://www.mercor.com/blog/building-the-network-of-human-knowledge/). Workers are required to question AI models, critique their responses, and create detailed examples of accurate responses, together with the reasoning that went into crafting them. 

Distributed workers perform tasks that are posted to a digital platform. According to Mercor job postings, workers are hired as independent contractors and are paid by the hour. Workers are hired from across the world, with [India being the largest source,](https://futurism.com/startup-investors-gig-jobs-ai) followed by the U.S. Mercor [used automated AI interviews](https://web.archive.org/web/20260419080820/https://www.forbes.com/sites/alexkonrad/2024/09/18/mercor-ai-interviewer-reaches-250-million-valuation/) to hire workers despite [research that shows that biases may be embedded in such systems](https://www.washington.edu/news/2024/10/31/ai-bias-resume-screening-race-gender/).

Workers report that there is no guarantee of on-going work and no fixed working hours; [projects can become available at any time,](https://web.archive.org/web/20260312083703/https://nymag.com/intelligencer/article/white-collar-workers-training-ai.html) which some workers say places them under immense stress as they try to get scarce jobs. After signing on, workers reported having to [install monitoring software on their computers,](https://web.archive.org/web/20260312083703/https://nymag.com/intelligencer/article/white-collar-workers-training-ai.html) including software called [Insightful](https://www.wsj.com/tech/ai/mercor-ai-startup-personal-data-lawsuit-0b5c349b), which [tracks time spent](https://www.bloomberg.com/news/features/2026-04-16/ai-company-hiring-on-linkedin-wants-to-train-your-replacement-at-work) on projects and [determines pay](https://web.archive.org/web/20260312083703/https://nymag.com/intelligencer/article/white-collar-workers-training-ai.html). If workers are unable to complete complex tasks within assigned timeframes, they are likely to be [“offboarded.”](https://web.archive.org/web/20260312083703/https://nymag.com/intelligencer/article/white-collar-workers-training-ai.html) Workers have also [reported](https://www.forbes.com/sites/iainmartin/2025/11/12/the-worlds-youngest-self-made-billionaires-just-slashed-these-workers-wages-by-a-third/) projects becoming scarce, sudden and large-scale layoffs, reduction in time allocated to complete tasks, and [reduction in pay compared to similar previous projects](https://www.businessinsider.com/mercor-cuts-contractors-meta-project-less-money-musen-nova-ai-2025-11). 

In March 2026, [Mercor experienced a data breach,](https://techcrunch.com/2026/03/31/mercor-says-it-was-hit-by-cyberattack-tied-to-compromise-of-open-source-litellm-project/) leading to the exposure of “the [personal data](https://www.strikegraph.com/blog/the-mercor-breach-exposed-silicon-valleys-fragile-ai-supply-chain) of 40,000+ contractors, proprietary source code, video interviews, and potentially the AI training methodologies of multiple frontier labs”.  Meta [reportedly instituted a pause on all projects with Mercor](https://www.wired.com/story/meta-pauses-work-with-mercor-after-data-breach-puts-ai-industry-secrets-at-risk/) in April 2026 and [at least five lawsuits](https://www.businessinsider.com/mercor-lawsuits-data-breach-2026-4) have been filed against the company by contractors claiming damages for the disclosure of their data.`,
      relationships: [
        { company: "Anthropic", type: "Customer", notes: "" },
        { company: "Applied Compute", type: "Customer", notes: "" },
        { company: "Benchmark", type: "Investor", notes: "" },
        { company: "Felicis", type: "Investor", notes: "" },
        { company: "General Catalyst", type: "Investor", notes: "" },
        { company: "Jack Dorsey", type: "Investor", notes: "" },
        { company: "Larry Summers", type: "Investor", notes: "" },
        { company: "Link Ventures", type: "Investor", notes: "" },
        { company: "Menlo Ventures", type: "Investor", notes: "" },
        { company: "Meta", type: "Customer", notes: "" },
        { company: "OpenAI", type: "Customer", notes: "" },
        { company: "Peter Thiel", type: "Investor", notes: "" },
        { company: "Robinhood Ventures", type: "Investor", notes: "" },
        { company: "SignalRank", type: "Investor", notes: "" },
      ],
      sources: [
        { label: "The World’s Youngest Self Made Billionaires Just Slashed These Workers’ Wages", url: "https://www.forbes.com/sites/iainmartin/2025/11/12/the-worlds-youngest-self-made-billionaires-just-slashed-these-workers-wages-by-a-third/" },
        { label: "The Laid-off Scientists and Lawyers Training AI to Steal Their Careers", url: "https://web.archive.org/web/20260312083703/https://nymag.com/intelligencer/article/white-collar-workers-training-ai.html" },
        { label: "An AI startup powering Meta and OpenAI cut thousands of workers — then offered them a similar project for less money", url: "https://www.businessinsider.com/mercor-cuts-contractors-meta-project-less-money-musen-nova-ai-2025-11" },
        { label: "Meta Pauses Work With Mercor After Data Breach Puts AI Industry Secrets at Risk", url: "https://www.wired.com/story/meta-pauses-work-with-mercor-after-data-breach-puts-ai-industry-secrets-at-risk/" },
      ],
    },

    {
      slug: "prolific",
      name: "Prolific",
      hq: "Oxford, United Kingdom",
      established: 2018,
      companyType: "Workforce",
      workforceModel: "Marketplace Model",
      whatTheyDo: ` Prolific is a UK-based company that claims to connect AI developers, researchers, and companies with [“rich data from reliable and engaged participants”](https://www.prolific.com/about). The data is generated by workers who access tasks through the Prolific platform. After Meta invested heavily in Scale AI in 2025, companies such as Prolific which compete with Scale AI, reportedly [saw an increase in their clientele](https://www.businessinsider.com/scale-ai-meta-big-tech-rivals-poach-contractors-clients-2025-6) as companies allegedly sought data work providers in which Meta did not have a significant ownership stake.

'Participants,' as Prolific calls these workers, are independent contractors, but the company advertises that it [does not depend on further outsourced workers](https://www.prolific.com/participant-pool?utm_source=chatgpt.com) or subcontractors: “We don’t outsource our most important asset: people. Our crowd is fully ours, and we never share or rely on other panels.” It claims to have over 200,000 active participants.

Tasks are advertised as paid online studies which offer quick pay and flexible schedules. [According to Prolific](https://www.prolific.com/participants), the tasks can include answering questionnaires related to human emotions or relationships, evaluating machine learning models and human-AI interactions, and providing feedback on various AI products and services. Workers are paid per hour and remuneration varies based on the task. Prolific [claims](https://researcher-help.prolific.com/en/articles/445230-prolific-s-payment-principles) to “recommend participants are paid at least £9.00 / $12.00 per hour, while the minimum pay allowed is £6.00 / $8.00 per hour.” Reports indicate that while Prolific pay rates might be higher than other similar companies, workers might have to [join a waitlist](https://www.cnbc.com/2024/12/20/side-hustles-you-can-do-from-couch-some-dont-require-degree.html), and the [higher paid jobs can be harder to come by](https://www.businessinsider.com/data-worker-side-gig-freelance-training-reviewing-ads-2025). Prolific [also provides](https://www.prolific.com/model-evaluation) its “human evaluation infrastructure” for AI model evaluation services.`,
      relationships: [
        { company: "Argilla", type: "Partner", notes: "" },
        { company: "Ai2", type: "Customer", notes: "" },
        { company: "Motives", type: "Partner", notes: "" },
        { company: "Outset", type: "Partner", notes: "" },
        { company: "Dashmap", type: "Customer", notes: "" },
        { company: "Unidata", type: "Partner", notes: "" },
        { company: "European Commission", type: "Customer", notes: "" },
        { company: "Google", type: "Customer", notes: "" },
        { company: "Imbue", type: "Customer", notes: "" },
        { company: "Modality.ai ", type: "Customer", notes: "" },
        { company: "Kickstarter", type: "Customer", notes: "" },
        { company: "Maze", type: "Partner", notes: "" },
        { company: "Nugget AI", type: "Customer", notes: "" },
        { company: "Papercup", type: "Customer", notes: "" },
        { company: "Remesh", type: "Partner", notes: "" },
        { company: "Stanford University", type: "Customer", notes: "" },
        { company: "The University of Oxford", type: "Customer", notes: "" },
        { company: "King’s College London", type: "Customer", notes: "" },
        { company: "Yale University", type: "Customer", notes: "" },
        { company: "AltaIR Capital", type: "Investor", notes: "" },
        { company: "Oxford Science Enterprises", type: "Investor", notes: "" },
        { company: "Partech", type: "Investor", notes: "" },
        { company: "Pioneer Fund", type: "Investor", notes: "" },
        { company: "Y Combinator", type: "Investor", notes: "" },
      ],
      sources: [],
    },
    {
      slug: "sama",
      name: "Sama",
      hq: "San Francisco, CA, USA",
      established: 2022,
      companyType: "Workforce",
      workforceModel: "Marketplace Model",
      whatTheyDo: `Mercor is a company that [supplies workers to train AI models](https://www.theinformation.com/articles/two-openai-business-partners-each-discuss-2-billion-valuation) built by companies such as OpenAI and Anthropic. Mercor positions itself as providing higher value training and evaluation data by hiring qualified [professionals across a wide range of occupations](https://www.businessinsider.com/how-much-ai-training-companies-paying-investment-bankers-wall-street-2025-11). The company markets itself as [“the definitive network for human knowledge and capabilities”](https://www.mercor.com/blog/building-the-network-of-human-knowledge/). Workers are required to question AI models, critique their responses, and create detailed examples of accurate responses, together with the reasoning that went into crafting them. 

Distributed workers perform tasks that are posted to a digital platform. According to Mercor job postings, workers are hired as independent contractors and are paid by the hour. Workers are hired from across the world, with [India being the largest source,](https://futurism.com/startup-investors-gig-jobs-ai) followed by the U.S. Mercor [used automated AI interviews](https://web.archive.org/web/20260419080820/https://www.forbes.com/sites/alexkonrad/2024/09/18/mercor-ai-interviewer-reaches-250-million-valuation/) to hire workers despite [research that shows that biases may be embedded in such systems](https://www.washington.edu/news/2024/10/31/ai-bias-resume-screening-race-gender/).

Workers report that there is no guarantee of on-going work and no fixed working hours; [projects can become available at any time,](https://web.archive.org/web/20260312083703/https://nymag.com/intelligencer/article/white-collar-workers-training-ai.html) which some workers say places them under immense stress as they try to get scarce jobs. After signing on, workers reported having to [install monitoring software on their computers,](https://web.archive.org/web/20260312083703/https://nymag.com/intelligencer/article/white-collar-workers-training-ai.html) including software called [Insightful](https://www.wsj.com/tech/ai/mercor-ai-startup-personal-data-lawsuit-0b5c349b), which [tracks time spent](https://www.bloomberg.com/news/features/2026-04-16/ai-company-hiring-on-linkedin-wants-to-train-your-replacement-at-work) on projects and [determines pay](https://web.archive.org/web/20260312083703/https://nymag.com/intelligencer/article/white-collar-workers-training-ai.html). If workers are unable to complete complex tasks within assigned timeframes, they are likely to be [“offboarded.”](https://web.archive.org/web/20260312083703/https://nymag.com/intelligencer/article/white-collar-workers-training-ai.html) Workers have also [reported](https://www.forbes.com/sites/iainmartin/2025/11/12/the-worlds-youngest-self-made-billionaires-just-slashed-these-workers-wages-by-a-third/) projects becoming scarce, sudden and large-scale layoffs, reduction in time allocated to complete tasks, and [reduction in pay compared to similar previous projects](https://www.businessinsider.com/mercor-cuts-contractors-meta-project-less-money-musen-nova-ai-2025-11). 

In March 2026, [Mercor experienced a data breach,](https://techcrunch.com/2026/03/31/mercor-says-it-was-hit-by-cyberattack-tied-to-compromise-of-open-source-litellm-project/) leading to the exposure of “the [personal data](https://www.strikegraph.com/blog/the-mercor-breach-exposed-silicon-valleys-fragile-ai-supply-chain) of 40,000+ contractors, proprietary source code, video interviews, and potentially the AI training methodologies of multiple frontier labs”.  Meta [reportedly instituted a pause on all projects with Mercor](https://www.wired.com/story/meta-pauses-work-with-mercor-after-data-breach-puts-ai-industry-secrets-at-risk/) in April 2026 and [at least five lawsuits](https://www.businessinsider.com/mercor-lawsuits-data-breach-2026-4) have been filed against the company by contractors claiming damages for the disclosure of their data.`,
      relationships: [
        { company: "Anthropic", type: "Customer", notes: "" },
        { company: "Applied Compute", type: "Customer", notes: "" },
        { company: "Benchmark", type: "Investor", notes: "" },
        { company: "Felicis", type: "Investor", notes: "" },
        { company: "General Catalyst", type: "Investor", notes: "" },
        { company: "Jack Dorsey", type: "Investor", notes: "" },
        { company: "Larry Summers", type: "Investor", notes: "" },
        { company: "Link Ventures", type: "Investor", notes: "" },
        { company: "Menlo Ventures", type: "Investor", notes: "" },
        { company: "Meta", type: "Customer", notes: "" },
        { company: "OpenAI", type: "Customer", notes: "" },
        { company: "Peter Thiel", type: "Investor", notes: "" },
        { company: "Robinhood Ventures", type: "Investor", notes: "" },
        { company: "SignalRank", type: "Investor", notes: "" },
      ],
      sources: [
        { label: "The World’s Youngest Self Made Billionaires Just Slashed These Workers’ Wages", url: "https://www.forbes.com/sites/iainmartin/2025/11/12/the-worlds-youngest-self-made-billionaires-just-slashed-these-workers-wages-by-a-third/" },
        { label: "The Laid-off Scientists and Lawyers Training AI to Steal Their Careers", url: "https://web.archive.org/web/20260312083703/https://nymag.com/intelligencer/article/white-collar-workers-training-ai.html" },
        { label: "An AI startup powering Meta and OpenAI cut thousands of workers — then offered them a similar project for less money", url: "https://www.businessinsider.com/mercor-cuts-contractors-meta-project-less-money-musen-nova-ai-2025-11" },
        { label: "Meta Pauses Work With Mercor After Data Breach Puts AI Industry Secrets at Risk", url: "https://www.wired.com/story/meta-pauses-work-with-mercor-after-data-breach-puts-ai-industry-secrets-at-risk/" },
      ],
    },
    {
      slug: "scaleai",
      name: "Scale AI",
      hq: "San Francisco, CA, USA",
      established: 2022,
      companyType: "Workforce",
      workforceModel: "Marketplace Model",
      whatTheyDo: `Mercor is a company that [supplies workers to train AI models](https://www.theinformation.com/articles/two-openai-business-partners-each-discuss-2-billion-valuation) built by companies such as OpenAI and Anthropic. Mercor positions itself as providing higher value training and evaluation data by hiring qualified [professionals across a wide range of occupations](https://www.businessinsider.com/how-much-ai-training-companies-paying-investment-bankers-wall-street-2025-11). The company markets itself as [“the definitive network for human knowledge and capabilities”](https://www.mercor.com/blog/building-the-network-of-human-knowledge/). Workers are required to question AI models, critique their responses, and create detailed examples of accurate responses, together with the reasoning that went into crafting them. 

Distributed workers perform tasks that are posted to a digital platform. According to Mercor job postings, workers are hired as independent contractors and are paid by the hour. Workers are hired from across the world, with [India being the largest source,](https://futurism.com/startup-investors-gig-jobs-ai) followed by the U.S. Mercor [used automated AI interviews](https://web.archive.org/web/20260419080820/https://www.forbes.com/sites/alexkonrad/2024/09/18/mercor-ai-interviewer-reaches-250-million-valuation/) to hire workers despite [research that shows that biases may be embedded in such systems](https://www.washington.edu/news/2024/10/31/ai-bias-resume-screening-race-gender/).

Workers report that there is no guarantee of on-going work and no fixed working hours; [projects can become available at any time,](https://web.archive.org/web/20260312083703/https://nymag.com/intelligencer/article/white-collar-workers-training-ai.html) which some workers say places them under immense stress as they try to get scarce jobs. After signing on, workers reported having to [install monitoring software on their computers,](https://web.archive.org/web/20260312083703/https://nymag.com/intelligencer/article/white-collar-workers-training-ai.html) including software called [Insightful](https://www.wsj.com/tech/ai/mercor-ai-startup-personal-data-lawsuit-0b5c349b), which [tracks time spent](https://www.bloomberg.com/news/features/2026-04-16/ai-company-hiring-on-linkedin-wants-to-train-your-replacement-at-work) on projects and [determines pay](https://web.archive.org/web/20260312083703/https://nymag.com/intelligencer/article/white-collar-workers-training-ai.html). If workers are unable to complete complex tasks within assigned timeframes, they are likely to be [“offboarded.”](https://web.archive.org/web/20260312083703/https://nymag.com/intelligencer/article/white-collar-workers-training-ai.html) Workers have also [reported](https://www.forbes.com/sites/iainmartin/2025/11/12/the-worlds-youngest-self-made-billionaires-just-slashed-these-workers-wages-by-a-third/) projects becoming scarce, sudden and large-scale layoffs, reduction in time allocated to complete tasks, and [reduction in pay compared to similar previous projects](https://www.businessinsider.com/mercor-cuts-contractors-meta-project-less-money-musen-nova-ai-2025-11). 

In March 2026, [Mercor experienced a data breach,](https://techcrunch.com/2026/03/31/mercor-says-it-was-hit-by-cyberattack-tied-to-compromise-of-open-source-litellm-project/) leading to the exposure of “the [personal data](https://www.strikegraph.com/blog/the-mercor-breach-exposed-silicon-valleys-fragile-ai-supply-chain) of 40,000+ contractors, proprietary source code, video interviews, and potentially the AI training methodologies of multiple frontier labs”.  Meta [reportedly instituted a pause on all projects with Mercor](https://www.wired.com/story/meta-pauses-work-with-mercor-after-data-breach-puts-ai-industry-secrets-at-risk/) in April 2026 and [at least five lawsuits](https://www.businessinsider.com/mercor-lawsuits-data-breach-2026-4) have been filed against the company by contractors claiming damages for the disclosure of their data.`,
      relationships: [
        { company: "Anthropic", type: "Customer", notes: "" },
        { company: "Applied Compute", type: "Customer", notes: "" },
        { company: "Benchmark", type: "Investor", notes: "" },
        { company: "Felicis", type: "Investor", notes: "" },
        { company: "General Catalyst", type: "Investor", notes: "" },
        { company: "Jack Dorsey", type: "Investor", notes: "" },
        { company: "Larry Summers", type: "Investor", notes: "" },
        { company: "Link Ventures", type: "Investor", notes: "" },
        { company: "Menlo Ventures", type: "Investor", notes: "" },
        { company: "Meta", type: "Customer", notes: "" },
        { company: "OpenAI", type: "Customer", notes: "" },
        { company: "Peter Thiel", type: "Investor", notes: "" },
        { company: "Robinhood Ventures", type: "Investor", notes: "" },
        { company: "SignalRank", type: "Investor", notes: "" },
      ],
      sources: [
        { label: "The World’s Youngest Self Made Billionaires Just Slashed These Workers’ Wages", url: "https://www.forbes.com/sites/iainmartin/2025/11/12/the-worlds-youngest-self-made-billionaires-just-slashed-these-workers-wages-by-a-third/" },
        { label: "The Laid-off Scientists and Lawyers Training AI to Steal Their Careers", url: "https://web.archive.org/web/20260312083703/https://nymag.com/intelligencer/article/white-collar-workers-training-ai.html" },
        { label: "An AI startup powering Meta and OpenAI cut thousands of workers — then offered them a similar project for less money", url: "https://www.businessinsider.com/mercor-cuts-contractors-meta-project-less-money-musen-nova-ai-2025-11" },
        { label: "Meta Pauses Work With Mercor After Data Breach Puts AI Industry Secrets at Risk", url: "https://www.wired.com/story/meta-pauses-work-with-mercor-after-data-breach-puts-ai-industry-secrets-at-risk/" },
      ],
    },
    {
      slug: "surgeai",
      name: "Surge AI",
      hq: "San Francisco, CA, USA",
      established: 2022,
      companyType: "Workforce",
      workforceModel: "Marketplace Model",
      whatTheyDo: `Mercor is a company that [supplies workers to train AI models](https://www.theinformation.com/articles/two-openai-business-partners-each-discuss-2-billion-valuation) built by companies such as OpenAI and Anthropic. Mercor positions itself as providing higher value training and evaluation data by hiring qualified [professionals across a wide range of occupations](https://www.businessinsider.com/how-much-ai-training-companies-paying-investment-bankers-wall-street-2025-11). The company markets itself as [“the definitive network for human knowledge and capabilities”](https://www.mercor.com/blog/building-the-network-of-human-knowledge/). Workers are required to question AI models, critique their responses, and create detailed examples of accurate responses, together with the reasoning that went into crafting them. 

Distributed workers perform tasks that are posted to a digital platform. According to Mercor job postings, workers are hired as independent contractors and are paid by the hour. Workers are hired from across the world, with [India being the largest source,](https://futurism.com/startup-investors-gig-jobs-ai) followed by the U.S. Mercor [used automated AI interviews](https://web.archive.org/web/20260419080820/https://www.forbes.com/sites/alexkonrad/2024/09/18/mercor-ai-interviewer-reaches-250-million-valuation/) to hire workers despite [research that shows that biases may be embedded in such systems](https://www.washington.edu/news/2024/10/31/ai-bias-resume-screening-race-gender/).

Workers report that there is no guarantee of on-going work and no fixed working hours; [projects can become available at any time,](https://web.archive.org/web/20260312083703/https://nymag.com/intelligencer/article/white-collar-workers-training-ai.html) which some workers say places them under immense stress as they try to get scarce jobs. After signing on, workers reported having to [install monitoring software on their computers,](https://web.archive.org/web/20260312083703/https://nymag.com/intelligencer/article/white-collar-workers-training-ai.html) including software called [Insightful](https://www.wsj.com/tech/ai/mercor-ai-startup-personal-data-lawsuit-0b5c349b), which [tracks time spent](https://www.bloomberg.com/news/features/2026-04-16/ai-company-hiring-on-linkedin-wants-to-train-your-replacement-at-work) on projects and [determines pay](https://web.archive.org/web/20260312083703/https://nymag.com/intelligencer/article/white-collar-workers-training-ai.html). If workers are unable to complete complex tasks within assigned timeframes, they are likely to be [“offboarded.”](https://web.archive.org/web/20260312083703/https://nymag.com/intelligencer/article/white-collar-workers-training-ai.html) Workers have also [reported](https://www.forbes.com/sites/iainmartin/2025/11/12/the-worlds-youngest-self-made-billionaires-just-slashed-these-workers-wages-by-a-third/) projects becoming scarce, sudden and large-scale layoffs, reduction in time allocated to complete tasks, and [reduction in pay compared to similar previous projects](https://www.businessinsider.com/mercor-cuts-contractors-meta-project-less-money-musen-nova-ai-2025-11). 

In March 2026, [Mercor experienced a data breach,](https://techcrunch.com/2026/03/31/mercor-says-it-was-hit-by-cyberattack-tied-to-compromise-of-open-source-litellm-project/) leading to the exposure of “the [personal data](https://www.strikegraph.com/blog/the-mercor-breach-exposed-silicon-valleys-fragile-ai-supply-chain) of 40,000+ contractors, proprietary source code, video interviews, and potentially the AI training methodologies of multiple frontier labs”.  Meta [reportedly instituted a pause on all projects with Mercor](https://www.wired.com/story/meta-pauses-work-with-mercor-after-data-breach-puts-ai-industry-secrets-at-risk/) in April 2026 and [at least five lawsuits](https://www.businessinsider.com/mercor-lawsuits-data-breach-2026-4) have been filed against the company by contractors claiming damages for the disclosure of their data.`,
      relationships: [
        { company: "Anthropic", type: "Customer", notes: "" },
        { company: "Applied Compute", type: "Customer", notes: "" },
        { company: "Benchmark", type: "Investor", notes: "" },
        { company: "Felicis", type: "Investor", notes: "" },
        { company: "General Catalyst", type: "Investor", notes: "" },
        { company: "Jack Dorsey", type: "Investor", notes: "" },
        { company: "Larry Summers", type: "Investor", notes: "" },
        { company: "Link Ventures", type: "Investor", notes: "" },
        { company: "Menlo Ventures", type: "Investor", notes: "" },
        { company: "Meta", type: "Customer", notes: "" },
        { company: "OpenAI", type: "Customer", notes: "" },
        { company: "Peter Thiel", type: "Investor", notes: "" },
        { company: "Robinhood Ventures", type: "Investor", notes: "" },
        { company: "SignalRank", type: "Investor", notes: "" },
      ],
      sources: [
        { label: "The World’s Youngest Self Made Billionaires Just Slashed These Workers’ Wages", url: "https://www.forbes.com/sites/iainmartin/2025/11/12/the-worlds-youngest-self-made-billionaires-just-slashed-these-workers-wages-by-a-third/" },
        { label: "The Laid-off Scientists and Lawyers Training AI to Steal Their Careers", url: "https://web.archive.org/web/20260312083703/https://nymag.com/intelligencer/article/white-collar-workers-training-ai.html" },
        { label: "An AI startup powering Meta and OpenAI cut thousands of workers — then offered them a similar project for less money", url: "https://www.businessinsider.com/mercor-cuts-contractors-meta-project-less-money-musen-nova-ai-2025-11" },
        { label: "Meta Pauses Work With Mercor After Data Breach Puts AI Industry Secrets at Risk", url: "https://www.wired.com/story/meta-pauses-work-with-mercor-after-data-breach-puts-ai-industry-secrets-at-risk/" },
      ],
    },
    {
      slug: "teleperformance",
      name: "Teleperformance",
      hq: "Paris, France",
      established: 1978,
      companyType: "Tools + Workforce",
      workforceModel: "Unclear",
      whatTheyDo: `Teleperformance is a French multinational Business Process Outsourcing (BPO) firm that has branched into AI-related data work through its [TP.ai Dataservices](https://www.tp.com/en-us/services/ai-solutions/dataservices/) division. It is the [largest call center operator in the world](https://fortune.com/2025/10/09/teleperformance-worlds-largest-call-center-operator-blending-artificial-intelligence-with-emotional-intelligence/). Companies outsource their customer service, back-office operations, content moderation, and digital tasks to Teleperformance, which provides a human workforce through call centers supported by AI. Teleperformance earns revenue by delivering these services for clients across tech, media, finance, healthcare, retail, government and other industries. [In the U.S.](https://cwa-union.org/news/teleperformance-workers-mobilize-national-action-against-companys-mistreatment-american), Teleperformance workers "provide call center customer service support, debt collection, data security, phone and video language interpretation services, American Sign Language interpreting services, social media content moderation, and more to major global and U.S. companies."

For fiscal year 2025, [Teleperformance estimated](https://www.tp.com/media/tcab4o1d/tp-fy-2025-results-presentation.pdf) that its data services for AI accounted for 2% of its overall revenue, although it expects this area to grow. The company [touts](https://www.tp.com/media/tcab4o1d/tp-fy-2025-results-presentation.pdf) its "Flexible Workforce Mode," which includes "crowdsourced" workers and full time employees. In 2025, Teleperformance [acquired](https://www.prnewswire.com/news-releases/tp-fuels-expansion-of-tpai-data-services-with-acquisition-of-agents-only-302484985.html) [Agents Only](https://www.agentsonly.com/), "an AI-enabled crowdsourcing gig work platform," to expand its "on-demand access [for] data labelling, data annotation and generative AI support services." Teleperformance previously acquired [Majorel](https://www.tp.com/en-us/investors/publications-and-events/acquisition-of-majorel/?page=1) and [Intelenet](https://www.tp.com/media/nfidqf0b/lettre_teleperformance_1018_en-vfinale-web.pdf).
      
In 2022, Teleperformance [signed an agreement with UNI Global Union](https://uniglobalunion.org/news/teleperformance-and-uni-global-union-sign-global-agreement/) to secure the rights of workers to join unions and engage in collective bargaining, as well as improvements in health and safety and workplace monitoring. The agreement covered 440,000 workers across 88 countries. However, Teleperformance customer support workers in Greece, working for clients such as Apple, Google, Microsoft, and Netflix, [called for a strike](https://www.theguardian.com/business/2025/jan/14/teleperformance-strike-greece-apple-google-netflix) in 2025 to protest alleged retaliation against union organizers, constant surveillance, and productivity metrics that even disallow workers from taking restroom breaks. Also in 2025, Ghanaian workers at Majorel, a company acquired by Teleperformance, reported inadequate mental health care from the company to deal with the [psychological trauma](https://www.theguardian.com/technology/2025/apr/27/meta-faces-ghana-lawsuits-over-impact-of-extreme-content-on-moderators) they suffered as a result of the content moderation work they do. Wages that are below cost of living needs, poor living conditions in company-provided accommodations, and close surveillance are also [reported by workers](https://www.theguardian.com/technology/2025/apr/27/meta-faces-ghana-lawsuits-over-impact-of-extreme-content-on-moderators) in Ghana.
      
Similar conditions together with unreasonable productivity demands, salary deductions and close surveillance were also reported in 2023 by TikTok content moderators [working for Teleperformance in Colombia](https://committees.parliament.uk/writtenevidence/120135/pdf/). According to the Communications Workers of America (CWA), workers across the U.S. report receiving [low pay, being transferred to lower paying contracts, and an inability to afford health insurance](https://cwa-union.org/news/teleperformance-workers-mobilize-national-action-against-companys-mistreatment-american) because of high deductibles and low coverage. In May 2025, workers held a day of action in protest, demanding better working conditions and union representation.`,
      relationships: [
        { company: "Amazon", type: "Customer", notes: "" },
        { company: "Amazon Web Services", type: "Partner", notes: "" },
        { company: "Apple", type: "Customer", notes: "" },
        { company: "Ema", type: "Partner", notes: "" },
        { company: "Google", type: "Customer", notes: "" },
        { company: "Google Cloud", type: "Partner", notes: "" },
        { company: "Microsoft", type: "Customer", notes: "" },
        { company: "Netflix", type: "Customer", notes: "" },
        { company: "Parloa", type: "Partner", notes: "" },
        { company: "RSA Insurance Group", type: "Customer", notes: "" },
        { company: "Sanas", type: "Partner", notes: "" },
        { company: "Uber", type: "Customer", notes: "" },
      ],
      sources: [
        { label: "Teleperformance and UNI Global Union sign global agreement", url: "https://uniglobalunion.org/news/teleperformance-and-uni-global-union-sign-global-agreement/" },
        { label: "‘Don’t allow you to go to the bathroom’: big tech’s call center workers in Greece on strike", url: "https://www.theguardian.com/business/2025/jan/14/teleperformance-strike-greece-apple-google-netflix" },
        { label: "Teleperformance Workers Mobilize for National Action Against Company’s Mistreatment of American Workers", url: "https://cwa-union.org/news/teleperformance-workers-mobilize-national-action-against-companys-mistreatment-american" },
      ],
    },
  ];