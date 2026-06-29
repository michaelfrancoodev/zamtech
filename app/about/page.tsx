import Link from 'next/link'
import { ArrowRight, Target, Eye, Heart, Users, Award, Lightbulb, Handshake } from 'lucide-react'
import PageWrapper from '@/components/page-wrapper'
import PageHero from '@/components/page-hero'
import WhatsAppIcon from '@/components/whatsapp-icon'

const values = [
  { icon: Award,     title: 'Excellence',    desc: 'We deliver the highest quality in everything we build — no shortcuts, no compromise.' },
  { icon: Handshake, title: 'Integrity',     desc: 'We operate with honesty, transparency, and ethical conduct in every engagement.' },
  { icon: Lightbulb, title: 'Innovation',    desc: 'We continuously explore new technologies to provide cutting-edge solutions.' },
  { icon: Users,     title: 'Collaboration', desc: 'We work closely with our clients, treating every project as a true partnership.' },
]

const team = [
  {
    name: 'Michael Francoo',
    role: 'Founder & CEO',
    initials: 'MF',
    color: '#0e4d8a',
    bio: 'Founder and owner of ZamTech Automation Studio. Software engineer and entrepreneur dedicated to transforming Tanzanian businesses through technology.',
  },
  {
    name: 'Rehema Mtavangu',
    role: 'UI/UX & Frontend Developer',
    initials: 'RM',
    color: '#0891b2',
    bio: 'Crafts intuitive user interfaces and experiences that are beautiful, accessible, and built for real people.',
  },
  {
    name: 'Betson Kinyunyu',
    role: 'Backend & Systems Engineer',
    initials: 'BK',
    color: '#0f766e',
    bio: 'Architects scalable backend systems, APIs, and business automation software that power our clients\' operations.',
  },
  {
    name: 'Nourayn Said',
    role: 'Mobile App Developer',
    initials: 'NS',
    color: '#7c3aed',
    bio: 'Specialist in Flutter, building cross-platform mobile applications that work seamlessly on Android and iOS.',
  },
]

const milestones = [
  { year: '2021', event: 'ZamTech Automation Studio founded in Mbeya, Tanzania by Michael Francoo.' },
  { year: '2022', event: 'Completed our first 10 client projects spanning retail and education sectors.' },
  { year: '2023', event: 'Expanded services to include mobile apps and full ERP systems.' },
  { year: '2024', event: 'Surpassed 60 active clients across Tanzania with a 98% satisfaction rate.' },
  { year: '2025', event: 'Launched ICT consultancy and database optimisation services.' },
]

const WA = 'https://wa.me/255796985138'

