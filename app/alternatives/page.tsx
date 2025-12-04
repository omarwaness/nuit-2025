"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import {
  ArrowRightLeft,
  Shield,
  Zap,
  Download,
  Layers,
  Globe,
  Smartphone,
  Server,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getAlternatives } from "@/queries/alternatives";

export default function AlternativePage() {
  const [alternatives, setAlternatives] = useState<any[]>([]);
  useEffect(() => {
    getAlternatives().then((data) => setAlternatives(data));
  }, []);
  console.log(alternatives);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <Navbar />

      {/* --- SECTION 1: HEADER (Purple/Pink Gradient for "Tools") --- */}
      <div className="relative bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 text-white pt-36 pb-32 overflow-hidden">
        {/* Background abstract shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-[80px]"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-400 rounded-full blur-[60px]"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold tracking-wider uppercase mb-6"
          >
            <Layers className="w-3 h-3" />
            The Toolkit
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
            Ethical <span className="text-pink-200">Alternatives</span>
          </h1>
          <p className="text-violet-100 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Switching to these tools reduces digital waste, protects your
            privacy, and supports the open web.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div></div>
      </div>

      {/* --- SECTION 4: DOWNLOAD / CTA --- */}
      <div className="mt-24 max-w-3xl mx-auto px-6 text-center">
        <div className="p-8 rounded-3xl bg-slate-100 border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            Suggest an Alternative
          </h2>
          <p className="text-slate-500 mb-6">
            Know a great open-source tool that helps the planet? Submit it to
            the village archives.
          </p>
          <button className="px-6 py-3 bg-white border border-slate-300 rounded-xl font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all shadow-sm">
            Submit Recommendation
          </button>
        </div>
      </div>
    </main>
  );
}


function ComparisonCard({
  category,
  badOption,
  goodOption,
  description,
  impact,
  impactColor,
}: any) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group bg-white rounded-3xl p-1 shadow-sm border border-slate-200 hover:shadow-xl hover:shadow-violet-500/10 hover:border-violet-200 transition-all duration-300"
    >
      <div className="h-full flex flex-col p-6">
        {/* Header Badge */}
        <div className="mb-6 flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {category}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${impactColor}`}
          >
            {impact}
          </span>
        </div>

        {/* The SWAP Action Visual */}
        <div className="flex items-center gap-4 mb-6">
          {/* Bad Option */}
          <div className="flex-1 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center opacity-60 group-hover:opacity-50 transition-opacity">
            <span className="block text-sm text-slate-400 font-semibold mb-1 line-through decoration-red-400">
              Switch From
            </span>
            <div className="font-bold text-slate-700">{badOption}</div>
          </div>

          {/* Swap Icon */}
          <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center flex-shrink-0 group-hover:rotate-180 transition-transform duration-500">
            <ArrowRightLeft size={16} />
          </div>

          {/* Good Option */}
          <div className="flex-1 p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-center shadow-sm">
            <span className="block text-sm text-emerald-600 font-semibold mb-1">
              Switch To
            </span>
            <div className="font-bold text-slate-900">{goodOption}</div>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
          {description}
        </p>

        {/* Action Footer */}
        <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
          <div className="flex gap-1">
            <StarRating />
          </div>
          <button className="flex items-center gap-2 text-violet-600 font-bold text-sm hover:gap-3 transition-all">
            Get Guide <ArrowRightLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function StarRating() {
  return (
    <>
      {[1, 2, 3, 4, 5].map((i) => (
        <Zap key={i} size={14} className="text-amber-400 fill-amber-400" />
      ))}
    </>
  );
}
