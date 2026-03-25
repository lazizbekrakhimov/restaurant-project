import { HeroHeader, WherePath } from "@/components";
import Leaf from "@/components/Leaf";

const AboutSection = () => {
    return (
        <div className="relative z-10 flex flex-col pt-5">
            <div className="containers relative w-full">
                <Leaf style={{ top: "180px", right: "-30px", width: "160px", height: "160px", transform: "rotate(-25deg)" }} />
                <Leaf style={{ bottom: "80px", left: "-35px", width: "160px", height: "160px", transform: "rotate(30deg)" }} />

                <div className="relative w-full overflow-hidden" style={{ backdropFilter: "blur(14px)", background: "rgba(255, 255, 255, 0.32)", boxShadow: "0 8px 48px rgba(0, 0, 0, 0.18)", borderRadius: "32px" }}>
                    <HeroHeader />
                    <div className="px-12 py-6">
                        <WherePath pageHref='/about' pageName='О нас' />
                    </div>

                    <div className="flex items-center justify-center pb-22">
                        <div className="flex flex-col items-center text-center max-w-2xl px-8">

                            <div className="relative mb-10" style={{ animation: "float 3s ease-in-out infinite" }}>
                                <div className="text-[120px] leading-none select-none" style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.15))" }}>
                                    🍽️
                                </div>
                                <div className="absolute inset-0 rounded-full blur-3xl opacity-20 bg-orange-300 -z-10 scale-150" />
                            </div>

                            <h1 className="font-black text-black mb-5 leading-tight" style={{ fontSize: "52px", fontWeight: 900, letterSpacing: "-0.03em" }}>
                                Скоро здесь будет{" "}
                                <span >интересно</span>
                            </h1>

                            <p className="text-black/50 text-lg leading-relaxed mb-14 max-w-md">
                                Страница «О нас» находится в разработке. Мы готовим для вас кое-что особенное — заходите позже!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;