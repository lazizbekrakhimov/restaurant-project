"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { HeroHeader, Leaf, SubmitButton } from "@/components";
import MealCard from "@/components/MealCard";
import { Meal } from "@/@types";
import { getMenu } from "@/service";
import { NextIcon, PrevIcon } from "@/icons";
import { addItem, openCart } from "@/redux/cartSlice";
import { useAppDispatch } from "@/redux/hook";

const Stars = ({ rating = 4 }: { rating?: number }) => (
    <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
            <span key={i} className={`text-xl ${i <= rating ? "text-[#FAFF00]" : "text-gray-300"}`}>★</span>
        ))}
        <span className="font-bold text-black ml-1">{rating},0</span>
        <span className="text-black/40 text-sm ml-2 underline cursor-pointer hover:text-black transition-colors">(Смотреть отзывы)</span>
    </div>
);

const VISIBLE = 4;

const MenuInfoPage = () => {
    const params = useParams();
    const id = params?.id as string;
    const dispatch = useAppDispatch();

    const [meal, setMeal] = useState<any>(null);
    const [similar, setSimilar] = useState<Meal[]>([]);
    const [count, setCount] = useState(1);
    const [sliderStart, setSliderStart] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3999"}/menu/${id}`, { credentials: "include" })
            .then((r) => r.json())
            .then((data) => { if (data?.id) setMeal(data); })
            .catch(() => { })
            .finally(() => setLoading(false));

        getMenu()
            .then((data) => {
                if (!data?.length) return;
                setSimilar(data
                    .filter((item: any) => String(item.id) !== String(id))
                    .slice(0, 8)
                    .map((item: any) => ({
                        id: item.id,
                        name: item.name,
                        description: item.description || "",
                        price: Number(item.price),
                        image: item.image || "/images/meal1.svg",
                    }))
                );
            })
            .catch(() => { });
    }, [id]);

    const handleAddToCart = () => {
        if (!meal) return;
        for (let i = 0; i < count; i++) {
            dispatch(addItem({
                id: meal.id,
                name: meal.name,
                price: parseFloat(String(meal.price)),
                image: meal.image || "/images/meal1.svg",
            }));
        }
        dispatch(openCart());
    };

    const canPrev = sliderStart > 0;
    const canNext = sliderStart + VISIBLE < similar.length;

    if (loading) return (
        <div className="relative z-10 flex flex-col pt-5 pb-24">
            <div className="containers relative w-full">
                <div className="relative w-full overflow-hidden flex flex-col" style={{ backdropFilter: "blur(14px)", background: "rgba(255,255,255,0.32)", borderRadius: "32px" }}>
                    <HeroHeader />
                    <div className="flex items-center justify-center py-40">
                        <div className="w-10 h-10 rounded-full border-4 border-black/10 border-t-black animate-spin" />
                    </div>
                </div>
            </div>
        </div>
    );

    if (!meal) return (
        <div className="relative z-10 flex flex-col pt-5 pb-24">
            <div className="containers relative w-full">
                <div className="relative w-full overflow-hidden flex flex-col" style={{ backdropFilter: "blur(14px)", background: "rgba(255,255,255,0.32)", borderRadius: "32px" }}>
                    <HeroHeader />
                    <div className="flex flex-col items-center justify-center py-40 gap-4">
                        <p className="text-black/40 text-lg">Блюдо не найдено</p>
                        <Link href="/menu" className="px-6 py-3 bg-black text-white rounded-2xl text-sm font-semibold hover:bg-black/80 transition">
                            Вернуться в меню
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );

    const price = parseFloat(String(meal.price));

    return (
        <div className="relative z-10 flex flex-col pt-5 pb-24">
            <div className="containers relative w-full">
                <Leaf style={{ top: "400px", right: "-100px", width: "180px", height: "180px", transform: "rotate(-185deg)" }} />
                <Leaf style={{ top: "75%", left: "-100px", width: "200px", height: "200px", transform: "rotate(10deg)" }} />
                <Leaf style={{ bottom: "-225px", left: "520px", width: "230px", height: "230px", transform: "rotate(-160deg)" }} />

                <div className="relative w-full overflow-hidden" style={{ backdropFilter: "blur(14px)", background: "rgba(255,255,255,0.32)", boxShadow: "0 8px 48px rgba(0,0,0,0.18)", borderRadius: "32px" }}>
                    <HeroHeader />

                    <div className="px-12 pt-6 pb-16">
                        <p className="text-[16px] text-black/50 font-medium mb-8 tracking-wide">
                            <Link href="/" className="hover:text-red-600 transition-colors">Главная</Link>
                            <span className="mx-2 text-black/40">›</span>
                            <Link href="/menu" className="hover:text-red-600 transition-colors">Меню</Link>
                            <span className="mx-2 text-black/40">›</span>
                            <span className="text-black/80">{meal.name}</span>
                        </p>

                        <h1 className="text-center font-black text-black mb-10" style={{ fontSize: "48px", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1 }}>
                            {meal.category?.name || "Меню"}
                        </h1>

                        <div className="flex items-center gap-12">
                            <div className="relative w-150 h-150 shrink-0 rounded-3xl overflow-hidden">
                                <Image src={meal.image || "/images/meal1.svg"} alt={meal.name} fill className="object-contain drop-shadow-2xl p-6" unoptimized />
                            </div>
                            <div className="flex-1">
                                <h2 className="font-black text-black mb-4" style={{ fontSize: "40px", letterSpacing: "-0.02em" }}>
                                    {meal.name}
                                </h2>
                                <div className="flex items-center gap-4 mb-8">
                                    <span className="font-black text-black text-3xl">${price.toFixed(2)}</span>
                                    <Stars rating={4} />
                                </div>
                                <h3 className="font-bold text-black text-2xl mb-3">Описание:</h3>
                                <p className="text-black/70 text-[18px] leading-relaxed mb-10 max-w-md">
                                    {meal.description || "Описание отсутствует."}
                                </p>
                                <div className="flex items-center gap-8">
                                    <div className="flex items-center gap-4 bg-white/40 backdrop-blur-md rounded-2xl px-4 py-3">
                                        <button onClick={() => setCount(c => Math.max(1, c - 1))} className="text-xl font-bold cursor-pointer w-8 h-8 flex items-center justify-center hover:bg-black/10 rounded-xl transition">−</button>
                                        <span className="text-lg font-bold w-6 text-center">{count}</span>
                                        <button onClick={() => setCount(c => c + 1)} className="text-xl font-bold cursor-pointer w-8 h-8 flex items-center justify-center hover:bg-black/10 rounded-xl transition">+</button>
                                    </div>
                                    <SubmitButton onClick={handleAddToCart} extraClass="px-10!">В корзину</SubmitButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {similar.length > 0 && (
                <div className="containers relative w-full mt-10">
                    <h2 className="font-black text-black mb-20" style={{ fontSize: "32px", letterSpacing: "-0.02em" }}>
                        Похожие:
                    </h2>
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSliderStart(i => i - 1)} disabled={!canPrev} className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full hover:text-white transition duration-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer">
                            <PrevIcon />
                        </button>
                        <div className="flex-1 grid grid-cols-4 gap-6 pt-14 items-start">
                            {similar.slice(sliderStart, sliderStart + VISIBLE).map((item) => (
                                <MealCard key={item.id} meal={item} />
                            ))}
                        </div>
                        <button onClick={() => setSliderStart(i => i + 1)} disabled={!canNext} className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full hover:text-white transition duration-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer">
                            <NextIcon />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MenuInfoPage;