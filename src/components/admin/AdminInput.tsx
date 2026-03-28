"use client";

interface AdminInputProps {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  textarea?: boolean;
}

const baseClass = "w-full px-4 py-3 rounded-2xl text-sm text-black outline-none transition-all";
const baseStyle = { background: "rgba(0,0,0,0.04)" };
const focusHandler = (e: any) => { e.target.style.border = "1px solid rgba(0,0,0,0.25)"; e.target.style.background = "rgba(255,255,255,0.8)"; };
const blurHandler = (e: any) => { e.target.style.border = "1px solid rgba(0,0,0,0.08)"; e.target.style.background = "rgba(0,0,0,0.04)"; };

export default function AdminInput({ label, value, onChange, type = "text", placeholder, required, textarea }: AdminInputProps) {
  return (
    <div>
      <label className="text-black/50 text-xs font-semibold mb-1.5 block">{label}{required && " *"}</label>
      {textarea ? (
        <textarea required={required} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          rows={3} className={`${baseClass} resize-none`} style={baseStyle} onFocus={focusHandler} onBlur={blurHandler} />
      ) : (
        <input type={type} required={required} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          className={baseClass} style={baseStyle} onFocus={focusHandler} onBlur={blurHandler} />
      )}
    </div>
  );
}
