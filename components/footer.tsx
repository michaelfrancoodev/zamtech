import Image from 'next/image'
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
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

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-white text-[11px] font-bold uppercase tracking-[0.14em] mb-4">
      {children}
    </h3>
  )
}
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-white/50 text-sm hover:text-white transition-colors leading-relaxed"
      >
        {children}
      </Link>
    </li>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#0A1628]">

      {/* ── Main grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5 group" aria-label="ZamTech home">
              <div className="relative w-11 h-11 shrink-0">
                <Image src="/images/zamtech-logo.png" alt="" fill className="object-contain mix-blend-screen" sizes="44px" />
              </div>
              <div className="leading-none">
                <span
                  className="block text-white font-extrabold text-[20px] group-hover:text-[#00C8FF] transition-colors"
                  style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.04em' }}
                >
                  ZamTech
                </span>
                <span className="block text-white/35 text-[8.5px] font-semibold tracking-[0.2em] uppercase mt-[3px]">
                  Automation Studio
                </span>
              </div>
            </Link>

            <p className="text-white/45 text-sm leading-relaxed mb-6 max-w-xs">
              Professional ICT solutions for businesses across Tanzania — websites, apps, ERP systems, and digital transformation.
            </p>

            <div>
              <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.12em] mb-3">Business Hours</p>
              <ul className="space-y-2">
                {[
                  { label: 'Mon – Fri', hours: '8:00am – 6:00pm EAT' },
                  { label: 'Saturday',  hours: '9:00am – 1:00pm EAT' },
                  { label: 'Sunday',    hours: 'Closed', dim: true },
                ].map(r => (
                  <li key={r.label} className="flex items-center gap-2">
                    <Clock size={11} className={r.dim ? 'text-white/20' : 'text-[#00C8FF]'} />
                    <span className={`text-xs ${r.dim ? 'text-white/25' : 'text-white/45'}`}>
                      {r.label}: {r.hours}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Company */}
          <div>
            <FooterHeading>Company</FooterHeading>
            <ul className="space-y-2.5">
              {COL_COMPANY.map(l => <FooterLink key={l.href} href={l.href}>{l.label}</FooterLink>)}
            </ul>
          </div>

          {/* Support + Legal */}
          <div>
            <FooterHeading>Support</FooterHeading>
            <ul className="space-y-2.5 mb-8">
              {COL_SUPPORT.map(l => <FooterLink key={l.href} href={l.href}>{l.label}</FooterLink>)}
            </ul>
            <FooterHeading>Legal</FooterHeading>
            <ul className="space-y-2.5">
              {COL_LEGAL.map(l => <FooterLink key={l.href} href={l.href}>{l.label}</FooterLink>)}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <FooterHeading>Get in Touch</FooterHeading>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-[#00C8FF] shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/70 text-sm font-medium">Head Office</p>
                  <p className="text-white/40 text-xs mt-0.5">Mbeya, Tanzania</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={14} className="text-[#00C8FF] shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/70 text-sm font-medium">Phone</p>
                  <a href={`tel:${PHONE_RAW}`} className="text-white/40 text-xs mt-0.5 hover:text-[#00C8FF] transition-colors block">
                    {PHONE}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <WhatsAppIcon size={14} className="text-[#25D366] shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/70 text-sm font-medium">WhatsApp</p>
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="text-white/40 text-xs mt-0.5 hover:text-[#25D366] transition-colors block">
                    {PHONE}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={14} className="text-[#00C8FF] shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/70 text-sm font-medium">Email</p>
                  <a href="mailto:info@zamtech.co.tz" className="text-white/40 text-xs mt-0.5 hover:text-[#00C8FF] transition-colors block">
                    info@zamtech.co.tz
                  </a>
                  <a href="mailto:support@zamtech.co.tz" className="text-white/40 text-xs mt-1 hover:text-[#00C8FF] transition-colors block">
                    support@zamtech.co.tz
                  </a>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs text-center sm:text-left">
            &copy; {year} ZamTech Automation Studio. All rights reserved. Mbeya, Tanzania.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {COL_LEGAL.map(l => (
              <Link key={l.href} href={l.href} className="text-white/30 text-xs hover:text-white/60 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

    </footer>
  )
}
