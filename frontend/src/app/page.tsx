"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldAlert, ActivitySquare, Stethoscope, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#09090b] text-white p-6 relative overflow-hidden font-sans">
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-zinc-800/10 via-[#09090b] to-[#09090b] z-0" />
      <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay z-0" />

      <motion.div 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-semibold text-zinc-300 tracking-wide uppercase">System LIVE • AI Engine Active</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-amber-500">
          CivicResQ Flow
        </h1>
        <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto font-light">
          India's first AI-Native, Government-Grade Crisis Response Network.
        </p>
      </motion.div>

      <div className="z-10 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        
        {/* Tier 1: Citizen App */}
        <Link href="/report" className="group">
          <motion.div 
            whileHover={{ y: -10 }}
            className="h-full glass-panel p-8 rounded-[2rem] border border-rose-500/20 hover:border-rose-500/50 hover:shadow-[0_0_40px_-10px_rgba(225,29,72,0.3)] transition-all flex flex-col relative overflow-hidden bg-gradient-to-b from-rose-950/20 to-transparent"
          >
            <div className="w-16 h-16 bg-rose-500/10 rounded-2xl flex items-center justify-center mb-6 border border-rose-500/20">
              <ShieldAlert size={32} className="text-rose-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">1. Citizen App</h2>
            <p className="text-zinc-400 text-sm mb-8 flex-1">
              Smart SOS, Offline mode, multi-language support, and AI-first aid instructions during wait times.
            </p>
            <div className="flex items-center text-rose-400 font-semibold text-sm group-hover:translate-x-2 transition-transform">
              Launch Panel <ArrowRight size={16} className="ml-2"/>
            </div>
          </motion.div>
        </Link>

        {/* Tier 2: Responder Panel */}
        <Link href="/responder" className="group">
          <motion.div 
            whileHover={{ y: -10 }}
            className="h-full glass-panel p-8 rounded-[2rem] border border-emerald-500/20 hover:border-emerald-500/50 hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)] transition-all flex flex-col relative overflow-hidden bg-gradient-to-b from-emerald-950/20 to-transparent"
          >
            <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/20">
              <Stethoscope size={32} className="text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">2. Field Responder</h2>
            <p className="text-zinc-400 text-sm mb-8 flex-1">
              Ambulance routing, hospital bed management, AI patient summaries, and live status dispatching.
            </p>
            <div className="flex items-center text-emerald-400 font-semibold text-sm group-hover:translate-x-2 transition-transform">
              Launch Panel <ArrowRight size={16} className="ml-2"/>
            </div>
          </motion.div>
        </Link>

        {/* Tier 3: Admin Command Center */}
        <Link href="/admin" className="group">
          <motion.div 
            whileHover={{ y: -10 }}
            className="h-full glass-panel p-8 rounded-[2rem] border border-blue-500/20 hover:border-blue-500/50 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)] transition-all flex flex-col relative overflow-hidden bg-gradient-to-b from-blue-950/20 to-transparent"
          >
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20">
              <ActivitySquare size={32} className="text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">3. Control Room</h2>
            <p className="text-zinc-400 text-sm mb-8 flex-1">
              Explainable AI (XAI) engine, massive data heatmaps, fraud detection, and absolute manual override capabilities.
            </p>
            <div className="flex items-center text-blue-400 font-semibold text-sm group-hover:translate-x-2 transition-transform">
              Open Dashboard <ArrowRight size={16} className="ml-2"/>
            </div>
          </motion.div>
        </Link>
        
      </div>
      
    </main>
  );
}
