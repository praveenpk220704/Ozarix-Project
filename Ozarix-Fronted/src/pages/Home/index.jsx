import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, CheckCircle2, Terminal, Database, 
  Code2, Server, ArrowUpRight, Laptop,
  Check, AlertCircle, Loader2, Phone, Mail, Clock
} from 'lucide-react';
import { servicesData, techStackData, projectsData, processSteps } from '../../config/mockData';
import { contactService, servicesService } from '../../services/apiService';
import SectionHeading from '../../components/common/SectionHeading';
import Button from '../../components/common/Button';
import digitalInnovationBg from '../../assets/digital-innovation-bg.jpg';

const Home = () => {
  // Live services from backend if available, fallback to verified servicesData
  const [displayServices, setDisplayServices] = useState(servicesData.slice(0, 6));
  
  // Real contact form state
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Custom Software Development',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Attempt to load dynamic services from Spring Boot API
    const fetchServices = async () => {
      try {
        const data = await servicesService.getAllServices();
        if (Array.isArray(data) && data.length > 0) {
          // Map backend services to match display structure
          const mapped = data.map((item, idx) => ({
            id: `service-${item.id}`,
            title: item.serviceName,
            category: 'Engineering',
            icon: idx % 2 === 0 ? Server : Laptop,
            shortDesc: item.description || 'Enterprise-grade custom software engineering.',
            techs: ['Java Spring Boot', 'React', 'PostgreSQL']
          }));
          // Merge with canonical data to ensure rich presentation
          const combined = [...mapped, ...servicesData.filter(s => !mapped.some(m => m.title.toLowerCase() === s.title.toLowerCase()))];
          setDisplayServices(combined.slice(0, 6));
        }
      } catch (err) {
        // Fallback to verified local servicesData if backend is unreachable or empty
        setDisplayServices(servicesData.slice(0, 6));
      }
    };
    fetchServices();
  }, []);

  const validateForm = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full name is required.';
    
    if (!form.email.trim()) {
      errs.email = 'Email address is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email.trim())) {
        errs.email = 'Please enter a valid email address.';
      }
    }

    if (!form.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else {
      const cleanPhone = form.phone.replace(/\D/g, '');
      if (cleanPhone.length !== 10) {
        errs.phone = 'Phone number must contain exactly 10 digits.';
      }
    }

    if (!form.service) {
      errs.service = 'Please select a service category.';
    }

    if (!form.message.trim()) {
      errs.message = 'Please provide a short summary of your requirements.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    if (!validateForm()) return;

    setLoading(true);
    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        subject: `[Web Inquiry] ${form.service}`,
        service: form.service,
        message: form.message.trim()
      };

      await contactService.submitContact(payload);

      setStatus({
        type: 'success',
        message: 'Thank you! Your project request has been transmitted directly to our engineering leads. We will review and contact you within 24 hours.'
      });

      setForm({
        name: '',
        email: '',
        phone: '',
        service: 'Custom Software Development',
        message: ''
      });
      setErrors({});
    } catch (err) {
      console.error('Contact submission error:', err);
      const serverMsg = err.response?.data?.message || err.response?.data || 'Failed to submit inquiry. Please verify your details and try again.';
      setStatus({
        type: 'error',
        message: typeof serverMsg === 'string' ? serverMsg : 'Submission failed. Please check the form fields.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-150">
      
      {/* 1. HERO SECTION (Split Cinematic Layout with Digital Innovation Background) */}
      <section 
        className="relative pt-28 pb-20 lg:pt-36 lg:pb-32 border-b border-slate-800/80 overflow-hidden bg-[#030C1C]"
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/80 border border-blue-500/40 text-xs font-semibold uppercase tracking-wider text-blue-300 backdrop-blur-sm shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                <span>Technology • Innovation • Real Impact</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] drop-shadow-sm">
                Building Technology <br className="hidden sm:inline" />
                That Creates <span className="text-blue-400">Real Value</span>
              </h1>

              {/* Supporting Subtext */}
              <p className="text-base sm:text-xl text-slate-200 font-normal leading-relaxed max-w-2xl drop-shadow-sm">
                OZARIX TECHNOLOGY engineers mission-critical enterprise software, scalable Java Spring Boot architectures, modern web & mobile platforms, and AI-powered operational systems designed for durability.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button to="/contact" size="lg" variant="primary">
                  <span>Start a Project</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button 
                  to="/portfolio" 
                  size="lg" 
                  variant="secondary"
                  className="bg-slate-900/80 hover:bg-slate-800 text-white border-slate-700/80 backdrop-blur-sm"
                >
                  <span>Explore Our Work</span>
                  <ArrowUpRight className="w-4 h-4 ml-1.5 text-slate-300" />
                </Button>
              </div>

              {/* Value Badges */}
              <div className="pt-6 border-t border-slate-700/60 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>Enterprise Spring Boot 3</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>Modern React 19 Frontend</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>PostgreSQL ACID Systems</span>
                </div>
              </div>

            </div>

            {/* Right Hero Visual: Realistic Developer Workspace / Operational Dashboard */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-slate-950/90 border border-slate-700/80 shadow-2xl backdrop-blur-md overflow-hidden">
                
                {/* IDE / Window Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-rose-500/80"></span>
                    <span className="h-3 w-3 rounded-full bg-amber-500/80"></span>
                    <span className="h-3 w-3 rounded-full bg-emerald-500/80"></span>
                    <span className="ml-2 font-mono text-[11px] text-slate-300">ozarix-enterprise-core.service</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-900/60 px-2 py-0.5 rounded">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                    <span>PRODUCTION ACTIVE</span>
                  </div>
                </div>

                {/* Dashboard Metrics Bar */}
                <div className="grid grid-cols-3 gap-px bg-slate-800 text-xs">
                  <div className="p-3 bg-slate-900 text-center">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block">API Response</span>
                    <span className="font-mono font-bold text-white text-sm">24 ms</span>
                  </div>
                  <div className="p-3 bg-slate-900 text-center">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Uptime SLA</span>
                    <span className="font-mono font-bold text-emerald-400 text-sm">99.98%</span>
                  </div>
                  <div className="p-3 bg-slate-900 text-center">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Data Integrity</span>
                    <span className="font-mono font-bold text-blue-400 text-sm">100% ACID</span>
                  </div>
                </div>

                {/* Code & Architectural Snippet */}
                <div className="p-4 bg-slate-950 font-mono text-xs text-slate-300 space-y-1.5 overflow-x-auto leading-relaxed border-b border-slate-800">
                  <div className="text-slate-400">// Spring Boot 3 Enterprise Controller</div>
                  <div className="text-blue-400">@RestController</div>
                  <div className="text-blue-400">@RequestMapping(<span className="text-emerald-400">"/api/enterprise"</span>)</div>
                  <div><span className="text-indigo-400">public class</span> <span className="text-amber-300">SystemKernel</span> &#123;</div>
                  <div className="pl-4 text-slate-400">@Autowired <span className="text-slate-200">private TelemetryService telemetry;</span></div>
                  <div className="pl-4"><span className="text-blue-400">@PostMapping</span>(<span className="text-emerald-400">"/deploy"</span>)</div>
                  <div className="pl-4"><span className="text-indigo-400">public</span> ResponseEntity&lt;AuditLog&gt; executePipeline() &#123;</div>
                  <div className="pl-8 text-slate-300">return ResponseEntity.ok(telemetry.dispatch());</div>
                  <div className="pl-4">&#125;</div>
                  <div>&#125;</div>
                </div>

                {/* Live Node Health Footer */}
                <div className="p-3.5 bg-slate-900/90 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-blue-400" />
                    <span className="font-mono text-[11px]">JVM Virtual Threads: Enabled</span>
                  </div>
                  <span className="text-[11px] text-slate-400">Java 21 LTS</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 2. CORE SERVICES OVERVIEW */}
      <section className="py-20 lg:py-24 bg-white dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 px-2.5 py-1 rounded-md inline-block mb-3">
                Capabilities
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Engineered for Real-World Demands
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-base mt-2 max-w-xl">
                We design and build production-ready software systems with strict standards for performance, security, and scalability.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                <span>View All 14 Services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayServices.map((service) => {
              const IconComponent = service.icon || Laptop;
              return (
                <div
                  key={service.id}
                  className="bg-slate-50/70 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 rounded-xl p-6 hover:border-blue-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-900 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="h-11 w-11 rounded-lg bg-blue-100/70 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                        {service.shortDesc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {service.techs?.slice(0, 2).map((t, i) => (
                        <span key={i} className="text-[11px] font-mono text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-950 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                          {t}
                        </span>
                      ))}
                    </div>
                    <Link
                      to="/services"
                      className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. EDITORIAL ABOUT SECTION */}
      <section className="py-20 lg:py-24 border-b border-slate-200 dark:border-slate-900 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual / Office & Architecture */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl group">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
                  alt="Ozarix Engineering Team Collaborating"
                  className="w-full h-80 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-sm border border-slate-800 text-white">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Full-Lifecycle Engineering</h4>
                      <p className="text-xs text-slate-300">From architectural discovery to zero-downtime releases</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Editorial Copy */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 px-2.5 py-1 rounded-md inline-block">
                About Ozarix Technology
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
                Solving Complex Business Challenges with Engineering Discipline
              </h2>

              <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed">
                OZARIX TECHNOLOGY was founded on a simple conviction: technology should create tangible, measurable business outcomes. We do not build bloated software or deliver untested code.
              </p>

              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Whether deploying an enterprise hospital workflow, consolidating multi-branch warehouse logistics through custom ERP systems, or designing a high-conversion modern web application, our engineers bring rigorous architectural principles, clean APIs, and transparent communication to every engagement.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-lg bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">Architecture-First Design</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Relational schema validation, type safety, and clean separation of concerns.</p>
                </div>
                <div className="p-4 rounded-lg bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">Direct Senior Involvement</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Work directly with experienced backend and frontend engineers on every milestone.</p>
                </div>
              </div>

              <div className="pt-2">
                <Button to="/about" variant="outline">
                  <span>Learn More About Our Firm</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. VERIFIED TECHNOLOGY MATRIX (Selected Technology Section with Innovation Background) */}
      <section 
        className="relative py-20 lg:py-24 border-b border-slate-800 overflow-hidden bg-[#030C1C]"
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Tech Stack"
            title="Modern, Battle-Tested"
            highlightText="Technologies"
            subtext="We build with proven languages, frameworks, and cloud platforms engineered for maintainability and performance."
            invert={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Frontend */}
            <div className="bg-slate-950/80 backdrop-blur-md border border-slate-800/90 rounded-xl p-6 space-y-4 shadow-xl hover:border-blue-500/50 transition-all">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800 text-white font-bold text-base">
                <Laptop className="w-5 h-5 text-blue-400" />
                <span>Frontend Architecture</span>
              </div>
              <ul className="space-y-3">
                {techStackData.frontend.map((t, idx) => (
                  <li key={idx} className="flex items-start justify-between text-xs">
                    <div>
                      <span className="font-semibold text-white block">{t.name}</span>
                      <span className="text-slate-300 text-[11px]">{t.desc}</span>
                    </div>
                    <span className="text-[10px] font-mono uppercase bg-blue-950/80 px-2 py-0.5 rounded text-blue-300 border border-blue-800/80">
                      {t.level}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Backend */}
            <div className="bg-slate-950/80 backdrop-blur-md border border-slate-800/90 rounded-xl p-6 space-y-4 shadow-xl hover:border-indigo-500/50 transition-all">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800 text-white font-bold text-base">
                <Server className="w-5 h-5 text-indigo-400" />
                <span>Backend & APIs</span>
              </div>
              <ul className="space-y-3">
                {techStackData.backend.map((t, idx) => (
                  <li key={idx} className="flex items-start justify-between text-xs">
                    <div>
                      <span className="font-semibold text-white block">{t.name}</span>
                      <span className="text-slate-300 text-[11px]">{t.desc}</span>
                    </div>
                    <span className="text-[10px] font-mono uppercase bg-indigo-950/80 px-2 py-0.5 rounded text-indigo-300 border border-indigo-800/80">
                      {t.level}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Databases & Cloud */}
            <div className="bg-slate-950/80 backdrop-blur-md border border-slate-800/90 rounded-xl p-6 space-y-4 shadow-xl hover:border-emerald-500/50 transition-all">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800 text-white font-bold text-base">
                <Database className="w-5 h-5 text-emerald-400" />
                <span>Databases & Cloud</span>
              </div>
              <ul className="space-y-3">
                {[...techStackData.databases, ...techStackData.cloudDevops.slice(0, 1)].map((t, idx) => (
                  <li key={idx} className="flex items-start justify-between text-xs">
                    <div>
                      <span className="font-semibold text-white block">{t.name}</span>
                      <span className="text-slate-300 text-[11px]">{t.desc}</span>
                    </div>
                    <span className="text-[10px] font-mono uppercase bg-emerald-950/80 px-2 py-0.5 rounded text-emerald-300 border border-emerald-800/80">
                      {t.level}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          <div className="mt-8 text-center">
            <Link
              to="/technologies"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-300 hover:text-white transition-colors"
            >
              <span>Explore complete technology stack & engineering criteria</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. FEATURED PORTFOLIO / CASE STUDIES */}
      <section className="py-20 lg:py-24 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 px-2.5 py-1 rounded-md inline-block mb-3">
                Portfolio
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Featured Case Studies
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-base mt-2 max-w-xl">
                Real enterprise solutions designed, developed, and deployed to production.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                <span>View Full Portfolio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projectsData.slice(0, 2).map((project) => (
              <div
                key={project.id}
                className="bg-white dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 rounded-xl overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="h-56 w-full overflow-hidden relative">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className="text-xs font-semibold bg-slate-900/90 text-blue-400 border border-slate-800 px-2.5 py-1 rounded-md backdrop-blur-sm">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="p-3 bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 rounded-lg text-xs space-y-1">
                      <span className="text-slate-500 dark:text-slate-400 font-semibold block uppercase tracking-wider text-[10px]">Outcome:</span>
                      <p className="text-emerald-600 dark:text-emerald-400 font-medium">{project.outcome}</p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="text-[11px] font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-950 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    to="/portfolio"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-white transition-colors"
                  >
                    <span>Read Full Implementation Specs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. FOUR-STAGE DEVELOPMENT PROCESS */}
      <section className="py-20 lg:py-24 bg-white dark:bg-slate-900/30 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Methodology"
            title="Our Four-Stage"
            highlightText="Development Process"
            subtext="A predictable, transparent engineering lifecycle designed to eliminate uncertainty."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="bg-slate-50/70 dark:bg-slate-900/70 border border-slate-200/90 dark:border-slate-800 rounded-xl p-6 relative flex flex-col justify-between shadow-sm"
              >
                <div>
                  <span className="font-mono text-2xl font-black text-blue-600 dark:text-blue-500 mb-3 block">
                    {step.step}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Milestone Verified</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. REAL CONTACT AND INQUIRY SECTION */}
      <section id="contact-inquiry" className="py-20 lg:py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Contact Info */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 px-2.5 py-1 rounded-md inline-block">
                Start a Conversation
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Let's Discuss Your Software Architecture
              </h2>

              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Send us your project goals, technical specs, or integration requirements. Our senior engineering leads will evaluate your scope and respond with a structured feasibility breakdown.
              </p>

              <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-900 text-sm">
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <div className="h-9 w-9 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">Engineering Inquiries</span>
                    <a href="mailto:contact@ozarix.tech" className="font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      contact@ozarix.tech
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <div className="h-9 w-9 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">Hotline Support</span>
                    <span className="font-semibold text-slate-900 dark:text-white">+91 98765 43210</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <div className="h-9 w-9 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">Turnaround Time</span>
                    <span className="font-semibold text-slate-900 dark:text-white">Direct response within 24 business hours</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/consultation"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-white"
                >
                  <span>Need a detailed consultation with calendar time slot? Click here</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>

            {/* Right Contact Form (Live POST /api/contact) */}
            <div className="lg:col-span-7">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
                
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                  Project Inquiry Form
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                  Submitted directly to the OZARIX Spring Boot backend inquiry processor.
                </p>

                {status.message && (
                  <div
                    className={`p-4 rounded-lg mb-6 text-sm flex items-start gap-3 ${
                      status.type === 'success'
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                        : 'bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300'
                    }`}
                  >
                    {status.type === 'success' ? (
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
                    )}
                    <span className="leading-relaxed">{status.message}</span>
                  </div>
                )}

                <form onSubmit={handleContactSubmit} className="space-y-4">
                  
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${
                          errors.name ? 'border-rose-500' : 'border-slate-300 dark:border-slate-800 focus:border-blue-500'
                        }`}
                      />
                      {errors.name && <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Work Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="e.g. rahul@company.com"
                        className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${
                          errors.email ? 'border-rose-500' : 'border-slate-300 dark:border-slate-800 focus:border-blue-500'
                        }`}
                      />
                      {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Phone & Service Required Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Phone (10 Digits) <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="e.g. 9876543210"
                        maxLength={10}
                        className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${
                          errors.phone ? 'border-rose-500' : 'border-slate-300 dark:border-slate-800 focus:border-blue-500'
                        }`}
                      />
                      {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Primary Service Required <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Custom Software Development">Custom Software Development</option>
                        <option value="Java Spring Boot Development">Java Spring Boot Development</option>
                        <option value="Web Application Development">Web Application Development</option>
                        <option value="Mobile App Development">Mobile App Development</option>
                        <option value="Enterprise ERP Systems">Enterprise ERP Systems</option>
                        <option value="Hospital Management Systems">Hospital Management Systems</option>
                        <option value="Cloud & DevOps Infrastructure">Cloud & DevOps Infrastructure</option>
                        <option value="AI & Machine Learning">AI & Machine Learning</option>
                      </select>
                    </div>
                  </div>

                  {/* Project Description / Message */}
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Project Description & Requirements <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Outline the core objective, expected user volume, timeline targets, or technical stack preferences..."
                      className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-950 border rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${
                        errors.message ? 'border-rose-500' : 'border-slate-300 dark:border-slate-800 focus:border-blue-500'
                      }`}
                    ></textarea>
                    {errors.message && <p className="text-[11px] text-rose-500 mt-1">{errors.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 px-6 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting to Backend API...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Project Inquiry</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                </form>

              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
