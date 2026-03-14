"use client";

import { CustomSelect } from "@/components";
import { BookingIcon, CalendarIcon, ClockIcon, Field } from "@/icons";
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
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ phone, guests, date, time, location });
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute pointer-events-none z-0" style={{ top: "100px", right: "660px", width: 220, height: 240, transform: "rotate(-80deg)" }}>
        <Image src="/images/leaf.png" alt="" fill className="object-contain" />
      </div>
      <div className="absolute pointer-events-none z-0" style={{ bottom: "60px", right: "630px", width: 230, height: 250, transform: "rotate(160deg)" }}>
        <Image src="/images/leaf.png" alt="" fill className="object-contain" />
      </div>
      <div className="containers flex items-center gap-16">
        <div className="relative z-10 w-full max-w-90 shrink-0">
          <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center shadow-xl -mb-10 relative z-10 ml-8">
            <BookingIcon />
          </div>
          <div className="bg-white/40 backdrop-blur-xl rounded-4xl px-8 pt-14 pb-14 shadow-2xl">
            <h2 className="text-[26px] font-bold text-black mb-7 leading-tight">
              Забронировать стол
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <Field>
                <input type="tel" placeholder="Ваш номер" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-transparent text-sm text-black placeholder:text-black/40 outline-none" />
              </Field>
              <Field>
                <CustomSelect options={guestOptions} placeholder="На сколько человек?" value={guests} onChange={setGuests} />
              </Field>
              <Field>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-transparent text-sm outline-none cursor-pointer" style={{ colorScheme: "light", color: date ? "#000" : "rgba(0,0,0,0.4)" }} />
                <CalendarIcon />
              </Field>
              <Field>
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full bg-transparent text-sm outline-none cursor-pointer" style={{ colorScheme: "light", color: time ? "#000" : "rgba(0,0,0,0.4)" }} />
                <ClockIcon />
              </Field>
              <Field>
                <CustomSelect options={locationOptions} placeholder="Выберите место" value={location} onChange={setLocation} />
              </Field>
              <button type="button" className="text-left text-sm text-blue-900 hover:text-blue-600 hover:underline cursor-pointer w-fit transition-colors" >
                Выбрать места на карте
              </button>
              <button type="submit" className=" relative w-fit bg-black text-white px-10 py-4 mt-5 rounded-2xl font-bold text-base overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-black/30 active:scale-95 group cursor-pointer " >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-linear-to-r from-transparent via-white/10 to-transparent" />
                Забронировать
              </button>
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
}

export default BookingSection