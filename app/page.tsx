"use client";

import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Cpu, Globe, Recycle, Play, Terminal } from "lucide-react";
import { DotScreenShader } from "@/components/ui/dot-shader-background";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const gameContainerRef = useRef<HTMLDivElement>(null);

  const handleStartGame = () => {
    setGameStarted(true);
    // Logic to initialize your actual game engine (Phaser, Three.js, etc) would go here
    console.log("System Initialized...");
  };

  return (
    
    <main className="min-h-screen flex flex-col items-center bg-slate-50 text-slate-900 selection:bg-emerald-200 selection:text-emerald-900 overflow-hidden relative font-sans">
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <DotScreenShader />
        {/* Soft "Solar" Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-400/20 rounded-full blur-[120px] mix-blend-multiply"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-emerald-400/20 rounded-full blur-[100px] mix-blend-multiply"></div>
      </div>

      {/* 2. CONTENT WRAPPER */}
      <div className="relative z-10 w-full flex flex-col items-center">
        
        <Navbar />

        {/* --- SECTION 1: THE GAME ARENA (HERO) --- */}
        <section className="w-full min-h-[90vh] flex flex-col items-center justify-center px-4 pt-32 pb-10">
          
          <div className="text-center mb-8 space-y-2">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
              PROTOCOLE <span className="text-emerald-600">N.I.R.D</span>
            </h1>
            <p className="text-slate-500 font-mono text-sm md:text-base">
              Mission: Libérer l'école des géants du web
            </p>
          </div>

          {/* THE "TABLE" / CONSOLE */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-5xl aspect-video bg-slate-900 rounded-xl border-4 border-slate-800 shadow-2xl shadow-emerald-900/20 overflow-hidden relative flex flex-col"
          >
            {/* Console Header */}
            <div className="bg-slate-800 px-4 py-2 flex items-center justify-between border-b border-slate-700">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              </div>
              <div className="text-xs text-slate-400 font-mono flex items-center gap-2">
                <Terminal size={12} />
                sys_root/games/david_vs_goliath.exe
              </div>
            </div>

            {/* Game Screen Area */}
            <div 
              ref={gameContainerRef}
              className="flex-1 bg-amber-800 relative flex items-center justify-center"
              style={{
                backgroundImage: "radial-gradient(#1e293b 1px, transparent 0)",
                backgroundSize: "20px 20px"
              }}
            >
              {!gameStarted ? (
                /* START SCREEN UI */
                <div className="text-center space-y-6 z-10">
                  <div className="inline-block p-4 border-2 border-emerald-500/30 rounded-full bg-emerald-900/10 mb-2 animate-pulse">
                    <Cpu className="w-12 h-12 text-emerald-500" />
                  </div>
                  <h2 className="text-white text-2xl font-mono tracking-widest">SYSTEM READY</h2>
                  <p className="text-emerald-400/60 text-sm max-w-md mx-auto">
                    Prenez le contrôle. Détruisez les monopoles. <br/>
                    Installez l'Open Source.
                  </p>
                  
                  <button 
                    onClick={handleStartGame}
                    className="group relative px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold tracking-wider uppercase transition-all overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Play size={18} fill="currentColor" /> Initialize
                    </span>
                    <div className="absolute inset-0 h-full w-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                  </button>
                </div>
              ) : (
                /* ACTUAL GAME MOUNT POINT */
                <div className="relative w-full h-full bg-black overflow-hidden">
                  <iframe
                    src="/game/index.html"
                    className="w-full h-full border-0"
                    title="NIRD Educational Game - Interactive Globe"
                    allow="fullscreen"
                  />
                </div>
              )}

              {/* CRT Scanline Effect Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20"></div>
            </div>
          </motion.div>

          <div className="mt-8 animate-bounce text-slate-400">
            ↓ Scroll pour l'histoire
          </div>
        </section>


        {/* --- SECTION 2: STORY & FEATURES (Existing) --- */}
        <div className="w-full max-w-6xl px-4 flex flex-col items-center gap-16 pb-20">

          {/* FEATURES GRID */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <FeatureCard
              icon={<Cpu className="w-7 h-7 text-blue-600" />}
              bgIcon="bg-blue-50"
              title="Inclusion"
              description="Logiciels libres GRATUITS, ordinateurs reconditionnés, accessible à tous."
            />
            <FeatureCard
              icon={<Globe className="w-7 h-7 text-amber-500" />}
              bgIcon="bg-amber-50"
              title="Responsabilité"
              description="Données en France (RGPD), contrôle total par l'école, éducation au numérique réel."
            />
            <FeatureCard
              icon={<Recycle className="w-7 h-7 text-emerald-600" />}
              bgIcon="bg-emerald-50"
              title="Durabilité"
              description="Stop obsolescence programmée, Linux = moins d'énergie, 30kg déchets évités/PC."
            />
          </motion.div>

          {/* GLASSMORPHISM STATS BAR */}
          <div className="w-full max-w-4xl p-2 rounded-3xl bg-white/60 backdrop-blur-md border border-white shadow-xl shadow-slate-200/50">
            <div className="flex flex-col md:flex-row justify-between items-center px-8 py-6 gap-6 text-center">
              <Stat number="19" label="Écoles NIRD" color="text-slate-900" />
              <div className="w-full h-px md:w-px md:h-12 bg-slate-200"></div>
              <Stat number="80k€" label="Économisés/an" color="text-emerald-600" />
              <div className="w-full h-px md:w-px md:h-12 bg-slate-200"></div>
              <Stat number="50M" label="Tonnes Déchets/an" color="text-blue-600" />
            </div>
          </div>
        </div>

        {/* --- SECTION 3: SCROLL ANIMATION --- */}
        <div className="w-full">
          <ContainerScroll
            titleComponent={
              <>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                  Découvrez NIRD en action
                </h2>
                <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
                  Les écoles NIRD transforment l'éducation numérique avec des solutions libres et durables
                </p>
              </>
            }
          >
            <div className="h-full w-full bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-2xl p-8 flex flex-col items-center justify-center gap-6">
              <div className="text-center space-y-4">
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900">
                  🎓 19 Écoles Pionnières
                </h3>
                <p className="text-lg text-slate-700 max-w-xl">
                  De Bruay à la Polynésie, les écoles NIRD prouvent qu'un numérique libre, responsable et durable est possible.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center">
                  <div className="text-4xl mb-2">💰</div>
                  <div className="text-2xl font-bold text-emerald-600">80 000€</div>
                  <div className="text-sm text-slate-600">Économies par école/an</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center">
                  <div className="text-4xl mb-2">🌱</div>
                  <div className="text-2xl font-bold text-emerald-600">30kg</div>
                  <div className="text-sm text-slate-600">Déchets évités par PC</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center">
                  <div className="text-4xl mb-2">🔒</div>
                  <div className="text-2xl font-bold text-emerald-600">100%</div>
                  <div className="text-sm text-slate-600">Données en France</div>
                </div>
              </div>
            </div>
          </ContainerScroll>
        </div>

        {/* --- FOOTER --- */}
        <footer className="w-full flex flex-col items-center justify-center border-t border-slate-200 bg-white/50 backdrop-blur-sm mx-auto text-center text-xs gap-4 py-12 text-slate-500 mt-10">
          <div className="flex gap-2 mb-2">
            <Cpu className="w-5 h-5 opacity-50" />
            <Globe className="w-5 h-5 opacity-50" />
          </div>
          <p>
            Powered by{" "}
            <a href="https://supabase.com" target="_blank" className="font-bold text-emerald-600 hover:underline" rel="noreferrer">
              Supabase
            </a>
          </p>
          <p>© 2025 La Nuit de l'Info - NIRD Resistance. Pour un avenir numérique durable.</p>
        </footer>

      </div>
    </main>
  );
}

// --- Component Helpers ---

function FeatureCard({ icon, bgIcon, title, description }: { icon: any, bgIcon: string, title: string, description: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="p-8 rounded-2xl bg-white border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] transition-shadow cursor-default"
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