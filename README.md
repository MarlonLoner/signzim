# Sign Zim

Sign Zim is a Zimbabwe-focused marketplace for signage, branding, interior deco and fitting providers. Customers can browse providers, compare services and portfolios, and request project quotes. Admin can review listings, manage trust badges, and route quote leads.

## Setup

Install dependencies:

```powershell
npm install
```

Copy the example environment file:

```powershell
Copy-Item .env.example .env
```

Configure `.env`:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/sign_zim?schema=public"
NEXT_PUBLIC_APP_URL="http://127.0.0.1:3000"
NEXT_PUBLIC_SIGN_ZIM_ADMIN_WHATSAPP="+263..."
SIGN_ZIM_ADMIN_KEY="change-this-admin-key"
```

If database auth fails, check username, password, port, database name, and whether Postgres is running.

## Fixing Database Authentication Errors

If `/api/health` returns `503` with database status `error`, or Prisma reports authentication failure, check these items first:

- Confirm the username in `DATABASE_URL` exists in Postgres.
- Confirm the password is correct for that user.
- Confirm the database name exists.
- Confirm the port is correct, usually `5432` for local Postgres.
- Confirm the Postgres service is running.
- Confirm the target database has been created.
- URL-encode special characters in passwords, such as `@`, `#`, `?`, `/`, `:`, and spaces.
- Do not mix local and hosted connection strings. Local Postgres usually points to `localhost`; hosted Postgres usually points to a provider host and often requires SSL.

Local Postgres example:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/sign_zim?schema=public"
```

Neon/Supabase-style hosted Postgres example:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require"
```

For local Postgres, create the database manually before running Prisma commands:

```powershell
createdb sign_zim
```

Or through `psql`:

```sql
CREATE DATABASE sign_zim;
```

Do not automate database creation or reset commands against production data.

Generate Prisma Client:

```powershell
npm.cmd --cache .\.npm-cache run db:generate
```

Push the schema to the configured database:

```powershell
npm.cmd --cache .\.npm-cache run db:push
```

Load or refresh demo data:

```powershell
npm.cmd --cache .\.npm-cache run db:seed
```

Run the local app:

```powershell
npm.cmd --cache .\.npm-cache run dev
```

Run verification:

```powershell
npm.cmd --cache .\.npm-cache run lint
npm.cmd --cache .\.npm-cache run build
```

## Environment

Required variables:

- `DATABASE_URL`: Postgres connection string.
- `NEXT_PUBLIC_APP_URL`: public base URL used for sitemap, robots, canonical URLs, and social share metadata.
- `NEXT_PUBLIC_SIGN_ZIM_ADMIN_WHATSAPP`: Sign Zim admin WhatsApp number for post-submit follow-up CTAs.
- `SIGN_ZIM_ADMIN_KEY`
- `BLOB_READ_WRITE_TOKEN`: private admin gate key.
- `BLOB_READ_WRITE_TOKEN`: Vercel Blob read/write token used for provider logo and proof image uploads.

Do not expose `DATABASE_URL`, `SIGN_ZIM_ADMIN_KEY`, or `BLOB_READ_WRITE_TOKEN` in client code, screenshots, logs, or public docs.

## Health Check

The app exposes a minimal health endpoint:

```text
/api/health
```

It returns app name, environment, timestamp, `ok`, and database status as `connected` or `error`. It does not return secrets or connection strings.

## Vercel Deployment Checklist

Required Vercel environment variables:

