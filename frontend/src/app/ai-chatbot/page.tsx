"use client";

import React from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { ChatInterface } from "@/components/features/ChatInterface";
import { Badge } from "@/components/ui/badge";
import { Bot } from "lucide-react";

export default function AIChatbotPage() {
  return (
    <PageWrapper className="space-y-8">
      <div>
        <Badge variant="emerald" className="gap-1">
          <Bot className="w-3.5 h-3.5" /> Fine-Tuned Agronomy LLM
        </Badge>
        <h1 className="text-3xl font-extrabold text-slate-100 mt-2">
          Multilingual AI Agronomist Assistant
        </h1>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Ask questions in English, Hindi, or Punjabi about crop diseases, NPK dosage ratios, PM-KISAN scheme eligibility, or APMC mandi price trends.
        </p>
      </div>

      {/* Main Chat Interface */}
      <ChatInterface />
    </PageWrapper>
  );
}
