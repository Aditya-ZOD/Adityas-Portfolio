import React from 'react';
import { educationData } from '../../data/education';
import { certificatesData } from '../../data/certificates';
import { Badge } from '../ui/Badge';
import { GraduationCap, Calendar, Award, BookOpen, CheckCircle2, FileText } from 'lucide-react';

export const JourneySection: React.FC = () => {
  const milestones = [
    {
      period: "2025 — 2028 (Expected)",
      title: "Bachelor of Computer Applications (BCA)",
      institution: "Thakur Shyamnarayan Degree College",
      type: "Formal Degree",
      description: "Rigorous academic study focusing on algorithmic problem solving, object-oriented design in C++ and Python, database architectures, discrete mathematics, and web technologies.",
      verified: true
    },
    {
      period: "2026",
      title: "OmniPredict AI — Collegiate Exhibition Project",
      institution: "Team XSpark @ Thakur Shyamnarayan Degree College",
      type: "Exhibition Showcase",
      description: "Team project with Archis Dharne and Neel Davane. Engineered an end-to-end predictive analytics platform with an autonomous 5-step pipeline and a human-in-the-loop AI dataset assistant.",
      verified: true
    },
    {
      period: "2026",
      title: "NutriAI — Full-Stack Nutrition Platform",
      institution: "Independent Project by Aditya Gupta",
      type: "Full-Stack AI Project",
      description: "Engineered a Hybrid Intelligence Architecture pairing deterministic Python math with local Ollama models. Validated via an automated 11-test pytest suite.",
      verified: true
    }
  ];

  return (
    <section id="journey" className="py-24 relative border-b border-cosmos-800/60 bg-cosmos-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 space-y-3">
          <Badge variant="cyan" className="font-mono text-xs">
            04 // ACADEMIC MILESTONES & CREDENTIALS
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Education & Journey
          </h2>
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg">
            Aditya's undergraduate timeline, collegiate technical showcases, and verified academic milestones.
          </p>
        </div>

        {/* Education Highlight Card */}
        <div className="p-8 rounded-3xl glass-panel border border-electric-cyan/25 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-electric-cyan/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="cyan" icon={<GraduationCap className="w-3.5 h-3.5" />}>
                  Undergraduate Degree
                </Badge>
                <span className="text-xs font-mono text-slate-400 bg-cosmos-800 px-3 py-1 rounded-full border border-cosmos-700">
                  Graduation: {educationData.expectedGraduation}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                {educationData.degree}
              </h3>
              
              <p className="text-base font-semibold text-electric-cyan">
                {educationData.institution} • {educationData.location}
              </p>

              <p className="text-sm text-slate-300 leading-relaxed">
                {educationData.description}
              </p>

              {/* Coursework Pills */}
              <div className="pt-2">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
                  Key Coursework Disciplines:
                </span>
                <div className="flex flex-wrap gap-2">
                  {educationData.coreCoursework.map((course, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-cosmos-800/80 border border-cosmos-700/60 text-xs text-slate-300 font-mono"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Academic Highlights Column */}
            <div className="lg:col-span-4 p-5 rounded-2xl bg-cosmos-900/90 border border-cosmos-700/60 space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider font-mono text-slate-400 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-matrix-mint" />
                Academic Highlights
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-300">
                {educationData.academicHighlights.map((hl, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-matrix-mint flex-shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Timeline Sequence */}
        <div className="mb-16">
          <h3 className="text-lg font-bold font-display text-white mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-electric-cyan" />
            Chronological Milestones
          </h3>
          <div className="space-y-4">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl glass-panel border border-cosmos-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-electric-cyan font-semibold">
                      {m.period}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs font-mono text-slate-400">
                      {m.type}
                    </span>
                  </div>
                  <h4 className="text-base font-semibold text-white font-display">
                    {m.title}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {m.institution}
                  </p>
                  <p className="text-xs text-slate-300 pt-1 max-w-2xl leading-relaxed">
                    {m.description}
                  </p>
                </div>

                <Badge variant="emerald" className="text-[10px] flex-shrink-0">
                  <CheckCircle2 className="w-3 h-3 text-matrix-mint" />
                  Verified Milestone
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Certificates & Credentials Ledger */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-cyber-violet" />
                Certifications & Credentials Ledger
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Transparent credential ledger. Only verified credentials are listed.
              </p>
            </div>
          </div>

          {certificatesData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {certificatesData.map((cert) => (
                <div
                  key={cert.id}
                  className="p-5 rounded-2xl glass-panel border border-cosmos-700/80 space-y-3 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-xl bg-cosmos-800 border border-cosmos-700 text-slate-400">
                      <FileText className="w-4 h-4" />
                    </div>
                    {cert.verified ? (
                      <Badge variant="emerald" className="text-[10px]">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </Badge>
                    ) : null}
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      {cert.title}
                    </h4>
                    <p className="text-xs font-mono text-slate-400 mt-0.5">
                      {cert.issuer}
                    </p>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {cert.summary}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-cosmos-800/80 bg-cosmos-900/40 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-matrix-mint animate-pulse" />
                    <span className="text-xs font-mono uppercase tracking-wider text-matrix-mint font-semibold">
                      Undergraduate Status Active
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold text-white">
                    Verified Course Certifications in Progress
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Aditya is currently dedicated to his undergraduate studies for the Bachelor of Computer Applications (2025–2028). External specialized certifications (Coursera, Kaggle, DeepLearning.AI) will be published here with verifiable public URLs upon completion. No placeholder or unearned credentials are displayed.
                  </p>
                </div>
                <div className="flex sm:flex-col items-start sm:items-end gap-2 text-xs font-mono text-slate-500 shrink-0">
                  <span className="px-3 py-1.5 rounded-xl bg-cosmos-800/70 border border-cosmos-700/60 text-slate-300">
                    BCA 2025–2028
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Thakur Shyamnarayan Degree College
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
