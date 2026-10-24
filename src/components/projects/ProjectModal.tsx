import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import type { ProjectData } from '../../types';
import { Github, CheckCircle2, Clock, Cpu, Lightbulb, AlertTriangle, ArrowLeft, Users, ShieldAlert } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectData | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Case Study: ${project.title}`} maxWidth="4xl">
      <div className="space-y-8 text-slate-200">
        
        {/* Top Header Strip */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-cosmos-800 to-cosmos-850 border border-electric-cyan/30 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="cyan">{project.category}</Badge>
              <Badge variant="emerald" icon={<CheckCircle2 className="w-3 h-3" />}>
                {project.status}
              </Badge>
              {project.institution && (
                <span className="text-xs font-mono text-slate-400 bg-cosmos-900/80 px-2.5 py-1 rounded-full border border-cosmos-700">
                  {project.institution}
                </span>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              {project.githubUrl && (
                <Button
                  variant="primary"
                  size="sm"
                  icon={<Github className="w-4 h-4" />}
                  onClick={() => window.open(project.githubUrl, '_blank')}
                >
                  View Code Repository
                </Button>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-electric-cyan font-mono mt-1">
              "{project.tagline}"
            </p>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            {project.summary}
          </p>

          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono pt-1">
            <Users className="w-4 h-4 text-slate-400" />
            <span><strong>Contributors / Team:</strong> {project.team}</span>
          </div>
        </div>

        {/* Problem & Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Problem */}
          <div className="p-5 rounded-2xl bg-red-950/20 border border-red-500/30 space-y-2">
            <div className="flex items-center gap-2 text-red-400 font-semibold text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>Problem Statement</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {project.problemStatement}
            </p>
          </div>

          {/* Solution */}
          <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Engineered Solution</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Verified Features vs Planned Roadmap */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Verified Implemented Features */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-matrix-mint font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-matrix-emerald" />
              Verified Implemented Features
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              {project.verifiedFeatures.map((feat, i) => (
                <li key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-cosmos-900/60 border border-cosmos-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-matrix-emerald mt-1.5 flex-shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Planned Roadmap & Future Scope */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              Planned Scope & Future Roadmap
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              {project.plannedRoadmap.map((road, i) => (
                <li key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-cosmos-900/60 border border-cosmos-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                  <span>{road}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Technology Stack Badges */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-2">
            <Cpu className="w-4 h-4 text-electric-cyan" />
            Verified Technology Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-xl bg-cosmos-900 border border-electric-cyan/20 text-xs text-slate-200 font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Technical Decisions & Lessons Learned */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-cosmos-900/80 border border-cosmos-700/60 space-y-2">
            <h4 className="text-sm font-semibold text-white flex items-center gap-2 font-display">
              <Lightbulb className="w-4 h-4 text-electric-cyan" />
              Key Architectural Decisions
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {project.keyDecisions.map((dec, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-electric-cyan">•</span>
                  <span>{dec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-cosmos-900/80 border border-cosmos-700/60 space-y-2">
            <h4 className="text-sm font-semibold text-white flex items-center gap-2 font-display">
              <ShieldAlert className="w-4 h-4 text-cyber-violet" />
              Challenges & Lessons Learned
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {project.challengesLearned.map((chal, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-cyber-violet">•</span>
                  <span>{chal}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-cosmos-700/60 flex items-center justify-between">
          <Button variant="ghost" size="sm" icon={<ArrowLeft className="w-4 h-4" />} onClick={onClose}>
            Back to Projects
          </Button>

          <Button
            variant="outline"
            size="sm"
            icon={<Github className="w-4 h-4" />}
            onClick={() => window.open(project.githubUrl, '_blank')}
          >
            Inspect on GitHub
          </Button>
        </div>

      </div>
    </Modal>
  );
};
