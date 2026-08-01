"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileCheck, CheckCircle2, ShieldCheck, ExternalLink, Sparkles, Filter, ChevronRight } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { useToast } from "@/context/ToastContext";

interface Scheme {
  id: string;
  name: string;
  category: string;
  subsidyAmount: string;
  matchScore: number;
  description: string;
  documents: string[];
  eligibility: string;
  status: "Eligible" | "Action Required" | "Applied";
}

const schemeList: Scheme[] = [
  {
    id: "scheme-1",
    name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    category: "Direct Income Support",
    subsidyAmount: "₹6,000 / Year (3 Installments)",
    matchScore: 98,
    description: "Direct financial support for small and marginal landholder farmer families across India.",
    documents: ["Aadhaar Card", "Landholding Registry Document", "Bank Account Passbook"],
    eligibility: "Landholding farmer families with cultivable land record.",
    status: "Eligible",
  },
  {
    id: "scheme-2",
    name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    category: "Crop Insurance & Loss Coverage",
    subsidyAmount: "Up to 90% Premium Subsidy",
    matchScore: 95,
    description: "Comprehensive yield loss coverage against non-preventable natural risks, drought, and pest attacks.",
    documents: ["Sowing Certificate", "Khasra/Khatauni Land Record", "Bank Account Details"],
    eligibility: "Farmers growing notified crops in notified areas.",
    status: "Eligible",
  },
  {
    id: "scheme-3",
    name: "Sub-Mission on Agricultural Mechanization (SMAM)",
    category: "Equipment & Tractor Subsidy",
    subsidyAmount: "40% - 50% Subsidy on Farm Implements",
    matchScore: 88,
    description: "Financial assistance for purchasing laser land levelers, rotavators, seed drills, and drones.",
    documents: ["Farmer Registration ID", "Aadhaar Card", "Quotation from Authorized Dealer"],
    eligibility: "Individual farmers & Custom Hiring Centers.",
    status: "Action Required",
  },
  {
    id: "scheme-4",
    name: "Per Drop More Crop (Micro Irrigation Scheme)",
    category: "Drip & Sprinkler Irrigation",
    subsidyAmount: "Up to 55% Financial Assistance",
    matchScore: 92,
    description: "Subsidy for installation of drip irrigation systems, sprinklers, and solar water pumps.",
    documents: ["Soil Test Report", "Water Source Certificate", "Land Ownership Paper"],
    eligibility: "Farmers with access to verified water source.",
    status: "Eligible",
  },
];

export const SchemeMatcher: React.FC = () => {
  const { addToast } = useToast();

  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [applicationModalOpen, setApplicationModalOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState("All");

  const handleApply = (scheme: Scheme) => {
    setSelectedScheme(scheme);
    setApplicationModalOpen(true);
  };

  const submitApplication = () => {
    setApplicationModalOpen(false);
    addToast(
      "Application Submitted!",
      `Your subsidy application for "${selectedScheme?.name}" has been forwarded to District Agriculture Office. App Ref: #AG-${Math.floor(100000 + Math.random() * 900000)}`,
      "success"
    );
  };

  const filteredSchemes =
    filterCategory === "All"
      ? schemeList
      : schemeList.filter((s) => s.category.includes(filterCategory));

  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-emerald-400" />
            AI Government Subsidy & Scheme Matching Engine
          </CardTitle>
          <p className="text-xs text-slate-400 mt-1">
            Matches central & state government schemes based on your land holding size, crop type, and region.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="emerald" className="gap-1">
            <Sparkles className="w-3 h-3" /> 4 Matched Schemes
          </Badge>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4">
        {["All", "Income", "Insurance", "Mechanization", "Irrigation"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filterCategory === cat
                ? "bg-brand-600 text-white shadow-md shadow-brand-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
            }`}
          >
            {cat === "All" ? "All Categories" : cat}
          </button>
        ))}
      </div>

      {/* Scheme Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="p-5 rounded-2xl glass-panel bg-slate-950/80 border border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                  {scheme.category}
                </span>
                <Badge variant="emerald" className="text-[11px]">
                  {scheme.matchScore}% Match
                </Badge>
              </div>

              <h4 className="text-sm font-bold text-slate-100 leading-snug">{scheme.name}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{scheme.description}</p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Financial Assistance:</span>
                <span className="font-extrabold text-emerald-400">{scheme.subsidyAmount}</span>
              </div>

              <Button
                variant="gradient"
                size="sm"
                className="w-full"
                onClick={() => handleApply(scheme)}
              >
                <span>Apply / Check Eligibility</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Application Stepper Modal */}
      {selectedScheme && (
        <Dialog
          isOpen={applicationModalOpen}
          onClose={() => setApplicationModalOpen(false)}
          title={`Apply for ${selectedScheme.name}`}
          description="Direct digital application submission to the District Agriculture Portal."
        >
          <div className="space-y-4 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="font-bold text-emerald-400">Financial Subsidy Coverage</div>
              <div className="text-base font-extrabold text-slate-100">
                {selectedScheme.subsidyAmount}
              </div>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-slate-200">Required Documents Checklist</div>
              <div className="space-y-1.5">
                {selectedScheme.documents.map((doc, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60">
              <span className="text-emerald-300 font-medium">
                ✅ Your farm record (Green Valley Fields - 12.5 Acres, Punjab) is pre-verified.
              </span>
            </div>

            <Button variant="gradient" size="md" className="w-full" onClick={submitApplication}>
              <span>Submit Direct Application</span>
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </Dialog>
      )}
    </Card>
  );
};
