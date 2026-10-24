import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { projectsData } from '../../data/projects';
import type { ProjectData } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ProjectModal } from './ProjectModal';
import { Github, ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectData | null>(null);

  const categories = [
    'All',
    'AI & Machine Learning',
    'Full-Stack Development',
    'Intelligent Automation'
  ];

  const filteredProjects = projectsData.filter((p) =>
    selectedCategory === 'All' ? true : p.category === selectedCategory
  );

  return (
    <section id="projects" className="py-24 relative border-b border-cosmos-800/60 bg-cosmos-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12 space-y-3">
          <Badge variant="cyan" className="font-mono text-xs">
            03 // PRODUCTION & RESEARCH CODE
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Featured Projects & Case Studies
          </h2>
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg">
            Real software systems engineered with verified code repositories, test suites, and transparent architectural decisions.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-electric-cyan text-cosmos-950 font-semibold shadow-glow-cyan'
                  : 'bg-cosmos-900/70 text-slate-300 border border-cosmos-800 hover:border-cosmos-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="p-6 sm:p-8 rounded-3xl glass-panel glass-panel-hover border border-cosmos-700/60 flex flex-col justify-between relative group overflow-hidden"
              >
                {/* Background Glow on Hover */}
                <div className="absolute -right-20 -top-20 w-60 h-60 bg-electric-cyan/5 rounded-full blur-3xl group-hover:bg-electric-cyan/15 transition-all duration-500 pointer-events-none" />

                <div className="space-y-4">
                  {/* Category & Status Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="cyan">{project.category}</Badge>
                      {project.featured && (
                        <Badge variant="violet" icon={<Sparkles className="w-3 h-3" />}>
                          Featured
                        </Badge>
                      )}
                    </div>
                    <Badge variant="emerald" className="font-mono text-[10px]">
                      <CheckCircle2 className="w-3 h-3 text-matrix-mint" />
                      Verified Repo
                    </Badge>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-electric-cyan transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-electric-cyan/90 mt-1">
                      "{project.tagline}"
                    </p>
                  </div>

                  {/* Summary */}
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Verified Architecture Highlight */}
                  <div className="p-3.5 rounded-2xl bg-cosmos-900/80 border border-cosmos-800 space-y-1.5 text-xs">
                    <span className="font-mono text-slate-400 uppercase text-[10px] tracking-wider block">
                      Core Innovation & Features:
                    </span>
                    <ul className="space-y-1 text-slate-300">
                      {project.verifiedFeatures.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-electric-cyan flex-shrink-0">•</span>
                          <span className="line-clamp-1">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg bg-cosmos-800/80 border border-cosmos-700/60 text-xs text-slate-300 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Card Actions */}
                <div className="pt-6 mt-6 border-t border-cosmos-700/50 flex flex-wrap items-center justify-between gap-3">
                  <Button
                    variant="primary"
                    size="sm"
                    icon={<ArrowUpRight className="w-4 h-4" />}
                    onClick={() => setActiveProjectModal(project)}
                  >
                    View Deep Case Study
                  </Button>

                  {project.githubUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Github className="w-4 h-4" />}
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                      GitHub Repo
                    </Button>
                  )}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Dedicated Case Study Modal Dialog */}
        <ProjectModal
          project={activeProjectModal}
          isOpen={!!activeProjectModal}
          onClose={() => setActiveProjectModal(null)}
        />

      </div>
    </section>
  );
};
