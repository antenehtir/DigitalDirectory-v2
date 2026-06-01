# DigitalDirectory-v2 Supabase Local Env Manual Setup QA

## Purpose

This document records the confirmed manual QA result for local Supabase environment variable setup.

This is a documentation-only QA record. It does not modify `.env.local`, add real keys, add Supabase reads, change source wrapper code, change mapper code, change frontend UI, add authentication, add backend functionality, or add protected routes.

## QA Purpose

The QA purpose is to confirm that local Supabase public environment variables were added safely for future public listing read testing while keeping secrets out of the repository.

This QA record confirms:

- `.env.local` was created locally.
- Only browser-safe public Supabase variables were added locally.
- The service-role key was not added.
- `.env.local` is ignored by Git.
- The app still builds.
- No Supabase reads are active yet.
- Static source data remains the active app behavior.

## Local Env Setup Summary

Confirmed manual result:

- `.env.local` was created locally.
- The local file contains the public Supabase test project values needed later by the browser helper.
- The real Supabase project URL and anon key are not recorded in this document.
- The local setup is for future public listing read testing only.

This document intentionally uses variable names only.

## Variables Added By Name Only

The following variables were confirmed as added locally:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

The following variable was confirmed as not added:

```text
SUPABASE_SERVICE_ROLE_KEY
```

No real values are included in this QA record.

## Secret Safety Confirmation

Confirmed safety result:

- No real Supabase URL is pasted into this document.
- No real Supabase anon or publishable key is pasted into this document.
- No service-role key was added locally.
- No service-role key is documented here.
- No database password, connection string, or private key is documented here.
- No Supabase reads, writes, authentication, backend logic, or protected routes were added.

The existing browser helper boundary remains correct for this phase because it uses only:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Git Ignore Confirmation

Confirmed manual result:

- `.gitignore` includes `.env*`.
- `.env.local` was confirmed ignored by Git.
- No secrets were staged or committed.

This QA record does not include real key values and does not require committing `.env.local`.

## Build Verification Result

Confirmed manual build result:

- `npm.cmd run build` passed.
- The build detected `.env.local`.
- The build used Next.js `16.2.6`.
- The build generated `22` static routes.

No build was run as part of creating this documentation-only QA record.

## Current App Behavior

Current behavior remains unchanged:

- No Supabase reads are active yet.
- Static source data remains the default public listing source.
- `src/lib/public-listing-source.ts` still reports static seed data as active.
- Public pages are not connected to Supabase yet.
- The Supabase browser client helper is available for future use but does not change current listing behavior by itself.

## Remaining Limitations

This QA pass does not prove live Supabase public reads.

Remaining limitations:

- Facilities data is not yet read from Supabase by the app.
- The source wrapper has not been switched to a Supabase-backed read path.
- Static fallback behavior has not yet been tested against a live read switch.
- RLS behavior has not yet been verified through the app browser client.
- Only the local env setup and build result are confirmed here.
- No doctor, pharmacy, diagnostics, services, specialties, locations, or contact channel reads are active.
- No authentication, provider ownership, admin review, or protected route behavior exists.

## Recommended Next Development Order

1. Keep `.env.local` local and ignored by Git.
2. Do not paste real Supabase values into documentation, chat, screenshots, or commits.
3. Keep static data as the active source until a reviewed read task changes it.
4. Plan the first facilities public read implementation against the confirmed test project data.
5. Preserve static fallback behavior during the first read implementation.
6. Verify app-level anon reads return only active/public facilities.
7. Confirm blocked rows do not appear through the anon browser path.
8. Run lint and build after any future code changes.
9. Document the app-read QA result before expanding to additional public listing tables.
