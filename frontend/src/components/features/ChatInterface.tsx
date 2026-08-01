"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, Mic, Paperclip, Sparkles, User, FileText, CheckCircle2, AlertTriangle } from "lucide-react";
import { useToast } from "@/context/ToastContext";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  badge?: string;
}

export const ChatInterface: React.FC = () => {
  const { addToast } = useToast();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m-1",
      sender: "bot",
      text: "Namaste! I am AgriGuardian AI Agronomist. Ask me any question about leaf diseases, PM-KISAN schemes, soil NPK ratios, or APMC mandi price trends in English, Hindi, or Punjabi.",
      timestamp: "10:00 AM",
      badge: "AI Agronomist v2.4",
    },
    {
      id: "m-2",
      sender: "user",
      text: "What is the recommended pesticide dosage for Wheat Yellow Rust at flowering stage in 5 acres?",
      timestamp: "10:02 AM",
    },
    {
      id: "m-3",
      sender: "bot",
      text: "For 5 acres of Wheat facing Puccinia striiformis (Yellow Rust) during flowering:\n\n1. Chemical Treatment: Spray Propiconazole 25% EC @ 200 ml/acre diluted in 200 Liters of water (Total: 1.0 Liter Propiconazole in 1,000L water).\n2. Organic Alternative: Neem Oil extract (5 ml/L water) + Trichoderma viride bio-fungicide.\n3. Safety Protocol: Spray during early morning (06:00-09:00 AM) when wind velocity is <10 km/h to prevent spray drift.",
      timestamp: "10:02 AM",
      badge: "Verified Agronomy Advisory",
    },
  ]);

  const [inputQuery, setInputQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const promptChips = [
    "Wheat Rust spray dosage for 5 acres",
    "How to apply for PM-KISAN subsidy?",
    "NPK ratio for Paddy (Samba Mahsuri)",
    "Tomato Late Blight organic remedy",
  ];

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery("");

    // Simulate AI response
    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: "bot",
        text: `Analysis for "${query}":\n\nBased on your active profile (Green Valley Fields - Clay Loam soil, 12.5 Acres), here is the AI Agronomist recommended workflow:\n\n• Maintain field soil moisture between 65-75%.\n• Apply recommended micronutrient booster (Zinc Sulphate 33% @ 5kg/acre).\n• Monitor Sentinel-2 NDVI satellite greenness score daily.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        badge: "AI Response",
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <Card className="p-6 flex flex-col h-[650px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/25">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              Multilingual AI Agronomist Assistant
            </h3>
            <p className="text-xs text-slate-400">
              Powered by fine-tuned agricultural LLM & ICAR Crop Guidelines
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 rounded-xl px-3 py-1.5 focus:outline-none"
          >
            <option value="English">English</option>
            <option value="Hindi">हिन्दी (Hindi)</option>
            <option value="Punjabi">ਪੰਜਾਬੀ (Punjabi)</option>
          </select>
          <Badge variant="emerald" className="gap-1">
            <Sparkles className="w-3 h-3" /> Online
          </Badge>
        </div>
      </div>

      {/* Chat Messages Feed */}
      <div className="flex-1 overflow-y-auto my-4 space-y-4 pr-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.sender === "bot" && (
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-1 border border-emerald-500/30">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-xl rounded-2xl p-4 text-xs leading-relaxed space-y-2 ${
                msg.sender === "user"
                  ? "bg-brand-600 text-white shadow-lg shadow-brand-600/20 rounded-tr-none"
                  : "glass-panel bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none"
              }`}
            >
              {msg.badge && (
                <div className="flex items-center justify-between gap-2 pb-1 border-b border-slate-800 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                  <span>{msg.badge}</span>
                  <span className="text-slate-500 font-normal">{msg.timestamp}</span>
                </div>
              )}
              <div className="whitespace-pre-line">{msg.text}</div>
            </div>

            {msg.sender === "user" && (
              <div className="w-8 h-8 rounded-xl bg-slate-800 text-slate-200 flex items-center justify-center shrink-0 mt-1">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Suggested Prompt Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-2">
        {promptChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(chip)}
            className="px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 hover:border-emerald-500/50 text-[11px] text-slate-300 font-medium whitespace-nowrap transition-colors"
          >
            💡 {chip}
          </button>
        ))}
      </div>

      {/* Input Controls */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex items-center gap-2 pt-2 border-t border-slate-800"
      >
        <button
          type="button"
          onClick={() => addToast("Voice Input", "Listening for voice command in Hindi/English...", "info")}
          className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-emerald-400 transition-colors"
          title="Voice Search"
        >
          <Mic className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => addToast("Attach Leaf Photo", "File selector opened", "info")}
          className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-teal-400 transition-colors"
          title="Attach Photo"
        >
          <Paperclip className="w-4 h-4" />
        </button>

        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Type your agricultural question here..."
          className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50"
        />

        <Button variant="gradient" size="sm" type="submit">
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </Button>
      </form>
    </Card>
  );
};
