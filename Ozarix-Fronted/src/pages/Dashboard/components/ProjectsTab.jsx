import React from 'react';
import { FolderKanban, Trash2 } from 'lucide-react';
import Badge from '../../../components/common/Badge';
import Button from '../../../components/common/Button';

const ProjectsTab = ({
  activeProjects,
  setActiveTab,
  handleDeleteProject,
  handleOpenBranchDetails,
  handleTriggerDeploy
}) => {
  return (
    <div className="glassmorphism rounded-xl border border-white/5 p-6 space-y-6 text-left">
      <div className="border-b border-white/5 pb-4">
        <h3 className="font-heading font-bold text-white text-lg">Active Code Repositories</h3>
        <p className="text-xs text-slate-400 mt-1">Status of current code implementations and repository branches.</p>
      </div>

      {activeProjects.length === 0 ? (
        <div className="py-16 text-center space-y-4">
          <FolderKanban size={48} className="text-slate-600 mx-auto" />
          <h4 className="font-heading font-bold text-white text-lg">No Active Projects</h4>
          <p className="text-slate-400 text-xs max-w-md mx-auto leading-relaxed">
            Approve incoming inquiries in the Inquiries tab to start active development pipelines.
          </p>
          <div className="pt-2">
            <Button variant="secondary" size="sm" onClick={() => setActiveTab('Inquiries')}>
              View Pending Inquiries
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {activeProjects.map((proj) => {
            const prog = proj.progress || 25;
            const isFinished = prog >= 100;
            return (
              <div
                key={proj.id || proj.name}
                className="bg-white/5 border border-white/5 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-brand-orange/20 transition-all duration-300"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-heading font-bold text-white text-base">{proj.name}</h4>
                    {isFinished && (
                      <Badge color="green" variant="glass" className="text-[10px]">
                        Finished & Live
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2 text-xs text-slate-500">
                    <span>Lead Architect: {proj.lead}</span> • <span>Category: {proj.category}</span>
                  </div>
                </div>

                {/* Progress */}
                <div className="w-full md:w-60 space-y-1.5 shrink-0">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">CI Build Completion</span>
                    <span className={`font-mono font-bold ${isFinished ? 'text-emerald-400' : 'text-brand-orange'}`}>
                      {isFinished ? '100% (Finished)' : `${prog}%`}
                    </span>
                  </div>
                  <div className="w-full bg-brand-space-900 rounded-full h-1.5 border border-white/5 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${isFinished ? 'bg-emerald-400' : 'bg-gradient-to-r from-brand-orange to-brand-purple'}`} 
                      style={{ width: `${prog}%` }}
                    ></div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                  <button
                    onClick={() => handleDeleteProject(proj.id)}
                    className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer border border-white/5 shrink-0"
                    title="Remove Project"
                  >
                    <Trash2 size={16} />
                  </button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleOpenBranchDetails(proj)}
                  >
                    Branch Details
                  </Button>
                  <Button 
                    variant={isFinished ? 'secondary' : 'primary'} 
                    size="sm"
                    onClick={() => handleTriggerDeploy(proj.id)}
                  >
                    {isFinished ? 'Re-Deploy' : 'Trigger Deploy'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProjectsTab;
