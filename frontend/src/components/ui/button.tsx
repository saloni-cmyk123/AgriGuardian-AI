"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "gradient" | "danger" | "secondary";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

    const variants = {
      default:
        "bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-600/25 border border-brand-500/30",
      gradient:
        "bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/25 border border-emerald-400/30 hover:brightness-110",
      outline:
        "border border-slate-700/80 bg-slate-900/40 hover:bg-slate-800/80 text-slate-200 dark:border-slate-700 dark:hover:bg-slate-800",
      ghost:
        "bg-transparent hover:bg-slate-800/60 text-slate-300 hover:text-white dark:hover:bg-slate-800",
      secondary:
        "bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-700/50",
      danger:
        "bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/20",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs gap-1.5",
      md: "px-4 py-2 text-sm gap-2",
      lg: "px-6 py-3 text-base gap-2.5 font-semibold",
      icon: "p-2 w-9 h-9",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
