# Git & Deploy

Branching, merging, tagging, and the platforms they publish to. **Check the current Vercel and Cloudflare CLI docs before driving them** — both change often, and your memory of their flags is dated.

---

## The branches

- **`main`** — production. Tagged releases only: tested, bug-free, public-ready.
- **`dev`** — the persistent integration branch. Where previews deploy from.
- **`feat/*` and `fix/*`** — temporary, deleted after merge.

Because everything reaches `main` by fast-forward from `dev`, `dev` is always at or ahead of `main` and the two never drift apart.

---

## Starting a project

```bash
cd ~/Development && mkdir <project> && cd <project>
cp -R ~/Development/_git_init/. .
git init && git add . && git commit -m "chore: initial commit"
git branch -M main
gh repo create <project> --public --source=. --remote=origin
git push -u origin main
git checkout -b dev
```

Copying `_git_init/` first is what puts the secrets files in place and gitignored *before* git is initialised. Do not reorder those steps.

---

## Shipping a change

**1. Branch off current `main`.**

```bash
git checkout main && git pull origin main && git checkout -b feat/<name>
```

**2. Ship through `dev` first.** The fast-forward merge keeps history linear; the push triggers the preview deploy.

```bash
git checkout dev && git merge --ff-only feat/<name> && git push origin dev
```

**3. 🛑 STOP HERE.** Tell Sean it is live on the dev preview URL — the URL is in the README or the architecture doc — with a one-line summary of what changed. **Do not ship to `main` until he signs off.** If he finds a bug, fix it on `feat/*`, fast-forward into `dev`, push, and tell him again. Production is untouched throughout.

**4. Ship to `main`** once all of these are true: tests pass · Sean has signed off · the architecture doc is current · `package.json` is bumped if applicable · the build succeeds.

```bash
git checkout main && git merge --ff-only dev && git push origin main
git tag vX.Y.Z && git push origin vX.Y.Z
```

Tags are pure numeric — `v3.1.2`, never `v3.1.2-fix`. Human-readable labels belong in the commit body or the GitHub release. Re-pointing a tag means deleting and recreating it.

---

## Commits

`type(scope): brief [vX.Y.Z]` plus body bullets, from `feat fix docs style refactor test chore`.

Commit often — usually per file — and word each message to mirror the slice it implements, so the history maps onto the plan. **Git history is the progress log**; there is no separate session log or build report. Confirm with `git diff` before committing.

---

## Environments

**Environments track branches.** Pushing `dev` deploys the Vercel preview; `main` is production. **Verification runs against the real deployed preview URL** — never `vercel dev`, never localhost. Testing something that is not what ships tells you about a thing that does not exist.

**Turn preview protection OFF during development.** Vercel SSO and deploy protection block agents from reaching endpoints. Turn it off on the preview while building, and back on before anything is public. Driving a protected preview through an already-authenticated browser is the fallback for when protection must stay on — not the default.

**The cron exception.** Vercel Cron Jobs fire only on the production deployment, never on preview — so a project with scheduled or timed tasks cannot verify that behavior on `dev` no matter how solid everything else is. Where this applies, the sign-off gate narrows rather than disappears: push the smallest possible slice to `main` — the keep-alive ping or dispatcher scaffold alone, no front end, nothing it triggers yet — specifically to prove the schedule fires, then freeze `main` there until the real gate clears for everything else. A minimal backend-only push that proves the one thing preview can't is the correct shape of this exception, not a corner cut. It is still an explicit, named exception the orchestrator proposes and Sean signs off on — never a silent workaround for "I want to test something."

---

## Environment keys

**Seed every scope at once, each with its correct value from the start.** Development, Preview, and Production together, in one pass: Production gets **live** keys, Preview and Development get **test** keys.

Never seed test keys into Production intending to swap them at go-live. It is extra work and a guaranteed re-do, and the "so they cannot be used by accident" rationale is a corner-cut rather than a reason — least privilege lives in *which* keys a scope holds, not in deferring the setup. Set each scope right the first time. The only unavoidable later step is a value that does not exist yet, like a live webhook secret minted at go-live.

**`.env.reference` is a durable record, not a machine-readable source.** A gitignored document holding every key grouped by production / preview / development, so that when Vercel periodically locks or drops env values they get re-pushed from here rather than reconstructed from scratch. It exists to protect Sean from lost keys.

Do not architect build commands around grepping values out of it inline, per command. That pattern is a workaround for agent shell-state quirks dressed up as a foundation, and it quietly turns a human's record into fragile plumbing. If a script needs values, read them once inside that script. Keep the record comprehensive, and never delete from it.

---

## DNS

**DNS lives on Cloudflare, not Vercel.** The apex `august.style` is on Cloudflare; Vercel is authorised for the apex, so production branches publish to a **subdomain**. Create and point subdomains with the **Cloudflare CLI**, using the token already in the shell.

Vercel used to suggest the Cloudflare DNS change and apply it for you. It no longer reliably does — edit Cloudflare directly.
