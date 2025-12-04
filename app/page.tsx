"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Cpu, Globe, Recycle } from "lucide-react";
import { DotScreenShader } from "@/components/ui/dot-shader-background";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";

export default function Home() {
  return (
    <>
      {/* SCROLL EXPANSION HERO - AT THE VERY TOP */}
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1280&auto=format&fit=crop"
        bgImageSrc="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1920&auto=format&fit=crop"
        title="Village de la Résistance Numérique"
        date="LA NUIT DE L'INFO 2025"
        scrollToExpand="Scroll pour découvrir NIRD"
        textBlend
      >
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
            Libérez votre école des GAFAM
          </h2>
          <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300">
            NIRD (Numérique Inclusif, Responsable, Durable) est un mouvement qui aide les écoles à adopter des solutions numériques libres, économiques et écologiques.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6">
              <div className="text-4xl mb-2">🎯</div>
              <div className="text-2xl font-bold text-emerald-600">Inclusion</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Logiciels libres gratuits pour tous</div>
            </div>
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6">
              <div className="text-4xl mb-2">⚖️</div>
              <div className="text-2xl font-bold text-emerald-600">Responsabilité</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Données protégées en France</div>
            </div>
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6">
              <div className="text-4xl mb-2">🌱</div>
              <div className="text-2xl font-bold text-emerald-600">Durabilité</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">30kg déchets évités par PC</div>
            </div>
          </div>
        </div>
      </ScrollExpandMedia>

      {/* MAIN CONTENT SECTION */}
      <main className="min-h-screen flex flex-col items-center bg-slate-50 text-slate-900 selection:bg-emerald-200 selection:text-emerald-900 overflow-hidden relative">

        {/* Animated Dot Shader Background */}
        <div className="absolute inset-0 z-0">
          <DotScreenShader />
        </div>

        {/* Soft "Solar" Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-400/20 rounded-full blur-[120px] pointer-events-none mix-blend-multiply z-[1]"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-emerald-400/20 rounded-full blur-[100px] pointer-events-none mix-blend-multiply z-[1]"></div>

        <div className="flex-1 w-full flex flex-col gap-20 items-center z-10 relative">
          <Navbar />

          <div className="w-full max-w-6xl px-4 flex flex-col items-center gap-16">

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

          {/* SCROLL ANIMATION SECTION - NIRD Showcase */}
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
            <p>© 2025 La Nuit de l'Info - NIRD Resistance. Pour un avenir numérique durable.</p>
          </footer>
        </div>
      </main>
    </>
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