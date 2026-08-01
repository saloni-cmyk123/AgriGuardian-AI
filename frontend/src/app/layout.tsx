import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { ToastProvider } from "@/context/ToastContext";
import { FarmProvider } from "@/context/FarmContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "AgriGuardian AI | Predict. Protect. Prosper.",
  description:
    "Enterprise AI agricultural intelligence platform for farmers, agronomists, and government departments. Features digital twins, leaf disease detection, weather radar, mandi price forecasts, and government scheme matchers.",
  keywords: [
    "AgriGuardian AI",
    "Smart Farming",
    "Crop Disease Detection",
    "AgriTwin Digital Twin",
    "Precision Agriculture",
    "APMC Mandi Price Forecast",
    "PM KISAN Scheme Matcher",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 min-h-screen font-sans antialiased selection:bg-emerald-500/30 selection:text-emerald-400">
        <ThemeProvider>
          <ToastProvider>
            <FarmProvider>
              <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col min-w-0">
                  <Header />
                  <main className="flex-1 p-6 md:p-8 bg-slate-950/60 overflow-x-hidden">
                    {children}
                  </main>
                </div>
              </div>
            </FarmProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
