"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  // Hook to detect scroll direction
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;

    // Logic: Hide if scrolling down AND we are past the top 150px
    // Show if scrolling up
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-6 inset-x-0 z-50 max-w-2xl mx-auto h-16 flex items-center justify-center bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg rounded-full"
    >
      <div className="w-full flex justify-between items-center px-8 text-sm">
        {/* LOGO */}
        <div className="flex gap-5 items-center font-semibold">
          <Link
            href="/"
            className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            NIRD Quest
          </Link>
        </div>

        {/* LINKS */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/quest"
            className="text-sm font-medium text-slate-700 hover:text-emerald-600 transition-colors"
          >
            Quest
          </Link>

          <Link
            href="/alternatives"
            className="text-sm font-medium text-slate-700 hover:text-emerald-600 transition-colors"
          >
            Alternatives
          </Link>

          <Link
            href="/mission"
            className="text-sm font-bold bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 bg-clip-text text-transparent border-b-2 border-transparent hover:border-emerald-400 transition-all"
          >
            Our Mission
          </Link>
        </div>

        {/* Mobile Menu Placeholder */}
        <div className="md:hidden text-slate-700">
          Menu
        </div>
      </div>
    </motion.nav>
  );
}