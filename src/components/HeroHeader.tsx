import { CartIcon, HeartIcon, IconBtn } from "@/icons";
import Link from "next/link";

const navLinks = [
    { label: "Меню", href: "/menu" },
    { label: "Новости", href: "/news" },
    { label: "Бронирование", href: "/booking" },
    { label: "О нас", href: "/about" },
    { label: "Контакты", href: "/contacts" },
];

const HeroHeader = () => {
    return (
        <nav className="relative z-10 flex items-center justify-between px-12 py-8">
            <div className="text-5xl font-black text-black tracking-tight">LOGO</div>
            <ul className="flex items-center gap-8 text-sm font-medium text-black">
                {navLinks.map((item) => (
                    <li key={item.href}>
                        <Link href={item.href} className="hover:text-red-600 duration-200 transition-colors">
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="flex items-center gap-3">
                <IconBtn><HeartIcon /></IconBtn>
                <IconBtn badge={1}><CartIcon /></IconBtn>
            </div>
        </nav>
    );
};

export default HeroHeader;