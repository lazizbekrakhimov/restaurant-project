"use client";

import { createPortal } from "react-dom";
import { closeCart, decrementItem, incrementItem, removeItem } from "@/redux/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Image from "next/image";
import Link from "next/link";

const CartModal = () => {
    const dispatch = useAppDispatch();
    const { items, isOpen } = useAppSelector((s) => s.cart);
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    if (!isOpen) return null;

    return createPortal(
        <>
            <div className="fixed inset-0 z-999 bg-black/20 backdrop-blur-sm" onClick={() => dispatch(closeCart())} />
            <div className="fixed top-0 right-0 h-full w-96 z-1000 flex rounded-tl-4xl rounded-bl-4xl flex-col transition-transform duration-300 ease-out" style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(20px)", boxShadow: "-8px 0 48px rgba(0,0,0,0.12)", }} >
                <div className="flex items-center justify-between px-6 py-5 border-b border-black/8">
                    <h2 className="font-black text-black text-xl">Корзина</h2>
                    <button onClick={() => dispatch(closeCart())} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/8 transition cursor-pointer text-xl" >
                        ✕
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                            <span className="text-5xl">🛒</span>
                            <p className="text-black/40 text-sm">Корзина пуста</p>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex items-center gap-3 bg-white/60 rounded-2xl px-3 py-3">
                                <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0">
                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-black text-sm truncate">{item.name}</p>
                                    <p className="text-black/50 text-xs">${item.price.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => dispatch(decrementItem(item.id))} className="w-7 h-7 rounded-lg bg-black/8 flex items-center justify-center text-sm font-bold hover:bg-black/15 transition cursor-pointer" >
                                        −
                                    </button>
                                    <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                    <button onClick={() => dispatch(incrementItem(item.id))} className="w-7 h-7 rounded-lg bg-black/8 flex items-center justify-center text-sm font-bold hover:bg-black/15 transition cursor-pointer" >
                                        +
                                    </button>
                                </div>
                                <button onClick={() => dispatch(removeItem(item.id))} className="text-black/30 hover:text-red-500 transition cursor-pointer text-lg ml-1" >
                                    ✕
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className="px-6 py-5 border-t border-black/8">
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-semibold text-black">Итого:</span>
                            <span className="font-black text-black text-xl">${total.toFixed(2)}</span>
                        </div>
                        <Link href="/checkout" onClick={() => dispatch(closeCart())} className="relative group block w-full bg-black text-white text-center py-4 rounded-2xl font-semibold overflow-hidden active:scale-95 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-black/30" >
                            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-linear-to-r from-transparent via-white/20 to-transparent" />
                            Оформить заказ
                        </Link>
                    </div>
                )}
            </div>
        </>,
        document.body
    );
};

export default CartModal;