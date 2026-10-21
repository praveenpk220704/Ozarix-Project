import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HeartPulse, ShoppingBag, GraduationCap, 
  Truck, Layers, BarChart3, ArrowRight, Check 
} from 'lucide-react';
import SectionHeading from '../../components/common/SectionHeading';
import Button from '../../components/common/Button';

const Industries = () => {
  const industries = [
    {
      id: 'healthcare',
      title: 'Healthcare & HealthTech',
      icon: HeartPulse,
      tag: 'Clinical Software',
      desc: 'HIPAA-conscious electronic medical records (EMR), outpatient doctor appointments, diagnostic laboratory sync, and automated pharmacy dispensary records.',
      solutions: [
        'Electronic Health Record (EHR) audit logging',
        'Doctor consultation scheduling & slot availability',
        'Pharmacy stock decrement & batch expiry tracking',
        'Role-based access for physicians, nurses, and billing staff'
      ]
    },
    {
      id: 'enterprise',
      title: 'Enterprise & ERP',
      icon: Layers,
      tag: 'Resource Planning',
      desc: 'Centralized resource planning platforms that synchronize procurement workflows, multi-warehouse inventory levels, employee payroll, and financial ledgers.',
      solutions: [
        'Real-time multi-location stock reconciliation',
        'Departmental requisition & purchase order approvals',
        'Automated invoice generation & ledger balance validation',
        'Consolidated operational reporting dashboards'
      ]
    },
    {
      id: 'education',
      title: 'Education & EdTech',
      icon: GraduationCap,
      tag: 'Academic Systems',
      desc: 'Institutional administration platforms for colleges, polytechnics, and schools coordinating student admissions, timetable scheduling, and fee collection.',
      solutions: [
        'Student enrollment & demographic record directories',
        'Academic examination gradebooks & transcripts',
        'Tuition fee collection gates with PDF receipting',
        'Faculty course load & lecture timetable scheduling'
      ]
    },
    {
      id: 'logistics',
      title: 'Logistics & Supply Chain',
      icon: Truck,
      tag: 'Freight & Fleet',
      desc: 'Consignment tracking platforms, route dispatchers, and warehouse manifest systems designed with offline caching and mobile driver communication.',
      solutions: [
        'Real-time delivery route dispatching & tracking',
        'Consignment milestone logging & delivery proofs',
        'Driver mobile interfaces with offline sync caching',
        'Customer automated delivery notification triggers'
      ]
    },
    {
      id: 'ecommerce',
      title: 'Retail & E-commerce',
      icon: ShoppingBag,
      tag: 'Digital Commerce',
      desc: 'High-performance digital storefronts, shopping carts, and inventory synchronization platforms engineered for rapid catalog queries and high conversion rates.',
      solutions: [
        'Lightning-fast catalog indexing & facet filters',
        'Payment gateway integration (Stripe, Razorpay)',
        'Inventory balance locks preventing checkout overselling',
        'Automated dispatch order generation & email receipts'
      ]
    },
    {
      id: 'finance',
      title: 'Finance & Operations',
      icon: BarChart3,
      tag: 'Financial Systems',
      desc: 'Secure transactional ledgers, invoice automation, and reconciliation workflows adhering to strict ACID properties and audit trail compliance.',
      solutions: [
        'Double-entry bookkeeping data structures',
        'Automated accounts payable & receivable schedules',
        'Bank feed reconciliation & statement matching',
        'Immutable cryptographic audit logging'
      ]
    }
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen py-16 transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <SectionHeading
          tag="Domain Expertise"
          title="Industry-Specific"
          highlightText="Solutions"
          subtext="We tailor software architectures to the compliance standards, operational workflows, and data models of your industry."
        />

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.id}
                className="bg-white dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 rounded-xl p-6 flex flex-col justify-between space-y-6 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all group shadow-sm dark:shadow-none"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded">
                      {ind.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {ind.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {ind.desc}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                      Core Systems Delivered:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                      {ind.solutions.map((sol, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-500 flex-shrink-0 mt-0.5" />
                          <span className="leading-tight">{sol}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-white transition-colors"
                  >
                    <span>Request Industry Proposal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="bg-white dark:bg-slate-900/50 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-8 text-center space-y-4 max-w-2xl mx-auto shadow-sm dark:shadow-none">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Have a Specific Industry Workflow to Digitize?
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Our engineering team will assess your domain requirements and design a tailored architecture roadmap.
          </p>
          <div>
            <Button to="/consultation" variant="primary">
              <span>Book Architecture Consultation</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Industries;
