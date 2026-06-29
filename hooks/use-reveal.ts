'use client'

import { useEffect, useRef } from 'react'

/**
 * Attach to a container ref to trigger .in-view on all
 * child elements that carry a reveal class when they enter the viewport.
 *
 * Usage:
 *   const ref = useReveal()
 *   <section ref={ref}>
 *     <div className="reveal">...</div>
 *     <div className="reveal reveal-delay-1">...</div>
 *   </section>
 */
export function useReveal(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const targets = el.querySelectorAll<HTMLElement>(
      '.reveal, .reveal-left, .reveal-right, .reveal-scale',
    )

    if (!targets.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px', ...options },
    )

    targets.forEach((t) => observer.observe(t))

    return () => observer.disconnect()
  }, [options])

  return ref as React.RefObject<HTMLElement>
}
