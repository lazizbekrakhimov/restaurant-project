"use client";

import Image from "next/image";
import Link from "next/link";
import { CartIcon, HeartIcon } from "@/icons";
import { Meal } from "@/@types";
import { toggleWishlist } from "@/redux/wishlistSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { addItem, openCart } from "@/redux/cartSlice";

interface MealCardProps {
    meal: Meal;
    featured?: boolean;
}

const MealCard = ({ meal, featured = false }: MealCardProps) => {
    const dispatch = useAppDispatch();
    const liked = useAppSelector((s) => s.wishlist.items.some((i) => i.id === meal.id));

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(addItem({ id: meal.id, name: meal.name, price: meal.price, image: meal.image }));
        dispatch(openCart());
    };

    const handleToggleLike = (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(toggleWishlist({ id: meal.id, name: meal.name, price: meal.price, image: meal.image, description: meal.description }));
    };

    return (
        <div className={`relative flex flex-col pb-5 transition-all duration-300 ease-out hover:-translate-y-1 ${featured ? "shadow-2xl" : "shadow-md"}`}
            style={{ width: "263px", minHeight: "310px", background: "linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.4) 100%)", borderRadius: "38px", flexShrink: 0 }}>

            <div className={`relative rounded-full overflow-hidden mx-auto ${featured ? "-mt-20 w-60 h-60" : "-mt-16 w-52 h-52"}`}>
                <Link href={`/menu/${meal.id}`}>
                    <Image src={meal.image} alt={meal.name} fill className="object-cover" />
                </Link>
            </div>

            <div className="flex flex-col px-5 mt-4 flex-1">
                <div className="flex items-start justify-between gap-2">
                    <Link href={`/menu/${meal.id}`}>
                        <h3 className={`font-bold text-black leading-tight hover:underline ${featured ? "text-xl" : "text-lg"}`}>{meal.name}</h3>
                    </Link>
                    <button onClick={handleToggleLike} className={`shrink-0 mt-0.5 transition-all duration-200 cursor-pointer ${liked ? "text-red-500 scale-110" : "text-black/80 hover:text-red-400"}`}>
                        <HeartIcon />
                    </button>
                </div>
                <Link href={`/menu/${meal.id}`}>
                    <p className="text-black text-sm mt-1 hover:underline">{meal.description}</p>
                </Link>
                <div className="flex items-center justify-between mt-5">
                    <span className={`font-black text-black ${featured ? "text-2xl" : "text-lg"}`}>${meal.price.toFixed(2)}</span>
                    <button onClick={handleAddToCart} className="group relative w-11 h-11 flex items-center justify-center bg-black text-white rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95 cursor-pointer overflow-hidden">
                        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-linear-to-r from-transparent via-white/20 to-transparent" />
                        <CartIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MealCard;