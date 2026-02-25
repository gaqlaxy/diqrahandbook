"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Shield, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === "diqradirector") { // Simple placeholder for demo
            // Set secure cookie flags for production/HTTPS compatibility
            const maxAge = 60 * 60 * 24 * 7; // 7 days
            document.cookie = `auth=true; path=/; max-age=${maxAge}; SameSite=Lax; Secure`;
            router.push("/");
        } else {
            setError("Invalid credentials. Access denied.");
        }
    };

    return (
        <div className="fixed inset-0 bg-brand-pearl z-[100] flex items-center justify-center p-6">
            <motion.div
                className="w-full max-w-md bg-white border border-brand-charcoal/5 p-12 rounded-3xl shadow-2xl shadow-brand-charcoal/5"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-brand-charcoal rounded-2xl flex items-center justify-center mb-8">
                        <Shield className="w-8 h-8 text-brand-accent" />
                    </div>

                    <span className="text-brand-accent font-semibold tracking-widest uppercase text-[10px] mb-2">
                        Secure Access
                    </span>
                    <h1 className="text-3xl font-serif mb-4">
                        Director’s Handbook
                    </h1>
                    <p className="text-brand-muted text-sm mb-12">
                        This portal contains sensitive corporate governance and financial protocols.
                        Please enter your executive credentials to continue.
                    </p>

                    <form onSubmit={handleSubmit} className="w-full space-y-6">
                        <div className="relative group">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError("");
                                }}
                                placeholder="Enter Access Key"
                                className="w-full bg-brand-pearl border-none rounded-2xl px-6 py-4 text-center text-lg focus:ring-1 focus:ring-brand-accent/30 outline-none transition-all placeholder:text-brand-muted/50"
                            />
                            {error && (
                                <p className="text-red-500 text-xs font-medium mt-3">
                                    {error}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-brand-charcoal text-brand-pearl rounded-2xl py-4 font-bold flex items-center justify-center gap-2 hover:bg-brand-charcoal/90 transition-all group"
                        >
                            Verify Identity
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-12 pt-8 border-t border-brand-charcoal/5">
                        <p className="text-[10px] text-brand-muted uppercase tracking-widest font-medium">
                            Diqra Architecture + Infrastructure
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
