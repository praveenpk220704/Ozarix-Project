import React from 'react';
import { GitBranch, CheckCircle2, Globe, ExternalLink, Trash2, Play } from 'lucide-react';
import Modal from '../../../components/common/Modal';
import Badge from '../../../components/common/Badge';
import Button from '../../../components/common/Button';

const BranchModal = ({
  isOpen,
  onClose,
  selectedBranchProject,
  handleDeleteProject,
  handleTriggerDeploy
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Branch Details: ${selectedBranchProject?.name}`}
      size="lg"
    >
      {selectedBranchProject && (
        <div className="space-y-6 text-left">
          
          {/* Banner status */}
          {(selectedBranchProject.progress || 0) >= 100 ? (
            <div className="bg-emerald-500/10 border border-emerald-500/25 p-4 rounded-xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-white text-sm">Project Finished & Production Deployed</h4>
                  <p className="text-xs text-slate-400">CI/CD Pipeline build passed. Live application is live.</p>
                </div>
              </div>
              <Badge color="green" variant="solid">Completed 100%</Badge>
            </div>
          ) : (
            <div className="bg-brand-purple/10 border border-brand-purple/25 p-4 rounded-xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-brand-purple/20 text-brand-purple">
                  <GitBranch size={24} />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-white text-sm">Active Development Branch</h4>
                  <p className="text-xs text-slate-400">Feature branch active. Trigger deploy to advance toward production.</p>
                </div>
              </div>
              <Badge color="purple" variant="solid">Progress: {selectedBranchProject.progress || 25}%</Badge>
            </div>
          )}

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">Pipeline Progression</span>
              <span className="text-brand-orange font-mono font-bold">
                {(selectedBranchProject.progress || 0) >= 100 ? '100% Finished' : `${selectedBranchProject.progress || 25}% Completed`}
              </span>
            </div>
            <div className="w-full bg-brand-space-900 rounded-full h-2 border border-white/10 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-brand-orange via-brand-purple to-emerald-400 h-full rounded-full transition-all duration-500" 
                style={{ width: `${selectedBranchProject.progress || 25}%` }}
              ></div>
            </div>
          </div>

          {/* Grid Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-brand-space-900/80 p-4 rounded-xl border border-white/5 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">Active Git Branch</span>
              <div className="flex items-center gap-2 text-slate-200 font-mono text-sm font-semibold">
                <GitBranch size={16} className="text-brand-orange" />
                <span>{selectedBranchProject.branch || 'main (production)'}</span>
              </div>
            </div>

            <div className="bg-brand-space-900/80 p-4 rounded-xl border border-white/5 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">Latest Commit Hash</span>
              <span className="text-slate-200 font-mono text-sm block">{selectedBranchProject.commitHash || 'release-v1.0.0-8921'}</span>
            </div>

            <div className="bg-brand-space-900/80 p-4 rounded-xl border border-white/5 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">Build & Deploy Status</span>
              <span className="text-emerald-400 font-semibold text-xs block">{selectedBranchProject.buildStatus || 'Live Production Deployed'}</span>
            </div>

            <div className="bg-brand-space-900/80 p-4 rounded-xl border border-white/5 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">Last Deployment Timestamp</span>
              <span className="text-slate-300 text-xs block">{selectedBranchProject.lastDeployed || 'Recently Deployed'}</span>
            </div>
          </div>

          {/* Live Application URL link when finished */}
          {(selectedBranchProject.progress || 0) >= 100 && selectedBranchProject.deployUrl && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl space-y-2">
              <span className="text-[10px] text-emerald-400 uppercase tracking-wider font-semibold block">Live Production Application Endpoint:</span>
              <a 
                href={selectedBranchProject.deployUrl} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 text-brand-orange hover:text-white font-mono text-sm font-bold transition-colors underline break-all"
              >
                <Globe size={16} />
                <span>{selectedBranchProject.deployUrl}</span>
                <ExternalLink size={14} />
              </a>
            </div>
          )}

          {/* Modal Actions */}
          <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Button variant="secondary" onClick={onClose}>
                Close Details
              </Button>
              <button
                onClick={() => handleDeleteProject(selectedBranchProject.id)}
                className="text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 px-3 py-2 rounded-lg transition-colors border border-rose-500/20 cursor-pointer flex items-center gap-1.5 font-medium"
              >
                <Trash2 size={14} /> Remove Project
              </button>
            </div>

            {(selectedBranchProject.progress || 0) < 100 ? (
              <Button 
                variant="primary" 
                className="gap-2"
                onClick={() => handleTriggerDeploy(selectedBranchProject.id)}
              >
                <Play size={14} />
                Finish & Deploy to Production
              </Button>
            ) : (
              <Button 
                variant="primary" 
                className="gap-2"
                onClick={() => handleTriggerDeploy(selectedBranchProject.id)}
              >
                <Play size={14} />
                Re-Trigger Production Build
              </Button>
            )}
          </div>

        </div>
      )}
    </Modal>
  );
};

export default BranchModal;
