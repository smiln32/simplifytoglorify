import { getStore } from '@netlify/blobs'

const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

function generateCode(): string {
  let code = ''
  for (let i = 0; i < 8; i++) {
    if (i === 4) code += '-'
    code += CHARS[Math.floor(Math.random() * CHARS.length)]
  }
  return code
}

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  let body: { pin?: string; productFile?: string; productName?: string; quantity?: number }
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const { pin, productFile, productName, quantity = 1 } = body

  if (!process.env.ADMIN_PIN || pin !== process.env.ADMIN_PIN) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  if (!productFile || !productName) {
    return new Response(JSON.stringify({ error: 'productFile and productName are required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
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

  return new Response(JSON.stringify({ codes }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
