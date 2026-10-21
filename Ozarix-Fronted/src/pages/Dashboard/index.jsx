import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, MessageSquareCode, Calendar, 
  FolderKanban, Briefcase, Server, Settings, 
  Users, RefreshCw, Trash2, CheckCircle2, 
  Clock, AlertCircle, Plus, ExternalLink, Loader2 
} from 'lucide-react';

import { 
  dashboardService, 
  contactService, 
  consultationService, 
  projectRequestService, 
  careerService, 
  servicesService 
} from '../../services/apiService';

import Sidebar from './components/Sidebar';
import DashboardHeader from './components/DashboardHeader';

const Dashboard = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Live Backend State
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalServices: 0,
    totalContacts: 0,
    totalConsultations: 0,
    totalProjectRequests: 0,
  });

  const [contacts, setContacts] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [projectRequests, setProjectRequests] = useState([]);
  const [careers, setCareers] = useState([]);
  const [services, setServices] = useState([]);

  // New Service Modal State
  const [newServiceModalOpen, setNewServiceModalOpen] = useState(false);
  const [newServiceForm, setNewServiceForm] = useState({
    serviceName: '',
    description: '',
    icon: 'fa-code',
    active: true,
  });

  // Fetch all real dashboard data from Spring Boot API
  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      if (isAdmin) {
        // Fetch Admin Dashboard Stats & Collections in parallel
        const [statsData, contactsData, consultsData, projectsData, careersData, servicesData] =
          await Promise.allSettled([
            dashboardService.getDashboardStats(),
            contactService.getAllContacts(),
            consultationService.getAllConsultations(),
            projectRequestService.getAllProjectRequests(),
            careerService.getAllCareers(),
            servicesService.getAllServices(),
          ]);

        if (statsData.status === 'fulfilled') setStats(statsData.value || {});
        if (contactsData.status === 'fulfilled') setContacts(contactsData.value || []);
        if (consultsData.status === 'fulfilled') setConsultations(consultsData.value || []);
        if (projectsData.status === 'fulfilled') setProjectRequests(projectsData.value || []);
        if (careersData.status === 'fulfilled') setCareers(careersData.value || []);
        if (servicesData.status === 'fulfilled') setServices(servicesData.value || []);
      } else {
        // Regular user: load public services
        const servicesData = await servicesService.getAllServices();
        setServices(servicesData || []);
      }
    } catch (err) {
      console.error('Error fetching dashboard records from backend:', err);
    } finally {
      setLoading(false);
    }
  }, [isAdmin]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // --- DELETE & STATUS HANDLERS ---
  const handleDeleteContact = async (id) => {
    if (!window.confirm('Delete this contact inquiry permanently?')) return;
    try {
      await contactService.deleteContact(id);
      setContacts((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert('Failed to delete contact record.');
    }
  };

  const handleDeleteConsultation = async (id) => {
    if (!window.confirm('Delete this consultation booking?')) return;
    try {
      await consultationService.deleteConsultation(id);
      setConsultations((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert('Failed to delete consultation booking.');
    }
  };

  const handleDeleteProjectRequest = async (id) => {
    if (!window.confirm('Delete this project request?')) return;
    try {
      await projectRequestService.deleteProjectRequest(id);
      setProjectRequests((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert('Failed to delete project request.');
    }
  };

  const handleDeleteCareer = async (id) => {
    if (!window.confirm('Delete this application record?')) return;
    try {
      await careerService.deleteCareer(id);
      setCareers((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert('Failed to delete job application.');
    }
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm('Delete this service from the registry?')) return;
    try {
      await servicesService.deleteService(id);
      setServices((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert('Failed to delete service.');
    }
  };

  const handleCreateService = async (e) => {
    e.preventDefault();
    if (!newServiceForm.serviceName.trim()) return;

    setActionLoading(true);
    try {
      const created = await servicesService.createService(newServiceForm);
      setServices((prev) => [...prev, created]);
      setNewServiceModalOpen(false);
      setNewServiceForm({
        serviceName: '',
        description: '',
        icon: 'fa-code',
        active: true,
      });
    } catch (err) {
      alert('Failed to create new service.');
    } finally {
      setActionLoading(false);
    }
  };

  const menuItems = [
    { name: 'Overview', icon: LayoutDashboard },
    ...(isAdmin ? [
      { name: 'Inquiries', icon: MessageSquareCode, badge: contacts.length },
      { name: 'Consultations', icon: Calendar, badge: consultations.length },
      { name: 'Project Requests', icon: FolderKanban, badge: projectRequests.length },
      { name: 'Careers', icon: Briefcase, badge: careers.length },
      { name: 'Services Catalog', icon: Server, badge: services.length },
    ] : [
      { name: 'Available Services', icon: Server, badge: services.length }
    ]),
    { name: 'Settings', icon: Settings }
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* 1. SIDEBAR */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        menuItems={menuItems}
        onLogout={handleLogout}
      />

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        <DashboardHeader
          activeTab={activeTab}
          setSidebarOpen={setSidebarOpen}
          inquiriesCount={contacts.length}
        />

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 bg-slate-50 dark:bg-slate-950">
          
          {/* Top Refresh Control */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-600 dark:text-slate-400 font-mono">
                Session: {user?.email} • Authority: {user?.role}
              </span>
            </div>
            <button
              onClick={fetchDashboardData}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 shadow-sm dark:shadow-none transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Records</span>
            </button>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'Overview' && (
            <div className="space-y-8">
              
              {/* Live Metric Cards (from GET /api/admin/dashboard) */}
              {isAdmin ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  
                  <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 space-y-2 shadow-sm dark:shadow-none">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                      Registered Users
                    </span>
                    <span className="font-mono text-3xl font-extrabold text-slate-900 dark:text-white block">
                      {stats.totalUsers || 0}
                    </span>
                    <span className="text-[10px] text-blue-600 dark:text-blue-400">PostgreSQL Users</span>
                  </div>

                  <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 space-y-2 shadow-sm dark:shadow-none">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                      Contact Inquiries
                    </span>
                    <span className="font-mono text-3xl font-extrabold text-blue-600 dark:text-blue-400 block">
                      {stats.totalContacts || contacts.length}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Public form submissions</span>
                  </div>

                  <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 space-y-2 shadow-sm dark:shadow-none">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                      Consultations
                    </span>
                    <span className="font-mono text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 block">
                      {stats.totalConsultations || consultations.length}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Calendar discovery slots</span>
                  </div>

                  <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 space-y-2 shadow-sm dark:shadow-none">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                      Project Requests
                    </span>
                    <span className="font-mono text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 block">
                      {stats.totalProjectRequests || projectRequests.length}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Detailed scopes</span>
                  </div>

                  <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 space-y-2 shadow-sm dark:shadow-none">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                      Active Services
                    </span>
                    <span className="font-mono text-3xl font-extrabold text-amber-600 dark:text-amber-400 block">
                      {stats.totalServices || services.length}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Catalog items</span>
                  </div>

                </div>
              ) : (
                <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-6 text-left space-y-2 shadow-sm dark:shadow-none">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Welcome, {user?.name}!</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    You are signed in to the Ozarix client portal. You can view registered services or submit project requests.
                  </p>
                </div>
              )}

              {/* Recent Inquiries Quick Table */}
              {isAdmin && (
                <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-6 space-y-4 shadow-sm dark:shadow-none">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">
                      Recent Inquiries ({contacts.length})
                    </h3>
                    <button
                      onClick={() => setActiveTab('Inquiries')}
                      className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline cursor-pointer"
                    >
                      View All Inquiries
                    </button>
                  </div>

                  {contacts.length === 0 ? (
                    <p className="text-xs text-slate-500 dark:text-slate-400 py-6 text-center">
                      No contact inquiries received yet. Submit one from the public contact page to test!
                    </p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-[11px]">
                            <th className="py-2.5 px-3">Client</th>
                            <th className="py-2.5 px-3">Contact</th>
                            <th className="py-2.5 px-3">Service</th>
                            <th className="py-2.5 px-3">Date</th>
                            <th className="py-2.5 px-3 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                          {contacts.slice(0, 5).map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-950/40 transition-colors">
                              <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">
                                {item.name}
                              </td>
                              <td className="py-3 px-3 text-slate-700 dark:text-slate-300">
                                <div>{item.email}</div>
                                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{item.phone}</span>
                              </td>
                              <td className="py-3 px-3 text-blue-600 dark:text-blue-400">
                                {item.service}
                              </td>
                              <td className="py-3 px-3 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                                {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recent'}
                              </td>
                              <td className="py-3 px-3 text-right">
                                <button
                                  onClick={() => handleDeleteContact(item.id)}
                                  className="text-rose-600 dark:text-rose-400 hover:text-rose-800 dark:hover:text-rose-300 p-1 cursor-pointer"
                                  title="Delete Inquiry"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

            </div>
          )}

          {/* TAB 2: INQUIRIES (GET /api/contact) */}
          {activeTab === 'Inquiries' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-6 space-y-4 shadow-sm dark:shadow-none">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">Contact Form Inquiries</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Persisted in PostgreSQL `contacts` table</p>
                </div>
                <span className="text-xs font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 px-2.5 py-1 rounded">
                  {contacts.length} Total Records
                </span>
              </div>

              {contacts.length === 0 ? (
                <div className="text-center py-12 text-slate-500 dark:text-slate-400 text-xs">
                  No inquiries found. When a client submits the Contact Us form, their record appears here in real-time.
                </div>
              ) : (
                <div className="space-y-3">
                  {contacts.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <strong className="text-sm font-bold text-slate-900 dark:text-white">{item.name}</strong>
                          <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/60 px-2 py-0.5 rounded">
                            {item.service}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                            {item.createdAt ? new Date(item.createdAt).toLocaleString() : ''}
                          </span>
                          <button
                            onClick={() => handleDeleteContact(item.id)}
                            className="text-rose-600 dark:text-rose-400 hover:text-rose-800 dark:hover:text-rose-300 p-1 cursor-pointer"
                            title="Delete Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 text-xs text-slate-600 dark:text-slate-400">
                        <span>Email: <strong className="text-slate-900 dark:text-slate-200">{item.email}</strong></span>
                        <span>Phone: <strong className="text-slate-900 dark:text-slate-200">{item.phone}</strong></span>
                        <span>Status: <strong className="text-emerald-600 dark:text-emerald-400 font-mono">{item.status || 'NEW'}</strong></span>
                      </div>

                      <div className="pt-2 border-t border-slate-200 dark:border-slate-900 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        <span className="text-slate-500 dark:text-slate-400 block text-[10px] font-bold uppercase mb-0.5">Message:</span>
                        {item.message}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CONSULTATIONS (GET /api/consultation) */}
          {activeTab === 'Consultations' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-6 space-y-4 shadow-sm dark:shadow-none">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">Booked Architecture Consultations</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Persisted in PostgreSQL `consultations` table</p>
                </div>
                <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/60 px-2.5 py-1 rounded">
                  {consultations.length} Bookings
                </span>
              </div>

              {consultations.length === 0 ? (
                <div className="text-center py-12 text-slate-500 dark:text-slate-400 text-xs">
                  No consultation appointments booked yet. Submissions on `/consultation` will display here.
                </div>
              ) : (
                <div className="space-y-3">
                  {consultations.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <strong className="text-sm font-bold text-slate-900 dark:text-white">{item.name}</strong>
                          <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900/60 px-2 py-0.5 rounded">
                            {item.service}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDeleteConsultation(item.id)}
                            className="text-rose-600 dark:text-rose-400 hover:text-rose-800 dark:hover:text-rose-300 p-1 cursor-pointer"
                            title="Delete Consultation"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs text-slate-600 dark:text-slate-400 pt-1">
                        <div>
                          <span className="block text-[10px] text-slate-500 dark:text-slate-400 uppercase">Preferred Date</span>
                          <span className="font-semibold text-slate-900 dark:text-white">{item.preferredDate}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] text-slate-500 dark:text-slate-400 uppercase">Preferred Time</span>
                          <span className="font-semibold text-slate-900 dark:text-white">{item.preferredTime}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] text-slate-500 dark:text-slate-400 uppercase">Budget</span>
                          <span className="font-semibold text-slate-900 dark:text-white">{item.budget || 'Not specified'}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] text-slate-500 dark:text-slate-400 uppercase">Contact Info</span>
                          <span className="text-slate-700 dark:text-slate-300">{item.email} • {item.phone}</span>
                        </div>
                      </div>

                      {item.message && (
                        <div className="pt-2 border-t border-slate-200 dark:border-slate-900 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                          <span className="text-slate-500 dark:text-slate-400 block text-[10px] font-bold uppercase mb-0.5">Notes:</span>
                          {item.message}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: PROJECT REQUESTS (GET /api/project-request) */}
          {activeTab === 'Project Requests' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-6 space-y-4 shadow-sm dark:shadow-none">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">Project Requirement Specifications</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Persisted in PostgreSQL `project_requests` table</p>
                </div>
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 px-2.5 py-1 rounded">
                  {projectRequests.length} Project Requests
                </span>
              </div>

              {projectRequests.length === 0 ? (
                <div className="text-center py-12 text-slate-500 dark:text-slate-400 text-xs">
                  No project requests registered yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {projectRequests.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl space-y-3 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.projectTitle}</h4>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400">
                            Client: <strong className="text-slate-800 dark:text-slate-200">{item.clientName}</strong> ({item.company || 'Private'})
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900/60 px-2 py-0.5 rounded">
                            {item.category}
                          </span>
                          <button
                            onClick={() => handleDeleteProjectRequest(item.id)}
                            className="text-rose-600 dark:text-rose-400 hover:text-rose-800 dark:hover:text-rose-300 p-1 cursor-pointer"
                            title="Delete Request"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600 dark:text-slate-400">
                        <div>
                          <span className="text-[10px] uppercase block text-slate-500 dark:text-slate-400">Budget Range</span>
                          <strong className="text-slate-900 dark:text-white">{item.budget || 'Open'}</strong>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase block text-slate-500 dark:text-slate-400">Target Deadline</span>
                          <strong className="text-slate-900 dark:text-white">{item.deadline || 'Flexible'}</strong>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase block text-slate-500 dark:text-slate-400">Direct Contact</span>
                          <span className="text-slate-700 dark:text-slate-300">{item.email} • {item.phone}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-200 dark:border-slate-900 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        <span className="text-slate-500 dark:text-slate-400 block text-[10px] font-bold uppercase mb-0.5">Project Scope:</span>
                        {item.description}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: CAREERS (GET /api/career) */}
          {activeTab === 'Careers' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-6 space-y-4 shadow-sm dark:shadow-none">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">Job Applications</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Persisted in PostgreSQL `careers` table with uploaded resume files</p>
                </div>
                <span className="text-xs font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 px-2.5 py-1 rounded">
                  {careers.length} Candidates
                </span>
              </div>

              {careers.length === 0 ? (
                <div className="text-center py-12 text-slate-500 dark:text-slate-400 text-xs">
                  No candidate applications received yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {careers.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <strong className="text-sm font-bold text-slate-900 dark:text-white">{item.fullName}</strong>
                          <span className="text-xs text-slate-600 dark:text-slate-400 block">Applied for: <span className="text-blue-600 dark:text-blue-400 font-semibold">{item.position}</span></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDeleteCareer(item.id)}
                            className="text-rose-600 dark:text-rose-400 hover:text-rose-800 dark:hover:text-rose-300 p-1 cursor-pointer"
                            title="Delete Application"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 text-xs text-slate-600 dark:text-slate-400">
                        <span>Email: <strong className="text-slate-900 dark:text-slate-200">{item.email}</strong></span>
                        <span>Phone: <strong className="text-slate-900 dark:text-slate-200">{item.phone}</strong></span>
                        <span>Experience: <strong className="text-slate-900 dark:text-slate-200">{item.experience || 'N/A'}</strong></span>
                        {item.resume && (
                          <a
                            href={`http://localhost:8080/uploads/${item.resume}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-semibold"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Download Resume ({item.resume})</span>
                          </a>
                        )}
                      </div>

                      {item.coverLetter && (
                        <div className="pt-2 border-t border-slate-200 dark:border-slate-900 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                          <span className="text-slate-500 dark:text-slate-400 block text-[10px] font-bold uppercase mb-0.5">Notes / Cover Letter:</span>
                          {item.coverLetter}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: SERVICES CATALOG (GET /api/services) */}
          {(activeTab === 'Services Catalog' || activeTab === 'Available Services') && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-6 space-y-4 shadow-sm dark:shadow-none">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">Backend Services Registry</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Services stored in Spring Boot backend database</p>
                </div>
                {isAdmin && (
                  <button
                    onClick={() => setNewServiceModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Service</span>
                  </button>
                )}
              </div>

              {services.length === 0 ? (
                <div className="text-center py-12 text-slate-500 dark:text-slate-400 text-xs">
                  No services found in backend database.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl flex items-start justify-between gap-3 shadow-sm"
                    >
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.serviceName}</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          {item.description || 'Enterprise technology service.'}
                        </p>
                        <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-900/60 inline-block mt-1">
                          Active: {item.active ? 'YES' : 'NO'}
                        </span>
                      </div>

                      {isAdmin && (
                        <button
                          onClick={() => handleDeleteService(item.id)}
                          className="text-rose-600 dark:text-rose-400 hover:text-rose-800 dark:hover:text-rose-300 p-1 flex-shrink-0 cursor-pointer"
                          title="Delete Service"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 7: SETTINGS */}
          {activeTab === 'Settings' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-6 max-w-xl space-y-6 shadow-sm dark:shadow-none">
              <h3 className="font-bold text-slate-900 dark:text-white text-lg pb-3 border-b border-slate-200 dark:border-slate-800">
                System & Session Configuration
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Logged User:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{user?.name}</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Email:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{user?.email}</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Assigned Role:</span>
                  <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{user?.role}</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Backend API URL:</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400">http://localhost:8080/api</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-xs font-semibold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/60 cursor-pointer"
                >
                  Terminate Active Session (Log Out)
                </button>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* MODAL: ADD SERVICE (POST /api/services) */}
      {newServiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Add New Service to Backend
            </h3>
            <form onSubmit={handleCreateService} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Service Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newServiceForm.serviceName}
                  onChange={(e) => setNewServiceForm({ ...newServiceForm, serviceName: e.target.value })}
                  placeholder="e.g. Cloud DevOps Engineering"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={newServiceForm.description}
                  onChange={(e) => setNewServiceForm({ ...newServiceForm, description: e.target.value })}
                  placeholder="Brief summary of service deliverables..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setNewServiceModalOpen(false)}
                  className="px-3.5 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg cursor-pointer"
                >
                  {actionLoading ? 'Creating...' : 'Create Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
