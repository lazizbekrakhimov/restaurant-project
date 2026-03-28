"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Trash2, Search, Eye } from "lucide-react";
import { getMenu, getCategories, createMenuItem, deleteMenuItem } from "@/service";
import AdminTable from "@/components/admin/AdminTable";
import AdminModal from "@/components/admin/AdminModal";
import AdminInput from "@/components/admin/AdminInput";
import AdminSelect from "@/components/admin/AdminSelect";
import ImageUpload from "@/components/admin/ImageUpload";

const EMPTY = { name: "", description: "", price: "", categoryId: "", image: "", isAvailable: "true" };

export default function AdminMenuPage() {
  const [items, setItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);

  const load = () => {
    getMenu().then(setItems).catch(() => { });
    getCategories().then(setCategories).catch(() => { });
  };
  useEffect(() => { load(); }, []);

  const f = (k: string) => (v: string) => setForm(p => ({ ...p, [k]: v }));

  const filtered = items.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase()) &&
    (catFilter === "" || String(i.category?.id) === catFilter)
  );

  const catOptions = [{ value: "", label: "Все категории" }, ...categories.map(c => ({ value: String(c.id), label: c.name }))];

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createMenuItem({ name: form.name, description: form.description, price: parseFloat(form.price), image: form.image, categoryId: form.categoryId ? parseInt(form.categoryId) : undefined, isAvailable: form.isAvailable === "true" });
      setShowCreate(false); setForm({ ...EMPTY }); load();
    } catch { alert("Ошибка"); } finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Удалить блюдо?")) return;
    setDeleting(id);
    try { await deleteMenuItem(id); load(); } catch { alert("Ошибка"); } finally { setDeleting(null); }
  };

  const columns = [
    {
      key: "image", label: "Фото", render: (r: any) => (
        <div className="relative w-12 h-12 rounded-xl overflow-hidden" style={{ background: "rgba(0,0,0,0.06)" }}>
          {r.image ? <Image src={r.image} alt={r.name} fill className="object-cover" unoptimized /> : <span className="flex items-center justify-center h-full text-lg">🍽</span>}
        </div>
      )
    },
    {
      key: "name", label: "Название", render: (r: any) => (
        <div><p className="text-black font-semibold text-sm">{r.name}</p><p className="text-black/40 text-xs mt-0.5 truncate max-w-xs">{r.description}</p></div>
      )
    },
    {
      key: "category", label: "Категория", render: (r: any) => (
        <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "rgba(0,0,0,0.06)", color: "#555" }}>{r.category?.name || "—"}</span>
      )
    },
    { key: "price", label: "Цена", render: (r: any) => <span className="text-black font-black text-sm">${parseFloat(r.price).toFixed(2)}</span> },
    {
      key: "isAvailable", label: "Наличие", render: (r: any) => (
        <span className="px-2 py-1 rounded-full text-xs font-bold" style={{ background: r.isAvailable ? "rgba(22,163,74,0.1)" : "rgba(220,38,38,0.1)", color: r.isAvailable ? "#16a34a" : "#dc2626" }}>
          {r.isAvailable ? "Есть" : "Нет"}
        </span>
      )
    },
    {
      key: "actions", label: "Действия", render: (r: any) => (
        <div className="flex items-center gap-2">
          <Link href={`/admin/menu/${r.id}`} className="p-2 rounded-xl hover:bg-black/5 transition cursor-pointer text-black/40 hover:text-black"><Eye size={15} /></Link>
          <button onClick={() => handleDelete(r.id)} disabled={deleting === r.id}
            className="p-2 rounded-xl transition cursor-pointer disabled:opacity-40"
            style={{ color: "#dc2626" }} onMouseEnter={e => (e.currentTarget.style.background = "rgba(220,38,38,0.08)")} onMouseLeave={e => (e.currentTarget.style.background = "")}>
            <Trash2 size={15} />
          </button>
        </div>
      )
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-black font-black text-xl">Меню</h2>
          <p className="text-black/40 text-sm">{items.length} блюд</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold text-white bg-black hover:bg-black/80 transition cursor-pointer">
          <Plus size={16} /> Добавить блюдо
        </button>
      </div>

      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск по названию..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl text-sm bg-white/50 text-black outline-none"
            style={{ backdropFilter: "blur(12px)" }} />
        </div>
        <div className="w-52">
          <AdminSelect label="" options={catOptions} value={catFilter} onChange={setCatFilter} placeholder="Все категории" />
        </div>
      </div>

      <AdminTable columns={columns} data={filtered} emptyText="Блюда не найдены" />

      {showCreate && (
        <AdminModal title="Новое блюдо" onClose={() => { setShowCreate(false); setForm({ ...EMPTY }); }}>
          <form onSubmit={handleCreate} className="flex flex-col gap-4">
            <AdminInput label="Название" value={form.name} onChange={f("name")} required placeholder="Например: Борщ" />
            <AdminInput label="Описание" value={form.description} onChange={f("description")} textarea placeholder="Описание блюда..." />
            <AdminInput label="Цена ($)" value={form.price} onChange={f("price")} type="number" required placeholder="0.00" />
            <AdminSelect label="Категория" options={[{ value: "", label: "Без категории" }, ...categories.map(c => ({ value: String(c.id), label: c.name }))]} value={form.categoryId} onChange={f("categoryId")} />
            <AdminSelect label="Наличие" options={[{ value: "true", label: "В наличии" }, { value: "false", label: "Нет в наличии" }]} value={form.isAvailable} onChange={f("isAvailable")} />
            <ImageUpload value={form.image} onChange={v => setForm(p => ({ ...p, image: v }))} folder="products" />
            <div className="flex gap-3 mt-2">
              <button type="button" onClick={() => { setShowCreate(false); setForm({ ...EMPTY }); }}
                className="flex-1 py-3 rounded-2xl text-sm font-bold text-black/50 hover:text-black transition cursor-pointer" style={{ border: "1px solid rgba(0,0,0,0.1)" }}>
                Отмена
              </button>
              <button type="submit" disabled={saving}
                className="flex-1 py-3 rounded-2xl text-sm font-bold text-white bg-black hover:bg-black/80 transition cursor-pointer disabled:opacity-50">
                {saving ? "Сохранение..." : "Сохранить"}
              </button>
            </div>
          </form>
        </AdminModal>
      )}
    </div>
  );
}
