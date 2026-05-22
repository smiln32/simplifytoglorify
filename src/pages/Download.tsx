import { useState } from 'react'
import { Download as DownloadIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import PageNav from '@/components/PageNav'
import Breadcrumbs from '@/components/Breadcrumbs'

export default function Download() {
  const [code, setCode] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!code.trim()) return
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/.netlify/functions/redeem-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.trim() }),
      })

      if (!res.ok) {
        const data = await res.json()
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'journal.pdf'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      setStatus('idle')
      setCode('')
    } catch {
      setErrorMsg('Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-ivory">
      <div className="grain-overlay" />
      <PageNav />

      <main className="pt-32 lg:pt-36 pb-16 lg:pb-24">
        <div className="max-w-lg mx-auto px-6">
          <div className="mb-6"><Breadcrumbs /></div>

          <div className="text-center mb-10">
            <p className="text-label text-slate-blue mb-4">Your Purchase</p>
            <h1 className="font-display text-3xl sm:text-4xl text-charcoal mb-4">
              Download your journal
            </h1>
            <p className="text-muted-slate leading-relaxed">
              Enter the download code from your instructions sheet.
            </p>
          </div>

          <div className="bg-white rounded-[20px] p-8 card-shadow">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="XXXX-XXXX"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="w-full px-6 py-6 rounded-xl text-center text-lg tracking-widest font-mono border-charcoal/10 bg-ivory"
                maxLength={9}
                autoComplete="off"
              />
              {status === 'error' && (
                <p className="text-sm text-red-500 text-center">{errorMsg}</p>
              )}
              <Button
                type="submit"
                disabled={status === 'loading' || !code.trim()}
                className="w-full bg-slate-blue hover:bg-slate-blue/90 text-white px-8 py-6 text-base rounded-full disabled:opacity-70"
              >
                <DownloadIcon className="w-4 h-4 mr-2" />
                {status === 'loading' ? 'Retrieving…' : 'Download my journal'}
              </Button>
            </form>
          </div>

          <p className="text-sm text-muted-slate text-center mt-6 leading-relaxed">
            Each code works once. Questions?{' '}
            <a href="/#contact" className="text-slate-blue hover:underline">
              Contact us
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  )
}
