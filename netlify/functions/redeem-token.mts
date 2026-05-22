import { getStore } from '@netlify/blobs'

interface TokenData {
  productFile: string
  productName: string
  used: boolean
  createdAt: string
  usedAt?: string
}

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  let code: string
  try {
    const body = await req.json()
    code = (body.code || '').trim().toUpperCase()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  if (!code) {
    return new Response(JSON.stringify({ error: 'Code is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const tokenStore = getStore({ name: 'download-tokens', consistency: 'strong' })
  const tokenData = (await tokenStore.get(code, { type: 'json' })) as TokenData | null

  if (!tokenData) {
    return new Response(JSON.stringify({ error: 'Invalid code. Please check and try again.' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  if (tokenData.used) {
    return new Response(
      JSON.stringify({ error: 'This code has already been used. Please contact support if this is a mistake.' }),
      { status: 410, headers: { 'Content-Type': 'application/json' } }
    )
  }

  // Mark as used before serving to prevent double-use
  await tokenStore.setJSON(code, {
    ...tokenData,
    used: true,
    usedAt: new Date().toISOString(),
  })

  const pdfStore = getStore({ name: 'product-pdfs', consistency: 'strong' })
  const pdfBlob = await pdfStore.get(tokenData.productFile, { type: 'blob' })

  if (!pdfBlob) {
    // Unmark so they can try again after we fix the issue
    await tokenStore.setJSON(code, { ...tokenData, used: false })
    return new Response(
      JSON.stringify({ error: 'Product file not found. Please contact support.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const safeName = tokenData.productName.replace(/[^a-z0-9\- ]/gi, '').trim() || 'journal'

  return new Response(pdfBlob, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${safeName}.pdf"`,
    },
  })
}
