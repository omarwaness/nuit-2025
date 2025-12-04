"use client";

import Navbar from "@/components/Navbar";
import { DotScreenShader } from "@/components/ui/dot-shader-background";

export default function AlternativePage() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-slate-50 text-slate-900 relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <DotScreenShader />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        <Navbar />

        <div className="mt-32 px-4 text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">
            Alternatives Libres
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Découvrez les outils qui remplacent les GAFAM tout en respectant votre vie privée.
          </p>
        </div>
      </div>
    </main>
  );
}
