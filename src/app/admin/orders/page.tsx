"use client";

import { useEffect, useState } from "react";
import { Search, Clock } from "lucide-react";
import { getReservations, updateReservation } from "@/service";
import { AdminSelect, AdminTable } from "@/components";

const statusColor: Record<string, string> = { PENDING: "#d97706", CONFIRMED: "#16a34a", CANCELLED: "#dc2626" };
const statusLabel: Record<string, string> = { PENDING: "Ожидает", CONFIRMED: "Подтверждён", CANCELLED: "Отменён" };
const STATUS_OPTIONS = [{ value: "PENDING", label: "Ожидает" }, { value: "CONFIRMED", label: "Подтверждён" }, { value: "CANCELLED", label: "Отменён" }];
const FILTER_OPTIONS = [{ value: "", label: "Все статусы" }, ...STATUS_OPTIONS];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [updating, setUpdating] = useState<number | null>(null);
  const load = () => getReservations().then(setOrders).catch(() => { });

  useEffect(() => { load(); }, []);
  const filtered = orders.filter(o => o.email?.toLowerCase().includes(search.toLowerCase()) && (statusFilter === "" || o.status === statusFilter));
  const handleStatus = async (id: number, status: string) => {
    setUpdating(id);
    try { await updateReservation(id, { status }); load(); } catch { alert("Ошибка"); } finally { setUpdating(null); }
  };

  const columns = [
    { key: "id", label: "#", render: (r: any) => <span className="text-black/30 text-sm">#{r.id}</span> },
    { key: "email", label: "Email", render: (r: any) => <span className="text-black font-semibold text-sm">{r.email}</span> },
    { key: "guests", label: "Гостей", render: (r: any) => <span className="text-black/60 text-sm">{r.guests} чел.</span> },
    { key: "datetime", label: "Дата и время", render: (r: any) => <span className="text-black/60 text-sm flex items-center gap-1"><Clock size={12} />{r.date} {r.time}</span> },
    { key: "location", label: "Место", render: (r: any) => <span className="text-black/40 text-sm">{r.location}</span> },
    { key: "status", label: "Статус", render: (r: any) => <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: `${statusColor[r.status]}12`, color: statusColor[r.status] }}>{statusLabel[r.status] || r.status}</span> },
    {
      key: "actions", label: "Изменить", render: (r: any) => (
        <div className="w-44" onClick={e => e.stopPropagation()}>
          <AdminSelect label="" options={STATUS_OPTIONS} value={r.status} onChange={(v) => handleStatus(r.id, v)} />
        </div>
      )
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div><h2 className="text-black font-black text-xl">Брони</h2><p className="text-black/40 text-sm">{orders.length} записей • {orders.filter(o => o.status === "PENDING").length} ожидают</p></div>
      <div className="flex gap-3">
        <div className="flex-1 relative"><Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск по email..." className="w-full pl-10 pr-4 py-3 rounded-2xl text-sm text-black bg-white/50 outline-none" style={{ backdropFilter: "blur(12px)" }} /></div>
        <div className="w-52"><AdminSelect label="" options={FILTER_OPTIONS} value={statusFilter} onChange={setStatusFilter} placeholder="Все статусы" /></div>
      </div>
      <AdminTable columns={columns} data={filtered} emptyText="Бронирований нет" />
    </div>
  );
}
