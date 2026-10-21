import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, MessageSquareCode, Calendar, 
  FolderKanban, Briefcase, Server, Settings, 
  LogOut, Shield, ChevronRight, ArrowLeft 
} from 'lucide-react';
import logo from '../../../assets/logo.png';

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  user,
  activeTab,
  setActiveTab,
  menuItems,
  onLogout
}) => {
  return (
    <>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800/80 flex flex-col justify-between transform transition-transform duration-200 lg:translate-x-0 lg:static lg:inset-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div>
          {/* Header */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 dark:border-slate-800/80">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-blue-600 p-0.5 shadow-sm flex items-center justify-center">
                <div className="h-full w-full bg-slate-50 dark:bg-slate-950 rounded-[6px] flex items-center justify-center p-1">
                  <img src={logo} alt="Ozarix Logo" className="h-full w-full object-contain" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-sm tracking-tight text-slate-900 dark:text-white">
                  OZARIX ADMIN
                </span>
                <span className="text-[9px] uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold -mt-0.5">
                  Control Console
                </span>
              </div>
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 cursor-pointer"
            >
              <ChevronRight className="rotate-180 w-5 h-5" />
            </button>
          </div>

          {/* User Badge */}
          <div className="p-4 mx-3 my-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="overflow-hidden text-left flex-1">
              <span className="font-semibold text-slate-900 dark:text-white text-xs block truncate">
                {user?.name || 'Administrator'}
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Shield className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  {user?.role || 'USER'}
                </span>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="px-3 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveTab(item.name);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800/80 space-y-2">
          <Link
            to="/"
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Public Site</span>
          </Link>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors text-left cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
