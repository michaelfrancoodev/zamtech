'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, ChevronDown, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import WhatsAppIcon from '@/components/whatsapp-icon'

const PHONE = '+255 796 985 138'
const PHONE_RAW = '+255796985138'
const WA_LINK = `https://wa.me/${PHONE_RAW.replace('+', '')}`

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  {
    label: 'Company',
    href: '#',
    children: [
      { label: 'About Us',     href: '/about',        desc: 'Our story, mission & team' },
      { label: 'Office Info',  href: '/office-info',  desc: 'Location & business hours' },
      { label: 'Careers',      href: '/careers',      desc: 'Join our growing team' },
      { label: 'Testimonials', href: '/testimonials', desc: 'What our clients say' },
    ],
  },
  { label: 'Services', href: '/services' },
  { label: 'Pricing',  href: '/pricing' },
  {
    label: 'Help',
    href: '#',
    children: [
      { label: 'Support',  href: '/support', desc: 'Raise a support ticket' },
      { label: 'FAQ',      href: '/faq',     desc: 'Common questions' },
      { label: 'Contact',  href: '/contact', desc: 'Get in touch with us' },
    ],
  },
]

export default function Navbar() {
  const [scrolled,      setScrolled]      = useState(false)
  const [mobileOpen,    setMobileOpen]    = useState(false)
  const [openDropdown,  setOpenDropdown]  = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const pathname = usePathname()
  const dropdownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const isHome = pathname === '/'
  const solidNav = !isHome || scrolled || mobileOpen

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setMobileExpanded(null)
    setOpenDropdown(null)
  }, [pathname])

  // Lock body scroll when mobile nav open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleMouseEnter = (label: string) => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current)
    setOpenDropdown(label)
  }
  const handleMouseLeave = () => {
    dropdownTimerRef.current = setTimeout(() => setOpenDropdown(null), 120)
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-200',
          solidNav
            ? 'bg-[#0A1628] shadow-[0_1px_0_rgba(255,255,255,0.06)]'
            : 'bg-transparent'
        )}
      >
        {/* ─── Main nav row ─── */}
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 max-w-7xl mx-auto">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 min-w-0" aria-label="ZamTech home">
            <div className="relative w-11 h-11 shrink-0">
              <Image
                src="/images/zamtech-logo.png"
                alt=""
                fill
                className="object-contain mix-blend-screen"
                priority
                sizes="44px"
              />
            </div>
            <div className="leading-none min-w-0">
              <span
                className="block text-white font-extrabold text-[22px] leading-none"
                style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.04em' }}
              >
                ZamTech
              </span>
              <span className="block text-[#00C8FF]/70 text-[9px] font-bold tracking-[0.22em] uppercase mt-[3px]">
                Automation Studio
              </span>
            </div>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
            {NAV_LINKS.map(link =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(link.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={cn(
                      'flex items-center gap-1 px-3.5 py-2 rounded-md text-sm font-medium transition-colors',
                      'text-white/70 hover:text-white hover:bg-white/8'
                    )}
                    aria-haspopup="true"
                    aria-expanded={openDropdown === link.label}
                  >
                    {link.label}
                    <ChevronDown
                      size={13}
                      className={cn('transition-transform duration-150', openDropdown === link.label && 'rotate-180')}
                    />
                  </button>

                  {/* Dropdown */}
                  <div
                    className={cn(
                      'absolute top-full left-0 mt-1 w-52 bg-white rounded-xl overflow-hidden',
                      'shadow-[0_8px_32px_rgba(0,0,0,0.14)] border border-slate-100',
                      'transition-all duration-150 origin-top',
                      openDropdown === link.label
                        ? 'opacity-100 scale-100 pointer-events-auto translate-y-0'
                        : 'opacity-0 scale-95 pointer-events-none -translate-y-1'
                    )}
                    onMouseEnter={() => handleMouseEnter(link.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {link.children.map(child => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="flex flex-col px-4 py-3 hover:bg-sky-50 transition-colors border-b border-slate-50 last:border-0"
                      >
                        <span className="text-[13px] font-semibold text-[#0A1628] leading-tight">{child.label}</span>
                        <span className="text-[11px] text-slate-400 mt-0.5 leading-tight">{child.desc}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    'px-3.5 py-2 rounded-md text-sm font-medium transition-colors',
                    pathname === link.href
                      ? 'bg-white/10 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/8'
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-md border border-white/15 text-white/75 text-sm font-medium hover:bg-white/8 hover:text-white transition-colors"
            >
              <WhatsAppIcon size={14} className="text-[#25D366]" />
              WhatsApp
            </a>
            <Link
              href="/request-service"
              className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#00C8FF] text-[#001a24] text-sm font-bold hover:bg-[#00b8eb] transition-colors"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile: hamburger only */}
          <button
            className="flex lg:hidden items-center justify-center w-9 h-9 rounded-lg bg-white/8 text-white hover:bg-white/15 active:scale-95 transition-all"
            onClick={() => setMobileOpen(v => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* ─── Mobile overlay ─── */}
      <div
        className={cn(
          'fixed inset-0 z-40 lg:hidden transition-all duration-200',
          mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            'absolute inset-0 bg-black/50 transition-opacity duration-200',
            mobileOpen ? 'opacity-100' : 'opacity-0'
          )}
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer */}
        <div
          className={cn(
            'absolute top-16 left-0 right-0 bottom-0 bg-[#0A1628] overflow-y-auto',
            'transition-all duration-200',
            mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
          )}
        >
          {/* Contact strip */}
          <div className="flex items-center gap-4 px-4 py-3 border-b border-white/8">
            <a
              href={`tel:${PHONE_RAW}`}
              className="flex items-center gap-2 text-xs text-white/50 hover:text-white transition-colors"
            >
              <Phone size={12} className="text-[#00C8FF]" />
              {PHONE}
            </a>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-white/50 hover:text-white transition-colors"
            >
              <WhatsAppIcon size={12} className="text-[#25D366]" />
              WhatsApp
            </a>
          </div>

          {/* Nav links */}
          <nav className="px-3 py-3" aria-label="Mobile navigation">
            {NAV_LINKS.map(link =>
              link.children ? (
                <div key={link.label} className="mb-0.5">
                  <button
                    className="w-full flex items-center justify-between px-3 py-3 rounded-lg text-white/75 text-sm font-medium hover:bg-white/6 hover:text-white transition-colors"
                    onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      size={14}
                      className={cn('text-white/30 transition-transform duration-150', mobileExpanded === link.label && 'rotate-180')}
                    />
                  </button>
                  <div
                    className={cn(
                      'overflow-hidden transition-all duration-200',
                      mobileExpanded === link.label ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    )}
                  >
                    <div className="pl-2 pb-1">
                      {link.children.map(child => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex items-center justify-between px-3 py-2.5 rounded-lg text-white/60 text-sm hover:text-white hover:bg-white/6 transition-colors"
                        >
                          <span>{child.label}</span>
                          <ChevronRight size={13} className="text-white/25" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    'flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium transition-colors mb-0.5',
                    pathname === link.href
                      ? 'bg-[#00C8FF]/15 text-[#00C8FF]'
                      : 'text-white/75 hover:text-white hover:bg-white/6'
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Mobile CTAs */}
          <div className="px-4 pb-8 pt-2 flex flex-col gap-3 border-t border-white/8 mt-2">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border border-white/15 text-white text-sm font-semibold hover:bg-white/6 transition-colors"
            >
              <WhatsAppIcon size={16} className="text-[#25D366]" />
              Chat on WhatsApp
            </a>
            <Link
              href="/request-service"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#00C8FF] text-[#001a24] text-sm font-bold hover:bg-[#00b8eb] transition-colors"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
