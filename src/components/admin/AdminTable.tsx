"use client";

interface Column { key: string; label: string; render?: (row: any) => React.ReactNode; }

interface AdminTableProps {
  columns: Column[];
  data: any[];
  emptyText?: string;
}

export default function AdminTable({ columns, data, emptyText = "Нет данных" }: AdminTableProps) {
  return (
    <div className="rounded-3xl overflow-hidden bg-white/50" style={{ backdropFilter: "blur(16px)", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
      <table className="w-full">
        <thead>
          <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
            {columns.map(col => (
              <th key={col.key} className="text-left px-5 py-4 text-xs font-black text-black/60 uppercase tracking-wider">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={row.id || i} style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }} className="hover:bg-black/2 transition">
              {columns.map(col => (
                <td key={col.key} className="px-5 py-4">
                  {col.render ? col.render(row) : <span className="text-black/70 text-sm">{row[col.key] ?? "—"}</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="flex items-center justify-center py-16">
          <p className="text-black/20 text-sm">{emptyText}</p>
        </div>
      )}
    </div>
  );
}
