'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Home, ArrowLeft, Phone } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Our Services' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/faq', label: 'FAQ' },
  { href: '/request-service', label: 'Request a Service' },
]

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-16 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
          <div className="max-w-xl mx-auto text-center">
            {/* 404 number */}
            <div className="relative mb-10 select-none">
              <span
                className="text-[160px] md:text-[200px] font-extrabold leading-none block text-foreground/[0.04]"
                style={{ fontFamily: 'var(--font-heading)' }}
                aria-hidden="true"
              >
                404
              </span>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-1">
                  <span className="text-primary font-extrabold text-2xl" style={{ fontFamily: 'var(--font-heading)' }}>?</span>
                </div>
                <p className="text-foreground font-extrabold text-xl" style={{ fontFamily: 'var(--font-heading)' }}>
                  Page Not Found
                </p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-10 max-w-sm mx-auto">
              The page you are looking for may have been moved, deleted, or the URL may be incorrect. Let&apos;s get you back on track.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
              <Link
                href="/"
                className="bg-primary text-white font-bold px-7 py-3.5 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                Back to Home
              </Link>
              <button
                onClick={() => router.back()}
                className="border border-border text-foreground font-semibold px-7 py-3.5 rounded-md hover:bg-muted transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </button>
            </div>

            {/* Quick Links */}
            <div className="bg-card border border-border rounded-xl p-6 text-left mb-8">
              <p className="text-foreground font-bold text-xs uppercase tracking-[0.12em] mb-4">Popular Pages</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-muted-foreground hover:text-primary text-sm py-2 px-3 rounded-md hover:bg-primary/5 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Support */}
            <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
              <Phone className="w-4 h-4 text-primary shrink-0" />
              <span>Need help? Call us:</span>
              <a href="tel:+255796985138" className="text-primary font-semibold hover:underline">
                +255 796 985 138
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
