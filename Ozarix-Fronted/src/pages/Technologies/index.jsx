import React from 'react';
import { 
  Laptop, Server, Database, Smartphone, 
  BrainCircuit, Cloud, Check, ShieldCheck, 
  Terminal, ArrowRight, Layers
} from 'lucide-react';
import { techStackData } from '../../config/mockData';
import SectionHeading from '../../components/common/SectionHeading';
import Button from '../../components/common/Button';
import digitalInnovationBg from '../../assets/digital-innovation-bg.jpg';

const Technologies = () => {
  const categories = [
    {
      id: 'backend',
      title: 'Backend & System Architecture',
      icon: Server,
      desc: 'Type-safe enterprise backends engineered with Java 21, Spring Boot 3, and Node.js for high throughput, strict transactional consistency, and bank-grade authentication.',
      items: techStackData.backend
    },
    {
      id: 'frontend',
      title: 'Frontend & Web Platforms',
      icon: Laptop,
      desc: 'Reactive, accessible user interfaces developed with React 19, Next.js, and TypeScript, optimized for sub-second Core Web Vitals and clean state management.',
      items: techStackData.frontend
    },
    {
      id: 'databases',
      title: 'Relational & Structured Databases',
      icon: Database,
      desc: 'Robust data modeling using PostgreSQL as our primary enterprise ACID engine, alongside MySQL, Redis caching layers, and document stores.',
      items: techStackData.databases
    },
    {
      id: 'mobile',
      title: 'Mobile App Development',
      icon: Smartphone,
      desc: 'Cross-platform mobile engineering with React Native and Flutter, featuring offline SQLite synchronization, biometric authentication, and native bridges.',
      items: techStackData.mobile
    },
    {
      id: 'aiMl',
      title: 'AI & Machine Learning Systems',
      icon: BrainCircuit,
      desc: 'Practical AI implementations focusing on automated document processing, semantic search, FastAPI model serving, and enterprise LLM integrations.',
      items: techStackData.aiMl
    },
    {
      id: 'cloudDevops',
      title: 'Cloud Infrastructure & DevOps',
      icon: Cloud,
      desc: 'Containerized deployments with Docker, automated CI/CD via GitHub Actions, Linux server hardening, and scalable AWS cloud architectures.',
      items: techStackData.cloudDevops
    }
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen py-16 transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <SectionHeading
          tag="Technology Standards"
          title="Battle-Tested Engineering"
          highlightText="Stack"
          subtext="We deliberately select technologies that provide long-term reliability, active ecosystem support, and enterprise performance."
        />

        {/* Stack Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="bg-white dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 rounded-xl p-6 flex flex-col justify-between space-y-6 shadow-sm dark:shadow-none hover:shadow-md transition-shadow"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                    <div className="h-10 w-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {cat.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {cat.desc}
                  </p>

                  <div className="space-y-2.5 pt-2">
                    {cat.items.map((tech, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800/80 flex items-start justify-between gap-2"
                      >
                        <div>
                          <strong className="text-xs font-semibold text-slate-900 dark:text-white block">
                            {tech.name}
                          </strong>
                          <span className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight block">
                            {tech.desc}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono uppercase bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-900/50 px-2 py-0.5 rounded flex-shrink-0">
                          {tech.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <span>Production Verified at Ozarix</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Architectural Principles Banner (Selected Technology Section with Innovation Background) */}
        <div 
          className="relative rounded-2xl p-8 sm:p-10 space-y-6 overflow-hidden border border-slate-800 shadow-xl bg-[#030C1C]"
          style={{
            backgroundImage: `url(${digitalInnovationBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Subtle Dark Navy Overlay for Crisp Text Contrast */}
          <div 
            className="absolute inset-0 pointer-events-none" 
            style={{ backgroundColor: 'rgba(3, 12, 28, 0.45)' }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-2xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-blue-300 bg-blue-950/80 border border-blue-500/40 px-2.5 py-1 rounded-md backdrop-blur-sm mb-3">
              Technology Evaluation Criteria
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-sm">
              Why We Avoid Chasing Every Fleeting Framework
            </h3>
            <p className="text-sm text-slate-200 mt-2 leading-relaxed drop-shadow-sm">
              We evaluate tools based on three criteria: operational stability, community maturity, and backward compatibility. By pairing Java 21 LTS with modern React and PostgreSQL, we guarantee your software remains maintainable and serviceable for years to come.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-700/60 text-xs">
            <div className="p-4 bg-slate-950/80 backdrop-blur-md rounded-lg border border-slate-800 shadow-md">
              <strong className="text-white block font-semibold mb-1">Type Safety & Contracts</strong>
              <p className="text-slate-300">Strict compile-time verification across backend APIs and frontend models.</p>
            </div>
            <div className="p-4 bg-slate-950/80 backdrop-blur-md rounded-lg border border-slate-800 shadow-md">
              <strong className="text-white block font-semibold mb-1">ACID Compliance</strong>
              <p className="text-slate-300">Zero data loss or corrupt states through PostgreSQL transactional isolation.</p>
            </div>
            <div className="p-4 bg-slate-950/80 backdrop-blur-md rounded-lg border border-slate-800 shadow-md">
              <strong className="text-white block font-semibold mb-1">Container Portability</strong>
              <p className="text-slate-300">Dockerized environments ensuring parity across development, staging, and production.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <Button to="/contact" variant="primary">
            <span>Inquire About Our Architecture Capabilities</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

      </div>
    </div>
  );
};

export default Technologies;
