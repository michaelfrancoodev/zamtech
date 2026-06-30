import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar, ArrowRight } from 'lucide-react'
import PageWrapper from '@/components/page-wrapper'

/* ─── Article data ─────────────────────────────────────────────────────────── */
const posts = [
  {
    slug: 'why-every-tanzanian-business-needs-a-website',
    category: 'Strategy',
    title: 'Why Every Tanzanian Business Needs a Website in 2025',
    excerpt:
      'Over 20 million Tanzanians are online and the number is growing fast. We explain why a professional website is no longer optional for businesses in Tanzania.',
    date: 'June 15, 2025',
    readTime: '5 min read',
    author: 'ZamTech Team',
    content: [
      {
        type: 'intro',
        text: 'Tanzania has crossed the 20 million internet users mark. Mobile penetration is above 50% and climbing every year. If your business does not have a professional website in 2025, you are effectively invisible to half your potential customers.',
      },
      {
        type: 'h2',
        text: 'The numbers you cannot ignore',
      },
      {
        type: 'p',
        text: 'According to TCRA reports, Tanzania has over 23 million active internet subscribers. Google processes more than 8.5 billion searches per day globally — and Tanzanian users search for local businesses, products, and services every single day. When a potential customer searches "furniture shop Dar es Salaam" or "accountant Mbeya", what do they find? If your business has no website, the answer is your competitor.',
      },
      {
        type: 'h2',
        text: 'A website works while you sleep',
      },
      {
        type: 'p',
        text: 'Your physical office closes at 6 PM. Your website never does. A well-built website with a contact form, service descriptions, and pricing information answers customer questions at 11 PM on a Sunday when you are unavailable. In an economy where trust is built before the first phone call, your website is your 24/7 sales representative.',
      },
      {
        type: 'h2',
        text: 'Credibility and trust',
      },
      {
        type: 'p',
        text: 'Studies consistently show that over 75% of consumers judge a company\'s credibility by its website design. In Tanzania\'s growing middle class — educated, urban, and connected — a business without a website signals one of two things: the business is very small, or it does not take itself seriously. Neither is the impression you want to make.',
      },
      {
        type: 'h2',
        text: 'What makes a good business website in Tanzania',
      },
      {
        type: 'list',
        items: [
          'Loads fast on mobile networks (3G/4G) — avoid heavy images that kill page speed',
          'Available in both Swahili and English to reach a wider local audience',
          'Has a clear phone number and WhatsApp contact button above the fold',
          'Includes services, pricing or a price range, and a contact form',
          'Is secure (HTTPS) and has a professional domain (yourcompany.co.tz)',
        ],
      },
      {
        type: 'h2',
        text: 'The cost of not having a website',
      },
      {
        type: 'p',
        text: 'The real cost is not the one you pay to build a website — it is the revenue you lose every month to competitors who have one. A one-time investment of TZS 800,000–2,000,000 for a professional website typically pays for itself within the first 2–3 months through new client inquiries alone.',
      },
      {
        type: 'cta',
        text: 'Ready to get your business online? Contact ZamTech for a free consultation and we will build a website that works for your specific business goals.',
      },
    ],
  },
  {
    slug: 'pos-vs-spreadsheet-for-tanzanian-retail',
    category: 'Business Systems',
    title: 'POS vs. Spreadsheet: What Tanzanian Retailers Need to Know',
    excerpt:
      'Many shops in Tanzania still manage inventory in Excel. We break down when it makes sense to upgrade to a proper POS system and what ROI to expect.',
    date: 'May 28, 2025',
    readTime: '7 min read',
    author: 'ZamTech Team',
    content: [
      {
        type: 'intro',
        text: 'Walk into almost any duka, supermarket, or retail shop in Tanzania and you will find one of two things: a cashier typing numbers into a phone calculator, or a manager hunched over a laptop running Excel. Both work — until they don\'t.',
      },
      {
        type: 'h2',
        text: 'The spreadsheet trap',
      },
      {
        type: 'p',
        text: 'Excel and Google Sheets are powerful tools, but they were not designed for real-time inventory management. The moment you have more than one person updating the same file, or more than 200 SKUs, errors start to compound. Items go negative in stock, sales reports take hours to compile, and theft is nearly impossible to detect.',
      },
      {
        type: 'h2',
        text: 'What a POS system actually does',
      },
      {
        type: 'p',
        text: 'A Point of Sale system is not just a cash register replacement. A well-built POS for the Tanzanian market handles: stock level tracking in real-time, automatic low-stock alerts, daily/weekly/monthly sales reports in seconds, staff sales tracking (who sold what, when), M-Pesa and cash payment reconciliation, and customer purchase history.',
      },
      {
        type: 'h2',
        text: 'When should you upgrade?',
      },
      {
        type: 'list',
        items: [
          'You stock more than 100 different products',
          'You have more than 1 employee handling sales',
          'You cannot tell your exact profit margin without spending hours in Excel',
          'You have experienced stock theft or unexplained shortages',
          'You want to open a second branch and share inventory data',
          'You process more than 50 transactions per day',
        ],
      },
      {
        type: 'h2',
        text: 'Expected ROI for a Tanzanian SME',
      },
      {
        type: 'p',
        text: 'From our experience deploying POS systems across Mbeya and other Tanzanian cities, retailers typically see: 15–25% reduction in stock losses within the first 3 months, 2–4 hours saved per week on manual reporting, and faster checkout times (happy customers = repeat business). The cost of a custom POS from ZamTech starts at TZS 1,200,000 for a single-branch setup. Most clients recover this within 4–6 months.',
      },
      {
        type: 'cta',
        text: 'Interested in a POS system built specifically for Tanzanian retail? ZamTech builds custom POS solutions with M-Pesa integration. Get in touch for a free needs assessment.',
      },
    ],
  },
  {
    slug: 'flutter-vs-react-native-for-africa',
    category: 'Mobile Development',
    title: 'Flutter vs React Native: Which is Better for African Markets?',
    excerpt:
      'Low-bandwidth, offline-first apps matter more in Africa than in Europe. We compare Flutter and React Native for building apps in Tanzania.',
    date: 'May 12, 2025',
    readTime: '6 min read',
    author: 'ZamTech Team',
    content: [
      {
        type: 'intro',
        text: 'When we build mobile apps for Tanzanian businesses, one of the first technical questions is always: Flutter or React Native? The answer is not the same in Africa as it is in Silicon Valley.',
      },
      {
        type: 'h2',
        text: 'The African mobile context',
      },
      {
        type: 'p',
        text: 'Most mobile developers in the US or Europe build for 4G/5G connections, high-end devices, and users who expect instant loading. In Tanzania, the reality is different: many users are on 2G/3G connections in peri-urban and rural areas, devices range from mid-range Android phones at TZS 150,000 to flagships, and power outages mean offline capability is not a "nice to have" — it is essential.',
      },
      {
        type: 'h2',
        text: 'Flutter strengths for Tanzanian apps',
      },
      {
        type: 'list',
        items: [
          'Compiled to native ARM code — faster on mid-range Android devices',
          'Single codebase for Android and iOS with identical UI',
          'Excellent offline support with Hive and Isar local databases',
          'Smaller app sizes possible with proper tree-shaking',
          'Dart is easy to learn for Tanzanian developers coming from Java or JavaScript',
        ],
      },
      {
        type: 'h2',
        text: 'React Native strengths',
      },
      {
        type: 'list',
        items: [
          'JavaScript codebase — easier to hire local web developers who can transition',
          'Expo framework significantly reduces setup time for simple apps',
          'Larger ecosystem of pre-built components',
          'Better code sharing with React web apps',
          'Hermes engine improves startup time on Android',
        ],
      },
      {
        type: 'h2',
        text: 'Our recommendation for Tanzania',
      },
      {
        type: 'p',
        text: 'For most business apps in Tanzania — inventory systems, school management, clinic apps, delivery tracking — we recommend Flutter. The performance advantage on mid-range Android devices is significant, and the offline-first architecture support in Flutter is more mature. For apps that need to share a large codebase with a web app built in React, React Native is the better fit.',
      },
      {
        type: 'cta',
        text: 'Building a mobile app for your Tanzanian business? ZamTech has built Flutter and React Native apps across retail, healthcare, education, and logistics. Contact us to discuss your requirements.',
      },
    ],
  },
  {
    slug: 'how-to-choose-an-ict-company-in-tanzania',
    category: 'Guides',
    title: 'How to Choose an ICT Company in Tanzania: 7 Questions to Ask',
    excerpt:
      'With more software companies appearing in Tanzania every year, we give you a practical checklist for vetting any ICT provider before signing a contract.',
    date: 'April 30, 2025',
    readTime: '8 min read',
    author: 'ZamTech Team',
    content: [
      {
        type: 'intro',
        text: 'The number of ICT companies in Tanzania has grown dramatically over the past five years. This is great for competition and pricing — but it also means more businesses are getting burned by unreliable developers who disappear after taking a deposit. Here is how to avoid that.',
      },
      {
        type: 'h2',
        text: '1. Can they show you live, working projects?',
      },
      {
        type: 'p',
        text: 'Any serious ICT company should be able to give you URLs or APK downloads of systems they have built and deployed. Not mockups. Not screenshots. Actual working systems you can click through. If they cannot show you even three live examples, that is a red flag.',
      },
      {
        type: 'h2',
        text: '2. Do they have a registered business?',
      },
      {
        type: 'p',
        text: 'Ask for their BRELA registration number and business name. A company registered with the Tanzania Business Registration and Licensing Agency has legal accountability. Freelancers and informal groups do not. This matters enormously if there is a dispute.',
      },
      {
        type: 'h2',
        text: '3. What does their contract look like?',
      },
      {
        type: 'p',
        text: 'A professional ICT company provides a written contract before taking any money. The contract should specify: deliverables, timeline, payment milestones, what happens if deadlines are missed, ownership of the source code, and post-launch support terms. If they want a lump sum upfront with no contract, walk away.',
      },
      {
        type: 'h2',
        text: '4. Who specifically will build your project?',
      },
      {
        type: 'p',
        text: 'Some companies sell you, then outsource your work to cheaper freelancers. Ask to meet the developers who will actually work on your project. Understand their experience level and what other projects they are currently handling.',
      },
      {
        type: 'h2',
        text: '5. What is their communication process?',
      },
      {
        type: 'p',
        text: 'How often will they update you? Can you see progress? Do they use a project management tool like Trello or Asana that you can access? Regular communication prevents 90% of project failures.',
      },
      {
        type: 'h2',
        text: '6. What support do they provide after launch?',
      },
      {
        type: 'p',
        text: 'Software always needs updates, bug fixes, and improvements. Ask specifically: Do you provide post-launch support? Is there a monthly maintenance fee? What is the response time for critical bugs? A company that disappears after delivery is not worth engaging.',
      },
      {
        type: 'h2',
        text: '7. Can they provide references?',
      },
      {
        type: 'p',
        text: 'Ask for contact details of 2–3 previous clients you can speak to directly. Call them. Ask whether the project was delivered on time, on budget, and whether they would hire the company again. This five-minute call can save you months of frustration.',
      },
      {
        type: 'cta',
        text: 'ZamTech ticks all seven boxes. Registered business, signed contracts, live portfolio, dedicated developers, and clients who answer calls. Contact us for a free initial consultation.',
      },
    ],
  },
  {
    slug: 'offline-first-apps-tanzania',
    category: 'Mobile Development',
    title: 'Building Offline-First Apps for Tanzania\'s Connectivity Reality',
    excerpt:
      'Unstable internet is a fact of life in many Tanzanian regions. This guide explains the architecture and tools for building resilient offline-capable apps.',
    date: 'April 15, 2025',
    readTime: '9 min read',
    author: 'ZamTech Team',
    content: [
      {
        type: 'intro',
        text: 'A school management app in Dodoma that stops working when TTCL goes down. A clinic system in Mwanza that loses patient data when the 4G cuts out. A POS system in a rural kiosk that cannot process a sale during load-shedding. These are not edge cases in Tanzania — they are daily reality. Offline-first architecture solves them.',
      },
      {
        type: 'h2',
        text: 'What "offline-first" actually means',
      },
      {
        type: 'p',
        text: 'Offline-first does not mean an app that works without internet occasionally. It means an app where the primary data source is local storage, and the internet is used only for synchronisation. Data writes happen locally first, then sync to the server when connectivity is available. This inversion of priorities changes everything about how the app behaves under poor network conditions.',
      },
      {
        type: 'h2',
        text: 'The right tools for offline Flutter apps',
      },
      {
        type: 'list',
        items: [
          'Isar Database — fast, embedded NoSQL database for Flutter. Handles millions of records on device.',
          'Drift (Moor) — SQLite wrapper for Flutter with type-safe queries. Good for relational data.',
          'Hive — lightweight key-value store for settings and simple data.',
          'Flutter WorkManager — background sync that runs even when the app is closed.',
          'Connectivity Plus — detects network state changes to trigger sync.',
        ],
      },
      {
        type: 'h2',
        text: 'Conflict resolution: the hard part',
      },
      {
        type: 'p',
        text: 'The difficult part of offline-first is handling conflicts — when the same record is updated on two devices while both are offline, and then both try to sync. Common strategies include: Last-Write-Wins (LWW) for simple data, Operational Transformation for collaborative editing, and CRDT (Conflict-free Replicated Data Types) for complex scenarios. For most Tanzanian business apps (POS, inventory, school systems), Last-Write-Wins with server timestamp is sufficient.',
      },
      {
        type: 'h2',
        text: 'Real-world implementation pattern',
      },
      {
        type: 'p',
        text: 'For a typical Tanzanian retail POS app, we use this architecture: all sales are written to local Isar DB immediately, a background WorkManager job attempts to sync every 15 minutes, a visual indicator shows "offline mode" when no connection is detected, and full sync happens automatically when connectivity is restored. The cashier never experiences a failed transaction due to network issues.',
      },
      {
        type: 'cta',
        text: 'Building an app that needs to work in areas with poor connectivity? ZamTech has shipped offline-first apps for clinics, schools, and retail businesses across Tanzania. Get in touch.',
      },
    ],
  },
  {
    slug: 'erp-implementation-guide-tanzania',
    category: 'Business Systems',
    title: 'A Practical ERP Implementation Guide for Tanzanian SMEs',
    excerpt:
      'Enterprise Resource Planning sounds intimidating, but it does not have to be. We walk through a phased approach tailored to Tanzanian small businesses.',
    date: 'March 28, 2025',
    readTime: '11 min read',
    author: 'ZamTech Team',
    content: [
      {
        type: 'intro',
        text: 'When most Tanzanian business owners hear "ERP", they think of SAP — a million-dollar system built for multinationals. But ERP simply means a system that integrates your core business functions: inventory, sales, finance, HR, and reporting into one place. You do not need a million dollars. You need the right implementation approach.',
      },
      {
        type: 'h2',
        text: 'Why Tanzanian SMEs struggle with ERP',
      },
      {
        type: 'p',
        text: 'The common failures we see: buying a generic international ERP that does not handle TRA compliance and Tanzanian tax structure, implementing everything at once (overwhelming staff), poor training leaving employees reverting to paper and Excel within weeks, and choosing a vendor with no local support who cannot be reached when issues arise.',
      },
      {
        type: 'h2',
        text: 'Phase 1: Inventory and sales (Months 1–2)',
      },
      {
        type: 'p',
        text: 'Start with the most painful problem. For most Tanzanian SMEs, this is inventory — not knowing what is in stock, losses from untracked sales, and inability to calculate real profit margins. Phase 1 should focus exclusively on: stock management, sales recording, basic invoicing, and M-Pesa payment tracking. Nothing else.',
      },
      {
        type: 'h2',
        text: 'Phase 2: Finance and TRA compliance (Months 3–4)',
      },
      {
        type: 'p',
        text: 'Once your sales and inventory are clean, add financial management: accounts payable and receivable, TRA receipt generation (VFD integration for EFD machines), VAT tracking, and bank reconciliation. This phase requires close collaboration with your accountant.',
      },
      {
        type: 'h2',
        text: 'Phase 3: HR and payroll (Months 5–6)',
      },
      {
        type: 'p',
        text: 'Add staff management: employee records, attendance tracking, NSSF and PAYE calculation, payslip generation, and leave management. This phase significantly reduces your HR administrative burden and prevents payroll errors.',
      },
      {
        type: 'h2',
        text: 'Phase 4: Reporting and analytics (Month 7+)',
      },
      {
        type: 'p',
        text: 'Once the core data is clean and flowing through the system, build your intelligence layer: branch comparison dashboards, trend analysis, customer purchase history, supplier performance tracking, and profitability by product category. This is when the ERP starts generating real business insights.',
      },
      {
        type: 'h2',
        text: 'Training is not optional',
      },
      {
        type: 'p',
        text: 'Every ERP implementation that fails does so at the training stage. Plan for: at least 3 days of hands-on training per staff role, a written operations manual in Swahili, a 30-day hypercare period where ZamTech staff are on call for questions, and quarterly refresher sessions for the first year.',
      },
      {
        type: 'cta',
        text: 'ZamTech has implemented ERP systems for logistics companies, clinics, schools, and retail chains across Tanzania. Contact us for a phased ERP proposal tailored to your business size and industry.',
      },
    ],
  },
]

