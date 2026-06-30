'use client'

import { useEffect, useRef } from 'react'

interface Props {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

/**
 * Adds `.in-view` to child `.reveal*` elements when they enter the viewport,
 * triggering CSS keyframe animations. Elements visible on first paint are
 * immediately marked so they animate in on page load too.
 */
export default function RevealSection({ children, className = '', as: Tag = 'section' }: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const targets = Array.from(
      el.querySelectorAll<HTMLElement>('.reveal, .reveal-left, .reveal-right, .reveal-scale'),
    )
    if (!targets.length) return

    // Use requestAnimationFrame to let layout settle before measuring
    const raf = requestAnimationFrame(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0, rootMargin: '0px' }, // rootMargin: '0px' = trigger as soon as ANY pixel enters
      )

      targets.forEach((t) => observer.observe(t))

      return () => observer.disconnect()
    })

    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className}>
      {children}
    </Tag>
  )
}
