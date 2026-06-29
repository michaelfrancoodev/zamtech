'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <button
      onClick={scrollTop}
      aria-label="Back to top"
      className={cn(
        'fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50',
        'w-11 h-11 rounded-full',
        'bg-[#00C8FF] text-[#001a24]',
        'flex items-center justify-center',
        'shadow-lg shadow-[#00C8FF]/30',
        'hover:bg-[#00b8eb] active:scale-95',
        'transition-all duration-250',
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-3 pointer-events-none'
      )}
    >
      <ArrowUp size={18} strokeWidth={2.5} />
    </button>
  )
}
