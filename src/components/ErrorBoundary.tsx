import { Component } from 'react'
import type { ReactNode, ErrorInfo } from 'react'
import { AlertTriangle } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Uncaught error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-ivory flex items-center justify-center">
          <div className="grain-overlay" />
          <div className="max-w-xl mx-auto px-6 text-center">

            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 rounded-full bg-blush flex items-center justify-center">
                <AlertTriangle className="w-7 h-7 text-muted-slate" />
              </div>
            </div>

            <p className="font-display text-xl text-muted-slate mb-3">Something went wrong</p>
            <h1 className="font-display text-3xl sm:text-4xl text-charcoal mb-5 leading-snug">
              We ran into a problem.
            </h1>
            <p className="text-muted-slate italic leading-relaxed mb-10">
              This wasn't supposed to happen. Try refreshing the page — if the problem continues, come back a little later.
            </p>

            <button
              onClick={() => window.location.reload()}
              className="bg-slate-blue text-white text-xs font-semibold tracking-wider uppercase px-6 py-3 rounded-lg hover:bg-charcoal transition-colors duration-200"
            >
              Refresh the page
            </button>

          </div>
        </div>
      )
    }

    return this.props.children
  }
}
