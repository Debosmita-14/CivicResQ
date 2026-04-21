"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, LogIn, UserPlus } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#09090b] relative font-sans text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-[#09090b] to-[#09090b] z-0" />
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-panel p-8 rounded-[2rem] w-full max-w-sm z-10 border border-zinc-800 shadow-2xl relative"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
            <ShieldAlert size={32} className="text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold">{isLogin ? "Welcome Back" : "Create Account"}</h2>
          <p className="text-sm text-zinc-400 mt-1">Authenticate into CivicResQ Platform</p>
        </div>

        <div className="space-y-4">
          {!isLogin && (
            <div>
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-1">Full Name</label>
              <input type="text" className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 transition-colors" placeholder="John Doe" />
            </div>
          )}
          
          <div>
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-1">Email Address</label>
            <input type="email" className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 transition-colors" placeholder="user@gov.in" />
          </div>
          
          <div>
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-1">Password</label>
            <input type="password" className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 transition-colors" placeholder="••••••••" />
          </div>

          <button 
            onClick={() => window.location.href = "/"}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold p-3 rounded-xl mt-4 flex items-center justify-center gap-2 transition-colors"
          >
            {isLogin ? <><LogIn size={18} /> Sign In</> : <><UserPlus size={18} /> Sign Up</>}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-zinc-400">
            {isLogin ? "Don't have access? " : "Already authenticated? "}
            <button onClick={() => setIsLogin(!isLogin)} className="text-blue-400 font-bold hover:underline">
              {isLogin ? "Request Account" : "Sign In"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
