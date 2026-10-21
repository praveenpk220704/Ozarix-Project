import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, ExternalLink, Code2, CheckCircle, 
  Layers, Database, ShieldCheck, X, Laptop, ArrowUpRight
} from 'lucide-react';
import { projectsData } from '../../config/mockData';
import { portfolioService } from '../../services/apiService';
import SectionHeading from '../../components/common/SectionHeading';
import Badge from '../../components/common/Badge';

const Portfolio = () => {
  const [projects, setProjects] = useState(projectsData);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await portfolioService.getAllPortfolio();
        if (Array.isArray(data) && data.length > 0) {
          const apiProjects = data.map((item) => ({
            id: `api-proj-${item.id}`,
            title: item.projectTitle,
            category: item.category || 'Enterprise Solutions',
            clientName: item.clientName || 'Commercial Client',
            description: item.description,
            challenge: 'Operational modernization and automation required for scale.',
            solution: 'Engineered custom software pipeline with high concurrency safeguards.',
            technologies: item.technologies ? item.technologies.split(',').map(s => s.trim()) : ['Java Spring Boot', 'React'],
            imageUrl: item.imageUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
            featured: item.featured,
            projectUrl: item.projectUrl,
            githubUrl: item.githubUrl,
            outcome: 'Delivered to production with verified automated testing.'
          }));
          setProjects([...apiProjects, ...projectsData]);
        }
      } catch (err) {
        // Fallback to verified local projects
        setProjects(projectsData);
      }
    };
    loadProjects();
  }, []);

  const categories = ['All', 'Healthcare', 'Enterprise Solutions', 'Education', 'Logistics & Supply Chain'];

  const filteredProjects = projects.filter((p) => {
    return activeFilter === 'All' || p.category === activeFilter;
  });

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen py-16 transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <SectionHeading
          tag="Case Studies"
          title="Verified Production"
          highlightText="Deployments"
          subtext="Explore architecture solutions engineered for real business constraints and measurable operational outcomes."
        />

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-2 rounded-xl max-w-2xl mx-auto shadow-sm dark:shadow-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeFilter === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 rounded-xl overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all flex flex-col justify-between group shadow-sm dark:shadow-none"
            >
              <div>
                <div className="h-60 w-full overflow-hidden relative">
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
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>Client: <strong className="text-slate-800 dark:text-slate-200 font-semibold">{project.clientName}</strong></span>
                    {project.featured && (
                      <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded">
                        FEATURED
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="p-3.5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-lg text-xs space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">Key Outcome:</span>
                    <p className="text-emerald-700 dark:text-emerald-400 font-medium">{project.outcome}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="text-[11px] font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-950 px-2.5 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 mt-2">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-white cursor-pointer transition-colors"
                >
                  <span>Read Full Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-3">
                  {project.projectUrl && (
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Site</span>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1"
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 px-2.5 py-0.5 rounded inline-block">
                {selectedProject.category}
              </span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                {selectedProject.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Engagement for {selectedProject.clientName}
              </p>
            </div>

            <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  Business Challenge & Problem
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">{selectedProject.challenge}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Engineering Architecture & Solution
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">{selectedProject.solution}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Measurable Outcome
                </h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">{selectedProject.outcome}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.technologies.map((t, i) => (
                  <span key={i} className="text-xs font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-950 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-800">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                Close
              </button>
              <Link
                to="/contact"
                className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm"
              >
                Discuss Similar Architecture
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Portfolio;
