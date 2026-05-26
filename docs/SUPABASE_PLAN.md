# Supabase Plan — Chris Auto Shine

## Overview

Chris Auto Shine will use the **shared Dannflow Supabase project** rather than spinning up a separate project. This is the same model as other client sites in the Dannflow ecosystem — all client apps share one Supabase organization with RLS (Row Level Security) providing data isolation per `app_id`.

## Setup (When Ready)

1. **Get credentials from the shared project:**
   - Go to the Dannflow Supabase dashboard
   - Copy the project's `SUPABASE_URL` and `SUPABASE_ANON_KEY`
   - Update `.env.local`:
     ```
     NEXT_PUBLIC_SUPABASE_URL=<shared-project-url>
     NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
     NEXT_PUBLIC_APP_ID=chris-auto-shine
     ```

2. **Update `business.json`:**
   ```json
   "supabase": {
     "organizationSlug": "<dann-digital-org>",
     "projectRef": "<shared-project-ref>"
   }
   ```

## What We Plan to Use Supabase For

| Feature | Status |
|---|---|
| Contact form submissions (store leads) | Planned |
| Admin dashboard (view/manage bookings) | Planned |
| Auth (admin login only) | Planned |
| Testimonials management | Optional |

## RLS Isolation

All tables will include an `app_id` column. Policies will enforce:

```sql
CREATE POLICY "Isolate by app_id"
ON table_name
USING (app_id = current_setting('app.app_id'));
```

The `NEXT_PUBLIC_APP_ID=chris-auto-shine` env var is passed via the `x-app-id` header (see `next.config.ts`) and used to scope all database queries.

## Reference

- See `business.json` → `supabase` section for project refs
- See `next.config.ts` for the `x-app-id` header injection
- See [business-template upstream](https://github.com/Danncode10/business-template) for the full multi-tenant Supabase architecture
