# Subdirectory Sites — Shipping Extra Sites Out of a Repo That Already Has One

> How to ship a **subdirectory** of an existing repo as its own Vercel project — static, or with its own build step — on its own subdomain, updated by an ordinary `git push` to dev if the primary repo has dev and prod branches. Fleet-level reference — a project keeps its own specifics next to the site itself.

## Why This Guide Exists

  **Standing a site up in its own repo is simple, and needs no guide.** Every hard thing below exists *because the site is not in its own repo* — it is embedded in one that already has a site, a default branch, and a deploy of its own.

  So the difficulty is never the site. It is always the **host repo**: where the project is rooted, and which branch it deploys from. Those two settings are the entire guide, and both of them fail **silently** when wrong.

  **Scope, honestly.** The only host repo this has been done in is the **portfolio** (`design-360`) — a big site that needed small add-ons hanging off it. The commands below are parameterized and should carry to any repo shaped like that, but they have not been proven anywhere else yet. **When a second host repo uses this, revisit the framing and the file name** — a second example is what tells you which parts are the pattern and which parts were just the portfolio.

  -> `~/Development/360-design/assets/prototypes/README.md`
  -> `~/Development/360-design/assets/standalone/README.md`

## What This Is

  A **subdirectory site** is a small, self-contained site that lives inside a bigger repo, deploys as its own Vercel project, and answers on its own subdomain. It can be plain static files or run its own build — either way you send someone a link and it does its job.

  Reach for it when you need

  + **A client walkthrough or handoff page** — the thing you send when work is delivered.
  + **A microsite or a one-page landing site** — a single idea that deserves its own URL.
  + **An interactive prototype** — something a portfolio visitor plays with.

  All three ship the same way. Where they *live* in the repo is a shelving decision — see Worked Examples.

## When Not To Use It

  A subdirectory site is **front-end only, but not necessarily static**. It can be plain static files, or it can run its own build step (npm + a bundler) — Vercel compiles it from the Root Directory like any project — and it can do heavy client-side work: a whole Whisper model running in the browser via WebAssembly is fair game.

  The real line is the **backend**. The moment it needs its own server-side API routes, a database, or secrets read at runtime, it stops being one of these and earns its own repo. Anything that ships to the browser — however it is built — is welcome here.

## The Mental Model

  **One Vercel project. Root directory = the subdirectory. Production branch = the branch you actually push.**

  That third clause is the entire trick, and it is the part that gets missed.

  Assume the host repo works the way a real one does — the way `design-360` does:

  + **A production branch** that the parent site deploys from, and that you touch rarely.
  + **An integration branch** (`dev`) that you actually work on, and push all day.

  Vercel points a **new project's production branch at the repo's default branch** — the production one. Leave it there and you will push your work all day while the site never changes. The deployment goes green. The domain serves nothing. There is no error anywhere.

  Point the subdirectory site's production branch at the branch you *push*, and one `git push origin dev` gives the **parent site a preview deploy and every subdirectory site a production deploy, at the same time**. You never have to merge just to update a walkthrough page.

  What follows from that

  + **Shipping an update is: change files, commit, push.** Forever. No Vercel or DNS work after the first setup.
  + **Deploy wiring lives account-side, not in the repo** — project, root directory, branch, and domain. A static folder holds just a `vercel.json`; a built one also carries its own `package.json` + lockfile, scoped to the folder. Never a `.vercel/`.
  + **Each site is independent.** One of them breaking is not the others breaking.
  + **A built site wants an Ignored Build Step** so a push that only touched other folders doesn't rebuild it — put `git diff --quiet HEAD^ HEAD -- <ROOT>` in the project's *Ignored Build Step* field. Static folders skip this; there is nothing to build.
  + **If the repo has no dev/prod split** — you push its default branch — then skip Step 3 entirely. Everything else is the same.

## Before You Start

  Four things have to be true. Check them first; two of them are not yours to fix.

  + **A Vercel token exists** — but it **expires.** The CLI stores a short-lived OAuth token (`auth.json` has `expiresAt` + `refreshToken`); do not mint another, **refresh** it. Run `vercel whoami` first — it silently refreshes the stored token. Skip that and a stale token answers `invalidToken` / `Not authorized` on every call, even though `vercel whoami` itself works. This is the single most common "why is it wonky for this agent" trap.
  + **The apex domain is already on the Vercel account.** If it is, attaching a subdomain verifies instantly. If it is **not**, stop and ask — adding an apex is a different, human-facing job.
  + **A DNS API token is in the shell.** `$CLOUDFLARE_API_TOKEN`, exported from `~/.zshrc`.
  + **The repo is connected to the Vercel account.** It is, if any project from this repo already deploys.

  Pull the token — **refresh it first**, or it may be expired:

