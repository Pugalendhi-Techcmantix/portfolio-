// Production server: serves the built React app from ./dist.
// Usage: npm run build && npm start   (PORT and HOST can be set via environment variables)
import compression from 'compression'
import express from 'express'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST = path.join(__dirname, 'dist')
const INDEX = path.join(DIST, 'index.html')
const PORT = Number(process.env.PORT) || 3000
const HOST = process.env.HOST || '0.0.0.0'

if (!existsSync(INDEX)) {
  console.error('dist/index.html not found. Run "npm run build" first.')
  process.exit(1)
}

const app = express()
app.disable('x-powered-by')
app.set('trust proxy', true) // correct client IPs when running behind nginx / a load balancer

app.use(compression())

app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'SAMEORIGIN')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  next()
})

// Health check for uptime monitors and load balancers.
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', uptime: Math.round(process.uptime()) })
})

// Hashed build files (dist/assets/*) never change, so browsers may cache them for a year.
app.use(
  '/assets',
  express.static(path.join(DIST, 'assets'), { immutable: true, maxAge: '1y', fallthrough: false }),
)

// Everything else in dist (favicon etc.). index.html is always revalidated so new deploys show up immediately.
app.use(
  express.static(DIST, {
    index: false,
    maxAge: '1h',
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.html')) res.setHeader('Cache-Control', 'no-cache')
    },
  }),
)

// Single-page app: any other GET request gets index.html.
app.use((req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') return next()
  res.setHeader('Cache-Control', 'no-cache')
  res.sendFile(INDEX)
})

app.use((err, _req, res, _next) => {
  const status = err.status || err.statusCode || 500
  if (status >= 500) console.error(err)
  res.status(status).send(status === 404 ? 'Not found' : 'Something went wrong')
})

const server = app.listen(PORT, HOST, () => {
  console.log(`Portfolio running at http://${HOST === '0.0.0.0' ? 'localhost' : HOST}:${PORT}`)
})

// Finish in-flight requests before exiting (pm2 restart, docker stop, Ctrl+C).
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    console.log(`${signal} received, shutting down…`)
    server.close(() => process.exit(0))
    setTimeout(() => process.exit(1), 10_000).unref()
  })
}
