'use client'

import { useEffect, useRef } from 'react'

interface Props {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

/**
 * Wraps any section and activates IntersectionObserver to add `.in-view`
 * to every child element with a `.reveal*` class once it enters the viewport.
 */
export default function RevealSection({ children, className = '', as: Tag = 'section' }: Props) {
  const ref = useRef<HTMLElement>(null)

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
      { threshold: 0.1, rootMargin: '0px 0px -48px 0px' },
    )

    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
