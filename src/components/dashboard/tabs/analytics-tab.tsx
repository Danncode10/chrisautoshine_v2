"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader2, TrendingUp, DollarSign, ShoppingBag, Users, BarChart2 } from "lucide-react";
import { getEventCountsByDay, getTopPages, getEventTypeBreakdown } from "@/services/analytics";
import { getSalesStats } from "@/services/sales";
import { cn } from "@/lib/utils";
import { RevenueTrendChart } from "@/components/dashboard/revenue-trend-chart";

function BizKpiCard({ label, value, sub, icon: Icon, accent }: {
  label: string; value: string; sub: string; icon: React.ElementType; accent: string;
}) {
  return (
    <div className="bg-card border border-border rounded-2xl px-5 py-5 flex items-center gap-4">
      <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", accent)}>
        <Icon className="h-5 w-5" strokeWidth={1.5} />
      </div>
      <div>
        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-[0.12em]">{label}</p>
        <p className="text-xl font-bold text-foreground tabular-nums mt-0.5">{value}</p>
        <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>
      </div>
    </div>
  );
}

export function AnalyticsTab() {
  const { data: salesMonth } = useQuery({
    queryKey: ["sales-stats", "month"],
    queryFn: () => getSalesStats("month"),
    staleTime: 60_000,
  });
  const { data: salesWeek } = useQuery({
    queryKey: ["sales-stats", "week"],
    queryFn: () => getSalesStats("week"),
    staleTime: 60_000,
  });

  const { data: byDay, isLoading: loadingDay } = useQuery({
    queryKey: ["analytics-by-day"],
    queryFn: () => getEventCountsByDay(14),
    staleTime: 60_000,
  });

  const { data: topPages, isLoading: loadingPages } = useQuery({
    queryKey: ["analytics-top-pages"],
    queryFn: () => getTopPages(8, 14),
    staleTime: 60_000,
  });

  const { data: byType, isLoading: loadingType } = useQuery({
    queryKey: ["analytics-by-type"],
    queryFn: () => getEventTypeBreakdown(14),
    staleTime: 60_000,
  });

  const maxDayCount = Math.max(1, ...(byDay ?? []).map((d) => d.count));
  const total14d = (byDay ?? []).reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground tracking-tight">Analytics</h2>
        <p className="mt-1 text-[14px] text-muted-foreground">
          Business performance and site traffic in one place.
        </p>
      </div>

      {/* Business Performance */}
      <div>
        <h3 className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">Business Performance</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <BizKpiCard
            label="Revenue — This Month"
            value={salesMonth ? `$${salesMonth.revenue.toLocaleString()}` : "—"}
            sub={`${salesMonth?.count ?? 0} sale${salesMonth?.count !== 1 ? "s" : ""}`}
            icon={DollarSign}
            accent="bg-emerald-500/10 text-emerald-400"
          />
          <BizKpiCard
            label="Revenue — This Week"
            value={salesWeek ? `$${salesWeek.revenue.toLocaleString()}` : "—"}
            sub={`${salesWeek?.count ?? 0} sale${salesWeek?.count !== 1 ? "s" : ""}`}
            icon={ShoppingBag}
            accent="bg-blue-500/10 text-blue-400"
          />
          <BizKpiCard
            label="Avg Sale — This Month"
            value={salesMonth ? `$${salesMonth.avgSale.toLocaleString()}` : "—"}
            sub="per completed job"
            icon={TrendingUp}
            accent="bg-violet-500/10 text-violet-400"
          />
          <BizKpiCard
            label="Top Service"
            value={salesMonth?.topService ?? "—"}
            sub="this month by count"
            icon={BarChart2}
            accent="bg-amber-500/10 text-amber-400"
          />
        </div>
      </div>

      {/* Revenue trend — This Month */}
      {salesMonth && (
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="text-[13px] font-semibold text-foreground mb-4">Revenue Trend — This Month</h3>
          {salesMonth.dailyRevenue.some(d => d.revenue > 0) ? (
            <>
              <RevenueTrendChart points={salesMonth.dailyRevenue} period="month" />
              <p className="text-[10px] text-muted-foreground mt-2 text-right">
                {salesMonth.dailyRevenue.filter(p => p.revenue > 0).length} active days this month
              </p>
            </>
          ) : (
            <div className="h-[220px] flex items-center justify-center text-[13px] text-muted-foreground">
              No revenue data for this month
            </div>
          )}
        </div>
      )}

      {/* Web Analytics */}
      <div>
        <h3 className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">Web Analytics — Last 14 Days</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-2xl px-5 py-5">
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-[0.15em]">Total Events</p>
            <p className="text-3xl font-bold text-foreground tabular-nums mt-3">{total14d}</p>
            <p className="mt-1 text-[11px] text-muted-foreground">across all event types</p>
          </div>
          <div className="bg-card border border-border rounded-2xl px-5 py-5">
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-[0.15em]">Page Views</p>
            <p className="text-3xl font-bold text-foreground tabular-nums mt-3">
              {(byType ?? []).find((t) => t.type === "page_view")?.count ?? 0}
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">14 day total</p>
          </div>
          <div className="bg-card border border-border rounded-2xl px-5 py-5">
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-[0.15em]">CTA Clicks</p>
            <p className="text-3xl font-bold text-foreground tabular-nums mt-3">
              {(byType ?? []).find((t) => t.type === "cta_click")?.count ?? 0}
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">14 day total</p>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          <h3 className="text-[13px] font-semibold text-foreground">Events per day</h3>
        </div>
        <div className="p-5">
          {loadingDay ? (
            <Loader2 className="w-5 h-5 animate-spin inline" />
          ) : (byDay ?? []).length === 0 ? (
            <p className="text-[13px] text-muted-foreground text-center py-8">
              No events yet. Add the tracker to your pages to start collecting data.
            </p>
          ) : (
            <div className="flex items-end gap-1.5 h-40">
              {(byDay ?? []).map((d) => (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1 group">
                  <div className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                    {d.count}
                  </div>
                  <div
                    className="w-full bg-primary/70 hover:bg-primary rounded-t transition-colors"
                    style={{ height: `${(d.count / maxDayCount) * 100}%`, minHeight: 2 }}
                    title={`${d.day}: ${d.count}`}
                  />
                  <div className="text-[9px] text-muted-foreground -rotate-45 origin-top-left whitespace-nowrap">
                    {d.day.slice(5)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="text-[13px] font-semibold text-foreground">Top pages</h3>
          </div>
          <div className="divide-y divide-border">
            {loadingPages ? (
              <div className="p-5"><Loader2 className="w-5 h-5 animate-spin inline" /></div>
            ) : (topPages ?? []).length === 0 ? (
              <div className="p-5 text-[13px] text-muted-foreground">No page views recorded yet.</div>
            ) : (
              (topPages ?? []).map((p) => (
                <div key={p.path} className="px-5 py-3 flex items-center justify-between text-[13px]">
                  <code className="text-muted-foreground">{p.path}</code>
                  <span className="font-medium tabular-nums">{p.count}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="text-[13px] font-semibold text-foreground">Event types</h3>
          </div>
          <div className="divide-y divide-border">
            {loadingType ? (
              <div className="p-5"><Loader2 className="w-5 h-5 animate-spin inline" /></div>
            ) : (byType ?? []).length === 0 ? (
              <div className="p-5 text-[13px] text-muted-foreground">No events tracked yet.</div>
            ) : (
              (byType ?? []).map((t) => (
                <div key={t.type} className="px-5 py-3 flex items-center justify-between text-[13px]">
                  <span className="text-foreground">{t.type}</span>
                  <span className="font-medium tabular-nums">{t.count}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
