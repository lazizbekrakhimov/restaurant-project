"use client";

import { LanguageSelect } from '@/components';
import { MailIcon, PhoneIcon, SignIcon } from '@/icons';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { getMe, logout } from '@/service';
import { useRouter } from 'next/navigation';

const Header = () => {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        getMe().then(setUser).catch(() => setUser(null));
    }, []);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropRef.current && !dropRef.current.contains(e.target as Node)) setShowDropdown(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleLogout = async () => {
        await logout();
        setUser(null);
        router.push("/");
    };

    return (
        <div className="mt-3 px-32 flex items-center justify-between text-sm text-black">
            <div className="flex items-center gap-6">
                <a href="tel:+998907583838" className="flex hover:text-red-600 items-center gap-2 duration-200 transition-colors">
                    <PhoneIcon />
                    +998(90)758383833
                </a>
                <a href="mailto:info@bmgsoft.com" className="flex hover:text-red-600 items-center gap-2 duration-200 transition-colors">
                    <MailIcon />
                    info@bmgsoft.com
                </a>
            </div>

            <div className="flex items-center gap-7">
                <LanguageSelect />

                {user ? (
                    <div ref={dropRef} className="relative">
                        <button onMouseEnter={() => setShowDropdown(true)} className="group relative bg-black text-white px-4 py-2 flex items-center gap-2 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-300 ease-out overflow-hidden hover:scale-105 hover:shadow-lg active:scale-95">
                            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-linear-to-r from-transparent via-white/20 to-transparent" />
                            <SignIcon />
                            {user.role === "ADMIN" ? "Admin" : user.name}
                        </button>

                        <div onMouseLeave={() => setShowDropdown(false)}
                            className={`absolute right-0 top-full mt-1 w-40 bg-white/90 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden transition-all duration-200 z-50 ${showDropdown ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}>
                            {user.role === "ADMIN" && (
                                <Link href="/admin" onClick={() => setShowDropdown(false)} className="block px-4 py-3 text-xs font-semibold hover:bg-black hover:text-white transition-colors">
                                    Панель админа
                                </Link>
                            )}
                            <Link href="/profile" onClick={() => setShowDropdown(false)} className="block px-4 py-3 text-xs font-semibold hover:bg-black hover:text-white transition-colors">
                                Профиль
                            </Link>
                            <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-xs font-semibold text-red-500 hover:bg-red-500 hover:text-white transition-colors cursor-pointer">
                                Выйти
                            </button>
                        </div>
                    </div>
                ) : (
                    <div ref={dropRef} className="relative">
                        <Link href="/login" onMouseEnter={() => setShowDropdown(true)}
                            className="group relative bg-black text-white px-4 py-2 flex items-center gap-2 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-300 ease-out overflow-hidden hover:scale-105 hover:shadow-lg active:scale-95">
                            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-linear-to-r from-transparent via-white/20 to-transparent" />
                            <SignIcon />
                            Вход в аккаунт
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;