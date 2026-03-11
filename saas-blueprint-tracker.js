// ╔══════════════════════════════════════════════════════════════╗
// ║          SaaS Blueprint Tracker — Web Component              ║
// ║   Usage: <saas-blueprint-tracker project="" theme="">        ║
// ║   Attrs: theme="dark|light"  project="my-startup"           ║
// ║   Events: item-toggle, phase-complete                        ║
// ╚══════════════════════════════════════════════════════════════╝

const _STAGES = [
  { label: 'Discover', ids: ['idea','validation','planning','legal'] },
  { label: 'Build',    ids: ['design','development','testing'] },
  { label: 'Ship',     ids: ['launch'] },
  { label: 'Grow',     ids: ['acquisition','conversion','revenue','finance','analytics','feedback','retention','customer-success'] },
  { label: 'Scale',    ids: ['growth','scaling'] },
];

const _PHASES = [
  { id:'idea',             name:'Idea',                 items:['Problem Discovery','Market Research','Niche Selection','Competitor Analysis','Opportunity Mapping'] },
  { id:'validation',       name:'Validation',           items:['Customer Interviews','Landing Page Test','Waitlist','Pre Sales','Demand Testing'] },
  { id:'planning',         name:'Planning',             items:['Product Roadmap','Feature Prioritization','MVP Scope','Tech Stack','Development Plan','Pricing Strategy'] },
  { id:'legal',            name:'Legal & Compliance',   items:['Business Entity','Terms of Service','Privacy Policy','GDPR & CCPA','SOC2 & Certifications','Billing Compliance'] },
  { id:'design',           name:'Design',               items:['Wireframes','UI Design','UX Flows','Prototype','Design System'] },
  { id:'development',      name:'Development',          groups:[
    { name:'Core',           items:['Frontend','Backend','APIs','Database','Authentication','Integrations'] },
    { name:'Infrastructure', items:['Cloud Hosting','DevOps','CI/CD','Monitoring','Security','Incident Response'] },
    { name:'Documentation',  items:['Engineering Docs','API Docs','Runbooks','User Docs'] },
  ]},
  { id:'testing',          name:'Testing',              items:['Unit Testing','Integration Testing','Bug Fixing','Performance Testing','Beta Testing'] },
  { id:'launch',           name:'Launch',               items:['Landing Page','Product Hunt','Beta Users','Early Adopters','Public Release','Changelog & Release Notes'] },
  { id:'acquisition',      name:'Acquisition',          items:['SEO Wins','Content Marketing','Social Media','Cold Email','Influencer Outreach','Affiliate Marketing','Directories & SaaS Marketplaces','Communities','Partnerships'] },
  { id:'conversion',       name:'Conversion',           items:['Sales Funnel','Free Trial','Freemium Model','Pricing Page','Checkout Optimization'] },
  { id:'revenue',          name:'Revenue',              items:['Subscriptions','Upsells','Add-ons','Annual Plans','Enterprise Deals'] },
  { id:'finance',          name:'Finance',              items:['Runway & Burn Rate','MRR & ARR Tracking','Payment Infrastructure','Tax & Accounting','Fundraising'] },
  { id:'analytics',        name:'Analytics',            items:['User Tracking','Funnel Analysis','Cohort Analysis','KPI Dashboard','A/B Testing'] },
  { id:'feedback',         name:'Feedback & Iteration', items:['User Interviews','Feature Requests','Bug Reports','Public Roadmap','Release Loop'] },
  { id:'retention',        name:'Retention',            items:['User Onboarding','Email Automation','Feature Adoption','Churn Reduction','Win-back Campaigns'] },
  { id:'customer-success', name:'Customer Success',     items:['Onboarding Support','Health Scoring','QBRs & Check-ins','Help Desk & Ticketing','Customer Support'] },
  { id:'growth',           name:'Growth',               items:['Referral Programs','Community Building','Product Led Growth','Viral Loops','Expansion Strategy'] },
  { id:'scaling',          name:'Scaling',              items:['Automation','Hiring','Systems & Processes','Localization & i18n','Global Expansion','Exit Strategy'] },
];

