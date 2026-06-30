import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock, BookOpen } from 'lucide-react'
import PageWrapper from '@/components/page-wrapper'
import PageHero from '@/components/page-hero'

export const metadata: Metadata = {
  title: 'Blog & Insights',
  description: 'Practical guides, case studies, and ICT insights for Tanzanian businesses from the ZamTech team — covering web development, mobile apps, and digital transformation.',
  alternates: { canonical: '/blog' },
  openGraph: { title: 'Blog & Insights | ZamTech Tanzania', description: 'ICT guides, case studies, and tips for businesses in Tanzania.', url: '/blog' },
}

const posts = [
  {
    slug: 'why-every-tanzanian-business-needs-a-website',
    category: 'Strategy',
    title: 'Why Every Tanzanian Business Needs a Website in 2025',
    excerpt:
      'Over 20 million Tanzanians are online and the number is growing fast. We explain why a professional website is no longer optional for businesses in Tanzania.',
    date: 'June 15, 2025',
    readTime: '5 min read',
    featured: true,
  },
  {
    slug: 'pos-vs-spreadsheet-for-tanzanian-retail',
    category: 'Business Systems',
    title: 'POS vs. Spreadsheet: What Tanzanian Retailers Need to Know',
    excerpt:
      'Many shops in Tanzania still manage inventory in Excel. We break down when it makes sense to upgrade to a proper POS system and what ROI to expect.',
    date: 'May 28, 2025',
    readTime: '7 min read',
    featured: true,
  },
  {
    slug: 'flutter-vs-react-native-for-africa',
    category: 'Mobile Development',
    title: 'Flutter vs React Native: Which is Better for African Markets?',
    excerpt:
      'Low-bandwidth, offline-first apps matter more in Africa than in Europe. We compare Flutter and React Native for building apps in Tanzania.',
    date: 'May 12, 2025',
    readTime: '6 min read',
    featured: false,
  },
  {
    slug: 'how-to-choose-an-ict-company-in-tanzania',
    category: 'Guides',
    title: 'How to Choose an ICT Company in Tanzania: 7 Questions to Ask',
    excerpt:
      'With more software companies appearing in Tanzania every year, we give you a practical checklist for vetting any ICT provider before signing a contract.',
    date: 'April 30, 2025',
    readTime: '8 min read',
    featured: false,
  },
  {
    slug: 'offline-first-apps-tanzania',
    category: 'Mobile Development',
    title: 'Building Offline-First Apps for Tanzania\'s Connectivity Reality',
    excerpt:
      'Unstable internet is a fact of life in many Tanzanian regions. This guide explains the architecture and tools for building resilient offline-capable apps.',
    date: 'April 15, 2025',
    readTime: '9 min read',
    featured: false,
  },
  {
    slug: 'erp-implementation-guide-tanzania',
    category: 'Business Systems',
    title: 'A Practical ERP Implementation Guide for Tanzanian SMEs',
    excerpt:
      'Enterprise Resource Planning sounds intimidating, but it does not have to be. We walk through a phased approach tailored to Tanzanian small businesses.',
    date: 'March 28, 2025',
    readTime: '11 min read',
    featured: false,
  },
]

const categoryColors: Record<string, string> = {
  Strategy:         'bg-purple-500/10 text-purple-400',
  'Business Systems': 'bg-amber-500/10 text-amber-400',
  'Mobile Development': 'bg-green-500/10 text-green-400',
  Guides:           'bg-[#00C8FF]/10 text-[#00C8FF]',
}

export default function BlogPage() {
  const featured  = posts.filter(p => p.featured)
  const rest      = posts.filter(p => !p.featured)

  return (
    <PageWrapper>
      <PageHero
        label="Blog & Insights"
        title="ICT Guides for Tanzanian Businesses"
        description="Practical articles, case studies, and tips from our team to help you make smarter technology decisions for your business."
      />

      {/* Featured posts */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 text-[#00C8FF] text-[11px] font-bold uppercase tracking-[0.18em] mb-6">
            <span className="w-5 h-px bg-[#00C8FF]" /> Featured
          </span>

          <div className="grid md:grid-cols-2 gap-6 mb-14">
            {featured.map((post) => (
              <article
                key={post.slug}
                className="group bg-white border border-border rounded-2xl p-7 flex flex-col hover:border-[#00C8FF]/30 hover:shadow-lg hover:shadow-[#00C8FF]/5 transition-all"
              >
                <span className={`self-start text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-4 ${categoryColors[post.category] ?? 'bg-slate-100 text-slate-500'}`}>
                  {post.category}
                </span>
                <h2
                  className="text-foreground font-extrabold text-xl leading-tight mb-3 text-balance group-hover:text-[#00C8FF] transition-colors"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {post.title}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-5">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground/70">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full" />
                    <span className="flex items-center gap-1"><Clock size={11} />{post.readTime}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[#00C8FF] text-xs font-semibold group-hover:gap-2 transition-all">
                    Read <ArrowRight size={12} />
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* All posts grid */}
          <span className="inline-flex items-center gap-2 text-[#00C8FF] text-[11px] font-bold uppercase tracking-[0.18em] mb-6">
            <span className="w-5 h-px bg-[#00C8FF]" /> All Articles
          </span>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <article
                key={post.slug}
                className="group bg-white border border-border rounded-2xl p-6 flex flex-col hover:border-[#00C8FF]/30 hover:shadow-md hover:shadow-[#00C8FF]/5 transition-all"
              >
                <span className={`self-start text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3 ${categoryColors[post.category] ?? 'bg-slate-100 text-slate-500'}`}>
                  {post.category}
                </span>
                <h2
                  className="text-foreground font-extrabold text-base leading-snug mb-2 text-balance group-hover:text-[#00C8FF] transition-colors"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {post.title}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground/60 flex items-center gap-1"><Clock size={11} />{post.readTime}</span>
                  <span className="inline-flex items-center gap-1 text-[#00C8FF] text-xs font-semibold group-hover:gap-2 transition-all">
                    Read <ArrowRight size={12} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / coming soon CTA */}
      <section className="py-14 bg-navy text-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-5">
            <BookOpen className="w-7 h-7 text-[#00C8FF]" />
          </div>
          <h2 className="text-2xl font-extrabold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            More Articles Coming Soon
          </h2>
          <p className="text-white/55 leading-relaxed mb-7 max-w-sm mx-auto">
            We publish new guides every two weeks. Have a topic you would like us to cover? Let us know.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#00C8FF] text-[#001a24] font-bold px-7 py-3.5 rounded-xl hover:bg-[#00b8eb] transition-colors"
          >
            Suggest a Topic <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </PageWrapper>
  )
}
