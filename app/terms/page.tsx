import Link from 'next/link'
import PageWrapper from '@/components/page-wrapper'

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: `By accessing our website or engaging our services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our website or services.`,
  },
  {
    title: '2. Our Services',
    content: `ZamTech Automation Studio provides ICT services including but not limited to web development, mobile application development, business systems, database solutions, ICT consultancy, and IT support & training.

All services are subject to a formal agreement or work order that defines the specific scope, deliverables, timeline, and payment terms for each project.`,
  },
  {
    title: '3. Intellectual Property',
    content: `Upon full payment of the agreed project fee, the client receives full ownership of the final deliverable (website, application, or system) including its source code.

ZamTech retains the right to showcase completed work in its portfolio unless the client specifically requests confidentiality in writing. All third-party tools, libraries, and frameworks used remain subject to their respective licenses.`,
  },
  {
    title: '4. Payment Terms',
    content: `Unless otherwise agreed in writing:

• A deposit of 50% of the total project fee is required before work begins.
• The remaining 50% is due upon delivery of the completed project.
• For larger projects, milestone-based payment schedules may be agreed upon in writing.

Failure to pay agreed fees may result in suspension of the project and withholding of deliverables until payment is settled.`,
  },
  {
    title: '5. Project Changes & Scope',
    content: `Any changes to the agreed project scope must be submitted in writing. Additional features or significant modifications beyond the original scope will be quoted separately and may affect the timeline.

Minor adjustments within the original scope will be accommodated at no extra charge.`,
  },
  {
    title: '6. Delivery & Timelines',
    content: `ZamTech commits to delivering projects within the agreed timeline. Timelines are dependent on:

• Timely provision of required content, assets, and feedback from the client.
• Clear and responsive communication throughout the project.

Delays caused by the client's failure to provide necessary information or approvals will extend the project timeline accordingly.`,
  },
  {
    title: '7. Warranties & Support',
    content: `ZamTech guarantees that all delivered software will function as specified in the project agreement. Each package includes a free support period (as stated in the respective package). Bug fixes and technical issues arising from our code will be resolved at no charge within the support period.

Issues arising from client-side modifications, third-party changes, or hosting environments are not covered under the free support period.`,
  },
  {
    title: '8. Limitation of Liability',
    content: `ZamTech Automation Studio shall not be liable for any indirect, incidental, or consequential damages arising from the use of our software or services. Our total liability shall not exceed the amount paid by the client for the specific service in question.`,
  },
  {
    title: '9. Confidentiality',
    content: `Both parties agree to keep confidential any proprietary or sensitive information shared during the project. ZamTech will not disclose client data, business processes, or project details to any third party without written consent.`,
  },
  {
    title: '10. Termination',
    content: `Either party may terminate a project agreement with written notice. In the event of termination by the client, ZamTech is entitled to payment for all work completed up to the date of termination. Deposits are non-refundable unless ZamTech is unable to commence work.`,
  },
  {
    title: '11. Governing Law',
    content: `These Terms and Conditions are governed by the laws of the United Republic of Tanzania. Any disputes shall be resolved through good-faith negotiation first, and failing that, through competent courts in Mbeya, Tanzania.`,
  },
  {
    title: '12. Changes to Terms',
    content: `ZamTech reserves the right to update these Terms and Conditions at any time. Changes will be posted on this page with the updated effective date. Continued use of our services after changes constitutes acceptance of the updated terms.`,
  },
]

export default function TermsPage() {
  return (
    <PageWrapper>
      <section className="bg-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-primary text-xs font-bold uppercase tracking-[0.15em] mb-3">Legal</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-balance mb-5 leading-tight" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.025em' }}>Terms & Conditions</h1>
          <p className="text-white/65 text-base">
            Effective Date: <strong>1 January 2024</strong> &nbsp;&middot;&nbsp; Last Updated: <strong>1 June 2025</strong>
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-muted-foreground leading-relaxed mb-10 text-base">
            These Terms and Conditions govern your use of the ZamTech Automation Studio website and the engagement of our services. Please read them carefully before proceeding.
          </p>
          <div className="space-y-8">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="text-foreground font-bold text-lg mb-3">{s.title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">{s.content}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-muted-foreground text-sm mb-4">
              For questions regarding these terms, contact us at:{' '}
              <a href="mailto:legal@zamtech.co.tz" className="text-primary hover:underline">legal@zamtech.co.tz</a>
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/privacy" className="text-primary font-medium hover:underline text-sm">Privacy Policy</Link>
              <Link href="/cookies" className="text-primary font-medium hover:underline text-sm">Cookie Policy</Link>
              <Link href="/contact" className="text-primary font-medium hover:underline text-sm">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
