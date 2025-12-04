"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Cpu, Globe, Recycle, Map, Trophy, ArrowRight, Leaf } from "lucide-react";

// Animation variants (kept the same for that smooth feel)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

export default function Home() {
  return (
    // Base: Soft gradient white/blue background (Sky/Cloud feel)
    <main className="min-h-screen flex flex-col items-center bg-slate-50 text-slate-900 selection:bg-emerald-200 selection:text-emerald-900 overflow-hidden relative">
      
      {/* 1. Futuristic Grid (Subtle Grey) */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:30px_30px]"></div>
      
      {/* 2. Soft "Solar" Glows instead of Neon */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-400/20 rounded-full blur-[120px] pointer-events-none mix-blend-multiply"></div>
      <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-emerald-400/20 rounded-full blur-[100px] pointer-events-none mix-blend-multiply"></div>

      <div className="flex-1 w-full flex flex-col gap-20 items-center z-10 relative">
        <Navbar />

        <div className="w-full max-w-6xl px-4 flex flex-col items-center gap-16">
          
          {/* HERO SECTION */}
          <motion.div 
            className="text-center flex flex-col items-center gap-6 mt-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 text-sm font-semibold tracking-wide shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              INITIATIVE: REGENERATE
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-black tracking-tight text-slate-900">
              The Village of <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600">
                Resistance
              </span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-slate-600 text-lg md:text-xl max-w-2xl leading-relaxed font-medium">
              A Solarpunk journey into <span className="text-emerald-700 font-bold">digital sobriety</span>. 
              Repair the hardware, save the cloud, and build a sustainable future.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mt-6">
              <button className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-[0_10px_20px_-10px_rgba(5,150,105,0.5)] hover:shadow-[0_20px_30px_-10px_rgba(5,150,105,0.6)] hover:-translate-y-1 flex items-center justify-center gap-2">
                Start Quest <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-8 py-3 rounded-xl bg-white border border-slate-200 hover:border-emerald-300 hover:text-emerald-700 text-slate-600 font-semibold transition-all shadow-sm hover:shadow-md flex items-center justify-center">
                Explore Principles
              </button>
            </motion.div>
          </motion.div>

          {/* FEATURES GRID */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <FeatureCard 
              icon={<Map className="w-7 h-7 text-blue-600" />}
              bgIcon="bg-blue-50"
              title="Open World Map"
              description="Navigate a vibrant 3D village. Find the Recycler's Guild and the Open Source Library."
            />
            <FeatureCard 
              icon={<Trophy className="w-7 h-7 text-amber-500" />}
              bgIcon="bg-amber-50"
              title="Badges & Ranks"
              description="Level up from 'Consumer' to 'Restorer' by completing real-world eco-challenges."
            />
            <FeatureCard 
              icon={<Leaf className="w-7 h-7 text-emerald-600" />}
              bgIcon="bg-emerald-50"
              title="Green Tech"
              description="Master the art of extending hardware life and using low-energy software solutions."
            />
          </motion.div>

          {/* GLASSMORPHISM STATS BAR */}
          <div className="w-full max-w-4xl p-2 rounded-3xl bg-white/60 backdrop-blur-md border border-white shadow-xl shadow-slate-200/50">
            <div className="flex flex-col md:flex-row justify-between items-center px-8 py-6 gap-6 text-center">
               <Stat number="1,240" label="Agents Active" color="text-slate-900" />
               <div className="w-full h-px md:w-px md:h-12 bg-slate-200"></div>
               <Stat number="500kg" label="Carbon Offset" color="text-emerald-600" />
               <div className="w-full h-px md:w-px md:h-12 bg-slate-200"></div>
               <Stat number="100%" label="Open Source" color="text-blue-600" />
            </div>
          </div>

        </div>

        {/* FOOTER */}
        <footer className="w-full flex flex-col items-center justify-center border-t border-slate-200 bg-white/50 backdrop-blur-sm mx-auto text-center text-xs gap-4 py-12 text-slate-500 mt-10">
          <div className="flex gap-2 mb-2">
             <Cpu className="w-5 h-5 opacity-50" />
             <Globe className="w-5 h-5 opacity-50" />
          </div>
          <p>
            Powered by{" "}
            <a
              href="https://supabase.com"
              target="_blank"
              className="font-bold text-emerald-600 hover:underline"
              rel="noreferrer"
            >
              Supabase
            </a>
          </p>
          <p>© 2024 NIRD Quest. Designed for a sustainable tomorrow.</p>
        </footer>
      </div>
    </main>
  );
}

// --- Light Theme Helpers ---

function FeatureCard({ icon, bgIcon, title, description }: { icon: any, bgIcon: string, title: string, description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-8 rounded-2xl bg-white border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] transition-all cursor-default"
    >
      <div className={`p-4 rounded-xl w-fit mb-5 ${bgIcon} transition-colors`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-slate-800">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed font-medium">{description}</p>
    </motion.div>
  );
}

function Stat({ number, label, color }: { number: string, label: string, color: string }) {
  return (
    <div className="flex flex-col items-center">
      <h4 className={`text-4xl font-black ${color} tracking-tight`}>{number}</h4>
      <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">{label}</p>
    </div>
  );
}