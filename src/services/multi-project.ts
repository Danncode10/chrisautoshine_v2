/**
 * Multi-Project Service
 * Two-layer isolation: app_id (project namespace) + organization_id (client tenant)
 * All queries MUST include both filters.
 */

import { createClient } from '@/utils/supabase/client';

const getAppId = (): string => {
  if (!process.env.NEXT_PUBLIC_APP_ID) {
    throw new Error('NEXT_PUBLIC_APP_ID env var is required');
  }
  return process.env.NEXT_PUBLIC_APP_ID;
};

export async function createOrganization(
  name: string,
  slug: string,
  options?: { logo_url?: string; website?: string }
) {
  const client = createClient();

  const { data, error } = await client
    .from('organizations')
    .insert({
      app_id: getAppId(),
      name,
      slug,
      logo_url: options?.logo_url,
      website: options?.website,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getOrganizationBySlug(slug: string) {
  const client = createClient();

  const { data, error } = await client
    .from('organizations')
    .select('*')
    .eq('app_id', getAppId())
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data;
}

export async function getOrganizationById(id: string) {
  const client = createClient();

  const { data, error } = await client
    .from('organizations')
    .select('*')
    .eq('app_id', getAppId())
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function listOrganizations() {
  const client = createClient();

  const { data, error } = await client
    .from('organizations')
    .select('*')
    .eq('app_id', getAppId())
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function updateOrganization(
  id: string,
  updates: { name?: string; logo_url?: string; website?: string }
) {
  const client = createClient();

  const { data, error } = await client
    .from('organizations')
    .update(updates)
    .eq('app_id', getAppId())
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteOrganization(id: string) {
  const client = createClient();

  const { error } = await client
    .from('organizations')
    .delete()
    .eq('app_id', getAppId())
    .eq('id', id);

  if (error) throw error;
}
