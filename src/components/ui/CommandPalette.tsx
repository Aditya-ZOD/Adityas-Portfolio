import React, { useState, useEffect, useRef } from 'react';
import { Search, Sparkles, FolderGit2, Compass, Mail, ExternalLink, Code2, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Navigation' | 'Projects' | 'Actions';
  icon: React.ReactNode;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProjectModal?: (projectId: string) => void;
  onOpenAssistant?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenProjectModal,
  onOpenAssistant
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollTo = (id: string) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const commands: CommandItem[] = [
    // Navigation
    {
      id: 'nav-about',
      title: 'About Aditya',
      subtitle: 'BCA student, AI/ML background & vision',
      category: 'Navigation',
      icon: <Compass className="w-4 h-4 text-electric-cyan" />,
      action: () => scrollTo('about')
    },
    {
      id: 'nav-skills',
      title: 'Technical Skills Explorer',
      subtitle: 'Python, ML, Scikit-learn, FastAPI, Local LLMs',
      category: 'Navigation',
      icon: <Code2 className="w-4 h-4 text-cyber-violet" />,
      action: () => scrollTo('skills')
    },
    {
      id: 'nav-projects',
      title: 'Featured Projects',
      subtitle: 'OmniPredict AI, NutriAI, and practical applications',
      category: 'Navigation',
      icon: <FolderGit2 className="w-4 h-4 text-electric-blue" />,
      action: () => scrollTo('projects')
    },
    {
      id: 'nav-journey',
      title: 'Academic Journey & Certificates',
      subtitle: 'Thakur Shyamnarayan Degree College (2025–2028)',
      category: 'Navigation',
      icon: <GraduationCap className="w-4 h-4 text-matrix-mint" />,
      action: () => scrollTo('journey')
    },
    {
      id: 'nav-contact',
      title: 'Get In Touch',
      subtitle: 'Email, LinkedIn, and internship inquiries',
      category: 'Navigation',
      icon: <Mail className="w-4 h-4 text-pink-400" />,
      action: () => scrollTo('contact')
    },
    {
      id: 'action-ask-ai',
      title: 'Ask Aditya AI Assistant',
      subtitle: 'Ask verified portfolio questions in real-time',
      category: 'Actions',
      icon: <Sparkles className="w-4 h-4 text-electric-cyan" />,
      action: () => {
        onClose();
        if (onOpenAssistant) onOpenAssistant();
      }
    },
    // Projects
    {
      id: 'proj-omnipredict',
      title: 'OmniPredict AI Case Study',
      subtitle: 'Predictive analytics & AI Dataset Assistant (Team XSpark)',
      category: 'Projects',
      icon: <FolderGit2 className="w-4 h-4 text-electric-cyan" />,
      action: () => {
        onClose();
        if (onOpenProjectModal) onOpenProjectModal('omnipredict-ai');
      }
    },
    {
      id: 'proj-nutriai',
      title: 'NutriAI Case Study',
      subtitle: 'Deterministic Python math + local Ollama intelligence',
      category: 'Projects',
      icon: <FolderGit2 className="w-4 h-4 text-matrix-mint" />,
      action: () => {
        onClose();
        if (onOpenProjectModal) onOpenProjectModal('nutri-ai');
      }
    },
    {
      id: 'proj-heart',
      title: 'Heart Disease Prediction Case Study',
      subtitle: 'Supervised ML classification & GridSearchCV tuning',
      category: 'Projects',
      icon: <FolderGit2 className="w-4 h-4 text-pink-400" />,
      action: () => {
        onClose();
        if (onOpenProjectModal) onOpenProjectModal('heart-disease-prediction');
      }
    },
    // External Actions
    {
      id: 'action-github',
      title: 'Visit GitHub Profile',
      subtitle: 'github.com/Aditya-ZOD',
      category: 'Actions',
      icon: <ExternalLink className="w-4 h-4 text-slate-300" />,
      action: () => {
        window.open('https://github.com/Aditya-ZOD', '_blank');
        onClose();
      }
    },
    {
      id: 'action-linkedin',
      title: 'Connect on LinkedIn',
      subtitle: 'linkedin.com/in/aditya-gupta-aa3373284',
      category: 'Actions',
      icon: <ExternalLink className="w-4 h-4 text-blue-400" />,
      action: () => {
        window.open('https://www.linkedin.com/in/aditya-gupta-aa3373284/', '_blank');
        onClose();
      }
    }
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.subtitle.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setSelectedIndex(0);
      }
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev: number) => (prev + 1) % (filteredCommands.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev: number) => (prev - 1 + (filteredCommands.length || 1)) % (filteredCommands.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-cosmos-950/80 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-xl bg-cosmos-800/95 border border-electric-cyan/30 rounded-2xl shadow-2xl shadow-cosmos-950 overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-cosmos-700/70 bg-cosmos-850/60">
              <Search className="w-5 h-5 text-electric-cyan mr-3 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command, project, or section..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                className="w-full bg-transparent text-white placeholder-slate-400 focus:outline-none text-sm font-sans"
              />
              <span className="text-xs bg-cosmos-700 px-2 py-0.5 rounded text-slate-400 font-mono ml-2 border border-cosmos-600">
                ESC
              </span>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2 divide-y divide-cosmos-700/30">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd, idx) => (
                  <div
                    key={cmd.id}
                    onClick={() => cmd.action()}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                      idx === selectedIndex
                        ? 'bg-electric-cyan/15 border border-electric-cyan/30 text-white'
                        : 'text-slate-300 hover:bg-cosmos-700/40'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 rounded-lg bg-cosmos-900/60 border border-cosmos-700/50 flex-shrink-0">
                        {cmd.icon}
                      </div>
                      <div className="truncate">
                        <div className="text-sm font-medium text-slate-100 truncate">{cmd.title}</div>
                        <div className="text-xs text-slate-400 truncate">{cmd.subtitle}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cosmos-900/80 text-slate-400 border border-cosmos-700/50 flex-shrink-0 ml-2">
                      {cmd.category}
                    </span>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-sm text-slate-400">
                  No matching commands or projects found.
                </div>
              )}
            </div>

            {/* Footer Hints */}
            <div className="px-4 py-2.5 bg-cosmos-900/80 border-t border-cosmos-700/50 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
              </div>
              <span className="font-mono text-electric-cyan/80">Aditya's Cosmos</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
