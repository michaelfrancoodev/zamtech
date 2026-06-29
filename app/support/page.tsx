'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import {
  Search, Globe, Smartphone, Settings, Database, Users, BarChart3,
  ChevronRight, ArrowRight, Phone, CheckCircle, Loader2,
} from 'lucide-react'
import PageWrapper from '@/components/page-wrapper'
import PageHero from '@/components/page-hero'
import WhatsAppIcon from '@/components/whatsapp-icon'
import { submitSupportTicket } from '@/app/actions/data'

const WA = 'https://wa.me/255796985138'

const categories = [
  {
    icon: Globe, title: 'Website Support',
    topics: [
      'My website is not loading', 'Website content needs updating',
      'Website forms are not working', 'Mobile display issues', 'SEO & Google ranking help',
    ],
  },
  {
    icon: Smartphone, title: 'Mobile App Support',
    topics: [
      'App crashes on startup', 'Push notifications not working',
      'App update / new version', 'Login or authentication issues', 'Data sync problems',
    ],
  },
  {
    icon: Settings, title: 'Business Systems',
    topics: [
      'POS system errors', 'Inventory sync issues',
      'User account management', 'Report generation help', 'System performance issues',
    ],
  },
  {
    icon: Database, title: 'Database Support',
    topics: [
      'Data backup & recovery', 'Slow query performance',
      'Data migration help', 'Access / permissions issues', 'Database connection errors',
    ],
  },
  {
    icon: Users, title: 'Account & Billing',
    topics: [
      'Request invoice or receipt', 'Payment confirmation',
      'Project scope changes', 'Renewal or upgrade', 'Contract / agreement queries',
    ],
  },
  {
    icon: BarChart3, title: 'General Enquiries',
    topics: [
      'New project consultation', 'Request a quote',
      'Partnership enquiries', 'Internship / careers', 'Other questions',
    ],
  },
]

const inputClass =
  'w-full border border-input rounded-xl px-4 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#00C8FF]/40 focus:border-[#00C8FF] transition-colors'

