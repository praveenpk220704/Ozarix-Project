import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, Target, Award, Compass, Code2,
  Terminal, Server, Laptop, ArrowRight, CheckCircle2
} from 'lucide-react';
import SectionHeading from '../../components/common/SectionHeading';
import Button from '../../components/common/Button';
import ceoImage from '../../assets/ceo.png';
import vasuImage from '../../assets/vasu.png';

const About = () => {
  const principles = [
    {
      title: 'Architectural Discipline',
      desc: 'We prioritize maintainable code, type safety, relational integrity, and modular boundaries over shortcuts.',
      icon: ShieldCheck
    },
    {
      title: 'Problem-First Engineering',
      desc: 'We start by deeply analyzing the business workflow, designing data models that directly solve operational pain points.',
      icon: Target
    },
    {
      title: 'Direct Communication',
      desc: 'Transparent milestones, clear weekly demos, and direct access to the engineers writing your code.',
      icon: Award
    },
    {
      title: 'Sustainable Technology',
      desc: 'Choosing robust, supported technology stacks like Java 21, Spring Boot, React, and PostgreSQL for long-term viability.',
      icon: Compass
    }
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen py-16 transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

        {/* Editorial Introduction */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 px-2.5 py-1 rounded-md inline-block">
            Our Purpose
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Engineering Durable Systems For Modern Enterprises
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            OZARIX TECHNOLOGY is an independent digital engineering firm dedicated to building enterprise software, robust backends, and responsive applications that deliver measurable value.
          </p>
        </div>

        {/* Cinematic Workspace Visual & Mission Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white dark:bg-slate-900/50 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-sm dark:shadow-none">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Our Mission & Engineering Philosophy
            </h2>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              We founded OZARIX TECHNOLOGY on the belief that digital systems should be engineered with the same rigor and dependability as physical infrastructure.
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Many technology projects fail not because of poor ideas, but because of fragile architectures, unmaintainable dependencies, and rushed implementations. At Ozarix, we build with long-term stability in mind—writing type-safe Java Spring Boot backends, cleanly componentized React frontends, and ACID-compliant PostgreSQL database structures.
            </p>

            <div className="space-y-2.5 pt-2 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <span>Zero tolerance for untested or undocumented APIs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <span>Standardized security, authentication, and role-based permissions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <span>Production deployment with containerization and cloud orchestration</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl relative">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80"
                alt="Ozarix Technology Workspace"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg bg-slate-900/90 backdrop-blur-sm border border-slate-800 text-xs text-slate-300">
                <strong className="text-white block font-semibold">INNOVATE • INTEGRATE • ELEVATE</strong>
                <span>Committed to engineering software that empowers businesses to scale.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Core Principles */}
        <div className="space-y-8">
          <SectionHeading
            tag="Values"
            title="Our Core Engineering"
            highlightText="Principles"
            subtext="The technical criteria and operational values that govern every project we deliver."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div key={idx} className="bg-white dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 rounded-xl p-6 space-y-3 shadow-sm dark:shadow-none hover:shadow-md transition-shadow">
                  <div className="h-10 w-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{p.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Leadership Team */}
        <div className="space-y-10">
          <SectionHeading
            tag="Leadership"
            title="Our Founding"
            highlightText="Leadership"
            subtext="The architects and visionary leaders driving the engineering standards of OZARIX TECHNOLOGY."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Praveen Kumar */}
            <div className="bg-white dark:bg-slate-900/40 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm dark:shadow-none flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                  <div className="h-36 w-36 rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 shadow-md bg-slate-100 dark:bg-slate-950 flex-shrink-0">
                    <img
                      src={ceoImage}
                      alt="Praveen Kumar, Founder & CEO"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                      Founder & CEO
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      Praveen Kumar
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Principal Architect
                    </p>
                  </div>
                </div>

                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  "Our vision for OZARIX TECHNOLOGY is to create an engineering culture that values architectural integrity and tangible business results over buzzwords. Every line of backend Java code and every frontend component we write is designed to perform dependably in mission-critical environments."
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 mt-6 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Specialization:</span> Enterprise Spring Boot, PostgreSQL, Scalable React Architectures
              </div>
            </div>

            {/* Vasudevan */}
            <div className="bg-white dark:bg-slate-900/40 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm dark:shadow-none flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                  <div className="h-36 w-36 rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 shadow-md bg-slate-100 dark:bg-slate-950 flex-shrink-0">
                    <img
                      src={vasuImage}
                      alt="Vasudevan, Co-Founder"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                      Co-Founder
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      Vasudevan
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Co-Founder & Technology Lead
                    </p>
                  </div>
                </div>

                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  "At OZARIX TECHNOLOGY, we bridge visionary ideas with rock-solid execution. We focus on building intuitive, resilient systems that empower enterprises to streamline operations and scale without technical bottlenecks."
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 mt-6 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Specialization:</span> Modern Systems Architecture, Full-Stack Engineering, Digital Innovation
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-8">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            Ready to Build Your System?
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-lg mx-auto mb-6">
            Get in touch with our team to discuss your project roadmap and architectural requirements.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button to="/contact" variant="primary">
              <span>Start a Project Inquiry</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button to="/services" variant="outline">
              <span>View Services</span>
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
