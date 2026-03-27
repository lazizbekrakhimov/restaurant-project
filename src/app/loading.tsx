import Image from "next/image";

const Loading = () => {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <Image src="/images/bbgg.png" alt="" fill className="object-cover" priority />

            <div className="absolute inset-0 z-1" style={{ backdropFilter: "blur(20px)", background: "rgba(255, 248, 240, 0.45)" }} />

            <div className="absolute top-16 right-17.5 w-40 h-60 pointer-events-none select-none z-2" style={{ animation: "leafSway 3s ease-in-out infinite" }}>
                <Image src="/images/leaf.png" alt="" fill className="object-contain" style={{ opacity: 0.7, transform: "rotate(-20deg)" }} />
            </div>
            <div className="absolute bottom-24 left-18.75 w-40 h-60 pointer-events-none select-none z-2" style={{ animation: "leafSway 3s ease-in-out infinite", animationDelay: "1.5s" }}>
                <Image src="/images/leaf.png" alt="" fill className="object-contain" style={{ opacity: 0.6, transform: "rotate(30deg)" }} />
            </div>
            <div className="absolute top-[45%] right-15 w-40 h-60 pointer-events-none select-none z-2" style={{ animation: "leafSway 3s ease-in-out infinite", animationDelay: "0.8s" }}>
                <Image src="/images/leaf.png" alt="" fill className="object-contain" style={{ opacity: 0.55, transform: "rotate(-45deg)" }} />
            </div>
            <div className="absolute bottom-16 right-[20%] w-40 h-60 pointer-events-none select-none z-2" style={{ animation: "leafSway 3s ease-in-out infinite", animationDelay: "2s" }}>
                <Image src="/images/leaf.png" alt="" fill className="object-contain" style={{ opacity: 0.5, transform: "rotate(15deg)" }} />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-8">
                <div className="text-6xl font-black text-black tracking-tight" style={{ animation: "logoPulse 1.6s ease-in-out infinite" }}>
                    LOGO
                </div>
                <div className="flex items-center gap-3">
                    {[0, 1, 2].map((i) => (
                        <div key={i} className="w-2.5 h-2.5 rounded-full bg-black/30" style={{ animation: "dotBounce 1.2s ease-in-out infinite", animationDelay: `${i * 0.2}s` }} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Loading;