const categoryColors: Record<string, string> = {
  Strategy: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'Business Systems': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'Mobile Development': 'bg-green-500/10 text-green-400 border-green-500/20',
  Guides: 'bg-[#00C8FF]/10 text-[#00C8FF] border-[#00C8FF]/20',
}

/* ─── Static params ────────────────────────────────────────────────────────── */
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

/* ─── Per-page metadata ────────────────────────────────────────────────────── */
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = posts.find((p) => p.slug === params.slug)
  if (!post) return { title: 'Article Not Found' }
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  }
}

/* ─── Content renderer ─────────────────────────────────────────────────────── */
function ArticleContent({ blocks }: { blocks: { type: string; text?: string; items?: string[] }[] }) {
  return (
    <div className="prose-content space-y-5">
      {blocks.map((block, i) => {
        if (block.type === 'intro') {
          return (
            <p key={i} className="text-lg text-foreground/80 leading-relaxed font-medium border-l-4 border-[#00C8FF] pl-5 py-1">
              {block.text}
            </p>
          )
        }
        if (block.type === 'h2') {
          return (
            <h2 key={i} className="text-foreground font-extrabold text-xl mt-8 mb-2 text-balance" style={{ fontFamily: 'var(--font-heading)' }}>
              {block.text}
            </h2>
          )
        }
        if (block.type === 'p') {
          return (
            <p key={i} className="text-foreground/70 leading-relaxed">
              {block.text}
            </p>
          )
        }
        if (block.type === 'list' && block.items) {
          return (
            <ul key={i} className="space-y-2">
              {block.items.map((item, j) => (
                <li key={j} className="flex items-start gap-3 text-foreground/70 text-sm leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00C8FF] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          )
        }
        if (block.type === 'cta') {
          return (
            <div key={i} className="bg-navy rounded-2xl p-6 mt-8">
              <p className="text-white/70 text-sm leading-relaxed mb-4">{block.text}</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#00C8FF] text-[#001a24] font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-[#00b8eb] transition-colors"
              >
                Contact ZamTech <ArrowRight size={14} />
              </Link>
            </div>
          )
        }
        return null
      })}
    </div>
  )
}

/* ─── Page ─────────────────────────────────────────────────────────────────── */
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug)
  if (!post) notFound()

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="bg-navy text-white pt-12 pb-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-white/40 hover:text-[#00C8FF] text-xs font-semibold mb-6 transition-colors">
            <ArrowLeft size={13} /> Back to Blog
          </Link>
          <span className={`inline-flex items-center text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border mb-4 ${categoryColors[post.category] ?? 'bg-white/10 text-white/60 border-white/10'}`}>
            {post.category}
          </span>
          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-balance leading-tight mb-4"
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.025em' }}
          >
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-white/40 text-xs">
            <span className="flex items-center gap-1.5"><Calendar size={12} />{post.date}</span>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <span className="flex items-center gap-1.5"><Clock size={12} />{post.readTime}</span>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <span>{post.author}</span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="py-14 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ArticleContent blocks={post.content as { type: string; text?: string; items?: string[] }[]} />
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-14 bg-slate-50 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="inline-flex items-center gap-2 text-[#00C8FF] text-[11px] font-bold uppercase tracking-[0.18em] mb-6">
              <span className="w-5 h-px bg-[#00C8FF]" /> More Articles
            </span>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group">
                  <article className="bg-white border border-border rounded-2xl p-5 hover:border-[#00C8FF]/30 hover:shadow-md transition-all h-full flex flex-col">
                    <span className={`self-start text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-3 ${categoryColors[p.category] ?? 'bg-slate-100 text-slate-500'}`}>
                      {p.category}
                    </span>
                    <h3 className="text-foreground font-bold text-sm leading-snug text-balance group-hover:text-[#00C8FF] transition-colors flex-1 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                      {p.title}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-[#00C8FF] text-xs font-semibold group-hover:gap-2 transition-all">
                      Read <ArrowRight size={11} />
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageWrapper>
  )
}
