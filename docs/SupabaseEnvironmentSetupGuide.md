# DigitalDirectory-v2 Supabase Environment Setup Guide

## Purpose

This document defines the future environment setup guide for Supabase in DigitalDirectory-v2.

It is documentation-only. It does not add Supabase client code, Supabase packages, `.env` files, real keys, backend functionality, SQL, migrations, authentication, dashboards, protected routes, storage, Edge Functions, packages, or frontend UI changes.

The goal is to prepare safe local, deployment, and secret-handling practices before any real Supabase integration work begins.

---

## Core Principle

Supabase environment setup should happen before implementation, but secrets and real keys should never be committed to the repository.

DigitalDirectory-v2 should keep public healthcare discovery frontend-only until a dedicated Supabase implementation task is approved. When Supabase is added later, environment variables must be planned carefully so public browser-safe values and private server-only secrets are never confused.

---

## Supabase Environment Setup Purpose

The setup guide should help future developers understand:

- Which Supabase project values will be needed later.
- Which variables are safe to expose to the browser.
- Which variables must remain private.
- How local `.env.local` files should be used later.
- How deployment environment variables should be configured later.
- What must never be committed to git.
- How environment setup relates to Phase 1, auth, storage, and Edge Functions.

This guide is not an implementation step. It is a safety checklist for later implementation.

---

## Supabase Project Creation Checklist

When Supabase implementation is explicitly approved later, the project setup should follow a checklist.

Future project checklist:

1. Confirm the approved implementation scope.
2. Create a Supabase project for development or staging first.
3. Record the project reference outside git.
4. Confirm region selection and data residency expectations.
5. Confirm project URL.
6. Confirm anonymous public key.
7. Confirm service role key is private and server-only.
8. Confirm database password is stored securely.
9. Enable RLS planning before creating tables.
10. Define separate environments for local, preview, staging, and production.
11. Confirm who has access to Supabase dashboard.
12. Document key rotation procedures.
13. Document incident response if a key is leaked.

Do not create a Supabase project in this task.

---

## Local Environment Variable Planning

Future local development may need environment variables.

Potential local variables:

```text
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVER_ONLY_SERVICE_ROLE_KEY
SUPABASE_PROJECT_REF=YOUR_PROJECT_REF
SUPABASE_DB_PASSWORD=YOUR_DATABASE_PASSWORD
```

Rules:

- Use placeholder names in documentation only.
- Do not add real keys to docs.
- Do not create `.env.local` in this task.
- Do not create `.env.example` unless a future implementation task explicitly asks for it.
- Do not use service role keys in browser code.
- Do not load private keys into client components.
- Public `NEXT_PUBLIC_*` variables are visible to browser users.
- Private variables without `NEXT_PUBLIC_` must remain server-only.

Recommended initial implementation later:

- Start with only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` if the first integration is read-only public data.
- Add `SUPABASE_SERVICE_ROLE_KEY` only when there is a secure server-side workflow that truly requires it.

---

## `.env.local` Usage

Next.js uses `.env.local` for local-only environment variables.

Future `.env.local` guidance:

```text
# Public browser-safe values
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

