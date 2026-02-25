"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Menu,
    ChevronLeft,
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
    Truck
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Executive Charter", href: "/charter", icon: BookOpen },
    { name: "Corporate Governance", href: "/governance", icon: Shield },
    { name: "Architecture Review", href: "/arb", icon: Shield },
    { name: "Financial Governance", href: "/finance", icon: Wallet },
    { name: "Project Oversight", href: "/oversight", icon: Briefcase },
    { name: "Sustainability & ESG", href: "/sustainability", icon: Leaf },
    { name: "Legal & Compliance", href: "/legal", icon: Gavel },
    { name: "Digital & Cyber", href: "/cybersecurity", icon: Lock },
    { name: "Supply Chain", href: "/supplychain", icon: Truck },
    { name: "Brand & Reputation", href: "/brand", icon: Umbrella },
    { name: "Crisis Management", href: "/crisis", icon: AlertTriangle },
    { name: "Strategic Review", href: "/strategy", icon: BarChart3 },
];

export default function Sidebar({ isOpen, setIsOpen }) {
    const pathname = usePathname();

    return (
        <aside className={cn(
            "fixed left-0 top-0 h-full bg-brand-charcoal text-brand-pearl transition-all duration-300 ease-in-out z-50",
            isOpen ? "w-72" : "w-20"
        )}>
            <div className="flex flex-col h-full">
                {/* Logo Section */}
                <div className="h-20 flex items-center px-6 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-brand-accent rounded flex items-center justify-center font-serif font-bold text-brand-charcoal">
                            D
                        </div>
                        {isOpen && (
                            <span className="font-serif font-semibold text-lg tracking-widest uppercase">
                                Diqra
                            </span>
                        )}
                    </div>
                </div>

                {/* Navigation Section */}
                <nav className="flex-1 py-8 overflow-y-auto custom-scrollbar">
                    <ul className="space-y-1 px-3">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-4 px-3 py-3 rounded-lg transition-all group",
                                        pathname === item.href
                                            ? "bg-brand-accent text-brand-charcoal"
                                            : "hover:bg-white/5 text-brand-pearl/60 hover:text-brand-pearl"
                                    )}
                                >
                                    <item.icon className={cn("w-5 h-5 shrink-0", pathname === item.href ? "text-brand-charcoal" : "group-hover:text-brand-accent")} />
                                    {isOpen && (
                                        <span className="text-sm font-medium tracking-wide">
                                            {item.name}
                                        </span>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Toggle Button */}
                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                        {isOpen ? <ChevronLeft className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>
        </aside>
    );
}
