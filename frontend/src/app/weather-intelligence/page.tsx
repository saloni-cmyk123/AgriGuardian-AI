"use client";

import React from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { WeatherRadarCard } from "@/components/features/WeatherRadarCard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CloudSun, Sun, Wind, ShieldAlert, CheckCircle2, Droplets } from "lucide-react";

export default function WeatherIntelligencePage() {
  return (
    <PageWrapper className="space-y-8">
      <div>
        <Badge variant="emerald" className="gap-1">
          <CloudSun className="w-3.5 h-3.5" /> High-Resolution Radar
        </Badge>
        <h1 className="text-3xl font-extrabold text-slate-100 mt-2">
          Hyper-Local Weather Intelligence Radar
        </h1>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Micro-climate weather forecasting, solar radiation metrics, evapotranspiration ($ET_0$), and severe frost or heavy rainfall warnings.
        </p>
      </div>

      {/* Weather Radar Card */}
      <WeatherRadarCard />

      {/* Optimal Spraying & Field Work Windows */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-3">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Optimal Spraying Window
          </CardTitle>
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/50 space-y-2">
            <div className="text-xs font-bold text-emerald-300">Today: 06:00 AM - 09:30 AM</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Wind speed is &lt;8 km/h and relative humidity is optimal for liquid fungicide absorption. Avoid spraying after 11:00 AM as temperature rises above 32°C.
            </p>
          </div>
        </Card>

        <Card className="p-6 space-y-3">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" /> Dew Point & Frost Risk
          </CardTitle>
          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/50 space-y-2">
            <div className="text-xs font-bold text-amber-300">Dew Point: 20.8 °C</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              High nighttime dew condensation expected on crop canopy. Maintain field perimeter windbreaks to mitigate fungal spore multiplication.
            </p>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
}
