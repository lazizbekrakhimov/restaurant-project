"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const PageLoader = () => {
    const [visible, setVisible] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const handleLoad = () => {
            setTimeout(() => {
                setFadeOut(true);
                setTimeout(() => setVisible(false), 600);
            }, 300);
        };

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
            return () => window.removeEventListener("load", handleLoad);
        }
    }, []);

    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center" style={{ background: "rgba(255, 248, 240, 0.92)", backdropFilter: "blur(20px)", transition: "opacity 0.6s ease, transform 0.6s ease", opacity: fadeOut ? 0 : 1, pointerEvents: fadeOut ? "none" : "all", }} >
            <div className="absolute inset-0 z-0 overflow-hidden">
                <Image src="/images/bbgg.png" alt="" fill className="object-cover scale-110" style={{ filter: "blur(24px)", opacity: 0.4 }} priority />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-8">
                <div className="text-6xl font-black text-black tracking-tight" style={{ animation: "logoPulse 1.6s ease-in-out infinite", }} >
                    LOGO
                </div>

                <div className="flex items-center gap-3">
                    {[0, 1, 2].map((i) => (
                        <div key={i} className="w-2.5 h-2.5 rounded-full bg-black/30" style={{ animation: `dotBounce 1.2s ease-in-out infinite`, animationDelay: `${i * 0.2}s`, }} />
                    ))}
                </div>

                <div className="absolute -top-16 -right-54 w-35 h-50 pointer-events-none select-none" style={{ animation: "leafSway 3s ease-in-out infinite" }}>
                    <Image src="/images/leaf.png" alt="" fill className="object-contain" style={{ opacity: 0.7, transform: "rotate(-20deg)" }} />
                </div>
                <div className="absolute -bottom-14 -left-50 w-35 h-50 pointer-events-none select-none" style={{ animation: "leafSway 3s ease-in-out infinite", animationDelay: "1.5s" }}>
                    <Image src="/images/leaf.png" alt="" fill className="object-contain" style={{ opacity: 0.6, transform: "rotate(30deg)" }} />
                </div>
            </div>

        </div>
    );
};

export default PageLoader;