"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Target, Heart, Globe, ArrowRight, Lightbulb, ShieldCheck, Leaf } from "lucide-react";

export default function MissionPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <Navbar />

      {/* --- SECTION 1: HERO & VISION --- */}
      {/* Same curved style as Quest page for consistency, but slightly greener (Solarpunk) gradient */}
      <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white pt-36 pb-32 overflow-hidden">
        
        {/* Abstract Background Element */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl mix-blend-overlay"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-bold tracking-wider uppercase mb-6"
          >
             <Target className="w-4 h-4" /> 
             Our Objective
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
            Building a Digital <br/> 
            <span className="text-emerald-200">Village of Resistance</span>
          </h1>
          
          <p className="text-emerald-50 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            We are on a mission to empower schools and families to reclaim their digital independence through repair, reuse, and open-source education.
          </p>
        </div>

        {/* The "MadBox" Curve - White separator */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
           <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[60px] md:h-[100px] fill-slate-50">
               <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
           </svg>
        </div>
      </div>

      {/* --- SECTION 2: THE THREE PILLARS (Grid) --- */}
      {/* Floats up to bridge the header */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 -mt-16 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Pillar 1 */}
          <PillarCard 
             icon={<Leaf className="w-8 h-8 text-emerald-600" />}
             title="Sustainability"
             description="Fighting e-waste by teaching hardware repair and extending the lifespan of devices."
          />

          {/* Pillar 2 */}
          <PillarCard 
             icon={<ShieldCheck className="w-8 h-8 text-blue-600" />}
             title="Sovereignty"
             description="Moving away from data-harvesting giants towards ethical, open-source alternatives."
          />

          {/* Pillar 3 */}
          <PillarCard 
             icon={<Lightbulb className="w-8 h-8 text-amber-500" />}
             title="Education"
             description="Gamifying the learning process to make digital literacy fun, accessible, and actionable."
          />

        </div>
      </div>

      {/* --- SECTION 3: THE STORY / MANIFESTO (Alternating Layout) --- */}
      <div className="max-w-6xl mx-auto px-6 space-y-24 mb-24">
        
        {/* Block A: Text Left, Image Right */}
        <div className="flex flex-col md:flex-row items-center gap-12">
           <div className="flex-1 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                 The Problem: <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Planned Obsolescence</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                 [Insert text here about how devices are thrown away too quickly, how schools spend too much money on new tech, and the environmental impact of digital waste.]
              </p>
              <ul className="space-y-3">
                 <ListItem text="Millions of tons of e-waste annually" />
                 <ListItem text="Schools locked into expensive contracts" />
                 <ListItem text="Lack of repair skills in curriculum" />
              </ul>
           </div>
           {/* Placeholder for Image/Illustration */}
           <div className="flex-1 w-full h-80 bg-slate-200 rounded-3xl flex items-center justify-center border-2 border-dashed border-slate-300">
              <span className="text-slate-400 font-semibold">Insert Image: E-Waste Pile</span>
           </div>
        </div>

        {/* Block B: Image Left, Text Right */}
        <div className="flex flex-col-reverse md:flex-row items-center gap-12">
           {/* Placeholder for Image/Illustration */}
           <div className="flex-1 w-full h-80 bg-slate-200 rounded-3xl flex items-center justify-center border-2 border-dashed border-slate-300">
              <span className="text-slate-400 font-semibold">Insert Image: Happy Students Repairing</span>
           </div>
           
           <div className="flex-1 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                 The Solution: <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">The NIRD Approach</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                 [Insert text here about how NIRD Quest turns learning into a game. Explain that by playing, students actually perform real-world actions like installing Linux or fixing a keyboard.]
              </p>
              <button className="text-emerald-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                 Read our full Manifesto <ArrowRight className="w-4 h-4" />
              </button>
           </div>
        </div>

      </div>

      {/* --- SECTION 4: BIG CTA --- */}
      <div className="max-w-4xl mx-auto px-6">
         <div className="bg-slate-900 rounded-3xl p-8 md:p-16 text-center text-white shadow-2xl shadow-slate-900/20 relative overflow-hidden">
            {/* Decoration */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-800 to-slate-950 z-0"></div>
            <div className="absolute top-[-50%] right-[-10%] w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 space-y-6">
               <h2 className="text-3xl md:text-5xl font-bold">Ready to join the Resistance?</h2>
               <p className="text-slate-400 text-lg max-w-xl mx-auto">
                  Start your journey today. Complete your first quest and become a Digital Guardian.
               </p>
               <div className="pt-4">
                  <button className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                     Start Mission Now
                  </button>
               </div>
            </div>
         </div>
      </div>

    </main>
  );
}

// --- HELPER COMPONENTS ---

function PillarCard({ icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center gap-4 hover:-translate-y-2 transition-transform duration-300"
    >
      <div className="p-4 bg-slate-50 rounded-2xl mb-2">
         {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-800">{title}</h3>
      <p className="text-slate-500 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

function ListItem({ text }: { text: string }) {
   return (
      <li className="flex items-center gap-3 text-slate-700 font-medium">
         <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
         </div>
         {text}
      </li>
   )
}