```sh
vercel whoami >/dev/null   # silently refreshes the stored OAuth token
TOKEN=$(jq -r '.token' "$HOME/Library/Application Support/com.vercel.cli/auth.json")
```

## The Variables

  Set these once. Everything below is copy-paste after that.

```sh
NAME="everlastings-walkthrough"      # Vercel project name — UNIQUE ACROSS THE WHOLE ACCOUNT
SUB="everlastings"                   # subdomain — does NOT have to match NAME
APEX="august.style"
REPO="seanivore/design-360"          # owner/repo on GitHub
ROOT="assets/standalone/$NAME"       # path from repo root to the site folder
BRANCH="dev"                         # the branch you actually push
```

  **Name collisions are normal, and harmless.** If a client project already owns the obvious name — the store is `everlastings` — then suffix the project name: `everlastings-walkthrough`. The subdomain is unaffected and can still be `everlastings.august.style`.

## Step 1 — Create the Files

```
<ROOT>/
  index.html
  vercel.json     →  { "cleanUrls": true, "trailingSlash": false }
  … the rest of the site — static files, or a package.json + src that the build compiles
```

## Step 2 — Create the Vercel Project

  **`rootDirectory` and the git link must both go in at create time.** Patching them on afterwards is a fight. Creating with them is one call.

  `framework:null` below is for a **static** folder. For a **built** site, set `framework` (Vercel auto-detects Vite, Next, and the rest) or pass `buildCommand` + `outputDirectory` — confirm the current field names against Vercel's docs before you rely on them.

```sh
curl -s -X POST "https://api.vercel.com/v11/projects" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d "{\"name\":\"$NAME\",\"framework\":null,\"rootDirectory\":\"$ROOT\",
       \"gitRepository\":{\"type\":\"github\",\"repo\":\"$REPO\"}}" \
  | jq '{id, rootDirectory, productionBranch: .link.productionBranch}'

PRJ="prj_…"     # ← keep the returned id; the next two steps need it
```

## Step 3 — Move the Production Branch

  Skip only if the repo has no dev/prod split.

  This is the step with the non-obvious endpoint, and the one that costs an hour if you guess.

  + **`PATCH /v9/projects/{id}` rejects it.** Both `productionBranch` and `link` come back as unknown properties. It is the endpoint you would reach for, and it is wrong.
  + **`PATCH /v1/projects/{id}/branch` is the one that works.** It is not documented anywhere near the others.

```sh
curl -s -X PATCH "https://api.vercel.com/v1/projects/$PRJ/branch" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d "{\"branch\":\"$BRANCH\"}"

# confirm — must say dev
curl -s -H "Authorization: Bearer $TOKEN" \
  "https://api.vercel.com/v9/projects/$PRJ" | jq -r '.link.productionBranch'
```

## Step 4 — Attach the Domain

```sh
curl -s -X POST "https://api.vercel.com/v10/projects/$PRJ/domains" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d "{\"name\":\"$SUB.$APEX\"}" | jq '{name, verified}'
```

  Comes back `verified: true` on the spot when the apex is already on the account. TLS provisions itself once DNS resolves.

## Step 5 — Add the DNS Record

  **DNS-only. The grey cloud is not a preference.** Proxying Cloudflare in front of Vercel breaks certificate issuance — that is what `"proxied": false` is doing.

```sh
ZONE=$(curl -s -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  "https://api.cloudflare.com/client/v4/zones?name=$APEX" | jq -r '.result[0].id')

curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE/dns_records" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" -H "Content-Type: application/json" \
  -d "{\"type\":\"CNAME\",\"name\":\"$SUB\",\"content\":\"cname.vercel-dns.com\",
       \"proxied\":false,\"ttl\":1,\"comment\":\"$NAME — subdirectory site (Vercel)\"}" \
  | jq '.success, .result.name'
```

## Step 6 — Ship It

```sh
git add "$ROOT" && git commit -m "feat($NAME): new subdirectory site" && git push origin "$BRANCH"
```

## Step 7 — Verify It

```sh
dig +short "$SUB.$APEX"                     # → cname.vercel-dns.com. + A records
curl -sI "https://$SUB.$APEX" | head -1     # → HTTP/2 200
```

  Then **open it in a browser and look at it**. A `200` only proves that a file was served.