- `DATABASE_URL`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_SIGN_ZIM_ADMIN_WHATSAPP`
- `SIGN_ZIM_ADMIN_KEY`
- `BLOB_READ_WRITE_TOKEN`

Deployment steps:

1. Create a hosted Postgres database.
2. Add `DATABASE_URL` to Vercel environment variables.
3. Deploy once, then set `NEXT_PUBLIC_APP_URL` to the deployed app URL.
4. Add `NEXT_PUBLIC_SIGN_ZIM_ADMIN_WHATSAPP`.
5. Add a strong `SIGN_ZIM_ADMIN_KEY`.
6. Add `BLOB_READ_WRITE_TOKEN` from Vercel Blob storage.
7. Run `prisma generate` or `npm.cmd --cache .\.npm-cache run db:generate`.
8. Run `prisma db push` against the production database carefully.
9. Run seed only if demo data is desired.
10. Test logo upload and required proof uploads.
11. Test provider signup, admin review, approval, public logo and portfolio display.
12. Test `/terms`, `/privacy`, `/api/health`, `/admin`, `/request-quote`, `/list-your-company`, `/sitemap.xml`, and `/robots.txt`.
<!-- old numbering below intentionally superseded -->
6. Run `prisma db push` against the production database carefully.
7. Run seed only if demo data is desired.
8. Test `/api/health`.
9. Test `/admin`.
10. Test `/request-quote`.
11. Test `/list-your-company`.
12. Test `/sitemap.xml` and `/robots.txt`.

## Production Safety

- Do not run seed on production if real provider data already exists unless seed behavior is confirmed safe for that database.
- Use a strong `SIGN_ZIM_ADMIN_KEY`.
- Keep the admin route private and share the key only with trusted operators.
- Rotate the admin key immediately if it is shared accidentally.
- Do not expose `DATABASE_URL` in logs, screenshots, client code, or public documentation.
- Run schema changes against production intentionally, preferably after testing them locally or against a staging database.

## Seed Safety

The seed script is designed for demo data refreshes without deleting real records:

- Services are upserted by slug.
- Demo companies are upserted by slug.
- Demo company service links are added with duplicate protection.
- Demo portfolio images are matched by company and image URL before create.
- Demo leads are matched by phone and service before update/create.

Seeding may still update records that use the same demo slugs, phone numbers, or service combinations. Check seed behavior before using it on production data.

## First 30 Providers Launch Plan

Use this simple manual tracker for the first provider acquisition sprint. The target mix is:

- 10 signage companies
- 5 interior deco providers
- 5 shop fitting providers
- 5 print/branding providers
- 5 display/events providers

| Company name | Category | City | Contact | Status | Package interest | Notes | Follow-up date |
| --- | --- | --- | --- | --- | --- | --- | --- |
|  | Signage |  |  | Not contacted | Free / Verified / Featured |  |  |
|  | Signage |  |  | Not contacted | Free / Verified / Featured |  |  |
|  | Signage |  |  | Not contacted | Free / Verified / Featured |  |  |
|  | Interior deco |  |  | Not contacted | Free / Verified / Featured |  |  |
|  | Shop fitting |  |  | Not contacted | Free / Verified / Featured |  |  |
|  | Print/branding |  |  | Not contacted | Free / Verified / Featured |  |  |
|  | Display/events |  |  | Not contacted | Free / Verified / Featured |  |  |

Suggested statuses: `Not contacted`, `Invited`, `Interested`, `Submitted`, `Approved`, `Featured pitch`, `Follow up`, `Not a fit`.
## Launch Checks

Before demo or deployment, confirm:

- Database URL is configured and reachable.
- Admin key is configured.
- Admin WhatsApp is configured.
- App URL is configured.
- At least 5 approved companies exist.
- At least 3 verified companies exist.
- At least 1 featured company exists.
- At least 1 quote request has been captured.
- `/sitemap.xml`, `/robots.txt`, and `/api/health` respond as expected.

## Mobile Smoke Test

Most Sign Zim users will arrive from WhatsApp, Facebook, and mobile browsers. Before launch or after layout changes, check:

- Homepage at mobile width.
- Companies directory filters and cards.
- A company profile page.
- Services page and grouped service categories.
- Request quote form.
- List your company form.
- For Providers page.
- Admin page.
- No horizontal scrolling.
- Primary CTAs are visible and tappable.
- Forms are usable without zooming.
- WhatsApp, copy link, and share buttons fit inside the viewport.
- Portfolio galleries and service chips wrap cleanly.


## Legal Review Note

The `/terms` and `/privacy` pages are practical operational drafts and should be reviewed by a qualified Zimbabwean legal practitioner before full public launch.

