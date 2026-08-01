"use client";

import React from "react";
import Link from "next/link";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/layout/Footer";
import {
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Scan,
  Cpu,
  Globe2,
  CloudSun,
  TrendingUp,
  FileCheck,
  Bot,
  Play,
  CheckCircle2,
  Star,
  Users,
  Award,
  Zap,
  ChevronRight,
  Sprout,
  BarChart3,
  Layers,
} from "lucide-react";

export default function LandingPage() {
  const stats = [
    { value: "98.4%", label: "Disease Detection Accuracy", sub: "Fine-tuned XAI Models" },
    { value: "4.2M+", label: "Hectares Monitored", sub: "Sentinel-2 Satellite Mesh" },
    { value: "35%", label: "Water Savings", sub: "AgriTwin Physics Simulation" },
    { value: "₹12,500", label: "Yield Income Growth", sub: "Per Acre Average Profit" },
  ];

  const features = [
    {
      icon: Scan,
      title: "Leaf Disease Diagnostic Engine",
      desc: "Instant computer vision leaf scan identifying yellow rust, late blight, and leaf curl with explainable XAI heatmaps and organic dosage plans.",
    },
    {
      icon: Cpu,
      title: "AgriTwin™ Physics Digital Twin",
      desc: "Physics-based simulation modeling soil moisture decay, evapotranspiration, and crop stress 48 hours into the future.",
    },
    {
      icon: Globe2,
      title: "National Crop Intelligence & Map",
      desc: "Interactive state-by-state SVG greenness map, regional drought severity index, and trans-boundary pest migration warnings.",
    },
    {
      icon: CloudSun,
      title: "Hyper-Local Micro-Climate Radar",
      desc: "High-resolution weather radar tracking dew point, solar irradiance, evapotranspiration ($ET_0$), and severe frost/hail warnings.",
    },
    {
      icon: TrendingUp,
      title: "APMC Mandi Price Predictor",
      desc: "Time-series transformer models forecasting 14-day APMC mandi commodity prices with nearest high-payout market arbitrage matrix.",
    },
    {
      icon: FileCheck,
      title: "Government Subsidy AI Matcher",
      desc: "Matches PM-KISAN, PMFBY crop insurance, and mechanization subsidies based on land holding size and verified crop records.",
    },
  ];

  const workflowSteps = [
    {
      step: "01",
      title: "Multi-Spectral Ingestion",
      desc: "Connects field IoT probes, local weather stations, and Sentinel-2 satellite imagery.",
    },
    {
      step: "02",
      title: "AgriTwin Physics Twin",
      desc: "Simulates soil moisture decay, evapotranspiration, and disease outbreak probabilities.",
    },
    {
      step: "03",
      title: "Predictive AI Advisory",
      desc: "Delivers hyper-local spray timing, mandi sell signals, and automated irrigation triggers.",
    },
    {
      step: "04",
      title: "Yield & Subsidy Optimization",
      desc: "Executes one-click government subsidy matching and maximizes net harvest revenue.",
    },
  ];

  const testimonials = [
    {
      quote:
        "AgriGuardian AI saved 4 acres of Wheat from Yellow Rust in Ludhiana. The XAI treatment protocol gave exact pesticide dosage that cured the outbreak in 48 hours.",
      name: "Gurpreet Singh",
      role: "Progressive Farmer (12.5 Acres)",
      location: "Ludhiana, Punjab",
      rating: 5,
    },
    {
      quote:
        "The AgriTwin physics digital twin allows us to advise 500+ farmers with 95%+ precision. Water savings alone have reduced electricity bills significantly.",
      name: "Dr. Ananya Sharma",
      role: "Senior Agronomist & ICAR Consultant",
      location: "Nashik, Maharashtra",
      rating: 5,
    },
    {
      quote:
        "National Crop Intelligence gives our state department live regional NDVI greenness maps and trans-boundary pest migration warnings weeks before outbreaks spread.",
      name: "Rajesh Varma",
      role: "Deputy Director of Agriculture",
      location: "Lucknow, Uttar Pradesh",
      rating: 5,
    },
  ];

  return (
    <PageWrapper className="space-y-20 pb-12">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 text-center max-w-5xl mx-auto space-y-8">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-emerald-400 animate-spin-slow" />
          <span>Next-Generation Agricultural AI Platform 2.0</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-100 tracking-tight leading-[1.1]">
          Predict. Protect. <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">
            Prosper.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          The enterprise AI SaaS platform empowering Farmers, Agronomists, and Agriculture Departments with digital twin simulations, early leaf disease diagnostics, mandi price forecasting, and government subsidy matchers.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link href="/dashboard">
            <Button variant="gradient" size="lg" className="w-full sm:w-auto text-base">
              <span>Launch Platform</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="/agritwin-ai">
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-base">
              <Play className="w-4 h-4 text-teal-400" />
              <span>Explore AgriTwin Simulator</span>
            </Button>
          </Link>
        </div>

        {/* Hero Interactive App Mockup Preview */}
        <div className="relative mt-12 rounded-3xl glass-panel bg-slate-900/90 border border-slate-700/80 p-6 shadow-2xl overflow-hidden max-w-4xl mx-auto group">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-mono text-[11px] text-slate-300">agriguardian.ai/dashboard</span>
            </div>
            <Badge variant="emerald" className="gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Live Telemetry
            </Badge>
          </div>

          {/* Mockup Dashboard Preview Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="text-[11px] uppercase font-bold text-emerald-400 flex items-center gap-1.5">
                <Sprout className="w-4 h-4" /> Green Valley Fields
              </div>
              <div className="text-2xl font-black text-slate-100">NDVI: 0.88</div>
              <div className="text-[11px] text-slate-400">Soil Moisture: 68% | Nitrogen: Optimal</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="text-[11px] uppercase font-bold text-teal-400 flex items-center gap-1.5">
                <Cpu className="w-4 h-4" /> AgriTwin Status
              </div>
              <div className="text-2xl font-black text-teal-300">+48H Clear</div>
              <div className="text-[11px] text-slate-400">Next Irrigation: 32 Hours</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="text-[11px] uppercase font-bold text-amber-400 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" /> APMC Mandi Rate
              </div>
              <div className="text-2xl font-black text-emerald-400">₹2,480/Qtl</div>
              <div className="text-[11px] text-emerald-400">+₹130/Qtl 14-Day Surge</div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 border-y border-slate-800/80 bg-slate-950/40">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((st, idx) => (
            <div key={idx} className="space-y-2">
              <div className="text-3xl sm:text-5xl font-black bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                {st.value}
              </div>
              <div className="text-xs font-bold text-slate-200">{st.label}</div>
              <div className="text-[10px] text-slate-400">{st.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <Badge variant="emerald">Platform Capabilities</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
            Engineered for Precision Agriculture
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Comprehensive suite of AI tools designed for every stakeholder in the agrarian ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const IconComp = feat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl glass-panel bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 hover:shadow-emerald-500/10 hover:shadow-xl transition-all duration-300 space-y-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 group-hover:scale-110 transition-transform">
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-100">{feat.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works Pipeline */}
      <section className="max-w-6xl mx-auto space-y-12 py-8">
        <div className="text-center space-y-3">
          <Badge variant="emerald">How It Works</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
            End-to-End Agri AI Pipeline
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {workflowSteps.map((ws, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 relative group hover:border-teal-500/50 transition-all"
            >
              <div className="text-3xl font-black text-emerald-400/40 group-hover:text-emerald-400 transition-colors">
                {ws.step}
              </div>
              <h4 className="text-sm font-bold text-slate-100">{ws.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{ws.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <Badge variant="emerald">User Reviews</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
            Trusted by Farmers & Agronomists
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl glass-panel bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 italic leading-relaxed">"{t.quote}"</p>
              </div>

              <div className="pt-3 border-t border-slate-800/80">
                <div className="text-xs font-bold text-slate-100">{t.name}</div>
                <div className="text-[10px] text-emerald-400 font-medium">{t.role}</div>
                <div className="text-[10px] text-slate-500">{t.location}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-5xl mx-auto p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-500/30 text-center space-y-6 shadow-2xl relative overflow-hidden">
        <div className="space-y-3 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-100">
            Ready to Predict, Protect & Prosper?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Join thousands of progressive farmers and agricultural departments using AgriGuardian AI today.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
          <Link href="/dashboard">
            <Button variant="gradient" size="lg" className="w-full sm:w-auto">
              <span>Start Free Trial</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/government-schemes">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <span>Check Govt Subsidies</span>
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </PageWrapper>
  );
}
