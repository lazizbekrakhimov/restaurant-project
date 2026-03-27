"use client";

import { useEffect, useState } from "react";
import { NextIcon, PrevIcon } from "@/icons";
import MealCard from "@/components/MealCard";
import { MenuButton } from "@/components";
import { Meal } from "@/@types";
import Image from "next/image";
import { getMenu } from "@/service";

const VISIBLE_COUNT = 4;

const PopularMeals = () => {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [startIndex, setStartIndex] = useState(0);

    useEffect(() => {
        getMenu().then((data) => {
            setMeals(data.map((item: any) => ({
                id: item.id,
                name: item.name,
                description: item.description || '',
                price: Number(item.price),
                image: item.image || '/images/meal1.svg',
            })));
        }).catch(() => setMeals([]));
    }, []);

    const visibleMeals = meals.slice(startIndex, startIndex + VISIBLE_COUNT);
    const canPrev = startIndex > 0;
    const canNext = startIndex + VISIBLE_COUNT < meals.length;

    return (
        <section className="containers relative py-7">
            <div className="absolute pointer-events-none z-0" style={{ bottom: "54px", left: "-130px", width: 220, height: 210, transform: "rotate(10deg)" }}>
                <Image src="/images/leaf.png" alt="" fill className="object-contain" />
            </div>
            <div className="absolute pointer-events-none z-0" style={{ top: "4px", right: "-125px", width: 220, height: 240, transform: "rotate(180deg)" }}>
                <Image src="/images/leaf.png" alt="" fill className="object-contain" />
            </div>

            <h2 className="text-center font-black text-black mb-16" style={{ fontSize: "40px", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }}>
                Популярные блюда
            </h2>

            <div className="relative flex items-center gap-4 containers">
                <button onClick={() => setStartIndex(i => i - 1)} disabled={!canPrev} className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full hover:text-white duration-200 active:scale-95 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed">
                    <PrevIcon />
                </button>
                <div className="flex-1 grid grid-cols-4 gap-8 pt-14 items-start">
                    {visibleMeals.map((meal, index) => (
                        <MealCard key={meal.id} meal={meal} featured={index === 1 || index === 2} />
                    ))}
                </div>
                <button onClick={() => setStartIndex(i => i + 1)} disabled={!canNext} className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full hover:text-white duration-200 active:scale-95 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed">
                    <NextIcon />
                </button>
            </div>

            <div className="containers flex justify-end pt-7">
                <MenuButton title="Посмотреть меню" href="/menu" />
            </div>
        </section>
    );
};

export default PopularMeals;