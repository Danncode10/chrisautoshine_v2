"use client";

import { useState, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Loader2, Search, X, RefreshCw,
  Plus, Pencil, Trash2, ShoppingCart, Activity,
  CalendarDays, ChevronDown,
} from "lucide-react";
import { DashPagination } from "@/components/dashboard/dash-pagination";
import { listLogs, getLogDistinctValues } from "@/services/logs";
import type { AuditLog } from "@/services/logs";
import { cn } from "@/lib/utils";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const PAGE_SIZE = 15;

const ACTION_LABELS: Record<string, string> = {
  "create.service": "New Service",
  "update.service": "Edit Service",
  "delete.service": "Delete Service",
  "create.sale":    "Sale Recorded",
  "delete.sale":    "Sale Deleted",
  "create.lead":    "New Lead",
  "delete.lead":    "Lead Deleted",
  "create.booking": "New Booking",
  "update.booking": "Edit Booking",
  "delete.booking": "Delete Booking",
};

function actionVerb(action: string): string {
  if (ACTION_LABELS[action]) return ACTION_LABELS[action];
  const [verb, ...rest] = action.split(".");
  const resource = rest.join(".").replace(/-/g, " ");
  return `${verb.charAt(0).toUpperCase() + verb.slice(1)} ${resource}`;
}

type ActionVariant = "create" | "update" | "delete" | "default";

function getVariant(action: string): ActionVariant {
  if (action.startsWith("create")) return "create";
  if (action.startsWith("update")) return "update";
  if (action.startsWith("delete")) return "delete";
  return "default";
}

const VARIANT = {
  create: {
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    dot:   "bg-emerald-500",
    ring:  "ring-emerald-500/20",
    bg:    "bg-emerald-500/10",
  },
  update: {
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    dot:   "bg-blue-500",
    ring:  "ring-blue-500/20",
    bg:    "bg-blue-500/10",
  },
  delete: {
    badge: "bg-destructive/10 text-destructive border-destructive/20",
    dot:   "bg-destructive",
    ring:  "ring-destructive/20",
    bg:    "bg-destructive/10",
  },
  default: {
    badge: "bg-muted text-muted-foreground border-border",
    dot:   "bg-muted-foreground",
    ring:  "ring-border",
    bg:    "bg-muted/40",
  },
};

function ActionIcon({ action }: { action: string }) {
  const v = getVariant(action);
  const cls = cn(
    "flex items-center justify-center w-7 h-7 rounded-full ring-1 shrink-0",
    VARIANT[v].bg, VARIANT[v].ring
  );
  const icon = () => {
    if (action === "create.sale" || action === "delete.sale")
      return <ShoppingCart className="w-3.5 h-3.5" />;
    if (v === "create") return <Plus className="w-3.5 h-3.5" />;
    if (v === "update") return <Pencil className="w-3 h-3" />;
    if (v === "delete") return <Trash2 className="w-3 h-3" />;
    return <Activity className="w-3.5 h-3.5" />;
  };
  return (
    <div className={cls}>
      <span className={cn(
        "flex items-center justify-center",
        v === "create" ? "text-emerald-400" :
        v === "update" ? "text-blue-400" :
        v === "delete" ? "text-destructive" : "text-muted-foreground"
      )}>
        {icon()}
      </span>
    </div>
  );
}

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins  = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days  = Math.floor(diff / 86_400_000);
  if (mins < 1)  return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return "yesterday";
  if (days < 7)  return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-AU", { day: "2-digit", month: "short" });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-AU", {
    hour: "2-digit", minute: "2-digit", hour12: true,
  });
}

function groupByDate(logs: AuditLog[]): { label: string; logs: AuditLog[] }[] {
  const groups: { label: string; logs: AuditLog[] }[] = [];
  let current: string | null = null;
  for (const log of logs) {
    const d = new Date(log.created_at);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const isSameDay = (a: Date, b: Date) =>
      a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

    let label: string;
    if (isSameDay(d, today))     label = "Today";
    else if (isSameDay(d, yesterday)) label = "Yesterday";
    else label = d.toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

    if (label !== current) {
      groups.push({ label, logs: [log] });
      current = label;
    } else {
      groups[groups.length - 1].logs.push(log);
    }
  }
  return groups;
}

// ─── Diff renderers ───────────────────────────────────────────────────────────

type PriceTier = { label: string; price: string };

