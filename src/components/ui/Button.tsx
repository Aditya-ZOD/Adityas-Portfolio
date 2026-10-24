import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  icon,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-electric-cyan/50 disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5",
  };

  const variantStyles = {
    primary: "bg-electric-cyan text-cosmos-950 font-semibold hover:bg-white hover:shadow-glow-cyan active:scale-[0.98]",
    secondary: "bg-cosmos-700/80 text-slate-100 hover:bg-cosmos-600 hover:text-white border border-cosmos-600 active:scale-[0.98]",
    outline: "border border-electric-cyan/40 text-electric-cyan hover:bg-electric-cyan/10 hover:border-electric-cyan hover:shadow-glow-cyan active:scale-[0.98]",
    ghost: "text-slate-300 hover:text-white hover:bg-cosmos-700/50 active:scale-[0.98]",
    glow: "bg-gradient-to-r from-electric-cyan via-electric-blue to-cyber-violet text-white font-semibold shadow-glow-cyan hover:shadow-glow-violet active:scale-[0.98]",
  };

  return (
    <button
      className={twMerge(clsx(baseStyles, sizeStyles[size], variantStyles[variant], className))}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
};