# Private server-only values
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVER_ONLY_SERVICE_ROLE_KEY
SUPABASE_PROJECT_REF=YOUR_PROJECT_REF
SUPABASE_DB_PASSWORD=YOUR_DATABASE_PASSWORD
```

Rules:

- `.env.local` should exist only on a developer machine.
- `.env.local` must not be committed.
- `.env.local` must not contain production secrets for ordinary local development.
- Use staging or development Supabase values locally.
- Restart the local dev server after changing environment variables.
- Verify `.gitignore` excludes local environment files before adding real keys later.

Important:
This task does not create `.env.local`.

---

## What Must Never Be Committed

Never commit:

- Real Supabase URL tied to a private project, unless approved as public-safe.
- Real Supabase anon key, unless the team explicitly accepts it as public and RLS is ready.
- Supabase service role key.
- Database password.
- JWT secret.
- API keys for email, SMS, WhatsApp, Telegram, payments, maps, or AI services.
- Storage access keys.
- Webhook signing secrets.
- Production project references if policy treats them as sensitive.
- `.env.local`
- `.env.production`
- `.env`
- Local database dumps with real data.
- Patient data, provider private data, verification evidence, or audit logs.

If a secret is committed:

1. Treat it as compromised.
2. Rotate the secret in Supabase or the relevant provider.
3. Remove it from the repository history according to team policy.
4. Audit access and deployment logs.
5. Confirm no production data was exposed.

---

## Public Anon Key vs Service Role Key

Supabase has different key types with very different security meaning.

| Key | Intended Use | Browser Safe? | Notes |
| --- | --- | --- | --- |
| Public anon key | Client-side access with RLS | Yes, only with strict RLS | Can be visible, but policies must protect data |
| Service role key | Privileged server-side operations | No | Bypasses RLS and must never reach the browser |

### Public Anon Key

The public anon key may be used in browser code later, but only if RLS is enabled and tested.

Rules:

- Assume anyone can see it.
- Do not rely on the anon key for privacy.
- Rely on RLS policies and public-safe views.
- Use it only for approved public reads or narrowly controlled public inserts.

### Service Role Key

The service role key is powerful and dangerous.

Rules:

- Never expose it in client code.
- Never prefix it with `NEXT_PUBLIC_`.
- Never store it in frontend components.
- Use it only in secure server-side code or deployment secrets later.
- Keep usage narrow and auditable.
- Rotate it if there is any chance it was exposed.

---

## Development vs Production Environment Separation

DigitalDirectory-v2 should use separate environments as the backend matures.

Recommended environments:

| Environment | Purpose | Data Rules |
| --- | --- | --- |
| Local | Developer testing | Sample or staging data only |
| Preview | Branch/PR deployment testing | No production writes |
| Staging | Production-like testing | Reviewed test data |
| Production | Real public product | Strict policies and reviewed data |

Rules:

- Local and preview should not use production service role keys.
- Preview deployments should not write to production unless explicitly approved.
- Staging should validate migrations and RLS before production.
- Production should contain only reviewed public records and protected private records.
- Production secrets should be available only to trusted deployment environments.
- Seed/sample data should not become production verified claims without review.

---

## Vercel and Deployment Environment Variable Planning

If DigitalDirectory-v2 deploys through Vercel or a similar platform later, environment variables should be configured in the deployment provider.

Future deployment variable groups:

| Variable | Local | Preview | Production |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Dev project | Preview/staging project | Production project |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Dev anon key | Preview/staging anon key | Production anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Avoid unless needed | Avoid or tightly restrict | Server-only, restricted |
| `SUPABASE_PROJECT_REF` | Dev ref | Preview/staging ref | Production ref |

Deployment rules:

- Add variables through the deployment dashboard, not source code.
- Scope preview variables separately from production variables.
- Do not expose service role keys to browser builds.
- Confirm build logs do not print secrets.
- Rotate deployment secrets when team access changes.
- Review environment variable access permissions.
- Document which deployments point to which Supabase project.

No deployment configuration is changed in this task.

---

## GitHub Safety Rules

GitHub safety rules should prevent accidental secret exposure.

Rules:

- Do not commit real environment files.
- Do not paste real keys into issues, PRs, comments, docs, screenshots, or logs.
- Do not include real keys in commit messages.
- Do not add database dumps with private data.
- Do not add generated migration output containing secrets.
- Do not publish Supabase dashboard screenshots that show secrets.
- Do not store service role keys in GitHub Actions variables unless a future CI workflow truly requires them.
- Prefer GitHub environment secrets for CI-only secret needs later.
- Review diffs before committing environment-related changes.

Future optional protections:

- Enable GitHub secret scanning if available.
- Add repository rules that block committing `.env` files.
- Use `.env.example` with placeholders only if approved in a future task.
- Add CI checks for accidental secret patterns later.

---

## Local Developer Checklist

Future local developer checklist:

1. Pull the latest branch.
2. Read the Supabase Phase 1 plan.
3. Confirm Supabase implementation has been approved.
4. Confirm `.gitignore` excludes `.env.local`.
5. Create `.env.local` manually on your machine only when instructed.
6. Paste only development or staging values.
7. Never paste service role keys into browser-visible variables.
8. Restart the local server.
9. Verify the app does not log secrets.
10. Verify public pages show only public-safe data.
11. Verify request submissions do not expose private data.
12. Remove local secrets when no longer needed.

This checklist is for future implementation work, not for this task.

---

## Security Checklist Before Integration

Before adding Supabase code later, confirm:

- Phase 1 scope is approved.
- Public vs private data fields are defined.
- RLS policy direction is written before migrations.
- Public read access is limited to published public-safe records.
- Request and review tables are private.
- Audit log requirements are defined.
- Service role usage is minimized.
- No patient data is in public tables.
- No document vault data is being stored.
- No booking, payment, wallet, transport, chatbot, or community tables are included in Phase 1 unless explicitly approved.
- Secrets are stored outside git.
- Deployment variables are separated by environment.
- Rollback and key rotation procedures are known.

Security rule:
If RLS is not ready, Supabase is not ready for production public access.

---

## Relationship to Supabase Phase 1

This guide supports `SupabaseIntegrationPhase1.md`.

Relationship:

- Phase 1 defines what the first backend scope should include.
- This guide defines how environment setup and secrets should be handled before that scope is implemented.
- Phase 1 keeps the backend narrow and public-safe.
- This guide keeps credentials and deployment setup safe.

Phase 1 should not proceed until:

- Environment variable names are agreed.
- Public/private key handling is understood.
- `.env.local` usage is documented.
- Deployment secret handling is planned.
- RLS and public/private boundaries are planned.

---

## Relationship to Auth, Storage, and Edge Functions

### Auth

Authentication should come later when real account actions require it.

Environment implications:

- Auth callback URLs may need planning later.
- Auth provider secrets should be server-side.
- Patient and provider roles should follow the role strategy.
- Do not add auth variables before auth scope is approved.

### Storage

Supabase Storage should come later.

Environment implications:

- Storage uses the same Supabase project but needs separate bucket policies.
- Do not add storage buckets for patient documents, verification evidence, or support attachments now.
- Do not add storage-related secrets or upload flows in Phase 1.

### Edge Functions

Edge Functions should come later when secure server-side workflows are needed.

Environment implications:

- Edge Function secrets should be configured in Supabase or deployment tooling, not frontend code.
- Functions may need service role access, which must be narrow and audited.
- Do not add function secrets, scheduled jobs, webhooks, or serverless handlers now.

---

## MVP Recommendation

Do not add Supabase environment files or keys in the current MVP documentation task.

Recommended current stance:

- Keep the app frontend-only.
- Keep static seed data active.
- Do not add Supabase packages.
- Do not add Supabase client code.
- Do not create `.env.local`.
- Do not create `.env.example`.
- Do not add real keys to docs.
- Do not add backend routes.
- Do not add SQL or migrations.
- Do not add auth, storage, or Edge Functions.

Recommended first future step:
When backend implementation is approved, create a development Supabase project, define placeholder-based environment docs, then add client/package setup in a dedicated code task.

---

## Risks

Key risks:

- Committing real secrets.
- Exposing the service role key to browser code.
- Assuming the anon key protects data without RLS.
- Using production credentials in local or preview environments.
- Logging secrets in build output or browser console.
- Mixing development, staging, and production projects.
- Adding auth or storage environment variables before those features are ready.
- Sharing keys in GitHub issues, comments, screenshots, or chat.
- Connecting preview deployments to production writable data.
- Treating sample seed records as real verified production data.

Mitigations:

- Use placeholders in docs.
- Keep `.env.local` out of git.
- Separate environments.
- Enable and test RLS before public access.
- Keep service role keys server-only.
- Rotate leaked keys immediately.
- Review diffs before committing.
- Add secrets only in deployment provider settings.
- Add backend integration in small approved phases.

---

## Recommended Next Development Order

1. Keep DigitalDirectory-v2 frontend-only until Supabase implementation is approved.
2. Review `SupabaseIntegrationPhase1.md`.
3. Confirm the first public table group and request table group.
4. Define exact environment variable names.
5. Confirm `.gitignore` protects local environment files.
6. Create a development Supabase project in a future setup task.
7. Add local `.env.local` manually with development placeholders replaced by real development values.
8. Add deployment variables through the deployment provider, not source code.
9. Add Supabase package and client code in a dedicated implementation task.
10. Add migrations and RLS in a dedicated database task.
11. Test public read policies before connecting UI.
12. Add request intake only after validation and abuse controls are planned.
13. Add auth only when admin/reviewer or provider workflows require it.
14. Add storage and Edge Functions only in later dedicated phases.

---

## Summary

Supabase environment setup should be planned before any real backend integration.

This guide defines placeholder-only environment variable planning, `.env.local` usage, secret handling rules, anon key vs service role key boundaries, development/production separation, deployment variable planning, GitHub safety, developer checklists, and security checks.

The recommended current action is documentation only. No Supabase code, packages, real keys, `.env` files, backend functionality, SQL, migrations, auth, storage, Edge Functions, dashboards, protected routes, or frontend UI changes should be added in this task.