function PricingTiersDiff({ oldTiers, newTiers }: { oldTiers: PriceTier[]; newTiers: PriceTier[] }) {
  const allLabels = [...new Set([...oldTiers.map(t => t.label), ...newTiers.map(t => t.label)])];
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {allLabels.map(label => {
        const o = oldTiers.find(t => t.label === label);
        const n = newTiers.find(t => t.label === label);
        const changed = o?.price !== n?.price;
        const added   = !o && !!n;
        const removed = !!o && !n;
        return (
          <span key={label} className={cn(
            "inline-flex items-center gap-1 text-[10px] rounded-md px-1.5 py-0.5 border",
            added   ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" :
            removed ? "bg-destructive/10 border-destructive/20 text-destructive/80" :
            changed ? "bg-blue-500/10 border-blue-500/20 text-blue-300" :
                      "bg-muted/40 border-border text-muted-foreground"
          )}>
            <span className="font-medium">{label}:</span>
            {removed ? <span className="line-through">{o!.price}</span>
            : added   ? <span>{n!.price}</span>
            : changed ? (
              <>
                <span className="line-through text-destructive/70">{o!.price}</span>
                <span className="text-emerald-400">{n!.price}</span>
              </>
            ) : <span>{n!.price}</span>}
          </span>
        );
      })}
    </div>
  );
}

function DiffBadge({ diff }: { diff: unknown }) {
  if (!diff || typeof diff !== "object") return null;
  const entries = Object.entries(diff as Record<string, { old: unknown; new: unknown }>);
  if (entries.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {entries.map(([field, change]) => {
        if (field === "pricing_tiers") {
          const o = Array.isArray(change.old) ? (change.old as PriceTier[]) : [];
          const n = Array.isArray(change.new) ? (change.new as PriceTier[]) : [];
          return (
            <div key={field} className="w-full">
              <span className="text-[10px] text-muted-foreground font-medium">Pricing tiers:</span>
              <PricingTiersDiff oldTiers={o} newTiers={n} />
            </div>
          );
        }
        if (field === "features") {
          const o = Array.isArray(change.old) ? (change.old as string[]).join(", ") : String(change.old ?? "");
          const n = Array.isArray(change.new) ? (change.new as string[]).join(", ") : String(change.new ?? "");
          return (
            <span key={field} className="inline-flex items-center gap-1 text-[10px] bg-muted/60 border border-border rounded-md px-1.5 py-0.5 max-w-full">
              <span className="text-muted-foreground font-medium">features:</span>
              <span className="text-destructive/80 line-through max-w-[100px] truncate">{o || "—"}</span>
              <span className="text-emerald-400 max-w-[100px] truncate">{n || "—"}</span>
            </span>
          );
        }
        return (
          <span key={field} className="inline-flex items-center gap-1 text-[10px] bg-muted/60 border border-border rounded-md px-1.5 py-0.5">
            <span className="text-muted-foreground font-medium">{field}:</span>
            {change.old !== undefined && (
              <span className="text-destructive/80 line-through max-w-[80px] truncate">{String(change.old)}</span>
            )}
            <span className="text-emerald-400 max-w-[80px] truncate">{String(change.new ?? "—")}</span>
          </span>
        );
      })}
    </div>
  );
}

function CreateServiceDetail({ newData }: { newData: unknown }) {
  if (!newData || typeof newData !== "object") return null;
  const d = newData as Record<string, unknown>;
  const tiers = Array.isArray(d.pricing_tiers) ? (d.pricing_tiers as PriceTier[]) : [];
  if (tiers.length === 0) return null;
  return (
    <div className="mt-2">
      <span className="text-[10px] text-muted-foreground font-medium">Initial pricing:</span>
      <div className="flex flex-wrap gap-1.5 mt-1">
        {tiers.map(t => (
          <span key={t.label} className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-md px-1.5 py-0.5">
            <span className="font-medium">{t.label}:</span> {t.price}
          </span>
        ))}
      </div>
    </div>
  );
}

