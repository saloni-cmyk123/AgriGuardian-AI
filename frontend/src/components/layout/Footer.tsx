"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Mail, ArrowRight, Github, Twitter, Linkedin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/25">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                AgriGuardian <span className="text-emerald-400">AI</span>
              </span>
            </Link>
            <p className="text-slate-400 max-w-sm leading-relaxed text-xs">
              Enterprise agricultural intelligence platform predicting crop diseases, optimizing soil hydration digital twins, and matching government subsidies for farmers, agronomists, and government departments.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-slate-400 hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-slate-400 hover:text-white transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-slate-400 hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Core Platform Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">Platform</h4>
            <ul className="space-y-2 font-medium">
              <li><Link href="/dashboard" className="hover:text-emerald-400 transition-colors">Farm Dashboard</Link></li>
              <li><Link href="/disease-detection" className="hover:text-emerald-400 transition-colors">Leaf Disease Engine</Link></li>
              <li><Link href="/agritwin-ai" className="hover:text-emerald-400 transition-colors">AgriTwin Physics Engine</Link></li>
              <li><Link href="/national-intelligence" className="hover:text-emerald-400 transition-colors">India Regional Map</Link></li>
              <li><Link href="/market-intelligence" className="hover:text-emerald-400 transition-colors">APMC Mandi Predictor</Link></li>
            </ul>
          </div>

          {/* Solutions Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">Solutions</h4>
            <ul className="space-y-2 font-medium">
              <li><Link href="/government-schemes" className="hover:text-emerald-400 transition-colors">PM-KISAN Scheme Matcher</Link></li>
              <li><Link href="/smart-irrigation" className="hover:text-emerald-400 transition-colors">Soil Moisture Telemetry</Link></li>
              <li><Link href="/weather-intelligence" className="hover:text-emerald-400 transition-colors">Micro-Climate Radar</Link></li>
              <li><Link href="/ai-chatbot" className="hover:text-emerald-400 transition-colors">AI Agronomist Bot</Link></li>
              <li><Link href="/profile" className="hover:text-emerald-400 transition-colors">IoT Sensor Management</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">Agri Insights</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Subscribe to weekly crop threat bulletins and APMC mandi forecast summaries.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  placeholder="Enter work email..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50"
                />
              </div>
              <Button variant="gradient" size="sm" className="w-full">
                <span>Subscribe Bulletin</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} AgriGuardian AI Inc. All rights reserved. ISO 27001 Certified.
          </div>
          <div className="flex items-center gap-6 font-medium">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Security Audit</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Status (99.98%)</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
