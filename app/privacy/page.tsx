import type { Metadata } from 'next'
import Link from 'next/link'
import PageWrapper from '@/components/page-wrapper'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'ZamTech Automation Studio privacy policy — how we collect, use, and protect your personal data when you use our website and services.',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: false },
}

const sections = [
  {
    title: '1. Information We Collect',
    content: `We collect information you provide directly to us when you:
    
• Fill in our "Request a Service" or "Contact Us" forms — including your name, email address, phone number, company name, and project details.
• Subscribe to communications from us.
• Contact us for support purposes.

We may also collect limited technical information automatically when you visit our website, such as your IP address, browser type, pages visited, and time spent on pages. This information is collected for security and analytics purposes only.`,
  },
  {
    title: '2. How We Use Your Information',
    content: `We use the information we collect to:

• Respond to your service requests, inquiries, and support tickets.
• Send project proposals, quotes, and updates related to your request.
• Provide and improve our services.
• Send occasional service updates or relevant announcements (with your consent).
• Comply with legal obligations.

We do not sell, trade, or rent your personal information to any third parties.`,
  },
  {
    title: '3. Data Storage & Security',
    content: `Your data is handled with care:

• Form submissions are received via secure connections (HTTPS).
• We store client data on secure, access-controlled systems.
• We implement reasonable technical and organizational measures to protect your personal information from unauthorized access, disclosure, or loss.

While we strive to protect your data, no method of transmission over the internet is 100% secure.`,
  },
  {
    title: '4. Cookies',
    content: `Our website may use essential cookies to ensure the website functions correctly. We do not use tracking cookies or third-party advertising cookies without your consent. For more information, please read our Cookie Policy.`,
  },
  {
    title: '5. Third-Party Services',
    content: `Our website may embed third-party services such as Google Maps for location display. These services have their own privacy policies. We encourage you to review the privacy policies of any third-party services you interact with.`,
  },
  {
    title: '6. Your Rights',
    content: `You have the right to:

• Request access to the personal data we hold about you.
• Request correction or deletion of your data.
• Withdraw consent for any communications at any time.
• Lodge a complaint with a relevant data protection authority.

To exercise any of these rights, please contact us at privacy@zamtech.co.tz.`,
  },
  {
    title: '7. Children\'s Privacy',
    content: `Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us immediately.`,
  },
  {
    title: '8. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated effective date. We encourage you to review this policy periodically.`,
  },
  {
    title: '9. Contact Us',
    content: `If you have any questions about this Privacy Policy or how we handle your data, please contact us:

Email: privacy@zamtech.co.tz
Phone: +255 796 985 138
Address: ZamTech Automation Studio, Mbeya, Tanzania`,
  },
]

export default function PrivacyPage() {
  return (
    <PageWrapper>
      <section className="bg-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-primary text-xs font-bold uppercase tracking-[0.15em] mb-3">Legal</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-balance mb-5 leading-tight" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.025em' }}>Privacy Policy</h1>
          <p className="text-white/65 text-base">
            Effective Date: <strong>1 January 2024</strong> &nbsp;&middot;&nbsp; Last Updated: <strong>1 June 2025</strong>
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-muted-foreground leading-relaxed mb-10 text-base">
            ZamTech Automation Studio (&ldquo;ZamTech&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our website or engage our services.
          </p>
          <div className="space-y-8">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="text-foreground font-bold text-lg mb-3">{s.title}</h2>
                <div className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                  {s.content}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row gap-4">
            <Link href="/terms" className="text-primary font-medium hover:underline text-sm">
              Terms & Conditions
            </Link>
            <Link href="/cookies" className="text-primary font-medium hover:underline text-sm">
              Cookie Policy
            </Link>
            <Link href="/contact" className="text-primary font-medium hover:underline text-sm">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
