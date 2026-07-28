# CDN Guide — putting media on `cdn.august.style`

**Purpose**: agent-facing how-to for uploading project media to the CDN (Cloudflare R2, served at `cdn.august.style`). This is the fleet-level reference; a project keeps its own specifics (bucket, R2 endpoint, key prefix) in its own `.agents/CDN_*.md`. Media belongs on the CDN, **never committed to the repo** — the repo `.gitignore` blocks large media by design.

## Two kinds of upload

- **Images** (`.jpg`, `.png`) → the **upload API**, which auto-shrinks them and stores them as `.webp`.
- **Videos** (`.mp4`) → straight to R2 with the **`aws`** CLI (the API does not touch video).

**The one rule that governs everything:** the upload **key** must exactly match the public URL minus the host (`https://cdn.august.style/`). Match it and the media resolves; miss by one character and it's blank. The key always starts with `media/` and — for images — ends `.webp` even when the source is `.jpg`/`.png` (the API converts it).

## Setup (once per session)

- The upload password lives as `UPLOAD_API_KEY` in the project's `.env` — never printed, never committed.
- Video uses an `aws` profile named `r2` (already configured).

Load the key into the shell:
```bash
cd ~/Development/<project>
export $(grep '^UPLOAD_API_KEY=' .env)
```

## Upload — one image
```bash
curl -X POST https://www.august.style/api/upload \
  -H "Authorization: Bearer $UPLOAD_API_KEY" \
  -F "file=@assets/.media/<project>/<slug>/hero-<slug>.jpg" \
  -F "key=media/<project>/<slug>/hero-<slug>.webp"
```
- **file** — local path to the source image.
- **key** — the CDN path; starts `media/`, ends `.webp`. Prints the live URL on success.

## Upload — a whole folder
```bash
slug=<slug>
for f in assets/.media/<project>/$slug/*.jpg assets/.media/<project>/$slug/*.png; do
  name=$(basename "${f%.*}")
  curl -X POST https://www.august.style/api/upload \
    -H "Authorization: Bearer $UPLOAD_API_KEY" \
    -F "file=@$f" \
    -F "key=media/<project>/$slug/$name.webp"
done
```

## Upload — a video
```bash
aws s3 cp assets/.media/<project>/<slug>/video-<slug>.mp4 \
  s3://<bucket>/media/<project>/<slug>/video-<slug>.mp4 \
  --endpoint-url https://<ACCOUNT_ID>.r2.cloudflarestorage.com \
  --profile r2 --content-type video/mp4
```
- **One file at a time** — don't point `aws` at a folder (it would push the raw jpgs up too).
- Every video wants a matching `poster-<slug>` still — a missing poster means something's off.

## Verify it landed
```bash
curl -sI -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" \
  "https://cdn.august.style/media/<project>/<slug>/hero-<slug>.webp"
```
- **`200`** on the first line = live.
- **`403`** does NOT mean failure — Cloudflare blocks plain `curl`, which is why the command spoofs a browser user-agent. Opening the URL in a real browser is the surest check.

## Gotchas

- **Upload to production** (`www.august.style`), never a preview / `*.vercel.app` link — a preview hides uploads under a `_preview/` folder.
- **Image cap 25 MB**; videos (via `aws`) have no limit.
- **Key prefix must start `media/`** or the API rejects it.
- Media stays out of git: upload it, then reference the `cdn.august.style` URL in code.

## For a project with its own CDN

Same steps — swap four things, and record them in that project's own `.agents/CDN_*.md`:
- **CDN host** — `cdn.august.style` → the project's domain.
- **Bucket** — `<bucket>` (e.g. `portfolio`) → the project's bucket.
- **Key prefix** — `media/<project>/…` → the project's path.
- **Password** — its own `UPLOAD_API_KEY` in that project's `.env`.

The `<ACCOUNT_ID>` in the video endpoint and the concrete bucket name are project-specific — get them from the project's own CDN doc, not from here.
