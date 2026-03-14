"use client";

import { useState } from "react";

const languages = [
    { value: "ru", flag: "🇷🇺", label: "Русский" },
    { value: "en", flag: "🇬🇧", label: "English" },
    { value: "uz", flag: "🇺🇿", label: "O'zbekcha" },
];

export default function LanguageSelect() {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(languages[0]);

    return (
        <div className="relative">
            <button onClick={() => setOpen(!open)} className="flex items-center gap-2 text-sm font-medium text-black cursor-pointer px-3 py-1.5 rounded-lg transition-all duration-200  hover:bg-black/8 active:scale-95 group">
                <span>{selected.flag}</span>
                <span>{selected.label}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>
            {open && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 z-50 bg-white/20 backdrop-blur-xl rounded-xl shadow-xl overflow-hidden min-w-37.5 animate-in fade-in slide-in-from-top-2 duration-200">
                        {languages.map((lang) => (
                            <button key={lang.value} onClick={() => { setSelected(lang); setOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-150 cursor-pointer hover:bg-black hover:text-white active:scale-95 ${selected.value === lang.value ? "bg-black/6 font-semibold" : "font-medium text-black" }`}>
                                <span className="text-base">{lang.flag}</span>
                                <span>{lang.label}</span>
                                {selected.value === lang.value && (
                                    <svg className="ml-auto" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}