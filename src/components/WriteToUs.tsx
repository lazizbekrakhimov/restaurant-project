"use client";

import { useState } from "react";
import SubmitButton from "./SubminButton";
import { createContact } from "@/service";

const inputClass = "w-full backdrop-blur-sm outline-none px-5 py-4 text-[18px] text-black placeholder:text-black/40 placeholder:text-[18px] focus:border-black/40 transition-colors";

const WriteToUs = ({ title = "Написать нам" }: { title?: string }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !message) {
            setError("Заполните обязательные поля");
            return;
        }
        setLoading(true);
        setError("");
        try {
            await createContact({ name, email, phone, message });
            setSuccess(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="text-center py-16">
                <div className="text-6xl mb-4">✅</div>
                <h2 className="text-3xl font-black text-black mb-2">Сообщение отправлено!</h2>
                <p className="text-black/50">Мы свяжемся с вами в ближайшее время.</p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-center font-black text-black p-12" style={{ fontSize: "48px", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1 }}>
                {title}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="text" placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
                <input type="email" placeholder="Ваш E-mail" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
                <input type="tel" placeholder="Ваш номер телефона" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
                <textarea placeholder="Ваше сообщение" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className={`${inputClass} resize-none`} />

                {error && <p className="text-red-500 text-sm px-5">{error}</p>}

                <div className="flex justify-end mt-2">
                    <SubmitButton extraClass="!px-10 !py-4">{loading ? "Отправка..." : "Отправить"}</SubmitButton>
                </div>
            </form>
        </div>
    );
};

export default WriteToUs;