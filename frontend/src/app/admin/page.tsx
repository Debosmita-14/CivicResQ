"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Map, Siren, CheckCircle2, TrendingUp, AlertTriangle, ShieldCheck, Database, BrainCircuit, Users } from "lucide-react";

export default function DeepAdminDashboard() {
  const [activeTab, setActiveTab] = useState("alerts");

  return (
    <div className="flex h-screen w-full bg-[#09090b] text-zinc-100 overflow-hidden font-sans">
      
      {/* Sidebar Navigation */}
      <motion.aside 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-20 md:w-64 glass-panel border-r border-zinc-800 flex flex-col z-20"
      >
        <div className="p-4 md:p-6 flex justify-center md:justify-start items-center gap-3 border-b border-zinc-800">
          <div className="bg-rose-600 p-2 rounded-xl">
            <Activity size={24} className="text-white" />
          </div>
          <div className="hidden md:block">
            <h1 className="text-lg font-bold tracking-tight text-white leading-none">CivicResQ</h1>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 mt-1 font-bold">State Command</p>
          </div>
        </div>

        <nav className="flex-1 p-3 md:p-4 flex flex-col gap-2">
          <NavItem icon={<Map size={20} />} label="Live Radar" active={activeTab === "map"} onClick={() => setActiveTab("map")} />
          <NavItem icon={<AlertTriangle size={20} />} label="Severity Matrix" active={activeTab === "alerts"} onClick={() => setActiveTab("alerts")} />
          <NavItem icon={<ShieldCheck size={20} />} label="Fraud & Identity" active={activeTab === "fraud"} onClick={() => setActiveTab("fraud")} />
          <NavItem icon={<Database size={20} />} label="Resource DB" active={activeTab === "db"} onClick={() => setActiveTab("db")} />
        </nav>
      </motion.aside>

      {/* Main Complex View */}
      <main className="flex-1 relative flex flex-col z-10 overflow-hidden">
        
        {/* Top Header - Massive Stat bar */}
        <header className="h-16 glass-panel border-b border-zinc-800 flex items-center justify-between px-6 z-20 shrink-0">
          <div className="flex gap-8">
            <div className="hidden md:flex flex-col">
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Active Incidents</span>
              <span className="font-bold text-lg text-rose-500 animate-pulse">24</span>
            </div>
            <div className="hidden md:flex flex-col border-l border-zinc-800 pl-8">
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Avg Response Code</span>
              <span className="font-bold text-lg text-white">4m 12s <TrendingUp size={14} className="inline text-emerald-500"/></span>
            </div>
          </div>
          <h2 className="font-black text-xs text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full uppercase tracking-widest hidden md:block">
            Emergency Triage Protocol: ACTIVE
          </h2>
        </header>

        {/* Content Modules */}
        <div className="flex-1 p-4 md:p-6 overflow-hidden flex flex-col md:flex-row gap-4">
          
          <div className="flex-1 flex gap-4 overflow-hidden w-full h-full">
            {activeTab === "alerts" && (
              <>
                <div className="flex-1 flex flex-col gap-4 overflow-hidden">
                  {/* Emergency Alert Severity Flow */}
                  <div className="h-2/3 glass-panel rounded-[2rem] border border-zinc-800 flex flex-col p-6">
                    <h3 className="font-bold text-white mb-6 flex items-center gap-2 text-lg">
                      <AlertTriangle size={22} className="text-amber-400"/> Triaged Emergency Flow
                    </h3>
                    <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4">
                      {/* LOW */}
                      <div className="flex flex-col bg-zinc-900/40 rounded-2xl border border-zinc-800 p-4">
                        <div className="flex justify-between items-center mb-4 border-b border-zinc-800 pb-3">
                          <span className="font-bold text-blue-400">LOW PRIORITY</span>
                          <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded text-xs font-bold">12 Alerts</span>
                        </div>
                        <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar">
                          <div className="p-3 bg-zinc-950 rounded-xl border border-blue-900/30 shadow">
                            <p className="text-white font-semibold text-sm">Minor Collision</p>
                            <p className="text-zinc-500 text-xs mt-1">Sector 4 • No injuries</p>
                          </div>
                        </div>
                      </div>
                      {/* MEDIUM */}
                      <div className="flex flex-col bg-zinc-900/40 rounded-2xl border border-zinc-800 p-4">
                        <div className="flex justify-between items-center mb-4 border-b border-zinc-800 pb-3">
                          <span className="font-bold text-amber-400">MEDIUM PRIORITY</span>
                          <span className="bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded text-xs font-bold">5 Alerts</span>
                        </div>
                        <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar">
                          <div className="p-3 bg-zinc-950 rounded-xl border border-amber-900/30 shadow">
                            <p className="text-white font-semibold text-sm">Residential Fire Alarm</p>
                            <p className="text-zinc-500 text-xs mt-1">AURA Tower • Investigating</p>
                          </div>
                        </div>
                      </div>
                      {/* CRITICAL */}
                      <div className="flex flex-col bg-rose-950/20 rounded-2xl border border-rose-900/50 p-4 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-rose-500 animate-pulse"></div>
                        <div className="flex justify-between items-center mb-4 border-b border-rose-900/50 pb-3">
                          <span className="font-bold text-rose-500 flex items-center gap-1"><Siren size={16}/> CRITICAL</span>
                          <span className="bg-rose-500 text-white px-2 py-0.5 rounded text-xs font-bold shadow-[0_0_10px_rgba(225,29,72,0.5)]">3 Alerts</span>
                        </div>
                        <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar">
                          <div className="p-3 bg-rose-900/20 rounded-xl border border-rose-500/40 shadow shadow-rose-900/20">
                            <p className="text-white font-bold text-sm">Highway Mass Collision</p>
                            <p className="text-rose-400 text-xs mt-1">Multiple casualties • Dispatching ALS</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Live Logs / Heatmap preview */}
                  <div className="h-1/3 flex gap-4">
                    <div className="flex-1 glass-panel rounded-[2rem] border border-zinc-800 p-6 flex flex-col">
                        <h3 className="font-bold text-white mb-4 flex items-center gap-2"><Map size={18}/> Density Heatmap</h3>
                        <div className="flex-1 bg-[url('https://transparenttextures.com/patterns/black-mamba.png')] bg-zinc-900 rounded-xl relative border border-zinc-800 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/20 via-transparent to-purple-500/10 blur-xl"></div>
                        </div>
                    </div>
                    {/* Event Stream */}
                    <div className="flex-1 glass-panel rounded-[2rem] border border-zinc-800 p-5 overflow-y-auto">
                        <h3 className="font-bold text-white mb-4 text-sm flex items-center gap-2"><Activity size={16}/> System Stream</h3>
                        <div className="space-y-3 font-mono text-xs">
                          <p className="text-zinc-400"><span className="text-rose-400">[17:28:01]</span> <span className="text-white">ALERT</span> Incident created.</p>
                          <p className="text-zinc-400"><span className="text-emerald-400">[17:28:44]</span> <span className="text-white">STATUS</span> ALS-9 en route.</p>
                        </div>
                    </div>
                  </div>
                </div>
                {/* Right column - Fraud */}
                <div className="w-full md:w-80 glass-panel rounded-[2rem] border border-zinc-800 flex flex-col p-5">
                  <h3 className="font-bold text-white mb-4 flex items-center gap-2 text-sm"><ShieldCheck size={18} className="text-amber-500"/> Trust & Identify</h3>
                  <div className="bg-zinc-900/50 p-4 rounded-xl border border-amber-900/30 mb-6">
                    <p className="text-zinc-400 text-xs mb-3">AI evaluates caller audio patterns to assign a Trust Score.</p>
                  </div>
                  <h3 className="font-bold text-white mb-4 text-sm mt-auto">Manual Override</h3>
                  <button className="w-full bg-rose-900/30 text-rose-500 p-3 rounded-lg font-bold text-xs uppercase shadow">Force Re-route</button>
                </div>
              </>
            )}

            {activeTab === "map" && (
              <div className="flex-1 glass-panel rounded-[2rem] border border-zinc-800 p-6 flex flex-col items-center justify-center">
                <Map size={64} className="text-zinc-700 mb-4" />
                <h3 className="text-2xl font-bold text-white">Full Screen Live Map</h3>
                <p className="text-zinc-500 mt-2">Connecting to Google Maps API backend...</p>
              </div>
            )}

            {activeTab === "fraud" && (
              <div className="flex-1 glass-panel rounded-[2rem] border border-amber-900/50 p-6 flex flex-col">
                <h3 className="text-2xl font-bold text-amber-500 mb-4 flex items-center gap-2"><ShieldCheck size={24}/> Fraud Detection Radar</h3>
                <div className="flex-1 bg-zinc-900/50 rounded-xl border border-zinc-800 p-4 font-mono text-sm text-zinc-400">
                  Initializing telecom blacklist sync...
                </div>
              </div>
            )}

            {activeTab === "db" && (
              <div className="flex-1 glass-panel rounded-[2rem] border border-blue-900/50 p-6 flex flex-col">
                <h3 className="text-2xl font-bold text-blue-500 mb-4 flex items-center gap-2"><Database size={24}/> Database Metrics</h3>
                <div className="flex-1 bg-zinc-900/50 rounded-xl border border-zinc-800 p-4">
                  <p className="text-zinc-400 font-mono">SQLite / Firebase connection active.</p>
                </div>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-3 md:px-4 rounded-2xl transition-all duration-200 text-sm font-medium ${
        active 
          ? 'bg-rose-600/10 text-white border border-rose-500/20 shadow-[0_0_20px_-5px_rgba(225,29,72,0.3)]' 
          : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200 border border-transparent'
      }`}
    >
      {icon}
      <span className="hidden md:block">{label}</span>
      {active && <span className="md:hidden absolute right-2 w-1.5 h-1.5 bg-rose-500 rounded-full"></span>}
    </button>
  )
}
