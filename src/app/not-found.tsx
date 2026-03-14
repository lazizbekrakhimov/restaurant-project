import Image from 'next/image';
import Link from 'next/link';

const NotFound = () => {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0" />

            <div className="absolute pointer-events-none"
                style={{ top: "10%", left: "-30px", width: 220, height: 250, transform: "rotate(-25deg)" }}>
                <Image src="/images/leaf.png" alt="" fill className="object-contain" />
            </div>

            <div className="absolute pointer-events-none"
                style={{ bottom: "10%", right: "-20px", width: 220, height: 255, transform: "rotate(20deg) scaleX(-1)" }}>
                <Image src="/images/leaf.png" alt="" fill className="object-contain" />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-6 px-16 py-14 rounded-4xl text-center" style={{ backdropFilter: "blur(14px)", background: "rgba(255,255,255,0.35)", boxShadow: "0 8px 48px rgba(0,0,0,0.15)" }} >
                <h1 className="text-[120px] font-black text-black leading-none tracking-tight">
                    404
                </h1>

                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold text-black">
                        Страница не найдена
                    </h2>
                    <p className="text-sm text-black/50 max-w-xs leading-relaxed">
                        Похоже, эта страница не существует или была удалена
                    </p>
                </div>

                <Link href="/" className="relative mt-2 inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-2xl font-bold text-base overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-black/30 active:scale-95 group " >
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-linear-to-r from-transparent via-white/10 to-transparent" />
                    ← На главную
                </Link>
            </div>
        </div>
    );
}

export default NotFound