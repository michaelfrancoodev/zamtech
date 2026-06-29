import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import WhatsAppIcon from '@/components/whatsapp-icon'
import {
  Globe, Smartphone, Database, Settings, Shield, BarChart3,
  CheckCircle2, ArrowRight, Star, Users, Briefcase, TrendingUp,
  Clock, Phone, ChevronRight,
} from 'lucide-react'

const PHONE_RAW = '+255796985138'
const WA_LINK   = `https://wa.me/${PHONE_RAW.replace('+', '')}`
const PHONE     = '+255 796 985 138'

/* ─── Data ─── */
const STATS = [
  { value: '100+', label: 'Projects Delivered', icon: Briefcase },
  { value: '60+',  label: 'Happy Clients',      icon: Users },
  { value: '5+',   label: 'Years Experience',   icon: TrendingUp },
  { value: '98%',  label: 'Satisfaction Rate',  icon: Star },
]

const SERVICES = [
  { icon: Globe,       title: 'Web Development',    desc: 'Custom websites & web apps built with modern frameworks. Responsive, fast, and secure.',            color: 'bg-cyan-50   text-cyan-600'   },
  { icon: Smartphone,  title: 'Mobile Applications', desc: 'Native & cross-platform mobile apps for Android and iOS that engage your customers anywhere.',      color: 'bg-sky-50    text-sky-600'    },
  { icon: Settings,    title: 'Business Systems',    desc: 'Custom ERP, POS, inventory, and management systems tailored to how your business works.',            color: 'bg-indigo-50 text-indigo-600' },
  { icon: Database,    title: 'Database Solutions',  desc: 'Database design, optimisation, migration, and administration for reliable data management.',        color: 'bg-teal-50   text-teal-600'   },
  { icon: Shield,      title: 'ICT Consultancy',     desc: 'Strategic technology guidance to help your business choose and implement the right tools.',          color: 'bg-emerald-50 text-emerald-600'},
  { icon: BarChart3,   title: 'Digital Transformation', desc: 'End-to-end automation of your processes — reduce manual work and grow faster.',                 color: 'bg-blue-50   text-blue-600'   },
]

const WHY_US = [
  { title: 'On-Time Delivery',     desc: 'We commit to deadlines and deliver on schedule, every project, every time.' },
  { title: 'Local Understanding',  desc: 'We know the Tanzanian and East African business environment deeply.' },
  { title: 'Full Ongoing Support', desc: 'Maintenance and support long after your project launches.' },
  { title: 'Transparent Pricing',  desc: 'Clear, itemised quotes with no hidden fees or surprise charges.' },
  { title: 'Proven Track Record',  desc: 'Over 100 successfully delivered projects across multiple industries.' },
  { title: 'Modern Technology',    desc: 'We use current, industry-standard tools that scale with your growth.' },
]

const PROCESS = [
  { step: '01', title: 'Discovery',    desc: 'We understand your business goals, needs, and project requirements in detail.' },
  { step: '02', title: 'Planning',     desc: 'We create a clear project plan, timeline, and cost estimate for your approval.' },
  { step: '03', title: 'Development',  desc: 'Our team builds your solution with regular updates and progress reports.' },
  { step: '04', title: 'Delivery',     desc: 'We launch, test, hand over, and provide ongoing support for your project.' },
]

const TESTIMONIALS = [
  { name: 'Amina Salim',    initials: 'AS', role: 'CEO, Salim Traders Ltd',        rating: 5, color: 'bg-cyan-600',   quote: 'ZamTech delivered our e-commerce platform on time and it transformed our business. Professional, responsive, and truly understands business needs.'           },
  { name: 'David Mwangi',   initials: 'DM', role: 'MD, Mwangi Holdings',            rating: 5, color: 'bg-sky-600',    quote: 'The business management system they built cut our admin time by 60%. Exceptional quality and great value for money. Highly recommended.'                    },
  { name: 'Fatuma Hassan',  initials: 'FH', role: 'Founder, FH Boutique',           rating: 5, color: 'bg-teal-600',   quote: 'Our mobile app launched successfully and our customers love it. ZamTech explained everything clearly and delivered exactly what they promised.'             },
  { name: "Robert Ng'ang'a",initials: 'RN', role: 'IT Manager, Serengeti Logistics', rating: 5, color: 'bg-indigo-600', quote: 'We had tried two other developers before ZamTech. Both failed to deliver. ZamTech understood our complex logistics requirements from day one.'               },
  { name: 'Grace Mwenda',   initials: 'GM', role: 'Principal, Shining Stars Academy', rating: 5, color: 'bg-cyan-700',  quote: 'Our school management system handles everything from admissions to fee collection. Delivered on time and within budget. Highly recommended.'                  },
  { name: 'James Mkwawa',   initials: 'JM', role: 'Director, Mkwawa & Associates',  rating: 5, color: 'bg-sky-700',    quote: 'Before ZamTech our online presence was non-existent. Within 3 months we were getting real client inquiries. Their work is a game-changer.'                },
]