export default function AboutPage() {
  return (
    <PageWrapper>
      <PageHero
        label="About Us"
        title="Who We Are"
        description="ZamTech Automation Studio is a professional ICT company based in Mbeya, Tanzania, dedicated to delivering world-class digital solutions to businesses of all sizes."
      />

      {/* ── Story + Stats ── */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-[#00C8FF] text-[11px] font-bold uppercase tracking-[0.18em] mb-3 flex items-center gap-2">
                <span className="w-5 h-px bg-[#00C8FF]" /> Our Story
              </span>
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-balance mb-6 leading-tight"
                style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}
              >
                Built on a Vision for Digital Tanzania
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                ZamTech was founded in 2021 with a clear mission: to make professional, high-quality software development accessible to Tanzanian businesses. We saw businesses struggling with outdated manual processes, poor digital presence, and technology that did not fit their needs.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We stepped in to bridge that gap. Today we serve businesses across retail, agriculture, education, healthcare, and professional services — helping them automate, grow, and compete in the digital economy.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Every project we take on is approached with dedication, professionalism, and a genuine desire to see our clients succeed.
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '100+', label: 'Projects Delivered' },
                { value: '60+',  label: 'Happy Clients' },
                { value: '5+',   label: 'Years Experience' },
                { value: '98%',  label: 'Satisfaction Rate' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-[#f0f9ff] border border-[#bae6fd] rounded-2xl p-6 sm:p-8 text-center hover:shadow-sm transition-shadow"
                >
                  <p
                    className="text-3xl sm:text-4xl font-extrabold text-[#00C8FF] mb-1"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {s.value}
                  </p>
                  <p className="text-slate-500 text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission / Vision / Commitment ── */}
      <section className="py-16 sm:py-20 bg-slate-50 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#00C8FF] text-[11px] font-bold uppercase tracking-[0.18em] mb-3 flex items-center gap-2 justify-center">
              <span className="w-5 h-px bg-[#00C8FF]" /> Our Purpose
            </span>
            <h2
              className="text-2xl sm:text-3xl font-extrabold text-foreground text-balance"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              What Guides Us Every Day
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Mission */}
            <div className="bg-white border border-border rounded-2xl p-7 hover:shadow-sm transition-shadow">
              <div className="w-12 h-12 bg-[#00C8FF]/10 rounded-xl flex items-center justify-center mb-5">
                <Target className="w-6 h-6 text-[#00C8FF]" />
              </div>
              <h3 className="text-foreground font-bold text-lg mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                Our Mission
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                To deliver innovative, reliable, and affordable ICT solutions that empower Tanzanian businesses to thrive in the digital age — with integrity, quality, and lasting partnership.
              </p>
            </div>
            {/* Vision — highlighted */}
            <div className="bg-navy rounded-2xl p-7 text-white">
              <div className="w-12 h-12 bg-white/12 rounded-xl flex items-center justify-center mb-5">
                <Eye className="w-6 h-6 text-[#00C8FF]" />
              </div>
              <h3 className="text-white font-bold text-lg mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                Our Vision
              </h3>
              <p className="text-white/60 leading-relaxed text-sm">
                To be the most trusted ICT partner for businesses across East Africa, known for excellence, innovation, and transformative digital solutions that create real-world impact.
              </p>
            </div>
            {/* Commitment */}
            <div className="bg-white border border-border rounded-2xl p-7 hover:shadow-sm transition-shadow">
              <div className="w-12 h-12 bg-[#00C8FF]/10 rounded-xl flex items-center justify-center mb-5">
                <Heart className="w-6 h-6 text-[#00C8FF]" />
              </div>
              <h3 className="text-foreground font-bold text-lg mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                Our Commitment
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                We are committed to your success beyond delivery. We provide ongoing support, training, and continuous improvement to ensure your digital investment delivers maximum returns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#00C8FF] text-[11px] font-bold uppercase tracking-[0.18em] mb-3 flex items-center gap-2 justify-center">
              <span className="w-5 h-px bg-[#00C8FF]" /> What Drives Us
            </span>
            <h2
              className="text-2xl sm:text-3xl font-extrabold text-foreground text-balance"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Our Core Values
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const Icon = v.icon
              return (
                <div
                  key={v.title}
                  className="bg-white border border-border rounded-2xl p-6 text-center hover:border-[#00C8FF]/40 hover:shadow-sm transition-all"
                >
                  <div className="w-14 h-14 bg-[#00C8FF]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-[#00C8FF]" />
                  </div>
                  <h3 className="text-foreground font-bold text-base mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    {v.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-16 sm:py-20 bg-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-[#00C8FF] text-[11px] font-bold uppercase tracking-[0.18em] mb-3 flex items-center gap-2 justify-center">
              <span className="w-5 h-px bg-[#00C8FF]" /> Our Journey
            </span>
            <h2
              className="text-2xl sm:text-3xl font-extrabold text-balance"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Key Milestones
            </h2>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-9 top-0 bottom-0 w-px bg-white/10" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={m.year} className="flex gap-6 items-start">
                  <div className="relative shrink-0 z-10">
                    <div className="w-[72px] h-[72px] rounded-full bg-[#00C8FF]/15 border-2 border-[#00C8FF]/40 flex items-center justify-center">
                      <span className="text-[#00C8FF] font-extrabold text-sm" style={{ fontFamily: 'var(--font-heading)' }}>
                        {m.year}
                      </span>
                    </div>
                  </div>
                  <div className={`pt-5 ${i < milestones.length - 1 ? 'pb-4' : ''}`}>
                    <p className="text-white/70 leading-relaxed">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-[#00C8FF] text-[11px] font-bold uppercase tracking-[0.18em] mb-3 flex items-center gap-2 justify-center">
              <span className="w-5 h-px bg-[#00C8FF]" /> The People
            </span>
            <h2
              className="text-2xl sm:text-3xl font-extrabold text-foreground text-balance"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Meet Our Team
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto leading-relaxed text-sm sm:text-base">
              A passionate team of engineers and technologists dedicated to building the digital future of Tanzania.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white border border-border rounded-2xl p-7 text-center hover:shadow-md hover:border-[#00C8FF]/30 transition-all group"
              >
                {/* Avatar */}
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 text-white font-extrabold text-xl group-hover:scale-105 transition-transform"
                  style={{ backgroundColor: member.color, fontFamily: 'var(--font-heading)' }}
                >
                  {member.initials}
                </div>
                <h3
                  className="text-foreground font-extrabold text-base mb-1"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {member.name}
                </h3>
                <p className="text-[#00C8FF] text-xs font-semibold mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-14 bg-slate-50 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-2xl sm:text-3xl font-extrabold text-foreground mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Work With Us
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Let&apos;s build something great together. Reach out and tell us about your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#0A1628] text-white font-bold px-8 py-3.5 rounded-xl hover:bg-[#0a1628]/90 transition-colors"
            >
              Get in Touch <ArrowRight className="w-4 h-4" />
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