const _DESCRIPTIONS = {
  idea: {
    'Problem Discovery':   'Identify a real, painful problem worth solving. Talk to potential users and observe friction in existing workflows.',
    'Market Research':     'Understand the size, trends, and dynamics of your target market. Validate there\'s sufficient demand to build a business on.',
    'Niche Selection':     'Narrow your focus to a specific segment where you can win. A tight niche beats a broad market for early-stage SaaS.',
    'Competitor Analysis': 'Map existing solutions, their pricing, strengths, and gaps. Your job is to find the differentiated angle they\'ve missed.',
    'Opportunity Mapping': 'Define the white space — what\'s underserved, overpriced, or missing entirely. This becomes the foundation of your positioning.',
  },
  validation: {
    'Customer Interviews': 'Talk to 10–20 potential customers before writing a line of code. You\'re listening for pain, not pitching a solution.',
    'Landing Page Test':   'Build a simple page describing your solution and measure real interest via signups or clicks. No product required.',
    'Waitlist':            'Collect emails from interested users to validate demand and build a warm audience before launch.',
    'Pre Sales':           'Try to get someone to pay before the product exists. A credit card is the strongest possible validation signal.',
    'Demand Testing':      'Run ads, post in communities, or do cold outreach to measure genuine willingness to pay at scale.',
  },
  planning: {
    'Product Roadmap':          'Define what you\'re building over the next 3–6 months. Keep it focused, public-facing if possible, and revisit often.',
    'Feature Prioritization':   'Decide what to build first based on user impact vs. effort. Cut anything that doesn\'t directly serve the core use case.',
    'MVP Scope':                'Define the smallest version of the product that delivers real value. Every feature you add delays the moment of truth.',
    'Tech Stack':               'Choose your languages, frameworks, and tools. Optimize for speed of development and your team\'s existing strengths.',
    'Development Plan':         'Break the MVP into tasks, set milestones, and establish a realistic timeline you can hold yourself to.',
    'Pricing Strategy':         'Define how you\'ll charge (per seat, usage, flat rate) and at what price points. Pricing is a positioning decision, not just a number.',
  },
  legal: {
    'Business Entity':        'Register your company (LLC, C-Corp, etc.) to separate personal and business liability from day one.',
    'Terms of Service':       'Define the rules of using your product. Protects you legally and sets clear expectations with users.',
    'Privacy Policy':         'Disclose how you collect, store, and use user data. Required in most jurisdictions and a prerequisite for B2B sales.',
    'GDPR & CCPA':            'Ensure compliance with EU and California privacy regulations if you\'re serving users in those regions.',
    'SOC2 & Certifications':  'Pursue security certifications required by enterprise buyers. Can wait until deals are blocked by their absence.',
    'Billing Compliance':     'Handle PCI compliance, VAT/tax collection, and subscription billing regulations in every market you operate in.',
  },
  design: {
    'Wireframes':     'Sketch low-fidelity layouts of your core screens before investing in visual design. Cheap to change, expensive to redo.',
    'UI Design':      'Create the visual design — colors, typography, spacing, and component styles that reflect your brand.',
    'UX Flows':       'Map the user journey through key tasks to identify friction and optimize the experience before you build it.',
    'Prototype':      'Build a clickable prototype to test and validate flows with real users before a single line of code is written.',
    'Design System':  'Establish reusable components, styles, and patterns to keep the UI consistent and speed up development as you scale.',
  },
  development: {
    'Frontend':           'Build the user-facing interface — the screens, interactions, and visual experience your customers live in every day.',
    'Backend':            'Build the server-side logic, business rules, and data processing that power the product under the hood.',
    'APIs':               'Design and implement the interfaces between frontend, backend, and third-party services. Good APIs age well.',
    'Database':           'Choose and configure your data storage, design schemas carefully, and plan for query performance from the start.',
    'Authentication':     'Implement secure user sign-up, login, password reset, and session management. Don\'t roll your own crypto.',
    'Integrations':       'Connect third-party services your users already depend on — Slack, Stripe, Zapier, and whatever else removes friction.',
    'Cloud Hosting':      'Choose and configure your hosting provider (AWS, GCP, Vercel, Railway, etc.) for reliability, cost, and scale.',
    'DevOps':             'Set up the processes and tooling for deploying, managing, and scaling your application infrastructure.',
    'CI/CD':              'Automate testing and deployment so every code push is validated and shipped to production reliably and without drama.',
    'Monitoring':         'Set up error tracking, uptime monitoring, and performance observability so you know before your users do.',
    'Security':           'Implement auth hardening, input validation, rate limiting, and dependency scanning. Security is not a phase, it\'s a habit.',
    'Incident Response':  'Define a runbook for when things break — who gets paged, what gets checked, and how fast you communicate to users.',
    'Engineering Docs':   'Document architecture decisions, system design, and technical context. Future-you will thank present-you.',
    'API Docs':           'Write clear, accurate documentation for your API so integrators and partners can move fast without asking questions.',
    'Runbooks':           'Step-by-step operational guides for deployments, rollbacks, database migrations, and incident response.',
    'User Docs':          'Write help content, tutorials, and FAQs that reduce support ticket volume and improve user activation.',
  },
  testing: {
    'Unit Testing':         'Test individual functions and modules in isolation. The cheapest bugs to fix are the ones caught before they ship.',
    'Integration Testing':  'Test that different parts of your system work correctly together, not just in isolation.',
    'Bug Fixing':           'Systematically triage, prioritize, and resolve issues before they compound. A clean bug tracker is a healthy codebase.',
    'Performance Testing':  'Measure load times, query speed, and system throughput under realistic conditions before real users hit it.',
    'Beta Testing':         'Get real users on the product in a controlled environment. They will find things no internal tester ever would.',
  },
  launch: {
    'Landing Page':                'Build a conversion-optimized page that clearly explains your value proposition and drives a single action.',
    'Product Hunt':                'Submit to Product Hunt for visibility with early adopters and the tech community. Time the launch strategically.',
    'Beta Users':                  'Onboard a small cohort of real users to validate the product and gather structured feedback.',
    'Early Adopters':              'Identify and nurture your most engaged early users — they become your case studies, referrals, and advocates.',
    'Public Release':              'Open the product to the general public and announce across all your channels simultaneously.',
    'Changelog & Release Notes':   'Document every meaningful change publicly. Builds trust, keeps users informed, and signals active development.',
  },
  acquisition: {
    'SEO Wins':                        'Target high-intent keywords your buyers search for to drive organic, compounding traffic over time.',
    'Content Marketing':               'Create valuable content — blog posts, guides, videos — that attracts and educates your target audience.',
    'Social Media':                    'Build presence on the 1–2 platforms where your audience spends time. Consistency beats frequency.',
    'Cold Email':                      'Reach out directly to potential customers with personalized, value-first outreach. Volume without relevance is spam.',
    'Influencer Outreach':             'Partner with creators or thought leaders who already have the trust of your target audience.',
    'Affiliate Marketing':             'Create a partner program where others earn a commission for referring paying customers. Scales acquisition without headcount.',
    'Directories & SaaS Marketplaces': 'List on G2, Capterra, Product Hunt, and niche directories for passive, long-tail discovery.',
    'Communities':                     'Engage genuinely in Slack groups, subreddits, and forums where your buyers already gather and share problems.',
    'Partnerships':                    'Collaborate with complementary tools or agencies to tap into established user bases with mutual benefit.',
  },
  conversion: {
    'Sales Funnel':          'Map every step from first visit to paid customer. Identify drop-off points and run experiments to close them.',
    'Free Trial':            'Offer time-limited full-access to let users experience real value before committing to pay.',
    'Freemium Model':        'Offer a permanently free tier to maximize top-of-funnel adoption, with paid features for serious users.',
    'Pricing Page':          'Design a clear, compelling pricing page that makes the upgrade decision feel obvious, not agonizing.',
    'Checkout Optimization': 'Reduce friction at the moment of payment — fewer fields, social proof, clear CTAs, and trust signals.',
  },
  revenue: {
    'Subscriptions':    'Set up reliable recurring billing as the foundation of predictable MRR growth.',
    'Upsells':          'Offer higher-tier plans to existing customers who are hitting limits or need more power.',
    'Add-ons':          'Create optional paid features that extend value without requiring a full plan upgrade.',
    'Annual Plans':     'Offer discounted annual billing to improve cash flow, reduce churn risk, and reward committed customers.',
    'Enterprise Deals': 'Pursue larger contracts with custom pricing, SLAs, SSO, and dedicated support. Requires a different sales motion.',
  },
  finance: {
    'Runway & Burn Rate':      'Know exactly how much cash you have and how fast you\'re spending it. Runway is your most important constraint.',
    'MRR & ARR Tracking':      'Monitor monthly and annual recurring revenue as the core health metric of your SaaS business.',
    'Payment Infrastructure':  'Set up Stripe or equivalent for billing, invoicing, dunning, and revenue operations from day one.',
    'Tax & Accounting':        'Manage bookkeeping, tax obligations, and financial reporting properly. Surprises here are always expensive.',
    'Fundraising':             'Decide if and when to raise capital. Know your options: angels, VCs, revenue-based financing, or staying bootstrapped.',
  },
  analytics: {
    'User Tracking':    'Instrument your product to capture behavior, feature usage, and engagement patterns across your user base.',
    'Funnel Analysis':  'Identify exactly where users drop off in your activation and conversion flows, then fix the biggest leaks.',
    'Cohort Analysis':  'Compare retention and behavior across groups of users who started at different times to spot trends and improvements.',
    'KPI Dashboard':    'Build a single view of your most critical metrics — MRR, churn, activation rate — updated at least weekly.',
    'A/B Testing':      'Run controlled experiments on copy, flows, and features to make product decisions with data, not opinions.',
  },
  feedback: {
    'User Interviews':   'Conduct regular conversations with customers to understand their evolving needs, not just what they click on.',
    'Feature Requests':  'Collect, triage, and respond to user feature requests in a structured way. Patterns in requests reveal product gaps.',
    'Bug Reports':       'Capture, prioritize, and close the loop on user-reported issues quickly. Speed of response builds trust.',
    'Public Roadmap':    'Share your planned direction to build trust, gather community input, and reduce repetitive inbound questions.',
    'Release Loop':      'Ship improvements regularly and communicate them. Closing the feedback loop turns users into advocates.',
  },
  retention: {
    'User Onboarding':       'Guide new users to their first "aha moment" as quickly as possible. Activation drives everything downstream.',
    'Email Automation':      'Set up triggered sequences that educate, re-engage, and retain users based on their behavior in the product.',
    'Feature Adoption':      'Proactively drive awareness and usage of features users have missed. Hidden value is wasted value.',
    'Churn Reduction':       'Identify at-risk users early using signals like inactivity or failed payments, and intervene before they leave.',
    'Win-back Campaigns':    'Re-engage churned users with targeted messaging around product improvements or a compelling offer to return.',
  },
  'customer-success': {
    'Onboarding Support':      'Provide hands-on help during the critical first days to ensure users reach value before they lose momentum.',
    'Health Scoring':          'Build a model that predicts which accounts are thriving vs. at risk, so your team knows where to focus.',
    'QBRs & Check-ins':        'Run regular business reviews with key accounts to demonstrate ROI, surface issues early, and deepen relationships.',
    'Help Desk & Ticketing':   'Set up a system to manage, prioritize, and resolve support requests at scale without losing context.',
    'Customer Support':        'Deliver fast, empathetic support that turns problems into loyalty-building moments. Every ticket is a retention opportunity.',
  },
  growth: {
    'Referral Programs':    'Incentivize existing users to refer others. Word-of-mouth with a mechanism is the most efficient acquisition channel.',
    'Community Building':   'Create a space where users connect, share wins, and help each other. Community reduces churn and drives organic growth.',
    'Product Led Growth':   'Design the product itself to drive acquisition, conversion, and expansion — without relying on a sales team.',
    'Viral Loops':          'Build mechanics where using the product naturally exposes it to new potential users who then join and repeat the loop.',
    'Expansion Strategy':   'Define new user segments, geographies, or use cases to grow beyond your initial beachhead market.',
  },
  scaling: {
    'Automation':           'Replace manual, repetitive processes with automated systems to increase output without proportional cost growth.',
    'Hiring':               'Build the team needed to operate and grow at scale. Hire for gaps that are actively slowing you down.',
    'Systems & Processes':  'Document and standardize how work gets done so quality and speed don\'t degrade as headcount grows.',
    'Localization & i18n':  'Adapt the product and all content for different languages and regional conventions before entering new markets.',
    'Global Expansion':     'Enter new geographic markets with a localized GTM strategy, local payment methods, and compliant infrastructure.',
    'Exit Strategy':        'Define your long-term outcome — acquisition, IPO, or profitable independence. Clarity here shapes every decision above it.',
  },
};

