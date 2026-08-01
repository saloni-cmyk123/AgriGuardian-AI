"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CloudSun, Wind, Droplets, Sun, AlertTriangle, CheckCircle2, ShieldAlert } from "lucide-react";

export const WeatherRadarCard: React.FC = () => {
  const forecast7Days = [
    { day: "Today", temp: "31°C / 22°C", condition: "Partly Cloudy", humidity: "84%", rain: "20%", icon: CloudSun },
    { day: "Tomorrow", temp: "33°C / 23°C", condition: "Sunny / Clear", humidity: "65%", rain: "5%", icon: Sun },
    { day: "Aug 03", temp: "29°C / 21°C", condition: "Thunderstorm Alert", humidity: "92%", rain: "85%", icon: CloudSun },
    { day: "Aug 04", temp: "30°C / 22°C", condition: "Light Showers", humidity: "78%", rain: "45%", icon: CloudSun },
    { day: "Aug 05", temp: "32°C / 24°C", condition: "Mostly Sunny", humidity: "60%", rain: "10%", icon: Sun },
    { day: "Aug 06", temp: "34°C / 25°C", condition: "Clear Sky", humidity: "55%", rain: "0%", icon: Sun },
    { day: "Aug 07", temp: "31°C / 23°C", condition: "Humid Breeze", humidity: "75%", rain: "15%", icon: CloudSun },
  ];

  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <CloudSun className="w-5 h-5 text-sky-400" />
            Hyper-Local Agri-Meteorological Radar
          </CardTitle>
          <p className="text-xs text-slate-400 mt-1">
            Micro-climate telemetry for Ludhiana Field Sector 2 (Lat: 30.9010° N, Lon: 75.8573° E)
          </p>
        </div>
        <Badge variant="success" className="gap-1.5 self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" /> Radar Active
        </Badge>
      </div>

      {/* Current Conditions Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Sun className="w-3.5 h-3.5 text-amber-400" /> Air Temperature
          </div>
          <div className="text-2xl font-black text-slate-100 mt-2">31.4 °C</div>
          <div className="text-[10px] text-emerald-400 mt-1">Optimal growth band</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Droplets className="w-3.5 h-3.5 text-sky-400" /> Relative Humidity
          </div>
          <div className="text-2xl font-black text-sky-400 mt-2">84 %</div>
          <div className="text-[10px] text-amber-400 mt-1">High fungal rust risk</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Wind className="w-3.5 h-3.5 text-teal-400" /> Wind Velocity
          </div>
          <div className="text-2xl font-black text-slate-100 mt-2">12 km/h</div>
          <div className="text-[10px] text-slate-400 mt-1">Direction: NW (310°)</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <CloudSun className="w-3.5 h-3.5 text-emerald-400" /> Evapotranspiration ($ET_0$)
          </div>
          <div className="text-2xl font-black text-emerald-400 mt-2">4.2 mm/day</div>
          <div className="text-[10px] text-emerald-400 mt-1">Moderate soil decay</div>
        </div>
      </div>

      {/* Severe Weather Warning Banner */}
      <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-800/60 flex items-start gap-3 mb-6">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-bold text-amber-300">Heavy Rainfall & Squall Warning (Aug 03)</h4>
          <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
            Multispectral radar forecasts 45mm rainfall in 6 hours starting Aug 03 04:00 AM. Pause nitrogen top-dressing and ensure field drainage channels are cleared.
          </p>
        </div>
      </div>

      {/* 7-Day Forecast Grid */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
          7-Day Micro-Climate Forecast
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {forecast7Days.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center text-center space-y-1 hover:border-emerald-500/50 transition-colors"
              >
                <div className="text-[11px] font-bold text-slate-300">{item.day}</div>
                <IconComponent className="w-6 h-6 text-sky-400 my-1" />
                <div className="text-xs font-extrabold text-slate-100">{item.temp}</div>
                <div className="text-[10px] text-slate-400">{item.condition}</div>
                <div className="text-[10px] font-semibold text-emerald-400">Rain: {item.rain}</div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
