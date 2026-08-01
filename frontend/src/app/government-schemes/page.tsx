"use client";

import React from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { SchemeMatcher } from "@/components/features/SchemeMatcher";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileCheck, ShieldCheck, CheckCircle2, Clock } from "lucide-react";

export default function GovernmentSchemesPage() {
  return (
    <PageWrapper className="space-y-8">
      <div>
        <Badge variant="emerald" className="gap-1">
          <FileCheck className="w-3.5 h-3.5" /> Direct Benefit Transfer (DBT)
        </Badge>
        <h1 className="text-3xl font-extrabold text-slate-100 mt-2">
          Government Schemes & Subsidy Matcher
        </h1>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Profile-matched central and state agricultural schemes including PM-KISAN, PMFBY Crop Insurance, SMAM Farm Equipment, and Drip Irrigation Subsidies.
        </p>
      </div>

      {/* Main Scheme Matcher Component */}
      <SchemeMatcher />

      {/* Application Status Tracker */}
      <Card className="p-6 space-y-4">
        <CardTitle className="text-base font-bold flex items-center gap-2">
          <Clock className="w-5 h-5 text-emerald-400" /> Active Application Tracking Stepper
        </CardTitle>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-200">PM-KISAN 16th Installment (Ref: #AG-882019)</span>
            <Badge variant="emerald">Processing at District Office</Badge>
          </div>

          {/* Stepper Steps */}
          <div className="grid grid-cols-4 gap-2 text-center text-[11px] font-semibold">
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              1. Aadhaar Verified
            </div>
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              2. Land Record Synced
            </div>
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              3. District Approved
            </div>
            <div className="p-2 rounded-lg bg-slate-800 text-slate-400">
              4. Bank Credit Pending
            </div>
          </div>
        </div>
      </Card>
    </PageWrapper>
  );
}
