import { getStore } from '@netlify/blobs'

interface SingleTokenData {
  productFile: string
  productName: string
  used: boolean
  createdAt: string
  usedAt?: string
}

interface BundleFileEntry {
  filename: string
  label: string
  downloaded: boolean
}

interface BundleTokenData {
  files: BundleFileEntry[]
  productName: string
  isBundle: true
  used: boolean
  createdAt: string
  buyerEmail: string
}

type TokenData = SingleTokenData | BundleTokenData

function isBundle(token: TokenData): token is BundleTokenData {
  return 'files' in token
}

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  let code: string
  let filename: string | undefined
  try {
    const body = await req.json()
    code = (body.code || '').trim().toUpperCase()
    filename = body.filename || undefined
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

  // ── Bundle token ──────────────────────────────────────────────────────────
  if (isBundle(tokenData)) {
    // No filename = initial lookup, return the file list
    if (!filename) {
      return new Response(
        JSON.stringify({
          isBundle: true,
          productName: tokenData.productName,
          files: tokenData.files,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Filename provided = download a specific file
    const fileEntry = tokenData.files.find((f) => f.filename === filename)
    if (!fileEntry) {
      return new Response(JSON.stringify({ error: 'File not found.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const pdfStore = getStore({ name: 'product-pdfs', consistency: 'strong' })
    const pdfBlob = await pdfStore.get(filename, { type: 'blob' })

    if (!pdfBlob) {
      return new Response(
        JSON.stringify({ error: 'Product file not found. Please contact support.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Mark this file as downloaded; mark token used when all are done
    const updatedFiles = tokenData.files.map((f) =>
      f.filename === filename ? { ...f, downloaded: true } : f
    )
    const allDownloaded = updatedFiles.every((f) => f.downloaded)
    await tokenStore.setJSON(code, {
      ...tokenData,
      files: updatedFiles,
      used: allDownloaded,
    })

    const safeLabel = fileEntry.label.replace(/[^a-z0-9\- ]/gi, '').trim()
    return new Response(pdfBlob, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${safeLabel}.pdf"`,
      },
    })
  }

  // ── Single-file token ─────────────────────────────────────────────────────
  if (tokenData.used) {
    return new Response(
      JSON.stringify({ error: 'This code has already been used. Please contact support if this is a mistake.' }),
      { status: 410, headers: { 'Content-Type': 'application/json' } }
    )
  }

  await tokenStore.setJSON(code, {
    ...tokenData,
    used: true,
    usedAt: new Date().toISOString(),
  })

  const pdfStore = getStore({ name: 'product-pdfs', consistency: 'strong' })
  const pdfBlob = await pdfStore.get(tokenData.productFile, { type: 'blob' })

  if (!pdfBlob) {
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
