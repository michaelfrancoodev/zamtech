import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Support Center',
  description: 'Submit a support ticket to ZamTech Automation Studio. Get help with your website, mobile app, or business system — we respond within 24 hours.',
  alternates: { canonical: '/support' },
  openGraph: { title: 'Support Center | ZamTech', description: 'Submit a support ticket and track its progress in real time.', url: '/support' },
}

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return children
}
