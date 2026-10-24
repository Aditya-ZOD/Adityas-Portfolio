import { GraduationCap, Brain, ShieldCheck, Cpu, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { profileData } from '../../data/profile';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface AboutSectionProps {
  onOpenResumeModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenResumeModal }) => {
  const highlights = [
    {
      icon: <GraduationCap className="w-5 h-5 text-electric-cyan" />,
      title: "BCA Undergraduate (2025–2028)",
      desc: "Pursuing Bachelor of Computer Applications at Thakur Shyamnarayan Degree College, grounding theory with immediate code implementation."
    },
    {
      icon: <Brain className="w-5 h-5 text-cyber-violet" />,
      title: "Pragmatic Machine Learning",
      desc: "Focused on building systems that solve practical problems—from predictive ML models to local context-aware LLMs."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-matrix-mint" />,
      title: "Deterministic & Tested Systems",
      desc: "I believe AI belongs alongside disciplined software engineering: deterministic calculations, automated pytest suites, and rigorous validation."
    },
    {
      icon: <Cpu className="w-5 h-5 text-electric-blue" />,
      title: "End-to-End Development",
      desc: "Proficient across the stack: training models with scikit-learn, developing async FastAPI backends, and designing responsive interfaces."
    }
  ];

  return (
    <section id="about" className="py-24 relative border-b border-cosmos-800/60 bg-cosmos-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 space-y-3">
          <Badge variant="cyan" className="font-mono text-xs">
            01 // BACKGROUND & IDENTITY
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            About Aditya Gupta
          </h2>
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg">
            An aspiring software engineer crafting reliable machine learning architectures, practical Python systems, and data-driven tools.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Story Narrative */}
          <div className="lg:col-span-7 space-y-6 text-slate-300 leading-relaxed text-base">
            {profileData.bio.map((paragraph, index) => (
              <p key={index} className="text-slate-300">
                {paragraph}
              </p>
            ))}

            {/* Core Philosophies List */}
            <div className="pt-4 space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider font-mono text-slate-400">
                Core Engineering Principles:
              </h4>
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-electric-cyan flex-shrink-0 mt-0.5" />
                  <span><strong>Deterministic Arithmetic:</strong> Avoid relying on language models for critical calculations. All nutritional sums and budgets are computed deterministically in Python.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyber-violet flex-shrink-0 mt-0.5" />
                  <span><strong>Human-in-the-Loop Safety:</strong> AI modifications should preview transformations and require explicit user confirmation before committing changes to data.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-matrix-mint flex-shrink-0 mt-0.5" />
                  <span><strong>Automated Verification:</strong> Write automated test suites (such as pytest integration suites) to prove system correctness before claiming production-readiness.</span>
                </li>
              </ul>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Button
                variant="outline"
                size="md"
                onClick={onOpenResumeModal}
                icon={<ArrowUpRight className="w-4 h-4" />}
              >
                View Academic & Profile Details
              </Button>

              <a
                href="#projects"
                className="text-sm font-medium text-electric-cyan hover:underline flex items-center gap-1"
              >
                Inspect verified projects →
              </a>
            </div>
          </div>

          {/* Right Column: Highlights Cards Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="p-5 rounded-2xl glass-panel glass-panel-hover border border-cosmos-700/60 space-y-2 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cosmos-800/80 border border-cosmos-700/80">
                    {item.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-white tracking-wide font-display">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed pl-1">
                  {item.desc}
                </p>
              </div>
            ))}

            {/* Status Summary Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-cosmos-800/90 to-cosmos-850/80 border border-electric-cyan/25 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">Availability</span>
                <span className="flex items-center gap-1.5 text-xs text-matrix-mint font-medium">
                  <span className="w-2 h-2 rounded-full bg-matrix-emerald animate-ping" />
                  Active For Internships
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Seeking AI/ML, Python, and Software Development internships where I can contribute to production systems and learn alongside senior engineers.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
