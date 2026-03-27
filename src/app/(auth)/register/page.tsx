"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthInput, SubmitButton } from "@/components";
import { register } from "@/service";

export default function RegisterPage() {
    const router = useRouter();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!firstName || !email || !password) { setError("Заполните обязательные поля"); return; }
        if (password !== confirmPassword) { setError("Пароли не совпадают"); return; }
        if (!agreed) { setError("Примите условия использования"); return; }

        setLoading(true);
        setError("");
        try {
            register({
            name: `${firstName} ${lastName}`.trim(),
            email,
            password,
            phone,
          });
            router.push("/");
        } catch (err: any) {
            setError(err.message || "Ошибка регистрации");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-sm">
            <div className="bg-white/40 backdrop-blur-2xl rounded-4xl px-10 py-10 shadow-2xl">
                <h2 className="text-2xl font-black text-black mb-8 text-center">
                    Зарегистрироваться
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <AuthInput type="text" placeholder="Ваше имя" value={firstName} onChange={setFirstName} />
                    <AuthInput type="text" placeholder="Фамилия" value={lastName} onChange={setLastName} />
                    <AuthInput type="tel" placeholder="Ваш номер телефона" value={phone} onChange={setPhone} />
                    <AuthInput type="email" placeholder="Ваш электронная почта" value={email} onChange={setEmail} />
                    <AuthInput type="password" placeholder="Пароль" value={password} onChange={setPassword} />
                    <AuthInput type="password" placeholder="Подтвердите пароль" value={confirmPassword} onChange={setConfirmPassword} />

                    <label className="flex items-start gap-3 cursor-pointer mt-1">
                        <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 w-4 h-4 accent-black bg-white/40 cursor-pointer shrink-0" />
                        <span className="text-[10.5px] text-black/50 leading">
                            Я прочитал и принял{" "}
                            <Link href="#" className="text-black/70 hover:underline hover:text-black transition-colors">
                                Политику конфиденциальности
                            </Link>{" "}
                            и Условия*
                        </span>
                    </label>

                    {error && <p className="text-red-500 text-xs">{error}</p>}

                    <SubmitButton>{loading ? "Регистрация..." : "Зарегистрироваться"}</SubmitButton>

                    <Link href="/login" className="text-center text-sm text-black/50 hover:text-black transition-colors">
                        Уже есть аккаунт?
                    </Link>
                </form>
            </div>
        </div>
    );
}