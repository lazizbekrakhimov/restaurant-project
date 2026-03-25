"use client";

import { useState } from "react";
import { HeroHeader, Leaf, WherePath } from '@/components'
import MealCard from "@/components/MealCard";
import { Meal } from "@/@types";
import Link from "next/link";

const baseMeal: Meal = {
  id: 1,
  name: "Chicken soup",
  description: "Spicy with garlic",
  price: 10.00,
  image: "/images/meal2.svg",
};

const sampleMeals: Meal[] = Array.from({ length: 16 }, (_, index) => ({
  ...baseMeal,
  id: index + 1,
}));

const CATEGORIES = ["Первые", "Вторые", "Салаты", "Напитки", "Фаст-Фуд"];

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState("Первые");

  return (
    <div className="relative z-10 flex flex-col pt-5 pb-24">
      <Leaf style={{ top: "220px", right: "20px", width: "230px", height: "230px", transform: "rotate(185deg)" }} />
      <Leaf style={{ top: "33%", left: "-20px", width: "230px", height: "230px", transform: "rotate(10deg)" }} />
      <Leaf style={{ bottom: "120px", right: "20px", width: "200px", height: "200px", transform: "rotate(-170deg)" }} />
      <Leaf style={{ bottom: "80px", left: "-20px", width: "220px", height: "220px", transform: "rotate(10deg)" }} />
      <div className="containers relative w-full">
        <div className="relative w-full overflow-hidden" style={{ backdropFilter: "blur(14px)", background: "rgba(255, 255, 255, 0.32)", boxShadow: "0 8px 48px rgba(0, 0, 0, 0.18)", borderRadius: "32px" }} >
          <HeroHeader />

          <div className="px-12 pt-6 pb-24">

            <WherePath pageName="Меню" pageHref="/menu" title="Меню" />

            <div className="flex justify-center mb-35">
              <div className="inline-flex items-center rounded-full px-2 py-2 gap-1" style={{ background: "rgba(255,255,255,0.45)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.7)", boxShadow: "0 4px 24px rgba(0,0,0,0.07)", }} >
                {CATEGORIES.map((cat) => (
                  <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-7 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap ${activeCategory === cat ? "bg-white text-black" : "text-black/70 hover:text-black hover:bg-white/50"}`} >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-x-6 gap-y-30">
              {sampleMeals.map((meal) => (
                <MealCard key={meal.id} meal={meal} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuSection;