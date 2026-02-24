"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    Shield,
    Wallet,
    Briefcase,
    Gavel,
    Umbrella,
    AlertTriangle,
    BarChart3,
    BookOpen,
    Lock,
    Leaf,
    Truck,
    ArrowRight
} from "lucide-react";
import PageTransition from "@/components/ui/PageTransition";

const sitemapItems = [
    {
        group: "Strategic Foundations", items: [
            { name: "Executive Charter", href: "/charter", icon: BookOpen, desc: "Vision, Mission & Strategic Alignment" },
            { name: "Strategic Review", href: "/strategy", icon: BarChart3, desc: "Quarterly Performance & Expansion" },
        ]
    },
    {
        group: "Governance & Review", items: [
            { name: "Corporate Governance", href: "/governance", icon: Shield, desc: "Board Structure & Authority" },
            { name: "Architecture Review", href: "/arb", icon: Shield, desc: "Design Integrity & Technical Excellence" },
        ]
    },
    {
        group: "Operations & Finance", items: [
            { name: "Financial Governance", href: "/finance", icon: Wallet, desc: "Capital Allocation & Margin Control" },
            { name: "Project Oversight", href: "/oversight", icon: Briefcase, desc: "Risk Management & Acceptance" },
            { name: "Supply Chain", href: "/supplychain", icon: Truck, desc: "Vendor Governance & Material Integrity" },
        ]
    },
    {
        group: "Security & Legal", items: [
            { name: "Legal & Compliance", href: "/legal", icon: Gavel, desc: "Contract Integrity & Audit Trails" },
            { name: "Digital & Cyber", href: "/cybersecurity", icon: Lock, desc: "BIM Data & Client Intelligence" },
        ]
    },
    {
        group: "Risk & Reputation", items: [
            { name: "Sustainability & ESG", href: "/sustainability", icon: Leaf, desc: "Environmental Stewardship" },
            { name: "Brand & Reputation", href: "/brand", icon: Umbrella, desc: "Media Protocol & Public Integrity" },
            { name: "Crisis Management", href: "/crisis", icon: AlertTriangle, desc: "Emergency Protocols & Response" },
        ]
    },
];

export default function SitemapPage() {
    return (
        <PageTransition>
            <div className="space-y-12">
                <header className="border-b border-brand-charcoal/5 pb-8">
                    <span className="text-brand-accent font-semibold tracking-widest uppercase text-xs">
                        Navigation Map
                    </span>
                    <h1 className="text-5xl font-serif mt-2 mb-4">Handbook Sitemap</h1>
                    <p className="text-brand-muted text-lg max-w-2xl leading-relaxed">
                        A comprehensive directory of all executive protocols and governance frameworks
                        within the Diqra Director's Handbook.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {sitemapItems.map((group, i) => (
                        <motion.section
                            key={group.group}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * i }}
                            className="space-y-6"
                        >
                            <h2 className="text-sm font-bold uppercase tracking-widest text-brand-muted flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-brand-accent" />
                                {group.group}
                            </h2>
                            <ul className="space-y-4">
                                {group.items.map((item) => (
                                    <li key={item.name}>
                                        <Link href={item.href} className="flex items-start gap-4 p-4 rounded-xl hover:bg-white border border-transparent hover:border-brand-charcoal/5 transition-all group">
                                            <div className="w-10 h-10 bg-brand-pearl rounded-lg flex items-center justify-center group-hover:bg-brand-accent transition-colors">
                                                <item.icon className="w-5 h-5 text-brand-charcoal" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-brand-charcoal group-hover:text-brand-accent transition-colors">
                                                    {item.name}
                                                </h3>
                                                <p className="text-xs text-brand-muted mt-1">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.section>
                    ))}
                </div>
            </div>
        </PageTransition>
    );
}
