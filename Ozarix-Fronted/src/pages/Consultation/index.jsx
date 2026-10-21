import React, { useState } from 'react';
import { 
  Calendar, CheckCircle2, AlertCircle, 
  Loader2, ArrowRight, FileText
} from 'lucide-react';
import { consultationService, projectRequestService } from '../../services/apiService';
import SectionHeading from '../../components/common/SectionHeading';

const Consultation = () => {
  const [activeTab, setActiveTab] = useState('consultation'); // 'consultation' | 'projectRequest'
  
  // Tab 1: Book Consultation State
  const [consultForm, setConsultForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Java Spring Boot & Architecture',
    preferredDate: '',
    preferredTime: '10:00:00',
    budget: '$5,000 - $15,000',
    message: ''
  });

  // Tab 2: Project Request State
  const [projectForm, setProjectForm] = useState({
    clientName: '',
    email: '',
    phone: '',
    company: '',
    projectTitle: '',
    category: 'Enterprise Solutions',
    budget: '$10,000 - $30,000',
    deadline: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [errors, setErrors] = useState({});

  // Validate Consultation Form
  const validateConsult = () => {
    const errs = {};
    if (!consultForm.name.trim()) errs.name = 'Full name is required.';
    if (!consultForm.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(consultForm.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    const cleanPhone = consultForm.phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) errs.phone = 'Phone number must contain exactly 10 digits.';
    if (!consultForm.preferredDate) errs.preferredDate = 'Please select a preferred date.';
    if (!consultForm.preferredTime) errs.preferredTime = 'Please select a preferred time.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Validate Project Request Form
  const validateProject = () => {
    const errs = {};
    if (!projectForm.clientName.trim()) errs.clientName = 'Client name is required.';
    if (!projectForm.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(projectForm.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    const cleanPhone = projectForm.phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) errs.phone = 'Phone number must contain exactly 10 digits.';
    if (!projectForm.projectTitle.trim()) errs.projectTitle = 'Project title is required.';
    if (!projectForm.category) errs.category = 'Project category is required.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Submit Consultation Form (POST /api/consultation)
  const handleConsultSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    if (!validateConsult()) return;

    setLoading(true);
    try {
      const payload = {
        name: consultForm.name.trim(),
        email: consultForm.email.trim(),
        phone: consultForm.phone.replace(/\D/g, ''),
        service: consultForm.service,
        preferredDate: consultForm.preferredDate,
        preferredTime: consultForm.preferredTime, // Format: HH:mm:ss
        budget: consultForm.budget,
        message: consultForm.message.trim() || 'Booked via Architecture Consultation portal'
      };

      await consultationService.bookConsultation(payload);

      setStatus({
        type: 'success',
        message: 'Consultation session booked successfully! A calendar invitation will be dispatched to your email.'
      });
      setConsultForm({
        name: '',
        email: '',
        phone: '',
        service: 'Java Spring Boot & Architecture',
        preferredDate: '',
        preferredTime: '10:00:00',
        budget: '$5,000 - $15,000',
        message: ''
      });
      setErrors({});
    } catch (err) {
      console.error('Consultation booking error:', err);
      const serverMsg =
        err.response?.data?.message ||
        err.response?.data ||
        'Failed to book consultation. Please verify your details.';
      setStatus({
        type: 'error',
        message: typeof serverMsg === 'string' ? serverMsg : 'Booking failed. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  // Submit Project Request Form (POST /api/project-request)
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    if (!validateProject()) return;

    setLoading(true);
    try {
      const payload = {
        clientName: projectForm.clientName.trim(),
        email: projectForm.email.trim(),
        phone: projectForm.phone.replace(/\D/g, ''),
        company: projectForm.company.trim() || 'N/A',
        projectTitle: projectForm.projectTitle.trim(),
        category: projectForm.category,
        description: projectForm.description.trim() || 'Comprehensive project scope submission',
        budget: projectForm.budget,
        deadline: projectForm.deadline ? projectForm.deadline : null
      };

      await projectRequestService.submitProjectRequest(payload);

      setStatus({
        type: 'success',
        message: 'Project request registered successfully! Our engineering team will produce a technical breakdown.'
      });
      setProjectForm({
        clientName: '',
        email: '',
        phone: '',
        company: '',
        projectTitle: '',
        category: 'Enterprise Solutions',
        budget: '$10,000 - $30,000',
        deadline: '',
        description: ''
      });
      setErrors({});
    } catch (err) {
      console.error('Project request error:', err);
      const serverMsg =
        err.response?.data?.message ||
        err.response?.data ||
        'Failed to submit project request. Please check your inputs.';
      setStatus({
        type: 'error',
        message: typeof serverMsg === 'string' ? serverMsg : 'Submission failed.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen py-16 transition-colors duration-150">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <SectionHeading
          tag="Engagement Portal"
          title="Architecture &"
          highlightText="Project Scoping"
          subtext="Book a 1-on-1 discovery session with our senior engineers or submit a full project requirement specification."
        />

        {/* Tab Switcher */}
        <div className="flex items-center justify-center">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-1.5 rounded-xl flex items-center gap-2 shadow-sm dark:shadow-none">
            <button
              onClick={() => { setActiveTab('consultation'); setStatus({ type: '', message: '' }); }}
              className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'consultation'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Book Architecture Session</span>
            </button>
            <button
              onClick={() => { setActiveTab('projectRequest'); setStatus({ type: '', message: '' }); }}
              className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'projectRequest'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Submit Project Specification</span>
            </button>
          </div>
        </div>

        {/* Status Notification */}
        {status.message && (
          <div
            className={`p-4 rounded-xl text-xs flex items-start gap-3 ${
              status.type === 'success'
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                : 'bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300'
            }`}
          >
            {status.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
            )}
            <span className="leading-relaxed">{status.message}</span>
          </div>
        )}

        {/* Form Container */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-sm dark:shadow-xl">
          
          {/* TAB 1: CONSULTATION BOOKING (POST /api/consultation) */}
          {activeTab === 'consultation' && (
            <form onSubmit={handleConsultSubmit} className="space-y-5">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Schedule Discovery Session
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Connect with a lead architect to evaluate data schemas, framework tradeoffs, and technical feasibility.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={consultForm.name}
                    onChange={(e) => setConsultForm({ ...consultForm, name: e.target.value })}
                    placeholder="e.g. Elena Rostova"
                    className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                      errors.name ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
                    }`}
                  />
                  {errors.name && <p className="text-[10px] text-rose-500 mt-0.5">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Work Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={consultForm.email}
                    onChange={(e) => setConsultForm({ ...consultForm, email: e.target.value })}
                    placeholder="e.g. elena@company.com"
                    className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                      errors.email ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
                    }`}
                  />
                  {errors.email && <p className="text-[10px] text-rose-500 mt-0.5">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Phone (10 Digits) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={consultForm.phone}
                    onChange={(e) => setConsultForm({ ...consultForm, phone: e.target.value })}
                    placeholder="e.g. 9876543210"
                    maxLength={10}
                    className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                      errors.phone ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
                    }`}
                  />
                  {errors.phone && <p className="text-[10px] text-rose-500 mt-0.5">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Architecture Focus <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={consultForm.service}
                    onChange={(e) => setConsultForm({ ...consultForm, service: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="Java Spring Boot & Architecture">Java Spring Boot & Architecture</option>
                    <option value="Enterprise ERP Systems">Enterprise ERP Systems</option>
                    <option value="Modern React & Web App">Modern React & Web App</option>
                    <option value="Hospital Management & EMR">Hospital Management & EMR</option>
                    <option value="Cloud Migration & DevOps">Cloud Migration & DevOps</option>
                    <option value="AI & Machine Learning Integration">AI & Machine Learning Integration</option>
                  </select>
                </div>
              </div>

              {/* Preferred Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Preferred Session Date <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={consultForm.preferredDate}
                    onChange={(e) => setConsultForm({ ...consultForm, preferredDate: e.target.value })}
                    className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                      errors.preferredDate ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
                    }`}
                  />
                  {errors.preferredDate && <p className="text-[10px] text-rose-500 mt-0.5">{errors.preferredDate}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Preferred Time Slot (IST) <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={consultForm.preferredTime}
                    onChange={(e) => setConsultForm({ ...consultForm, preferredTime: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="10:00:00">10:00 AM IST</option>
                    <option value="11:30:00">11:30 AM IST</option>
                    <option value="14:00:00">02:00 PM IST</option>
                    <option value="16:00:00">04:00 PM IST</option>
                    <option value="17:30:00">05:30 PM IST</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Estimated Budget Range
                </label>
                <select
                  value={consultForm.budget}
                  onChange={(e) => setConsultForm({ ...consultForm, budget: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="Under $5,000">Under $5,000</option>
                  <option value="$5,000 - $15,000">$5,000 - $15,000</option>
                  <option value="$15,000 - $35,000">$15,000 - $35,000</option>
                  <option value="$35,000+">$35,000+</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Brief Agenda / Architecture Overview
                </label>
                <textarea
                  rows={3}
                  value={consultForm.message}
                  onChange={(e) => setConsultForm({ ...consultForm, message: e.target.value })}
                  placeholder="What key challenges or questions would you like to cover during our session?"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-6 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:opacity-50 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Booking Discovery Session...</span>
                    </>
                  ) : (
                    <>
                      <span>Confirm Consultation Session</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: COMPREHENSIVE PROJECT REQUEST (POST /api/project-request) */}
          {activeTab === 'projectRequest' && (
            <form onSubmit={handleProjectSubmit} className="space-y-5">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Submit Full Project Specification
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Provide detailed project metrics, company details, target timelines, and functional requirements.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Client / Lead Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={projectForm.clientName}
                    onChange={(e) => setProjectForm({ ...projectForm, clientName: e.target.value })}
                    placeholder="e.g. Marcus Vance"
                    className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                      errors.clientName ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
                    }`}
                  />
                  {errors.clientName && <p className="text-[10px] text-rose-500 mt-0.5">{errors.clientName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Organization / Company
                  </label>
                  <input
                    type="text"
                    value={projectForm.company}
                    onChange={(e) => setProjectForm({ ...projectForm, company: e.target.value })}
                    placeholder="e.g. Vance Logistics Corp"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Work Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={projectForm.email}
                    onChange={(e) => setProjectForm({ ...projectForm, email: e.target.value })}
                    placeholder="e.g. marcus@vance.com"
                    className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                      errors.email ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
                    }`}
                  />
                  {errors.email && <p className="text-[10px] text-rose-500 mt-0.5">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Phone (10 Digits) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={projectForm.phone}
                    onChange={(e) => setProjectForm({ ...projectForm, phone: e.target.value })}
                    placeholder="e.g. 9876543210"
                    maxLength={10}
                    className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                      errors.phone ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
                    }`}
                  />
                  {errors.phone && <p className="text-[10px] text-rose-500 mt-0.5">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Project Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={projectForm.projectTitle}
                    onChange={(e) => setProjectForm({ ...projectForm, projectTitle: e.target.value })}
                    placeholder="e.g. Fleet Consignment Dispatcher"
                    className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                      errors.projectTitle ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
                    }`}
                  />
                  {errors.projectTitle && <p className="text-[10px] text-rose-500 mt-0.5">{errors.projectTitle}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="Enterprise Solutions">Enterprise Solutions</option>
                    <option value="Healthcare Systems">Healthcare Systems</option>
                    <option value="Education Platforms">Education Platforms</option>
                    <option value="Custom Software Development">Custom Software Development</option>
                    <option value="E-Commerce Platforms">E-Commerce Platforms</option>
                    <option value="Mobile Applications">Mobile Applications</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Target Completion / Launch Date
                  </label>
                  <input
                    type="date"
                    value={projectForm.deadline}
                    onChange={(e) => setProjectForm({ ...projectForm, deadline: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Target Budget Range
                  </label>
                  <select
                    value={projectForm.budget}
                    onChange={(e) => setProjectForm({ ...projectForm, budget: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                    <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                    <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                    <option value="$100,000+">$100,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Full Functional Requirements & User Roles
                </label>
                <textarea
                  rows={4}
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  placeholder="Detail user roles, third-party APIs (Stripe, Twilio, ERP), database volume expectations, and delivery expectations..."
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-6 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:opacity-50 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Registering Project Request...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Project Specification</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};

export default Consultation;
