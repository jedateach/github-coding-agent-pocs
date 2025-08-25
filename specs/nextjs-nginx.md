# Next.js + NGINX Runtime Config POC Spec

## Objective

Demonstrate deploying the latest Next.js (as of August 2025) using a default NGINX Docker image, with configuration via both `process.env` and runtime overrides using a `window.__CONFIG__` script injected by NGINX. Optimize for fast local development with pnpm and SWC.

---

## 1. Next.js Version

- Use the latest stable Next.js (check with `npm info next version`).
- Use app router, if necessary.
- SWC (Rust-based) is used for transpilation and minification (default in Next.js).

---

## 2. Tooling & Build

- **Package manager:** Use `pnpm` for all installs and scripts.
- **Build tools:** Use Next.js defaults (SWC for build/minify).
- **Scripts:** Add `pnpm build` and `pnpm start` for production.

---

## 3. Project Structure

- Place the app in `sites/demo-app/` using the `app/` directory.
- Centralize config logic in `lib/config.ts`.

---

## 4. Configuration Strategy

- **Build-time:** Use `process.env` for server-side config.
- **Runtime (client):** Read from `window.__CONFIG__` if present, overriding env defaults.
- **Injection:** Add a placeholder `<script>window.__CONFIG__ = {}</script>` in the main HTML (e.g., `_document.tsx`).
- **NGINX:** Use `sub_filter` to replace the placeholder with actual config at runtime.

#### Example injected script:

```html
<script>
  window.__CONFIG__ = {
    API_URL: "https://api.example.com",
    FEATURE_X_ENABLED: true,
  };
</script>
```

---

## 5. Docker & NGINX

- **Dockerfile:** Multi-stage build:
  1.  Build Next.js app with pnpm.
  2.  Copy `.next` static output to a container based on the default `nginx:alpine` image.
- **NGINX config:** Use `sub_filter` to inject runtime config.

#### Example Dockerfile

```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY sites/demo-app/package.json sites/demo-app/pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install
COPY sites/demo-app .
RUN pnpm build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/.next /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
```

#### Example NGINX Config Snippet

```nginx
http {
	server {
		listen 80;
		location / {
			root /usr/share/nginx/html;
			sub_filter '<script>window.__CONFIG__ = {};</script>' '<script>window.__CONFIG__ = {"API_URL":"$API_URL"};</script>';
			sub_filter_once on;
		}
	}
}
```

---

## 6. Implementation Steps

1. Scaffold Next.js app in `sites/demo-app/` with pnpm.
2. Implement config utility (`lib/config.ts`) for env and runtime overrides.
3. Add placeholder config script in HTML.
4. Write Dockerfile for multi-stage build (Node + NGINX).
5. Write NGINX config for runtime config injection.
6. Document usage and testing steps.

---

## 7. Testing

- Validate config is correct in SSR and client.
- Demonstrate runtime config override via NGINX without rebuild.

---

## 8. Deliverables

- Next.js app in `sites/demo-app/` (latest version, pnpm, SWC).
- Config utility.
- Dockerfile and NGINX config.
- Documentation in this spec and a `README.md`.
- **.gitignore updated**, where necessary so build artifacts are not committed.
