import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, Phone, MapPin, ShieldCheck, Code2, Globe } from 'lucide-react';
import logo from '../../assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-sm">
      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Column (2 spans on desktop) */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-blue-600 p-0.5 shadow-sm flex items-center justify-center">
                <div className="h-full w-full bg-slate-950 rounded-[6px] flex items-center justify-center p-1">
                  <img src={logo} alt="Ozarix Logo" className="h-full w-full object-contain" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-lg text-white tracking-tight">
                  OZARIX TECHNOLOGY
                </span>
                <span className="text-[10px] tracking-widest text-blue-400 font-semibold uppercase -mt-0.5">
                  Innovate • Integrate • Elevate
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Engineering high-resilience digital software, enterprise Spring Boot architectures, modern web & mobile platforms, and AI-enabled operations.
            </p>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <a href="mailto:contact@ozarix.tech" className="hover:text-white transition-colors">
                  contact@ozarix.tech
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>Global Delivery • India & Worldwide Clients</span>
              </div>
            </div>
          </div>

          {/* Core Services */}
          <div className="space-y-4">
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-slate-200">
              Core Capabilities
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Custom Software Development
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Java Spring Boot Engineering
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Full Stack React & Web Apps
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Mobile App Development
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Enterprise ERP Systems
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Cloud Infrastructure & DevOps
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation & Company */}
          <div className="space-y-4">
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-slate-200">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Our Firm
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-white transition-colors">
                  Featured Case Studies
                </Link>
              </li>
              <li>
                <Link to="/technologies" className="hover:text-white transition-colors">
                  Technology Stack
                </Link>
              </li>
              <li>
                <Link to="/industries" className="hover:text-white transition-colors">
                  Industries Served
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-white transition-colors">
                  Engineering Careers
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition-colors">
                  Client & Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Consultation & Quick Action */}
          <div className="space-y-4">
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-slate-200">
              Engage With Us
            </h4>
            <p className="text-xs text-slate-400">
              Schedule an architecture discovery session with our senior engineers.
            </p>
            <div className="space-y-2">
              <Link
                to="/consultation"
                className="inline-flex items-center justify-between w-full px-3.5 py-2 text-xs font-medium text-white bg-slate-900 border border-slate-800 rounded-lg hover:border-blue-600 transition-colors"
              >
                <span>Book Consultation</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-blue-400" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-between w-full px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors"
              >
                <span>Request Proposal</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900 bg-slate-950/80 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div>
            &copy; {currentYear} OZARIX TECHNOLOGY. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-slate-400">Security-Audited Backend</span>
            <span>•</span>
            <span className="text-slate-400">Java Spring Boot 3.5 & React</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
