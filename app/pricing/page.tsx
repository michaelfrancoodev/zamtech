import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, ArrowRight, X, Zap } from 'lucide-react'
import PageWrapper from '@/components/page-wrapper'
import PageHero from '@/components/page-hero'
import WhatsAppIcon from '@/components/whatsapp-icon'

export const metadata: Metadata = {
  title: 'Pricing & Packages',
  description: 'Transparent ICT service pricing in Tanzania. Starter packages from TZS 500,000 up to full enterprise solutions — no hidden fees, clear deliverables.',
  alternates: { canonical: '/pricing' },
  openGraph: { title: 'Pricing & Packages | ZamTech Tanzania', description: 'Clear ICT pricing with no hidden fees. From TZS 500,000.', url: '/pricing' },
}

const WA = 'https://wa.me/255796985138'

const plans = [
  {
    name: 'Starter',
    price: '500,000',
    currency: 'TZS',
    period: 'one-time',
    tagline: 'Perfect for individuals & small businesses',
    highlight: false,
    features: [
      { text: 'Business website (up to 5 pages)', included: true },
      { text: 'Mobile-responsive design', included: true },
      { text: 'Contact form integration', included: true },
      { text: 'Google Maps embed', included: true },
      { text: 'Basic SEO setup', included: true },
      { text: '1 month free support', included: true },
      { text: 'Custom web application', included: false },
      { text: 'Database integration', included: false },
      { text: 'Admin dashboard', included: false },
      { text: 'API integrations', included: false },
    ],
  },
  {
    name: 'Business',
    price: '1,500,000',
    currency: 'TZS',
    period: 'one-time',
    tagline: 'For growing businesses needing more power',
    highlight: true,
    features: [
      { text: 'Full website (up to 15 pages)', included: true },
      { text: 'Mobile-responsive design', included: true },
      { text: 'Contact form + WhatsApp integration', included: true },
      { text: 'Custom admin dashboard', included: true },
      { text: 'Database integration', included: true },
      { text: 'Basic API integrations', included: true },
      { text: '3 months free support', included: true },
      { text: 'SEO optimization', included: true },
      { text: 'Mobile app', included: false },
      { text: 'Enterprise ERP system', included: false },
    ],
  },
  {
    name: 'Enterprise',
    price: '4,000,000',
    currency: 'TZS',
    period: 'one-time',
    tagline: 'Full-scale digital transformation',
    highlight: false,
    features: [
      { text: 'Full web application', included: true },
      { text: 'Mobile app (Android + iOS)', included: true },
      { text: 'Custom ERP / business system', included: true },
      { text: 'Database design & optimization', included: true },
      { text: 'Advanced API integrations', included: true },
      { text: 'Admin & user dashboards', included: true },
      { text: '6 months free support', included: true },
      { text: 'Staff training & documentation', included: true },
      { text: 'Dedicated project manager', included: true },
      { text: 'Monthly maintenance contract', included: true },
    ],
  },
  {
    name: 'Custom',
    price: 'Quote',
    currency: '',
    period: 'tailored',
    tagline: 'For unique, complex project requirements',
    highlight: false,
    isCustom: true,
    features: [
      { text: 'Fully scoped to your requirements', included: true },
      { text: 'Any combination of services', included: true },
      { text: 'Dedicated development team', included: true },
      { text: 'Flexible payment terms', included: true },
      { text: 'Priority support & SLA', included: true },
      { text: 'Ongoing retainer options', included: true },
      { text: 'Custom timeline & milestones', included: true },
      { text: 'White-label solutions available', included: true },
      { text: 'Multi-location deployments', included: true },
      { text: 'Training & change management', included: true },
    ],
  },
]

const faqs = [
  {
    q: 'Are these prices negotiable?',
    a: 'Yes. The prices shown are starting estimates. Every project is different, and we will provide a detailed quote after understanding your specific needs.',
  },
  {
    q: 'What is included in "support"?',
    a: 'Support includes bug fixes, minor updates, user guidance, and technical assistance. It does not include new feature development (which is quoted separately).',
  },
  {
    q: 'Do you offer payment plans?',
    a: 'Yes. We typically work on a 50% deposit + 50% on delivery model. For larger projects, we can arrange milestone-based payments.',
  },
  {
    q: 'Can I upgrade my plan later?',
    a: 'Absolutely. You can start with a Starter website and upgrade to a Business or Enterprise solution as your business grows.',
  },
]

