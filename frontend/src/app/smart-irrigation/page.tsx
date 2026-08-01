"use client";

import React, { useState } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Droplets, Zap, CheckCircle2, AlertTriangle, ShieldCheck, Power } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export default function SmartIrrigationPage() {
  const { addToast } = useToast();

  const [valveA, setValveA] = useState(true);
  const [valveB, setValveB] = useState(false);
  const [valveC, setValveC] = useState(false);

  return (
    <PageWrapper className="space-y-8">
      <div>
        <Badge variant="emerald" className="gap-1">
          <Droplets className="w-3.5 h-3.5" /> Drip & Valve Solenoids
        </Badge>
        <h1 className="text-3xl font-extrabold text-slate-100 mt-2">
          Smart Irrigation & Hydration Telemetry
        </h1>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Automated soil moisture monitoring and solenoid valve control powered by AgriTwin physics decay models.
        </p>
      </div>

      {/* Field Hydration Zones & Solenoid Control Toggles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Zone A */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-100">Zone A (North Plot)</h3>
            <Badge variant="emerald">Optimal (68%)</Badge>
          </div>
          <p className="text-xs text-slate-400">Crop: Wheat (HD-3086) | Sensor Probe #402</p>

          <Progress value={68} colorClass="bg-emerald-500" showValue />

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 pt-2">
            <span className="text-xs font-semibold text-slate-200">Solenoid Valve A</span>
            <Switch
              checked={valveA}
              onCheckedChange={(val) => {
                setValveA(val);
                addToast("Valve A Updated", `Solenoid Valve A ${val ? "Opened" : "Closed"}`, val ? "success" : "info");
              }}
            />
          </div>
        </Card>

        {/* Zone B */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-100">Zone B (Center Plot)</h3>
            <Badge variant="success">Good (63%)</Badge>
          </div>
          <p className="text-xs text-slate-400">Crop: Wheat (HD-3086) | Sensor Probe #403</p>

          <Progress value={63} colorClass="bg-teal-400" showValue />

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 pt-2">
            <span className="text-xs font-semibold text-slate-200">Solenoid Valve B</span>
            <Switch
              checked={valveB}
              onCheckedChange={(val) => {
                setValveB(val);
                addToast("Valve B Updated", `Solenoid Valve B ${val ? "Opened" : "Closed"}`, val ? "success" : "info");
              }}
            />
          </div>
        </Card>

        {/* Zone C */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-100">Zone C (South Plot)</h3>
            <Badge variant="warning">Dry (56%)</Badge>
          </div>
          <p className="text-xs text-slate-400">Crop: Wheat (HD-3086) | Sensor Probe #404</p>

          <Progress value={56} colorClass="bg-amber-400" showValue />

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 pt-2">
            <span className="text-xs font-semibold text-slate-200">Solenoid Valve C</span>
            <Switch
              checked={valveC}
              onCheckedChange={(val) => {
                setValveC(val);
                addToast("Valve C Updated", `Solenoid Valve C ${val ? "Opened" : "Closed"}`, val ? "success" : "info");
              }}
            />
          </div>
        </Card>
      </div>

      {/* Water Conservation Summary */}
      <Card className="p-6 space-y-4">
        <CardTitle className="text-base font-bold flex items-center gap-2">
          <Zap className="w-5 h-5 text-emerald-400" /> Water & Energy Conservation Metrics
        </CardTitle>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="text-slate-400">Water Saved This Month</div>
            <div className="text-2xl font-black text-emerald-400">1,42,500 Liters</div>
            <div className="text-[10px] text-emerald-400 font-semibold">35% reduction vs traditional flood irrigation</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="text-slate-400">Pumping Electricity Saved</div>
            <div className="text-2xl font-black text-teal-400">420 kWh</div>
            <div className="text-[10px] text-teal-400 font-semibold">Saved ₹3,360 in power bills</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="text-slate-400">AI Watering Schedule</div>
            <div className="text-base font-extrabold text-slate-100 mt-1">Next Drip Run: Aug 02, 05:00 AM</div>
            <div className="text-[10px] text-slate-400">Duration: 45 minutes</div>
          </div>
        </div>
      </Card>
    </PageWrapper>
  );
}
