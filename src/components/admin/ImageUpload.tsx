"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, Link as LinkIcon, X } from "lucide-react";
import { uploadImage } from "@/service";

const API = process.env.NEXT_PUBLIC_API_URL;

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder: "products" | "news" | "galleries" | "avatars";
}

export default function ImageUpload({ value, onChange, folder }: ImageUploadProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [mode, setMode] = useState<"file" | "url">("file");
  const [urlInput, setUrlInput] = useState("");

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { url } = await uploadImage(file, folder);
      onChange(`${API}${url}`);
    } catch { alert("Ошибка загрузки"); }
    finally { setUploading(false); if (fileRef.current) fileRef.current.value = ""; }
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) { onChange(urlInput.trim()); setUrlInput(""); }
  };

  return (
    <div>
      <label className="text-black/50 text-xs font-semibold mb-1.5 block">Изображение</label>

      <div className="flex gap-2 mb-3">
        {(["file", "url"] as const).map(m => (
          <button key={m} type="button" onClick={() => setMode(m)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${mode === m ? "bg-black text-white" : "text-black/50 hover:text-black"}`}
            style={mode !== m ? { background: "rgba(0,0,0,0.06)" } : {}}>
            {m === "file" ? <><Upload size={12} /> Файл</> : <><LinkIcon size={12} /> URL</>}
          </button>
        ))}
      </div>

      {mode === "file" ? (
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
            className="flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold text-black/60 hover:text-black transition cursor-pointer disabled:opacity-50"
            style={{ background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.08)", borderStyle: "dashed" }}>
            <Upload size={16} />
            {uploading ? "Загрузка..." : "Выбрать файл"}
          </button>
          <input ref={fileRef} type="file" accept="image/*,.svg" onChange={handleFile} className="hidden" />
          <p className="text-black/30 text-xs">PNG, JPG, SVG до 20MB</p>
        </div>
      ) : (
        <div className="flex gap-2">
          <input value={urlInput} onChange={e => setUrlInput(e.target.value)} placeholder="https://..."
            className="flex-1 px-4 py-3 rounded-2xl text-sm text-black outline-none"
            style={{ background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.08)" }} />
          <button type="button" onClick={handleUrlSubmit}
            className="px-4 py-3 rounded-2xl text-sm font-semibold text-white bg-black hover:bg-black/80 transition cursor-pointer">
            OK
          </button>
        </div>
      )}

      {/* Preview */}
      {value && (
        <div className="relative mt-3 w-20 h-20 rounded-2xl overflow-hidden group"
          style={{ border: "1px solid rgba(0,0,0,0.08)" }}>
          <Image src={value} alt="preview" fill className="object-cover" unoptimized />
          <button type="button" onClick={() => onChange("")}
            className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition cursor-pointer">
            <X size={18} className="text-white" />
          </button>
        </div>
      )}
    </div>
  );
}
