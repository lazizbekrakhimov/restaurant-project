"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HeroHeader, Leaf, WherePath } from '@/components';
import MealCard from "@/components/MealCard";
import { Meal } from "@/@types";
import { getCategories, getMenu } from "@/service";

const FALLBACK_MEALS: Meal[] = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: "Chicken soup",
    description: "Spicy with garlic",
    price: 10.00 + i,
    image: `/images/meal${(i % 3) + 1}.svg`,
}));

const FALLBACK_CATEGORIES = [
    { id: 1, name: "Первые" },
    { id: 2, name: "Вторые" },
    { id: 3, name: "Салаты" },
    { id: 4, name: "Напитки" },
    { id: 5, name: "Фаст-Фуд" },
];

const MenuSection = () => {
    const [meals, setMeals] = useState<Meal[]>(FALLBACK_MEALS);
    const [categories, setCategories] = useState(FALLBACK_CATEGORIES);
    const [activeCategory, setActiveCategory] = useState<number | undefined>(undefined);
    const [activeName, setActiveName] = useState("Все");

    useEffect(() => {
        getCategories()
            .then(setCategories)
            .catch(() => setCategories(FALLBACK_CATEGORIES));
    }, []);

    useEffect(() => {
        getMenu(activeCategory)
            .then((data) => {
                if (!data?.length) { setMeals(FALLBACK_MEALS); return; }
                setMeals(data.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    description: item.description || '',
                    price: Number(item.price),
                    image: item.image || '/images/meal2.svg',
                })));
            })
            .catch(() => setMeals(FALLBACK_MEALS));
    }, [activeCategory]);

    const allCategories = [{ id: 0, name: "Все" }, ...categories];

    return (
        <div className="relative z-10 flex flex-col pt-5 pb-24">
            <Leaf style={{ top: "220px", right: "20px", width: "230px", height: "230px", transform: "rotate(185deg)" }} />
            <Leaf style={{ top: "33%", left: "-20px", width: "230px", height: "230px", transform: "rotate(10deg)" }} />
            <Leaf style={{ bottom: "120px", right: "20px", width: "200px", height: "200px", transform: "rotate(-170deg)" }} />
            <Leaf style={{ bottom: "80px", left: "-20px", width: "220px", height: "220px", transform: "rotate(10deg)" }} />

            <div className="containers relative w-full">
                <div className="relative w-full overflow-hidden" style={{ backdropFilter: "blur(14px)", background: "rgba(255, 255, 255, 0.32)", boxShadow: "0 8px 48px rgba(0, 0, 0, 0.18)", borderRadius: "32px" }}>
                    <HeroHeader />
                    <div className="px-12 pt-6 pb-24">
                        <WherePath pageName="Меню" pageHref="/menu" title="Меню" />

                        <div className="flex justify-center mb-35">
                            <div className="inline-flex items-center rounded-full px-2 py-2 gap-1" style={{ background: "rgba(255,255,255,0.45)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.7)", boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
                                {allCategories.map((cat) => (
                                    <button key={cat.id} onClick={() => { setActiveCategory(cat.id === 0 ? undefined : cat.id); setActiveName(cat.name); }} className={`px-7 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap ${activeName === cat.name ? "bg-white text-black" : "text-black/70 hover:text-black hover:bg-white/50"}`}>
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-x-6 gap-y-30">
                            {meals.map((meal) => (
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