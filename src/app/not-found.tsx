import { Leaf } from '@/components';
import Image from 'next/image';
import Link from 'next/link';

const NotFound = () => {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <Image src="/images/bbgg.png" alt="" fill className="object-cover" priority />
            <div className="absolute inset-0" />

            <Leaf style={{ top: "10%", left: "-30px", width: 240, height: 290, transform: "rotate(-25deg)" }} />

            <Leaf style={{ bottom: "10%", right: "-20px", width: 240, height: 295, transform: "rotate(20deg) scaleX(-1)" }} />

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
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-linear-to-r from-transparent via-white/20 to-transparent" />
                    ← На главную
                </Link>
            </div>
        </div>
    );
}

export default NotFound