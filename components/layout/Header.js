"use client";

import React from "react";
import { Search, Bell, User, Clock } from "lucide-react";
import { format } from "date-fns";

export default function Header({ sidebarOpen }) {
    const [currentDate, setCurrentDate] = React.useState(new Date());

    React.useEffect(() => {
        const timer = setInterval(() => setCurrentDate(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    return (
        <header className="h-20 sticky top-0 z-40 bg-brand-pearl/80 backdrop-blur-md border-b border-brand-charcoal/5 flex items-center justify-between px-8">
            <div className="flex items-center gap-4 text-brand-muted">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">
                    {format(currentDate, "EEEE, MMMM do | HH:mm")}
                </span>
            </div>

            <div className="flex items-center gap-6">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted group-focus-within:text-brand-accent transition-colors" />
                    <input
                        type="text"
                        placeholder="Search protocols..."
                        className="bg-brand-charcoal/5 border-none rounded-full pl-10 pr-6 py-2 text-sm w-64 focus:ring-1 focus:ring-brand-accent/30 transition-all outline-none"
                    />
                    <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded border border-brand-charcoal/10 text-[10px] font-medium text-brand-muted bg-white pointer-events-none">
                        ⌘K
                    </kbd>
                </div>

                <div className="flex items-center gap-2 mr-2">
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

                <div className="h-8 w-px bg-brand-charcoal/5" />

                <div className="flex items-center gap-4">
                    <button className="relative p-2 rounded-full hover:bg-brand-charcoal/5 transition-colors">
                        <Bell className="w-5 h-5 text-brand-muted" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-brand-accent rounded-full border-2 border-brand-pearl" />
                    </button>
                    <button className="flex items-center gap-3 p-1.5 rounded-full hover:bg-brand-charcoal/5 transition-colors group">
                        <div className="w-8 h-8 rounded-full bg-brand-charcoal text-brand-pearl flex items-center justify-center font-bold text-xs ring-2 ring-transparent group-hover:ring-brand-accent/30 transition-all">
                            JD
                        </div>
                        <div className="hidden lg:block text-left">
                            <p className="text-xs font-bold leading-none">John Director</p>
                            <p className="text-[10px] text-brand-muted font-medium">Managing Partner</p>
                        </div>
                    </button>
                </div>
            </div>
        </header>
    );
}
