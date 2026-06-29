'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Loader2, Copy, ExternalLink } from 'lucide-react'
import PageWrapper from '@/components/page-wrapper'
import PageHero from '@/components/page-hero'
import WhatsAppIcon from '@/components/whatsapp-icon'
import { submitServiceRequest } from '@/app/actions/data'

const WA = 'https://wa.me/255796985138'

const services = [
  'Web Development', 'Mobile Application', 'Business System (ERP/POS)',
  'ICT Consultancy', 'Database Solution', 'IT Support & Training', 'Other',
]
const budgets = [
  'Below TZS 500,000', 'TZS 500,000 – 1,500,000',
  'TZS 1,500,000 – 4,000,000', 'Above TZS 4,000,000', 'Not sure / Need guidance',
]
const timelines = [
  'As soon as possible (ASAP)', 'Within 1 month',
  '1 – 3 months', '3 – 6 months', 'Flexible / No rush',
]

const inputClass =
  'w-full border border-input rounded-xl px-4 py-2.5 text-sm text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-[#00C8FF]/40 focus:border-[#00C8FF] transition-colors'

export default function RequestServicePage() {
  const [submitted, setSubmitted] = useState(false)
  const [trackingToken, setTrackingToken] = useState('')
  const [copied, setCopied] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '',
    service: '', budget: '', timeline: '', description: '',
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
        const { trackingToken: token } = await submitServiceRequest({
          fullName: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company || undefined,
          serviceType: form.service,
          budgetRange: form.budget || undefined,
          timeline: form.timeline || undefined,
          description: form.description,
        })
        setTrackingToken(token)
        setSubmitted(true)
      } catch {
        setError('Something went wrong. Please try again or contact us directly.')
      }
    })
  }

  const trackingUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/track/${trackingToken}`
    : `/track/${trackingToken}`

  const handleCopy = () => {
    navigator.clipboard.writeText(trackingUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  if (submitted) {
    return (
      <PageWrapper>
        <section className="min-h-[80vh] flex items-center justify-center bg-background px-4 py-16">
          <div className="max-w-lg w-full">
            {/* Success header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>
              <h1 className="text-2xl font-extrabold text-foreground mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Request Received!
              </h1>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Thank you, <strong>{form.name}</strong>. We will review your request and contact you within <strong>24 hours</strong>.
              </p>
            </div>

            {/* Tracking card */}
            <div className="bg-[#0A1628] rounded-2xl p-6 mb-4 border border-[#00C8FF]/15">
              <p className="text-[#00C8FF] text-xs font-bold uppercase tracking-wider mb-1">Your Tracking Link</p>
              <p className="text-white/40 text-xs mb-4 leading-relaxed">
                Bookmark this link to check your request status anytime — no account needed. We also sent it to <span className="text-white/60">{form.email}</span>.
              </p>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-2 mb-3">
                <p className="text-white/70 text-xs font-mono flex-1 truncate">{trackingUrl}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 text-white/60 text-sm font-semibold hover:bg-white/5 hover:text-white transition-all"
                >
                  <Copy size={13} />
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
                <Link
                  href={`/track/${trackingToken}`}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#00C8FF] text-[#001a24] text-sm font-bold hover:bg-[#00b8eb] transition-colors"
                >
                  <ExternalLink size={13} />
                  Track Request
                </Link>
              </div>
            </div>

            {/* Secondary actions */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Link href="/" className="flex-1 text-center py-3 rounded-xl border border-border text-foreground text-sm font-semibold hover:bg-muted transition-colors">
                Back to Home
              </Link>
              <a href={WA} target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] text-sm font-semibold hover:bg-[#25D366]/15 transition-colors">
                <WhatsAppIcon size={14} className="text-[#25D366]" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <PageHero
        label="Get Started"
        title="Request a Service"
        description="Fill in the form below and we will review your request and get back to you within 24 hours with a plan and proposal."
      />

      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Personal Info */}
            <div className="bg-white border border-border rounded-2xl p-6 md:p-8 shadow-sm">
              <h2
                className="text-foreground font-extrabold text-lg mb-6"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Your Information
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {[
                  { id: 'name', label: 'Full Name', type: 'text', placeholder: 'John Mwangi', required: true },
                  { id: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com', required: true },
                  { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+255 700 000 000', required: true },
                  { id: 'company', label: 'Company / Business Name', type: 'text', placeholder: 'Optional', required: false },
                ].map((field) => (
                  <div key={field.id}>
                    <label htmlFor={field.id} className="block text-sm font-medium text-foreground mb-1.5">
                      {field.label}{field.required && <span className="text-red-500"> *</span>}
                    </label>
                    <input
                      id={field.id} name={field.id} type={field.type}
                      required={field.required} placeholder={field.placeholder}
                      value={form[field.id as keyof typeof form]}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Project Details */}
            <div className="bg-white border border-border rounded-2xl p-6 md:p-8 shadow-sm">
              <h2
                className="text-foreground font-extrabold text-lg mb-6"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Project Details
              </h2>
              <div className="space-y-5">
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-foreground mb-1.5">
                    Service Required <span className="text-red-500">*</span>
                  </label>
                  <select id="service" name="service" required value={form.service} onChange={handleChange} className={inputClass}>
                    <option value="">Select a service...</option>
                    {services.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-foreground mb-1.5">
                      Estimated Budget
                    </label>
                    <select id="budget" name="budget" value={form.budget} onChange={handleChange} className={inputClass}>
                      <option value="">Select a range...</option>
                      {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium text-foreground mb-1.5">
                      Project Timeline
                    </label>
                    <select id="timeline" name="timeline" value={form.timeline} onChange={handleChange} className={inputClass}>
                      <option value="">Select timeline...</option>
                      {timelines.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-foreground mb-1.5">
                    Project Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description" name="description" required rows={5}
                    value={form.description} onChange={handleChange}
                    placeholder="Describe your project, what you need built, who will use it, and any specific requirements..."
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </div>
            </div>

            {error && (
              <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#0A1628] text-white font-bold py-4 rounded-xl hover:bg-[#0a1628]/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isPending ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Sending Request...</>
              ) : (
                <>Submit Request <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
            <p className="text-center text-muted-foreground text-xs">
              By submitting, you agree to our{' '}
              <Link href="/privacy" className="text-[#00C8FF] hover:underline">Privacy Policy</Link>.
              We will respond within 24 hours.
            </p>
          </form>
        </div>
      </section>
    </PageWrapper>
  )
}
