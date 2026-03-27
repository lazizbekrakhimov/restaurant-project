"use client";

import { CustomDatePicker, CustomSelect, CustomTimePicker, Leaf, SubmitButton } from "@/components";
import { BookingIcon, Field } from "@/icons";
import { createReservation } from "@/service";
import Image from "next/image";
import { useState } from "react";

const guestOptions = [
    { value: "1", label: "1 человек" },
    { value: "2", label: "2 человека" },
    { value: "3", label: "3 человека" },
    { value: "4", label: "4 человека" },
    { value: "5", label: "5+ человек" },
];

const locationOptions = [
    { value: "hall1", label: "Зал 1" },
    { value: "hall2", label: "Зал 2" },
    { value: "terrace", label: "Терраса" },
    { value: "vip", label: "VIP зал" },
];

const BookingSection = () => {
    const [email, setEmail] = useState("");
    const [guests, setGuests] = useState("");
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState("");
    const [location, setLocation] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !guests || !date || !time || !location) {
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
                location,
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
            <section className="relative overflow-hidden">
                <div className="containers flex items-center justify-center py-20">
                    <div className="text-center">
                        <div className="text-6xl mb-4">✅</div>
                        <h2 className="text-2xl font-black text-black mb-2">Стол забронирован!</h2>
                        <p className="text-black/50">Мы свяжемся с вами по email: <b>{email}</b></p>
                        <button onClick={() => { setSuccess(false); setEmail(""); setGuests(""); setDate(null); setTime(""); setLocation(""); }} className="mt-6 px-8 py-3 bg-black text-white rounded-xl cursor-pointer hover:bg-black/80 transition-colors">
                            Забронировать ещё
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="relative overflow-hidden">
            <Leaf style={{ top: "100px", right: "660px", width: 220, height: 240, transform: "rotate(-80deg)" }} />
            <Leaf style={{ bottom: "60px", right: "630px", width: 230, height: 250, transform: "rotate(160deg)" }} />

            <div className="containers flex items-center gap-16">
                <div className="relative z-10 w-full max-w-90 shrink-0">
                    <div className="w-25 h-25 bg-black rounded-full flex items-center justify-center shadow-xl -mb-18 relative z-10 ml-10">
                        <BookingIcon />
                    </div>

                    <div className="bg-white/40 backdrop-blur-xl rounded-4xl px-8 pt-25 pb-14 shadow-2xl">
                        <h2 className="text-[26px] font-bold text-black mb-7 leading-tight">
                            Забронировать стол
                        </h2>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <Field>
                                <input type="email" placeholder="Ваш email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-transparent text-sm text-black placeholder:text-black/40 outline-none" />
                            </Field>
                            <Field>
                                <CustomSelect options={guestOptions} placeholder="На сколько человек?" value={guests} onChange={setGuests} />
                            </Field>
                            <Field>
                                <CustomDatePicker value={date} onChange={setDate} />
                            </Field>
                            <Field>
                                <CustomTimePicker value={time} onChange={setTime} />
                            </Field>
                            <Field>
                                <CustomSelect options={locationOptions} placeholder="Выберите место" value={location} onChange={setLocation} />
                            </Field>

                            {error && <p className="text-red-500 text-xs">{error}</p>}

                            <button type="button" className="text-left text-sm text-blue-900 hover:text-blue-600 hover:underline cursor-pointer w-fit transition-colors">
                                Выбрать места на карте
                            </button>

                            <SubmitButton>{loading ? "Загрузка..." : "Забронировать"}</SubmitButton>
                        </form>
                    </div>
                </div>

                <div className="relative flex-1 flex items-center justify-center">
                    <div className="relative w-256.25 h-234">
                        <Image src="/images/pizza.svg" alt="Pizza" fill className="object-contain drop-shadow-2xl" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BookingSection;