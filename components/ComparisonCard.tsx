"use client";

import { motion } from "framer-motion";
import { ArrowRightLeft, ExternalLink, ThumbsUp } from "lucide-react";

interface AlternativeData {
  id: number;
  category: string;
  main_software: string;
  alternative: string;
  description: string;
  link: string;
  upvotes: number;
  downvotes: number;
}

export default function ComparisonCard({ data }: { data: AlternativeData }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="
        group 
        bg-white 
        rounded-3xl 
        border 
        border-slate-200 
        shadow-sm 
        hover:shadow-xl 
        hover:border-violet-300 
        transition-all 
        duration-300 
        h-full
      "
    >
      <div className="h-full flex flex-col p-7">

        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {data.category}
          </span>

          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold 
            bg-gradient-to-r from-emerald-50 to-emerald-100 
            text-emerald-700 border border-emerald-200 shadow-sm"
          >
            <ThumbsUp size={12} />
            {data.upvotes} Recommended
          </span>
        </div>

        {/* Swap Section */}
        <div className="flex items-center gap-5 mb-6">

          {/* Switch From */}
          <div className="
            flex-1 p-4 rounded-2xl 
            bg-slate-50 
            border border-slate-200 
            text-center 
            shadow-sm 
            group-hover:opacity-70 
            transition
          ">
            <span className="block text-xs text-slate-500 font-semibold mb-1 line-through decoration-red-400">
              Switch From
            </span>
            <div className="font-bold text-slate-700 text-base break-words">
              {data.main_software}
            </div>
          </div>

          {/* Arrow */}
          <div className="
            w-10 h-10 
            rounded-full 
            bg-gradient-to-r from-violet-100 to-violet-200 
            text-violet-600 
            flex items-center justify-center 
            shadow 
            flex-shrink-0 
            group-hover:rotate-180 
            transition-transform 
            duration-500
          ">
            <ArrowRightLeft size={18} />
          </div>

          {/* Switch To */}
          <div className="
            flex-1 p-4 rounded-2xl 
            bg-gradient-to-br from-emerald-50 to-emerald-100 
            border border-emerald-200 
            text-center 
            shadow-md
          ">
            <span className="block text-xs text-emerald-700 font-semibold mb-1">
              Switch To
            </span>
            <div className="font-bold text-emerald-900 text-base break-words">
              {data.alternative}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
          {data.description}
        </p>

        {/* Footer */}
        <div className="pt-5 border-t border-slate-200 flex justify-between items-center">

          <div className="text-xs font-medium text-slate-500">
            Score:{" "}
            <span className="font-bold text-slate-800">
              {data.upvotes - data.downvotes}
            </span>
          </div>

          <a
            href={data.link}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center gap-2 
              text-violet-600 
              font-bold 
              text-sm 
              hover:text-violet-700 
              hover:gap-3 
              transition-all
            "
          >
            Get Tool <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
