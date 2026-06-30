'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, Cookie } from 'lucide-react'

const STORAGE_KEY = 'zamtech_cookie_consent'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        // Delay slightly so it doesn't flash during hydration
        const t = setTimeout(() => setVisible(true), 800)
        return () => clearTimeout(t)
      }
    } catch {
      // localStorage unavailable — silently skip
    }
  }, [])

  function accept() {
    try { localStorage.setItem(STORAGE_KEY, 'accepted') } catch { /* noop */ }
    setVisible(false)
  }

  function decline() {
    try { localStorage.setItem(STORAGE_KEY, 'declined') } catch { /* noop */ }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-50 animate-in slide-in-from-bottom-4 fade-in duration-300"
    >
      <div className="bg-[#0A1628] border border-[#00C8FF]/20 rounded-2xl shadow-2xl shadow-black/40 p-5 text-sm">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-[#00C8FF]/10 flex items-center justify-center shrink-0 mt-0.5">
            <Cookie size={16} className="text-[#00C8FF]" />
          </div>
          <div>
            <p className="text-white font-semibold mb-1">We use cookies</p>
            <p className="text-white/45 text-xs leading-relaxed">
              We use essential cookies to keep the site working. No tracking or third-party advertising cookies.{' '}
              <Link href="/privacy" className="text-[#00C8FF]/80 hover:text-[#00C8FF] underline underline-offset-2 transition-colors">
                Privacy Policy
              </Link>
            </p>
          </div>
          <button
            onClick={decline}
            aria-label="Dismiss cookie banner"
            className="shrink-0 text-white/30 hover:text-white/60 transition-colors -mt-0.5"
          >
            <X size={16} />
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={accept}
            className="flex-1 bg-[#00C8FF] text-[#001a24] font-bold text-xs py-2.5 rounded-lg hover:bg-[#00b8eb] transition-colors"
          >
            Accept
          </button>
          <button
            onClick={decline}
            className="flex-1 bg-white/[0.06] text-white/60 font-semibold text-xs py-2.5 rounded-lg hover:bg-white/[0.10] hover:text-white/80 transition-colors border border-white/[0.08]"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  )
}
