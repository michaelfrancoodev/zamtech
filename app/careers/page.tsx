import Link from 'next/link'
import { ArrowRight, Briefcase, Heart, Users, Zap, GraduationCap, Mail } from 'lucide-react'
import PageWrapper from '@/components/page-wrapper'
import PageHero from '@/components/page-hero'
import WhatsAppIcon from '@/components/whatsapp-icon'

const WA = 'https://wa.me/255796985138'

const benefits = [
  {
    icon: Zap,
    title: 'Exciting Projects',
    desc: 'Work on real-world systems across retail, agriculture, healthcare, education, and more.',
  },
  {
    icon: GraduationCap,
    title: 'Continuous Learning',
    desc: 'We invest in your growth — workshops, courses, and mentorship from experienced engineers.',
  },
  {
    icon: Users,
    title: 'Collaborative Team',
    desc: 'Join a team that values each other, communicates openly, and celebrates shared success.',
  },
  {
    icon: Heart,
    title: 'Work-Life Balance',
    desc: 'Flexible working arrangements and a culture that respects your time outside of work.',
  },
]

const openings = [
  {
    title: 'Full-Stack Web Developer',
    type: 'Full-time',
    location: 'Mbeya (On-site)',
    description:
      'We are looking for a skilled full-stack developer proficient in Next.js, Node.js, and PostgreSQL to join our growing team and work on client projects.',
    requirements: [
      'Proficiency in React / Next.js and Node.js',
      'Experience with relational databases (PostgreSQL / MySQL)',
      'Understanding of RESTful APIs and authentication',
      'Strong problem-solving skills',
      'Good communication in English and Swahili',
    ],
  },
  {
    title: 'Mobile App Developer (Flutter)',
    type: 'Full-time',
    location: 'Mbeya (On-site / Hybrid)',
    description:
      'We need a Flutter developer to help build and maintain cross-platform mobile applications for our diverse client base across Tanzania.',
    requirements: [
      'Minimum 1 year of Flutter development experience',
      'Published app on Play Store or App Store (preferred)',
      'Experience with Firebase and REST API integration',
      'Clean, well-structured code practices',
      'Ability to work independently on features',
    ],
  },
  {
    title: 'ICT Internship Program',
    type: 'Internship (3–6 months)',
    location: 'Mbeya (On-site)',
    description:
      'An internship opportunity for motivated university students or fresh graduates interested in web development, mobile apps, or business systems. You will work alongside our senior developers on real client projects.',
    requirements: [
      'Currently enrolled in or recently graduated from a relevant program',
      'Basic knowledge of HTML, CSS, JavaScript or any programming language',
      'Eager to learn and take initiative',
      'Strong work ethic and reliability',
      'Available for at least 3 months',
    ],
  },
]

export default function CareersPage() {
  return (
    <PageWrapper>
      <PageHero
        label="Join Our Team"
        title="Careers at ZamTech"
        description="We are always looking for talented, passionate individuals to help us build the digital future of Tanzania. Explore opportunities to grow with us."
      />

      {/* Why Work With Us */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-[#00C8FF] text-[11px] font-bold uppercase tracking-[0.18em] mb-3">
              <span className="w-5 h-px bg-[#00C8FF]" /> Why Join Us
            </span>
            <h2
              className="text-2xl sm:text-3xl font-extrabold text-foreground text-balance"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Build Your Career at ZamTech
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
              We are more than just a tech company. We are a team of people who care about quality, growth, and making a real difference in Tanzania&apos;s digital economy.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => {
              const Icon = b.icon
              return (
                <div
                  key={b.title}
                  className="bg-white border border-border rounded-2xl p-6 hover:border-[#00C8FF]/35 hover:shadow-sm transition-all"
                >
                  <div className="w-12 h-12 bg-[#00C8FF]/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#00C8FF]" />
                  </div>
                  <h3 className="text-foreground font-bold text-base mb-2">{b.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 sm:py-20 bg-slate-50 border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-[#00C8FF] text-[11px] font-bold uppercase tracking-[0.18em] mb-3">
              <span className="w-5 h-px bg-[#00C8FF]" /> Opportunities
            </span>
            <h2
              className="text-2xl sm:text-3xl font-extrabold text-foreground text-balance"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Current Openings
            </h2>
          </div>
          <div className="space-y-6">
            {openings.map((job) => (
              <div
                key={job.title}
                className="bg-white border border-border rounded-2xl p-6 md:p-8 hover:border-[#00C8FF]/30 hover:shadow-md transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="w-4 h-4 text-[#00C8FF]" />
                      <h3
                        className="text-foreground font-extrabold text-lg"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {job.title}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-[#00C8FF]/10 text-[#00C8FF] text-xs font-medium px-2.5 py-1 rounded-full">
                        {job.type}
                      </span>
                      <span className="bg-slate-100 text-slate-500 text-xs font-medium px-2.5 py-1 rounded-full">
                        {job.location}
                      </span>
                    </div>
                  </div>
                  <a
                    href={`mailto:careers@zamtech.co.tz?subject=Application: ${job.title}`}
                    className="bg-[#0A1628] text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-[#0a1628]/90 transition-colors whitespace-nowrap flex items-center gap-2 self-start shrink-0"
                  >
                    Apply Now <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">{job.description}</p>
                <div>
                  <p className="text-foreground font-bold text-xs uppercase tracking-widest mb-3">Requirements</p>
                  <ul className="space-y-1.5">
                    {job.requirements.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 bg-[#00C8FF] rounded-full mt-2 shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Speculative Application */}
      <section className="py-14 bg-navy text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-5">
            <Mail className="w-7 h-7 text-[#00C8FF]" />
          </div>
          <h2
            className="text-2xl font-extrabold mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Don&apos;t See the Right Role?
          </h2>
          <p className="text-white/60 leading-relaxed mb-7">
            We are always open to hearing from talented individuals. Send us your CV and a short note about what you would bring to ZamTech — we will keep you in mind for future opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:careers@zamtech.co.tz?subject=Speculative Application"
              className="inline-flex items-center justify-center gap-2 bg-[#00C8FF] text-[#001a24] font-bold px-7 py-3.5 rounded-xl hover:bg-[#00b8eb] transition-colors"
            >
              Send Your CV <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold px-7 py-3.5 rounded-xl hover:bg-[#22c55e] transition-colors"
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
