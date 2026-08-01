"use client";

import React from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { AgriTwinCanvas } from "@/components/features/AgriTwinCanvas";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cpu, Sparkles, Droplets, Zap } from "lucide-react";

export default function AgriTwinAIPage() {
  return (
    <PageWrapper className="space-y-8">
      <div>
        <Badge variant="emerald" className="gap-1">
          <Cpu className="w-3.5 h-3.5" /> Physics-Based Digital Twin Engine
        </Badge>
        <h1 className="text-3xl font-extrabold text-slate-100 mt-2">
          AgriTwin™ Farm Digital Twin Visualizer
        </h1>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Simulate 48-hour soil moisture decay, evapotranspiration rates ($ET_0$), canopy temperature shifts, and irrigation urgency recommendations.
        </p>
      </div>

      {/* Main Interactive Digital Twin Visualizer */}
      <AgriTwinCanvas />
    </PageWrapper>
  );
}
