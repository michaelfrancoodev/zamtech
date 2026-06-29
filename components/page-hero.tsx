import type { ReactNode } from 'react'

interface PageHeroProps {
  label: string
  title: string
  description?: string
  children?: ReactNode
}

/**
 * Consistent dark-navy hero used at the top of every inner page.
 * – label: small uppercase pill text (e.g. "Get In Touch")
 * – title: the big <h1>
 * – description: optional subtitle paragraph
 * – children: optional slot for extra content (e.g. a search bar)
 */
export default function PageHero({ label, title, description, children }: PageHeroProps) {
  return (
    <section className="bg-navy text-white pt-10 pb-8 sm:pt-12 sm:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Label */}
        <div className="inline-flex items-center gap-2 mb-2.5">
          <span className="w-5 h-px bg-[#00C8FF]" />
          <span className="text-[#00C8FF] text-[11px] font-bold uppercase tracking-[0.18em]">
            {label}
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-balance leading-tight mb-2"
          style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.025em' }}
        >
          {title}
        </h1>

        {/* Description */}
        {description && (
          <p className="text-white/55 text-sm sm:text-base max-w-2xl leading-relaxed">
            {description}
          </p>
        )}

        {/* Extra slot */}
        {children && <div className="mt-5">{children}</div>}
      </div>
    </section>
  )
}
