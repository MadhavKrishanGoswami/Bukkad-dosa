"use client";

import Image from "next/image";
import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Placeholder from "./ui/Placeholder";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const circleRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=150%",
                    scrub: 1,
                    pin: true,
                },
            });

            // Animate clip-path
            tl.to(circleRef.current, {
                clipPath: "circle(150% at 50% 50%)",
                ease: "power2.inOut",
            })
                .to(textRef.current, {
                    opacity: 0,
                    y: -100,
                    scale: 0.8,
                    ease: "power2.inOut"
                }, 0);
        });

        // Mobile fallback (simpler or no pin)
        mm.add("(max-width: 767px)", () => {
            // Maybe just simple reveal or static 
            gsap.set(circleRef.current, { clipPath: "circle(100% at 50% 50%)" });
        });

        return () => mm.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-primary">
            {/* Background Layer (The Image to Reveal) */}
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                <div
                    ref={circleRef}
                    className="w-full h-full flex items-center justify-center bg-background"
                    style={{
                        clipPath: "circle(15% at 50% 50%)"
                    }}
                >
                    <div className="w-screen h-screen relative">
                        <Image
                            src="/images/hero-bg.png"
                            alt="Bhukkad Dosa Main Visual"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </div>

            {/* Foreground Content (Logo / Brand) */}
            <div ref={textRef} className="relative z-10 text-center pointer-events-none">
                <div className="w-64 h-64 md:w-96 md:h-96 mx-auto mb-4 relative">
                    <Image
                        src="/images/logo.png"
                        alt="Bhukkad Dosa Logo"
                        fill
                        className="object-contain drop-shadow-2xl"
                        priority
                    />
                </div>
            </div>
        </section>
    );
}
