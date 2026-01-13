"use client";

import { motion } from "framer-motion";

export default function Marquee() {
    const marqueeText = "LUCKNOW'S REVOLUTIONARY DOSA — ";

    return (
        <div className="w-full bg-primary py-12 overflow-hidden flex items-center relative z-20 border-y-4 border-secondary">
            <div className="flex w-full whitespace-nowrap">
                <motion.div
                    className="flex flex-shrink-0"
                    animate={{ x: "-100%" }}
                    transition={{
                        repeat: Infinity,
                        duration: 20,
                        ease: "linear",
                    }}
                >
                    {[...Array(3)].map((_, i) => (
                        <span
                            key={i}
                            className="text-8xl md:text-9xl font-black uppercase text-transparent tracking-tighter mr-8"
                            style={{
                                WebkitTextStroke: "2px #1A5319",
                            }}
                        >
                            {marqueeText}
                        </span>
                    ))}
                </motion.div>
                <motion.div
                    className="flex flex-shrink-0"
                    animate={{ x: "-100%" }}
                    transition={{
                        repeat: Infinity,
                        duration: 20,
                        ease: "linear",
                    }}
                >
                    {[...Array(3)].map((_, i) => (
                        <span
                            key={`dup-${i}`}
                            className="text-8xl md:text-9xl font-black uppercase text-transparent tracking-tighter mr-8"
                            style={{
                                WebkitTextStroke: "2px #1A5319",
                            }}
                        >
                            {marqueeText}
                        </span>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
