"use server";

import { createAdminClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

const APP_ID = process.env.NEXT_PUBLIC_APP_ID ?? "chris-auto-shine";

function periodStart(period: "today" | "week" | "month"): string {
  const d = new Date();
  if (period === "today") { d.setHours(0, 0, 0, 0); return d.toISOString(); }
  if (period === "week")  { d.setDate(d.getDate() - 7); d.setHours(0, 0, 0, 0); return d.toISOString(); }
  d.setDate(d.getDate() - 30); d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

// ── Stats ─────────────────────────────────────────────────────────────────────

export interface SalesStats {
  revenue: number;
  count: number;
  avgSale: number;
  topService: string | null;
  dailyRevenue: { date: string; revenue: number; count: number }[];
}

export async function getSalesStats(period: "today" | "week" | "month"): Promise<SalesStats> {
  const supabase = await createAdminClient();
  const since = periodStart(period);

  const { data } = await supabase
    .from("bookings")
    .select("service_name, price_quoted, created_at, status")
    .eq("app_id", APP_ID)
    .eq("source", "direct")
    .gte("created_at", since)
    .order("created_at", { ascending: true });

  const rows = data ?? [];
  const revenue = rows.reduce((s, r) => s + (Number(r.price_quoted) || 0), 0);
  const count   = rows.length;
  const avgSale = count ? Math.round(revenue / count) : 0;

  // Most popular service
  const svcMap = new Map<string, number>();
  for (const r of rows) {
    if (r.service_name) svcMap.set(r.service_name, (svcMap.get(r.service_name) ?? 0) + 1);
  }
  const topService = svcMap.size
    ? [...svcMap.entries()].sort((a, b) => b[1] - a[1])[0][0]
    : null;

  // Daily grouping
  const days = period === "today" ? 1 : period === "week" ? 7 : 30;
  const dailyRevenue = Array.from({ length: days }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (days - 1 - i));
    const day = d.toISOString().split("T")[0];
    const dayRows = rows.filter(r => r.created_at.startsWith(day));
    return { date: day, revenue: dayRows.reduce((s, r) => s + (Number(r.price_quoted) || 0), 0), count: dayRows.length };
  });

  return { revenue, count, avgSale, topService, dailyRevenue };
}

// ── Popular services ──────────────────────────────────────────────────────────

export interface ServicePopularity {
  service_name: string;
  count: number;
  revenue: number;
}

export async function getServicePopularity(period: "today" | "week" | "month"): Promise<ServicePopularity[]> {
  const supabase = await createAdminClient();
  const since = periodStart(period);

  const { data } = await supabase
    .from("bookings")
    .select("service_name, price_quoted")
    .eq("app_id", APP_ID)
    .eq("source", "direct")
    .gte("created_at", since);

  const rows = data ?? [];
  const map = new Map<string, { count: number; revenue: number }>();
  for (const r of rows) {
    const key = r.service_name || "Unknown";
    const existing = map.get(key);
    const rev = Number(r.price_quoted) || 0;
    if (existing) { existing.count++; existing.revenue += rev; }
    else map.set(key, { count: 1, revenue: rev });
  }

  return [...map.entries()]
    .map(([service_name, v]) => ({ service_name, ...v }))
    .sort((a, b) => b.count - a.count);
}

// ── List sales ────────────────────────────────────────────────────────────────

export interface Sale {
  id: string;
  customer_name: string;
  customer_phone: string | null;
  customer_email: string;
  service_name: string;
  vehicle_type: string | null;
  vehicle_make: string | null;
  vehicle_model: string | null;
  price_quoted: number | null;
  payment_status: string;
  confirmed_date: string | null;
  confirmed_time: string | null;
  notes: string | null;
  created_at: string;
}

export interface SaleFilters {
  page: number;
  pageSize: number;
  search?: string;
  from?: string;
  to?: string;
}

export async function listSales(filters: SaleFilters): Promise<{ data: Sale[]; total: number }> {
  const supabase = await createAdminClient();
  const { page, pageSize, search, from, to } = filters;
  const offset = (page - 1) * pageSize;

  let q = supabase
    .from("bookings")
    .select("id, customer_name, customer_phone, customer_email, service_name, vehicle_type, vehicle_make, vehicle_model, price_quoted, payment_status, confirmed_date, confirmed_time, notes, created_at", { count: "exact" })
    .eq("app_id", APP_ID)
    .eq("source", "direct")
    .order("created_at", { ascending: false })
    .range(offset, offset + pageSize - 1);

  if (search) q = q.or(`customer_name.ilike.%${search}%,service_name.ilike.%${search}%`);
  if (from)   q = q.gte("created_at", from);
  if (to)     q = q.lte("created_at", `${to}T23:59:59.999Z`);

  const { data, count } = await q;
  return { data: (data ?? []) as Sale[], total: count ?? 0 };
}

// ── Create sale ───────────────────────────────────────────────────────────────

export interface CreateSaleInput {
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  service_id?: string;
  service_name: string;
  vehicle_type?: string;
  vehicle_make?: string;
  vehicle_model?: string;
  price_quoted: number;
  payment_status: "paid" | "unpaid";
  confirmed_date: string;
  confirmed_time: string;
  notes?: string;
}

export async function createSale(input: CreateSaleInput): Promise<void> {
  const supabase = await createAdminClient();

  // Derive org_id from existing services
  const { data: svc } = await supabase
    .from("services")
    .select("organization_id")
    .eq("app_id", APP_ID)
    .limit(1)
    .single();

  if (!svc) throw new Error("Organization not found");

  const { error } = await supabase.from("bookings").insert({
    app_id: APP_ID,
    organization_id: svc.organization_id,
    customer_name: input.customer_name,
    customer_email: input.customer_email || "",
    customer_phone: input.customer_phone ?? null,
    service_id: input.service_id ?? null,
    service_name: input.service_name,
    vehicle_type: input.vehicle_type ?? null,
    vehicle_make: input.vehicle_make ?? null,
    vehicle_model: input.vehicle_model ?? null,
    price_quoted: input.price_quoted,
    price_paid: input.payment_status === "paid" ? input.price_quoted : null,
    payment_status: input.payment_status,
    status: "completed",
    source: "direct",
    confirmed_date: input.confirmed_date,
    confirmed_time: input.confirmed_time,
    notes: input.notes ?? null,
  });

  if (error) throw error;
  revalidatePath("/dashboard");
}

export async function deleteSale(id: string): Promise<void> {
  const supabase = await createAdminClient();
  const { error } = await supabase.from("bookings").delete().eq("id", id).eq("app_id", APP_ID).eq("source", "direct");
  if (error) throw error;
  revalidatePath("/dashboard");
}
