"use client";

import Link from "next/link";
import { useState } from "react";
import CustomSelect from "./CustomSelect";
import SubmitButton from "./SubminButton";
import { CustomDatePicker, CustomTimePicker } from "./CustomDatePicker";

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
    const [guests, setGuests] = useState("");
    const [place, setPlace] = useState("");
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState("");

    return (
        <div className="px-35 ">
            <h2 className={`${exTitleClass} font-bold font-glory text-[32px] leading-[150%] mt-16 mb-12`} style={{ fontSize: "48px", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }}>
                {title}
            </h2>

            <div>
                <input type="email" className={fieldClass} placeholder="Ваш электронный адрес" />

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

                <div className="flex justify-end mt-2">
                    <SubmitButton extraClass="!px-10 !py-4 item-end!">Забронировать</SubmitButton>
                </div>
            </div>
        </div>
    );
};

export default CustomBooking;