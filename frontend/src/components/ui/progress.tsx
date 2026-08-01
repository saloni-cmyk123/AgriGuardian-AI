"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  colorClass?: string;
  showValue?: boolean;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  colorClass = "bg-gradient-to-r from-emerald-500 to-teal-400",
  showValue = false,
  className,
  ...props
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn("w-full space-y-1.5", className)} {...props}>
      {showValue && (
        <div className="flex justify-between text-xs font-semibold text-slate-300">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="w-full h-2.5 bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
        <div
          className={cn("h-full rounded-full transition-all duration-500 ease-out", colorClass)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
