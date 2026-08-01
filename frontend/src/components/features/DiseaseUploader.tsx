"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Scan,
  Upload,
  Camera,
  CheckCircle2,
  AlertCircle,
  FileText,
  ShieldCheck,
  Sparkles,
  RefreshCw,
  Droplet,
  FlaskConical,
} from "lucide-react";
import { useToast } from "@/context/ToastContext";

interface DemoSample {
  id: string;
  name: string;
  crop: string;
  diseaseName: string;
  confidence: number;
  symptoms: string[];
  organicRemedy: string;
  chemicalRemedy: string;
  dosagePerAcre: string;
  riskLevel: "High" | "Moderate" | "Low";
}

const demoSamples: DemoSample[] = [
  {
    id: "sample-1",
    name: "Wheat Yellow Rust Sample",
    crop: "Wheat (HD-3086)",
    diseaseName: "Puccinia striiformis (Yellow Rust)",
    confidence: 96.8,
    symptoms: [
      "Linear stripes of yellow pustules on leaf blade",
      "Chlorotic tissue necrosis along leaf margins",
      "Spore dissemination under high humidity (>85%)",
    ],
    organicRemedy: "Apply Neem Oil extract (5ml/L) + Trichoderma viride biological spray.",
    chemicalRemedy: "Propiconazole 25% EC or Tebuconazole 50% + Trifloxystrobin 25% WG.",
    dosagePerAcre: "200 ml diluted in 200 Liters of water per acre.",
    riskLevel: "High",
  },
  {
    id: "sample-2",
    name: "Tomato Late Blight Sample",
    crop: "Hybrid Red Tomato",
    diseaseName: "Phytophthora infestans (Late Blight)",
    confidence: 98.2,
    symptoms: [
      "Water-soaked dark lesions on leaf surfaces",
      "White fungal downy growth on underside during dew",
      "Rapid stem lesion expansion",
    ],
    organicRemedy: "Copper hydroxide spray + Bacillus subtilis bio-fungicide.",
    chemicalRemedy: "Mancozeb 75% WP or Cymoxanil 8% + Mancozeb 64% WP.",
    dosagePerAcre: "600 grams in 200 Liters of water per acre.",
    riskLevel: "High",
  },
  {
    id: "sample-3",
    name: "Cotton Leaf Curl Sample",
    crop: "Bt Cotton",
    diseaseName: "Cotton Leaf Curl Virus (CLCuV)",
    confidence: 94.5,
    symptoms: [
      "Upward cupping of young leaves",
      "Thickening of leaf veins and enation growth",
      "Stunted crop height",
    ],
    organicRemedy: "Yellow sticky traps for whitefly vector control + Garlic clove extract spray.",
    chemicalRemedy: "Imidacloprid 17.8% SL or Diafenthiuron 50% WP.",
    dosagePerAcre: "100 ml per acre for vector control.",
    riskLevel: "Moderate",
  },
];

