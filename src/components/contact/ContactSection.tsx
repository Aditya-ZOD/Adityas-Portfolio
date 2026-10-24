import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Mail, Linkedin, Github, Send, CheckCircle2, AlertCircle, Loader2, Copy, Check, ExternalLink } from 'lucide-react';
import { profileData } from '../../data/profile';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { buildApiUrl } from '../../lib/api';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [serverMessage, setServerMessage] = useState('');
  const [mailtoFallback, setMailtoFallback] = useState<string | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);

  const generateLocalMailto = (sub: string, msg: string, senderName: string) => {
    const encSub = encodeURIComponent(`[Portfolio Contact] ${sub}`);
    const encBody = encodeURIComponent(`Hi Aditya,\n\n${msg}\n\nFrom,\n${senderName}`);
    return `mailto:${profileData.email}?subject=${encSub}&body=${encBody}`;
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedSubject = formData.subject.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName) {
      newErrors.name = 'Please provide your name.';
    } else if (trimmedName.length < 2) {
      newErrors.name = 'Please provide your name (at least 2 characters).';
    }

    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!trimmedEmail) {
      newErrors.email = 'Please provide your email address.';
    } else if (!emailRegex.test(trimmedEmail) || trimmedEmail.includes('..')) {
      newErrors.email = 'Please provide a valid email address (e.g. name@company.com).';
    } else {
      const parts = trimmedEmail.split('@');
      if (parts.length !== 2 || !parts[1].includes('.') || parts[1].startsWith('.') || parts[1].endsWith('.')) {
        newErrors.email = 'Please provide a valid email domain (e.g. name@company.com).';
      }
    }


    if (!trimmedSubject) {
      newErrors.subject = 'Please provide a subject.';
    } else if (trimmedSubject.length < 3) {
      newErrors.subject = 'Subject should be at least 3 characters.';
    }

    if (!trimmedMessage) {
      newErrors.message = 'Please provide a message.';
    } else if (trimmedMessage.length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (e.currentTarget && typeof e.currentTarget.reportValidity === 'function') {
      if (!e.currentTarget.reportValidity()) {
        validate();
        return;
      }
    }

    if (!validate()) return;

    setLoading(true);
    setSubmitStatus('idle');
    setServerMessage('');
    setMailtoFallback(null);

    const trimmedPayload = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      subject: formData.subject.trim(),
      message: formData.message.trim()
    };

    const fallbackUrl = generateLocalMailto(trimmedPayload.subject, trimmedPayload.message, trimmedPayload.name);

    try {
      const response = await fetch(buildApiUrl('/api/contact'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trimmedPayload)
      });

      let data: any = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (response.ok && data && data.success && data.delivery_status === 'sent') {
        setSubmitStatus('success');
        setServerMessage(data.message || 'Your message has been sent directly to Aditya’s inbox.');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({});

        try {
          confetti({
            particleCount: 75,
            spread: 60,
            origin: { y: 0.7 }
          });
        } catch {
          // Pass silently if canvas-confetti unsupported
        }
      } else {
        setSubmitStatus('error');
        setServerMessage("Your message could not be sent. Please try again later or contact me directly.");
        setMailtoFallback((data && data.mailto_fallback) || fallbackUrl);
        // Preserves entered formData so visitor does not lose their typed message
      }
    } catch {
      setSubmitStatus('error');
      setServerMessage("Your message could not be sent. Please try again later or contact me directly.");
      setMailtoFallback(fallbackUrl);
      // Preserves entered formData
    } finally {
      setLoading(false);
    }
  };


  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 relative border-b border-cosmos-800/60 bg-cosmos-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 space-y-3">
          <Badge variant="cyan" className="font-mono text-xs">
            05 // COLLABORATION & INQUIRIES
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Connect With Aditya
          </h2>
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg">
            Open for summer & fall internships, entry-level AI/ML roles, and collaborative software projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact & Opportunity Details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Availability Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-cosmos-800 to-cosmos-850 border border-electric-cyan/30 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-matrix-emerald animate-ping" />
                <span className="text-xs font-mono uppercase text-matrix-mint font-semibold">
                  Status: Available for Opportunities
                </span>
              </div>
              <h3 className="text-xl font-bold font-display text-white">
                Internship & Early-Career Focus
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Currently pursuing a BCA degree at Thakur Shyamnarayan Degree College (graduating in 2028). Eager to contribute practical Python, machine learning, and full-stack development skills to high-performing teams.
              </p>
            </div>

            {/* Direct Channels Cards */}
            <div className="space-y-3">
              {/* Email */}
              <div className="p-4 rounded-xl glass-panel border border-cosmos-700/60 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-cosmos-800 text-electric-cyan">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Direct Email</span>
                    <a
                      href={`mailto:${profileData.email}`}
                      className="text-sm font-medium text-white hover:text-electric-cyan transition-colors"
                    >
                      {profileData.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-cosmos-700 transition-colors"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {emailCopied ? <Check className="w-4 h-4 text-matrix-mint" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* LinkedIn */}
              <a
                href={profileData.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-xl glass-panel glass-panel-hover border border-cosmos-700/60 flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-cosmos-800 text-blue-400 group-hover:scale-105 transition-transform">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">LinkedIn Profile</span>
                    <span className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                      aditya-gupta-aa3373284
                    </span>
                  </div>
                </div>
                <span className="text-xs text-slate-400 group-hover:text-white font-mono">Connect →</span>
              </a>

              {/* GitHub */}
              <a
                href={profileData.github}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-xl glass-panel glass-panel-hover border border-cosmos-700/60 flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-cosmos-800 text-slate-200 group-hover:scale-105 transition-transform">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">GitHub Repositories</span>
                    <span className="text-sm font-medium text-white group-hover:text-electric-cyan transition-colors">
                      Aditya-ZOD
                    </span>
                  </div>
                </div>
                <span className="text-xs text-slate-400 group-hover:text-white font-mono">Inspect →</span>
              </a>
            </div>

          </div>

          {/* Right Column: Functional Validated Contact Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl glass-panel border border-electric-cyan/25 shadow-glass-card relative">
            <h3 className="text-xl font-bold font-display text-white mb-2">
              Send a Transmission
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              Inquiries are processed with rate-limiting and secure persistence. You will receive an immediate confirmation when delivered.
            </p>

            {/* Success Feedback Alert */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 rounded-2xl bg-matrix-emerald/15 border border-matrix-emerald/40 flex items-start gap-3 animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 text-matrix-mint flex-shrink-0 mt-0.5" />
                <div className="text-sm text-slate-200 leading-relaxed">
                  <span className="font-semibold text-matrix-mint">Transmission Verified: </span>
                  {serverMessage}
                </div>
              </div>
            )}

            {/* Error or Fallback Notice Alert */}
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 rounded-2xl bg-amber-500/15 border border-amber-500/40 space-y-3 animate-in fade-in">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-slate-200 leading-relaxed">
                    <span className="font-semibold text-amber-300">Notice: </span>
                    {serverMessage}
                  </div>
                </div>

                {mailtoFallback && (
                  <div className="pt-2 border-t border-amber-500/30 flex items-center justify-between gap-3">
                    <span className="text-xs text-slate-300 font-mono">Send directly with prefilled details:</span>
                    <a
                      href={mailtoFallback}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-400 text-cosmos-950 font-semibold text-xs hover:bg-white transition-colors"
                    >
                      <span>Open Email Client</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name Field */}
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    disabled={loading}
                    placeholder="e.g. Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl bg-cosmos-900 border text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                      errors.name
                        ? 'border-red-500/80 focus:ring-1 focus:ring-red-500'
                        : 'border-cosmos-700 focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan'
                    } ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                  />
                  {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                    Your Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    disabled={loading}
                    placeholder="e.g. recruiter@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl bg-cosmos-900 border text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                      errors.email
                        ? 'border-red-500/80 focus:ring-1 focus:ring-red-500'
                        : 'border-cosmos-700 focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan'
                    } ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                  />
                  {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="contact-subject" className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                  Subject *
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  disabled={loading}
                  placeholder="e.g. AI/ML Summer Internship Opportunity"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl bg-cosmos-900 border text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                    errors.subject
                      ? 'border-red-500/80 focus:ring-1 focus:ring-red-500'
                      : 'border-cosmos-700 focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan'
                  } ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                />
                {errors.subject && <p className="text-xs text-red-400 mt-1">{errors.subject}</p>}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="contact-message" className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  disabled={loading}
                  placeholder="Describe the opportunity or project details..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl bg-cosmos-900 border text-sm text-white placeholder-slate-500 focus:outline-none transition-all resize-y ${
                    errors.message
                      ? 'border-red-500/80 focus:ring-1 focus:ring-red-500'
                      : 'border-cosmos-700 focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan'
                  } ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                />

                {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={loading}
                icon={loading ? <Loader2 className="w-4 h-4 animate-spin text-cosmos-950" /> : <Send className="w-4 h-4" />}
                className="w-full justify-center shadow-glow-cyan"
              >
                {loading ? 'Transmitting Message...' : 'Send Message to Aditya'}
              </Button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};
