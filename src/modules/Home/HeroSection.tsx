"use client";

import Image from "next/image";
import MenuButton from "@/components/MenuButton";
import { HeroHeader, Leaf } from "@/components";

const HeroSection = () => {
  return (
    <div className="relative z-10 flex flex-col pt-5">
      <div className="containers relative w-full">

        <Leaf style={{ top: 88, left: -70, width: 200, height: 200, transform: "rotate(-8deg)" }} />

        <div className="relative w-full overflow-visible" style={{ backdropFilter: "blur(14px)", background: "rgba(255,255,255,0.35)", boxShadow: "0 8px 48px rgba(0,0,0,0.18)", borderRadius: 32, }} >
          <HeroHeader />

          <div className="flex items-center justify-between px-12 pt-4 pb-16">
            <div className="max-w-sm">
              <h1 className="text-[64px] font-black text-black leading-[130%] tracking-tight uppercase mb-8">
                Вкусная<br />Еда ждет<br />Тебя!
              </h1>
              <MenuButton title="Посмотреть меню" href="/menu" />
            </div>
            <div className="relative shrink-0" style={{ width: 480, height: 520 }}>

              <Leaf style={{ top: 60, left: -130, width: 200, height: 200, transform: "rotate(65deg)" }} />

              <Leaf style={{ top: 330, left: -80, width: 200, height: 200, transform: "rotate(100deg)" }} />

              <div className="relative rounded-full overflow-hidden shadow-2xl mt-5" style={{ width: 480, height: 480 }}>
                <Image src="/images/steak.svg" alt="Delicious meal" fill className="object-cover" />
              </div>

              <Leaf style={{ bottom: 0, right: -10, width: 200, height: 200, transform: "rotate(30deg) scaleX(-1)" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;