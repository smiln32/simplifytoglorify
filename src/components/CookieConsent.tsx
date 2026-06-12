import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const CLARITY_ID = 'x0x9nw27b1'
const STORAGE_KEY = 'stg-cookie-consent'

type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[] }

declare global {
  interface Window {
    clarity?: ClarityFn
  }
}

// Inject the Microsoft Clarity tag. Mirrors Clarity's official bootstrap: a
// queueing stub captures calls until the real script loads and replays them.
function loadClarity() {
  if (window.clarity) return
  const queue: unknown[] = []
  const stub = ((...args: unknown[]) => {
    queue.push(args)
  }) as ClarityFn
  stub.q = queue
  window.clarity = stub

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.clarity.ms/tag/${CLARITY_ID}`
  document.head.appendChild(script)
}

// Discreet bottom notice bar. Implied consent: analytics loads on page load
// unless the visitor has previously declined, and the bar simply informs and
// offers a choice. A stored choice keeps the bar from reappearing.
export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const choice = localStorage.getItem(STORAGE_KEY)
    if (choice === 'declined') return
    loadClarity()
    if (!choice) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, 'declined')
    window.clarity?.('stop')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie notice"
      className="fixed bottom-0 inset-x-0 z-[60] bg-slate-blue/95 backdrop-blur-sm border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
        <p className="text-xs sm:text-sm text-white/90 leading-relaxed flex-1 text-center sm:text-left">
          We use cookies for analytics to understand how visitors use the site and improve it. See our{' '}
          <Link to="/privacy" className="underline hover:text-white">Privacy Policy</Link>.
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={decline}
            className="text-xs sm:text-sm text-white/80 hover:text-white px-3 py-1.5 cursor-pointer transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="text-xs sm:text-sm font-semibold bg-white text-slate-blue px-5 py-1.5 rounded-full hover:bg-white/90 cursor-pointer transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
