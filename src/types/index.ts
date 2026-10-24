export interface ProfileData {
  name: string;
  headline: string;
  subheadline: string;
  location: string;
  education: {
    degree: string;
    institution: string;
    expectedGraduation: string;
    currentStatus: string;
  };
  email: string;
  linkedin: string;
  github: string;
  availability: string;
  bio: string[];
  interests: string[];
  objectives: string[];
}

export interface ProjectData {
  id: string;
  title: string;
  tagline: string;
  category: 'AI & Machine Learning' | 'Full-Stack Development' | 'Intelligent Automation';
  status: string;
  featured: boolean;
  team: string;
  institution?: string;
  githubUrl: string;
  liveUrl?: string;
  summary: string;
  problemStatement: string;
  solution: string;
  verifiedFeatures: string[];
  plannedRoadmap: string[];
  techStack: string[];
  metrics?: { label: string; value: string }[];
  keyDecisions: string[];
  challengesLearned: string[];
}

export interface SkillItem {
  name: string;
  detail: string;
  verified: boolean;
  featuredProject?: string;
  featuredProjectLink?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  icon: string;
  skills: SkillItem[];
}

export interface EducationData {
  degree: string;
  institution: string;
  timeline: string;
  expectedGraduation: string;
  location: string;
  description: string;
  coreCoursework: string[];
  academicHighlights: string[];
}

export interface CertificateData {
  id: string;
  title: string;
  issuer: string;
  date: string;
  verified: boolean;
  credentialUrl?: string;
  summary: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: string[];
  isFallback?: boolean;
  providerUsed?: string;
  modelUsed?: string;
  fallbackReason?: string;
}