/* ─── Small reusable pieces ─── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 text-[#00C8FF] text-xs font-bold uppercase tracking-[0.15em] mb-3">
      <span className="w-5 h-px bg-[#00C8FF] inline-block" />
      {children}
    </p>
  )
}

function SectionTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={`text-[#0A1628] font-extrabold text-2xl sm:text-3xl md:text-[38px] leading-tight text-balance ${className}`}
      style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.025em' }}
    >
      {children}
    </h2>
  )
}

/* ─── Page ─── */
export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>

        {/* ═══════════════════════════════════════════
            HERO
        ═══════════════════════════════════════════ */}
        <section className="relative min-h-[100svh] flex items-center bg-[#0A1628] overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src="/images/hero-office.png"
              alt=""
              fill
              className="object-cover opacity-20"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[#0A1628]/60" />
          </div>

          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'linear-gradient(rgba(0,200,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,255,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
          />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16 sm:pt-32 sm:pb-24">

            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 bg-white/8 border border-white/12 rounded-full px-3.5 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FF] animate-pulse" />
              <span className="text-white/70 text-xs font-medium">Mbeya, Tanzania&apos;s Leading ICT Studio</span>
            </div>

            <h1
              className="text-white font-extrabold text-[clamp(2rem,8vw,4.5rem)] leading-[1.05] mb-5 max-w-3xl text-balance"
              style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}
            >
              We Build Digital Solutions{' '}
              <span className="text-[#00C8FF]">
                That Drive Real Results
              </span>
            </h1>

            <p className="text-white/55 text-base sm:text-lg max-w-xl leading-relaxed mb-8">
              From websites and mobile apps to complete business automation —
              ZamTech delivers high-quality ICT solutions tailored to your needs.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-12">
              <Link
                href="/request-service"
                className="inline-flex items-center justify-center gap-2 bg-[#00C8FF] text-[#001a24] font-bold text-base px-7 py-3.5 rounded-xl hover:bg-[#00b8eb] active:scale-[0.98] transition-all shadow-lg shadow-[#00C8FF]/20"
              >
                Start Your Project <ArrowRight size={17} />
              </Link>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold text-base px-7 py-3.5 rounded-xl hover:bg-white/8 active:scale-[0.98] transition-all"
              >
                <WhatsAppIcon size={17} className="text-[#25D366]" />
                WhatsApp Us
              </a>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {STATS.map(stat => (
                <div
                  key={stat.label}
                  className="flex flex-col items-start gap-1 bg-white/6 border border-white/10 rounded-xl px-4 py-3.5"
                >
                  <stat.icon size={14} className="text-[#00C8FF] mb-0.5" />
                  <span className="text-white font-extrabold text-xl leading-none" style={{ fontFamily: 'var(--font-heading)' }}>
                    {stat.value}
                  </span>
                  <span className="text-white/40 text-[11px] leading-tight">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SERVICES
        ═══════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <SectionLabel>What We Do</SectionLabel>
              <SectionTitle>Our Core Services</SectionTitle>
              <p className="text-slate-500 text-base mt-3 max-w-lg mx-auto leading-relaxed">
                End-to-end ICT services that help businesses grow, operate efficiently, and stay competitive.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SERVICES.map((service, i) => (
                <div
                  key={service.title}
                  className={`relative bg-white border rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 group ${
                    i === 0
                      ? 'border-[#00C8FF]/40 shadow-md shadow-[#00C8FF]/8 lg:col-span-1'
                      : 'border-slate-200 hover:border-[#00C8FF]/25'
                  }`}
                >
                  {i === 0 && (
                    <div className="absolute top-4 right-4 bg-[#00C8FF]/10 border border-[#00C8FF]/20 text-[#00C8FF] text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide uppercase">
                      Popular
                    </div>
                  )}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 shrink-0 ${service.color}`}>
                    <service.icon size={22} />
                  </div>
                  <h3
                    className="text-[#0A1628] font-bold text-[15px] mb-2 leading-snug"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">{service.desc}</p>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-1.5 text-[#00C8FF] text-sm font-semibold group-hover:gap-3 transition-all"
                  >
                    Learn more <ArrowRight size={13} />
                  </Link>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 border border-slate-200 text-[#0A1628] font-semibold text-sm px-6 py-3 rounded-xl hover:bg-slate-50 transition-colors"
              >
                View All Services <ChevronRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            WHY CHOOSE US
        ═══════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 bg-[#f8fafc]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

              {/* Left */}
              <div>
                <SectionLabel>Why ZamTech</SectionLabel>
                <SectionTitle className="mb-4">
                  Built for Tanzanian Business
                </SectionTitle>
                <p className="text-slate-500 text-base leading-relaxed mb-8">
                  We combine international standards with deep local knowledge to deliver solutions that actually work for your business context and budget.
                </p>
                <div className="flex flex-col xs:flex-row gap-3">
                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center gap-2 bg-[#0A1628] text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-[#0A1628]/90 transition-colors"
                  >
                    About Us <ArrowRight size={14} />
                  </Link>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center justify-center gap-2 border border-slate-200 text-[#0A1628] font-semibold text-sm px-6 py-3 rounded-xl hover:bg-white transition-colors"
                  >
                    View Pricing
                  </Link>
                </div>
              </div>

              {/* Right grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {WHY_US.map(item => (
                  <div
                    key={item.title}
                    className="bg-white rounded-xl p-5 border border-slate-200 flex gap-3 hover:shadow-sm hover:border-[#00C8FF]/25 transition-all"
                  >
                    <CheckCircle2 size={15} className="text-[#00C8FF] shrink-0 mt-0.5" />
                    <div>
                      <h4
                        className="text-[#0A1628] font-semibold text-sm mb-1 leading-snug"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {item.title}
                      </h4>
                      <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            HOW WE WORK — bold numbered timeline
        ══════════════════════════���════════════════ */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-14">
              <SectionLabel>Our Process</SectionLabel>
              <SectionTitle>How We Work</SectionTitle>
              <p className="text-slate-400 text-base mt-3 max-w-md mx-auto">
                A clear, four-step process that keeps you informed from start to finish.
              </p>
            </div>

            {/* Desktop: horizontal timeline */}
            <div className="hidden md:block relative">
              {/* Connecting line */}
              <div className="absolute top-10 left-[calc(12.5%)] right-[calc(12.5%)] h-px bg-gradient-to-r from-[#00C8FF]/20 via-[#00C8FF]/60 to-[#00C8FF]/20" />

              <div className="grid grid-cols-4 gap-6">
                {PROCESS.map((p, i) => (
                  <div key={p.step} className="flex flex-col items-center text-center group">
                    {/* Number circle */}
                    <div className="relative mb-6">
                      <div className="w-20 h-20 rounded-full bg-[#0A1628] border-2 border-[#00C8FF]/30 flex items-center justify-center z-10 relative group-hover:border-[#00C8FF] group-hover:shadow-lg group-hover:shadow-[#00C8FF]/15 transition-all duration-300">
                        <span
                          className="text-[#00C8FF] font-extrabold text-2xl leading-none"
                          style={{ fontFamily: 'var(--font-heading)' }}
                        >
                          {i + 1}
                        </span>
                      </div>
                    </div>
                    <h3
                      className="text-[#0A1628] font-extrabold text-[17px] mb-3"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {p.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-[200px]">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: vertical stacked cards */}
            <div className="md:hidden space-y-4">
              {PROCESS.map((p, i) => (
                <div
                  key={p.step}
                  className="flex gap-4 items-start bg-[#f8fafc] rounded-2xl p-5 border border-slate-200"
                >
                  <div className="w-12 h-12 rounded-full bg-[#0A1628] border-2 border-[#00C8FF]/40 flex items-center justify-center shrink-0">
                    <span
                      className="text-[#00C8FF] font-extrabold text-lg leading-none"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {i + 1}
                    </span>
                  </div>
                  <div className="pt-1">
                    <h3
                      className="text-[#0A1628] font-bold text-[15px] mb-1.5"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {p.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            BUSINESS HOURS — single responsive section
        ═══════════════════════════════════════════ */}
        <section className="bg-[#0A1628] border-y border-white/[0.06] py-8 sm:py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">

            {/* Header row */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-[#00C8FF]/12 flex items-center justify-center shrink-0">
                <Clock size={16} className="text-[#00C8FF]" />
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-none" style={{ fontFamily: 'var(--font-heading)' }}>
                  Business Hours
                </p>
                <p className="text-white/40 text-xs mt-1">Mbeya, Tanzania</p>
              </div>
            </div>

            {/* Hours + contacts grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

              {/* Mon–Fri */}
              <div className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-5 py-4">
                <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-1.5">Mon – Fri</p>
                <p className="text-white font-bold text-base">8:00am – 6:00pm</p>
                <p className="text-[#00C8FF] text-xs mt-0.5">East Africa Time</p>
              </div>

              {/* Saturday */}
              <div className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-5 py-4">
                <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-1.5">Saturday</p>
                <p className="text-white font-bold text-base">9:00am – 1:00pm</p>
                <p className="text-[#00C8FF] text-xs mt-0.5">East Africa Time</p>
              </div>

              {/* Sunday */}
              <div className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-5 py-4">
                <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-1.5">Sunday</p>
                <p className="text-white/25 font-bold text-base">Closed</p>
                <p className="text-white/20 text-xs mt-0.5">Rest day</p>
              </div>

              {/* Contact */}
              <div className="flex flex-col gap-2">
                <a
                  href={`tel:${PHONE_RAW}`}
                  className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.07] rounded-xl px-5 py-3 hover:bg-white/[0.07] hover:border-[#00C8FF]/30 active:scale-[0.98] transition-all group"
                >
                  <Phone size={14} className="text-[#00C8FF] shrink-0" />
                  <div className="min-w-0">
                    <p className="text-white/40 text-[10px] font-semibold uppercase tracking-wider">Call Us</p>
                    <p className="text-white font-semibold text-[13px] truncate">{PHONE}</p>
                  </div>
                </a>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-[#25D366]/15 border border-[#25D366]/25 rounded-xl px-5 py-3 hover:bg-[#25D366]/25 active:scale-[0.98] transition-all"
                >
                  <WhatsAppIcon size={14} className="text-[#25D366] shrink-0" />
                  <div>
                    <p className="text-white/40 text-[10px] font-semibold uppercase tracking-wider">WhatsApp</p>
                    <p className="text-white font-semibold text-[13px]">Message Us</p>
                  </div>
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* ═════════════════════��═════════════════════
            TESTIMONIALS — seamless infinite marquee
        ═══════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 bg-[#f8fafc] overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-10 text-center">
            <SectionLabel>Client Reviews</SectionLabel>
            <SectionTitle>What Our Clients Say</SectionTitle>
          </div>

          {/* Marquee wrapper */}
          <div className="relative w-full overflow-hidden">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[#f8fafc] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[#f8fafc] to-transparent z-10 pointer-events-none" />

            <div className="marquee-track gap-4 px-4">
              {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                <div
                  key={`${t.name}-${i}`}
                  className="w-[290px] sm:w-[320px] shrink-0 bg-white border border-slate-200 rounded-2xl p-5 flex flex-col"
                >
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={12} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-500 text-[13px] leading-relaxed italic flex-1 mb-4">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center shrink-0`}>
                      <span className="text-white font-bold text-xs">{t.initials}</span>
                    </div>
                    <div>
                      <p
                        className="text-[#0A1628] font-semibold text-sm leading-tight"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {t.name}
                      </p>
                      <p className="text-slate-400 text-xs mt-0.5">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-2 border border-slate-200 text-[#0A1628] font-semibold text-sm px-6 py-3 rounded-xl hover:bg-white transition-colors"
            >
              Read All Reviews <ChevronRight size={15} />
            </Link>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            HOME-ONLY CTA — shown on home page only
        ═══════════════════════════════════════════ */}
        <section className="bg-[#0A1628] border-t border-white/[0.07]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8">
              {/* Text */}
              <div className="text-center lg:text-left max-w-lg">
                <span className="inline-flex items-center gap-2 text-[#00C8FF] text-[11px] font-bold uppercase tracking-[0.18em] mb-3">
                  <span className="w-4 h-px bg-[#00C8FF] hidden lg:inline-block" />
                  Free consultation, no commitment
                </span>
                <h2
                  className="text-white font-extrabold text-2xl sm:text-[32px] leading-tight mb-3 text-balance"
                  style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.025em' }}
                >
                  Ready to Transform{' '}
                  <span className="text-[#00C8FF]">Your Business?</span>
                </h2>
                <p className="text-white/45 text-sm sm:text-base leading-relaxed">
                  Join 60+ businesses across Tanzania that trust ZamTech to power their digital operations.
                </p>
              </div>
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
                <Link
                  href="/request-service"
                  className="inline-flex items-center justify-center gap-2 bg-[#00C8FF] text-[#001a24] font-bold text-sm px-8 py-3.5 rounded-xl hover:bg-[#00b8eb] active:scale-[0.98] transition-all whitespace-nowrap shadow-lg shadow-[#00C8FF]/20"
                >
                  Get a Free Quote <ArrowRight size={15} />
                </Link>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 text-white text-sm font-semibold px-8 py-3.5 rounded-xl hover:bg-white/8 active:scale-[0.98] transition-all whitespace-nowrap"
                >
                  <WhatsAppIcon size={15} className="text-[#25D366]" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
