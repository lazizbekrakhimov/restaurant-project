"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ImageOff, Plus, Trash2 } from "lucide-react";
import { getGallery, createGallery, deleteGallery } from "@/service";
import AdminModal from "@/components/admin/AdminModal";
import AdminInput from "@/components/admin/AdminInput";
import ImageUpload from "@/components/admin/ImageUpload";

const EMPTY = { image: "", title: "" };

export default function AdminGalleryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);
  const load = () => getGallery().then(setItems).catch(() => { });

  useEffect(() => { load(); }, []);
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.image) { alert("Добавьте изображение"); return; }
    setSaving(true);
    try { await createGallery(form); setShowCreate(false); setForm({ ...EMPTY }); load(); }
    catch { alert("Ошибка"); } finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Удалить фото?")) return; setDeleting(id);
    try { await deleteGallery(id); load(); } catch { alert("Ошибка"); } finally { setDeleting(null); }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div><h2 className="text-black font-black text-xl">Галерея</h2><p className="text-black/40 text-sm">{items.length} фото</p></div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold text-white bg-black hover:bg-black/80 transition cursor-pointer"><Plus size={16} /> Добавить фото</button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="group relative aspect-square rounded-3xl overflow-hidden" style={{ background: "rgba(0,0,0,0.06)" }}>
            {item.image && <Image src={item.image} alt={item.title || ""} fill className="object-cover" unoptimized />}
            {item.title && <div className="absolute bottom-0 left-0 right-0 px-3 py-2" style={{ background: "linear-gradient(transparent,rgba(0,0,0,0.6))" }}><p className="text-white text-xs font-semibold truncate">{item.title}</p></div>}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition" style={{ background: "rgba(0,0,0,0.4)" }}>
              <button onClick={() => handleDelete(item.id)} disabled={deleting === item.id} className="w-10 h-10 rounded-2xl flex items-center justify-center bg-red-500 text-white hover:bg-red-600 transition cursor-pointer disabled:opacity-50"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="col-span-4 flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-black/5 mb-4">
              <ImageOff size={38} className="text-black/40" />
            </div>

            <p className="text-black/50 text-lg font-semibold">
              Галерея пуста
            </p>

            <p className="text-black/35 text-sm mt-1">
              Добавьте первое изображение
            </p>
          </div>
        )}
      </div>
      {showCreate && (
        <AdminModal title="Добавить фото" onClose={() => { setShowCreate(false); setForm({ ...EMPTY }); }}>
          <form onSubmit={handleCreate} className="flex flex-col gap-4">
            <ImageUpload value={form.image} onChange={v => setForm(p => ({ ...p, image: v }))} folder="galleries" />
            <AdminInput label="Подпись (необязательно)" value={form.title} onChange={v => setForm(p => ({ ...p, title: v }))} placeholder="Описание фото" />
            <div className="flex gap-3 mt-2">
              <button type="button" onClick={() => { setShowCreate(false); setForm({ ...EMPTY }); }} className="flex-1 py-3 rounded-2xl text-sm font-bold text-black/50 hover:text-black transition cursor-pointer" style={{ border: "1px solid rgba(0,0,0,0.1)" }}>Отмена</button>
              <button type="submit" disabled={saving} className="flex-1 py-3 rounded-2xl text-sm font-bold text-white bg-black hover:bg-black/80 transition cursor-pointer disabled:opacity-50">{saving ? "Сохранение..." : "Добавить"}</button>
            </div>
          </form>
        </AdminModal>
      )}
    </div>
  );
}
