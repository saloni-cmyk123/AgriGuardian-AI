"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "success" | "warning" | "danger" | "info" | "neutral" | "emerald";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "emerald",
  children,
  ...props
}) => {
  const variants = {
    emerald: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    success: "bg-teal-500/15 text-teal-300 border-teal-500/30",
    warning: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    danger: "bg-rose-500/15 text-rose-300 border-rose-500/30",
    info: "bg-sky-500/15 text-sky-300 border-sky-500/30",
    neutral: "bg-slate-800 text-slate-300 border-slate-700",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border backdrop-blur-md transition-colors",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
