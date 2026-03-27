"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { HeroHeader, Leaf, WherePath } from "@/components";
import { getMe, logout } from "@/service";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { openCart } from "@/redux/cartSlice";
import { toggleWishlistPanel } from "@/redux/wishlistSlice";

const TABS = ["Данные", "Корзина", "Избранное"] as const;
type Tab = typeof TABS[number];

const ProfilePage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<Tab>("Данные");
    const cartItems = useAppSelector((s) => s.cart.items);
    const wishlistItems = useAppSelector((s) => s.wishlist.items);
    const cartTotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);

    useEffect(() => {
        getMe()
            .then(setUser)
            .catch(() => router.push("/login"))
            .finally(() => setLoading(false));
    }, []);

    const handleLogout = async () => {
        await logout();
        router.push("/");
    };

    if (loading) return (
        <div className="relative z-10 flex flex-col pt-5 pb-24">
            <div className="containers">
                <div className="relative w-full overflow-hidden flex flex-col" style={{ backdropFilter: "blur(14px)", background: "rgba(255,255,255,0.32)", borderRadius: "32px" }}>
                    <HeroHeader />
                    <div className="flex items-center justify-center py-40">
                        <div className="flex flex-col items-center gap-5">
                            <div className="w-15 h-15 rounded-full border-4 border-black/10 border-t-black animate-spin" />
                            <p className="text-black/40 text-xl">Загрузка...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="relative z-10 flex flex-col pt-5 pb-24">
            <div className="containers relative w-full">

                <Leaf style={{ top: "80px", right: "-40px", width: "200px", height: "200px", transform: "rotate(-15deg)" }} />
                <Leaf style={{ top: "22%", left: "-80px", width: "180px", height: "180px", transform: "rotate(75deg)" }} />
                <Leaf style={{ bottom: "160px", right: "-35px", width: "180px", height: "180px", transform: "rotate(20deg)" }} />
                <Leaf style={{ bottom: "60px", left: "-80px", width: "180px", height: "180px", transform: "rotate(30deg)" }} />

                <div className="relative w-full overflow-hidden" style={{ backdropFilter: "blur(14px)", background: "rgba(255,255,255,0.32)", boxShadow: "0 8px 48px rgba(0,0,0,0.18)", borderRadius: "32px" }}>
                    <HeroHeader />

                    <div className="px-12 pt-6 pb-24">
                        <WherePath pageName="Профиль" pageHref="/profile" title="Профиль" />

                        <div className="flex gap-8 items-start">

                            <div className="flex flex-col gap-5 w-72 shrink-0">

                                <div className="bg-white/10 backdrop-blur-md rounded-3xl px-6 py-8 shadow-md flex flex-col items-center gap-4 text-center">
                                    <div className="relative w-24 h-24 rounded-full overflow-hidden bg-black/10 flex items-center justify-center shadow-lg">
                                        <span className="text-4xl font-black text-black select-none">
                                            {user?.name?.[0]?.toUpperCase() || "U"}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-black text-black text-lg leading-tight">{user?.name}</p>
                                        <p className="text-black/40 text-xs mt-1 break-all">{user?.email}</p>
                                    </div>
                                    {user?.role === "ADMIN" && (
                                        <span className="px-3 py-1 bg-black text-white text-xs font-semibold rounded-full">
                                            Администратор
                                        </span>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <button onClick={() => { setActiveTab("Корзина"); dispatch(openCart()); }}
                                        className="bg-white/10 backdrop-blur-md rounded-2xl px-3 py-5 shadow-md text-center hover:bg-white/70 transition cursor-pointer">
                                        <p className="font-black text-black text-2xl">{cartItems.reduce((s, i) => s + i.quantity, 0)}</p>
                                        <p className="text-black/40 text-xs mt-1">В корзине</p>
                                    </button>
                                    <button onClick={() => { setActiveTab("Избранное"); dispatch(toggleWishlistPanel()); }}
                                        className="bg-white/10 backdrop-blur-md rounded-2xl px-3 py-5 shadow-md text-center hover:bg-white/70 transition cursor-pointer">
                                        <p className="font-black text-black text-2xl">{wishlistItems.length}</p>
                                        <p className="text-black/40 text-xs mt-1">Избранное</p>
                                    </button>
                                </div>

                                <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-md overflow-hidden">
                                    {TABS.map((tab) => (
                                        <button key={tab} onClick={() => setActiveTab(tab)}
                                            className={`w-full text-left px-5 py-4 text-sm font-semibold transition-all cursor-pointer border-b border-black/5 last:border-0 ${activeTab === tab ? "bg-black text-white" : "text-black/70 hover:bg-black/5"}`}>
                                            {tab}
                                            {tab === "Корзина" && cartItems.length > 0 && (
                                                <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${activeTab === tab ? "bg-white/20" : "bg-black/10"}`}>
                                                    {cartItems.reduce((s, i) => s + i.quantity, 0)}
                                                </span>
                                            )}
                                            {tab === "Избранное" && wishlistItems.length > 0 && (
                                                <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${activeTab === tab ? "bg-white/20" : "bg-black/10"}`}>
                                                    {wishlistItems.length}
                                                </span>
                                            )}
                                        </button>
                                    ))}
                                </div>

                                <div className="flex flex-col gap-3">
                                    {user?.role === "ADMIN" && (
                                        <Link href="/admin" className="w-full text-center bg-black text-white py-3 rounded-2xl font-semibold text-sm hover:bg-black/80 transition">
                                            Панель администратора
                                        </Link>
                                    )}
                                    <button onClick={handleLogout}
                                        className="w-full text-center border-2 border-black/10 text-black py-3 rounded-2xl font-semibold text-sm hover:border-red-400 hover:text-red-500 transition cursor-pointer">
                                        Выйти из аккаунта
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 min-w-0">

                                {activeTab === "Данные" && (
                                    <div className="flex flex-col gap-5">
                                        <div className="bg-white/10 backdrop-blur-md rounded-3xl px-8 py-8 shadow-md">
                                            <h2 className="font-black text-black text-xl mb-6">Личные данные</h2>
                                            <div className="grid grid-cols-2 gap-6">
                                                {[
                                                    { label: "Имя", value: user?.name },
                                                    { label: "Email", value: user?.email },
                                                    { label: "Телефон", value: user?.phone || "—" },
                                                    { label: "Роль", value: user?.role === "ADMIN" ? "Администратор" : "Пользователь" },
                                                    { label: "Дата регистрации", value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString("ru-RU") : "—" },
                                                    { label: "ID", value: `#${user?.id}` },
                                                ].map((field) => (
                                                    <div key={field.label} className="bg-white/40 rounded-2xl px-4 py-4">
                                                        <p className="text-black/40 text-xs font-medium mb-1">{field.label}</p>
                                                        <p className="font-semibold text-black text-sm break-all">{field.value}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-4">
                                            {[
                                                { label: "Меню", href: "/menu", emoji: "🍽️" },
                                                { label: "Бронирование", href: "/booking", emoji: "📅" },
                                                { label: "Контакты", href: "/contacts", emoji: "📞" },
                                            ].map((link) => (
                                                <Link key={link.href} href={link.href}
                                                    className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-5 shadow-md text-center hover:bg-white/70 hover:-translate-y-0.5 transition-all">
                                                    <span className="text-2xl">{link.emoji}</span>
                                                    <p className="font-semibold text-black text-sm mt-2">{link.label}</p>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === "Корзина" && (
                                    <div className="bg-white/10 backdrop-blur-md rounded-3xl px-8 py-8 shadow-md">
                                        <div className="flex items-center justify-between mb-6">
                                            <h2 className="font-black text-black text-xl">Корзина</h2>
                                            {cartItems.length > 0 && (
                                                <Link href="/checkout" className="px-5 py-2 bg-black text-white text-xs font-semibold rounded-xl hover:bg-black/80 transition">
                                                    Оформить заказ →
                                                </Link>
                                            )}
                                        </div>
                                        {cartItems.length === 0 ? (
                                            <div className="flex flex-col items-center justify-center py-16 gap-3">
                                                <span className="text-5xl">🛒</span>
                                                <p className="text-black/40 text-xl">Корзина пуста</p>
                                                <Link href="/menu" className="text-mb font-semibold text-black underline hover:no-underline">Перейти в меню</Link>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="flex flex-col gap-3 mb-6">
                                                    {cartItems.map((item) => (
                                                        <div key={item.id} className="flex items-center gap-4 bg-white/40 rounded-2xl px-4 py-3">
                                                            <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0">
                                                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="font-semibold text-black text-sm truncate">{item.name}</p>
                                                                <p className="text-black/40 text-xs">${item.price.toFixed(2)} × {item.quantity}</p>
                                                            </div>
                                                            <p className="font-black text-black text-sm shrink-0">${(item.price * item.quantity).toFixed(2)}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="flex justify-between items-center pt-5 border-t border-black/8">
                                                    <span className="font-semibold text-black">Итого:</span>
                                                    <span className="font-black text-black text-2xl">${cartTotal.toFixed(2)}</span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}

                                {activeTab === "Избранное" && (
                                    <div className="bg-white/10 backdrop-blur-md rounded-3xl px-8 py-8 shadow-md">
                                        <h2 className="font-black text-black text-xl mb-6">Избранное</h2>
                                        {wishlistItems.length === 0 ? (
                                            <div className="flex flex-col items-center justify-center py-16 gap-3">
                                                <span className="text-5xl">🤍</span>
                                                <p className="text-black/40 text-xl">Список пуст</p>
                                                <Link href="/menu" className="text-mb font-semibold text-black underline hover:no-underline">Перейти в меню</Link>
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-2 gap-4">
                                                {wishlistItems.map((item) => (
                                                    <div key={item.id} className="flex items-center gap-4 bg-white/40 rounded-2xl px-4 py-4">
                                                        <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0">
                                                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-semibold text-black text-sm truncate">{item.name}</p>
                                                            <p className="text-black/40 text-xs">${item.price.toFixed(2)}</p>
                                                            <Link href={`/menu/${item.id}`} className="text-xs text-black/50 hover:text-black underline transition mt-1 block">
                                                                Смотреть →
                                                            </Link>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;