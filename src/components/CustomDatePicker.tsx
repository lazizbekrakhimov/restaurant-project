"use client";

import { useState } from "react";
import { CalendarDays, Clock, ChevronLeft, ChevronRight } from "lucide-react";

export function CustomDatePicker({ value, onChange, placeholder = "Выберите дату" }: { value: Date | null; onChange: (d: Date) => void; placeholder?: string; }) {
    const [open, setOpen] = useState(false);
    const [viewDate, setViewDate] = useState(new Date());

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    const dayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

    const firstDay = new Date(year, month, 1).getDay();
    const offset = (firstDay === 0 ? 6 : firstDay - 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: (number | null)[] = [...Array(offset).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
    while (cells.length % 7 !== 0) cells.push(null);

    const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
    const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

    const selectDay = (day: number) => {
        const d = new Date(year, month, day);
        onChange(d);
        setOpen(false);
    };

    const isSelected = (day: number) => value && value.getFullYear() === year && value.getMonth() === month && value.getDate() === day;
    const isPast = (day: number) => new Date(year, month, day) < today;

    const displayValue = value ? value.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" }) : null;

    return (
        <div className="relative w-full">
            <button type="button" onClick={() => setOpen(!open)} className="w-full flex items-center justify-between cursor-pointer">
                <span className={`text-sm ${displayValue ? "text-black" : "text-black/40"}`}>{displayValue || placeholder}</span>
                <div className="flex items-center gap-2">
                    <CalendarDays size={20} className="text-black" />
                </div>
            </button>

            {open && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                    <div className="absolute left-0 top-full mt-3 z-50 w-72 bg-white/90 backdrop-blur-lg rounded-b-2xl shadow-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                            <button type="button" onClick={prevMonth} className="p-1 hover:bg-black/5 rounded-lg transition-colors cursor-pointer">
                                <ChevronLeft size={16} />
                            </button>
                            <span className="text-sm font-semibold text-black">{monthNames[month]} {year}</span>
                            <button type="button" onClick={nextMonth} className="p-1 hover:bg-black/5 rounded-lg transition-colors cursor-pointer">
                                <ChevronRight size={16} />
                            </button>
                        </div>
                        <div className="grid grid-cols-7 mb-2">
                            {dayNames.map(d => <div key={d} className="text-center text-[11px] text-black/40 font-medium py-1">{d}</div>)}
                        </div>
                        <div className="grid grid-cols-7 gap-y-1">
                            {cells.map((day, i) => (
                                <div key={i} className="flex items-center justify-center">
                                    {day ? (
                                        <button type="button" disabled={isPast(day)} onClick={() => selectDay(day)} className={`w-8 h-8 rounded-full text-sm transition-all duration-150 cursor-pointer
                                            ${isSelected(day) ? "bg-black text-white" : ""}
                                            ${isPast(day) ? "text-black/20 cursor-not-allowed" : "hover:bg-black/10 text-black"}
                                        `}>
                                            {day}
                                        </button>
                                    ) : <div className="w-8 h-8" />}
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export function CustomTimePicker({ value, onChange, placeholder = "Выберите время" }: { value: string; onChange: (t: string) => void; placeholder?: string; }) {
    const [open, setOpen] = useState(false);

    const times: string[] = [];
    for (let h = 10; h <= 22; h++) {
        times.push(`${String(h).padStart(2, "0")}:00`);
        if (h < 22) times.push(`${String(h).padStart(2, "0")}:30`);
    }

    return (
        <div className="relative w-full">
            <button type="button" onClick={() => setOpen(!open)} className="w-full flex items-center justify-between cursor-pointer">
                <span className={`text-sm ${value ? "text-black" : "text-black/40"}`}>{value || placeholder}</span>
                <div className="flex items-center gap-2">
                    <Clock size={20} className="text-black" />
                </div>
            </button>

            {open && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                    <div className="absolute left-0 top-full mt-3 z-50 w-48 bg-white/90 backdrop-blur-lg rounded-b-2xl shadow-xl overflow-hidden max-h-60 overflow-y-auto">
                        {times.map((t) => (
                            <button key={t} type="button" onClick={() => { onChange(t); setOpen(false); }} className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-all duration-150 cursor-pointer hover:bg-black hover:text-white ${value === t ? "bg-black/6 font-semibold text-black" : "text-black/70"}`}>
                                {t}
                                {value === t && (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
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