## Traps

  Every one of these has actually happened. They are indexed by **symptom**, because the symptom is how you will meet them — the cause is never obvious from the outside.

  + **Deployment is green, the domain 404s**
    - Production branch is still the repo's default.
    - Go to Step 3.

  + **`PATCH /v9/…` answers "unknown property"**
    - Wrong endpoint — that one rejects both `productionBranch` and `link`.
    - Use `PATCH /v1/projects/{id}/branch`.

  + **Links 404 in production but work locally**
    - `cleanUrls` is on and a rewrite destination ends in `.html`.
    - Drop the `.html`. Expanded below — this one is nastier than it looks.

  + **The certificate never issues**
    - Cloudflare's orange cloud is proxying in front of Vercel.
    - Set `"proxied": false`.

  + **The project name is rejected**
    - Names are unique across the whole account, not per repo.
    - Suffix it. The subdomain is unaffected.

  + **The whole repo deploys instead of the folder**
    - `rootDirectory` was not set at create time.
    - Recreate the project. Cheaper than patching it.

  + **Video stalls on a black box**
    - The MP4 index (`moov`) was written after the video data.
    - Faststart remux — see Media.

  + **Captions silently never appear**
    - A cross-origin `<track>` needs CORS headers R2 does not send.
    - Ship the `.vtt` inside the site folder.

  Two of those deserve more than a line.

### The `cleanUrls` Rewrite Trap

  With `"cleanUrls": true`, **a rewrite destination must not end in `.html`** — write `"destination": "/about"`, never `"/about.html"`.

  What makes it dangerous is not the rule, it is the feedback

  + **It fails only in production.** Locally the file is right there, so it resolves.
  + **`vercel dev` does not reproduce it.** The tool you would reach for to check is the tool that hides it.
  + **It 404s silently.** Nothing logs, nothing warns. The page is just gone.

### The Production-Branch Trap

  This is the same failure wearing a different hat, and it is worth naming twice because there is **no error message anywhere in the system**.

  You push. GitHub takes it. Vercel builds it. The deployment goes green. And the domain serves the old thing, or nothing, because production is still pointed at a branch you never touch.

  If one of these ever looks like it "didn't deploy" — check the production branch before you check anything else.

## Media

  Heavy assets go on the CDN, never in the repo. The full how-to is `CDN_GUIDE.md`; these are the parts that bite *here*.

  + **`AWS_REQUEST_CHECKSUM_CALCULATION=when_required` is load-bearing** on the `aws` CLI path. Newer versions add a CRC32 trailer that R2 rejects.
  + **Nothing sets `Cache-Control` for you** on that path — pass `--cache-control "public, max-age=31536000, immutable"` yourself.
  + **An immutably-cached object needs a new versioned key to change** — `-v2`, never an in-place overwrite. You cached it forever; that was the point.
  + **Captions are the one exception to "media goes on the CDN".** Ship `.vtt` files inside the site folder. A cross-origin `<track>` needs CORS headers R2 does not send, and same-origin sidesteps the whole problem.

### Faststart, and Why Video Stares at You

  Recorders — and some renderers — write the MP4 index (`moov`) **after** the video data. A browser then has to download the **entire file** before it can show frame one.

  At 500 KB nobody notices. At 54 MB it is a long look at a black box, and no one can tell you why.

  Nothing in the pipeline checks this or fixes it, so do it before you upload. It copies the streams and re-encodes nothing.

```sh
ffmpeg -i in.mp4 -c copy -movflags +faststart out.mp4
```

## Teardown

```sh
curl -s -X DELETE "https://api.vercel.com/v9/projects/$PRJ" -H "Authorization: Bearer $TOKEN"
```

  Then delete the CNAME in the Cloudflare zone. The project going away does not take the DNS record with it.

## Worked Examples

  Both live in `seanivore/design-360`, both ship from `dev`, both were built exactly this way.

  + **everlastings.august.style**
    - `assets/standalone/everlastings-walkthrough/`
    - Twelve-part video walkthrough handing a client their finished store.

  + **shop-admin.august.style**
    - `assets/prototypes/shop-admin/`
    - Interactive Creator Portal demo that a portfolio visitor plays with.

### Standalone or Prototype

  This is a **shelving decision, not a technical one** — the deploy mechanism is identical.

  + **A prototype is something a visitor plays with.** It earns a place in the portfolio.
  + **A standalone simply exists on its own domain.** You send someone the link.

  Keep them in separate folders so the portfolio can surface one and not the other.

## Keeping This True

  `assets/standalone/README.md` in `design-360` holds the august.style-specific version of this — the portfolio-tile wiring and the exact CDN base.

  **If you deviate from this guide, update it.** The `shop-admin` project was set up over this same API and the commands were never written down, which is the only reason this file had to be reconstructed at all.

---
*Created 2026-07-14*