const _slug   = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');
const _ikey   = (pid, item) => `${pid}::${_slug(item)}`;
const _pitems = p => p.groups ? p.groups.flatMap(g => g.items) : p.items;
const _total  = () => _PHASES.reduce((s, p) => s + _pitems(p).length, 0);

// ── CSS ───────────────────────────────────────────────────────────────────────

const _CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@1,9..144,700&family=Outfit:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:host { display: block; width: 100%; height: 100%; min-height: 480px; }

.root {
  --bg:          #08090E;
  --surface:     #0F1118;
  --surface-2:   #161A24;
  --surface-3:   #1C2030;
  --border:      #20263A;
  --border-2:    #2C3450;
  --accent:      #F0A500;
  --accent-glow: rgba(240,165,0,0.12);
  --green:       #0DCF8B;
  --green-glow:  rgba(13,207,139,0.1);
  --text:        #ECF0FC;
  --muted:       #4E5570;
  --dim:         #2E3450;
  --font-d:      'Fraunces', Georgia, serif;
  --font-ui:     'Outfit', system-ui, sans-serif;
  --font-m:      'DM Mono', 'Courier New', monospace;
  display: flex; flex-direction: column; height: 100%;
  background: var(--bg); color: var(--text); font-family: var(--font-ui);
  overflow: hidden; position: relative;
}

