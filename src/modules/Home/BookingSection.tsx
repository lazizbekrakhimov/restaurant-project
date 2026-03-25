"use client";

import { CustomDatePicker, CustomSelect, CustomTimePicker, Leaf, SubmitButton } from "@/components";
import { BookingIcon, Field } from "@/icons";
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
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ phone, guests, date, time, location });
  };

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
                <input type="tel" placeholder="Ваш номер" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-transparent text-sm text-black placeholder:text-black/40 outline-none" />
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

              <button type="button" className="text-left text-sm text-blue-900 hover:text-blue-600 hover:underline cursor-pointer w-fit transition-colors">
                Выбрать места на карте
              </button>

              <SubmitButton children={'Забронировать'} />
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

export default BookingSection;