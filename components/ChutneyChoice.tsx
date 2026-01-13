"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function ChutneyChoice() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Motion values for mouse position
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Different spring configs for stagger effect
    const springConfig1 = { stiffness: 150, damping: 15 };
    const springConfig2 = { stiffness: 100, damping: 20 };
    const springConfig3 = { stiffness: 50, damping: 25 };

    const x1 = useSpring(mouseX, springConfig1);
    const y1 = useSpring(mouseY, springConfig1);

    const x2 = useSpring(mouseX, springConfig2);
    const y2 = useSpring(mouseY, springConfig2);

    const x3 = useSpring(mouseX, springConfig3);
    const y3 = useSpring(mouseY, springConfig3);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        // Relative to container
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();

        // Check if mouse is within container happens automatically by event bubbling, 
        // but values should be relative to center or top-left?
        // Let's center the circles on the cursor.
        // Cursor position relative to container:
        const relativeX = e.clientX - rect.left;
        const relativeY = e.clientY - rect.top;

        mouseX.set(relativeX);
        mouseY.set(relativeY);
    };

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative w-full h-[80vh] bg-stone-100 overflow-hidden cursor-none flex flex-col items-center justify-center text-center"
        >
            <div className="z-10 pointer-events-none mix-blend-difference text-white px-4">
                <h2 className="text-6xl md:text-8xl font-black mb-4 uppercase">
                    Choose Your <br /> Flavor
                </h2>
                <p className="text-xl md:text-2xl font-light tracking-wide">
                    Move your cursor to mix the perfect chutney.
                </p>
            </div>

            {/* Circle 1: Green Chutney */}
            <motion.div
                aria-hidden="true"
                style={{ x: x1, y: y1, translateX: "-50%", translateY: "-50%" }}
                className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48 rounded-full bg-green-600 opacity-80 blur-xl pointer-events-none"
            />

            {/* Circle 2: Red Chutney */}
            <motion.div
                aria-hidden="true"
                style={{ x: x2, y: y2, translateX: "-50%", translateY: "-50%" }}
                className="absolute top-0 left-0 w-24 h-24 md:w-40 md:h-40 rounded-full bg-red-600 opacity-80 blur-xl pointer-events-none"
            />

            {/* Circle 3: Coconut/White Chutney */}
            <motion.div
                aria-hidden="true"
                style={{ x: x3, y: y3, translateX: "-50%", translateY: "-50%" }}
                className="absolute top-0 left-0 w-20 h-20 md:w-32 md:h-32 rounded-full bg-orange-400 opacity-80 blur-xl pointer-events-none"
            />

            {/* Fallback text if physics fail or for screen readers */}
            <span className="sr-only">Interactive section where customized cursors represent chutneys.</span>
        </section>
    );
}
