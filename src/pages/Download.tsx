import { useState } from 'react'
import { Download as DownloadIcon, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import PageNav from '@/components/PageNav'
import Footer from '@/components/sections/Footer'

interface BundleFile {
  filename: string
  label: string
  downloaded: boolean
}

interface BundleData {
  productName: string
  files: BundleFile[]
  code: string
}

async function triggerDownload(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = name
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export default function Download() {
  const [code, setCode] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [bundle, setBundle] = useState<BundleData | null>(null)
  const [downloadingFile, setDownloadingFile] = useState<string | null>(null)

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
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

      const contentType = res.headers.get('content-type') || ''

      if (!res.ok) {
        const data = await res.json()
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      if (contentType.includes('application/json')) {
        // Bundle — show the file list
        const data = await res.json()
        setBundle({ productName: data.productName, files: data.files, code: code.trim() })
        setStatus('idle')
      } else {
        // Single file — download immediately
        const blob = await res.blob()
        await triggerDownload(blob, 'journal.pdf')
        setStatus('idle')
        setCode('')
      }
    } catch {
      setErrorMsg('Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  const handleFileDownload = async (file: BundleFile) => {
    if (!bundle || downloadingFile) return
    setDownloadingFile(file.filename)

    try {
      const res = await fetch('/.netlify/functions/redeem-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: bundle.code, filename: file.filename }),
      })

      if (!res.ok) {
        const data = await res.json()
        toast.error(data.error || 'Something went wrong. Please try again.')
        return
      }

      const blob = await res.blob()
      await triggerDownload(blob, `${file.label}.pdf`)

      // Update local downloaded state
      setBundle((prev) =>
        prev
          ? {
              ...prev,
              files: prev.files.map((f) =>
                f.filename === file.filename ? { ...f, downloaded: true } : f
              ),
            }
          : prev
      )
    } catch {
      alert('Something went wrong. Please try again.')
    } finally {
      setDownloadingFile(null)
    }
  }

  // ── Bundle view ────────────────────────────────────────────────────────────
  if (bundle) {
    return (
      <div className="min-h-screen bg-ivory">
        <div className="grain-overlay" />
        <PageNav />

        <main className="pt-20 lg:pt-24 pb-16 lg:pb-24">
          <div className="max-w-lg mx-auto px-6">

            <div className="text-center mb-10">
              <p className="font-display text-xl text-slate-blue mb-4">Your Collection</p>
              <h1 className="font-display text-3xl sm:text-4xl text-charcoal mb-4">
                {bundle.productName}
              </h1>
              <p className="text-muted-slate leading-relaxed">
                Download each product separately, whenever you are ready.
              </p>
            </div>

            <div className="bg-white rounded-card-sm p-8 card-shadow space-y-3">
              {bundle.files.map((file) => (
                <div
                  key={file.filename}
                  className="flex items-center justify-between gap-4 py-3 border-b border-charcoal/8 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    {file.downloaded ? (
                      <CheckCircle className="w-4 h-4 text-slate-blue flex-none" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-charcoal/20 flex-none" />
                    )}
                    <span className="font-display text-charcoal">{file.label}</span>
                  </div>
                  <button
                    onClick={() => handleFileDownload(file)}
                    disabled={downloadingFile === file.filename}
                    className="text-xs font-semibold tracking-wider uppercase text-slate-blue hover:text-charcoal transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 flex-none"
                  >
                    <DownloadIcon className="w-3.5 h-3.5" />
                    {downloadingFile === file.filename ? 'Downloading…' : 'Download'}
                  </button>
                </div>
              ))}
            </div>

            <p className="text-sm text-muted-slate text-center mt-6 leading-relaxed">
              Keep your code <span className="font-mono text-charcoal">{bundle.code}</span> — you can return here anytime to download products you have not gotten yet.
              Questions?{' '}
              <a href="/#contact" className="text-slate-blue hover:underline">Contact us</a>.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // ── Code entry view ────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-ivory">
      <div className="grain-overlay" />
      <PageNav />

      <main className="pt-20 lg:pt-24 pb-16 lg:pb-24">
        <div className="max-w-lg mx-auto px-6">
          <div className="text-center mb-10">
            <p className="font-display text-xl text-slate-blue mb-4">Your Purchase</p>
            <h1 className="font-display text-3xl sm:text-4xl text-charcoal mb-4">
              Download your journal
            </h1>
            <p className="text-muted-slate leading-relaxed">
              Enter the download code from your email.
            </p>
          </div>

          <div className="bg-white rounded-card-sm p-8 card-shadow">
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
      <Footer />
    </div>
  )
}
