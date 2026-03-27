"use client";

import { createPortal } from "react-dom";
import { addItem } from "@/redux/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { closeWishlistPanel, removeWishlistItem } from "@/redux/wishlistSlice";
import Image from "next/image";

const WishlistModal = () => {
    const dispatch = useAppDispatch();
    const { items, isOpen } = useAppSelector((s) => s.wishlist);

    if (!isOpen) return null;

    return createPortal(
        <>
            <div className="fixed inset-0 z-999 bg-black/20 backdrop-blur-sm" onClick={() => dispatch(closeWishlistPanel())} />

            <div className="fixed top-0 right-0 h-full w-96 z-1000 rounded-tl-4xl rounded-bl-4xl flex flex-col transition-transform duration-300 ease-out" style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(20px)", boxShadow: "-8px 0 48px rgba(0,0,0,0.12)", }}  >
                <div className="flex items-center justify-between px-6 py-5 border-b border-black/8">
                    <h2 className="font-black text-black text-xl">Избранное</h2>
                    <button onClick={() => dispatch(closeWishlistPanel())} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/8 transition cursor-pointer text-xl" >
                        ✕
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                            <span className="text-5xl">🤍</span>
                            <p className="text-black/40 text-sm">Список пуст</p>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex items-center gap-3 bg-white/60 rounded-2xl px-3 py-3" >
                                <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0">
                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-black text-sm truncate">
                                        {item.name}
                                    </p>
                                    <p className="text-black/50 text-xs">${item.price.toFixed(2)}</p>
                                </div>
                                <button onClick={() => { dispatch(addItem({ id: item.id, name: item.name, price: item.price, image: item.image })); dispatch(removeWishlistItem(item.id)) }} className="text-xs bg-black text-white px-3 py-1.5 rounded-lg overflow-hidden transition-all duration-200 hover:scale-103 hover:shadow-2xl hover:shadow-black/30 active:scale-95 group cursor-pointer relative">
                                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-linear-to-r from-transparent via-white/20 to-transparent" />
                                    В корзину
                                </button>
                                <button onClick={() => dispatch(removeWishlistItem(item.id))} className="text-black/30 hover:text-red-500 transition cursor-pointer text-lg" >
                                    ✕
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>,
        document.body
    );
};

export default WishlistModal;