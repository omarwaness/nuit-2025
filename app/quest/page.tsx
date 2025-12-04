"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Star, Zap, Lock, ArrowRight } from "lucide-react";

export default function QuestPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <Navbar />

      {/*SECTION 1: HERO HEADER & CURVE */}
      {/* Change the gradient colors here to match your brand */}
      <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white pt-36 pb-32 overflow-hidden">
        
        {/* Abstract Background Shapes (Optional visual flair) */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          {/* --- INSERT TITLE HERE --- */}
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
            Page Title
          </h1>
          {/* --- INSERT SUBTITLE HERE --- */}
          <p className="text-blue-100 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Your subtitle or page description goes here.
          </p>
        </div>

        
      </div>

      {/* SECTION 2: FLOATING DASHBOARD / STATS */}
      {/* This container floats up (-mt) to bridge the header and body */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 -mt-12 mb-16">
        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left: User Level / Avatar */}
          <div className="flex items-center gap-4 w-full md:w-auto">
             <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center">
                {/* ICON OR AVATAR HERE */}
                <Star className="w-6 h-6 text-slate-400" />
             </div>
             <div>
               <h3 className="text-lg font-bold text-slate-800">User Level</h3>
               <p className="text-slate-500 text-sm">Rank Name</p>
             </div>
          </div>

          {/* Center: Progress Bar */}
          <div className="flex-1 w-full md:px-8">
             <div className="flex justify-between text-xs font-bold uppercase text-slate-400 mb-2">
                <span>Progress Label</span>
                <span>50%</span>
             </div>
             <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                {/* Adjust width% dynamically */}
                <div className="h-full bg-blue-500 w-[50%] rounded-full"></div>
             </div>
          </div>

          {/* Right: Action Button */}
          <button className="px-6 py-2 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors">
             Action Button
          </button>
        </div>
      </div>

      {/* SECTION 3: CONTENT GRID */}
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Optional Section Title */}
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Current Quests</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* --- PASTE YOUR QUEST CARDS HERE --- */}
          
          {/* Example Card 1 */}
          <CardSkeleton /> 
          
          {/* Example Card 2 */}
          <CardSkeleton /> 

          {/* Example Card 3 */}
          <CardSkeleton /> 

        </div>
      </div>
    </main>
  );
}

// --- REUSABLE COMPONENT STRUCTURE ---
// You can use this component, or copy the HTML inside the grid above.
function CardSkeleton() {
  return (
    <div className="group relative p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all cursor-pointer">
      
      {/* 1. Tag / Badge Area */}
      <div className="flex justify-between items-start mb-4">
         <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-600">
            Category
         </span>
      </div>

      {/* 2. Text Content Area */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-800 mb-2">Quest Title</h3>
        <p className="text-slate-500 text-sm leading-relaxed">
          Description of the quest goes here. Keep it to 2-3 lines for best alignment.
        </p>
      </div>

      {/* 3. Footer / Icon Area */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-slate-600 font-semibold text-sm">
         <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Reward</span>
         </div>
         <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}