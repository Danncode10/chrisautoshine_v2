"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Plus, Search, X, Check, Loader2, Trash2,
  DollarSign, ShoppingBag, TrendingUp, Star,
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight,
  ChevronDown, Pencil,
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
  const match = raw.match(/[\d]+(?:\.[\d]+)?/);
  return match ? parseFloat(match[0]) : 0;
}

function isRangePrice(raw: string): boolean {
  return /[-–—]/.test(raw.replace(/^\$/, "")) || /^from\s/i.test(raw.trim());
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

// ─── Service Picker ───────────────────────────────────────────────────────────

type SelectedItem = {
  key: string;
  service_id: string;
  service_name: string;
  vehicle_type: string;
  price: number;
  isRange: boolean;
};

const PICKER_GROUPS = [
  { key: "exterior",         label: "Exterior"  },
  { key: "interior",         label: "Interior"  },
  { key: "exclusive",        label: "Exclusive" },
  { key: "paint-correction", label: "Paint"     },
  { key: "addons",           label: "Add-ons"   },
] as const;

function ServicePickerContent({
  initialSelected,
  onDone,
}: {
  initialSelected: SelectedItem[];
  onDone: (items: SelectedItem[]) => void;
}) {
  const { data: services, isLoading } = useQuery({ queryKey: ["services"], queryFn: listServices });
  const [activeGroup, setActiveGroup] = useState<string>("exterior");
  const [expandedId, setExpandedId]   = useState<string | null>(null);
  const [selected, setSelected]       = useState<SelectedItem[]>(initialSelected);

  const byGroup = (cat: string) =>
    (services ?? [])
      .filter(s => s.category === cat)
      .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));

  const makeKey  = (svcId: string, vt: string) => `${svcId}::${vt}`;
  const isSel    = (svcId: string, vt: string) => selected.some(s => s.key === makeKey(svcId, vt));

  const toggle = (item: Omit<SelectedItem, "key">) => {
    const key = makeKey(item.service_id, item.vehicle_type);
    setSelected(prev =>
      prev.some(s => s.key === key)
        ? prev.filter(s => s.key !== key)
        : [...prev, { ...item, key }]
    );
  };

  const total    = selected.reduce((s, i) => s + i.price, 0);
  const hasRange = selected.some(i => i.isRange);

  return (
    <>
      {/* Category tabs — horizontally scrollable */}
      <div className="shrink-0 border-b border-border overflow-x-auto">
        <div className="flex gap-1.5 px-4 py-2.5" style={{ minWidth: "max-content" }}>
          {PICKER_GROUPS.map(g => {
            const count = byGroup(g.key).length;
            if (!count) return null;
            const selCount = selected.filter(s =>
              (services ?? []).some(svc => svc.id === s.service_id && svc.category === g.key)
            ).length;
            return (
              <button key={g.key} type="button"
                onClick={() => { setActiveGroup(g.key); setExpandedId(null); }}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[12px] font-semibold whitespace-nowrap transition-colors",
                  activeGroup === g.key ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                )}>
                {g.label}
                {selCount > 0 ? (
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500 text-white text-[9px] font-bold leading-none">
                    {selCount}
                  </span>
                ) : (
                  <span className="text-[10px] opacity-50">({count})</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Service cards */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        {isLoading ? (
          <div className="flex items-center justify-center py-14">
            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
          </div>
        ) : byGroup(activeGroup).length === 0 ? (
          <p className="text-[13px] text-muted-foreground text-center py-10">No services here.</p>
        ) : (
          byGroup(activeGroup).map(svc => {
            const tiers      = Array.isArray(svc.pricing_tiers) ? (svc.pricing_tiers as PriceTier[]) : [];
            const features   = Array.isArray(svc.features)      ? (svc.features as string[])         : [];
            const isExpanded = expandedId === svc.id;
            const multiTier  = tiers.length > 1;
            const oneTier    = tiers.length === 1 ? tiers[0] : null;
            const anyTierSel = multiTier
              ? tiers.some(t => isSel(svc.id, t.label))
              : oneTier ? isSel(svc.id, oneTier.label) : false;

            return (
              <div key={svc.id} className={cn(
                "rounded-2xl border overflow-hidden transition-all",
                anyTierSel
                  ? "border-emerald-500/50 bg-emerald-500/5"
                  : svc.is_featured
                  ? "border-primary/30 bg-primary/5"
                  : "border-border bg-card"
              )}>
                {/* Card row */}
                <button type="button"
                  onClick={() => {
                    if (multiTier) {
                      setExpandedId(isExpanded ? null : svc.id);
                    } else {
                      toggle({
                        service_id:   svc.id,
                        service_name: svc.name,
                        vehicle_type: oneTier?.label ?? "",
                        price:        oneTier ? parseTierPrice(oneTier.price) : 0,
                        isRange:      oneTier ? isRangePrice(oneTier.price) : false,
                      });
                    }
                  }}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left">
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      "text-[14px] font-semibold leading-snug",
                      anyTierSel ? "text-emerald-400" : svc.is_featured ? "text-primary" : "text-foreground"
                    )}>
                      {svc.name}
                      {svc.is_featured && !anyTierSel && (
                        <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-primary/20 text-primary align-middle">
                          Popular
                        </span>
                      )}
                    </p>
                    {features.length > 0 && (
                      <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                        {features.slice(0, 3).join(" · ")}
                      </p>
                    )}
                  </div>
                  <div className="shrink-0 flex items-center gap-2">
                    <span className={cn(
                      "text-[13px] font-bold tabular-nums",
                      anyTierSel ? "text-emerald-400" : "text-muted-foreground"
                    )}>
                      {oneTier
                        ? oneTier.price
                        : multiTier
                        ? (isRangePrice(tiers[0].price) ? `~${tiers[0].price}` : `${tiers[0].price}+`)
                        : ""}
                    </span>
                    {multiTier ? (
                      <ChevronDown className={cn(
                        "w-4 h-4 text-muted-foreground",
                        isExpanded && "rotate-180"
                      )} style={{ transition: "transform 0.2s" }} />
                    ) : anyTierSel ? (
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500">
                        <Check className="w-3.5 h-3.5 text-white" />
                      </span>
                    ) : (
                      <span className="w-6 h-6 rounded-full border-2 border-border block" />
                    )}
                  </div>
                </button>

                {/* Tier grid */}
                {multiTier && isExpanded && (
                  <div className="px-4 pb-4 grid gap-2" style={{
                    gridTemplateColumns: `repeat(${Math.min(tiers.length, 3)}, 1fr)`
                  }}>
                    {tiers.map(t => {
                      const sel = isSel(svc.id, t.label);
                      return (
                        <button key={t.label} type="button"
                          onClick={() => toggle({
                            service_id:   svc.id,
                            service_name: svc.name,
                            vehicle_type: t.label,
                            price:        parseTierPrice(t.price),
                            isRange:      isRangePrice(t.price),
                          })}
                          className={cn(
                            "flex flex-col items-center py-3 px-2 rounded-xl border transition-all",
                            sel
                              ? "border-emerald-500/60 bg-emerald-500/15"
                              : "border-border bg-background"
                          )}>
                          <span className={cn(
                            "text-[12px] font-semibold",
                            sel ? "text-emerald-400" : "text-foreground"
                          )}>{t.label}</span>
                          <span className={cn(
                            "text-[13px] font-bold mt-0.5 tabular-nums",
                            sel ? "text-emerald-400" : "text-muted-foreground"
                          )}>
                            {isRangePrice(t.price) ? `~${t.price}` : t.price}
                          </span>
                          {sel && (
                            <span className="mt-1.5 flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500">
                              <Check className="w-3 h-3 text-white" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
        <div style={{ height: 8 }} />
      </div>

      {/* Sticky cart bar */}
      <div className="shrink-0 border-t border-border bg-card px-4 py-3">
        {selected.length === 0 ? (
          <p className="text-[12px] text-muted-foreground text-center py-0.5">
            Select at least one service to continue
          </p>
        ) : (
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[13px] font-semibold text-foreground">
                {selected.length} service{selected.length !== 1 ? "s" : ""} selected
              </p>
              <p className="text-[13px] font-bold text-emerald-400 tabular-nums">
                {hasRange ? "~" : ""}${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                {hasRange && (
                  <span className="ml-1.5 text-[10px] font-normal text-amber-400">· adjust price after</span>
                )}
              </p>
            </div>
            <button type="button" onClick={() => onDone(selected)}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold shrink-0">
              <Check className="w-4 h-4" />
              Done
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// ─── Add Sale Modal ───────────────────────────────────────────────────────────

function AddSaleModal({ onClose, onSaved }: { onClose: () => void; onSaved: () => void }) {
  const [step, setStep]               = useState<"form" | "picker">("form");
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  const now = new Date();
  const [form, setForm] = useState<{
    customer_name: string;
    customer_phone: string;
    customer_email: string;
    price_override: string;
    date: string;
    time: string;
    notes: string;
    payment_status: "paid" | "unpaid";
  }>({
    customer_name: "",
    customer_phone: "",
    customer_email: "",
    price_override: "",
    date: now.toISOString().split("T")[0],
    time: now.toTimeString().slice(0, 5),
    notes: "",
    payment_status: "paid",
  });

  const set = (k: string, v: string) => setForm(prev => ({ ...prev, [k]: v }));

  const handlePickerDone = (items: SelectedItem[]) => {
    setSelectedItems(items);
    const total = items.reduce((s, i) => s + i.price, 0);
    set("price_override", total > 0 ? String(total) : "");
    setStep("form");
  };

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

  const canSubmit = form.customer_name.trim() && selectedItems.length > 0 && form.price_override && form.date;

  const handleSubmit = () => {
    if (!canSubmit || selectedItems.length === 0) return;
    const first = selectedItems[0];
    const serviceName = selectedItems
      .map(s => s.vehicle_type ? `${s.service_name} (${s.vehicle_type})` : s.service_name)
      .join(" + ");
    mut.mutate({
      customer_name:  form.customer_name.trim(),
      customer_email: form.customer_email.trim() || "",
      customer_phone: form.customer_phone.trim() || undefined,
      service_id:     first.service_id,
      service_name:   serviceName,
      vehicle_type:   first.vehicle_type || undefined,
      price_quoted:   parseFloat(form.price_override) || 0,
      payment_status: form.payment_status,
      confirmed_date: form.date,
      confirmed_time: form.time,
      notes:          form.notes.trim() || undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
      onClick={e => { if (e.target === e.currentTarget && step === "form") onClose(); }}>
      <div className="bg-card border border-border rounded-2xl w-full max-w-lg shadow-2xl flex flex-col"
        style={{ maxHeight: "92vh" }}>

        {/* ── PICKER STEP ─────────────────────────────────────────── */}
        {step === "picker" && (
          <>
            <div className="flex items-center gap-3 px-4 pt-4 pb-3 border-b border-border shrink-0">
              <button type="button" onClick={() => setStep("form")}
                className="flex items-center justify-center w-8 h-8 rounded-xl bg-muted text-muted-foreground hover:text-foreground transition-colors shrink-0">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="min-w-0">
                <h3 className="text-[15px] font-semibold text-foreground leading-tight">Choose Services</h3>
                <p className="text-[11px] text-muted-foreground">Tap to add · tap again to remove</p>
              </div>
            </div>
            <ServicePickerContent
              initialSelected={selectedItems}
              onDone={handlePickerDone}
            />
          </>
        )}

        {/* ── FORM STEP ───────────────────────────────────────────── */}
        {step === "form" && (
          <>
            <div className="flex items-center justify-between p-5 border-b border-border shrink-0">
              <div>
                <h3 className="text-base font-semibold text-foreground">Record Sale</h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">Log a completed job instantly</p>
              </div>
              <button onClick={onClose} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1">
              <div className="p-5 space-y-4">

                {/* Customer */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                    Customer <span className="text-primary normal-case">*</span>
                  </label>
                  <input value={form.customer_name} onChange={e => set("customer_name", e.target.value)}
                    placeholder="Full name"
                    className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/50" />
                  <div className="grid grid-cols-2 gap-2">
                    <input value={form.customer_phone} onChange={e => set("customer_phone", e.target.value)}
                      placeholder="Phone (optional)"
                      className="bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/50" />
                    <input value={form.customer_email} onChange={e => set("customer_email", e.target.value)}
                      placeholder="Email (optional)"
                      className="bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/50" />
                  </div>
                </div>

                {/* Service button */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                    Services <span className="text-primary">*</span>
                  </label>
                  <button type="button" onClick={() => setStep("picker")}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2.5 rounded-xl border text-sm transition-all",
                      selectedItems.length > 0
                        ? "border-emerald-500/40 bg-emerald-500/5 text-foreground"
                        : "border-border bg-background text-muted-foreground hover:border-primary/30"
                    )}>
                    <span className={cn("truncate", selectedItems.length === 0 && "opacity-60")}>
                      {selectedItems.length === 0
                        ? "Choose services…"
                        : selectedItems.length === 1
                        ? selectedItems[0].service_name + (selectedItems[0].vehicle_type ? ` · ${selectedItems[0].vehicle_type}` : "")
                        : `${selectedItems.length} services selected`}
                    </span>
                    <Pencil className="w-3.5 h-3.5 shrink-0 ml-2 opacity-50" />
                  </button>
                </div>

                {/* POS receipt — multi-line */}
                {selectedItems.length > 0 && (
                  <div className="rounded-2xl border border-border bg-muted/20 overflow-hidden">
                    <div className="px-4 py-2.5 border-b border-border flex items-center justify-between">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Order Summary</span>
                      <button type="button" onClick={() => setStep("picker")}
                        className="text-[10px] text-primary hover:text-primary/80 font-medium transition-colors">
                        Edit
                      </button>
                    </div>
                    {selectedItems.map((item, idx) => (
                      <div key={item.key} className={cn(
                        "px-4 py-3 flex items-center justify-between gap-3",
                        idx < selectedItems.length - 1 && "border-b border-border/40"
                      )}>
                        <div className="min-w-0">
                          <p className="text-[13px] font-medium text-foreground truncate">{item.service_name}</p>
                          {item.vehicle_type && (
                            <p className="text-[11px] text-muted-foreground mt-0.5">{item.vehicle_type}</p>
                          )}
                        </div>
                        <span className={cn(
                          "text-[13px] font-bold tabular-nums shrink-0",
                          item.isRange ? "text-amber-400" : "text-emerald-400"
                        )}>
                          {item.isRange ? "~" : ""}${item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    ))}
                    {selectedItems.some(i => i.isRange) && (
                      <div className="px-4 py-2 bg-amber-500/10 border-t border-amber-500/20">
                        <p className="text-[11px] text-amber-400">~ Range price — update the amount below before saving</p>
                      </div>
                    )}
                    <div className="px-4 py-3 border-t border-border flex items-center justify-between">
                      <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Total</span>
                      <span className="text-[16px] font-bold text-foreground tabular-nums">
                        ${parseFloat(form.price_override || "0").toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                )}

                {/* Price */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                    Price <span className="text-primary">*</span>
                    <span className="ml-1 normal-case font-normal opacity-60">(auto-filled · editable)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">$</span>
                    <input type="number" min="0" step="0.01"
                      value={form.price_override}
                      onChange={e => set("price_override", e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-background border border-border rounded-lg pl-7 pr-3 py-2 text-sm focus:outline-none focus:border-primary/50" />
                  </div>
                </div>

                {/* Date + Time */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Date <span className="text-primary">*</span></label>
                    <input type="date" value={form.date} onChange={e => set("date", e.target.value)}
                      className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/50 cursor-pointer" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Time</label>
                    <input type="time" value={form.time} onChange={e => set("time", e.target.value)}
                      className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/50 cursor-pointer" />
                  </div>
                </div>

                {/* Payment */}
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
                    placeholder="Any additional details…" rows={2}
                    className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/50 resize-none" />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-border shrink-0">
              <button onClick={onClose} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                Cancel
              </button>
              <button onClick={handleSubmit} disabled={!canSubmit || mut.isPending}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors">
                {mut.isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                Record Sale
              </button>
            </div>
          </>
        )}
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
