"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

function buildPages(page: number, totalPages: number): (number | "…")[] {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
  const list: (number | "…")[] = [1];
  if (page <= 4)                   list.push(2, 3, 4, 5, "…", totalPages);
  else if (page >= totalPages - 3) list.push("…", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
  else                             list.push("…", page - 1, page, page + 1, "…", totalPages);
  return list;
}

interface Props {
  page: number;
  total: number;
  pageSize: number;
  onChange: (p: number) => void;
}

export function DashPagination({ page, total, pageSize, onChange }: Props) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  if (totalPages <= 1) return null;

  const from  = (page - 1) * pageSize + 1;
  const to    = Math.min(page * pageSize, total);
  const pages = buildPages(page, totalPages);

  return (
    <div className="flex items-center justify-between gap-4 pt-3 border-t border-border">
      <p className="text-[12px] text-muted-foreground">
        {from}–{to} of {total}
      </p>

      <div className="flex items-center gap-0.5">
        {/* ‹ Prev */}
        <button
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
          className="flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 disabled:pointer-events-none transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>

        {pages.map((p, i) =>
          p === "…" ? (
            <span key={`e${i}`} className="w-8 h-8 flex items-center justify-center text-[12px] text-muted-foreground/40 select-none">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onChange(p as number)}
              className={cn(
                "w-8 h-8 rounded-lg text-[12px] font-medium transition-colors",
                page === p
                  ? "bg-primary text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}>
              {p}
            </button>
          )
        )}

        {/* Next › */}
        <button
          onClick={() => onChange(page + 1)}
          disabled={page === totalPages}
          className="flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 disabled:pointer-events-none transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