export default function PricingPage() {
  return (
    <PageWrapper>
      <PageHero
        label="Investment"
        title="Transparent Pricing"
        description="Clear, competitive pricing with no hidden fees. Choose a package or request a custom quote tailored to your project."
      />

      {/* Plans */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border flex flex-col overflow-hidden transition-shadow hover:shadow-md ${
                  plan.highlight
                    ? 'bg-[#0A1628] border-[#00C8FF]/40 shadow-lg shadow-[#00C8FF]/10'
                    : 'bg-white border-border'
                }`}
              >
                {plan.highlight && (
                  <div className="bg-[#00C8FF] text-[#001a24] text-xs font-extrabold uppercase tracking-widest text-center py-2">
                    Most Popular
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <div className="mb-6">
                    <h3
                      className={`text-lg font-extrabold mb-1 ${plan.highlight ? 'text-white' : 'text-foreground'}`}
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {plan.name}
                    </h3>
                    <p className={`text-xs leading-relaxed mb-4 ${plan.highlight ? 'text-white/55' : 'text-muted-foreground'}`}>
                      {plan.tagline}
                    </p>
                    <div className="flex items-baseline gap-1">
                      {plan.currency && (
                        <span className={`text-sm font-medium ${plan.highlight ? 'text-white/60' : 'text-muted-foreground'}`}>
                          {plan.currency}
                        </span>
                      )}
                      <span
                        className={`text-3xl font-extrabold ${plan.highlight ? 'text-[#00C8FF]' : 'text-foreground'}`}
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {plan.price}
                      </span>
                    </div>
                    <p className={`text-xs mt-1 ${plan.highlight ? 'text-white/40' : 'text-muted-foreground'}`}>
                      {plan.period === 'one-time' ? 'One-time payment' : plan.period === 'tailored' ? 'Custom quote' : plan.period}
                    </p>
                  </div>

                  <ul className="space-y-2.5 flex-1 mb-6">
                    {plan.features.map((f) => (
                      <li key={f.text} className="flex items-start gap-2.5">
                        {f.included ? (
                          <CheckCircle className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlight ? 'text-[#00C8FF]' : 'text-[#00C8FF]'}`} />
                        ) : (
                          <X className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlight ? 'text-white/20' : 'text-muted-foreground/40'}`} />
                        )}
                        <span className={`text-sm ${
                          f.included
                            ? plan.highlight ? 'text-white' : 'text-foreground'
                            : plan.highlight ? 'text-white/30' : 'text-muted-foreground/50'
                        }`}>
                          {f.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={plan.isCustom ? '/contact' : '/request-service'}
                    className={`w-full text-center font-bold px-5 py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2 ${
                      plan.highlight
                        ? 'bg-[#00C8FF] text-[#001a24] hover:bg-[#00b8eb]'
                        : 'bg-[#0A1628] text-white hover:bg-[#0a1628]/90'
                    }`}
                  >
                    {plan.isCustom ? 'Request a Quote' : 'Get Started'}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-muted-foreground text-sm mt-8">
            All prices are starting estimates. Final pricing depends on project complexity and scope.{' '}
            <Link href="/contact" className="text-[#00C8FF] font-medium hover:underline">
              Contact us for a free consultation.
            </Link>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-slate-50 border-y border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-[#00C8FF] text-[11px] font-bold uppercase tracking-[0.18em] mb-3">
              <span className="w-5 h-px bg-[#00C8FF]" /> Pricing FAQs
            </span>
            <h2
              className="text-2xl sm:text-3xl font-extrabold text-foreground text-balance"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Common Pricing Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white border border-border rounded-2xl p-6 hover:border-[#00C8FF]/30 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#00C8FF]/10 rounded-full flex items-center justify-center mt-0.5 shrink-0">
                    <Zap className="w-3 h-3 text-[#00C8FF]" />
                  </div>
                  <div>
                    <h3 className="text-foreground font-semibold mb-2">{faq.q}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-navy">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-2xl sm:text-3xl font-extrabold text-white mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Ready to Get a Custom Quote?
          </h2>
          <p className="text-white/55 mb-8 leading-relaxed">
            Tell us about your project and we will send you a detailed proposal within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/request-service"
              className="inline-flex items-center justify-center gap-2 bg-[#00C8FF] text-[#001a24] font-bold px-8 py-3.5 rounded-xl hover:bg-[#00b8eb] transition-colors"
            >
              Request a Service <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold px-8 py-3.5 rounded-xl hover:bg-[#22c55e] transition-colors"
            >
              <WhatsAppIcon size={16} className="text-white" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
