import Link from 'next/link'
import PageWrapper from '@/components/page-wrapper'

const cookieTypes = [
  {
    type: 'Essential Cookies',
    required: true,
    description: 'These cookies are necessary for the website to function properly. They enable core functionality such as security, navigation, and access to protected areas. The website cannot function properly without these cookies.',
    examples: 'Session management, security tokens, form submission state.',
  },
  {
    type: 'Analytics Cookies',
    required: false,
    description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and your experience.',
    examples: 'Pages visited, time spent on site, browser type. (Only collected with your consent.)',
  },
  {
    type: 'Functional Cookies',
    required: false,
    description: 'These cookies allow the website to remember choices you make (such as your language preference) and provide enhanced, more personal features.',
    examples: 'Language preferences, form field memory.',
  },
  {
    type: 'Third-Party Cookies',
    required: false,
    description: 'Some pages on our website embed content from third-party services such as Google Maps. These services may set their own cookies. We have no control over these cookies and recommend reviewing the respective privacy policies.',
    examples: 'Google Maps embed, social media sharing buttons.',
  },
]

export default function CookiesPage() {
  return (
    <PageWrapper>
      <section className="bg-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-primary text-xs font-bold uppercase tracking-[0.15em] mb-3">Legal</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-balance mb-5 leading-tight" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.025em' }}>Cookie Policy</h1>
          <p className="text-white/65 text-base">
            Effective Date: <strong>1 January 2024</strong> &nbsp;&middot;&nbsp; Last Updated: <strong>1 June 2025</strong>
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-muted-foreground leading-relaxed mb-10 text-base">
            This Cookie Policy explains what cookies are, how ZamTech Automation Studio uses them on our website, and your choices regarding cookies.
          </p>

          <div className="space-y-8">
            <div>
              <h2 className="text-foreground font-bold text-lg mb-3">What Are Cookies?</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Cookies are small text files that are placed on your device (computer, tablet, or phone) when you visit a website. They help the website remember information about your visit, making your next visit easier and the site more useful to you.
              </p>
            </div>

            <div>
              <h2 className="text-foreground font-bold text-lg mb-5">Types of Cookies We Use</h2>
              <div className="space-y-4">
                {cookieTypes.map((c) => (
                  <div key={c.type} className="bg-card border border-border rounded-xl p-5">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-foreground font-bold text-base">{c.type}</h3>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${
                        c.required
                          ? 'bg-primary/10 text-primary'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {c.required ? 'Always Active' : 'Optional'}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-2">{c.description}</p>
                    <p className="text-muted-foreground text-xs">
                      <strong>Examples:</strong> {c.examples}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-foreground font-bold text-lg mb-3">How to Manage Cookies</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                You can control and manage cookies in several ways:
              </p>
              <ul className="text-muted-foreground text-sm space-y-2 leading-relaxed">
                <li><strong>Browser settings:</strong> Most browsers allow you to refuse cookies or delete existing cookies through their settings.</li>
                <li><strong>Opt-out tools:</strong> You can opt out of Google Analytics tracking via the Google Analytics Opt-out Browser Add-on.</li>
                <li><strong>Contact us:</strong> You can reach us at privacy@zamtech.co.tz to request information about cookies used on our site.</li>
              </ul>
              <p className="text-muted-foreground text-sm leading-relaxed mt-3">
                Please note that disabling essential cookies may affect the functionality of our website.
              </p>
            </div>

            <div>
              <h2 className="text-foreground font-bold text-lg mb-3">Changes to This Policy</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our operations. Any changes will be posted on this page with an updated effective date.
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row gap-4">
            <Link href="/privacy" className="text-primary font-medium hover:underline text-sm">Privacy Policy</Link>
            <Link href="/terms" className="text-primary font-medium hover:underline text-sm">Terms & Conditions</Link>
            <Link href="/contact" className="text-primary font-medium hover:underline text-sm">Contact Us</Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
