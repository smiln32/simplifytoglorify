import Stripe from 'stripe'
import { getStore } from '@netlify/blobs'
import { Resend } from 'resend'

const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

function generateCode(): string {
  let code = ''
  for (let i = 0; i < 8; i++) {
    if (i === 4) code += '-'
    code += CHARS[Math.floor(Math.random() * CHARS.length)]
  }
  return code
}

function pdfFilename(categoryName: string, productType: string): string {
  const categorySlug = categoryName.toLowerCase().replace(/\s+/g, '-')
  const typeSlug = productType.toLowerCase().replace(/\s+/g, '-')
  return `${categorySlug}-${typeSlug}.pdf`
}

function productLabel(categoryName: string, productType: string): string {
  if (productType === 'Journal') return `The ${categoryName} Journal`
  if (productType === 'Devotional') return `The ${categoryName} Devotional`
  return productType
}

export default async (req: Request) => {
  const sig = req.headers.get('stripe-signature')
  if (!sig) {
    return new Response('Missing stripe-signature header', { status: 400 })
  }

  // Must read raw body before any parsing for signature verification
  const rawBody = await req.text()

  let event: Stripe.Event
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return new Response('Webhook signature verification failed', { status: 400 })
  }

  // Only act on completed payments
  if (event.type !== 'checkout.session.completed') {
    return new Response('OK', { status: 200 })
  }

  const session = event.data.object as Stripe.Checkout.Session
  const buyerEmail = session.customer_details?.email
  const { productType, categoryName } = session.metadata ?? {}

  if (!buyerEmail || !productType || !categoryName) {
    console.error('Missing fulfillment data', { buyerEmail, productType, categoryName })
    return new Response('Missing fulfillment data', { status: 400 })
  }

  // Generate a unique one-time download code
  const tokenStore = getStore({ name: 'download-tokens', consistency: 'strong' })
  let code = generateCode()
  while (await tokenStore.get(code)) {
    code = generateCode()
  }

  const productFile = pdfFilename(categoryName, productType)
  const productName = productLabel(categoryName, productType)

  await tokenStore.setJSON(code, {
    productFile,
    productName,
    used: false,
    createdAt: new Date().toISOString(),
    buyerEmail,
  })

  // Send download code to buyer
  const resend = new Resend(process.env.RESEND_API_KEY!)
  const downloadUrl = 'https://simplifytoglorify.com/download'

  await resend.emails.send({
    from: 'Simplify to Glorify <hello@simplifytoglorify.com>',
    to: buyerEmail,
    subject: `Your download is ready — ${productName}`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #2e2e2e;">
        <p style="font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #8e8c86; margin-bottom: 24px;">
          Simplify to Glorify
        </p>

        <h1 style="font-size: 28px; font-weight: 500; line-height: 1.2; margin: 0 0 16px;">
          Your download is ready.
        </h1>

        <p style="font-size: 16px; color: #5d5b57; line-height: 1.6; font-style: italic; margin-bottom: 32px;">
          Thank you for purchasing <strong style="font-style: normal; color: #2e2e2e;">${productName}</strong>.
          Your one-time download code is below.
        </p>

        <div style="background: #f3f1ec; border: 1px solid #e3dfd6; border-radius: 8px; padding: 24px; text-align: center; margin-bottom: 32px;">
          <p style="font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: #8e8c86; margin: 0 0 10px;">
            Your download code
          </p>
          <p style="font-family: monospace; font-size: 28px; font-weight: 700; letter-spacing: 0.12em; color: #2e2e2e; margin: 0;">
            ${code}
          </p>
        </div>

        <div style="text-align: center; margin-bottom: 32px;">
          <a href="${downloadUrl}"
             style="display: inline-block; background: #a4b9c4; color: #ffffff; text-decoration: none;
                    font-size: 12px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase;
                    padding: 14px 32px; border-radius: 8px;">
            Go to download page
          </a>
        </div>

        <p style="font-size: 14px; color: #8e8c86; line-height: 1.6; border-top: 1px solid #e3dfd6; padding-top: 24px;">
          This code works once. Visit <a href="${downloadUrl}" style="color: #a4b9c4;">${downloadUrl}</a>,
          enter your code, and your PDF will download immediately.
          If you have any trouble, reply to this email.
        </p>
      </div>
    `,
  })

  console.log(`Fulfilled order: ${productName} → ${buyerEmail} (code: ${code})`)
  return new Response('OK', { status: 200 })
}
