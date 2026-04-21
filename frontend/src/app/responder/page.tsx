"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, MapPin, Search, Check, X, ShieldAlert, Navigation2, BedDouble, Wind, Box } from "lucide-react";

export default function ResponderApp() {
  const [role, setRole] = useState<"ambulance" | "hospital">("ambulance");

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans p-4 md:p-8">
      {/* Header Selector */}
      <div className="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            Responder Network <span className="text-sm font-semibold px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-md">LIVE</span>
          </h1>
          <p className="text-zinc-400">Manage real-time dispatch and resource allocation.</p>
        </div>
        <div className="flex bg-zinc-900 border border-zinc-800 rounded-xl p-1">
          <button 
            onClick={() => setRole("ambulance")}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${role === "ambulance" ? "bg-zinc-800 text-white shadow" : "text-zinc-500 hover:text-zinc-300"}`}
          >
            Ambulance Fleet
          </button>
          <button 
            onClick={() => setRole("hospital")}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${role === "hospital" ? "bg-zinc-800 text-white shadow" : "text-zinc-500 hover:text-zinc-300"}`}
          >
            Hospital Triage
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          {role === "ambulance" && (
            <motion.div key="amb" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <AmbulanceDashboard />
            </motion.div>
          )}
          {role === "hospital" && (
            <motion.div key="hosp" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <HospitalDashboard />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function AmbulanceDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Current Task */}
      <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-blue-500/30 bg-blue-950/10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-1"><span className="text-blue-400">ALS-04</span> Active Dispatch</h2>
            <p className="text-zinc-400 text-sm">Target: Road Accident (Severity 95)</p>
          </div>
          <div className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-bold border border-blue-500/30 animate-pulse">
            EN ROUTE
          </div>
        </div>

        {/* Fake Map */}
        <div className="w-full h-64 bg-zinc-900 rounded-2xl mb-6 relative overflow-hidden border border-zinc-800 flex items-center justify-center">
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(#4bf 1px, transparent 1px), linear-gradient(90deg, #4bf 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
            <div className="text-center z-10">
              <Navigation2 size={40} className="text-blue-500 mx-auto mb-2" />
              <p className="text-lg font-bold text-white">ETA: 3m 45s</p>
              <p className="text-sm text-zinc-400">Distance: 1.2 km</p>
            </div>
            
            {/* Nav path line fake */}
            <div className="absolute w-[200px] h-[2px] bg-blue-500/50 rotate-45"></div>
        </div>

        {/* AI Patient Summary */}
        <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800 mb-6">
          <h3 className="text-sm font-bold text-zinc-300 mb-2 flex items-center gap-2"><ShieldAlert size={16} className="text-blue-400"/> AI Patient Preview</h3>
          <p className="text-zinc-400 text-sm leading-relaxed mb-3">
            AI has detected severe bleeding and potential fractures based on the caller's image. 
            Patient is likely unconscious. Required equipment: **Spinal Board**, **Tourniquet**, **Oxygen (15L/min)**.
          </p>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-rose-500/20 text-rose-400 text-xs rounded border border-rose-500/20">Critical Trauma</span>
            <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs rounded border border-amber-500/20">Male, approx 30s</span>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2">
            <MapPin size={20}/> Arrived at Scene
          </button>
          <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2">
            <Truck size={20}/> En Route to Hospital
          </button>
        </div>
      </div>

      {/* Queue Board */}
      <div className="glass-panel p-6 rounded-3xl border border-zinc-800">
        <h2 className="text-lg font-bold text-white mb-4">Pending Requests <span className="text-xs bg-zinc-800 px-2 py-0.5 rounded ml-2">Area</span></h2>
        
        <div className="space-y-4">
          
          <div className="p-4 bg-zinc-900/80 rounded-xl border border-zinc-700">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold bg-amber-500/20 text-amber-500 px-2 py-1 rounded">HIGH</span>
              <span className="text-xs text-zinc-500">2.4 km away</span>
            </div>
            <h3 className="font-semibold text-white">Cardiac Arrest Suspected</h3>
            <p className="text-xs text-zinc-400 mb-4">Patient reported chest pain.</p>
            <div className="flex gap-2">
              <button className="flex-1 bg-emerald-600/20 text-emerald-500 py-2 rounded-lg font-semibold text-sm border border-emerald-500/30 hover:bg-emerald-600/30 flex items-center justify-center gap-1"><Check size={16}/> Accept</button>
              <button className="flex-1 bg-rose-600/20 text-rose-500 py-2 rounded-lg font-semibold text-sm border border-rose-500/30 hover:bg-rose-600/30 flex items-center justify-center gap-1"><X size={16}/> Reject</button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

function HospitalDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      
      {/* Live Bed Management */}
      <div className="lg:col-span-1 space-y-6">
        <div className="glass-panel p-6 rounded-3xl border border-emerald-500/20">
          <h2 className="font-bold text-white mb-4">Live Bed Capactity</h2>
          <div className="space-y-4 text-sm font-medium">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-zinc-300"><BedDouble size={16} className="text-emerald-500"/> ICU / Trauma</span>
              <span className="text-emerald-400 bg-emerald-500/10 px-2 rounded">4 / 12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-zinc-300"><Wind size={16} className="text-blue-500"/> Oxygen Beds</span>
              <span className="text-blue-400 bg-blue-500/10 px-2 rounded">15 / 45</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-zinc-300"><Box size={16} className="text-zinc-500"/> General Ward</span>
              <span className="text-zinc-400 bg-zinc-800 px-2 rounded">124 / 200</span>
            </div>
          </div>
          <button className="w-full mt-6 bg-zinc-800 hover:bg-zinc-700 text-xs py-2 rounded font-semibold text-white transition-colors">Update Capacity DB</button>
        </div>
      </div>

      {/* Incoming Triage AI Stream */}
      <div className="lg:col-span-3 glass-panel p-6 rounded-3xl border border-zinc-800">
        <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-4">
          <h2 className="text-lg font-bold text-white">Inbound Trauma Patients</h2>
          <span className="text-xs text-zinc-500"><span className="w-2 h-2 rounded-full inline-block bg-emerald-500 mr-2 animate-pulse"/>Live Feed</span>
        </div>

        <div className="space-y-4">
          {/* Patient Card */}
          <div className="bg-zinc-900/60 p-5 rounded-2xl border border-rose-500/30 flex flex-col md:flex-row gap-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-rose-500 text-white font-bold text-xs px-2 py-0.5 rounded">CRITICAL</span>
                <span className="text-zinc-400 text-sm font-medium">ETA: 4 minutes (Ambulance ALS-04)</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Severe Road Traffic Collision</h3>
              <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                Male victim. Probable internal bleeding and femur fracture. 
                Vitals transmitted: BP 90/60, HR 120. Oxygen administered in transit.
              </p>
              <div className="flex gap-2">
                <span className="text-xs border border-blue-500/40 text-blue-400 bg-blue-500/10 px-2 py-1 rounded">Prepare OT Room 2</span>
                <span className="text-xs border border-rose-500/40 text-rose-400 bg-rose-500/10 px-2 py-1 rounded">Blood Type: O Negative likely needed</span>
              </div>
            </div>

            <div className="flex flex-col justify-center min-w-[140px] gap-2">
              <button className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold py-3 rounded-xl shadow-lg transition-all text-center">
                Acknowledge
              </button>
              <button className="bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-semibold py-3 rounded-xl border border-zinc-700 transition-all text-center">
                Declare Divert
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
