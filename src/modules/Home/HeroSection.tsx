"use client";

import Image from "next/image";
import MenuButton from "@/components/MenuButton";
import { HeroHeader } from "@/components";

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="relative z-10 flex flex-col">
        <div className="flex-1 flex pt-5">
          <div className="containers relative w-full">
            <div className="absolute pointer-events-none z-20"
              style={{ top: "88px", left: "-70px", width: 200, height: 200, transform: "rotate(-8deg)" }}>
              <Image src="/images/leaf.png" alt="" fill className="object-contain" />
            </div>
            <div className="relative w-full h-full overflow-visible" style={{ backdropFilter: "blur(14px)", background: "rgba(255,255,255,0.35)", boxShadow: "0 8px 48px rgba(0,0,0,0.18)", borderRadius: "32px", }}>
              <HeroHeader />
              <div className="relative z-10 flex items-center justify-between px-12 pt-4 pb-16">
                <div className="max-w-sm">
                  <h1 className="text-[64px] font-black text-black leading tracking-tight uppercase mb-8">
                    Вкусная<br />Еда ждет<br />Тебя!
                  </h1>
                  <MenuButton title="Посмотреть меню" href="/menu" />
                </div>
                <div className="relative shrink-0" style={{ width: 480, height: 520, marginRight: "5px" }}>
                  <div className="absolute pointer-events-none z-20" style={{ top: "60px", left: "-130px", width: 200, height: 200, transform: "rotate(65deg)" }}>
                    <Image src="/images/leaf.png" alt="" fill className="object-contain" />
                  </div>
                  <div className="absolute pointer-events-none z-20" style={{ top: "330px", left: "-80px", width: 200, height: 200, transform: "rotate(100deg)" }}>
                    <Image src="/images/leaf.png" alt="" fill className="object-contain" />
                  </div>
                  <div className="relative rounded-full overflow-hidden shadow-2xl" style={{ width: 480, height: 480, marginTop: "20px" }}>
                    <Image src="/images/steak.svg" alt="Delicious meal" fill className="object-cover" />
                  </div>
                  <div className="absolute pointer-events-none z-20" style={{ bottom: "0px", right: "-10px", width: 200, height: 200, transform: "rotate(30deg) scaleX(-1)" }}>
                    <Image src="/images/leaf.png" alt="" fill className="object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection