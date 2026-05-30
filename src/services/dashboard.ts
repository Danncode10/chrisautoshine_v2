"use server";

import { createClient } from '@/utils/supabase/server';

export async function getVibeCheckDataPaginated({ pageParam = 0 }: { pageParam?: number } = {}) {
  try {
    const limit = 5;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .range(pageParam * limit, (pageParam + 1) * limit - 1);

    if (error) {
      console.warn("Vibe Check Error. Check your tables:", error.message);
      return [];
    }

    return data || [];
  } catch (err) {
    return [];
  }
}

export async function getVibeCheckData() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .limit(3);

    if (error) {
      console.warn("Vibe Check Error. Check your tables:", error.message);
      return [];
    }

    return data || [];
  } catch (err) {
    return [];
  }
}

export async function getUserProfile() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    return { user, profile };
  } catch (err) {
    return null;
  }
}
