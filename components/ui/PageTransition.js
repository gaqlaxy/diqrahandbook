"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

export default function PageTransition({ children }) {
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            const elements = containerRef.current.children;

            gsap.fromTo(
                elements,
                {
                    opacity: 0,
                    y: 20
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out"
                }
            );
        }
    }, []);

    return (
        <div ref={containerRef}>
            {children}
        </div>
    );
}
