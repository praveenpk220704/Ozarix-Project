import { 
  Code, Laptop, Smartphone, Cpu, Database, Server, Palette, Cloud, 
  Layers, Settings, HeartPulse, GraduationCap, ShoppingBag, ShieldCheck,
  BrainCircuit, GitBranch, Globe, Terminal, Users, Award, Briefcase, FileCode,
  ShieldAlert, Settings2, BarChart3, UsersRound, SearchCode, Wrench, Network
} from 'lucide-react';

/**
 * 14 Canonical Services defined in OZARIX TECHNOLOGY Architecture
 */
export const servicesData = [
  {
    id: 'custom-software',
    title: 'Custom Software Development',
    category: 'Engineering',
    icon: Settings,
    shortDesc: 'Bespoke enterprise applications engineered for complex workflows and high-concurrency systems.',
    longDesc: 'Architecting end-to-end custom systems tailored to your specific business operations. We combine robust domain-driven design, clean architecture patterns, and rigorous automated validation.',
    features: ['Domain-driven system architecture', 'Modular microservices & monoliths', 'Enterprise legacy modernization', 'Role-based access & auditing'],
    techs: ['Java 21', 'Spring Boot', 'PostgreSQL', 'Docker', 'AWS']
  },
  {
    id: 'web-application',
    title: 'Web Application Development',
    category: 'Frontend & Full Stack',
    icon: Laptop,
    shortDesc: 'High-performance, accessible, and reactive web platforms built with React, Next.js, and modern toolchains.',
    longDesc: 'Crafting responsive, reliable web applications with sub-second page loads, intuitive UI, state persistence, and seamless API communication.',
    features: ['Modern React & Next.js architectures', 'State management & offline caching', 'WCAG accessible interface standards', 'SEO & Core Web Vitals optimization'],
    techs: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite']
  },
  {
    id: 'mobile-app',
    title: 'Mobile App Development',
    category: 'Mobile',
    icon: Smartphone,
    shortDesc: 'Cross-platform iOS and Android mobile apps engineered for fluid performance and offline synchronization.',
    longDesc: 'Building secure mobile applications using React Native and Flutter with native device bridge integration, biometric auth, and push notification services.',
    features: ['Cross-platform iOS & Android codebases', 'Offline-first SQLite data synchronization', 'Hardware integration (Biometrics, Camera, GPS)', 'App Store & Google Play distribution'],
    techs: ['React Native', 'Flutter', 'TypeScript', 'Firebase', 'SQLite']
  },
  {
    id: 'ai-machine-learning',
    title: 'AI & Machine Learning',
    category: 'Intelligent Systems',
    icon: BrainCircuit,
    shortDesc: 'Intelligent automation, natural language processing, predictive analytics, and LLM integrations.',
    longDesc: 'Integrating predictive algorithms and modern language models directly into your business pipelines to automate processing, extract insights, and boost team productivity.',
    features: ['Custom LLM integrations & RAG pipelines', 'Predictive business analytics models', 'Automated document processing & OCR', 'Semantic search & recommendation systems'],
    techs: ['Python', 'FastAPI', 'LangChain', 'PyTorch', 'Vector Databases']
  },
  {
    id: 'mern-stack',
    title: 'MERN Stack Development',
    category: 'Full Stack',
    icon: Globe,
    shortDesc: 'Full-stack JavaScript applications with MongoDB, Express, React, and Node.js for rapid product delivery.',
    longDesc: 'Developing reactive, event-driven web applications leveraging the full power of JavaScript/TypeScript across the entire stack.',
    features: ['Unified TypeScript across client & server', 'Scalable Express/Node.js RESTful APIs', 'Document modeling in MongoDB', 'Real-time WebSocket event feeds'],
    techs: ['MongoDB', 'Express.js', 'React', 'Node.js', 'TypeScript']
  },
  {
    id: 'spring-boot-development',
    title: 'Java Spring Boot Development',
    category: 'Backend',
    icon: Server,
    shortDesc: 'Enterprise-grade backends built with Java 21, Spring Boot 3, Hibernate JPA, and PostgreSQL.',
    longDesc: 'Engineering robust, type-safe backend systems designed for zero downtime, strict transactional integrity, high-throughput REST APIs, and bank-grade security.',
    features: ['Spring Security 6 & JWT authentication', 'Hibernate/JPA relational data modeling', 'Database connection pooling (HikariCP)', 'Automated testing with JUnit 5 & Mockito'],
    techs: ['Java 21', 'Spring Boot 3', 'Spring Data JPA', 'PostgreSQL', 'Maven']
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    category: 'Design',
    icon: Palette,
    shortDesc: 'Human-centered user experiences, comprehensive design systems, and cinematic interface prototypes.',
    longDesc: 'Designing clear, elegant user workflows that remove friction. We deliver high-fidelity prototypes, accessible components, and polished interactive micro-interactions.',
    features: ['End-to-end user journey mapping', 'Figma design tokens & component libraries', 'Interactive clickable prototypes', 'Developer handoff with full specifications'],
    techs: ['Figma', 'Design Systems', 'Prototyping', 'User Research']
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps',
    category: 'Infrastructure',
    icon: Cloud,
    shortDesc: 'Automated CI/CD pipelines, container orchestration, AWS infrastructure, and cloud monitoring.',
    longDesc: 'Setting up automated build pipelines, containerized environments, and cloud infrastructure that scale seamlessly and recover automatically.',
    features: ['Docker & Kubernetes orchestration', 'Automated GitHub Actions CI/CD workflows', 'AWS VPC, EC2, S3, RDS cloud architecture', 'Zero-downtime rolling deployment strategies'],
    techs: ['Docker', 'Kubernetes', 'AWS', 'GitHub Actions', 'Linux']
  },
  {
    id: 'api-development',
    title: 'API Development & Integration',
    category: 'Backend',
    icon: Network,
    shortDesc: 'Secure, standards-compliant RESTful APIs, OpenAPI/Swagger documentation, and third-party integrations.',
    longDesc: 'Building documented, rate-limited, and authenticated API gateways that connect frontend applications, mobile clients, and enterprise partner systems.',
    features: ['OpenAPI 3.0 & Swagger documentation', 'JWT & OAuth2 token authorization', 'Rate limiting & input sanitization', 'Payment gateways & webhook integrations'],
    techs: ['RESTful APIs', 'Spring Web', 'Postman', 'Swagger', 'JSON']
  },
  {
    id: 'erp-development',
    title: 'ERP Development',
    category: 'Enterprise Solutions',
    icon: Layers,
    shortDesc: 'Custom Enterprise Resource Planning platforms consolidating inventory, procurement, and operations.',
    longDesc: 'Consolidating warehouse tracking, financial ledgers, purchase orders, and team workflows into a centralized, single-source-of-truth application.',
    features: ['Real-time inventory & stock levels', 'Departmental procurement workflows', 'Automated invoicing & financial auditing', 'Multi-location branch coordination'],
    techs: ['Java Spring Boot', 'PostgreSQL', 'React', 'Docker']
  },
  {
    id: 'hospital-management',
    title: 'Hospital Management Systems',
    category: 'Enterprise Solutions',
    icon: HeartPulse,
    shortDesc: 'Clinical scheduling, electronic medical records (EMR), and pharmacy inventory management.',
    longDesc: 'Secure, privacy-oriented healthcare software engineered for outpatient clinics, diagnostic centers, and multi-specialty hospitals.',
    features: ['Patient appointment scheduling', 'Digital prescription & EMR records', 'Pharmacy stock & billing coordination', 'Role-based doctor & nurse dashboards'],
    techs: ['React', 'Spring Boot', 'PostgreSQL', 'Docker']
  },
  {
    id: 'school-management',
    title: 'School/College Management Systems',
    category: 'Enterprise Solutions',
    icon: GraduationCap,
    shortDesc: 'Student information systems, academic gradebooks, attendance tracking, and fee collection.',
    longDesc: 'Digital administration platforms for schools and academic institutions. Coordinates admissions, student rosters, exam schedules, and parent communication.',
    features: ['Student roster & attendance records', 'Curriculum timetable & exam grading', 'Tuition fee collection & receipting', 'Parent notification portals'],
    techs: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS']
  },
  {
    id: 'ecommerce-solutions',
    title: 'E-commerce Solutions',
    category: 'Web Platforms',
    icon: ShoppingBag,
    shortDesc: 'Custom digital storefronts, shopping carts, payment gateways, and inventory synchronization.',
    longDesc: 'High-converting e-commerce web applications with lightning-fast catalog search, optimized checkout flows, payment processing, and order management.',
    features: ['Catalog indexing & search filters', 'Secure checkout & payment gateways', 'Automated order notification emails', 'Inventory decrement locks & reconciliation'],
    techs: ['Next.js', 'Stripe', 'Node.js', 'PostgreSQL', 'Redis']
  },
  {
    id: 'maintenance-support',
    title: 'Maintenance & Technical Support',
    category: 'Operations',
    icon: Wrench,
    shortDesc: 'Proactive server monitoring, vulnerability patching, database optimization, and SLA-backed support.',
    longDesc: 'Ongoing operational reliability for mission-critical software. We ensure uptime, apply security patches, optimize slow SQL queries, and roll out feature updates.',
    features: ['Server health & uptime monitoring', 'Database index tuning & vacuuming', 'Framework & library vulnerability updates', 'SLA-backed bug resolution response times'],
    techs: ['Linux', 'PostgreSQL', 'Docker', 'Prometheus', 'Grafana']
  }
];

