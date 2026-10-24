import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Mail, Github, Linkedin, ChevronDown, Sparkles, Terminal } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { HeroVisual3D } from './HeroVisual3D';
import { profileData } from '../../data/profile';

interface HeroSectionProps {
  onOpenAssistant: () => void;
  onOpenResumeModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenAssistant, onOpenResumeModal }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden border-b border-cosmos-800/60"
    >
      {/* Background Ambience & Fine Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-radial from-electric-blue/10 via-cyber-violet/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Typography & Intent */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left space-y-6"
          >
            {/* Identity Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="cyan" icon={<Sparkles className="w-3.5 h-3.5 animate-pulse" />}>
                Aditya Gupta • AI/ML & Python Developer
              </Badge>
              <button
                onClick={onOpenResumeModal}
                className="hover:scale-105 transition-transform focus:outline-none text-left"
                title="View Academic Résumé & Profile"
              >
                <Badge variant="slate" className="font-mono text-[11px] cursor-pointer hover:border-electric-cyan/50 hover:text-white transition-colors">
                  BCA Candidate '28 • Thakur Shyamnarayan Degree College ↗
                </Badge>
              </button>
            </div>

            {/* Master Headline Reveal */}
            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white leading-[1.1]"
              >
                Building Intelligence. <br />
                <span className="cyber-gradient-text text-glow-cyan">Creating Impact.</span>
              </motion.h1>
            </div>

            {/* Supporting Bio Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl"
            >
              I'm <span className="text-white font-medium">Aditya Gupta</span>, an AI/ML enthusiast focused on building intelligent systems, exploring data, and turning ideas into practical software experiences.
            </motion.p>

            {/* Key Capabilities Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-2 text-xs font-mono text-slate-400"
            >
              <span className="px-3 py-1 rounded-lg bg-cosmos-800/80 border border-cosmos-700/60 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan" />
                Python & Scikit-learn
              </span>
              <span className="px-3 py-1 rounded-lg bg-cosmos-800/80 border border-cosmos-700/60 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-violet" />
                FastAPI & Flask APIs
              </span>
              <span className="px-3 py-1 rounded-lg bg-cosmos-800/80 border border-cosmos-700/60 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-matrix-mint" />
                Local LLMs (Ollama)
              </span>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3.5 pt-2 w-full sm:w-auto"
            >
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                onClick={() => scrollTo('projects')}
                className="w-full sm:w-auto shadow-glow-cyan"
              >
                Explore Projects
              </Button>

              <Button
                variant="outline"
                size="lg"
                icon={<Mail className="w-4 h-4" />}
                onClick={() => scrollTo('contact')}
                className="w-full sm:w-auto"
              >
                Contact Me
              </Button>

              <Button
                variant="ghost"
                size="lg"
                icon={<Sparkles className="w-4 h-4 text-electric-cyan" />}
                onClick={onOpenAssistant}
                className="w-full sm:w-auto border border-cosmos-700 hover:border-electric-cyan/40"
              >
                Ask Aditya AI
              </Button>
            </motion.div>

            {/* Verified External Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center gap-4 pt-4 border-t border-cosmos-800/80 w-full"
            >
              <span className="text-xs text-slate-500 font-mono uppercase tracking-wider">
                Connect:
              </span>
              <a
                href={profileData.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                title="View Aditya's GitHub Profile"
              >
                <Github className="w-4 h-4 text-slate-300" />
                <span>GitHub (Aditya-ZOD)</span>
              </a>
              <span className="text-slate-700">•</span>
              <a
                href={profileData.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-electric-cyan transition-colors"
                title="Connect on LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-electric-cyan" />
                <span>LinkedIn</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: 3D Interactive AI Constellation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 h-[340px] sm:h-[420px] lg:h-[480px] w-full relative rounded-3xl overflow-hidden glass-panel border border-electric-cyan/20 p-2 shadow-glass-card flex items-center justify-center group"
          >
            {/* Visual Header Strip */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-cosmos-900/80 border border-cosmos-700/60 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-matrix-emerald animate-ping" />
              <span className="text-[11px] font-mono text-slate-300">Neural Lattice Live</span>
            </div>

            <div className="absolute top-4 right-4 z-20 flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-cosmos-900/80 px-2.5 py-1 rounded-full border border-cosmos-700/60">
              <Terminal className="w-3 h-3 text-electric-cyan" />
              <span>Three.js WebGL</span>
            </div>

            {/* 3D Canvas */}
            <div className="w-full h-full">
              <HeroVisual3D />
            </div>

            {/* Subtle Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-cosmos-900 via-transparent to-transparent opacity-40 pointer-events-none" />

            {/* Bottom Floating Stats Strip */}
            <div className="absolute bottom-4 inset-x-4 z-20 bg-cosmos-900/85 backdrop-blur-md border border-cosmos-700/60 rounded-xl p-3 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] font-mono uppercase">Featured Architecture</span>
                <span className="text-white font-medium">Hybrid Deterministic AI</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[10px] font-mono uppercase">Verified Repos</span>
                <span className="text-matrix-mint font-mono font-semibold">OmniPredict & NutriAI</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <button
        onClick={() => scrollTo('about')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-500 hover:text-electric-cyan transition-colors focus:outline-none"
        aria-label="Scroll to About section"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </button>
    </section>
  );
};
