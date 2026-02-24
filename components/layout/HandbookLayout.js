"use client";

import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import CommandPalette from "@/components/ui/CommandPalette";
import { cn } from "@/lib/utils";

export default function HandbookLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex min-h-screen bg-brand-pearl">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            <CommandPalette />

            <main className={cn(
                "flex-1 transition-all duration-300 ease-in-out",
                sidebarOpen ? "pl-72" : "pl-20"
            )}>
                <Header sidebarOpen={sidebarOpen} />
                <div className="max-w-4xl mx-auto px-8 py-12">
                    {children}
                </div>
            </main>
        </div>
    );
}