/**
 * Verified Technology Stack by Category
 */
export const techStackData = {
  frontend: [
    { name: 'React', desc: 'Component architecture & reactive UI', level: 'Core' },
    { name: 'Next.js', desc: 'Server-side rendering & static generation', level: 'Core' },
    { name: 'TypeScript', desc: 'Type-safe frontend development', level: 'Core' },
    { name: 'Tailwind CSS', desc: 'Utility-first modern design systems', level: 'Core' },
    { name: 'Vite', desc: 'Next-generation lightning-fast frontend build tooling', level: 'Core' }
  ],
  backend: [
    { name: 'Java 21', desc: 'Modern LTS Java with Virtual Threads', level: 'Core' },
    { name: 'Spring Boot 3', desc: 'Enterprise microservices & REST APIs', level: 'Core' },
    { name: 'Node.js / Express', desc: 'High-throughput event-driven servers', level: 'Core' },
    { name: 'Hibernate / JPA', desc: 'Object-relational mapping & transactions', level: 'Core' },
    { name: 'Spring Security', desc: 'JWT token validation & role-based RBAC', level: 'Core' }
  ],
  databases: [
    { name: 'PostgreSQL', desc: 'Primary relational enterprise database', level: 'Core' },
    { name: 'MySQL', desc: 'Standard relational ACID storage', level: 'Supported' },
    { name: 'MongoDB', desc: 'Document store for unstructured feeds', level: 'Supported' },
    { name: 'Redis', desc: 'In-memory caching and session store', level: 'Supported' }
  ],
  mobile: [
    { name: 'React Native', desc: 'Cross-platform iOS and Android builds', level: 'Core' },
    { name: 'Flutter', desc: 'High-fidelity compiled mobile interfaces', level: 'Supported' }
  ],
  aiMl: [
    { name: 'Python', desc: 'Data modeling & ML pipeline development', level: 'Core' },
    { name: 'FastAPI', desc: 'Low-latency ML model serving', level: 'Core' },
    { name: 'OpenAI / Anthropic APIs', desc: 'LLM integration and document assistants', level: 'Core' }
  ],
  cloudDevops: [
    { name: 'Docker', desc: 'Containerization & isolated environments', level: 'Core' },
    { name: 'Kubernetes', desc: 'Container orchestration & self-healing', level: 'Supported' },
    { name: 'AWS Cloud', desc: 'EC2, S3, RDS, CloudFront infrastructure', level: 'Core' },
    { name: 'GitHub Actions', desc: 'Continuous integration and automated deploys', level: 'Core' },
    { name: 'Linux / Ubuntu', desc: 'Server administration and hardening', level: 'Core' }
  ]
};

