import React from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AppRoutes from './routes/AppRoutes';

const AppContent = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');
  const isHome = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-x-hidden w-full max-w-full transition-colors duration-150">
      {/* Primary Navigation */}
      {!isDashboard && <Navbar />}

      {/* Main Viewport */}
      <main className={`flex-grow ${!isDashboard ? (isHome ? 'pt-0' : 'pt-[72px]') : ''}`}>
        <AppRoutes />
      </main>

      {/* Footer */}
      {!isDashboard && <Footer />}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
