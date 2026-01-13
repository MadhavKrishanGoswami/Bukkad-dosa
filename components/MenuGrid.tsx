"use client";

import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import Placeholder from "./ui/Placeholder";
import { ArrowUpRight } from "lucide-react";

const ROTATION_RANGE = 20.5;
const HALF_ROTATION_RANGE = 20.5 / 2;

const TiltCard = ({
    children,
    className
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x);
    const ySpring = useSpring(y);

    const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
        const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

        const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
        const rY = mouseX / width - HALF_ROTATION_RANGE;

        x.set(rX);
        y.set(rY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: "preserve-3d",
                transform,
            }}
            className={`relative w-full h-full rounded-2xl bg-white border border-secondary/10 shadow-lg overflow-hidden cursor-pointer group ${className}`}
        >
            <div
                style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
                className="absolute inset-0 flex flex-col p-6 z-10 pointer-events-none"
            >
                {children}
            </div>

            {/* Background Accent */}
            <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-100 group-hover:opacity-90 transition-opacity" />
        </motion.div>
    );
};

const menuItems = [
    { id: 1, label: "CLASSIC_MASALA", span: "md:col-span-2 md:row-span-2", height: "h-full" },
    { id: 2, label: "PANEER_BUTTER", span: "md:col-span-1 md:row-span-1", height: "h-48" },
    { id: 3, label: "CHEESE_CORN", span: "md:col-span-1 md:row-span-1", height: "h-48" },
    { id: 4, label: "MYSORE_DELAY", span: "md:col-span-2 md:row-span-1", height: "h-48" },
    { id: 5, label: "JINI_DOSA", span: "md:col-span-2 md:row-span-1", height: "h-48" },
];

export default function MenuGrid() {
    return (
        <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto bg-background">
            <div className="mb-16 text-center">
                <h2 className="text-5xl md:text-7xl font-bold text-secondary mb-4">OUR MENU</h2>
                <p className="text-xl text-secondary/70">Crafted with passion, served with love.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-auto">
                {menuItems.map((item) => (
                    <div key={item.id} className={item.span}>
                        <TiltCard className="h-full min-h-[300px]">
                            <div className="flex flex-col justify-between h-full">
                                <div className="flex justify-between items-start">
                                    <span className="bg-primary text-secondary px-3 py-1 rounded-full text-xs font-bold font-mono">
                                        #0{item.id}
                                    </span>
                                    <ArrowUpRight className="text-secondary w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>

                                <div className="flex-1 flex items-center justify-center my-4">
                                    <Placeholder label={item.label} height="h-32" className="bg-transparent border-secondary/20" />
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold text-secondary uppercase tracking-tight">
                                        {item.label.replace('_', ' ')}
                                    </h3>
                                    <p className="text-sm font-medium text-secondary/60 mt-1">
                                        Crunchy perfection
                                    </p>
                                </div>
                            </div>
                        </TiltCard>
                    </div>
                ))}
                {/* Fillers to ensure grid looks good if needed, but the Span logic handles it. 
            Row 1: Item 1 (2x2), Item 2 (1x1), Item 3 (1x1) -> 4 cols.
            Row 2: Item 1 (cont), Item 4 (2x1) -> Wait. Item 1 is 2 rows. 
                   So implicitly:
                   Col 1-2, Row 1-2: Item 1.
                   Col 3, Row 1: Item 2.
                   Col 4, Row 1: Item 3.
                   Col 3-4, Row 2: Item 4.
                   Item 5 (2x1) -> Next row?
            Let's check grid flow.
            Grid Auto Flow is row by default.
            It will attempt to fit.
            If Item 1 is 2cols, 2rows.
            Grid looks like:
            [ 1 1 2 3 ]
            [ 1 1 4 4 ]
            [ 5 5 . . ] -> Item 5 is 2 cols.
        */}
            </div>
        </section>
    );
}
