import React from 'react';
import { Inbox, Trash2 } from 'lucide-react';
import Card from '../../../components/common/Card';
import Badge from '../../../components/common/Badge';
import Button from '../../../components/common/Button';

const InquiriesTab = ({
  inquiries,
  handleClearAll,
  handleDeleteInquiry,
  handleDecline,
  handleApprove
}) => {
  return (
    <div className="glassmorphism rounded-xl border border-white/5 p-6 space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <h3 className="font-heading font-bold text-white text-lg">Inquiry Registry Dashboard</h3>
          <p className="text-xs text-slate-400 mt-1">Logged requests from contact & consultation entry nodes.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge color="purple" variant="solid">{inquiries.length} Total</Badge>
          {inquiries.length > 0 && (
            <button 
              onClick={handleClearAll}
              className="text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 px-2.5 py-1 rounded-lg transition-colors border border-rose-500/20 cursor-pointer flex items-center gap-1"
            >
              <Trash2 size={12} /> Clear All
            </button>
          )}
        </div>
      </div>

      {inquiries.length === 0 ? (
        <div className="py-16 text-center space-y-4">
          <Inbox size={48} className="text-slate-600 mx-auto" />
          <h4 className="font-heading font-bold text-white text-lg">No Inquiries Found</h4>
          <p className="text-slate-400 text-xs max-w-md mx-auto leading-relaxed">
            When visitors submit requests via the Consultation form or Contact page, they will automatically appear here.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Button variant="primary" size="sm" to="/consultation">
              Submit Consultation Request
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {inquiries.map((q) => (
            <Card key={q.id} hoverEffect={true} className="p-6 space-y-4 relative">
              <div className="flex justify-between items-start border-b border-white/5 pb-3">
                <div>
                  <h4 className="font-heading font-bold text-white text-base">{q.name}</h4>
                  <span className="text-[10px] text-slate-500 font-mono uppercase">{q.company} • {q.email}</span>
                </div>
                <Badge 
                  color={q.status === 'Approved' ? 'green' : q.status === 'Declined' ? 'red' : 'orange'} 
                  variant="glass"
                >
                  {q.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 block mb-0.5">Project Domain</span>
                  <span className="text-slate-300 font-semibold">{q.type}</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5">Allocated Budget</span>
                  <span className="text-brand-orange font-mono font-bold">{q.budget}</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5">Date Logged</span>
                  <span className="text-slate-300">{q.date}</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5">Query Node ID</span>
                  <span className="text-slate-300 font-mono">#OZ-{q.id}</span>
                </div>
              </div>

              {q.message && (
                <div className="bg-brand-space-900/60 p-3 rounded-lg border border-white/5 text-xs text-slate-300">
                  <span className="text-[10px] text-slate-500 block uppercase font-semibold mb-1">Requirements Brief:</span>
                  <p className="line-clamp-2">{q.message}</p>
                </div>
              )}

              <div className="pt-3 border-t border-white/5 flex justify-between items-center gap-2">
                <button 
                  onClick={() => handleDeleteInquiry(q.id)}
                  className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg transition-colors cursor-pointer"
                  title="Delete Record"
                >
                  <Trash2 size={14} />
                </button>

                <div className="flex gap-2">
                  {q.status !== 'Declined' && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDecline(q.id)}
                    >
                      Decline
                    </Button>
                  )}
                  {q.status !== 'Approved' && (
                    <Button 
                      variant="primary" 
                      size="sm" 
                      onClick={() => handleApprove(q)}
                    >
                      Approve Project
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default InquiriesTab;
