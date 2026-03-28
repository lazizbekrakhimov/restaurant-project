"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getMe, logout } from "@/service";
import { LayoutDashboard, UtensilsCrossed, Users, ClipboardList, MessageSquare, Newspaper, Images, LogOut, ExternalLink, ChevronRight } from "lucide-react";

const sidebarLinks = [
  { href: "/admin", label: "Главная", icon: LayoutDashboard, exact: true },
  { href: "/admin/menu", label: "Меню", icon: UtensilsCrossed },
  { href: "/admin/news", label: "Новости", icon: Newspaper },
  { href: "/admin/gallery", label: "Галерея", icon: Images },
  { href: "/admin/users", label: "Пользователи", icon: Users },
  { href: "/admin/orders", label: "Брони", icon: ClipboardList },
  { href: "/admin/contacts", label: "Сообщения", icon: MessageSquare },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMe()
      .then((u) => {
        if (u?.role !== "SUPERADMIN") router.replace("/");
        else { setUser(u); setLoading(false); }
      })
      .catch(() => router.replace("/"));
  }, []);

  const handleLogout = async () => { await logout(); router.push("/"); };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <Image src="/images/bbgg.png" alt="" fill className="object-cover select-none" priority />
      <div className="absolute inset-0" style={{ background: "rgba(255,248,240,0.7)", backdropFilter: "blur(20px)" }} />
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-black/10 border-t-black animate-spin" />
        <p className="text-black/40 text-sm font-medium">Загрузка...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex relative">
      <Image src="/images/bbgg.png" alt="" fill className="object-cover" priority />

      <aside className="relative z-10 w-64 shrink-0 flex flex-col m-3 rounded-3xl overflow-hidden bg-white/40"
        style={{ backdropFilter: "blur(24px)", boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}>

        <div className="px-6 py-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-black flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-lg">R</span>
            </div>
            <div>
              <p className="font-black text-black text-sm tracking-tight">Restaurant</p>
              <p className="text-black/40 text-xs">Панель управления</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          {sidebarLinks.map(({ href, label, icon: Icon, exact }) => {
            const isActive = exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");
            return (
              <Link key={href} href={href} className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 group ${isActive ? "bg-black text-white shadow-lg" : "text-black/60 hover:text-black hover:bg-black/5"}`}>
                <Icon size={16} className={isActive ? "text-white" : "text-black/40 group-hover:text-black/70"} />
                <span>{label}</span>
                {isActive && <ChevronRight size={14} className="ml-auto text-white/50" />}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4">
          <div className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-white/30">
            <Link href={"profile"} className="w-9 h-9 rounded-full bg-black flex items-center justify-center font-black text-white text-sm shrink-0">
              {user?.name?.[0]?.toUpperCase()}
            </Link>
            <div className="flex-1 min-w-0">
              <Link href={"profile"} className="text-black font-semibold hover:underline text-xs truncate">{user?.name}</Link>
              <p className="text-black/30 text-xs truncate">{user?.role}</p>
            </div>
            <button onClick={handleLogout} title="Выйти" className="text-black/30 hover:text-red-500 transition cursor-pointer">
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </aside>

      <main className="relative z-10 flex-1 flex flex-col min-w-0">
        <header className="bg-white/40 m-3 mb-2 rounded-3xl flex items-center justify-between px-8 py-4" style={{ backdropFilter: "blur(24px)", boxShadow: "0 8px 32px rgba(0,0,0,0.08)", }}>
          <div>
            <h1 className="text-black font-black text-lg">
              {sidebarLinks.find((l) => l.exact ? pathname === l.href : pathname === l.href || pathname.startsWith(l.href + "/"))?.label || "Панель"}
            </h1>
            <p className="text-black/30 text-xs mt-0.5 flex gap-2">
              <span> {new Date().toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "long", })} </span>
              <span>•</span>
              <span> {new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit", hour12: false, })} </span>
            </p>
          </div>
          <Link href="/" target="_blank" className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-black/60 hover:text-black hover:bg-black/5 transition" >
            <ExternalLink size={14} />
            Сайт
          </Link>
        </header>
        <div className="flex-1 overflow-auto p-3 pt-3">
          {children}
        </div>
      </main>
    </div>
  );
}
