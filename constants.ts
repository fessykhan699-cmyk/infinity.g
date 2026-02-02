import { CaseStudy } from './types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'nexus-saas',
    title: 'Nexus — Enterprise SaaS Engine',
    category: 'Cloud Platform',
    description: 'A multi-tenant architecture designed for massive global scale, featuring a robust subscription engine and real-time administrative intelligence.',
    image: 'https://images.unsplash.com/photo-1551288049-bbbda546697a?q=80&w=2070&auto=format&fit=crop',
    results: [
      { label: 'OpEx Reduction', value: '50%', trend: 'down' },
      { label: 'Active Users', value: '100k+' },
      { label: 'Uptime', value: '99.99%' }
    ],
    challenge: "Scaling a single-tenant system to support thousands of discrete organizations while maintaining strict data isolation and consistent performance across regions.",
    solution: [
      "Multi-tenant Partitioning: Implemented logical database isolation using MongoDB Atlas multi-region clusters.",
      "Subscription Lifecycle: Built a custom Stripe-integrated billing engine supporting metered usage and hierarchical tiered pricing.",
      "Insight Dashboard: Aggregated real-time analytics using Next.js Server Components and advanced aggregation pipelines."
    ],
    techStack: ['Next.js 15', 'Node.js', 'MongoDB Atlas', 'Stripe', 'Auth.js']
  },
  {
    id: 'swift-native',
    title: 'SwiftCore — High-Performance Mobile',
    category: 'Mobile Ecosystem',
    description: 'A React Native powerhouse delivering fluid 60FPS animations, native biometric security, and complex offline-first data synchronization.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop',
    results: [
      { label: 'App Rating', value: '4.9', trend: 'up' },
      { label: 'Sync Latency', value: '200ms' },
      { label: 'Engagement', value: '+65%' }
    ],
    challenge: "Developing a cross-platform solution that feels truly native, handling heavy image processing and push notifications without draining battery or memory resources.",
    solution: [
      "Native Bridge Optimization: Custom modules for biometric hardware access and local encrypted storage.",
      "Offline Sync: Implemented TanStack Query with persistent local caching for uninterrupted field agent productivity.",
      "Push Infrastructure: Scalable Firebase Cloud Messaging (FCM) integration for real-time localized alerts."
    ],
    techStack: ['React Native', 'TypeScript', 'Redux Toolkit', 'Firebase', 'Native Modules']
  },
  {
    id: 'veloce-web',
    title: 'Veloce — Enterprise Web Experience',
    category: 'Full-Stack Web',
    description: 'A cinematic web application utilizing Next.js for extreme SEO performance, ultra-fast LCP metrics, and high-fidelity interactive elements.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026&auto=format&fit=crop',
    results: [
      { label: 'Lighthouse Score', value: '100' },
      { label: 'Conversion', value: '+30%', trend: 'up' },
      { label: 'Load Time', value: '0.8s' }
    ],
    challenge: "Merging high-end visual design with enterprise-grade performance, ensuring accessible and responsive experiences across all device categories.",
    solution: [
      "Edge-side Rendering: Leveraging Vercel Edge Functions for localized content delivery and A/B testing.",
      "API Orchestration: Secure Node.js backend with Redis-backed caching layers for sub-millisecond API responses.",
      "Advanced UI Architecture: Modular React components with Tailwind CSS for rapid scaling and design consistency."
    ],
    techStack: ['React 19', 'Next.js', 'Tailwind CSS', 'Redis', 'Vercel Edge']
  },
  {
    id: 'neural-automation',
    title: 'NeuralFlow — AI Workflow Automation',
    category: 'AI & Automation',
    description: 'Autonomous AI agents that orchestrate complex business processes, from CRM lead scoring to automated financial document processing.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop',
    results: [
      { label: 'Lead Response', value: 'Instant' },
      { label: 'Cost Saved', value: '$2M/yr' },
      { label: 'Accuracy', value: '98%' }
    ],
    challenge: "Integrating generative AI into rigid business workflows without compromising data privacy or introducing hallucinations in critical decision-making steps.",
    solution: [
      "RAG Architecture: Retrieval-Augmented Generation using Pinecone vector databases to ground AI responses in company data.",
      "Agentic Orchestration: Custom LangChain workflows that perform autonomous research and CRM updates.",
      "Vision Systems: Intelligent OCR processing for automated extraction of high-stakes transactional data."
    ],
    techStack: ['Python', 'Gemini Pro', 'LangChain', 'Pinecone', 'Docker']
  }
];

export const SERVICES = [
  {
    title: 'Gig 1 — Full‑Stack Web App',
    description: 'Engineering resilient Next.js 15 platforms utilizing React 19 Server Components and Node.js. We deploy microservices-based architectures with advanced SEO optimization (ISR/SSR) and high-performance frontend interfaces. Our stack includes Tailwind CSS for fluid design and MongoDB Atlas for distributed data management, ensuring sub-second interaction times and extreme scalability.',
    gradient: 'from-blue-500 to-indigo-500'
  },
  {
    title: 'Gig 2 — Mobile App Development',
    description: 'Developing elite React Native applications that bridge the performance gap between cross-platform and native. We implement advanced features like biometric authentication, background sync via TanStack Query, and gesture-driven animations at 60FPS. Every app is built with a TypeScript-first approach, ensuring long-term maintainability and rapid iteration across iOS and Android.',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Gig 3 — SaaS Platform',
    description: 'Building complete multi-tenant SaaS ecosystems from the ground up. We handle complex orchestration including Auth.js identity management, multi-region database partitioning, and global payment integration via Stripe Connect. Our platforms feature real-time administrative dashboards and metered usage tracking, providing your enterprise with a scalable engine for recurring revenue.',
    gradient: 'from-emerald-500 to-teal-500'
  },
  {
    title: 'Gig 4 — UI/UX Design',
    description: 'Designing high-fidelity, conversion-centric interfaces that command influence. We specialize in Glassmorphism 2.0 and motion-driven UX using Framer Motion. Our design process results in modular Design Systems that ensure visual consistency across all touchpoints, turning complex enterprise flows into cinematic digital journeys that drive measurable engagement.',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    title: 'Gig 5 — API & Backend',
    description: 'Architecting industrial-strength backend systems capable of handling millions of requests. We design RESTful and GraphQL APIs with iron-clad security (JWT/OAuth2), rate limiting, and Redis-backed caching layers. Our infrastructure is deployed on Kubernetes or Vercel Edge, providing a sub-millisecond response foundation for high-stakes enterprise applications.',
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    title: 'Gig 6 — AI Automation',
    description: 'Revolutionizing operational efficiency with autonomous AI agents. We utilize Gemini Pro and LangChain to build RAG-powered knowledge bases and intelligent vision systems. Our solutions automate complex business processes like CRM lead scoring, automated financial document processing, and real-time sentiment analysis, eliminating manual bottlenecks and driving significant OpEx reduction.',
    gradient: 'from-indigo-500 to-violet-500'
  }
];
