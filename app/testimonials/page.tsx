import type { Metadata } from 'next'
import Link from 'next/link'
import { Star, Quote, ArrowRight } from 'lucide-react'
import PageWrapper from '@/components/page-wrapper'
import PageHero from '@/components/page-hero'
import WhatsAppIcon from '@/components/whatsapp-icon'

export const metadata: Metadata = {
  title: 'Client Reviews & Testimonials',
  description: 'Read what our clients across Tanzania say about ZamTech. Real reviews from businesses we have built websites, mobile apps, and ERP systems for.',
  alternates: { canonical: '/testimonials' },
  openGraph: { title: 'Client Reviews | ZamTech Tanzania', description: 'Real testimonials from businesses across Tanzania.', url: '/testimonials' },
}

const WA = 'https://wa.me/255796985138'

const testimonials = [
  {
    name: 'Amina Hassan', initials: 'AH', color: '#0891b2',
    role: 'CEO', company: 'Karibu Retail Ltd', location: 'Dar es Salaam',
    service: 'POS & Inventory System', rating: 5,
    text: 'ZamTech built our entire POS and inventory management system in just 6 weeks. The team was incredibly professional, communicated clearly throughout, and delivered a product that has transformed how we manage our business.',
  },
  {
    name: 'James Mkwawa', initials: 'JM', color: '#0e4d8a',
    role: 'Managing Director', company: 'Mkwawa & Associates', location: 'Dodoma',
    service: 'Corporate Website', rating: 5,
    text: 'Before ZamTech, our online presence was non-existent. They designed and built our corporate website from scratch — modern, fast, and professional. Within 3 months of launch, we were getting real client inquiries.',
  },
  {
    name: 'Fatuma Said', initials: 'FS', color: '#0f766e',
    role: 'Founder', company: 'FarmLink Tanzania', location: 'Arusha',
    service: 'Mobile Application', rating: 5,
    text: 'The mobile app ZamTech built for FarmLink connects farmers directly to buyers in real time. The app works offline in areas with poor connectivity — which was critical for us. Their technical expertise is world-class.',
  },
  {
    name: "Robert Ng'ang'a", initials: 'RN', color: '#4338ca',
    role: 'IT Manager', company: 'Serengeti Logistics', location: 'Dar es Salaam',
    service: 'ERP System', rating: 5,
    text: 'We had tried two other developers before ZamTech. Both failed to deliver. ZamTech understood our complex logistics requirements from day one and built us a fully functional ERP system. Excellent after-delivery support.',
  },
  {
    name: 'Grace Mwenda', initials: 'GM', color: '#0891b2',
    role: 'Principal', company: 'Shining Stars Academy', location: 'Mwanza',
    service: 'School Management System', rating: 5,
    text: 'Our school management system handles everything from admissions to fee collection, exam results, and parent communication. ZamTech delivered on time and within budget. Highly recommended.',
  },
  {
    name: 'David Ochieng', initials: 'DO', color: '#0e7490',
    role: 'CEO', company: 'HealthPlus Clinics', location: 'Dar es Salaam',
    service: 'Patient Management System', rating: 5,
    text: 'ZamTech developed a patient management and appointment booking system for our chain of clinics. Easy to use, and has dramatically reduced our administrative overhead. Their team handled everything with great professionalism.',
  },
]

const stats = [
  { value: '98%', label: 'Client Satisfaction Rate' },
  { value: '30+', label: 'Verified Reviews' },
  { value: '5.0', label: 'Average Rating' },
  { value: '0', label: 'Refunds Issued' },
]

export default function TestimonialsPage() {
  return (
    <PageWrapper>
      <PageHero
        label="Client Reviews"
        title="What Our Clients Say"
        description="Real feedback from real businesses. We are proud of the impact our work has had on clients across Tanzania."
      />

      {/* Stats band */}
      <section className="bg-[#0a1628] border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p
                  className="text-3xl md:text-4xl font-extrabold text-[#00C8FF]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {s.value}
                </p>
                <p className="text-white/40 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white border border-border rounded-2xl p-6 flex flex-col hover:border-[#00C8FF]/30 hover:shadow-md transition-all"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Service badge */}
                <span className="inline-block bg-[#00C8FF]/10 text-[#00C8FF] text-xs font-medium px-3 py-1 rounded-full mb-4 w-fit">
                  {t.service}
                </span>

                <Quote className="w-5 h-5 text-[#00C8FF]/20 mb-3" />

                <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-5">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 border-t border-border pt-4">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-sm"
                    style={{ backgroundColor: t.color }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p
                      className="text-foreground font-semibold text-sm leading-none mb-0.5"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {t.name}
                    </p>
                    <p className="text-muted-foreground text-xs">{t.role}, {t.company}</p>
                    <p className="text-muted-foreground text-xs">{t.location}</p>
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
            Join Our Satisfied Clients
          </h2>
          <p className="text-white/55 mb-8 leading-relaxed">
            Ready to experience the ZamTech difference? Let&apos;s start your project today.
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