function getLogDescription(log: AuditLog): string | null {
  if (log.description) return log.description;
  const nd  = log.new_data as Record<string, unknown> | null;
  const od  = log.old_data as Record<string, unknown> | null;
  const name = nd?.name ?? od?.name;
  const cat  = nd?.category ?? od?.category;

  if (log.action === "create.sale") {
    const cn  = nd?.customer_name ?? "customer";
    const sn  = nd?.service_name  ?? "service";
    const pq  = nd?.price_quoted;
    return `Sale for "${cn}" — ${sn}${pq ? ` ($${pq})` : ""}`;
  }
  if (log.action === "delete.sale") {
    const cn  = od?.customer_name ?? "customer";
    const sn  = od?.service_name  ?? "service";
    const pq  = od?.price_quoted;
    return `Deleted sale for "${cn}" — ${sn}${pq ? ` ($${pq})` : ""}`;
  }
  if (log.action === "create.service") return name ? `Created "${name}" (${cat ?? "service"})` : null;
  if (log.action === "delete.service") return name ? `Deleted "${name}" (${cat ?? "service"})` : null;
  if (log.action === "update.service" && log.diff && typeof log.diff === "object") {
    const d = log.diff as Record<string, { old: unknown; new: unknown }>;
    if (d.name)          return `Renamed "${d.name.old}" → "${d.name.new}"`;
    if (d.pricing_tiers) return `Updated pricing tiers for "${name}"`;
    if (d.is_published)  return (d.is_published.new as boolean) ? `Published "${name}"` : `Unpublished "${name}"`;
    if (d.features)      return `Updated features for "${name}"`;
    if (d.description)   return `Updated description for "${name}"`;
    return `Updated "${name}"`;
  }
  return null;
}

// ─── Log Row ──────────────────────────────────────────────────────────────────

