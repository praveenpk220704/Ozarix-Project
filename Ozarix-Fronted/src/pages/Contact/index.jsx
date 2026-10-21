import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Clock, Send, 
  CheckCircle2, AlertCircle, Loader2, ArrowRight 
} from 'lucide-react';
import { contactService } from '../../services/apiService';
import SectionHeading from '../../components/common/SectionHeading';
import Button from '../../components/common/Button';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Custom Software Development',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full name is required.';
    
    if (!form.email.trim()) {
      errs.email = 'Email address is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+$/;
      if (!emailRegex.test(form.email.trim())) {
        errs.email = 'Please enter a valid email address.';
      }
    }

    if (!form.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else {
      const digits = form.phone.replace(/\D/g, '');
      if (digits.length !== 10) {
        errs.phone = 'Phone number must contain exactly 10 digits.';
      }
    }

    if (!form.service) {
      errs.service = 'Please select a service category.';
    }

    if (!form.message.trim()) {
      errs.message = 'Please provide a description of your project.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    if (!validate()) return;

    setLoading(true);
    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.replace(/\D/g, ''),
        service: form.service,
        message: form.message.trim()
      };

      await contactService.submitContact(payload);

      setStatus({
        type: 'success',
        message: 'Your inquiry has been successfully transmitted to the Ozarix engineering team. We will review your requirements and respond within 24 hours.'
      });
      setForm({
        name: '',
        email: '',
        phone: '',
        service: 'Custom Software Development',
        message: ''
      });
      setErrors({});
    } catch (err) {
      console.error('Contact submission error:', err);
      let errorMsg = 'Failed to submit inquiry. Please verify your details.';
      if (err.code === 'ECONNABORTED' || err.message?.includes('timeout')) {
        errorMsg = 'Server response took too long. Please try again or check your network.';
      } else if (err.response?.data?.message) {
        errorMsg = err.response.data.message;
      } else if (typeof err.response?.data === 'string') {
        errorMsg = err.response.data;
      }
      setStatus({
        type: 'error',
        message: errorMsg
      });
    } finally {
      setLoading(false);
    }
  };

  const contactCards = [
    {
      title: 'Inquiries & Proposals',
      desc: 'contact@ozarix.tech',
      sub: 'Monitored by senior leads',
      icon: Mail,
      href: 'mailto:contact@ozarix.tech'
    },
    {
      title: 'Direct Hotline',
      desc: '+91 98765 43210',
      sub: 'Direct engineering discussion',
      icon: Phone,
      href: 'tel:+919876543210'
    },
    {
      title: 'Operating Hours',
      desc: 'Mon - Fri • 9:00 AM - 6:00 PM',
      sub: 'Indian Standard Time (IST)',
      icon: Clock
    },
    {
      title: 'Delivery Coverage',
      desc: 'India & Worldwide Clients',
      sub: 'Fully remote-enabled collaboration',
      icon: MapPin
    }
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen py-16 transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <SectionHeading
          tag="Direct Communication"
          title="Connect With Our"
          highlightText="Engineering Team"
          subtext="Ready to build a reliable digital platform or modernize existing systems? Reach out to start the conversation."
        />

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 rounded-xl p-6 space-y-3 shadow-sm dark:shadow-none hover:shadow-md transition-shadow"
              >
                <div className="h-10 w-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {card.title}
                  </h4>
                  {card.href ? (
                    <a
                      href={card.href}
                      className="text-sm font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors block mt-0.5"
                    >
                      {card.desc}
                    </a>
                  ) : (
                    <span className="text-sm font-semibold text-slate-900 dark:text-white block mt-0.5">
                      {card.desc}
                    </span>
                  )}
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-1">
                    {card.sub}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Form and Context Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start bg-white dark:bg-slate-900/40 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-sm dark:shadow-none">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
              Engagement Lifecycle
            </span>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              What Happens After You Submit?
            </h3>
            
            <div className="space-y-4 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
                <strong className="text-blue-600 dark:text-blue-400 block font-semibold">1. Scope Review</strong>
                <p className="text-slate-600 dark:text-slate-400">Our engineering leads review your project requirements, tech stack preferences, and feasibility within 24 hours.</p>
              </div>
              <div className="p-3.5 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
                <strong className="text-blue-600 dark:text-blue-400 block font-semibold">2. Architecture Discovery Call</strong>
                <p className="text-slate-600 dark:text-slate-400">We schedule a focused 30-minute discovery session to align on database structures, user roles, and security requirements.</p>
              </div>
              <div className="p-3.5 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
                <strong className="text-blue-600 dark:text-blue-400 block font-semibold">3. Detailed Proposal & Milestones</strong>
                <p className="text-slate-600 dark:text-slate-400">You receive a written technical specification document with sprint breakdown and transparent milestones.</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-slate-50/70 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl p-6 sm:p-8 shadow-sm dark:shadow-xl">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
              Send Project Inquiry
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Transmitted directly to our Spring Boot backend REST endpoint.
            </p>

            {status.message && (
              <div
                className={`p-4 rounded-lg mb-6 text-xs flex items-start gap-3 ${
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

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className={`w-full px-3.5 py-2.5 text-xs bg-white dark:bg-slate-900 border rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                      errors.name ? 'border-rose-500' : 'border-slate-300 dark:border-slate-800'
                    }`}
                  />
                  {errors.name && <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="e.g. rahul@company.com"
                    className={`w-full px-3.5 py-2.5 text-xs bg-white dark:bg-slate-900 border rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                      errors.email ? 'border-rose-500' : 'border-slate-300 dark:border-slate-800'
                    }`}
                  />
                  {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Phone (10 Digits) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="e.g. 9876543210"
                    maxLength={10}
                    className={`w-full px-3.5 py-2.5 text-xs bg-white dark:bg-slate-900 border rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                      errors.phone ? 'border-rose-500' : 'border-slate-300 dark:border-slate-800'
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Service Required <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="Custom Software Development">Custom Software Development</option>
                    <option value="Java Spring Boot Development">Java Spring Boot Development</option>
                    <option value="Web Application Development">Web Application Development</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                    <option value="ERP Systems Development">ERP Systems Development</option>
                    <option value="Hospital Management Systems">Hospital Management Systems</option>
                    <option value="Cloud & DevOps Infrastructure">Cloud & DevOps Infrastructure</option>
                    <option value="AI & Machine Learning">AI & Machine Learning</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Project Description <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Describe the scope, expected workflow, target launch window, or technical stack preferences..."
                  className={`w-full px-3.5 py-2.5 text-xs bg-white dark:bg-slate-900 border rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                    errors.message ? 'border-rose-500' : 'border-slate-300 dark:border-slate-800'
                  }`}
                ></textarea>
                {errors.message && <p className="text-[11px] text-rose-500 mt-1">{errors.message}</p>}
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
                      <span>Sending to Backend...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Inquiry</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;
