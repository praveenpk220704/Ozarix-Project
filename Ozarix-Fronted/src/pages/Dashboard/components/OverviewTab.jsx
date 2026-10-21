import React from 'react';
import { MessageSquareCode, FolderKanban, CalendarClock, ShieldCheck, Inbox } from 'lucide-react';
import Card from '../../../components/common/Card';
import Badge from '../../../components/common/Badge';
import Button from '../../../components/common/Button';

const OverviewTab = ({ inquiries, activeProjects, setActiveTab }) => {
  const stats = [
    { title: 'Inquiries Received', value: inquiries.length.toString(), diff: 'Total logged entries', icon: MessageSquareCode, color: 'orange' },
    { title: 'Active Projects', value: activeProjects.length.toString(), diff: 'In execution phase', icon: FolderKanban, color: 'purple' },
    { title: 'Developer Hours', value: (inquiries.length * 40 + 120).toString(), diff: 'Allocated effort hours', icon: CalendarClock, color: 'green' },
    { title: 'Active Databases', value: activeProjects.length > 0 ? activeProjects.length.toString() : '0', diff: 'Cluster status active', icon: ShieldCheck, color: 'blue' }
  ];

  return (
    <>
      {/* Stat grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} hoverEffect={true} animate={true} delay={i * 0.05} className="text-left p-6">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.title}</span>
                <div className={`p-2 rounded-lg flex items-center justify-center ${
                  stat.color === 'orange' ? 'bg-brand-orange/10 text-brand-orange' :
                  stat.color === 'purple' ? 'bg-brand-purple/10 text-brand-purple' :
                  stat.color === 'green' ? 'bg-emerald-500/10 text-emerald-400' :
                  'bg-sky-500/10 text-sky-400'
                }`}>
                  <Icon size={16} />
                </div>
              </div>
              <span className="text-3xl font-heading font-bold text-white block mb-1">{stat.value}</span>
              <span className="text-[10px] text-slate-500 block font-mono">{stat.diff}</span>
            </Card>
          );
        })}
      </div>

      {/* Grid content panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Active Queries List - Col 1/2 */}
        <div className="lg:col-span-2 glassmorphism rounded-xl border border-white/5 p-6 space-y-4 text-left">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <h3 className="font-heading font-bold text-white text-base">Recent Consultation Requests</h3>
            <Badge color="orange" variant="glass">{inquiries.length} Logged</Badge>
          </div>

          {inquiries.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <Inbox size={40} className="text-slate-600 mx-auto" />
              <p className="text-slate-400 text-sm font-medium">No inquiries received yet.</p>
              <p className="text-slate-500 text-xs max-w-sm mx-auto">
                Inquiries submitted through the Consultation or Contact forms will appear here in real-time.
              </p>
              <div className="pt-2">
                <Button variant="secondary" size="sm" to="/consultation">
                  Book Consultation
                </Button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-white/5 text-slate-500 font-semibold tracking-wider uppercase">
                    <th className="py-2.5">Client</th>
                    <th className="py-2.5">Project Type</th>
                    <th className="py-2.5">Budget</th>
                    <th className="py-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300 font-medium">
                  {inquiries.map((query) => (
                    <tr key={query.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3">
                        <div>
                          <p className="font-semibold text-slate-200">{query.name}</p>
                          <p className="text-[10px] text-slate-500">{query.company}</p>
                        </div>
                      </td>
                      <td className="py-3">{query.type}</td>
                      <td className="py-3 font-mono">{query.budget}</td>
                      <td className="py-3">
                        <Badge 
                          color={
                            query.status === 'Approved' ? 'green' : 
                            query.status === 'Declined' ? 'red' : 
                            query.status === 'In Scoping' ? 'purple' : 
                            'orange'
                          } 
                          variant="glass"
                          className="text-[9px]"
                        >
                          {query.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Projects Overview - Col 3 */}
        <div className="glassmorphism rounded-xl border border-white/5 p-6 space-y-4 text-left flex flex-col justify-between">
          <div className="border-b border-white/5 pb-3">
            <h3 className="font-heading font-bold text-white text-base">Projects Integration status</h3>
          </div>

          {activeProjects.length === 0 ? (
            <div className="py-12 text-center space-y-3 flex-grow flex flex-col justify-center">
              <FolderKanban size={36} className="text-slate-600 mx-auto" />
              <p className="text-slate-400 text-xs font-medium">No active projects in pipeline.</p>
              <p className="text-slate-500 text-[11px]">
                Approve incoming inquiries to spawn project timelines.
              </p>
            </div>
          ) : (
            <div className="space-y-4 flex-grow pt-2">
              {activeProjects.map((p) => {
                const prog = p.progress || 25;
                return (
                  <div key={p.id || p.name} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-200 truncate max-w-[150px] font-semibold">{p.name}</span>
                      <span className={`font-mono font-bold ${prog >= 100 ? 'text-emerald-400' : 'text-brand-orange'}`}>
                        {prog >= 100 ? '100%' : `${prog}%`}
                      </span>
                    </div>
                    <div className="w-full bg-brand-space-900 rounded-full h-1 border border-white/5 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${prog >= 100 ? 'bg-emerald-400' : 'bg-gradient-to-r from-brand-orange to-brand-purple'}`} 
                        style={{ width: `${prog}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-[9px] text-slate-500">
                      <span>Lead: {p.lead}</span>
                      <span>{p.category}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <Button variant="outline" size="sm" className="w-full mt-4" onClick={() => setActiveTab('Active Projects')}>
            View Project Timelines
          </Button>
        </div>

      </div>
    </>
  );
};

export default OverviewTab;
