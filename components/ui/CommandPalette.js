"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FileText, Shield, Wallet, Briefcase, Gavel, Umbrella, AlertTriangle, BarChart3, BookOpen, Lock, Leaf, Truck } from "lucide-react";
import { useRouter } from "next/navigation";

const items = [
    { name: "Executive Charter", slug: "charter", icon: BookOpen },
    { name: "Corporate Governance", slug: "governance", icon: Shield },
    { name: "Architecture Review", slug: "arb", icon: Shield },
    { name: "Financial Governance", slug: "finance", icon: Wallet },
    { name: "Project Oversight", slug: "oversight", icon: Briefcase },
    { name: "Sustainability & ESG", slug: "sustainability", icon: Leaf },
    { name: "Legal & Compliance", slug: "legal", icon: Gavel },
    { name: "Digital & Cyber", slug: "cybersecurity", icon: Lock },
    { name: "Supply Chain", slug: "supplychain", icon: Truck },
    { name: "Brand & Reputation", slug: "brand", icon: Umbrella },
    { name: "Crisis Management", slug: "crisis", icon: AlertTriangle },
    { name: "Strategic Review", slug: "strategy", icon: BarChart3 },
];

export default function CommandPalette() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const router = useRouter();

    useEffect(() => {
        const down = (e) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const filteredItems = query === ""
        ? items
        : items.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));

    const handleSelect = (slug) => {
        router.push(`/${slug}`);
        setOpen(false);
        setQuery("");
    };

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                        className="fixed inset-0 bg-brand-charcoal/40 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-brand-charcoal/10"
                    >
                        <div className="flex items-center px-4 border-b border-brand-charcoal/5">
                            <Search className="w-5 h-5 text-brand-muted" />
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search handbook protocols..."
                                className="w-full px-4 py-6 text-lg outline-none bg-transparent"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <kbd className="hidden sm:inline-block px-2 py-1 rounded border border-brand-charcoal/10 text-[10px] uppercase font-bold text-brand-muted bg-brand-pearl">
                                ESC
                            </kbd>
                        </div>

                        <div className="max-h-[60vh] overflow-y-auto p-2">
                            {filteredItems.length > 0 ? (
                                <div className="grid gap-1">
                                    {filteredItems.map((item) => (
                                        <button
                                            key={item.slug}
                                            onClick={() => handleSelect(item.slug)}
                                            className="w-full flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-brand-pearl group transition-colors text-left"
                                        >
                                            <div className="w-10 h-10 bg-brand-pearl rounded-lg flex items-center justify-center group-hover:bg-brand-accent transition-colors">
                                                <item.icon className="w-5 h-5 text-brand-charcoal" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-brand-charcoal">
                                                    {item.name}
                                                </p>
                                                <p className="text-xs text-brand-muted">
                                                    View protocol details
                                                </p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-8 text-center text-brand-muted italic">
                                    No protocols found matching "{query}"
                                </div>
                            )}
                        </div>

                        <div className="bg-brand-pearl px-4 py-3 flex items-center justify-between text-[10px] text-brand-muted font-bold uppercase tracking-widest">
                            <span>Diqra | Executive Control</span>
                            <span>Search Mode</span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
