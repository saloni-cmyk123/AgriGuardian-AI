"use client";

import React from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { MarketChart } from "@/components/features/MarketChart";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, MapPin, Sparkles, CheckCircle2 } from "lucide-react";

export default function MarketIntelligencePage() {
  return (
    <PageWrapper className="space-y-8">
      <div>
        <Badge variant="emerald" className="gap-1">
          <TrendingUp className="w-3.5 h-3.5" /> APMC AGMARKNET Live Feed
        </Badge>
        <h1 className="text-3xl font-extrabold text-slate-100 mt-2">
          APMC Mandi Market Intelligence & AI Price Forecasting
        </h1>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Real-time commodity price tracking across Indian mandis combined with 14-day transformer price predictions to maximize net profit.
        </p>
      </div>

      {/* Main Market Chart Component */}
      <MarketChart />

      {/* AI Sell Timing Advisory */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-3">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" /> AI Optimal Harvest Sell Signal
          </CardTitle>
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/50 space-y-2">
            <div className="text-xs font-bold text-emerald-300">Recommended Harvest Sale: Aug 08 - Aug 12</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Wheat prices are projected to peak at ₹2,610/Quintal in Khanna APMC due to lower northern market arrivals. Delaying harvest sales by 7 days yields an extra +₹160/Quintal.
            </p>
          </div>
        </Card>

        <Card className="p-6 space-y-3">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <MapPin className="w-5 h-5 text-teal-400" /> Top Regional Payout Mandi
          </CardTitle>
          <div className="p-4 rounded-xl bg-teal-950/30 border border-teal-800/50 space-y-2">
            <div className="text-xs font-bold text-teal-300">Jalandhar Grain Market (58 km away)</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Current Rate: ₹2,490/Qtl. Net transport cost is ₹40/Qtl, resulting in a net profit gain of +₹140/Qtl compared to local gate buyers.
            </p>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
}