/* Light theme */
.root[data-theme="light"] {
  --bg:          #F5F7FC;
  --surface:     #FFFFFF;
  --surface-2:   #EEF1F9;
  --surface-3:   #E4E8F2;
  --border:      #D8DDED;
  --border-2:    #C4CBDF;
  --accent:      #C97D00;
  --accent-glow: rgba(201,125,0,0.1);
  --green:       #0AA870;
  --green-glow:  rgba(10,168,112,0.1);
  --text:        #0C1020;
  --muted:       #5A6285;
  --dim:         #A8B2CC;
}

/* TOPBAR */
.topbar {
  flex-shrink: 0; height: 52px;
  background: var(--surface); border-bottom: 1px solid var(--border);
  display: flex; align-items: center; gap: 16px; padding: 0 18px;
  z-index: 10;
}
.logo {
  font-family: var(--font-d); font-style: italic; font-size: 17px; font-weight: 700;
  letter-spacing: -0.02em; white-space: nowrap; color: var(--text);
}
.logo em { font-style: normal; color: var(--accent); }
.global-bar { flex: 1; height: 3px; background: var(--surface-3); border-radius: 2px; overflow: hidden; min-width: 40px; }
.global-fill {
  height: 100%; border-radius: 2px;
  background: linear-gradient(90deg, var(--accent), var(--green));
  transition: width 0.5s cubic-bezier(0.34,1.56,0.64,1); width: 0%;
}
.global-stats {
  font-family: var(--font-m); font-size: 11px; color: var(--muted);
  white-space: nowrap; display: flex; align-items: center; gap: 5px;
}
.global-stats strong { color: var(--text); font-weight: 500; }
.global-pct { color: var(--accent); font-weight: 500; }
.btn-reset {
  font-family: var(--font-m); font-size: 10px; letter-spacing: 0.06em;
  text-transform: uppercase; color: var(--muted); background: none;
  border: 1px solid var(--border); border-radius: 4px; padding: 4px 10px;
  cursor: pointer; transition: all 0.2s; white-space: nowrap;
}
.btn-reset:hover { color: var(--text); border-color: var(--border-2); }

