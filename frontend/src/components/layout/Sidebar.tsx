"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Scan,
  CloudSun,
  Droplets,
  TrendingUp,
  Globe2,
  FileCheck,
  Cpu,
  Bot,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Home,
} from "lucide-react";

const navigationItems = [
  { name: "Landing", href: "/", icon: Home },
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Disease Detection", href: "/disease-detection", icon: Scan, badge: "AI Scan" },
  { name: "Weather Intelligence", href: "/weather-intelligence", icon: CloudSun },
  { name: "Smart Irrigation", href: "/smart-irrigation", icon: Droplets },
  { name: "Market Intelligence", href: "/market-intelligence", icon: TrendingUp },
  { name: "National Intelligence", href: "/national-intelligence", icon: Globe2, badge: "India Map" },
  { name: "Government Schemes", href: "/government-schemes", icon: FileCheck },
  { name: "AgriTwin AI", href: "/agritwin-ai", icon: Cpu, badge: "Digital Twin" },
  { name: "AI Chatbot", href: "/ai-chatbot", icon: Bot, badge: "Agronomist" },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "sticky top-0 h-screen z-40 flex flex-col bg-slate-950/90 border-r border-slate-800/80 backdrop-blur-xl transition-all duration-300 select-none",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-800/80">
        <Link href="/" className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/25 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-base font-extrabold tracking-tight text-white flex items-center gap-1">
                AgriGuardian <span className="text-emerald-400">AI</span>
              </span>
              <span className="text-[10px] uppercase font-semibold text-emerald-400/90 tracking-widest">
                Predict. Protect. Prosper.
              </span>
            </div>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-slate-400 hover:text-slate-100 p-1.5 rounded-lg bg-slate-900/60 hover:bg-slate-800 transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1.5">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-xs transition-all duration-200",
                isActive
                  ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/10 text-emerald-400 border border-emerald-500/30 shadow-md shadow-emerald-500/10"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/80"
              )}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon
                  className={cn(
                    "w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110",
                    isActive ? "text-emerald-400" : "text-slate-400 group-hover:text-slate-200"
                  )}
                />
                {!collapsed && <span className="truncate">{item.name}</span>}
              </div>

              {!collapsed && item.badge && (
                <span
                  className={cn(
                    "px-1.5 py-0.5 text-[10px] font-bold rounded-md uppercase tracking-wider",
                    isActive
                      ? "bg-emerald-500/30 text-emerald-300"
                      : "bg-slate-800 text-slate-400 group-hover:bg-slate-700"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Pro Badge */}
      {!collapsed && (
        <div className="p-4 border-t border-slate-800/80 m-3 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-slate-900/80 border-slate-700/60">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold mb-1">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            <span>AI Agronomist v2.4 Active</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Connected to 48 satellite mesh nodes & APMC live mandi feeds.
          </p>
        </div>
      )}
    </aside>
  );
};
