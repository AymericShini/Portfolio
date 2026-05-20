# Docker Deployment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Containerize the portfolio with nginx + frontend + backend + cloudflared, add a Node.js contact-form API that sends email via Gmail, and expose everything through a Cloudflare Tunnel at aymeric.app.

**Architecture:** 4 Docker services on a shared bridge network (`portfolio_net`). Cloudflare handles HTTPS; cloudflared dials out to Cloudflare and forwards to nginx; nginx routes `/api/*` to the Node.js backend and everything else to the Next.js standalone frontend.

**Tech Stack:** Node 20 Alpine, Next.js 15 standalone, Express 4, Nodemailer 6, Zod 3, express-rate-limit 7, nginx:alpine, cloudflare/cloudflared:latest, Jest 29, Supertest 7

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `next.config.ts` | Modify | Enable `output: 'standalone'` |
| `dockerfile` | Replace | Multi-stage frontend build (Node 20, standalone) |
| `backend/package.json` | Create | Backend deps + jest config |
| `backend/src/app.js` | Create | Express app — POST /api/contact, rate-limit, validation, email |
| `backend/src/index.js` | Create | Server entry point — calls app.listen |
| `backend/tests/contact.test.js` | Create | Jest + Supertest tests for the contact endpoint |
| `backend/Dockerfile` | Create | Node 20 Alpine backend image |
| `nginx/nginx.conf` | Create | Rate-limit zone, /api/ → backend, / → frontend |
| `docker-compose.yml` | Replace | 4-service compose (frontend, backend, nginx, cloudflared) |
| `.env.example` | Create | Placeholder env vars documentation |
| `src/components/Contact/index.tsx` | Modify | Wire form to POST /api/contact, loading + error states |
| `src/components/Contact/Contact.module.scss` | Modify | Add `.error` and `.btn:disabled` styles |

---

## Task 1: Enable standalone output in Next.js config

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: Add `output: 'standalone'` to next.config.ts**

Replace the full file content with:

```typescript
import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'tsx'],
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
    prependData: `@import 'mixins.scss';`,
  },
};

export default nextConfig;
```

- [ ] **Step 2: Verify the build produces a standalone directory**

Run: `npm run build`

Expected: build succeeds and `.next/standalone/server.js` exists.

```powershell
Test-Path .next/standalone/server.js
# Expected output: True
```

- [ ] **Step 3: Commit**

```bash
git add next.config.ts
git commit -m "feat(deploy): enable next.js standalone output"
```

---

## Task 2: Replace root Dockerfile with multi-stage standalone build

**Files:**
- Replace: `dockerfile`

- [ ] **Step 1: Replace dockerfile with the multi-stage standalone build**

Overwrite `dockerfile` (root of repo) with:

```dockerfile
# ── Build stage ────────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ── Runtime stage ─────────────────────────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static     ./.next/static
COPY --from=builder /app/public           ./public

EXPOSE 3000

CMD ["node", "server.js"]
```

- [ ] **Step 2: Verify the Docker image builds**

Run: `docker build -t portfolio-frontend-test .`

Expected: build completes with no errors, final image based on `node:20-alpine`.

- [ ] **Step 3: Clean up test image**

```bash
docker rmi portfolio-frontend-test
```

- [ ] **Step 4: Commit**

```bash
git add dockerfile
git commit -m "feat(deploy): replace dockerfile with multi-stage standalone build"
```

---

## Task 3: Create the Node.js backend

**Files:**
- Create: `backend/package.json`
- Create: `backend/src/app.js`
- Create: `backend/src/index.js`
- Create: `backend/tests/contact.test.js`
- Create: `backend/Dockerfile`

- [ ] **Step 1: Create backend directory structure**

```bash
mkdir -p backend/src backend/tests
```

- [ ] **Step 2: Create backend/package.json**

```json
{
  "name": "portfolio-backend",
  "version": "1.0.0",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "test": "jest"
  },
  "jest": {
    "testEnvironment": "node"
  },
  "dependencies": {
    "express": "^4.21.2",
    "express-rate-limit": "^7.5.0",
    "nodemailer": "^6.9.16",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "supertest": "^7.0.0"
  }
}
```

- [ ] **Step 3: Install backend dependencies**

```bash
cd backend && npm install
```

Expected: `node_modules/` created, `package-lock.json` generated.

- [ ] **Step 4: Write the failing tests first**

Create `backend/tests/contact.test.js`:

