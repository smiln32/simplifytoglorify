import Stripe from 'stripe'

// Prices are authoritative here — never trust the client for amounts
const PRICES: Record<string, number> = {
  'Journal': 2500,
  'Scripture Cards': 500,
  'Prayer Cards': 500,
  '7-Day Reset': 700,
  'Devotional': 1500,
}

const DESCRIPTIONS: Record<string, string> = {
  'Journal': 'Guided prompts, scripture, and room to write through this season.',
  'Scripture Cards': 'Palm-sized verses for the table, the dashboard, the bedside.',
  'Prayer Cards': 'Written prayers for the mornings the words will not come.',
  '7-Day Reset': 'A printable week of short readings to begin again.',
  'Devotional': 'A thirty-day reading for tired mornings and slow evenings.',
}

function buildProductName(categoryName: string, productType: string): string {
  if (productType === 'Journal') return `The ${categoryName} Journal`
  if (productType === 'Devotional') return `The ${categoryName} Devotional`
  return productType
}

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  let body: { productType?: string; categoryName?: string }
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const { productType, categoryName } = body

  if (!productType || !categoryName) {
    return new Response(JSON.stringify({ error: 'productType and categoryName are required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const unitAmount = PRICES[productType]
  if (!unitAmount) {
    return new Response(JSON.stringify({ error: 'Invalid product type' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  const origin = req.headers.get('origin') || 'https://simplifytoglorify.com'

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: buildProductName(categoryName, productType),
              description: DESCRIPTIONS[productType],
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
      metadata: {
        productType,
        categoryName,
      },
    })

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('Stripe error:', err)
    return new Response(JSON.stringify({ error: 'Failed to create checkout session' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
