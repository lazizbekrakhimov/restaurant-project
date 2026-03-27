"use client";

import { useState } from "react";
import { HeroHeader, Leaf } from "@/components";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { clearCart } from "@/redux/cartSlice";

type DeliveryType = "pickup" | "door" | "address";
type PaymentType = "card" | "cash";

const CheckoutPage = () => {
    const dispatch = useAppDispatch();
    const items = useAppSelector((s) => s.cart.items);
    const [delivery, setDelivery] = useState<DeliveryType>("door");
    const [payment, setPayment] = useState<PaymentType>("card");
    const [success, setSuccess] = useState(false);

    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const deliveryCost = delivery === "pickup" ? 0 : 0;
    const total = subtotal + deliveryCost;

    const handleOrder = () => {
        dispatch(clearCart());
        setSuccess(true);
    };

    if (success) return (
        <div className="relative z-10 flex flex-col pt-5 pb-24">
            <div className="containers relative w-full">
                <div className="relative w-full overflow-hidden flex flex-col" style={{ backdropFilter: "blur(14px)", background: "rgba(255,255,255,0.32)", boxShadow: "0 8px 48px rgba(0,0,0,0.18)", borderRadius: "32px" }}>
                    <HeroHeader />
                    <div className="flex flex-col items-center justify-center py-40 gap-4">
                        <span className="text-7xl">✅</span>
                        <h2 className="font-black text-black text-3xl">Заказ оформлен!</h2>
                        <p className="text-black/50">Спасибо! Мы скоро свяжемся с вами.</p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="relative z-10 flex flex-col pt-5 pb-24">
            <div className="containers relative w-full">
                <Leaf style={{ top: "160px", right: "-60px", width: "180px", height: "180px", transform: "rotate(-30deg)" }} />
                <Leaf style={{ bottom: "200px", left: "-100px", width: "180px", height: "180px", transform: "rotate(20deg)" }} />

                <div className="relative w-full overflow-hidden" style={{ backdropFilter: "blur(14px)", background: "rgba(255,255,255,0.32)", boxShadow: "0 8px 48px rgba(0,0,0,0.18)", borderRadius: "32px" }}>
                    <HeroHeader />

                    <div className="px-12 pt-6 pb-20">
                        <h1 className="text-center font-black text-black mb-14" style={{ fontSize: "48px", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1 }}>
                            Оформление заказа
                        </h1>

                        <div className="flex gap-10 items-start">
                            <div className="flex-1 flex flex-col gap-10">

                                <div>
                                    <h2 className="font-black text-black text-3xl mb-6">Способ получения:</h2>
                                    <div className="flex flex-col gap-4">
                                        {([
                                            { value: "pickup", label: "Заказ с собой" },
                                            { value: "door", label: "Доставка до двери" },
                                        ] as { value: DeliveryType; label: string }[]).map(({ value, label }) => (
                                            <label key={value} className="flex items-center gap-3 cursor-pointer">
                                                <div onClick={() => setDelivery(value)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${delivery === value ? "border-black" : "border-black/30"}`}>
                                                    {delivery === value && <div className="w-3 h-3 rounded-full bg-black" />}
                                                </div>
                                                <span className="font-medium text-black text-base">{label}</span>
                                            </label>
                                        ))}

                                        <label className="flex items-start gap-3 cursor-pointer">
                                            <div onClick={() => setDelivery("address")} className={`w-6 h-6 mt-0.5 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all shrink-0 ${delivery === "address" ? "border-black" : "border-black/30"}`}>
                                                {delivery === "address" && <div className="w-3 h-3 rounded-full bg-black" />}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-black text-base">Доставка по адресу:</span>
                                                </div>
                                                {delivery === "address" && (
                                                    <p className="text-black/40 text-sm mt-3">Укажите адрес доставки на карте:</p>
                                                )}
                                            </div>
                                        </label>

                                        {delivery === "address" && (
                                            <button className="relative group w-48 bg-black text-white py-3 rounded-2xl font-semibold text-sm hover:scale-105 transition cursor-pointer overflow-hidden">
                                                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-linear-to-r from-transparent via-white/20 to-transparent" />
                                                Выбрать
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <h2 className="font-black text-black text-3xl mb-6">Способ оплаты:</h2>
                                    <div className="flex flex-col gap-4">
                                        <label className="flex flex-col gap-3 cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <div onClick={() => setPayment("card")} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${payment === "card" ? "border-black" : "border-black/30"}`}>
                                                    {payment === "card" && <div className="w-3 h-3 rounded-full bg-black" />}
                                                </div>
                                                <span className="font-medium text-black text-base">Картой онлайн</span>
                                            </div>
                                            {payment === "card" && (
                                                <div className="flex items-center gap-2 ml-9">
                                                    {["HUMO", "U", "VISA", "MC", "Pay"].map((b) => (
                                                        <div key={b} className="px-3 py-2 bg-black text-white rounded-lg text-xs font-bold border duration-200 hover:bg-red-600 selection border-black/10">{b}</div>
                                                    ))}
                                                </div>
                                            )}
                                        </label>

                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <div onClick={() => setPayment("cash")} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${payment === "cash" ? "border-black" : "border-black/30"}`}>
                                                {payment === "cash" && <div className="w-3 h-3 rounded-full bg-black" />}
                                            </div>
                                            <span className="font-medium text-black text-base">Оплата при получении</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="w-107.5 shrink-0 bg-white/20 backdrop-blur-md rounded-3xl px-12 py-12 shadow-lg">
                                <h2 className="font-black text-black text-2xl mb-8 text-center">Ваш заказ</h2>

                                <div className="flex flex-col gap-4 mb-8">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex justify-between items-center border-b border-black/8 pb-3">
                                            <span className="text-sm text-black/70">{item.name}{item.quantity > 1 ? `(${item.quantity})` : ""}</span>
                                            <span className="text-sm font-semibold text-black">${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                    <div className="flex justify-between items-center border-b border-black/8 pb-3">
                                        <span className="text-sm text-black/70">Доставка</span>
                                        <span className="text-sm font-semibold text-black">{deliveryCost === 0 ? "Бесплатно" : `$${deliveryCost}`}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mb-8">
                                    <span className="font-black text-black text-lg">Итого:</span>
                                    <span className="font-black text-black text-xl">${total.toFixed(2)}</span>
                                </div>

                                <div className="flex justify-center">
                                    <button onClick={handleOrder} disabled={items.length === 0} className="relative group px-8 bg-black text-white py-3 rounded-xl font-semibold text-base transition-all duration-300 hover:scale-103 hover:shadow-2xl hover:shadow-black/30 active:scale-95 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed overflow-hidden" >
                                        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-linear-to-r from-transparent via-white/20 to-transparent" />
                                        Заказать
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;