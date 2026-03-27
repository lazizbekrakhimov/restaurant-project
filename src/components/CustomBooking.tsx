"use client";

import Link from "next/link";
import { useState } from "react";
import CustomSelect from "./CustomSelect";
import SubmitButton from "./SubminButton";
import { CustomDatePicker, CustomTimePicker } from "./CustomDatePicker";
import { createReservation } from "@/service";

const guestOptions = [
    { value: "1", label: "1 человек" },
    { value: "2", label: "2 человека" },
    { value: "3", label: "3 человека" },
    { value: "4", label: "4 человека" },
    { value: "5", label: "5 человек" },
    { value: "6", label: "6 человек" },
];

const tableOptions = [
    { value: "1", label: "Первая стол" },
    { value: "2", label: "Вторая стол" },
    { value: "3", label: "Третий стол" },
    { value: "4", label: "Четвертая стол" },
];

const fieldClass = "outline-none mb-10 w-full border-b-2 px-2 py-2.5 text-[16px] text-[#585858] leading-[150%] font-glory bg-transparent";
const wrapClass = "w-full border-b-2 px-2 py-2.5 mb-10";

const CustomBooking = ({ title, exTitleClass }: { title: string; exTitleClass?: string; exBtnClass?: string }) => {
    const [email, setEmail] = useState("");
    const [guests, setGuests] = useState("");
    const [place, setPlace] = useState("");
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !guests || !date || !time || !place) {
            setError("Пожалуйста, заполните все поля");
            return;
        }
        setLoading(true);
        setError("");
        try {
            await createReservation({
                email,
                guests: Number(guests),
                date: date.toISOString().split("T")[0],
                time,
                location: place,
            });
            setSuccess(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="px-35 py-20 text-center">
                <div className="text-6xl mb-4">✅</div>
                <h2 className="text-2xl font-black text-black mb-2">Стол забронирован!</h2>
                <p className="text-black/50 mb-6">Подтверждение отправлено на <b>{email}</b></p>
                <button onClick={() => { setSuccess(false); setEmail(""); setGuests(""); setDate(null); setTime(""); setPlace(""); }} className="px-8 py-3 bg-black text-white rounded-xl cursor-pointer hover:bg-black/80 transition-colors">
                    Забронировать ещё
                </button>
            </div>
        );
    }

    return (
        <div className="px-35">
            <h2 className={`${exTitleClass} font-bold font-glory leading-[150%] mt-16 mb-12`} style={{ fontSize: "48px", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }}>
                {title}
            </h2>

            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={fieldClass} placeholder="Ваш электронный адрес" />

                <div className={wrapClass}>
                    <CustomSelect options={guestOptions} placeholder="На сколько человек?" value={guests} onChange={setGuests} />
                </div>

                <div className={wrapClass}>
                    <CustomDatePicker value={date} onChange={setDate} />
                </div>

                <div className={wrapClass}>
                    <CustomTimePicker value={time} onChange={setTime} />
                </div>

                <div className={wrapClass}>
                    <CustomSelect options={tableOptions} placeholder="Выберите место" value={place} onChange={setPlace} />
                </div>

                <Link href="#" className="text-[13px] leading-[150%] text-[#06004C] block mb-17.5 mt-2.5">
                    Выбрать места на карте
                </Link>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <div className="flex justify-end mt-2">
                    <SubmitButton extraClass="!px-10 !py-4">{loading ? "Загрузка..." : "Забронировать"}</SubmitButton>
                </div>
            </form>
        </div>
    );
};

export default CustomBooking;