"use client";

import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Check, Plus, Trash2, Loader2, Eye, EyeOff, Sparkles, X, Pencil } from "lucide-react";
import { listServices, updateService, createService, deleteService } from "@/services/services";
import type { Tables } from "@/types/supabase";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type PriceTier = { label: string; price: string };
type Service = Tables<"services"> & { features: string[]; pricing_tiers: PriceTier[] };

const asFeatures = (raw: unknown): string[] => (Array.isArray(raw) ? (raw as string[]) : []);
const asTiers    = (raw: unknown): PriceTier[] => (Array.isArray(raw) ? (raw as PriceTier[]) : []);

const MAIN_GROUPS = [
  { key: "exterior",  label: "Exterior"  },
  { key: "interior",  label: "Interior"  },
  { key: "exclusive", label: "Exclusive" },
] as const;

type MainGroup = (typeof MAIN_GROUPS)[number]["key"];

// ─── Inline text editor ───────────────────────────────────────────────────────

function InlineText({
  value, onSave, className, placeholder, multiline,
}: {
  value: string; onSave: (v: string) => void;
  className?: string; placeholder?: string; multiline?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const ref = useRef<HTMLInputElement & HTMLTextAreaElement>(null);

  useEffect(() => { if (editing) ref.current?.focus(); }, [editing]);

  const commit = () => { onSave(draft); setEditing(false); };

  if (!editing) {
    return (
      <button
        onClick={() => { setDraft(value); setEditing(true); }}
        className={cn("group inline-flex items-start gap-1 text-left", className)}
      >
        <span>{value || <span className="italic opacity-30">{placeholder}</span>}</span>
        <Pencil className="w-3 h-3 mt-0.5 opacity-0 group-hover:opacity-40 shrink-0 transition-opacity" />
      </button>
    );
  }

  const sharedClass = cn("bg-background/80 border border-primary/60 rounded px-2 py-0.5 focus:outline-none", className);
  return (
    <span className="inline-flex items-center gap-1">
      {multiline ? (
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          value={draft}
          rows={2}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Escape") setEditing(false); }}
          className={cn(sharedClass, "resize-none w-full")}
        />
      ) : (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") commit(); if (e.key === "Escape") setEditing(false); }}
          className={sharedClass}
        />
      )}
      <button onClick={commit} className="p-0.5 text-emerald-400 hover:text-emerald-300"><Check className="w-3 h-3" /></button>
      <button onClick={() => setEditing(false)} className="p-0.5 text-muted-foreground"><X className="w-3 h-3" /></button>
    </span>
  );
}

// ─── Package card (matches landing page style) ────────────────────────────────

function PackageCard({ service, onUpdate, onDelete }: {
  service: Service;
  onUpdate: (u: Partial<Service & { features: string[]; pricing_tiers: PriceTier[] }>) => void;
  onDelete: () => void;
}) {
  const features = asFeatures(service.features);
  const tiers    = asTiers(service.pricing_tiers);

  const [addingFeature, setAddingFeature] = useState(false);
  const [newFeature, setNewFeature]       = useState("");
  const [addingTier, setAddingTier]       = useState(false);
  const [newLabel, setNewLabel]           = useState("");
  const [newPrice, setNewPrice]           = useState("");

  const setFeatures = (f: string[]) => onUpdate({ features: f });
  const setTiers    = (t: PriceTier[]) => onUpdate({ pricing_tiers: t });

  return (
    <div className={cn(
      "relative rounded-3xl p-px overflow-hidden flex flex-col",
      service.is_featured
        ? "bg-gradient-to-br from-primary/60 via-primary/20 to-transparent"
        : "bg-gradient-to-br from-white/10 via-white/[0.04] to-transparent",
    )}>
      {/* Badge */}
      {service.badge && (
        <div className="absolute top-4 right-14 z-10">
          <span className="px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <InlineText value={service.badge} onSave={(v) => onUpdate({ badge: v || null })}
              className="text-white text-xs font-semibold" />
          </span>
        </div>
      )}

      {/* Controls top-right */}
      <div className="absolute top-3 right-3 z-10 flex gap-1">
        <button title={service.is_published ? "Published" : "Hidden"}
          onClick={() => onUpdate({ is_published: !service.is_published })}
          className={cn("p-1.5 rounded-lg transition-colors",
            service.is_published ? "text-emerald-400 bg-emerald-500/10" : "text-muted-foreground bg-muted"
          )}>
          {service.is_published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
        </button>
        <button title={service.is_featured ? "Featured" : "Set featured"}
          onClick={() => onUpdate({ is_featured: !service.is_featured })}
          className={cn("p-1.5 rounded-lg transition-colors",
            service.is_featured ? "text-primary bg-primary/10" : "text-muted-foreground bg-muted"
          )}>
          <Sparkles className="w-3.5 h-3.5" />
        </button>
        <button title="Delete"
          onClick={() => confirm(`Delete "${service.name}"?`) && onDelete()}
          className="p-1.5 rounded-lg text-muted-foreground bg-muted hover:text-destructive hover:bg-destructive/10 transition-colors">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Card body */}
      <div className="bg-card rounded-3xl p-6 flex flex-col gap-5 h-full">

        {/* Name */}
        <InlineText value={service.name} onSave={(v) => onUpdate({ name: v })}
          className="text-white font-bold text-xl" placeholder="Package name" />

        {/* Badge toggle (if no badge yet) */}
        {!service.badge && (
          <button onClick={() => onUpdate({ badge: "Popular" })}
            className="self-start text-[10px] text-muted-foreground border border-dashed border-border rounded-full px-2 py-0.5 hover:border-primary/40 hover:text-primary transition-colors">
            + badge
          </button>
        )}

        {/* Features list */}
        <ul className="space-y-2 flex-1">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 group">
              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <InlineText value={f} onSave={(v) => setFeatures(features.map((x, j) => j === i ? v : x))}
                className="text-sm text-muted-foreground leading-relaxed flex-1" />
              <button onClick={() => setFeatures(features.filter((_, j) => j !== i))}
                className="opacity-0 group-hover:opacity-100 shrink-0 text-muted-foreground hover:text-destructive transition-all">
                <X className="w-3 h-3" />
              </button>
            </li>
          ))}

          {addingFeature ? (
            <li className="flex items-center gap-1.5 pl-6">
              <input autoFocus value={newFeature} onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Feature text…"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newFeature.trim()) { setFeatures([...features, newFeature.trim()]); setNewFeature(""); setAddingFeature(false); }
                  if (e.key === "Escape") setAddingFeature(false);
                }}
                className="flex-1 bg-background border border-primary/40 rounded px-2 py-1 text-sm focus:outline-none" />
              <button onClick={() => { if (newFeature.trim()) { setFeatures([...features, newFeature.trim()]); setNewFeature(""); } setAddingFeature(false); }}
                className="text-emerald-400"><Check className="w-3.5 h-3.5" /></button>
              <button onClick={() => setAddingFeature(false)} className="text-muted-foreground"><X className="w-3.5 h-3.5" /></button>
            </li>
          ) : (
            <li>
              <button onClick={() => setAddingFeature(true)}
                className="flex items-center gap-1.5 pl-6 text-[12px] text-muted-foreground hover:text-primary transition-colors">
                <Plus className="w-3 h-3" /> Add feature
              </button>
            </li>
          )}
        </ul>

        {/* Pricing tiers */}
        <div className="pt-4 border-t border-border">
          <div className={cn("grid gap-2", tiers.length === 3 ? "grid-cols-3" : tiers.length === 2 ? "grid-cols-2" : "grid-cols-1")}>
            {tiers.map((t, i) => (
              <div key={i} className="text-center relative group/tier">
                <button onClick={() => setTiers(tiers.filter((_, j) => j !== i))}
                  className="absolute -top-1 -right-1 opacity-0 group-hover/tier:opacity-100 w-4 h-4 bg-destructive rounded-full flex items-center justify-center transition-opacity z-10">
                  <X className="w-2.5 h-2.5 text-white" />
                </button>
                <InlineText value={t.label}
                  onSave={(v) => setTiers(tiers.map((x, j) => j === i ? { ...x, label: v } : x))}
                  className="text-[10px] text-muted-foreground block w-full justify-center mb-1"
                  placeholder="Label" />
                <InlineText value={t.price}
                  onSave={(v) => setTiers(tiers.map((x, j) => j === i ? { ...x, price: v } : x))}
                  className={cn("font-bold block w-full justify-center",
                    service.is_featured ? "text-primary text-lg" : "text-white text-base")}
                  placeholder="$0" />
              </div>
            ))}
          </div>

          {addingTier ? (
            <div className="mt-3 flex gap-2 items-center">
              <input autoFocus value={newLabel} onChange={(e) => setNewLabel(e.target.value)}
                placeholder="Label (e.g. SUV)" className="flex-1 bg-background border border-primary/40 rounded px-2 py-1 text-[11px] focus:outline-none" />
              <input value={newPrice} onChange={(e) => setNewPrice(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newPrice.trim()) { setTiers([...tiers, { label: newLabel, price: newPrice }]); setNewLabel(""); setNewPrice(""); setAddingTier(false); }
                  if (e.key === "Escape") setAddingTier(false);
                }}
                placeholder="$0" className="w-20 bg-background border border-primary/40 rounded px-2 py-1 text-[11px] focus:outline-none" />
              <button onClick={() => { if (newPrice.trim()) { setTiers([...tiers, { label: newLabel, price: newPrice }]); setNewLabel(""); setNewPrice(""); } setAddingTier(false); }}
                className="text-emerald-400"><Check className="w-3.5 h-3.5" /></button>
              <button onClick={() => setAddingTier(false)} className="text-muted-foreground"><X className="w-3.5 h-3.5" /></button>
            </div>
          ) : (
            <button onClick={() => setAddingTier(true)}
              className="mt-3 w-full text-[11px] text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-1">
              <Plus className="w-3 h-3" /> Add price tier
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Simple row (Paint Correction & Add-ons) ──────────────────────────────────

function SimpleRow({ service, onUpdate, onDelete }: {
  service: Service;
  onUpdate: (u: Partial<Service>) => void;
  onDelete: () => void;
}) {
  const tiers = asTiers(service.pricing_tiers);
  const price = tiers[0]?.price ?? "";
  const setPrice = (v: string) =>
    onUpdate({ pricing_tiers: [{ label: "", price: v }, ...tiers.slice(1)] as unknown as Service["pricing_tiers"] });

  return (
    <div className="flex items-center justify-between py-2.5 border-b border-border last:border-0 group">
      <InlineText value={service.name} onSave={(v) => onUpdate({ name: v })}
        className="text-sm text-white flex-1 mr-4" placeholder="Item name" />
      <div className="flex items-center gap-3 shrink-0">
        <InlineText value={price} onSave={setPrice}
          className="text-sm font-bold text-primary min-w-[60px] text-right justify-end"
          placeholder="$0" />
        <button onClick={() => confirm(`Delete "${service.name}"?`) && onDelete()}
          className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

// ─── Add package / Add row forms ──────────────────────────────────────────────

function AddPackageCard({ groupKey, onAdd }: { groupKey: string; onAdd: (name: string) => void }) {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  if (!open) {
    return (
      <button onClick={() => setOpen(true)}
        className="rounded-3xl border-2 border-dashed border-border hover:border-primary/30 min-h-[200px] flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors">
        <Plus className="w-6 h-6" />
        <span className="text-[13px]">Add package</span>
      </button>
    );
  }
  return (
    <div className="rounded-3xl border-2 border-dashed border-primary/30 p-6 flex flex-col gap-3 min-h-[200px]">
      <p className="text-[13px] font-semibold text-foreground">New package</p>
      <input autoFocus value={name} onChange={(e) => setName(e.target.value)}
        placeholder="Package name"
        onKeyDown={(e) => { if (e.key === "Enter" && name.trim()) { onAdd(name.trim()); setName(""); setOpen(false); } if (e.key === "Escape") setOpen(false); }}
        className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/50" />
      <div className="flex gap-2 mt-auto">
        <button onClick={() => setOpen(false)} className="px-3 py-1.5 text-[13px] text-muted-foreground">Cancel</button>
        <button disabled={!name.trim()}
          onClick={() => { onAdd(name.trim()); setName(""); setOpen(false); }}
          className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-[13px] font-medium disabled:opacity-50">
          Add
        </button>
      </div>
    </div>
  );
}

function AddRowButton({ onAdd, placeholder }: { onAdd: (name: string, price: string) => void; placeholder: string }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  if (!open) {
    return (
      <button onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 mt-2 text-[13px] text-muted-foreground hover:text-primary transition-colors">
        <Plus className="w-3.5 h-3.5" /> Add item
      </button>
    );
  }
  return (
    <div className="flex items-center gap-2 mt-3">
      <input autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder={placeholder}
        className="flex-1 bg-background border border-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-primary/50" />
      <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="$0"
        onKeyDown={(e) => {
          if (e.key === "Enter" && name.trim()) { onAdd(name.trim(), price.trim()); setName(""); setPrice(""); setOpen(false); }
          if (e.key === "Escape") setOpen(false);
        }}
        className="w-24 bg-background border border-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-primary/50" />
      <button onClick={() => { if (name.trim()) { onAdd(name.trim(), price.trim()); setName(""); setPrice(""); } setOpen(false); }}
        className="text-emerald-400"><Check className="w-4 h-4" /></button>
      <button onClick={() => setOpen(false)} className="text-muted-foreground"><X className="w-4 h-4" /></button>
    </div>
  );
}

// ─── Main Tab ─────────────────────────────────────────────────────────────────

export function ServicesTab() {
  const [activeGroup, setActiveGroup] = useState<MainGroup>("exterior");
  const qc = useQueryClient();

  const { data: allServices, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: listServices,
  });

  const updateMut = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Record<string, unknown> }) => updateService(id, updates),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["services"] });
      qc.invalidateQueries({ queryKey: ["recent-activity"] });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Save failed"),
  });

  const createMut = useMutation({
    mutationFn: async (input: { name: string; category: string; features?: string[]; pricing_tiers?: PriceTier[]; display_order?: number }) => {
      const client = (await import("@/utils/supabase/client")).createClient();
      const { data: org } = await client.from("organizations").select("id")
        .eq("app_id", process.env.NEXT_PUBLIC_APP_ID ?? "chris-auto-shine").single();
      if (!org) throw new Error("Org not found");
      return createService({
        name: input.name,
        slug: `${input.category}-${input.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`,
        category: input.category,
        features: (input.features ?? []) as unknown as never,
        pricing_tiers: (input.pricing_tiers ?? []) as unknown as never,
        organization_id: org.id,
        is_published: true,
        display_order: input.display_order ?? 99,
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["services"] });
      qc.invalidateQueries({ queryKey: ["dashboard-stats"] });
      toast.success("Added");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed"),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => deleteService(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["services"] });
      qc.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Delete failed"),
  });

  const save = (id: string, updates: Record<string, unknown>) => updateMut.mutate({ id, updates });

  const byGroup = (cat: string) =>
    ((allServices ?? []) as Service[])
      .filter(s => s.category === cat)
      .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));

  const mainServices = byGroup(activeGroup);
  const paintServices = byGroup("paint-correction");
  const addonServices = byGroup("addons");

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground tracking-tight">Services & Packages</h2>
        <p className="mt-1 text-[14px] text-muted-foreground">
          Click any name, feature, or price to edit inline. Changes save instantly.
        </p>
      </div>

      {/* ── Main packages (Exterior / Interior / Exclusive) ── */}
      <div className="space-y-5">
        {/* Tabs */}
        <div className="flex gap-1 bg-muted/60 rounded-2xl p-1 w-fit border border-border">
          {MAIN_GROUPS.map(({ key, label }) => {
            const count = byGroup(key).length;
            return (
              <button key={key} onClick={() => setActiveGroup(key)}
                className={cn(
                  "px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                  activeGroup === key
                    ? "bg-primary text-white shadow-sm"
                    : "text-muted-foreground hover:text-white"
                )}>
                {label}
                <span className={cn(
                  "ml-1.5 text-[10px] font-bold",
                  activeGroup === key ? "opacity-80" : "opacity-50"
                )}>({count})</span>
              </button>
            );
          })}
        </div>

        {/* Cards grid */}
        {isLoading ? (
          <div className="p-12 text-center"><Loader2 className="w-5 h-5 animate-spin inline" /></div>
        ) : (
          <div className={cn(
            "grid gap-5",
            mainServices.length <= 2
              ? "grid-cols-1 sm:grid-cols-2 max-w-2xl"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          )}>
            {mainServices.map(s => (
              <PackageCard key={s.id} service={s}
                onUpdate={(u) => save(s.id, u as Record<string, unknown>)}
                onDelete={() => deleteMut.mutate(s.id)} />
            ))}
            <AddPackageCard groupKey={activeGroup}
              onAdd={(name) => createMut.mutate({ name, category: activeGroup })} />
          </div>
        )}
      </div>

      {/* ── Paint Correction + Add-ons side by side ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4 border-t border-border">

        {/* Paint Correction */}
        <div className="space-y-3">
          <h3 className="text-white font-bold text-xl">Paint Correction</h3>
          <div className="rounded-3xl p-px bg-gradient-to-br from-white/10 via-white/[0.04] to-transparent">
            <div className="bg-card rounded-3xl px-6 py-4">
              <div className="text-[10px] text-muted-foreground mb-3 flex justify-between pr-8">
                <span>Service</span><span>Price</span>
              </div>
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : paintServices.length === 0 ? (
                <p className="text-[13px] text-muted-foreground text-center py-4">No items yet.</p>
              ) : (
                paintServices.map(s => (
                  <SimpleRow key={s.id} service={s}
                    onUpdate={(u) => save(s.id, u as Record<string, unknown>)}
                    onDelete={() => deleteMut.mutate(s.id)} />
                ))
              )}
              <AddRowButton placeholder="e.g. Single Stage Polish"
                onAdd={(name, price) => createMut.mutate({
                  name, category: "paint-correction",
                  pricing_tiers: price ? [{ label: "", price }] : [],
                  display_order: (paintServices.at(-1)?.display_order ?? 0) + 10,
                })} />
            </div>
          </div>
        </div>

        {/* Add-ons */}
        <div className="space-y-3">
          <h3 className="text-white font-bold text-xl">Add-ons</h3>
          <div className="rounded-3xl p-px bg-gradient-to-br from-white/10 via-white/[0.04] to-transparent">
            <div className="bg-card rounded-3xl px-6 py-4">
              <div className="text-[10px] text-muted-foreground mb-3 flex justify-between pr-8">
                <span>Service</span><span>Price</span>
              </div>
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : addonServices.length === 0 ? (
                <p className="text-[13px] text-muted-foreground text-center py-4">No items yet.</p>
              ) : (
                addonServices.map(s => (
                  <SimpleRow key={s.id} service={s}
                    onUpdate={(u) => save(s.id, u as Record<string, unknown>)}
                    onDelete={() => deleteMut.mutate(s.id)} />
                ))
              )}
              <AddRowButton placeholder="e.g. Ceramic Coating"
                onAdd={(name, price) => createMut.mutate({
                  name, category: "addons",
                  pricing_tiers: price ? [{ label: "", price }] : [],
                  display_order: (addonServices.at(-1)?.display_order ?? 0) + 10,
                })} />
            </div>
          </div>
        </div>
      </div>

      {/* Saving indicator */}
      {(updateMut.isPending || createMut.isPending || deleteMut.isPending) && (
        <div className="fixed bottom-6 right-6 flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-2 shadow-lg text-[13px] text-muted-foreground z-50">
          <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving…
        </div>
      )}
    </div>
  );
}
