---
name: project-supabase-plan
description: Chris Auto Shine Detailing will use the shared Dannflow Supabase project with RLS isolation; setup is deferred
metadata:
  type: project
---

Chris Auto Shine Detailing will NOT have its own Supabase project. It will use the **shared Dannflow Supabase project** with RLS `app_id` isolation.

**Why:** User (Dann) manages multiple client sites under the Dannflow ecosystem. All share one Supabase org to reduce cost and overhead. Each app is isolated via `app_id = 'chris-auto-shine'` in RLS policies.

**How to apply:** When setting up Supabase features (contact form storage, admin dashboard, auth), always use the shared project credentials. Never create a standalone Supabase project for this client. Reference `docs/SUPABASE_PLAN.md` and `business.json` supabase section for the project ref once filled in.

**Status as of 2026-05-26:** Deferred — .env.local Supabase vars are empty, setup happens when client is ready.
