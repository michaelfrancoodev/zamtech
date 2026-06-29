'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { Mail, Phone, MapPin, Clock, CheckCircle, ArrowRight, Loader2 } from 'lucide-react'
import PageWrapper from '@/components/page-wrapper'
import PageHero from '@/components/page-hero'
import WhatsAppIcon from '@/components/whatsapp-icon'
import { submitContactMessage } from '@/app/actions/data'

const WA = 'https://wa.me/255796985138'
const PHONE = '+255 796 985 138'

const contactCards = [
  {
    icon: Phone,
    label: 'Call Us',
    value: PHONE,
    href: 'tel:+255796985138',
    sub: 'Mon–Fri 8am–6pm EAT',
  },
  {
    icon: null, // WhatsApp — custom SVG
    label: 'WhatsApp',
    value: PHONE,
    href: WA,
    sub: 'Quick responses during hours',
    isWhatsApp: true,
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@zamtech.co.tz',
    href: 'mailto:info@zamtech.co.tz',
    sub: 'Reply within 24 hours',
  },
  {
    icon: MapPin,
    label: 'Visit Us',
    value: 'Mbeya, Tanzania',
    href: '/office-info',
    sub: 'View full office details',
  },
]

const subjects = [
  'General Enquiry',
  'Project Quote Request',
  'Technical Support',
  'Partnership / Collaboration',
  'Billing & Payments',
  'Other',
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '', email: '', phone: '', subject: '', message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    startTransition(async () => {
      try {
        await submitContactMessage({
          fullName: form.name,
          email: form.email,
          phone: form.phone || undefined,
          subject: form.subject,
          message: form.message,
        })
        setSubmitted(true)
      } catch {
        setError('Something went wrong. Please try again or contact us directly.')
      }
    })
  }

  return (
    <PageWrapper>
      <PageHero
        label="Get In Touch"
        title="Contact Us"
        description="Have a question, idea, or project in mind? We would love to hear from you. Reach out through any of the channels below."
      />

      {/* ── Contact cards ── */}
      <section className="bg-slate-50 border-b border-border py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactCards.map((c) => {
              const Icon = c.icon
              return (
                <a
                  key={c.label}
                  href={c.href}
                  {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex items-start gap-4 bg-white border border-border rounded-2xl p-5 hover:border-[#00C8FF]/50 hover:shadow-sm transition-all group"
                >
                  <div className="w-11 h-11 bg-[#00C8FF]/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#00C8FF]/20 transition-colors">
                    {c.isWhatsApp ? (
                      <WhatsAppIcon size={20} className="text-[#25D366]" />
                    ) : Icon ? (
                      <Icon className="w-5 h-5 text-[#00C8FF]" />
                    ) : null}
                  </div>
                  <div className="min-w-0">
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mb-0.5">
                      {c.label}
                    </p>
                    <p className="text-foreground font-semibold text-sm truncate">{c.value}</p>
                    <p className="text-muted-foreground text-xs mt-0.5">{c.sub}</p>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Form + Map ── */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Form */}
            <div>
              <h2
                className="text-2xl sm:text-3xl font-extrabold text-foreground mb-2"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Send Us a Message
              </h2>
              <p className="text-muted-foreground text-sm mb-7">
                We will reply to your email at{' '}
                <span className="text-[#00C8FF] font-medium">francoomichaeldev@gmail.com</span>{' '}
                within 24 hours.
              </p>

              {submitted ? (
                <div className="bg-[#00C8FF]/5 border border-[#00C8FF]/25 rounded-2xl p-10 text-center flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-[#00C8FF]/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-[#00C8FF]" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                    Message Sent!
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
                    Thanks, <strong>{form.name}</strong>! We received your message and will reply to{' '}
                    <strong>{form.email}</strong> within 24 hours.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 mt-2">
                    <Link
                      href="/"
                      className="bg-[#0A1628] text-white font-semibold px-6 py-2.5 rounded-xl text-sm hover:bg-[#0a1628]/90 transition-colors"
                    >
                      Back to Home
                    </Link>
                    <a
                      href={WA}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold px-6 py-2.5 rounded-xl text-sm hover:bg-[#22c55e] transition-colors"
                    >
                      <WhatsAppIcon size={14} className="text-white" />
                      WhatsApp Us
                    </a>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white border border-border rounded-2xl p-6 md:p-8 space-y-5 shadow-sm"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name" name="name" type="text" required
                        value={form.name} onChange={handleChange}
                        placeholder="Your full name"
                        className="w-full border border-input rounded-xl px-4 py-2.5 text-sm text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-[#00C8FF]/40 focus:border-[#00C8FF] transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email" name="email" type="email" required
                        value={form.email} onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full border border-input rounded-xl px-4 py-2.5 text-sm text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-[#00C8FF]/40 focus:border-[#00C8FF] transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">
                      Phone Number <span className="text-muted-foreground font-normal">(optional)</span>
                    </label>
                    <input
                      id="phone" name="phone" type="tel"
                      value={form.phone} onChange={handleChange}
                      placeholder="+255 700 000 000"
                      className="w-full border border-input rounded-xl px-4 py-2.5 text-sm text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-[#00C8FF]/40 focus:border-[#00C8FF] transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1.5">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="subject" name="subject" required
                      value={form.subject} onChange={handleChange}
                      className="w-full border border-input rounded-xl px-4 py-2.5 text-sm text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-[#00C8FF]/40 focus:border-[#00C8FF] transition-colors"
                    >
                      <option value="">Select a subject...</option>
                      {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message" name="message" required rows={5}
                      value={form.message} onChange={handleChange}
                      placeholder="Write your message here..."
                      className="w-full border border-input rounded-xl px-4 py-2.5 text-sm text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-[#00C8FF]/40 focus:border-[#00C8FF] transition-colors resize-none"
                    />
                  </div>
                  {error && (
                    <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-[#0A1628] text-white font-bold py-3.5 rounded-xl hover:bg-[#0a1628]/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isPending ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                    ) : (
                      <>Send Message <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Map + Hours */}
            <div className="space-y-6">
              <h2
                className="text-2xl sm:text-3xl font-extrabold text-foreground"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Find Our Office
              </h2>
              <div className="rounded-2xl overflow-hidden border border-border h-64 shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63657.23!2d33.4351!3d-8.9094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19cb21edb8d03853%3A0x8af4d8a8a6d6f7e2!2sMbeya!5e0!3m2!1sen!2stz!4v1700000000000!5m2!1sen!2stz"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade" title="ZamTech Office Location"
                />
              </div>
              <div className="bg-white border border-border rounded-2xl p-5 space-y-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#00C8FF] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-foreground font-semibold text-sm">ZamTech Automation Studio</p>
                    <p className="text-muted-foreground text-sm">Mbeya, Tanzania</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#00C8FF] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-foreground font-semibold text-sm">Business Hours</p>
                    <p className="text-muted-foreground text-sm">Monday – Friday: 8:00 AM – 6:00 PM EAT</p>
                    <p className="text-muted-foreground text-sm">Saturday: 9:00 AM – 1:00 PM EAT</p>
                    <p className="text-muted-foreground text-sm">Sunday: Closed</p>
                  </div>
                </div>
              </div>
              {/* WhatsApp CTA */}
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white font-bold py-3.5 rounded-2xl hover:bg-[#22c55e] active:scale-[0.98] transition-all"
              >
                <WhatsAppIcon size={18} className="text-white" />
                Chat on WhatsApp Now
              </a>
              <Link
                href="/office-info"
                className="block text-center border border-border text-foreground font-semibold py-3 rounded-2xl hover:bg-slate-50 transition-colors text-sm"
              >
                View Full Office Details
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
