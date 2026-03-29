"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, Trash2, Search } from "lucide-react";
import { getNews, createNews, deleteNews } from "@/service";
import AdminTable from "@/components/admin/AdminTable";
import AdminModal from "@/components/admin/AdminModal";
import AdminInput from "@/components/admin/AdminInput";
import ImageUpload from "@/components/admin/ImageUpload";

const EMPTY = { title: "", text: "", authorName: "", image: "", authorAvatar: "" };

export default function AdminNewsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);

  const load = () => getNews().then(setItems).catch(() => { });
  useEffect(() => { load(); }, []);
  const f = (k: string) => (v: string) => setForm(p => ({ ...p, [k]: v }));

  const filtered = items.filter(i =>
    i.title?.toLowerCase().includes(search.toLowerCase()) ||
    i.authorName?.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createNews(form);
      setShowCreate(false);
      setForm({ ...EMPTY });
      load();
    } catch { alert("Ошибка"); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Удалить новость?")) return;
    setDeleting(id);
    try { await deleteNews(id); load(); }
    catch { alert("Ошибка"); }
    finally { setDeleting(null); }
  };

  const columns = [
    {
      key: "image", label: "Фото", render: (r: any) => (
        <div className="relative w-14 h-10 rounded-xl overflow-hidden" style={{ background: "rgba(0,0,0,0.06)" }}>
          {r.image && <Image src={r.image} alt="" fill className="object-cover" unoptimized />}
        </div>
      )
    },
    {
      key: "title", label: "Заголовок", render: (r: any) => (
        <div>
          <p className="text-black font-semibold text-sm">{r.title}</p>
          <p className="text-black/40 text-xs mt-0.5 truncate max-w-xs">{r.text?.slice(0, 60)}...</p>
        </div>
      )
    },
    {
      key: "author", label: "Автор", render: (r: any) => (
        <div className="flex items-center gap-2">
          <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0" style={{ background: "rgba(0,0,0,0.06)" }}>
            {r.authorAvatar
              ? <Image src={r.authorAvatar} alt="" fill className="object-cover" unoptimized />
              : <span className="flex items-center justify-center h-full text-xs font-black text-black/40">{r.authorName?.[0]?.toUpperCase()}</span>
            }
          </div>
          <span className="text-black/60 text-sm">{r.authorName}</span>
        </div>
      )
    },
    {
      key: "createdAt", label: "Дата", render: (r: any) => (
        <span className="text-black/40 text-xs">{r.createdAt ? new Date(r.createdAt).toLocaleDateString("ru-RU") : "—"}</span>
      )
    },
    {
      key: "actions", label: "", render: (r: any) => (
        <button onClick={() => handleDelete(r.id)} disabled={deleting === r.id}
          className="p-2 rounded-xl transition cursor-pointer disabled:opacity-40"
          style={{ color: "#dc2626" }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(220,38,38,0.08)")}
          onMouseLeave={e => (e.currentTarget.style.background = "")}>
          <Trash2 size={15} />
        </button>
      )
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-black font-black text-xl">Новости</h2>
          <p className="text-black/40 text-sm">{items.length} записей</p>
        </div>
        <button onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold text-white bg-black hover:bg-black/80 transition cursor-pointer">
          <Plus size={16} /> Добавить
        </button>
      </div>

      <div className="relative">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск..." className="w-full pl-10 pr-4 py-3 rounded-2xl text-sm text-black bg-white/50 outline-none" style={{ backdropFilter: "blur(12px)" }} />
      </div>

      <AdminTable columns={columns} data={filtered} emptyText="Новостей нет" />

      {showCreate && (
        <AdminModal title="Новая запись" onClose={() => { setShowCreate(false); setForm({ ...EMPTY }); }} wide>
          <form onSubmit={handleCreate} className="flex flex-col gap-4">
            <AdminInput label="Заголовок" value={form.title} onChange={f("title")} required placeholder="Заголовок новости" />
            <AdminInput label="Текст" value={form.text} onChange={f("text")} textarea placeholder="Содержание..." />
            <AdminInput label="Имя автора" value={form.authorName} onChange={f("authorName")} required placeholder="Имя автора" />

            <div>
              <p className="text-black/50 text-xs font-semibold mb-1.5">Изображение новости</p>
              <ImageUpload value={form.image} onChange={v => setForm(p => ({ ...p, image: v }))} folder="news" />
            </div>

            <div>
              <p className="text-black/50 text-xs font-semibold mb-1.5">Аватар автора</p>
              <ImageUpload value={form.authorAvatar} onChange={v => setForm(p => ({ ...p, authorAvatar: v }))} folder="avatars" />
            </div>

            <div className="flex gap-3 mt-2">
              <button type="button" onClick={() => { setShowCreate(false); setForm({ ...EMPTY }); }} className="flex-1 py-3 rounded-2xl text-sm font-bold text-black/50 hover:text-black transition cursor-pointer" style={{ border: "1px solid rgba(0,0,0,0.1)" }}>
                Отмена
              </button>
              <button type="submit" disabled={saving} className="flex-1 py-3 rounded-2xl text-sm font-bold text-white bg-black hover:bg-black/80 transition cursor-pointer disabled:opacity-50">
                {saving ? "Сохранение..." : "Сохранить"}
              </button>
            </div>
          </form>
        </AdminModal>
      )}
    </div>
  );
}