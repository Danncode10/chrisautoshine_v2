"use client";

import { useState, useEffect, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Plus, Search, X, Check, Loader2, Trash2,
  DollarSign, ShoppingBag, TrendingUp, Star,
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight,
  Car,
} from "lucide-react";
import {
  getSalesStats, getServicePopularity, listSales, createSale, deleteSale,
  type CreateSaleInput,
} from "@/services/sales";
import { listServices } from "@/services/services";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type Period = "today" | "week" | "month";
type PriceTier = { label: string; price: string };

const PERIOD_LABELS: Record<Period, string> = { today: "Today", week: "This Week", month: "This Month" };
const PAGE_SIZE = 12;

function parseTierPrice(raw: string): number {
  return parseFloat(raw.replace(/[^0-9.]/g, "")) || 0;
}

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({ label, value, icon: Icon, accent }: {
  label: string; value: string; icon: React.ElementType; accent: string;
}) {
  return (
    <div className="bg-card border border-border rounded-2xl px-5 py-4 flex items-center gap-4">
      <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", accent)}>
        <Icon className="h-5 w-5" strokeWidth={1.5} />
      </div>
      <div>
        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-[0.12em]">{label}</p>
        <p className="text-xl font-bold text-foreground tabular-nums mt-0.5">{value}</p>
      </div>
    </div>
  );
}

// ─── Revenue bar chart ────────────────────────────────────────────────────────

