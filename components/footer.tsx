'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, ArrowRight, Twitter, Linkedin, Facebook, Instagram, Youtube } from 'lucide-react'
import WhatsAppIcon from '@/components/whatsapp-icon'

const PHONE     = '+255 796 985 138'
const PHONE_RAW = '+255796985138'
const WA_LINK   = `https://wa.me/${PHONE_RAW.replace('+', '')}`

const COL_COMPANY = [
  { label: 'About Us',     href: '/about' },
  { label: 'Services',     href: '/services' },
  { label: 'Pricing',      href: '/pricing' },
  { label: 'Careers',      href: '/careers' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Office Info',  href: '/office-info' },
]
const COL_SUPPORT = [
  { label: 'Support Center',    href: '/support' },
  { label: 'FAQ',               href: '/faq' },
  { label: 'Request a Service', href: '/request-service' },
  { label: 'Contact Us',        href: '/contact' },
]
const COL_LEGAL = [
  { label: 'Privacy Policy',    href: '/privacy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Cookie Policy',     href: '/cookies' },
]

const SOCIALS = [
  { icon: Facebook,  label: 'Facebook',  href: 'https://facebook.com' },
  { icon: Twitter,   label: 'Twitter/X', href: 'https://twitter.com' },
  { icon: Linkedin,  label: 'LinkedIn',  href: 'https://linkedin.com' },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
  { icon: Youtube,   label: 'YouTube',   href: 'https://youtube.com' },
]

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-white text-[11px] font-bold uppercase tracking-[0.16em] mb-5">
      {children}
    </h3>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-white/45 text-[13px] hover:text-white transition-colors leading-relaxed flex items-center gap-1.5 group"
      >
        <span className="w-0 group-hover:w-2 h-px bg-[#00C8FF] transition-all duration-200 shrink-0" />
        {children}
      </Link>
    </li>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleNewsletter(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
    setEmail('')
  }

  return (
    <footer className="bg-[#070f1e] border-t border-white/[0.06]">

      {/* ── Newsletter bar ── */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <p className="text-white font-bold text-[15px]" style={{ fontFamily: 'var(--font-heading)' }}>
              Stay Updated with ZamTech
            </p>
            <p className="text-white/35 text-sm mt-1">
              Get tips, project updates, and ICT insights delivered to your inbox.
            </p>
          </div>

          {submitted ? (
            <div className="flex items-center gap-2 text-[#00C8FF] text-sm font-semibold bg-[#00C8FF]/10 border border-[#00C8FF]/20 rounded-xl px-5 py-3">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              You&apos;re subscribed — thank you!
            </div>
          ) : (
            <form onSubmit={handleNewsletter} className="flex gap-2 w-full sm:w-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 sm:w-64 bg-white/[0.06] border border-white/[0.10] rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#00C8FF]/50 focus:bg-white/[0.08] transition-all"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 bg-[#00C8FF] text-[#001a24] font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-[#00b8eb] active:scale-[0.98] transition-all shrink-0"
              >
                Subscribe <ArrowRight size={14} />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">

          {/* Brand — wide column */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3 mb-5 group" aria-label="ZamTech home">
              <div className="relative w-10 h-10 shrink-0">
                <Image src="/images/zamtech-logo.png" alt="" fill className="object-contain mix-blend-screen" sizes="40px" />
              </div>
              <div className="leading-none">
                <span
                  className="block text-white font-extrabold text-[20px] group-hover:text-[#00C8FF] transition-colors"
                  style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.04em' }}
                >
                  ZamTech
                </span>
                <span className="block text-white/30 text-[8px] font-bold tracking-[0.22em] uppercase mt-[3px]">
                  Automation Studio
                </span>
              </div>
            </Link>

            <p className="text-white/40 text-[13px] leading-relaxed mb-6 max-w-sm">
              Professional ICT solutions for businesses across Tanzania — websites, mobile apps, ERP systems, and complete digital transformation.
            </p>

            {/* Contact info */}
            <ul className="space-y-3 mb-7">
              <li className="flex items-center gap-3">
                <MapPin size={13} className="text-[#00C8FF] shrink-0" />
                <span className="text-white/45 text-[13px]">Mbeya, Tanzania</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={13} className="text-[#00C8FF] shrink-0" />
                <a href={`tel:${PHONE_RAW}`} className="text-white/45 text-[13px] hover:text-white transition-colors">{PHONE}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={13} className="text-[#00C8FF] shrink-0" />
                <a href="mailto:info@zamtech.co.tz" className="text-white/45 text-[13px] hover:text-white transition-colors">info@zamtech.co.tz</a>
              </li>
              <li className="flex items-center gap-3">
                <WhatsAppIcon size={13} className="text-[#25D366] shrink-0" />
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="text-white/45 text-[13px] hover:text-white transition-colors">WhatsApp Us</a>
              </li>
            </ul>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.10] hover:border-[#00C8FF]/30 transition-all"
                >
                  <s.icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <FooterHeading>Company</FooterHeading>
            <ul className="space-y-2.5">
              {COL_COMPANY.map(l => <FooterLink key={l.href} href={l.href}>{l.label}</FooterLink>)}
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-2">
            <FooterHeading>Support</FooterHeading>
            <ul className="space-y-2.5">
              {COL_SUPPORT.map(l => <FooterLink key={l.href} href={l.href}>{l.label}</FooterLink>)}
            </ul>
          </div>

          {/* Hours + Legal */}
          <div className="lg:col-span-4">
            <FooterHeading>Business Hours</FooterHeading>
            <ul className="space-y-2 mb-8">
              {[
                { label: 'Mon – Fri', hours: '8:00am – 6:00pm EAT' },
                { label: 'Saturday',  hours: '9:00am – 1:00pm EAT' },
                { label: 'Sunday',    hours: 'Closed', dim: true },
              ].map(r => (
                <li key={r.label} className="flex items-center justify-between gap-4 py-2 border-b border-white/[0.05] last:border-0">
                  <span className="flex items-center gap-2 text-[13px] text-white/40">
                    <Clock size={11} className={r.dim ? 'text-white/20' : 'text-[#00C8FF]'} />
                    {r.label}
                  </span>
                  <span className={`text-[13px] font-medium ${r.dim ? 'text-white/20' : 'text-white/70'}`}>{r.hours}</span>
                </li>
              ))}
            </ul>

            <FooterHeading>Legal</FooterHeading>
            <ul className="space-y-2">
              {COL_LEGAL.map(l => <FooterLink key={l.href} href={l.href}>{l.label}</FooterLink>)}
            </ul>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/25 text-xs text-center sm:text-left">
            &copy; {year} ZamTech Automation Studio. All rights reserved. &mdash; Mbeya, Tanzania.
          </p>
          <p className="text-white/20 text-xs">
            Built with care for Tanzanian businesses.
          </p>
        </div>
      </div>

    </footer>
  )
}
