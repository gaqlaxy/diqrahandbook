"use client";

import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import CommandPalette from "@/components/ui/CommandPalette";
import { cn } from "@/lib/utils";

export default function HandbookLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex min-h-screen bg-brand-pearl overflow-x-hidden">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            <CommandPalette />

            <main className={cn(
                "flex-1 transition-all duration-300 ease-in-out min-h-screen flex flex-col",
                sidebarOpen ? "lg:pl-72" : "lg:pl-20"
            )}>
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <div className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-8 py-8 md:py-12">
                    {children}
                </div>
            </main>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-brand-charcoal/20 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
}
