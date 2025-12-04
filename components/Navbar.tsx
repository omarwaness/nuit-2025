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
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 inset-x-0 z-50 w-full flex justify-center h-24 bg-transparent backdrop-blur-md border-slate-200/50 shadow-xl rounded-b-3xl"
    >
      <div className="w-full max-w-7xl flex justify-between items-center px-6 text-sm">
        {/* LOGO */}
        <div className="flex gap-5 items-center font-semibold">
          <Link
            href="/"
            className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            NIRD Quest
          </Link>
        </div>

        {/* LINKS */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/quest"
            className="text-base font-medium text-slate-600 hover:text-orange-500 transition-colors"
          >
            Quest
          </Link>

          <Link
            href="/alternatives"
            className="text-base font-medium text-slate-600 hover:text-orange-500 transition-colors"
          >
            Alternatives
          </Link>

          <Link
            href="/mission"
            className="text-base font-bold bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent border-b-2 border-transparent hover:border-orange-400 transition-all"
          >
            Our Mission
          </Link>
        </div>

        {/* Mobile Menu Placeholder (Optional) */}
        <div className="md:hidden text-slate-600">
          {/* You can add a Hamburger menu icon here later */}
          Menu
        </div>
      </div>
    </motion.nav>
  );
}
