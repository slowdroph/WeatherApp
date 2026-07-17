import { Component } from "react"
import type { ErrorInfo, ReactNode } from "react"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("WeatherApp error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950">
          <div className="rounded-2xl border border-white/10 bg-white/10 p-8 text-center backdrop-blur-xl">
            <p className="mb-2 text-lg font-semibold">Something went wrong</p>
            <p className="mb-6 text-sm text-white/50">
              The weather app encountered an unexpected error.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-xl border border-white/15 bg-white/10 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/20"
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
