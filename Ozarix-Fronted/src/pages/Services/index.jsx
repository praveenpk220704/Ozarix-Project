import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Search, Check, Layers, Laptop, Smartphone,
  Server, Cpu, Cloud, Palette, Globe, Wrench, Network,
  GraduationCap, HeartPulse, ShoppingBag, Settings, X
} from 'lucide-react';
import { servicesData } from '../../config/mockData';
import { servicesService } from '../../services/apiService';
import SectionHeading from '../../components/common/SectionHeading';
import Badge from '../../components/common/Badge';

const Services = () => {
  const [services, setServices] = useState(servicesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalService, setActiveModalService] = useState(null);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await servicesService.getAllServices();
        if (Array.isArray(data) && data.length > 0) {
          // Merge API services into the 14 standard services
          const backendMapped = data.map((item, idx) => ({
            id: `api-service-${item.id}`,
            title: item.serviceName,
            category: 'Engineering',
            icon: Laptop,
            shortDesc: item.description || 'Enterprise software capability.',
            longDesc: item.description || 'Full-cycle engineering solutions with clean architecture.',
            features: ['Robust API architecture', 'Automated testing suites', 'Production deployment'],
            techs: ['Java Spring Boot', 'React', 'PostgreSQL']
          }));
          const merged = [
            ...backendMapped,
            ...servicesData.filter(s => !backendMapped.some(b => b.title.toLowerCase() === s.title.toLowerCase()))
          ];
          setServices(merged);
        }
      } catch (err) {
        // Fall back to verified servicesData
        setServices(servicesData);
      }
    };
    loadServices();
  }, []);

  const categories = ['All', 'Engineering', 'Frontend & Full Stack', 'Mobile', 'Backend', 'Enterprise Solutions', 'Operations'];

  const filteredServices = services.filter((s) => {
    const matchesSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.shortDesc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory ||
                            (selectedCategory === 'Engineering' && ['Core Development', 'Engineering'].includes(s.category));
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen py-16 transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <SectionHeading
          tag="Service Portfolio"
          title="Complete Engineering"
          highlightText="Capabilities"
          subtext="From custom enterprise platforms and Java Spring Boot architectures to mobile and cloud systems."
        />

        {/* Filter & Search Bar */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm dark:shadow-none">
          
          {/* Categories */}
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search services or tech..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>

        </div>

        {/* Services Grid (All 14 Offerings) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const Icon = service.icon || Laptop;
            return (
              <div
                key={service.id}
                className="bg-white dark:bg-slate-900/70 border border-slate-200/90 dark:border-slate-800 rounded-xl p-6 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all flex flex-col justify-between group shadow-sm dark:shadow-none"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="h-11 w-11 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded">
                      {service.category || 'Engineering'}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                      {service.shortDesc}
                    </p>
                  </div>

                  {service.features && (
                    <ul className="space-y-1.5 pt-2 text-xs text-slate-600 dark:text-slate-400">
                      {service.features.slice(0, 3).map((feat, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-500 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {service.techs?.slice(0, 2).map((tech, i) => (
                      <span key={i} className="text-[10px] font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-950 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => setActiveModalService(service)}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>View Specs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <p className="text-slate-500 dark:text-slate-400 text-sm">No services matched your search criteria.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
              className="mt-3 text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Service Details Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative shadow-2xl">
            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 px-2.5 py-0.5 rounded inline-block">
                {activeModalService.category || 'Service Architecture'}
              </span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                {activeModalService.title}
              </h3>
            </div>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {activeModalService.longDesc || activeModalService.shortDesc}
            </p>

            {activeModalService.features && (
              <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Deliverables & Architectural Features
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  {activeModalService.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeModalService.techs && (
              <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Recommended Technology Stack
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeModalService.techs.map((tech, i) => (
                    <span key={i} className="text-xs font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-950 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-800">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
              <button
                onClick={() => setActiveModalService(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                Close
              </button>
              <Link
                to="/contact"
                className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm"
              >
                Inquire About This Service
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Services;