export default function SupportPage() {
  const [query, setQuery] = useState('')
  const [ticketSubmitted, setTicketSubmitted] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [ticketError, setTicketError] = useState('')
  const [ticket, setTicket] = useState({ name: '', email: '', category: '', description: '' })

  const handleTicket = (e: React.FormEvent) => {
    e.preventDefault()
    setTicketError('')
    startTransition(async () => {
      try {
        await submitSupportTicket({
          fullName: ticket.name,
          email: ticket.email,
          issueCategory: ticket.category,
          priority: 'normal',
          subject: ticket.category,
          description: ticket.description,
        })
        setTicketSubmitted(true)
      } catch {
        setTicketError('Something went wrong. Please try again or call us directly.')
      }
    })
  }

  const handleTicketChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value })
  }

  const filtered = query.trim()
    ? categories
        .map((c) => ({ ...c, topics: c.topics.filter((t) => t.toLowerCase().includes(query.toLowerCase())) }))
        .filter((c) => c.topics.length > 0)
    : categories

  return (
    <PageWrapper>
      <PageHero label="Help Center" title="Support Center" description="Find help for your ZamTech-built solution or raise a support ticket. We are here to help you every step of the way.">
        {/* Search */}
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search support topics..."
            className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00C8FF]/50 focus:border-[#00C8FF] transition-colors"
          />
        </div>
      </PageHero>

      {/* Quick Contacts */}
      <section className="py-8 bg-slate-50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-4">
            <a
              href="tel:+255796985138"
              className="flex items-center gap-4 bg-white border border-border rounded-2xl p-4 hover:border-[#00C8FF]/40 hover:shadow-sm transition-all group"
            >
              <div className="w-11 h-11 bg-[#00C8FF]/10 rounded-xl flex items-center justify-center group-hover:bg-[#00C8FF]/20 transition-colors shrink-0">
                <Phone className="w-5 h-5 text-[#00C8FF]" />
              </div>
              <div>
                <p className="text-foreground font-semibold text-sm">Call Support</p>
                <p className="text-muted-foreground text-xs">+255 796 985 138</p>
              </div>
            </a>
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-white border border-border rounded-2xl p-4 hover:border-[#25D366]/40 hover:shadow-sm transition-all group"
            >
              <div className="w-11 h-11 bg-[#25D366]/10 rounded-xl flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors shrink-0">
                <WhatsAppIcon size={20} className="text-[#25D366]" />
              </div>
              <div>
                <p className="text-foreground font-semibold text-sm">WhatsApp Support</p>
                <p className="text-muted-foreground text-xs">Quick response available</p>
              </div>
            </a>
            <Link
              href="/faq"
              className="flex items-center gap-4 bg-white border border-border rounded-2xl p-4 hover:border-[#00C8FF]/40 hover:shadow-sm transition-all group"
            >
              <div className="w-11 h-11 bg-[#00C8FF]/10 rounded-xl flex items-center justify-center group-hover:bg-[#00C8FF]/20 transition-colors shrink-0">
                <Search className="w-5 h-5 text-[#00C8FF]" />
              </div>
              <div>
                <p className="text-foreground font-semibold text-sm">Browse FAQs</p>
                <p className="text-muted-foreground text-xs">Find instant answers</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl font-extrabold text-foreground mb-8"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Browse by Category
          </h2>
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">No topics found for &ldquo;{query}&rdquo;</p>
              <button onClick={() => setQuery('')} className="text-[#00C8FF] font-medium hover:underline text-sm">
                Clear search
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((cat) => {
                const Icon = cat.icon
                return (
                  <div
                    key={cat.title}
                    className="bg-white border border-border rounded-2xl p-6 hover:border-[#00C8FF]/35 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-[#00C8FF]/10 rounded-xl flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#00C8FF]" />
                      </div>
                      <h3 className="text-foreground font-bold text-sm">{cat.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {cat.topics.map((topic) => (
                        <li key={topic} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[#00C8FF] transition-colors cursor-pointer">
                          <ChevronRight className="w-3 h-3 shrink-0" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Raise a Ticket */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-border">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2
              className="text-2xl font-extrabold text-foreground mb-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Raise a Support Ticket
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Can&apos;t find what you need? Submit a ticket and our team will respond within 4–8 business hours.
            </p>
          </div>

          {ticketSubmitted ? (
            <div className="bg-white border border-border rounded-2xl p-8 text-center shadow-sm">
              <CheckCircle className="w-12 h-12 text-[#00C8FF] mx-auto mb-4" />
              <h3 className="text-foreground font-bold text-lg mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Ticket Submitted!
              </h3>
              <p className="text-muted-foreground text-sm">
                We have received your support request and will respond to{' '}
                <strong>{ticket.email}</strong> within 4–8 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleTicket} className="bg-white border border-border rounded-2xl p-6 md:p-8 space-y-5 shadow-sm">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="t-name" className="block text-sm font-medium text-foreground mb-1.5">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input id="t-name" name="name" type="text" required value={ticket.name}
                    onChange={handleTicketChange} placeholder="Your name" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="t-email" className="block text-sm font-medium text-foreground mb-1.5">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input id="t-email" name="email" type="email" required value={ticket.email}
                    onChange={handleTicketChange} placeholder="your@email.com" className={inputClass} />
                </div>
              </div>
              <div>
                <label htmlFor="t-category" className="block text-sm font-medium text-foreground mb-1.5">
                  Category <span className="text-red-500">*</span>
                </label>
                <select id="t-category" name="category" required value={ticket.category}
                  onChange={handleTicketChange} className={inputClass}>
                  <option value="">Select a category...</option>
                  {categories.map((c) => <option key={c.title} value={c.title}>{c.title}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="t-description" className="block text-sm font-medium text-foreground mb-1.5">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea id="t-description" name="description" rows={4} required value={ticket.description}
                  onChange={handleTicketChange} placeholder="Describe your issue in detail..."
                  className={`${inputClass} resize-none`} />
              </div>
              {ticketError && (
                <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">{ticketError}</p>
              )}
              <button type="submit" disabled={isPending}
                className="w-full bg-[#0A1628] text-white font-bold py-3.5 rounded-xl hover:bg-[#0a1628]/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70">
                {isPending ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                ) : (
                  <>Submit Ticket <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </PageWrapper>
  )
}
