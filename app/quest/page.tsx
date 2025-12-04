"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Lock, ArrowRight, Zap, Leaf, Shield } from "lucide-react";

export default function QuestPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <Navbar />

      {/* 1. HERO HEADER WITH CURVE (Inspired by your image) */}
      <div className="relative bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-white pt-32 pb-32 overflow-hidden">
        
        {/* Background Patterns */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black mb-4 tracking-tight"
          >
            Your Daily Missions
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-blue-100 text-lg md:text-xl font-medium max-w-2xl mx-auto"
          >
            Complete challenges to restore the village, earn eco-points, and unlock the Digital Guardian badge.
          </motion.p>
        </div>

        {/* The White Curve at the bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
           <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[60px] md:h-[100px] fill-slate-50">
               <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
           </svg>
        </div>
      </div>

      {/* 2. PROGRESS SECTION (Floating up into the header) */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 -mt-10 md:-mt-16 mb-16">
        <motion.div 
           initial={{ scale: 0.95, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ delay: 0.2 }}
           className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-blue-900/5 border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4 w-full md:w-auto">
             <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <Leaf className="w-8 h-8" />
             </div>
             <div>
               <h3 className="text-xl font-bold text-slate-800">Level 3: Restorer</h3>
               <p className="text-slate-500 text-sm">Next Rank: <span className="text-indigo-600 font-semibold">Technomancer</span></p>
             </div>
          </div>

          <div className="flex-1 w-full md:px-8">
             <div className="flex justify-between text-xs font-bold uppercase text-slate-400 mb-2">
                <span>Progress</span>
                <span>750 / 1000 XP</span>
             </div>
             <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-400 to-cyan-500 w-[75%] rounded-full"></div>
             </div>
          </div>

          <button className="whitespace-nowrap px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors">
             View Profile
          </button>
        </motion.div>
      </div>

      {/* 3. QUEST GRID */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Active Quest */}
        <QuestCard 
           status="active"
           category="Hardware"
           title="The Old Laptop"
           desc="Find the discarded laptop in the warehouse and diagnose why it won't turn on."
           xp="150"
           icon={<Zap className="w-6 h-6 text-amber-500" />}
        />

        {/* Active Quest */}
        <QuestCard 
           status="active"
           category="Software"
           title="Bloatware Purge"
           desc="Identify and remove 5 unnecessary background processes slowing down the school server."
           xp="100"
           icon={<Shield className="w-6 h-6 text-indigo-500" />}
        />

        {/* Completed Quest */}
        <QuestCard 
           status="completed"
           category="Tutorial"
           title="Welcome to NIRD"
           desc="Complete the basic movement tutorial and learn the 3 pillars of digital sobriety."
           xp="50"
           icon={<CheckCircle2 className="w-6 h-6 text-emerald-500" />}
        />

        {/* Locked Quest */}
        <QuestCard 
           status="locked"
           category="Community"
           title="Repair Cafe"
           desc="Unlock this quest by reaching Level 4. Organize a virtual repair session."
           xp="300"
           icon={<Lock className="w-6 h-6 text-slate-400" />}
        />

      </div>
    </main>
  );
}

// --- HELPER COMPONENT: Quest Card ---

function QuestCard({ status, category, title, desc, xp, icon }: any) {
  const isLocked = status === 'locked';
  const isCompleted = status === 'completed';
  
  return (
    <motion.div 
      whileHover={!isLocked ? { y: -5 } : {}}
      className={`relative group p-6 rounded-2xl border transition-all
        ${isLocked ? 'bg-slate-50 border-slate-200 opacity-70 grayscale-[0.5]' : 'bg-white border-slate-200 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 hover:border-blue-200'}
        ${isCompleted ? 'border-emerald-200 bg-emerald-50/30' : ''}
      `}
    >
      <div className="flex justify-between items-start mb-4">
         <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider 
            ${isLocked ? 'bg-slate-200 text-slate-500' : 'bg-blue-50 text-blue-600'}
         `}>
            {category}
         </span>
         {isCompleted && <div className="p-1 bg-emerald-100 rounded-full text-emerald-600"><CheckCircle2 size={16}/></div>}
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
         <div className="flex items-center gap-2 font-bold text-slate-700">
            {icon}
            <span className="text-sm">{xp} XP</span>
         </div>
         
         {!isLocked && !isCompleted && (
            <button className="p-2 rounded-full bg-slate-100 text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
               <ArrowRight size={18} />
            </button>
         )}
         {isLocked && <Lock size={18} className="text-slate-400"/>}
      </div>
    </motion.div>
  );
}