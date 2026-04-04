"use client";

import { useEffect, useState } from "react";
import { HeroHeader, Leaf, WherePath } from '@/components';
import MealCard from "@/components/MealCard";
import { Meal } from "@/@types";
import { getCategories, getMenu } from "@/service";

const FALLBACK_MEALS: Meal[] = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: "Chicken soup",
    description: "Spicy with garlic",
    price: 10.00 + i,
    image: `/images/meal1.svg`,
}));

const FALLBACK_CATEGORIES = [
    { id: 1, name: "Первые" }
];

const MenuSection = () => {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [categories, setCategories] = useState(FALLBACK_CATEGORIES);
    const [activeCategory, setActiveCategory] = useState<number | undefined>(undefined);
    const [activeName, setActiveName] = useState("Все");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCategories()
            .then(setCategories)
            .catch(() => setCategories(FALLBACK_CATEGORIES));
    }, []);

    useEffect(() => {
        setLoading(true);
        getMenu(activeCategory)
            .then((data) => {
                setMeals(data?.length
                    ? data.map((item: any) => ({
                        id: item.id,
                        name: item.name,
                        description: item.description || '',
                        price: Number(item.price),
                        image: item.image || '/images/meal1.svg',
                    }))
                    : FALLBACK_MEALS
                );
            })
            .catch(() => setMeals(FALLBACK_MEALS))
            .finally(() => setLoading(false));
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
                                    <button key={cat.id} onClick={() => { setActiveCategory(cat.id === 0 ? undefined : cat.id); setActiveName(cat.name); }}
                                        className={`px-7 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap ${activeName === cat.name ? "bg-white text-black" : "text-black/70 hover:text-black hover:bg-white/50"}`}>
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex items-center justify-center py-24">
                                <div className="w-10 h-10 rounded-full border-4 border-black/10 border-t-black animate-spin" />
                            </div>
                        ) : (
                            <div className="grid grid-cols-4 gap-x-6 gap-y-30">
                                {meals.map((meal) => (
                                    <MealCard key={meal.id} meal={meal} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuSection;