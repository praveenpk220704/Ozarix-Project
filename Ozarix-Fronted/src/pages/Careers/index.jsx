import React, { useState } from 'react';
import { 
  MapPin, Clock, 
  Send, CheckCircle2, AlertCircle, 
  Loader2, X, Upload, ArrowRight, Check 
} from 'lucide-react';
import { careersData } from '../../config/mockData';
import { careerService } from '../../services/apiService';
import SectionHeading from '../../components/common/SectionHeading';

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '3 Years',
    coverLetter: '',
    resume: null,
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [errors, setErrors] = useState({});

  const handleOpenApply = (job) => {
    setSelectedJob(job);
    setForm({
      fullName: '',
      email: '',
      phone: '',
      experience: job.experience || '2 - 4 Years',
      coverLetter: '',
      resume: null,
    });
    setErrors({});
    setStatus({ type: '', message: '' });
  };

  const validateForm = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = 'Full name is required.';
    
    if (!form.email.trim()) {
      errs.email = 'Email address is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email.trim())) {
        errs.email = 'Please enter a valid email address.';
      }
    }

    if (!form.phone.trim()) {
      errs.phone = 'Phone number is required.';
    }

    if (!form.resume) {
      errs.resume = 'Resume document (PDF/DOC) is required.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    if (!validateForm()) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('fullName', form.fullName.trim());
      formData.append('email', form.email.trim());
      formData.append('phone', form.phone.trim());
      formData.append('position', selectedJob.title);
      formData.append('experience', form.experience);
      formData.append('coverLetter', form.coverLetter.trim() || 'Applied via Careers portal');
      formData.append('resume', form.resume);

      await careerService.apply(formData);

      setStatus({
        type: 'success',
        message: 'Application submitted successfully! Our engineering team will review your qualifications and contact you.',
      });

      setTimeout(() => {
        setSelectedJob(null);
        setStatus({ type: '', message: '' });
      }, 3500);
    } catch (err) {
      console.error('Career application error:', err);
      const serverMsg =
        err.response?.data?.message ||
        err.response?.data ||
        'Failed to submit application. Please check your information and file format.';
      setStatus({
        type: 'error',
        message: typeof serverMsg === 'string' ? serverMsg : 'Submission failed. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen py-16 transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <SectionHeading
          tag="Engineering Careers"
          title="Build Real Systems With"
          highlightText="Ozarix"
          subtext="Join an engineering-first team focused on architectural discipline, clean code, and solving tangible enterprise problems."
        />

        {/* Culture Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 rounded-xl space-y-2 shadow-sm dark:shadow-none">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Engineering Standards</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              We write type-safe, tested code and value modular architecture over hasty workarounds.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 rounded-xl space-y-2 shadow-sm dark:shadow-none">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Remote-First Flexibility</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Distributed team across India with asynchronous communication and clear milestone reviews.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 rounded-xl space-y-2 shadow-sm dark:shadow-none">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Direct Ownership</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Work directly on enterprise software architectures, from database schemas to production release.
            </p>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Current Open Roles
          </h2>

          <div className="space-y-4">
            {careersData.map((job) => (
              <div
                key={job.id}
                className="bg-white dark:bg-slate-900/70 border border-slate-200/90 dark:border-slate-800 rounded-xl p-6 sm:p-8 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-sm dark:shadow-none"
              >
                <div className="space-y-3 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 px-2.5 py-0.5 rounded">
                      {job.department}
                    </span>
                    <span className="text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                      {job.location}
                    </span>
                    <span className="text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded flex items-center gap-1">
                      <Clock className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                      {job.experience}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {job.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {job.overview}
                  </p>

                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                      Core Technical Requirements:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                      {job.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                          <span className="leading-tight">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="lg:text-right flex flex-col justify-center">
                  <button
                    onClick={() => handleOpenApply(job)}
                    className="px-6 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Apply for Role</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-2 block">
                    Fast review within 48 hours
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Application Modal (Submitting Multipart to POST /api/career/apply) */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 px-2 py-0.5 rounded">
                Application Form
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                {selectedJob.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Submitted directly to the Ozarix engineering talent database.
              </p>
            </div>

            {status.message && (
              <div
                className={`p-3.5 rounded-lg text-xs flex items-start gap-2.5 ${
                  status.type === 'success'
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                    : 'bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300'
                }`}
              >
                {status.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
                )}
                <span>{status.message}</span>
              </div>
            )}

            <form onSubmit={handleApplySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  placeholder="e.g. Praveen Kumar"
                  className={`w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                    errors.fullName ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
                  }`}
                />
                {errors.fullName && <p className="text-[10px] text-rose-500 mt-0.5">{errors.fullName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="e.g. engineer@example.com"
                    className={`w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                      errors.email ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
                    }`}
                  />
                  {errors.email && <p className="text-[10px] text-rose-500 mt-0.5">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Phone <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="e.g. 9876543210"
                    className={`w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                      errors.phone ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
                    }`}
                  />
                  {errors.phone && <p className="text-[10px] text-rose-500 mt-0.5">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Years of Relevant Experience
                </label>
                <input
                  type="text"
                  value={form.experience}
                  onChange={(e) => setForm({ ...form, experience: e.target.value })}
                  placeholder="e.g. 4 Years"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Resume File Upload */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Resume Document (PDF, DOCX) <span className="text-rose-500">*</span>
                </label>
                <div className="border border-dashed border-slate-300 dark:border-slate-800 hover:border-blue-500 rounded-lg p-4 bg-slate-50 dark:bg-slate-950 text-center cursor-pointer transition-colors">
                  <input
                    type="file"
                    id="resume-file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setForm({ ...form, resume: e.target.files[0] })}
                    className="hidden"
                  />
                  <label htmlFor="resume-file" className="cursor-pointer block">
                    <Upload className="w-5 h-5 text-blue-600 dark:text-blue-400 mx-auto mb-1.5" />
                    <span className="text-xs text-slate-700 dark:text-slate-300 block">
                      {form.resume ? form.resume.name : 'Click to select resume document (Max 10MB)'}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">PDF, DOC, DOCX accepted</span>
                  </label>
                </div>
                {errors.resume && <p className="text-[10px] text-rose-500 mt-0.5">{errors.resume}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Short Note / Cover Letter
                </label>
                <textarea
                  rows={3}
                  value={form.coverLetter}
                  onChange={(e) => setForm({ ...form, coverLetter: e.target.value })}
                  placeholder="Share a brief overview of relevant software projects or GitHub profile link..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Uploading Application...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Careers;
