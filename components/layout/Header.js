"use client";

import React, { useState, useEffect } from "react";
import { Search, Bell, Clock, LogOut, Menu } from "lucide-react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";

export default function Header({ sidebarOpen, setSidebarOpen }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const timer = setInterval(() => setCurrentDate(new Date()), 60000);

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => {
            clearInterval(timer);
            unsubscribe();
        };
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            await fetch("/api/auth/session", { method: "DELETE" });
            router.push("/login");
            router.refresh();
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const getInitials = (email) => {
        if (!email) return "??";
        return email.substring(0, 2).toUpperCase();
    };

    return (
        <header className="h-20 sticky top-0 z-40 bg-brand-pearl/80 backdrop-blur-md border-b border-brand-charcoal/5 flex items-center justify-between px-4 md:px-8">
            <div className="flex items-center gap-3 md:gap-4">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-lg hover:bg-brand-charcoal/5 transition-colors lg:hidden"
                    aria-label="Toggle Menu"
                >
                    <Menu className="w-5 h-5 text-brand-muted" />
                </button>

                <div className="hidden sm:flex items-center gap-4 text-brand-muted">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">
                        {format(currentDate, "EEEE, MMMM do | HH:mm")}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-3 md:gap-6">
                <div className="relative group hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted group-focus-within:text-brand-accent transition-colors" />
                    <input
                        type="text"
                        placeholder="Search protocols..."
                        className="bg-brand-charcoal/5 border-none rounded-full pl-10 pr-6 py-2 text-sm w-48 lg:w-64 focus:ring-1 focus:ring-brand-accent/30 transition-all outline-none"
                    />
                    <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded border border-brand-charcoal/10 text-[10px] font-medium text-brand-muted bg-white pointer-events-none">
                        ⌘K
                    </kbd>
                </div>

                <div className="hidden xl:flex items-center gap-2 mr-2">
                    <a
                        href="https://diqraarchitects.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-brand-charcoal/10 hover:bg-brand-charcoal hover:text-brand-pearl transition-all"
                    >
                        Architecture
                    </a>
                    <a
                        href="https://diqrainfrastructure.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-brand-charcoal/10 hover:bg-brand-charcoal hover:text-brand-pearl transition-all"
                    >
                        Infrastructure
                    </a>
                </div>

                <div className="hidden md:block h-8 w-px bg-brand-charcoal/5" />

                <div className="flex items-center gap-2 md:gap-4">
                    <button className="relative p-2 rounded-full hover:bg-brand-charcoal/5 transition-colors hidden sm:block">
                        <Bell className="w-5 h-5 text-brand-muted" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-brand-accent rounded-full border-2 border-brand-pearl" />
                    </button>

                    <div className="flex items-center gap-3 pl-0 sm:pl-2">
                        {!loading && user ? (
                            <button className="flex items-center gap-3 p-1.5 rounded-full hover:bg-brand-charcoal/5 transition-colors group">
                                <div className="w-8 h-8 rounded-full bg-brand-charcoal text-brand-pearl flex items-center justify-center font-bold text-xs ring-2 ring-transparent group-hover:ring-brand-accent/30 transition-all uppercase">
                                    {getInitials(user.email)}
                                </div>
                                <div className="hidden lg:block text-left">
                                    <p className="text-xs font-bold leading-none truncate max-w-[120px]">
                                        {user.displayName || user.email.split('@')[0]}
                                    </p>
                                    <p className="text-[10px] text-brand-muted font-medium">Executive User</p>
                                </div>
                            </button>
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-brand-charcoal/10 animate-pulse" />
                        )}

                        <button
                            onClick={handleLogout}
                            className="p-2 rounded-full hover:bg-red-50 text-brand-muted hover:text-red-500 transition-colors"
                            title="Sign Out"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
