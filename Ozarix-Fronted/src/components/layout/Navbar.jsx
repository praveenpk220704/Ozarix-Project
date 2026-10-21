import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, User, LogOut, LayoutDashboard, Shield, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const location = useLocation();

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Technologies', path: '/technologies' },
    { name: 'Projects', path: '/portfolio' },
    { name: 'Industries', path: '/industries' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ];

  const isHome = location.pathname === '/';
  const isTransparent = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center transition-[background-color,border-color,box-shadow] duration-200 ${
        isTransparent
          ? 'bg-[#030C1C]/80 backdrop-blur-md border-b border-slate-800/60 shadow-none'
          : scrolled
            ? 'bg-white/95 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800/80 shadow-sm'
            : 'bg-white/90 dark:bg-slate-950/80 backdrop-blur-sm border-b border-slate-200/70 dark:border-slate-900 shadow-none'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand Identity */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-800 p-0.5 shadow-md flex items-center justify-center overflow-hidden">
              <div className="h-full w-full bg-white dark:bg-slate-950 rounded-[7px] flex items-center justify-center p-1.5">
                <img
                  src={logo}
                  alt="Ozarix Technology"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className={`font-heading font-extrabold text-lg tracking-tight transition-colors ${
                  isTransparent
                    ? 'text-white group-hover:text-blue-400'
                    : 'text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400'
                }`}>
                  OZARIX
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-500 dark:text-blue-400">
                  TECH
                </span>
              </div>
              <span className={`text-[10px] tracking-wider font-medium uppercase -mt-0.5 ${
                isTransparent ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'
              }`}>
                Innovate • Integrate • Elevate
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    isTransparent
                      ? isActive
                        ? 'text-white bg-blue-600/30 border border-blue-500/40 font-semibold'
                        : 'text-slate-200 hover:text-white hover:bg-white/10'
                      : isActive
                        ? 'text-blue-600 dark:text-white bg-blue-50 dark:bg-slate-900 font-semibold'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/60'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                isTransparent
                  ? 'text-slate-200 hover:text-white hover:bg-white/10'
                  : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
              }`}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4.5 h-4.5 text-amber-400" />
              ) : (
                <Moon className={`w-4.5 h-4.5 ${isTransparent ? 'text-slate-200' : 'text-slate-700'}`} />
              )}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                >
                  {isAdmin ? <Shield className="w-3.5 h-3.5" /> : <LayoutDashboard className="w-3.5 h-3.5" />}
                  <span>{user?.name || 'Dashboard'}</span>
                </Link>
                <button
                  onClick={logout}
                  title="Sign Out"
                  className="p-1.5 text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-md transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  isTransparent
                    ? 'text-slate-200 hover:text-white'
                    : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white'
                }`}
              >
                Sign In
              </Link>
            )}

            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-lg shadow-sm hover:shadow-blue-600/20 transition-all duration-150"
            >
              <span>Can We Connect</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu & Theme Buttons */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className={`p-2 rounded-lg transition-colors ${
                isTransparent
                  ? 'text-slate-200 hover:bg-white/10'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
              }`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4.5 h-4.5 text-amber-400" />
              ) : (
                <Moon className={`w-4.5 h-4.5 ${isTransparent ? 'text-slate-200' : 'text-slate-700'}`} />
              )}
            </button>
            <Link
              to="/contact"
              className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-md"
            >
              Let's Talk
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                isTransparent
                  ? 'text-slate-200 hover:text-white hover:bg-white/10'
                  : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-[72px] left-0 right-0 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-2 shadow-xl">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-600/15 font-semibold'
                      : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
          
          <div className="pt-4 border-t border-slate-200 dark:border-slate-900 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center justify-between px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 rounded-md"
                >
                  <span className="flex items-center gap-2">
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard ({user?.name})
                  </span>
                  <span className="text-xs uppercase bg-blue-100 dark:bg-blue-900/60 px-2 py-0.5 rounded text-blue-700 dark:text-blue-300 font-mono">
                    {user?.role}
                  </span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-md text-left"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 rounded-md"
              >
                <User className="w-4 h-4" />
                Sign In to Portal
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
