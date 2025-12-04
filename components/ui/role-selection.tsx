"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Building2, ArrowRight } from "lucide-react";

export const RoleSelection = () => {
    return (
        <section className="w-full max-w-7xl mx-auto px-4 py-24">
            <div className="text-center mb-16">
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-600 text-sm font-bold mb-4 tracking-wide uppercase"
                >
                    Rejoignez l'aventure
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-black text-slate-900 mb-6"
                >
                    Choisis ton <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-600">Personnage</span>
                </motion.h2>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                    Chaque héros a un rôle à jouer dans la résistance numérique. Quel sera le tien ?
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <RoleCard
                    icon={<GraduationCap className="w-12 h-12" />}
                    title="Élève / Éco-délégué"
                    desc="Je veux agir pour la planète et apprendre à coder librement."
                    color="from-blue-400 to-blue-600"
                    stats={["Curiosité", "Hack", "Futur"]}
                />
                <RoleCard
                    icon={<BookOpen className="w-12 h-12" />}
                    title="Enseignant"
                    desc="Je veux des outils pédagogiques libres et éthiques pour ma classe."
                    color="from-emerald-400 to-emerald-600"
                    stats={["Pédagogie", "Partage", "Éthique"]}
                />
                <RoleCard
                    icon={<Building2 className="w-12 h-12" />}
                    title="Direction / Admin"
                    desc="Je veux réduire les coûts et sécuriser les données de mon école."
                    color="from-purple-400 to-purple-600"
                    stats={["Gestion", "Sécurité", "Budget"]}
                />
            </div>
        </section>
    );
};

const RoleCard = ({ icon, title, desc, color, stats }: { icon: any, title: string, desc: string, color: string, stats: string[] }) => {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="relative group cursor-pointer"
        >
            <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`} />
            <div className="relative h-full bg-white border-2 border-slate-100 group-hover:border-transparent rounded-3xl p-8 shadow-sm group-hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center">

                <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {icon}
                </div>

                <h3 className="text-2xl font-bold text-slate-800 mb-3">{title}</h3>
                <p className="text-slate-500 mb-8 leading-relaxed">{desc}</p>

                <div className="w-full mt-auto space-y-4">
                    <div className="flex justify-center gap-2 flex-wrap">
                        {stats.map((stat, i) => (
                            <span key={i} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full uppercase tracking-wider">
                                {stat}
                            </span>
                        ))}
                    </div>

                    <button className={`w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r ${color} opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg`}>
                        Commencer la Quête <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};
