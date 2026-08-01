"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Globe2, ShieldAlert, Sprout, TrendingUp, ChevronRight, Info } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";

export interface StateAgriData {
  id: string;
  name: string;
  primaryCrops: string[];
  ndviScore: number;
  droughtRisk: "Low" | "Moderate" | "High" | "Severe";
  pestAlert: string;
  projectedHarvestQuintals: number;
  color: string;
}

const statesData: Record<string, StateAgriData> = {
  PB: {
    id: "PB",
    name: "Punjab",
    primaryCrops: ["Wheat (HD-3086)", "Rice (Pusa 1121)", "Cotton"],
    ndviScore: 0.88,
    droughtRisk: "Low",
    pestAlert: "Wheat Leaf Rust (Yellow Rust) early warnings in Gurdaspur",
    projectedHarvestQuintals: 18450000,
    color: "#10b981",
  },
  HR: {
    id: "HR",
    name: "Haryana",
    primaryCrops: ["Mustard", "Wheat", "Sugarcane"],
    ndviScore: 0.84,
    droughtRisk: "Low",
    pestAlert: "Aphid swarm in Karnal district under observation",
    projectedHarvestQuintals: 14200000,
    color: "#10b981",
  },
  UP: {
    id: "UP",
    name: "Uttar Pradesh",
    primaryCrops: ["Sugarcane", "Wheat", "Potato", "Paddy"],
    ndviScore: 0.81,
    droughtRisk: "Moderate",
    pestAlert: "Sugarcane Red Rot risk near Western UP belt",
    projectedHarvestQuintals: 32000000,
    color: "#14b8a6",
  },
  MH: {
    id: "MH",
    name: "Maharashtra",
    primaryCrops: ["Cotton", "Sugarcane", "Soybean", "Onion"],
    ndviScore: 0.72,
    droughtRisk: "High",
    pestAlert: "Pink Bollworm advisory active in Vidarbha region",
    projectedHarvestQuintals: 21500000,
    color: "#f59e0b",
  },
  MP: {
    id: "MP",
    name: "Madhya Pradesh",
    primaryCrops: ["Soybean", "Wheat", "Gram (Chana)"],
    ndviScore: 0.79,
    droughtRisk: "Moderate",
    pestAlert: "Pod borer in gram crops - preventive spray recommended",
    projectedHarvestQuintals: 24800000,
    color: "#14b8a6",
  },
  GJ: {
    id: "GJ",
    name: "Gujarat",
    primaryCrops: ["Groundnut", "Cotton", "Castor"],
    ndviScore: 0.75,
    droughtRisk: "Moderate",
    pestAlert: "Whitefly activity reported in Saurashtra groundnut fields",
    projectedHarvestQuintals: 16900000,
    color: "#f59e0b",
  },
  TN: {
    id: "TN",
    name: "Tamil Nadu",
    primaryCrops: ["Paddy (Samba)", "Coconut", "Banana"],
    ndviScore: 0.86,
    droughtRisk: "Low",
    pestAlert: "Brown Planthopper advisory in Cauvery delta",
    projectedHarvestQuintals: 12400000,
    color: "#10b981",
  },
  RJ: {
    id: "RJ",
    name: "Rajasthan",
    primaryCrops: ["Bajra (Pearl Millet)", "Mustard", "Guar"],
    ndviScore: 0.61,
    droughtRisk: "Severe",
    pestAlert: "Desert Locust swarm migration warning along border",
    projectedHarvestQuintals: 11000000,
    color: "#f43f5e",
  },
};

