import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'violet' | 'emerald' | 'slate' | 'outline';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'cyan',
  className,
  icon,
}) => {
  const baseStyles = "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border";

  const variants = {
    cyan: "bg-electric-cyan/10 text-electric-cyan border-electric-cyan/30",
    violet: "bg-cyber-violet/10 text-cyber-violet border-cyber-violet/30",
    emerald: "bg-matrix-emerald/10 text-matrix-mint border-matrix-emerald/30",
    slate: "bg-slate-800/80 text-slate-300 border-slate-700",
    outline: "bg-transparent text-slate-300 border-slate-700/60",
  };

  return (
    <span className={twMerge(clsx(baseStyles, variants[variant], className))}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
};
