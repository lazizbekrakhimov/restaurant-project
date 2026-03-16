"use client";

import Link from "next/link";
import { useState } from "react";
import { BookingIcon, Field } from "@/icons";
import { AuthInput, SubmitButton } from "@/components";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ username, password });
  };

  return (
    <div className="w-full max-w-sm">

      <div className="w-25 h-25 bg-black rounded-full flex items-center justify-center shadow-xl -mb-15 relative z-10 ml-10">
        <BookingIcon/>
      </div>

      <div className="bg-white/40 backdrop-blur-2xl rounded-4xl px-10 pt-16 pb-10 shadow-2xl">

        <h2 className="text-2xl font-bold text-black my-5 text-start">
          Вход в аккаунт
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          <AuthInput type="text" placeholder="Ваше имя пользователя" value={username} onChange={setUsername} />

          <AuthInput type="password" placeholder="Пароль" value={password} onChange={setPassword} />

          <Link href="/forgot-password" className="text-xs text-black/40 hover:text-black transition-colors w-fit -mt-2">Забыли пароль?</Link>

          <SubmitButton>Вход в аккаунт</SubmitButton>

          <Link href="/register"
            className="text-center text-sm text-black/50 hover:text-black transition-colors">
            Еще нет учетной записи?
          </Link>

        </form>
      </div>
    </div>
  );
}