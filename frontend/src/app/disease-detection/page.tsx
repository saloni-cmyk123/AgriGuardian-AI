"use client";

import React, { useState } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { DiseaseUploader, DiseaseDiagnosisResult } from "@/components/features/DiseaseUploader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Scan, History, Download, Filter, Search, CheckCircle2, ShieldAlert } from "lucide-react";
import { useToast } from "@/context/ToastContext";

interface ScanHistoryRow {
  id: string;
  date: string;
  crop: string;
  disease: string;
  confidence: string;
  status: "High Risk" | "Moderate" | "Low Risk";
  remedy: string;
}

export default function DiseaseDetectionPage() {
  const { addToast } = useToast();

  const [scanHistory, setScanHistory] = useState<ScanHistoryRow[]>([
    { id: "SC-901", date: "Jul 31, 2026", crop: "Wheat (HD-3086)", disease: "Yellow Rust (Puccinia striiformis)", confidence: "96.8%", status: "High Risk", remedy: "Propiconazole 25% EC" },
    { id: "SC-894", date: "Jul 28, 2026", crop: "Hybrid Red Tomato", disease: "Late Blight (Phytophthora)", confidence: "98.2%", status: "High Risk", remedy: "Copper Hydroxide Spray" },
    { id: "SC-881", date: "Jul 22, 2026", crop: "Bt Cotton", disease: "Cotton Leaf Curl Virus", confidence: "94.5%", status: "Moderate", remedy: "Imidacloprid 17.8% SL" },
    { id: "SC-870", date: "Jul 15, 2026", crop: "Paddy (Samba)", disease: "Leaf Spot (Helminthosporium)", confidence: "92.1%", status: "Low Risk", remedy: "Mancozeb 75% WP" },
  ]);

  const handleDiagnosisComplete = (result: DiseaseDiagnosisResult) => {
    const newRow: ScanHistoryRow = {
      id: result.id,
      date: result.createdAt,
      crop: result.cropName,
      disease: result.diseaseName,
      confidence: `${result.confidence}%`,
      status: result.riskLevel === "High" ? "High Risk" : result.riskLevel === "Moderate" ? "Moderate" : "Low Risk",
      remedy: result.chemicalRemedy || result.organicRemedy,
    };

    setScanHistory((prev) => [newRow, ...prev.filter((item) => item.id !== newRow.id)]);
  };

  return (
    <PageWrapper className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Badge variant="emerald" className="gap-1">
            <Scan className="w-3.5 h-3.5" /> Computer Vision XAI
          </Badge>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-100 mt-2">
          AI Leaf Disease Diagnostic Engine
        </h1>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Upload leaf images to classify crop diseases instantly. Provides explainable visual heatmaps, organic treatment solutions, chemical dosages per acre, and preventative guidelines.
        </p>
      </div>

      {/* Main Interactive Uploader & Analyzer */}
      <DiseaseUploader onDiagnosisComplete={handleDiagnosisComplete} />

      {/* Historical Scan Log Table */}
      <Card className="p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <History className="w-5 h-5 text-emerald-400" /> Farm Diagnostic Scan History
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => addToast("Export CSV", "Diagnostic scan history exported to CSV", "success")}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV Log</span>
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Scan ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Crop</TableHead>
              <TableHead>Identified Disease</TableHead>
              <TableHead>Confidence</TableHead>
              <TableHead>Risk Category</TableHead>
              <TableHead>Prescribed Remedy</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scanHistory.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-mono text-emerald-400 font-bold">{row.id}</TableCell>
                <TableCell className="text-slate-400">{row.date}</TableCell>
                <TableCell className="font-semibold text-slate-200">{row.crop}</TableCell>
                <TableCell className="font-bold text-slate-100">{row.disease}</TableCell>
                <TableCell className="font-mono text-teal-400">{row.confidence}</TableCell>
                <TableCell>
                  <Badge variant={row.status === "High Risk" ? "danger" : row.status === "Moderate" ? "warning" : "success"}>
                    {row.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-slate-300">{row.remedy}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </PageWrapper>
  );
}
