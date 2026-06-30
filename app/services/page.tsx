import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Globe, Smartphone, Database, Settings, Users, BarChart3, CheckCircle, ArrowRight,
} from 'lucide-react'
import PageWrapper from '@/components/page-wrapper'
import PageHero from '@/components/page-hero'
import WhatsAppIcon from '@/components/whatsapp-icon'

export const metadata: Metadata = {
  title: 'ICT Services',
  description: 'Explore ZamTech\'s full range of ICT services — web development, mobile apps, ERP systems, database solutions, ICT consultancy, and digital transformation for Tanzanian businesses.',
  alternates: { canonical: '/services' },
  openGraph: { title: 'ICT Services | ZamTech Automation Studio', description: 'Web development, mobile apps, ERP, database solutions, and digital transformation in Tanzania.', url: '/services' },
}

const WA = 'https://wa.me/255796985138'

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    slug: 'web-development',
    tagline: 'Professional websites & web applications',
    desc: 'We design and build modern, fast, and fully responsive websites and web applications. From simple business websites to complex enterprise web platforms, we cover every aspect of the web.',
    features: [
      'Corporate & business websites',
      'E-commerce & online stores',
      'Custom web applications',
      'Landing pages & campaigns',
      'Web portals & dashboards',
      'SEO-optimized structure',
    ],
    tech: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
  },
  {
    icon: Smartphone,
    title: 'Mobile Applications',
    slug: 'mobile-apps',
    tagline: 'Android & iOS apps built to engage',
    desc: 'We build high-performance mobile applications for both Android and iOS using Flutter and React Native. Your customers will love the experience.',
    features: [
      'Cross-platform Flutter apps',
      'Android native development',
      'iOS native development',
      'App Store & Play Store publishing',
      'Push notifications & real-time updates',
      'Offline-first architecture',
    ],
    tech: ['Flutter', 'React Native', 'Firebase', 'REST APIs', 'SQLite'],
  },
  {
    icon: Settings,
    title: 'Business Systems',
    slug: 'business-systems',
    tagline: 'Automation & management systems',
    desc: 'We build custom business software including ERP systems, POS systems, inventory management, payroll, and HR systems that automate your entire operation.',
    features: [
      'Point of Sale (POS) systems',
      'Inventory management systems',
      'ERP & CRM platforms',
      'Payroll & HR systems',
      'School management systems',
      'Hospital & clinic systems',
    ],
    tech: ['Laravel', 'Node.js', 'React', 'MySQL', 'PostgreSQL'],
  },
  {
    icon: BarChart3,
    title: 'ICT Consultancy',
    slug: 'ict-consultancy',
    tagline: 'Strategic technology guidance',
    desc: 'Not sure which technology to adopt or how to transform your business digitally? Our ICT consultancy service provides expert strategic guidance tailored to your specific context.',
    features: [
      'Digital transformation strategy',
      'Technology needs assessment',
      'Software architecture planning',
      'IT infrastructure advisory',
      'Vendor & platform selection',
      'Technology training & workshops',
    ],
    tech: ['Cloud platforms', 'Network design', 'Security audits', 'Training'],
  },
  {
    icon: Database,
    title: 'Database Solutions',
    slug: 'database-solutions',
    tagline: 'Reliable data management',
    desc: 'Data is the backbone of your business. We design, build, optimize, and manage databases to ensure your data is safe, fast, and always available.',
    features: [
      'Database design & modeling',
      'Performance optimization',
      'Data migration services',
      'Backup & recovery solutions',
      'Database administration',
      'Reporting & analytics setup',
    ],
    tech: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'SQLite'],
  },
  {
    icon: Users,
    title: 'IT Support & Training',
    slug: 'it-support',
    tagline: 'Ongoing support & capacity building',
    desc: 'Technology is only valuable when people know how to use it. We provide ongoing technical support and hands-on training to ensure your team gets the most from your investment.',
    features: [
      'Post-delivery system support',
      'Remote & on-site troubleshooting',
      'Software usage training',
      'System maintenance contracts',
      'User documentation',
      'Regular system updates',
    ],
    tech: ['Remote support', 'On-site visits', 'Video training', 'Documentation'],
  },
]

function SectionLabel({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-[#00C8FF] text-[11px] font-bold uppercase tracking-[0.18em] mb-3">
      <span className="w-5 h-px bg-[#00C8FF]" />
      {text}
    </span>
  )
}

export default function ServicesPage() {
  return (
    <PageWrapper>
      <PageHero
        label="What We Do"
        title="Our Services"
        description="From web development to full business automation — we provide comprehensive ICT solutions built for real-world results."
      />

      {/* Services */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {services.map((svc, i) => {
            const Icon = svc.icon
            const isEven = i % 2 !== 0
            return (
              <div
                key={svc.slug}
                id={svc.slug}
                className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start"
              >
                {/* Text side */}
                <div className={isEven ? 'lg:order-2' : ''}>
                  <SectionLabel text={svc.tagline} />
                  <div className="w-14 h-14 bg-[#00C8FF]/10 rounded-2xl flex items-center justify-center mb-5">
                    <Icon className="w-7 h-7 text-[#00C8FF]" />
                  </div>
                  <h2
                    className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4 leading-tight"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {svc.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">{svc.desc}</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/request-service"
                      className="inline-flex items-center justify-center gap-2 bg-[#0A1628] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#0a1628]/90 transition-colors"
                    >
                      Request This Service <ArrowRight className="w-4 h-4" />
                    </Link>
                    <a
                      href={WA}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 border border-border text-foreground font-semibold px-6 py-3 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <WhatsAppIcon size={15} className="text-[#25D366]" />
                      Ask on WhatsApp
                    </a>
                  </div>
                </div>

                {/* Feature card side */}
                <div className={`bg-slate-50 border border-border rounded-2xl p-7 ${isEven ? 'lg:order-1' : ''}`}>
                  <h3 className="text-foreground font-bold text-xs uppercase tracking-widest mb-5">
                    What&apos;s Included
                  </h3>
                  <ul className="space-y-3 mb-7">
                    {svc.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-[#00C8FF] mt-0.5 shrink-0" />
                        <span className="text-foreground text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-border pt-5">
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mb-3">
                      Technologies Used
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {svc.tech.map((t) => (
                        <span
                          key={t}
                          className="bg-[#00C8FF]/10 text-[#00C8FF] text-xs font-medium px-3 py-1 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-navy">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-2xl sm:text-3xl font-extrabold text-white mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Not Sure Which Service You Need?
          </h2>
          <p className="text-white/55 mb-8 leading-relaxed">
            Tell us about your business challenge and we will recommend the right solution for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#00C8FF] text-[#001a24] font-bold px-8 py-3.5 rounded-xl hover:bg-[#00b8eb] transition-colors"
            >
              Talk to an Expert <ArrowRight className="w-4 h-4" />
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
