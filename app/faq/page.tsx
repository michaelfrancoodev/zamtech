import Link from 'next/link'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { MessageCircle, ArrowRight } from 'lucide-react'
import PageWrapper from '@/components/page-wrapper'
import PageHero from '@/components/page-hero'
import WhatsAppIcon from '@/components/whatsapp-icon'

const WA = 'https://wa.me/255796985138'

const categories = [
  {
    title: 'Services & Process',
    faqs: [
      {
        q: 'What services does ZamTech Automation Studio offer?',
        a: 'We offer web development, mobile app development, business systems (ERP, POS, inventory), ICT consultancy, database solutions, and IT support & training. Visit our Services page for full details.',
      },
      {
        q: 'How long does it take to build a website or application?',
        a: 'Timelines depend on the project complexity. A standard business website takes 1–2 weeks. A custom web application or business system typically takes 4–12 weeks. We provide a detailed timeline in every project proposal.',
      },
      {
        q: 'What is your development process?',
        a: 'Our process has 4 stages: (1) Discovery – understanding your needs, (2) Planning – creating a technical blueprint, (3) Development – building the solution, (4) Delivery & Support – deploying, training, and providing ongoing support.',
      },
      {
        q: 'Do you build mobile apps for both Android and iOS?',
        a: 'Yes. We use Flutter and React Native to build cross-platform apps that run on both Android and iOS from a single codebase, reducing cost and development time.',
      },
      {
        q: 'Can you build a system that works offline?',
        a: 'Yes. We can build offline-first applications using local storage, SQLite, and sync mechanisms that update when internet connection is restored. This is common for POS and field-based systems.',
      },
    ],
  },
  {
    title: 'Pricing & Payment',
    faqs: [
      {
        q: 'How much does it cost to build a website?',
        a: 'Starter websites begin at TZS 500,000. Business-level web applications start at TZS 1,500,000, and enterprise solutions from TZS 4,000,000+. All pricing is project-specific — we provide a free quote after understanding your requirements.',
      },
      {
        q: 'Do you offer payment in installments?',
        a: 'Yes. We typically require a 50% deposit to begin work and 50% upon delivery. For larger projects, we can agree on milestone-based payments.',
      },
      {
        q: 'Are there hidden fees after delivery?',
        a: 'No. All fees are agreed upon before any work begins. Post-delivery charges only apply for new features, maintenance contracts, or hosting (if applicable), and all are clearly communicated in advance.',
      },
      {
        q: 'Do I get support after the project is delivered?',
        a: 'Yes. All packages include a free support period (1–6 months depending on the package) that covers bug fixes, minor adjustments, and user guidance. Extended support contracts are also available.',
      },
    ],
  },
  {
    title: 'Technical Questions',
    faqs: [
      {
        q: 'Who hosts the website or application after delivery?',
        a: 'You have full ownership of your project. We can help you set up hosting on platforms like Vercel, DigitalOcean, or local Tanzanian hosting providers. We can also manage hosting for you on a monthly retainer.',
      },
      {
        q: 'Will my website be mobile-friendly?',
        a: 'Absolutely. All our websites and web applications are built with a mobile-first approach, ensuring they look and work perfectly on all screen sizes — from smartphones to desktops.',
      },
      {
        q: 'Can you take over maintenance of an existing system?',
        a: 'Yes. We can review, maintain, and improve existing systems built by other developers, provided the source code and documentation are available.',
      },
      {
        q: 'What technologies do you use?',
        a: 'We use modern technologies including Next.js, React, Node.js, Flutter, Laravel, PostgreSQL, MySQL, MongoDB, and more. We choose the right stack based on your project requirements.',
      },
    ],
  },
  {
    title: 'Working With Us',
    faqs: [
      {
        q: 'Do I need to visit your office to start a project?',
        a: 'No. We work with clients fully remotely via WhatsApp, email, and video calls. However, you are always welcome to visit our office in Mbeya for in-person meetings.',
      },
      {
        q: 'How do I get started?',
        a: 'Simply fill in our Request a Service form or contact us directly. We will schedule a free consultation call, understand your needs, and provide a detailed proposal within 24 hours.',
      },
      {
        q: 'Do you sign NDAs or confidentiality agreements?',
        a: 'Yes. We take client confidentiality seriously. We are happy to sign NDA agreements before any sensitive project discussions take place.',
      },
      {
        q: 'What if I am not satisfied with the final product?',
        a: 'Client satisfaction is our top priority. We work in iterations and share progress throughout the project. If there are issues at delivery, we revise until you are satisfied within the agreed scope.',
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <PageWrapper>
      <PageHero
        label="Questions & Answers"
        title="Frequently Asked Questions"
        description="Find answers to the most common questions about our services, pricing, and how we work."
      />

      {/* FAQ Accordion */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {categories.map((cat) => (
            <div key={cat.title}>
              <h2
                className="text-xl font-extrabold text-foreground mb-5 pb-3 border-b border-border"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {cat.title}
              </h2>
              <Accordion type="single" collapsible className="space-y-2">
                {cat.faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`${cat.title}-${i}`}
                    className="bg-white border border-border rounded-2xl px-5 data-[state=open]:border-[#00C8FF]/40 transition-colors"
                  >
                    <AccordionTrigger className="text-left text-foreground font-medium py-4 hover:no-underline hover:text-[#00C8FF] transition-colors">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      {/* Still have questions */}
      <section className="py-14 bg-slate-50 border-t border-border">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-14 h-14 bg-[#00C8FF]/10 rounded-full flex items-center justify-center mx-auto mb-5">
            <MessageCircle className="w-7 h-7 text-[#00C8FF]" />
          </div>
          <h2
            className="text-2xl font-extrabold text-foreground mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Still Have Questions?
          </h2>
          <p className="text-muted-foreground mb-7 leading-relaxed">
            Can&apos;t find what you are looking for? Our team is happy to help with any questions you have.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#0A1628] text-white font-bold px-7 py-3 rounded-xl hover:bg-[#0a1628]/90 transition-colors"
            >
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold px-7 py-3 rounded-xl hover:bg-[#22c55e] transition-colors"
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
