"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { GraduationCap, Presentation, Landmark, ArrowRight, UserCircle2 } from "lucide-react";

const roles = [
  {
    id: "student",
    title: "Student",
    description: "Join quests, learn digital repair, and earn badges for your profile.",
    icon: <GraduationCap className="w-10 h-10" />,
    color: "bg-emerald-50 text-emerald-600 border-emerald-200",
    hover: "group-hover:bg-emerald-600 group-hover:text-white",
    shadow: "hover:shadow-emerald-500/20",
  },
  {
    id: "teacher",
    title: "Teacher",
    description: "Create classrooms, track student progress, and assign eco-challenges.",
    icon: <Presentation className="w-10 h-10" />,
    color: "bg-cyan-50 text-cyan-600 border-cyan-200",
    hover: "group-hover:bg-cyan-600 group-hover:text-white",
    shadow: "hover:shadow-cyan-500/20",
  },
  {
    id: "university",
    title: "University",
    description: "Manage campus e-waste, organize events, and verify student certifications.",
    icon: <Landmark className="w-10 h-10" />,
    color: "bg-violet-50 text-violet-600 border-violet-200",
    hover: "group-hover:bg-violet-600 group-hover:text-white",
    shadow: "hover:shadow-violet-500/20",
  },
];

export default function RoleSelectionPage() {
  const router = useRouter();

  const handleRoleSelect = (roleId: string) => {
    // Navigate to sign-up with the role as a query parameter
    router.push(`/auth/sign-up?role=${roleId}`);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-50 relative overflow-hidden p-6">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:30px_30px]"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-400/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-violet-400/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Header Content */}
      <div className="relative z-10 text-center mb-12 max-w-2xl">
        
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight"
        >
          Choose Your Path
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 text-lg"
        >
          Select your role to access the specific tools and missions designed for you.
        </motion.p>
      </div>

      {/* Cards Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
        {roles.map((role, index) => (
          <motion.div
            key={role.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + (index * 0.1) }}
          >
            <button
              onClick={() => handleRoleSelect(role.id)}
              className={`group relative w-full h-full text-left p-8 rounded-3xl bg-white border transition-all duration-300 ${role.shadow} hover:-translate-y-2 hover:border-transparent ring-0 focus:ring-2 focus:ring-offset-2 focus:ring-slate-900`}
            >
              {/* Icon Bubble */}
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${role.color} ${role.hover}`}>
                {role.icon}
              </div>

              {/* Text */}
              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-slate-800">
                {role.title}
              </h3>
              <p className="text-slate-500 leading-relaxed mb-8">
                {role.description}
              </p>

              {/* Fake 'Button' at bottom of card */}
              <div className="flex items-center gap-2 font-bold text-sm text-slate-400 group-hover:text-slate-900 transition-colors">
                Continue as {role.title} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </motion.div>
        ))}
      </div>
      
      

    </main>
  );
}