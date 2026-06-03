"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import type { TablesUpdate } from "@/types/supabase";

const APP_ID = process.env.NEXT_PUBLIC_APP_ID ?? "chris-auto-shine";

export async function listBookings(statusFilter?: string, page = 1, pageSize = 10) {
  const supabase = await createClient();
  const offset = (page - 1) * pageSize;

  let q = supabase
    .from("bookings")
    .select("*", { count: "exact" })
    .eq("app_id", APP_ID)
    .neq("source", "direct")          // direct = sales; keep bookings separate
    .order("created_at", { ascending: false })
    .range(offset, offset + pageSize - 1);

  if (statusFilter && statusFilter !== "all") q = q.eq("status", statusFilter);

  const { data, error, count } = await q;
  if (error) throw error;
  return { data: data ?? [], total: count ?? 0 };
}

export async function updateBooking(id: string, updates: TablesUpdate<"bookings">) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("bookings")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("app_id", APP_ID)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  revalidatePath("/dashboard");
  return data;
}

export async function deleteBooking(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("app_id", APP_ID)
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/dashboard");
}