```javascript
jest.mock('nodemailer', () => ({
  createTransport: () => ({ sendMail: jest.fn().mockResolvedValue({}) }),
}));

process.env.GMAIL_USER = 'test@gmail.com';
process.env.GMAIL_APP_PASSWORD = 'test-password';
process.env.CONTACT_RECIPIENT = 'recipient@gmail.com';

const request = require('supertest');
const app = require('../src/app');

describe('POST /api/contact', () => {
  it('returns 200 for valid input', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ name: 'Alice', email: 'alice@example.com', message: 'Hello!' });
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });

  it('returns 400 when name is missing', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ email: 'alice@example.com', message: 'Hello!' });
    expect(res.status).toBe(400);
  });

  it('returns 400 for invalid email', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ name: 'Alice', email: 'not-an-email', message: 'Hello!' });
    expect(res.status).toBe(400);
  });

  it('returns 400 when message is missing', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ name: 'Alice', email: 'alice@example.com' });
    expect(res.status).toBe(400);
  });
});
```

- [ ] **Step 5: Run tests — verify they fail**

```bash
cd backend && npm test
```

Expected: FAIL — `Cannot find module '../src/app'`

- [ ] **Step 6: Create backend/src/app.js**

```javascript
const express = require('express');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const { z } = require('zod');

const app = express();
app.use(express.json());

const contactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  subject: z.string().max(300).optional().default(''),
  message: z.string().min(1).max(2000),
});

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
});

app.post('/api/contact', limiter, async (req, res) => {
  const result = contactSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const { name, email, subject, message } = result.data;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_RECIPIENT,
      replyTo: email,
      subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] Message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    res.status(200).json({ ok: true });
  } catch {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

module.exports = app;
```

- [ ] **Step 7: Create backend/src/index.js**

```javascript
const app = require('./app');

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`backend listening on :${PORT}`));
```

- [ ] **Step 8: Run tests — verify they pass**

```bash
cd backend && npm test
```

Expected: 4 tests pass, 0 failures.

- [ ] **Step 9: Create backend/Dockerfile**

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY src/ ./src/

EXPOSE 3001

CMD ["node", "src/index.js"]
```

- [ ] **Step 10: Add backend/node_modules to .gitignore**

Open `.gitignore` at the repo root and add this line at the end:

```
/backend/node_modules
```

- [ ] **Step 11: Commit**

```bash
git add backend/ .gitignore
git commit -m "feat(deploy): add node.js contact form backend"
```

---

## Task 4: Create nginx config

**Files:**
- Create: `nginx/nginx.conf`

- [ ] **Step 1: Create the nginx directory and config**

```bash
mkdir -p nginx
```

Create `nginx/nginx.conf`:

```nginx
limit_req_zone $binary_remote_addr zone=contact_limit:10m rate=5r/m;

server {
    listen 80;
    server_name _;

    location = /api/contact {
        limit_req        zone=contact_limit burst=2 nodelay;
        limit_req_status 429;
        proxy_pass       http://backend:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /api/ {
        proxy_pass       http://backend:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location / {
        proxy_pass         http://frontend:3000;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_http_version 1.1;
    }
}
```

- [ ] **Step 2: Commit**

```bash
git add nginx/nginx.conf
git commit -m "feat(deploy): add nginx reverse proxy config"
```

---

## Task 5: Replace docker-compose.yml

**Files:**
- Replace: `docker-compose.yml`

- [ ] **Step 1: Overwrite docker-compose.yml**

```yaml
services:
  frontend:
    build:
      context: .
      dockerfile: dockerfile
    networks:
      - portfolio_net
    restart: unless-stopped

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    environment:
      GMAIL_USER: ${GMAIL_USER}
      GMAIL_APP_PASSWORD: ${GMAIL_APP_PASSWORD}
      CONTACT_RECIPIENT: ${CONTACT_RECIPIENT}
    networks:
      - portfolio_net
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/conf.d/default.conf:ro
    depends_on:
      - frontend
      - backend
    networks:
      - portfolio_net
    restart: unless-stopped

  cloudflared:
    image: cloudflare/cloudflared:latest
    command: tunnel --no-autoupdate run --token ${TUNNEL_TOKEN}
    environment:
      TUNNEL_TOKEN: ${TUNNEL_TOKEN}
    depends_on:
      - nginx
    networks:
      - portfolio_net
    restart: unless-stopped

networks:
  portfolio_net:
    driver: bridge
```

- [ ] **Step 2: Commit**

```bash
git add docker-compose.yml
git commit -m "feat(deploy): replace docker-compose with 4-service stack"
```

---

## Task 6: Create .env.example

**Files:**
- Create: `.env.example`

- [ ] **Step 1: Create .env.example**

```env
# Backend — email sending
GMAIL_USER=your@gmail.com
GMAIL_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
CONTACT_RECIPIENT=your@inbox.com

