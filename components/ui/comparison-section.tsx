"use client";

import React from "react";
import { motion } from "framer-motion";
import { XCircle, CheckCircle, AlertTriangle, ShieldCheck } from "lucide-react";

export const ComparisonSection = () => {
    return (
        <section className="w-full max-w-6xl mx-auto px-4 py-20">
            <div className="text-center mb-16 space-y-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold text-slate-900"
                >
                    Le Piège des GAFAM vs <span className="text-emerald-600">La Résistance</span>
                </motion.h2>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                    Pourquoi votre école doit changer de camp maintenant.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {/* BIG TECH SIDE */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="relative group"
                >
                    <div className="absolute inset-0 bg-red-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative h-full bg-white/50 backdrop-blur-sm border border-red-100 rounded-3xl p-8 shadow-lg hover:shadow-red-100/50 transition-all duration-300">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-red-100 rounded-2xl">
                                <AlertTriangle className="w-8 h-8 text-red-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800">L'Empire Big Tech</h3>
                        </div>

                        <ul className="space-y-6">
                            <ListItem
                                icon={<XCircle className="w-6 h-6 text-red-500" />}
                                title="Obsolescence Programmée"
                                desc="Fin de Windows 10 = Des milliers de PC jetés."
                            />
                            <ListItem
                                icon={<XCircle className="w-6 h-6 text-red-500" />}
                                title="Coûts Cachés"
                                desc="Licences chères et abonnements forcés."
                            />
                            <ListItem
                                icon={<XCircle className="w-6 h-6 text-red-500" />}
                                title="Données Captives"
                                desc="Vos données partent aux USA, hors contrôle."
                            />
                        </ul>
                    </div>
                </motion.div>

                {/* NIRD SIDE */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative group"
                >
                    <div className="absolute inset-0 bg-emerald-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative h-full bg-gradient-to-br from-emerald-50 to-teal-50/50 backdrop-blur-sm border border-emerald-200 rounded-3xl p-8 shadow-xl hover:shadow-emerald-200/50 transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-emerald-100 rounded-2xl">
                                <ShieldCheck className="w-8 h-8 text-emerald-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-emerald-900">Le Village NIRD</h3>
                        </div>

                        <ul className="space-y-6">
                            <ListItem
                                icon={<CheckCircle className="w-6 h-6 text-emerald-600" />}
                                title="Durabilité Maximale"
                                desc="Linux fait revivre vos vieux ordinateurs."
                                isGood
                            />
                            <ListItem
                                icon={<CheckCircle className="w-6 h-6 text-emerald-600" />}
                                title="Liberté Totale"
                                desc="Logiciels gratuits, ouverts et modifiables."
                                isGood
                            />
                            <ListItem
                                icon={<CheckCircle className="w-6 h-6 text-emerald-600" />}
                                title="Souveraineté"
                                desc="Vos données restent à l'école, protégées."
                                isGood
                            />
                        </ul>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const ListItem = ({ icon, title, desc, isGood = false }: { icon: any, title: string, desc: string, isGood?: boolean }) => (
    <li className="flex gap-4 items-start">
        <div className="mt-1 shrink-0">{icon}</div>
        <div>
            <h4 className={`font-bold text-lg ${isGood ? 'text-emerald-900' : 'text-slate-700'}`}>{title}</h4>
            <p className="text-slate-500 leading-relaxed">{desc}</p>
        </div>
    </li>
);
