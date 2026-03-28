"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getMenu, getUsers, getReservations, getContacts, getNews, getGallery } from "@/service";
import { UtensilsCrossed, Users, ClipboardList, MessageSquare, Newspaper, Images, TrendingUp, Clock } from "lucide-react";

const Card = ({ label, value, icon: Icon, color, href, sub }: any) => (
  <Link href={href} className="group flex flex-col gap-4 p-6 bg-white/50 rounded-3xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
    style={{ backdropFilter: "blur(16px)", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
    <div className="flex items-center justify-between">
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
        <Icon size={22} style={{ color }} />
      </div>
      <TrendingUp size={14} className="text-black/20 group-hover:text-black/40 transition" />
    </div>
    <div>
      <p className="text-3xl font-black text-black">{value}</p>
      <p className="text-black/50 text-sm mt-1 font-medium">{label}</p>
      {sub && <p className="text-black/30 text-xs mt-0.5">{sub}</p>}
    </div>
  </Link>
);

const statusColor: Record<string, string> = { PENDING: "#f59e0b", CONFIRMED: "#22c55e", CANCELLED: "#ef4444" };
const statusLabel: Record<string, string> = { PENDING: "Ожидает", CONFIRMED: "Подтверждён", CANCELLED: "Отменён" };

export default function AdminDashboard() {
  const [stats, setStats] = useState({ menu: 0, users: 0, reservations: 0, contacts: 0, news: 0, gallery: 0 });
  const [reservations, setReservations] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    getMenu().then(d => setStats(s => ({ ...s, menu: d.length }))).catch(() => { });
    getUsers().then(d => setStats(s => ({ ...s, users: d.length }))).catch(() => { });
    getNews().then(d => setStats(s => ({ ...s, news: d.length }))).catch(() => { });
    getGallery().then(d => setStats(s => ({ ...s, gallery: d.length }))).catch(() => { });
    getReservations().then(d => {
      setStats(s => ({ ...s, reservations: d.length }));
      setReservations(d.slice(0, 6));
    }).catch(() => { });
    getContacts().then(d => {
      setStats(s => ({ ...s, contacts: d.length }));
      setContacts(d.slice(0, 5));
      setUnread(d.filter((c: any) => !c.isRead).length);
    }).catch(() => { });
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-6 gap-6">
        <Card label="Блюда в меню" value={stats.menu} icon={UtensilsCrossed} color="#e11d48" href="/admin/menu" />
        <Card label="Пользователи" value={stats.users} icon={Users} color="#0284c7" href="/admin/users" />
        <Card label="Брони" value={stats.reservations} icon={ClipboardList} color="#16a34a" href="/admin/orders" sub={`${reservations.filter(r => r.status === 'PENDING').length} ожидают`} />
        <Card label="Сообщения" value={stats.contacts} icon={MessageSquare} color="#d97706" href="/admin/contacts" sub={unread > 0 ? `${unread} непрочитанных` : "Все прочитаны"} />
        <Card label="Новости" value={stats.news} icon={Newspaper} color="#7c3aed" href="/admin/news" />
        <Card label="Галерея" value={stats.gallery} icon={Images} color="#0891b2" href="/admin/gallery" />
      </div>

      <div className="grid grid-cols-5 gap-4 mt-2">
        <Link href="/admin/orders" className="col-span-3 rounded-3xl p-6 bg-white/50 transition-all duration-300 hover:-translate-y-1" style={{ backdropFilter: "blur(16px)", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-black font-black text-base">Последние брони</h2>
            <span className="text-black/40 text-xs font-semibold">Все →</span>
          </div>
          <div className="flex flex-col gap-2">
            {reservations.length === 0 ? (
              <p className="text-black/30 text-sm text-center py-8">Нет данных</p>
            ) : reservations.map((r) => (
              <div key={r.id} className="flex items-center gap-3 px-4 py-3 rounded-2xl" style={{ background: "rgba(0,0,0,0.03)" }}>
                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white text-xs font-black shrink-0">
                  {r.email?.[0]?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-black font-semibold text-xs truncate">{r.email}</p>
                  <p className="text-black/40 text-xs flex items-center gap-1"><Clock size={10} /> {r.date} {r.time} • {r.guests} чел.</p>
                </div>
                <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ background: `${statusColor[r.status]}15`, color: statusColor[r.status] }}>
                  {statusLabel[r.status] || r.status}
                </span>
              </div>
            ))}
          </div>
        </Link>

        <Link href="/admin/contacts" className="col-span-2 rounded-3xl p-6 bg-white/50 transition-all duration-300 hover:-translate-y-1" style={{ backdropFilter: "blur(16px)", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-black font-black text-base">Сообщения</h2>
            <span className="text-black/40 text-xs font-semibold">Все →</span>
          </div>
          <div className="flex flex-col gap-2">
            {contacts.length === 0 ? (
              <p className="text-black/30 text-sm text-center py-8">Нет данных</p>
            ) : contacts.map((c) => (
              <div key={c.id} className="flex items-start gap-3 px-4 py-3 rounded-2xl" style={{ background: "rgba(0,0,0,0.03)" }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-black text-xs font-black shrink-0" style={{ background: "rgba(0,0,0,0.08)" }}>
                  {c.name?.[0]?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-black font-semibold text-xs truncate">{c.name}</p>
                    {!c.isRead && <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />}
                  </div>
                  <p className="text-black/40 text-xs truncate">{c.message?.slice(0, 35)}...</p>
                </div>
              </div>
            ))}
          </div>
        </Link>
      </div>
    </div>
  );
}
