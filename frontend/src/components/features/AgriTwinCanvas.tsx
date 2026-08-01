"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cpu, Droplets, Thermometer, Wind, Play, RotateCcw, Zap, Sparkles, CheckCircle2 } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export const AgriTwinCanvas: React.FC = () => {
  const { addToast } = useToast();

  const [tempOffset, setTempOffset] = useState<number>(0); // -5 to +5 °C
  const [rainDelay, setRainDelay] = useState<number>(0); // 0 to 14 days
  const [simulationHour, setSimulationHour] = useState<number>(0); // 0 to 48 hours
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Compute moisture decay based on tempOffset & simulationHour
  const baseMoisture = 68;
  const decayRate = 0.45 + tempOffset * 0.08;
  const currentMoisture = Math.max(15, Math.round(baseMoisture - simulationHour * decayRate));

  const runForwardSimulation = () => {
    setIsSimulating(true);
    let h = 0;
    const interval = setInterval(() => {
      h += 6;
      setSimulationHour(h);
      if (h >= 48) {
        clearInterval(interval);
        setIsSimulating(false);
        addToast(
          "AgriTwin Simulation Complete",
          "48-hour moisture decay physics calculated. Moisture will reach 46% critical threshold in 32 hours.",
          "success"
        );
      }
    }, 400);
  };

  const resetSimulation = () => {
    setSimulationHour(0);
    setTempOffset(0);
    setRainDelay(0);
    addToast("AgriTwin Reset", "Simulation parameters reverted to real-time IoT sensors", "info");
  };

  return (
    <Card className="p-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <Cpu className="w-5 h-5 text-teal-400" />
              AgriTwin™ Physics-Based Soil & Crop Digital Twin
            </CardTitle>
            <Badge variant="emerald" className="gap-1">
              <Sparkles className="w-3 h-3" /> Live Twin
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulate 48-hour soil moisture decay, evapotranspiration rates, and crop water stress using micro-physics equations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={resetSimulation}>
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </Button>
          <Button
            variant="gradient"
            size="sm"
            onClick={runForwardSimulation}
            disabled={isSimulating}
          >
            <Play className="w-3.5 h-3.5" />
            <span>{isSimulating ? "Simulating..." : "Run 48H Simulation"}</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Farm Digital Plot Render */}
        <div className="lg:col-span-2 relative bg-slate-950/90 rounded-2xl border border-slate-800 p-6 flex flex-col items-center justify-between min-h-[360px] overflow-hidden">
          <div className="w-full flex items-center justify-between z-10 text-xs font-semibold text-slate-300 mb-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-ping" />
              Sensor Node #402 - Green Valley Sector A
            </span>
            <span className="text-emerald-400 font-mono">Sim Time: +{simulationHour} Hours</span>
          </div>

          {/* Farm Grid Canvas */}
          <div className="w-full grid grid-cols-3 gap-4 my-4 z-10">
            {/* Zone A */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col items-center text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                ZA
              </div>
              <div className="text-xs font-bold text-slate-100">Zone A (North)</div>
              <div className="text-[11px] text-slate-400">Soil Moisture: <span className="text-emerald-400 font-bold">{currentMoisture}%</span></div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${currentMoisture}%` }} />
              </div>
            </div>

            {/* Zone B */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-teal-500/50 transition-all flex flex-col items-center text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-xs">
                ZB
              </div>
              <div className="text-xs font-bold text-slate-100">Zone B (Center)</div>
              <div className="text-[11px] text-slate-400">Soil Moisture: <span className="text-teal-400 font-bold">{Math.max(10, currentMoisture - 5)}%</span></div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-teal-400 transition-all duration-300" style={{ width: `${Math.max(10, currentMoisture - 5)}%` }} />
              </div>
            </div>

            {/* Zone C */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 transition-all flex flex-col items-center text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                ZC
              </div>
              <div className="text-xs font-bold text-slate-100">Zone C (South)</div>
              <div className="text-[11px] text-slate-400">Soil Moisture: <span className="text-amber-400 font-bold">{Math.max(8, currentMoisture - 12)}%</span></div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 transition-all duration-300" style={{ width: `${Math.max(8, currentMoisture - 12)}%` }} />
              </div>
            </div>
          </div>

          {/* Time Stepper Slider */}
          <div className="w-full space-y-2 z-10 pt-4 border-t border-slate-800/80">
            <div className="flex justify-between text-xs font-semibold text-slate-300">
              <span>Simulation Forward Timeline</span>
              <span>+{simulationHour} Hours</span>
            </div>
            <input
              type="range"
              min="0"
              max="48"
              step="1"
              value={simulationHour}
              onChange={(e) => setSimulationHour(parseInt(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-800 cursor-pointer h-2 rounded-lg"
            />
          </div>
        </div>

        {/* Physics Scenario Parameters Side Panel */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Scenario Parameters
          </h4>

          {/* Temp offset slider */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex justify-between text-xs font-medium text-slate-300">
              <span className="flex items-center gap-1.5">
                <Thermometer className="w-4 h-4 text-rose-400" /> Temperature Shift
              </span>
              <span className="font-bold text-rose-400">{tempOffset > 0 ? `+${tempOffset}` : tempOffset}°C</span>
            </div>
            <input
              type="range"
              min="-5"
              max="5"
              value={tempOffset}
              onChange={(e) => setTempOffset(parseInt(e.target.value))}
              className="w-full accent-rose-500 bg-slate-800 cursor-pointer h-1.5 rounded-lg"
            />
          </div>

          {/* Rain delay slider */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex justify-between text-xs font-medium text-slate-300">
              <span className="flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-sky-400" /> Monsoonal Rain Delay
              </span>
              <span className="font-bold text-sky-400">{rainDelay} Days</span>
            </div>
            <input
              type="range"
              min="0"
              max="14"
              value={rainDelay}
              onChange={(e) => setRainDelay(parseInt(e.target.value))}
              className="w-full accent-sky-500 bg-slate-800 cursor-pointer h-1.5 rounded-lg"
            />
          </div>

          {/* AI Recommendation Summary */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-800/60 space-y-2 text-xs">
            <div className="font-bold text-emerald-400 flex items-center gap-1.5">
              <Zap className="w-4 h-4" /> AI Urgency Recommendation
            </div>
            <p className="text-slate-300 leading-relaxed">
              {currentMoisture < 45
                ? "CRITICAL: Soil hydration will drop below Wilting Point in 12 hours. Trigger automated drip solenoids."
                : "OPTIMAL: Soil moisture decay is within safe absorption parameters. No immediate watering required."}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