/**
 * Verified Projects & Case Studies
 */
export const projectsData = [
  {
    id: 1,
    title: 'PulseCare EMR Platform',
    category: 'Healthcare',
    clientName: 'Regional Health Network',
    description: 'A clinical management and electronic health records system providing doctor scheduling, encrypted patient history records, and pharmacy dispensary sync.',
    challenge: 'Legacy paperwork slowed patient triage times, and disconnected clinic records led to duplicate testing and scheduling bottlenecks.',
    solution: 'Engineered a unified Spring Boot & React platform with PostgreSQL data persistence, encrypted medical record logs, and real-time appointment availability.',
    technologies: ['Java 21', 'Spring Boot 3', 'PostgreSQL', 'React', 'Docker'],
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    outcome: 'Cut patient check-in wait times by 40% and eliminated manual physical record transfers across 3 clinical branches.'
  },
  {
    id: 2,
    title: 'ApexFlow Enterprise ERP',
    category: 'Enterprise Solutions',
    clientName: 'Industrial Components Corp',
    description: 'Centralized resource management platform coordinating warehouse inventory balances, purchase orders, multi-warehouse stock shifts, and audit logs.',
    challenge: 'Multi-warehouse stock discrepancies caused frequent inventory stockouts and manual reconciliation required days of effort at month-end.',
    solution: 'Designed a high-throughput Java Spring Boot backend paired with an accessible web dashboard for barcode auditing, supplier orders, and real-time balance calculations.',
    technologies: ['Spring Boot', 'PostgreSQL', 'React', 'Tailwind CSS', 'Docker'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    outcome: 'Eliminated inventory balance discrepancies and slashed monthly reconciliation cycles from 5 days to 2 hours.'
  },
  {
    id: 3,
    title: 'EduCore Academic Portal',
    category: 'Education',
    clientName: 'City Polytechnic Institute',
    description: 'Comprehensive campus management platform handling student admissions, course timetable scheduling, semester gradebooks, and fee invoicing.',
    challenge: 'Admissions and fee tracking were maintained across spreadsheets, causing payment verification delays and student registration logjams.',
    solution: 'Constructed an integrated React web portal with role-based access for students, faculty, and accountants, with automated invoice generation.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    outcome: 'Successfully processed 4,500+ semester student enrollments with zero payment reconciliation errors.'
  },
  {
    id: 4,
    title: 'SwiftLogix Freight Dispatcher',
    category: 'Logistics & Supply Chain',
    clientName: 'Metro Logistics Group',
    description: 'Real-time fleet route dispatcher and consignment delivery tracker with driver mobile portal and customer notification triggers.',
    challenge: 'Dispatchers struggled with real-time consignment status updates, leading to constant manual customer support calls.',
    solution: 'Implemented a lightweight API-driven dispatch application with responsive mobile interfaces, route tracking, and automated milestone SMS alerts.',
    technologies: ['React', 'Java Spring Boot', 'PostgreSQL', 'AWS'],
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    outcome: 'Reduced customer support inquiry volume by 65% through self-service delivery tracking.'
  }
];

/**
 * 4-Stage Development Process
 */
export const processSteps = [
  {
    step: '01',
    title: 'Discover',
    desc: 'Deep-dive analysis into business requirements, operational workflows, and existing technical constraints.'
  },
  {
    step: '02',
    title: 'Plan',
    desc: 'Architecting system data models, selecting the optimal tech stack, defining API schemas, and agreeing upon release milestones.'
  },
  {
    step: '03',
    title: 'Develop',
    desc: 'Building type-safe backends and reactive frontends with comprehensive code reviews and automated tests.'
  },
  {
    step: '04',
    title: 'Deploy & Support',
    desc: 'Containerized deployment to production cloud infrastructure with continuous monitoring and agreed maintenance.'
  }
];

/**
 * Verified Available Careers
 */
export const careersData = [
  {
    id: 1,
    title: 'Senior Java Spring Boot Engineer',
    department: 'Backend Engineering',
    type: 'Full-time',
    location: 'Remote / Hybrid (India)',
    experience: '3 - 6 Years',
    overview: 'Lead the architecture and development of enterprise Java 21 & Spring Boot 3 backends for scalable web applications.',
    requirements: [
      'Strong hands-on experience with Java 17/21, Spring Boot 3, and Spring Data JPA.',
      'Proficiency with relational database modeling in PostgreSQL or MySQL.',
      'Solid understanding of Spring Security, JWT authentication, and REST API best practices.',
      'Familiarity with Docker, Maven, and Linux server environments.'
    ]
  },
  {
    id: 2,
    title: 'Full Stack React & Node Developer',
    department: 'Web Engineering',
    type: 'Full-time',
    location: 'Remote (India)',
    experience: '2 - 4 Years',
    overview: 'Develop modern, responsive web portals using React, TypeScript, Tailwind CSS, and Node.js/Express APIs.',
    requirements: [
      'Proven experience building clean, maintainable user interfaces with React and Tailwind CSS.',
      'Familiarity with state management, Axios API integrations, and responsive layout design.',
      'Experience building RESTful endpoints with Node.js and Express.',
      'Understanding of Git workflows and frontend build optimization with Vite.'
    ]
  },
  {
    id: 3,
    title: 'UI/UX & Product Designer',
    department: 'Product Design',
    type: 'Full-time / Contract',
    location: 'Remote',
    experience: '2 - 5 Years',
    overview: 'Craft human-designed, elegant digital interfaces, comprehensive Figma design systems, and seamless user experiences.',
    requirements: [
      'Expertise in Figma, design systems, typography hierarchy, and UI component structures.',
      'Experience designing enterprise dashboards, B2B workflows, and responsive web portals.',
      'Strong visual aesthetic emphasizing clean whitespace, accessibility, and purposeful micro-interactions.'
    ]
  }
];

/**
 * Industries Served
 */
export const industriesData = [
  {
    id: 'healthcare',
    title: 'Healthcare & HealthTech',
    desc: 'HIPAA-conscious EMR systems, patient scheduling software, and pharmacy inventory workflows.',
    icon: HeartPulse
  },
  {
    id: 'enterprise',
    title: 'Enterprise & ERP',
    desc: 'Operations management, supply chain coordination, multi-branch bookkeeping, and asset tracking.',
    icon: Layers
  },
  {
    id: 'education',
    title: 'Education & EdTech',
    desc: 'Institutional administration, student grading portals, campus fee collections, and digital classrooms.',
    icon: GraduationCap
  },
  {
    id: 'retail',
    title: 'Retail & E-commerce',
    desc: 'Custom digital storefronts, shopping carts, automated order fulfillment, and inventory synchronization.',
    icon: ShoppingBag
  },
  {
    id: 'logistics',
    title: 'Logistics & Distribution',
    desc: 'Consignment tracking, delivery dispatch portals, warehouse stock auditing, and supplier manifests.',
    icon: Globe
  },
  {
    id: 'finance',
    title: 'Finance & Operations',
    desc: 'Automated invoice generation, payment gateway bridges, ledger balance locks, and audit histories.',
    icon: BarChart3
  }
];
