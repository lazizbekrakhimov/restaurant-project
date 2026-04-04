"use client";

import { useEffect, useState } from "react";
import { Search, Trash2, Shield } from "lucide-react";
import { getUsers, deleteUser } from "@/service";
import { AdminTable } from "@/components";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<number | null>(null);

  const load = () => getUsers().then(setUsers).catch(() => { });

  useEffect(() => { load(); }, []);
  const filtered = users.filter(u => u.name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase()));
  const handleDelete = async (id: number) => {
    if (!confirm("Удалить пользователя?")) return; setDeleting(id);
    try { await deleteUser(id); load(); } catch { alert("Ошибка"); } finally { setDeleting(null); }
  };

  const roleColor: Record<string, string> = { SUPERADMIN: "#7c3aed", ADMIN: "#0284c7", USER: "#16a34a" };
  const roleLabel: Record<string, string> = { SUPERADMIN: "Суперадмин", ADMIN: "Администратор", USER: "Пользователь" };
  const columns = [
    { key: "id", label: "#", render: (r: any) => <span className="text-black/30 text-sm">#{r.id}</span> },
    {
      key: "name", label: "Имя", render: (r: any) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white text-xs font-black shrink-0">{r.name?.[0]?.toUpperCase()}</div>
          <p className="text-black font-semibold text-sm">{r.name}</p>
        </div>
      )
    },
    { key: "email", label: "Email", render: (r: any) => <span className="text-black/60 text-sm">{r.email}</span> },
    { key: "phone", label: "Телефон", render: (r: any) => <span className="text-black/40 text-sm">{r.phone || "—"}</span> },
    {
      key: "role", label: "Роль", render: (r: any) => (
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold w-fit" style={{ background: `${roleColor[r.role] || "#666"}12`, color: roleColor[r.role] || "#666" }}>
          {r.role === "SUPERADMIN" && <Shield size={11} />}{roleLabel[r.role] || r.role}
        </span>
      )
    },
    { key: "createdAt", label: "Дата", render: (r: any) => <span className="text-black/30 text-xs">{r.createdAt ? new Date(r.createdAt).toLocaleDateString("ru-RU") : "—"}</span> },
    {
      key: "actions", label: "", render: (r: any) => r.role !== "SUPERADMIN" ? (
        <button onClick={() => handleDelete(r.id)} disabled={deleting === r.id} className="p-2 rounded-xl transition cursor-pointer disabled:opacity-40" style={{ color: "#dc2626" }} onMouseEnter={e => (e.currentTarget.style.background = "rgba(220,38,38,0.08)")} onMouseLeave={e => (e.currentTarget.style.background = "")}><Trash2 size={15} /></button>
      ) : null
    },
  ];
  
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div><h2 className="text-black font-black text-xl">Пользователи</h2><p className="text-black/40 text-sm">{users.length} человек</p></div>
      </div>
      <div className="relative"><Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" />
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск по имени или email..." className="bg-white/50 w-full pl-10 pr-4 py-3 rounded-2xl text-sm text-black outline-none" style={{ backdropFilter: "blur(12px)" }} /></div>
      <AdminTable columns={columns} data={filtered} emptyText="Пользователи не найдены" />
    </div>
  );
}
