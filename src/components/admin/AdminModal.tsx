"use client";

import { X } from "lucide-react";

interface AdminModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  wide?: boolean;
}

export default function AdminModal({ title, onClose, children, wide }: AdminModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(8px)" }}>
      <div className={`w-full ${wide ? "max-w-2xl" : "max-w-lg"} rounded-3xl p-8 max-h-[90vh] overflow-y-auto`}
        style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.8)", boxShadow: "0 24px 60px rgba(0,0,0,0.15)" }}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-black font-black text-xl">{title}</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/8 transition cursor-pointer text-black/50 hover:text-black">
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
