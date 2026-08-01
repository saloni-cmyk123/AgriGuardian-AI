"use client";

import React from "react";
import Link from "next/link";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useFarm } from "@/context/FarmContext";
import { useToast } from "@/context/ToastContext";
import {
  Sprout,
  CloudSun,
  Scan,
  Bug,
  TrendingUp,
  Award,
  Zap,
  Clock,
  ArrowRight,
  ShieldAlert,
  Droplets,
  Cpu,
  FileCheck,
  Bot,
  CheckCircle2,
} from "lucide-react";

export default function DashboardPage() {
  const { activeFarm } = useFarm();
  const { addToast } = useToast();

  const recentActivities = [
    { id: 1, text: "Leaf Scan: Wheat Yellow Rust detected (96.8% confidence)", time: "15 mins ago", icon: Scan, color: "text-rose-400" },
    { id: 2, text: "AgriTwin Physics Twin simulated 48H soil moisture decay", time: "1 hour ago", icon: Cpu, color: "text-teal-400" },
    { id: 3, text: "APMC Khanna Mandi rate for Wheat surged by +₹130/Qtl", time: "3 hours ago", icon: TrendingUp, color: "text-emerald-400" },
    { id: 4, text: "PM-KISAN 16th Installment verified & linked to Aadhaar", time: "Yesterday", icon: FileCheck, color: "text-sky-400" },
  ];

  return (
    <PageWrapper className="space-y-8">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl glass-panel bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-950 border border-slate-800 shadow-2xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
              Welcome back, <span className="text-emerald-400">Sukhmeen</span>!
            </h1>
            <Badge variant="emerald" className="gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Live Telemetry
            </Badge>
          </div>
          <p className="text-xs text-slate-400">
            Monitoring <strong className="text-slate-200">{activeFarm.name}</strong> ({activeFarm.location}) — Primary Crop: {activeFarm.primaryCrop}
          </p>
        </div>

        {/* Quick Actions Shortcuts */}
        <div className="flex items-center gap-2 flex-wrap">
          <Link href="/disease-detection">
            <Button variant="gradient" size="sm">
              <Scan className="w-3.5 h-3.5" />
              <span>Scan Leaf</span>
            </Button>
          </Link>
          <Link href="/agritwin-ai">
            <Button variant="outline" size="sm">
              <Cpu className="w-3.5 h-3.5 text-teal-400" />
              <span>AgriTwin</span>
            </Button>
          </Link>
          <Link href="/ai-chatbot">
            <Button variant="secondary" size="sm">
              <Bot className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ask AI</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Grid Row 1: Farm Health & Weather & Yield */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Farm Health Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Sprout className="w-5 h-5 text-emerald-400" /> Farm Health Card
            </CardTitle>
            <Badge variant="emerald">NDVI 0.88</Badge>
          </div>

          <div className="space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-black text-slate-100">{activeFarm.healthScore} / 100</span>
              <span className="text-xs font-semibold text-emerald-400">Optimal Growth</span>
            </div>

            <Progress value={activeFarm.healthScore} colorClass="bg-gradient-to-r from-emerald-500 to-teal-400" />

            <div className="grid grid-cols-2 gap-2 text-xs pt-2">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-400">Soil Hydration</div>
                <div className="font-bold text-slate-200 mt-0.5">68% (Safe)</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-400">NPK Nitrogen</div>
                <div className="font-bold text-emerald-400 mt-0.5">Optimal</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Weather Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <CloudSun className="w-5 h-5 text-sky-400" /> Weather Radar
            </CardTitle>
            <span className="text-[10px] text-slate-400">Ludhiana NW</span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-black text-slate-100">31.4 °C</div>
                <div className="text-xs text-slate-400">Partly Cloudy</div>
              </div>
              <CloudSun className="w-10 h-10 text-sky-400" />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-400">Humidity</div>
                <div className="font-bold text-amber-400 mt-0.5">84% (High)</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-400">Rain Prob.</div>
                <div className="font-bold text-sky-400 mt-0.5">20% Today</div>
              </div>
            </div>

            <Link href="/weather-intelligence" className="block text-center text-xs font-semibold text-sky-400 hover:underline pt-1">
              View 7-Day Micro-Climate Radar →
            </Link>
          </div>
        </Card>

        {/* Yield Prediction Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" /> Yield Forecast
            </CardTitle>
            <Badge variant="warning">Harvest in 34 Days</Badge>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-xs text-slate-400">Projected Wheat Output</div>
              <div className="text-2xl font-black text-emerald-400 mt-0.5">28.4 Quintals / Acre</div>
              <div className="text-[11px] text-slate-400 mt-1">+18.5% higher than district baseline</div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">Est. Farm Revenue:</span>
              <span className="font-extrabold text-emerald-400">₹8,80,400</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Grid Row 2: Disease Risk & Pest Risk */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Disease Risk Card */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Scan className="w-5 h-5 text-rose-400" /> Disease Threat Advisory
            </CardTitle>
            <Badge variant="danger">74% High Risk</Badge>
          </div>

          <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-rose-300">
              <span>Puccinia striiformis (Yellow Rust)</span>
              <span>Wheat (HD-3086)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              High humidity (84%) and ambient 22°C temperatures trigger spore germination. Spray Propiconazole 25% EC within 48 hours.
            </p>
          </div>

          <div className="flex justify-end">
            <Link href="/disease-detection">
              <Button variant="gradient" size="sm">
                <span>Run Diagnostic Scan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </Card>

        {/* Pest Risk Card */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Bug className="w-5 h-5 text-amber-400" /> Regional Pest Outbreak Alert
            </CardTitle>
            <Badge variant="warning">Pheromone Warning</Badge>
          </div>

          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/50 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-amber-300">
              <span>Pink Bollworm & Aphid Swarm</span>
              <span>Vidarbha & Western Punjab</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Trans-boundary pest radar detected aphid vector density increasing across neighboring sector fields. Install pheromone traps immediately.
            </p>
          </div>

          <div className="flex justify-end">
            <Link href="/national-intelligence">
              <Button variant="outline" size="sm">
                <span>View Regional Pest Map</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Main Grid Row 3: Market Trends & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Market Trends Card */}
        <div className="lg:col-span-2">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" /> APMC Mandi Price Trends
              </CardTitle>
              <Link href="/market-intelligence" className="text-xs font-semibold text-emerald-400 hover:underline">
                Explore All Mandis →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-slate-400">Wheat (HD-3086)</div>
                <div className="text-lg font-black text-emerald-400">₹2,480 / Qtl</div>
                <div className="text-[10px] text-emerald-400 font-semibold">+₹130 (5.4% Up)</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-slate-400">Paddy (Samba)</div>
                <div className="text-lg font-black text-teal-400">₹2,360 / Qtl</div>
                <div className="text-[10px] text-teal-400 font-semibold">+₹70 (3.0% Up)</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-slate-400">Tomato (Hybrid)</div>
                <div className="text-lg font-black text-amber-400">₹4,200 / Qtl</div>
                <div className="text-[10px] text-amber-400 font-semibold">+₹350 Surge</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activities Feed */}
        <Card className="p-6 space-y-4">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" /> Recent Activities
          </CardTitle>

          <div className="space-y-3">
            {recentActivities.map((act) => {
              const IconComponent = act.icon;
              return (
                <div key={act.id} className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/60">
                  <IconComponent className={`w-4 h-4 mt-0.5 shrink-0 ${act.color}`} />
                  <div className="flex-1 text-xs">
                    <div className="text-slate-200 font-medium leading-snug">{act.text}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{act.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
}
