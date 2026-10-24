import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Code2, BrainCircuit, BarChart3, Sparkles, Layers, Terminal, CheckCircle2, ExternalLink } from 'lucide-react';
import { skillCategories } from '../../data/skills';
import type { SkillItem } from '../../types';
import { Badge } from '../ui/Badge';

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  const categoryIcons: Record<string, React.ReactNode> = {
    'Programming': <Code2 className="w-4 h-4" />,
    'AI & Machine Learning': <BrainCircuit className="w-4 h-4" />,
    'Data Science & Analysis': <BarChart3 className="w-4 h-4" />,
    'Generative AI & LLM Systems': <Sparkles className="w-4 h-4" />,
    'Web Development & Backend': <Layers className="w-4 h-4" />,
    'Tools & Engineering Practices': <Terminal className="w-4 h-4" />
  };

  const categories = ['All', ...skillCategories.map(c => c.title)];

  const allSkills = skillCategories.flatMap(cat =>
    cat.skills.map(skill => ({ ...skill, category: cat.title }))
  );

  const filteredSkills = allSkills.filter(skill => {
    const matchesCategory = activeCategory === 'All' || skill.category === activeCategory;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.detail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (skill.featuredProject && skill.featuredProject.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="py-24 relative border-b border-cosmos-800/60 bg-cosmos-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12 space-y-3">
          <Badge variant="cyan" className="font-mono text-xs">
            02 // TECHNICAL ARSENAL
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Categorized Technical Skills
          </h2>
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg">
            Practical competencies backed by verifiable project implementations. Click any skill to explore how it was applied in production architectures.
          </p>
        </div>

        {/* Controls: Search & Category Tabs */}
        <div className="space-y-4 mb-10">
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-electric-cyan absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skills, tools, or projects (e.g. Scikit-learn, FastAPI, Ollama)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cosmos-900/90 border border-cosmos-700/80 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  activeCategory === cat
                    ? 'bg-electric-cyan text-cosmos-950 font-semibold shadow-glow-cyan'
                    : 'bg-cosmos-900/70 text-slate-300 border border-cosmos-800 hover:border-cosmos-700 hover:text-white'
                }`}
              >
                {cat !== 'All' && categoryIcons[cat]}
                <span>{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => {
              const isSelected = selectedSkill?.name === skill.name;
              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setSelectedSkill(isSelected ? null : skill)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 relative overflow-hidden ${
                    isSelected
                      ? 'bg-cosmos-800 border-2 border-electric-cyan shadow-glow-cyan'
                      : 'glass-panel glass-panel-hover border border-cosmos-700/60'
                  }`}
                >
                  {/* Top Header */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-semibold text-white tracking-wide font-display">
                      {skill.name}
                    </h3>
                    <Badge variant="emerald" className="text-[10px] py-0.5">
                      <CheckCircle2 className="w-3 h-3 text-matrix-mint" />
                      Verified
                    </Badge>
                  </div>

                  {/* Category Pill */}
                  <span className="text-[11px] font-mono text-slate-400 block mb-3">
                    {skill.category}
                  </span>

                  {/* Detail Text */}
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {skill.detail}
                  </p>

                  {/* Featured Project Link */}
                  {skill.featuredProject && (
                    <div className="pt-3 border-t border-cosmos-700/40 flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-mono text-[10px] uppercase">
                        Applied In:
                      </span>
                      <a
                        href={skill.featuredProjectLink || "#projects"}
                        onClick={(e) => {
                          e.stopPropagation();
                          const el = document.getElementById('projects');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-electric-cyan hover:underline font-medium flex items-center gap-1 text-[11px]"
                      >
                        <span>{skill.featuredProject}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredSkills.length === 0 && (
          <div className="text-center py-16 text-slate-400 space-y-2">
            <p className="text-base">No skills matching "{searchQuery}" in category "{activeCategory}".</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="text-sm text-electric-cyan underline"
            >
              Reset filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
