"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, ArrowRight, Mail, Lock, UserPlus, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
    const [mode, setMode] = useState("login"); // 'login' or 'signup'
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            let userCredential;
            if (mode === "login") {
                userCredential = await signInWithEmailAndPassword(auth, email, password);
            } else {
                userCredential = await createUserWithEmailAndPassword(auth, email, password);
            }

            const idToken = await userCredential.user.getIdToken();

            // Set secure session cookie via our API route
            const response = await fetch("/api/auth/session", {
                method: "POST",
                body: JSON.stringify({ idToken }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                router.push("/");
                router.refresh();
            } else {
                setError("Failed to establish session. Please try again.");
            }
        } catch (err) {
            console.error("Auth error:", err);
            if (err.code === "auth/invalid-credential") {
                setError("Invalid email or password. Access denied.");
            } else if (err.code === "auth/email-already-in-use") {
                setError("This email is already registered. Please login instead.");
            } else if (err.code === "auth/weak-password") {
                setError("Password is too weak. Please use at least 6 characters.");
            } else {
                setError("An error occurred during authentication.");
            }
        } finally {
            setLoading(false);
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
                        {mode === "login" ? "Executive Access" : "Create Account"}
                    </span>
                    <h1 className="text-3xl font-serif mb-4">
                        Director’s Handbook
                    </h1>
                    <p className="text-brand-muted text-sm mb-12">
                        {mode === "login"
                            ? "Authenticating against the corporate directory."
                            : "Registering new executive credentials."}
                        <br />Please enter your details to continue.
                    </p>

                    <form onSubmit={handleSubmit} className="w-full space-y-4">
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Executive Email"
                                required
                                className="w-full bg-brand-pearl border-none rounded-2xl pl-12 pr-6 py-4 focus:ring-1 focus:ring-brand-accent/30 outline-none transition-all placeholder:text-brand-muted/50"
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError("");
                                }}
                                placeholder="Access Key"
                                required
                                className="w-full bg-brand-pearl border-none rounded-2xl pl-12 pr-6 py-4 focus:ring-1 focus:ring-brand-accent/30 outline-none transition-all placeholder:text-brand-muted/50"
                            />
                        </div>

                        {error && (
                            <p className="text-red-500 text-xs font-medium mt-2">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-4 bg-brand-charcoal text-brand-pearl rounded-2xl py-4 font-bold flex items-center justify-center gap-2 hover:bg-brand-charcoal/90 transition-all group disabled:opacity-50"
                        >
                            {loading ? "Verifying..." : mode === "login" ? "Verify Identity" : "Register Account"}
                            {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>

                    <button
                        onClick={() => {
                            setMode(mode === "login" ? "signup" : "login");
                            setError("");
                        }}
                        className="mt-6 text-brand-muted hover:text-brand-accent text-xs font-medium transition-colors flex items-center gap-2"
                    >
                        {mode === "login" ? (
                            <>
                                <UserPlus className="w-3.5 h-3.5" />
                                Don't have an account? Sign up
                            </>
                        ) : (
                            <>
                                <LogIn className="w-3.5 h-3.5" />
                                Already have an account? Log in
                            </>
                        )}
                    </button>

                    <div className="mt-12 pt-8 border-t border-brand-charcoal/5 w-full">
                        <p className="text-[10px] text-brand-muted uppercase tracking-widest font-medium">
                            Diqra Architecture + Infrastructure
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