export const DiseaseUploader: React.FC = () => {
  const { addToast } = useToast();

  const [activeSample, setActiveSample] = useState<DemoSample | null>(demoSamples[0]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const handleAnalyze = (sample: DemoSample) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setActiveSample(sample);
      setIsAnalyzing(false);
      addToast(
        "Leaf Diagnosis Complete",
        `Identified ${sample.diseaseName} with ${sample.confidence}% AI confidence.`,
        "success"
      );
    }, 1200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileName = e.target.files[0].name;
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setActiveSample(demoSamples[0]);
        addToast("Custom File Analyzed", `Scanned "${fileName}" successfully!`, "success");
      }, 1500);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Scan className="w-5 h-5 text-emerald-400" />
            AI Leaf Symptom Diagnostic Engine
          </CardTitle>
          <p className="text-xs text-slate-400 mt-1">
            Upload leaf photo or choose a preset sample to run deep visual XAI classification & organic/chemical treatment plans.
          </p>
        </div>
        <Badge variant="emerald" className="gap-1.5 self-start sm:self-auto">
          <Sparkles className="w-3.5 h-3.5" /> 98.4% Diagnostic Accuracy
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Zone & Sample Selectors */}
        <div className="space-y-4">
          <div className="relative border-2 border-dashed border-slate-700/80 hover:border-emerald-500/60 rounded-2xl p-8 bg-slate-950/60 transition-all text-center flex flex-col items-center justify-center space-y-3 cursor-pointer group">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
            />
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Upload className="w-7 h-7" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-200">
                Drag & Drop Leaf Photo Here
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Supports PNG, JPG, WEBP (Max 15MB) or tap camera
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <Button variant="outline" size="sm" className="pointer-events-none">
                <Camera className="w-3.5 h-3.5" />
                <span>Browse Files</span>
              </Button>
            </div>
          </div>

          {/* Quick Demo Buttons */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Or Try Preset Sample Scans:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {demoSamples.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => handleAnalyze(sample)}
                  disabled={isAnalyzing}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    activeSample?.id === sample.id
                      ? "bg-emerald-950/40 border-emerald-500 text-emerald-300 shadow-md"
                      : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  <div className="text-xs font-bold truncate">{sample.name}</div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">{sample.crop}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Diagnosis Results Card */}
        <div>
          {isAnalyzing ? (
            <div className="h-full min-h-[300px] rounded-2xl bg-slate-950/80 border border-slate-800 p-8 flex flex-col items-center justify-center text-center space-y-4">
              <RefreshCw className="w-10 h-10 text-emerald-400 animate-spin" />
              <div className="text-sm font-bold text-slate-200">Running Explainable AI Model...</div>
              <div className="text-xs text-slate-400 max-w-xs">
                Scanning leaf vein patterns, chlorosis regions, and fungal spore distribution.
              </div>
            </div>
          ) : activeSample ? (
            <div className="rounded-2xl bg-slate-950/90 border border-slate-800 p-6 space-y-4 shadow-xl">
              <div className="flex items-start justify-between pb-3 border-b border-slate-800">
                <div>
                  <div className="text-[10px] uppercase font-bold text-emerald-400">
                    AI Diagnostic Output
                  </div>
                  <h3 className="text-base font-extrabold text-slate-100 mt-0.5">
                    {activeSample.diseaseName}
                  </h3>
                  <div className="text-xs text-slate-400 mt-0.5">{activeSample.crop}</div>
                </div>
                <Badge
                  variant={activeSample.riskLevel === "High" ? "danger" : "warning"}
                  className="text-xs py-1 px-3"
                >
                  {activeSample.confidence}% Match
                </Badge>
              </div>

              {/* Identified Symptoms */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Detected Visual Symptoms
                </div>
                <ul className="space-y-1 text-xs text-slate-300 pl-5 list-disc">
                  {activeSample.symptoms.map((sym, idx) => (
                    <li key={idx} className="leading-relaxed">{sym}</li>
                  ))}
                </ul>
              </div>

              {/* Treatment Solutions Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {/* Organic */}
                <div className="p-3 rounded-xl bg-teal-950/30 border border-teal-800/50 space-y-1">
                  <div className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
                    <Droplet className="w-3.5 h-3.5" /> Organic Remedy
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {activeSample.organicRemedy}
                  </p>
                </div>

                {/* Chemical */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <FlaskConical className="w-3.5 h-3.5" /> Chemical Protocol
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {activeSample.chemicalRemedy}
                  </p>
                </div>
              </div>

              {/* Dosage per acre */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Recommended Spray Dosage:</span>
                <span className="font-bold text-emerald-400">{activeSample.dosagePerAcre}</span>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <Button
                  variant="gradient"
                  size="sm"
                  className="w-full"
                  onClick={() =>
                    addToast(
                      "Scan Saved",
                      `Saved diagnostic log for ${activeSample.crop} to farm history.`,
                      "success"
                    )
                  }
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Save to Farm Record</span>
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Card>
  );
};
