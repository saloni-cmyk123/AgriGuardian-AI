"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { TrendingUp, TrendingDown, MapPin, Sparkles, DollarSign, ArrowUpRight } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const chartDataMap: Record<string, { date: string; historical?: number; forecast?: number }[]> = {
  Wheat: [
    { date: "Jul 20", historical: 2280 },
    { date: "Jul 22", historical: 2310 },
    { date: "Jul 24", historical: 2340 },
    { date: "Jul 26", historical: 2320 },
    { date: "Jul 28", historical: 2380 },
    { date: "Jul 30", historical: 2410 },
    { date: "Aug 01", historical: 2450, forecast: 2450 },
    { date: "Aug 03", forecast: 2490 },
    { date: "Aug 05", forecast: 2530 },
    { date: "Aug 07", forecast: 2560 },
    { date: "Aug 10", forecast: 2610 },
  ],
  Paddy: [
    { date: "Jul 20", historical: 2150 },
    { date: "Jul 22", historical: 2180 },
    { date: "Jul 24", historical: 2200 },
    { date: "Jul 26", historical: 2240 },
    { date: "Jul 28", historical: 2290 },
    { date: "Jul 30", historical: 2330 },
    { date: "Aug 01", historical: 2360, forecast: 2360 },
    { date: "Aug 03", forecast: 2400 },
    { date: "Aug 05", forecast: 2450 },
    { date: "Aug 07", forecast: 2480 },
    { date: "Aug 10", forecast: 2520 },
  ],
  Tomato: [
    { date: "Jul 20", historical: 1800 },
    { date: "Jul 22", historical: 2100 },
    { date: "Jul 24", historical: 2450 },
    { date: "Jul 26", historical: 2900 },
    { date: "Jul 28", historical: 3400 },
    { date: "Jul 30", historical: 3850 },
    { date: "Aug 01", historical: 4200, forecast: 4200 },
    { date: "Aug 03", forecast: 4500 },
    { date: "Aug 05", forecast: 4800 },
    { date: "Aug 07", forecast: 4600 },
    { date: "Aug 10", forecast: 4300 },
  ],
};

const nearbyMandis = [
  { mandi: "Khanna APMC Market", state: "Punjab", distance: "24 km", price: "₹2,480/Qtl", netDelta: "+₹130", recommendation: "Optimal Market" },
  { mandi: "Ludhiana Central APMC", state: "Punjab", distance: "8 km", price: "₹2,450/Qtl", netDelta: "+₹100", recommendation: "Nearest Market" },
  { mandi: "Jalandhar Grain Market", state: "Punjab", distance: "58 km", price: "₹2,490/Qtl", netDelta: "+₹140", recommendation: "High Volume" },
  { mandi: "Azadpur APMC", state: "Delhi", distance: "280 km", price: "₹2,620/Qtl", netDelta: "+₹270", recommendation: "Interstate Transit" },
];

export const MarketChart: React.FC = () => {
  const [selectedCommodity, setSelectedCommodity] = useState<string>("Wheat");

  const data = chartDataMap[selectedCommodity] || chartDataMap.Wheat;

  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            APMC Mandi Commodity Price Tracker & AI 14-Day Forecast
          </CardTitle>
          <p className="text-xs text-slate-400 mt-1">
            Real-time APMC price curves integrated with time-series Transformer models.
          </p>
        </div>

        <div className="w-48">
          <Select
            value={selectedCommodity}
            onChange={(e) => setSelectedCommodity(e.target.value)}
            options={[
              { value: "Wheat", label: "Wheat (Gehun)" },
              { value: "Paddy", label: "Paddy (Dhan)" },
              { value: "Tomato", label: "Hybrid Tomato" },
            ]}
          />
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-72 w-full mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="histGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="foreGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="date" stroke="#64748b" fontSize={11} />
            <YAxis stroke="#64748b" fontSize={11} domain={["auto", "auto"]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderColor: "#334155",
                borderRadius: "12px",
                color: "#f8fafc",
                fontSize: "12px",
              }}
            />
            <Area
              type="monotone"
              dataKey="historical"
              stroke="#10b981"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#histGrad)"
              name="Historical Price (₹/Qtl)"
            />
            <Area
              type="monotone"
              dataKey="forecast"
              stroke="#14b8a6"
              strokeWidth={3}
              strokeDasharray="4 4"
              fillOpacity={1}
              fill="url(#foreGrad)"
              name="14-Day AI Forecast"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Nearby Mandi Arbitrage Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-emerald-400" /> Mandi Arbitrage & Price Matrix
          </h4>
          <span className="text-[11px] text-slate-400">Updated 15 mins ago from AGMARKNET</span>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>APMC Mandi Market</TableHead>
              <TableHead>Distance</TableHead>
              <TableHead>Price / Quintal</TableHead>
              <TableHead>Net Profit Delta</TableHead>
              <TableHead>AI Recommendation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {nearbyMandis.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-bold text-slate-200">{row.mandi}</TableCell>
                <TableCell className="text-slate-400">{row.distance}</TableCell>
                <TableCell className="font-extrabold text-emerald-400">{row.price}</TableCell>
                <TableCell className="text-emerald-400 font-semibold">{row.netDelta}</TableCell>
                <TableCell>
                  <Badge variant={idx === 0 ? "emerald" : "neutral"} className="text-[10px]">
                    {row.recommendation}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
