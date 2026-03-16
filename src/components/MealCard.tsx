"use client";

import Image from "next/image";
import { useState } from "react";
import { CartIcon, HeartIcon } from "@/icons";
import { Meal } from "@/@types";

interface MealCardProps {
  meal: Meal;
  featured?: boolean;
}

const MealCard = ({ meal, featured = false }: MealCardProps) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className={`relative flex flex-col bg-white/40 backdrop-blur-md rounded-4xl px-5 pb-6 transition-all duration-300 ease-out hover:shadow-2xl hover:-translate-y-1 ${featured ? "shadow-xl" : "shadow-md"}`}>
      <div className={`relative rounded-full overflow-hidden mx-auto ${featured ? "-mt-12 w-52 h-52" : "-mt-10 w-44 h-44"}`}>
        <Image src={meal.image} alt={meal.name} fill className="object-cover" />
      </div>
      <div className="flex items-start justify-between gap-2 mt-5">
        <h3 className={`font-bold text-black leading-tight ${featured ? "text-xl" : "text-base"}`}>
          {meal.name}
        </h3>
        <button onClick={() => setLiked(!liked)} className={`shrink-0 transition-all duration-200 cursor-pointer ${liked ? "text-red-500 scale-110" : "text-black/90 hover:text-red-400"} `} >
          <HeartIcon />
        </button>
      </div>
      <p className="text-black/40 text-sm mt-1">
        {meal.description}
      </p>
      <div className="flex items-center justify-between mt-6">
        <span className={`font-black text-black ${featured ? "text-2xl" : "text-lg"}`}>
          ${meal.price.toFixed(2)}
        </span>
        <button className="group relative w-11 h-11 flex items-center justify-center bg-black text-white rounded-lg transition-all duration-200 hover:scale-110 hover:shadow-lg active:scale-95 cursor-pointer overflow-hidden">
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-linear-to-r from-transparent via-white/20 to-transparent" />
          <CartIcon />
        </button>
      </div>
    </div>
  );
};

export default MealCard;