/* LAYOUT */
.layout { flex: 1; display: flex; overflow: hidden; }

/* SIDEBAR */
.sidebar {
  width: 240px; min-width: 240px; background: var(--surface);
  border-right: 1px solid var(--border);
  overflow-y: auto; padding: 10px 0 20px;
  scrollbar-width: thin; scrollbar-color: var(--border) transparent;
}
.sidebar::-webkit-scrollbar { width: 3px; }
.sidebar::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

.stage-label {
  font-family: var(--font-m); font-size: 9px; font-weight: 500;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--dim); padding: 14px 14px 5px;
}

.phase-btn {
  width: 100%; background: none; border: none; cursor: pointer;
  text-align: left; display: flex; align-items: center; gap: 10px;
  padding: 8px 12px; transition: background 0.15s; position: relative;
}
.phase-btn:hover { background: var(--surface-2); }
.phase-btn.active { background: var(--surface-2); }
.phase-btn.active::after {
  content: ''; position: absolute; left: 0; top: 4px; bottom: 4px;
  width: 2px; background: var(--accent); border-radius: 0 2px 2px 0;
}
.phase-btn.done.active::after { background: var(--green); }

.phase-num {
  font-family: var(--font-m); font-size: 9px; color: var(--dim);
  min-width: 18px; letter-spacing: 0.05em;
}
.phase-btn.active .phase-num, .phase-btn:hover .phase-num { color: var(--muted); }

.phase-info { flex: 1; min-width: 0; }
.phase-lbl {
  font-size: 12px; font-weight: 500; color: var(--muted);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: color 0.15s;
}
.phase-btn.active .phase-lbl, .phase-btn:hover .phase-lbl { color: var(--text); }
.phase-btn.done .phase-lbl { color: var(--green); }

.phase-track { height: 2px; background: var(--surface-3); border-radius: 1px; margin-top: 4px; overflow: hidden; }
.phase-fill { height: 100%; border-radius: 1px; background: var(--accent); transition: width 0.4s ease; }
.phase-btn.done .phase-fill { background: var(--green); }

.phase-ct { font-family: var(--font-m); font-size: 9px; color: var(--dim); white-space: nowrap; }
.phase-btn.done .phase-ct { color: rgba(13,207,139,0.5); }
.phase-btn.active .phase-ct { color: var(--muted); }

/* MAIN */
.main {
  flex: 1; overflow-y: auto; padding: 30px 36px 48px;
  scrollbar-width: thin; scrollbar-color: var(--border) transparent;
}
.main::-webkit-scrollbar { width: 5px; }
.main::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }

/* PHASE HEADER */
.ph { margin-bottom: 24px; animation: fadeUp 0.3s ease both; }
.ph-top { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 10px; }
.ph-title {
  font-family: var(--font-d); font-style: italic; font-weight: 700;
  font-size: 34px; letter-spacing: -0.03em; line-height: 1; color: var(--text);
}
.ph-right { text-align: right; }
.ph-pct {
  font-family: var(--font-m); font-size: 28px; font-weight: 500;
  color: var(--accent); line-height: 1; transition: color 0.3s;
}
.ph-pct.done { color: var(--green); }
.ph-sub { font-family: var(--font-m); font-size: 10px; color: var(--muted); margin-top: 4px; letter-spacing: 0.06em; text-transform: uppercase; }
.ph-bar { height: 2px; background: var(--surface-3); border-radius: 1px; overflow: hidden; }
.ph-bar-fill {
  height: 100%; border-radius: 1px;
  background: linear-gradient(90deg, var(--accent), var(--green));
  transition: width 0.5s cubic-bezier(0.34,1.56,0.64,1);
}

