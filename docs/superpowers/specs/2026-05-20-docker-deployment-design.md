# Docker Deployment Design — Portfolio

**Date:** 2026-05-20  
**Status:** Approved  
**Domain:** aymeric.app  
**Deployment target:** Proxmox LXC (Docker + Docker Compose)

---

## Goal

Containerize the portfolio and expose it to the internet via Cloudflare Tunnel. Add a Node.js backend to handle the contact form and send emails via Gmail. Mirror the CVault deployment pattern (nginx + frontend + backend) for consistency.

---

## Architecture

```
Internet (HTTPS)
     ↓
Cloudflare Edge  (SSL terminated here)
     ↓  outbound tunnel, no open ports on LXC
cloudflared  (Docker service)
     ↓  http://nginx:80
nginx  (Docker service, internal only)
     ├── /api/*  →  backend:3001
     └── /*      →  frontend:3000
```

All 4 services share a single Docker bridge network (`portfolio_net`). No ports are exposed on the LXC host except nginx:80 bound to localhost (consumed by cloudflared).

---

## Services

### frontend

- **Image:** multi-stage build (Node 20 Alpine)
- **Pattern:** identical to CVault frontend Dockerfile — builder stage runs `npm ci` + `next build`, runner stage copies `.next/standalone`, `.next/static`, `public/`
- **Requires:** `output: 'standalone'` in `next.config.ts`
- **Package manager:** npm (package-lock.json)
- **Internal port:** 3000
- **No env vars** at runtime (all content is static at build time)

### backend

- **Location:** new `backend/` directory at repo root
- **Runtime:** Node.js 20 Alpine
- **Framework:** Express
- **Endpoint:** `POST /api/contact`
  - Validates: `name` (string, required), `email` (valid email, required), `message` (string, required, max 2000 chars)
  - Sends email via Nodemailer + Gmail SMTP
  - Returns: 200 on success, 400 on validation failure, 500 on send failure
- **Rate limiting:** `express-rate-limit` — 5 requests per 10 minutes per IP
- **Dependencies:** express, nodemailer, express-rate-limit, zod
- **Internal port:** 3001
- **Env vars:**
  - `GMAIL_USER` — Gmail address used to send
  - `GMAIL_APP_PASSWORD` — Gmail App Password (2FA must be enabled)
  - `CONTACT_RECIPIENT` — inbox that receives the contact emails

### nginx

- **Image:** nginx:alpine
- **Config:** `nginx/nginx.conf` mounted read-only
- **Routing:**
  - `location /api/` → `proxy_pass http://backend:3001`
  - `location /` → `proxy_pass http://frontend:3000` (with WebSocket upgrade headers)
- **Rate limiting:** nginx-level zone on `/api/contact` — 5 req/min per IP (second layer on top of Express)
- **No SSL** — Cloudflare terminates HTTPS, nginx serves plain HTTP internally
- **Port:** 80 (internal to Docker network, consumed by cloudflared)

### cloudflared

- **Image:** `cloudflare/cloudflared:latest`
- **Command:** `tunnel --no-autoupdate run --token ${TUNNEL_TOKEN}`
- **Tunnel config** (set in Cloudflare dashboard): `aymeric.app` → `http://nginx:80`
- **No ports exposed** on host — purely outbound connection to Cloudflare edge
- **Env var:** `TUNNEL_TOKEN` — copied from Cloudflare Zero Trust dashboard

---

## File Changes

| File | Action | Notes |
|------|--------|-------|
| `dockerfile` | Replace | Multi-stage standalone build, Node 20, npm |
| `docker-compose.yml` | Replace | 4 services, no GHCR / Watchtower |
| `next.config.ts` | Update | Add `output: 'standalone'` |
| `nginx/nginx.conf` | New | Rate limit + routing |
| `backend/package.json` | New | express, nodemailer, express-rate-limit, zod |
| `backend/src/index.js` | New | Express app, /api/contact route |
| `backend/Dockerfile` | New | Node 20 Alpine |
| `.env.example` | New | GMAIL_USER, GMAIL_APP_PASSWORD, CONTACT_RECIPIENT, TUNNEL_TOKEN |
| `.gitignore` | Update | Ensure `.env` is ignored |
| `src/components/Contact/` | Update | Wire form to POST /api/contact |

---

## Environment Variables

```env
# backend — email sending
GMAIL_USER=your@gmail.com
GMAIL_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
CONTACT_RECIPIENT=your@inbox.com

# cloudflared — tunnel
TUNNEL_TOKEN=eyJ...
```

`.env` is never committed. `.env.example` is committed with placeholder values.

---

## Contact Form Wiring

The existing Contact component (`src/components/Contact/`) already renders the form UI. It needs:
- A `handleSubmit` function that calls `POST /api/contact` with `{ name, email, message }`
- Loading state during submission
- Success / error feedback to the user (inline message, no redirect)

---

## What Is NOT in Scope

- HTTPS/certbot — Cloudflare handles SSL termination
- Watchtower / GHCR auto-pull — replaced by direct build on the LXC
- Database / persistence — contact form is fire-and-forget
- Authentication
- Any new portfolio sections beyond wiring the existing contact form

---

## LXC Setup (manual, outside Docker)

1. Install Docker + Docker Compose on the LXC
2. Clone repo to `/opt/portfolio`
3. Create `.env` from `.env.example`
4. Run `docker compose up -d --build`
5. Cloudflare Tunnel token must be set before starting — cloudflared will not connect without it
