export const navigation = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
] as const;

export const experience = [
  {
    role: "Software Development Specialist",
    company: "DXB Technologies",
    location: "Remote, UAE",
    period: "February 2026 - Present",
    responsibilities: [
      "Develop and maintain web applications using React.js, Node.js, and modern JavaScript technologies.",
      "Build responsive interfaces, integrate REST APIs, and implement backend and database functionality.",
      "Manage AWS deployment environments, troubleshoot production issues, and optimize application performance.",
      "Implement secure access controls and contribute to feature development and application maintenance.",
    ],
  },
  {
    role: "Data Analysis & Administrative Support Intern",
    company: "Metropolitan School of Business Management",
    location: "Remote, UAE",
    period: "October 2025 - January 2026",
    responsibilities: [
      "Analyzed and organized datasets using SQL, Excel, and Python; developed Power BI dashboards for business reporting.",
      "Managed digital documentation, data entry, email correspondence, and administrative records.",
    ],
  },
] as const;

export type ProjectVisual = "mobile" | "browser" | "dashboard";
export type ProjectVideoAspect = "landscape" | "portrait";

export interface ProjectScreenshot {
  src: string;
  alt: string;
  caption: string;
  fit?: "cover" | "contain";
}

export interface Project {
  title: string;
  category: string;
  description: string;
  summary: string;
  highlights: string[];
  programmingLanguages: string[];
  technologiesAndFrameworks: string[];
  features: string[];
  contribution: string;
  accent: string;
  visual: ProjectVisual;
  screenshots: ProjectScreenshot[];
  liveUrl?: string;
  githubUrl?: string;
  youtubeId?: string;
  videoAspect?: ProjectVideoAspect;
}

