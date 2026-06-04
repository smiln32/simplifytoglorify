import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import PageNav from '@/components/PageNav'

export default function AdminDownloads() {
  const [pin, setPin] = useState('')
  const [authed, setAuthed] = useState(false)
  const [productFile, setProductFile] = useState('')
  const [productName, setProductName] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [codes, setCodes] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState<string | null>(null)

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault()
    if (pin.trim()) setAuthed(true)
  }

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setCodes([])

    try {
      const res = await fetch('/.netlify/functions/generate-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin, productFile, productName, quantity }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong.')
        if (res.status === 401) {
          setAuthed(false)
          setPin('')
        }
      } else {
        setCodes(data.codes)
      }
    } catch {
      setError('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const copyAll = () => {
    navigator.clipboard.writeText(codes.join('\n'))
    setCopied('all')
    setTimeout(() => setCopied(null), 2000)
  }

  const copyOne = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopied(code)
    setTimeout(() => setCopied(null), 2000)
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="grain-overlay" />
        <form onSubmit={handleAuth} className="bg-white p-8 rounded-card-sm card-shadow w-80">
          <h1 className="font-display text-2xl text-charcoal mb-6 text-center">Admin</h1>
          <Input
            type="password"
            placeholder="PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full mb-4"
            autoFocus
          />
          <Button type="submit" className="w-full bg-slate-blue text-white rounded-full py-5">
            Enter
          </Button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ivory">
      <div className="grain-overlay" />
      <PageNav />

      <main className="pt-32 pb-16">
        <div className="max-w-lg mx-auto px-6">
          <h1 className="font-display text-3xl text-charcoal mb-2">Generate Download Codes</h1>
          <p className="text-muted-slate italic mb-8">Each code is one-time use.</p>

          <div className="bg-white rounded-card-sm p-8 card-shadow mb-8">
            <form onSubmit={handleGenerate} className="space-y-5">
              <div>
                <label className="text-sm text-muted-slate mb-2 block">
                  PDF filename (as uploaded to Netlify Blobs)
                </label>
                <Input
                  placeholder="anxiety-calm-the-body.pdf"
                  value={productFile}
                  onChange={(e) => setProductFile(e.target.value)}
                  required
                  className="bg-ivory"
                />
              </div>
              <div>
                <label className="text-sm text-muted-slate mb-2 block">Product name (shown as download filename)</label>
                <Input
                  placeholder="Anxiety — Calm the Body Journal"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                  className="bg-ivory"
                />
              </div>
              <div>
                <label className="text-sm text-muted-slate mb-2 block">Number of codes to generate</label>
                <Input
                  type="number"
                  min={1}
                  max={100}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="bg-ivory"
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-blue hover:bg-slate-blue/90 text-white rounded-full py-6 disabled:opacity-70"
              >
                {loading ? 'Generating…' : `Generate ${quantity === 1 ? 'code' : `${quantity} codes`}`}
              </Button>
            </form>
          </div>

          {codes.length > 0 && (
            <div className="bg-white rounded-card-sm p-8 card-shadow">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl text-charcoal">
                  {codes.length === 1 ? '1 Code' : `${codes.length} Codes`}
                </h2>
                <Button variant="outline" size="sm" onClick={copyAll} className="rounded-full gap-1.5">
                  {copied === 'all' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied === 'all' ? 'Copied!' : 'Copy all'}
                </Button>
              </div>
              <div className="space-y-2">
                {codes.map((code) => (
                  <div
                    key={code}
                    className="flex items-center justify-between bg-ivory rounded-xl px-4 py-3"
                  >
                    <span className="font-mono text-charcoal tracking-widest">{code}</span>
                    <button
                      onClick={() => copyOne(code)}
                      className="text-muted-slate hover:text-slate-blue transition-colors"
                    >
                      {copied === code ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