export const IndiaMap: React.FC = () => {
  const [selectedState, setSelectedState] = useState<StateAgriData | null>(null);

  return (
    <Card className="p-6 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-emerald-400" />
            National Satellite Greenness (NDVI) & Crop Health Map
          </CardTitle>
          <p className="text-xs text-slate-400 mt-1">
            Real-time multispectral Sentinel-2 satellite analytics across major Indian agrarian states. Click any region to open intelligence report.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="emerald" className="gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400" /> Healthy (NDVI &gt; 0.8)
          </Badge>
          <Badge variant="warning" className="gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-400" /> Moderate (NDVI 0.7-0.8)
          </Badge>
          <Badge variant="danger" className="gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-400" /> High Stress / Pest Alert
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        {/* Interactive SVG Map Visualizer */}
        <div className="lg:col-span-2 relative bg-slate-950/80 rounded-2xl border border-slate-800 p-4 flex items-center justify-center min-h-[380px] overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
          
          <svg
            viewBox="0 0 600 650"
            className="w-full max-w-md h-auto drop-shadow-2xl z-10"
          >
            {/* North Region: Punjab */}
            <path
              d="M 190 140 L 230 130 L 250 160 L 220 190 L 180 170 Z"
              fill={statesData.PB.color}
              stroke="#0f172a"
              strokeWidth="2"
              className="cursor-pointer hover:brightness-125 transition-all duration-200"
              onClick={() => setSelectedState(statesData.PB)}
            />
            <text x="210" y="160" fill="#ffffff" fontSize="10" fontWeight="bold" pointerEvents="none">
              PB
            </text>

            {/* Haryana */}
            <path
              d="M 230 160 L 260 150 L 280 180 L 240 200 Z"
              fill={statesData.HR.color}
              stroke="#0f172a"
              strokeWidth="2"
              className="cursor-pointer hover:brightness-125 transition-all duration-200"
              onClick={() => setSelectedState(statesData.HR)}
            />
            <text x="245" y="180" fill="#ffffff" fontSize="10" fontWeight="bold" pointerEvents="none">
              HR
            </text>

            {/* Rajasthan */}
            <path
              d="M 120 180 L 230 190 L 220 280 L 130 290 Z"
              fill={statesData.RJ.color}
              stroke="#0f172a"
              strokeWidth="2"
              className="cursor-pointer hover:brightness-125 transition-all duration-200"
              onClick={() => setSelectedState(statesData.RJ)}
            />
            <text x="165" y="240" fill="#ffffff" fontSize="12" fontWeight="bold" pointerEvents="none">
              RJ
            </text>

            {/* Uttar Pradesh */}
            <path
              d="M 260 170 L 380 180 L 400 240 L 270 240 Z"
              fill={statesData.UP.color}
              stroke="#0f172a"
              strokeWidth="2"
              className="cursor-pointer hover:brightness-125 transition-all duration-200"
              onClick={() => setSelectedState(statesData.UP)}
            />
            <text x="320" y="210" fill="#ffffff" fontSize="12" fontWeight="bold" pointerEvents="none">
              UP
            </text>

            {/* Gujarat */}
            <path
              d="M 110 290 L 190 280 L 200 370 L 100 360 Z"
              fill={statesData.GJ.color}
              stroke="#0f172a"
              strokeWidth="2"
              className="cursor-pointer hover:brightness-125 transition-all duration-200"
              onClick={() => setSelectedState(statesData.GJ)}
            />
            <text x="140" y="330" fill="#ffffff" fontSize="11" fontWeight="bold" pointerEvents="none">
              GJ
            </text>

            {/* Madhya Pradesh */}
            <path
              d="M 210 260 L 350 250 L 360 340 L 200 350 Z"
              fill={statesData.MP.color}
              stroke="#0f172a"
              strokeWidth="2"
              className="cursor-pointer hover:brightness-125 transition-all duration-200"
              onClick={() => setSelectedState(statesData.MP)}
            />
            <text x="270" y="300" fill="#ffffff" fontSize="13" fontWeight="bold" pointerEvents="none">
              MP
            </text>

            {/* Maharashtra */}
            <path
              d="M 180 360 L 320 350 L 310 440 L 170 430 Z"
              fill={statesData.MH.color}
              stroke="#0f172a"
              strokeWidth="2"
              className="cursor-pointer hover:brightness-125 transition-all duration-200"
              onClick={() => setSelectedState(statesData.MH)}
            />
            <text x="235" y="400" fill="#ffffff" fontSize="13" fontWeight="bold" pointerEvents="none">
              MH
            </text>

            {/* Tamil Nadu */}
            <path
              d="M 250 510 L 310 500 L 290 600 L 240 590 Z"
              fill={statesData.TN.color}
              stroke="#0f172a"
              strokeWidth="2"
              className="cursor-pointer hover:brightness-125 transition-all duration-200"
              onClick={() => setSelectedState(statesData.TN)}
            />
            <text x="265" y="555" fill="#ffffff" fontSize="11" fontWeight="bold" pointerEvents="none">
              TN
            </text>
          </svg>

          {/* Quick Guide Overlay */}
          <div className="absolute bottom-3 left-3 bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl text-[10px] text-slate-400 backdrop-blur-md">
            <span>💡 Click on any state polygon (PB, HR, UP, MH, MP, GJ, RJ, TN) for detailed data.</span>
          </div>
        </div>

        {/* State Quick List Side Panel */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Regional Crop Highlights
          </h4>
          <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
            {Object.values(statesData).map((st) => (
              <button
                key={st.id}
                onClick={() => setSelectedState(st)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: st.color }}
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">
                      {st.name}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      NDVI: {st.ndviScore} | Risk: {st.droughtRisk}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* State Detail Intelligence Modal */}
      {selectedState && (
        <Dialog
          isOpen={!!selectedState}
          onClose={() => setSelectedState(null)}
          title={`${selectedState.name} Agricultural Intelligence Report`}
          description="Multispectral satellite greenness analysis and regional pest advisories."
        >
          <div className="space-y-4 text-xs text-slate-300">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-slate-400 text-[11px]">NDVI Greenness Index</div>
                <div className="text-xl font-extrabold text-emerald-400 mt-1">
                  {selectedState.ndviScore} / 1.00
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-slate-400 text-[11px]">Drought Risk Category</div>
                <div className="text-base font-bold text-amber-400 mt-1">
                  {selectedState.droughtRisk} Risk
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="font-bold text-slate-200 flex items-center gap-1.5">
                <Sprout className="w-4 h-4 text-emerald-400" /> Dominant Crops
              </div>
              <p className="text-slate-400">{selectedState.primaryCrops.join(", ")}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="font-bold text-rose-400 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" /> Active Regional Threat Advisory
              </div>
              <p className="text-slate-300 leading-relaxed">{selectedState.pestAlert}</p>
            </div>

            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase font-bold text-emerald-400">
                  Projected State Harvest Output
                </div>
                <div className="text-lg font-black text-slate-100 mt-0.5">
                  {(selectedState.projectedHarvestQuintals / 100000).toFixed(1)} Lakh Quintals
                </div>
              </div>
              <TrendingUp className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
        </Dialog>
      )}
    </Card>
  );
};
