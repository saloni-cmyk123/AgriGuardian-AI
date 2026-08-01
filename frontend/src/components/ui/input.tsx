"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, type = "text", ...props }, ref) => {
    return (
      <div className="relative w-full flex items-center">
        {icon && <div className="absolute left-3.5 text-slate-400 pointer-events-none">{icon}</div>}
        <input
          type={type}
          ref={ref}
          className={cn(
            "w-full rounded-xl bg-slate-900/80 border border-slate-700/80 text-sm text-slate-100 placeholder:text-slate-500 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/60 transition-all duration-200 shadow-inner",
            icon && "pl-10",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";
