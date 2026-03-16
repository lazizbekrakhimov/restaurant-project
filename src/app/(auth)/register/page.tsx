"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthInput, SubmitButton } from "@/components";
import { RegisterForm } from "@/@types";

export default function RegisterPage() {
  const [form, setForm] = useState<RegisterForm>({
    firstName: "", lastName: "", phone: "",
    username: "", password: "", confirmPassword: "",
    agreed: false,
  });

  const set = (key: keyof RegisterForm, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="w-full max-w-sm">
      <div className="bg-white/40 backdrop-blur-2xl rounded-4xl px-10 py-10 shadow-2xl">

        <h2 className="text-2xl font-black text-black mb-8 text-center">
          Зарегистрироваться
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <AuthInput type="text" placeholder="Ваше имя"
            value={form.firstName} onChange={(v) => set("firstName", v)} />

          <AuthInput type="text" placeholder="Фамилия"
            value={form.lastName} onChange={(v) => set("lastName", v)} />

          <AuthInput type="tel" placeholder="Ваш номер телефона"
            value={form.phone} onChange={(v) => set("phone", v)} />

          <AuthInput type="text" placeholder="Ваше имя пользователя"
            value={form.username} onChange={(v) => set("username", v)} />

          <AuthInput type="password" placeholder="Пароль"
            value={form.password} onChange={(v) => set("password", v)} />

          <AuthInput type="password" placeholder="Подтвердите пароль"
            value={form.confirmPassword} onChange={(v) => set("confirmPassword", v)} />

          <label className="flex items-start gap-3 cursor-pointer mt-1">
            <input type="checkbox" checked={form.agreed} onChange={(e) => set("agreed", e.target.checked)} className="mt-0.5 w-4 h-4 accent-black bg-white/40 cursor-pointer shrink-0" />
            <span className="text-[10.5px] text-black/50 leading">
              Я прочитал и принял{" "}
              <Link href="#" className="text-black/70 hover:underline hover:text-black transition-colors">
                Политику конфиденциальности
              </Link>{" "}
              и Условия*
            </span>
          </label>

          <SubmitButton>Вход в аккаунт</SubmitButton>

          <Link href="/login"
            className="text-center text-sm text-black/50 hover:text-black transition-colors">
            Уже есть аккаунт?
          </Link>
        </form>
      </div>
    </div>
  );
}