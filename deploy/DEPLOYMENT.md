# Deploying the Bani Yas website (Coolify + GitHub Actions)

The site runs as one Docker container managed by **Coolify** on your server, published directly on
**port 7111** (`http://103.207.63.109:7111`). Other apps on the server are not touched: Coolify only
restarts this application.

```
push to "production" ─► CI (lint, unit tests, build, browser tests) ─► only if green:
   GitHub builds the Docker image ─► GitHub Container Registry (ghcr.io/abish133/baniyas-website:production)
   ─► Coolify deploy webhook ─► Coolify pulls the image and restarts this app on port 7111
   ─► GitHub waits until /api/health reports the new version
```

The image is built on GitHub. Settings come from **`.env.production`**, committed in this private
repository (development uses `.env.development`). The build pre-renders the pages from the database
using those settings, and the running container reads the same file.

## 1. Let the server pull the image (once)

The image is private in GitHub Container Registry. On GitHub: your avatar → Settings → Developer
settings → Personal access tokens → **Tokens (classic)** → Generate, scope **`read:packages`** only.
Then, on the server (Coolify → Servers → your server → **Terminal**, or SSH):

```bash
docker login ghcr.io -u Abish133      # paste the read:packages token as the password
```

## 2. Create the application in Coolify (once)

1. **Projects → your project → + New → Docker Image**.
2. Image: `ghcr.io/abish133/baniyas-website`, tag: `production`.
3. **General / Network**:
   - Ports Exposes: `7111`
   - Ports Mappings: `7111:7111`  (the site is served directly on the server's port 7111)
   - Leave "Domains" empty (no proxy / nginx needed).
4. **Environment Variables**: nothing required — the image contains `.env.production`
   (site `http://103.207.63.109:7111`, database, `AUTH_SECRET`, upload/backup folders).
   Anything you set here overrides the file (e.g. a temporary test value).
5. **Persistent Storage** → add two volumes (so uploads and backups survive every deployment):
   - name `baniyas-uploads`, destination path `/app/storage/uploads`
   - name `baniyas-backups`, destination path `/app/backups`
6. **Health check**: enable it, path `/api/health`, port `7111` (the image also has its own check).
7. **Post-deployment command** (Advanced / Configuration): `npm run db:migrate`
   — applies database changes after each deployment.
8. Turn **off** any "Auto deploy" option in Coolify: deployments come from GitHub after the tests pass.
9. Click **Deploy** once to check it works: `http://103.207.63.109:7111` should show the website.

Open port **7111** in the server/cloud firewall if it is closed.

## 3. Connect GitHub to Coolify (once)

In Coolify:
- **Keys & Tokens → API tokens → Create** (permission: `deploy`). Copy the token.
- Open the application → **Webhooks** → copy the **Deploy Webhook** URL
  (looks like `https://coolify.yourserver/api/v1/deploy?uuid=…&force=false`).

In GitHub → repository → **Settings → Secrets and variables → Actions → New repository secret**:

| Secret | Value |
| --- | --- |
| `COOLIFY_WEBHOOK` | The Deploy Webhook URL |
| `COOLIFY_TOKEN` | The Coolify API token |
| `APP_HEALTH_URL` | `http://103.207.63.109:7111/api/health` |

Never paste these values anywhere else (chat, code, issues).

## 4. Deploying

```bash
git checkout production
git merge abishDev          # or commit directly on production
git push origin production
```

GitHub → **Actions**: CI runs; when it is green, **Deploy** builds the image, triggers Coolify and waits
until `/api/health` shows the new version (the commit id). If the check fails, see the deployment logs
in Coolify. Manual deploy: Actions → Deploy → Run workflow → branch `production`.

**Rollback:** every build is also tagged with its commit id. In Coolify set the image tag to an older id
(GitHub → Packages → baniyas-website lists them) and click Deploy; set it back to `production` afterwards.

## 5. First deployment only

The database already has its tables, content and admin account. For a brand-new database run once
in Coolify's terminal for this app: `npm run db:setup`, then
`npm run admin:create -- you@example.com "StrongPass123" "Your Name"`.

## 6. Backups & monitoring

- **Backup now:** Coolify → the app → Terminal → `npm run backup` (saved in the `baniyas-backups` volume).
  Schedule it with Coolify **Scheduled Tasks**: command `npm run backup`, frequency `30 2 * * *`.
  Copy the backups off the server regularly (e.g. Coolify's S3 backup, or rclone).
- **Logs:** Coolify → the app → Logs. Optional `ERROR_WEBHOOK_URL` sends error alerts.
- **Uptime:** add `http://103.207.63.109:7111/api/health` to a monitor such as UptimeRobot.

## 7. Security note

Without HTTPS, admin passwords travel unencrypted. That is acceptable for testing only. For the real
launch, give the app a domain in Coolify (it creates HTTPS automatically) and change
`NEXT_PUBLIC_SITE_URL` to the `https://…` address — secure cookies and HSTS then switch on by themselves.

## Checklist

- [ ] `docker login ghcr.io` done on the server
- [ ] Coolify app: image tag `production`, ports `7111:7111`, env variables, 2 persistent volumes,
      post-deployment `npm run db:migrate`, auto deploy off
- [ ] Firewall allows 7111; `http://103.207.63.109:7111` shows the website
- [ ] GitHub secrets `COOLIFY_WEBHOOK`, `COOLIFY_TOKEN`, `APP_HEALTH_URL`
- [ ] `production` branch exists; first push deploys green
- [ ] An image upload in the admin panel works and survives a redeploy
- [ ] Nightly `npm run backup` scheduled
