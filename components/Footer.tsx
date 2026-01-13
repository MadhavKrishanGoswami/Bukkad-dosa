"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUp } from "lucide-react";
import React, { useRef, MouseEvent } from "react";

function MagneticButton({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLButtonElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
    const xSpring = useSpring(x, springConfig);
    const ySpring = useSpring(y, springConfig);

    const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();

        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        x.set(middleX);
        y.set(middleY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={scrollToTop}
            style={{ x: xSpring, y: ySpring }}
            className="relative flex items-center justify-center w-20 h-20 bg-primary rounded-full text-secondary font-bold z-10 hover:scale-110 transition-transform"
        >
            {children}
        </motion.button>
    );
}

export default function Footer() {
    return (
        <footer className="w-full bg-secondary text-primary py-20 px-6 md:px-12 relative overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                <div className="flex-1 space-y-6">
                    <h2 className="text-6xl md:text-9xl font-black tracking-tighter leading-none">
                        BHUKKAD
                    </h2>
                    <div className="flex flex-col md:flex-row gap-8 text-lg font-medium opacity-80">
                        <a href="#" className="hover:text-white transition-colors">Instagram</a>
                        <a href="#" className="hover:text-white transition-colors">Zomato</a>
                        <a href="#" className="hover:text-white transition-colors">Swiggy</a>
                        <a href="#" className="hover:text-white transition-colors">Locations</a>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-6">
                    <MagneticButton>
                        <ArrowUp className="w-8 h-8" />
                    </MagneticButton>
                    <p className="text-sm opacity-50">
                        © {new Date().getFullYear()} Bhukkad Dosa. All Rights Reserved.
                    </p>
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-primary rounded-full opacity-5 blur-3xl pointer-events-none" />
        </footer>
    );
}
