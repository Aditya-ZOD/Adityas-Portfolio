import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, Sparkles, FileText, Command } from 'lucide-react';
import { Button } from '../ui/Button';

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onOpenResumeModal: () => void;
  onOpenAssistant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCommandPalette,
  onOpenResumeModal,
  onOpenAssistant,
}) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Journey', href: '#journey', id: 'journey' },
    { name: 'Ask AI', href: '#ask-ai', id: 'ask-ai', isAi: true },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'skills', 'projects', 'journey', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isAi?: boolean) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (isAi) {
      onOpenAssistant();
      return;
    }

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-cosmos-900/85 backdrop-blur-md border-b border-electric-cyan/15 shadow-lg shadow-cosmos-950/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Wordmark */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-electric-cyan/50 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-xl bg-cosmos-800 border border-electric-cyan/30 flex items-center justify-center text-electric-cyan group-hover:border-electric-cyan group-hover:shadow-glow-cyan transition-all duration-300">
              <Terminal className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-electric-cyan transition-colors">
                ADITYA GUPTA
              </span>
              <span className="text-[10px] font-mono tracking-wider text-slate-400 group-hover:text-slate-300 uppercase -mt-1">
                AI / ML Portfolio
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.isAi)}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                    isActive
                      ? 'text-white bg-electric-cyan/10 border border-electric-cyan/30 shadow-glow-subtle'
                      : 'text-slate-300 hover:text-white hover:bg-cosmos-700/50'
                  }`}
                >
                  {link.isAi ? (
                    <span className="flex items-center gap-1.5 text-electric-cyan font-semibold">
                      <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                      {link.name}
                    </span>
                  ) : (
                    link.name
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Command Palette Trigger */}
            <button
              onClick={onOpenCommandPalette}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cosmos-800/80 border border-cosmos-700 text-xs text-slate-400 hover:text-white hover:border-electric-cyan/40 hover:bg-cosmos-700/60 transition-all focus:outline-none focus:ring-2 focus:ring-electric-cyan/50"
              title="Open Command Palette (Ctrl+K)"
            >
              <Command className="w-3.5 h-3.5 text-electric-cyan" />
              <span className="font-mono text-[11px]">⌘K</span>
            </button>

            {/* Resume Action */}
            <Button
              variant="outline"
              size="sm"
              icon={<FileText className="w-3.5 h-3.5" />}
              onClick={onOpenResumeModal}
              className="border-electric-cyan/50 hover:shadow-glow-cyan"
            >
              Résumé
            </Button>
          </div>

          {/* Mobile Menu & Command Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenCommandPalette}
              className="p-2 rounded-lg bg-cosmos-800 border border-cosmos-700 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Open command palette"
            >
              <Command className="w-4 h-4 text-electric-cyan" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-cosmos-800 border border-cosmos-700 text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-electric-cyan"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cosmos-900/95 border-b border-electric-cyan/20 px-4 pt-3 pb-6 space-y-2 backdrop-blur-xl animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.isAi)}
                className={`flex items-center justify-center py-2.5 px-3 rounded-xl text-sm font-medium ${
                  activeSection === link.id
                    ? 'bg-electric-cyan/15 text-white border border-electric-cyan/30'
                    : 'bg-cosmos-800/60 text-slate-300 hover:bg-cosmos-700'
                }`}
              >
                {link.isAi ? (
                  <span className="flex items-center gap-1.5 text-electric-cyan font-semibold">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                    {link.name}
                  </span>
                ) : (
                  link.name
                )}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-cosmos-700/60 flex flex-col gap-2">
            <Button
              variant="outline"
              size="md"
              icon={<FileText className="w-4 h-4" />}
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResumeModal();
              }}
              className="w-full justify-center"
            >
              View Résumé & Academic Profile
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