/* DONE BANNER */
.done-banner {
  align-items: center; gap: 10px;
  background: var(--green-glow); border: 1px solid rgba(13,207,139,0.2);
  border-radius: 8px; padding: 11px 14px; margin-bottom: 20px;
  font-size: 13px; color: var(--green); font-weight: 500; animation: fadeUp 0.3s ease;
}

/* GROUPS */
.group-block { margin-bottom: 24px; }
.group-hd {
  font-family: var(--font-m); font-size: 9px; font-weight: 500;
  letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted);
  margin-bottom: 10px; display: flex; align-items: center; gap: 10px;
}
.group-hd::after { content: ''; flex: 1; height: 1px; background: var(--border); }

/* GRID */
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 8px; }

/* CARD */
.card {
  background: var(--surface); border: 1px solid var(--border); border-radius: 8px;
  padding: 12px 13px; cursor: pointer; display: flex; align-items: flex-start; gap: 10px;
  transition: border-color 0.2s, background 0.2s, transform 0.15s;
  position: relative; overflow: hidden; user-select: none;
  animation: fadeUp 0.25s ease both;
}
.card::before {
  content: ''; position: absolute; inset: 0;
  background: var(--green-glow); opacity: 0; transition: opacity 0.25s; pointer-events: none;
}
.card:hover { border-color: var(--border-2); background: var(--surface-2); transform: translateY(-1px); }
.card:active { transform: translateY(0); }
.card.checked { border-color: rgba(13,207,139,0.2); }
.card.checked::before { opacity: 1; }
.card.checked:hover { border-color: rgba(13,207,139,0.35); }

.cb {
  width: 17px; height: 17px; min-width: 17px; border: 1.5px solid var(--border-2);
  border-radius: 4px; display: flex; align-items: center; justify-content: center;
  transition: all 0.2s; margin-top: 1px; position: relative; z-index: 1;
}
.card:hover .cb { border-color: var(--muted); }
.card.checked .cb { background: var(--green); border-color: var(--green); }

.ck {
  opacity: 0; transform: scale(0.4) rotate(-10deg);
  transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1);
}
.card.checked .ck { opacity: 1; transform: scale(1) rotate(0deg); }

.card-body { flex: 1; min-width: 0; position: relative; z-index: 1; }

.card-name {
  font-size: 12px; font-weight: 500; color: var(--muted);
  line-height: 1.35; transition: color 0.2s;
}
.card:hover .card-name { color: var(--text); }
.card.checked .card-name {
  color: rgba(13,207,139,0.7);
  text-decoration: line-through;
  text-decoration-color: rgba(13,207,139,0.3);
}

.card-desc {
  font-size: 10.5px; color: var(--dim); line-height: 1.45; margin-top: 4px;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
  transition: color 0.2s;
}
.card:hover .card-desc { color: var(--muted); }
.card.checked .card-desc { color: rgba(13,207,139,0.35); text-decoration: none; }

