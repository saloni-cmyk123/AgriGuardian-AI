"use client";

import React, { useState } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Settings, Bell, Moon, Sun, Globe, ShieldCheck, Database, Save } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useToast } from "@/context/ToastContext";

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const { addToast } = useToast();

  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [language, setLanguage] = useState("en");

  const handleSaveSettings = () => {
    addToast("Settings Saved", "System preferences updated successfully!", "success");
  };

  return (
    <PageWrapper className="space-y-8">
      <div>
        <Badge variant="emerald" className="gap-1">
          <Settings className="w-3.5 h-3.5" /> Platform Configurations
        </Badge>
        <h1 className="text-3xl font-extrabold text-slate-100 mt-2">
          System & Notification Settings
        </h1>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Customize theme preferences, crop threat alert delivery channels, language localization, and backend API connections.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Appearance & Theme Settings */}
        <Card className="p-6 space-y-4">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <Moon className="w-5 h-5 text-teal-400" /> Appearance & Theme Mode
          </CardTitle>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-200">Active Theme Mode</div>
              <div className="text-[11px] text-slate-400">Currently using {theme.toUpperCase()} theme</div>
            </div>
            <Button variant="outline" size="sm" onClick={toggleTheme}>
              {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-400" />}
              <span>Toggle {theme === "dark" ? "Light" : "Dark"}</span>
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300">Primary Platform Language</label>
            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              options={[
                { value: "en", label: "English (US / India)" },
                { value: "hi", label: "हिन्दी (Hindi)" },
                { value: "pa", label: "ਪੰਜਾਬੀ (Punjabi)" },
              ]}
            />
          </div>
        </Card>

        {/* Threat Notification Alert Channels */}
        <Card className="p-6 space-y-4">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <Bell className="w-5 h-5 text-emerald-400" /> Real-Time Alert Notification Channels
          </CardTitle>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div>
                <div className="text-xs font-semibold text-slate-200">WhatsApp Threat Bulletins</div>
                <div className="text-[10px] text-slate-400">Instant disease & severe weather advisories on mobile</div>
              </div>
              <Switch checked={whatsappAlerts} onCheckedChange={setWhatsappAlerts} />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div>
                <div className="text-xs font-semibold text-slate-200">SMS Mandi Rate Surge Alerts</div>
                <div className="text-[10px] text-slate-400">Daily APMC mandi price direction SMS</div>
              </div>
              <Switch checked={smsAlerts} onCheckedChange={setSmsAlerts} />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div>
                <div className="text-xs font-semibold text-slate-200">In-App Push Notifications</div>
                <div className="text-[10px] text-slate-400">Browser alerts for automated irrigation events</div>
              </div>
              <Switch checked={pushAlerts} onCheckedChange={setPushAlerts} />
            </div>
          </div>
        </Card>
      </div>

      {/* Backend API Connection Status Panel */}
      <Card className="p-6 space-y-4">
        <CardTitle className="text-base font-bold flex items-center gap-2">
          <Database className="w-5 h-5 text-emerald-400" /> FastAPI Backend Service Status
        </CardTitle>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div>
            <div className="font-bold text-slate-200">FastAPI REST & MongoDB Async Service</div>
            <div className="text-slate-400 font-mono mt-0.5">Endpoint: http://localhost:8000/api/v1</div>
          </div>
          <Badge variant="emerald" className="gap-1 self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Connected (Latency: 14ms)
          </Badge>
        </div>

        <div className="flex justify-end pt-2">
          <Button variant="gradient" size="md" onClick={handleSaveSettings}>
            <Save className="w-4 h-4" />
            <span>Save Preference Settings</span>
          </Button>
        </div>
      </Card>
    </PageWrapper>
  );
}
