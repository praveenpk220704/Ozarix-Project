import React from 'react';
import { Menu } from 'lucide-react';

const DashboardHeader = ({
  activeTab,
  setSidebarOpen,
  inquiriesCount = 0
}) => {
  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950 flex items-center justify-between px-6 z-10 shrink-0 transition-colors">
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden p-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
          onClick={() => setSidebarOpen(true)}
          aria-label="Toggle menu"
        >
          <Menu size={18} />
        </button>
        <div>
          <h1 className="font-heading font-bold text-slate-900 dark:text-white text-lg">
            {activeTab}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 rounded-md text-[11px] text-emerald-700 dark:text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>PostgreSQL & Spring Boot Online</span>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