# Cloudflare Tunnel — copy token from Zero Trust dashboard
TUNNEL_TOKEN=eyJ...
```

- [ ] **Step 2: Verify .env is in .gitignore (already there — just confirm)**

```bash
grep "^\.env$" .gitignore
```

Expected: `.env`

- [ ] **Step 3: Commit**

```bash
git add .env.example
git commit -m "chore(deploy): add .env.example"
```

---

## Task 7: Wire the Contact form to POST /api/contact

**Files:**
- Modify: `src/components/Contact/index.tsx`
- Modify: `src/components/Contact/Contact.module.scss`

- [ ] **Step 1: Add `.error` and `.btn:disabled` styles to Contact.module.scss**

Add these rules at the end of `Contact.module.scss`:

```scss
.error {
  font-size: var(--fs-sm);
  color: rgba(248, 113, 113, 0.8);
  padding: 0.5rem 0;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
```

- [ ] **Step 2: Replace Contact/index.tsx with the wired version**

```tsx
import { FormEvent, useState } from 'react';
import styles from './Contact.module.scss';

function LinkedInIcon() {
  return (
    <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const body = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      subject: (form.elements.namedItem('subject') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error('server error');
      setSent(true);
    } catch {
      setError('Something went wrong. Please try again or reach me on LinkedIn.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.glow} aria-hidden="true" />
          <h2 className={styles.heading}>
            Got a project<br />in mind?{' '}
            <span className={styles.headingGrad}>Let&apos;s talk.</span>
          </h2>
          <p className={styles.sub}>
            Available for freelance projects, full-time roles, and anything interesting in
            between. Drop me a line and I&apos;ll get back to you quickly.
          </p>

          {sent ? (
            <p className={styles.thanks}>Message sent — I&apos;ll be in touch soon!</p>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.field}>
                <label htmlFor="ct-name">Name</label>
                <input id="ct-name" name="name" type="text" placeholder="Your name" required />
              </div>
              <div className={styles.field}>
                <label htmlFor="ct-email">Email</label>
                <input id="ct-email" name="email" type="email" placeholder="your@email.com" required />
              </div>
              <div className={styles.field}>
                <label htmlFor="ct-subject">Subject</label>
                <input id="ct-subject" name="subject" type="text" placeholder="What's this about?" />
              </div>
              <div className={styles.field}>
                <label htmlFor="ct-message">Message</label>
                <textarea id="ct-message" name="message" placeholder="Tell me about your project..." required />
              </div>
              {error && <p className={styles.error}>{error}</p>}
              <button type="submit" className={styles.btn} disabled={loading}>
                {loading ? 'Sending…' : 'Send message →'}
              </button>
            </form>
          )}
        </div>

        <div className={styles.linkedin}>
          <span className={styles.linkedinCatch}>Looking for a frontend engineer?</span>
          <a
            href="https://www.linkedin.com/in/demange-aymeric/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkedinBtn}
          >
            <LinkedInIcon />
            Connect on LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify TypeScript compiles cleanly**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/Contact/index.tsx src/components/Contact/Contact.module.scss
git commit -m "feat(contact): wire form to POST /api/contact with loading and error states"
```

---

## Task 8: Full stack smoke test (on the LXC)

These steps run on the Proxmox LXC after cloning the repo.

- [ ] **Step 1: Clone the repo**

```bash
git clone https://github.com/aymericshini/portfolio.git /opt/portfolio
cd /opt/portfolio
```

- [ ] **Step 2: Create .env from .env.example**

```bash
cp .env.example .env
# Edit .env with real values:
# GMAIL_USER, GMAIL_APP_PASSWORD, CONTACT_RECIPIENT, TUNNEL_TOKEN
nano .env
```

- [ ] **Step 3: Build and start all services**

```bash
docker compose up -d --build
```

Expected: all 4 containers start — `portfolio-frontend-1`, `portfolio-backend-1`, `portfolio-nginx-1`, `portfolio-cloudflared-1`.

- [ ] **Step 4: Verify each service is healthy**

```bash
docker compose ps
```

Expected: all services show `running`.

```bash
docker compose logs cloudflared --tail 20
```

Expected: log line containing `Registered tunnel connection` — confirms tunnel is active.

- [ ] **Step 5: Test the contact endpoint directly on the LXC**

```bash
curl -s -X POST http://localhost/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello from LXC"}' | jq
```

Expected: `{ "ok": true }` — and an email arrives in your inbox.

- [ ] **Step 6: Verify aymeric.app loads in a browser**

Open `https://aymeric.app` in a browser. Expected: portfolio loads over HTTPS (Cloudflare cert). Submit the contact form and verify the email arrives.
