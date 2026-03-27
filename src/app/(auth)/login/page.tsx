"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookingIcon } from "@/icons";
import { AuthInput, SubmitButton } from "@/components";
import { login } from "@/service";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError("Заполните все поля"); return; }
    setLoading(true);
    setError("");
    try {
      const res = await login(email, password);
      if (res.user?.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setError(err.message || "Неверный электронная почта или пароль");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm">
      <div className="w-25 h-25 bg-black rounded-full flex items-center justify-center shadow-xl -mb-15 relative z-10 ml-10">
        <BookingIcon />
      </div>

      <div className="bg-white/40 backdrop-blur-2xl rounded-4xl px-10 pt-16 pb-10 shadow-2xl">
        <h2 className="text-2xl font-bold text-black my-5 text-start">
          Вход в аккаунт
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <AuthInput type="email" placeholder="Ваш электронная почта" value={email} onChange={setEmail} />
          <AuthInput type="password" placeholder="Пароль" value={password} onChange={setPassword} />

          {error && <p className="text-red-500 text-xs -mt-3">{error}</p>}

          <SubmitButton>{loading ? "Вход..." : "Вход в аккаунт"}</SubmitButton>

          <Link href="/register" className="text-center text-sm text-black/50 hover:text-black transition-colors">
            Еще нет учетной записи?
          </Link>
        </form>
      </div>
    </div>
  );
}