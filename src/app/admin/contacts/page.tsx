"use client";

import { useEffect, useState } from "react";
import { Search, CheckCheck, X } from "lucide-react";
import { getContacts, markContactRead } from "@/service";
import { AdminModal } from "@/components";

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<any>(null);
  const [marking, setMarking] = useState<number | null>(null);
  const load = () => getContacts().then(setContacts).catch(() => { });

  useEffect(() => { load(); }, []);
  const filtered = contacts.filter(c => c.name?.toLowerCase().includes(search.toLowerCase()) || c.email?.toLowerCase().includes(search.toLowerCase()) || c.message?.toLowerCase().includes(search.toLowerCase()));
  const handleRead = async (id: number) => {
    setMarking(id);
    try { await markContactRead(id); load(); setSelected((s: any) => s?.id === id ? { ...s, isRead: true } : s); }
    catch { alert("Ошибка"); } finally { setMarking(null); }
  };

  const unread = contacts.filter(c => !c.isRead).length;
  return (
    <div className="flex flex-col gap-4">
      <div><h2 className="text-black font-black text-xl">Сообщения</h2><p className="text-black/40 text-sm">{contacts.length} сообщений{unread > 0 ? ` • ${unread} непрочитанных` : ""}</p></div>
      <div className="relative"><Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" />
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск..." className="w-full pl-10 pr-4 py-3 rounded-2xl text-sm text-black bg-white/50 outline-none" style={{ backdropFilter: "blur(12px)" }} /></div>
      <div className="flex flex-col gap-3">
        {filtered.map((c) => (
          <div key={c.id} onClick={() => { setSelected(c); if (!c.isRead) handleRead(c.id); }}
            className="flex items-start gap-4 p-5 bg-white/50 rounded-3xl cursor-pointer transition-all hover:-translate-y-0.5"
            style={{ backdropFilter: "blur(16px)", boxShadow: "0 4px 16px rgba(0,0,0,0.05)" }}>
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white text-sm font-black shrink-0">{c.name?.[0]?.toUpperCase()}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-black font-bold text-sm">{c.name}</p>
                {!c.isRead && <div className="w-2 h-2 rounded-full bg-black shrink-0" />}
              </div>
              <p className="text-black/40 text-xs">{c.email}{c.phone ? ` • ${c.phone}` : ""}</p>
              <p className="text-black/60 text-sm mt-1.5 line-clamp-2">{c.message}</p>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0">
              <span className="text-black/25 text-xs">{c.createdAt ? new Date(c.createdAt).toLocaleDateString("ru-RU") : ""}</span>
              {c.isRead ? <CheckCheck size={14} className="text-black/25" /> : <div className="px-2 py-0.5 rounded-full text-xs font-bold bg-black text-white">Новое</div>}
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="flex items-center justify-center py-20"><p className="text-black/20 text-sm">Сообщений нет</p></div>}
      </div>
      {selected && (
        <AdminModal title={`Сообщение от ${selected.name}`} onClose={() => setSelected(null)} wide>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              {[{ label: "Имя", value: selected.name }, { label: "Email", value: selected.email }, { label: "Телефон", value: selected.phone || "—" }, { label: "Дата", value: selected.createdAt ? new Date(selected.createdAt).toLocaleString("ru-RU") : "—" }].map(f => (
                <div key={f.label} className="p-4 rounded-2xl" style={{ background: "rgba(0,0,0,0.04)" }}>
                  <p className="text-black/40 text-xs font-semibold mb-1">{f.label}</p>
                  <p className="text-black text-sm font-semibold">{f.value}</p>
                </div>
              ))}
            </div>
            <div className="p-5 rounded-2xl" style={{ background: "rgba(0,0,0,0.04)" }}>
              <p className="text-black/40 text-xs font-semibold mb-2">Сообщение</p>
              <p className="text-black text-sm leading-relaxed">{selected.message}</p>
            </div>
            {!selected.isRead && (
              <button onClick={() => handleRead(selected.id)} disabled={marking === selected.id}
                className="flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold text-white bg-black hover:bg-black/80 transition cursor-pointer disabled:opacity-50">
                <CheckCheck size={16} /> {marking === selected.id ? "..." : "Отметить как прочитанное"}
              </button>
            )}
          </div>
        </AdminModal>
      )}
    </div>
  );
}
