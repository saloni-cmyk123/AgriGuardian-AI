"use client";

import React, { useState } from "react";
import { useFarm } from "@/context/FarmContext";
import { useTheme } from "@/context/ThemeContext";
import { useToast } from "@/context/ToastContext";
import {
  Search,
  Bell,
  Sun,
  Moon,
  Sprout,
  ChevronDown,
  Check,
  Zap,
  Sparkles,
  User,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";

export const Header: React.FC = () => {
  const { farms, activeFarm, setActiveFarm } = useFarm();
  const { theme, toggleTheme } = useTheme();
  const { addToast } = useToast();

  const [farmDropdownOpen, setFarmDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState("");

  const notifications = [
    {
      id: "n-1",
      title: "Wheat Rust Risk Alert",
      desc: "Humidity 89% detected in Ludhiana Sector 2. Disease probability increased to 74%.",
      time: "10m ago",
      unread: true,
    },
    {
      id: "n-2",
      title: "Automated Irrigation Triggered",
      desc: "Zone A North solenoid valve opened for 45 mins based on soil decay prediction.",
      time: "1h ago",
      unread: true,
    },
    {
      id: "n-3",
      title: "APMC Mandi Price Surge",
      desc: "Paddy (Samba Mahsuri) price increased by +₹120/Quintal in Khanna Market.",
      time: "3h ago",
      unread: false,
    },
  ];

  const handleCommandSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commandQuery.trim()) return;
    addToast("Search Executed", `Searching platform for "${commandQuery}"...`, "info");
    setCommandPaletteOpen(false);
    setCommandQuery("");
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-3.5 bg-slate-950/80 border-b border-slate-800/80 backdrop-blur-xl">
      {/* Farm Switcher & Status */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setFarmDropdownOpen(!farmDropdownOpen)}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
          >
            <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Sprout className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-slate-100 font-bold leading-tight">{activeFarm.name}</span>
              <span className="text-[10px] text-slate-400 font-medium">
                {activeFarm.location} ({activeFarm.sizeAcres} Acres)
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
          </button>

          {/* Farm Switcher Dropdown */}
          {farmDropdownOpen && (
            <div className="absolute left-0 mt-2 w-64 rounded-xl glass-panel bg-slate-900/95 border border-slate-700 p-2 shadow-2xl z-50">
              <div className="text-[10px] uppercase font-bold text-slate-400 px-3 py-1.5">
                Select Active Farm
              </div>
              {farms.map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    setActiveFarm(f);
                    setFarmDropdownOpen(false);
                    addToast("Farm Switched", `Active profile changed to ${f.name}`, "success");
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs hover:bg-slate-800/80 text-left transition-colors"
                >
                  <div>
                    <div className="font-semibold text-slate-100">{f.name}</div>
                    <div className="text-[10px] text-slate-400">{f.primaryCrop}</div>
                  </div>
                  {activeFarm.id === f.id && <Check className="w-4 h-4 text-emerald-400" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Satellite Sync Status */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-medium text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Sentinel-2 Satellite Synced (2m ago)</span>
        </div>
      </div>

      {/* Center Command Palette Search Button */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="w-full flex items-center justify-between px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-xs text-slate-400 transition-all group shadow-inner"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 transition-colors" />
            <span>Search crops, disease scans, mandi prices, schemes...</span>
          </div>
          <kbd className="px-2 py-0.5 text-[10px] font-semibold bg-slate-800 text-slate-400 rounded-md border border-slate-700">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5">
        {/* Quick Action Button */}
        <Button
          variant="gradient"
          size="sm"
          onClick={() => addToast("Quick Action", "AI Symptom Diagnostic scan initialized", "info")}
          className="hidden sm:flex"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Quick Scan</span>
        </Button>

        {/* Notifications Popover Trigger */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl glass-panel bg-slate-900/95 border border-slate-700 p-4 shadow-2xl z-50">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h4 className="text-xs font-bold text-slate-100 flex items-center gap-2">
                  <Bell className="w-4 h-4 text-emerald-400" /> Notifications
                </h4>
                <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                  2 Unread
                </span>
              </div>
              <div className="divide-y divide-slate-800/80 my-2 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="py-2.5 px-1 hover:bg-slate-800/40 rounded-lg transition-colors">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-200">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-slate-500 font-normal">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{n.desc}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  setNotificationsOpen(false);
                  addToast("Notifications Cleared", "All alerts marked as read", "success");
                }}
                className="w-full py-1.5 text-center text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 rounded-lg transition-colors mt-1"
              >
                Mark all as read
              </button>
            </div>
          )}
        </div>

        {/* Dark/Light Theme Switcher */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-amber-400 dark:text-teal-400 transition-colors"
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-400" />}
        </button>

        {/* User Profile Quick Badge */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold text-xs shadow-md">
            SK
          </div>
          <div className="hidden xl:flex flex-col text-left">
            <span className="text-xs font-bold text-slate-200">Sukhmeen Kaur</span>
            <span className="text-[10px] text-emerald-400 font-medium">Lead Agronomist</span>
          </div>
        </div>
      </div>

      {/* Command Palette Modal */}
      <Dialog
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        title="AgriGuardian AI Command Palette"
        description="Search platform modules, farm records, advisory databases, and mandi rates."
        maxWidth="lg"
      >
        <form onSubmit={handleCommandSearch} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={commandQuery}
              onChange={(e) => setCommandQuery(e.target.value)}
              placeholder="Type a command (e.g. 'Wheat Rust remedy', 'PM KISAN eligibility', 'Azadpur Mandi prices')..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <div className="text-[11px] uppercase font-bold text-slate-400">Popular Quick Commands</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  setCommandQuery("Scan leaf for disease");
                  addToast("Quick Command", "Navigating to Leaf Disease Scanner", "info");
                  setCommandPaletteOpen(false);
                }}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 text-slate-200 text-left transition-colors"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Run AI Leaf Diagnosis</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setCommandQuery("Simulate 48-Hour Twin");
                  addToast("Quick Command", "Opening AgriTwin Physics Simulator", "info");
                  setCommandPaletteOpen(false);
                }}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-teal-500/50 text-slate-200 text-left transition-colors"
              >
                <Zap className="w-4 h-4 text-teal-400" />
                <span>Trigger AgriTwin Simulation</span>
              </button>
            </div>
          </div>
        </form>
      </Dialog>
    </header>
  );
};
