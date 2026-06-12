import { getStore } from '@netlify/blobs'
import { randomInt, createHash, timingSafeEqual } from 'node:crypto'

const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

// Brute-force protection for the admin PIN.
const MAX_ATTEMPTS = 5
const LOCKOUT_MS = 15 * 60 * 1000 // 15 minutes

// Codes grant access to paid downloads, so use a CSPRNG, not Math.random().
function generateCode(): string {
  let code = ''
  for (let i = 0; i < 8; i++) {
    if (i === 4) code += '-'
    code += CHARS[randomInt(CHARS.length)]
  }
  return code
}

// Constant-time comparison over fixed-length hashes so neither the PIN value
// nor its length leaks through timing.
function pinMatches(provided: string, expected: string): boolean {
  const a = createHash('sha256').update(provided).digest()
  const b = createHash('sha256').update(expected).digest()
  return timingSafeEqual(a, b)
}

function clientIp(req: Request): string {
  return (
    req.headers.get('x-nf-client-connection-ip') ||
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    'unknown'
  )
}

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

interface ThrottleRecord {
  count: number
  lockUntil?: number
}

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  let body: { pin?: string; productFile?: string; productName?: string; quantity?: number }
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Invalid request' }, 400)
  }

  const { pin, productFile, productName, quantity = 1 } = body

  if (!process.env.ADMIN_PIN) {
    console.error('ADMIN_PIN is not configured')
    return json({ error: 'Server is not configured' }, 500)
  }

  // ── Rate limiting / lockout (per IP) ────────────────────────────────────────
  const throttle = getStore({ name: 'admin-throttle', consistency: 'strong' })
  const ipKey = `pin:${clientIp(req)}`
  const record = (await throttle.get(ipKey, { type: 'json' })) as ThrottleRecord | null

  if (record?.lockUntil && record.lockUntil > Date.now()) {
    const retryMins = Math.ceil((record.lockUntil - Date.now()) / 60000)
    return json({ error: `Too many attempts. Try again in ${retryMins} minute(s).` }, 429)
  }

  // ── Authenticate ────────────────────────────────────────────────────────────
  if (typeof pin !== 'string' || !pinMatches(pin, process.env.ADMIN_PIN)) {
    const count = (record?.count ?? 0) + 1
    const next: ThrottleRecord =
      count >= MAX_ATTEMPTS ? { count: 0, lockUntil: Date.now() + LOCKOUT_MS } : { count }
    await throttle.setJSON(ipKey, next)
    return json({ error: 'Unauthorized' }, 401)
  }

  // Success — clear any failed-attempt history for this IP.
  if (record) await throttle.delete(ipKey)

  if (!productFile || !productName) {
    return json({ error: 'productFile and productName are required' }, 400)
  }

  const tokenStore = getStore({ name: 'download-tokens', consistency: 'strong' })
  const codes: string[] = []
  const count = Math.min(Math.max(1, quantity), 100)

  for (let i = 0; i < count; i++) {
    let code = generateCode()
    while (await tokenStore.get(code)) {
      code = generateCode()
    }
    await tokenStore.setJSON(code, {
      productFile,
      productName,
      used: false,
      createdAt: new Date().toISOString(),
    })
    codes.push(code)
  }

  return json({ codes }, 200)
}
