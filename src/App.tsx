import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { AboutSection } from './components/about/AboutSection';
import { SkillsSection } from './components/skills/SkillsSection';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { JourneySection } from './components/journey/JourneySection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/layout/Footer';
import { CommandPalette } from './components/ui/CommandPalette';
import { ResumeModal } from './components/layout/ResumeModal';
import { AskAdityaAI } from './components/assistant/AskAdityaAI';
import { ProjectModal } from './components/projects/ProjectModal';
import { projectsData } from './data/projects';
import type { ProjectData } from './types';

export const App: React.FC = () => {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectData | null>(null);

  const handleOpenProjectModal = (projectId: string) => {
    const proj = projectsData.find((p) => p.id === projectId);
    if (proj) {
      setActiveProjectModal(proj);
    }
  };

  return (
    <div className="min-h-screen bg-cosmos-900 text-slate-100 flex flex-col selection:bg-electric-cyan/20 selection:text-electric-cyan relative">
      {/* Top Sticky Navigation */}
      <Navbar
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenResumeModal={() => setResumeModalOpen(true)}
        onOpenAssistant={() => setAssistantOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroSection
          onOpenAssistant={() => setAssistantOpen(true)}
          onOpenResumeModal={() => setResumeModalOpen(true)}
        />
        <AboutSection
          onOpenResumeModal={() => setResumeModalOpen(true)}
        />
        <SkillsSection />
        <ProjectsSection />
        <JourneySection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Ask Aditya AI Assistant */}
      <AskAdityaAI
        isOpen={assistantOpen}
        onClose={() => setAssistantOpen(false)}
        onToggle={() => setAssistantOpen(!assistantOpen)}
      />

      {/* Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenProjectModal={handleOpenProjectModal}
        onOpenAssistant={() => setAssistantOpen(true)}
      />

      {/* Résumé Details Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />

      {/* Direct Project Modal (when launched via Command Palette) */}
      <ProjectModal
        project={activeProjectModal}
        isOpen={!!activeProjectModal}
        onClose={() => setActiveProjectModal(null)}
      />
    </div>
  );
};

export default App;
