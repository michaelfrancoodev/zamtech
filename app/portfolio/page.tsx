import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ShoppingCart, GraduationCap, Truck, LayoutDashboard,
  HeartPulse, Building2, ArrowRight, CheckCircle2,
  Globe, Smartphone, Settings, Database, BarChart3,
  ExternalLink,
} from 'lucide-react'
import PageWrapper from '@/components/page-wrapper'
import PageHero from '@/components/page-hero'
import WhatsAppIcon from '@/components/whatsapp-icon'

export const metadata: Metadata = {
  title: 'Portfolio & Case Studies',
  description: 'See real projects built by ZamTech Automation Studio — e-commerce platforms, ERP systems, school management systems, mobile apps, and business dashboards for clients across Tanzania.',
  alternates: { canonical: '/portfolio' },
  openGraph: {
    title: 'Portfolio | ZamTech Automation Studio Tanzania',
    description: 'Real ICT projects delivered for Tanzanian businesses — websites, ERP, mobile apps, and custom business systems.',
    url: '/portfolio',
  },
}

const WA = 'https://wa.me/255796985138'

const PROJECTS = [
  {
    title: 'Salim Traders E-Commerce Platform',
    category: 'Web Development',
    industry: 'Retail',
    icon: ShoppingCart,
    accent: 'from-cyan-500/20 to-sky-500/5',
    border: 'border-cyan-500/20',
    iconBg: 'bg-cyan-500/10',
    iconColor: 'text-cyan-400',
    tag: 'border border-cyan-500/25 text-cyan-400 bg-cyan-500/10',
    tagLight: 'bg-cyan-50 text-cyan-600',
    challenge:
      'Salim Traders had a thriving offline retail operation in Dar es Salaam but zero online presence. They were losing customers to competitors who had WhatsApp catalogues and basic websites, and had no way to accept mobile payments digitally.',
    solution:
      'We built a full e-commerce platform with a product catalog supporting 500+ SKUs, cart and checkout with M-Pesa Lipa Na integration, automated stock level management, and a custom admin dashboard for order processing and inventory updates.',
    outcomes: [
      'Online orders contributing 35% of total revenue within 6 months',
      'M-Pesa integration processing over TZS 8M/month in transactions',
      'Stock management time reduced from 3 hours/day to 15 minutes',
      'Customer base expanded by 40% through online discovery',
    ],
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'M-Pesa API', 'Vercel'],
    duration: '10 weeks',
    year: '2024',
  },
  {
    title: 'Shining Stars Academy Management System',
    category: 'Business System',
    industry: 'Education',
    icon: GraduationCap,
    accent: 'from-indigo-500/20 to-violet-500/5',
    border: 'border-indigo-500/20',
    iconBg: 'bg-indigo-500/10',
    iconColor: 'text-indigo-400',
    tag: 'border border-indigo-500/25 text-indigo-400 bg-indigo-500/10',
    tagLight: 'bg-indigo-50 text-indigo-600',
    challenge:
      'A growing private school in Mbeya was managing admissions, fees, attendance, and exam results across multiple paper registers and Excel files. Term-end report generation took over a week and fee default tracking was nearly impossible.',
    solution:
      'A comprehensive school management system covering student admissions, attendance tracking (teacher-facing mobile interface), fee payment recording with automatic receipt generation, result entry and report card generation, and a parent portal for checking results and fee balances.',
    outcomes: [
      'Report card generation reduced from 1 week to 2 hours per term',
      'Fee collection rate improved from 71% to 94% through automated reminders',
      'Attendance records now 100% digital — accessible from any device',
      'Parents can check results and balances via SMS code or web portal',
    ],
    tech: ['React', 'Django', 'PostgreSQL', 'SMS API', 'PWA'],
    duration: '14 weeks',
    year: '2023',
  },
  {
    title: 'Serengeti Logistics ERP',
    category: 'ERP System',
    industry: 'Logistics',
    icon: Truck,
    accent: 'from-teal-500/20 to-emerald-500/5',
    border: 'border-teal-500/20',
    iconBg: 'bg-teal-500/10',
    iconColor: 'text-teal-400',
    tag: 'border border-teal-500/25 text-teal-400 bg-teal-500/10',
    tagLight: 'bg-teal-50 text-teal-600',
    challenge:
      'A logistics company operating 40+ trucks across Tanzania was managing fleet, drivers, routes, and billing entirely on paper and WhatsApp groups. Fuel theft was rampant, invoices were often wrong, and management had no real-time visibility into operations.',
    solution:
      'End-to-end logistics ERP with fleet management (vehicle service scheduling, fuel tracking with driver sign-offs), real-time route assignment, driver management with trip logs, client management and automated invoicing, and a management dashboard showing live fleet status and monthly P&L.',
    outcomes: [
      'Fuel cost reduction of 18% in the first quarter after deployment',
      'Invoice accuracy improved from 83% to 99.7%',
      'Fleet utilisation visibility went from 0% to 100% real-time',
      'Driver accountability led to 60% fewer disputed trip reports',
    ],
    tech: ['React', 'Node.js', 'PostgreSQL', 'Google Maps API', 'Firebase'],
    duration: '20 weeks',
    year: '2024',
  },
  {
    title: 'Mwangi Holdings Business Intelligence Dashboard',
    category: 'Business Intelligence',
    industry: 'Finance',
    icon: LayoutDashboard,
    accent: 'from-sky-500/20 to-blue-500/5',
    border: 'border-sky-500/20',
    iconBg: 'bg-sky-500/10',
    iconColor: 'text-sky-400',
    tag: 'border border-sky-500/25 text-sky-400 bg-sky-500/10',
    tagLight: 'bg-sky-50 text-sky-600',
    challenge:
      'Mwangi Holdings operated 5 branches across Tanzania with separate accounting systems, Excel-based HR, and no consolidated view of performance. The MD was making decisions based on reports that were 2–3 weeks old and often contradictory across branches.',
    solution:
      'A centralised business intelligence platform pulling data from all branches into a single dashboard: real-time revenue by branch and product line, HR management with payroll and leave tracking, inventory across all locations, and automated weekly reports delivered by email every Monday at 8 AM.',
    outcomes: [
      'MD now has real-time consolidated P&L without waiting for branch reports',
      'Payroll processing time reduced from 2 days to 3 hours',
      'Inter-branch stock transfers increased efficiency by 22%',
      'First quarterly audit completed in 2 days vs 3 weeks previously',
    ],
    tech: ['React', 'Python', 'PostgreSQL', 'Recharts', 'Celery'],
    duration: '18 weeks',
    year: '2024',
  },
  {
    title: 'AfyaPlus Clinic Management System',
    category: 'Healthcare System',
    industry: 'Healthcare',
    icon: HeartPulse,
    accent: 'from-rose-500/20 to-pink-500/5',
    border: 'border-rose-500/20',
    iconBg: 'bg-rose-500/10',
    iconColor: 'text-rose-400',
    tag: 'border border-rose-500/25 text-rose-400 bg-rose-500/10',
    tagLight: 'bg-rose-50 text-rose-600',
    challenge:
      'A multi-branch clinic in Mwanza was managing patient records in physical files, appointment bookings via phone calls, and billing manually. Patient files were frequently misplaced, appointment no-shows were over 30%, and billing errors were causing revenue leakage.',
    solution:
      'A full clinic management system with digital patient records (searchable by name, ID, or phone), appointment booking with automated SMS reminders, lab results management with doctor notes, multi-branch billing with receipt generation and insurance claim tracking.',
    outcomes: [
      'Appointment no-show rate reduced from 31% to 9%',
      'Patient file retrieval time reduced from 10 minutes to 10 seconds',
      'Billing errors eliminated — revenue increased by 12% in first 3 months',
      'Insurance claim processing time cut from 3 weeks to 5 days',
    ],
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Africa\'s Talking SMS', 'Redis'],
    duration: '16 weeks',
    year: '2023',
  },
  {
    title: 'ZamBuild Property Listing Platform',
    category: 'Web Application',
    industry: 'Real Estate',
    icon: Building2,
    accent: 'from-amber-500/20 to-orange-500/5',
    border: 'border-amber-500/20',
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-400',
    tag: 'border border-amber-500/25 text-amber-400 bg-amber-500/10',
    tagLight: 'bg-amber-50 text-amber-600',
    challenge:
      'A real estate agency was listing properties only on social media, spending hours creating posts and losing leads who wanted more details than a WhatsApp message could provide. Agents had no organised system for tracking inquiries or following up with potential buyers.',
    solution:
      'A property listing platform with advanced search and filters (location, price, bedrooms, property type), high-resolution photo galleries, agent profiles, a mortgage calculator for Tanzanian bank rates, inquiry capture with automatic assignment to agents, and a CRM for tracking buyer journeys.',
    outcomes: [
      'Property inquiry volume increased by 180% in the first 2 months',
      'Agent response time to leads improved from 2 days to 4 hours',
      'Social media advertising cost reduced by 40% — organic traffic from Google',
      'Platform now generates 65% of the agency\'s monthly leads',
    ],
    tech: ['Next.js', 'Supabase', 'Cloudinary', 'Google Maps API', 'Vercel'],
    duration: '12 weeks',
    year: '2024',
  },
]

