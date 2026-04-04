"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { deleteMenuItem, getCategories } from "@/service";
import { AdminInput, AdminSelect, ImageUpload } from "@/components";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function MenuDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [meal, setMeal] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", description: "", price: "", categoryId: "", image: "", isAvailable: "true" });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch(`${API}/menu/${id}`, { credentials: "include" }).then(r => r.json()).then(d => {
      setMeal(d);
      setForm({ name: d.name || "", description: d.description || "", price: String(d.price || ""), categoryId: String(d.category?.id || ""), image: d.image || "", isAvailable: String(d.isAvailable ?? true) });
    }).catch(() => {});
    getCategories().then(setCategories).catch(() => {});
  }, [id]);

  const f = (k: string) => (v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await fetch(`${API}/menu/${id}`, { method: "PUT", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: form.name, description: form.description, price: parseFloat(form.price), image: form.image, categoryId: form.categoryId ? parseInt(form.categoryId) : undefined, isAvailable: form.isAvailable === "true" }) });
      alert("Сохранено!");
    } catch { alert("Ошибка"); } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!confirm("Удалить блюдо?")) return;
    setDeleting(true);
    try { await deleteMenuItem(Number(id)); router.push("/admin/menu"); } catch { alert("Ошибка"); } finally { setDeleting(false); }
  };

  if (!meal) return (
    <div className="flex items-center justify-center py-32">
      <div className="w-8 h-8 rounded-full border-4 border-black/10 border-t-black animate-spin" />
    </div>
  );

  return (
    <div className="flex flex-col gap-4 max-w-2xl">
      <div className="flex items-center justify-between">
  <button onClick={() => router.back()} className=" flex items-center gap-2 text-black/50 hover:text-black transition-all duration-300 cursor-pointer text-sm font-semibold hover:-translate-x-1 group " >
    <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
    Назад
  </button>

  <div className="flex gap-2">
    <button onClick={handleDelete} disabled={deleting} className=" group flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-bold transition-all duration-300 cursor-pointer disabled:opacity-50 hover:-translate-y-0.5 hover:shadow-lg active:scale-95 "
      style={{ background: "rgba(220,38,38,0.08)", color: "#dc2626", border: "1px solid rgba(220,38,38,0.15)", }} >
      <Trash2 size={14} className=" transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 " />
      {deleting ? "..." : "Удалить"}
    </button>
  </div>
</div>

      <div className="rounded-3xl p-8 bg-white/50" style={{ backdropFilter: "blur(16px)" }}>
        <h2 className="text-black font-black text-xl mb-6">{meal.name}</h2>
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <AdminInput label="Название" value={form.name} onChange={f("name")} required />
            <AdminInput label="Цена ($)" value={form.price} onChange={f("price")} type="number" required />
          </div>
          <AdminInput label="Описание" value={form.description} onChange={f("description")} textarea />
          <div className="grid grid-cols-2 gap-4">
            <AdminSelect label="Категория" options={[{ value: "", label: "Без категории" }, ...categories.map(c => ({ value: String(c.id), label: c.name }))]} value={form.categoryId} onChange={f("categoryId")} />
            <AdminSelect label="Наличие" options={[{ value: "true", label: "В наличии" }, { value: "false", label: "Нет в наличии" }]} value={form.isAvailable} onChange={f("isAvailable")} />
          </div>
          <ImageUpload value={form.image} onChange={v => setForm(p => ({ ...p, image: v }))} folder="products" />
          <button type="submit" disabled={saving} className="flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold text-white bg-black hover:bg-black/80 transition cursor-pointer disabled:opacity-50 mt-2">
            <Save size={16} /> {saving ? "Сохранение..." : "Сохранить изменения"}
          </button>
        </form>
      </div>
    </div>
  );
}
