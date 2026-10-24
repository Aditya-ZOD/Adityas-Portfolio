import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { FileText, ExternalLink, AlertCircle, Copy, Check, Download, Mail } from 'lucide-react';
import { profileData } from '../../data/profile';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [hasPdf, setHasPdf] = useState(false);

  useEffect(() => {
    // Check if real PDF has been placed in public/
    fetch('/Aditya_Gupta_Resume.pdf', { method: 'HEAD' })
      .then((res) => {
        if (res.ok && res.status !== 404) {
          setHasPdf(true);
        } else {
          setHasPdf(false);
        }
      })
      .catch(() => setHasPdf(false));
  }, [isOpen]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const mailtoResumeUrl = `mailto:${profileData.email}?subject=${encodeURIComponent("Resume Inquiry - Aditya Gupta")}&body=${encodeURIComponent("Hi Aditya,\n\nWe reviewed your portfolio and would like to request a PDF copy of your résumé for internship/entry-level consideration.\n\nBest regards,")}`;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Aditya Gupta — Candidate Profile & Résumé" maxWidth="xl">
      <div className="space-y-6">
        {/* Header Summary */}
        <div className="p-4 rounded-xl bg-cosmos-900/80 border border-electric-cyan/20 flex items-start gap-4">
          <div className="p-3 rounded-lg bg-electric-cyan/10 border border-electric-cyan/30 text-electric-cyan">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-white">{profileData.name}</h4>
            <p className="text-xs text-electric-cyan font-mono">{profileData.headline}</p>
            <p className="text-xs text-slate-400 mt-1">
              {profileData.education.degree} • {profileData.education.institution} (Exp. {profileData.education.expectedGraduation})
            </p>
          </div>
        </div>

        {/* Verification Status Notice */}
        {hasPdf ? (
          <div className="p-3.5 rounded-xl bg-matrix-emerald/15 border border-matrix-emerald/40 flex items-start gap-3">
            <Check className="w-5 h-5 text-matrix-mint flex-shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 leading-relaxed">
              <span className="font-semibold text-matrix-mint">Verified Résumé PDF Ready: </span>
              Aditya's official PDF résumé is verified and ready for immediate download below.
            </div>
          </div>
        ) : (
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 leading-relaxed">
              <span className="font-semibold text-amber-300">Undergraduate Status (PDF Upload Pending): </span>
              Aditya is an undergraduate student actively preparing for summer and fall internships. A customized PDF version of his résumé can be requested with one click via email.
            </div>
          </div>
        )}

        {/* Core Profile Highlights */}
        <div className="space-y-3">
          <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
            Candidate Highlights
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-cosmos-700/40 border border-cosmos-600/50">
              <span className="text-[11px] text-slate-400 uppercase font-mono block">Featured Project 1</span>
              <span className="text-sm font-semibold text-white">OmniPredict AI</span>
              <p className="text-xs text-slate-400 mt-0.5">Flask ML platform & AI Dataset Assistant (Exhibition Project)</p>
            </div>
            <div className="p-3 rounded-xl bg-cosmos-700/40 border border-cosmos-600/50">
              <span className="text-[11px] text-slate-400 uppercase font-mono block">Featured Project 2</span>
              <span className="text-sm font-semibold text-white">NutriAI Platform</span>
              <p className="text-xs text-slate-400 mt-0.5">FastAPI, deterministic Python math & local Ollama LLMs</p>
            </div>
            <div className="p-3 rounded-xl bg-cosmos-700/40 border border-cosmos-600/50">
              <span className="text-[11px] text-slate-400 uppercase font-mono block">Target Roles</span>
              <span className="text-sm font-semibold text-matrix-mint">AI/ML & Python Intern</span>
              <p className="text-xs text-slate-400 mt-0.5">Entry-level software engineering & data science</p>
            </div>
            <div className="p-3 rounded-xl bg-cosmos-700/40 border border-cosmos-600/50">
              <span className="text-[11px] text-slate-400 uppercase font-mono block">Location</span>
              <span className="text-sm font-semibold text-white">Mumbai, India</span>
              <p className="text-xs text-slate-400 mt-0.5">Available for onsite, hybrid, or remote opportunities</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          {hasPdf ? (
            <a
              href="/Aditya_Gupta_Resume.pdf"
              download="Aditya_Gupta_Resume.pdf"
              className="flex-1 inline-flex items-center justify-center font-medium rounded-xl px-5 py-2.5 text-sm gap-2 bg-electric-cyan text-cosmos-950 font-semibold hover:bg-white transition-all shadow-glow-cyan"
            >
              <Download className="w-4 h-4" />
              <span>Download Official Résumé (PDF)</span>
            </a>
          ) : (
            <a
              href={mailtoResumeUrl}
              className="flex-1 inline-flex items-center justify-center font-medium rounded-xl px-5 py-2.5 text-sm gap-2 bg-electric-cyan text-cosmos-950 font-semibold hover:bg-white transition-all shadow-glow-cyan"
            >
              <Mail className="w-4 h-4" />
              <span>Request Résumé via Email</span>
            </a>
          )}

          <Button
            variant="secondary"
            className="flex-1"
            icon={copied ? <Check className="w-4 h-4 text-matrix-mint" /> : <Copy className="w-4 h-4" />}
            onClick={handleCopyEmail}
          >
            {copied ? "Email Copied!" : "Copy Recruiter Contact Email"}
          </Button>

          <Button
            variant="outline"
            className="flex-1"
            icon={<ExternalLink className="w-4 h-4" />}
            onClick={() => window.open(profileData.linkedin, '_blank')}
          >
            LinkedIn Profile
          </Button>
        </div>
      </div>
    </Modal>
  );
};
