"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Wallet,
  Briefcase,
  Gavel,
  Umbrella,
  AlertTriangle,
  BarChart3,
  BookOpen,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import PageTransition from "@/components/ui/PageTransition";

const stats = [
  { label: "Active Protocols", value: "32", color: "text-blue-500" },
  { label: "Compliance Status", value: "98%", color: "text-emerald-500" },
  { label: "Risk Exposure", value: "Low", color: "text-brand-accent" },
];

const cards = [
  {
    title: "Executive Charter",
    desc: "Foundational vision and mission alignment protocols.",
    icon: BookOpen,
    href: "/charter"
  },
  {
    title: "Corporate Governance",
    desc: "Board structures and delegation of authority matrices.",
    icon: Shield,
    href: "/governance"
  },
  {
    title: "Architecture Review",
    desc: "ARB gateways for design and technical excellence.",
    icon: Shield,
    href: "/arb"
  },
  {
    title: "Financial Governance",
    desc: "Capital allocation and project budget approval limits.",
    icon: Wallet,
    href: "/finance"
  },
  {
    title: "Sustainability & ESG",
    desc: "Carbon neutrality and ethical infrastructure delivery.",
    icon: Umbrella,
    href: "/sustainability"
  },
  {
    title: "Digital & Cybersecurity",
    desc: "Protecting BIM intellectual property and data integrity.",
    icon: Shield,
    href: "/cybersecurity"
  },
  {
    title: "Supply Chain",
    desc: "Material integrity and strategic vendor partnerships.",
    icon: Wallet,
    href: "/supplychain"
  },
  {
    title: "Project Oversight",
    desc: "Risk categorization and acceptance criteria for projects.",
    icon: Briefcase,
    href: "/oversight"
  },
];

export default function Home() {
  return (
    <PageTransition>
      <div className="space-y-12">
        {/* Hero Section */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-brand-accent font-semibold tracking-widest uppercase text-xs">
              Executive Portal
            </span>
            <h1 className="text-5xl mt-3 mb-6">
              Director’s Handbook <span className="text-brand-muted font-thin">/ Diqra</span>
            </h1>
            <p className="text-brand-muted text-lg max-w-2xl leading-relaxed">
              A premium digital framework for corporate governance, financial oversight,
              and strategic project control. This manual serves as the primary instrument
              for executive leadership.
            </p>
          </motion.div>
        </section>

        {/* Stats Bar */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          {stats.map((stat, i) => (
            <div key={i} className="bg-white border border-brand-charcoal/5 p-6 rounded-2xl shadow-sm">
              <p className="text-brand-muted text-xs font-semibold uppercase tracking-wider mb-2">
                {stat.label}
              </p>
              <p className={`text-2xl font-serif font-bold ${stat.color}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Grid Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl">Foundational Modules</h2>
            <Link href="/all" className="flex items-center gap-2 text-brand-muted hover:text-brand-accent transition-colors text-sm font-medium">
              View Sitemap <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.6 }}
              >
                <Link href={card.href} className="group block h-full bg-white border border-brand-charcoal/5 p-8 rounded-2xl hover:border-brand-accent/30 hover:shadow-xl hover:shadow-brand-accent/5 transition-all">
                  <div className="w-12 h-12 bg-brand-pearl rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-accent transition-colors">
                    <card.icon className="w-6 h-6 text-brand-charcoal" />
                  </div>
                  <h3 className="text-xl mb-3 group-hover:text-brand-accent transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-brand-muted text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
