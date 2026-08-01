"use client";

import React from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Sprout, Cpu, MapPin, ShieldCheck, Wifi, Battery, CheckCircle2 } from "lucide-react";
import { useFarm } from "@/context/FarmContext";
import { useToast } from "@/context/ToastContext";

export default function ProfilePage() {
  const { activeFarm } = useFarm();
  const { addToast } = useToast();

  const iotDevices = [
    { name: "Sentinel-2 Satellite Node Sync", type: "Satellite Telemetry", status: "Active", battery: "100%", signal: "Strong (5G)" },
    { name: "Soil Moisture Probe #402 (Zone A)", type: "Capacitance Soil Sensor", status: "Active", battery: "94%", signal: "Excellent" },
    { name: "Soil Moisture Probe #403 (Zone B)", type: "Capacitance Soil Sensor", status: "Active", battery: "88%", signal: "Good" },
    { name: "Micro-Climate Station #10", type: "Anemometer & Rain Gauge", status: "Active", battery: "98%", signal: "Excellent" },
    { name: "Solenoid Valve Controller #12", type: "Irrigation Actuator", status: "Active", battery: "100% (AC)", signal: "Strong" },
  ];

  return (
    <PageWrapper className="space-y-8">
      <div>
        <Badge variant="emerald" className="gap-1">
          <User className="w-3.5 h-3.5" /> Farmer & Agronomist Profile
        </Badge>
        <h1 className="text-3xl font-extrabold text-slate-100 mt-2">
          Farm Profile & IoT Hardware Devices
        </h1>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Manage your agricultural profile, landholding boundaries, soil classification records, and connected field sensor telemetry.
        </p>
      </div>

      {/* User Info & Farm Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 md:col-span-1 space-y-4">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-extrabold text-2xl shadow-xl">
              SK
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">Sukhmeen Kaur</h2>
              <div className="text-xs font-semibold text-emerald-400">Lead Agronomist & Farmer</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Farm ID: #AG-88402</div>
            </div>
            <Badge variant="emerald">Verified Aadhaar & PM-KISAN</Badge>
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Location:</span>
              <span className="font-semibold text-slate-200">{activeFarm.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Landholding:</span>
              <span className="font-semibold text-slate-200">{activeFarm.sizeAcres} Acres</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Soil Type:</span>
              <span className="font-semibold text-slate-200">{activeFarm.soilType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Primary Crop:</span>
              <span className="font-semibold text-emerald-400">{activeFarm.primaryCrop}</span>
            </div>
          </div>
        </Card>

        {/* Connected IoT Devices Manager */}
        <Card className="p-6 md:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Cpu className="w-5 h-5 text-teal-400" /> Connected IoT Sensors & Hardware Probes
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => addToast("Add Device", "Opened new IoT sensor pairing wizard", "info")}
            >
              + Pair New Probe
            </Button>
          </div>

          <div className="space-y-3">
            {iotDevices.map((dev, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Wifi className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-200">{dev.name}</div>
                    <div className="text-[10px] text-slate-400">{dev.type}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-right">
                  <div>
                    <div className="font-semibold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {dev.status}
                    </div>
                    <div className="text-[10px] text-slate-500">Signal: {dev.signal}</div>
                  </div>
                  <div className="text-[11px] font-bold text-slate-300 bg-slate-800 px-2 py-1 rounded-md">
                    🔋 {dev.battery}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
}