const STATS = [
  { value: '100+', label: 'Projects Delivered' },
  { value: '6+',   label: 'Industries Served' },
  { value: '98%',  label: 'Client Satisfaction' },
  { value: '5+',   label: 'Years Experience' },
]

const SERVICES_COVERED = [
  { icon: Globe,    label: 'Web Development' },
  { icon: Smartphone, label: 'Mobile Apps' },
  { icon: Settings, label: 'Business Systems' },
  { icon: Database, label: 'Database Solutions' },
  { icon: BarChart3, label: 'Business Intelligence' },
  { icon: LayoutDashboard, label: 'Custom Dashboards' },
]

export default function PortfolioPage() {
  return (
    <PageWrapper>
      <PageHero
        label="Our Work"
        title="Projects Delivered Across Tanzania"
        description="Real systems built for real businesses — from retail and education to healthcare and logistics. Every project on this page is live and in use today."
      />

      {/* Stats strip */}
      <section className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-extrabold text-[#0A1628]" style={{ fontFamily: 'var(--font-heading)' }}>
                  {s.value}
                </p>
                <p className="text-muted-foreground text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {PROJECTS.map((project, idx) => {
            const Icon = project.icon
            const isEven = idx % 2 === 0
            return (
              <article
                key={project.title}
                className={`bg-[#0A1628] rounded-3xl overflow-hidden border ${project.border} flex flex-col lg:flex-row`}
              >
                {/* Left — details */}
                <div className={`flex-1 p-8 lg:p-10 ${!isEven ? 'lg:order-2' : ''}`}>
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-12 h-12 ${project.iconBg} rounded-2xl flex items-center justify-center shrink-0`}>
                      <Icon className={`w-6 h-6 ${project.iconColor}`} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap gap-2 mb-1.5">
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${project.tag}`}>
                          {project.category}
                        </span>
                        <span className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/5 text-white/40 border border-white/10">
                          {project.industry}
                        </span>
                      </div>
                      <h2
                        className="text-white font-extrabold text-xl leading-snug text-balance"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {project.title}
                      </h2>
                    </div>
                  </div>

                  {/* Challenge */}
                  <div className="mb-5">
                    <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-2">The Challenge</p>
                    <p className="text-white/60 text-sm leading-relaxed">{project.challenge}</p>
                  </div>

                  {/* Solution */}
                  <div className="mb-5">
                    <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-2">Our Solution</p>
                    <p className="text-white/60 text-sm leading-relaxed">{project.solution}</p>
                  </div>

                  {/* Tech + meta */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tech.map((t) => (
                      <span key={t} className="text-[10px] font-semibold text-white/35 bg-white/[0.06] border border-white/[0.08] px-2.5 py-1 rounded-full">
                        {t}
                      </span>
                    ))}
                    <span className="text-[10px] font-semibold text-white/25 bg-white/[0.03] px-2.5 py-1 rounded-full">
                      {project.duration}
                    </span>
                    <span className="text-[10px] font-semibold text-white/25 bg-white/[0.03] px-2.5 py-1 rounded-full">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Right — outcomes */}
                <div className={`lg:w-80 xl:w-96 bg-white/[0.03] border-t lg:border-t-0 ${isEven ? 'lg:border-l' : 'lg:border-r lg:order-1'} border-white/[0.06] p-8 lg:p-10 flex flex-col`}>
                  <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-5">Outcomes</p>
                  <ul className="space-y-4 flex-1">
                    {project.outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#00C8FF] shrink-0 mt-0.5" />
                        <p className="text-white/65 text-sm leading-relaxed">{outcome}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 pt-6 border-t border-white/[0.06]">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 bg-white/[0.07] hover:bg-white/[0.12] text-white/70 hover:text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all border border-white/[0.08]"
                    >
                      Build something similar <ExternalLink size={12} />
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* Services covered */}
      <section className="py-14 bg-white border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 text-[#00C8FF] text-[11px] font-bold uppercase tracking-[0.18em] mb-3">
              <span className="w-5 h-px bg-[#00C8FF]" /> What We Build
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A1628] text-balance" style={{ fontFamily: 'var(--font-heading)' }}>
              Capabilities Demonstrated in This Portfolio
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {SERVICES_COVERED.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-slate-50 border border-border hover:border-[#00C8FF]/30 hover:bg-[#00C8FF]/5 transition-all text-center">
                <div className="w-10 h-10 bg-[#0A1628] rounded-xl flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#00C8FF]" />
                </div>
                <p className="text-[#0A1628] font-semibold text-xs leading-tight">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 text-[#00C8FF] text-[11px] font-bold uppercase tracking-[0.18em] mb-4">
            <span className="w-5 h-px bg-[#00C8FF]" /> Start Your Project
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-balance mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Ready to add your project to this list?
          </h2>
          <p className="text-white/50 leading-relaxed mb-8 max-w-xl mx-auto">
            Every project above started with a conversation. Tell us what your business needs and we will tell you how we can build it.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/request-service"
              className="inline-flex items-center gap-2 bg-[#00C8FF] text-[#001a24] font-bold px-8 py-4 rounded-xl hover:bg-[#00b8eb] transition-colors"
            >
              Request a Service <ArrowRight size={16} />
            </Link>
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/[0.07] border border-white/[0.12] text-white font-semibold px-7 py-4 rounded-xl hover:bg-white/[0.12] transition-colors"
            >
              <WhatsAppIcon size={18} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
