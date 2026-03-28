"use client";

import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";

interface Option { value: string; label: string; }

interface AdminSelectProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export default function AdminSelect({ label, options, value, onChange, placeholder = "Выберите..." }: AdminSelectProps) {
  const [open, setOpen] = useState(false);
  const selected = options.find(o => o.value === value);

  return (
    <div>
      <label className="text-black/50 text-xs font-semibold block">{label}</label>
      <div className="relative">
        <button type="button" onClick={() => setOpen(!open)}
          className="w-full flex items-center bg-white/50 justify-between px-4 py-3 rounded-2xl text-sm text-black transition-all cursor-pointer">
          <span className={selected ? "text-black" : "text-black/40"}>{selected?.label || placeholder}</span>
          <ChevronDown size={16} className={`text-black/40 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <div className="absolute left-0 top-full mt-2 z-50 w-full rounded-2xl overflow-hidden shadow-xl"
              style={{ background: "rgba(255,255,255,0.95)",  backdropFilter: "blur(16px)" }}>
              {options.map(opt => (
                <button key={opt.value} type="button" onClick={() => { onChange(opt.value); setOpen(false); }}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm transition-all cursor-pointer hover:bg-black hover:text-white"
                  >
                  {opt.label}
                  {value === opt.value && <Check size={14} />}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
