import { ArrowUp, Github, Linkedin, Mail, Terminal } from 'lucide-react';
import { profileData } from '../../data/profile';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-cosmos-950 border-t border-cosmos-800/80 py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-cosmos-800">
          
          {/* Brand Info */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cosmos-800 border border-electric-cyan/30 flex items-center justify-center text-electric-cyan">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <span className="font-display font-bold text-base text-white tracking-wide">
                ADITYA GUPTA
              </span>
              <p className="text-xs text-slate-400">
                Building Intelligence. Creating Impact.
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={profileData.github}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-cosmos-900 border border-cosmos-700/80 text-slate-300 hover:text-white hover:border-electric-cyan/40 transition-colors"
              title="GitHub Profile"
              aria-label="GitHub profile"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-cosmos-900 border border-cosmos-700/80 text-slate-300 hover:text-electric-cyan hover:border-electric-cyan/40 transition-colors"
              title="LinkedIn Profile"
              aria-label="LinkedIn profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${profileData.email}`}
              className="p-2.5 rounded-xl bg-cosmos-900 border border-cosmos-700/80 text-slate-300 hover:text-white hover:border-electric-cyan/40 transition-colors"
              title="Direct Email"
              aria-label="Send direct email"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-cosmos-900 border border-cosmos-700/80 text-slate-300 hover:text-electric-cyan hover:border-electric-cyan/40 transition-colors ml-2"
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3 font-mono">
          <p>
            © {CURRENT_YEAR} Aditya Gupta. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Designed & Engineered for Aditya Gupta with React, Vite & FastAPI.
          </p>
        </div>
      </div>
    </footer>
  );
};
