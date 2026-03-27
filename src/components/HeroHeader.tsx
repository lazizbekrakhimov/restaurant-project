"use client";

import { CartIcon, HeartIcon, IconBtn } from "@/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toggleWishlistPanel } from "@/redux/wishlistSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import CartModal from "./CardModal";
import WishlistModal from "./WishlistModal";
import { toggleCart } from "@/redux/cartSlice";

const navLinks = [
    { label: "Меню", href: "/menu" },
    { label: "Новости", href: "/news" },
    { label: "Бронирование", href: "/booking" },
    { label: "О нас", href: "/about" },
    { label: "Контакты", href: "/contacts" },
];

const HeroHeader = () => {
    const wishlistOpen = useAppSelector((s) => s.wishlist.isOpen);
    const cartOpen = useAppSelector((s) => s.cart.isOpen);
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const cartCount = useAppSelector((s) => s.cart.items.reduce((sum, i) => sum + i.quantity, 0));
    const wishlistCount = useAppSelector((s) => s.wishlist.items.length);

    return (
        <>
            <nav className="relative z-10 flex items-center justify-between px-12 py-12">
                <Link href="/" className="text-5xl font-black text-black tracking-tight">LOGO</Link>

                <ul className="flex items-center gap-8 text-[16px] leading-[150%] font-medium text-black">
                    {navLinks.map((item) => (
                        <li key={item.href}>
                            <Link href={item.href} className={`duration-200 transition-colors ${pathname === item.href ? "text-red-600" : "hover:text-red-600"}`}>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-3">
                    <IconBtn badge={wishlistCount || undefined} onClick={() => dispatch(toggleWishlistPanel())}>
                        <HeartIcon />
                    </IconBtn>
                    <IconBtn badge={cartCount || undefined} onClick={() => dispatch(toggleCart())}>
                        <CartIcon />
                    </IconBtn>
                </div>
            </nav>

            {cartOpen && <CartModal />}
            {wishlistOpen && <WishlistModal />}
        </>
    );
};

export default HeroHeader;