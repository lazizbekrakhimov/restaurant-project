"use client";

import { useState } from "react";
import { ChevronIcon } from "@/icons";

interface Option {
    value: string;
    label: string;
}

interface CustomSelectProps {
    options: Option[];
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    icon?: React.ReactNode;
}

export default function CustomSelect({ options, placeholder, value, onChange, icon }: CustomSelectProps) {
    const [open, setOpen] = useState(false);
    const selected = options.find((o) => o.value === value);

    return (
        <div className="relative w-full">
            <button type="button" onClick={() => setOpen(!open)} className="w-full flex items-center justify-between cursor-pointer group" >
                <span className={`text-sm ${selected ? "text-black" : "text-black/40"}`}>{selected ? selected.label : placeholder}</span>
                <div className="flex items-center gap-2">
                    {icon}
                    <span className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}><ChevronIcon /></span>
                </div>
            </button>

            {open && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                    <div className="absolute left-0 top-full mt-3 z-50 w-full bg-white/80 backdrop-blur-lg rounded-b-2xl shadow-xl overflow-hidden ">
                        {options.map((option) => (
                            <button key={option.value} type="button" onClick={() => { onChange(option.value); setOpen(false); }} className={` w-full flex items-center justify-between px-4 py-3 text-sm transition-all duration-150 cursor-pointer hover:bg-black hover:text-white ${value === option.value ? "bg-black/6 font-semibold text-black" : "text-black/70"} `}>
                                {option.label}
                                {value === option.value && (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
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