export const projects: Project[] = [
  {
    title: "Foundly",
    category: "Lost & Found Mobile Application",
    description:
      "A cross-platform lost and found mobile application designed to help users report lost or found belongings, discover matching items, and reconnect people with their missing possessions. The application provides an organized platform for item discovery, communication, and recovery.",
    summary:
      "Report lost or found belongings, discover likely matches, and coordinate recovery through in-app messaging and notifications.",
    highlights: [
      "Lost and found item reporting",
      "Smart item matching",
      "In-app messaging and notifications",
    ],
    programmingLanguages: ["TypeScript", "JavaScript"],
    technologiesAndFrameworks: [
      "React Native",
      "Expo",
      "Expo Router",
      "Supabase (Authentication and Database)",
    ],
    features: [
      "User authentication and account management",
      "Lost and found item reporting",
      "Image selection and item browsing",
      "Smart item matching",
      "Item details and discovery",
      "Shared in-app chat between users",
      "Notification workflows",
    ],
    contribution:
      "Worked on the cross-platform app flows for account management, item reporting and discovery, matching, shared chat, and notifications.",
    accent: "coral",
    visual: "mobile",
    screenshots: [],
    youtubeId: "7nCcHPlSYcw",
    videoAspect: "portrait",
  },
  {
    title: "RCMS",
    category: "Replacement & Complaint Management System",
    description:
      "A web-based complaint management system developed for telecom camera replacement operations. It enables teams to register and track complaints, manage camera serial numbers, coordinate replacement workflows, monitor SLA performance, and generate operational reports through role-based dashboards.",
    summary:
      "Manage telecom camera complaints and replacements, track serial numbers, and monitor SLA performance and operational reporting.",
    highlights: [
      "Role-based complaint management",
      "Camera replacement and serial number tracking",
      "SLA monitoring and operational reporting",
    ],
    programmingLanguages: ["JavaScript", "SQL"],
    technologiesAndFrameworks: [
      "React.js",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "AWS",
      "REST APIs",
    ],
    features: [
      "Role-based access for Admin, Management, and Agents",
      "Complaint registration and tracking",
      "Camera serial number management",
      "Received, sent, and replaced camera tracking",
      "Replacement workflow management",
      "SLA monitoring and performance indicators",
      "Complaint dashboards and reporting",
      "Agent and team management",
    ],
    contribution:
      "Worked on role-based complaint workflows, camera and replacement tracking, SLA visibility, reporting, and agent and team management.",
    accent: "blue",
    visual: "browser",
    screenshots: [],
    youtubeId: "3Pyzwvc4c2U",
    videoAspect: "landscape",
  },
  {
    title: "Dynovex Tech",
    category: "Business Website & AI Chatbot",
    description:
      "A responsive business website developed to showcase digital services and facilitate customer engagement. It includes an AI-powered chatbot, service packages, and integrated inquiry workflows for contact requests, orders, and quotations.",
    summary:
      "Present digital services and packages through a responsive business site with an AI chatbot, an integrated accessibility widget, and customer inquiry workflows.",
    highlights: [
      "Responsive business website",
      "AI-powered chatbot integration",
      "Integrated web accessibility widget",
      "Services and package presentation",
      "Contact, order, and quotation workflows",
    ],
    programmingLanguages: ["TypeScript", "JavaScript", "SQL"],
    technologiesAndFrameworks: [
      "Next.js",
      "React.js",
      "Tailwind CSS",
      "Framer Motion",
      "Supabase",
      "Node.js",
      "Gemini API",
      "Nodemailer",
    ],
    features: [
      "Responsive business website",
      "Services and package presentation",
      "AI-powered chatbot integration",
      "Integrated web accessibility widget",
      "Contact forms",
      "Package and order submission workflows",
      "Quotation request forms",
      "Backend REST API and database integration",
      "Email notification functionality",
    ],
    contribution:
      "Implemented the responsive website and integrated the chatbot, contact, order and quotation workflows, backend data flows, and email notifications.",
    accent: "green",
    visual: "browser",
    screenshots: [],
    youtubeId: "R18dBhBFddg",
    videoAspect: "landscape",
  },
  {
    title: "Accessia",
    category: "Web Accessibility Widget",
    description:
      "A lightweight web accessibility widget developed to provide website visitors with accessibility tools and interface enhancements. It uses an isolated widget architecture to integrate into host websites while keeping its styles separate from the website's existing interface.",
    summary:
      "Embed a responsive accessibility widget in host websites, with isolated styling and dictionary lookup through the Wiktionary REST API.",
    highlights: [
      "Embeddable accessibility widget",
      "Responsive accessibility interface",
      "Shadow DOM-based style isolation",
    ],
    programmingLanguages: ["JavaScript"],
    technologiesAndFrameworks: [
      "Vite",
      "Shadow DOM",
      "Wiktionary REST API",
    ],
    features: [
      "Embeddable accessibility widget",
      "Responsive widget interface",
      "Shadow DOM-based style isolation",
      "Accessibility tools and interface enhancements",
      "Dictionary lookup using the Wiktionary REST API",
    ],
    contribution:
      "Built the embeddable widget and responsive interface, isolated its styles with Shadow DOM, and added Wiktionary dictionary lookup.",
    accent: "violet",
    visual: "dashboard",
    screenshots: [],
    youtubeId: "CrkZvyXS2XI",
    videoAspect: "landscape",
  },
  {
    title: "Dialogix",
    category: "AI-Powered Data Analytics Chatbot",
    description:
      "An AI-powered business analytics application designed to make data analysis accessible through natural-language interaction. Users can upload datasets, ask questions about their data, explore visual insights, and access analytical capabilities without needing to write complex queries manually.",
    summary:
      "Upload datasets, ask questions in natural language, and explore interactive visualizations with AI-powered analytics.",
    highlights: [
      "Dataset upload and processing",
      "Natural-language data queries",
      "Interactive visualizations and AI-powered analytics",
    ],
    programmingLanguages: ["TypeScript", "JavaScript", "Python", "SQL"],
    technologiesAndFrameworks: [
      "React",
      "Vite",
      "Tailwind CSS",
      "FastAPI",
      "Supabase",
      "Chart.js",
      "OpenRouter API",
      "Llama 3.3 70B",
      "BERT",
    ],
    features: [
      "Dataset upload and processing",
      "Natural-language data queries",
      "AI-powered analytical responses",
      "Data preprocessing",
      "Interactive charts and visualizations",
      "Anomaly detection",
      "Predictive analytics",
      "User authentication and data management",
    ],
    contribution:
      "Worked on dataset upload and preprocessing, natural-language analytics, visualizations, anomaly detection, and predictive analysis.",
    accent: "violet",
    visual: "dashboard",
    screenshots: [
      {
        src: "/dialogix portfolio.png",
        alt: "Dialogix interface showing analytics, AI chat, visualizations, and predictive insights",
        caption: "Dialogix interface preview",
        fit: "contain",
      },
    ],
  },
];

export const skillGroups = [
  {
    title: "Programming Languages",
    skills: ["JavaScript", "TypeScript", "Python", "SQL"],
  },
  {
    title: "Frontend Development",
    skills: ["React.js", "Next.js", "React Native", "Expo", "HTML5", "CSS3", "Tailwind CSS"],
  },
  {
    title: "Backend Development & APIs",
    skills: ["Node.js", "Express.js", "FastAPI", "REST APIs", "API Integration"],
  },
  {
    title: "Databases & Backend Platforms",
    skills: ["PostgreSQL", "MySQL", "Supabase"],
  },
  {
    title: "Cloud & Deployment",
    skills: ["AWS", "Vercel", "Render"],
  },
  {
    title: "AI & Data Technologies",
    skills: ["AI API Integration", "NLP", "BERT", "OpenRouter", "Power BI"],
  },
  {
    title: "Development Tools & Practices",
    skills: ["Git", "GitHub", "CRUD Operations", "Role-Based Access Control (RBAC)", "Debugging", "Performance Optimization"],
  },
] as const;

export const education = [
  {
    school: "DHA Suffa University",
    degree: "BSc Software Engineering",
    period: "2021 - 2025",
  },
  {
    school: "Commecs College",
    degree: "Intermediate in Computer Science",
    period: "2019 - 2021",
  },
  {
    school: "Wahaj Hussain's School System",
    degree: "O'Levels in Computer Science",
    period: "2016 - 2019",
  },
] as const;
