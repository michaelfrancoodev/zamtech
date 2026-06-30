'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search, ArrowLeft, Ticket, Wrench, AlertCircle, ArrowRight } from 'lucide-react'

export default function TrackEntryPage() {
  const [token, setToken]     = useState('')
  const [error, setError]     = useState('')
  const [isPending, start]    = useTransition()
  const router                = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = token.trim()
    if (!trimmed) {
      setError('Please enter a tracking reference.')
      return
    }
    if (trimmed.length < 6) {
      setError('The reference looks too short. Check your email for the correct link.')
      return
    }
    setError('')
    start(() => {
      router.push(`/track/${encodeURIComponent(trimmed)}`)
    })
  }

  return (
    <main className="min-h-screen bg-[#070f1e] flex flex-col font-sans">
      {/* Top bar */}
      <div className="border-b border-white/[0.06] bg-[#0A1628]">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm">
            <ArrowLeft size={14} />
            ZamTech
          </Link>
          <span className="text-white/20 text-xs font-semibold uppercase tracking-widest">Track Request</span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">

          {/* Icon + heading */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-[#00C8FF]/10 border border-[#00C8FF]/20 flex items-center justify-center mx-auto mb-5">
              <Search size={28} className="text-[#00C8FF]" />
            </div>
            <h1
              className="text-2xl font-extrabold text-white mb-2 text-balance"
              style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}
            >
              Track Your Request
            </h1>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs mx-auto">
              Enter the tracking reference from your confirmation email to check your request status.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="token" className="sr-only">
                Tracking reference
              </label>
              <input
                id="token"
                type="text"
                value={token}
                onChange={e => { setToken(e.target.value); setError('') }}
                placeholder="Paste your tracking reference here…"
                className="w-full bg-white/[0.05] border border-white/[0.10] rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#00C8FF]/60 focus:bg-white/[0.07] transition-all font-mono"
                autoFocus
                autoComplete="off"
                spellCheck={false}
              />
              {error && (
                <p className="flex items-center gap-1.5 text-red-400 text-xs mt-2">
                  <AlertCircle size={12} />
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending || !token.trim()}
              className="w-full flex items-center justify-center gap-2 bg-[#00C8FF] text-[#001a24] font-bold text-sm px-6 py-3.5 rounded-xl hover:bg-[#00b8eb] active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-[#00C8FF]/20"
            >
              {isPending ? 'Looking up…' : 'View Status'}
              {!isPending && <ArrowRight size={15} />}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-8">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="text-white/20 text-xs">or</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          {/* Quick links */}
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/request-service"
              className="flex flex-col items-center gap-2.5 bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 hover:bg-white/[0.06] hover:border-[#00C8FF]/20 transition-all group"
            >
              <div className="w-9 h-9 rounded-lg bg-[#00C8FF]/10 flex items-center justify-center group-hover:bg-[#00C8FF]/15 transition-colors">
                <Wrench size={16} className="text-[#00C8FF]" />
              </div>
              <span className="text-white/60 text-xs font-semibold text-center group-hover:text-white/80 transition-colors">
                New Service Request
              </span>
            </Link>
            <Link
              href="/support"
              className="flex flex-col items-center gap-2.5 bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 hover:bg-white/[0.06] hover:border-[#00C8FF]/20 transition-all group"
            >
              <div className="w-9 h-9 rounded-lg bg-[#00C8FF]/10 flex items-center justify-center group-hover:bg-[#00C8FF]/15 transition-colors">
                <Ticket size={16} className="text-[#00C8FF]" />
              </div>
              <span className="text-white/60 text-xs font-semibold text-center group-hover:text-white/80 transition-colors">
                Open Support Ticket
              </span>
            </Link>
          </div>

          <p className="text-center text-white/20 text-xs mt-8 leading-relaxed">
            Can&apos;t find your reference?{' '}
            <Link href="/contact" className="text-[#00C8FF]/70 hover:text-[#00C8FF] transition-colors">
              Contact us
            </Link>{' '}
            and we will look it up for you.
          </p>
        </div>
      </div>
    </main>
  )
}
