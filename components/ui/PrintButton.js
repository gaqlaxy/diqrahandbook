"use client";

import React from "react";
import { Printer } from "lucide-react";

export default function PrintButton() {
    return (
        <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-brand-charcoal text-brand-pearl px-5 py-2.5 rounded-full text-sm font-bold hover:bg-brand-charcoal/90 transition-all active:scale-95 shadow-lg shadow-brand-charcoal/10"
        >
            <Printer className="w-4 h-4" />
            Export to PDF
        </button>
    );
}
