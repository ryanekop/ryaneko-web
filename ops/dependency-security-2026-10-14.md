# Dependency security remediation — 2026-10-14

## Baseline and scope

Read-only audit of `/root/ryaneko-web` at commit
`bb34f48ccb53d9b718bfcb689aa7168b6c1e7206` reported 11 vulnerable package
entries: 1 moderate, 9 high, and 1 critical. These are package entries, not
11 independent vulnerabilities. Production-only audit reported 3 entries.

The inspected deployment uses Linux, static Next.js export, unoptimized images,
and Nginx serving `/var/www/ryaneko-web/out`. This website is not proxied to
a Next.js runtime. That limits exposure to the reported server-side Next.js
issues; it does not establish that the entire server is vulnerability-free.

The change updates only dependency manifests/lock data and this note. React,
ESLint rules, application source, static export, feature flags, API contracts,
and Nginx configuration remain unchanged.

## Versions

| Package | Before | After |
| --- | --- | --- |
| next / eslint-config-next | 16.3.1 | 16.3.8 |
| sharp | 0.35.3 | 0.35.5 |
| source-map-js | 1.2.1 | 1.2.2 |
| brace-expansion (major 1) | 1.1.18 | 1.1.21 |
| brace-expansion (major 2) | 2.1.4 | 2.1.7 |
| js-yaml | 4.3.1 | 4.3.2 |
| @humanfs/node | 0.16.7 | 0.16.8 |

Matching Next.js SWC/env/plugin packages and sharp platform/libvips packages
follow their parent updates. `@humanfs/core` 0.19.2 and `@humanfs/types` 0.15.0
are required by the updated humanfs packages. Unrelated npm resolution changes
were excluded.

## Residual findings

After the update, local audit reports **0 production findings** and **5 high
findings in the full dependency tree**:

`eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch → braces`

The root issue is stack exhaustion from deeply nested brace patterns in
`braces` 3.0.3. The advisory had no patched version at verification time:
[GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm).
These packages are development tooling, not shipped application runtime code.
Untrusted lint patterns/source inputs remain a tooling risk.

The agreed scope retains the existing lint rules and records these findings.
Do not use `npm audit fix --force` to downgrade eslint-config-next to 14.2.35,
remove lint rules, suppress advisories, or override braces with an unpatched
version. Revisit this chain when a compatible upstream fix becomes available.

## Validation and rollout

Clean `npm ci`, `npm audit --json`, `npm audit --omit=dev --json`,
`npm run lint`, `npx tsc --noEmit --incremental false`, and `npm run build`
completed. Full audit exits nonzero for the documented five residual findings;
production audit passes. The build exports every existing application route.

Temporary Playwright checks using local static servers and Chrome passed:

- All 14 application routes returned HTTP 200 and matched the pre-update
  exported page text at 1280px and 390px widths. Mobile checkout screenshot
  inspection found no layout issue.
- Language selection persisted across reload; light/dark/system theme and
  dropdown interactions worked.
- Desktop/mobile mock checkout preserved review/cancel, normalized submission,
  reconciliation retry with the same bearer token, and duplicate-click protection.
- Receipt access moved from fragment to session storage, survived reload, and
  supported serial copy/download. Expired/401 states and pending-to-fulfilled
  polling worked.
- Mock OTP cooldown/normalization, authenticated history pagination/detail,
  logout, timer expiry, and HTTP 401 session cleanup passed. A disabled catalog
  retained the Mayar fallback.
- Private pages excluded analytics/recorder scripts, retained noindex and
  no-referrer metadata, and entering checkout unloaded the public document.

The browser checks recorded no page JavaScript errors. External requests were
intercepted; no real checkout or OTP request was sent. A read-only secondary
agent reviewed application behavior and mock response contracts; the primary
agent applied the changes and ran all validation.

Deployment is a separate approval step. Preserve the current build-time
configuration and back up the deployed static export before replacing it.
After approved deployment, rerun both audits on the server, verify routes and
assets through Nginx, and smoke-test desktop/mobile behavior. Restore the prior
static export if those checks fail. Local validation does not prove a server
deployment, real payment redirect, OTP delivery, or backend migration.