/* TOAST */
.toast {
  position: absolute; bottom: 20px; right: 20px; z-index: 99;
  background: var(--surface-2); border: 1px solid rgba(13,207,139,0.35);
  border-radius: 8px; padding: 10px 14px;
  display: flex; align-items: center; gap: 8px;
  font-size: 13px; font-weight: 500; color: var(--green);
  transform: translateY(54px) scale(0.97); opacity: 0;
  transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1); pointer-events: none;
}
.toast.show { transform: translateY(0) scale(1); opacity: 1; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Responsive */
@media (max-width: 560px) {
  .sidebar { width: 48px; min-width: 48px; }
  .phase-info, .phase-ct { display: none; }
  .main { padding: 18px 14px 36px; }
  .ph-title { font-size: 24px; }
  .grid { grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); }
  .global-stats { display: none; }
}
`;

// ── COMPONENT ─────────────────────────────────────────────────────────────────

class SaasBlueprintTracker extends HTMLElement {

  static get observedAttributes() { return ['theme', 'project']; }

  get _storageKey() { return `saas-bp-v1::${this.getAttribute('project') || 'default'}`; }
  get _theme()      { return this.getAttribute('theme') || 'dark'; }

  get _done() {
    if (!this.__done) {
      this.__done = new Set(JSON.parse(localStorage.getItem(this._storageKey) || '[]'));
    }
    return this.__done;
  }

  _save()       { localStorage.setItem(this._storageKey, JSON.stringify([...this._done])); }
  _pDone(p)     { return _pitems(p).filter(i => this._done.has(_ikey(p.id, i))).length; }
  _$(id)        { return this.shadowRoot.getElementById(id); }
  _$$(sel)      { return this.shadowRoot.querySelectorAll(sel); }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this._active    = _PHASES[0].id;
    this._toastTimer = null;
    this.shadowRoot.innerHTML = this._template();
    this._bindEvents();
    this._renderAll();
  }

  attributeChangedCallback(name) {
    if (!this.shadowRoot) return;
    if (name === 'project') this.__done = null;
    if (name === 'theme') {
      const root = this.shadowRoot.querySelector('.root');
      if (root) root.dataset.theme = this._theme;
    }
    this._renderAll();
  }

  _template() {
    return `
      <style>${_CSS}</style>
      <div class="root" data-theme="${this._theme}">
        <header class="topbar">
          <div class="logo">SaaS <em>Blueprint</em></div>
          <div class="global-bar"><div class="global-fill" id="gFill"></div></div>
          <div class="global-stats">
            <strong id="gDone">0</strong>&thinsp;/&thinsp;<span id="gTotal">0</span>
            &nbsp;·&nbsp;<span class="global-pct" id="gPct">0%</span>
          </div>
          <button class="btn-reset">Reset</button>
        </header>
        <div class="layout">
          <nav class="sidebar" id="sidebar"></nav>
          <main class="main" id="main"></main>
        </div>
        <div class="toast" id="toast">
          <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
            <path d="M1.5 5L4.5 8L11.5 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span id="toastMsg"></span>
        </div>
      </div>`;
  }

  _bindEvents() {
    this.shadowRoot.addEventListener('click', e => {
      const card     = e.target.closest('.card');
      const phaseBtn = e.target.closest('.phase-btn');
      const resetBtn = e.target.closest('.btn-reset');
      if (card)     { this._toggle(card.dataset.key); return; }
      if (phaseBtn) { this._setPhase(phaseBtn.dataset.id); return; }
      if (resetBtn) { this._resetAll(); return; }
    });
  }

  _toggle(key) {
    const was = this._done.has(key);
    was ? this._done.delete(key) : this._done.add(key);
    this._save();

    const card = this.shadowRoot.querySelector(`[data-key="${key}"]`);
    if (card) card.classList.toggle('checked', !was);

    this._refreshPhaseHeader();
    this._refreshSidebar();
    this._refreshTopBar();

    this.dispatchEvent(new CustomEvent('item-toggle', {
      detail: { key, checked: !was, project: this.getAttribute('project') || 'default' },
      bubbles: true, composed: true,
    }));

    if (!was) {
      const pid   = key.split('::')[0];
      const phase = _PHASES.find(p => p.id === pid);
      if (phase && this._pDone(phase) === _pitems(phase).length) {
        const banner = this.$('done-banner');
        if (banner) banner.style.display = 'flex';
        this._toast(`${phase.name} complete!`);
        this.dispatchEvent(new CustomEvent('phase-complete', {
          detail: { id: phase.id, name: phase.name, project: this.getAttribute('project') || 'default' },
          bubbles: true, composed: true,
        }));
      }
    }
  }

  _setPhase(id) {
    this._active = id;
    this._renderMain();
    this._refreshSidebar();
    const main = this._$('main');
    if (main) main.scrollTop = 0;
  }

  _resetAll() {
    if (!confirm('Reset all progress?')) return;
    this._done.clear();
    this._save();
    this.__done = null;
    this._renderAll();
  }

  _toast(msg) {
    const el    = this._$('toast');
    const msgEl = this._$('toastMsg');
    if (!el || !msgEl) return;
    msgEl.textContent = msg;
    el.classList.add('show');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => el.classList.remove('show'), 3000);
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  _renderAll() {
    this._renderSidebar();
    this._renderMain();
    this._refreshTopBar();
  }

  _renderSidebar() {
    const sb = this._$('sidebar');
    if (!sb) return;
    const phaseMap = Object.fromEntries(_PHASES.map((p, i) => [p.id, i + 1]));
    sb.innerHTML = _STAGES.map(stage => `
      <div class="stage-label">${stage.label}</div>
      ${stage.ids.map(id => {
        const p   = _PHASES.find(x => x.id === id);
        const d   = this._pDone(p), t = _pitems(p).length;
        const pct = t ? (d / t) * 100 : 0;
        return `
          <button class="phase-btn ${id === this._active ? 'active' : ''} ${d === t ? 'done' : ''}" data-id="${id}">
            <span class="phase-num">${String(phaseMap[id]).padStart(2, '0')}</span>
            <span class="phase-info">
              <div class="phase-lbl">${p.name}</div>
              <div class="phase-track"><div class="phase-fill" style="width:${pct}%"></div></div>
            </span>
            <span class="phase-ct">${d}/${t}</span>
          </button>`;
      }).join('')}
    `).join('');
  }

  _refreshSidebar() {
    this._$$('.phase-btn').forEach(btn => {
      const id  = btn.dataset.id;
      const p   = _PHASES.find(x => x.id === id);
      if (!p) return;
      const d   = this._pDone(p), t = _pitems(p).length;
      const pct = t ? (d / t) * 100 : 0;
      btn.classList.toggle('done', d === t);
      btn.classList.toggle('active', id === this._active);
      const fill = btn.querySelector('.phase-fill');
      const ct   = btn.querySelector('.phase-ct');
      if (fill) fill.style.width = pct + '%';
      if (ct)   ct.textContent  = `${d}/${t}`;
    });
  }

  _refreshTopBar() {
    const T   = _total();
    const D   = this._done.size;
    const pct = T ? Math.round((D / T) * 100) : 0;
    const set = (id, val) => { const el = this._$(id); if (el) el.textContent = val; };
    const fill = this._$('gFill');
    if (fill) fill.style.width = pct + '%';
    set('gDone', D); set('gTotal', T); set('gPct', pct + '%');
  }

  _renderMain() {
    const main  = this._$('main');
    if (!main) return;
    const phase = _PHASES.find(p => p.id === this._active);
    if (!phase) return;

    const items  = _pitems(phase);
    const d      = items.filter(i => this._done.has(_ikey(phase.id, i))).length;
    const t      = items.length;
    const pct    = t ? Math.round((d / t) * 100) : 0;
    const isDone = d === t;

    let body = '';
    if (phase.groups) {
      let offset = 0;
      body = phase.groups.map(g => {
        const cards = g.items.map((item, idx) => this._card(phase.id, item, offset + idx)).join('');
        offset += g.items.length;
        return `<div class="group-block">
          <div class="group-hd">${g.name}</div>
          <div class="grid">${cards}</div>
        </div>`;
      }).join('');
    } else {
      body = `<div class="grid">${phase.items.map((item, idx) => this._card(phase.id, item, idx)).join('')}</div>`;
    }

    main.innerHTML = `
      <div class="ph">
        <div class="ph-top">
          <div class="ph-title">${phase.name}</div>
          <div class="ph-right">
            <div class="ph-pct${isDone ? ' done' : ''}" id="ph-pct">${pct}<span style="font-size:13px;opacity:0.5;font-weight:400">%</span></div>
            <div class="ph-sub" id="ph-sub">${d} of ${t} done</div>
          </div>
        </div>
        <div class="ph-bar"><div class="ph-bar-fill" id="ph-bar-fill" style="width:${pct}%"></div></div>
      </div>
      <div class="done-banner" id="done-banner" style="display:${isDone ? 'flex' : 'none'}">
        <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
          <path d="M1.5 5.5L5 9L12.5 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Phase complete — well done.
      </div>
      ${body}`;
  }

  _refreshPhaseHeader() {
    const phase = _PHASES.find(p => p.id === this._active);
    if (!phase) return;
    const items  = _pitems(phase);
    const d      = items.filter(i => this._done.has(_ikey(phase.id, i))).length;
    const t      = items.length;
    const pct    = t ? Math.round((d / t) * 100) : 0;
    const isDone = d === t;
    const pctEl  = this._$('ph-pct');
    const subEl  = this._$('ph-sub');
    const fillEl = this._$('ph-bar-fill');
    const banner = this._$('done-banner');
    if (pctEl)  { pctEl.innerHTML = `${pct}<span style="font-size:13px;opacity:0.5;font-weight:400">%</span>`; pctEl.className = 'ph-pct' + (isDone ? ' done' : ''); }
    if (subEl)  subEl.textContent  = `${d} of ${t} done`;
    if (fillEl) fillEl.style.width = pct + '%';
    if (banner) banner.style.display = isDone ? 'flex' : 'none';
  }

  _card(pid, item, idx) {
    const k    = _ikey(pid, item);
    const desc = (_DESCRIPTIONS[pid] || {})[item] || '';
    return `
      <div class="card${this._done.has(k) ? ' checked' : ''}" data-key="${k}" style="animation-delay:${idx * 0.025}s">
        <div class="cb">
          <svg class="ck" width="9" height="7" viewBox="0 0 9 7" fill="none">
            <path d="M1 3.5L3.2 6L8 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="card-body">
          <div class="card-name">${item}</div>
          ${desc ? `<div class="card-desc">${desc}</div>` : ''}
        </div>
      </div>`;
  }
}

customElements.define('saas-blueprint-tracker', SaasBlueprintTracker);