function LogRow({ log, isLast }: { log: AuditLog; isLast: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const hasDiff   = log.diff && typeof log.diff === "object" && Object.keys(log.diff).length > 0;
  const isCreate  = log.action === "create.service";
  const canExpand = hasDiff || (isCreate && log.new_data);
  const description = getLogDescription(log);
  const v = getVariant(log.action);

  return (
    <div className="flex gap-3 px-4 py-3 group">
      {/* Timeline spine */}
      <div className="flex flex-col items-center">
        <ActionIcon action={log.action} />
        {!isLast && <div className="w-px flex-1 mt-1.5 bg-border/50" />}
      </div>

      {/* Content */}
      <div
        className={cn(
          "flex-1 min-w-0 pb-3",
          canExpand ? "cursor-pointer" : ""
        )}
        onClick={() => canExpand && setExpanded(v => !v)}
      >
        {/* Top row */}
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={cn(
              "inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full border",
              VARIANT[v].badge
            )}>
              {actionVerb(log.action)}
            </span>
            {log.resource_type && (
              <span className="text-[11px] text-muted-foreground capitalize">
                {log.resource_type}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground shrink-0">
            <span title={new Date(log.created_at).toLocaleString("en-AU")}>
              {relativeTime(log.created_at)}
            </span>
            <span>·</span>
            <span>{formatTime(log.created_at)}</span>
          </div>
        </div>

        {/* Description */}
        {description && (
          <p className="mt-1 text-[13px] text-foreground font-medium leading-snug">{description}</p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-2 flex-wrap mt-0.5">
          {log.resource_id && (
            <code className="text-[10px] text-muted-foreground/50 bg-muted/60 px-1.5 py-0.5 rounded font-mono truncate max-w-[140px]">
              {log.resource_id.slice(0, 8)}…
            </code>
          )}
          {log.actor_email && (
            <span className="text-[11px] text-muted-foreground">by {log.actor_email}</span>
          )}
        </div>

        {/* Expand hint */}
        {canExpand && !expanded && (
          <button className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground/50 hover:text-muted-foreground transition-colors">
            <ChevronDown className="w-3 h-3" />
            {hasDiff
              ? `${Object.keys(log.diff as object).length} field${Object.keys(log.diff as object).length !== 1 ? "s" : ""} changed`
              : "see pricing"}
          </button>
        )}

        {/* Expanded detail */}
        {expanded && hasDiff   && <DiffBadge diff={log.diff} />}
        {expanded && isCreate && !hasDiff && <CreateServiceDetail newData={log.new_data} />}
      </div>
    </div>
  );
}

// ─── Filters ──────────────────────────────────────────────────────────────────

type DatePreset = "all" | "today" | "week" | "month" | "custom";

interface Filters {
  preset: DatePreset;
  from: string;
  to: string;
  action: string;
  resourceType: string;
  search: string;
}

const DEFAULT_FILTERS: Filters = {
  preset: "all",
  from: "", to: "",
  action: "all", resourceType: "all",
  search: "",
};

function toDateString(d: Date): string {
  return d.toISOString().split("T")[0];
}

function applyPreset(preset: DatePreset): Partial<Filters> {
  const today = new Date();
  if (preset === "all")   return { preset, from: "", to: "" };
  if (preset === "today") return { preset, from: toDateString(today), to: toDateString(today) };
  if (preset === "week") {
    const from = new Date(today);
    from.setDate(today.getDate() - 6);
    return { preset, from: toDateString(from), to: toDateString(today) };
  }
  if (preset === "month") {
    const from = new Date(today);
    from.setDate(today.getDate() - 29);
    return { preset, from: toDateString(from), to: toDateString(today) };
  }
  return { preset }; // custom — keep existing dates
}

const PRESETS: { id: DatePreset; label: string }[] = [
  { id: "all",   label: "All time" },
  { id: "today", label: "Today" },
  { id: "week",  label: "Last 7 days" },
  { id: "month", label: "Last 30 days" },
  { id: "custom", label: "Custom" },
];

function FilterBar({
  filters, onChange, actions, resourceTypes, onReset, isLoading,
}: {
  filters: Filters;
  onChange: (f: Partial<Filters>) => void;
  actions: string[];
  resourceTypes: string[];
  onReset: () => void;
  isLoading: boolean;
}) {
  const hasActiveFilter =
    filters.preset !== "all" ||
    filters.action !== "all" ||
    filters.resourceType !== "all" ||
    filters.search;

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      {/* Preset row */}
      <div className="flex items-center gap-1 px-4 py-3 border-b border-border/50 flex-wrap">
        <CalendarDays className="w-3.5 h-3.5 text-muted-foreground mr-1 shrink-0" />
        {PRESETS.map(p => (
          <button
            key={p.id}
            onClick={() => onChange(applyPreset(p.id))}
            className={cn(
              "px-3 py-1 rounded-full text-[12px] font-medium transition-colors",
              filters.preset === p.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            {p.label}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin text-muted-foreground" />}
          {hasActiveFilter && (
            <button
              onClick={onReset}
              className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-lg hover:bg-muted"
            >
              <X className="w-3 h-3" /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Custom date range */}
      {filters.preset === "custom" && (
        <div className="flex items-center gap-3 px-4 py-2.5 border-b border-border/50 flex-wrap bg-muted/20">
          <span className="text-[11px] text-muted-foreground">From</span>
          <input
            type="date"
            value={filters.from}
            onChange={e => onChange({ from: e.target.value })}
            className="bg-background border border-border rounded-lg px-2 py-1 text-[12px] text-foreground focus:outline-none focus:border-primary/60 cursor-pointer"
          />
          <span className="text-[11px] text-muted-foreground">To</span>
          <input
            type="date"
            value={filters.to}
            onChange={e => onChange({ to: e.target.value })}
            className="bg-background border border-border rounded-lg px-2 py-1 text-[12px] text-foreground focus:outline-none focus:border-primary/60 cursor-pointer"
          />
        </div>
      )}

      {/* Secondary filters */}
      <div className="flex items-center gap-2 px-4 py-2.5 flex-wrap">
        {/* Action select */}
        <div className="relative">
          <select
            value={filters.action}
            onChange={e => onChange({ action: e.target.value })}
            className={cn(
              "appearance-none bg-muted/40 border border-border rounded-lg pl-2.5 pr-7 py-1.5 text-[12px] focus:outline-none focus:border-primary/60 cursor-pointer transition-colors",
              filters.action !== "all" ? "text-foreground border-primary/40" : "text-muted-foreground"
            )}
          >
            <option value="all">All actions</option>
            {actions.map(a => (
              <option key={a} value={a}>{actionVerb(a)}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
        </div>

        {/* Resource type select */}
        <div className="relative">
          <select
            value={filters.resourceType}
            onChange={e => onChange({ resourceType: e.target.value })}
            className={cn(
              "appearance-none bg-muted/40 border border-border rounded-lg pl-2.5 pr-7 py-1.5 text-[12px] focus:outline-none focus:border-primary/60 cursor-pointer transition-colors",
              filters.resourceType !== "all" ? "text-foreground border-primary/40" : "text-muted-foreground"
            )}
          >
            <option value="all">All types</option>
            {resourceTypes.map(r => (
              <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={filters.search}
            onChange={e => onChange({ search: e.target.value })}
            placeholder="Search by actor or ID…"
            className="bg-muted/40 border border-border rounded-lg pl-7 pr-7 py-1.5 text-[12px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 w-52 transition-colors"
          />
          {filters.search && (
            <button
              onClick={() => onChange({ search: "" })}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Tab ─────────────────────────────────────────────────────────────────

export function LogsTab() {
  const [page, setPage]       = useState(1);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  const updateFilter = useCallback((f: Partial<Filters>) => {
    setFilters(prev => ({ ...prev, ...f }));
    setPage(1);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  }, []);

  const logsQuery = useQuery({
    queryKey: ["audit-logs", page, filters],
    queryFn: () => listLogs({
      page,
      pageSize: PAGE_SIZE,
      from: filters.from ? `${filters.from}T00:00:00.000Z` : undefined,
      to:   filters.to   ? `${filters.to}T23:59:59.999Z`   : undefined,
      action:       filters.action       !== "all" ? filters.action       : undefined,
      resourceType: filters.resourceType !== "all" ? filters.resourceType : undefined,
    }),
    placeholderData: prev => prev,
  });

  const metaQuery = useQuery({
    queryKey: ["audit-logs-meta"],
    queryFn:  getLogDistinctValues,
    staleTime: 5 * 60 * 1000,
  });

  const logs      = logsQuery.data?.data ?? [];
  const total     = logsQuery.data?.total ?? 0;
  const actions   = metaQuery.data?.actions ?? [];
  const resTypes  = metaQuery.data?.resourceTypes ?? [];

  const visible = filters.search
    ? logs.filter(l =>
        l.actor_email?.toLowerCase().includes(filters.search.toLowerCase()) ||
        l.resource_id?.toLowerCase().includes(filters.search.toLowerCase())
      )
    : logs;

  const grouped = useMemo(() => groupByDate(visible), [visible]);

  const hasFilters = filters.preset !== "all" || filters.action !== "all" ||
                     filters.resourceType !== "all" || filters.search;

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground tracking-tight">Activity Logs</h2>
          <p className="mt-1 text-[14px] text-muted-foreground">
            Full audit trail of all changes. Click any entry to expand.
          </p>
        </div>
        <button
          onClick={() => logsQuery.refetch()}
          disabled={logsQuery.isFetching}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[13px] text-muted-foreground border border-border hover:text-foreground hover:bg-muted transition-colors disabled:opacity-50"
        >
          <RefreshCw className={cn("w-3.5 h-3.5", logsQuery.isFetching && "animate-spin")} />
          Refresh
        </button>
      </div>

      {/* Filter bar */}
      <FilterBar
        filters={filters}
        onChange={updateFilter}
        actions={actions}
        resourceTypes={resTypes}
        onReset={resetFilters}
        isLoading={logsQuery.isFetching}
      />

      {/* Stats strip */}
      <div className="flex items-center gap-3 text-[12px] text-muted-foreground px-0.5">
        <span>
          <span className="font-semibold text-foreground">{total}</span> total entr{total === 1 ? "y" : "ies"}
        </span>
        {filters.preset !== "all" && (
          <>
            <span className="text-border">·</span>
            <span>
              {filters.preset === "custom" && filters.from && filters.to
                ? `${new Date(filters.from).toLocaleDateString("en-AU", { day: "2-digit", month: "short" })} – ${new Date(filters.to).toLocaleDateString("en-AU", { day: "2-digit", month: "short", year: "numeric" })}`
                : PRESETS.find(p => p.id === filters.preset)?.label}
            </span>
          </>
        )}
      </div>

      {/* Log list */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        {logsQuery.isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
          </div>
        ) : logsQuery.isError ? (
          <div className="py-14 text-center">
            <p className="text-[14px] text-destructive font-medium">Failed to load logs</p>
            <p className="text-[12px] text-muted-foreground mt-1">Check your connection and try refreshing.</p>
          </div>
        ) : visible.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted/60 flex items-center justify-center">
              <Activity className="w-5 h-5 text-muted-foreground/50" />
            </div>
            <div>
              <p className="text-[14px] text-foreground font-medium">
                {hasFilters ? "No results match your filters" : "No activity yet"}
              </p>
              <p className="text-[12px] text-muted-foreground mt-0.5">
                {hasFilters ? "Try a wider date range or clear some filters." : "Actions like sales and edits will appear here."}
              </p>
            </div>
            {hasFilters && (
              <button
                onClick={resetFilters}
                className="text-[12px] text-primary hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <div className="pt-2 pb-1">
            {grouped.map((group, gi) => (
              <div key={group.label}>
                {/* Date group header */}
                <div className="flex items-center gap-3 px-4 py-2">
                  <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    {group.label}
                  </span>
                  <div className="flex-1 h-px bg-border/40" />
                  <span className="text-[10px] text-muted-foreground/50">
                    {group.logs.length} event{group.logs.length !== 1 ? "s" : ""}
                  </span>
                </div>

                {/* Rows */}
                {group.logs.map((log, li) => (
                  <LogRow
                    key={log.id}
                    log={log}
                    isLast={gi === grouped.length - 1 && li === group.logs.length - 1}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {!filters.search && (
        <DashPagination page={page} total={total} pageSize={PAGE_SIZE} onChange={setPage} />
      )}
    </div>
  );
}
