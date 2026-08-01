"use client";

import React from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { IndiaMap } from "@/components/features/IndiaMap";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe2, ShieldAlert, TrendingUp, Sprout, BarChart2 } from "lucide-react";

export default function NationalIntelligencePage() {
  return (
    <PageWrapper className="space-y-8">
      <div>
        <Badge variant="emerald" className="gap-1">
          <Globe2 className="w-3.5 h-3.5" /> Sentinel-2 Multispectral Satellite Mesh
        </Badge>
        <h1 className="text-3xl font-extrabold text-slate-100 mt-2">
          National Crop Intelligence & Interactive India Map
        </h1>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Macro-regional satellite greenness tracking (NDVI), trans-boundary pest migration warnings, and state-by-state agricultural yield estimates.
        </p>
      </div>

      {/* Interactive India Map */}
      <IndiaMap />

      {/* Macro-Regional Data Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 space-y-2">
          <div className="text-xs text-slate-400">National Average NDVI</div>
          <div className="text-3xl font-black text-emerald-400">0.81 / 1.00</div>
          <p className="text-xs text-slate-300">Healthy vegetation density across northern granary belts.</p>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="text-xs text-slate-400">Total Land Under Monitoring</div>
          <div className="text-3xl font-black text-teal-400">4.2 Million Hectares</div>
          <p className="text-xs text-slate-300">Covering Punjab, Haryana, UP, Maharashtra, MP, Tamil Nadu.</p>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="text-xs text-slate-400">Trans-Boundary Pest Alert</div>
          <div className="text-3xl font-black text-amber-400">Desert Locust Risk</div>
          <p className="text-xs text-slate-300">Border migration watch active in Jaisalmer & Barmer districts.</p>
        </Card>
      </div>
    </PageWrapper>
  );
}