function RevenueChart({ points, period }: {
  points: { date: string; revenue: number; count: number }[];
  period: Period;
}) {
  const max = Math.max(...points.map(p => p.revenue), 1);
  const labelStep = period === "month" ? 7 : 1;

  const fmt = (iso: string) => {
    const d = new Date(iso);
    if (period === "today") return d.toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit" });
    if (period === "week")  return d.toLocaleDateString("en-AU", { weekday: "short" });
    return d.toLocaleDateString("en-AU", { day: "numeric", month: "short" });
  };

  return (
    <div>
      <div className="flex items-end gap-1 h-28">
        {points.map((p, i) => (
          <div key={i} className="flex-1 flex flex-col justify-end group relative">
            {p.revenue > 0 && (
              <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none z-10 transition-opacity">
                <div className="bg-popover border border-border rounded-md px-2 py-1 text-[10px] font-medium text-foreground whitespace-nowrap shadow-md">
                  ${p.revenue.toLocaleString()} · {p.count} sale{p.count !== 1 ? "s" : ""}
                </div>
              </div>
            )}
            <div
              className={cn("rounded-t-sm transition-all", p.revenue > 0 ? "bg-emerald-500/70 hover:bg-emerald-500" : "bg-muted/30 h-0.5")}
              style={{ height: p.revenue > 0 ? `${Math.max((p.revenue / max) * 100, 4)}%` : undefined }}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-1 mt-1">
        {points.map((p, i) => (
          <div key={i} className="flex-1 text-center">
            {i % labelStep === 0 && (
              <span className="text-[9px] text-muted-foreground/50">{fmt(p.date)}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Popular services ─────────────────────────────────────────────────────────

function PopularServices({ data }: { data: Awaited<ReturnType<typeof getServicePopularity>> }) {
  if (!data.length) return (
    <p className="text-[13px] text-muted-foreground text-center py-6">No sales recorded yet.</p>
  );
  const maxCount = data[0].count;
  return (
    <div className="space-y-3">
      {data.slice(0, 5).map((s, i) => (
        <div key={s.service_name}>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2 min-w-0">
              {i === 0 && <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />}
              <span className="text-[12px] text-foreground truncate">{s.service_name}</span>
              <span className="text-[10px] text-muted-foreground shrink-0">{s.count}×</span>
            </div>
            <span className="text-[12px] font-bold text-emerald-400 shrink-0 ml-2 tabular-nums">
              ${s.revenue.toLocaleString()}
            </span>
          </div>
          <div className="h-1.5 bg-muted/40 rounded-full overflow-hidden">
            <div className="h-full bg-primary/60 rounded-full" style={{ width: `${(s.count / maxCount) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Add Sale Modal ───────────────────────────────────────────────────────────

function AddSaleModal({ onClose, onSaved }: { onClose: () => void; onSaved: () => void }) {
  const { data: services } = useQuery({ queryKey: ["services"], queryFn: listServices });

  const now = new Date();
  const [form, setForm] = useState<{
    customer_name: string;
    customer_phone: string;
    customer_email: string;
    service_id: string;
    vehicle_type: string;
    price_override: string;
    date: string;
    time: string;
    notes: string;
    payment_status: "paid" | "unpaid";
  }>({
    customer_name: "",
    customer_phone: "",
    customer_email: "",
    service_id: "",
    vehicle_type: "",
    price_override: "",
    date: now.toISOString().split("T")[0],
    time: now.toTimeString().slice(0, 5),
    notes: "",
    payment_status: "paid",
  });

  const set = (k: string, v: string) => setForm(prev => ({ ...prev, [k]: v }));

  const selectedService = services?.find(s => s.id === form.service_id);
  const tiers = selectedService
    ? (Array.isArray(selectedService.pricing_tiers) ? selectedService.pricing_tiers as PriceTier[] : [])
    : [];

  // Auto-fill price when service + vehicle type selected
  useEffect(() => {
    if (!form.service_id) { set("price_override", ""); return; }
    if (!tiers.length) { set("price_override", ""); return; }
    if (tiers.length === 1) { set("price_override", String(parseTierPrice(tiers[0].price))); return; }
    const match = tiers.find(t => t.label.toLowerCase().includes(form.vehicle_type.toLowerCase()) && form.vehicle_type);
    if (match) set("price_override", String(parseTierPrice(match.price)));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.service_id, form.vehicle_type]);

  // Group services by category
  const grouped = (services ?? []).reduce<Record<string, typeof services>>((acc, s) => {
    const cat = s.category ?? "other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat]!.push(s);
    return acc;
  }, {});

  const qc = useQueryClient();
  const mut = useMutation({
    mutationFn: (input: CreateSaleInput) => createSale(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["sales-stats"] });
      qc.invalidateQueries({ queryKey: ["sales-list"] });
      qc.invalidateQueries({ queryKey: ["sales-popular"] });
      qc.invalidateQueries({ queryKey: ["overview-kpis"] });
      qc.invalidateQueries({ queryKey: ["overview-trend"] });
      toast.success("Sale recorded");
      onSaved();
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed to save"),
  });

  const canSubmit = form.customer_name.trim() && form.service_id && form.price_override && form.date;

  const handleSubmit = () => {
    if (!canSubmit || !selectedService) return;
    mut.mutate({
      customer_name:  form.customer_name.trim(),
      customer_email: form.customer_email.trim() || "",
      customer_phone: form.customer_phone.trim() || undefined,
      service_id:     selectedService.id,
      service_name:   selectedService.name,
      vehicle_type:   form.vehicle_type || undefined,
      price_quoted:   parseFloat(form.price_override) || 0,
      payment_status: form.payment_status,
      confirmed_date: form.date,
      confirmed_time: form.time,
      notes:          form.notes.trim() || undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-card border border-border rounded-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div>
            <h3 className="text-base font-semibold text-foreground">Record Sale</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">Log a completed job instantly</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">

          {/* Customer */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Customer</label>
            <input value={form.customer_name} onChange={e => set("customer_name", e.target.value)}
              placeholder="Full name *"
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/50" />
            <div className="grid grid-cols-2 gap-2">
              <input value={form.customer_phone} onChange={e => set("customer_phone", e.target.value)}
                placeholder="Phone"
                className="bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/50" />
              <input value={form.customer_email} onChange={e => set("customer_email", e.target.value)}
                placeholder="Email"
                className="bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/50" />
            </div>
          </div>

          {/* Service */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Service *</label>
            <select value={form.service_id} onChange={e => { set("service_id", e.target.value); set("vehicle_type", ""); }}
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/50">
              <option value="">Select a service…</option>
              {Object.entries(grouped).map(([cat, svcs]) => (
                <optgroup key={cat} label={cat.charAt(0).toUpperCase() + cat.replace(/-/g, " ").slice(1)}>
                  {(svcs ?? []).map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Vehicle type — shown only when service has multiple tiers */}
          {tiers.length > 1 && (
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Vehicle Type *</label>
              <div className="grid grid-cols-3 gap-2">
                {tiers.map(t => (
                  <button key={t.label} type="button"
                    onClick={() => set("vehicle_type", t.label)}
                    className={cn(
                      "flex flex-col items-center py-2.5 px-2 rounded-xl border text-sm transition-colors",
                      form.vehicle_type === t.label
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-muted-foreground hover:border-primary/30"
                    )}>
                    <Car className="w-4 h-4 mb-1" strokeWidth={1.5} />
                    <span className="text-[11px] font-medium">{t.label}</span>
                    <span className="text-[10px] opacity-70 mt-0.5">{t.price}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Price */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Price *</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">$</span>
              <input
                type="number" min="0" step="0.01"
                value={form.price_override}
                onChange={e => set("price_override", e.target.value)}
                placeholder="0.00"
                className="w-full bg-background border border-border rounded-lg pl-7 pr-3 py-2 text-sm focus:outline-none focus:border-primary/50"
              />
            </div>
          </div>

          {/* Date + Time */}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Date *</label>
              <input type="date" value={form.date} onChange={e => set("date", e.target.value)}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/50 cursor-pointer" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Time</label>
              <input type="time" value={form.time} onChange={e => set("time", e.target.value)}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/50 cursor-pointer" />
            </div>
          </div>

          {/* Payment status */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Payment</label>
            <div className="grid grid-cols-2 gap-2">
              {(["paid", "unpaid"] as const).map(s => (
                <button key={s} type="button" onClick={() => set("payment_status", s)}
                  className={cn(
                    "py-2 rounded-xl border text-sm font-medium transition-colors capitalize",
                    form.payment_status === s
                      ? s === "paid"
                        ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                        : "border-amber-500/40 bg-amber-500/10 text-amber-400"
                      : "border-border bg-background text-muted-foreground hover:border-primary/30"
                  )}>
                  {s === "paid" ? "✓ Paid" : "⏳ Unpaid"}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Notes</label>
            <textarea value={form.notes} onChange={e => set("notes", e.target.value)}
              placeholder="Any additional details…"
              rows={2}
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/50 resize-none" />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-border">
          <button onClick={onClose} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!canSubmit || mut.isPending}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors">
            {mut.isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
            Record Sale
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Sales table ──────────────────────────────────────────────────────────────

const PAY_STYLE: Record<string, string> = {
  paid:   "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  unpaid: "bg-amber-500/10  text-amber-400  border-amber-500/20",
};

function SalesTable({ period }: { period: Period }) {
  const [page, setPage]     = useState(1);
  const [search, setSearch] = useState("");
  const [from, setFrom]     = useState("");
  const [to, setTo]         = useState("");
  const qc = useQueryClient();

  const q = useQuery({
    queryKey: ["sales-list", page, search, from, to],
    queryFn: () => listSales({ page, pageSize: PAGE_SIZE, search: search || undefined, from: from || undefined, to: to || undefined }),
    placeholderData: prev => prev,
  });

  const delMut = useMutation({
    mutationFn: (id: string) => deleteSale(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["sales-list"] });
      qc.invalidateQueries({ queryKey: ["sales-stats"] });
      qc.invalidateQueries({ queryKey: ["sales-popular"] });
      toast.success("Deleted");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Delete failed"),
  });

  const sales = q.data?.data ?? [];
  const total = q.data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  // Reset page when period changes
  useEffect(() => { setPage(1); }, [period]);

  return (
    <div className="space-y-3">
      {/* Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <div className="relative flex-1 min-w-40">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search customer or service…"
            className="w-full bg-background border border-border rounded-lg pl-8 pr-3 py-1.5 text-sm focus:outline-none focus:border-primary/50" />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
        <input type="date" value={from} onChange={e => { setFrom(e.target.value); setPage(1); }}
          className="bg-background border border-border rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:border-primary/50 cursor-pointer" />
        <span className="text-muted-foreground text-xs">→</span>
        <input type="date" value={to} onChange={e => { setTo(e.target.value); setPage(1); }}
          className="bg-background border border-border rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:border-primary/50 cursor-pointer" />
        {(from || to) && (
          <button onClick={() => { setFrom(""); setTo(""); }} className="text-[11px] text-muted-foreground hover:text-foreground flex items-center gap-1">
            <X className="w-3 h-3" /> Clear
          </button>
        )}
        {q.isFetching && <Loader2 className="w-3.5 h-3.5 animate-spin text-muted-foreground" />}
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border overflow-hidden">
        {q.isLoading ? (
          <div className="flex items-center justify-center py-12"><Loader2 className="w-5 h-5 animate-spin text-muted-foreground" /></div>
        ) : sales.length === 0 ? (
          <div className="py-14 text-center">
            <ShoppingBag className="w-8 h-8 text-muted-foreground/20 mx-auto mb-2" />
            <p className="text-[13px] text-muted-foreground">No sales found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">Date</th>
                  <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Customer</th>
                  <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Service</th>
                  <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">Vehicle</th>
                  <th className="text-right px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Price</th>
                  <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Payment</th>
                  <th className="px-4 py-2.5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {sales.map(sale => {
                  const d = new Date(sale.confirmed_date ?? sale.created_at);
                  const vehicle = [sale.vehicle_make, sale.vehicle_model].filter(Boolean).join(" ") || sale.vehicle_type || "—";
                  return (
                    <tr key={sale.id} className="hover:bg-muted/20 transition-colors group">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <p className="text-[12px] text-foreground">{d.toLocaleDateString("en-AU", { day: "2-digit", month: "short", year: "numeric" })}</p>
                        {sale.confirmed_time && <p className="text-[10px] text-muted-foreground">{sale.confirmed_time}</p>}
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-[13px] font-medium text-foreground">{sale.customer_name}</p>
                        {sale.customer_phone && <p className="text-[10px] text-muted-foreground">{sale.customer_phone}</p>}
                      </td>
                      <td className="px-4 py-3 max-w-[180px]">
                        <p className="text-[12px] text-foreground truncate">{sale.service_name}</p>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <p className="text-[12px] text-muted-foreground">{vehicle}</p>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <p className="text-[13px] font-bold text-foreground tabular-nums">
                          ${(Number(sale.price_quoted) || 0).toLocaleString()}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full border capitalize", PAY_STYLE[sale.payment_status] ?? PAY_STYLE.unpaid)}>
                          {sale.payment_status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => confirm(`Delete sale for ${sale.customer_name}?`) && delMut.mutate(sale.id)}
                          className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-1">
          <p className="text-[12px] text-muted-foreground">{total} total</p>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(1)} disabled={page === 1} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 disabled:pointer-events-none transition-colors"><ChevronsLeft className="w-3.5 h-3.5" /></button>
            <button onClick={() => setPage(p => p - 1)} disabled={page === 1} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 disabled:pointer-events-none transition-colors"><ChevronLeft className="w-3.5 h-3.5" /></button>
            <span className="text-[12px] text-muted-foreground px-2">{page} / {totalPages}</span>
            <button onClick={() => setPage(p => p + 1)} disabled={page === totalPages} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 disabled:pointer-events-none transition-colors"><ChevronRight className="w-3.5 h-3.5" /></button>
            <button onClick={() => setPage(totalPages)} disabled={page === totalPages} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 disabled:pointer-events-none transition-colors"><ChevronsRight className="w-3.5 h-3.5" /></button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Tab ─────────────────────────────────────────────────────────────────

export function SalesTab() {
  const [period, setPeriod]   = useState<Period>("week");
  const [modalOpen, setModal] = useState(false);
  const searchParams = useSearchParams();
  const router       = useRouter();
  const qc           = useQueryClient();

  // Auto-open modal if ?new=1 in URL
  useEffect(() => {
    if (searchParams.get("new") === "1") {
      setModal(true);
      router.replace("/dashboard?tab=sales", { scroll: false });
    }
  }, [searchParams, router]);

  const statsQ   = useQuery({ queryKey: ["sales-stats",   period], queryFn: () => getSalesStats(period),          staleTime: 30_000 });
  const popularQ = useQuery({ queryKey: ["sales-popular", period], queryFn: () => getServicePopularity(period),    staleTime: 30_000 });

  const stats = statsQ.data;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground tracking-tight">Sales</h2>
          <p className="mt-1 text-[14px] text-muted-foreground">Track completed jobs and revenue.</p>
        </div>
        <button
          onClick={() => setModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors shrink-0">
          <Plus className="w-4 h-4" />
          Record Sale
        </button>
      </div>

      {/* Period filter */}
      <div className="flex gap-1 bg-muted/60 rounded-2xl p-1 border border-border w-fit">
        {(["today", "week", "month"] as Period[]).map(p => (
          <button key={p} onClick={() => setPeriod(p)}
            className={cn("px-4 py-1.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap",
              period === p ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-white"
            )}>
            {PERIOD_LABELS[p]}
          </button>
        ))}
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Revenue" value={stats ? `$${stats.revenue.toLocaleString()}` : "—"} icon={DollarSign} accent="bg-emerald-500/10 text-emerald-400" />
        <StatCard label="Sales" value={stats ? String(stats.count) : "—"} icon={ShoppingBag} accent="bg-blue-500/10 text-blue-400" />
        <StatCard label="Avg per Sale" value={stats ? `$${stats.avgSale.toLocaleString()}` : "—"} icon={TrendingUp} accent="bg-violet-500/10 text-violet-400" />
        <StatCard label="Top Service" value={stats?.topService ?? "—"} icon={Star} accent="bg-amber-500/10 text-amber-400" />
      </div>

      {/* Chart + Popular */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Revenue chart */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5">
          <h3 className="text-[13px] font-semibold text-foreground mb-4">Revenue — {PERIOD_LABELS[period]}</h3>
          {statsQ.isLoading ? (
            <div className="h-28 flex items-center justify-center"><Loader2 className="w-4 h-4 animate-spin text-muted-foreground" /></div>
          ) : stats?.dailyRevenue.length ? (
            <RevenueChart points={stats.dailyRevenue} period={period} />
          ) : (
            <div className="h-28 flex items-center justify-center text-[13px] text-muted-foreground">No data for this period</div>
          )}
        </div>

        {/* Popular services */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="text-[13px] font-semibold text-foreground mb-4">Most Popular</h3>
          {popularQ.isLoading ? (
            <div className="flex items-center justify-center py-6"><Loader2 className="w-4 h-4 animate-spin text-muted-foreground" /></div>
          ) : (
            <PopularServices data={popularQ.data ?? []} />
          )}
        </div>
      </div>

      {/* Sales table */}
      <div>
        <h3 className="text-[14px] font-semibold text-foreground mb-3">All Sales</h3>
        <SalesTable period={period} />
      </div>

      {/* Add modal */}
      {modalOpen && (
        <AddSaleModal
          onClose={() => setModal(false)}
          onSaved={() => setModal(false)}
        />
      )}
    </div>
  );
}
