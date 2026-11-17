# Deploying the portfolio

The site is a React (Vite) app. `server.js` is a small Express server that serves the production build from `dist/`. There is no database, no API, and no environment secrets.

## Requirements
- Node.js 20 or newer (`node -v`)
- Git

## First deploy
```bash
git clone <repo-url> portfolio
cd portfolio
npm ci            # installs everything, including build tools
npm run build     # creates dist/
npm start         # serves on http://0.0.0.0:3000
```

Check it: `curl http://localhost:3000/health` should print `{"status":"ok",...}`.

## Configuration
| Variable | Default | Purpose |
|---|---|---|
| `PORT` | `3000` | Port to listen on |
| `HOST` | `0.0.0.0` | Interface to bind (use `127.0.0.1` when behind nginx) |

Example: `PORT=8080 npm start`

## Keep it running with PM2
```bash
npm i -g pm2
PORT=3000 pm2 start server.js --name portfolio
pm2 save
pm2 startup        # follow the printed command so it restarts after a reboot
```

## Updating to a new version
```bash
cd portfolio
git pull
npm ci
npm run build
pm2 reload portfolio     # zero-downtime restart
```

## Optional: nginx in front (domain + HTTPS)
```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
Then add HTTPS with `sudo certbot --nginx -d example.com`. When using nginx, start the app with `HOST=127.0.0.1` so port 3000 is not exposed directly.

## What the server does
- Serves `dist/assets/*` with a one-year immutable cache (file names are content-hashed).
- Serves `index.html` with `no-cache`, so new deploys appear immediately.
- Gzip compression, basic security headers, `/health` endpoint.
- Falls back to `index.html` for unknown paths (single-page app).
- Shuts down gracefully on `SIGINT`/`SIGTERM` (PM2 reloads, Docker stops).
