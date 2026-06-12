import {
  Boxes,
  Code2,
  Bot,
  Search,
  ScanSearch,
  Sparkles,
  LayoutDashboard,
  Smartphone,
  ShoppingBag,
  Target,
  Palette,
  Video,
  Film,
  type LucideIcon,
} from "lucide-react";

export interface ServiceBullet {
  title: string;
  body: string;
}

export interface ServicePageData {
  slug: string;
  navLabel: string;
  icon: LucideIcon;
  /** <title> tag */
  metaTitle: string;
  /** meta description + og/twitter description */
  metaDescription: string;
  /** og:title / twitter:title */
  ogTitle: string;
  /** Service schema name for JSON-LD */
  jsonLdName: string;
  /** Indicative starting price, e.g. "from AED 4,500". */
  price?: string;
  eyebrow: string;
  h1Lead: string;
  h1Accent: string;
  lede: string;
  bulletsHeading: string;
  bullets: ServiceBullet[];
  forWhoHeading: string;
  forWho: string[];
  /** Matches a CASE_STUDIES client name to show as proof, if any. */
  caseStudyClient?: string;
  /** Service-specific FAQs (rendered on the page + FAQPage JSON-LD). */
  faqs: { q: string; a: string }[];
}

export const SERVICE_PAGES: ServicePageData[] = [
  {
    slug: "odoo-erp-dubai",
    navLabel: "Odoo / ERP",
    icon: Boxes,
    metaTitle: "Xerxes Duane | Odoo ERP Implementation in Dubai",
    metaDescription:
      "Odoo ERP setup, configuration, and support for small businesses in Dubai. One system for inventory, sales, invoicing, and CRM, run by a hands-on Odoo administrator. Book a free systems audit.",
    ogTitle: "Odoo ERP Implementation in Dubai",
    jsonLdName: "Odoo ERP Implementation & Administration",
    price: "from AED 12,000",
    eyebrow: "Odoo & ERP · Dubai",
    h1Lead: "Run your whole business on one system,",
    h1Accent: "not five that don't talk.",
    lede: "Odoo ERP implementation in Dubai, set up and run properly. We wire inventory, sales, purchasing, invoicing, and CRM into a single source of truth, then stay on to support it. No bloated rollout you can't use, no consultant who disappears after go-live.",
    bulletsHeading: "What an Odoo build with us looks like",
    bullets: [
      {
        title: "Scoped to how you actually work",
        body: "We configure Odoo around your real workflow, not a generic template. Only the modules you need, switched on in the right order.",
      },
      {
        title: "One source of truth",
        body: "Inventory, sales, purchasing, accounting, and customer data finally live in one place, so nothing falls through the cracks and you stop re-keying the same numbers.",
      },
      {
        title: "Migrated without the chaos",
        body: "We move your existing data in cleanly and test it before launch. Your team keeps working while we build in the background.",
      },
      {
        title: "Run and supported, not abandoned",
        body: "As your Odoo systems administrator, we handle updates, fixes, and new modules as you grow. One number to call, for years.",
      },
    ],
    forWhoHeading: "Who this is for",
    forWho: [
      "Small businesses outgrowing spreadsheets and disconnected apps",
      "Trading, retail, and service companies in the UAE",
      "Teams that need inventory, invoicing, and CRM in one place",
      "Owners who want Odoo run for them, not dumped on them",
    ],
    caseStudyClient: "Blocktec Philippines",
    faqs: [
      {
        q: "How long does an Odoo implementation take?",
        a: "A focused rollout of the core modules usually takes a few weeks. We phase it so your team keeps working while we build, and you see value before everything is switched on.",
      },
      {
        q: "Do I need Odoo Enterprise, or is Community enough?",
        a: "It depends on the modules you actually need. We'll tell you honestly which edition fits, so you're not paying for licenses you won't use.",
      },
      {
        q: "Can you connect Odoo to tools I already use?",
        a: "Yes. We integrate Odoo with your website, payment, and accounting tools so data flows automatically instead of being re-keyed by hand.",
      },
      {
        q: "I already started with Odoo and it's a mess. Can you help?",
        a: "Very common. We audit what's there, fix the configuration, and clean up the data rather than forcing you to start from scratch.",
      },
    ],
  },
  {
    slug: "web-development-dubai",
    navLabel: "Web Development",
    icon: Code2,
    metaTitle: "Xerxes Duane | Web Development in Dubai",
    metaDescription:
      "Custom websites, web apps, and high-converting landing pages for Dubai small businesses. Fast, mobile-first, SEO-ready, with fixed quotes and no lock-in. Book a free systems audit.",
    ogTitle: "Web Development in Dubai",
    jsonLdName: "Web Development & Web Applications",
    price: "from AED 4,500",
    eyebrow: "Web Development · Dubai",
    h1Lead: "A website that brings in customers,",
    h1Accent: "not one that just sits there.",
    lede: "Web development in Dubai for small businesses that need their site to do real work. Fast, mobile-first websites, custom web apps, and landing pages that load quickly, rank well, and turn visitors into booked enquiries, built honestly, by one trusted partner.",
    bulletsHeading: "What we build",
    bullets: [
      {
        title: "Websites that convert",
        body: "Clear, fast, mobile-first sites designed around one job: turning the right visitor into a lead. Built on solid foundations you own outright.",
      },
      {
        title: "Custom web apps",
        body: "Booking platforms, client portals, member areas, and internal tools, built around the way you run instead of forcing you into someone else's software.",
      },
      {
        title: "Landing pages & funnels",
        body: "Conversion-optimised pages wired to analytics, lead capture, and your CRM, so you can see exactly what your ad spend is doing.",
      },
      {
        title: "Built to be found",
        body: "Server-rendered, fast, and structured for search from day one. The site you're reading is built the same way.",
      },
    ],
    forWhoHeading: "Who this is for",
    forWho: [
      "Businesses whose current site brings in nothing",
      "Owners launching a new product, service, or location",
      "Teams that need a web app or portal, not just a brochure site",
      "Anyone tired of agencies who lock them out of their own site",
    ],
    faqs: [
      {
        q: "How much does a website cost?",
        a: "Every project gets a fixed quote up front after a short scope call, no hourly surprises. Most small-business sites start from a defined package.",
      },
      {
        q: "Will I own the site and the code?",
        a: "Yes, always. Everything is set up in your name and you keep full access to the site, hosting, and accounts, start to finish.",
      },
      {
        q: "Can you work with my existing website?",
        a: "Often, yes. We keep what's worth keeping and rebuild what isn't, rather than forcing a full restart.",
      },
      {
        q: "Is the site mobile-first and built to be found?",
        a: "Yes. Fast, mobile-first, and structured for search from day one, the site you're reading is built the same way.",
      },
    ],
  },
  {
    slug: "ai-automation-dubai",
    navLabel: "AI Automation",
    icon: Bot,
    metaTitle: "Xerxes Duane | AI Automation in Dubai",
    metaDescription:
      "AI automation in Dubai for small businesses: chatbots, AI workflows, and custom assistants that qualify leads, answer questions, and remove repetitive work. Book a free systems audit.",
    ogTitle: "AI Automation in Dubai",
    jsonLdName: "AI Automation & Custom AI Workflows",
    price: "from AED 6,000",
    eyebrow: "AI & Automation · Dubai",
    h1Lead: "Let AI do the repetitive work,",
    h1Accent: "so you can do the real work.",
    lede: "AI automation in Dubai, built around your business instead of bolted on for show. We design AI workflows, chatbots, and custom assistants that quietly run in the background, answering questions, qualifying leads, and giving you back the hours you've been losing.",
    bulletsHeading: "Where AI actually pays off",
    bullets: [
      {
        title: "Lead qualification on autopilot",
        body: "An assistant that answers common questions, captures details, and routes hot leads to you, day and night, so nothing sits unanswered.",
      },
      {
        title: "Workflows that remove busywork",
        body: "Automate the copy-paste between your tools: enquiries to CRM, invoices to accounting, follow-ups that send themselves.",
      },
      {
        title: "Custom assistants for your team",
        body: "Internal AI tools trained on how your business works, so your staff get answers in seconds instead of digging through documents.",
      },
      {
        title: "Honest about what AI can't do",
        body: "We'll tell you where AI helps and where it's hype. You get the advantage without paying for buzzwords.",
      },
    ],
    forWhoHeading: "Who this is for",
    forWho: [
      "Owners drowning in repetitive admin and enquiries",
      "Teams losing leads because nobody replies fast enough",
      "Businesses curious about AI but unsure where it's worth it",
      "Anyone who wants automation that's actually maintained",
    ],
    faqs: [
      {
        q: "Is AI automation actually worth it for a small business?",
        a: "When it removes repetitive work or catches leads you'd otherwise miss, yes. We'll tell you where it pays off and where it's just hype.",
      },
      {
        q: "Will AI replace my team?",
        a: "No. It handles the repetitive parts so your team spends time on the work that genuinely needs a human.",
      },
      {
        q: "Is my data safe with AI tools?",
        a: "We design around tools and configurations that keep your data private and in your control, and we explain exactly what gets sent where.",
      },
      {
        q: "How do we start with automation?",
        a: "We map your current workflows in the free audit, then automate the highest-impact, lowest-risk steps first.",
      },
    ],
  },
  {
    slug: "seo-dubai",
    navLabel: "SEO",
    icon: Search,
    metaTitle: "Xerxes Duane | SEO Services in Dubai",
    metaDescription:
      "SEO in Dubai that targets keywords that convert, not vanity rankings. Technical SEO, local search, and content for small businesses, with transparent reporting. Book a free systems audit.",
    ogTitle: "SEO Services in Dubai",
    jsonLdName: "Search Engine Optimisation (SEO)",
    price: "from AED 2,000/month",
    eyebrow: "SEO · Dubai",
    h1Lead: "Get found by people ready to buy,",
    h1Accent: "not just ready to browse.",
    lede: "SEO in Dubai focused on the keywords that actually bring in customers. We fix the technical foundations, sharpen your local search presence, and build content that ranks, then show you, in plain numbers, what it's doing for the business.",
    bulletsHeading: "How we approach SEO",
    bullets: [
      {
        title: "Technical foundations first",
        body: "Fast load times, crawlable pages, clean structured data, and mobile-first builds. The boring fixes that quietly decide whether you rank at all.",
      },
      {
        title: "Local search that wins Dubai",
        body: "Google Business Profile, local landing pages, and the on-page signals that put you in front of nearby customers searching right now.",
      },
      {
        title: "Keywords that convert",
        body: "We target search terms with real buying intent, the ones your competitors waste, instead of chasing traffic that never becomes a customer.",
      },
      {
        title: "Reporting in plain English",
        body: "You see rankings, traffic, and leads in numbers that mean something, with no jargon and no smoke and mirrors.",
      },
    ],
    forWhoHeading: "Who this is for",
    forWho: [
      "Local Dubai businesses invisible in search results",
      "Owners paying for ads but with no organic foundation",
      "Sites that look fine but never get found",
      "Anyone burned by SEO agencies that promised page one",
    ],
    caseStudyClient: "Wellington Cash for Cars",
    faqs: [
      {
        q: "How long until SEO shows results?",
        a: "Technical fixes can help within weeks; competitive rankings typically build over a few months. We focus on keywords that convert, not vanity traffic.",
      },
      {
        q: "Do you guarantee page-one rankings?",
        a: "No one credible can guarantee rankings. We guarantee the right work, transparent reporting, and a focus on terms that actually bring customers.",
      },
      {
        q: "What's included in your SEO work?",
        a: "Technical foundations, local search (Google Business Profile), on-page optimization, and content, all reported in plain numbers you can act on.",
      },
      {
        q: "Can you run Google Ads alongside SEO?",
        a: "Yes. We run Google and Meta ads alongside SEO so you get traffic now and compounding organic growth over time.",
      },
    ],
  },
  {
    slug: "answer-engine-optimization-dubai",
    navLabel: "AEO",
    icon: ScanSearch,
    metaTitle: "Xerxes Duane | Answer Engine Optimization (AEO) in Dubai",
    metaDescription:
      "AEO in Dubai: get your business quoted by Google AI Overviews, voice assistants, and featured snippets. Answer-first content, structured data, and FAQ schema. Book a free systems audit.",
    ogTitle: "Answer Engine Optimization (AEO) in Dubai",
    jsonLdName: "Answer Engine Optimization (AEO)",
    price: "from AED 2,500/month",
    eyebrow: "AEO · Dubai",
    h1Lead: "Be the answer customers hear,",
    h1Accent: "not the link they scroll past.",
    lede: "Answer Engine Optimization (AEO) in Dubai: we structure your content so Google's AI Overviews, voice assistants, and featured snippets quote you directly, the moment someone asks a question your business can answer.",
    bulletsHeading: "How we win the answer box",
    bullets: [
      {
        title: "Answer-first content",
        body: "We reshape your key pages to answer real questions clearly and concisely, the exact format answer engines lift word-for-word.",
      },
      {
        title: "Structured data & FAQ schema",
        body: "We mark up your pages so search engines can understand, trust, and surface your answers, not just crawl them.",
      },
      {
        title: "Topic & entity authority",
        body: "We build the depth and internal links that make your site the obvious source on the questions that matter to your buyers.",
      },
      {
        title: "Win 'position zero'",
        body: "We target the featured snippets and 'People Also Ask' boxes your competitors leave on the table.",
      },
    ],
    forWhoHeading: "Who this is for",
    forWho: [
      "Businesses losing clicks to Google's AI answer boxes",
      "Service providers people find by asking questions",
      "Owners who want to show up in voice search",
      "Anyone whose FAQs could be earning snippets",
    ],
    faqs: [
      {
        q: "What's the difference between SEO and AEO?",
        a: "SEO gets you ranked in the list of links. AEO gets you quoted as the answer above them, in featured snippets, voice results, and Google's AI Overviews. They work best together.",
      },
      {
        q: "How is AEO different from GEO?",
        a: "AEO targets search answer features (snippets, voice, AI Overviews). GEO targets generative chatbots like ChatGPT and Perplexity. We often run both.",
      },
      {
        q: "Do I need brand-new content for AEO?",
        a: "Usually not. We reshape what you already have into clear, structured answers and add schema, rather than starting from scratch.",
      },
      {
        q: "How do you measure AEO results?",
        a: "We track snippet and 'People Also Ask' wins, Search Console impressions, and where your answers appear, all in plain reporting.",
      },
    ],
  },
  {
    slug: "generative-engine-optimization-dubai",
    navLabel: "GEO",
    icon: Sparkles,
    metaTitle: "Xerxes Duane | Generative Engine Optimization (GEO) in Dubai",
    metaDescription:
      "GEO in Dubai: become the business ChatGPT, Gemini, and Perplexity recommend. We shape content, entities, and citations so AI engines surface and cite you. Book a free systems audit.",
    ogTitle: "Generative Engine Optimization (GEO) in Dubai",
    jsonLdName: "Generative Engine Optimization (GEO)",
    price: "from AED 3,000/month",
    eyebrow: "GEO · Dubai",
    h1Lead: "Get recommended by the AI tools",
    h1Accent: "your customers now ask first.",
    lede: "Generative Engine Optimization (GEO) in Dubai: more buyers now start with ChatGPT, Gemini, and Perplexity than a search box. We shape your content, entities, and citations so those engines surface, trust, and recommend your business by name.",
    bulletsHeading: "How we get you cited by AI",
    bullets: [
      {
        title: "Citation-worthy content",
        body: "We create the clear, factual, well-sourced content generative engines prefer to quote, with the specifics they need to recommend you.",
      },
      {
        title: "Entity & authority signals",
        body: "We strengthen how AI models understand who you are, what you do, and why you're credible, across the web, not just your own site.",
      },
      {
        title: "Presence where models read",
        body: "We get your business represented in the directories, profiles, and sources these engines actually draw their answers from.",
      },
      {
        title: "Prompt testing & monitoring",
        body: "We test the prompts your buyers really use and track when and how the major AI engines mention you.",
      },
    ],
    forWhoHeading: "Who this is for",
    forWho: [
      "Businesses whose buyers research with ChatGPT or Perplexity",
      "Owners who've noticed AI tools never mention them",
      "Brands that want to be the AI-recommended option",
      "Anyone future-proofing beyond traditional search",
    ],
    faqs: [
      {
        q: "Is GEO real, or just hype?",
        a: "It's early but real: a growing share of buyers ask AI tools for recommendations before they ever Google. GEO makes sure you're in those answers. We're honest that it's an emerging channel, not a magic switch.",
      },
      {
        q: "How is GEO different from SEO and AEO?",
        a: "SEO ranks you in search; AEO wins answer features; GEO gets you surfaced and cited inside generative chatbots like ChatGPT and Perplexity. They overlap and reinforce each other.",
      },
      {
        q: "Can you guarantee ChatGPT will recommend me?",
        a: "No one credible can guarantee what a model outputs. What we can do is meaningfully improve how often and how accurately the major engines surface you, and report on it.",
      },
      {
        q: "How do you measure GEO?",
        a: "We test real buyer prompts across the major AI engines and track mentions, accuracy, and citations over time.",
      },
    ],
  },
  {
    slug: "custom-software-development-dubai",
    navLabel: "Custom Software",
    icon: Code2,
    metaTitle: "Xerxes Duane | Custom Software Development in Dubai",
    metaDescription:
      "Custom software development in Dubai for growing businesses: internal tools, client portals, workflow systems, and integrations built around how your team actually works.",
    ogTitle: "Custom Software Development in Dubai",
    jsonLdName: "Custom Software Development",
    price: "from AED 9,000",
    eyebrow: "Custom Software · Dubai",
    h1Lead: "Software shaped around your business,",
    h1Accent: "not the other way around.",
    lede: "Custom software development in Dubai for businesses that have outgrown generic tools. We build practical internal systems, client portals, workflow platforms, and integrations around how your team already operates, then keep them maintainable as you grow.",
    bulletsHeading: "What custom software can solve",
    bullets: [
      {
        title: "Internal tools that fit the work",
        body: "Replace spreadsheets and repetitive admin with focused tools designed around your actual process, permissions, and reporting needs.",
      },
      {
        title: "Client and partner portals",
        body: "Give customers, suppliers, or partners one secure place to submit requests, track progress, access documents, and communicate.",
      },
      {
        title: "Systems that connect",
        body: "Join your website, CRM, accounting, ERP, and third-party platforms so data moves automatically instead of being copied by hand.",
      },
      {
        title: "Built to remain understandable",
        body: "You get clear ownership, documentation, and a maintainable foundation, not a mysterious system only one developer can touch.",
      },
    ],
    forWhoHeading: "Who this is for",
    forWho: [
      "Businesses forcing generic software to fit a unique workflow",
      "Teams running important operations through spreadsheets",
      "Owners who need a portal, internal tool, or connected platform",
      "Growing companies ready to replace manual work properly",
    ],
    faqs: [
      {
        q: "How do I know if I need custom software?",
        a: "If your team repeatedly works around the limitations of existing tools, copies the same data between systems, or relies on fragile spreadsheets for core operations, a focused custom system may be worthwhile.",
      },
      {
        q: "How much does custom software development cost?",
        a: "Focused internal tools start from AED 9,000. After the free audit, we define the smallest useful version and provide a fixed quote before development begins.",
      },
      {
        q: "Can you improve an existing custom system?",
        a: "Yes. We first assess its code, hosting, security, and business fit, then recommend whether to repair, extend, or replace it.",
      },
      {
        q: "Will I own the software?",
        a: "Yes. Your agreement clearly defines ownership, access, hosting, and any third-party services before the project starts.",
      },
    ],
  },
  {
    slug: "crm-development-dubai",
    navLabel: "CRM & Dashboards",
    icon: LayoutDashboard,
    metaTitle: "Xerxes Duane | CRM Development & Setup in Dubai",
    metaDescription:
      "CRM setup and development in Dubai: connected lead pipelines, customer databases, dashboards, and follow-up automation for growing small businesses.",
    ogTitle: "CRM Development & Setup in Dubai",
    jsonLdName: "CRM Development, Setup & Dashboards",
    price: "from AED 4,000",
    eyebrow: "CRM & Dashboards · Dubai",
    h1Lead: "Know every lead, customer, and next step,",
    h1Accent: "without chasing spreadsheets.",
    lede: "CRM development and setup in Dubai for growing businesses that need a clear view of sales and customers. We organise your pipeline, connect your enquiry sources, automate follow-ups, and build dashboards your team will actually use.",
    bulletsHeading: "What a useful CRM should give you",
    bullets: [
      {
        title: "One clean customer record",
        body: "Every enquiry, conversation, document, and next action sits in one place instead of being scattered across inboxes and spreadsheets.",
      },
      {
        title: "A pipeline everyone understands",
        body: "Clear stages, ownership, reminders, and follow-up rules make it obvious what needs attention and what is likely to close.",
      },
      {
        title: "Connected lead capture",
        body: "Website forms, ads, WhatsApp enquiries, and imports flow into the right pipeline with the source recorded automatically.",
      },
      {
        title: "Dashboards that answer real questions",
        body: "See lead volume, response time, conversion, revenue, and team activity without assembling a report by hand.",
      },
    ],
    forWhoHeading: "Who this is for",
    forWho: [
      "Teams losing leads between WhatsApp, email, and spreadsheets",
      "Owners who cannot see the real sales pipeline",
      "Businesses with a CRM nobody consistently uses",
      "Growing sales teams that need repeatable follow-up",
    ],
    faqs: [
      {
        q: "Which CRM should my business use?",
        a: "That depends on your workflow, team size, integrations, and budget. We assess the process first, then recommend whether Odoo, HubSpot, Zoho, or a focused custom solution fits best.",
      },
      {
        q: "Can you clean up our existing CRM?",
        a: "Yes. We can remove duplicates, simplify stages, improve fields and permissions, reconnect lead sources, and make reporting useful again.",
      },
      {
        q: "Can a CRM connect to WhatsApp and our website?",
        a: "Usually, yes. The exact integration depends on your CRM and WhatsApp setup, but capturing website enquiries and recording conversations is a common part of our work.",
      },
      {
        q: "How long does CRM setup take?",
        a: "A focused setup can take a few weeks. More complex migrations and integrations are phased so your team can start using the core pipeline early.",
      },
    ],
  },
  {
    slug: "mobile-app-development-dubai",
    navLabel: "Mobile & Web Apps",
    icon: Smartphone,
    metaTitle: "Xerxes Duane | Mobile App Development in Dubai",
    metaDescription:
      "Mobile and web app development in Dubai for booking, customer portals, memberships, and internal operations. Practical apps built to launch and grow.",
    ogTitle: "Mobile App Development in Dubai",
    jsonLdName: "Mobile & Web App Development",
    price: "from AED 25,000",
    eyebrow: "Mobile & Web Apps · Dubai",
    h1Lead: "An app people have a reason to use,",
    h1Accent: "built for the work it needs to do.",
    lede: "Mobile and web app development in Dubai for businesses that need more than a website. We build booking platforms, customer portals, membership experiences, and internal apps with a focused first release and a clear path to grow.",
    bulletsHeading: "What we build into the right app",
    bullets: [
      {
        title: "A focused first release",
        body: "We define the smallest version that solves a real problem, so you can launch, learn, and improve without funding unnecessary features.",
      },
      {
        title: "Simple, purposeful journeys",
        body: "Every screen and action is designed around what the user needs to complete, with less friction and fewer dead ends.",
      },
      {
        title: "The systems behind the interface",
        body: "Authentication, notifications, payments, admin tools, analytics, and integrations are planned as part of the product, not afterthoughts.",
      },
      {
        title: "A foundation ready to grow",
        body: "We choose architecture and technology that fit the product, expected usage, and your ability to maintain it after launch.",
      },
    ],
    forWhoHeading: "Who this is for",
    forWho: [
      "Businesses launching a booking or membership platform",
      "Teams that need a customer or employee portal",
      "Founders validating a practical app idea",
      "Companies replacing a slow manual process with an app",
    ],
    faqs: [
      {
        q: "Should I build a mobile app or a web app?",
        a: "A web app is often the fastest and most economical starting point. Native mobile apps make sense when device features, app-store presence, or frequent mobile use are genuinely important.",
      },
      {
        q: "How much does app development cost?",
        a: "Focused app projects start from AED 25,000. The final fixed quote depends on user roles, integrations, payments, notifications, and the scope of the first release.",
      },
      {
        q: "Can you help define the app before building it?",
        a: "Yes. We map the users, core workflows, risks, and first-release features before development, so the project starts with a defensible scope.",
      },
      {
        q: "Do you provide support after launch?",
        a: "Yes. We can maintain, monitor, and improve the app after launch under a clear ongoing support arrangement.",
      },
    ],
  },
  {
    slug: "ecommerce-development-dubai",
    navLabel: "E-Commerce",
    icon: ShoppingBag,
    metaTitle: "Xerxes Duane | E-Commerce Development in Dubai",
    metaDescription:
      "E-commerce development in Dubai: fast online stores, secure UAE payments, inventory connections, order workflows, and conversion-focused customer journeys.",
    ogTitle: "E-Commerce Development in Dubai",
    jsonLdName: "E-Commerce Development",
    price: "from AED 9,000",
    eyebrow: "E-Commerce · Dubai",
    h1Lead: "An online store that makes buying easy,",
    h1Accent: "and running it manageable.",
    lede: "E-commerce development in Dubai for businesses that need the storefront and the operations behind it to work together. We build fast customer journeys, connect payments and inventory, and reduce the manual work between order and delivery.",
    bulletsHeading: "What a strong online store needs",
    bullets: [
      {
        title: "A smoother path to checkout",
        body: "Clear products, useful search and filtering, trusted payment options, and fewer distractions help more visitors complete their order.",
      },
      {
        title: "UAE-ready payments and delivery",
        body: "We configure suitable payment gateways, shipping rules, taxes, and customer communication around how you actually fulfil orders.",
      },
      {
        title: "Connected inventory and orders",
        body: "Your store can connect with ERP, accounting, CRM, and fulfilment workflows so the team does less copying and correcting.",
      },
      {
        title: "Measurement after launch",
        body: "Analytics, conversion tracking, and reporting show where customers drop out and which products or campaigns drive revenue.",
      },
    ],
    forWhoHeading: "Who this is for",
    forWho: [
      "Retailers launching or rebuilding an online store",
      "Businesses whose store and inventory do not match",
      "Teams manually processing online orders",
      "Brands that need better checkout conversion and reporting",
    ],
    caseStudyClient: "Gilani Mobility",
    faqs: [
      {
        q: "Which e-commerce platform should I use?",
        a: "It depends on your catalogue, operations, integrations, and internal team. We recommend the platform after understanding the business, rather than forcing every store onto the same stack.",
      },
      {
        q: "Can you connect the store to inventory or accounting?",
        a: "Yes. Connecting the storefront to ERP, inventory, CRM, accounting, or fulfilment tools is often where the biggest operational value sits.",
      },
      {
        q: "Can you improve an existing e-commerce store?",
        a: "Yes. We can audit its speed, user journey, analytics, checkout, product structure, and integrations before recommending focused improvements or a rebuild.",
      },
      {
        q: "Will the store work well on mobile?",
        a: "Yes. Mobile usability, speed, product discovery, and checkout are treated as core requirements, not a smaller version of desktop.",
      },
    ],
  },
  {
    slug: "landing-page-design-dubai",
    navLabel: "Landing Pages",
    icon: Target,
    metaTitle: "Xerxes Duane | Landing Page Design in Dubai",
    metaDescription:
      "Landing page design in Dubai for campaigns, launches, and lead generation. Conversion-focused pages connected to analytics, forms, CRM, and follow-up.",
    ogTitle: "Landing Page Design in Dubai",
    jsonLdName: "Landing Page Design & Sales Funnels",
    price: "from AED 2,500",
    eyebrow: "Landing Pages & Funnels · Dubai",
    h1Lead: "Turn campaign clicks into enquiries,",
    h1Accent: "not expensive exits.",
    lede: "Landing page design in Dubai for campaigns that need a clear job and measurable result. We shape the offer, remove distractions, connect lead capture and analytics, and make the follow-up happen quickly.",
    bulletsHeading: "What makes the page convert",
    bullets: [
      {
        title: "One clear offer",
        body: "The message, proof, and call to action are built around the visitor and campaign, instead of asking one page to say everything.",
      },
      {
        title: "Fast, focused design",
        body: "Mobile-first layouts, strong hierarchy, and fast loading keep attention on the next action and reduce campaign waste.",
      },
      {
        title: "Lead capture that connects",
        body: "Forms, WhatsApp, booking tools, CRM, and follow-up automation work together so leads do not disappear after submitting.",
      },
      {
        title: "Tracking you can trust",
        body: "Analytics and conversion events are set up clearly, so you can judge the campaign by leads and sales rather than clicks alone.",
      },
    ],
    forWhoHeading: "Who this is for",
    forWho: [
      "Businesses running Google or Meta campaigns",
      "Teams launching a product, event, or new service",
      "Owners whose homepage is trying to sell too many things",
      "Campaigns generating clicks but too few enquiries",
    ],
    faqs: [
      {
        q: "How is a landing page different from a website page?",
        a: "A landing page is designed around one audience, offer, and action. It removes the choices and general information that can distract campaign visitors.",
      },
      {
        q: "Can you write the landing page copy?",
        a: "Yes. We can shape the offer, structure the message, and refine the copy using your business knowledge, audience, and campaign intent.",
      },
      {
        q: "Can you connect it to my CRM or booking tool?",
        a: "Yes. Lead routing, CRM capture, calendar booking, WhatsApp, email follow-up, and conversion tracking can all be included.",
      },
      {
        q: "Can you improve an existing landing page?",
        a: "Yes. We review the offer, message hierarchy, mobile experience, speed, tracking, and follow-up before prioritising changes.",
      },
    ],
  },
  {
    slug: "branding-graphic-design-dubai",
    navLabel: "Branding & Design",
    icon: Palette,
    metaTitle: "Xerxes Duane | Branding & Graphic Design in Dubai",
    metaDescription:
      "Branding and graphic design in Dubai for growing businesses: practical identities, marketing collateral, campaign graphics, and consistent visual systems.",
    ogTitle: "Branding & Graphic Design in Dubai",
    jsonLdName: "Branding & Graphic Design",
    price: "from AED 1,500",
    eyebrow: "Branding & Graphic Design · Dubai",
    h1Lead: "Look as credible as the work",
    h1Accent: "you already deliver.",
    lede: "Branding and graphic design in Dubai for businesses that need clarity and consistency, not decoration for its own sake. We build useful visual identities and everyday marketing assets that help people recognise, understand, and trust you.",
    bulletsHeading: "Design that earns its place",
    bullets: [
      {
        title: "Practical brand foundations",
        body: "Logo, typography, colour, visual direction, and simple usage rules give the business a recognisable and repeatable identity.",
      },
      {
        title: "Marketing collateral that stays consistent",
        body: "Presentations, brochures, proposals, signage, and sales materials feel like one business instead of unrelated files.",
      },
      {
        title: "Campaign and social graphics",
        body: "Flexible systems and templates help your team produce regular content without the brand slowly falling apart.",
      },
      {
        title: "Designed around the audience",
        body: "Every visual decision supports what the customer needs to understand, feel, or do next.",
      },
    ],
    forWhoHeading: "Who this is for",
    forWho: [
      "Growing businesses whose visuals no longer match their quality",
      "New brands that need a useful identity system",
      "Teams producing inconsistent marketing materials",
      "Campaigns that need clear, professional creative assets",
    ],
    faqs: [
      {
        q: "Do you only design logos?",
        a: "No. A logo can be part of the work, but the useful outcome is a coherent visual system your team can apply across real customer touchpoints.",
      },
      {
        q: "Can you work with our existing brand?",
        a: "Yes. We can refine, extend, and organise an existing identity without replacing recognisable elements that still work.",
      },
      {
        q: "What files will we receive?",
        a: "Deliverables depend on the project, but final assets are supplied in practical formats for digital, print, and internal use, with ownership and access clearly defined.",
      },
      {
        q: "Can you create ongoing campaign and social graphics?",
        a: "Yes. Ongoing creative support can sit inside a monthly partnership when the volume and workflow justify it.",
      },
    ],
  },
  {
    slug: "videography-photography-dubai",
    navLabel: "Video & Photography",
    icon: Video,
    metaTitle: "Xerxes Duane | Videography & Photography in Dubai",
    metaDescription:
      "Videography and photography in Dubai for brands, products, events, and campaigns. Purposeful production planned for the channels where the work will be used.",
    ogTitle: "Videography & Photography in Dubai",
    jsonLdName: "Videography & Photography",
    price: "from AED 1,500/day",
    eyebrow: "Video & Photography · Dubai",
    h1Lead: "Create the visuals people need",
    h1Accent: "to understand and trust you.",
    lede: "Videography and photography in Dubai for brands that need useful campaign assets, not footage without a plan. We shape the story, capture the right moments, and produce content around where and how it will actually be used.",
    bulletsHeading: "Production with a purpose",
    bullets: [
      {
        title: "Planned around the outcome",
        body: "We define the audience, message, channels, and required deliverables before the shoot so every setup earns its time.",
      },
      {
        title: "Brand, product, and people",
        body: "Professional photography and video show the real product, experience, team, or event with clarity and credibility.",
      },
      {
        title: "Content captured for multiple channels",
        body: "We plan framing, formats, and coverage so one production day can support websites, ads, social media, and presentations.",
      },
      {
        title: "Clean handoff into editing",
        body: "Footage, selects, editing, captions, and final exports are organised around the agreed deliverables and deadlines.",
      },
    ],
    forWhoHeading: "Who this is for",
    forWho: [
      "Brands needing credible website and campaign visuals",
      "Products and services that need to be demonstrated clearly",
      "Events that need useful coverage beyond a highlight reel",
      "Teams planning content across multiple channels",
    ],
    faqs: [
      {
        q: "What does a production day include?",
        a: "The exact scope is agreed beforehand and can include planning, filming or photography, equipment, direction, and a defined set of edited deliverables.",
      },
      {
        q: "Can you create both photos and video in one shoot?",
        a: "Often, yes. We plan the schedule and shot list carefully so both formats receive enough attention and the final assets remain useful.",
      },
      {
        q: "Do you cover events?",
        a: "Yes, when the coverage has a clear purpose and deliverable plan, including highlights, interviews, social clips, or future campaign assets.",
      },
      {
        q: "Can you help with the concept and script?",
        a: "Yes. We can help shape the message, story, shot list, interview prompts, and channel-specific deliverables before production.",
      },
    ],
  },
  {
    slug: "video-editing-dubai",
    navLabel: "Video Editing",
    icon: Film,
    metaTitle: "Xerxes Duane | Video Editing in Dubai",
    metaDescription:
      "Video editing in Dubai for social reels, ads, interviews, events, and brand films. Clean pacing, captions, motion graphics, and channel-ready exports.",
    ogTitle: "Video Editing in Dubai",
    jsonLdName: "Video Editing & Post-Production",
    price: "from AED 750 per video",
    eyebrow: "Video Editing · Dubai",
    h1Lead: "Turn footage into something",
    h1Accent: "people keep watching.",
    lede: "Video editing in Dubai for brands and teams that already have footage but need it shaped into clear, engaging content. We edit for attention, understanding, and the platform where the finished piece will live.",
    bulletsHeading: "What happens in the edit",
    bullets: [
      {
        title: "The story gets clearer",
        body: "We find the useful moments, remove what slows the piece down, and shape a sequence that makes the message easy to follow.",
      },
      {
        title: "Pacing fits the platform",
        body: "A social reel, paid ad, interview, event film, and website video each need a different rhythm and structure.",
      },
      {
        title: "Captions and motion support the message",
        body: "Clean captions, graphics, callouts, and transitions improve understanding without turning the edit into visual noise.",
      },
      {
        title: "Exports arrive ready to publish",
        body: "Final files are prepared in the agreed aspect ratios, lengths, and technical formats for each channel.",
      },
    ],
    forWhoHeading: "Who this is for",
    forWho: [
      "Brands with footage sitting unused",
      "Teams producing regular reels and social content",
      "Campaigns needing multiple edits from one shoot",
      "Events and interviews that need a clear finished story",
    ],
    faqs: [
      {
        q: "Can you edit footage filmed by someone else?",
        a: "Yes. We first review the footage quality, audio, available coverage, and intended deliverables, then confirm what can be produced well.",
      },
      {
        q: "How are revisions handled?",
        a: "The scope defines the included revision rounds and feedback process, so everyone knows how decisions and final approval will work.",
      },
      {
        q: "Can you create several social clips from one long video?",
        a: "Yes. Turning interviews, events, webinars, or long-form footage into a planned set of shorter clips is a common workflow.",
      },
      {
        q: "Do you add captions and motion graphics?",
        a: "Yes. Captions, titles, callouts, and restrained motion graphics can be included based on the content and platform.",
      },
    ],
  },
];

export function getServicePage(slug: string): ServicePageData | undefined {
  return SERVICE_PAGES.find((p) => p.slug === slug);
}
